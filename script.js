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
        const addRewardBtn = document.getElementById('addRewardBtn');
        const rewardModal = document.getElementById('rewardModal');
        const closeRewardModalBtn = document.getElementById('closeRewardModalBtn');
        const cancelRewardBtn = document.getElementById('cancelRewardBtn');
        const rewardForm = document.getElementById('rewardForm');
        const rewardNotification = document.getElementById('rewardNotification');
        const closeRewardNotificationBtn = document.getElementById('closeRewardNotificationBtn');
        const rewardNotificationMessage = document.getElementById('rewardNotificationMessage');
        const earnedRewardsList = document.getElementById('earnedRewardsList');
        const availableRewardsList = document.getElementById('availableRewardsList');

        // Form elements
        const taskIdInput = document.getElementById('taskId');
        const taskTitleInput = document.getElementById('taskTitle');
        const taskDescriptionInput = document.getElementById('taskDescription');
        const taskTimeInput = document.getElementById('taskTime');
        const taskCategoryInput = document.getElementById('taskCategory');
        const taskRewardInput = document.getElementById('taskReward');
        const taskImageInput = document.getElementById('taskImage');
        const uploadImageBtn = document.getElementById('uploadImageBtn');
        const imagePreviewText = document.getElementById('imagePreviewText');
        const imagePreviewContainer = document.getElementById('imagePreviewContainer');
        const imagePreview = document.getElementById('imagePreview');

        // Reward form elements
        const rewardTitleInput = document.getElementById('rewardTitle');
        const rewardDescriptionInput = document.getElementById('rewardDescription');
        const rewardIconInput = document.getElementById('rewardIcon');

        // Profile elements
        const changePhotoBtn = document.getElementById('changePhotoBtn');
        const photoInput = document.getElementById('photoInput');
        const profileImage = document.getElementById('profileImage');
        const nameInput = document.getElementById('nameInput');
        const userName = document.getElementById('userName');
        const saveProfileBtn = document.getElementById('saveProfileBtn');

        // State
        let currentDay = 'friday';
        let tasks = JSON.parse(localStorage.getItem('futuraTasks')) || {};
        let rewards = JSON.parse(localStorage.getItem('futuraRewards')) || [];
        let earnedRewards = JSON.parse(localStorage.getItem('futuraEarnedRewards')) || [];
        let userProfile = JSON.parse(localStorage.getItem('futuraProfile')) || {
            name: 'Usuário',
            photo: 'https://via.placeholder.com/120'
        };
        let trophies = JSON.parse(localStorage.getItem('futuraTrophies')) || {};

        // Category configuration
        const categoryConfig = {
            work: { icon: '💼', name: 'Trabalho', color: 'blue' },
            personal: { icon: '🏠', name: 'Pessoal', color: 'green' },
            health: { icon: '🏃', name: 'Saúde', color: 'yellow' },
            study: { icon: '📚', name: 'Estudos', color: 'purple' },
            other: { icon: '🔧', name: 'Outros', color: 'gray' }
        };

        // Initialize app
        function init() {
            loadProfile();
            updateDayButtons();
            loadTasks(currentDay);
            loadRewards();
            updateProgress();
            updateTrophyDisplay();
            updateStats();
            setupEventListeners();
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
            
            // Sort tasks by time
            const sortedTasks = [...tasks[day]].sort((a, b) => {
                if (!a.time && !b.time) return 0;
                if (!a.time) return 1;
                if (!b.time) return -1;
                return a.time.localeCompare(b.time);
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
            
            taskElement.className = `card p-4 relative transition-all duration-300 hover:scale-[1.02] category-${task.category} ${task.completed ? 'task-completed' : ''}`;
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
                            ${task.time ? `<span class="time-badge">${formatTime(task.time)}</span>` : ''}
                        </div>
                        ${task.description ? `
                            <p class="text-gray-400 mb-3 ${task.completed ? 'line-through opacity-60' : ''}">${task.description}</p>
                        ` : ''}
                        ${task.reward ? `
                            <div class="reward-badge bg-yellow-500 bg-opacity-20 text-yellow-400 px-3 py-1 rounded-full text-sm mb-3 inline-block">
                                <i class="fas fa-gift mr-1"></i> ${task.reward}
                            </div>
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

        // Reward management
        function loadRewards() {
            // Load earned rewards
            earnedRewardsList.innerHTML = '';
            if (earnedRewards.length === 0) {
                earnedRewardsList.innerHTML = '<p class="text-gray-400 text-center py-4">Nenhum prêmio conquistado ainda</p>';
            } else {
                earnedRewards.forEach((reward, index) => {
                    const rewardElement = createEarnedRewardElement(reward, index);
                    earnedRewardsList.appendChild(rewardElement);
                });
            }

            // Load available rewards
            availableRewardsList.innerHTML = '';
            if (rewards.length === 0) {
                availableRewardsList.innerHTML = '<p class="text-gray-400 text-center py-4">Nenhum prêmio cadastrado</p>';
            } else {
                rewards.forEach((reward, index) => {
                    const rewardElement = createAvailableRewardElement(reward, index);
                    availableRewardsList.appendChild(rewardElement);
                });
            }

            updateRewardStats();
        }

        function createEarnedRewardElement(reward, index) {
            const rewardElement = document.createElement('div');
            rewardElement.className = 'reward-item earned-reward';
            rewardElement.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <span class="text-2xl mr-3">${reward.icon}</span>
                        <div>
                            <h4 class="font-semibold">${reward.title}</h4>
                            ${reward.description ? `<p class="text-sm text-gray-400">${reward.description}</p>` : ''}
                            <p class="text-xs text-green-400 mt-1">Conquistado em ${new Date(reward.earnedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <button class="use-reward-btn p-2 rounded-full hover:bg-green-600 bg-green-500 text-white" data-index="${index}">
                        <i class="fas fa-check"></i>
                    </button>
                </div>
            `;
            return rewardElement;
        }

        function createAvailableRewardElement(reward, index) {
            const rewardElement = document.createElement('div');
            rewardElement.className = 'reward-item';
            rewardElement.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <span class="text-2xl mr-3">${reward.icon}</span>
                        <div>
                            <h4 class="font-semibold">${reward.title}</h4>
                            ${reward.description ? `<p class="text-sm text-gray-400">${reward.description}</p>` : ''}
                        </div>
                    </div>
                    <button class="delete-reward-btn p-2 rounded-full hover:bg-red-600 text-red-400" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            return rewardElement;
        }

        function updateRewardStats() {
            document.getElementById('totalEarnedRewards').textContent = earnedRewards.length;
            document.getElementById('totalCompletedTasks').textContent = 
                Object.values(tasks).flat().filter(task => task.completed).length;
        }

        function awardReward(rewardText) {
            const reward = {
                title: rewardText,
                icon: '🎁',
                earnedAt: new Date().toISOString()
            };
            
            earnedRewards.push(reward);
            localStorage.setItem('futuraEarnedRewards', JSON.stringify(earnedRewards));
            
            showRewardNotification(`Parabéns! Você conquistou: ${rewardText}`);
            loadRewards();
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
            // Stats are updated in updateRewardStats and updateProgress
        }

        // Modal management
        function showTaskModal(task = null) {
            if (task) {
                taskIdInput.value = task.index;
                taskTitleInput.value = task.title;
                taskDescriptionInput.value = task.description || '';
                taskTimeInput.value = task.time || '';
                taskCategoryInput.value = task.category || 'work';
                taskRewardInput.value = task.reward || '';
                
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

        function showRewardModal() {
            rewardForm.reset();
            rewardModal.classList.remove('hidden');
            rewardTitleInput.focus();
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
            localStorage.setItem('futuraTasks', JSON.stringify(tasks));
        }

        function saveRewards() {
            localStorage.setItem('futuraRewards', JSON.stringify(rewards));
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

            addRewardBtn.addEventListener('click', () => showRewardModal());
            closeRewardModalBtn.addEventListener('click', () => rewardModal.classList.add('hidden'));
            cancelRewardBtn.addEventListener('click', () => rewardModal.classList.add('hidden'));

            closeRewardNotificationBtn.addEventListener('click', hideRewardNotification);

            // Task form
            taskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const taskData = {
                    title: taskTitleInput.value.trim(),
                    description: taskDescriptionInput.value.trim(),
                    time: taskTimeInput.value,
                    category: taskCategoryInput.value,
                    reward: taskRewardInput.value.trim(),
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

            // Reward form
            rewardForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const rewardData = {
                    title: rewardTitleInput.value.trim(),
                    description: rewardDescriptionInput.value.trim(),
                    icon: rewardIconInput.value,
                    createdAt: new Date().toISOString()
                };
                
                rewards.push(rewardData);
                saveRewards();
                loadRewards();
                rewardModal.classList.add('hidden');
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
                    
                    // Award reward if task completed and has a custom reward
                    if (!wasCompleted && tasks[currentDay][index].completed && tasks[currentDay][index].reward) {
                        awardReward(tasks[currentDay][index].reward);
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
            earnedRewardsList.addEventListener('click', (e) => {
                if (e.target.closest('.use-reward-btn')) {
                    const index = parseInt(e.target.closest('.use-reward-btn').dataset.index);
                    if (confirm('Marcar este prêmio como usado?')) {
                        earnedRewards.splice(index, 1);
                        localStorage.setItem('futuraEarnedRewards', JSON.stringify(earnedRewards));
                        loadRewards();
                    }
                }
            });

            availableRewardsList.addEventListener('click', (e) => {
                if (e.target.closest('.delete-reward-btn')) {
                    const index = parseInt(e.target.closest('.delete-reward-btn').dataset.index);
                    if (confirm('Tem certeza que deseja excluir este prêmio?')) {
                        rewards.splice(index, 1);
                        saveRewards();
                        loadRewards();
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

            rewardModal.addEventListener('click', (e) => {
                if (e.target === rewardModal) {
                    rewardModal.classList.add('hidden');
                }
            });
        }

        // Initialize the app
        init();