// ==========================================
// VINAY KR - PORTFOLIO JAVASCRIPT
// Interactive Features & Animations
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initNavigation();
    initTypewriter();
    initCounterAnimation();
    initProjectFilter();
    initScrollReveal();
    initSmoothScroll();
    initParallaxCards();
    initGanttChart();
});

// ==========================================
// NAVIGATION
// ==========================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// TYPEWRITER EFFECT
// ==========================================
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const roles = [
        'BI Developer',
        'Data Engineer',
        'Business Analyst',
        'Fintech Specialist',
        'SAAS Expert'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// ==========================================
// COUNTER ANIMATION
// ==========================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const animationDuration = 2000;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target, animationDuration);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target, duration) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ==========================================
// PROJECT FILTER
// ==========================================
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Filter projects with animation
            projects.forEach(project => {
                const category = project.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    project.style.display = 'block';
                    project.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    project.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Add CSS animation keyframes dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;
document.head.appendChild(styleSheet);

// ==========================================
// SCROLL REVEAL
// ==========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.section-header, .highlight-card, .skill-category, .timeline-item, .project-card, .education-card, .contact-card');

    revealElements.forEach(el => el.classList.add('reveal'));

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// PARALLAX CARDS
// ==========================================
function initParallaxCards() {
    const cards = document.querySelectorAll('.project-card, .highlight-card, .skill-category');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ==========================================
// FLOATING CODE ANIMATION
// ==========================================
function initCodeAnimation() {
    const codeContent = document.querySelector('.code-content code');
    if (!codeContent) return;

    const lines = codeContent.innerHTML.split('\n');
    codeContent.innerHTML = '';

    lines.forEach((line, index) => {
        const span = document.createElement('span');
        span.innerHTML = line + '\n';
        span.style.opacity = '0';
        span.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
        codeContent.appendChild(span);
    });
}

// Initialize code animation after page load
window.addEventListener('load', initCodeAnimation);

// ==========================================
// SKILL TAG HOVER EFFECT
// ==========================================
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1)';
    });

    tag.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });
});

// ==========================================
// DYNAMIC GRADIENT BACKGROUND
// ==========================================
function initDynamicBackground() {
    const orbs = document.querySelectorAll('.gradient-orb');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const offsetX = (x - 0.5) * speed;
            const offsetY = (y - 0.5) * speed;

            orb.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
}

// Initialize dynamic background on desktop only
if (window.innerWidth > 768) {
    initDynamicBackground();
}

// ==========================================
// LOADER (Optional)
// ==========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Animate hero elements on load
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-roles, .hero-description, .hero-stats, .hero-cta');

    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';

        setTimeout(() => {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
});

// ==========================================
// CONSOLE EASTER EGG
// ==========================================
console.log('%c Welcome to Vinay Kr\'s Portfolio! ',
    'background: linear-gradient(135deg, #6366f1, #a855f7); color: white; font-size: 16px; padding: 10px 20px; border-radius: 8px;');
console.log('%c Built with passion for data and design ✨',
    'color: #a855f7; font-size: 12px;');

