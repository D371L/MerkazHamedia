document.addEventListener('DOMContentLoaded', () => {
    // Page Entrance Animation
    setTimeout(() => {
        document.body.classList.remove('fade-out');
    }, 50); // Small delay to ensure transition triggers

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    // Navbar Scroll Effect Removed per user request

    // Mobile Menu Toggle (Basic implementation, needs CSS support)
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');

                // Optional: Animate toggle icon
                if (navLinks.classList.contains('active')) {
                    mobileToggle.innerText = '✕'; // Close icon
                } else {
                    mobileToggle.innerText = '☰'; // Menu icon
                }
            });
        });
    }

    // Services Filter Logic
    const serviceSearch = document.getElementById('serviceSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    if (serviceSearch && serviceCards.length > 0) {

        // Filter by Category
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active to current
                btn.classList.add('active');

                const category = btn.getAttribute('data-filter');
                filterServices(category, serviceSearch.value);
            });
        });

        // Filter by Search
        serviceSearch.addEventListener('input', (e) => {
            const searchText = e.target.value.toLowerCase();
            const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            filterServices(activeCategory, searchText);
        });

        function filterServices(category, searchText) {
            serviceCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                const cardTitle = card.querySelector('h3').innerText.toLowerCase();
                const cardDesc = card.querySelector('p').innerText.toLowerCase();

                const matchesCategory = category === 'all' || cardCategory === category;
                const matchesSearch = cardTitle.includes(searchText) || cardDesc.includes(searchText);

                if (matchesCategory && matchesSearch) {
                    card.style.display = 'block';
                    // Optional: Add animation for appearance
                } else {
                    card.style.display = 'none';
                }
            });
        }

    }

    // Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    document.querySelectorAll('.service-card, .glass-panel, .page-header, .hero-content, section h2, .contact-form-wrapper').forEach(el => {
        el.classList.add('hidden-fade'); // Add base hidden class
        observer.observe(el);
    });

    // Page Transition Logic
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            // Only internal links that are not hash links
            if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = href;
                }, 500); // Match CSS transition duration
            }
        });
    });
});
