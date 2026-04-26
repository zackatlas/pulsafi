// Page shell for v2 — wraps every v2 page with the void background,
// edge-only gradients (so text is never overlaid), and consistent inset.

export default function PageShell({ children }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#050608",
      color: "#e8e8eb",
      fontFamily: "'DM Sans', sans-serif",
      // Gradients sit at top + bottom edges only; never under body text.
      backgroundImage:
        "radial-gradient(ellipse 90% 40% at 50% 0%, rgba(212,168,41,0.05) 0%, transparent 70%), " +
        "radial-gradient(ellipse 90% 30% at 50% 100%, rgba(212,168,41,0.04) 0%, transparent 70%)",
      backgroundRepeat: "no-repeat",
    }}>
      {children}
    </div>
  );
}
