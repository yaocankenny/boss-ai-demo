import { useState } from 'react';

interface UserAvatarProps {
  className?: string;
  roundedClass?: string; // e.g. "rounded" or "rounded-full"
}

export function UserAvatar({ className = "w-8 h-8", roundedClass = "rounded" }: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);
  
  const avatarUrl = "/src/assets/images/kaifu_lee_avatar_1780427360073.png";

  if (imageError) {
    return (
      <div 
        className={`${className} ${roundedClass} bg-gradient-to-tr from-[#8B5CF6] via-[#B48242] to-[#EC4899] flex items-center justify-center shrink-0 border border-[#FAF8F5]/20 text-white font-mono font-bold text-xs shadow-inner uppercase select-none`}
        title="Dr. Kaifu Lee"
      >
        KL
      </div>
    );
  }

  return (
    <div className={`${className} ${roundedClass} overflow-hidden shrink-0 bg-zinc-800 flex items-center justify-center relative shadow-sm border border-[#EAE5DC]/30`}>
      <img 
        src={avatarUrl} 
        alt="Dr. Kaifu Lee" 
        className="w-full h-full object-cover" 
        referrerPolicy="no-referrer"
        onError={() => setImageError(true)}
      />
    </div>
  );
}
