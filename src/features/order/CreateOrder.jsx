import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant.js";
import Button from "../../ui/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getCart, getTotalCartPrice } from "../cart/cartSlice.js";
import EmptyCart from "../cart/EmptyCart.jsx";
import { formatCurrency } from "../../utilities/helpers.js";
import { fetchAdress } from "../user/userSlice.js";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    userName,
    status: addressStatus,
    address,
    position,
    error: addressError,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const formErrors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priority = withPriority ? Math.round(totalCartPrice * 0.2) : 0;
  const totalPrice = totalCartPrice + priority;

  const dispatch = useDispatch();

  const cart = useSelector(getCart);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-6 py-8">
      <h2 className="mb-10 text-xl font-bold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="mb-2 sm:basis-40">First Name</label>

          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={userName}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />

            <span className="absolute right-[3px] top-[35px] z-20 sm:top-[3px] md:right-[5px] md:top-[5px]">
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAdress());
                }}
              >
                Get Position
              </Button>
            </span>

            {addressError && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.longitude},${position.latitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? `Placing Order...`
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
