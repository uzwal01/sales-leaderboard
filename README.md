# Sales Leaderboard System

A full-stack sales leaderboard application that tracks and ranks sales agents based on their performance.

## Live Demo

- **Frontend:** [https://sales-leaderboard-pi.vercel.app](https://sales-leaderboard-pi.vercel.app)
- **Backend API:** [https://sales-leaderboard-fj9q.onrender.com](https://sales-leaderboard-fj9q.onrender.com)

## Features

- Add sales records with agent name, amount, and number of sales
- Real-time leaderboard ranking based on total sales amount
- Aggregates multiple sales records for the same agent
- Handles tie-breaking with consistent alphabetical sorting
- Responsive UI with visual ranking indicators (Gold/Silver/Bronze)
- RESTful API architecture
- MongoDB database with efficient aggregation pipeline
- Deployed and publicly accessible

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Deployment:** Render

### Frontend
- **Framework:** Next.js 14 (React)
- **Styling:** CSS
- **Deployment:** Vercel

## Project Structure
```
sales-leaderboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection
│   │   ├── controllers/
│   │   │   └── salesController.js   # Business logic
│   │   ├── models/
│   │   │   └── Sale.js              # Database schema
│   │   ├── routes/
│   │   │   └── salesRoutes.js       # API endpoints
│   │   └── server.js                # Entry point
│   ├── package.json
│   └── .env
└── frontend/
    ├── app/
    │   ├── page.js                  # Main component
    │   └── globals.css              # Styles
    ├── package.json
    └── .env.local
```

## API Endpoints

### Base URL: `https://sales-leaderboard-fj9q.onrender.com/api`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/leaderboard` | Get ranked leaderboard | - |
| POST | `/sales` | Add new sale record | `{ agentName, amount, salesCount }` |
| GET | `/sales` | Get all sales records | - |

### API Examples

**Get Leaderboard:**
```bash
curl https://sales-leaderboard-fj9q.onrender.com/api/leaderboard
```

**Response:**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "rank": 1,
      "totalAmount": 100000,
      "totalSales": 12,
      "agentName": "Ram Sharma"
    },
    {
      "rank": 2,
      "totalAmount": 25000,
      "totalSales": 7,
      "agentName": "Richa Kadel"
    },
    {
      "rank": 3,
      "totalAmount": 3000,
      "totalSales": 4,
      "agentName": "Ujjwal Duwal"
    },
    {
      "rank": 4,
      "totalAmount": 113,
      "totalSales": 1,
      "agentName": "Subas Kandel"
    }
  ]
}
```

**Add Sale:**
```bash
curl -X POST https://sales-leaderboard-fj9q.onrender.com/api/sales \
  -H "Content-Type: application/json" \
  -d '{
    "agentName": "Ram Sharma",
    "amount": 250000,
    "salesCount": 5
  }'
```

## Key Implementation Details

### Aggregation Logic
The leaderboard uses MongoDB's aggregation pipeline for efficient data processing:

1. **$group:** Aggregates all sales by agent name
2. **$project:** Reshapes documents with total amounts and sales
3. **$sort:** Ranks by total amount (descending), then alphabetically

### Ranking Algorithm
- Primary sort: Total sales amount (descending)
- Tie-breaker: Agent name (alphabetical)
- Positions assigned sequentially (1, 2, 3...)

### Data Validation
- Required fields: agentName, amount
- Amount must be non-negative
- Sales count must be at least 1
- Agent names are trimmed for consistency

## Local Development Setup

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Add your MONGODB_URI to .env
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Add your API URL to .env.local
npm run dev
```

##  Deployment

### Backend (Render)
1. Root Directory: `backend`
2. Build Command: `npm install`
3. Start Command: `npm start`
4. Environment Variables:
   - `MONGODB_URI`: MongoDB connection string
   - `PORT`: 5000 (optional)

### Frontend (Vercel)
1. Root Directory: `frontend`
2. Build Command: `npm run build`
3. Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Backend API URL

## Author

**Ujjwal Duwal**
- Internship Application: Backend Development - Nest Nepal

## License

This project was created as part of an internship task for Nest Nepal.

---

