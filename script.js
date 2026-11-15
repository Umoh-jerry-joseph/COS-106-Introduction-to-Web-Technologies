document.addEventListener('DOMContentLoaded', () => {
    // --- 1. RESPONSIVE MOBILE HAMBURGER MENU ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- 2. ACADEMIC PLANNER LOGIC ---
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const totalCount = document.getElementById('totalCount');
    const completedCount = document.getElementById('completedCount');

    if (taskInput && addTaskBtn && taskList) {
        let tasks = [
            { id: 1, text: 'Submit COS 106 Practical Term Project', completed: true },
            { id: 2, text: 'Review Responsive Web Design Modules', completed: false }
        ];

        function renderTasks() {
            taskList.innerHTML = '';
            if (tasks.length === 0) {
                taskList.innerHTML = '<p style="text-align:center; color: #8d99ae; padding: 1rem;">No tasks added yet. Plan your study session above!</p>';
            }

            let completed = 0;
            tasks.forEach(task => {
                if (task.completed) completed++;
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                li.innerHTML = `
                    <span class="task-text" onclick="toggleTask(${task.id})">${task.text}</span>
                    <div class="task-actions">
                        <button class="complete-btn" onclick="toggleTask(${task.id})" title="Toggle Complete">
                            <i class="fas ${task.completed ? 'fa-check-square' : 'fa-square'}"></i>
                        </button>
                        <button class="delete-btn" onclick="deleteTask(${task.id})" title="Delete Task">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                taskList.appendChild(li);
            });

            if (totalCount) totalCount.textContent = tasks.length;
            if (completedCount) completedCount.textContent = completed;
        }

        function addTask() {
            const text = taskInput.value.trim();
            if (text === '') {
                alert('Please enter a valid task description.');
                return;
            }
            tasks.push({ id: Date.now(), text: text, completed: false });
            taskInput.value = '';
            renderTasks();
        }

        window.toggleTask = function(id) {
            tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
            renderTasks();
        };

        window.deleteTask = function(id) {
            tasks = tasks.filter(task => task.id !== id);
            renderTasks();
        };

        addTaskBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });
        renderTasks();
    }

    // --- 3. CONTACT FORM VALIDATION LOGIC ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');
        
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const phoneError = document.getElementById('phoneError');
        const messageError = document.getElementById('messageError');
        const successMessage = document.getElementById('successMessage');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            nameError.textContent = '';
            emailError.textContent = '';
            phoneError.textContent = '';
            messageError.textContent = '';
            successMessage.textContent = '';

            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Full name is required.';
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Email address is required.';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email format.';
                isValid = false;
            }

            const phoneRegex = /^\d+$/;
            if (phoneInput.value.trim() === '') {
                phoneError.textContent = 'Phone number is required.';
                isValid = false;
            } else if (!phoneRegex.test(phoneInput.value.trim())) {
                phoneError.textContent = 'Phone number must contain digits only.';
                isValid = false;
            }

            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Message cannot be empty.';
                isValid = false;
            }

            if (isValid) {
                successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                contactForm.reset();
            }
        });
    }
});