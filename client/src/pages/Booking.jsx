import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoctorById, bookAppointment } from '../services/api';
import { useAuth } from '../context/AuthContext';

function Booking() {
  let { id } = useParams();
  let { user } = useAuth();
  let navigate = useNavigate();
  let [doctor, setDoctor] = useState(null);
  let [date, setDate] = useState('');
  let [time, setTime] = useState('');
  let [reason, setReason] = useState('');
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState('');
  let [success, setSuccess] = useState(false);

  useEffect(function() {
    if (!user) {
      navigate('/login');
      return;
    }
    async function fetchDoctor() {
      const data = await getDoctorById(id);
      setDoctor(data);
    }
    fetchDoctor();
  }, [id, user]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await bookAppointment({
        doctorId: id,
        date,
        time,
        reason
      });

      if (data._id) {
        setSuccess(true);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#FAFAF8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          maxWidth: '400px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            fontSize: '60px',
            marginBottom: '16px'
          }}>✅</div>
          <h2 style={{ color: '#1B4332', marginBottom: '8px' }}>
            Appointment Booked!
          </h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            Your appointment with {doctor?.name} has been scheduled for {date} at {time}.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              backgroundColor: '#1B4332',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            View My Appointments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FAFAF8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '40px',
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#1B4332', marginTop: 0, fontFamily: 'Georgia, serif' }}>
          Book Appointment
        </h2>

        {doctor && (
          <div style={{
            backgroundColor: '#E8F5E9',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: '#1B4332',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#C9A84C',
              fontWeight: 'bold',
              fontSize: '20px',
              flexShrink: 0
            }}>
              {doctor.name.replace('Dr. ', '').charAt(0)}
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: '600', color: '#1B4332' }}>{doctor.name}</p>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{doctor.specialty}</p>
            </div>
          </div>
        )}

        {error && (
          <div style={{
            backgroundColor: '#FFE8E8',
            color: '#CC0000',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              color: '#1B4332',
              fontWeight: '600',
              marginBottom: '6px',
              fontSize: '14px'
            }}>
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              color: '#1B4332',
              fontWeight: '600',
              marginBottom: '6px',
              fontSize: '14px'
            }}>
              Time
            </label>
            <select
              value={time}
              onChange={e => setTime(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Select a time</option>
              {[
                '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
                '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
                '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
                '4:00 PM', '4:30 PM'
              ].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              color: '#1B4332',
              fontWeight: '600',
              marginBottom: '6px',
              fontSize: '14px'
            }}>
              Reason for Visit
            </label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              required
              rows={4}
              placeholder="Briefly describe the reason for your visit..."
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: loading ? '#666' : '#1B4332',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Booking...' : 'Confirm Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;