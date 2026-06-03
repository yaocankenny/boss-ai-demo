import { useState, useEffect } from 'react';
import { QueryId, EvidenceItem } from '../types';
import { demoData } from '../demoData';
import { 
  X, 
  FileText, 
  Hash, 
  ExternalLink, 
  ShieldCheck, 
  ChevronRight,
  GitCommit,
  Network
} from 'lucide-react';

interface BriefingPanelProps {
  activeQueryId: QueryId | null;
  isOpen: boolean;
  onClose: () => void;
  selectedEvidence: EvidenceItem | null;
  onSelectEvidence: (item: EvidenceItem | null) => void;
}

// Dynamically map evidence titles to related graph ontology nodes to show graph connection
function getAssociatedNodes(title: string): string[] {
  const lowercaseTitle = title.toLowerCase();
  
  // Q1 Matchers
  if (lowercaseTitle.includes('three issues') || lowercaseTitle.includes('priorities')) return ['Meeting', 'Transcript', 'Issue'];
  if (lowercaseTitle.includes('commitments were recorded') || lowercaseTitle.includes('accountable')) return ['Issue', 'Commitment'];
  if (lowercaseTitle.includes('renewal-risk') || lowercaseTitle.includes('partially')) return ['Issue', 'Progress'];
  if (lowercaseTitle.includes('cross-functional') || lowercaseTitle.includes('diluted')) return ['Issue', 'ActionItem'];
  if (lowercaseTitle.includes('drifted') || lowercaseTitle.includes('commitment accountability')) return ['Commitment', 'Progress'];
  
  // Q2 Matchers
  if (lowercaseTitle.includes('already been committed') || lowercaseTitle.includes('recog')) return ['Revenue', 'Commitment', 'ManagementView'];
  if (lowercaseTitle.includes('contract')) return ['Contract', 'Risk'];
  if (lowercaseTitle.includes('payment')) return ['Payment', 'Project'];
  if (lowercaseTitle.includes('risk has not been') || lowercaseTitle.includes('risk')) return ['Risk', 'ManagementView'];
  
  // Q3 Matchers
  if (lowercaseTitle.includes('recurring') || lowercaseTitle.includes('not all growth') || lowercaseTitle.includes('revenue')) return ['Revenue', 'BusinessUnit', 'Customer'];
  if (lowercaseTitle.includes('retention') || lowercaseTitle.includes('customer data')) return ['Product', 'Customer'];
  if (lowercaseTitle.includes('contract structure')) return ['Contract', 'BusinessUnit'];
  if (lowercaseTitle.includes('product module') || lowercaseTitle.includes('scale')) return ['Product', 'BusinessUnit'];
  if (lowercaseTitle.includes('organization data') || lowercaseTitle.includes('consume')) return ['Organization', 'BusinessUnit'];
  
  return [];
}

