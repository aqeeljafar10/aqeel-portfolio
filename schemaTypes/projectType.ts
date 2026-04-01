import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'index',
      title: 'Index',
      type: 'string',
      description: 'Display number e.g. 01, 02',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      description: 'Mono label shown above the title e.g. "Smart Home · Caucasus & Central Asia"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'Active' },
          { title: 'In Progress', value: 'In progress' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Choose an icon for this project',
      options: {
        list: [
          { title: 'Trending Up', value: 'TrendingUp' },
          { title: 'Brain / AI', value: 'Brain' },
          { title: 'People / Mentor', value: 'Users' },
          { title: 'Megaphone / Brand', value: 'Megaphone' },
          { title: 'Stethoscope / Medicine', value: 'Stethoscope' },
          { title: 'Globe', value: 'Globe' },
          { title: 'Building', value: 'Building2' },
        ],
      },
    }),
  ],
  orderings: [
    {
      title: 'Index',
      name: 'indexAsc',
      by: [{ field: 'index', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'tag' },
  },
})
