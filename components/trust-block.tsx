"use client"

import { motion } from "framer-motion"
import { Shield, Award, BadgeCheck, Clock } from "lucide-react"

const brands = [
  { name: "LG", logo: "/brands/lg.svg" },
  { name: "Haier", logo: "/brands/haier.svg" },
  { name: "Gree", logo: "/brands/gree.svg" },
  { name: "Midea", logo: "/brands/midea.svg" },
  { name: "Daikin", logo: "/brands/daikin.svg" },
]

const badges = [
  { 
    icon: BadgeCheck, 
    title: "Официальный дилер",
    desc: "Сертифицированная продукция",
    color: "text-blue-600",
    bg: "bg-blue-100"
  },
  { 
    icon: Shield, 
    title: "Гарантия до 10 лет",
    desc: "На оборудование и монтаж",
    color: "text-green-600",
    bg: "bg-green-100"
  },
  { 
    icon: Award, 
    title: "1500+ установок",
    desc: "За 5 лет работы",
    color: "text-purple-600",
    bg: "bg-purple-100"
  },
  { 
    icon: Clock, 
    title: "Монтаж за 3 часа",
    desc: "Стандартная установка",
    color: "text-orange-600",
    bg: "bg-orange-100"
  },
]

export function TrustBlock() {
  return (
    <section className="relative py-12 overflow-hidden border-y border-slate-200 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10"
        >
          {badges.map((badge, i) => (
              <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
            >
              <div className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${badge.bg} flex items-center justify-center shadow-sm`}>
                <badge.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${badge.color}`} />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-slate-900 text-xs sm:text-sm leading-tight truncate">{badge.title}</div>
                <div className="text-[10px] sm:text-xs text-slate-500 truncate">{badge.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Brand logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6">Официальный дилер ведущих брендов</p>
          <div className="flex flex-wrap items-center justify-center gap-5 xs:gap-6 sm:gap-8 md:gap-12">
            {brands.map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  style={{ width: "auto" }}
                  className="h-5 xs:h-6 sm:h-8 md:h-10 object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
