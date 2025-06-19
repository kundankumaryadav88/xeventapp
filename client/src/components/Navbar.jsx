import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <nav className="bg-[#1e1e1e] text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/events" onClick={() => setMenuOpen(false)} className="text-2xl font-bold text-yellow-400">The Social Hub</Link>

        <div className="hidden md:flex space-x-6 items-center">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-yellow-400 transition">Dashboard</Link>
              <Link to="/profile" className="hover:text-yellow-400 transition">Profile</Link>
              {role === 'Admin' && (
                <>
                  <Link to="/admin" className="hover:text-yellow-400 transition">Admin</Link>
                  <Link to="/organizer" className="hover:text-yellow-400 transition">Organizer</Link>
                </>
              )}
              {role === 'Organizer' && role !== 'Admin' && (
                <Link to="/organizer" className="hover:text-yellow-400 transition">Organizer</Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-400 transition">Login</Link>
              <Link to="/signup" className="hover:text-yellow-400 transition">Signup</Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-yellow-400 text-2xl focus:outline-none">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-[#1e1e1e] text-white">
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(!menuOpen)} className="block hover:text-yellow-400 transition">Dashboard</Link>
              <Link to="/profile" onClick={() => setMenuOpen(!menuOpen)} className="block hover:text-yellow-400 transition">Profile</Link>
              {role === 'Admin' && (
                <>
                  <Link to="/admin" onClick={() => setMenuOpen(!menuOpen)} className="block hover:text-yellow-400 transition">Admin</Link>
                  <Link to="/organizer" onClick={() => setMenuOpen(!menuOpen)} className="block hover:text-yellow-400 transition">Organizer</Link>
                </>
              )}
              {role === 'Organizer' && role !== 'Admin' && (
                <Link to="/organizer" onClick={() => setMenuOpen(!menuOpen)} className="block hover:text-yellow-400 transition">Organizer</Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(!menuOpen)} className="block hover:text-yellow-400 transition">Login</Link>
              <Link to="/signup" onClick={() => setMenuOpen(!menuOpen)} className="block hover:text-yellow-400 transition">Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
