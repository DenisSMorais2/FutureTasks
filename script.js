// DOM Elements
const tabs = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const dayBtns = document.querySelectorAll('.day-btn');
const tasksList = document.getElementById('tasksList');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskModal = document.getElementById('taskModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelTaskBtn = document.getElementById('cancelTaskBtn');
const taskForm = document.getElementById('taskForm');
const progressRing = document.getElementById('progressRing');
const progressText = document.getElementById('progressText');

// Reward elements
const weekSelector = document.getElementById('weekSelector');
const weeklyRewardsList = document.getElementById('weeklyRewardsList');
const currentWeekTitle = document.getElementById('currentWeekTitle');
const rewardNotification = document.getElementById('rewardNotification');
const closeRewardNotificationBtn = document.getElementById('closeRewardNotificationBtn');
const rewardNotificationMessage = document.getElementById('rewardNotificationMessage');

// Form elements
const taskIdInput = document.getElementById('taskId');
const taskTitleInput = document.getElementById('taskTitle');
const taskDescriptionInput = document.getElementById('taskDescription');
const taskStartTimeInput = document.getElementById('taskStartTime');
const taskEndTimeInput = document.getElementById('taskEndTime');
const taskCategoryInput = document.getElementById('taskCategory');
const taskImageInput = document.getElementById('taskImage');
const uploadImageBtn = document.getElementById('uploadImageBtn');
const imagePreviewText = document.getElementById('imagePreviewText');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const imagePreview = document.getElementById('imagePreview');

// Profile elements
const changePhotoBtn = document.getElementById('changePhotoBtn');
const photoInput = document.getElementById('photoInput');
const profileImage = document.getElementById('profileImage');
const nameInput = document.getElementById('nameInput');
const userName = document.getElementById('userName');
const saveProfileBtn = document.getElementById('saveProfileBtn');

// State
let currentDay = 'friday';
let currentWeek = getCurrentWeek();
let tasks = JSON.parse(localStorage.getItem('futureTasks')) || {};
let weeklyRewards = JSON.parse(localStorage.getItem('futuraWeeklyRewards')) || {};
let userProfile = JSON.parse(localStorage.getItem('futuraProfile')) || {
    name: 'Usuário',
    photo: 'https://via.placeholder.com/120'
};
let trophies = JSON.parse(localStorage.getItem('futuraTrophies')) || {};

// Category configuration with automatic rewards
const categoryConfig = {
    work: { 
        icon: '💼', 
        name: 'Trabalho', 
        color: 'blue',
        rewards: ['☕ 15 min de pausa para café', '🎵 Ouvir 3 músicas favoritas', '📱 10 min nas redes sociais', '🚶 Dar uma volta de 5 minutos']
    },
    personal: { 
        icon: '🏠', 
        name: 'Pessoal', 
        color: 'green',
        rewards: ['📺 Assistir um episódio curto', '🛀 Relaxar por 15 minutos', '🍪 Comer um doce especial', '📖 Ler por 10 minutos']
    },
    health: { 
        icon: '🏃', 
        name: 'Saúde', 
        color: 'yellow',
        rewards: ['🥤 Smoothie nutritivo', '🧘 5 min de meditação', '🏆 Registrar conquista no app', '💪 Comemorar o progresso']
    },
    study: { 
        icon: '📚', 
        name: 'Estudos', 
        color: 'purple',
        rewards: ['🎮 15 min de jogos', '🍕 Lanche especial', '📱 Assistir vídeos por 10 min', '🎯 Marcar progresso no calendário']
    },
    other: { 
        icon: '🔧', 
        name: 'Outros', 
        color: 'gray',
        rewards: ['⭐ Se dar os parabéns', '📝 Anotar a conquista', '😊 Momento de gratidão', '🎉 Mini celebração']
    }
};

// Utility functions
function getCurrentWeek() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}

function getWeekKey(year, week) {
    return `${year}-W${week}`;
}

