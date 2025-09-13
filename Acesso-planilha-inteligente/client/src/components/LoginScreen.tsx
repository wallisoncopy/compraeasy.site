import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store, ShoppingCart } from "lucide-react";

interface LoginScreenProps {
  onLogin: (supermarketName: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [supermarketName, setSupermarketName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supermarketName.trim()) {
      alert("Por favor, insira o nome do supermercado");
      return;
    }
    
    setIsLoading(true);
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
    onLogin(supermarketName.trim());
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Store className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl">Planilha Inteligente</CardTitle>
            <p className="text-muted-foreground mt-2">Sistema de Gestão de Produtos</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="supermarket" data-testid="label-supermarket">
                Nome do Supermercado
              </Label>
              <Input
                id="supermarket"
                type="text"
                placeholder="Ex: Supermercado São José"
                value={supermarketName}
                onChange={(e) => setSupermarketName(e.target.value)}
                data-testid="input-supermarket"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" data-testid="label-password">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite qualquer senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-password"
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
              data-testid="button-login"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Entrando...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Acessar Sistema
                </>
              )}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>💡 Dica: Use qualquer senha para acessar o sistema</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}