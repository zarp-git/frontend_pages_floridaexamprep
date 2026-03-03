"use client";

/**
 * StaticFooter - Versão estática do Footer com CSS inline
 * Pronta para exportação HTML
 */
export default function StaticFooter() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .footer {
          width: 100%;
          background-color: white;
        }
        .footer-content {
          max-width: 100%;
          margin: 0;
          padding: 48px 16px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .footer-main {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .footer-top {
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        @media (min-width: 1024px) {
          .footer-top {
            flex-direction: row;
          }
        }
        .footer-left {
          padding: 48px 40px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: center;
        }
        @media (min-width: 1024px) {
          .footer-left {
            border-bottom: none;
            border-right: 1px solid #e5e7eb;
            max-width: 448px;
          }
        }
        .footer-left-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .footer-logo {
          height: 80px;
          width: fit-content;
        }
        .footer-description {
          color: #374151;
          font-size: 16px;
          font-family: 'Rubik', sans-serif;
          line-height: 1.6;
        }
        .footer-address-label {
          color: #374151;
          font-size: 14px;
          font-weight: 500;
          font-family: 'Rubik', sans-serif;
        }
        .footer-address-text {
          color: #374151;
          font-size: 14px;
          font-family: 'Rubik', sans-serif;
          line-height: 1.4;
        }
        .footer-right {
          padding: 48px 40px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          flex: 1;
        }
        .footer-sections {
          display: flex;
          flex-wrap: wrap;
          gap: 48px;
        }
        .footer-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .footer-section-title {
          color: #1f2937;
          font-size: 18px;
          font-weight: 500;
          font-family: 'Rubik', sans-serif;
          text-transform: uppercase;
        }
        .footer-divider {
          width: 40px;
          height: 2px;
          background-color: #ea580c;
          border-radius: 8px;
        }
        .footer-link {
          color: #6b7280;
          font-size: 16px;
          font-weight: 500;
          font-family: 'Rubik', sans-serif;
          text-decoration: underline;
          line-height: 2;
        }
        .footer-link:hover {
          color: #2563eb;
        }
        .footer-phone {
          color: #262626;
          font-size: 24px;
          font-weight: 600;
          font-family: 'Rubik', sans-serif;
          text-decoration: none;
        }
        .footer-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          background-color: #2563eb;
          color: white;
          font-weight: 600;
          font-family: 'Rubik', sans-serif;
          border-radius: 12px;
          text-decoration: none;
        }
        .footer-cta:hover {
          background-color: #1d4ed8;
        }
        .footer-bottom-links {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 32px;
        }
        .footer-social {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .footer-social a {
          opacity: 1;
          transition: opacity 0.3s;
        }
        .footer-social a:hover {
          opacity: 0.7;
        }
        .footer-copyright {
          width: 100% !important;
          background-color: black;
          border-top: 1px solid #1f2937;
        }
        .footer-copyright-content {
          max-width: 100%;
          margin: 0;
          padding: 24px 16px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .footer-copyright-text {
          color: #9ca3af;
          font-size: 16px;
          font-family: 'Rubik', sans-serif;
        }
      `}} />

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-top">
              <div className="footer-left">
                <div className="footer-left-content">
                  <img src="/images/logo/logofooter.svg" alt="Florida Exam Prep" className="footer-logo" />
                  
                  <p className="footer-description">
                    I help future contractors pass their Florida State Exams first try so you never have to worry about it again!
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <p className="footer-address-label">ORLANDO OFFICE</p>
                    </div>
                    <p className="footer-address-text">
                      6996 Piazza Grande Ave STE 309, Orlando, FL 32835
                    </p>
                  </div>
                </div>
              </div>

              <div className="footer-right">
                <div className="footer-sections">
                  <div className="footer-section">
                    <div>
                      <h3 className="footer-section-title">SOME OF OUR COURSES</h3>
                      <div className="footer-divider"></div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <a href="/courses/business-finance" className="footer-link">Business And Finance</a>
                      <a href="/courses/contract-administration" className="footer-link">Contract Administration</a>
                      <a href="/courses/complete-exam-prep" className="footer-link">Complete Exam Prep</a>
                    </div>
                  </div>

                  <div className="footer-section">
                    <div>
                      <h3 className="footer-section-title">CONTACT US NOW</h3>
                      <div className="footer-divider"></div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <p style={{ color: '#374151', fontSize: '12px', fontFamily: 'Rubik, sans-serif' }}>
                          <span style={{ fontWeight: 500 }}>FROM MON TO SAT</span> : <span>9AM - 5PM</span>
                        </p>
                      </div>
                      <a href="tel:+14074490000" className="footer-phone">(407) 449-0000</a>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <a href="/checkout" className="footer-cta">
                    GET THAT APPROVAL RIGHT AWAY
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="footer-bottom-links">
              <div className="footer-section">
                <div>
                  <h3 className="footer-section-title">COMPANY</h3>
                  <div className="footer-divider"></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <a href="/about" style={{ color: '#374151', fontSize: '16px', fontFamily: 'Rubik, sans-serif', textDecoration: 'none' }}>About Us</a>
                  <a href="/contact" style={{ color: '#374151', fontSize: '16px', fontFamily: 'Rubik, sans-serif', textDecoration: 'none' }}>Contact</a>
                </div>
              </div>

              <div className="footer-section">
                <div>
                  <h3 className="footer-section-title">FOLLOW US</h3>
                  <div className="footer-divider"></div>
                </div>
                <div className="footer-social">
                  <a href="https://www.instagram.com/floridaexamprep/" target="_blank" rel="noopener noreferrer">
                    <img src="/images/brands/instagram-icon.svg" alt="Instagram" style={{ width: '36px', height: '36px' }} />
                  </a>
                  <a href="https://www.facebook.com/people/Florida-Exam-Prep/61577610429350/" target="_blank" rel="noopener noreferrer">
                    <img src="/images/brands/facebook-icon.svg" alt="Facebook" style={{ width: '36px', height: '36px' }} />
                  </a>
                  <a href="https://www.youtube.com/@Cruzvinci" target="_blank" rel="noopener noreferrer">
                    <img src="/images/svg/youtubeicon.svg" alt="YouTube" style={{ width: '36px', height: '36px' }} />
                  </a>
                  <a href="https://wa.me/14436956218" target="_blank" rel="noopener noreferrer">
                    <img src="/images/svg/whatsapp-icon.svg" alt="WhatsApp" style={{ width: '36px', height: '36px' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <div className="footer-copyright-content">
            <p className="footer-copyright-text">
              FLORIDA EXAM PREP © Copyright 2026 - All Rights Reserved.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a href="https://www.zarpstudio.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <span style={{ color: '#6b7280', fontSize: '16px', fontFamily: 'Rubik, sans-serif' }}>Developed and Maintained by</span>
                <img src="/images/brands/zarp-logomark.svg" alt="Zarp Studio" style={{ height: '20px', width: 'auto' }} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