export function BriefingPanel({ 
  activeQueryId, 
  isOpen, 
  onClose, 
  selectedEvidence, 
  onSelectEvidence 
}: BriefingPanelProps) {
  
  const evidenceList = activeQueryId ? demoData.evidence[activeQueryId] : [];
  
  // Set local state to track current active evidence item in drawer
  const [activeItem, setActiveItem] = useState<EvidenceItem | null>(null);

  // Sync index on external click from Workspace
  useEffect(() => {
    if (selectedEvidence) {
      setActiveItem(selectedEvidence);
    } else if (evidenceList && evidenceList.length > 0) {
      setActiveItem(evidenceList[0]);
    }
  }, [selectedEvidence, evidenceList]);

  const associatedNodes = activeItem ? getAssociatedNodes(activeItem.title) : [];

  return (
    <>
      {/* Backdrop with elegant fade transition */}
      <div 
        className={`fixed inset-0 bg-[#000000]/25 backdrop-blur-[2px] z-40 transition-all duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={onClose} 
      />

      {/* Slide-out Sidebar Drawer Container */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-[500px] bg-white border-l border-[#EAE5DC] flex flex-col shrink-0 z-50 transform transition-transform duration-500 ease-out shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F4EFE6] bg-[#FAF8F5]/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#0F172A] flex items-center justify-center text-white shrink-0">
              <Network size={13} />
            </div>
            <h2 className="text-base font-bold text-[#1A1A1A]">Evidence Relationship Canvas</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        {!activeQueryId || !activeItem ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400 space-y-3">
            <FileText size={36} className="opacity-40 text-gray-400" />
            <p className="text-sm">Click any evidence card in the analyzer report to inspect trace details.</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-y-auto hide-scrollbar bg-white">
            
            {/* Horizontal Timeline Chain Panel */}
            <div className="px-6 py-4 bg-[#FAF8F5]/40 border-b border-[#F4EFE6] space-y-2.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#71717A]">
                Evidence Points ({evidenceList.length})
              </span>
              
              <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
                {evidenceList.map((item, idx) => {
                  const isActive = activeItem.title === item.title;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveItem(item);
                        onSelectEvidence(item);
                      }}
                      className={`px-3 py-2 rounded-xl border text-xs font-semibold shrink-0 transition-all text-left flex items-center gap-2 ${
                        isActive 
                          ? 'border-zinc-400 bg-gray-100 text-[#1A1A1A]' 
                          : 'border-[#EAE5DC] bg-white text-[#71717A] hover:bg-gray-100'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#B48242] animate-pulse' : 'bg-gray-300'}`}></div>
                      <span>Evidence {idx + 1}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Detail Scroll Area */}
            <div className="p-6 space-y-6">
              
              {/* Evidence Node Overview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0F172A]/10 text-[#0F172A] text-[10px] font-bold uppercase tracking-wider">
                    Source: {activeItem.source}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#47A36B] font-bold">
                    <ShieldCheck size={14} />
                    High Coherence Rate
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#1A1A1A] leading-snug">
                  {activeItem.title}
                </h3>
              </div>

              {/* Observed Factual points */}
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                  Observed Factual Gaps & Data Traces
                </h4>
                
                <div className="bg-[#FAF8F5]/60 border border-[#EAE5DC] rounded-xl overflow-hidden divide-y divide-[#F4EFE6]">
                  {activeItem.facts.map((fact, idx) => (
                    <div key={idx} className="p-4 flex gap-3 text-xs text-[#1A1A1A] leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-white border border-[#EAE5DC] flex items-center justify-center text-[10px] font-mono text-[#0F172A] shrink-0 shadow-sm">
                        {idx + 1}
                      </div>
                      <p className="flex-1 mt-0.5">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ontological link justification */}
              <div className="space-y-2.5">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                  Sub-logical Alignment Rules
                </h4>
                <div className="bg-[#0F172A]/5 border border-[#0F172A]/15 p-4 rounded-xl space-y-2">
                  <h5 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
                    Why this supports judgment
                  </h5>
                  <p className="text-xs text-[#1A1A1A] leading-relaxed font-medium">
                    {activeItem.whyItMatters}
                  </p>
                </div>
              </div>

              {/* Anchored Entities section */}
              {associatedNodes.length > 0 && (
                <div className="pt-4 border-t border-[#F4EFE6] space-y-3">
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-gray-400 flex items-center gap-1.5">
                    Anchored Context Entities
                  </h4>
                  
                  <div className="flex flex-wrap gap-2">
                    {associatedNodes.map((nodeName, i) => (
                      <div 
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EAE5DC] bg-white text-xs font-semibold text-[#1A1A1A] hover:bg-[#FAF8F5] transition-colors shadow-xs"
                      >
                        <GitCommit size={12} className="text-[#0F172A]" />
                        <span>{nodeName}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 italic">
                    These elements are highlighted on the left-side Enterprise Context Graph during inference.
                  </p>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </>
  );
}
