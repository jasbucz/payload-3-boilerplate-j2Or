import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'

import { AuraLogo } from './AuraLogo'

export type AuraNavItem = { id: string; label: string }
export type AuraCta = React.ComponentProps<typeof CMSLink> | null

export const AuraHeader: React.FC<{ nav: AuraNavItem[]; cta: AuraCta }> = ({ nav, cta }) => (
  <header className="aura-header">
    <div className="aura-container aura-header__inner">
      <Link aria-label="AURA – strona główna" className="aura-header__brand" href="#top">
        <AuraLogo />
      </Link>
      <nav aria-label="Sekcje strony" className="aura-header__nav">
        {nav.map((item) => (
          <a className="aura-header__link" href={`#${item.id}`} key={item.id}>
            {item.label}
          </a>
        ))}
        {cta && <CMSLink {...cta} appearance="inline" className="aura-btn aura-btn--sm" />}
      </nav>
    </div>
  </header>
)
