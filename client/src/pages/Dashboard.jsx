import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyAppointments, cancelAppointment } from '../services/api';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  let { user, logout } = useAuth();
  let navigate = useNavigate();
  let [appointments, setAppointments] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(function() {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchAppointments();
  }, [user]);

  async function fetchAppointments() {
    try {
      const data = await getMyAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel(id) {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      await cancelAppointment(id);
      fetchAppointments();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  }

  let upcoming = appointments.filter(a => a.status !== 'cancelled');
  let cancelled = appointments.filter(a => a.status === 'cancelled');

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px', color: '#1B4332' }}>
      Loading your appointments...
    </div>
  );

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh', padding: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            color: '#1B4332',
            fontFamily: 'Georgia, serif',
            margin: '0 0 8px'
          }}>
            Welcome, {user?.name}
          </h1>
          <p style={{ color: '#666', margin: 0 }}>
            Manage your appointments here
          </p>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <button
            onClick={() => navigate('/doctors')}
            style={{
              backgroundColor: '#1B4332',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Find a Doctor
          </button>
          <button
            onClick={() => { logout(); navigate('/'); }}
            style={{
              backgroundColor: 'white',
              color: '#1B4332',
              border: '2px solid #1B4332',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>

        {/* Upcoming Appointments */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ color: '#1B4332', marginTop: 0 }}>
            Upcoming Appointments ({upcoming.length})
          </h2>

          {upcoming.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <p>No upcoming appointments.</p>
              <button
                onClick={() => navigate('/doctors')}
                style={{
                  backgroundColor: '#1B4332',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Book Your First Appointment
              </button>
            </div>
          ) : (
            upcoming.map(appointment => (
              <div key={appointment._id} style={{
                border: '1px solid #E8F5E9',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {/* Avatar */}
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
                    {appointment.doctor?.name?.replace('Dr. ', '').charAt(0)}
                  </div>

                  <div>
                    <p style={{ margin: '0 0 4px', fontWeight: '600', color: '#1B4332' }}>
                      {appointment.doctor?.name}
                    </p>
                    <p style={{ margin: '0 0 4px', color: '#666', fontSize: '14px' }}>
                      {appointment.doctor?.specialty}
                    </p>
                    <p style={{ margin: '0 0 4px', color: '#444', fontSize: '14px' }}>
                      📅 {appointment.date} at {appointment.time}
                    </p>
                    <p style={{ margin: 0, color: '#444', fontSize: '14px' }}>
                      Reason: {appointment.reason}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{
                    backgroundColor: '#E8F5E9',
                    color: '#1B4332',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textAlign: 'center'
                  }}>
                    {appointment.status}
                  </span>
                  <button
                    onClick={() => handleCancel(appointment._id)}
                    style={{
                      backgroundColor: 'white',
                      color: '#CC0000',
                      border: '1px solid #CC0000',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cancelled Appointments */}
        {cancelled.length > 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ color: '#666', marginTop: 0 }}>
              Cancelled Appointments ({cancelled.length})
            </h2>
            {cancelled.map(appointment => (
              <div key={appointment._id} style={{
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
                opacity: 0.6
              }}>
                <p style={{ margin: '0 0 4px', fontWeight: '600', color: '#666' }}>
                  {appointment.doctor?.name}
                </p>
                <p style={{ margin: '0 0 4px', color: '#666', fontSize: '14px' }}>
                  📅 {appointment.date} at {appointment.time}
                </p>
                <span style={{
                  backgroundColor: '#FFE8E8',
                  color: '#CC0000',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  Cancelled
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;