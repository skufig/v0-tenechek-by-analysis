"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { 
  ArrowLeft, Plus, Pencil, Trash2, Eye, EyeOff, GripVertical,
  Search, Filter, X, Save, Loader2, ImagePlus, Check
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  name: string
  category: string
  price: number
  old_price: number | null
  image: string
  features: string[]
  areas: string[]
  energy_class: string
  warranty: number
  badge: string | null
  rating: number
  reviews: number
  is_active: boolean
  sort_order: number
}

const categories = [
  { id: "all", label: "Все" },
  { id: "premium", label: "Премиум" },
  { id: "optimal", label: "Оптимальные" },
  { id: "budget", label: "Бюджет" },
]

const energyClasses = ["A+++", "A++", "A+", "A", "B", "C"]

export default function ProductsAdminPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState<Partial<Product>>({})
  const [featuresInput, setFeaturesInput] = useState("")
  const [areasInput, setAreasInput] = useState("")

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products?active_only=false")
      if (res.status === 401) {
        router.push("/admin/login")
        return
      }
      const data = await res.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }

  function openEditModal(product: Product) {
    setEditingProduct(product)
    setFormData(product)
    setFeaturesInput(product.features.join(", "))
    setAreasInput(product.areas.join(", "))
    setIsCreating(false)
  }

  function openCreateModal() {
    setEditingProduct(null)
    setFormData({
      name: "",
      category: "optimal",
      price: 0,
      old_price: null,
      image: "",
      features: [],
      areas: [],
      energy_class: "A+",
      warranty: 3,
      badge: null,
      rating: 4.5,
      reviews: 0,
      is_active: true,
      sort_order: products.length + 1
    })
    setFeaturesInput("")
    setAreasInput("")
    setIsCreating(true)
  }

  function closeModal() {
    setEditingProduct(null)
    setIsCreating(false)
    setFormData({})
  }

  async function handleSave() {
    setSaving(true)
    
    const payload = {
      ...formData,
      features: featuresInput.split(",").map(f => f.trim()).filter(Boolean),
      areas: areasInput.split(",").map(a => a.trim()).filter(Boolean),
      price: Number(formData.price),
      old_price: formData.old_price ? Number(formData.old_price) : null,
      warranty: Number(formData.warranty),
      rating: Number(formData.rating),
      reviews: Number(formData.reviews),
      sort_order: Number(formData.sort_order),
    }

    try {
      const url = isCreating ? "/api/products" : `/api/products/${editingProduct?.id}`
      const method = isCreating ? "POST" : "PATCH"
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        await fetchProducts()
        closeModal()
      } else {
        const error = await res.json()
        alert(error.error || "Ошибка сохранения")
      }
    } catch (error) {
      console.error("Save error:", error)
      alert("Ошибка сохранения")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Удалить товар? Это действие нельзя отменить.")) return
    
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" })
      if (res.ok) {
        await fetchProducts()
      }
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  async function toggleActive(product: Product) {
    try {
      await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !product.is_active })
      })
      await fetchProducts()
    } catch (error) {
      console.error("Toggle error:", error)
    }
  }

  const filteredProducts = products
    .filter(p => filter === "all" || p.category === filter)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Назад</span>
              </Link>
              <div className="h-6 w-px bg-slate-200" />
              <h1 className="text-xl font-bold text-slate-900">Управление товарами</h1>
            </div>
            <Button onClick={openCreateModal} className="gap-2">
              <Plus className="h-4 w-4" />
              Добавить товар
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Поиск по названию..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === cat.id
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-xl border overflow-hidden transition-all ${
                product.is_active ? "border-slate-200" : "border-orange-300 bg-orange-50/50"
              }`}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-slate-100">
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2 py-1 text-xs font-bold bg-blue-600 text-white rounded-full z-10">
                    {product.badge}
                  </span>
                )}
                {!product.is_active && (
                  <span className="absolute top-3 right-3 px-2 py-1 text-xs font-bold bg-orange-500 text-white rounded-full z-10">
                    Скрыт
                  </span>
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-slate-900">{product.name}</h3>
                  <span className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded">
                    {product.category}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xl font-bold text-slate-900">{product.price} BYN</span>
                  {product.old_price && (
                    <span className="text-sm text-slate-400 line-through">{product.old_price} BYN</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {product.features.slice(0, 3).map((f) => (
                    <span key={f} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded">
                      {f}
                    </span>
                  ))}
                  {product.features.length > 3 && (
                    <span className="px-2 py-0.5 text-xs bg-slate-100 text-slate-500 rounded">
                      +{product.features.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => openEditModal(product)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Изменить
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActive(product)}
                    className={product.is_active ? "" : "border-green-500 text-green-600 hover:bg-green-50"}
                  >
                    {product.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">Товары не найдены</p>
          </div>
        )}
      </main>

      {/* Edit/Create Modal */}
      {(editingProduct || isCreating) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h2 className="text-lg font-bold">
                {isCreating ? "Добавить товар" : "Редактировать товар"}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Название</label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                  placeholder="LG EVO MAX"
                />
              </div>

              {/* Category + Energy Class */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Категория</label>
                  <select
                    value={formData.category || "optimal"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                  >
                    <option value="premium">Премиум</option>
                    <option value="optimal">Оптимальные</option>
                    <option value="budget">Бюджет</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Класс энергии</label>
                  <select
                    value={formData.energy_class || "A+"}
                    onChange={(e) => setFormData({ ...formData, energy_class: e.target.value })}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                  >
                    {energyClasses.map((ec) => (
                      <option key={ec} value={ec}>{ec}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price + Old Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Цена (BYN)</label>
                  <input
                    type="number"
                    value={formData.price || ""}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                    placeholder="1500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Старая цена (BYN)</label>
                  <input
                    type="number"
                    value={formData.old_price || ""}
                    onChange={(e) => setFormData({ ...formData, old_price: e.target.value ? Number(e.target.value) : null })}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                    placeholder="1800"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">URL изображения</label>
                <input
                  type="url"
                  value={formData.image || ""}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                  placeholder="https://..."
                />
                {formData.image && (
                  <div className="mt-2 relative w-32 h-24 bg-slate-100 rounded-lg overflow-hidden">
                    <Image src={formData.image} alt="Preview" fill className="object-contain" />
                  </div>
                )}
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Характеристики (через запятую)
                </label>
                <input
                  type="text"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                  placeholder="Wi-Fi, Инвертор, 19 дБ, Обогрев -25°C"
                />
              </div>

              {/* Areas */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Площади (через запятую)
                </label>
                <input
                  type="text"
                  value={areasInput}
                  onChange={(e) => setAreasInput(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                  placeholder="20 м², 25 м², 35 м²"
                />
              </div>

              {/* Warranty + Badge */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Гарантия (лет)</label>
                  <input
                    type="number"
                    value={formData.warranty || ""}
                    onChange={(e) => setFormData({ ...formData, warranty: Number(e.target.value) })}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                    placeholder="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Бейдж</label>
                  <input
                    type="text"
                    value={formData.badge || ""}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value || null })}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                    placeholder="Хит продаж"
                  />
                </div>
              </div>

              {/* Rating + Reviews + Sort */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Рейтинг</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating || ""}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                    placeholder="4.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Отзывы</label>
                  <input
                    type="number"
                    value={formData.reviews || ""}
                    onChange={(e) => setFormData({ ...formData, reviews: Number(e.target.value) })}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Порядок</label>
                  <input
                    type="number"
                    value={formData.sort_order || ""}
                    onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                    placeholder="1"
                  />
                </div>
              </div>

              {/* Active */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                  className={`w-12 h-7 rounded-full transition-colors ${
                    formData.is_active ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform mx-1 ${
                    formData.is_active ? "translate-x-5" : ""
                  }`} />
                </button>
                <span className="text-sm text-slate-700">Показывать на сайте</span>
              </div>
            </div>

            <div className="flex gap-3 p-4 border-t border-slate-200 bg-slate-50">
              <Button variant="outline" className="flex-1" onClick={closeModal}>
                Отмена
              </Button>
              <Button className="flex-1" onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Сохранение...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Сохранить
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
