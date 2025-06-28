import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

// GET /api/expenses - Fetch all expenses
export async function GET() {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: {
        date: 'desc'
      }
    })
    return NextResponse.json(expenses)
  } catch (error) {
    console.error('Error fetching expenses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch expenses' },
      { status: 500 }
    )
  }
}

// POST /api/expenses - Create a new expense
export async function POST(request) {
  try {
    const body = await request.json()
    const { description, amount, category, date } = body

    if (!description || !amount || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const expense = await prisma.expense.create({
      data: {
        description,
        amount: parseFloat(amount),
        category,
        date: date ? new Date(date) : new Date()
      }
    })

    return NextResponse.json(expense, { status: 201 })
  } catch (error) {
    console.error('Error creating expense:', error)
    return NextResponse.json(
      { error: 'Failed to create expense' },
      { status: 500 }
    )
  }
}

// DELETE /api/expenses - Delete an expense
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Expense ID is required' },
        { status: 400 }
      )
    }

    await prisma.expense.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Expense deleted successfully' })
  } catch (error) {
    console.error('Error deleting expense:', error)
    return NextResponse.json(
      { error: 'Failed to delete expense' },
      { status: 500 }
    )
  }
}