// ============================================================
// components/ui/ErrorState.jsx — ERROR MESSAGE COMPONENT
// This component is shown when an API request fails.
// It displays a user-friendly message instead of crashing the app.
// It also detects if the error is a rate limit (429) and shows
// a specific message for that case.
// ============================================================

// -------------------------------------------------------
// ErrorState receives a "message" prop — the error message string
// -------------------------------------------------------
const ErrorState = ({ message }) => {

  // Check if the error message mentions "429" or "rate limit"
  // 429 means "Too Many Requests" — the API free tier limit was exceeded
  // The ?. is optional chaining — safely handles if message is undefined
  const isRateLimit = message?.includes("429") || message?.includes("rate limit");

  return (
    <div className="error-state">

      {/* Show a different title depending on the type of error */}
      <h3>{isRateLimit ? "API Limit Reached" : "Something went wrong"}</h3>

      <p>
        {/* Show a specific message for rate limit errors
            For all other errors, show the actual error message
            If no message was passed, show a generic fallback message */}
        {isRateLimit
          ? "The API free tier limit has been reached. Showing cached/demo data instead."
          : message || "Unable to load data. Please try again later."}
      </p>

    </div>
  );
};

export default ErrorState;
