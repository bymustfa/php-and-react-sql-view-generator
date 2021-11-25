<?php
require __DIR__ . '/vendor/autoload.php'; 
ob_start();
date_default_timezone_set( 'Europe/Istanbul');

use Buki\Router\Router;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
$router = new Router;

//cors error fix
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

$router->group("/V1", function($router){

    $router->group( "/databes", function($router){
        $router->get("/", function(){
            response(["message" => "Welcome to databes API"]);
        });


        $router->post( "/add", function(){
            
                });


        } );
        







        $router->group( "/tables", function($router){
            $router->get("/", function(){
                $response = query("SELECT * FROM demo_table", [], "test");
                response(  $response);
            });
    
            $router->get("/table-columns/:string", function($tableName){
                $tableName = dataClear($tableName);
                $response = query("SHOW COLUMNS FROM  $tableName", [], "test");
                
    
                response($response);
            });
            
        } );







    } );


  




 

$router->run();
 
?>
