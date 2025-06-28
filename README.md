# Personal Budget Dashboard

A comprehensive personal finance management application built with Next.js, featuring expense tracking, income management, liabilities monitoring, and receivables & assets management.

## Features

- 📊 **Dashboard Overview**: Real-time financial summary with charts and statistics
- 💰 **Expense Tracking**: Categorized expense management with visual analytics
- 💵 **Income Management**: Track multiple income sources and categories
- 🏦 **Liabilities**: Monitor debts, loans, and financial obligations
- 📈 **Receivables & Assets**: Track outstanding payments and asset portfolio
- 📱 **Responsive Design**: Mobile-friendly interface with modern UI
- 🔒 **Secure**: Built with security best practices

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Prisma ORM
- **Deployment**: Optimized for Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (local or MongoDB Atlas)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd personalbudget
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   - `DATABASE_URL`: Your MongoDB connection string
   - `NEXTAUTH_SECRET`: Random secret for authentication
   - `NEXTAUTH_URL`: Your application URL

4. **Set up the database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment on Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/personalbudget)

### Manual Deployment

1. **Push your code to GitHub**

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   
   In your Vercel project settings, add these environment variables:
   
   ```
   DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/database
   NEXTAUTH_SECRET=your-random-secret-here
   NEXTAUTH_URL=https://your-app-name.vercel.app
   ```

4. **Deploy**
   
   Vercel will automatically:
   - Install dependencies
   - Generate Prisma client
   - Push database schema
   - Build the application
   - Deploy to production

### Environment Variables Setup

| Variable | Description | Example |
|----------|-------------|---------||
| `DATABASE_URL` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your application URL | `https://your-app.vercel.app` |

### Database Setup for Production

1. **MongoDB Atlas** (Recommended)
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Get your connection string
   - Add it to Vercel environment variables

2. **Database Migration**
   
   The deployment process automatically:
   - Generates Prisma client
   - Pushes schema to database
   - Seeds initial data (categories)

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
