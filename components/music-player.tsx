"use client";

import { useState, useRef, useEffect } from "react";
import { Pause, Play } from "lucide-react";

interface MusicPlayerProps {
  audioSrc: string;
  autoplay?: boolean;
  startPlaying?: boolean;
  onStateChange?: (isPlaying: boolean) => void;
}

export function MusicPlayer({ 
  audioSrc, 
  autoplay = false,
  startPlaying = false,
  onStateChange
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Track if user has manually paused
  const [userPaused, setUserPaused] = useState(false);
  // Track previous startPlaying value to detect changes
  const prevStartPlayingRef = useRef(startPlaying);
  
  // Update the state and notify parent component
  const updatePlayingState = (playing: boolean) => {
    setIsPlaying(playing);
    if (onStateChange) {
      onStateChange(playing);
    }
  };
  
  // Create audio element on mount
  useEffect(() => {
    // Only create the audio object if it doesn't exist
    if (!audioRef.current) {
      const audio = new Audio(audioSrc);
      audio.loop = true;
      audio.volume = 0.5;
      // Set initial time position to 1:24 (84 seconds)
      audio.currentTime = 84;
      audioRef.current = audio;
      
      // Define event handler functions
      const handlePlay = () => updatePlayingState(true);
      const handlePause = () => updatePlayingState(false);
      const handleEnded = () => updatePlayingState(false);
      
      // Add event listeners to sync UI state with actual audio state
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);
      
      // Store the handlers on the ref for cleanup
      const handlers = { handlePlay, handlePause, handleEnded };
      (audio as any).handlers = handlers;
    }
    
    return () => {
      // Clean up
      if (audioRef.current) {
        const audio = audioRef.current;
        const handlers = (audio as any).handlers;
        
        audio.pause();
        if (handlers) {
          audio.removeEventListener('play', handlers.handlePlay);
          audio.removeEventListener('pause', handlers.handlePause);
          audio.removeEventListener('ended', handlers.handleEnded);
        }
        // Don't set to null here to prevent recreation
      }
    };
  }, [audioSrc]);
  
  // Handle play/pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      // Mark that user has manually paused
      setUserPaused(true);
      // State will be updated via the pause event listener
    } else {
      // Set the start position to 1:24 (84 seconds) if at the beginning
      if (audioRef.current.currentTime < 1) {
        audioRef.current.currentTime = 84;
      }
      const playPromise = audioRef.current.play();
      
      // User is manually playing, clear the paused flag
      setUserPaused(false);
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Error playing audio:", error);
          // Make sure UI is in sync if play fails
          updatePlayingState(false);
        });
      }
    }
  };
  
  // Start playing when startPlaying prop changes to true
  useEffect(() => {
    // Only respond to startPlaying changes, not initial render
    if (prevStartPlayingRef.current !== startPlaying) {
      prevStartPlayingRef.current = startPlaying;
      
      // Only play if startPlaying becomes true AND user hasn't manually paused
      if (startPlaying && audioRef.current && !userPaused) {
        // Set the start position to 1:24 (84 seconds)
        audioRef.current.currentTime = 84;
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Error auto-playing audio:", error);
          });
        }
      }
    }
  }, [startPlaying, userPaused]); // Depend on startPlaying and userPaused
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative group">
        {/* Vinyl disc with rotating animation */}
        <div 
          className={`relative w-16 h-16 rounded-full bg-black shadow-lg overflow-hidden ${isPlaying ? 'animate-spin-slow' : ''}`}
          style={{ animationDuration: '3s', animationIterationCount: 'infinite', animationTimingFunction: 'linear' }}
        >
          {/* Vinyl grooves */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-2 border-gray-700"></div>
            <div className="w-10 h-10 rounded-full border-2 border-gray-700"></div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-700"></div>
            <div className="w-2 h-2 rounded-full bg-gray-500"></div>
          </div>
          
          {/* Center hole */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>
        </div>
        
        {/* Play/Pause button */}
        <button 
          onClick={togglePlay}
          className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all duration-300 hover:scale-105"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Pause size={16} className="text-black" />
          ) : (
            <Play size={16} className="text-black" />
          )}
        </button>
      </div>
    </div>
  );
}
