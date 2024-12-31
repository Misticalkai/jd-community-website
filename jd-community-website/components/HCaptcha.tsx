'use client';

import { useEffect, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

interface HCaptchaProps {
  onVerify: (token: string) => void;
}

export default function HCaptchaComponent({ onVerify }: HCaptchaProps) {
  const captchaRef = useRef<HCaptcha>(null);

  useEffect(() => {
    if (captchaRef.current) {
      captchaRef.current.execute();
    }
  }, []);

  return (
    <HCaptcha
      sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ''}
      onVerify={onVerify}
      ref={captchaRef}
    />
  );
}

