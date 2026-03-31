//@ts-nocheck
import { CollectionConfig } from 'payload'
import CustomMediaSelection from '@/components/CustomMediaSelection'

export const Articles: CollectionConfig = {
  slug: 'Articles',
  labels: {
    singular: 'Articles',
    plural: 'Articles',
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'type',
      label: 'Post Type In English',
      type: 'text',
      required: true,
    },
    {
      name: 'typeAr',
      label: 'Post Type In Arabic',
      type: 'text',
      required: true,
    },
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
    {
      name: 'des',
      label: 'Post Description In English',
      type: 'text',
      required: true,
    },
    {
      name: 'desAr',
      label: 'Post Description In Arabic',
      type: 'text',
      required: true,
    },
    {
      name: 'PostDes',
      label: 'Post Long Description',
      type: 'richText',
    },
    {
      name: 'PostDesAr',
      label: 'Post Long Description In Arabic',
      type: 'richText',
    },
    {
      name: 'isImportant',
      label: 'Is Important',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark this post as important (maximum 3 allowed).',
      },
      hooks: {
        beforeChange: [
          async ({ value, req, originalDoc }) => {
            if (value === true) {
              const payload = req.payload
              const { totalDocs } = await payload.find({
                collection: 'Articles',
                where: {
                  and: [{ isImportant: { equals: true } }, { id: { not_equals: originalDoc?.id } }],
                },
                limit: 0,
              })

              if (totalDocs >= 3) {
                throw new Error('You can only have up to 3 important articles.')
              }
            }

            return value
          },
        ],
      },
    },
    {
      name: 'image',
      label: 'Post Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        components: {
          Field: CustomMediaSelection,
        },
      },
    },
    {
      name: 'HighlightImage',
      label: 'Background Image For Important Articles',
      type: 'upload',
      relationTo: 'media',
      admin: {
        components: {
          Field: CustomMediaSelection,
        },
      },
    },
    {
      name: 'keyword',
      label: 'Keywords (English)',
      type: 'array',
      labels: {
        singular: 'Keyword',
        plural: 'Keywords',
      },
      required: false,
      fields: [
        {
          name: 'value',
          label: 'Keyword',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'keywordAr',
      label: 'Keywords (Arabic)',
      type: 'array',
      labels: {
        singular: 'الكلمة المفتاحية',
        plural: 'الكلمات المفتاحية',
      },
      required: false,
      fields: [
        {
          name: 'value',
          label: 'الكلمة المفتاحية',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
