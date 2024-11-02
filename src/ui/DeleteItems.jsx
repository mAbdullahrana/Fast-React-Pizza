import { useDispatch } from "react-redux";
import { deleteItem } from "../features/cart/cartSlice.js";
import Button from "./Button.jsx";

function DeleteItems({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button onClick={() => dispatch(deleteItem(pizzaId))} type="small">
      Delete
    </Button>
  );
}

export default DeleteItems;
