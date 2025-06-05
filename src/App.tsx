import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import HomePage from '@/pages/HomePage';
import AuthPage from '@/pages/AuthPage';
import SearchResultsPage from '@/pages/SearchResultsPage';
import PropertyDetailsPage from '@/pages/PropertyDetailsPage';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardOverviewPage from '@/pages/dashboard/DashboardOverviewPage';
import MyListingsPage from '@/pages/dashboard/MyListingsPage';
import AddListingPage from '@/pages/dashboard/AddListingPage';
import ProfilePage from '@/pages/dashboard/ProfilePage';
import InquiriesPage from '@/pages/dashboard/InquiriesPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProtectedRoute from './components/common/ProtectedRoute';

declare global {
  interface Window {
    lucide: any;
  }
}

function App() {
  const location = useLocation();

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [location]); // Re-run on location change to catch new icons

  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboardRoute && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/search_results" element={<SearchResultsPage />} />
          <Route path="/property_details/:id" element={<PropertyDetailsPage />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardOverviewPage />} />
            <Route path="overview" element={<DashboardOverviewPage />} />
            <Route path="my-listings" element={<MyListingsPage />} />
            <Route path="add-listing" element={<AddListingPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="inquiries" element={<InquiriesPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isDashboardRoute && <Footer />}
    </div>
  );
}

export default App;
