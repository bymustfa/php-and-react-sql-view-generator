import React from "react";
import {
  Box,
  Table as TableComponent,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  WrapItem,
} from "@chakra-ui/react";

export default function Table() {
  return (
    <Box
      w="24%"
      p="2"
      borderRadius="10px"
      border="1px"
      borderColor="gray.700"
      as={WrapItem}
    >
      <TableComponent size="sm">
        <Thead>
          <Tr>
            <Th>Table Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Checkbox size="sm" colorScheme="green" defaultIsChecked>
                column_name_1
              </Checkbox>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Checkbox size="sm" colorScheme="green">
                column_name_2
              </Checkbox>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Checkbox size="sm" colorScheme="green" defaultIsChecked>
                column_name_3
              </Checkbox>
            </Td>
          </Tr>
        </Tbody>
      </TableComponent>
    </Box>
  );
}
