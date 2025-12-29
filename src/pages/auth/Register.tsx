import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { registerThunk } from "../../features/auth/authSlice";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await dispatch(registerThunk({ name, phone, email, password }));

    if (registerThunk.fulfilled.match(res)) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account 🚀
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full border rounded-lg px-3 py-2"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone"
            required
            className="w-full border rounded-lg px-3 py-2"
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border rounded-lg px-3 py-2"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full border rounded-lg px-3 py-2"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 font-medium cursor-pointer"
            >
              Login
            </button>
          </p>

          <p className="text-sm text-gray-500">
            Want to offer services?{" "}
            <button
              onClick={() => navigate("/vendor/register")}
              className="text-blue-600 font-medium cursor-pointer"
            >
              Register as Vendor
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
