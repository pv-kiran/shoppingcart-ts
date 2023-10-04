import { Offcanvas, Stack } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import formatCurrency from "../utilities/formatCurrency";
import StoreItems from "../data/items.json";
type Props = {
  isOpen: boolean;
};
function Cart({ isOpen }: Props) {
  const { closeCart, cartItems } = useCart();
  console.log(StoreItems);
  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => {
            return <CartItem key={item.id} {...item}></CartItem>;
          })}
          <div className="ms-auto fw-bold fs-5">
            Total:{" "}
            {formatCurrency(
              cartItems?.reduce((total, cartItem) => {
                const item = StoreItems.find((item) => item.id == cartItem.id);
                console.log(item?.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Cart;
