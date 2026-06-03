import { memo } from 'react';
import { NodeCategory } from '../types';

interface OntologyNodeProps {
  data: {
    label: string;
    category: NodeCategory;
    isActive: boolean;
    isPulse: boolean;
    isVisible?: boolean;
    isDummy?: boolean;
  };
  x: number;
  y: number;
  isHovered?: boolean;
  isDimmed?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const getCategoryDetails = (category: string, isActive: boolean) => {
  if (!isActive) {
    return {
      bg: 'bg-white/95',
      borderClass: 'border-[#F1ECE4]',
      badgeBg: 'bg-[#F5F2EC] text-[#A1A1AA]',
      textClass: 'text-[#8E8E93]',
      accentColor: '#EAE5DC'
    };
  }
  
  switch (category) {
    case 'Strategic':
      return {
        bg: 'bg-gradient-to-br from-white to-[#FAF6F0]',
        borderClass: 'border-[#B25E2C]',
        badgeBg: 'bg-[#FAF0E6] text-[#B25E2C]',
        textClass: 'text-[#1A1A1A]',
        accentColor: '#B25E2C'
      };
    case 'Business':
      return {
        bg: 'bg-gradient-to-br from-white to-[#F0F5FA]',
        borderClass: 'border-blue-500/60',
        badgeBg: 'bg-blue-50 text-blue-700',
        textClass: 'text-[#1A1A1A]',
        accentColor: '#3B82F6'
      };
    case 'Organization':
      return {
        bg: 'bg-gradient-to-br from-white to-[#F0FAF5]',
        borderClass: 'border-emerald-500/60',
        badgeBg: 'bg-emerald-50 text-emerald-700',
        textClass: 'text-[#1A1A1A]',
        accentColor: '#10B981'
      };
    case 'Evidence':
      return {
        bg: 'bg-white/90',
        borderClass: 'border-zinc-300',
        badgeBg: 'bg-zinc-100 text-zinc-600',
        textClass: 'text-[#2D2D2D]',
        accentColor: '#71717A'
      };
    case 'Execution':
    default:
      return {
        bg: 'bg-gradient-to-br from-white to-[#FFFBF5]',
        borderClass: 'border-[#D98A3C]',
        badgeBg: 'bg-[#FFF3E5] text-[#D98A3C]',
        textClass: 'text-[#1A1A1A]',
        accentColor: '#D98A3C'
      };
  }
};

const getIcon = (label: string) => {
  const lower = label.toLowerCase();
  if (lower.includes('meeting')) return '📅';
  if (lower.includes('issue')) return '🚨';
  if (lower.includes('risk')) return '⚠️';
  if (lower.includes('owner')) return '👤';
  if (lower.includes('customer')) return '🤝';
  if (lower.includes('commitment') || lower.includes('milestone')) return '🎯';
  if (lower.includes('action item') || lower.includes('sub-task') || lower.includes('task')) return '✅';
  if (lower.includes('progress') || lower.includes('report') || lower.includes('trend')) return '📈';
  if (lower.includes('judgment') || lower.includes('rule') || lower.includes('heuristic')) return '🧠';
  if (lower.includes('payment') || lower.includes('receipt')) return '💳';
  if (lower.includes('revenue') || lower.includes('ledger') || lower.includes('invoice')) return '💰';
  if (lower.includes('contract') || lower.includes('addendum')) return '📜';
  if (lower.includes('project') || lower.includes('sprint') || lower.includes('charter')) return '🚀';
  if (lower.includes('management') || lower.includes('dashboard') || lower.includes('alert')) return '📊';
  if (lower.includes('unit') || lower.includes('center')) return '🏢';
  if (lower.includes('org') || lower.includes('team') || lower.includes('hierarchy')) return '🌐';
  if (lower.includes('product') || lower.includes('sku')) return '📦';
  if (lower.includes('growth')) return '🌱';
  if (lower.includes('evidence') || lower.includes('log') || lower.includes('score') || lower.includes('matrix')) return '🔍';
  return '📁';
};

export const CustomNode = memo(({ data, x, y, isHovered, isDimmed, onMouseEnter, onMouseLeave }: OntologyNodeProps) => {
  const { label, isActive, isPulse, isVisible = true, isDummy } = data as any;
  const category = (data as any).category || 'Execution';
  
  const styleConfig = getCategoryDetails(category, isActive);

  return (
    <div
      className={`absolute flex items-center justify-center pointer-events-auto transition-all duration-500 origin-center
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
        ${isPulse ? 'animate-node-glow-pulse z-30' : 'z-10'}
        ${isHovered ? 'scale-105 z-40' : ''}
        ${isDimmed ? 'opacity-30 blur-[0.3px]' : ''}
      `}
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div 
        className={`flex flex-col relative transition-all duration-500 border rounded-xl select-none shadow-sm
          ${styleConfig.bg}
          ${styleConfig.borderClass}
          ${isDummy ? 'px-3 py-1.5 min-w-[120px] max-w-[160px]' : 'px-5 py-3 min-w-[170px] max-w-[240px]'}
          ${isPulse ? 'border-2 animate-border-rotate ring-2 ring-[#D98A3C]/20' : ''}
          ${isHovered ? 'shadow-md border-[#D98A3C] translate-y-[-2px]' : ''}
        `}
      >
        {/* Dynamic Category Badge at top */}
        {!isDummy && (
          <div className="flex items-center justify-between w-full mb-1.5">
            <span className={`text-[9px] font-mono tracking-wider uppercase font-bold px-1.5 py-0.5 rounded-md ${styleConfig.badgeBg}`}>
              {category}
            </span>
            <span className="text-[10px] opacity-45 font-mono">#{category[0]}</span>
          </div>
        )}

        {/* Node label layout with icon */}
        <div className="flex items-center gap-2">
          <span className={`${isDummy ? 'text-xs' : 'text-sm'} shrink-0`} role="img" aria-label="node-icon">
            {getIcon(label)}
          </span>
          <span className={`${isDummy ? 'text-xs font-medium text-zinc-600' : 'text-sm font-semibold'} truncate leading-tight tracking-tight ${styleConfig.textClass}`}>
            {label}
          </span>
        </div>

        {/* Decorative corner accent indicator */}
        {isActive && (
          <div 
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" 
            style={{ backgroundColor: styleConfig.accentColor }}
          />
        )}
      </div>
    </div>
  );
});

CustomNode.displayName = 'CustomNode';