// ==========================================
// GANTT CHART
// ==========================================
function initGanttChart() {
    const chart = document.getElementById('gantt-chart');
    if (!chart) return;

    const yearsContainer = chart.querySelector('.gantt-years');
    const barsContainer = chart.querySelector('.gantt-bars');
    const gridLinesContainer = chart.querySelector('.gantt-grid-lines');

    // Enhanced Data with Insights - Corrected from CV (Work & Skills focus)
    const data = [
        {
            name: "finera.",
            role: "Data Engineer | BI Developer",
            start: "2025-04-01",
            end: "2026-12-31", // Present/Future
            type: "work",
            skills: ["Tableau", "Python", "PostgreSQL", "Airbyte", "dbt", "Kestra", "AWS"]
        },
        {
            name: "Viscadia",
            role: "Associate",
            start: "2023-07-01",
            end: "2024-10-31",
            type: "work",
            skills: ["Excel VBA", "Financial Modeling", "Python", "Sales Analytics"]
        },
        {
            name: "Evalueserve",
            role: "Analyst",
            start: "2022-06-01",
            end: "2023-06-30",
            type: "work",
            skills: ["Market Research", "M&A Analysis", "Patent Analytics", "PESTLE"]
        },
        {
            name: "Dr. Reddy's Laboratories",
            role: "GMO Intern",
            start: "2021-08-01",
            end: "2022-01-31",
            type: "work",
            skills: ["Data Analysis", "TPM", "Root Cause Analysis", "Benchmarking"]
        }
    ];

    const minYear = 2021;
    const maxYear = 2026;
    const totalDuration = (maxYear - minYear + 1) * 365 * 24 * 60 * 60 * 1000;
    const startDate = new Date(`${minYear}-01-01`).getTime();

    // Create Tooltip Element
    let tooltip = document.getElementById('gantt-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'gantt-tooltip';
        tooltip.className = 'gantt-tooltip';
        document.body.appendChild(tooltip);
    }

    // Render Years & Grid Lines
    yearsContainer.innerHTML = '';
    gridLinesContainer.innerHTML = '';

    for (let year = minYear; year <= maxYear; year++) {
        const yearDate = new Date(`${year}-01-01`).getTime();
        const left = ((yearDate - startDate) / totalDuration) * 100;

        // Year Marker
        const marker = document.createElement('div');
        marker.className = 'year-marker';
        marker.style.left = `${left}%`;
        marker.textContent = year;
        marker.style.position = 'absolute';
        yearsContainer.appendChild(marker);

        // Grid Line
        const line = document.createElement('div');
        line.className = 'grid-line';
        line.style.left = `${left}%`;
        gridLinesContainer.appendChild(line);
    }

    // Render Today Line
    const today = new Date().getTime();
    if (today >= startDate && today <= new Date(`${maxYear}-12-31`).getTime()) {
        const todayLeft = ((today - startDate) / totalDuration) * 100;
        const todayLine = document.createElement('div');
        todayLine.className = 'today-line';
        todayLine.style.left = `${todayLeft}%`;
        todayLine.title = "Today";
        gridLinesContainer.appendChild(todayLine);
    }

    // Render Bars
    barsContainer.innerHTML = '';
    data.forEach(item => {
        const itemStart = new Date(item.start).getTime();
        const itemEnd = item.end.includes("Present") || item.end.includes("Future")
            ? new Date().getTime() + (item.end.includes("Future") ? 31536000000 : 0) // Arbitrary future for visualization
            : new Date(item.end).getTime();

        let visualStart = itemStart;
        let visualEnd = itemEnd;

        // Cap visual end to maxYear for rendering safety
        const mapMax = new Date(`${maxYear}-12-31`).getTime();
        if (visualEnd > mapMax) visualEnd = mapMax;

        const left = Math.max(0, ((visualStart - startDate) / totalDuration) * 100);
        const width = ((visualEnd - visualStart) / totalDuration) * 100;

        const bar = document.createElement('div');
        bar.className = `gantt-bar ${item.type}`;
        bar.style.left = `${left}%`;
        bar.style.width = `${width}%`;

        // HTML Content
        bar.innerHTML = `
            <div class="gantt-bar-label">
                <span>${item.name}</span>
                <small>${item.role}</small>
            </div>
            ${width > 15 ? `<div class="gantt-progress-shine"></div>` : ''} 
        `;

        // Interaction
        bar.addEventListener('mouseenter', (e) => {
            const rect = bar.getBoundingClientRect();

            let skillsHtml = item.skills.map(s => `<span class="tooltip-tag">${s}</span>`).join('');

            tooltip.innerHTML = `
                <div class="tooltip-header">
                    <div class="tooltip-title">${item.name}</div>
                    <div class="tooltip-role">${item.role}</div>
                    <span class="tooltip-date">${item.start} — ${item.end}</span>
                </div>
                <div class="tooltip-tags">${skillsHtml}</div>
            `;

            tooltip.classList.add('visible');

            // Position
            const tooltipRect = tooltip.getBoundingClientRect();
            let top = rect.top - tooltipRect.height - 10 + window.scrollY;
            let leftPos = rect.left + (rect.width / 2) - (tooltipRect.width / 2);

            // Boundary checks
            if (leftPos < 10) leftPos = 10;
            if (leftPos + tooltipRect.width > window.innerWidth - 10) {
                leftPos = window.innerWidth - tooltipRect.width - 10;
            }

            tooltip.style.top = `${top}px`;
            tooltip.style.left = `${leftPos}px`;
        });

        bar.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
        });

        barsContainer.appendChild(bar);
    });
}

