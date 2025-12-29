
# Guia de Publicação - Landing Page NFS

Esta é uma landing page de alta performance desenvolvida com React + Tailwind CSS, pronta para ser publicada no GitHub Pages.

## Como publicar no GitHub Pages

1. **Repositório**: Crie um novo repositório no seu GitHub.
2. **Upload**: Suba os arquivos gerados para o repositório.
3. **Build (Importante)**: Se estiver usando esta versão React, você precisará gerar o build estático (`npm run build`). Se preferir a versão em arquivo único, use o conteúdo gerado de forma apropriada.
4. **Configuração**: Vá em **Settings** -> **Pages**.
5. Em **Build and deployment**, escolha a branch (geralmente `main`) e a pasta (geralmente `/root` ou `/docs` se você moveu o build para lá).
6. Salve e o link aparecerá em alguns instantes.

## Como trocar o link de checkout

Para alterar para onde o cliente é levado ao clicar nos botões de compra:

1. Abra o arquivo `constants.ts`.
2. Localize a constante `CHECKOUT_URL`.
3. Substitua `"https://SEU-LINK-DE-CHECKOUT-AQUI"` pelo seu link real (Hotmart, Kiwify, Eduzz, Stripe, etc).

## Recomendações de SEO

A página já contém as meta tags básicas. Para melhorar:
- Adicione um `favicon.ico` na raiz.
- Use o seu domínio próprio configurado no GitHub Pages para passar mais credibilidade.

---
*Aviso legal: Certifique-se de ter os direitos ou estar operando dentro da legalidade ao oferecer guias de instalação.*
