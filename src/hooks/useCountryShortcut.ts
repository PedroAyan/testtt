import { useRef, useState, type TouchEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { safePreference } from '../services/preferences';
import type { ContinentId } from '../types/continent';

export function useCountryShortcut(id?: ContinentId) {
  const navigate = useNavigate();
  const start = useRef<{ x: number; y: number } | null>(null);
  const [showHint, setShowHint] = useState(() => !safePreference('exploradores:paises-hint:v1'));
  const dismissHint = () => {
    safePreference('exploradores:paises-hint:v1', '1');
    setShowHint(false);
  };
  return {
    showHint,
    dismissHint,
    onTouchStart(event: TouchEvent<HTMLElement>) {
      const touch = event.touches[0];
      start.current = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
    },
    onTouchCancel() { start.current = null; },
    onTouchEnd(event: TouchEvent<HTMLElement>) {
      const touch = event.changedTouches[0], previous = start.current;
      start.current = null;
      if (id && id !== 'antartida' && previous && touch && touch.clientY - previous.y > 70 && Math.abs(touch.clientX - previous.x) < 60) {
        dismissHint();
        navigate(`/paises/${id}`);
      }
    },
  };
}
