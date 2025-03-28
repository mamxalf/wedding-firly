"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView, type Variants } from "framer-motion"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  id?: string
  variants?: Variants
  transition?: {
    duration?: number
    delay?: number
    ease?: string
    type?: string
    stiffness?: number
    damping?: number
  }
}

export function AnimatedSection({
  children,
  className,
  id,
  variants,
  transition = { duration: 0.5, delay: 0.2 },
  ...props
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const defaultVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants || defaultVariants}
      transition={transition}
      {...props}
    >
      {children}
    </motion.section>
  )
}

