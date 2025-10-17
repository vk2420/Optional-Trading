import React from 'react';
import ExpiryCalendar from './ExpiryCalendar';

const FilterControls = ({ filters, onChange, expiries = [] }) => {
  return (
    <div className="mb-6">
      {/* Expiry Calendar */}
      <ExpiryCalendar
        selectedDate={filters.expiry}
        onDateSelect={(date) => {
          console.log(`FilterControls - Date selected: ${date}`);
          console.log(`FilterControls - Current filters:`, filters);
          onChange({ ...filters, expiry: date });
        }}
        availableExpiries={expiries}
      />
      
      {/* Other Filters */}
      <div className="card mt-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔧</span>
          <div>
            <h3 className="text-lg font-semibold">Additional Filters</h3>
            <p className="text-sm text-gray-600">Customize your strategy search criteria</p>
          </div>
        </div>
        
        <div className="grid grid-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Risk %</label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={100}
                className="input w-full"
                value={filters.risk}
                onChange={e => onChange({ ...filters, risk: e.target.value })}
                placeholder="0"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Probability Threshold</label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={100}
                className="input w-full"
                value={filters.prob}
                onChange={e => onChange({ ...filters, prob: e.target.value })}
                placeholder="85"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-green-600">📊</span>
            <span className="text-sm text-green-700">
              Showing strategies with probability ≥ {filters.prob || 85}% and risk/reward ≥ {filters.risk || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls; 