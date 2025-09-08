import React from 'react';
import { useState } from 'react';
import WhatsappIcon from '../../assets/images/whatsapp.png'; // replace with your icon file
import WhatsappQr from '../../assets/images/whatsappqr.png'; // replace with your icon file

function Floatingicon() {
  const [showMsg, setShowMsg] = useState(false);

  const handleMouseOver = () => {
    setShowMsg(true);
  };

  const handleMouseOut = () => {
    setShowMsg(false);
  };

  return (
    <div className='fixed top-auto bottom-0 right-0 left-auto' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <a
        href="https://api.whatsapp.com/send/?phone=919205627825&text=Hi&type=phone_number&app_absent=0"
        target="_blank"
        id="whatsapp"
      >
        <img
          src={WhatsappIcon}
          width="120"
          height="auto"
          alt="whatsapp"
          className="WAWEB"
        />
      </a>
      {showMsg && (
        <div className="msg border-2 rounded-lg p-4 w-52 text-center bg-gray-50 absolute top-auto left-auto bottom-0 transform -translate-x-1/2 -translate-y-26 shadow-md">
          <div className="QR">
            <p className="two mb-0">Scan QR to chat on WhatsApp</p>
            <img
              src={WhatsappQr}
              width="250"
              alt="qr"
              className="img-fluid"
            />
            <p className="two mb-0">+91 9205-627-825</p>
          </div>
          {/* <div className="content">
            <p className="one mb-0">Need help? Scan QR CODE </p>
            <span>or</span>
            <p className="two">Chat on +91 9205-627-825</p>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default Floatingicon;
