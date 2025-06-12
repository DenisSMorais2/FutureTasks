# 🚀 FutureTasks

**Organize sua vida com prêmios automáticos**

FutureTasks é um aplicativo web inovador de gerenciamento de tarefas que gamifica sua produtividade através de um sistema automático de recompensas por categoria. Complete tarefas e receba prêmios personalizados instantaneamente!

## ✨ Características Principais

### 🎁 **Sistema de Prêmios Automáticos**
- **Prêmios por Categoria**: Cada categoria de tarefa tem seu próprio conjunto de recompensas
- **Recompensas Instantâneas**: Ganhe prêmios automaticamente ao completar tarefas
- **Variedade de Prêmios**: Mais de 20 tipos diferentes de recompensas
- **Organização Semanal**: Prêmios organizados por semanas do ano

### ⏰ **Gestão Avançada de Tempo**
- **Horários de Início e Fim**: Defina períodos específicos para suas tarefas
- **Indicador "Em Andamento"**: Veja quais tarefas estão ativas no momento
- **Timer Automático**: Interface atualizada automaticamente a cada minuto
- **Notificações**: Lembretes 5 minutos antes do início das tarefas

### 📊 **Acompanhamento Detalhado**
- **Progresso Diário**: Anel de progresso visual para cada dia
- **Estatísticas Semanais**: Acompanhe seus prêmios por semana
- **Troféus**: Sistema de conquistas para dias 100% completos
- **Analytics**: Insights sobre produtividade e categorias favoritas

### 💫 **Interface Moderna**
- **Design Dark**: Interface elegante com gradientes e animações
- **Responsiva**: Funciona perfeitamente em desktop e mobile
- **Animações Suaves**: Transições e feedback visual aprimorado
- **Acessibilidade**: Suporte a atalhos de teclado e navegação

## 🎯 Categorias de Tarefas e Prêmios

### 💼 **Trabalho**
- ☕ 15 min de pausa para café
- 🎵 Ouvir 3 músicas favoritas
- 📱 10 min nas redes sociais
- 🚶 Dar uma volta de 5 minutos

### 🏠 **Pessoal**
- 📺 Assistir um episódio curto
- 🛀 Relaxar por 15 minutos
- 🍪 Comer um doce especial
- 📖 Ler por 10 minutos

### 🏃 **Saúde**
- 🥤 Smoothie nutritivo
- 🧘 5 min de meditação
- 🏆 Registrar conquista no app
- 💪 Comemorar o progresso

### 📚 **Estudos**
- 🎮 15 min de jogos
- 🍕 Lanche especial
- 📱 Assistir vídeos por 10 min
- 🎯 Marcar progresso no calendário

### 🔧 **Outros**
- ⭐ Se dar os parabéns
- 📝 Anotar a conquista
- 😊 Momento de gratidão
- 🎉 Mini celebração

## 🛠️ Instalação

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Não requer instalação de software adicional

### Configuração Rápida

1. **Clone ou baixe o repositório**
```bash
git clone https://github.com/seu-usuario/futuretasks.git
cd futuretasks
```

2. **Estrutura de arquivos necessária**
```
futuretasks/
├── index.html
├── styles.css
├── script.js
└── README.md
```

3. **Abrir a aplicação**
- Abra o arquivo `index.html` em seu navegador
- Ou use um servidor local:
```bash
# Python
python -m http.server 8000

# Node.js (http-server)
npx http-server

# Live Server (VS Code)
# Clique com botão direito no index.html → "Open with Live Server"
```

4. **Acesse no navegador**
```
http://localhost:8000
```

## 🎮 Como Usar

### 📋 **Gerenciando Tarefas**

1. **Criar Nova Tarefa**
   - Clique no botão "Nova Tarefa"
   - Preencha título, descrição (opcional)
   - Defina horários de início e fim (opcional)
   - Escolha uma categoria
   - Adicione imagem se desejar
   - Clique em "Salvar"

2. **Completar Tarefas**
   - Clique no botão circular ao lado da tarefa
   - Receba um prêmio automático instantaneamente
   - Veja sua notificação de recompensa

3. **Editar/Excluir**
   - Use os botões de editar (✏️) ou excluir (🗑️)
   - Confirme ações quando solicitado

### 🎁 **Sistema de Prêmios**

1. **Navegação por Semanas**
   - Use o seletor de semanas na aba "Prêmios"
   - Navegue entre semanas passadas e futuras
   - Veja prêmios organizados cronologicamente

