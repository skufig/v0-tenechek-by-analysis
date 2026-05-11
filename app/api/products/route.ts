import { NextRequest, NextResponse } from "next/server"
import { getProducts, createProduct, seedDefaultProducts, getSession } from "@/lib/db"
import { cookies } from "next/headers"

// GET - public endpoint to fetch all products
export async function GET(request: NextRequest) {
  try {
    // Seed default products if empty
    seedDefaultProducts()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || undefined
    const activeOnly = searchParams.get("active_only") !== "false"
    
    const products = getProducts({ category, active_only: activeOnly })
    
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Get products error:", error)
    return NextResponse.json({ error: "Failed to get products" }, { status: 500 })
  }
}

// POST - создать товар (только админ)
export async function POST(request: NextRequest) {
  try {
    // Check auth
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("admin_session")?.value
    
    if (!sessionId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const session = getSession(sessionId)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.price || !body.image) {
      return NextResponse.json(
        { error: "Missing required fields: name, price, image" },
        { status: 400 }
      )
    }
    
    const product = createProduct({
      name: body.name,
      category: body.category || "optimal",
      price: Number(body.price),
      old_price: body.old_price ? Number(body.old_price) : null,
      image: body.image,
      features: body.features || [],
      areas: body.areas || [],
      energy_class: body.energy_class || "A+",
      warranty: body.warranty || 3,
      badge: body.badge || null,
      rating: body.rating || 4.5,
      reviews: body.reviews || 0,
      is_active: body.is_active !== false,
      sort_order: body.sort_order || 0
    })
    
    return NextResponse.json({ product })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
