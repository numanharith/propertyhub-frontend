// src/App.tsx
/**
 * Main application component with routing and context providers.
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/dashboard/DashboardLayout';

// Import Pages
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import SearchResultsPage from './pages/SearchResultsPage';
import AgentsPage from './pages/AgentsPage';
import NewProjectsPage from './pages/NewProjectsPage';
import NewsPage from './pages/NewsPage';
import ServicePartnerMarketplacePage from './pages/ServicePartnerMarketplacePage';
import PricingPage from './pages/PricingPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentCancelPage from './pages/PaymentCancelPage';
import FSBOListingPage from './pages/FSBOListingPage';
import AgentDashboardPage from './pages/AgentDashboardPage';
import OwnerDashboardPage from './pages/OwnerDashboardPage';
import AddListingPage from './pages/dashboard/AddListingPage';
import DashboardOverviewPage from './pages/dashboard/DashboardOverviewPage';
import MyListingsPage from './pages/dashboard/MyListingsPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import InquiriesPage from './pages/dashboard/InquiriesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';

// Route configuration for public routes
const publicRoutes = [
  { path: '/', element: HomePage },
  { path: '/auth', element: AuthPage },
  { path: '/search_results', element: SearchResultsPage },
  { path: '/properties/:id', element: PropertyDetailsPage },
  { path: '/agents', element: AgentsPage },
  { path: '/new-projects', element: NewProjectsPage },
  { path: '/news', element: NewsPage },
  { path: '/service-partners', element: ServicePartnerMarketplacePage },
  { path: '/pricing', element: PricingPage },
  { path: '/payment-success', element: PaymentSuccessPage },
  { path: '/payment-cancel', element: PaymentCancelPage },
] as const;

// Other dashboard routes that use DashboardLayout but aren't nested
const otherDashboardRoutes = [
  { path: '/agent-dashboard', element: AgentDashboardPage },
  { path: '/owner-dashboard', element: OwnerDashboardPage },
  { path: '/fsbo/new', element: FSBOListingPage },
] as const;

// Layout wrapper components
const withMainLayout = (Component: React.ComponentType) => (
  <MainLayout>
    <Component />
  </MainLayout>
);

const withDashboardLayout = (Component: React.ComponentType) => (
  <ProtectedRoute>
    <Component />
  </ProtectedRoute>
);

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Main Dashboard Route with Nested Routes */}
          <Route
            path="/dashboard"
            element={withDashboardLayout(DashboardLayout)}
          >
            <Route index element={<DashboardOverviewPage />} />
            <Route path="overview" element={<DashboardOverviewPage />} />
            <Route path="my-listings" element={<MyListingsPage />} />
            <Route path="add-listing" element={<AddListingPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="inquiries" element={<InquiriesPage />} />
          </Route>

          {/* Other Dashboard Routes */}
          {otherDashboardRoutes.map(({ path, element: Element }) => (
            <Route
              key={path}
              path={path}
              element={withDashboardLayout(Element)}
            />
          ))}

          {/* Public Routes */}
          {publicRoutes.map(({ path, element: Element }) => (
            <Route
              key={path}
              path={path}
              element={withMainLayout(Element)}
            />
          ))}

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;