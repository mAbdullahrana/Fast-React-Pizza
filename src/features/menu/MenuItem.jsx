import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button.jsx";
import { formatCurrency } from "../../utilities/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice.js";
import DeleteItems from "../../ui/DeleteItems.jsx";
import UpdateItemQuantity from "../cart/UpdateItemQuantity.jsx";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  const isInCart = currentQuantity > 0;

  function handleAddItem() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-5 flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex gap-2 md:gap-4">
              <UpdateItemQuantity
                pizzaId={id}
                
              />
              <DeleteItems pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddItem}>
              Add To Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
