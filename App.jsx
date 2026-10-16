import React, { useState } from "react";
import ShoppingItem from "./ShoppingItem.jsx";
import "./styles.css";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function addItem(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const numericPrice = Number(price);

    if (!trimmedName || price === "" || !Number.isFinite(numericPrice) || numericPrice < 0) {
      return;
    }

    const newItem = {
      id: crypto.randomUUID(),
      name: trimmedName,
      price: numericPrice,
    };

    // Обновляем state: React заново отобразит список.
    setItems((currentItems) => [...currentItems, newItem]);
    setName("");
    setPrice("");
  }

  function removeItem(id) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }

  // Складываем целые тыйыны, чтобы избежать погрешностей дробных чисел.
  const total = items.reduce((sum, item) => sum + Math.round(item.price * 100), 0) / 100;

  return (
    <main className="shopping-list">
      <header>
        <p className="eyebrow">Всё под рукой</p>
        <h1>Список покупок</h1>
        <p className="description">Добавляйте товары и следите за общей стоимостью.</p>
      </header>

      <form onSubmit={addItem}>
        <label htmlFor="item-name">
          Название товара
          <input
            id="item-name"
            type="text"
            placeholder="Например, молоко"
            value={name}
            maxLength={100}
            required
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label htmlFor="item-price">
          Цена, сом
          <input
            id="item-price"
            type="number"
            placeholder="0,00"
            min="0"
            max="999999999"
            step="0.01"
            value={price}
            required
            onChange={(event) => setPrice(event.target.value)}
          />
        </label>
        <button type="submit" disabled={!name.trim() || price === ""}>Добавить</button>
      </form>

      <section aria-label="Товары">
        <h2>Мои покупки <span>{items.length}</span></h2>
        {items.length === 0 ? (
          <p className="empty-state">Список пока пуст. Добавьте первый товар выше.</p>
        ) : (
          <ul>
            {items.map((item) => (
              <ShoppingItem key={item.id} item={item} onRemove={removeItem} />
            ))}
          </ul>
        )}
      </section>

      <footer className="total" aria-live="polite" aria-atomic="true">
        <span>Общая стоимость</span>
        <strong>{total.toLocaleString("ru-KG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} сом</strong>
      </footer>
    </main>
  );
}

export default App;
