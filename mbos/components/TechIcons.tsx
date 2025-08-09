"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const technologies = [
  { name: "Figma", icon: "/figmaIcon.svg" },
  { name: "NodeJS", icon: "/nodeJsIcon.svg" },
  { name: "Photoshop", icon: "/photoshopIcon.svg" },
  { name: "NextJS", icon: "/nextJsIcon.svg" },
  { name: "Illustrator", icon: "/illustratorIcon.svg" },
  { name: "ReactJS", icon: "/reactJsIcon.svg" },
]

export default function TechIconsAnimate() {
  const [startIndex, setStartIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % technologies.length)
    }, 2500) // Увеличил время для лучшего восприятия

    return () => clearInterval(interval)
  }, [paused])

  const visibleTech = Array.from({ length: 5 }, (_, i) =>
    technologies[(startIndex + i) % technologies.length]
  )

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className="relative h-[350px] px-5 w-full max-w-[320px] overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <ul className="list-none m-0 p-0">
          <AnimatePresence>
            {visibleTech.map((tech, index) => (
              <motion.li
                key={`${tech.name}-${index}`}
                className="absolute w-full flex justify-start pl-6 items-center 
                          bg-gradient-to-r from-slate-800 to-slate-700 
                          backdrop-blur-sm border border-slate-600
                          rounded-xl h-16 text-white text-xl gap-5 my-1 
                          shadow-lg shadow-black/20 cursor-pointer
                          hover:scale-[1.03] hover:border-indigo-400 transition-all"
                initial={index === 0 ? { opacity: 0, scale: 0.8, y: 0 } : {}}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: index * 70,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    delay: index * 0.05, // Каскадная анимация
                  }
                }}
                exit={index === 4 ? { 
                  opacity: 0, 
                  y: 350,
                  transition: { duration: 0.3 }
                } : {}}
                whileHover={{ 
                  x: 5,
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image 
                    src={tech.icon || "/placeholder.svg"} 
                    alt={tech.name} 
                    fill 
                    className="object-contain" 
                  />
                </div>
                <span>{tech.name}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  )
}
