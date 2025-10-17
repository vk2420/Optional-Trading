import React from 'react';
import '../../styles/components.css';

const ExpiryCalendar = ({ selectedDate, onDateSelect, availableExpiries = [] }) => {
  console.log('ExpiryCalendar - Available expiries:', availableExpiries);

  const handleDateSelect = (dateString) => {
    console.log(`ExpiryCalendar - Date selected: ${dateString}`);
    onDateSelect(dateString);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Select Expiry';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
      border: '2px solid #3b82f6',
      borderRadius: '20px',
      padding: '28px',
      boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15)',
      marginBottom: '20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{
          padding: '12px',
          backgroundColor: '#dbeafe',
          borderRadius: '12px'
        }}>
          <span style={{ fontSize: '24px' }}>📅</span>
        </div>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>
            Select Expiry Date
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>
            Choose the expiry date for your options strategy
          </p>
        </div>
      </div>
      
      <div style={{
        padding: '16px',
        backgroundColor: '#ffffff',
        border: '2px solid #e5e7eb',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div style={{
          padding: '8px',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px'
        }}>
          <span style={{ fontSize: '16px' }}>📅</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>
            {formatDate(selectedDate)}
          </div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            {availableExpiries.length} expiry dates available
          </div>
        </div>
      </div>

      {/* Simple Dropdown */}
      <div>
        <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px', display: 'block' }}>
          Available Expiry Dates:
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {availableExpiries.map((date) => (
            <button
              key={date}
              onClick={() => handleDateSelect(date)}
              style={{
                padding: '16px',
                backgroundColor: selectedDate === date ? '#3b82f6' : '#ffffff',
                color: selectedDate === date ? '#ffffff' : '#374151',
                border: `2px solid ${selectedDate === date ? '#3b82f6' : '#e5e7eb'}`,
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                textAlign: 'left',
                boxShadow: selectedDate === date ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}
              onMouseEnter={(e) => {
                if (selectedDate !== date) {
                  e.target.style.backgroundColor = '#f3f4f6';
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedDate !== date) {
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                }
              }}
            >
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                {new Date(date).toLocaleDateString('en-IN', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                {date}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpiryCalendar;