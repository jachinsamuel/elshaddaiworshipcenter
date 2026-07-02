// A smooth mountain-ridge silhouette used at section seams across the site
// (hero, subpage headers, footer). Renders as a true vector shape instead of
// a CSS clip-path, so it never looks like a broken/jagged render artifact.
//
// peakUp:   ridge rises UP from the bottom of its parent — used to transition
//           out of a section (e.g. hero video) into the section below.
// peakDown: ridge hangs DOWN from the top of its parent, and is meant to be
//           positioned with a negative top offset so it overlaps the bottom
//           of whatever section comes before it (used at the top of the footer).
export default function RidgeDivider({ color, peakUp = false, peakDown = false, className = '' }) {
  const upPath =
    'M0,100 L0,58 C80,30 140,72 220,48 C300,24 360,76 440,52 C520,28 580,80 660,56 C740,32 800,78 880,54 C960,30 1020,74 1100,50 C1180,26 1240,70 1320,46 C1370,32 1410,38 1440,30 L1440,100 Z'
  const downPath =
    'M0,0 L0,42 C80,70 140,28 220,52 C300,76 360,24 440,48 C520,72 580,20 660,44 C740,68 800,22 880,46 C960,70 1020,26 1100,50 C1180,74 1240,30 1320,54 C1370,68 1410,62 1440,70 L1440,0 Z'

  return (
    <svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`absolute left-0 right-0 w-full h-12 sm:h-16 pointer-events-none ${
        peakUp ? 'bottom-0 translate-y-px' : ''
      } ${peakDown ? 'top-0' : ''} ${className}`}
    >
      <path d={peakDown ? downPath : upPath} fill={color} />
    </svg>
  )
}
