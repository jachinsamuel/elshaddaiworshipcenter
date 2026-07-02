import { useEffect } from 'react'

const SITE_NAME = 'El Shaddai Worship Center'

// Updates the document title and meta description on route change. This
// helps real browsers (tab titles), bookmarks, and Google's crawler (which
// does execute JS) — but NOT link-preview bots like WhatsApp/Facebook's,
// which only read the static index.html without running JavaScript. See
// the "Social sharing previews" section in README.md for what that means
// in practice and how to get true per-page previews later if needed.
export default function Seo({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    document.title = fullTitle

    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [title, description])

  return null
}
