//@ts-nocheck
import { CollectionConfig } from 'payload'
import CustomMediaSelection from '@/components/CustomMediaSelection'

export const Works: CollectionConfig = {
  slug: 'Works',
  labels: {
    singular: 'Works',
    plural: 'Works',
  },
  admin: {
    useAsTitle: 'Name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'Name',
      label: 'Name (EN)',
      type: 'text',
      required: true,
    },
    {
      name: 'NameAr',
      label: 'Name (AR)',
      type: 'text',
      required: true,
    },
    {
      name: 'ClientName',
      label: 'Client Name (EN)',
      type: 'text',
      required: true,
    },
    {
      name: 'ClientNameAr',
      label: 'Client Name (AR)',
      type: 'text',
      required: true,
    },
    {
      name: 'Subtitle',
      label: 'Subtitle (EN)',
      type: 'textarea',
      required: true,
    },
    {
      name: 'SubtitleAr',
      label: 'Subtitle (AR)',
      type: 'textarea',
      required: true,
    },
    {
      name: 'LongDes',
      label: 'Long Description (EN)',
      type: 'textarea',
      required: true,
    },
    {
      name: 'LongDesAr',
      label: 'Long Description (AR)',
      type: 'textarea',
      required: true,
    },
    {
      name: 'locations',
      label: 'Locations',
      type: 'relationship',
      relationTo: 'Locations',
      required: true,
    },
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
      required: true,
    },
  ],
}