function getCurrentWeekKey() {
    const now = new Date();
    return getWeekKey(now.getFullYear(), getCurrentWeek());
}

function getWeekDates(year, week) {
    const jan1 = new Date(year, 0, 1);
    const firstMonday = new Date(jan1.getTime() + ((8 - jan1.getDay()) % 7) * 24 * 60 * 60 * 1000);
    const weekStart = new Date(firstMonday.getTime() + (week - 2) * 7 * 24 * 60 * 60 * 1000);
    const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
    return { start: weekStart, end: weekEnd };
}

// Initialize app
function init() {
    loadProfile();
    updateDayButtons();
    loadTasks(currentDay);
    generateWeekSelector();
    loadWeeklyRewards(getCurrentWeekKey());
    updateProgress();
    updateTrophyDisplay();
    updateStats();
    setupEventListeners();
    startTaskTimer();
}

// Profile management
function loadProfile() {
    userName.textContent = userProfile.name;
    nameInput.value = userProfile.name;
    profileImage.src = userProfile.photo;
}

function saveProfile() {
    if (nameInput.value.trim()) {
        userProfile.name = nameInput.value.trim();
        userName.textContent = userProfile.name;
        localStorage.setItem('futuraProfile', JSON.stringify(userProfile));
        showNotification('Perfil salvo com sucesso!');
    }
}

