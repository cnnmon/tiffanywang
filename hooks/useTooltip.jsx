import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import WaveText from '../components/WaveText';
import { useMousePosition } from '../pages/_app';

function TooltipElement({ text, mousePosition, wave }) {
  if (typeof window === 'undefined') return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        fontSize: '18px',
        left: mousePosition.x + 10,
        top: mousePosition.y + 10,
        fontFamily: 'wavetext',
        background: '#e2dde8',
        border: '2px solid rgb(84, 54, 94)',
        color: 'rgb(84, 54, 94)',
        padding: '0px 5px',
        height: 27,
        zIndex: 10,
      }}
    >
      {wave ? <WaveText text={text} gradient={false} /> : text}
    </div>,
    document.body,
  );
}

export function useTooltip() {
  const mousePosition = useMousePosition();
  const [tooltip, setTooltip] = useState(null);

  const showTooltip = useCallback((text, wave = false) => {
    setTooltip({ text, wave });
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltip(null);
  }, []);

  const Tooltip = tooltip ? (
    <TooltipElement text={tooltip.text} mousePosition={mousePosition} wave={tooltip.wave} />
  ) : null;

  return { showTooltip, hideTooltip, Tooltip };
}
