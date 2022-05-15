import { Label } from "@mui/icons-material";
import { Box, Button, Divider, Input } from "@mui/material";

import { useFieldArray, Controller } from "react-hook-form";

export default ({ nestIndex, control, register, setValue }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `accounts[${nestIndex}].requiredFields`,
  });

  const onFirstNameChange = (val, kIndex) => {
    setValue(
      `accounts[${nestIndex}].requiredFields[${kIndex}].firstName`,
      val,
      {
        shouldValidate: true,
      }
    );
  };

  const onLastNameChange = (val, kIndex) => {
    setValue(`accounts[${nestIndex}].requiredFields[${kIndex}].lastName`, val, {
      shouldValidate: true,
    });
  };

  return (
    <Box>
      {fields.map((item, k) => {
        return (
          <Box key={item.id} style={{}}>
            <Controller
              name={`accounts[${nestIndex}].requiredFields[${k}].firstName`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="First name"
                  name={`accounts[${nestIndex}].requiredFields[${k}].firstName`}
                  ref={register(
                    `accounts[${nestIndex}].requiredFields[${k}].firstName`
                    // {
                    //   required: true,
                    // }
                  )}
                  onChange={(e) => onFirstNameChange(e.target.value, k)}
                  defaultValue={item.firstName}
                  style={{ marginRight: "25px" }}
                />
              )}
            />

            <Controller
              name={`accounts[${nestIndex}].requiredFields[${k}].lastName`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="First name"
                  name={`accounts[${nestIndex}].requiredFields[${k}].lastName`}
                  ref={register(
                    `accounts[${nestIndex}].requiredFields[${k}].lastName`
                    // {
                    //   required: true,
                    // }
                  )}
                  onChange={(e) => onLastNameChange(e.target.value, k)}
                  defaultValue={item.lastName}
                  style={{ marginRight: "25px" }}
                />
              )}
            />

            <Button variant="outlined" type="button" onClick={() => remove(k)}>
              Delete Nested
            </Button>
          </Box>
        );
      })}

      <Button
        type="button"
        variant="outlined"
        onClick={() =>
          append({
            firstName: "",
            lastName: "",
          })
        }
      >
        Append Nested
      </Button>

      <Divider />
    </Box>
  );
};
