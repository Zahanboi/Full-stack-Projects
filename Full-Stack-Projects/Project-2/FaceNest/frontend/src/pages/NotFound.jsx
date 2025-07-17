import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const containerStyle = {
    height: '100vh',
    width: '100%',
    background: 'linear-gradient(to bottom right, #e0e7ff, #f3f4f6)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '8rem',
    fontWeight: '900',
    color: '#4f46e5',
    margin: '0',
  };

  const subheadingStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: '1rem 0 0.5rem 0',
  };

  const paragraphStyle = {
    fontSize: '1.1rem',
    color: '#4b5563',
    maxWidth: '500px',
    marginBottom: '2rem',
  };

  const buttonStyle = {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  };

  const imageStyle = {
    width: '300px',
    marginTop: '2rem',
    filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.1))',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>404</h1>
      <h2 style={subheadingStyle}>Oops! Page not found</h2>
      <p style={paragraphStyle}>
        The page you're looking for doesn't exist or has been moved. Let's get you back home!
      </p>
      <button
        onClick={() => navigate("/")}
        style={buttonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#4338ca")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#4f46e5")}
      >
        ⬅ Back to Home
      </button>
      <img
        src="https://illustrations.popsy.co/gray/web-design.svg"
        alt="Not Found Illustration"
        style={imageStyle}
      />
    </div>
  );
}
