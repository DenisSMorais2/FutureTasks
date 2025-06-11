# 🌙 FuturaTasks Dark

Um aplicativo moderno de gerenciamento de tarefas com sistema de gamificação através de prêmios personalizados. Interface exclusiva em tema dark com paleta de cores azuis.

![FuturaTasks](https://img.shields.io/badge/Version-2.0-blue?style=for-the-badge)
![Theme](https://img.shields.io/badge/Theme-Dark%20Only-1a1a1a?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 🎯 **Características Principais**

### ✨ **Interface Moderna**
- **Tema Dark Exclusivo** com paleta azul (#3b82f6, #1d4ed8, #60a5fa)
- **Gradientes suaves** e animações fluidas
- **Cards hover** com elevação 3D
- **Tipografia moderna** com ícones Font Awesome

### 📅 **Gerenciamento de Tarefas**
- **Organização semanal** com seleção de dias
- **Horários personalizados** para cada tarefa
- **5 categorias** com códigos de cores:
  - 💼 **Trabalho** (Azul)
  - 🏠 **Pessoal** (Verde) 
  - 🏃 **Saúde** (Amarelo)
  - 📚 **Estudos** (Roxo)
  - 🔧 **Outros** (Cinza)
- **Upload de imagens** para ilustrar tarefas
- **Progresso circular** animado por dia

### 🎁 **Sistema de Prêmios Gamificado**
- **Prêmios personalizados** por tarefa concluída
- **Biblioteca de prêmios** reutilizáveis
- **10 ícones temáticos** disponíveis
- **Notificações animadas** de conquista
- **Histórico completo** de prêmios conquistados

### 🏆 **Sistema de Troféus**
- **Troféu por dia** ao completar todas as tarefas
- **Indicadores visuais** nos dias da semana
- **Progresso semanal** no perfil

## 🚀 **Tecnologias Utilizadas**

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização avançada com variáveis CSS
- **JavaScript ES6+** - Lógica da aplicação
- **Tailwind CSS** - Framework de estilização
- **Font Awesome** - Biblioteca de ícones
- **LocalStorage API** - Persistência de dados local

## 📁 **Estrutura do Projeto**

```
futuratasks/
│
├── index.html          # Aplicação principal
├── README.md           # Documentação
└── assets/
    ├── screenshots/    # Capturas de tela
    └── docs/          # Documentação adicional
```

## 🛠️ **Como Usar**

### **Instalação**
1. Clone ou baixe o arquivo `index.html`
2. Abra em qualquer navegador moderno
3. Não requer servidor - funciona offline!

### **Primeiros Passos**

#### 1. **Configurar Perfil**
- Acesse a aba **Perfil**
- Adicione seu nome e foto
- Clique em **Salvar Perfil**

#### 2. **Criar Tarefas**
- Na aba **Tarefas**, clique em **Nova Tarefa**
- Preencha:
  - **Título** (obrigatório)
  - **Descrição** (opcional)
  - **Horário** (opcional)
  - **Categoria** (trabalho, pessoal, etc.)
  - **Prêmio Personalizado** (opcional)
  - **Imagem** (opcional)

#### 3. **Gerenciar Prêmios**
- Na aba **Prêmios**, clique em **Adicionar**
- Crie prêmios reutilizáveis:
  - Nome do prêmio
  - Descrição
  - Ícone temático

#### 4. **Conquistar Prêmios**
- Complete tarefas com prêmios personalizados
- Receba notificação de conquista
- Visualize na seção **Prêmios Conquistados**
- Marque como **Usado** quando desejar

## 📱 **Funcionalidades Detalhadas**

### **Aba Tarefas**
- ✅ **Visualização semanal** com navegação por dias
- ✅ **Progresso circular** mostrando % de conclusão
- ✅ **Lista organizada** por horário
- ✅ **Badges visuais** para categoria e horário
- ✅ **Ações rápidas**: completar, editar, excluir
- ✅ **Troféus automáticos** ao completar o dia

### **Aba Prêmios**
- 🎁 **Prêmios Conquistados**: lista com data de conquista
- 🎁 **Prêmios Disponíveis**: biblioteca pessoal
- 🎁 **Estatísticas**: total conquistado e tarefas completas
- 🎁 **Gestão completa**: criar, usar, excluir prêmios

### **Aba Perfil**
- 👤 **Informações pessoais**: nome e foto
- 📊 **Estatísticas do dia**: total, completas, pendentes
- 🏆 **Progresso semanal**: troféus conquistados
- 💾 **Dados salvos** automaticamente

## 💾 **Armazenamento de Dados**

Todos os dados são salvos localmente no navegador:

```javascript
// Estrutura de dados no localStorage
{
  "futuraTasks": {
    "monday": [...tarefas],
    "tuesday": [...tarefas],
    // ... outros dias
  },
  "futuraRewards": [...premios_disponiveis],
  "futuraEarnedRewards": [...premios_conquistados],
  "futuraProfile": {
    "name": "Nome do usuário",
    "photo": "data:image/..."
  },
  "futuraTrophies": {
    "monday": { "date": "...", "tasks": 5 },
    // ... outros dias conquistados
  }
}
```

## 🎨 **Paleta de Cores**

```css
:root {
  --primary: #3b82f6;        /* Azul principal */
  --secondary: #1d4ed8;      /* Azul escuro */
  --accent: #60a5fa;         /* Azul claro */
  --success: #22c55e;        /* Verde sucesso */
  --warning: #f59e0b;        /* Amarelo aviso */
  --danger: #ef4444;         /* Vermelho perigo */
  --bg-primary: #0f172a;     /* Fundo principal */
  --bg-secondary: #1e293b;   /* Fundo secundário */
  --bg-card: #334155;        /* Fundo dos cards */
  --text-primary: #f1f5f9;   /* Texto principal */
  --text-secondary: #94a3b8; /* Texto secundário */
}
```

## 🏗️ **Arquitetura do Código**

### **Componentes Principais**

```javascript
// Gerenciamento de Estado
let tasks = {};              // Tarefas por dia
let rewards = [];            // Prêmios disponíveis
let earnedRewards = [];      // Prêmios conquistados
let userProfile = {};        // Dados do usuário
let trophies = {};          // Troféus conquistados

// Funções Principais
init()                      // Inicialização
loadTasks(day)             // Carrega tarefas do dia
createTaskElement()        // Cria elemento visual da tarefa
updateProgress()           // Atualiza progresso circular
awardReward()             // Concede prêmio
showRewardNotification()   // Mostra notificação
```

### **Eventos e Interações**

- **Tab switching**: Navegação entre abas
- **Day switching**: Seleção de dias da semana
- **Task management**: CRUD completo de tarefas
- **Reward system**: Criação e conquista de prêmios
- **Profile management**: Edição de dados pessoais
- **Data persistence**: Salvamento automático

## 🔧 **Customização**

### **Adicionar Novas Categorias**
```javascript
const categoryConfig = {
  work: { icon: '💼', name: 'Trabalho', color: 'blue' },
  // Adicione nova categoria aqui
  fitness: { icon: '💪', name: 'Fitness', color: 'orange' }
};
```

### **Novos Ícones de Prêmios**
```html
<option value="🎯">🎯 Meta</option>
<option value="🌟">🌟 Conquista</option>
<!-- Adicione novos ícones aqui -->
```

### **Modificar Cores**
```css
:root {
  --primary: #seu-azul-aqui;
  --secondary: #seu-azul-escuro-aqui;
  /* Modifique as variáveis CSS */
}
```

## 📱 **Compatibilidade**

### **Navegadores Suportados**
- ✅ **Chrome** 80+
- ✅ **Firefox** 75+
- ✅ **Safari** 13+
- ✅ **Edge** 80+

### **Dispositivos**
- 📱 **Mobile**: Responsivo para smartphones
- 💻 **Desktop**: Otimizado para telas grandes
- 📟 **Tablet**: Compatível com tablets

### **Requisitos**
- JavaScript habilitado
- LocalStorage disponível
- Conexão com internet (apenas para CDNs)

## 🚀 **Roadmap Futuro**

### **Versão 2.1**
- [ ] Sincronização na nuvem
- [ ] Notificações push
- [ ] Modo offline completo
- [ ] Exportar/importar dados

### **Versão 2.2**
- [ ] Colaboração em equipe
- [ ] Relatórios avançados
- [ ] Integração com calendários
- [ ] API REST

### **Versão 3.0**
- [ ] Aplicativo mobile nativo
- [ ] Inteligência artificial para sugestões
- [ ] Gamificação avançada
- [ ] Comunidade de usuários

### **FAQ**

**P: Os dados ficam salvos?**
R: Sim, tudo é salvo no localStorage do navegador.

**P: Funciona offline?**
R: Sim, após o primeiro carregamento funciona completamente offline.

**P: Posso usar em múltiplos dispositivos?**
R: Atualmente não há sincronização, mas está no roadmap.

**P: Como fazer backup?**
R: Use as ferramentas do desenvolvedor para exportar o localStorage.

<div align="center">

**🌟 FuturaTasks - Organize sua vida com estilo! 🌟**

[⬆️ Voltar ao topo](#-futuratasks-dark)

</div>