import type { Access, PayloadRequest, Where } from 'payload'

/*
 * Content is readable over REST / GraphQL only with credentials: a logged-in session or an
 * API key (`Authorization: users API-Key <key>`, enabled per user in the admin panel).
 * Server-side reads through the Local API (`payloadAPI === 'local'`), which is how the
 * Next.js website renders pages, stay allowed so the public site keeps working.
 */
export const isLocalOrAuthenticated = (req: PayloadRequest): boolean =>
  Boolean(req.user) || req.payloadAPI === 'local'

export const localOrAuthenticated: Access = ({ req }) => isLocalOrAuthenticated(req)

/** Authenticated: everything. Local API without a user: only documents matching `where`. API without credentials: nothing. */
export const authenticatedOrLocalWhere =
  (where: Where): Access =>
  ({ req }) => {
    if (req.user) return true
    if (req.payloadAPI === 'local') return where
    return false
  }

/**
 * Media: the document list / API requires credentials, but the files themselves
 * (`/api/media/file/...`) stay public because the website renders them in <img> tags.
 */
export const mediaRead: Access = ({ isReadingStaticFile, req }) =>
  Boolean(isReadingStaticFile) || isLocalOrAuthenticated(req)
