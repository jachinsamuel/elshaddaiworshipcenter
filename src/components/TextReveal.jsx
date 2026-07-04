import * as React from "react"
import { motion, useInView } from "framer-motion"

export default function TextReveal({
  text,
  as: Tag = "p",
  splitBy = "words",
  staggerDelay = 0.05,
  duration = 0.5,
  once = true,
  className,
}) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once, margin: "0px 0px -10% 0px" })

  const units =
    splitBy === "words"
      ? text
          .split(/\s+/)
          .map((w, i, arr) => (i < arr.length - 1 ? w + "\u00A0" : w))
      : text.split("")

  const AnyTag = Tag

  return (
    <AnyTag
      ref={ref}
      className={`leading-relaxed ${className || ""}`}
      aria-label={text}
    >
      {units.map((unit, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.08, filter: "blur(6px)", y: 2 }}
          animate={
            isInView
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0.08, filter: "blur(6px)", y: 2 }
          }
          transition={{
            duration,
            delay: i * staggerDelay,
            ease: "easeOut",
          }}
          style={{ display: "inline-block" }}
          className="will-change-[opacity,filter,transform]"
        >
          {unit}
        </motion.span>
      ))}
    </AnyTag>
  )
}
