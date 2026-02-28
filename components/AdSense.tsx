'use client';

import { useEffect, useRef, useState } from 'react';

interface AdSenseProps {
  type: 'top' | 'middle' | 'bottom' | 'infeed' | 'inarticle' | 'multiplex';
}

const adConfig: Record<string, any> = {
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
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 광고 승인 전에는 숨김 처리
    const timer = setTimeout(() => {
      if (adRef.current) {
        const height = adRef.current.offsetHeight;
        if (height === 0) {
          setIsVisible(false);
        }
      }
    }, 2000);

    if (isLoaded.current) return;
    isLoaded.current = true;

    try {
      ((window as any).adsbygoogle = 
        (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }

    return () => clearTimeout(timer);
  }, []);

  const config = adConfig[type];

  // 광고 미승인 상태면 완전히 숨김
  if (!isVisible) return null;

  return (
    <div className="overflow-hidden text-center">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: 0 }}
        data-ad-client="ca-pub-1665608758033551"
        data-ad-slot={config.slot}
        data-ad-format={config.format}
        {...(config.fullWidth && { 
          'data-full-width-responsive': 'true' 
        })}
        {...(config.layoutKey && { 
          'data-ad-layout-key': config.layoutKey 
        })}
        {...(config.layout && { 
          'data-ad-layout': config.layout 
        })}
      />
    </div>
  );
}
