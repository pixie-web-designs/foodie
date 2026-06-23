/* Component for Turnstile Captcha */
"use client";

import { env } from "@/lib/env";
import { Turnstile } from "@marsidev/react-turnstile";

interface TurnstileCaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

const TurnstileCaptcha = ({ onVerify, onExpire }: TurnstileCaptchaProps) => {
  return (
    <Turnstile
      siteKey={env.turnstileSiteKey!}
      onSuccess={token => {
        onVerify(token);
      }}
      onExpire={() => {
        onExpire?.();
      }}
    />
  );
};

export default TurnstileCaptcha;
