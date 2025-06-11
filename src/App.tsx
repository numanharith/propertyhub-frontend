// src/App.tsx
/**
 * Main application component with routing and context providers.
 */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Import Pages
import FSBOListingPage from './pages/FSBOListingPage';
import AgentDashboardPage from './pages/AgentDashboardPage';
import PricingPage from './pages/PricingPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentCancelPage from './pages/PaymentCancelPage';

// Import other placeholder/example pages
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import SearchResultsPage from './pages/SearchResultsPage';
import AgentsPage from './pages/AgentsPage';
import NewProjectsPage from './pages/NewProjectsPage';
import NewsPage from './pages/NewsPage';
import DashboardOverviewPage from './pages/dashboard/DashboardOverviewPage';
import AddListingPage from './pages/dashboard/AddListingPage';
import OwnerDashboardPage from './pages/OwnerDashboardPage';
import ServicePartnerMarketplacePage from './pages/ServicePartnerMarketplacePage';


function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap application with AuthProvider */}
        <div className="App">
          <Header />

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/search_results" element={<SearchResultsPage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/new-projects" element={<NewProjectsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/service-partners" element={<ServicePartnerMarketplacePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/payment-cancel" element={<PaymentCancelPage />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardOverviewPage /></ProtectedRoute>} />
            <Route path="/dashboard/add-listing" element={<ProtectedRoute><AddListingPage /></ProtectedRoute>} />
            <Route path="/agent-dashboard" element={<ProtectedRoute><AgentDashboardPage /></ProtectedRoute>} />
            <Route path="/owner-dashboard" element={<ProtectedRoute><OwnerDashboardPage /></ProtectedRoute>} />
            <Route path="/fsbo/new" element={<ProtectedRoute><FSBOListingPage /></ProtectedRoute>} />

            {/* Fallback route for unmatched paths */}
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>

          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;