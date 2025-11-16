// Add Beneficiary page component
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createBeneficiary } from '../services/api';

function AddBeneficiary() {
  const navigate = useNavigate();
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [relation, setRelation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call create beneficiary API
      await createBeneficiary(name, email, relation);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add beneficiary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow mb-8">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Add Beneficiary</h1>
          <p className="text-gray-600">Add people who will receive your digital legacy</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., John Smith"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="beneficiary@example.com"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                This email will receive notifications when legacy is activated
              </p>
            </div>

            {/* Relation */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Relation *
              </label>
              <input
                type="text"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Son, Daughter, Friend, Lawyer, Spouse"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Describe your relationship with this person
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
              >
                {loading ? 'Adding...' : 'Add Beneficiary'}
              </button>
              <Link
                to="/dashboard"
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition text-center"
              >
                Cancel
              </Link>
            </div>
          </form>

          {/* Info section */}
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-green-900 mb-2">👥 About Beneficiaries</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Beneficiaries will receive your assets when you activate your legacy</li>
              <li>• You can assign specific assets to specific beneficiaries</li>
              <li>• Make sure to use a valid email address for notifications</li>
              <li>• You can add multiple beneficiaries and manage them from the dashboard</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddBeneficiary;