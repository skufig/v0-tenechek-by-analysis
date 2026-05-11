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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200"
            >
              <div className={`shrink-0 w-12 h-12 rounded-xl ${badge.bg} flex items-center justify-center`}>
                <badge.icon className={`h-6 w-6 ${badge.color}`} />
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-sm">{badge.title}</div>
                <div className="text-xs text-slate-500">{badge.desc}</div>
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
          <p className="text-sm text-slate-500 mb-6">Официальный дилер ведущих брендов</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
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
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
