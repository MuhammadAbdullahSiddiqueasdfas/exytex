import React from 'react';
import { useSearchParams } from 'react-router-dom';

const TestHirePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tech = searchParams.get('tech') || 'none';

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Test Hire Developer Page</h1>
      <p style={{ fontSize: '24px', color: 'blue' }}>Technology: {tech}</p>
      <p style={{ fontSize: '18px', marginTop: '20px' }}>
        If you can see this page, routing is working!
      </p>
      <div style={{ marginTop: '30px' }}>
        <a href="/hire-developer" style={{ color: 'blue', textDecoration: 'underline' }}>
          Back to Hire Developer
        </a>
      </div>
    </div>
  );
};

export default TestHirePage;
