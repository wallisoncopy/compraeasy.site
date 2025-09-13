// Base de dados completa de produtos de supermercado brasileiro
// Versão 2025-09-13
window.PRODUCT_DATA_VERSION = "2025-09-13";

window.productsByCategory = {
  "Mercearia": [
    { name: "Arroz Branco 5kg", purchasePrice: 18.50, salePrice: 24.90, consumption: 150, stock: 60, leadTime: 5 },
    { name: "Feijão Preto 1kg", purchasePrice: 6.80, salePrice: 9.50, consumption: 200, stock: 80, leadTime: 7 },
    { name: "Feijão Carioca 1kg", purchasePrice: 7.20, salePrice: 10.20, consumption: 180, stock: 75, leadTime: 7 },
    { name: "Açúcar Cristal 1kg", purchasePrice: 3.20, salePrice: 4.80, consumption: 180, stock: 60, leadTime: 4 },
    { name: "Açúcar Refinado 1kg", purchasePrice: 3.80, salePrice: 5.50, consumption: 120, stock: 40, leadTime: 4 },
    { name: "Sal Refinado 1kg", purchasePrice: 2.10, salePrice: 3.20, consumption: 80, stock: 25, leadTime: 10 },
    { name: "Óleo de Soja 900ml", purchasePrice: 4.50, salePrice: 6.90, consumption: 160, stock: 65, leadTime: 6 },
    { name: "Farinha de Trigo 1kg", purchasePrice: 4.20, salePrice: 6.40, consumption: 140, stock: 50, leadTime: 5 },
    { name: "Macarrão Espaguete 500g", purchasePrice: 2.80, salePrice: 4.50, consumption: 220, stock: 90, leadTime: 8 },
    { name: "Macarrão Parafuso 500g", purchasePrice: 2.90, salePrice: 4.60, consumption: 180, stock: 75, leadTime: 8 },
    { name: "Molho de Tomate 340g", purchasePrice: 2.40, salePrice: 3.90, consumption: 200, stock: 80, leadTime: 6 },
    { name: "Extrato de Tomate 130g", purchasePrice: 1.80, salePrice: 2.90, consumption: 150, stock: 60, leadTime: 6 },
    { name: "Vinagre 750ml", purchasePrice: 2.20, salePrice: 3.40, consumption: 60, stock: 20, leadTime: 8 },
    { name: "Café em Pó 500g", purchasePrice: 12.50, salePrice: 18.90, consumption: 120, stock: 50, leadTime: 5 },
    { name: "Achocolatado em Pó 400g", purchasePrice: 8.90, salePrice: 13.50, consumption: 80, stock: 30, leadTime: 7 }
  ],

  "Açougue": [
    { name: "Alcatra kg", purchasePrice: 28.00, salePrice: 42.90, consumption: 80, stock: 25, leadTime: 2 },
    { name: "Picanha kg", purchasePrice: 45.00, salePrice: 68.90, consumption: 60, stock: 20, leadTime: 2 },
    { name: "Costela Bovina kg", purchasePrice: 18.00, salePrice: 26.90, consumption: 90, stock: 30, leadTime: 2 },
    { name: "Carne Moída kg", purchasePrice: 15.50, salePrice: 22.90, consumption: 120, stock: 40, leadTime: 1 },
    { name: "Frango Inteiro kg", purchasePrice: 8.50, salePrice: 12.90, consumption: 150, stock: 50, leadTime: 1 },
    { name: "Peito de Frango kg", purchasePrice: 12.00, salePrice: 18.50, consumption: 100, stock: 35, leadTime: 1 },
    { name: "Coxa e Sobrecoxa kg", purchasePrice: 9.50, salePrice: 14.90, consumption: 110, stock: 40, leadTime: 1 },
    { name: "Linguiça Calabresa kg", purchasePrice: 14.00, salePrice: 21.90, consumption: 85, stock: 30, leadTime: 3 },
    { name: "Bacon kg", purchasePrice: 18.50, salePrice: 28.90, consumption: 70, stock: 25, leadTime: 4 },
    { name: "Carne de Porco kg", purchasePrice: 16.00, salePrice: 24.90, consumption: 75, stock: 25, leadTime: 2 }
  ],

  "Padaria": [
    { name: "Pão Francês kg", purchasePrice: 4.50, salePrice: 8.90, consumption: 300, stock: 120, leadTime: 1 },
    { name: "Pão de Forma 500g", purchasePrice: 3.20, salePrice: 6.50, consumption: 180, stock: 75, leadTime: 3 },
    { name: "Pão Doce unidade", purchasePrice: 1.20, salePrice: 2.50, consumption: 200, stock: 80, leadTime: 1 },
    { name: "Croissant unidade", purchasePrice: 2.00, salePrice: 4.50, consumption: 120, stock: 50, leadTime: 1 },
    { name: "Bolo de Chocolate fatia", purchasePrice: 3.50, salePrice: 7.90, consumption: 100, stock: 40, leadTime: 1 },
    { name: "Torta Salgada fatia", purchasePrice: 4.00, salePrice: 8.50, consumption: 80, stock: 30, leadTime: 1 },
    { name: "Biscoito Caseiro kg", purchasePrice: 8.00, salePrice: 15.90, consumption: 60, stock: 20, leadTime: 2 },
    { name: "Rosquinha Doce kg", purchasePrice: 9.50, salePrice: 17.90, consumption: 50, stock: 18, leadTime: 2 }
  ],

  "Frios": [
    { name: "Presunto kg", purchasePrice: 22.00, salePrice: 34.90, consumption: 90, stock: 30, leadTime: 3 },
    { name: "Mortadela kg", purchasePrice: 12.50, salePrice: 19.90, consumption: 110, stock: 40, leadTime: 3 },
    { name: "Queijo Mussarela kg", purchasePrice: 28.00, salePrice: 42.90, consumption: 100, stock: 35, leadTime: 4 },
    { name: "Queijo Prato kg", purchasePrice: 26.50, salePrice: 39.90, consumption: 80, stock: 25, leadTime: 4 },
    { name: "Salsicha kg", purchasePrice: 8.90, salePrice: 14.50, consumption: 120, stock: 45, leadTime: 5 },
    { name: "Peito de Peru kg", purchasePrice: 35.00, salePrice: 52.90, consumption: 60, stock: 20, leadTime: 4 },
    { name: "Blanquet de Peru kg", purchasePrice: 18.00, salePrice: 28.90, consumption: 70, stock: 25, leadTime: 4 },
    { name: "Queijo Colonial kg", purchasePrice: 32.00, salePrice: 48.90, consumption: 50, stock: 18, leadTime: 5 },
    { name: "Salame kg", purchasePrice: 42.00, salePrice: 63.90, consumption: 40, stock: 15, leadTime: 6 }
  ],

  "Limpeza": [
    { name: "Detergente 500ml", purchasePrice: 1.80, salePrice: 2.90, consumption: 200, stock: 80, leadTime: 7 },
    { name: "Sabão em Pó 1kg", purchasePrice: 6.50, salePrice: 10.90, consumption: 150, stock: 60, leadTime: 8 },
    { name: "Amaciante 2L", purchasePrice: 8.20, salePrice: 13.90, consumption: 120, stock: 45, leadTime: 8 },
    { name: "Água Sanitária 1L", purchasePrice: 2.40, salePrice: 4.20, consumption: 180, stock: 70, leadTime: 6 },
    { name: "Desinfetante 500ml", purchasePrice: 3.50, salePrice: 6.20, consumption: 160, stock: 65, leadTime: 7 },
    { name: "Sabão em Barra 200g", purchasePrice: 2.10, salePrice: 3.50, consumption: 140, stock: 55, leadTime: 9 },
    { name: "Esponja Dupla Face", purchasePrice: 1.20, salePrice: 2.40, consumption: 100, stock: 40, leadTime: 10 },
    { name: "Pano de Chão", purchasePrice: 3.80, salePrice: 7.50, consumption: 80, stock: 30, leadTime: 10 },
    { name: "Vassoura", purchasePrice: 15.00, salePrice: 24.90, consumption: 30, stock: 12, leadTime: 15 },
    { name: "Rodo", purchasePrice: 18.50, salePrice: 29.90, consumption: 25, stock: 10, leadTime: 15 }
  ],

  "Higiene": [
    { name: "Shampoo 400ml", purchasePrice: 8.50, salePrice: 14.90, consumption: 120, stock: 50, leadTime: 6 },
    { name: "Condicionador 400ml", purchasePrice: 9.20, salePrice: 15.90, consumption: 100, stock: 40, leadTime: 6 },
    { name: "Sabonete 90g", purchasePrice: 1.80, salePrice: 3.20, consumption: 200, stock: 80, leadTime: 8 },
    { name: "Papel Higiênico 4 rolos", purchasePrice: 6.50, salePrice: 11.90, consumption: 180, stock: 70, leadTime: 5 },
    { name: "Pasta de Dente 90g", purchasePrice: 3.40, salePrice: 6.50, consumption: 150, stock: 60, leadTime: 7 },
    { name: "Escova de Dente", purchasePrice: 4.20, salePrice: 8.50, consumption: 80, stock: 30, leadTime: 10 },
    { name: "Desodorante 150ml", purchasePrice: 6.80, salePrice: 12.90, consumption: 100, stock: 40, leadTime: 8 },
    { name: "Absorvente 8 unidades", purchasePrice: 4.50, salePrice: 8.90, consumption: 120, stock: 45, leadTime: 6 },
    { name: "Fralda Descartável P", purchasePrice: 24.00, salePrice: 38.90, consumption: 90, stock: 35, leadTime: 4 },
    { name: "Lenço Umedecido", purchasePrice: 5.20, salePrice: 9.50, consumption: 110, stock: 45, leadTime: 7 }
  ],

  "Hortifrúti": [
    { name: "Banana Prata kg", purchasePrice: 3.50, salePrice: 6.90, consumption: 200, stock: 80, leadTime: 2 },
    { name: "Maçã kg", purchasePrice: 6.00, salePrice: 9.90, consumption: 150, stock: 60, leadTime: 3 },
    { name: "Laranja kg", purchasePrice: 2.80, salePrice: 5.50, consumption: 180, stock: 70, leadTime: 2 },
    { name: "Tomate kg", purchasePrice: 4.20, salePrice: 7.90, consumption: 220, stock: 90, leadTime: 2 },
    { name: "Cebola kg", purchasePrice: 3.00, salePrice: 5.90, consumption: 160, stock: 65, leadTime: 4 },
    { name: "Batata kg", purchasePrice: 3.80, salePrice: 6.50, consumption: 200, stock: 80, leadTime: 3 },
    { name: "Cenoura kg", purchasePrice: 3.20, salePrice: 5.80, consumption: 140, stock: 55, leadTime: 3 },
    { name: "Alface unidade", purchasePrice: 1.50, salePrice: 2.90, consumption: 180, stock: 70, leadTime: 2 },
    { name: "Limão kg", purchasePrice: 4.50, salePrice: 7.90, consumption: 100, stock: 40, leadTime: 3 },
    { name: "Abobrinha kg", purchasePrice: 2.80, salePrice: 5.20, consumption: 120, stock: 45, leadTime: 2 },
    { name: "Pimentão kg", purchasePrice: 5.50, salePrice: 9.90, consumption: 90, stock: 35, leadTime: 2 },
    { name: "Abacaxi unidade", purchasePrice: 4.00, salePrice: 7.50, consumption: 80, stock: 30, leadTime: 4 }
  ],

  "Bebidas": [
    { name: "Refrigerante Cola 2L", purchasePrice: 4.50, salePrice: 7.90, consumption: 200, stock: 80, leadTime: 3 },
    { name: "Refrigerante Guaraná 2L", purchasePrice: 4.20, salePrice: 7.50, consumption: 180, stock: 70, leadTime: 3 },
    { name: "Água Mineral 1,5L", purchasePrice: 1.80, salePrice: 3.50, consumption: 300, stock: 120, leadTime: 4 },
    { name: "Suco de Laranja 1L", purchasePrice: 3.80, salePrice: 6.90, consumption: 150, stock: 60, leadTime: 5 },
    { name: "Cerveja Lata 350ml", purchasePrice: 2.20, salePrice: 4.50, consumption: 400, stock: 160, leadTime: 2 },
    { name: "Cerveja Long Neck 330ml", purchasePrice: 2.80, salePrice: 5.50, consumption: 300, stock: 120, leadTime: 2 },
    { name: "Energético 250ml", purchasePrice: 3.50, salePrice: 7.90, consumption: 120, stock: 45, leadTime: 6 },
    { name: "Leite Integral 1L", purchasePrice: 3.20, salePrice: 5.90, consumption: 250, stock: 100, leadTime: 2 },
    { name: "Iogurte Natural 170g", purchasePrice: 1.80, salePrice: 3.50, consumption: 200, stock: 80, leadTime: 3 },
    { name: "Achocolatado Líquido 200ml", purchasePrice: 1.50, salePrice: 2.90, consumption: 180, stock: 70, leadTime: 4 },
    { name: "Chá Gelado 300ml", purchasePrice: 2.40, salePrice: 4.50, consumption: 140, stock: 55, leadTime: 5 },
    { name: "Vinho Tinto 750ml", purchasePrice: 18.00, salePrice: 32.90, consumption: 60, stock: 25, leadTime: 8 }
  ]
};