"use client"

import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  staggerChildren?: number
}

export function AnimatedText({ text, className, delay = 0, staggerChildren = 0.015 }: AnimatedTextProps) {
  // For staggered letter animation
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + i * staggerChildren,
        duration: 0.5,
      },
    }),
  }

  // For whole text animation
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.5,
      },
    },
  }

  // If staggerChildren is 0, animate the whole text at once
  if (staggerChildren === 0) {
    return (
      <motion.h1 className={className} variants={textVariants} initial="hidden" animate="visible">
        {text}
      </motion.h1>
    )
  }

  // Otherwise, animate each letter with a stagger effect
  return (
    <h1 className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          custom={index}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  )
}

