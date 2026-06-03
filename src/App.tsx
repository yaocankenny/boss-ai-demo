import { useState } from 'react';
import { QueryId, EvidenceItem } from './types';
import { Sidebar } from './components/Sidebar';
import { CenterWorkspace } from './components/CenterWorkspace';
import { BriefingPanel } from './components/BriefingPanel';

export default function App() {
  const [activeQueryId, setActiveQueryId] = useState<QueryId | null>(null);
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);

  // When query changes, clear selected evidence & close panel
  const handleSelectQuery = (id: QueryId) => {
    setActiveQueryId(id);
    setSelectedEvidence(null);
    setIsBriefingOpen(false);
  };

  const handleOpenEvidence = (item: EvidenceItem) => {
    setSelectedEvidence(item);
    setIsBriefingOpen(true);
  };

  return (
    <div className="w-full h-screen bg-white flex overflow-hidden font-sans">
      <Sidebar 
        activeQueryId={activeQueryId} 
        onSelectQuery={handleSelectQuery} 
      />
      <CenterWorkspace 
        activeQueryId={activeQueryId} 
        onSelectEvidence={handleOpenEvidence}
      />
      <BriefingPanel 
        activeQueryId={activeQueryId} 
        isOpen={isBriefingOpen}
        onClose={() => {
          setIsBriefingOpen(false);
          setSelectedEvidence(null);
        }}
        selectedEvidence={selectedEvidence}
        onSelectEvidence={setSelectedEvidence}
      />
    </div>
  );
}
