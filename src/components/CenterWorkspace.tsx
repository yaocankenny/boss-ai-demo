import { useState, useEffect, useRef } from 'react';
import { QueryId, EvidenceItem } from '../types';
import { demoData } from '../demoData';
import { Bot, Maximize2, Bell, Copy, ToggleRight, CheckCircle2, RotateCcw, ArrowRight, Send } from 'lucide-react';
import { GraphPanel } from './GraphPanel';
import { StreamedResultReport } from './StreamedResultReport';
import { UserAvatar } from './UserAvatar';

function TypewriterText({ text, delay, streaming, onComplete }: { text: string, delay: number, streaming: boolean, onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState(streaming ? '' : text);
  const onCompleteRef = useRef(onComplete);
  
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);
  
  useEffect(() => {
    if (!streaming) {
      setDisplayed(text);
      return;
    }
    
    setDisplayed('');
    let i = 0;
    let timer: number;
    let isDone = false;
    
    const timeout = window.setTimeout(() => {
      timer = window.setInterval(() => {
        i++;
        setDisplayed(text.substring(0, i));
        if (i >= text.length) {
            window.clearInterval(timer);
            if (!isDone) {
                isDone = true;
                onCompleteRef.current?.();
            }
        }
      }, 20); // 20ms per character
    }, delay);
    
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(timer);
    };
  }, [text, delay, streaming]);
  
  return <span>{displayed}{streaming && displayed.length < text.length && <span className="animate-pulse ml-0.5 text-[#CF9E68]">|</span>}</span>;
}

interface CenterWorkspaceProps {
  activeQueryId: QueryId | null;
  onSelectEvidence: (item: EvidenceItem) => void;
}

