//@ts-nocheck
import { CollectionConfig } from 'payload'
import CustomMediaSelection from '@/components/CustomMediaSelection'

export const Locations: CollectionConfig = {
  slug: 'Locations',
  labels: {
    singular: 'Locations',
    plural: 'Locations',
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Post Title In English',
      type: 'text',
      required: true,
    },
    {
      name: 'titleAr',
      label: 'Post Title In Arabic',
      type: 'text',
      required: true,
    },
  ],
}
