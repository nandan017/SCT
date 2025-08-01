// src/components/ui/button.jsx
export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`bg-orange-500 hover:bg-orange-600 text-black font-semibold py-2 px-4 rounded-full ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};