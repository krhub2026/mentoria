# Mentoria DNA de Vendas

Site estático em português, pronto para o GitHub Pages. Não precisa de instalação, compilação, banco de dados ou chave de API.

## Visualizar

Abra `index.html` no navegador. Todos os caminhos são relativos, compatíveis também com repositórios publicados em subpastas do GitHub Pages.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie **o conteúdo desta pasta** para a raiz do repositório, mantendo a pasta `assets` com seus arquivos. O `index.html` deve ficar na raiz.
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch **main**, a pasta **/ (root)** e clique em **Save**.
6. Aguarde a publicação. O endereço será exibido na própria tela de Pages.

## Funcionamento

- A arte atualizada de Jadi Lima é exibida inteira, sem cortes ou distorção. No computador, acompanha a altura da janela; no celular, usa a largura da tela. Margens escuras acomodam diferenças entre as proporções da arte e da tela.
- Uma área de botão transparente, acessível por teclado, fica sobre o botão dourado original, preservando exatamente sua aparência.
- O cadastro abre em uma janela modal com nome completo, telefone com DDD, e-mail, loja, média de vendas e escolha entre Pix, cartão e boleto.
- A média aceita quantidade ou valor mensal. Todos os campos são obrigatórios. O botão Enviar só é liberado quando estão válidos.
- O investimento de **R$ 497,00** aparece no cadastro e na mensagem.
- O WhatsApp abre para **+55 81 9303-4159**, com a mensagem preenchida. O visitante confirma o envio no WhatsApp.
- A seleção de pagamento informa a preferência; o site não efetua cobrança nem solicita dados de cartão.
- Os dados não são enviados a um servidor do site nem salvos em armazenamento local. Eles integram o link do WhatsApp somente ao clicar em Enviar.
- A janela fecha pelo botão de fechar, pela tecla Escape ou ao clicar fora. Os campos são mantidos enquanto a página permanecer aberta.

## Arquivos

- `index.html`: página e formulário.
- `styles.css`: aparência e adaptação às telas.
- `app.js`: validação e montagem da mensagem para o WhatsApp.
- `assets/mentoria-dna-de-vendas.png`: arte original.
- `assets/favicon.svg`: ícone da aba.
- `.nojekyll`: publicação estática direta no GitHub Pages.

Para trocar o destinatário, altere `WHATSAPP_NUMBER` em `app.js`, usando somente dígitos com código do país e DDD. Para alterar o preço, atualize o HTML e a mensagem em `app.js`. A data e os demais textos da arte fazem parte da imagem.
