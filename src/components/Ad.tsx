
import React from 'react';

interface AdProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  layout?: 'in-article' | 'display';
  className?: string;
  type?: 'banner' | 'interstitial';
}

const Ad = (props: AdProps) => {
  // All ads are disabled. This component no longer displays any ads.
  return null;
};

export default Ad;
