import { Link } from 'react-router-dom';

function DoctorCard({ doctor }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      }}
    >
      {/* Doctor Image */}
      <div style={{
        backgroundColor: '#1B4332',
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#C9A84C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          color: '#1B4332',
          fontWeight: 'bold'
        }}>
         {doctor.name.replace('Dr. ', '').charAt(0)}
        </div>
      </div>

      {/* Doctor Info */}
      <div style={{ padding: '20px' }}>
        <h3 style={{
          color: '#1B4332',
          margin: '0 0 4px',
          fontSize: '16px'
        }}>
          {doctor.name}
        </h3>
        <p style={{
          color: '#C9A84C',
          fontWeight: '600',
          margin: '0 0 8px',
          fontSize: '14px'
        }}>
          {doctor.specialty}
        </p>
        <p style={{
          color: '#666',
          fontSize: '13px',
          margin: '0 0 12px'
        }}>
          📍 {doctor.location?.area}, {doctor.location?.city}
        </p>

        {/* Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
          {doctor.lgbtqFriendly && (
            <span style={{
              backgroundColor: '#E8F5E9',
              color: '#1B4332',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: '600'
            }}>
              LGBTQ+ Friendly
            </span>
          )}
          {doctor.genderAffirming && (
            <span style={{
              backgroundColor: '#E8F5E9',
              color: '#1B4332',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: '600'
            }}>
              Gender Affirming
            </span>
          )}
          {doctor.visitType?.virtual && (
            <span style={{
              backgroundColor: '#FFF8E7',
              color: '#C9A84C',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: '600'
            }}>
              Virtual Available
            </span>
          )}
        </div>

        {/* Rating and Status */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <span style={{ color: '#666', fontSize: '13px' }}>
            ⭐ {doctor.rating} rating
          </span>
          <span style={{
            backgroundColor: doctor.acceptingPatients ? '#E8F5E9' : '#FFE8E8',
            color: doctor.acceptingPatients ? '#1B4332' : '#CC0000',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: '600'
          }}>
            {doctor.acceptingPatients ? 'Accepting Patients' : 'Not Accepting'}
          </span>
        </div>

        {/* View Profile Button */}
        <Link
          to={`/doctors/${doctor._id}`}
          style={{
            display: 'block',
            backgroundColor: '#1B4332',
            color: 'white',
            textAlign: 'center',
            padding: '10px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}

export default DoctorCard;