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
  Radio,
} from "@chakra-ui/react";
import { Key } from "./icons";

export default function Table({ datas, onChange }) {
  return (
    <Box w="24%" p="2">
      <Box
        borderRadius="10px"
        border="1px"
        borderColor="gray.700"
        h="100%"
        as={WrapItem}
      >
        <TableComponent size="sm">
          <Thead>
            <Tr>
              <Th>
                <Box>
                  <Radio colorScheme="green" value={datas.table_name}>
                    <span>{datas.table_name}</span>
                  </Radio>
                </Box>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {datas.columns.map((column, index) => (
              <Tr key={index}>
                <Td>
                  <Checkbox
                    size="sm"
                    value={
                      datas.table_name +
                      "." +
                      column.field +
                      " AS " +
                      datas.table_name +
                      "_" +
                      column.field
                    }
                    colorScheme="green"
                    onChange={onChange}
                  >
                    {column.field}
                  </Checkbox>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </TableComponent>
      </Box>
    </Box>
  );
}
