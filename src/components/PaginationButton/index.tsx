import React from "react";
import "./styles.scss";

interface IPaginationButtonProps {
  isActive?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const PaginationButton: React.FC<IPaginationButtonProps> = (props) => {
  const { isActive, children, onClick } = props;

  return (
    <button
      className={`pagination-button ${isActive ? "active" : ""}`}
      onClick={onClick}
      disabled={!onClick}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
