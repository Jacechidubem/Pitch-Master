import React from 'react';

const LandscapeWarning = () => {
  return (
    <div className="landscape-warning">
      <div className="warning-content">
        <div className="icon">🔄</div>
        <h2>Please Rotate Your Phone</h2>
        <p>Pitch Master works best in Landscape mode.</p>
      </div>
    </div>
  );
};

export default LandscapeWarning;