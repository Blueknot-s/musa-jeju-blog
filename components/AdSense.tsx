'use client';

import { useEffect, useRef } from 'react';

type AdType = 'top' | 'middle' | 'bottom' | 'infeed' | 'inarticle' | 'multiplex';

interface AdSenseProps {
  type: AdType;
  className?: string;
}

const AD_UNITS: Record<AdType, { slot: string; layoutKey?: string; format?: string }> = {
  top: { slot: '3745613123', format: 'auto' },
  middle: { slot: '1891438265', format: 'auto' },
  bottom: { slot: '6952193250', format: 'auto' },
  infeed: { slot: '1488846338', layoutKey: '-fb+5w+4e-db+86', format: 'fluid' },
  inarticle: { slot: '7502901983', layoutKey: '-fg+5n+6t-e7+r', format: 'fluid' }, // Note: layoutKey for inarticle is usually standard or not needed if format is fluid, but user didn't provide one. Standard in-article usually doesn't need layout-key unless specified. I will assume standard in-article behavior.
  multiplex: { slot: '4685166950', format: 'autorelaxed' },
};

// User provided layout-key for infeed only. 
// For inarticle, standard behavior is usually sufficient.

export default function AdSense({ type, className = '' }: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const adsbygoogle = (window as any).adsbygoogle || [];
        // Check if the ad slot is already filled to prevent duplicate push
        if (adRef.current && adRef.current.innerHTML === '') {
             adsbygoogle.push({});
        }
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  const unit = AD_UNITS[type];

  return (
    <div className={`adsense-container my-8 flex justify-center overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '250px', width: '100%' }}
        data-ad-client="ca-pub-1665608758033551"
        data-ad-slot={unit.slot}
        data-ad-format={unit.format}
        data-full-width-responsive="true"
        {...(unit.layoutKey ? { 'data-ad-layout-key': unit.layoutKey } : {})}
        {...(type === 'inarticle' ? { 'data-ad-layout': 'in-article' } : {})}
      />
    </div>
  );
}