2. **Usando Prêmios**
   - Clique no botão ✅ para marcar como "usado"
   - Prêmios são removidos da lista após uso
   - Acompanhe estatísticas semanais e totais

### 👤 **Perfil e Personalização**

1. **Configurar Perfil**
   - Adicione foto personalizada
   - Defina seu nome
   - Salve alterações

2. **Estatísticas**
   - Veja progresso diário
   - Acompanhe troféus semanais
   - Analise suas métricas

## ⌨️ Atalhos de Teclado

| Atalho | Função |
|--------|---------|
| `Ctrl + N` | Nova tarefa |
| `ESC` | Fechar modais |
| `1` | Aba Tarefas |
| `2` | Aba Prêmios |
| `3` | Aba Perfil |

## 💾 Armazenamento de Dados

### 🗄️ **Dados Locais**
Todos os dados são armazenados localmente no navegador usando `localStorage`:

- **futureTasks**: Tarefas organizadas por dia
- **futuraWeeklyRewards**: Prêmios organizados por semana
- **futuraProfile**: Dados do perfil do usuário
- **futuraTrophies**: Troféus conquistados

### 📤 **Backup e Restore**

```javascript
// Exportar dados (adicione ao console do navegador)
exportData(); // Baixa arquivo JSON com backup

// Importar dados
importData(file); // Restaura dados de arquivo JSON
```

## 🔧 Funcionalidades Técnicas

### 📱 **Recursos Avançados**
- **Auto-save**: Dados salvos automaticamente a cada 30 segundos
- **Modo Offline**: Funciona completamente sem internet
- **Notificações Push**: Lembretes do navegador (opcional)
- **Service Worker**: Suporte para PWA (Progressive Web App)
- **Responsivo**: Design adaptado para todas as telas

### 🎨 **Personalização**
- **Temas**: Sistema de cores CSS customizável
- **Animações**: Transições e efeitos configuráveis
- **Categorias**: Facilmente extensível para novas categorias

## 📱 Progressive Web App (PWA)

FutureTasks pode ser instalado como um aplicativo:

1. **Chrome/Edge**: Clique no ícone de instalação na barra de endereços
2. **Firefox**: Menu → "Instalar esta página"
3. **Safari**: Compartilhar → "Adicionar à Tela Inicial"

## 🔒 Privacidade e Segurança

- ✅ **100% Local**: Todos os dados ficam no seu dispositivo
- ✅ **Sem Tracking**: Nenhum dado é enviado para servidores
- ✅ **Sem Cookies**: Não usa cookies de terceiros
- ✅ **Open Source**: Código completamente transparente

## 🎯 Casos de Uso

### 👨‍💼 **Profissionais**
- Gerenciar tarefas diárias do trabalho
- Manter equilíbrio trabalho-vida pessoal
- Gamificar produtividade da equipe

### 🎓 **Estudantes**
- Organizar cronograma de estudos
- Manter motivação através de recompensas
- Acompanhar progresso acadêmico

### 🏠 **Uso Pessoal**
- Organizar tarefas domésticas
- Manter hábitos saudáveis
- Gerenciar projetos pessoais

## 🚀 Próximos Recursos

### 🔄 **Em Desenvolvimento**
- [ ] Sincronização com Google Calendar
- [ ] Metas semanais e mensais
- [ ] Relatórios de produtividade
- [ ] Compartilhamento de conquistas
- [ ] Modo equipe/família
- [ ] Integração com Pomodoro Timer

### 💡 **Ideias Futuras**
- [ ] Gamificação avançada (níveis, XP)
- [ ] Prêmios personalizáveis pelo usuário
- [ ] Análises com IA
- [ ] Aplicativo mobile nativo
- [ ] Integração com wearables

## 🐛 Solução de Problemas

### ❓ **Problemas Comuns**

**Dados não salvam**
- Verifique se o navegador permite localStorage
- Certifique-se de não estar em modo privado/incógnito

**Notificações não funcionam**
- Permita notificações quando solicitado
- Verifique configurações do navegador

**Interface não carrega**
- Verifique conexão com internet (para CDNs)
- Limpe cache do navegador
- Teste em navegador diferente

### 🔧 **Debug**
```javascript
// Console do navegador - verificar dados
console.log('Tasks:', localStorage.getItem('futureTasks'));
console.log('Rewards:', localStorage.getItem('futuraWeeklyRewards'));

// Limpar todos os dados (CUIDADO!)
localStorage.clear();
```