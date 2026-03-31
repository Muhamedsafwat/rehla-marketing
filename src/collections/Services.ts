//@ts-nocheck
import { CollectionConfig } from 'payload'
import CustomMediaSelection from '@/components/CustomMediaSelection'
export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
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
      label: 'Title (EN)',
      type: 'text',
      required: true,
    },
    {
      name: 'titleAr',
      label: 'Title (AR)',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description (EN)',
      type: 'textarea',
    },
    {
      name: 'descriptionAr',
      label: 'Description (AR)',
      type: 'textarea',
    },
    {
      name: 'content',
      label: 'Service Content',
      type: 'array',
      labels: {
        singular: 'Service Item',
        plural: 'Service Items',
      },
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            components: {
              Field: CustomMediaSelection,
            },
          },
        },
        {
          name: 'des',
          label: 'Description (EN)',
          type: 'text',
        },
        {
          name: 'desAr',
          label: 'Description (AR)',
          type: 'text',
        },
      ],
    },
  ],
}
