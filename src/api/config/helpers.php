<?php


function response($content = [], $status_code = 200)
{
    $response = new \Symfony\Component\HttpFoundation\Response();
    $response->setStatusCode($status_code);
    $response->headers->set('Content-type', 'application/json');
    $response->setContent(json_encode($content));
    $response->send();
}

function dataClear($data)
{
    if (is_array($data)) {
        foreach ($data as $key => $value) {
            $data[$key] = $value ? htmlspecialchars(trim(strip_tags($value))) : "";
        }
        return $data;
    } else {
        return $data ? htmlspecialchars(trim(strip_tags($data))) : "";
    }
}

function post($name)
{
    if(isset($_POST[$name]))
    {
        if (is_array($_POST)) {
            foreach ($_POST as $key => $value) {
                $_POST[$key] = $value ? dataClear($value) : "";
            }
            return $_POST;
        } else {
            return $_POST ? dataClear($_POST) : "";
        } 
    } else{
        return null;
    }
}



function get($name)
{
    if(isset($_GET[$name]))
    {
        if (is_array($_GET)) {
            foreach ($_GET as $key => $value) {
                $_GET[$key] = $value ? dataClear($value) : "";
            }
            return $_GET;
        } else {
            return $_GET ? dataClear($_GET) : "";
        } 
    } else{
        return null;
    }
}



function query($query, $params = [], $dbName){
    $db = new PDO('mysql:host=localhost;dbname='.$dbName, 'root', '');

    $req = $db->prepare($query);
    $req->execute($params);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;


}

?>