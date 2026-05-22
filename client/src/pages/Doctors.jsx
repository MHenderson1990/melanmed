import AIChat from '../components/AIChat';
import { useState, useEffect } from 'react';
import { getAllDoctors } from '../services/api';
import DoctorCard from '../components/DoctorCard';

function Doctors() {
  let [doctors, setDoctors] = useState([]);
  let [loading, setLoading] = useState(true);
  let [search, setSearch] = useState('');
  let [filters, setFilters] = useState({
    specialty: '',
    gender: '',
    lgbtqFriendly: false,
    genderAffirming: false,
    acceptingPatients: false,
    virtual: false
  });

  useEffect(function() {
    async function fetchDoctors() {
      try {
        const data = await getAllDoctors();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  // filter doctors based on search and filters
  let filteredDoctors = doctors.filter(doctor => {
    if (search && !doctor.name.toLowerCase().includes(search.toLowerCase()) &&
        !doctor.specialty.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (filters.specialty && doctor.specialty !== filters.specialty) return false;
    if (filters.gender && doctor.gender !== filters.gender) return false;
    if (filters.lgbtqFriendly && !doctor.lgbtqFriendly) return false;
    if (filters.genderAffirming && !doctor.genderAffirming) return false;
    if (filters.acceptingPatients && !doctor.acceptingPatients) return false;
    if (filters.virtual && !doctor.visitType?.virtual) return false;
    return true;
  });

  function handleFilterChange(e) {
    let { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  function clearFilters() {
    setFilters({
      specialty: '',
      gender: '',
      lgbtqFriendly: false,
      genderAffirming: false,
      acceptingPatients: false,
      virtual: false
    });
    setSearch('');
  }

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px', color: '#1B4332' }}>
      Loading doctors...
    </div>
  );

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh' }}>

      {/* Page Header */}
      <div style={{
        backgroundColor: '#1B4332',
        padding: '40px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{
          fontFamily: 'Georgia, serif',
          color: '#C9A84C',
          fontSize: '36px',
          marginBottom: '16px'
        }}>
          Find Your Doctor
        </h1>
        <input
          type="text"
          placeholder="Search by name or specialty..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '12px 20px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '16px',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '24px', padding: '32px 40px' }}>

        {/* Filter Sidebar */}
        <div style={{
          width: '260px',
          flexShrink: 0,
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          height: 'fit-content',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{ color: '#1B4332', margin: 0 }}>Filters</h3>
            <button
              onClick={clearFilters}
              style={{
                background: 'none',
                border: 'none',
                color: '#C9A84C',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              Clear All
            </button>
          </div>

          {/* Specialty Filter */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', color: '#1B4332', display: 'block', marginBottom: '8px' }}>
              Specialty
            </label>
            <select
              name="specialty"
              value={filters.specialty}
              onChange={handleFilterChange}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            >
              <option value="">All Specialties</option>
              {['Primary Care', 'Pediatrics', 'OB/GYN', 'Psychiatry',
                'Therapy & Counseling', 'Dermatology', 'Cardiology',
                'Orthopedics', 'Neurology', 'Internal Medicine'
              ].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Gender Filter */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', color: '#1B4332', display: 'block', marginBottom: '8px' }}>
              Doctor Gender
            </label>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            >
              <option value="">Any Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Checkbox Filters */}
          {[
            { name: 'lgbtqFriendly', label: 'LGBTQ+ Friendly' },
            { name: 'genderAffirming', label: 'Gender Affirming' },
            { name: 'acceptingPatients', label: 'Accepting Patients' },
            { name: 'virtual', label: 'Virtual Visits' }
          ].map(filter => (
            <label key={filter.name} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#333'
            }}>
              <input
                type="checkbox"
                name={filter.name}
                checked={filters[filter.name]}
                onChange={handleFilterChange}
                style={{ accentColor: '#1B4332' }}
              />
              {filter.label}
            </label>
          ))}
        </div>

        {/* Doctor Cards Grid */}
        <div style={{ flex: 1 }}>
          <p style={{ color: '#666', marginBottom: '16px' }}>
            {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
          </p>
          {filteredDoctors.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>
              <p>No doctors match your filters.</p>
              <button onClick={clearFilters} style={{
                backgroundColor: '#1B4332',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '12px'
              }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {filteredDoctors.map(doctor => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </div>
      <AIChat />
    </div>
  );
}

export default Doctors;