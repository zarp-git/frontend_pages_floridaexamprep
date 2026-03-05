"use client";

/**
 * StaticHeader - Versão estática do Header com CSS inline e JavaScript vanilla
 * Pronta para exportação HTML
 * 
 * Inclui dropdown de Courses e outros itens do menu
 */
export default function StaticHeader() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Rubik', sans-serif;
        }
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          width: 100%;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #e5e7eb;
          transition: all 0.3s;
        }
        .header.scrolled {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding-top: 8px;
          padding-bottom: 8px;
        }
        .header-container {
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          max-width: 100%;
          margin: 0;
        }
        @media (min-width: 768px) {
          .header-container {
            padding: 12px 112px;
            height: 72px;
          }
        }
        .header-logo {
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .header-logo:hover {
          transform: scale(1.05);
        }
        .header-logo img {
          height: 56px;
          width: auto;
        }
        .header-nav {
          display: none;
          align-items: center;
          gap: 4px;
        }
        @media (min-width: 1024px) {
          .header-nav {
            display: flex;
          }
        }
        .nav-item-wrapper {
          position: relative;
        }
        .nav-item {
          position: relative;
          color: #374151;
          font-size: 16px;
          font-weight: 500;
          font-family: 'Rubik', sans-serif;
          text-decoration: none;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          background: none;
          border: none;
        }
        .nav-item:hover {
          color: #2563eb;
          background-color: #f3f4f6;
        }
        .nav-item.active {
          color: #2563eb;
          background-color: #eff6ff;
        }
        .nav-item.disabled {
          pointer-events: none;
          opacity: 0.6;
        }
        .dropdown {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 8px;
          min-width: 256px;
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
          padding: 8px 0;
          z-index: 50;
        }
        .dropdown.open {
          display: block;
        }
        .dropdown-item {
          display: block;
          color: #374151;
          font-size: 14px;
          font-family: 'Rubik', sans-serif;
          text-decoration: none;
          padding: 10px 16px;
          transition: all 0.3s;
        }
        .dropdown-item:hover {
          color: #2563eb;
          background-color: #eff6ff;
        }
        .chevron {
          transition: transform 0.3s;
        }
        .chevron.open {
          transform: rotate(180deg);
        }
        .header-cta {
          display: none;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background-color: #25d366;
          color: white;
          font-weight: 600;
          font-size: 14px;
          font-family: 'Rubik', sans-serif;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        @media (min-width: 768px) {
          .header-cta {
            display: inline-flex;
          }
        }
        .header-cta:hover {
          background-color: #20ba5a;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .mobile-menu-toggle {
          display: block;
          padding: 10px;
          background: none;
          border: none;
          color: #374151;
          cursor: pointer;
          border-radius: 8px;
          transition: background-color 0.3s;
        }
        @media (min-width: 1024px) {
          .mobile-menu-toggle {
            display: none;
          }
        }
        .mobile-menu-toggle:hover {
          background-color: #f3f4f6;
        }
        .mobile-menu {
          display: none;
          position: fixed;
          top: 82px;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: white;
          z-index: 40;
          overflow-y: auto;
          padding: 24px 16px;
        }
        .mobile-menu.open {
          display: block;
        }
        .mobile-nav-item {
          display: block;
          color: #374151;
          font-size: 18px;
          font-weight: 500;
          font-family: 'Rubik', sans-serif;
          text-decoration: none;
          padding: 16px 0;
          border-bottom: 1px solid #e5e7eb;
          transition: color 0.3s;
        }
        .mobile-nav-item:hover {
          color: #2563eb;
        }
        .mobile-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          background-color: #25d366;
          color: white;
          font-weight: 600;
          font-size: 16px;
          font-family: 'Rubik', sans-serif;
          border-radius: 8px;
          text-decoration: none;
          margin-top: 24px;
          width: 100%;
          justify-content: center;
        }
        .header-spacer {
          height: 82px;
        }
        @media (min-width: 768px) {
          .header-spacer {
            height: 90px;
          }
        }
      `}} />

      <header className="header" id="main-header">
        <div className="header-container">
          <div className="header-logo">
            <a href="/">
              <img src="/images/logo/florida-logo-header.svg" alt="Florida Exam Prep Logo" />
            </a>
          </div>

          <nav className="header-nav">
            <a href="/" className="nav-item">Home</a>
            
            {/* Courses Dropdown */}
            <div className="nav-item-wrapper">
              <button className="nav-item disabled">
                Courses
                <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              <div className="dropdown" id="courses-dropdown">
                <a href="/courses/business-finance" className="dropdown-item">Business & Finance</a>
                <a href="/courses/contract-administration" className="dropdown-item">Contract Administration</a>
                <a href="/courses/complete-exam-prep" className="dropdown-item">Complete Exam Prep</a>
              </div>
            </div>

            <a href="/books" className="nav-item">Books</a>
            <a href="https://pay.floridaexamprep.com/buy/quizzes" className="nav-item">Quizzes</a>
            <a href="/florida-contractor-exam-pass-board" className="nav-item">Pass Board</a>
            <a href="/blog" className="nav-item">Blog</a>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href="https://wa.me/14436956218" target="_blank" rel="noopener noreferrer" className="header-cta">
              CONTACT US NOW
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
              </svg>
            </a>

            <button className="mobile-menu-toggle" id="mobile-menu-toggle">
              <span id="menu-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="header-spacer"></div>

      <div className="mobile-menu" id="mobile-menu">
        <a href="/" className="mobile-nav-item">Home</a>
        <a href="/courses/business-finance" className="mobile-nav-item">Business & Finance</a>
        <a href="/courses/contract-administration" className="mobile-nav-item">Contract Administration</a>
        <a href="/courses/complete-exam-prep" className="mobile-nav-item">Complete Exam Prep</a>
        <a href="/books" className="mobile-nav-item">Books</a>
        <a href="https://pay.floridaexamprep.com/buy/quizzes" className="mobile-nav-item">Quizzes</a>
        <a href="/florida-contractor-exam-pass-board" className="mobile-nav-item">Pass Board</a>
        <a href="/blog" className="mobile-nav-item">Blog</a>
        <a href="https://wa.me/14436956218" target="_blank" rel="noopener noreferrer" className="mobile-cta">
          CONTACT US NOW
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
          </svg>
        </a>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll', function() {
          const header = document.getElementById('main-header');
          if (header) {
            if (window.scrollY > 10) {
              header.classList.add('scrolled');
            } else {
              header.classList.remove('scrolled');
            }
          }
        });
        
        document.getElementById('mobile-menu-toggle').addEventListener('click', function() {
          const menu = document.getElementById('mobile-menu');
          const icon = document.getElementById('menu-icon');
          if (menu && icon) {
            menu.classList.toggle('open');
            icon.innerHTML = menu.classList.contains('open') 
              ? '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
              : '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
          }
        });
      `}} />
    </>
  );
}
