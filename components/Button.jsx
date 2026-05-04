export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="hover:text-gray-700 bg-white p-2 rounded-full hover:bg-gray-100 flex bg-white rounded-lg items-center gap-2 px-4"
    >
      {children}
    </button>
  );
}
