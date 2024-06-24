import { useGetSettings } from "./useGetSettings";
import { useUpdateSettings } from "./useUpdateSettings";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
  const {
    isFetching,
    settings: {
      min_booking_length,
      max_booking_length,
      max_guest_booking,
      breakfast_price,
    } = {},
  } = useGetSettings();
  const { isUpdating, updateSetting } = useUpdateSettings();

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  }

  if (isFetching) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={min_booking_length}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "min_booking_length")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={max_booking_length}
          onBlur={(e) => handleUpdate(e, "max_booking_length")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={max_guest_booking}
          onBlur={(e) => handleUpdate(e, "max_guest_booking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfast_price}
          onBlur={(e) => handleUpdate(e, "breakfast_price")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
