import { Manrope, Syncopate } from 'next/font/google'
import React from 'react'

import type { Page } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'

import { AuraContent } from './AuraContent'
import { AuraFooter } from './AuraFooter'
import { type AuraCta, AuraHeader, type AuraNavItem } from './AuraHeader'
import { AuraHero } from './AuraHero'
import { slugify } from './lexical'

import './aura.css'

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  variable: '--aura-font-sans',
  display: 'swap',
})

const syncopate = Syncopate({
  subsets: ['latin', 'latin-ext'],
  weight: ['700'],
  variable: '--aura-font-display',
  display: 'swap',
})

type Block = Page['layout'][number]

const sectionId = (block: Block, index: number) =>
  block.blockName ? slugify(block.blockName) : `sekcja-${index + 1}`

/** Header CTA: the first button link found in the page's content blocks (e.g. "Przejdź do doładowań"). */
const findCta = (layout: Block[]): AuraCta => {
  for (const block of layout) {
    if (block.blockType !== 'content') continue
    const col = block.columns?.find((c) => c.enableLink && c.link)
    if (col?.link) return { ...col.link, label: 'Doładuj konto' }
  }
  return null
}

export const AuraPage: React.FC<{ page: Page }> = ({ page }) => {
  const layout = page.layout ?? []
  const nav: AuraNavItem[] = layout
    .map((block, i) => ({ id: sectionId(block, i), label: block.blockName || '' }))
    .filter((item) => item.label)

  return (
    <div className={`aura ${manrope.variable} ${syncopate.variable}`} data-theme="dark">
      <AuraHeader cta={findCta(layout)} nav={nav} />
      <main>
        <AuraHero {...page.hero} />
        {layout.map((block, i) =>
          block.blockType === 'content' ? (
            <AuraContent key={i} {...block} id={sectionId(block, i)} />
          ) : (
            <section className="aura-section" id={sectionId(block, i)} key={i}>
              <RenderBlocks blocks={[block]} />
            </section>
          ),
        )}
      </main>
      <AuraFooter />
    </div>
  )
}
