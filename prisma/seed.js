const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with default categories...');

  // Default expense categories
  const expenseCategories = [
    { name: 'Housing', color: '#3B82F6', isDefault: true },
    { name: 'Food', color: '#10B981', isDefault: true },
    { name: 'Transportation', color: '#F59E0B', isDefault: true },
    { name: 'Entertainment', color: '#EF4444', isDefault: true },
    { name: 'Utilities', color: '#8B5CF6', isDefault: true },
    { name: 'Healthcare', color: '#06B6D4', isDefault: true },
    { name: 'Shopping', color: '#EC4899', isDefault: true },
    { name: 'Other', color: '#6B7280', isDefault: true }
  ];

  // Default income categories
  const incomeCategories = [
    { name: 'Salary', color: '#10B981', isDefault: true },
    { name: 'Freelance', color: '#3B82F6', isDefault: true },
    { name: 'Investment', color: '#F59E0B', isDefault: true },
    { name: 'Business', color: '#8B5CF6', isDefault: true },
    { name: 'Rental', color: '#06B6D4', isDefault: true },
    { name: 'Gift', color: '#EC4899', isDefault: true },
    { name: 'Other', color: '#6B7280', isDefault: true }
  ];

  // Create expense categories
  for (const category of expenseCategories) {
    await prisma.expenseCategory.upsert({
      where: { name: category.name },
      update: {},
      create: category
    });
  }

  // Create income categories
  for (const category of incomeCategories) {
    await prisma.incomeCategory.upsert({
      where: { name: category.name },
      update: {},
      create: category
    });
  }

  // Sample receivables
  const sampleReceivables = [
    {
      description: 'Client Payment - ABC Corp',
      amount: 5200,
      dueDate: new Date('2024-12-15'),
      status: 'scheduled',
      client: 'ABC Corp'
    },
    {
      description: 'Freelance Project - XYZ Ltd',
      amount: 8500,
      dueDate: new Date('2024-12-10'),
      status: 'due-soon',
      client: 'XYZ Ltd'
    },
    {
      description: 'Rental Income - Property A',
      amount: 1500,
      dueDate: new Date('2025-01-01'),
      status: 'scheduled',
      client: 'Tenant A'
    },
    {
      description: 'Consulting Fee - DEF Inc',
      amount: 3200,
      dueDate: new Date('2024-12-05'),
      status: 'overdue',
      client: 'DEF Inc'
    }
  ];

  // Sample assets
  const sampleAssets = [
    {
      name: 'Apple Stock (AAPL)',
      category: 'Stocks',
      value: 25000,
      purchaseDate: new Date('2023-06-15'),
      status: 'active',
      description: '100 shares of Apple Inc.'
    },
    {
      name: 'Rental Property',
      category: 'Real Estate',
      value: 350000,
      purchaseDate: new Date('2022-03-20'),
      status: 'active',
      description: '2-bedroom apartment downtown'
    },
    {
      name: 'Emergency Fund',
      category: 'Cash',
      value: 15000,
      purchaseDate: new Date('2024-01-01'),
      status: 'active',
      description: 'High-yield savings account'
    },
    {
      name: 'Tesla Stock (TSLA)',
      category: 'Stocks',
      value: 18500,
      purchaseDate: new Date('2023-09-10'),
      status: 'active',
      description: '50 shares of Tesla Inc.'
    },
    {
      name: 'Cryptocurrency Portfolio',
      category: 'Other',
      value: 12000,
      purchaseDate: new Date('2023-11-05'),
      status: 'active',
      description: 'Bitcoin and Ethereum holdings'
    }
  ];

  // Create sample receivables
  for (const receivable of sampleReceivables) {
    await prisma.receivable.create({
      data: receivable
    });
  }

  // Create sample assets
  for (const asset of sampleAssets) {
    await prisma.asset.create({
      data: asset
    });
  }

  console.log('Database seeded successfully with categories, receivables, and assets!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });