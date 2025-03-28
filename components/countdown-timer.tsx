"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CountdownTimerProps {
  targetDate: string
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // If the date has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    // Calculate immediately
    calculateTimeLeft()

    // Then set up the interval
    const timer = setInterval(calculateTimeLeft, 1000)

    // Clear interval on component unmount
    return () => clearInterval(timer)
  }, [targetDate])

  const countdownVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  }

  const numberVariants = {
    changed: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      className="flex justify-center gap-4 md:gap-8"
      variants={countdownVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      <motion.div className="text-center" variants={countdownVariants}>
        <motion.div
          className="text-3xl md:text-5xl font-light"
          key={timeLeft.days}
          animate="changed"
          variants={numberVariants}
        >
          {timeLeft.days}
        </motion.div>
        <div className="text-xs md:text-sm uppercase tracking-wider mt-2">Days</div>
      </motion.div>

      <motion.div className="text-center" variants={countdownVariants}>
        <motion.div
          className="text-3xl md:text-5xl font-light"
          key={timeLeft.hours}
          animate="changed"
          variants={numberVariants}
        >
          {timeLeft.hours}
        </motion.div>
        <div className="text-xs md:text-sm uppercase tracking-wider mt-2">Hours</div>
      </motion.div>

      <motion.div className="text-center" variants={countdownVariants}>
        <motion.div
          className="text-3xl md:text-5xl font-light"
          key={timeLeft.minutes}
          animate="changed"
          variants={numberVariants}
        >
          {timeLeft.minutes}
        </motion.div>
        <div className="text-xs md:text-sm uppercase tracking-wider mt-2">Minutes</div>
      </motion.div>

      <motion.div className="text-center" variants={countdownVariants}>
        <motion.div
          className="text-3xl md:text-5xl font-light"
          key={timeLeft.seconds}
          animate="changed"
          variants={numberVariants}
        >
          {timeLeft.seconds}
        </motion.div>
        <div className="text-xs md:text-sm uppercase tracking-wider mt-2">Seconds</div>
      </motion.div>
    </motion.div>
  )
}

