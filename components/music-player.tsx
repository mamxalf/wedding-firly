"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  audioSrc: string;
  autoplay?: boolean;
  startPlaying?: boolean;
}

export function MusicPlayer({ 
  audioSrc, 
  autoplay = false,
  startPlaying = false 
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => {
          console.error("Error playing audio:", e);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Start playing when startPlaying prop changes to true
  useEffect(() => {
    if (startPlaying && audioRef.current && !isPlaying) {
      audioRef.current.play().catch(e => {
        console.error("Error playing audio:", e);
      });
      setIsPlaying(true);
    }
  }, [startPlaying, isPlaying]);

  // Initialize audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      
      if (autoplay) {
        // Most browsers block autoplay, this is just in case it's allowed
        audioRef.current.play().catch(e => {
          console.error("Autoplay prevented:", e);
        });
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [autoplay]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src={audioSrc} loop />
      
      <button 
        onClick={togglePlay}
        className="bg-white/80 backdrop-blur-sm hover:bg-white text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <Volume2 size={20} className="text-black" />
        ) : (
          <VolumeX size={20} className="text-black" />
        )}
      </button>
    </div>
  );
}
