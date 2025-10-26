import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { ClubsPage } from './pages/ClubsPage';
import { ClubDetailsPage } from './pages/ClubDetailsPage';
import { MembersPage } from './pages/MembersPage';
import { EventsPage } from './pages/EventsPage';
import { BudgetsPage } from './pages/BudgetsPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/clubs" element={<Layout><ClubsPage /></Layout>} />
        <Route path="/clubs/:clubId" element={<Layout><ClubDetailsPage /></Layout>} />
        <Route path="/members" element={<Layout><MembersPage /></Layout>} />
        <Route path="/events" element={<Layout><EventsPage /></Layout>} />
        <Route path="/budgets" element={<Layout><BudgetsPage /></Layout>} />
        <Route path="/activities" element={<Layout><ActivitiesPage /></Layout>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'white',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: 'red',
              secondary: 'white',
            },
          },
        }}
      />
    </Router>
  );
}

export default App;
