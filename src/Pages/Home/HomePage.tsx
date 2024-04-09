import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() => {
          localStorage.removeItem("token_dummy");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
