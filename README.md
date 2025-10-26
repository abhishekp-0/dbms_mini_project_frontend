# Club Management System - Frontend

A modern, responsive web application for managing college clubs, built with React and Radix UI.

## 🚀 Features

- **Authentication System**: Simple login with admin and member roles
- **Dashboard**: Overview with statistics and recent activities
- **Clubs Management**: Create and view clubs with detailed information
- **Members Management**: Add and manage club members
- **Events Management**: Schedule and track club events
- **Budget Management**: Track event budgets with visual progress indicators
- **Activities Management**: Full CRUD operations for seminars and workshops
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Built with Radix UI Themes for accessibility and aesthetics

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Radix UI Themes** - Component library
- **React Router v6** - Routing
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **date-fns** - Date formatting
- **React Hot Toast** - Notifications

## 📋 Prerequisites

- Node.js 16+ installed
- Backend server running on `http://localhost:3000`

## 🔧 Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=Club Management System
```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔐 Login Credentials

### Admin Account
- **Username**: admin
- **Password**: admin123
- **Access**: Full CRUD operations on all modules

### Member Account
- **Username**: member
- **Password**: member123
- **Access**: Read-only access to view data

## 📁 Project Structure

```
src/
├── components/        # Reusable components
│   ├── activities/   # Activity-related components
│   ├── auth/         # Authentication components
│   ├── budgets/      # Budget-related components
│   ├── clubs/        # Club-related components
│   ├── common/       # Shared components
│   ├── events/       # Event-related components
│   ├── layout/       # Layout components
│   └── members/      # Member-related components
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── services/         # API service layer
├── utils/            # Utility functions
├── App.jsx           # Main app component
└── main.jsx          # Entry point
```

## 🎨 Key Features by Module

### Dashboard
- Statistics cards for clubs, members, events, and budgets
- Recent activities feed
- Upcoming events list
- Quick action buttons for admins

### Clubs
- Grid view of all clubs
- Detailed club pages with heads, events, and activities
- Admin: Create new clubs and assign heads

### Members
- Searchable member list
- Filter by club and role
- Admin: Add new members with club assignments

### Events
- Calendar-style event cards
- Date and time information
- Club association
- Admin: Create events with budget tracking

### Budgets
- Visual budget tracking with progress bars
- Allocated vs spent amount
- Over-budget warnings
- Admin: Create and manage budgets

### Activities
- Full CRUD operations (admin only)
- Filter by type (seminar/workshop) and scope (internal/external)
- Detailed activity information
- Speaker and venue details

## 🌐 API Integration

The frontend connects to a RESTful API backend:

- **Base URL**: `http://localhost:3000`
- **Endpoints**:
  - `/clubs` - Club operations
  - `/members` - Member operations
  - `/events` - Event operations
  - `/budgets` - Budget operations
  - `/activities` - Activity operations (includes PUT/DELETE)

## 🐛 Troubleshooting

### CORS Errors
Make sure the backend has CORS configured:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Port Already in Use
If port 5173 is occupied, Vite will automatically use the next available port.

### API Connection Errors
Ensure the backend is running on `http://localhost:3000` before starting the frontend.

## 📝 License

This project is created for educational purposes as part of a DBMS Lab Mini Project.

---

Built with ❤️ using React and Radix UI

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
