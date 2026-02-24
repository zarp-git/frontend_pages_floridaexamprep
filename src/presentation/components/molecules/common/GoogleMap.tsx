import React from 'react';

export default function GoogleMap() {
  return (
    <div className="w-full h-full min-h-[300px] bg-gray-100 rounded-lg overflow-hidden relative">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: '300px' }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112185.73352726588!2d-81.4582967202302!3d28.53833549999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e773d8fec8638d%3A0x4bc8d26b04a79691!2sOrlando%2C%20FL!5e0!3m2!1sen!2sbr!4v1706640000000!5m2!1sen!2sbr"
        title="Google Map location"
      ></iframe>
      <div className="absolute inset-0 pointer-events-none border border-gray-200/50 rounded-lg" />
    </div>
  );
}
