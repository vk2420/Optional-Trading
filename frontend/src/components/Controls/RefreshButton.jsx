import React from 'react';

const RefreshButton = ({ onClick, loading }) => (
  <div className="card mb-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🔄</span>
        <div>
          <h3 className="text-lg font-semibold">Data Refresh</h3>
          <p className="text-sm text-gray-600">Update market data and strategies</p>
        </div>
      </div>
      
      <button
        onClick={onClick}
        disabled={loading}
        className={`btn btn-primary flex items-center gap-2 ${
          loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
        }`}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            <span>Refreshing...</span>
          </>
        ) : (
          <>
            <span>🔄</span>
            <span>Refresh Data</span>
          </>
        )}
      </button>
    </div>
    
    <div className="mt-3 p-2 bg-yellow-50 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-yellow-600">⏰</span>
        <span className="text-sm text-yellow-700">
          Auto-refresh every 30 seconds • Last updated: {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  </div>
);

export default RefreshButton; 