import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({cabinToEdit = {}, setShowForm}) {

  const {cabin_id: editId, ...editValues} = cabinToEdit;
  const isEditSession = Boolean(editId);

  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm({defaultValues: isEditSession ? editValues : {},});

  const {errors} = formState;
  // console.log(errors);

  const {mutate: createCabin, isLoading: isCreating} = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({
        queryKey: ["cabin"] });
        reset();
      },
      onError: (err) => toast.error(err.message),
  });

  const {mutate: editCabin , isLoading: isEditing} = useMutation({
    mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('New cabin successfully edited');
      queryClient.invalidateQueries({
        queryKey: ["cabin"] });
        reset();
      },
      onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {

    console.log(data);

    const image = typeof data.cabin_img === "string" ? data.cabin_img : data.cabin_img[0];

    if(isEditSession) editCabin({newCabinData: {...data, cabin_img: image}, id:editId});
    else createCabin({...data, cabin_img: image});
    
  }

  function onError(errors){
    // console.log(errors);
  }

  const isWorking = isCreating || isEditing;

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.cabin_name?.message}>
        <Input type="text" id="name" disabled={isWorking} {...register("cabin_name", {required: "This field is required"})} />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.cabin_max_capacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isWorking} {...register("cabin_max_capacity",{required: "This field is required", min: {
          value: 1,
          message: "Capacity should be at least (1) one in value",
        }})} />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.cabin_price?.message}>
        <Input type="number" id="regularPrice" disabled={isWorking} {...register("cabin_price",{required: "This field is required",
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
          disabled={isWorking}
          {...register("cabin_discount",{required: "This field is required", 
          validate: (value) => value <= getValues().cabin_price  || 'Discount should be less than the regular price'})}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors?.cabin_description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("cabin_description",{required: "This field is required"})}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.cabin_img?.message}>
        <FileInput id="image" accept="image/*" disabled={isWorking} 
        {...register("cabin_img",
        {required: isEditSession ? false : "This field is required"})}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => setShowForm((showForm) => !showForm)}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit Cabin' : 'Create Cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;