import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { localOrAuthenticated } from '../access/localOrAuthenticated'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: localOrAuthenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
