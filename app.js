// База данных товаров (вы можете менять картинки, названия и цены)
const products = [
    {
        id: 1,
        name: "Смартфон Нового Поколения",
        category: "electronics",
        price: "120 000 ₸",
        image: "https://unsplash.com"
    },
    {
        id: 2,
        name: "Беспроводные Наушники",
        category: "electronics",
        price: "25 000 ₸",
        image: "https://unsplash.com"
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

let currentCategory = "all";
let searchQuery = "";

// Функция для отрисовки товаров на экране
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

    container.innerHTML = filtered.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <div class="price">${product.price}</div>
        </div>
    `).join("");
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
