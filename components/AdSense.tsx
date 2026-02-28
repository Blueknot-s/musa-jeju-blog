'use client';

import { useEffect, useRef } from 'react';

interface AdSenseProps {
  type: 'top' | 'middle' | 'bottom' | 'infeed' | 'inarticle' | 'multiplex';
}

interface AdConfigItem {
  slot: string;
  format: string;
  fullWidth?: boolean;
  layoutKey?: string;
  layout?: string;
}

const adConfig: Record<AdSenseProps['type'], AdConfigItem> = {
  top: { slot: '3745613123', format: 'auto', fullWidth: true },
  middle: { slot: '1891438265', format: 'auto', fullWidth: true },
  bottom: { slot: '6952193250', format: 'auto', fullWidth: true },
  infeed: { slot: '1488846338', format: 'fluid', layoutKey: '-fb+5w+4e-db+86' },
  inarticle: { slot: '7502901983', format: 'fluid', layout: 'in-article' },
  multiplex: { slot: '4685166950', format: 'autorelaxed' },
};

export default function AdSense({ type }: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;
    if (!adRef.current) return;
    
    const hasAd = adRef.current.getAttribute('data-adsbygoogle-status');
    if (hasAd) return;

    try {
      isLoaded.current = true;
      ((window as any).adsbygoogle = 
        (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  const config = adConfig[type];

  return (
    <div className="overflow-hidden text-center min-h-0">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '0' }}
        data-ad-client="ca-pub-1665608758033551"
        data-ad-slot={config.slot}
        data-ad-format={config.format}
        {...(config.fullWidth && { 'data-full-width-responsive': 'true' })}
        {...('layoutKey' in config && { 
          'data-ad-layout-key': config.layoutKey 
        })}
        {...('layout' in config && { 
          'data-ad-layout': config.layout 
        })}
      />
    </div>
  );
}
