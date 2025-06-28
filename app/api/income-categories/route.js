import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

// GET - Fetch all income categories
export async function GET() {
  try {
    const categories = await prisma.incomeCategory.findMany({
      orderBy: [
        { isDefault: 'desc' }, // Default categories first
        { name: 'asc' }
      ]
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching income categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch income categories' },
      { status: 500 }
    );
  }
}

// POST - Create a new income category
export async function POST(request) {
  try {
    const { name, color } = await request.json();
    
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    const category = await prisma.incomeCategory.create({
      data: {
        name: name.trim(),
        color: color || null,
        isDefault: false
      }
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating income category:', error);
    
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Category name already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create income category' },
      { status: 500 }
    );
  }
}

// DELETE - Delete an income category
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
    const category = await prisma.incomeCategory.findUnique({
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

    await prisma.incomeCategory.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting income category:', error);
    return NextResponse.json(
      { error: 'Failed to delete income category' },
      { status: 500 }
    );
  }
}