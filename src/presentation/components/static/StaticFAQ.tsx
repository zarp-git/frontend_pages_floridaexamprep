"use client";

import { useEffect } from "react";

/**
 * StaticFAQ - Versão estática do FAQ com CSS inline e JavaScript vanilla
 * Pronta para exportação HTML
 */
export default function StaticFAQ() {
  useEffect(() => {
    const faqData = [
      {
        question: "Why should I invest in this course instead of studying on my own?",
        answer: "Our course provides structured, expert-guided content that covers exactly what you need to pass. We've distilled years of experience into a clear path to success, saving you countless hours of confusion and uncertainty."
      },
      {
        question: "What's included in the course?",
        answer: "Full breakdown of the Florida Contractor's Manual, Builder's Guide to Accounting essentials, AIA documents guidance, study plan, 20+ practice quizzes, exam simulator, simplified math explanations, and 24/7 access for 12 months."
      },
      {
        question: "Will this course actually help me pass?",
        answer: "Yes! Over 150 students have passed using our methods. We offer a personal coaching guarantee - if you complete the full course and don't pass, we'll personally coach you until you do."
      },
      {
        question: "Will I learn how to use the books during the test?",
        answer: "Absolutely. We teach you exactly how to navigate and use the reference materials efficiently during the exam, which is crucial for success."
      }
    ];
    
    const container = document.getElementById('faq-questions');
    if (!container) return;
    
    // Limpa o container
    container.innerHTML = '';
    
    faqData.forEach((item) => {
      const faqItem = document.createElement('div');
      faqItem.className = 'faq-item';
      
      const button = document.createElement('button');
      button.className = 'faq-question';
      button.innerHTML = '<span class="faq-question-text">' + item.question + '</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';
      
      const answer = document.createElement('div');
      answer.className = 'faq-answer';
      answer.innerHTML = '<p class="faq-answer-text">' + item.answer + '</p>';
      
      button.onclick = function() {
        answer.classList.toggle('open');
        const icon = button.querySelector('.faq-icon');
        if (icon) icon.classList.toggle('open');
      };
      
      faqItem.appendChild(button);
      faqItem.appendChild(answer);
      container.appendChild(faqItem);
    });
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .faq-section {
          width: 100%;
          padding: 48px 16px;
          background-color: transparent;
        }
        .faq-container {
          max-width: 100%;
          margin: 0;
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          gap: 48px;
        }
        @media (min-width: 768px) {
          .faq-container {
            flex-direction: row;
          }
        }
        .faq-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          width: 100%;
        }
        @media (min-width: 768px) {
          .faq-left {
            max-width: 554px;
            align-items: flex-start;
          }
        }
        .faq-badge {
          width: 224px;
          height: 224px;
        }
        .faq-title {
          color: #002770;
          font-size: 28px;
          font-weight: 800;
          font-family: 'Red Hat Display', sans-serif;
          line-height: 1.2;
          text-align: center;
        }
        @media (min-width: 768px) {
          .faq-title {
            text-align: left;
          }
        }
        .faq-description {
          color: #374151;
          font-size: 16px;
          font-family: 'Rubik', sans-serif;
          line-height: 1.6;
          max-width: 448px;
          text-align: center;
        }
        @media (min-width: 768px) {
          .faq-description {
            text-align: left;
          }
        }
        .faq-cta {
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
          transition: background-color 0.3s;
        }
        .faq-cta:hover {
          background-color: #1d4ed8;
        }
        .faq-right {
          display: flex;
          flex-direction: column;
          gap: 24px;
          flex: 1;
        }
        .faq-heading {
          color: #002770;
          font-size: 32px;
          font-weight: 800;
          font-family: 'Red Hat Display', sans-serif;
          text-transform: uppercase;
          line-height: 1.2;
        }
        .faq-item {
          border-bottom: 1px solid #e5e7eb;
        }
        .faq-question {
          width: 100%;
          padding: 20px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Rubik', sans-serif;
        }
        .faq-question:hover {
          color: #2563eb;
        }
        .faq-question-text {
          color: #1f2937;
          font-size: 16px;
          font-weight: 500;
        }
        .faq-icon {
          flex-shrink: 0;
          transition: transform 0.3s;
          stroke: #6b7280;
        }
        .faq-icon.open {
          transform: rotate(180deg);
          stroke: #2563eb;
        }
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        .faq-answer.open {
          max-height: 500px;
        }
        .faq-answer-text {
          color: #4b5563;
          font-size: 16px;
          font-family: 'Rubik', sans-serif;
          line-height: 1.6;
          padding-bottom: 16px;
        }
      `}} />

      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-left">
            <div className="faq-badge">
              <img src="/images/svg/exclusive.svg" alt="Exclusive Guarantee" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 className="faq-title">
                I'll Coach You Personally Until<br />You Get Approved
              </h3>
              <p className="faq-description">
                That's a commitment. Complete the full course — every video, every quiz, every guide — and if you still don't pass, our expert will personally schedule a free one-hour session with you to fix whatever's holding you back. We're invested in your success, and I won't let you fail twice.
              </p>
            </div>

            <a href="/checkout" className="faq-cta">
              GET THAT APPROVAL RIGHT AWAY
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
          </div>

          <div className="faq-right">
            <h2 className="faq-heading">FREQUENTLY ASKED QUESTIONS</h2>
            
            <div id="faq-questions"></div>
          </div>
        </div>
      </section>
    </>
  );
}
