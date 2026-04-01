import { defineField, defineType } from 'sanity'

export const trackRecordType = defineType({
  name: 'trackRecord',
  title: 'Track Record',
  type: 'document',
  fields: [
    defineField({
      name: 'period',
      title: 'Period',
      type: 'string',
      description: 'e.g. "2022 — Present"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'org',
      title: 'Organisation',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'geo',
      title: 'Geography / Entities',
      type: 'string',
      description: 'e.g. "Georgia · Azerbaijan · Uzbekistan · Armenia"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Globe', value: 'Globe' },
          { title: 'Building', value: 'Building2' },
          { title: 'Stethoscope / Medicine', value: 'Stethoscope' },
          { title: 'Trending Up', value: 'TrendingUp' },
          { title: 'Brain / AI', value: 'Brain' },
          { title: 'Users / Mentor', value: 'Users' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'role', subtitle: 'org' },
  },
})
