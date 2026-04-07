import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Stats from '@/components/Stats'
import Thesis from '@/components/Thesis'
import ActiveBuild from '@/components/ActiveBuild'
import TrackRecord from '@/components/TrackRecord'
import Engagement from '@/components/Engagement'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import NoiseOverlay from '@/components/NoiseOverlay'

// Only fetch from Sanity when env vars are present
async function getSanityData() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return { projects: undefined, track: undefined }
  }

  try {
    const { client } = await import('@/sanity/lib/client')
    const { projectsQuery, trackRecordQuery } = await import('@/sanity/lib/queries')

    const [projects, track] = await Promise.all([
      client.fetch(projectsQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(trackRecordQuery, {}, { next: { revalidate: 60 } }),
    ])

    return {
      projects: projects?.length ? projects : undefined,
      track: track?.length ? track : undefined,
    }
  } catch {
    // If Sanity is unreachable, fall back to hardcoded data
    return { projects: undefined, track: undefined }
  }
}

export default async function Home() {
  const { projects, track } = await getSanityData()

  return (
    <main>
      <CustomCursor />
      <ScrollProgress />
      <NoiseOverlay />
      <Navigation />
      <Hero />
      <Marquee />
      <Stats />
      <Thesis />
      <ActiveBuild />
      <TrackRecord />
      <Engagement />
      <Footer />
    </main>
  )
}
