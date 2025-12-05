"use client";

interface Props {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const AuthButton = ({ title, onClick, type = "submit" }: Props) => {
  return <button type={type} onClick={onClick} className="btn-primary w-full py-2 rounded-lg font-semibold text-white">{title}</button>;
};

export default AuthButton;
