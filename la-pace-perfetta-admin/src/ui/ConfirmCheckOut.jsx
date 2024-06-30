import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmCheckout = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmCheckOut({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmCheckout>
      <Heading as="h2">Checkout {resourceName}</Heading>
      <p>
        Guests on <strong>{resourceName}</strong> checking out? Please confirm
        action cannot be undone.
      </p>

      <div>
        <Button variations="primary" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variations="danger" disabled={disabled} onClick={onConfirm}>
          Check-out
        </Button>
      </div>
    </StyledConfirmCheckout>
  );
}

export default ConfirmCheckOut;
