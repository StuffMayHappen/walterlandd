document.addEventListener('DOMContentLoaded', () => {
    
    const root = document.documentElement;
    
    // =========================================================
    // [1] SISTEMA DE MEMÓRIA (CORES E MODO DE RENDERIZAÇÃO)
    // =========================================================
    const metalColors = ['#852bd9', '#3b5998', '#4b5320', '#556b2f', '#4a4a4a', '#8b0000', '#d92b2b'];
    let colorInterval;
    let colorIndex = 1; 

    const setAccentColor = (color) => {
        root.style.setProperty('--accent-color', color);
    };

    const startDynamicMode = () => {
        clearInterval(colorInterval); 
        colorIndex = 1; 
        colorInterval = setInterval(() => {
            const nextColor = metalColors[colorIndex % metalColors.length];
            setAccentColor(nextColor);
            colorIndex++;
        }, 10000);
    };

    const stopDynamicMode = () => {
        clearInterval(colorInterval);
    };

    const savedColor = localStorage.getItem('userAccentColor') || '#852bd9';
    const isDynamic = localStorage.getItem('dynamicMode') === 'true';
    const savedTheme = localStorage.getItem('themeChoice') || 'dark';
    const savedRenderMode = localStorage.getItem('modeChoice') || 'dynamic';

    if (savedTheme === 'light') document.body.classList.add('light-theme');
    if (savedRenderMode === 'static') document.body.classList.add('static-mode');

    if (isDynamic) {
        startDynamicMode();
        setAccentColor(metalColors[0]); 
    } else {
        setAccentColor(savedColor);
    }

    // =========================================================
    // [2] LÓGICA EXCLUSIVA DA PÁGINA DE DEFINIÇÕES
    // =========================================================
    const dynamicToggle = document.getElementById('dynamic-mode-toggle');
    const accentPicker = document.getElementById('accent-picker');
    const themeSelect = document.getElementById('theme-select');
    const saveBtn = document.getElementById('save-settings-btn');
    const feedbackMsg = document.getElementById('save-feedback');

    if (dynamicToggle && accentPicker && saveBtn) {
        
        dynamicToggle.checked = localStorage.getItem('dynamicMode') === 'true';
        accentPicker.value = localStorage.getItem('userAccentColor') || '#852bd9';
        
        if (themeSelect) {
            themeSelect.value = localStorage.getItem('themeChoice') || 'dark';
        }

        const updatePickerState = () => {
            if (dynamicToggle.checked) {
                accentPicker.style.opacity = '0.3';
                accentPicker.style.pointerEvents = 'none'; 
            } else {
                accentPicker.style.opacity = '1';
                accentPicker.style.pointerEvents = 'auto'; 
            }
        };

        updatePickerState();
        dynamicToggle.addEventListener('change', updatePickerState);

        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            try {
                const wantsDynamic = dynamicToggle.checked;
                const chosenColor = accentPicker.value;

                localStorage.setItem('dynamicMode', wantsDynamic);
                localStorage.setItem('userAccentColor', chosenColor);

                if (wantsDynamic) {
                    if (typeof startDynamicMode === 'function') startDynamicMode();
                    if (typeof setAccentColor === 'function') setAccentColor(metalColors[0]); 
                } else {
                    if (typeof stopDynamicMode === 'function') stopDynamicMode();
                    if (typeof setAccentColor === 'function') setAccentColor(chosenColor);
                }

                if (themeSelect) {
                    const chosenTheme = themeSelect.value;
                    localStorage.setItem('themeChoice', chosenTheme);
                    
                    if (chosenTheme === 'light') {
                        document.body.classList.add('light-theme');
                    } else {
                        document.body.classList.remove('light-theme');
                    }
                }

                feedbackMsg.style.display = 'block';
                setTimeout(() => {
                    feedbackMsg.style.display = 'none';
                }, 3000);

            } catch (erro) {
                console.error("Marianaa Detetou um Erro no Motor:", erro);
            }
        });
    }

    // =========================================================
    // [3] MENU DE NAVEGAÇÃO OVERLAY
    // =========================================================
    const burgerBtn = document.getElementById('burger-btn');
    const closeBtn = document.getElementById('close-menu');
    const overlayMenu = document.getElementById('overlay-menu');

    if (burgerBtn && overlayMenu) {
        burgerBtn.addEventListener('click', () => overlayMenu.classList.add('active'));
    }
    if (closeBtn && overlayMenu) {
        closeBtn.addEventListener('click', () => overlayMenu.classList.remove('active'));
    }

    // =========================================================
    // [4] EFEITOS DE FUNDO (ÁGUA E RASTO)
    // =========================================================
    document.addEventListener('mousemove', (e) => {
        if(document.body.classList.contains('static-mode')) return; 
        
        const trail = document.createElement('div');
        trail.className = 'water-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);

        requestAnimationFrame(() => {
            setTimeout(() => {
                trail.style.opacity = '0';
                trail.style.transform = 'translate(-50%, -50%) scale(4)'; 
            }, 10);
        });

        setTimeout(() => {
            trail.remove();
        }, 400); 
    });

    document.addEventListener('click', (e) => {
        if(document.body.classList.contains('static-mode')) return;

        const ripple = document.createElement('div');
        ripple.className = 'water-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 800);
    });

    // =========================================================
    // [5] POP-UPS (MODAIS)
    // =========================================================
    const serviceCards = document.querySelectorAll('.service-card, .team-card, .portfolio-card');
    const modal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('close-modal');

    if (modal) {
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                modalTitle.innerText = card.getAttribute('data-title');
                modalBody.innerHTML = card.getAttribute('data-content');
                modal.classList.add('active');
            });
        });

        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // =========================================================
    // [6] O PRELOADER, ONBOARDING E TYPEWRITER
    // =========================================================
    const onboarding = document.getElementById('onboarding');
    const enterBtn = document.getElementById('enter-site');
    const configPanel = document.getElementById('config-panel');
    const bootLoader = document.getElementById('boot-loader');
    const bar = document.querySelector('.loader-bar-progress');
    const perc = document.getElementById('load-perc');

    const startTypewriter = () => {
        const element = document.getElementById('typewriter-text');
        if (!element) return;
        
        const text = element.getAttribute('data-text');
        if (!text) return;

        let i = 0;
        element.innerHTML = "";

        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 80); 
            }
        };
        type();
    };

    if (!sessionStorage.getItem('onboardingConcluido') && onboarding) {
        
        if (enterBtn) {
            enterBtn.addEventListener('click', () => {
                
                const themeChoice = document.querySelector('input[name="theme"]:checked').value;
                const modeChoice = document.querySelector('input[name="mode"]:checked').value;
                const langChoice = document.getElementById('lang-select').value;
                
                localStorage.setItem('themeChoice', themeChoice);
                localStorage.setItem('modeChoice', modeChoice);
                localStorage.setItem('langChoice', langChoice);

                document.cookie = `django_language=${langChoice}; path=/`;

                if (modeChoice === 'static') document.body.classList.add('static-mode');
                if (themeChoice === 'light') document.body.classList.add('light-theme');
                
                configPanel.style.display = 'none';
                bootLoader.style.display = 'block';

                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.random() * 25; 
                    if (progress > 100) progress = 100;
                    
                    bar.style.width = `${progress}%`;
                    perc.innerText = `${Math.floor(progress)}%`;

                    if (progress === 100) {
                        clearInterval(interval);
                        
                        sessionStorage.setItem('onboardingConcluido', 'true');
                        
                        setTimeout(() => {
                            let currentPath = window.location.pathname;
                            const langRegex = /^\/[a-z]{2}(-[a-z]{2})?\//i;
                            
                            if (langRegex.test(currentPath)) {
                                currentPath = currentPath.replace(langRegex, '/' + langChoice + '/');
                            } else {
                                currentPath = '/' + langChoice + currentPath;
                            }
                            
                            window.location.href = currentPath;

                        }, 400); 
                    }
                }, 80);
            });
        }
    } else {
        if (onboarding) onboarding.style.display = 'none';
        startTypewriter();
    }

    // =========================================================
    // [7] TOGGLE DE TEMA NA NAVBAR
    // =========================================================
    const navThemeToggle = document.getElementById('nav-theme-toggle');
    const navThemeLabel = document.getElementById('nav-theme-label');
    const body = document.body;

    if (navThemeToggle && navThemeLabel) {
        
        if (body.classList.contains('light-theme') || localStorage.getItem('themeChoice') === 'light') {
            navThemeLabel.textContent = 'DARK';
        } else {
            navThemeLabel.textContent = 'LIGHT';
        }

        navThemeToggle.addEventListener('click', () => {
            const isDark = !body.classList.contains('light-theme');
            
            if (isDark) {
                body.classList.add('light-theme');
                localStorage.setItem('themeChoice', 'light');
                navThemeLabel.textContent = 'DARK'; 
            } else {
                body.classList.remove('light-theme');
                localStorage.setItem('themeChoice', 'dark');
                navThemeLabel.textContent = 'LIGHT';
            }
        });
    }

    // =========================================================
    // [8] LÓGICA DO SELETOR DE LÍNGUAS (NAVBAR)
    // =========================================================
    const flags = {
        'pt': '🇵🇹', 'en': '🇬🇧', 'es': '🇪🇸', 'fr': '🇫🇷', 'de': '🇩🇪',
        'it': '🇮🇹', 'nl': '🇳🇱', 'ja': '🇯🇵', 'ko': '🇰🇷', 'zh-hant': '🇹🇼',
        'hi': '🇮🇳', 'ar': '🇸🇦', 'tr': '🇹🇷', 'uk': '🇺🇦', 'ur': '🇵🇰'
    };

    const path = window.location.pathname;
    const langMatch = path.match(/^\/([a-z]{2}(-[a-z]+)?)\//i);
    let currentLang = 'pt'; 
    
    if (langMatch) {
        currentLang = langMatch[1].toLowerCase();
    }

    const langTextObj = document.getElementById('current-lang-text');
    const flagObj = document.getElementById('current-flag');
    
    if (langTextObj && flagObj) {
        let displayLang = currentLang === 'zh-hant' ? 'ZH' : currentLang.toUpperCase();
        langTextObj.innerText = displayLang;
        flagObj.innerText = flags[currentLang] || '🇵🇹';
    }

    const langBtn = document.getElementById('lang-menu-btn');
    const langDropdown = document.getElementById('lang-dropdown-content');

    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = langDropdown.style.display === 'flex';
            langDropdown.style.display = isVisible ? 'none' : 'flex';
        });

        document.addEventListener('click', () => {
            langDropdown.style.display = 'none';
        });
    }

});
