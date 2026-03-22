const ErrorState = ({ message }) => (
  <div className="error-state">
    <h3>Something went wrong</h3>
    <p>{message || "Unable to load data. Please try again later."}</p>
  </div>
);

export default ErrorState;
