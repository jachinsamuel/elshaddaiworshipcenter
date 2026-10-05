import { useEffect } from 'react'

const DEFAULT_TITLE = 'El Shaddai Worship Center | Church in Nagercoil, Tamil Nadu'
const BASE_URL = 'https://www.elshaddaiworshipcenter.org'

function setMetaTag(selector, attribute, attributeValue, content) {
  let tag = document.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, attributeValue)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

export default function Seo({ title, description, path = '' }) {
  useEffect(() => {
    const isHome = !title || title === 'Home'
    const fullTitle = isHome ? DEFAULT_TITLE : `${title} | El Shaddai Worship Center Nagercoil`
    document.title = fullTitle

    const fullDescription =
      description ||
      'Welcome to El Shaddai Worship Center in Nagercoil, Tamil Nadu. Join our church family for Sunday worship services, Friday fasting prayer, and live sermons with Pr. S. John Jeyakumar.'
    const canonicalUrl = `${BASE_URL}${path || window.location.pathname}`

    // Standard meta tags
    setMetaTag('meta[name="description"]', 'name', 'description', fullDescription)

    // OpenGraph tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', fullDescription)
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl)

    // Twitter tags
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', fullDescription)

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)
  }, [title, description, path])

  return null
}
