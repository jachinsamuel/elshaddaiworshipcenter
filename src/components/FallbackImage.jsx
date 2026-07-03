import { useState } from 'react'
import { ImageOff } from 'lucide-react'

// Drop-in <img> replacement with shimmer loading state and error fallback.
// Renders as a Fragment containing a shimmer overlay + the actual <img>.
//
// The PARENT element must have `relative` and `overflow-hidden` for the
// shimmer to display correctly. Most image containers in this codebase
// already satisfy both requirements.
export default function FallbackImage({ src, alt = '', className = '', ...props }) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  if (errored || !src) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center bg-stone-100"
        role="img"
        aria-label={alt}
      >
        <ImageOff size={28} className="text-stone-300" />
      </div>
    )
  }

  return (
    <>
      {!loaded && <div className="absolute inset-0 shimmer z-[1]" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        {...props}
      />
    </>
  )
}
