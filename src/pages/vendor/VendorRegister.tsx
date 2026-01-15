import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  registerVendorThunk,
  resetVendorState,
} from "../../features/vendor/vendorSlice";

const VendorRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useAppSelector(
    (state) => state.vendor
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
    businessName: "",
    phone: "",
    city: "",
    serviceType: "",
    basePrice: "",
  });

  useEffect(() => {
    if (success) {
      dispatch(resetVendorState());
      navigate("/login");
    }
  }, [success, dispatch, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      registerVendorThunk({
        ...form,
        basePrice: Number(form.basePrice),
      })
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Vendor Registration 🧑‍🔧
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          {[
            ["businessName", "Business Name"],
            ["email", "Email"],
            ["password", "Password"],
            ["phone", "Phone"],
            ["city", "City"],
            ["serviceType", "Service Type"],
            ["basePrice", "Base Price"],
          ].map(([name, label]) => (
            <input
              key={name}
              name={name}
              placeholder={label}
              type={name === "password" ? "password" : "text"}
              required
              value={form[name as keyof typeof form]}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register as Vendor"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-500">
            Already registered as a vendor?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-medium cursor-pointer"
            >
              Login
            </span>
          </p>

          <p className="text-sm text-gray-500">
            Looking for services instead?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 font-medium cursor-pointer"
            >
              Create a user account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
