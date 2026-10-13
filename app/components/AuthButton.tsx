"use client";

import Spinner from "./Spinner";

interface Props {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit";
  loading?: boolean;
  disabled?: boolean;
}

const AuthButton = ({
  title,
  onClick,
  type = "submit",
  loading = false,
  disabled = false,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="btn-primary flex w-full items-center justify-center gap-2 rounded-full py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
      disabled={disabled || loading}
    >
      {loading && <Spinner size={18} />}
      {loading ? "Please wait..." : title}
    </button>
  );
};

export default AuthButton;
