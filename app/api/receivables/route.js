import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

// GET /api/receivables - Fetch all receivables
export async function GET() {
  try {
    const receivables = await prisma.receivable.findMany({
      orderBy: {
        dueDate: 'asc'
      }
    })
    return NextResponse.json(receivables)
  } catch (error) {
    console.error('Error fetching receivables:', error)
    return NextResponse.json(
      { error: 'Failed to fetch receivables' },
      { status: 500 }
    )
  }
}

// POST /api/receivables - Create a new receivable
export async function POST(request) {
  try {
    const body = await request.json()
    const { description, amount, dueDate, status, client } = body

    if (!description || !amount || !dueDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const receivable = await prisma.receivable.create({
      data: {
        description,
        amount: parseFloat(amount),
        dueDate: new Date(dueDate),
        status: status || 'scheduled',
        client: client || null
      }
    })

    return NextResponse.json(receivable, { status: 201 })
  } catch (error) {
    console.error('Error creating receivable:', error)
    return NextResponse.json(
      { error: 'Failed to create receivable' },
      { status: 500 }
    )
  }
}

// DELETE /api/receivables - Delete a receivable
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Receivable ID is required' },
        { status: 400 }
      )
    }

    await prisma.receivable.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Receivable deleted successfully' })
  } catch (error) {
    console.error('Error deleting receivable:', error)
    return NextResponse.json(
      { error: 'Failed to delete receivable' },
      { status: 500 }
    )
  }
}

// PUT /api/receivables - Update a receivable
export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, description, amount, dueDate, status, client } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Receivable ID is required' },
        { status: 400 }
      )
    }

    const receivable = await prisma.receivable.update({
      where: { id },
      data: {
        ...(description && { description }),
        ...(amount && { amount: parseFloat(amount) }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
        ...(status && { status }),
        ...(client !== undefined && { client })
      }
    })

    return NextResponse.json(receivable)
  } catch (error) {
    console.error('Error updating receivable:', error)
    return NextResponse.json(
      { error: 'Failed to update receivable' },
      { status: 500 }
    )
  }
}