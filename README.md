# Personal Budget Tracker

A modern, responsive personal budget tracking application built with Next.js, MongoDB, and Prisma.

## Features

- **Expense Tracking**: Add, view, and manage your expenses with categories
- **Income Management**: Track multiple income sources and types
- **Liability Tracking**: Monitor debts, loans, and other liabilities
- **Real-time Dashboard**: Visual overview of your financial status
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Database Persistence**: All data is stored in MongoDB using Prisma ORM

## Tech Stack

- **Frontend**: Next.js 15, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Prisma ORM
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React

## Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- MongoDB installed locally or access to MongoDB Atlas
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personalbudget
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   The `.env` file should contain:
   ```env
   DATABASE_URL="mongodb://localhost:27017/personalbudget"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

   **For MongoDB Atlas (cloud):**
   ```env
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/personalbudget"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push the schema to MongoDB (creates collections)
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## Database Setup

### Local MongoDB

1. **Install MongoDB Community Edition**
   - Download from [MongoDB Official Website](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for your operating system

2. **Start MongoDB service**
   ```bash
   # On Windows (if installed as service)
   net start MongoDB
   
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Linux
   sudo systemctl start mongod
   ```

3. **Verify connection**
   ```bash
   # Connect to MongoDB shell
   mongosh
   
   # List databases
   show dbs
   ```

### MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Set up database access (username/password)
4. Configure network access (add your IP)
5. Get the connection string and update your `.env` file

## API Endpoints

The application provides the following REST API endpoints:

### Expenses
- `GET /api/expenses` - Fetch all expenses
- `POST /api/expenses` - Create a new expense
- `DELETE /api/expenses` - Delete an expense by ID

### Income
- `GET /api/income` - Fetch all income records
- `POST /api/income` - Create a new income record
- `DELETE /api/income` - Delete an income record by ID

### Liabilities
- `GET /api/liabilities` - Fetch all liabilities
- `POST /api/liabilities` - Create a new liability
- `DELETE /api/liabilities` - Delete a liability by ID

## Project Structure

```
personalbudget/
├── app/
│   ├── api/
│   │   ├── expenses/
│   │   ├── income/
│   │   └── liabilities/
│   ├── components/
│   └── page.js
├── lib/
│   └── db.js
├── prisma/
│   └── schema.prisma
├── .env
└── package.json
```

## Usage

1. **Dashboard Overview**: View your financial summary with total balance, income, expenses, and savings
2. **Add Expenses**: Click "Add Expense" to record new expenses with categories
3. **Track Income**: Use "Add Income" to log income from various sources
4. **Manage Liabilities**: Add and track debts, loans, and other financial obligations
5. **Dark Mode**: Toggle between light and dark themes using the theme switcher

## Development

### Database Schema

The application uses three main data models:

- **Expense**: category, amount, description, date
- **Income**: source, amount, type, recurring, date
- **Liability**: creditor, amount, monthlyPayment, dueDate, status, type

### Adding New Features

1. Update the Prisma schema in `prisma/schema.prisma`
2. Run `npx prisma db push` to update the database
3. Create corresponding API routes in `app/api/`
4. Update the frontend components as needed

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the DATABASE_URL in `.env`
   - Verify network connectivity for Atlas

2. **Prisma Client Error**
   - Run `npx prisma generate` to regenerate the client
   - Ensure the schema is pushed to the database

3. **Port Already in Use**
   - The app will automatically use the next available port
   - Or specify a different port: `npm run dev -- -p 3001`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