export function CenterWorkspace({ activeQueryId, onSelectEvidence }: CenterWorkspaceProps) {
  const [inputText, setInputText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  const [submittedQuery, setSubmittedQuery] = useState<{id: QueryId, text: string} | null>(null);
  const [chatStage, setChatStage] = useState<'idle' | 'replied' | 'showing_graph' | 'reasoning' | 'complete'>('idle');
  const [step, setStep] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [reportTextDone, setReportTextDone] = useState(false);

  // When sidebar selects, populate the input (only backfill, do not submit)
  useEffect(() => {
    if (activeQueryId) {
      const q = demoData.queries.find(q => q.id === activeQueryId);
      if (q) {
        setInputText(q.text);
      }
    }
  }, [activeQueryId]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    // Check if there is an exact or near match in pre-defined queries first for precise routing
    let matchedId: QueryId = 'q1';
    const exactMatch = demoData.queries.find(q => q.text.trim().toLowerCase() === inputText.trim().toLowerCase());
    
    if (exactMatch) {
      matchedId = exactMatch.id;
    } else {
      // Simple intent matching based on keywords as fallback since we have fixed query presets
      const lowerInput = inputText.toLowerCase();
      if (lowerInput.includes('q2') || lowerInput.includes('revenue') || lowerInput.includes('risk') || lowerInput.includes('target')) {
        matchedId = 'q2';
      } else if (lowerInput.includes('business lines') || lowerInput.includes('growth') || lowerInput.includes('cut') || lowerInput.includes('5')) {
        matchedId = 'q3';
      }
    }
    
    setSubmittedQuery({ id: matchedId, text: inputText });
    setChatStage('replied');
    setStep(0);
    setReportTextDone(false);
  };

  const reasoningSteps = submittedQuery ? demoData.subgraphPresets[submittedQuery.id].reasoningSteps : [];

  useEffect(() => {
    if (chatStage !== 'reasoning' || !isAutoPlay || reasoningSteps.length === 0) return;

    const interval = setInterval(() => {
      setStep(prev => {
        if (prev < reasoningSteps.length) {
          if (prev + 1 === reasoningSteps.length) {
            setChatStage('complete');
          }
          return prev + 1;
        }
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [chatStage, isAutoPlay, reasoningSteps.length]);

  return (
    <div className="flex-1 h-full bg-white flex flex-col relative w-full overflow-hidden">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 bg-white border-b border-[#EAE5DC] shrink-0">
        <h2 className="text-lg font-semibold text-[#1A1A1A]">Conversation</h2>
        <div className="flex items-center gap-4 text-[#A1A1AA]">
          <button className="hover:text-[#1A1A1A] transition-colors"><Copy size={18} /></button>
          <button className="hover:text-[#1A1A1A] transition-colors"><Bell size={18} /></button>
          <button className="hover:text-[#1A1A1A] transition-colors"><Maximize2 size={18} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-8 space-y-8 hide-scrollbar pb-6">
        {submittedQuery ? (
          <>
            {/* User Query */}
            <div className="flex gap-4 fade-in">
              <UserAvatar className="w-8 h-8" roundedClass="rounded-full" />
              <div className="flex flex-col pt-1">
                <span className="text-sm font-semibold text-[#1A1A1A] mb-1">Dr. Kaifu Lee</span>
                <div className="px-5 py-3.5 bg-[#F0EBE1] text-[#1A1A1A] rounded-2xl rounded-tl-sm text-sm inline-block shadow-sm">
                  {submittedQuery.text}
                </div>
              </div>
            </div>

            {/* Boss AI Reply */}
            {chatStage !== 'idle' && (
              <div className="flex gap-4 fade-in">
                <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center shrink-0 shadow-sm shadow-slate-900/10">
                   <Bot size={18} className="text-white" />
                </div>
                <div className="flex flex-col pt-1 w-full space-y-6">
                  <div className="flex items-center gap-2">
                     <span className="text-sm font-semibold text-[#0F172A]">Boss AI</span>
                     {chatStage === 'reasoning' && step < reasoningSteps.length && (
                       <span className="text-sm text-[#A1A1AA] animate-pulse">Deducing your business context...</span>
                     )}
                  </div>
                  
                  <div className="px-5 py-3.5 bg-white border border-[#EAE5DC] text-[#1A1A1A] rounded-2xl rounded-tr-sm text-sm inline-block shadow-sm max-w-2xl animate-in fade-in slide-in-from-left-2 duration-500">
                    <TypewriterText 
                      text="Got it. I'll first map the query to the Enterprise Context objects, and then start the reasoning process."
                      delay={300}
                      streaming={chatStage === 'replied'}
                      onComplete={() => {
                        setChatStage('showing_graph');
                        setTimeout(() => {
                          setChatStage('reasoning');
                        }, 1200);
                      }}
                    />
                  </div>

                  {/* Unified Reasoning & Graph Card */}
                  {chatStage !== 'replied' && (
                    <div className="w-full bg-white rounded-2xl border border-[#EAE5DC] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] flex flex-col xl:flex-row overflow-hidden min-h-[500px] animate-in fade-in slide-in-from-bottom-4 duration-700">
                       {/* Left: Reasoning Tree */}
                       {chatStage === 'reasoning' || chatStage === 'complete' ? (
                         <div className="w-full xl:w-80 bg-white border-b xl:border-b-0 xl:border-r border-[#EAE5DC] flex flex-col shrink-0">
                            <div className="p-4 border-b border-[#EAE5DC] bg-[#FAFAFA] flex items-center justify-between">
                               <div className="flex items-center gap-2">
                                  <Bot size={18} className="text-[#CF9E68]" />
                                  <h3 className="text-sm font-semibold text-[#1A1A1A]">Reasoning Process</h3>
                               </div>
                               <div className="flex items-center gap-3">
                                   <button 
                                     onClick={() => {
                                       setStep(0);
                                       setChatStage('reasoning');
                                       setReportTextDone(false);
                                     }} 
                                     className="text-[#A1A1AA] hover:text-[#1A1A1A] transition-colors" 
                                     title="Restart Reasoning"
                                   >
                                     <RotateCcw size={14} />
                                   </button>
                                   <button onClick={() => setIsAutoPlay(!isAutoPlay)} className={`transition-colors flex items-center ${isAutoPlay ? "text-[#47A36B]" : "text-[#D4D4D8]"}`} title="Auto-Play">
                                     <ToggleRight size={20} />
                                   </button>
                               </div>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto hide-scrollbar relative p-5 bg-white">
                              <div className="absolute left-[29px] top-6 bottom-6 w-[2px] bg-[#F4F4F5]"></div>
                              
                              <div className="space-y-6 relative z-10">
                                {reasoningSteps.map((stepInfo, idx) => {
                                   const isPast = idx < step;
                                   const isCurrent = idx === step;
                                   const isFuture = idx > step;
                                   
                                   return (
                                     <div key={idx} className={`relative pl-8 transition-all duration-500 ${isFuture ? 'opacity-40 grayscale' : 'opacity-100'}`}>
                                        {/* Timeline Dot */}
                                        <div className="absolute left-[-2px] top-0 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                                          <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${isCurrent ? 'bg-[#CF9E68] shadow-[0_0_10px_rgba(207,158,104,0.6)] animate-pulse' : isPast ? 'bg-[#47A36B]' : 'bg-[#D4D4D8]'}`}></div>
                                        </div>
                                        
                                        <div className="flex flex-col gap-1.5 -mt-0.5">
                                          <span className={`text-[13px] font-semibold transition-colors duration-300 ${isCurrent ? 'text-[#1A1A1A]' : isPast ? 'text-[#1A1A1A]' : 'text-[#A1A1AA]'}`}>
                                            {stepInfo.name}
                                          </span>
                                          
                                          {(isCurrent || isPast) && (
                                            <ul className="space-y-2 mt-1">
                                              {stepInfo.tasks.map((task, tIdx) => (
                                                <li key={tIdx} className={`text-[11px] leading-relaxed flex items-start gap-2 transition-all duration-300 animate-in fade-in slide-in-from-left-1 ${isPast ? 'text-[#71717A]' : 'text-[#3F3F46]'}`} style={{ animationDelay: `${tIdx * 150}ms`, animationFillMode: 'both' }}>
                                                  <CheckCircle2 size={13} className={`shrink-0 mt-[1px] ${isPast ? 'text-[#47A36B]' : 'text-[#CF9E68]'}`} />
                                                  <span className="flex-1 pt-[0.5px]">
                                                    <TypewriterText text={task} delay={tIdx * 300 + 150} streaming={isCurrent} />
                                                  </span>
                                                </li>
                                              ))}
                                            </ul>
                                          )}
                                        </div>
                                     </div>
                                   );
                                })}
                              </div>
                            </div>
                         </div>
                       ) : (
                         <div className="hidden xl:flex w-80 bg-[#FAFAFA] border-r border-[#EAE5DC] flex-col items-center justify-center text-[#A1A1AA] p-8 text-center shrink-0">
                           <div className="w-8 h-8 border-[3px] border-[#EAE5DC] border-t-[#CF9E68] rounded-full animate-spin mb-4"></div>
                           <p className="text-sm font-medium">Preparing to map reasoning steps...</p>
                         </div>
                       )}

                       {/* Right: Ontology Graph */}
                       <div className="flex-1 bg-[#FDFBF8] relative min-h-[400px]">
                          <GraphPanel activeQueryId={submittedQuery.id} step={step} isReasoningActive={chatStage === 'reasoning' || chatStage === 'complete'} />
                       </div>
                    </div>
                  )}

                  {chatStage === 'complete' && (
                    <div className="px-5 py-3.5 bg-white border border-[#EAE5DC] text-[#1A1A1A] rounded-2xl rounded-tr-sm text-sm inline-block shadow-sm max-w-2xl animate-in fade-in slide-in-from-left-2 duration-500">
                      <TypewriterText 
                        text="I've gathered useful information. Now I'll summarize and create the analytical report."
                        delay={100}
                        streaming={!reportTextDone}
                        onComplete={() => {
                          setReportTextDone(true);
                        }}
                      />
                    </div>
                  )}

                  {/* Result Summary Card replaced with Streaming Report */}
                  {reportTextDone && submittedQuery && (
                    <div className="w-full space-y-6">
                      <StreamedResultReport 
                        result={demoData.results[submittedQuery.id]}
                        evidence={demoData.evidence[submittedQuery.id]}
                        onSelectEvidence={onSelectEvidence}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50 pb-20">
             <Bot size={48} className="text-[#B8B8B8] mb-4" />
             <h2 className="text-xl font-medium text-[#1A1A1A]">Welcome to Boss AI</h2>
             <p className="text-sm text-[#71717A] mt-2">Type your questions or concerns about your business below to begin.</p>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-[#EAE5DC] pt-6 pb-6 px-6 lg:px-12 shrink-0">
         <div className="max-w-4xl w-full mx-auto relative bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-[#EAE5DC] flex items-end">
            <textarea 
              ref={textareaRef}
              rows={1}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask anything about your business..." 
              className="w-full pl-6 pr-16 py-4 text-sm text-[#1A1A1A] focus:outline-none rounded-xl bg-transparent placeholder-[#A1A1AA] resize-none min-h-[52px] max-h-[160px] overflow-y-auto leading-relaxed block"
            />
            <button 
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="absolute right-3 bottom-2.5 w-8 h-8 flex items-center justify-center bg-[#0F172A] hover:bg-[#1E1E2F] text-white rounded-full transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
               <Send size={14} className="ml-[-1px] mt-[1px]" />
            </button>
         </div>
         <p className="text-center text-[10px] text-[#A1A1AA] mt-3 tracking-widest uppercase font-medium">Boss AI uses Enterprise Context-based reasoning.</p>
      </div>
    </div>
  );
}
