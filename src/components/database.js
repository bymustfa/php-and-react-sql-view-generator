import React from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

export default function Database({ databases, defaultValue = null, onChange }) {
  return (
    <RadioGroup defaultValue={defaultValue} onChange={onChange}>
      <Stack spacing={5} direction="column">
        {databases.map((database, index) => (
          <Radio key={index} colorScheme="green" value={database.id}>
            {database.db_host}[{database.db_name}]
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
}
