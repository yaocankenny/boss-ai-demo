import { Query, QueryId } from '../types';
import { demoData } from '../demoData';
import { Bot, User, MessageSquare } from 'lucide-react';

interface ConversationPanelProps {
  activeQueryId: QueryId | null;
  onSelectQuery: (id: QueryId) => void;
}

export function ConversationPanel({ activeQueryId, onSelectQuery }: ConversationPanelProps) {
  const activeQuery = activeQueryId ? demoData.queries.find(q => q.id === activeQueryId) : null;

  return (
    <div className="w-[320px] h-full bg-[#FDFBF8] border-r border-[#EAE5DC] flex flex-col hide-scrollbar">
      {/* Header */}
      <div className="p-6 border-b border-[#EAE5DC]">
        <h1 className="text-xl font-medium text-[#1A1A1A]">Boss AI</h1>
        <p className="text-sm text-[#B8B8B8] mt-1">Executive Decision Intelligence</p>
      </div>

      {/* Suggested Questions (if no query selected yet, or always show to allow switching) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 flex flex-col justify-end">
        
        {activeQuery && (
          <div className="space-y-6 flex-1 flex flex-col justify-end">
             <div className="flex gap-4">
              <div className="w-8 h-8 rounded bg-[#1A1A1A] text-white flex items-center justify-center shrink-0">
                <User size={16} />
              </div>
              <div className="text-[#1A1A1A] text-sm leading-relaxed pt-1">
                {activeQuery.text}
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded bg-[#AE8F59] text-white flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
              <div className="text-[#1A1A1A] text-sm leading-relaxed pt-1">
                I have mapped the relevant enterprise objects and reasoned through the current state. My executive judgment is ready in the briefing panel.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Box Mock */}
      <div className="p-6 border-t border-[#EAE5DC] bg-white">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Ask Boss AI..." 
            className="w-full bg-[#FDFBF8] border border-[#EAE5DC] rounded-lg pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-[#AE8F59] focus:ring-1 focus:ring-[#AE8F59] text-[#1A1A1A] transition-colors"
            disabled
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B8B8B8]" disabled>
            <Bot size={18} />
          </button>
        </div>
        <p className="text-center text-[10px] text-[#B8B8B8] mt-3">
          Boss AI uses Enterprise Context-based reasoning.
        </p>
      </div>
    </div>
  );
}
