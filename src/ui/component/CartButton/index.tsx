import {Badge, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";

type CartButtonProps = {
  quantity: number;
};

export default function CartButton({ quantity }: CartButtonProps) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Button variant="primary">
        <FontAwesomeIcon icon={faCartShopping} />
      </Button>

      {quantity > 0 && (
        <Badge
          pill
          bg="danger"
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            fontSize: '0.75rem',
          }}
        >
          {quantity}
        </Badge>
      )}
    </div>
  );
}
