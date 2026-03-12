document.addEventListener('DOMContentLoaded', function () {
    
    // --- LÓGICA DO TEMA (DARK/LIGHT) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    const updateThemeIcons = () => {
        if (document.documentElement.classList.contains('dark')) {
            darkIcon.classList.add('hidden');
            lightIcon.classList.remove('hidden');
        } else {
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        }
    };
    updateThemeIcons(); // Executa na inicialização

    themeToggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        updateThemeIcons();
    });

    // --- LÓGICA PARA CARD DO PROJETO COLAPSÁVEL ---
    const projectCard = document.querySelector('.project-card');
    if (projectCard) {
        projectCard.addEventListener('click', (e) => {
            // Ignora o clique se for em um link ou botão dentro do card
            if (e.target.closest('a, button.toggle-dossier-btn')) {
                // A lógica do botão será tratada separadamente se necessário,
                // mas podemos unificar para o card todo.
            }
            const collapsibleContent = projectCard.querySelector('.collapsible-content');
            const button = projectCard.querySelector('.toggle-dossier-btn');
            
            collapsibleContent.classList.toggle('open');

            if (collapsibleContent.classList.contains('open')) {
                button.innerHTML = 'Ocultar Dossiê ▲';
            } else {
                button.innerHTML = 'Explorar Dossiê Técnico ▼';
            }
        });
    }

    // --- LÓGICA PARA SEÇÕES DO MANUAL COLAPSÁVEIS ---
    document.querySelectorAll('.manual-section-title').forEach(title => {
        title.addEventListener('click', () => {
            const contentWrapper = title.nextElementSibling;
            if (contentWrapper && contentWrapper.classList.contains('manual-content-wrapper')) {
                contentWrapper.classList.toggle('open');
                title.classList.toggle('open');
            }
        });
    });
    
    // --- GERAÇÃO DINÂMICA DE MENUS E NAVEGAÇÃO ---
    const sections = document.querySelectorAll('.manual-section');
    const sidebarNav = document.getElementById('sidebar-nav');
    const mobileMenu = document.getElementById('mobile-menu-items');
    
    sections.forEach((section, index) => {
        const id = section.id;
        const title = section.querySelector('h2').dataset.title;
        const step = index + 1;

        const createLinkHandler = (linkElement) => {
            linkElement.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Abre a seção clicada
                const targetSection = document.getElementById(id);
                const targetTitle = targetSection.querySelector('.manual-section-title');
                const targetContent = targetSection.querySelector('.manual-content-wrapper');

                if (targetContent && !targetContent.classList.contains('open')) {
                    targetContent.classList.add('open');
                    targetTitle.classList.add('open');
                }
                
                // Rola suavemente para a seção
                const headerOffset = 80;
                const elementPosition = section.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            });
        };

        // Cria link para o menu da sidebar
        if (sidebarNav) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${id}`;
            a.textContent = `${step}. ${title}`;
            a.className = 'sidebar-link block border-l-2 border-transparent pl-4 py-1 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors';
            li.appendChild(a);
            sidebarNav.appendChild(li);
            createLinkHandler(a);
        }

        // Cria link para o menu móvel
        if (mobileMenu) {
            // ... (código do menu móvel pode ser adicionado aqui se necessário)
        }
    });

    // --- LÓGICA DO BOTÃO DE COPIAR CÓDIGO ---
    document.querySelectorAll('.code-container pre').forEach(pre => {
        const btn = document.createElement('button');
        btn.textContent = 'Copiar';
        btn.className = 'copy-btn'; // Use uma classe para estilizar no CSS
        pre.parentNode.insertBefore(btn, pre);
        
        btn.addEventListener('click', () => {
            navigator.clipboard.writeText(pre.querySelector('code').innerText).then(() => {
                btn.textContent = 'Copiado!';
                setTimeout(() => { btn.textContent = 'Copiar'; }, 2000);
            });
        });
    });

    // --- LÓGICA DO OBSERVER PARA ATIVAR LINK NO SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const sidebarLink = document.querySelector(`.sidebar-link[href="#${id}"]`);
            if (entry.isIntersecting) {
                document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
                if (sidebarLink) sidebarLink.classList.add('active');
            }
        });
    }, { rootMargin: "-20% 0px -80% 0px" });

    sections.forEach(section => observer.observe(section));
});