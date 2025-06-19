import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { getUsersRegistration } from '../services/registrationService';
import { useSelector } from 'react-redux';
import {notifyError} from '../utils/toastUtils'

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getUsersRegistration();
        setEvents(res);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard');
        notifyError('Failed to load dashboard!');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-400 text-center mt-4">{error}</div>;

  return (
    <div className="min-h-screen bg-[#2a2a2a] px-4 py-8 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 text-center mb-10">
          Welcome, {user || 'User'} 👋
        </h1>

        <h2 className="text-2xl font-semibold mb-6 text-center text-white">
          Your Registered Events
        </h2>

        {events.length === 0 ? (
          <p className="text-center text-gray-300">
            No events registered yet.{' '}
            <Link to="/events" className="text-yellow-400 hover:underline">
              Browse Events
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((reg) => {
              const evt = reg.event;
              return (
                <div
                  key={reg._id}
                  className="bg-[#1e1e1e] rounded-xl shadow-lg overflow-hidden hover:shadow-yellow-400/20 transition duration-300"
                >
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <h3 className="text-xl font-bold text-yellow-400">{evt.title}</h3>
                    <p className="text-sm text-gray-300">
                      📅 {new Date(evt.startDate).toLocaleDateString()} • 🕓 {evt.startTime}
                    </p>
                    <p className="text-sm text-white">📍 {evt.location}</p>
                    <p className="text-sm text-white">
                      👤 Organizer:{' '}
                      <span className="text-yellow-300">
                        {evt.organizer?.name || 'Unknown'}
                      </span>
                    </p>
                    <p className="text-sm text-gray-400">Status : {evt.status}</p>
                    <p className="text-sm text-gray-400">{evt.eventType}</p>

                    <div className="mt-3">
                      <Link
                        to={`/events/${evt._id}`}
                        className="inline-block bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 font-semibold transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
