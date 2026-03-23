// ============================================================
// pages/Login.jsx — LOGIN PAGE (route: "/login")
// This page shows a simple login form with Name and Email fields.
// When submitted, it saves the user info to localStorage.
// This simulates authentication — in a real app you would
// call a backend API to verify credentials.
// ============================================================

// useForm is the main hook from react-hook-form for form management
import { useForm } from "react-hook-form";

// useNavigate lets us redirect the user after successful login
import { useNavigate } from "react-router-dom";

// toast shows popup notification messages
import { toast } from "react-toastify";

const Login = () => {
  // Destructure tools from useForm:
  // register     — connects each input to the form
  // handleSubmit — validates the form then calls our submit function
  // formState    — contains "errors" with validation error messages
  const { register, handleSubmit, formState: { errors } } = useForm();

  // useNavigate gives us a function to redirect to another page
  const navigate = useNavigate();

  // -------------------------------------------------------
  // onSubmit — runs when the form is submitted AND all fields are valid
  // "data" contains: { name: "...", email: "..." }
  // -------------------------------------------------------
  const onSubmit = (data) => {
    // Save the user's name and email to localStorage
    // This is how we "log in" the user — other parts of the app
    // check localStorage to see if a user is logged in
    localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }));

    // Show a green success notification
    toast.success("Logged in successfully!");

    // Redirect the user to the Home page after login
    navigate("/");
  };

  return (
    <div className="auth-page">
      {/* handleSubmit(onSubmit) — validates all fields first, then calls onSubmit */}
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        {/* Name field */}
        <label>Name</label>
        <input
          // register connects this input to react-hook-form
          // "name" is the field name, required validation is set
          {...register("name", { required: "Name is required" })}
          placeholder="Your name"
        />
        {/* Show error message if the name field is left empty */}
        {errors.name && <span className="error">{errors.name.message}</span>}

        {/* Email field */}
        <label>Email</label>
        <input
          type="email"   // browser validates email format automatically
          {...register("email", { required: "Email is required" })}
          placeholder="you@example.com"
        />
        {/* Show error message if the email field is left empty */}
        {errors.email && <span className="error">{errors.email.message}</span>}

        {/* Submit button — triggers form validation then onSubmit */}
        <button type="submit">Login</button>

      </form>
    </div>
  );
};

export default Login;
