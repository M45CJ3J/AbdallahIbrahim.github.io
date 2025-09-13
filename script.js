// ===== MODERN JAVASCRIPT FOR PORTFOLIO =====

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeTheme();
        this.loadProjects();
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        this.setupAnimations();
    }

    // ===== THEME MANAGEMENT =====
    initializeTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(newTheme);
        });
    }

    updateThemeIcon(theme) {
        const themeIcon = document.querySelector('#theme-toggle i');
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // ===== MOBILE MENU =====
    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ===== SMOOTH SCROLLING =====
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== PROJECT FILTERING =====
    loadProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        // Load projects from json.js
        if (typeof myArr !== 'undefined') {
            this.renderProjects(myArr);
        }

        // Setup filter functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
            });
        });
    }

    renderProjects(projects) {
        const projectsGrid = document.getElementById('projects-grid');
        
        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card animate-fade-in-up" data-type="${project.type}">
                <img src="${project.img}" alt="${project.name}" class="project-image" loading="lazy">
                <div class="project-content">
                    <h3 class="project-title">${project.name}</h3>
                    <p class="project-description">${project.discription}</p>
                    <div class="project-links">
                        ${project.githuburl ? `<a href="${project.githuburl}" target="_blank" rel="noopener noreferrer" class="project-link">
                            <i class="fab fa-github"></i>
                            GitHub
                        </a>` : ''}
                        ${project.productionurl ? `<a href="${project.productionurl}" target="_blank" rel="noopener noreferrer" class="project-link">
                            <i class="fas fa-external-link-alt"></i>
                            Live Demo
                        </a>` : ''}
                        <button onclick="portfolioApp.showProjectDetails(${project.id})" class="project-link secondary">
                            <i class="fas fa-info-circle"></i>
                            Details
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    filterProjects(filter) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const projectType = card.getAttribute('data-type');
            
            if (filter === 'all' || projectType === filter) {
                card.style.display = 'block';
                card.classList.add('animate-fade-in-up');
            } else {
                card.style.display = 'none';
                card.classList.remove('animate-fade-in-up');
            }
        });
    }

    showProjectDetails(projectId) {
        const project = myArr[projectId - 1];
        if (!project) return;

        // Store project data in sessionStorage
        sessionStorage.setItem('projectData', JSON.stringify({
            name: project.name,
            description: project.discription,
            githubUrl: project.githuburl,
            productionUrl: project.productionurl,
            video: project.vedio,
            image: project.img,
            type: project.type
        }));

        // Open details page
        window.open('./details.html', '_blank');
    }

    // ===== ANIMATIONS =====
    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.service-card, .project-card, .contact-card');
        animateElements.forEach(el => observer.observe(el));
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Navbar scroll effect
        window.addEventListener('scroll', this.handleNavbarScroll.bind(this));
        
        // Resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
    }

    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    handleResize() {
        // Close mobile menu on resize
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }

    handleKeyboardNavigation(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
}

// ===== UTILITY FUNCTIONS =====
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy loading for images
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Portfolio App Error:', e.error);
});

// ===== INITIALIZE APP =====
let portfolioApp;

document.addEventListener('DOMContentLoaded', () => {
    portfolioApp = new PortfolioApp();
});

// ===== LEGACY SUPPORT =====
// Keep old functions for backward compatibility
function filterSelection(c) {
    if (portfolioApp) {
        portfolioApp.filterProjects(c === 'all' ? 'all' : c);
    }
}

function save(projectId) {
    if (portfolioApp) {
        portfolioApp.showProjectDetails(projectId);
    }
}

// ===== EXPORT FOR GLOBAL ACCESS =====
window.portfolioApp = portfolioApp;
