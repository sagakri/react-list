import React from "react";

// item и onRemove приходят из родительского компонента App через props.
function ShoppingItem({ item, onRemove }) {
  return (
    <li className="shopping-item">
      <span className="item-name">{item.name}</span>
      <span className="item-price">
        {item.price.toLocaleString("ru-KG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} сом
      </span>
      <button
        type="button"
        className="remove-button"
        aria-label={`Удалить товар «${item.name}»`}
        onClick={() => onRemove(item.id)}
      >
        Удалить
      </button>
    </li>
  );
}

export default ShoppingItem;
