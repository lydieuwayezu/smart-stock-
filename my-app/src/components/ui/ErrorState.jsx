const ErrorState = ({ message }) => {
  const isRateLimit = message?.includes("429") || message?.includes("rate limit");

  return (
    <div className="error-state">
      <h3>{isRateLimit ? "API Limit Reached" : "Something went wrong"}</h3>
      <p>
        {isRateLimit
          ? "The API free tier limit has been reached. Showing cached/demo data instead."
          : message || "Unable to load data. Please try again later."}
      </p>
    </div>
  );
};

export default ErrorState;
