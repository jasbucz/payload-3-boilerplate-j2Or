import type { Media as MediaType, Page } from '@/payload-types'

type RichText = { root: { children: LexicalNode[] } } & Record<string, unknown>
export type LexicalNode = { type: string; children?: LexicalNode[]; [key: string]: unknown }

export type ContentColumn = NonNullable<
  Extract<Page['layout'][number], { blockType: 'content' }>['columns']
>[number]

const isBlankParagraph = (node: LexicalNode) =>
  node.type === 'paragraph' && (!node.children || node.children.length === 0)

export const getNodes = (richText: unknown): LexicalNode[] =>
  (richText as RichText | null | undefined)?.root?.children ?? []

export const withNodes = (richText: unknown, children: LexicalNode[]) => {
  const rt = richText as RichText
  return { ...rt, root: { ...rt.root, children } }
}

export const uploadMedia = (node: LexicalNode): MediaType | null =>
  node.type === 'upload' && node.value && typeof node.value === 'object'
    ? (node.value as MediaType)
    : null

/** Column whose rich text contains only image uploads (blank paragraphs ignored). */
export const isMediaColumn = (col: ContentColumn) => {
  const nodes = getNodes(col.richText).filter((n) => !isBlankParagraph(n))
  return nodes.length > 0 && nodes.every((n) => n.type === 'upload') && !col.enableLink
}

/** Splits a leading image upload (used as a card icon) from the remaining rich text. */
export const splitLeadingUpload = (richText: unknown) => {
  const nodes = getNodes(richText)
  const first = nodes[0]
  const icon = first ? uploadMedia(first) : null
  return { icon, rest: icon ? withNodes(richText, nodes.slice(1)) : richText }
}

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ł/g, 'l')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
