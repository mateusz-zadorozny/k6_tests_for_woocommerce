import http from 'k6/http';
import { sleep, check } from 'k6';

// Podstawowe dane sklepu
const baseURL = 'https://example.com';

// Stała lista URLi kategorii i produktów
// tu wpisz ścieżki do kategorii swoich produktów
const categories = [
    '/product-category/phone/',
    '/product-category/pc/',
    '/product-category/laptop/'
];
// tu wpisz ścieżki do swoich produktów
const products = [
    '/product/iphone-16/',
    '/product/macbook-13/',
    '/product/ipad/',
];
// tu wpisz ID swoich produktów bez wariantów, które będzie dodawać do koszyka,
// znajdziesz to w zakładce produkty po najechaniu na produkt
const productIds = [113, 120, 194, 129, 191];

// Funkcja losująca URL z listy
function randomUrl(list) {
    return list[Math.floor(Math.random() * list.length)];
}

// Funkcja losująca ID produktu
function randomProductId(list) {
    return list[Math.floor(Math.random() * list.length)];
}

export const options = {
    ext: {
        loadimpact: {
            distribution: {
                "amazon:de:frankfurt": { loadZone: "amazon:de:frankfurt", percent: 100 },
                // Strefa Frankfurt
            },
        },
    },
    scenarios: {
        scenario_cart_and_checkout: {
            executor: 'constant-vus',
            vus: 20, // 20 użytkowników
            duration: '180s',
            // Maksymalny czas scenariusza
            exec: 'checkout',
            gracefulStop: '30s',
            // Dodajemy 30 sekund na zakończenie testu
        },
    },
};

// Scenariusz: Kategoria + produkt
export function viewCategoryAndProduct() {
    sleep(Math.random() * 10); // Losowy czas przed rozpoczęciem
    const cat = http.get(baseURL + randomUrl(categories));
    check(cat, { 'Category 200': (r) => r.status === 200 });
    sleep(Math.random() * 5);
    const prod = http.get(baseURL + randomUrl(products));
    check(prod, { 'Product 200': (r) => r.status === 200 });
    sleep(Math.random() * 5);
}

// Scenariusz: Dodanie do koszyka
export function addToCart() {
    // Losowy czas przed rozpoczęciem
    sleep(Math.random() * 15);
    // Obejrzenie kategorii i produktu w trakcie
    viewCategoryAndProduct();
    const productId = randomProductId(productIds);
    // Dodanie produktu do koszyka
    const url = baseURL + '/cart/?add-to-cart=' + productId;
    const res = http.get(url);

    // Check na status odpowiedzi
    const statusCheck = check(res, {
        'Cart 200': (r) => r.status === 200,
    });

    if (!statusCheck) {
        console.error(`Failed status check for URL: ${url}`);
    }
    // Losowy czas po operacji
    sleep(Math.random() * 15);
}

// Scenariusz: Checkout
export function checkout() {
    sleep(Math.random() * 2); // Losowy czas przed rozpoczęciem

    // 100% szans na wykonanie pierwszego `addToCart`
    addToCart();

    // Przejście do strony zamówienia
    const res = http.get(baseURL + '/checkout/');
    check(res, { 'Checkout 200': (r) => r.status === 200 });

    sleep(Math.random() * 10); // Skrócony czas na checkout
}