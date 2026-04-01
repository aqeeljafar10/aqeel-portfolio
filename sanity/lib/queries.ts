import { groq } from 'next-sanity'

export const projectsQuery = groq`
  *[_type == "project"] | order(index asc) {
    index,
    tag,
    title,
    description,
    status,
    icon
  }
`

export const trackRecordQuery = groq`
  *[_type == "trackRecord"] | order(_createdAt asc) {
    period,
    role,
    org,
    geo,
    description,
    icon
  }
`
