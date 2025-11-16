// Dashboard page - main hub showing assets and beneficiaries
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAssets, getBeneficiaries, assignAsset, activateLegacy, deleteAsset, deleteBeneficiary } from '../services/api';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [assets, setAssets] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Load data when component mounts
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Get user from localStorage
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);

      // Fetch assets and beneficiaries
      const [assetsData, beneficiariesData] = await Promise.all([
        getAssets(),
        getBeneficiaries()
      ]);

      setAssets(assetsData);
      setBeneficiaries(beneficiariesData);
    } catch (err) {
      console.error('Error loading dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Handle assigning asset to beneficiary
  const handleAssign = async (assetId, beneficiaryId) => {
    try {
      await assignAsset(assetId, beneficiaryId);
      setMessage('Asset assigned successfully!');
      loadDashboardData(); // Reload data
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to assign asset');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Handle legacy activation
  const handleActivateLegacy = async () => {
    if (!window.confirm('This will send emails to all beneficiaries. Continue?')) {
      return;
    }

    try {
      const result = await activateLegacy();
      setMessage(`Legacy activated! ${result.emailsSent} emails sent.`);
      setTimeout(() => setMessage(''), 5000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to activate legacy');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Handle delete asset
  const handleDeleteAsset = async (assetId) => {
    if (!window.confirm('Delete this asset?')) return;
    
    try {
      await deleteAsset(assetId);
      setMessage('Asset deleted successfully!');
      loadDashboardData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to delete asset');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Handle delete beneficiary
  const handleDeleteBeneficiary = async (beneficiaryId) => {
    if (!window.confirm('Delete this beneficiary?')) return;
    
    try {
      await deleteBeneficiary(beneficiaryId);
      setMessage('Beneficiary deleted successfully!');
      loadDashboardData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to delete beneficiary');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Digital Death Locker</h1>
            <p className="text-gray-600">Welcome, {user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Message display */}
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {message}
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            to="/add-asset"
            className="bg-blue-600 text-white p-6 rounded-lg text-center hover:bg-blue-700 transition"
          >
            <div className="text-2xl mb-2">📄</div>
            <div className="font-semibold">Add Asset</div>
          </Link>
          <Link
            to="/add-beneficiary"
            className="bg-green-600 text-white p-6 rounded-lg text-center hover:bg-green-700 transition"
          >
            <div className="text-2xl mb-2">👤</div>
            <div className="font-semibold">Add Beneficiary</div>
          </Link>
          <button
            onClick={handleActivateLegacy}
            className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 transition"
          >
            <div className="text-2xl mb-2">🚀</div>
            <div className="font-semibold">Activate Legacy</div>
          </button>
        </div>

        {/* Assets section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Assets ({assets.length})</h2>
          {assets.length === 0 ? (
            <p className="text-gray-500">No assets yet. Create your first asset!</p>
          ) : (
            <div className="space-y-4">
              {assets.map((asset) => (
                <div key={asset.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{asset.title}</h3>
                      <span className="text-sm bg-gray-200 px-2 py-1 rounded">{asset.type}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteAsset(asset.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-gray-700 mb-3">{asset.content}</p>
                  
                  {/* Assigned beneficiaries */}
                  <div className="mb-2">
                    <strong>Assigned to:</strong>{' '}
                    {asset.assignedBeneficiaries.length === 0 ? (
                      <span className="text-gray-500">None</span>
                    ) : (
                      asset.assignedBeneficiaries.map(b => b.name).join(', ')
                    )}
                  </div>

                  {/* Assign to beneficiary */}
                  {beneficiaries.length > 0 && (
                    <div className="flex gap-2 items-center">
                      <select
                        onChange={(e) => handleAssign(asset.id, e.target.value)}
                        className="border rounded px-3 py-2"
                        defaultValue=""
                      >
                        <option value="" disabled>Assign to beneficiary...</option>
                        {beneficiaries.map((ben) => (
                          <option key={ben._id} value={ben._id}>
                            {ben.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Beneficiaries section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Your Beneficiaries ({beneficiaries.length})</h2>
          {beneficiaries.length === 0 ? (
            <p className="text-gray-500">No beneficiaries yet. Add your first beneficiary!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {beneficiaries.map((ben) => (
                <div key={ben._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{ben.name}</h3>
                      <p className="text-gray-600">{ben.email}</p>
                      <p className="text-sm text-gray-500">Relation: {ben.relation}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteBeneficiary(ben._id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;