// Week management
function generateWeekSelector() {
    weekSelector.innerHTML = '';
    const currentYear = new Date().getFullYear();
    const currentWeekNum = getCurrentWeek();
    
    // Show last 4 weeks and next 4 weeks
    for (let i = -4; i <= 4; i++) {
        const weekNum = currentWeekNum + i;
        const weekKey = getWeekKey(currentYear, weekNum);
        const weekDates = getWeekDates(currentYear, weekNum);
        
        const button = document.createElement('button');
        button.className = `week-selector ${weekKey === getCurrentWeekKey() ? 'active' : ''}`;
        button.textContent = `Sem ${weekNum}`;
        button.dataset.week = weekKey;
        
        button.addEventListener('click', () => {
            document.querySelectorAll('.week-selector').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadWeeklyRewards(weekKey);
        });
        
        weekSelector.appendChild(button);
    }
    
    // Scroll to current week
    const activeWeek = weekSelector.querySelector('.active');
    if (activeWeek) {
        activeWeek.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

// Day management
function updateDayButtons() {
    dayBtns.forEach(btn => {
        const day = btn.dataset.day;
        const trophyIndicator = btn.querySelector('.trophy-indicator');
        
        if (day === currentDay) {
            btn.classList.add('day-active');
        } else {
            btn.classList.remove('day-active');
        }
        
        // Show trophy if day is completed
        if (trophies[day]) {
            trophyIndicator.classList.remove('hidden');
        } else {
            trophyIndicator.classList.add('hidden');
        }
    });
}

// Task management
function loadTasks(day) {
    tasksList.innerHTML = '';
    
    if (!tasks[day] || tasks[day].length === 0) {
        tasksList.innerHTML = `
            <div class="card p-8 text-center text-gray-400">
                <i class="fas fa-clipboard-list text-4xl mb-4 text-gray-600"></i>
                <p class="text-lg font-medium">Nenhuma tarefa para ${getDayName(day)}</p>
                <p class="text-sm mt-2">Adicione uma nova tarefa para começar!</p>
            </div>
        `;
        updateProgress();
        return;
    }
    
    // Sort tasks by start time
    const sortedTasks = [...tasks[day]].sort((a, b) => {
        if (!a.startTime && !b.startTime) return 0;
        if (!a.startTime) return 1;
        if (!b.startTime) return -1;
        return a.startTime.localeCompare(b.startTime);
    });
    
    sortedTasks.forEach((task, index) => {
        const originalIndex = tasks[day].findIndex(t => t === task);
        const taskElement = createTaskElement(task, originalIndex);
        tasksList.appendChild(taskElement);
    });
    
    updateProgress();
}

function createTaskElement(task, index) {
    const taskElement = document.createElement('div');
    const category = categoryConfig[task.category] || categoryConfig.other;
    const isInProgress = isTaskInProgress(task);
    
    taskElement.className = `card p-4 relative transition-all duration-300 hover:scale-[1.02] category-${task.category} ${task.completed ? 'task-completed' : ''} ${isInProgress ? 'task-in-progress' : ''}`;
    
    const timeDisplay = getTimeDisplay(task);
    
    taskElement.innerHTML = `
        <div class="flex items-start">
            <button class="complete-btn mr-4 mt-1 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                task.completed 
                    ? 'bg-green-500 border-green-500 scale-110' 
                    : 'border-gray-500 hover:border-green-400'
            }">
                ${task.completed ? '<i class="fas fa-check text-white"></i>' : ''}
            </button>
            <div class="flex-1 min-w-0">
                <div class="flex items-center flex-wrap gap-2 mb-2">
                    <h3 class="font-semibold text-lg ${task.completed ? 'line-through opacity-60' : ''}">${task.title}</h3>
                    <span class="category-badge category-${task.category}">${category.icon} ${category.name}</span>
                    ${timeDisplay ? `<span class="time-badge">${timeDisplay}</span>` : ''}
                    ${isInProgress ? '<span class="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">Em andamento</span>' : ''}
                </div>
                ${task.description ? `
                    <p class="text-gray-400 mb-3 ${task.completed ? 'line-through opacity-60' : ''}">${task.description}</p>
                ` : ''}
                ${task.image ? `
                    <div class="mt-3 rounded-xl overflow-hidden">
                        <img src="${task.image}" alt="Task Image" class="w-full h-32 object-cover">
                    </div>
                ` : ''}
            </div>
            <div class="flex flex-col space-y-2 ml-3">
                <button class="edit-btn p-2 rounded-full hover:bg-gray-700 transition-colors">
                    <i class="fas fa-edit text-blue-400"></i>
                </button>
                <button class="delete-btn p-2 rounded-full hover:bg-gray-700 transition-colors">
                    <i class="fas fa-trash text-red-400"></i>
                </button>
            </div>
        </div>
        <input type="hidden" value="${index}">
    `;
    
    return taskElement;
}

function getTimeDisplay(task) {
    if (task.startTime && task.endTime) {
        return `${formatTime(task.startTime)} - ${formatTime(task.endTime)}`;
    } else if (task.startTime) {
        return `${formatTime(task.startTime)}`;
    }
    return '';
}

function isTaskInProgress(task) {
    if (!task.startTime || !task.endTime || task.completed) return false;
    
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    return currentTime >= task.startTime && currentTime <= task.endTime;
}

function startTaskTimer() {
    setInterval(() => {
        // Reload tasks to update in-progress status
        loadTasks(currentDay);
    }, 60000); // Update every minute
}

function formatTime(timeStr) {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    return `${hours}:${minutes}`;
}

function getDayName(day) {
    const days = {
        'monday': 'Segunda-feira',
        'tuesday': 'Terça-feira', 
        'wednesday': 'Quarta-feira',
        'thursday': 'Quinta-feira',
        'friday': 'Sexta-feira',
        'saturday': 'Sábado',
        'sunday': 'Domingo'
    };
    return days[day] || day;
}

// Automatic reward system
function getRandomReward(category) {
    const rewards = categoryConfig[category]?.rewards || categoryConfig.other.rewards;
    return rewards[Math.floor(Math.random() * rewards.length)];
}

function awardAutomaticReward(task) {
    const reward = {
        title: getRandomReward(task.category),
        category: task.category,
        icon: categoryConfig[task.category]?.icon || '🎁',
        earnedAt: new Date().toISOString(),
        taskTitle: task.title,
        weekKey: getCurrentWeekKey()
    };
    
    // Add to weekly rewards
    if (!weeklyRewards[getCurrentWeekKey()]) {
        weeklyRewards[getCurrentWeekKey()] = [];
    }
    
    weeklyRewards[getCurrentWeekKey()].push(reward);
    localStorage.setItem('futuraWeeklyRewards', JSON.stringify(weeklyRewards));
    
    showRewardNotification(`🎉 ${reward.title}`);
    
    // Reload rewards if we're viewing current week
    if (document.querySelector('.week-selector.active')?.dataset.week === getCurrentWeekKey()) {
        loadWeeklyRewards(getCurrentWeekKey());
    }
    
    updateStats();
}

// Reward management
function loadWeeklyRewards(weekKey) {
    const rewards = weeklyRewards[weekKey] || [];
    currentWeekTitle.textContent = `Prêmios da ${weekKey.replace('-W', ' Semana ')}`;
    
    weeklyRewardsList.innerHTML = '';
    
    if (rewards.length === 0) {
        weeklyRewardsList.innerHTML = '<p class="text-gray-400 text-center py-4">Nenhum prêmio conquistado nesta semana</p>';
    } else {
        rewards.forEach((reward, index) => {
            const rewardElement = createWeeklyRewardElement(reward, index, weekKey);
            weeklyRewardsList.appendChild(rewardElement);
        });
    }
    
    updateRewardStats();
}

function createWeeklyRewardElement(reward, index, weekKey) {
    const rewardElement = document.createElement('div');
    rewardElement.className = 'reward-item earned-reward';
    rewardElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <span class="text-2xl mr-3">${reward.icon}</span>
                <div class="flex-1">
                    <h4 class="font-semibold">${reward.title}</h4>
                    <p class="text-sm text-gray-400">Por completar: ${reward.taskTitle}</p>
                    <p class="text-xs text-green-400 mt-1">
                        ${new Date(reward.earnedAt).toLocaleDateString()} às ${new Date(reward.earnedAt).toLocaleTimeString().slice(0, 5)}
                    </p>
                </div>
            </div>
            <button class="use-reward-btn p-2 rounded-full hover:bg-green-600 bg-green-500 text-white" data-index="${index}" data-week="${weekKey}">
                <i class="fas fa-check"></i>
            </button>
        </div>
    `;
    return rewardElement;
}

function updateRewardStats() {
    const currentWeekRewards = (weeklyRewards[getCurrentWeekKey()] || []).length;
    const totalRewards = Object.values(weeklyRewards).flat().length;
    
    document.getElementById('weekRewards').textContent = currentWeekRewards;
    document.getElementById('totalRewards').textContent = totalRewards;
}

// Progress management
function updateProgress() {
    const dayTasks = tasks[currentDay] || [];
    const totalTasks = dayTasks.length;
    const completedTasks = dayTasks.filter(task => task.completed).length;
    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    // Update progress ring
    const circumference = 2 * Math.PI * 15.9155;
    const strokeDasharray = `${percentage}, 100`;
    progressRing.style.strokeDasharray = strokeDasharray;
    progressText.textContent = `${percentage}%`;
    
    // Check for trophy
    if (percentage === 100 && totalTasks > 0 && !trophies[currentDay]) {
        awardTrophy(currentDay);
    }
    
    // Update today's stats in profile
    document.getElementById('todayTotal').textContent = totalTasks;
    document.getElementById('todayCompleted').textContent = completedTasks;
    document.getElementById('todayPending').textContent = totalTasks - completedTasks;
}

// Trophy system
function awardTrophy(day) {
    trophies[day] = {
        date: new Date().toISOString(),
        tasks: tasks[day].length
    };
    localStorage.setItem('futuraTrophies', JSON.stringify(trophies));
    
    updateTrophyDisplay();
    updateDayButtons();
}

function updateTrophyDisplay() {
    // Update weekly trophy display
    Object.keys(trophies).forEach(day => {
        const trophyElement = document.getElementById(`trophy-${day}`);
        if (trophyElement) {
            trophyElement.className = 'trophy-day w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg';
            trophyElement.innerHTML = '<i class="fas fa-trophy text-white text-xs"></i>';
        }
    });
}

function updateStats() {
    updateRewardStats();
}

// Modal management
function showTaskModal(task = null) {
    if (task) {
        taskIdInput.value = task.index;
        taskTitleInput.value = task.title;
        taskDescriptionInput.value = task.description || '';
        taskStartTimeInput.value = task.startTime || '';
        taskEndTimeInput.value = task.endTime || '';
        taskCategoryInput.value = task.category || 'work';
        
        if (task.image) {
            imagePreviewText.value = 'Imagem selecionada';
            imagePreview.src = task.image;
            imagePreviewContainer.classList.remove('hidden');
        } else {
            resetImagePreview();
        }
    } else {
        taskForm.reset();
        taskIdInput.value = '';
        resetImagePreview();
    }
    taskModal.classList.remove('hidden');
    taskTitleInput.focus();
}

function resetImagePreview() {
    imagePreviewText.value = 'Nenhuma imagem selecionada';
    imagePreviewContainer.classList.add('hidden');
}

function showImagePreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.src = e.target.result;
        imagePreviewContainer.classList.remove('hidden');
        imagePreviewText.value = file.name;
    };
    reader.readAsDataURL(file);
}

// Notifications
function showRewardNotification(message) {
    rewardNotificationMessage.textContent = message;
    rewardNotification.classList.remove('hidden');
    setTimeout(() => {
        rewardNotification.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
        hideRewardNotification();
    }, 5000);
}

function hideRewardNotification() {
    rewardNotification.classList.add('translate-x-full');
    setTimeout(() => {
        rewardNotification.classList.add('hidden');
    }, 500);
}

function showNotification(message) {
    alert(message);
}

// Data persistence
function saveTasks() {
    localStorage.setItem('futureTasks', JSON.stringify(tasks));
}

// Event listeners
function setupEventListeners() {
    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('tab-active', 'text-white'));
            tabs.forEach(t => t.classList.add('text-gray-400'));
            tab.classList.add('tab-active', 'text-white');
            tab.classList.remove('text-gray-400');
            
            tabPanels.forEach(panel => panel.classList.add('hidden'));
            const targetPanel = document.getElementById(`${tab.id.replace('Tab', 'Content')}`);
            targetPanel.classList.remove('hidden');
            targetPanel.classList.add('fade-in-up');
        });
    });

    // Day switching
    dayBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentDay = btn.dataset.day;
            updateDayButtons();
            loadTasks(currentDay);
        });
    });

    // Modal controls
    addTaskBtn.addEventListener('click', () => showTaskModal());
    closeModalBtn.addEventListener('click', () => taskModal.classList.add('hidden'));
    cancelTaskBtn.addEventListener('click', () => taskModal.classList.add('hidden'));

    closeRewardNotificationBtn.addEventListener('click', hideRewardNotification);

    // Task form
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate time inputs
        const startTime = taskStartTimeInput.value;
        const endTime = taskEndTimeInput.value;
        
        if (startTime && endTime && startTime >= endTime) {
            alert('O horário de fim deve ser posterior ao horário de início!');
            return;
        }
        
        const taskData = {
            title: taskTitleInput.value.trim(),
            description: taskDescriptionInput.value.trim(),
            startTime: startTime,
            endTime: endTime,
            category: taskCategoryInput.value,
            completed: false,
            image: imagePreviewContainer.classList.contains('hidden') ? null : imagePreview.src,
            createdAt: new Date().toISOString()
        };
        
        if (!tasks[currentDay]) {
            tasks[currentDay] = [];
        }
        
        if (taskIdInput.value !== '') {
            // Edit existing task
            const index = parseInt(taskIdInput.value);
            taskData.completed = tasks[currentDay][index].completed;
            taskData.createdAt = tasks[currentDay][index].createdAt;
            tasks[currentDay][index] = taskData;
        } else {
            // Add new task
            tasks[currentDay].push(taskData);
        }
        
        saveTasks();
        loadTasks(currentDay);
        updateStats();
        taskModal.classList.add('hidden');
    });

    // Image upload
    uploadImageBtn.addEventListener('click', () => taskImageInput.click());
    taskImageInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            showImagePreview(e.target.files[0]);
        }
    });

    // Task actions (delegated)
    tasksList.addEventListener('click', (e) => {
        const taskElement = e.target.closest('.card');
        if (!taskElement) return;
        
        const index = parseInt(taskElement.querySelector('input[type="hidden"]').value);
        
        if (e.target.closest('.complete-btn')) {
            const wasCompleted = tasks[currentDay][index].completed;
            tasks[currentDay][index].completed = !wasCompleted;
            
            // Award automatic reward if task completed
            if (!wasCompleted && tasks[currentDay][index].completed) {
                awardAutomaticReward(tasks[currentDay][index]);
            }
            
            saveTasks();
            loadTasks(currentDay);
            updateStats();
        } else if (e.target.closest('.edit-btn')) {
            showTaskModal({...tasks[currentDay][index], index});
        } else if (e.target.closest('.delete-btn')) {
            if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
                tasks[currentDay].splice(index, 1);
                saveTasks();
                loadTasks(currentDay);
                updateStats();
            }
        }
    });

    // Reward actions (delegated)
    weeklyRewardsList.addEventListener('click', (e) => {
        if (e.target.closest('.use-reward-btn')) {
            const button = e.target.closest('.use-reward-btn');
            const index = parseInt(button.dataset.index);
            const weekKey = button.dataset.week;
            
            if (confirm('Marcar este prêmio como usado?')) {
                weeklyRewards[weekKey].splice(index, 1);
                localStorage.setItem('futuraWeeklyRewards', JSON.stringify(weeklyRewards));
                loadWeeklyRewards(weekKey);
            }
        }
    });

    // Profile management
    changePhotoBtn.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function(event) {
                profileImage.src = event.target.result;
                userProfile.photo = event.target.result;
                localStorage.setItem('futuraProfile', JSON.stringify(userProfile));
            };
            reader.readAsDataURL(file);
        }
    });
    saveProfileBtn.addEventListener('click', saveProfile);

    // Close modals on outside click
    taskModal.addEventListener('click', (e) => {
        if (e.target === taskModal) {
            taskModal.classList.add('hidden');
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // ESC to close modals
        if (e.key === 'Escape') {
            if (!taskModal.classList.contains('hidden')) {
                taskModal.classList.add('hidden');
            }
            if (!rewardNotification.classList.contains('hidden')) {
                hideRewardNotification();
            }
        }
        
        // Ctrl+N for new task
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            showTaskModal();
        }
        
        // Tab navigation (1, 2, 3)
        if (e.key >= '1' && e.key <= '3' && !e.ctrlKey && !e.altKey) {
            const tabIndex = parseInt(e.key) - 1;
            const targetTab = tabs[tabIndex];
            if (targetTab && !taskModal.classList.contains('hidden') === false) {
                targetTab.click();
            }
        }
    });

    // Auto-save functionality
    setInterval(() => {
        saveTasks();
        localStorage.setItem('futuraWeeklyRewards', JSON.stringify(weeklyRewards));
        localStorage.setItem('futuraTrophies', JSON.stringify(trophies));
    }, 30000); // Auto-save every 30 seconds

    // Update day numbers dynamically
    updateDayNumbers();
    setInterval(updateDayNumbers, 86400000); // Update daily
}

// Helper function to update day numbers
function updateDayNumbers() {
    const today = new Date();
    const dayElements = document.querySelectorAll('.day-btn');
    
    dayElements.forEach((btn, index) => {
        const dayDiff = index - 4; // Friday is index 4, so Monday is -4
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + dayDiff);
        
        const dayNumber = btn.querySelector('.text-xs');
        if (dayNumber) {
            dayNumber.textContent = targetDate.getDate();
        }
    });
}

// Performance optimization - debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error handling wrapper
function safeExecute(func, errorMessage = 'Ocorreu um erro') {
    try {
        return func();
    } catch (error) {
        console.error(errorMessage, error);
        showNotification(errorMessage);
        return null;
    }
}

// Data export/import functions
function exportData() {
    const data = {
        tasks,
        weeklyRewards,
        userProfile,
        trophies,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `futuretasks_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (confirm('Isso irá substituir todos os seus dados atuais. Continuar?')) {
                tasks = data.tasks || {};
                weeklyRewards = data.weeklyRewards || {};
                userProfile = data.userProfile || { name: 'Usuário', photo: 'https://via.placeholder.com/120' };
                trophies = data.trophies || {};
                
                // Save to localStorage
                localStorage.setItem('futureTasks', JSON.stringify(tasks));
                localStorage.setItem('futuraWeeklyRewards', JSON.stringify(weeklyRewards));
                localStorage.setItem('futuraProfile', JSON.stringify(userProfile));
                localStorage.setItem('futuraTrophies', JSON.stringify(trophies));
                
                // Reload app
                location.reload();
            }
        } catch (error) {
            showNotification('Erro ao importar dados. Verifique se o arquivo é válido.');
        }
    };
    reader.readAsText(file);
}

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker registrado com sucesso');
            })
            .catch((error) => {
                console.log('ServiceWorker falhou ao registrar');
            });
    });
}

