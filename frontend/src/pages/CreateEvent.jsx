import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAnEvent } from '../services/organizerService';
import { uploadImageToCloudinary } from '../utils/uploadImageToCloudinary';
import { notifyError, notifySuccess } from '../utils/toastUtils';
import { useSelector } from 'react-redux';

const CreateEvent = () => {
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    if(role === 'Participant') {
      notifyError('Forbidden');
      navigate('/events');
    }
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    eventType: 'Offline',
    category: '',
    avatar: null,
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      const file = files[0];
      setFormData((prev) => ({ ...prev, avatar: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const required = ['title', 'description', 'startDate', 'startTime', 'endDate', 'endTime', 'location', 'category', 'avatar'];
    for (let field of required) {
      if (!formData[field]) {
        setError('Please fill in all required fields.');
        return;
      }
    }

    setLoading(true);
    try {
      const imageUrl = await uploadImageToCloudinary(formData.avatar);
      const payload = {
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate,
        startTime: formData.startTime,
        endDate: formData.endDate,
        endTime: formData.endTime,
        location: formData.location,
        eventType: formData.eventType,
        category: formData.category,
        image: imageUrl,
      };

      await createAnEvent(payload);
      notifySuccess('Event Created Successfully!');
      navigate('/organizer');
    } catch (err) {
      console.error(err);
      setError('Failed to create event.');
      notifyError('Event Creation Failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2a2a2a] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full p-6 bg-[#1e1e1e] rounded-xl shadow-lg text-white my-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Create New Event</h2>
        {error && <p className="bg-red-700 p-3 rounded mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-yellow-400 placeholder-white text-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-yellow-400 placeholder-white text-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <div className="flex gap-2">
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-1/2 p-3 rounded bg-gray-800 border border-yellow-400 text-yellow-50" />
            <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="w-1/2 p-3 rounded bg-gray-800 border border-yellow-400 text-yellow-50" />
          </div>
          <div className="flex gap-2">
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-1/2 p-3 rounded bg-gray-800 border border-yellow-400 text-yellow-50" />
            <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="w-1/2 p-3 rounded bg-gray-800 border border-yellow-400 text-yellow-50" />
          </div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-yellow-400 placeholder-white text-yellow-50"
          />
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-yellow-400 text-yellow-50"
          >
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
          </select>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-yellow-400 placeholder-white text-yellow-50"
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
              {formData.avatar ? formData.avatar.name : 'Choose Event Image'}
            </label>
          </div>
          {preview && (
            <img
              src={preview}
              alt="Event Preview"
              className="w-24 h-24 object-cover rounded-full mx-auto mt-3 border-2 border-yellow-400"
            />
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black p-3 rounded font-semibold hover:bg-yellow-300 transition"
          >
            {loading ? 'Creating Event...' : 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
