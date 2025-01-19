# README: Test Wydajnościowy WooCommerce z k6

Ten skrypt to test wydajnościowy dla sklepu WooCommerce, który symuluje interakcje użytkowników z kategoriami, produktami, dodawaniem produktów do koszyka oraz przejściem do strony zamówienia (checkout). Test jest zaprojektowany do działania z narzędziem [k6](https://k6.io/).

---

## Funkcjonalności skryptu
- Symulacja przeglądania kategorii produktów.
- Otwieranie stron produktów.
- Dodawanie produktów do koszyka.
- Przejście do strony zamówienia (checkout).
- Możliwość dostosowania list kategorii, produktów oraz identyfikatorów produktów.

---

## Konfiguracja skryptu

1. **Uzupełnij dane sklepu:**
   - **Adres URL sklepu:** Podstawowy adres sklepu WooCommerce:
     ```javascript
     const baseURL = 'https://example.com'; // Zastąp swoim adresem URL
     ```

2. **Podaj ścieżki do kategorii:**
   - Wypełnij listę `categories` adresami URL kategorii w sklepie:
     ```javascript
     const categories = [
         '/product-category/phone/',
         '/product-category/pc/',
         '/product-category/laptop/'
     ];
     ```

3. **Podaj ścieżki do produktów:**
   - Wypełnij listę `products` adresami URL produktów w sklepie:
     ```javascript
     const products = [
         '/product/iphone-16/',
         '/product/macbook-13/',
         '/product/ipad/',
     ];
     ```

4. **Dodaj identyfikatory produktów:**
   - Wypełnij listę `productIds` identyfikatorami produktów, które będą dodawane do koszyka. Identyfikatory znajdziesz w panelu WooCommerce:
     ```javascript
     const productIds = [113, 120, 194, 129, 191];
     ```

---

## Jak uruchomić test

1. **Zainstaluj k6:**
   - Jeśli jeszcze nie masz zainstalowanego k6, możesz go zainstalować za pomocą:
     ```bash
     brew install k6       # macOS
     choco install k6      # Windows
     sudo apt install k6   # Linux
     ```

2. **Zapisz plik:**
   - Skopiuj kod testu i zapisz go w pliku, np. `woocommerce-test.js`.

3. **Uruchom test:**
   - Aby uruchomić test lokalnie, wykonaj w terminalu:
     ```bash
     k6 run woocommerce-test.js
     ```

4. **Przeprowadź test w chmurze k6:**
   - Zaloguj się do usługi k6 Cloud:
     ```bash
     k6 login cloud
     ```
   - Następnie uruchom test w chmurze:
     ```bash
     k6 cloud woocommerce-test.js
     ```

---

## Wskaźniki, które warto monitorować

- **Czas odpowiedzi kategorii (`Category 200`)**
- **Czas odpowiedzi produktów (`Product 200`)**
- **Dodanie do koszyka (`Cart 200`)**
- **Przejście do checkout (`Checkout 200`)**

---

## Przydatne informacje

- Skrypt jest domyślnie ustawiony na 20 wirtualnych użytkowników przez 3 minuty:
  ```javascript
  vus: 20, // Liczba wirtualnych użytkowników
  duration: '180s', // Czas trwania testu
