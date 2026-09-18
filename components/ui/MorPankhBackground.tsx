'use client';

export function MorPankhBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      
      {/* Top Left Feather */}
      <svg 
        className="absolute -top-32 -left-32 opacity-20 w-[600px] h-[600px] md:w-[800px] md:h-[800px] transform -rotate-45 origin-center" 
        viewBox="0 0 200 250" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="pankh-gradient" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#a3e635" />
            <stop offset="40%" stopColor="#16a34a" />
            <stop offset="80%" stopColor="#047857" />
            <stop offset="100%" stopColor="#0f766e" />
          </radialGradient>
        </defs>

        {/* Stem */}
        <path d="M 100 250 L 100 180" stroke="#854d0e" strokeWidth="3" />

        {/* Wispy Hair / Fronds Base */}
        <path d="M 100 20 C 180 50, 190 120, 100 190 C 10 120, 20 50, 100 20 Z" fill="url(#pankh-gradient)" opacity="0.3" />
        <path d="M 100 30 C 160 60, 170 110, 100 180 C 30 110, 40 60, 100 30 Z" fill="url(#pankh-gradient)" opacity="0.5" />
        <path d="M 100 40 C 140 70, 150 100, 100 170 C 50 100, 60 70, 100 40 Z" fill="url(#pankh-gradient)" />
        
        {/* Additional Fronds lines */}
        <path d="M 100 170 C 150 100, 170 50, 100 20 C 30 50, 50 100, 100 170" stroke="#047857" strokeWidth="1" fill="none" opacity="0.8" />
        <path d="M 100 170 C 140 110, 150 60, 100 25 C 50 60, 60 110, 100 170" stroke="#065f46" strokeWidth="1" fill="none" />
        
        {/* The Eye */}
        <ellipse cx="100" cy="110" rx="30" ry="38" fill="#eab308" />
        <ellipse cx="100" cy="115" rx="24" ry="32" fill="#0ea5e9" />
        <ellipse cx="100" cy="120" rx="16" ry="22" fill="#1d4ed8" />
        
        {/* Dark Center */}
        <path d="M 100 105 C 115 110, 110 135, 100 140 C 90 135, 85 110, 100 105 Z" fill="#0f172a" />
      </svg>

      {/* Bottom Right Feather */}
      <svg 
        className="absolute -bottom-32 -right-32 opacity-[0.15] w-[500px] h-[500px] md:w-[700px] md:h-[700px] transform rotate-[135deg] origin-center" 
        viewBox="0 0 200 250" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="pankh-gradient-2" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#a3e635" />
            <stop offset="40%" stopColor="#16a34a" />
            <stop offset="80%" stopColor="#047857" />
            <stop offset="100%" stopColor="#0f766e" />
          </radialGradient>
        </defs>

        {/* Stem */}
        <path d="M 100 250 L 100 180" stroke="#854d0e" strokeWidth="3" />

        {/* Wispy Hair / Fronds Base */}
        <path d="M 100 20 C 180 50, 190 120, 100 190 C 10 120, 20 50, 100 20 Z" fill="url(#pankh-gradient-2)" opacity="0.3" />
        <path d="M 100 30 C 160 60, 170 110, 100 180 C 30 110, 40 60, 100 30 Z" fill="url(#pankh-gradient-2)" opacity="0.5" />
        <path d="M 100 40 C 140 70, 150 100, 100 170 C 50 100, 60 70, 100 40 Z" fill="url(#pankh-gradient-2)" />
        
        {/* Additional Fronds lines */}
        <path d="M 100 170 C 150 100, 170 50, 100 20 C 30 50, 50 100, 100 170" stroke="#047857" strokeWidth="1" fill="none" opacity="0.8" />
        <path d="M 100 170 C 140 110, 150 60, 100 25 C 50 60, 60 110, 100 170" stroke="#065f46" strokeWidth="1" fill="none" />
        
        {/* The Eye */}
        <ellipse cx="100" cy="110" rx="30" ry="38" fill="#eab308" />
        <ellipse cx="100" cy="115" rx="24" ry="32" fill="#0ea5e9" />
        <ellipse cx="100" cy="120" rx="16" ry="22" fill="#1d4ed8" />
        
        {/* Dark Center */}
        <path d="M 100 105 C 115 110, 110 135, 100 140 C 90 135, 85 110, 100 105 Z" fill="#0f172a" />
      </svg>
      
    </div>
  );
}
