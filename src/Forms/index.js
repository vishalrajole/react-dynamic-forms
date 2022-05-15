import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";

import FieldArray from "./fieldArray";
import { Typography } from "@mui/material";

const defaultValues = {
  accounts: [
    {
      country: "",
      bank: "",
      requiredFields: [
        {
          firstName: "",
          lastName: "",
        },
      ],
    },
  ],
};

const Forms = () => {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    reset,
    setValue,
  } = useForm({
    defaultValues,
  });
  const onSubmit = (data) => console.log("data", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography>Array of Array Fields</Typography>

      <FieldArray
        {...{ control, register, defaultValues, getValues, setValue, errors }}
      />

      <Button
        variant="contained"
        type="button"
        onClick={() => reset(defaultValues)}
      >
        Reset
      </Button>

      <Button
        variant="contained"
        type="submit"
        onClick={() => handleSubmit(defaultValues)}
      >
        Submit
      </Button>
    </form>
  );
};

export default Forms;
