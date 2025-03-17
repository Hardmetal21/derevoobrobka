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
                menu.style.left = ''; // Скидаємо позицію
                menu.style.top = '';  // Скидаємо позицію
            }
        });
    }

    // Функція для встановлення позиції підменю
    function setSubMenuPosition(subElement, subMenu) {
        const subElementRect = subElement.getBoundingClientRect(); // Отримуємо координати елемента `.sub`
        const navContentRect = navContent.getBoundingClientRect(); // Отримуємо координати контейнера `nav-content`
        const leftPosition = subElementRect.left - navContentRect.left + (subElementRect.width / 2) - (subMenu.offsetWidth / 2) - 50;
        const topPosition = subElementRect.bottom - navContentRect.top + 5;
        subMenu.style.left = `${leftPosition}px`;
        subMenu.style.top = `${topPosition}px`;
    }

    // Обробник наведення на `sub`
    navContent.addEventListener('mouseenter', function(event) {
        const triggerItem = event.target;

        if (triggerItem.classList.contains('sub')) {
            const subMenu = triggerItem.nextElementSibling;

            if (subMenu && subMenu.tagName === 'UL') {
                // Якщо підменю ще не відкрите, встановлюємо позицію та відкриваємо
                if (!subMenu.classList.contains('active-sub-menu')) {
                    closeAllSubMenus(subMenu); // Закриваємо інші підменю
                    setSubMenuPosition(triggerItem, subMenu); // Встановлюємо позицію цього підменю
                    subMenu.classList.add('sub-menu', 'active-sub-menu'); // Додаємо класи
                    activeMenu = subMenu; // Зберігаємо активне меню
                }
            }
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


document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector(".navigation"); // Виберіть ваш елемент навігації
    const navPosition = nav.offsetTop; // Початкова позиція навігації від верху

    window.addEventListener("scroll", function () {
        if (window.scrollY >= navPosition) {
            nav.classList.add("fixed"); // Додаємо клас для фіксованого стану
        } else {
            nav.classList.remove("fixed"); // Забираємо клас, якщо повернулися вище
        }
    });
});