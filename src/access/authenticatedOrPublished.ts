import { authenticatedOrLocalWhere } from './localOrAuthenticated'

/**
 * Logged-in users and API-key requests see everything (incl. drafts);
 * the website (Local API) sees published documents; anonymous REST/GraphQL sees nothing.
 */
export const authenticatedOrPublished = authenticatedOrLocalWhere({
  _status: {
    equals: 'published',
  },
})
