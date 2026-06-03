import { QueryId } from '../types';
import { demoData } from '../demoData';
import { Bot, Plus, MessageSquare, ChevronDown } from 'lucide-react';
import { UserAvatar } from './UserAvatar';

interface SidebarProps {
  activeQueryId: QueryId | null;
  onSelectQuery: (id: QueryId) => void;
}

export function Sidebar({ activeQueryId, onSelectQuery }: SidebarProps) {
  return (
    <div className="w-[300px] h-full bg-white border-r border-[#EAE5DC] flex flex-col hide-scrollbar text-[#1A1A1A] shrink-0">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            {/* Simple logo approximation */}
            <div className="w-8 h-8 flex items-center justify-center">
               <Bot size={28} className="text-[#CF9E68]" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-[#1A1A1A]">Boss AI</h1>
            <p className="text-xs text-zinc-500 mt-0.5">CEO Copilot</p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <button 
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#0F172A] hover:bg-[#1E1E2F] transition-colors text-xs font-medium text-white"
          onClick={() => onSelectQuery('q1')}
        >
          <Plus size={14} className="text-white" />
          New Conversation
        </button>
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto px-4 space-y-6 hide-scrollbar flex flex-col justify-start">
        
        <div className="space-y-1">
          <h3 className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider px-2 mb-2">Session</h3>
          
          <button
            onClick={() => onSelectQuery('q1')}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex flex-col gap-2 ${
              activeQueryId === 'q1' || !activeQueryId
                ? 'bg-gray-100 text-[#1A1A1A] shadow-xs font-semibold' 
                : 'hover:bg-gray-100 text-zinc-600'
            }`}
          >
            <span className="text-xs line-clamp-2 leading-relaxed">
               What were the top three urgent issues concluded from the last VP-level meeting?
            </span>
            <span className={`text-[10px] text-right w-full ${activeQueryId === 'q1' || !activeQueryId ? 'text-zinc-600' : 'text-zinc-400'}`}>10:32 AM</span>
          </button>

          <button
             onClick={() => onSelectQuery('q2')}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex flex-col gap-2 ${
              activeQueryId === 'q2'
                ? 'bg-gray-100 text-[#1A1A1A] shadow-xs font-semibold' 
                : 'hover:bg-gray-100 text-zinc-600'
            }`}
          >
            <span className="text-xs line-clamp-2 leading-relaxed">
               Is our Q2 ARR target on track? Hidden risks?
            </span>
             <span className={`text-[10px] text-right w-full ${activeQueryId === 'q2' ? 'text-zinc-600' : 'text-zinc-400'}`}>Yesterday</span>
          </button>

          <button
             onClick={() => onSelectQuery('q3')}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex flex-col gap-2 ${
              activeQueryId === 'q3'
                ? 'bg-gray-100 text-[#1A1A1A] shadow-xs font-semibold' 
                : 'hover:bg-gray-100 text-zinc-600'
            }`}
          >
            <span className="text-xs line-clamp-2 leading-relaxed">
               Which business lines should we double down on, which ones to limit?
            </span>
             <span className={`text-[10px] text-right w-full ${activeQueryId === 'q3' ? 'text-zinc-600' : 'text-zinc-400'}`}>May 14</span>
          </button>
        </div>

      </div>

       <div className="p-4 border-t border-[#EAE5DC]">
          <div className="flex items-center justify-between hover:bg-gray-100 p-2 rounded-lg cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <UserAvatar className="w-8 h-8" roundedClass="rounded" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[#1A1A1A]">Dr. Kaifu Lee</span>
                <span className="text-[10px] text-zinc-500">01.AI</span>
              </div>
            </div>
            <ChevronDown size={14} className="text-zinc-500" />
          </div>
       </div>

    </div>
  );
}
