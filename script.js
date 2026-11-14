document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ACADEMIC PLANNER LOGIC (Arrays, DOM Manipulation, Event Handling) ---
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const totalCount = document.getElementById('totalCount');
    const completedCount = document.getElementById('completedCount');

    // Initialize tasks array
    let tasks = [
        { id: 1, text: 'Submit COS 106 Lab Assessment', completed: true },
        { id: 2, text: 'Review CSS Grid & Flexbox Modules', completed: false }
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
                    <button class="complete-btn" onclick="toggleTask(${task.id})" title="Mark Complete">
                        <i class="fas ${task.completed ? 'fa-check-square' : 'fa-square'}"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteTask(${task.id})" title="Delete Task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            taskList.appendChild(li);
        });

        totalCount.textContent = tasks.length;
        completedCount.textContent = completed;
    }

    // Add Task Function
    function addTask() {
        const text = taskInput.value.trim();
        if (text === '') {
            alert('Please enter a valid task description.');
            return;
        }

        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };

        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
    }

    // Toggle Task Complete (Global scope for inline onclick handlers)
    window.toggleTask = function(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        renderTasks();
    };

    // Delete Task
    window.deleteTask = function(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    };

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Initial render
    renderTasks();


    // --- 2. CONTACT FORM VALIDATION LOGIC ---
    const contactForm = document.getElementById('contactForm');
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

        // Reset errors & success messages
        nameError.textContent = '';
        emailError.textContent = '';
        phoneError.textContent = '';
        messageError.textContent = '';
        successMessage.textContent = '';

        // 1. Validate Name (Not empty)
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Full name is required.';
            isValid = false;
        }

        // 2. Validate Email (Valid format)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email address is required.';
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email format.';
            isValid = false;
        }

        // 3. Validate Phone (Contains only digits)
        const phoneRegex = /^\d+$/;
        if (phoneInput.value.trim() === '') {
            phoneError.textContent = 'Phone number is required.';
            isValid = false;
        } else if (!phoneRegex.test(phoneInput.value.trim())) {
            phoneError.textContent = 'Phone number must contain numbers only (no spaces or hyphens).';
            isValid = false;
        }

        // 4. Validate Message (Not empty)
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message cannot be empty.';
            isValid = false;
        }

        // If all checks pass
        if (isValid) {
            successMessage.textContent = 'Thank you! Your message has been sent successfully.';
            contactForm.reset();
        }
    });
});