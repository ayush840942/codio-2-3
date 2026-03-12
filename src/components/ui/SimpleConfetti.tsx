import React, { useMemo } from 'react';

// Pure CSS confetti — zero requestAnimationFrame, zero setState updates, zero mobile jank.
// Each piece uses a CSS keyframe animation — GPU-composited and extremely efficient.
const COLORS = ['#f43f5e', '#3b82f6', '#eab308', '#22c55e', '#a855f7', '#f97316', '#06b6d4'];

const confettiKeyframes = `
@keyframes confetti-fall {
  0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
  80%  { opacity: 1; }
  100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
}
`;

const SimpleConfetti = ({ numberOfPieces = 80 }: { numberOfPieces?: number; width?: number; height?: number; recycle?: boolean }) => {
    const pieces = useMemo(() => {
        return Array.from({ length: numberOfPieces }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            color: COLORS[i % COLORS.length],
            duration: Math.random() * 2 + 2,
            delay: Math.random() * 2,
        }));
    }, [numberOfPieces]);

    return (
        <>
            <style>{confettiKeyframes}</style>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden', zIndex: 9999 }}>
                {pieces.map(p => (
                    <div
                        key={p.id}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: `${p.left}%`,
                            width: p.width,
                            height: p.height,
                            backgroundColor: p.color,
                            borderRadius: p.id % 3 === 0 ? '50%' : '2px',
                            animation: `confetti-fall ${p.duration}s ${p.delay}s ease-in forwards`,
                            willChange: 'transform',
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export default SimpleConfetti;
