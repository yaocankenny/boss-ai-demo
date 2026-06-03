import { useState, useEffect } from 'react';
import { Result, EvidenceItem } from '../types';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  AlertCircle, 
  TrendingDown, 
  TrendingUp,
  FileCheck2, 
  ArrowUpRight,
  Sparkles,
  HelpCircle,
  Clock
} from 'lucide-react';

interface StreamedResultReportProps {
  result: Result;
  evidence: EvidenceItem[];
  onSelectEvidence: (item: EvidenceItem) => void;
}

export function StreamedResultReport({ result, evidence, onSelectEvidence }: StreamedResultReportProps) {
  const [displayedJudgment, setDisplayedJudgment] = useState('');
  const [streamedMarkdown, setStreamedMarkdown] = useState('');
  const [stage, setStage] = useState(0); // 0: typing judgment, 1: typing markdown, 2: complete

  // Restart sequence when query changes
  useEffect(() => {
    setStage(0);
    setDisplayedJudgment('');
    setStreamedMarkdown('');
    
    let judgmentTimer: number;
    let markdownTimer: number;
    
    const judgmentText = result.judgment || '';
    const markdownText = result.markdown || '';
    
    let jIndex = 0;
    const judgmentSpeed = 16; // ms per character (fast typewriter)
    
    judgmentTimer = window.setInterval(() => {
      jIndex++;
      if (jIndex >= judgmentText.length) {
        setDisplayedJudgment(judgmentText);
        window.clearInterval(judgmentTimer);
        setStage(1); // Move to typing the markdown report content
        
        let mIndex = 0;
        const markdownStepSize = 4; // Types 4 characters for smooth readable streaming
        const markdownInterval = 15; // 15ms interval for beautifully paced rendering
        
        markdownTimer = window.setInterval(() => {
          mIndex += markdownStepSize;
          if (mIndex >= markdownText.length) {
            setStreamedMarkdown(markdownText);
            window.clearInterval(markdownTimer);
            setStage(2); // Analysis fully ready, support evidence cards loaded
          } else {
            setStreamedMarkdown(markdownText.substring(0, mIndex));
          }
        }, markdownInterval);
        
      } else {
        setDisplayedJudgment(judgmentText.substring(0, jIndex));
      }
    }, judgmentSpeed);

    return () => {
      window.clearInterval(judgmentTimer);
      if (markdownTimer) {
        window.clearInterval(markdownTimer);
      }
    };
  }, [result]);

  const isJudgmentStreaming = stage === 0;
  const isMarkdownStreaming = stage === 1 && streamedMarkdown.length < (result.markdown || '').length;

  return (
    <div className="w-full bg-white border border-[#EAE5DC] rounded-xl shadow-[0_4px_22px_rgba(0,0,0,0.02)] p-6 space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-500 text-[#1A1A1A]">
      
      {/* Report Header */}
      <div className="flex items-center justify-between border-b border-[#F4EFE6] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#0F172A] flex items-center justify-center text-white">
            <Sparkles size={18} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#0F172A]">Analytical Report</span>
            <h3 className="text-base font-bold text-[#1A1A1A] mt-0.5">{result.title}</h3>
          </div>
        </div>
      </div>

      {/* Primary Executive Judgment Area */}
      <div className="space-y-4">
        <div className="p-4 bg-[#FAF8F5] border border-[#EAE5DC] rounded-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 text-[80px] font-bold text-[#0F172A]/5 select-none pointer-events-none font-mono leading-none">
            JUDGMENT
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-[#0F172A] mt-0.5 shrink-0" />
            <div className="space-y-1 z-10 font-sans">
              <h4 className="text-[#1A1A1A] font-bold text-sm leading-snug">
                {displayedJudgment}
                {isJudgmentStreaming && (
                  <span className="animate-pulse ml-0.5 text-[#0F172A] font-bold font-mono">|</span>
                )}
              </h4>
              {stage >= 1 && result.judgmentSubtitle && (
                <p className="text-xs text-[#71717A] leading-relaxed mt-1 animate-in fade-in duration-500">
                  {result.judgmentSubtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid (shown only after executive judgment completes) */}
      {stage >= 1 && result.metrics && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-in fade-in duration-500">
          {result.metrics.map((m, i) => {
            const isWorsening = m.value === 'Worsening' || m.value === 'Critical';
            const isImproving = m.value === 'High' || m.value === '90 Days' || m.value === 'Pivot';
            return (
              <div 
                key={i} 
                className="flex flex-col border border-[#EAE5DC] bg-[#FAF8F5]/30 rounded-xl p-3 hover:bg-white transition-all hover:shadow-xs"
              >
                <span className="text-[10px] text-[#A1A1AA] font-bold uppercase tracking-wider mb-1 truncate">{m.label}</span>
                <div className={`text-xs font-bold ${m.color} flex items-center gap-1.5`}>
                  <span>{m.value}</span>
                  {isWorsening && <TrendingDown size={14} className="text-[#0F172A] shrink-0" />}
                  {isImproving && !isWorsening && (m.label === 'Trend' || m.label === 'Strategy') && <TrendingUp size={14} className="text-[#0F172A] shrink-0" />}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Streaming Rich Markdown Content Area */}
      {stage >= 1 && (
        <div className="relative border border-[#F4EFE6] bg-[#FAF8F5]/20 p-5 rounded-xl animate-in fade-in duration-500">

          <div className="markdown-body text-xs leading-relaxed text-[#1A1A1A] max-w-none">
            <Markdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-sm font-bold text-[#1A1A1A] mt-6 mb-2 pb-1 border-b border-[#F4EFE6]" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xs font-bold text-gray-900 mt-5 mb-2 uppercase tracking-wide flex items-center gap-1" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mt-5 mb-2 inline-block border-l-2 border-[#0F172A] pl-2" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 text-gray-700 leading-relaxed text-[13px]" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700 text-[13px]" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-2 text-gray-700 text-[13px]" {...props} />,
                li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                table: ({node, ...props}) => (
                  <div className="overflow-x-auto my-5 border border-[#EAE5DC] rounded-xl shadow-xs bg-white">
                    <table className="w-full text-left border-collapse" {...props} />
                  </div>
                ),
                thead: ({node, ...props}) => <thead className="bg-[#FAF8F5] text-[#71717A] text-[10px] uppercase font-bold tracking-wider border-b border-[#EAE5DC]" {...props} />,
                tbody: ({node, ...props}) => <tbody className="divide-y divide-[#EAE5DC]" {...props} />,
                tr: ({node, ...props}) => <tr className="hover:bg-[#FAF8F5]/40 transition-colors" {...props} />,
                th: ({node, ...props}) => <th className="py-3 px-4 font-bold" {...props} />,
                td: ({node, ...props}) => <td className="py-3 px-4 text-xs font-semibold text-gray-800 leading-relaxed" {...props} />,
              }}
            >
              {streamedMarkdown}
            </Markdown>
            {isMarkdownStreaming && (
              <span className="inline-block animate-pulse text-[#0F172A] font-bold text-lg select-none ml-1">▋</span>
            )}
          </div>
        </div>
      )}

      {/* Supporting Evidence Chain Cards Grid (shown only after markdown concludes) */}
      {stage >= 2 && (
        <div className="pt-6 border-t border-[#F4EFE6] space-y-4 animate-in fade-in duration-700">
          <div className="flex items-center justify-between">
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#1A1A1A] flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#0F172A] flex items-center justify-center text-white shrink-0">
                <FileCheck2 size={13} />
              </div>
              Factual Evidence Gaps ({evidence.length} anchored points)
            </h4>
            <span className="text-[10px] text-[#A1A1AA] font-semibold bg-[#FAF8F5] border border-[#EAE5DC] px-2 py-0.5 rounded-md">
              💡 Click cards to trace connections
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {evidence.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => onSelectEvidence(item)}
                className="group cursor-pointer bg-[#FAF8F5]/30 hover:bg-white border border-[#EAE5DC] hover:border-[#0F172A] rounded-xl p-4 flex flex-col justify-between shadow-xs transition-all hover:shadow-[0_4px_12px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 active:translate-y-0 duration-300"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-[#0F172A] uppercase tracking-wider">Evidence {idx + 1}</span>
                    <span className="text-[9px] font-bold bg-[#0F172A]/10 text-[#0F172A] px-2 py-0.5 rounded-full">
                      {item.source}
                    </span>
                  </div>
                  
                  <h5 className="text-[13px] font-bold text-[#1A1A1A] group-hover:text-[#0F172A] transition-colors leading-snug">
                    {item.title}
                  </h5>
                  
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {item.facts[0] || "Click to see complete analytical records."}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#F4EFE6] group-hover:border-[#0F172A]/20">
                  <span className="text-[10px] text-gray-400 font-medium">Read trace details</span>
                  <div className="w-5 h-5 rounded-full bg-transparent group-hover:bg-[#0F172A]/10 flex items-center justify-center text-gray-400 group-hover:text-[#0F172A] transition-all">
                    <ArrowUpRight size={12} className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
