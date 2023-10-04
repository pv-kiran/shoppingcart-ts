import { useCart } from "../context/CartContext";
import StoreItems from "../data/items.json";
import { Stack, Button } from "react-bootstrap";
import formatCurrency from "../utilities/formatCurrency";
type Props = {
  id: number;
  quantity: number;
};

function CartItem({ id, quantity }: Props) {
  const { removeFromCart } = useCart();
  const item = StoreItems.find((item) => item.id === id);
  if (item === undefined) {
    return null;
  }
  return (
    <Stack direction="horizontal" gap={2}>
      <img
        src={item.imgUrl}
        alt="product image"
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              X {quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}>
        X
      </Button>
    </Stack>
  );
}

export default CartItem;
