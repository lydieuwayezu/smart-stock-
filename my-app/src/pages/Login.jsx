import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }));
    toast.success("Logged in successfully!");
    navigate("/");
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        <label>Name</label>
        <input {...register("name", { required: "Name is required" })} placeholder="Your name" />
        {errors.name && <span className="error">{errors.name.message}</span>}

        <label>Email</label>
        <input type="email" {...register("email", { required: "Email is required" })} placeholder="you@example.com" />
        {errors.email && <span className="error">{errors.email.message}</span>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
