document.addEventListener("DOMContentLoaded", () => {
    const socialLinksData = [
        {
            id: 'instagram',
            name: 'Instagram',
            url: 'https://instagram.com/yourusername',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.5" y1="6.5" y2="6.5"/></svg>',
            colorClass: 'bg-instagram',
            hoverColorClass: 'hover:bg-instagram-hover'
        },
        {
            id: 'twitter',
            name: 'Twitter / X',
            url: 'https://twitter.com/yourusername',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-18 11.6 2.2.1 4.4-.6 6-2 3.2-3.5 1.3-11.4 6-13.8 2.2-1.2 4.6-1.3 6.4-1 2-.2 3.5-.1 4 0z"/></svg>',
            colorClass: 'bg-twitter',
            hoverColorClass: 'hover:bg-twitter-hover'
        },
        {
            id: 'youtube',
            name: 'YouTube',
            url: 'https://youtube.com/@yourusername',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-youtube"><path d="M2.5 17.5V9.7L12 3l9.5 6.7v7.8L12 21.5 2.5 17.5z"/><path d="M12 3v18"/><path d="M2.5 9.7l9.5 6.7 9.5-6.7"/></svg>',
            colorClass: 'bg-youtube',
            hoverColorClass: 'hover:bg-youtube-hover'
        },
        {
            id: 'linkedin',
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/yourusername',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
            colorClass: 'bg-linkedin',
            hoverColorClass: 'hover:bg-linkedin-hover'
        },
        {
            id: 'github',
            name: 'GitHub',
            url: 'https://github.com/yourusername',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.44-.78-3.5.25-1.15.18-2.92-.4-4.3C19 4.2 17.5 4 16 4A3.8 3.8 0 0 0 12 5c-1.7 0-3.5 1.4-4 3.5-1.4.1-2.9.5-3.6 1.3-.6 1.5-.5 3.3-.4 4.3-.5.9-1 2.1-1 3.5 0 3.5 3 5.5 6 5.5-.3.5-1 1.2-1 1.7v4"/><path d="M9 18c-3 0-4.5-2-4.5-2"/></svg>',
            colorClass: 'bg-github',
            hoverColorClass: 'hover:bg-github-hover'
        },
        {
            id: 'website',
            name: 'Personal Website',
            url: 'https://yourwebsite.com',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
            colorClass: 'bg-website',
            hoverColorClass: 'hover:bg-website-hover'
        },
        {
            id: 'tiktok',
            name: 'TikTok',
            url: 'https://tiktok.com/@yourusername',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-music"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
            colorClass: 'bg-tiktok',
            hoverColorClass: 'hover:bg-tiktok-hover'
        },
        {
            id: 'telegram',
            name: 'Telegram',
            url: 'https://t.me/yourusername',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="m15 15 6.5-6.5"/></svg>',
            colorClass: 'bg-telegram',
            hoverColorClass: 'hover:bg-telegram-hover'
        },
        {
            id: 'whatsapp',
            name: 'WhatsApp',
            url: 'https://wa.me/1234567890',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>',
            colorClass: 'bg-whatsapp',
            hoverColorClass: 'hover:bg-whatsapp-hover'
        },
        {
            id: 'email',
            name: 'Email Me',
            url: 'mailto:your.email@example.com',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.93 1.93 0 0 1-2.06 0L2 7"/></svg>',
            colorClass: 'bg-email',
            hoverColorClass: 'hover:bg-email-hover'
        }
    ];

    const socialLinksContainer = document.getElementById('social-links-container');

    socialLinksData.forEach((link, index) => {
        const anchor = document.createElement('a');
        anchor.href = link.url;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        anchor.className = `
            block w-full p-4 rounded-2xl text-white font-semibold text-center
            bg-gradient-to-r ${link.colorClass} ${link.hoverColorClass}
            transform transition-all duration-300 ease-out
            hover:scale-105 hover:shadow-2xl hover:-translate-y-1
            animate-slide-up
            border border-white/10 backdrop-blur-sm
        `;
        anchor.style.animationDelay = `${index * 100 + 600}ms`;

        const div = document.createElement('div');
        div.className = "flex items-center justify-center space-x-3";

        const iconSpan = document.createElement('span');
        iconSpan.innerHTML = link.icon;
        iconSpan.className = "transition-transform duration-300";

        const nameSpan = document.createElement('span');
        nameSpan.className = "text-lg";
        nameSpan.textContent = link.name;

        div.appendChild(iconSpan);
        div.appendChild(nameSpan);
        anchor.appendChild(div);
        socialLinksContainer.appendChild(anchor);

        // Add hover effects using JavaScript
        anchor.addEventListener('mouseenter', () => {
            iconSpan.classList.add('scale-110', 'icon-rotate-12');
        });
        anchor.addEventListener('mouseleave', () => {
            iconSpan.classList.remove('scale-110', 'icon-rotate-12');
        });
    });
});


