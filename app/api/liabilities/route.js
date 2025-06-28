import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

// GET /api/liabilities - Fetch all liabilities
export async function GET() {
  try {
    const liabilities = await prisma.liability.findMany({
      orderBy: {
        dueDate: 'asc'
      }
    })
    return NextResponse.json(liabilities)
  } catch (error) {
    console.error('Error fetching liabilities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch liabilities' },
      { status: 500 }
    )
  }
}

// POST /api/liabilities - Create a new liability
export async function POST(request) {
  try {
    const body = await request.json()
    const { creditor, amount, monthlyPayment, dueDate, status, type } = body

    if (!creditor || !amount || !monthlyPayment || !dueDate || !status || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const liability = await prisma.liability.create({
      data: {
        creditor,
        amount: parseFloat(amount),
        monthlyPayment: parseFloat(monthlyPayment),
        dueDate: new Date(dueDate),
        status,
        type
      }
    })

    return NextResponse.json(liability, { status: 201 })
  } catch (error) {
    console.error('Error creating liability:', error)
    return NextResponse.json(
      { error: 'Failed to create liability' },
      { status: 500 }
    )
  }
}

// DELETE /api/liabilities - Delete a liability
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Liability ID is required' },
        { status: 400 }
      )
    }

    await prisma.liability.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Liability deleted successfully' })
  } catch (error) {
    console.error('Error deleting liability:', error)
    return NextResponse.json(
      { error: 'Failed to delete liability' },
      { status: 500 }
    )
  }
}