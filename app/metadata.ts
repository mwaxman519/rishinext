import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Modern Web Application',
  description: 'A beautiful and modern web application built with Next.js',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  ),
  openGraph: {
    title: 'Modern Web Application',
    description: 'A beautiful and modern web application built with Next.js',
    siteName: 'Modern Web Application',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}