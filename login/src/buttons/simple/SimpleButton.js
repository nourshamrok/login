import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './SimpleButton.scss';

function SimpleButton({ icon, label, width }) {
  const buttonStyle = {
    width: width ? width : width
  };

  return (
    <button className="icon-button" style={buttonStyle} >

      {icon && <div className={`${icon}`}></div>}
      <div className='label'>{label}   </div>



    </button >
  );
}

export default SimpleButton;