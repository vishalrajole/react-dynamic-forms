import { useState } from "react";
import { useFieldArray, Controller } from "react-hook-form";
import {
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import NestedArray from "./nestedFieldArray";
import { Box } from "@mui/system";

let renderCount = 0;

export default function Fields({ control, register, setValue, getValues }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "accounts",
    country: "",
    bank: "",
  });

  renderCount++;

  const handleCountryChange = (val, index) => {
    console.log(val, index);
    setValue(`accounts.${index}.country`, val, { shouldValidate: true });
  };

  const handleBankChange = (val, index) => {
    setValue(`accounts.${index}.bank`, val, { shouldValidate: true });
  };

  return (
    <>
      <Box>
        {fields.map((item, index) => {
          return (
            <Box key={item.id}>
              <Controller
                name={`accounts[${index}].country`}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth style={{ margin: 10 }}>
                    <InputLabel id="demo-simple-country-label">
                      Country
                    </InputLabel>
                    <Select
                      {...field}
                      ref={register(`accounts[${index}].country`)}
                      labelId="demo-simple-country-label"
                      id="demo-simple-country"
                      value={item.country}
                      label="Country"
                      onChange={(e) =>
                        handleCountryChange(e.target.value, index)
                      }
                    >
                      <MenuItem value={"IN"}>India</MenuItem>
                      <MenuItem value={"DE"}>Germany</MenuItem>
                      <MenuItem value={"CH"}>China</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />

              <>
                <Controller
                  name={`accounts[${index}].bank`}
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth style={{ margin: 10 }}>
                      <InputLabel id="demo-simple-bank-label">Bank</InputLabel>
                      <Select
                        {...field}
                        ref={register(`accounts[${index}].bank`)}
                        labelId="demo-simple-bank-label"
                        id="demo-simple-bank"
                        value={item.bank}
                        label="Bank"
                        onChange={(e) =>
                          handleBankChange(e.target.value, index)
                        }
                      >
                        <MenuItem value={"BA1"}>Bank 1</MenuItem>
                        <MenuItem value={"BA2"}>Bank 2</MenuItem>
                        <MenuItem value={"BA3"}>Bank 3</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
                <NestedArray
                  nestIndex={index}
                  {...{ control, register, setValue }}
                />
              </>

              <Button
                variant="outlined"
                type="button"
                onClick={() => remove(index)}
              >
                Delete
              </Button>
            </Box>
          );
        })}
      </Box>

      <section>
        <Button
          variant="outlined"
          type="button"
          onClick={() => {
            append({ firstName: "", lastName: "" });
          }}
        >
          append
        </Button>

        {/* <button
          type="button"
          onClick={() => {
            setValue("test", [
              ...getValues().test,
              {
                name: "append",
                nestedArray: [{ field1: "append", field2: "append" }],
              },
            ]);
          }}
        >
          Append Nested
        </button> */}
      </section>

      <span className="counter">Render Count: {renderCount}</span>
    </>
  );
}
