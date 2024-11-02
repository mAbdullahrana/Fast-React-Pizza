import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button.jsx";
import {
  decreaseItemQuantity,
  deleteItem,
  getCurrentQuantityById,
  increaseItemQuantity,
} from "./cartSlice.js";

function UpdateItemQuantity({ pizzaId }) {
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  const dispatch = useDispatch();

 
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-xs font-bold">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
