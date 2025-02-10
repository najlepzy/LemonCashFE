import { useAuthContext } from "@context/authContext/authContext";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useAuthRedirect = () => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/taskmanager");
    }
  }, [isAuthenticated, navigate, location]);
};

export default useAuthRedirect;