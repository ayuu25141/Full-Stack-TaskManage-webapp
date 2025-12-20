// src/Page/Login.jsx
import { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { API_URL } from '../config';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email address';

    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });

      // Save token & user
      localStorage.setItem('token', response.data.token);
      login(response.data.user);

      navigate('/dashboard');
    } catch (error) {
      let errorMessage = 'Login failed. Please try again.';
      if (error.response) {
        if (error.response.status === 401) errorMessage = 'Invalid email or password';
        else if (error.response.data?.error) errorMessage = error.response.data.error;
      }
      setErrors({ ...errors, submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {errors.submit && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{errors.submit}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
            />
            {errors.email && <p className="mt-1 text-red-600 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={isSubmitting}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 pr-12 ${
                  errors.password ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                disabled={isSubmitting}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-red-600 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href={`${API_URL}/register`} className="text-blue-600 hover:text-blue-500 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
