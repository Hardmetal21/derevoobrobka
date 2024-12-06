function initHoverMenu() {
    const navContent = document.querySelector('.nav-content');
    
    if (!navContent) return;

    let activeMenu = null; // Стан для збереження активного меню

    // Функція для закриття всіх підменю, окрім активного
    function closeAllSubMenus(exclude = null) {
        const subMenus = navContent.querySelectorAll('ul');
        subMenus.forEach(menu => {
            if (menu !== exclude) {
                menu.classList.remove('sub-menu', 'active-sub-menu');
            }
        });
    }

    // Обробник наведення на `sub`
    navContent.addEventListener('mouseenter', function(event) {
        const triggerItem = event.target;

        if (triggerItem.classList.contains('sub')) {
            const subMenu = triggerItem.nextElementSibling;
            
            if (subMenu && subMenu.tagName === 'UL') {
                closeAllSubMenus(subMenu);
                subMenu.classList.add('sub-menu');
                activeMenu = subMenu; // Зберігаємо активне меню
            }
        }
    }, true);

    // Обробник наведення на `sub-menu`
    navContent.addEventListener('mouseenter', function(event) {
        const subMenu = event.target;

        if (subMenu.classList.contains('sub-menu')) {
            subMenu.classList.add('active-sub-menu');
            activeMenu = subMenu; // Оновлюємо активне меню
        }
    }, true);

    // Обробник виходу миші з `nav-content`
    navContent.addEventListener('mouseleave', function(event) {
        const relatedTarget = event.relatedTarget;

        // Перевірка, чи миша все ще в межах `nav-content`
        if (!navContent.contains(relatedTarget)) {
            closeAllSubMenus();
            activeMenu = null; // Скидаємо стан активного меню
        }
    });
}

// Ініціалізуємо меню після завантаження DOM
document.addEventListener('DOMContentLoaded', initHoverMenu);
