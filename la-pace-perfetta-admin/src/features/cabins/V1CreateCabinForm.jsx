import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {

  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const {errors} = formState;
  console.log(errors);

  const {mutate, isLoading} = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({
        queryKey: ["cabin"] });
        reset();
      },
      onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate({...data, cabin_img: data.cabin_img[0]});
    // console.log(data);
  }

  function onError(errors){
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.cabin_name?.message}>
        <Input type="text" id="name" disabled={isLoading} {...register("cabin_name", {required: "This field is required"})} />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.cabin_max_capacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isLoading} {...register("cabin_max_capacity",{required: "This field is required", min: {
          value: 1,
          message: "Capacity should be at least (1) one in value",
        }})} />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.cabin_price?.message}>
        <Input type="number" id="regularPrice" disabled={isLoading} {...register("cabin_price",{required: "This field is required",
        min:{
          value: 1,
          message: "Price should not be (0) zero in value"
        }
      })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.cabin_discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isLoading}
          {...register("cabin_discount",{required: "This field is required", 
          validate: (value) => value <= getValues().cabin_price  || 'Discount should be less than the regular price'})}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors?.cabin_description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isLoading}
          {...register("cabin_description",{required: "This field is required"})}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.cabin_img?.message}>
        <FileInput id="image" accept="image/*" disabled={isLoading} {...register("cabin_img",{required: "This field is required"})} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
