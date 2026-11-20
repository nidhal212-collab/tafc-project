import { MetadataRoute } from 'next'
import { categories, products } from '@/lib/products-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tafc.tn'
  const locales = ['', '/en', '/ar'] // fr is the default locale and stays unprefixed
  const now = new Date()

  const languageAlternates = (path: string) =>
    Object.fromEntries(locales.map((loc) => [loc || 'fr', `${baseUrl}${loc}${path}`]))

  // Static pages
  const staticPaths = ['', '/products', '/about', '/contact', '/privacy', '/terms']
  const staticPages: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : path === '/products' ? 0.9 : 0.7,
    alternates: {
      languages: languageAlternates(path),
    },
  }))

  // Product detail pages
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
    alternates: {
      languages: languageAlternates(`/products/${product.slug}`),
    },
  }))

  return [...staticPages, ...productPages]
}
