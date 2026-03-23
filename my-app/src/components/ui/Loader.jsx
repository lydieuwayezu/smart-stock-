// ============================================================
// components/ui/Loader.jsx — LOADING SPINNER
// This component is shown while the app is waiting for API data.
// It gives the user visual feedback that something is happening.
// ============================================================

const Loader = () => (
  <div className="loader">
    {/* The spinner is a CSS-animated circle that spins continuously
        The animation is defined in index.css using @keyframes spin */}
    <div className="spinner"></div>

    {/* Simple text below the spinner */}
    <p>Loading...</p>
  </div>
);

export default Loader;
