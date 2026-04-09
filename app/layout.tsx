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
  title: 'Dr. Aqeel Jafar — Physician, AI Pioneer & Venture Architect',
  description:
    'Dr. Aqeel Jafar is a physician, AI pioneer, and venture architect building at the convergence of healthcare, artificial intelligence, and entrepreneurship. Co-founder of Meloc. Based in Georgia.',
  metadataBase: new URL('https://aqeeljafar.com'),
  keywords: [
    'Aqeel Jafar',
    'Dr Aqeel Jafar',
    'physician founder',
    'healthcare AI',
    'medical entrepreneur',
    'AI pioneer healthcare',
    'Meloc',
    'Medventure Group',
    'clinical AI',
    'health tech founder',
    'Georgia physician',
    'venture architect',
  ],
  alternates: {
    canonical: 'https://aqeeljafar.com',
  },
  openGraph: {
    title: 'Dr. Aqeel Jafar — Physician, AI Pioneer & Venture Architect',
    description:
      'Physician-founder building where clinical medicine, artificial intelligence, and entrepreneurship converge. Co-founder of Meloc. Open to advisory, investment, and collaboration.',
    url: 'https://aqeeljafar.com',
    siteName: 'Aqeel Jafar',
    locale: 'en_US',
    type: 'profile',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Dr. Aqeel Jafar — Physician, AI Pioneer & Venture Architect',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Aqeel Jafar — Physician, AI Pioneer & Venture Architect',
    description:
      'Physician-founder building where clinical medicine, AI, and entrepreneurship converge.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aqeel Jafar',
  honorificPrefix: 'Dr.',
  jobTitle: 'Physician, AI Pioneer & Venture Architect',
  description:
    'Dr. Aqeel Jafar is a physician-founder building at the convergence of healthcare, artificial intelligence, and entrepreneurship — from clinical AI workflow research to cross-border smart home ventures.',
  url: 'https://aqeeljafar.com',
  email: 'aqeel@melocsmart.ge',
  image: 'https://aqeeljafar.com/opengraph-image',
  sameAs: [
    'https://www.linkedin.com/in/aqeeljafar10/',
  ],
  worksFor: [
    {
      '@type': 'Organization',
      name: 'Meloc',
      url: 'https://melocsmart.ge',
      description: 'Smart home automation brand operating across Georgia, Azerbaijan, Uzbekistan, and Armenia.',
    },
    {
      '@type': 'Organization',
      name: 'Medventure Group',
      description: 'Healthcare and education holding company — Medwizard Education, Travo Tours, Medventa Residences.',
    },
  ],
  knowsAbout: [
    'Healthcare AI',
    'Clinical Informatics',
    'Medical Entrepreneurship',
    'Healthcare Infrastructure',
    'Cross-border Operations',
    'Smart Home Technology',
    'Brand Architecture',
    'Venture Building',
  ],
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Physician',
      occupationLocation: { '@type': 'Place', name: 'Georgia' },
    },
    {
      '@type': 'Occupation',
      name: 'Co-Founder & Managing Director',
      worksFor: { '@type': 'Organization', name: 'Meloc' },
    },
    {
      '@type': 'Occupation',
      name: 'Digital Infrastructure & Brand Lead',
      worksFor: { '@type': 'Organization', name: 'Medventure Group' },
    },
  ],
  nationality: { '@type': 'Country', name: 'Pakistan' },
  homeLocation: { '@type': 'Place', name: 'Georgia' },
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
