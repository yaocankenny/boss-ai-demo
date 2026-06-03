import { useEffect, useState, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { demoData } from '../demoData';
import { QueryId } from '../types';
import { CustomNode } from './CustomNode';

export interface GraphNode {
  id: string;
  position: { x: number; y: number };
  data: any;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  isActive: boolean;
  isAnimated: boolean;
  isDummy: boolean;
}

interface GraphPanelProps {
  activeQueryId: QueryId | null;
  step: number;
  isReasoningActive?: boolean;
}

const dummyNodesDict: Record<string, string[]> = {
  'Meeting': ['Calendar Event', 'Transcript', 'Attendees'],
  'Issue': ['Jira Ticket', 'Risk Log'],
  'Owner': ['Department', 'Role Profile'],
  'Commitment': ['Milestone', 'SLA', 'Resource Allocation'],
  'ActionItem': ['Sub-task', 'Update Log'],
  'Progress': ['Status Report', 'Blocker'],
  'ComputedJudgment': ['Historical Trend', 'Confidence Score', 'Weight Matrix'],
  'Revenue': ['Ledger', 'Transaction', 'Invoice'],
  'Contract': ['Legal Addendum', 'MSA'],
  'Payment': ['Receipt', 'Bank Record', 'Gateway'],
  'Project': ['Sprint', 'Backlog', 'Charter'],
  'Risk': ['Incident', 'Mitigation'],
  'ManagementView': ['Dashboard', 'Alert', 'Digest'],
  'Judgment': ['Metric', 'Tolerance', 'Heuristic'],
  'BusinessUnit': ['Cost Center', 'Headcount', 'P&L'],
  'Customer': ['Account', 'Contact', 'CRM Profile'],
  'Organization': ['Team', 'Hierarchy'],
  'Product': ['SKU', 'Feature', 'Release'],
  'GrowthJudgment': ['Scenario', 'Forecast'],
  'Evidence': ['Raw Data', 'System Log', 'Audit Trail']
};

export function GraphPanel({ activeQueryId, step, isReasoningActive = true }: GraphPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<any>(null);
  const [transform, setTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity.translate(100, 80).scale(0.7));
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const preset = activeQueryId ? demoData.subgraphPresets[activeQueryId] : null;
  const seqList = useMemo(() => preset?.reasoningSteps.map(s => s.nodeId) || [], [preset]);

  // Compute neighboring nodes of the hovered node for smart isolation highlighting
  const { nodes, edges } = useMemo(() => {
    if (!preset) return { nodes: [], edges: [] };

    const visitedNodes = new Set<string>();
    for (let i = 0; i <= step; i++) {
      if (i < seqList.length) visitedNodes.add(seqList[i]);
    }

    const nodesPool: any[] = [];
    const edgesPool: any[] = [];

    // All preset nodes are mapped so the graph skeletal structure is fully visible
    const presetMainObjects = demoData.ontologyObjects.filter(obj => preset.nodes.includes(obj.id));

    presetMainObjects.forEach(obj => {
      const isVisited = visitedNodes.has(obj.id);
      const isCompletelyFinished = step >= seqList.length;
      const isPulse = !isCompletelyFinished && seqList[step] === obj.id;
      const isActive = isVisited;

      nodesPool.push({
        id: obj.id,
        // Seed initial positions with preset coordinates
        x: obj.x,
        y: obj.y,
        isDummy: false,
        data: {
          label: obj.label,
          category: obj.category,
          isActive,
          isPulse,
          isVisible: true
        }
      });

      // Dummy context details are mapped only for visited nodes to expand live metadata
      if (isVisited) {
        const dummies = dummyNodesDict[obj.id] || [];
        dummies.forEach((dName, idx) => {
          const dummyId = `${obj.id}-dummy-${idx}`;
          const angleOffset = (obj.id.length * 31 + idx * 60) % 360;
          const angle = ((idx * (360 / dummies.length)) + angleOffset) * (Math.PI / 180);

          // Disperse dummies initial position relative to parent coordinates
          const dx = Math.cos(angle) * 160;
          const dy = Math.sin(angle) * 120;
          const dummyEdgeLabel = ['INCLUDES', 'HAS_CONTEXT', 'REFERENCES', 'GENERATES', 'RELATES_TO', 'DERIVED_FROM'][idx % 6];

          nodesPool.push({
            id: dummyId,
            x: obj.x + dx,
            y: obj.y + dy,
            isDummy: true,
            parentId: obj.id,
            data: {
              label: dName,
              category: 'Evidence',
              isActive: false,
              isPulse: false,
              isVisible: true,
              isDummy: true
            }
          });

          edgesPool.push({
            id: `edge-${obj.id}-${dummyId}`,
            source: obj.id,
            target: dummyId,
            label: dummyEdgeLabel,
            isActive: false,
            isAnimated: false,
            isDummy: true
          });
        });
      }
    });

    // Extract ontology relationships related to the preset
    const activeEdges = demoData.relationships.filter(rel => preset.edges.includes(rel.id));
    const isReasoningFinished = step >= seqList.length;

    activeEdges.forEach(rel => {
      const sourceNode = nodesPool.find(n => n.id === rel.source);
      const targetNode = nodesPool.find(n => n.id === rel.target);
      
      if (sourceNode && targetNode) {
        const isActiveEdge = sourceNode.data.isActive && targetNode.data.isActive;
        const isPulseEdge = isActiveEdge && !isReasoningFinished && (rel.source === seqList[step] || rel.target === seqList[step]);

        edgesPool.push({
          id: rel.id,
          source: rel.source,
          target: rel.target,
          label: rel.label.toUpperCase(),
          isActive: isActiveEdge,
          isAnimated: isPulseEdge,
          isDummy: false
        });
      }
    });

    // Run static D3 force-directed simulation with higher repulsion and relaxed soft constraints for perfect separation
    const simulation = d3.forceSimulation(nodesPool)
      .force('link', d3.forceLink(edgesPool)
        .id((d: any) => d.id)
        .distance((link: any) => link.isDummy ? 180 : 340)
        .strength(1.0)
      )
      .force('charge', d3.forceManyBody().strength((d: any) => d.isDummy ? -1500 : -4800))
      .force('collide', d3.forceCollide().radius((d: any) => d.isDummy ? 120 : 180).iterations(4))
      // Relaxed pull back to prevent overlaps completely while keeping designed directional structure
      .force('x', d3.forceX((d: any) => d.isDummy ? d.x : d.x).strength(0.08))
      .force('y', d3.forceY((d: any) => d.isDummy ? d.y : d.y).strength(0.08))
      .stop();

    for (let i = 0; i < 240; ++i) {
      simulation.tick();
    }

    return { nodes: nodesPool, edges: edgesPool };
  }, [preset, step, seqList]);

  // Viewport size auto-adaptation (fitView) logic
  const fitGraphView = (animate = true) => {
    if (!containerRef.current || !zoomRef.current || nodes.length === 0) return;

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    nodes.forEach(n => {
      minX = Math.min(minX, n.x);
      maxX = Math.max(maxX, n.x);
      minY = Math.min(minY, n.y);
      maxY = Math.max(maxY, n.y);
    });

    // Padding parameters representing boundaries including node cards sizes
    const halfNodeWidth = 140;
    const halfNodeHeight = 70;
    const xMin = minX - halfNodeWidth;
    const xMax = maxX + halfNodeWidth;
    const yMin = minY - halfNodeHeight;
    const yMax = maxY + halfNodeHeight;

    const graphWidth = xMax - xMin;
    const graphHeight = yMax - yMin;
    const graphCenterX = (xMin + xMax) / 2;
    const graphCenterY = (yMin + yMax) / 2;

    const containerWidth = containerRef.current.clientWidth || 800;
    const containerHeight = containerRef.current.clientHeight || 500;

    const padding = 80; // Padding around the edges of the SVG container
    let scale = Math.min(
      (containerWidth - padding) / graphWidth,
      (containerHeight - padding) / graphHeight
    );

    // Bound scale within highly responsive zoom levels
    scale = Math.max(0.2, Math.min(scale, 0.85));

    const tx = containerWidth / 2 - scale * graphCenterX;
    const ty = containerHeight / 2 - scale * graphCenterY;

    const targetTransform = d3.zoomIdentity.translate(tx, ty).scale(scale);

    if (animate) {
      d3.select(containerRef.current)
        .transition()
        .duration(650)
        .ease(d3.easeCubicOut)
        .call(zoomRef.current.transform, targetTransform);
    } else {
      d3.select(containerRef.current)
        .call(zoomRef.current.transform, targetTransform);
    }
  };

  // Zoom and center on an active node to inspect surrounding entities and relations
  const zoomToNode = (nodeId: string, animate = true) => {
    if (!containerRef.current || !zoomRef.current || nodes.length === 0) return;

    const node = nodes.find(n => n.id === nodeId);
    if (!node) {
      fitGraphView(animate);
      return;
    }

    const containerWidth = containerRef.current.clientWidth || 800;
    const containerHeight = containerRef.current.clientHeight || 500;
    
    // Zoom scale to examine the active node and its neighbors
    const scale = 1.15;

    const tx = containerWidth / 2 - scale * node.x;
    const ty = containerHeight / 2 - scale * node.y;

    const targetTransform = d3.zoomIdentity.translate(tx, ty).scale(scale);

    if (animate) {
      d3.select(containerRef.current)
        .transition()
        .duration(850)
        .ease(d3.easeCubicInOut)
        .call(zoomRef.current.transform, targetTransform);
    } else {
      d3.select(containerRef.current)
        .call(zoomRef.current.transform, targetTransform);
    }
  };

  // Keep fit function up to date for references in ResizeObservers
  const fitRef = useRef(fitGraphView);
  useEffect(() => {
    fitRef.current = fitGraphView;
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const zoom = d3.zoom<HTMLDivElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (e) => {
        setTransform(e.transform);
      });
    
    zoomRef.current = zoom;
    const selection = d3.select(containerRef.current);
    selection.call(zoom);

    // Set up ResizeObserver to handle layout scale changes without jittery transitions
    const resizeObserver = new ResizeObserver(() => {
      fitRef.current(false);
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      selection.on('.zoom', null);
      resizeObserver.disconnect();
    };
  }, []);

  // Recenter handles active fit animation
  const handleResetZoom = () => {
    fitGraphView(true);
  };

  // Trigger fit view or zoom to active node when progress / step updates
  useEffect(() => {
    const timer = setTimeout(() => {
      const activeNodeId = seqList[step];
      if (activeQueryId && activeNodeId && step < seqList.length) {
        zoomToNode(activeNodeId, true);
      } else {
        fitGraphView(true);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [activeQueryId, step, seqList, nodes]);

  // Compute neighboring nodes of the hovered node for smart isolation highlighting
  const connectedNodeIds = useMemo(() => {
    if (!hoveredNodeId) return new Set<string>();
    const set = new Set<string>([hoveredNodeId]);
    edges.forEach(e => {
      const srcId = typeof e.source === 'object' ? (e.source as any).id : e.source;
      const tgtId = typeof e.target === 'object' ? (e.target as any).id : e.target;
      if (srcId === hoveredNodeId) set.add(tgtId);
      if (tgtId === hoveredNodeId) set.add(srcId);
    });
    return set;
  }, [hoveredNodeId, edges]);

  return (
    <div className="w-full h-full min-h-[400px] bg-[#FDFBF8] relative overflow-hidden" ref={containerRef}>
      {/* Title Panel */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none1 font-sans">
          <h3 className="text-xs md:text-sm font-semibold text-[#1A1A1A] drop-shadow-sm border border-[#EAE5DC] bg-white/90 backdrop-blur px-3 py-2 rounded-xl shadow-sm">
            Enterprise Context Graph
          </h3>
      </div>

      {/* Unobtrusive Recenter Control */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
         <button 
            onClick={handleResetZoom}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/95 border border-[#EAE5DC] hover:border-zinc-300 text-zinc-600 hover:text-zinc-800 rounded-xl shadow-sm hover:shadow transition-all font-medium text-xs select-none cursor-pointer"
            title="Recenter and align Enterprise Context Graph"
         >
            <span className="text-sm font-mono">↺</span> Recenter View
         </button>
      </div>
      
      {/* Background dot pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
         <defs>
            <pattern id="dotPattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform={`translate(${transform.x}, ${transform.y}) scale(${transform.k})`}>
               <circle cx="1" cy="1" r="1" fill="#EAE5DC" />
            </pattern>
         </defs>
         <rect width="100%" height="100%" fill="url(#dotPattern)" />
      </svg>

      <div 
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.k})`,
          transformOrigin: '0 0'
        }}
        className="absolute inset-0 pointer-events-none"
      >
         <svg className="absolute inset-0 overflow-visible">
            {edges.map(e => {
                const sourceNode: any = typeof e.source === 'object' ? e.source : nodes.find(n => n.id === e.source);
                const targetNode: any = typeof e.target === 'object' ? e.target : nodes.find(n => n.id === e.target);
                if (!sourceNode || !targetNode) return null;
                
                const srcId = sourceNode.id;
                const tgtId = targetNode.id;
                
                const isEdgeHovered = hoveredNodeId !== null && (srcId === hoveredNodeId || tgtId === hoveredNodeId);
                const isOtherEdgeDimmed = hoveredNodeId !== null && !isEdgeHovered;
                
                const edgeColor = e.isDummy 
                  ? '#E5DFD4' 
                  : (e.isActive 
                     ? (isEdgeHovered ? '#B25E2C' : '#D98A3C') 
                     : '#EAE5DC');
                     
                const strokeWidth = e.isAnimated 
                  ? 2.5 
                  : (isEdgeHovered ? 2.5 : (e.isActive ? 1.5 : 1.2));
                
                const x1 = sourceNode.x;
                const y1 = sourceNode.y;
                const x2 = targetNode.x;
                const y2 = targetNode.y;
                
                // Elegant curve line mapping for crisp readability
                let pathD = '';
                if (e.isDummy) {
                  pathD = `M ${x1} ${y1} L ${x2} ${y2}`;
                } else {
                  const dx = x2 - x1;
                  const dy = y2 - y1;
                  const cx = (x1 + x2) / 2 - (dy * 0.15);
                  const cy = (y1 + y2) / 2 + (dx * 0.15);
                  pathD = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
                }
                
                return (
                   <path 
                     key={e.id}
                     d={pathD}
                     fill="none"
                     stroke={edgeColor}
                     strokeWidth={strokeWidth}
                     strokeDasharray={e.isAnimated ? "6,4" : (e.isDummy ? "3,3" : "none")}
                     className={`transition-all duration-300 ease-in-out ${e.isAnimated ? 'animate-edge-flow' : ''}`}
                     style={{
                       opacity: isOtherEdgeDimmed ? 0.08 : 1,
                     }}
                   />
                );
            })}
         </svg>
         
         {/* Edge Labels rendered as clean, high-contrast overlay markers */}
         {edges.map(e => {
            const sourceNode: any = typeof e.source === 'object' ? e.source : nodes.find(n => n.id === e.source);
            const targetNode: any = typeof e.target === 'object' ? e.target : nodes.find(n => n.id === e.target);
            if (!sourceNode || !targetNode) return null;
            
            const srcId = sourceNode.id;
            const tgtId = targetNode.id;
            
            const isEdgeHovered = hoveredNodeId !== null && (srcId === hoveredNodeId || tgtId === hoveredNodeId);
            const isOtherEdgeDimmed = hoveredNodeId !== null && !isEdgeHovered;
            
            const x1 = sourceNode.x;
            const y1 = sourceNode.y;
            const x2 = targetNode.x;
            const y2 = targetNode.y;
            
            let cx = (x1 + x2) / 2;
            let cy = (y1 + y2) / 2;
            
            if (!e.isDummy) {
              const dx = x2 - x1;
              const dy = y2 - y1;
              const ctrlX = (x1 + x2) / 2 - (dy * 0.15);
              const ctrlY = (y1 + y2) / 2 + (dx * 0.15);
              cx = 0.25 * x1 + 0.5 * ctrlX + 0.25 * x2;
              cy = 0.25 * y1 + 0.5 * ctrlY + 0.25 * y2;
            }
            
            return (
               <div
                 key={`label-${e.id}`}
                 className="absolute z-10 flex items-center justify-center transition-all duration-300 select-none pointer-events-none"
                 style={{ 
                   left: cx, 
                   top: cy, 
                   transform: 'translate(-50%, -50%)',
                   opacity: isOtherEdgeDimmed ? 0.04 : 1,
                 }}
               >
                 <span 
                   className={`px-1.5 py-0.5 rounded-md border text-[9px] font-mono font-bold tracking-wider backdrop-blur transition-all duration-300
                     ${e.isDummy 
                       ? 'bg-[#FCFBF9]/90 text-zinc-400 border-zinc-200/50' 
                       : (e.isActive 
                          ? (isEdgeHovered ? 'bg-[#FAF0E6] text-[#B25E2C] border-[#B25E2C]/30 shadow-sm' : 'bg-orange-50/90 text-[#D98A3C] border-orange-200/50') 
                          : 'bg-[#FCFBF9]/70 text-zinc-400 border-zinc-200/35')}
                   `}
                 >
                   {e.label}
                 </span>
               </div>
            );
         })}

         {nodes.map(node => {
            const isDimmed = hoveredNodeId !== null && !connectedNodeIds.has(node.id);
            const isHovered = hoveredNodeId === node.id;
            
            return (
              <CustomNode 
                 key={node.id} 
                 data={node.data} 
                 x={node.x} 
                 y={node.y} 
                 isHovered={isHovered}
                 isDimmed={isDimmed}
                 onMouseEnter={() => setHoveredNodeId(node.id)}
                 onMouseLeave={() => setHoveredNodeId(null)}
              />
            );
         })}
      </div>
    </div>
  );
}
