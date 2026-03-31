//@ts-nocheck
import { CollectionConfig } from 'payload'
import CustomMediaSelection from '@/components/CustomMediaSelection'

export const ServedPlaces: CollectionConfig = {
  slug: 'ServedPlaces',
  labels: {
    singular: 'Served Place',
    plural: 'Served Places',
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
      label: 'Slider Title',
      type: 'text',
      required: true,
    },
    {
      name: 'reverse',
      label: 'Reverse Direction',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'If checked, the slider scrolls in the opposite direction',
      },
    },
    {
      name: 'logos',
      label: 'Logos',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'image',
          label: 'Logo Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            components: {
              Field: CustomMediaSelection,
            },
          },
        },
      ],
    },
  ],
}
