import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

const STORE_PREFIX = /^(Pobierz z|Pobierz w|Download on the|Get it on)\s+/i

/** "Pobierz z App Store" → small prefix line + large store name, like the store badges in the design. */
const StoreLabel: React.FC<{ label: string }> = ({ label }) => {
  const match = label.match(STORE_PREFIX)
  if (!match) return <span className="aura-store__name">{label}</span>
  return (
    <>
      <span className="aura-store__prefix">{match[1]}</span>
      <span className="aura-store__name">{label.slice(match[0].length)}</span>
    </>
  )
}

export const AuraHero: React.FC<Page['hero']> = ({ links, media, richText, type }) => {
  if (type === 'none') return null
  const hasMedia = media && typeof media === 'object'

  return (
    <section className="aura-hero" id="top">
      <div
        className={`aura-container aura-hero__grid${hasMedia ? '' : ' aura-hero__grid--single'}`}
      >
        <div className="aura-hero__copy">
          {richText && (
            <RichText
              className="aura-rich"
              content={richText}
              enableGutter={false}
              enableProse={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="aura-store">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} appearance="inline" className="aura-store__btn" label={null}>
                    <StoreLabel label={link.label} />
                  </CMSLink>
                </li>
              ))}
            </ul>
          )}
        </div>
        {hasMedia && (
          <div className="aura-hero__media">
            <Media imgClassName="aura-img" priority resource={media} />
          </div>
        )}
      </div>
    </section>
  )
}
