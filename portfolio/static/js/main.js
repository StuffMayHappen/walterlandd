// static/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    
    const root = document.documentElement;
    
    // --- LÓGICA DE CORES E MODOS ---
    const metalColors = ['#d92b2b', '#3b5998', '#4b5320', '#556b2f', '#4a4a4a', '#8b0000'];
    let colorInterval;

    const setAccentColor = (color) => {
        root.style.setProperty('--accent-color', color);
    };

    const startDynamicMode = () => {
        clearInterval(colorInterval); // Limpa sempre antes de começar para não bugar
        let i = 0;
        colorInterval = setInterval(() => {
            const nextColor = metalColors[i % metalColors.length];
            setAccentColor(nextColor);
            i++;
        }, 120000); // Muda a cada 2 minutos
    };

    const stopDynamicMode = () => {
        clearInterval(colorInterval);
    };

    // 1. CARREGAR A MEMÓRIA IMEDIATAMENTE (Acontece em todas as páginas)
    const savedColor = localStorage.getItem('userAccentColor') || '#d92b2b';
    const isDynamic = localStorage.getItem('dynamicMode') === 'true';

    if (isDynamic) {
        startDynamicMode();
        setAccentColor(metalColors[0]); // Dá o kickstart no modo dinâmico
    } else {
        setAccentColor(savedColor);
    }

    // 2. LÓGICA EXCLUSIVA DA PÁGINA DE DEFINIÇÕES
    const dynamicToggle = document.getElementById('dynamic-mode-toggle');
    const accentPicker = document.getElementById('accent-picker');
    const saveBtn = document.getElementById('save-settings-btn');
    const feedbackMsg = document.getElementById('save-feedback');

    if (dynamicToggle && accentPicker && saveBtn) {
        
        // Põe os botões iguais àquilo que está guardado na memória
        dynamicToggle.checked = isDynamic;
        accentPicker.value = savedColor;

        // FUNÇÃO NOVA: Bloqueia o seletor de cor se o dinâmico estiver ligado
        const updatePickerState = () => {
            if (dynamicToggle.checked) {
                accentPicker.style.opacity = '0.3';
                accentPicker.style.pointerEvents = 'none'; // Impede o clique
            } else {
                accentPicker.style.opacity = '1';
                accentPicker.style.pointerEvents = 'auto'; // Permite o clique
            }
        };

        // Corre a função logo ao carregar a página e sempre que clicas na checkbox
        updatePickerState();
        dynamicToggle.addEventListener('change', updatePickerState);

        // O ATAQUE FINAL: Quando clicas no botão Guardar
        saveBtn.addEventListener('click', () => {
            const wantsDynamic = dynamicToggle.checked;
            const chosenColor = accentPicker.value;

            // 1. Guarda na memória do browser
            localStorage.setItem('dynamicMode', wantsDynamic);
            localStorage.setItem('userAccentColor', chosenColor);

            // 2. Aplica as mudanças no ecrã na hora
            if (wantsDynamic) {
                startDynamicMode();
                setAccentColor(metalColors[0]); 
            } else {
                stopDynamicMode();
                setAccentColor(chosenColor);
            }

            // 3. Mostra o aviso a verde durante 3 segundos
            feedbackMsg.style.display = 'block';
            setTimeout(() => {
                feedbackMsg.style.display = 'none';
            }, 3000);
        });
    }
    
    // --- LÓGICA DO MENU OVERLAY ---
    const burgerBtn = document.getElementById('burger-btn');
    const closeBtn = document.getElementById('close-menu');
    const overlayMenu = document.getElementById('overlay-menu');

    if (burgerBtn && overlayMenu) {
        burgerBtn.addEventListener('click', () => overlayMenu.classList.add('active'));
    }
    if (closeBtn && overlayMenu) {
        closeBtn.addEventListener('click', () => overlayMenu.classList.remove('active'));
    }

    // --- LÓGICA DO ONBOARDING ---
    const onboarding = document.getElementById('onboarding');
    const enterBtn = document.getElementById('enter-site');

    if (!sessionStorage.getItem('onboardingConcluido') && onboarding) {
        if (enterBtn) {
            enterBtn.addEventListener('click', () => {
                onboarding.classList.add('hidden');
                sessionStorage.setItem('onboardingConcluido', 'true');
            });
        }
    } else {
        if (onboarding) onboarding.style.display = 'none';
    }
});
