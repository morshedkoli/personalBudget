import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

// GET /api/income - Fetch all income records
export async function GET() {
  try {
    const income = await prisma.income.findMany({
      orderBy: {
        date: 'desc'
      }
    })
    return NextResponse.json(income)
  } catch (error) {
    console.error('Error fetching income:', error)
    return NextResponse.json(
      { error: 'Failed to fetch income' },
      { status: 500 }
    )
  }
}

// POST /api/income - Create a new income record
export async function POST(request) {
  try {
    const body = await request.json()
    const { source, amount, type, recurring, date } = body

    if (!source || !amount || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const income = await prisma.income.create({
      data: {
        source,
        amount: parseFloat(amount),
        type,
        recurring: Boolean(recurring),
        date: date ? new Date(date) : new Date()
      }
    })

    return NextResponse.json(income, { status: 201 })
  } catch (error) {
    console.error('Error creating income:', error)
    return NextResponse.json(
      { error: 'Failed to create income' },
      { status: 500 }
    )
  }
}

// DELETE /api/income - Delete an income record
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Income ID is required' },
        { status: 400 }
      )
    }

    await prisma.income.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Income deleted successfully' })
  } catch (error) {
    console.error('Error deleting income:', error)
    return NextResponse.json(
      { error: 'Failed to delete income' },
      { status: 500 }
    )
  }
}