// Theme management
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
    } else {
        document.body.classList.add('dark-theme');
    }
}

// Notification permission
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notificações permitidas');
            }
        });
    }
}

// Task reminder notifications
function scheduleTaskReminder(task) {
    if ('Notification' in window && Notification.permission === 'granted' && task.startTime) {
        const now = new Date();
        const [hours, minutes] = task.startTime.split(':');
        const taskTime = new Date();
        taskTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        // Schedule notification 5 minutes before task
        const reminderTime = new Date(taskTime.getTime() - 5 * 60 * 1000);
        const delay = reminderTime.getTime() - now.getTime();
        
        if (delay > 0) {
            setTimeout(() => {
                new Notification('FutureTasks - Lembrete', {
                    body: `Sua tarefa "${task.title}" começará em 5 minutos!`,
                    icon: '/icon-192x192.png',
                    badge: '/icon-72x72.png'
                });
            }, delay);
        }
    }
}

// Analytics and insights
function generateInsights() {
    const allTasks = Object.values(tasks).flat();
    const completedTasks = allTasks.filter(task => task.completed);
    const totalRewardsCount = Object.values(weeklyRewards).flat().length;
    
    const insights = {
        totalTasks: allTasks.length,
        completedTasks: completedTasks.length,
        completionRate: allTasks.length > 0 ? (completedTasks.length / allTasks.length * 100).toFixed(1) : 0,
        totalRewards: totalRewardsCount,
        mostProductiveDay: getMostProductiveDay(),
        favoriteCategory: getFavoriteCategory()
    };
    
    return insights;
}

function getMostProductiveDay() {
    const dayCompletions = {};
    Object.keys(tasks).forEach(day => {
        dayCompletions[day] = tasks[day].filter(task => task.completed).length;
    });
    
    return Object.keys(dayCompletions).reduce((a, b) => 
        dayCompletions[a] > dayCompletions[b] ? a : b, 'monday'
    );
}

function getFavoriteCategory() {
    const categoryCount = {};
    Object.values(tasks).flat().forEach(task => {
        categoryCount[task.category] = (categoryCount[task.category] || 0) + 1;
    });
    
    return Object.keys(categoryCount).reduce((a, b) => 
        categoryCount[a] > categoryCount[b] ? a : b, 'work'
    );
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    requestNotificationPermission();
    init();
});