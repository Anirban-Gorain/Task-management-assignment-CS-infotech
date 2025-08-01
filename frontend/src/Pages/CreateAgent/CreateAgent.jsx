import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api";

const CreateAgent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const onSubmit = async (data) => {
    try {
      data.contact_number = data.countryCode + " " + data.mobile;
      delete data.countryCode;
      delete data.mobile;

      console.log(data);

      const response = await api.post("/admin/create/agent", data);

      setMessage({ type: "success", text: "Agent created successfully!" });
      reset();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }

    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          Create Agent
        </h2>

        {message.text && (
          <div
            className={`mb-4 px-4 py-2 rounded text-sm ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          {errors.first_name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Country Code + Mobile */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Mobile Number
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="tel"
              placeholder="+91"
              {...register("countryCode", {
                required: "Code is required",
                pattern: {
                  value: /^\+\d{1,4}$/,
                  message: "Use + followed by digits (e.g. +91)",
                },
              })}
              className="w-1/3 border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="tel"
              placeholder="9876543210"
              {...register("mobile", {
                required: "Mobile is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter valid number (10 digits)",
                },
              })}
              className="w-2/3 border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          {errors.countryCode && (
            <p className="text-red-500 text-xs mt-1">
              {errors.countryCode.message}
            </p>
          )}
          {errors.mobile && (
            <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-2.5 right-3 text-sm text-gray-600 cursor-pointer select-none"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create Agent
        </button>
      </form>
    </div>
  );
};

export default CreateAgent;
