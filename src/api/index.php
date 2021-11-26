<?php
require __DIR__ . '/vendor/autoload.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

ob_start();
date_default_timezone_set('Europe/Istanbul');

use Buki\Router\Router;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
$router = new Router;

//cors error fix
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

$router->group("/V1", function ($router)
{

    $router->group("/databes", function ($router)
    {
        $router->get("/", function ()
        {
            try
            {

                $json = file_get_contents(__DIR__ . '/database.json');
                $json = json_decode($json, true);
                if (!isset($json))
                {
                    throw new Exception("Json file is broken");
                }

                response(sendMessage(true, $json));

            }
            catch(Exception $e)
            {
                response(sendMessage(false, $e->getMessage()) , 400);
            }

        });

        $router->post("/add", function ()
        {

            try
            {
                $json = file_get_contents(__DIR__ . '/database.json');
                $json = json_decode($json, true);

                $datas["id"] = guid();
                $datas["db_host"] = post("db_host");
                $datas["db_name"] = post("db_name");
                $datas["db_user"] = post("db_user");
                $datas["db_password"] = post("db_password");

                if (!isset($datas['db_password']))
                {
                    $datas["db_password"] = "";
                }

                if (!isset($datas['db_host']))
                {
                    throw new Exception("db_host is required");
                }
                else if (!isset($datas['db_name']))
                {
                    throw new Exception("db_name is required");
                }
                else if (!isset($datas['db_user']))
                {
                    throw new Exception("db_user is required");
                }
                else
                {
                    $merge = array_merge($json, [$datas]);
                    $saveDatas = json_encode($merge);

                    if (file_put_contents(__DIR__ . '/database.json', $saveDatas))
                    {
                        response(sendMessage(true, "Database added successfully"));
                    }
                    else
                    {
                        throw new Exception("Database added failed");
                    }
                }

            }
            catch(Exception $e)
            {
                response(sendMessage(false, $e->getMessage()) , 400);
            }

        });

    });

    $router->group("/tables", function ($router)
    {
        $router->get("/:string", function ($dbId)
        {
            try
            {
                $dbId = dataClear($dbId);
                if (isset($dbId))
                {

                    $json = file_get_contents(__DIR__ . '/database.json');
                    $json = json_decode($json, true);

                    $find = array_filter($json, function ($item) use ($dbId)
                    {
                        return $item['id'] == $dbId;
                    });
                    $find = array_values($find) [0];

                    if (isset($find))
                    {
                        $tables = [];
                        $response = query("SHOW TABLES", [], $find);
                        foreach ($response as $table)
                        {
                            foreach ($table as $key => $tableName)
                            {
                                $columns  = query("SHOW COLUMNS FROM $tableName", [], $find);

                                // array all keys and values to lower
                                $columns = array_map(function ($item)
                                {  
                                    // array value to lowercase
                                    $item = array_map('strtolower', $item);                                    
                                    return array_change_key_case($item, CASE_LOWER);
                                } , $columns);
                                
                                

                                $tables[] = ["table_name" => $tableName, "columns" => $columns];
                            }
                        }

                        response(sendMessage(true, $tables));

                    }
                    else
                    {
                        throw new Exception("Database not found");
                    }

                }
                else
                {
                    throw new Exception("Not send DB ID");
                }
            }
            catch(Exception $e)
            {
                response(sendMessage(false, $e->getMessage()) , 400);
            }

        });

        $router->get("/table-columns/:string", function ($tableName)
        {
            $tableName = dataClear($tableName);
            $response = query("SHOW COLUMNS FROM  $tableName", [], "test");

            response($response);
        });

    });

});

$router->run();

?>
