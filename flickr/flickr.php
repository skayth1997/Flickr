<?php

$search = $_GET['search'];

if (strlen($search)>0){

    $url = 'https://www.flickr.com/search/?text=';
    $content = file_get_contents($url . urlencode($search));
    $dom = new domDocument;
    libxml_use_internal_errors(true);
    $dom->loadHTML($content);
    $divs = $dom->getElementsByTagName('div');
    $arr = array();

    foreach ($divs as $div) {
        $style = $div->getAttribute('style');
        $match_count = preg_match('/background-image:(.*?).jpg/', $style, $matches);
        if ($match_count > 0) {
//            array_push($arr, json_encode($matches[0]));
            array_push($arr, $matches[0]);
        }
    }

    $out = array_values($arr);
//    var_dump($arr);

    return json_encode($out);

//    $arr = json_encode($arr);

//    return $arr;

}