import React, { useState, useRef, useEffect } from 'react';

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Attempt autoplay on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2; // 20% Volume as requested
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            console.log("Autoplay blocked, waiting for user interaction.");
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 
         NOTE: Please ensure a file named 'bgm.mp3' exists in the root directory (next to index.html).
         The browser will try to load this file.
      */}
      <audio 
        ref={audioRef} 
        loop 
        src="bgm.mp3" 
      />
      <button
        onClick={togglePlay}
        className={`flex items-center justify-center w-12 h-12 rounded-full border shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 group ${
          isPlaying 
            ? 'bg-guilin-gold/20 border-guilin-gold text-guilin-gold animate-[spin_4s_linear_infinite]' 
            : 'bg-guilin-panel/80 border-white/20 text-slate-400 hover:text-white hover:border-white/50'
        }`}
        title={isPlaying ? "暂停背景音乐" : "播放背景音乐"}
      >
        {isPlaying ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 pl-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default BackgroundMusic;