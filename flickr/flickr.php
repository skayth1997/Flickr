<?php

$search = $_GET['search'];

if (strlen($search)>0) {
    $array_count = explode(' ', $search);
    $url = 'https://www.flickr.com/search/?text=';
    libxml_use_internal_errors(true);

    $arr = array();

    $i = 0;
    foreach ($array_count as $count) {
        $arrays[] = $count;
        array_push($arr, $arrays);
        $arrays = [];
        $i++;
    }

    $i = 0;
    foreach ($array_count as $count) {
        $content = file_get_contents($url . $count);
        $dom = new domDocument;
        $dom->loadHTML($content);
        $divs = $dom->getElementsByTagName('div');

        $cycle = 0;
        foreach ($divs as $div) {
            if ($cycle == 5){
                break;
            }
            $style = $div->getAttribute('style');
            $match_count = preg_match('/background-image:(.*?).jpg/', $style, $matches);
            if ($match_count > 0) {
                array_push($arr[$i], $matches[0]);
                $cycle++;
            }
        }
        $i++;
    }

    echo json_encode($arr);

}




