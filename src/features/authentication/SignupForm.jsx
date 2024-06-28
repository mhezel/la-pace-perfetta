import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

// Email regex: /\S+@\S+\.\S+/

function SignUpForm() {
    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { errors } = formState;
    const {isSigningup, signup} = useSignup();

    function onSubmit({fullName, email, password}) {
        signup({fullName, email, password}, {
            onSettled: () => reset(),
        });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input
                    disabled={isSigningup}
                    type="text"
                    id="fullName"
                    {...register("fullName", { required: "This field is required" })}
                />
            </FormRow>

            <FormRow label="Email address" error={errors?.email?.message}>
                <Input
                    disabled={isSigningup}
                    type="email"
                    id="email"
                    {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please enter a valid email address",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Password (min 8 characters)"
                error={errors?.password?.message}
            >
                <Input
                    disabled={isSigningup}
                    type="password"
                    id="password"
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message: "Password needs a minimum of 8 characters",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Repeat password"
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    disabled={isSigningup}
                    type="password"
                    id="passwordConfirm"
                    {...register("passwordConfirm", {
                        required: "This field is required",
                        validate: (value) =>
                            value === getValues().password || "Passwords need to match",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variations="secondary" type="reset" disabled={isSigningup}> 
                    Cancel
                </Button>
                <Button>Create new user</Button>
            </FormRow>
        </Form>
    );
}
export default SignUpForm;
