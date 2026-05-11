"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const works = [
  {
    id: 1,
    image: "https://static.tildacdn.com/tild3666-6562-4230-a537-626266333763/photo.jpg",
    location: "Минск",
    type: "Квартира",
    model: "LG EVO MAX",
  },
  {
    id: 2,
    image: "https://static.tildacdn.com/tild3163-6634-4261-a361-636463393534/photo.jpg",
    location: "Дзержинск",
    type: "Квартира",
    model: "Gree G-Tech",
  },
  {
    id: 3,
    image: "https://static.tildacdn.com/tild3635-3365-4566-b662-396431363136/photo.jpg",
    location: "Брест",
    type: "Квартира",
    model: "Haier Flexis",
  },
  {
    id: 4,
    image: "https://static.tildacdn.com/tild3163-3636-4231-b537-646633343537/photo.jpg",
    location: "Полоцк",
    type: "Квартира",
    model: "LG EVO MAX",
  },
  {
    id: 5,
    image: "https://static.tildacdn.com/tild6261-3931-4365-a130-653334613264/photo.jpg",
    location: "Барановичи",
    type: "Квартира",
    model: "Dahatsu Comfort",
  },
  {
    id: 6,
    image: "https://static.tildacdn.com/tild6532-3264-4466-a539-633763633639/photo.jpg",
    location: "Ратомка",
    type: "Загородный дом",
    model: "Haier Jade",
  },
  {
    id: 7,
    image: "https://static.tildacdn.com/tild3961-3632-4432-a264-613061323365/photo.jpg",
    location: "Минск",
    type: "Барбершоп",
    model: "Gree G-Tech",
  },
  {
    id: 8,
    image: "https://static.tildacdn.com/tild3839-3730-4563-b462-636363626261/photo.jpg",
    location: "Бобруйск",
    type: "Квартира",
    model: "Eurohoff EVA",
  },
]

const stats = [
  { value: "1500+", label: "установок в 2025" },
  { value: "6", label: "областей Беларуси" },
  { value: "5 лет", label: "гарантия на работы" },
]

export function Portfolio() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex(prev => prev !== null ? (prev - 1 + works.length) % works.length : null)
  const nextImage = () => setLightboxIndex(prev => prev !== null ? (prev + 1) % works.length : null)

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pattern" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <p className="text-primary font-medium mb-2">Портфолио</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
              Наши работы
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Профессиональный монтаж по всей Беларуси. Каждая установка — с гарантией качества 5 лет.
            </p>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex lg:flex-col gap-6 lg:gap-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex-1 lg:flex-none">
                <p className="font-display text-3xl lg:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {works.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                index === 0 || index === 5 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'
              }`}
              onClick={() => openLightbox(index)}
            >
              <Image
                src={work.image}
                alt={`${work.type} в г. ${work.location}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-sm font-semibold">{work.type}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  г. {work.location}
                </p>
                <p className="text-xs text-primary mt-1">{work.model}</p>
              </div>
              
              {/* Zoom icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center">
                  <ZoomIn className="h-5 w-5 text-foreground" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <Button size="lg" variant="outline" className="h-14 px-10 rounded-xl font-semibold border-border">
            Смотреть все работы
          </Button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors z-10"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </button>
            
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-video mx-4 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={works[lightboxIndex].image}
                alt={`${works[lightboxIndex].type} в г. ${works[lightboxIndex].location}`}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
                <p className="text-xl font-semibold">{works[lightboxIndex].type}</p>
                <p className="text-muted-foreground flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4" />
                  г. {works[lightboxIndex].location}
                </p>
                <p className="text-primary mt-1">{works[lightboxIndex].model}</p>
              </div>
            </motion.div>
            
            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-secondary text-sm">
              {lightboxIndex + 1} / {works.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
