// components/Button.jsx
export default function Button({
  children,
  type = "button",
  variant = "primary",
  ...props
}) {
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${variantClasses[variant]} w-full`}
      {...props}
    >
      {children}
    </button>
  );
}
