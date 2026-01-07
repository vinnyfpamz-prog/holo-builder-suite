import React from 'react';
import { useAudio } from '@/contexts/AudioContext';
import { Button, ButtonProps } from './button';

export const SoundButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, onMouseEnter, ...props }, ref) => {
    const { playClickSound, playHoverSound } = useAudio();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      playClickSound();
      onClick?.(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      playHoverSound();
      onMouseEnter?.(e);
    };

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        {...props}
      />
    );
  }
);

SoundButton.displayName = 'SoundButton';
