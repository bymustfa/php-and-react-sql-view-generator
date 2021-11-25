<?php


function response($content = [], $status_code = 200)
{
    $response = new \Symfony\Component\HttpFoundation\Response();
    $response->setStatusCode($status_code);
    $response->headers->set('Content-type', 'application/json');
    $response->setContent(json_encode($content));
    $response->send();
}


function sendMessage( $status, $datas ){
    return ["status" => $status, "datas" => $datas];
}

// return guid
function guid()
{
    if (function_exists('com_create_guid')) {
        return com_create_guid();
    } else {
        mt_srand((double)microtime() * 10000);
        $charid = strtoupper(md5(uniqid(rand(), true)));
        $hyphen = chr(45);
        $uuid = substr($charid, 0, 8) . $hyphen
            . substr($charid, 8, 4) . $hyphen
            . substr($charid, 12, 4) . $hyphen
            . substr($charid, 16, 4) . $hyphen
            . substr($charid, 20, 12);
        return $uuid;
    }
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
        if (is_array($_POST[$name])) {
            foreach ($_POST[$name] as $key => $value) {
                $_POST[$name][$key] = $value ? dataClear($value) : "";
            }
            return $_POST[$name];
        } else {
            return $_POST[$name] ? dataClear($_POST[$name]) : "";
        } 
    } else{
        return null;
    }
}



function get($name)
{ 

    if(isset($_GET[$name]))
    {
        if (is_array($_GET[$name])) {
            foreach ($_GET[$name] as $key => $value) {
                $_GET[$name][$key] = $value ? dataClear($value) : "";
            }
            return $_GET[$name];
        } else {
            return $_GET[$name] ? dataClear($_GET[$name]) : "";
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