import { useState } from "react";
import LoginScreen from "@/components/LoginScreen";
import InventoryManagement from "@/components/InventoryManagement";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [supermarketName, setSupermarketName] = useState("");

  const handleLogin = (name: string) => {
    setSupermarketName(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSupermarketName("");
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <InventoryManagement 
      supermarketName={supermarketName} 
      onLogout={handleLogout} 
    />
  );
}