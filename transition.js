document.addEventListener('DOMContentLoaded', function() {
    // Create transition elements
    const progressLine = document.createElement('div');
    progressLine.className = 'progress-line';
    
    const pageOverlay = document.createElement('div');
    pageOverlay.className = 'page-overlay';
    
    document.body.appendChild(progressLine);
    document.body.appendChild(pageOverlay);

    // Handle all internal navigation
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only handle internal links
            if (href && (href.startsWith('/') || href.startsWith(window.location.origin) || !href.startsWith('http'))) {
                e.preventDefault();
                const targetHref = this.href;

                // Start transition sequence
                const main = document.querySelector('main');
                
                // 1. Show progress line
                progressLine.classList.add('is-active');
                
                // 2. Start content exit animation
                main.classList.add('is-exiting');
                
                // 3. Show overlay
                setTimeout(() => {
                    pageOverlay.classList.add('is-active');
                }, 200);

                // 4. Navigate to new page
                setTimeout(() => {
                    window.location.href = targetHref;
                }, 600);
            }
        });
    });

    // Handle page load and back/forward navigation
    window.addEventListener('pageshow', function(event) {
        const main = document.querySelector('main');
        
        // Reset all transition elements
        progressLine.classList.remove('is-active');
        pageOverlay.classList.remove('is-active');
        main.classList.remove('is-exiting');
        
        // Animate in new content
        main.classList.add('is-entering');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                main.classList.remove('is-entering');
            });
        });
    });
}); 