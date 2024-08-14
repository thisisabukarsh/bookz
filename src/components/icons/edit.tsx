import React from "react";

const EditIcon = ({ width = "24", height = "24", className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM21.71 6.29L17.71 2.29C17.32 1.9 16.68 1.9 16.29 2.29L14.71 3.88L17.46 6.63L19.04 5.05C19.43 4.66 19.43 4.02 19.04 3.63L21.71 6.29Z"
      fill="#000000"
    />
  </svg>
);

export default EditIcon;
