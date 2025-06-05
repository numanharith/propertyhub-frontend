import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserCircle2, Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-gray-600 hover:text-primary transition-colors ${isActive ? 'text-primary font-semibold' : ''}`;
  
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors ${isActive ? 'text-primary bg-gray-100 font-semibold' : ''}`;


  return (
    <header id="main-header" className={`bg-white shadow-md sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/assets/images/logo.svg" alt="PropertyHub Logo" className={`w-auto transition-all duration-300 ${isScrolled ? 'h-7' : 'h-8'}`} />
            <span className="text-2xl font-bold text-primary">PropertyHub</span>
          </Link>
          <nav className="hidden md:flex space-x-6 items-center">
            <NavLink to="/search_results?status=buy" className={navLinkClass}>Buy</NavLink>
            <NavLink to="/search_results?status=rent" className={navLinkClass}>Rent</NavLink>
            <NavLink to="/new-projects" className={navLinkClass}>New Projects</NavLink>
            <NavLink to="/agents" className={navLinkClass}>Agents</NavLink>
            <NavLink to="/news" className={navLinkClass}>News</NavLink>
          </nav>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <NavLink to="/dashboard" className="hidden sm:flex items-center text-gray-600 hover:text-primary transition-colors">
                <UserCircle2 className="w-5 h-5 mr-1" />
                {user?.username || 'Dashboard'}
              </NavLink>
            ) : (
              <NavLink to="/auth" className="hidden sm:flex items-center text-gray-600 hover:text-primary transition-colors">
                <UserCircle2 className="w-5 h-5 mr-1" />
                Login/Register
              </NavLink>
            )}
            <Link to={isAuthenticated ? "/dashboard/add-listing" : "/auth"} className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium transition-colors">
              List Property
            </Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-600 hover:text-primary">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white shadow-lg">
          <NavLink to="/search_results?status=buy" className={mobileNavLinkClass} onClick={()=>setIsMobileMenuOpen(false)}>Buy</NavLink>
          <NavLink to="/search_results?status=rent" className={mobileNavLinkClass} onClick={()=>setIsMobileMenuOpen(false)}>Rent</NavLink>
          <NavLink to="/new-projects" className={mobileNavLinkClass} onClick={()=>setIsMobileMenuOpen(false)}>New Projects</NavLink>
          <NavLink to="/agents" className={mobileNavLinkClass} onClick={()=>setIsMobileMenuOpen(false)}>Agents</NavLink>
          <NavLink to="/news" className={mobileNavLinkClass} onClick={()=>setIsMobileMenuOpen(false)}>News</NavLink>
          {isAuthenticated ? (
             <NavLink to="/dashboard" className={`${mobileNavLinkClass} border-t border-gray-200`} onClick={()=>setIsMobileMenuOpen(false)}>
                <UserCircle2 className="inline w-5 h-5 mr-1" /> Dashboard
             </NavLink>
          ) : (
            <NavLink to="/auth" className={`${mobileNavLinkClass} border-t border-gray-200`} onClick={()=>setIsMobileMenuOpen(false)}>
              <UserCircle2 className="inline w-5 h-5 mr-1" /> Login/Register
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
