import { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('https://full-stack-taskmanage-webapp-1.onrender.com/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200 || response.status === 201) {
        setSubmitSuccess(true);
      }
    } catch (error) {
      let errorMessage = 'Signup failed. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      setErrors({ ...errors, submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="mb-2">Account Created Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Welcome to Project Task Manager. Your account has been created and you can now start managing your tasks.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
-      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-xl mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <h1 className="mb-2">Create Your Account</h1>
          <p className="text-gray-600">
            Join Project Task Manager and start organizing your work
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5 ">
            <div>
              <label htmlFor="fullName" className="block text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`text-black w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.fullName
                    ? 'border-red-300 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200'
                }`}
                placeholder="John Doe"
              />
              {errors.fullName && (
                <div className="flex items-center gap-1 mt-1 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{errors.fullName}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={` text-black  w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.email
                    ? 'border-red-300 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200'
                }`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <div className="flex items-center gap-1 mt-1 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{errors.email}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={` text-black   w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors pr-12 ${
                    errors.password
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-1 mt-1 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{errors.password}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={` text-black   w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors pr-12 ${
                    errors.confirmPassword
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center gap-1 mt-1 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{errors.confirmPassword}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-700">
                Sign in
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-6 text-sm">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
