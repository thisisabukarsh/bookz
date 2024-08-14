// components/DeleteIcon.js

const DeleteIcon = ({ width = "24", height = "24", className = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6 6H18V4H6V6ZM5 6V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V6H5ZM7 8H17V20H7V8ZM11 12H13V16H11V12Z"
      fill="#000000"
    />
  </svg>
);

export default DeleteIcon;
