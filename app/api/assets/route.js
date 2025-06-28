import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

// GET /api/assets - Fetch all assets
export async function GET() {
  try {
    const assets = await prisma.asset.findMany({
      orderBy: {
        purchaseDate: 'desc'
      }
    })
    return NextResponse.json(assets)
  } catch (error) {
    console.error('Error fetching assets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch assets' },
      { status: 500 }
    )
  }
}

// POST /api/assets - Create a new asset
export async function POST(request) {
  try {
    const body = await request.json()
    const { name, category, value, purchaseDate, status, description } = body

    if (!name || !category || !value || !purchaseDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const asset = await prisma.asset.create({
      data: {
        name,
        category,
        value: parseFloat(value),
        purchaseDate: new Date(purchaseDate),
        status: status || 'active',
        description: description || null
      }
    })

    return NextResponse.json(asset, { status: 201 })
  } catch (error) {
    console.error('Error creating asset:', error)
    return NextResponse.json(
      { error: 'Failed to create asset' },
      { status: 500 }
    )
  }
}

// DELETE /api/assets - Delete an asset
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Asset ID is required' },
        { status: 400 }
      )
    }

    await prisma.asset.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Asset deleted successfully' })
  } catch (error) {
    console.error('Error deleting asset:', error)
    return NextResponse.json(
      { error: 'Failed to delete asset' },
      { status: 500 }
    )
  }
}

// PUT /api/assets - Update an asset
export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, name, category, value, purchaseDate, status, description } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Asset ID is required' },
        { status: 400 }
      )
    }

    const asset = await prisma.asset.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(category && { category }),
        ...(value && { value: parseFloat(value) }),
        ...(purchaseDate && { purchaseDate: new Date(purchaseDate) }),
        ...(status && { status }),
        ...(description !== undefined && { description })
      }
    })

    return NextResponse.json(asset)
  } catch (error) {
    console.error('Error updating asset:', error)
    return NextResponse.json(
      { error: 'Failed to update asset' },
      { status: 500 }
    )
  }
}