import InventoryManagement from '../InventoryManagement';

export default function InventoryManagementExample() {
  return (
    <InventoryManagement 
      supermarketName="Supermercado São José"
      onLogout={() => {
        console.log('Logout triggered');
        alert('Logout realizado!');
      }}
    />
  );
}