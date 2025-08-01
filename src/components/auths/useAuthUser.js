import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuthUser() {
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuario) {
      navigate("/login");
    }
  }, [navigate]);
}