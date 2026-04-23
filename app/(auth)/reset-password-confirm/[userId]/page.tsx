"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import AuthButton from "@/app/components/AuthButton";
import AuthInput from "@/app/components/AuthInput";
import { resetPassword } from "@/app/services/authService";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { userId } = useParams<{ userId: string }>();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // if (password.length < 8) {
    //   setError("Password must be at least 8 characters.");
    //   return;
    // }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword({userId: userId!, password, confirmPassword});
      toast.success("Password is reset successfully. Log in again.");
      router.push("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Password strength indicator
  const getStrength = (pwd: any) => {
    if (!pwd) return { label: "", color: "", width: "0%" };
    if (pwd.length < 6) return { label: "Weak", color: "#ef4444", width: "25%" };
    if (pwd.length < 8) return { label: "Fair", color: "#f97316", width: "50%" };
    if (!/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd))
      return { label: "Good", color: "#eab308", width: "75%" };
    return { label: "Strong", color: "#22c55e", width: "100%" };
  };

  const strength = getStrength(password);

  return (
    <div className="min-h-screen center-position">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

        {/* Lock icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2 text-center">Reset Password</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Create a strong new password for your account.
        </p>

        {success ? (
          /* Success state */
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-green-600 font-semibold text-lg">Password Reset!</p>
            <p className="text-gray-500 text-sm text-center">
              Your password has been updated. Redirecting you to login…
            </p>
          </div>
        ) : (
          <form onSubmit={handleReset} className="flex flex-col gap-4">

            {/* New Password */}
            <div className="flex flex-col gap-1">
              <AuthInput
                label="New Password"
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="Enter new password"
              />
              {/* Strength bar */}
              {password.length > 0 && (
                <div className="flex flex-col gap-1 mt-1">
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: strength.width, backgroundColor: strength.color }}
                    />
                  </div>
                  <span className="text-xs font-medium" style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <AuthInput
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Re-enter new password"
              />
              {/* Match indicator */}
              {confirmPassword.length > 0 && (
                <p
                  className={`text-xs font-medium mt-1 ${
                    password === confirmPassword ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {password === confirmPassword
                    ? "✓ Passwords match"
                    : "✗ Passwords do not match"}
                </p>
              )}
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <AuthButton title={loading ? "Resetting…" : "Reset Password"} />
          </form>
        )}

        <div className="text-center mt-4 text-sm">
          <p>
            Remember your password?{" "}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;