// Extracted styled-jsx block from Pulsafi.js. These are the responsive rules
// that drive the homepage's mobile/tablet layouts. Kept as a dedicated
// component so the main orchestrator stays readable.
//
// NOTE: styled-jsx `global` styles are emitted wherever this component
// renders, so mounting it once at the bottom of the homepage is enough.
export default function HomeStyles() {
  return (
    <style jsx global>{`
      /* Hide scrollbar on tool selector */
      .pulsafi-tool-selector::-webkit-scrollbar { display: none; }

      /* Input grid: 2-col default */
      .pulsafi-input-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      /* Results row */
      .pulsafi-results-row {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-top: 20px;
      }

      /* ═══ MOBILE: 480px and below ═══ */
      @media (max-width: 480px) {
        /* Stack inputs to single column */
        .pulsafi-input-grid {
          grid-template-columns: 1fr !important;
          gap: 6px !important;
        }

        /* Stack result cards vertically */
        .pulsafi-results-row {
          flex-direction: column !important;
          gap: 8px !important;
        }
        .pulsafi-result-card {
          flex: 1 1 100% !important;
        }
        .pulsafi-result-value {
          font-size: 20px !important;
        }

        /* Reduce hero padding */
        .pulsafi-hero {
          padding: 40px 16px 28px !important;
        }

        /* Reduce tool card padding */
        .pulsafi-tool-card {
          padding: 16px 14px 14px !important;
          border-radius: 14px !important;
        }

        /* Main padding */
        .pulsafi-main {
          padding: 20px 12px 40px !important;
        }

        /* Email capture padding */
        .pulsafi-email-capture {
          padding: 24px 16px !important;
        }

        /* Salary breakdown: 2-col grid on mobile */
        .pulsafi-salary-breakdown {
          gap: 6px !important;
        }
        .pulsafi-salary-item {
          flex: 1 1 calc(50% - 6px) !important;
          padding: 10px 10px !important;
        }

        /* Crypto scenario grid stays 2x2 */
        .pulsafi-crypto-scenarios {
          grid-template-columns: 1fr 1fr !important;
          gap: 6px !important;
        }

        /* Crypto row description hidden on very small screens */
        .pulsafi-crypto-desc {
          display: none !important;
        }

        /* Investment comparison rows */
        .pulsafi-invest-value {
          font-size: 15px !important;
        }

        /* Hide tool descriptions on mobile to save space */
        .pulsafi-tool-desc {
          display: none !important;
        }
      }

      /* ═══ TABLET: 481–768px ═══ */
      @media (min-width: 481px) and (max-width: 768px) {
        .pulsafi-input-grid {
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .pulsafi-tool-card {
          padding: 20px 18px 18px !important;
        }
        .pulsafi-salary-item {
          flex: 1 1 calc(50% - 8px) !important;
        }
      }

      /* ═══ Desktop: keep 2-col inputs ═══ */
      @media (min-width: 769px) {
        .pulsafi-tool-card {
          padding: 28px 28px 24px !important;
        }
        .pulsafi-main {
          padding: 28px 24px 60px !important;
        }
        .pulsafi-salary-item {
          flex: 1 1 0 !important;
          min-width: 100px !important;
        }
      }
    `}</style>
  );
}
