/* eslint-disable @next/next/no-img-element */
import React from 'react'

import type { ContentBlock } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

import {
  type ContentColumn,
  getNodes,
  isMediaColumn,
  splitLeadingUpload,
  uploadMedia,
} from './lexical'

const Rich: React.FC<{ content: unknown; className?: string }> = ({ content, className }) =>
  content ? (
    <RichText
      className={['aura-rich', className].filter(Boolean).join(' ')}
      content={content as Record<string, unknown>}
      enableGutter={false}
      enableProse={false}
    />
  ) : null

const ColumnLink: React.FC<{ col: ContentColumn }> = ({ col }) =>
  col.enableLink && col.link ? (
    <CMSLink {...col.link} appearance="inline" className="aura-btn" />
  ) : null

const Card: React.FC<{ col: ContentColumn }> = ({ col }) => {
  const { icon, rest } = splitLeadingUpload(col.richText)
  return (
    <div className="aura-card">
      {icon?.url && (
        <span className="aura-card__icon">
          <img alt={icon.alt || ''} height={22} src={icon.url} width={22} />
        </span>
      )}
      <Rich content={rest} />
      <ColumnLink col={col} />
    </div>
  )
}

/**
 * AURA rendering of the standard Content block (same data, different layout):
 * - "full" columns  → section header (eyebrow + heading)
 * - ≥3 text columns → card grid (a leading image in a card becomes its icon)
 * - text + image    → two-column split (text left, image right)
 */
export const AuraContent: React.FC<ContentBlock & { id?: string }> = ({ columns, id }) => {
  const cols = columns ?? []
  const header = cols.filter((c) => c.size === 'full')
  const body = cols.filter((c) => c.size !== 'full')
  const media = body.filter(isMediaColumn)
  const text = body.filter((c) => !isMediaColumn(c))
  const variant = media.length > 0 ? 'split' : text.length >= 3 ? 'cards' : 'columns'

  return (
    <section className="aura-section" id={id}>
      <div className="aura-container">
        {header.map((col, i) => (
          <div className="aura-section__header" key={i}>
            <Rich content={col.richText} />
            <ColumnLink col={col} />
          </div>
        ))}

        {variant === 'cards' && (
          <div className="aura-cards">
            {text.map((col, i) => (
              <Card col={col} key={i} />
            ))}
          </div>
        )}

        {variant === 'split' && (
          <div className="aura-split">
            <div className="aura-split__text">
              {text.map((col, i) => (
                <div className="aura-split__col" key={i}>
                  <Rich content={col.richText} />
                  <ColumnLink col={col} />
                </div>
              ))}
            </div>
            <div className="aura-split__media">
              {media.flatMap((col) =>
                getNodes(col.richText)
                  .map(uploadMedia)
                  .filter(Boolean)
                  .map((m, i) => (
                    <Media imgClassName="aura-img" key={`${m!.id}-${i}`} resource={m!} />
                  )),
              )}
            </div>
          </div>
        )}

        {variant === 'columns' && (
          <div className="aura-columns">
            {text.map((col, i) => (
              <div key={i}>
                <Rich content={col.richText} />
                <ColumnLink col={col} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
