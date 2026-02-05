document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (Basic implementation, needs CSS support)
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(5,5,5,0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.textAlign = 'center';
            }
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
});
