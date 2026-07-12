/* ==========================================================================
   よちよち起業部 - Interactive Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Navigation Header Scroll Effect
    // ----------------------------------------------------------------------
    const header = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load

    // ----------------------------------------------------------------------
    // 2. Mobile Responsive Menu
    // ----------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu.querySelectorAll('a, .btn');
    
    const toggleMenu = () => {
        const isOpened = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', !isOpened);
        navMenu.classList.toggle('active');
        document.body.classList.toggle('mobile-nav-active');
    };

    const closeMenu = () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        document.body.classList.remove('mobile-nav-active');
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInside = navMenu.contains(event.target) || mobileToggle.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // ----------------------------------------------------------------------
    // 3. Scroll Reveal Animation (Intersection Observer)
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.fade-in-on-scroll');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    };
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(element => {
        observer.observe(element);
    });

    // ----------------------------------------------------------------------
    // 4. Form Submission Simulation & Interactivity
    // ----------------------------------------------------------------------
    const inquiryForm = document.getElementById('inquiry-form');
    const successMessage = document.getElementById('form-success-message');
    const submitBtn = document.getElementById('form-submit-btn');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            // Validate basic inputs
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            
            if (!name || !email) {
                alert('お名前とメールアドレスは必須項目です。');
                return;
            }
            
            // UI state change to 'sending...'
            submitBtn.disabled = true;
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>送信中...</span>';
            
            // Simulate API request delay
            setTimeout(() => {
                // Fade out form
                inquiryForm.style.transition = 'opacity 0.4s ease';
                inquiryForm.style.opacity = '0';
                
                setTimeout(() => {
                    inquiryForm.style.display = 'none';
                    
                    // Reveal success message
                    successMessage.style.display = 'block';
                    successMessage.style.opacity = '0';
                    successMessage.style.transition = 'opacity 0.5s ease';
                    
                    // Trigger reflow
                    successMessage.offsetHeight;
                    successMessage.style.opacity = '1';
                }, 400);
            }, 1200);
        });
    }

    // ----------------------------------------------------------------------
    // 5. Dynamic Ambient Glow Animation based on Mouse Move (Desktop only)
    // ----------------------------------------------------------------------
    const glow1 = document.querySelector('.glow-1');
    const glow2 = document.querySelector('.glow-2');
    
    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Subtle offset calculations
            const moveX1 = (mouseX - window.innerWidth / 2) * 0.05;
            const moveY1 = (mouseY - window.innerHeight / 2) * 0.05;
            const moveX2 = (mouseX - window.innerWidth / 2) * -0.03;
            const moveY2 = (mouseY - window.innerHeight / 2) * -0.03;
            
            glow1.style.transform = `translate(${moveX1}px, ${moveY1}px)`;
            glow2.style.transform = `translate(${moveX2}px, ${moveY2}px)`;
        });
    }

    // ----------------------------------------------------------------------
    // 6. Column Page Toggle Logic & Deep Linking
    // ----------------------------------------------------------------------
    const columnListView = document.getElementById('column-list-view');
    const columnDetailView = document.getElementById('column-detail-view');
    const backBtn = document.getElementById('btn-back-to-list');
    const articles = document.querySelectorAll('.article-content');
    const cards = document.querySelectorAll('.column-card');

    if (columnListView && columnDetailView) {
        // Function to show specific article by ID
        const showArticle = (id) => {
            // Hide list view with fade out
            columnListView.style.transition = 'opacity 0.3s ease';
            columnListView.style.opacity = '0';
            
            setTimeout(() => {
                columnListView.style.display = 'none';
                
                // Hide all articles first
                articles.forEach(art => art.style.display = 'none');
                
                // Show requested article
                const activeArticle = document.getElementById(`article-${id}`);
                if (activeArticle) {
                    activeArticle.style.display = 'block';
                    columnDetailView.style.display = 'block';
                    columnDetailView.style.opacity = '0';
                    columnDetailView.style.transition = 'opacity 0.4s ease';
                    
                    // Trigger reflow
                    columnDetailView.offsetHeight;
                    columnDetailView.style.opacity = '1';
                    
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 300);
        };

        // Function to show list view
        const showList = () => {
            // Hide detail view with fade out
            columnDetailView.style.transition = 'opacity 0.3s ease';
            columnDetailView.style.opacity = '0';
            
            setTimeout(() => {
                columnDetailView.style.display = 'none';
                
                // Show list view
                columnListView.style.display = 'block';
                columnListView.style.opacity = '0';
                columnListView.style.transition = 'opacity 0.4s ease';
                
                // Trigger reflow
                columnListView.offsetHeight;
                columnListView.style.opacity = '1';
                
                // Remove parameter from URL
                history.pushState('', document.title, window.location.pathname);
            }, 300);
        };

        // Attach click handlers to cards
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                showArticle(id);
                // Update URL parameter
                history.pushState('', document.title, `?id=${id}`);
            });
        });

        // Back button click handler
        if (backBtn) {
            backBtn.addEventListener('click', showList);
        }

        // Deep linking check based on URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');
        if (articleId && /^\d+$/.test(articleId)) {
            const activeArticle = document.getElementById(`article-${articleId}`);
            if (activeArticle) {
                // Instantly show the article on page load (skip animation delay)
                columnListView.style.display = 'none';
                columnDetailView.style.display = 'block';
                columnDetailView.style.opacity = '1';
                activeArticle.style.display = 'block';
            }
        }
    }
});
