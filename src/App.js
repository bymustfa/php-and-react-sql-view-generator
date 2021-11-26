import React, { useState, useEffect } from "react";
import { Box, Flex, RadioGroup, Button } from "@chakra-ui/react";

import Head from "./components/head";
import Sql from "./components/sql";
import Table from "./components/table";
import Database from "./components/database";
import { Reload } from "./components/icons";
import { get, post } from "./services/index";

function App() {
  const numberToArray = (num) => {
    return Array.from(Array(num).keys());
  };

  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState(null);

  const [tables, setTables] = useState([]);

  const [fromTable, setFromTable] = useState(null);

  const [selectedColumns, setSelectedColumns] = useState([]);

  const getDatabase = () => {
    get("databes")
      .then((res) => {
        if (res.status) setDatabases(res.datas);
      })
      .catch((err) => {
        setDatabases([]);
      });
  };

  useEffect(() => {
    getDatabase();
  }, []);

  useEffect(() => {
    if (selectedDatabase) {
      get(`tables/${selectedDatabase}`)
        .then((res) => {
          if (res.status) setTables(res.datas);
        })
        .catch((err) => {
          setTables([]);
        });
    }
  }, [selectedDatabase]);

  const handleChangeColumns = (e) => {
    const { value, checked } = e.target;
    const index = selectedColumns.indexOf(value);
    if (index === -1) {
      setSelectedColumns([...selectedColumns, value]);
    } else {
      setSelectedColumns(selectedColumns.filter((item) => item !== value));
    }
  };

  console.log(fromTable);

  return (
    <Box p={5} px={10}>
      <Head />

      <Box border="1px" borderColor="gray.500" borderRadius={10}>
        <Flex>
          <Box
            p="4"
            borderColor="gray.500"
            borderRight="1px"
            w="20%"
            position="relative"
          >
            <Button
              colorScheme="teal"
              position="absolute"
              right="1"
              top="1"
              color="gray.800"
              _hover={{ color: "white" }}
              size="xs"
              rightIcon={<Reload />}
              onClick={getDatabase}
            >
              Reload
            </Button>

            <Database
              databases={databases}
              defaultValue={selectedDatabase}
              onChange={(e) => setSelectedDatabase(e)}
            />
          </Box>

          <Box p="4" w="80%">
            <RadioGroup onChange={setFromTable} value={fromTable}>
              <Box display="flex" flexWrap="wrap">
                {tables.length > 0 &&
                  tables.map((table, index) => (
                    <Table
                      datas={table}
                      key={index}
                      onChange={handleChangeColumns}
                    />
                  ))}
              </Box>
            </RadioGroup>
          </Box>
        </Flex>
      </Box>

      <Sql selectedColumns={selectedColumns} tableName={fromTable} />
    </Box>
  );
}

export default App;
