// База данных товаров (вы можете менять картинки, названия и цены)
const products = [
    {
        id: 1,
        name: "Шу пуэр",
        category: "tea",
        price: "13 000 ₸",
        image: "image/1.jpeg"
    },
    {
        id: 2,
        name: "Шу пуэр Королевское качество 2018 год",
        category: "tea",
        price: "13 000 ₸",
        image: "image/1.jpeg"
    },
    {
        id: 3,
        name: "Футболка Хлопковая",
        category: "clothes",
        price: "8 000 ₸",
        image: "https://unsplash.com"
    },
    {
        id: 4,
        name: "Кожаная Куртка",
        category: "clothes",
        price: "45 000 ₸",
        image: "https://unsplash.com"
    },
    {
        id: 5,
        name: "Умная Лампа",
        category: "home",
        price: "12 000 ₸",
        image: "https://unsplash.com"
    }
];

const container = document.getElementById("products-container");
const searchInput = document.getElementById("search-input");
const filterBtns = document.querySelectorAll(".filter-btn");

// Элементы модального окна
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.querySelector(".modal-close");

let currentCategory = "all";
let searchQuery = "";

// ЗАМЕНИТЕ ЭТОТ НОМЕР НА ВАШ (без +, пробелов и дефисов)
const WHATSAPP_NUMBER = "https://wa.me/c/215259533066333"; 

function displayProducts() {
    const filtered = products.filter(product => {
        const matchesCategory = currentCategory === "all" || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>Товары не найдены</p>";
        return;
    }

    container.innerHTML = filtered.map(product => {
        // Формируем текст сообщения для WhatsApp (автоматически подставляем название товара)
        const message = encodeURIComponent(`Здравствуйте! Хочу заказать товар: "${product.name}" по цене ${product.price}.`);
        const whatsappLink = `https://wa.me{WHATSAPP_NUMBER}?text=${message}`;

        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-img">
                <h4>${product.name}</h4>
                <div class="price">${product.price}</div>
                <!-- Кнопка КУПИТЬ со ссылкой на ваш WhatsApp -->
                <a href="${whatsappLink}" target="_blank" class="buy-btn">Купить</a>
            </div>
        `;
    }).join("");
}

// Отслеживание ввода в поиск
searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    displayProducts();
});

// Отслеживание кликов по категориям
filterBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        filterBtns.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        
        currentCategory = e.target.dataset.category;
        displayProducts();
    });
});

// Запуск при загрузке страницы
displayProducts();


// ЛОГИКА МОДАЛЬНОГО ОКНА
// Открытие при клике на картинку товара
container.addEventListener("click", (e) => {
    if (e.target.classList.contains("product-img")) {
        modal.style.display = "flex";
        modalImg.src = e.target.src;
    }
});

// Закрытие при клике на крестик
modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});

// Закрытие при клике на любой черный фон вокруг картинки
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Поиск и фильтры
searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    displayProducts();
});

filterBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        filterBtns.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        currentCategory = e.target.dataset.category;
        displayProducts();
    });
});

displayProducts();
