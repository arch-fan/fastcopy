import { useState, type HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Copy: React.FC<Props> = ({ text, onClick: _, ...props }) => {
  const [isCopying, setIsCopying] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
  };

  return (
    <button {...props} onClick={handleCopy}>
      {isCopying ? (
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12z"
          />
        </svg>
      )}
    </button>
  );
};

export default Copy;
