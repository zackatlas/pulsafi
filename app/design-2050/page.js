import AmbientPulseBar from "../components/design2050/AmbientPulseBar";
import PulseCalculator from "../components/design2050/PulseCalculator";
import DualPulseCompare from "../components/design2050/DualPulseCompare";
import Constellation from "../components/design2050/Constellation";
import TimePulse from "../components/design2050/TimePulse";

export const metadata = {
  title: "Pulsafi 2050 — Vision Preview",
  description: "Internal preview of the pulse-first interface concept.",
  robots: { index: false, follow: false },
};

export default function Design2050Page() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#050608",
      color: "#e8e8eb",
      fontFamily: "'DM Sans', sans-serif",
      backgroundImage: "radial-gradient(ellipse at 50% -10%, rgba(212,168,41,0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 110%, rgba(212,168,41,0.04) 0%, transparent 50%)",
    }}>

      {/* Minimalist header */}
      <header style={{
        padding: "28px 32px 0",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "relative", zIndex: 5,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #f0c14a, #d4a829)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Playfair Display', serif", fontWeight: 900, color: "#050608", fontSize: 18,
          }}>P</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, letterSpacing: "-0.02em", fontWeight: 700, color: "#e8e8eb" }}>
            Pulsafi
          </div>
          <div style={{
            fontSize: 9, padding: "3px 8px", borderRadius: 4,
            background: "rgba(212,168,41,0.1)", border: "1px solid rgba(212,168,41,0.3)",
            color: "#f0c14a", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700,
            marginLeft: 6,
          }}>2050 · Vision</div>
        </div>

        <nav style={{ display: "flex", gap: 28, fontSize: 12, color: "rgba(232,232,235,0.6)" }}>
          {["Calc", "Compare", "Time", "Tools"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              color: "rgba(232,232,235,0.6)", textDecoration: "none",
              textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 500,
            }}>{item}</a>
          ))}
        </nav>
      </header>

      {/* Hero — full bleed, anchored on the ambient pulse */}
      <section style={{ position: "relative", paddingTop: 80, paddingBottom: 120, textAlign: "center" }}>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 920, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(212,168,41,0.7)", fontWeight: 700, marginBottom: 32 }}>
            One pulse · Your money, alive
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(48px, 8vw, 96px)",
            fontWeight: 200,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            margin: "0 0 28px",
            color: "#e8e8eb",
          }}>
            Money has a <em style={{ fontStyle: "italic", color: "#f0c14a", fontWeight: 300 }}>pulse</em>.<br />
            Now you can feel it.
          </h1>
          <p style={{
            fontSize: 17, lineHeight: 1.65, color: "rgba(232,232,235,0.55)",
            maxWidth: 580, margin: "0 auto",
          }}>
            Pulsafi reads the rhythm of every rate, every paycheck, every milestone — and translates it into one continuous, living surface. No dashboards. No grids. Just the pulse of your financial life.
          </p>
        </div>

        {/* Floating large pulse animation directly under hero text */}
        <div style={{ marginTop: 60, opacity: 0.95 }}>
          <AmbientPulseBar />
        </div>
      </section>

      {/* PulseCalculator — the calculator built around the pulse */}
      <div id="calc" />
      <PulseCalculator />

      {/* Dual pulse comparison */}
      <div id="compare" />
      <DualPulseCompare />

      {/* Constellation nav */}
      <div id="tools" />
      <Constellation />

      {/* Time pulse */}
      <div id="time" />
      <TimePulse />

      {/* Closing manifesto */}
      <section style={{
        padding: "100px 32px 60px",
        textAlign: "center",
        borderTop: "1px solid rgba(212,168,41,0.08)",
        background: "radial-gradient(ellipse at 50% 100%, rgba(212,168,41,0.05) 0%, transparent 60%)",
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(212,168,41,0.7)", fontWeight: 700, marginBottom: 28 }}>
            The Pulsafi Manifesto
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 200, lineHeight: 1.15, letterSpacing: "-0.025em", margin: "0 0 36px",
            color: "#e8e8eb",
          }}>
            Every other finance site shows you data.<br />
            <em style={{ fontStyle: "italic", color: "#f0c14a", fontWeight: 300 }}>We show you motion.</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32, textAlign: "left", marginTop: 60 }}>
            {[
              { num: "01", label: "No grids. No dashboards.", body: "Money lives in time, not in cells." },
              { num: "02", label: "Calculators that breathe.", body: "Inputs slide along the pulse. Output pulses with each adjustment." },
              { num: "03", label: "State by state, side by side.", body: "Two pulses overlaid. Divergence is physical, not numerical." },
              { num: "04", label: "Your life, one continuous arc.", body: "Age 22 to retirement on a single line. Every milestone, a spike." },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: 9, fontFamily: "'Inter', monospace", color: "rgba(212,168,41,0.6)", letterSpacing: "0.1em", marginBottom: 8 }}>{item.num}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: "#e8e8eb", marginBottom: 6, letterSpacing: "-0.01em" }}>{item.label}</div>
                <div style={{ fontSize: 13, color: "rgba(232,232,235,0.5)", lineHeight: 1.6 }}>{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px 32px", textAlign: "center", borderTop: "1px solid rgba(212,168,41,0.08)" }}>
        <div style={{ fontSize: 10, color: "rgba(232,232,235,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Pulsafi 2050 · Internal vision preview · Not for distribution
        </div>
      </footer>
    </div>
  );
}
