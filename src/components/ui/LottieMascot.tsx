import React from 'react';
import { cn } from '@/lib/utils';
import CodioMascot, { CodioPose } from './CodioMascot';

export type LottieMascotPose = CodioPose;

interface LottieMascotProps {
    pose?: LottieMascotPose;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    animated?: boolean;
    onClick?: () => void;
}

const LottieMascot: React.FC<LottieMascotProps> = ({
    pose = 'welcome',
    size = 'md',
    className,
    animated = true,
    onClick
}) => {
    // We now use CodioMascot as the primary premium mascot
    // for that "Duolingo" integrated vector feel.
    return (
        <CodioMascot
            pose={pose}
            size={size}
            className={className}
            animated={animated}
            onClick={onClick}
        />
    );
};

export default LottieMascot;
