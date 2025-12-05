"use client";

interface Props{
    label: string;
    type?: string;
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
}

const AuthInput = ({label, type = "text", value, onChange, placeholder}: Props) => {
  return (
    <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">{label}</label>
        <input 
          type={type}
          value={value}
          onChange={(e)=> onChange(e.target.value)}
          placeholder={placeholder}
          className="input-base"
        />
    </div>
  )
}

export default AuthInput