document.addEventListener('DOMContentLoaded', function () {
    const navContent = document.querySelector('.nav-content');

    if (!navContent) return;

    // Функція для оновлення тексту тригера
    function updateTriggerText(menu, isActive) {
        const trigger = menu.previousElementSibling?.querySelector('.triger');
        if (trigger) {
            trigger.textContent = isActive ? '▼' : '▲';
        }
    }

    // Відслідковування подій наведення на елемент з класом 'sub'
    navContent.addEventListener('mouseenter', function (event) {
        const triggerItem = event.target;
        if (triggerItem.classList.contains('sub')) {
            const subMenu = triggerItem.nextElementSibling;
            if (subMenu && subMenu.tagName === 'UL') {
                updateTriggerText(subMenu, true); // Увімкнути ▼
                subMenu.classList.add('sub-menu'); // Додати активний клас для тестування
            }
        }
    }, true);

    // Відслідковування подій залишення елементів
    navContent.addEventListener('mouseleave', function (event) {
        const subMenu = event.target.nextElementSibling;
        if (
            subMenu &&
            subMenu.tagName === 'UL' &&
            !subMenu.classList.contains('sub-menu') &&
            !subMenu.classList.contains('active-sub-menu')
        ) {
            updateTriggerText(subMenu, false); // Вимкнути ▼
        }
    }, true);

    // Оновлення тригера при зміні стану меню
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(mutation => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.tagName === 'UL') {
                    const isActive = target.classList.contains('sub-menu') || target.classList.contains('active-sub-menu');
                    updateTriggerText(target, isActive);
                }
            }
        });
    });

    // Відслідковуємо зміни класів для всіх підменю
    const subMenus = navContent.querySelectorAll('ul');
    subMenus.forEach(subMenu => {
        observer.observe(subMenu, { attributes: true });
    });
});