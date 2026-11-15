document.addEventListener('DOMContentLoaded', () => {
    // --- 1. RESPONSIVE MOBILE HAMBURGER MENU ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- 2. DARK MODE TOGGLE ---
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            let theme = 'light';
            if (document.body.classList.contains('dark-mode')) {
                theme = 'dark';
                themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            }
            localStorage.setItem('theme', theme);
        });
    }

    // --- 3. LIVE ABUJA TIME WIDGET ---
    const liveClock = document.getElementById('liveClock');
    if (liveClock) {
        function updateAbujaTime() {
            const options = { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
            const timeString = new Intl.DateTimeFormat('en-US', options).format(new Date());
            liveClock.innerHTML = `<i class="fas fa-clock"></i> Abuja, Nigeria 🇳🇬: ${timeString}`;
        }
        updateAbujaTime();
        setInterval(updateAbujaTime, 1000);
    }

    // --- 4. PROJECT CATEGORY FILTERING ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- 5. ACADEMIC PLANNER LOGIC ---
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
                
                const safeText = task.text.replace(/'/g, "\\'");

                li.innerHTML = `
                    <span class="task-text" onclick="toggleTask(${task.id})">${task.text}</span>
                    <div class="task-actions">
                        <button class="calendar-btn" onclick="addToGoogleCalendar('${safeText}')" title="Add to Google Calendar">
                            <i class="fas fa-calendar-plus"></i>
                        </button>
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

        window.addToGoogleCalendar = function(taskText) {
            const title = encodeURIComponent(taskText);
            const details = encodeURIComponent("Scheduled task from Jerry Joseph Umoh's Academic Planner (Miva Open University COS 106).");
            const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`;
            window.open(googleCalendarUrl, '_blank');
        };

        addTaskBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });
        renderTasks();
    }

    // --- 6. CONTACT FORM VALIDATION LOGIC ---
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

// --- SCROLL REVEAL ANIMATION OBSERVER ---
    const revealElements = document.querySelectorAll('.about-card, .project-card, .exp-card, .planner-container, .contact-container');
    
    // Add reveal class initially
    revealElements.forEach(el => el.classList.add('reveal-on-scroll'));

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealOnScroll.observe(el));

    // --- BIGBITE GRILL QUICK INQUIRY MODAL ---
    // You can attach this to any button on your projects page
    window.openBigBiteModal = function() {
        let modal = document.getElementById('bigbiteModal');
        if (!modal) {
            const modalDiv = document.createElement('div');
            modalDiv.id = 'bigbiteModal';
            modalDiv.className = 'modal-overlay';
            modalDiv.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal" onclick="closeBigBiteModal()">&times;</span>
                    <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;"><i class="fas fa-fire"></i> BigBite Grill Inquiry</h3>
                    <p style="color: var(--gray); font-size: 0.9rem; margin-bottom: 1.5rem;">Order or request catering from our Abuja outlets (Paulad Sports Centre, Kubwa FO1 / White House, Dutse).</p>
                    <div class="form-group">
                        <label>Your Name / Event</label>
                        <input type="text" id="modalName" placeholder="Enter your name">
                    </div>
                    <div class="form-group">
                        <label>Phone Number (Abuja)</label>
                        <input type="tel" id="modalPhone" placeholder="09034006404">
                    </div>
                    <button class="btn primary-btn" style="width: 100%;" onclick="submitModalInquiry()">Send Quick Inquiry</button>
                    <p id="modalSuccess" style="color: var(--success); font-weight: 600; text-align: center; margin-top: 1rem;"></p>
                </div>
            `;
            document.body.appendChild(modalDiv);
            modal = modalDiv;
        }
        modal.style.display = 'flex';
    };

    window.closeBigBiteModal = function() {
        const modal = document.getElementById('bigbiteModal');
        if (modal) modal.style.display = 'none';
    };

    window.submitModalInquiry = function() {
        const name = document.getElementById('modalName').value.trim();
        const phone = document.getElementById('modalPhone').value.trim();
        const success = document.getElementById('modalSuccess');
        if(name && phone) {
            success.textContent = "Thank you! Inquiry received for BigBite Grill Abuja.";
            setTimeout(() => { closeBigBiteModal(); }, 2000);
        } else {
            alert('Please fill in your name and phone number.');
        }
    };