
import React from 'react';
import { HintPackage, hintPackages } from '@/data/hintPackages';
import HintPackageCard from './HintPackageCard';
import { cn } from '@/lib/utils';

interface HintPackagesGridProps {
  loading: string | null;
  onPurchase: (pkg: HintPackage) => void;
  className?: string;
}

const HintPackagesGrid: React.FC<HintPackagesGridProps> = ({ loading, onPurchase, className }) => {
  return (
    <div className={cn("grid grid-cols-1 gap-4 md:gap-6", className)}>
      {hintPackages.map((pkg) => (
        <HintPackageCard
          key={pkg.id}
          pkg={pkg}
          loading={loading}
          onPurchase={onPurchase}
        />
      ))}
    </div>
  );
};

export default HintPackagesGrid;
