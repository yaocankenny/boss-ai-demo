export type QueryId = 'q1' | 'q2' | 'q3';

export interface Query {
  id: QueryId;
  text: string;
  suggestedText: string;
}

export type NodeCategory = 'Strategic' | 'Business' | 'Execution' | 'Evidence' | 'Organization';

export interface OntologyNode {
  id: string;
  label: string;
  category: NodeCategory;
  x: number;
  y: number;
}

export interface Relationship {
  id: string;
  source: string;
  target: string;
  label: string;
}

export interface ReasoningStep {
  nodeId: string;
  name: string;
  tasks: string[];
}

export interface ActivatedSubgraph {
  nodes: string[];
  edges: string[];
  reasoningSteps: ReasoningStep[]; 
}

export interface Result {
  title: string;
  judgment: string;
  judgmentSubtitle?: string;
  markdown?: string;
  metrics?: { label: string; value: string; color: string }[];
  status?: { label: string; status: string; text: string }[];
  doubleDown?: { label: string; text: string }[];
  limitDefer?: { label: string; text: string }[];
  selective?: { label: string; text: string }[];
  coreJudgment?: string[];
  recommendedActions: string[];
}

export interface EvidenceItem {
  title: string;
  source: string;
  facts: string[];
  whyItMatters: string;
}

export interface DemoData {
  queries: Query[];
  ontologyObjects: OntologyNode[];
  relationships: Relationship[];
  subgraphPresets: Record<QueryId, ActivatedSubgraph>;
  results: Record<QueryId, Result>;
  evidence: Record<QueryId, EvidenceItem[]>;
}
