import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div style={{
        backgroundColor: '#1B4332',
        color: 'white',
        padding: '80px 40px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontFamily: 'Georgia, serif',
          color: '#C9A84C',
          marginBottom: '20px'
        }}>
          Care That Understands You.
        </h1>
        <p style={{
          fontSize: '20px',
          maxWidth: '600px',
          margin: '0 auto 40px',
          lineHeight: '1.6',
          color: '#E8F5E9'
        }}>
          Find Black doctors in the DFW area who understand your lived 
          experience and provide culturally affirming care.
        </p>
        <Link to="/doctors" style={{
          backgroundColor: '#C9A84C',
          color: '#1B4332',
          padding: '16px 40px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '18px'
        }}>
          Find a Doctor
        </Link>
      </div>

      {/* Specialties Section */}
      <div style={{
        padding: '60px 40px',
        backgroundColor: '#FAFAF8',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '32px',
          color: '#1B4332',
          marginBottom: '40px',
          fontFamily: 'Georgia, serif'
        }}>
          Browse by Specialty
        </h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {[
            'Primary Care',
            'Pediatrics',
            'OB/GYN',
            'Psychiatry',
            'Therapy & Counseling',
            'Dermatology',
            'Cardiology',
            'Orthopedics',
            'Neurology',
            'Internal Medicine'
          ].map(specialty => (
            <Link
              key={specialty}
              to={`/doctors?specialty=${specialty}`}
              style={{
                backgroundColor: 'white',
                border: '2px solid #1B4332',
                color: '#1B4332',
                padding: '10px 20px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              {specialty}
            </Link>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div style={{
        padding: '60px 40px',
        textAlign: 'center',
        backgroundColor: 'white'
      }}>
        <h2 style={{
          fontSize: '32px',
          color: '#1B4332',
          marginBottom: '40px',
          fontFamily: 'Georgia, serif'
        }}>
          How It Works
        </h2>
        <div style={{
          display: 'flex',
          gap: '40px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {[
            { step: '1', title: 'Search', desc: 'Browse Black doctors in DFW by specialty, gender, and more' },
            { step: '2', title: 'Choose', desc: 'Read profiles, reviews, and find the right fit for your needs' },
            { step: '3', title: 'Book', desc: 'Schedule your appointment online in just a few clicks' }
          ].map(item => (
            <div key={item.step} style={{
              maxWidth: '250px',
              textAlign: 'center'
            }}>
              <div style={{
                backgroundColor: '#1B4332',
                color: '#C9A84C',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                margin: '0 auto 16px'
              }}>
                {item.step}
              </div>
              <h3 style={{ color: '#1B4332', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        backgroundColor: '#1B4332',
        color: 'white',
        padding: '60px 40px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontFamily: 'Georgia, serif',
          color: '#C9A84C',
          marginBottom: '16px'
        }}>
          Ready to Find Your Doctor?
        </h2>
        <p style={{
          fontSize: '18px',
          marginBottom: '32px',
          color: '#E8F5E9'
        }}>
          Join thousands of patients who found care that truly understands them.
        </p>
        <Link to="/register" style={{
          backgroundColor: '#C9A84C',
          color: '#1B4332',
          padding: '16px 40px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '18px'
        }}>
          Get Started Today
        </Link>
      </div>
    </div>
  );
}

export default Home;