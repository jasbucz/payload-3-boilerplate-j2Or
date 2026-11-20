/* eslint-disable @next/next/no-img-element */
import React from 'react'

export const AuraLogo: React.FC<{ className?: string }> = ({ className }) => (
  <span className={['aura-logo', className].filter(Boolean).join(' ')}>
    <img
      alt=""
      aria-hidden
      className="aura-logo__mark"
      height={40}
      src="/aura/logo-mark.svg"
      width={40}
    />
    <img
      alt="AURA"
      className="aura-logo__word"
      height={21}
      src="/aura/logo-wordmark.svg"
      width={141}
    />
  </span>
)
