// Add Asset page component
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createAsset } from '../services/api';

function AddAsset() {
  const navigate = useNavigate();
  
  // Form state
  const [title, setTitle] = useState('');
  const [type, setType] = useState('note');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call create asset API
      await createAsset(title, type, content);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create asset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow mb-8">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Add New Asset</h1>
          <p className="text-gray-600">Store your digital legacy items securely</p>
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
            {/* Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Asset Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Bank Account Details, Important Passwords"
                required
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Asset Type *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="note">Note</option>
                <option value="password">Password</option>
                <option value="instruction">Instruction</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Content */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Content * (Will be encrypted)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="8"
                placeholder="Enter your sensitive information here. This will be encrypted before storage."
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                🔒 All content is encrypted using AES-256 encryption before being stored.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {loading ? 'Creating...' : 'Create Asset'}
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
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-blue-900 mb-2">💡 Tips</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use clear, descriptive titles for easy identification</li>
              <li>• All content is automatically encrypted before storage</li>
              <li>• You can assign this asset to beneficiaries later from the dashboard</li>
              <li>• Choose the asset type that best describes your content</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddAsset;