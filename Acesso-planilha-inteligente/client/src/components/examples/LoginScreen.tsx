import LoginScreen from '../LoginScreen';

export default function LoginScreenExample() {
  return (
    <LoginScreen 
      onLogin={(supermarketName) => {
        console.log('Login triggered for:', supermarketName);
        alert(`Login realizado para: ${supermarketName}`);
      }} 
    />
  );
}