import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function AuthAcess({ children }) {
  const [showAlert, setShowAlert] = useState(false);
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  useEffect(() => {
    if (usuario && usuario.cargo !== "admin") {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 25000); // alerta some em 2,5s
    }
  }, [usuario]);

  if (!usuario || usuario.cargo !== "admin") {
    return (
      <>
        {showAlert && alert("Acesso restrito! Apenas administradores podem acessar.")}
        <Navigate to="/" replace />
      </>
    );
  }

  return children;
}