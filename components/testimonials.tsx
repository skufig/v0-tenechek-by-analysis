"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Александр Петров",
    location: "Минск",
    rating: 5,
    text: "Отличный сервис! Кондиционер Gree установили за 2 часа, всё аккуратно, чисто. Мастера профессионалы своего дела. Работает тихо, охлаждает быстро. Рекомендую!",
    product: "Gree G-Tech 12",
    date: "Март 2026",
    avatar: "АП",
  },
  {
    id: 2,
    name: "Елена Смирнова",
    location: "Брест",
    rating: 5,
    text: "Долго выбирала кондиционер, консультант помог определиться с моделью под мой бюджет. Доставили на следующий день, установка прошла без проблем. Очень довольна покупкой!",
    product: "LG EVO MAX",
    date: "Февраль 2026",
    avatar: "ЕС",
  },
  {
    id: 3,
    name: "Игорь Козлов",
    location: "Гродно",
    rating: 5,
    text: "Заказывал 2 кондиционера в квартиру. Приехали вовремя, установили за полдня. Качество монтажа на высоте — все провода спрятаны, трасса ровная. Гарантию дали на 5 лет.",
    product: "Haier Flexis",
    date: "Январь 2026",
    avatar: "ИК",
  },
  {
    id: 4,
    name: "Марина Волкова",
    location: "Витебск",
    rating: 5,
    text: "Оформила рассрочку по карте Халва — всё быстро и без лишних документов. Кондиционер работает отлично уже второй месяц. Спасибо за оперативность и качество!",
    product: "Eurohoff EVA",
    date: "Декабрь 2025",
    avatar: "МВ",
  },
  {
    id: 5,
    name: "Дмитрий Новиков",
    location: "Могилёв",
    rating: 5,
    text: "Устанавливали кондиционер в офис. Приятно удивило отношение к клиенту — всё объяснили, показали, дали рекомендации по эксплуатации. Буду обращаться ещё!",
    product: "Gree G-Tech 18",
    date: "Ноябрь 2025",
    avatar: "ДН",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Отзывы
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold tracking-tight text-balance">
            Что говорят<br />наши клиенты
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Более 1500 довольных клиентов по всей Беларуси. Читайте реальные отзывы о нашей работе.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {[
            { value: "4.9", label: "Средняя оценка" },
            { value: "1500+", label: "Отзывов" },
            { value: "98%", label: "Рекомендуют" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-serif font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-16 z-10">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:border-primary transition-colors"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-16 z-10">
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:border-primary transition-colors"
              aria-label="Следующий отзыв"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Main Testimonial */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center px-8 lg:px-16"
            >
              <Quote className="h-12 w-12 text-primary/20 mx-auto mb-6" />
              
              <p className="text-xl lg:text-2xl font-medium leading-relaxed mb-8 text-balance">
                &ldquo;{testimonials[currentIndex].text}&rdquo;
              </p>

              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < testimonials[currentIndex].rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-border"
                    )}
                  />
                ))}
              </div>

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold text-primary mb-3">
                  {testimonials[currentIndex].avatar}
                </div>
                <div className="font-semibold">{testimonials[currentIndex].name}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3" />
                  {testimonials[currentIndex].location}
                </div>
                <div className="text-sm text-primary mt-2">
                  {testimonials[currentIndex].product} • {testimonials[currentIndex].date}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-border hover:bg-primary/50"
                )}
                aria-label={`Перейти к отзыву ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Grid of mini testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
