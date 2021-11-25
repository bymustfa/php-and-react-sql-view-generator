import React from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

export default function Database() {
  return (
    <RadioGroup defaultValue="1">
      <Stack spacing={5} direction="column">
        <Radio colorScheme="green" value="1">
          db name 1
        </Radio>
      </Stack>
    </RadioGroup>
  );
}
