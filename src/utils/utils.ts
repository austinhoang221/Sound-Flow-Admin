import { useNavigate } from "react-router";

export const useUtils = () => {
  const navigate = useNavigate();
  const logOut = () => {
    navigate("/login");
    localStorage.clear();
  };

  return {
    logOut,
  };
};
