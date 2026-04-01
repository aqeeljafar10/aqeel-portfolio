import type { Metadata } from 'next'
import { Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Aqeel Jafar — Physician. AI Pioneer. Founder. Operator.',
  description:
    'AI pioneer and physician-founder building at the convergence of healthcare, artificial intelligence, entrepreneurship, and brand — from clinical informatics to asset-light diagnostic infrastructure.',
  metadataBase: new URL('https://aqeeljafar.com'),
  openGraph: {
    title: 'Aqeel Jafar — Physician. AI Pioneer. Founder. Operator.',
    description:
      'Building where clinical medicine, artificial intelligence, entrepreneurship, and brand converge.',
    url: 'https://aqeeljafar.com',
    siteName: 'Aqeel Jafar',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aqeel Jafar — Physician. AI Pioneer. Founder. Operator.',
    description:
      'Building where clinical medicine, artificial intelligence, entrepreneurship, and brand converge.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aqeel Jafar',
  jobTitle: 'Physician, AI Pioneer & Founder',
  description:
    'AI pioneer and physician-founder building at the convergence of healthcare, artificial intelligence, entrepreneurship, and brand building.',
  url: 'https://aqeeljafar.com',
  knowsAbout: [
    'Healthcare AI',
    'Clinical Informatics',
    'Diagnostic Infrastructure',
    'Healthcare Entrepreneurship',
    'Cross-border Operations',
  ],
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Physician',
      occupationLocation: { '@type': 'Place', name: 'Georgia' },
    },
    {
      '@type': 'Occupation',
      name: 'Managing Director',
      worksFor: { '@type': 'Organization', name: 'Meloc' },
    },
    {
      '@type': 'Occupation',
      name: 'Operator',
      worksFor: { '@type': 'Organization', name: 'Medventure Group' },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg text-fg font-mono antialiased">{children}</body>
    </html>
  )
}
