import React from "react";
import "./styles.scss";
interface ISelectButtonProps {
  isSelected: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const SelectButton: React.FC<ISelectButtonProps> = ({
  isSelected,
  onClick,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`select-button ${isSelected ? "selected" : ""}`}
    >
      {children}
    </button>
  );
};

export default SelectButton;
