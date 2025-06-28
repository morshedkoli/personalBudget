import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

// GET - Fetch all expense categories
export async function GET() {
  try {
    const categories = await prisma.expenseCategory.findMany({
      orderBy: [
        { isDefault: 'desc' }, // Default categories first
        { name: 'asc' }
      ]
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching expense categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch expense categories' },
      { status: 500 }
    );
  }
}

// POST - Create a new expense category
export async function POST(request) {
  try {
    const { name, color } = await request.json();
    
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    const category = await prisma.expenseCategory.create({
      data: {
        name: name.trim(),
        color: color || null,
        isDefault: false
      }
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating expense category:', error);
    
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Category name already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create expense category' },
      { status: 500 }
    );
  }
}

// DELETE - Delete an expense category
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    // Check if category is default (cannot be deleted)
    const category = await prisma.expenseCategory.findUnique({
      where: { id }
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    if (category.isDefault) {
      return NextResponse.json(
        { error: 'Default categories cannot be deleted' },
        { status: 400 }
      );
    }

    await prisma.expenseCategory.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense category:', error);
    return NextResponse.json(
      { error: 'Failed to delete expense category' },
      { status: 500 }
    );
  }
}