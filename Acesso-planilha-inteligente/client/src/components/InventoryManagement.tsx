import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Calculator, 
  Save, 
  Upload, 
  Download,
  LogOut,
  AlertTriangle,
  TrendingUp,
  DollarSign
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  avgConsumption: number;
  currentStock: number;
  purchasePrice: number;
  salePrice: number;
  leadTime: number;
  suggestedQty: number;
  reorderPoint: number;
  potentialProfit: number;
}

interface InventoryManagementProps {
  supermarketName: string;
  onLogout: () => void;
}

export default function InventoryManagement({ supermarketName, onLogout }: InventoryManagementProps) {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "",
      category: "",
      avgConsumption: 0,
      currentStock: 0,
      purchasePrice: 0,
      salePrice: 0,
      leadTime: 7,
      suggestedQty: 0,
      reorderPoint: 0,
      potentialProfit: 0
    }
  ]);

  const [calculations, setCalculations] = useState({
    totalPurchase: 0,
    totalProfit: 0,
    riskProducts: [] as string[]
  });

  const addProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: "",
      category: "",
      avgConsumption: 0,
      currentStock: 0,
      purchasePrice: 0,
      salePrice: 0,
      leadTime: 7,
      suggestedQty: 0,
      reorderPoint: 0,
      potentialProfit: 0
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, field: keyof Product, value: string | number) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, [field]: value } : product
    ));
  };

  const calculate = () => {
    const periodDays = 30;
    let totalPurchase = 0;
    let totalProfit = 0;
    const riskProducts: string[] = [];

    const updatedProducts = products.map(product => {
      const dailyConsumption = product.avgConsumption / periodDays;
      const reorderPoint = Math.ceil(dailyConsumption * product.leadTime);
      const suggestedQty = Math.max(Math.ceil(product.avgConsumption - product.currentStock), 0);
      const potentialProfit = Math.max(product.avgConsumption * (product.salePrice - product.purchasePrice), 0);
      const purchaseCost = suggestedQty * product.purchasePrice;

      totalPurchase += purchaseCost;
      totalProfit += potentialProfit;

      if (product.currentStock <= reorderPoint && product.name.trim()) {
        riskProducts.push(`${product.name} (estoque ${product.currentStock} ≤ ponto ${reorderPoint})`);
      }

      return {
        ...product,
        suggestedQty,
        reorderPoint,
        potentialProfit
      };
    });

    setProducts(updatedProducts);
    setCalculations({
      totalPurchase,
      totalProfit,
      riskProducts
    });
  };

  const saveData = () => {
    localStorage.setItem("supermarket_products", JSON.stringify({
      supermarketName,
      products,
      lastSaved: new Date().toISOString()
    }));
    alert("✅ Dados salvos com sucesso!");
  };

  const loadData = () => {
    const saved = localStorage.getItem("supermarket_products");
    if (saved) {
      const data = JSON.parse(saved);
      setProducts(data.products || []);
      calculate();
      alert("✅ Dados carregados com sucesso!");
    } else {
      alert("⚠️ Nenhum dado salvo encontrado.");
    }
  };

  const exportCSV = () => {
    const headers = [
      "Produto", "Categoria", "Consumo Médio/Mês", "Estoque Atual", 
      "Preço Compra", "Preço Venda", "Lead Time (dias)", 
      "Qtd Sugerida", "Ponto Reposição", "Lucro Potencial Mensal"
    ];
    
    const csvData = [
      headers.join(","),
      ...products.map(p => [
        p.name, p.category, p.avgConsumption, p.currentStock,
        p.purchasePrice.toFixed(2), p.salePrice.toFixed(2), p.leadTime,
        p.suggestedQty, p.reorderPoint, p.potentialProfit.toFixed(2)
      ].map(v => `"${v}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `produtos_${supermarketName.toLowerCase().replace(/\s+/g, "_")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    calculate();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-card-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold" data-testid="text-supermarket-name">
                📈 Planilha Inteligente - {supermarketName}
              </h1>
              <p className="text-sm text-muted-foreground">
                Período padrão: <strong>Mensal (30 dias)</strong>
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onLogout}
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          <Button onClick={addProduct} size="sm" data-testid="button-add-product">
            <Plus className="w-4 h-4 mr-2" />
            Produto
          </Button>
          <Button onClick={calculate} variant="secondary" size="sm" data-testid="button-calculate">
            <Calculator className="w-4 h-4 mr-2" />
            Calcular
          </Button>
          <Button onClick={saveData} variant="outline" size="sm" data-testid="button-save">
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
          <Button onClick={loadData} variant="outline" size="sm" data-testid="button-load">
            <Upload className="w-4 h-4 mr-2" />
            Carregar
          </Button>
          <Button onClick={exportCSV} variant="outline" size="sm" data-testid="button-export">
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>

        {/* Products Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="p-3 text-left text-sm font-medium">Produto</th>
                    <th className="p-3 text-left text-sm font-medium">Categoria</th>
                    <th className="p-3 text-center text-sm font-medium">Consumo Médio / Mês</th>
                    <th className="p-3 text-center text-sm font-medium">Estoque Atual</th>
                    <th className="p-3 text-center text-sm font-medium">Preço Compra (R$)</th>
                    <th className="p-3 text-center text-sm font-medium">Preço Venda (R$)</th>
                    <th className="p-3 text-center text-sm font-medium">Lead Time (dias)</th>
                    <th className="p-3 text-center text-sm font-medium">Qtd. Sugerida</th>
                    <th className="p-3 text-center text-sm font-medium">Ponto Reposição</th>
                    <th className="p-3 text-center text-sm font-medium">Lucro Pot. / Mês (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                      <td className="p-2">
                        <Input
                          placeholder="Ex: Arroz 5kg"
                          value={product.name}
                          onChange={(e) => updateProduct(product.id, "name", e.target.value)}
                          className="min-w-[150px]"
                          data-testid={`input-product-name-${index}`}
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          placeholder="Mercearia"
                          value={product.category}
                          onChange={(e) => updateProduct(product.id, "category", e.target.value)}
                          className="min-w-[120px]"
                          data-testid={`input-product-category-${index}`}
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          min="0"
                          value={product.avgConsumption}
                          onChange={(e) => updateProduct(product.id, "avgConsumption", Number(e.target.value))}
                          className="min-w-[100px] text-center"
                          data-testid={`input-avg-consumption-${index}`}
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          min="0"
                          value={product.currentStock}
                          onChange={(e) => updateProduct(product.id, "currentStock", Number(e.target.value))}
                          className="min-w-[100px] text-center"
                          data-testid={`input-current-stock-${index}`}
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={product.purchasePrice}
                          onChange={(e) => updateProduct(product.id, "purchasePrice", Number(e.target.value))}
                          className="min-w-[100px] text-center"
                          data-testid={`input-purchase-price-${index}`}
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={product.salePrice}
                          onChange={(e) => updateProduct(product.id, "salePrice", Number(e.target.value))}
                          className="min-w-[100px] text-center"
                          data-testid={`input-sale-price-${index}`}
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          min="0"
                          value={product.leadTime}
                          onChange={(e) => updateProduct(product.id, "leadTime", Number(e.target.value))}
                          className="min-w-[80px] text-center"
                          data-testid={`input-lead-time-${index}`}
                        />
                      </td>
                      <td className="p-2 text-center font-mono" data-testid={`text-suggested-qty-${index}`}>
                        {product.suggestedQty}
                      </td>
                      <td className="p-2 text-center font-mono" data-testid={`text-reorder-point-${index}`}>
                        {product.reorderPoint}
                      </td>
                      <td className="p-2 text-center font-mono text-primary" data-testid={`text-potential-profit-${index}`}>
                        {product.potentialProfit.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Produtos em risco de falta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2" data-testid="risk-products">
                {calculations.riskProducts.length > 0 ? (
                  calculations.riskProducts.map((risk, index) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      {risk}
                    </Badge>
                  ))
                ) : (
                  <Badge variant="secondary">Nenhum</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Total Estimado de Compra
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="total-purchase">
                R$ {calculations.totalPurchase.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Lucro Potencial Mensal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary" data-testid="total-profit">
                R$ {calculations.totalProfit.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Help Text */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <p>
                💡 <strong>Dica:</strong> Preencha o <strong>Consumo Médio / Mês</strong> com média de vendas reais.
              </p>
              <p>
                Lead Time = dias que o fornecedor demora para entregar (use 7 se não souber).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}