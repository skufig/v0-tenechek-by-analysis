"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const works = [
  {
    id: 1,
    image: "https://static.tildacdn.com/tild3666-6562-4230-a537-626266333763/photo.jpg",
    location: "г. Минск",
    type: "Квартира",
  },
  {
    id: 2,
    image: "https://static.tildacdn.com/tild3163-6634-4261-a361-636463393534/photo.jpg",
    location: "г. Дзержинск",
    type: "Квартира",
  },
  {
    id: 3,
    image: "https://static.tildacdn.com/tild3635-3365-4566-b662-396431363136/photo.jpg",
    location: "г. Брест",
    type: "Квартира",
  },
  {
    id: 4,
    image: "https://static.tildacdn.com/tild3163-3636-4231-b537-646633343537/photo.jpg",
    location: "г. Полоцк",
    type: "Квартира",
  },
  {
    id: 5,
    image: "https://static.tildacdn.com/tild6261-3931-4365-a130-653334613264/photo.jpg",
    location: "г. Барановичи",
    type: "Квартира",
  },
  {
    id: 6,
    image: "https://static.tildacdn.com/tild6532-3264-4466-a539-633763633639/photo.jpg",
    location: "а-г. Ратомка",
    type: "Загородный дом",
  },
  {
    id: 7,
    image: "https://static.tildacdn.com/tild3961-3632-4432-a264-613061323365/photo.jpg",
    location: "г. Минск",
    type: "Барбершоп",
  },
  {
    id: 8,
    image: "https://static.tildacdn.com/tild3839-3730-4563-b462-636363626261/photo.jpg",
    location: "г. Бобруйск",
    type: "Квартира",
  },
]

export function Portfolio() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex(prev => prev !== null ? (prev - 1 + works.length) % works.length : null)
  const nextImage = () => setLightboxIndex(prev => prev !== null ? (prev + 1) % works.length : null)

  return (
    <section id="installation" className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Наши работы
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Монтаж по всей Беларуси. Гарантия 5 лет на все работы.
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-display text-3xl font-bold text-primary">1500+</span>
              <span className="text-muted-foreground">установок<br />в 2025</span>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {works.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={work.image}
                alt={`${work.type} в ${work.location}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-medium">{work.type}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  {work.location}
                </p>
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
          <Button size="lg" variant="outline" className="h-14 px-10 rounded-xl font-semibold border-border/50">
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
              className="relative w-full max-w-4xl aspect-video mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={works[lightboxIndex].image}
                alt={`${works[lightboxIndex].type} в ${works[lightboxIndex].location}`}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
                <p className="text-lg font-semibold">{works[lightboxIndex].type}</p>
                <p className="text-muted-foreground flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4" />
                  {works[lightboxIndex].location}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
