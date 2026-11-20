import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function AuraFooter() {
  const footer: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footer?.navItems || []

  return (
    <footer className="aura-footer">
      <div className="aura-container aura-footer__inner">
        <p>© {new Date().getFullYear()} TotalBet Sp. z o.o.</p>
        {navItems.length > 0 && (
          <nav aria-label="Stopka" className="aura-footer__nav">
            {navItems.map(({ link }, i) => (
              <CMSLink key={i} {...link} appearance="inline" />
            ))}
          </nav>
        )}
        <p>Tylko dla osób pełnoletnich (18+)</p>
      </div>
    </footer>
  )
}
