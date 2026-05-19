import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDoctorById, getDoctorReviews } from '../services/api';
import { useAuth } from '../context/AuthContext';

function DoctorProfile() {
  let { id } = useParams();
  let { user } = useAuth();
  let [doctor, setDoctor] = useState(null);
  let [reviews, setReviews] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(function() {
    async function fetchData() {
      try {
        const doctorData = await getDoctorById(id);
        const reviewsData = await getDoctorReviews(id);
        setDoctor(doctorData);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px', color: '#1B4332' }}>
      Loading...
    </div>
  );

  if (!doctor) return (
    <div style={{ textAlign: 'center', padding: '80px', color: '#1B4332' }}>
      Doctor not found
    </div>
  );

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{
        backgroundColor: '#1B4332',
        padding: '40px',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          gap: '32px',
          alignItems: 'center'
        }}>
          {/* Avatar */}
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: '#C9A84C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            fontWeight: 'bold',
            color: '#1B4332',
            flexShrink: 0
          }}>
            {doctor.name.replace('Dr. ', '').charAt(0)}
          </div>

          {/* Basic Info */}
          <div>
            <h1 style={{
              fontFamily: 'Georgia, serif',
              color: '#C9A84C',
              margin: '0 0 4px',
              fontSize: '32px'
            }}>
              {doctor.name}
            </h1>
            <p style={{ margin: '0 0 4px', fontSize: '18px', color: '#E8F5E9' }}>
              {doctor.title} — {doctor.specialty}
            </p>
            <p style={{ margin: '0 0 8px', color: '#E8F5E9' }}>
              📍 {doctor.location?.area}, {doctor.location?.city}, {doctor.location?.state}
            </p>
            <p style={{ margin: 0, color: '#C9A84C' }}>
              ⭐ {doctor.rating} rating • {doctor.experience} years experience
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '900px',
        margin: '32px auto',
        padding: '0 40px',
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: '32px'
      }}>

        {/* Left Column */}
        <div>
          {/* Bio */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ color: '#1B4332', marginTop: 0 }}>About</h2>
            <p style={{ color: '#444', lineHeight: '1.7' }}>{doctor.bio}</p>
          </div>

          {/* Details */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ color: '#1B4332', marginTop: 0 }}>Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <p style={{ color: '#666', fontSize: '13px', margin: '0 0 4px' }}>Visit Type</p>
                <p style={{ color: '#333', fontWeight: '600', margin: 0 }}>
                  {doctor.visitType?.inPerson && 'In Person'}
                  {doctor.visitType?.inPerson && doctor.visitType?.virtual && ' & '}
                  {doctor.visitType?.virtual && 'Virtual'}
                </p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '13px', margin: '0 0 4px' }}>Age Groups</p>
                <p style={{ color: '#333', fontWeight: '600', margin: 0 }}>
                  {doctor.ageGroups?.join(', ')}
                </p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '13px', margin: '0 0 4px' }}>Languages</p>
                <p style={{ color: '#333', fontWeight: '600', margin: 0 }}>
                  {doctor.languages?.join(', ')}
                </p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '13px', margin: '0 0 4px' }}>Insurance</p>
                <p style={{ color: '#333', fontWeight: '600', margin: 0 }}>
                  {doctor.insurance?.join(', ')}
                </p>
              </div>
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
              {doctor.lgbtqFriendly && (
                <span style={{
                  backgroundColor: '#E8F5E9',
                  color: '#1B4332',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: '600'
                }}>
                  LGBTQ+ Friendly
                </span>
              )}
              {doctor.genderAffirming && (
                <span style={{
                  backgroundColor: '#E8F5E9',
                  color: '#1B4332',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: '600'
                }}>
                  Gender Affirming
                </span>
              )}
            </div>
          </div>

          {/* Reviews */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ color: '#1B4332', marginTop: 0 }}>
              Patient Reviews ({reviews.length})
            </h2>
            {reviews.length === 0 ? (
              <p style={{ color: '#666' }}>No reviews yet. Be the first to leave a review!</p>
            ) : (
              reviews.map(review => (
                <div key={review._id} style={{
                  borderBottom: '1px solid #eee',
                  paddingBottom: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                  }}>
                    <span style={{ fontWeight: '600', color: '#1B4332' }}>
                      {review.user?.name}
                    </span>
                    <span style={{ color: '#C9A84C' }}>
                      {'⭐'.repeat(review.rating)}
                    </span>
                  </div>
                  <p style={{ color: '#444', margin: 0 }}>{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            position: 'sticky',
            top: '90px'
          }}>
            <h3 style={{ color: '#1B4332', marginTop: 0 }}>Book Appointment</h3>

            <div style={{ marginBottom: '16px' }}>
              <span style={{
                backgroundColor: doctor.acceptingPatients ? '#E8F5E9' : '#FFE8E8',
                color: doctor.acceptingPatients ? '#1B4332' : '#CC0000',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: '600'
              }}>
                {doctor.acceptingPatients ? '✓ Accepting Patients' : '✗ Not Accepting'}
              </span>
            </div>

            {doctor.contact?.phone && (
              <p style={{ color: '#444', fontSize: '14px', margin: '0 0 8px' }}>
                📞 {doctor.contact.phone}
              </p>
            )}

            {doctor.contact?.website && (
              <p style={{ color: '#444', fontSize: '14px', margin: '0 0 16px' }}>
                🌐 {doctor.contact.website}
              </p>
            )}

            {doctor.acceptingPatients && (
              <Link
                to={`/booking/${doctor._id}`}
                style={{
                  display: 'block',
                  backgroundColor: '#1B4332',
                  color: 'white',
                  textAlign: 'center',
                  padding: '12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  marginBottom: '12px'
                }}
              >
                Book Appointment
              </Link>
            )}

            {user && (
              <Link
                to={`/doctors/${id}/review`}
                style={{
                  display: 'block',
                  backgroundColor: 'white',
                  color: '#1B4332',
                  textAlign: 'center',
                  padding: '12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  border: '2px solid #1B4332'
                }}
              >
                Leave a Review
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;