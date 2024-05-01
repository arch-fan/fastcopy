import type { HTMLAttributes } from "react";

const Button: React.FC<HTMLAttributes<HTMLButtonElement>> = ({
  className = "",
  ...props
}) => {
  return (
    <button className={`px-2 py-1 rounded ${className}`} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
