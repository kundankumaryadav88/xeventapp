import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { uploadImageToCloudinary } from '../utils/uploadImageToCloudinary';

const SignupPage = () => {
  const user = useSelector(state => state.auth.user);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      const file = files[0];
      setFormData({ ...formData, avatar: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let avatarUrl = '';
      if (formData.avatar) {
        avatarUrl = await uploadImageToCloudinary(formData.avatar);
      }

      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        avatar: avatarUrl,
      });

      dispatch(loginUser({ user: response.user.name, token: response.token, role: response.user.role, mail: response.user.email }));
      navigate('/');
    } catch (err) {
      console.error('Signup failed:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (user) navigate('/events');
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#2a2a2a] flex items-center justify-center px-4">
      <div className="max-w-md w-full p-6 bg-[#1e1e1e] rounded-xl shadow-lg text-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Signup</h2>
        {error && <p className="bg-red-700 p-3 rounded mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-800 border border-yellow-400 placeholder-yellow-300 text-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-800 border border-yellow-400 placeholder-yellow-300 text-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-800 border border-yellow-400 placeholder-yellow-300 text-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <div className="relative w-full">
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="avatar"
              className="block w-full text-center p-3 border border-gray-600 rounded bg-[#29293f] text-white cursor-pointer hover:bg-yellow-400 hover:text-black transition"
            >
              {formData.avatar ? formData.avatar.name : 'Choose Avatar'}
            </label>
          </div>
          {preview && (
            <img
              src={preview}
              alt="Avatar Preview"
              className="w-24 h-24 object-cover rounded-full mx-auto mt-3 border-2 border-yellow-400"
            />
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black p-3 rounded font-semibold hover:bg-yellow-300 transition"
          >
            {loading ? 'Registering...' : 'Signup'}
          </button>
          {/* <button
          type="button"
          disabled={loading}
          onClick={handleGoogleLogin}
          className="w-full py-3 mt-2 bg-red-600 rounded font-semibold hover:bg-red-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
          aria-label="Login with Google"
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21.805 10.023h-9.797v3.938h5.807c-.25 1.5-1.625 4.41-5.807 4.41-3.5 0-6.35-2.897-6.35-6.47s2.85-6.47 6.35-6.47c1.985 0 3.32.843 4.1 1.573l2.8-2.7C17.75 5.123 15.325 4.12 12.12 4.12 6.94 4.12 2.68 8.51 2.68 13.684c0 5.17 4.26 9.56 9.44 9.56 5.447 0 9.07-3.825 9.07-9.22 0-.62-.07-1.095-.385-1.98z"/>
          </svg>
          Signup with Google
        </button> */}
        </form>
        <p className="text-center mt-5 text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
