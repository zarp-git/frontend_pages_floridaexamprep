"use client";

// import StaticHeader from "./StaticHeader";
import StaticFAQ from "./StaticFAQ";
// import StaticFooter from "./StaticFooter";

/**
 * StaticCheckout Component
 * 
 * Página para exportação HTML via extensão.
 * Acesse: http://localhost:3000/static
 * 
 * Contém:
 * - Header (Navbar) - versão estática com inline CSS (REMOVED)
 * - FAQ Section - versão estática com inline CSS
 * - Footer - versão estático com inline CSS (REMOVED)
 * 
 * Todos os componentes usam inline styles e vanilla JavaScript
 * para funcionar após exportação HTML.
 */
export default function StaticCheckout() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700;800;900&family=Rubik:wght@300;400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html, body {
          width: 100%;
          min-height: 100vh;
          background-color: white;
          font-family: 'Rubik', sans-serif;
        }
      `}} />
      
      {/* <StaticHeader /> */}
      <StaticFAQ />
      {/* <StaticFooter /> */}
    </>
  );
}
