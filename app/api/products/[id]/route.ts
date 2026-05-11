import { NextRequest, NextResponse } from "next/server"
import { getProductById, updateProduct, deleteProduct, getSession } from "@/lib/db"
import { cookies } from "next/headers"

// GET - получить один товар
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = getProductById(Number(id))
    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    
    return NextResponse.json({ product })
  } catch (error) {
    console.error("Get product error:", error)
    return NextResponse.json({ error: "Failed to get product" }, { status: 500 })
  }
}

// PATCH - обновить товар (только админ)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    
    const { id } = await params
    const body = await request.json()
    
    const product = updateProduct(Number(id), {
      name: body.name,
      category: body.category,
      price: body.price !== undefined ? Number(body.price) : undefined,
      old_price: body.old_price !== undefined ? (body.old_price ? Number(body.old_price) : null) : undefined,
      image: body.image,
      features: body.features,
      areas: body.areas,
      energy_class: body.energy_class,
      warranty: body.warranty,
      badge: body.badge,
      rating: body.rating,
      reviews: body.reviews,
      is_active: body.is_active,
      sort_order: body.sort_order
    })
    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    
    return NextResponse.json({ product })
  } catch (error) {
    console.error("Update product error:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

// DELETE - удалить товар (только админ)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    
    const { id } = await params
    const deleted = deleteProduct(Number(id))
    
    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete product error:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
