<?php

if (isset($_GET['search'])) {

    if (count($_GET['search']) < 4) {

        $search = $_GET['search'];

        $arr = array();

        foreach ($search as $count) {
            $arrays[] = $count;
            array_push($arr, $arrays);
            $arrays = [];
        }

        $url = 'https://www.flickr.com/search/?text=';
        libxml_use_internal_errors(true);

        $i = 0;
        foreach ($search as $count) {
            $content = file_get_contents($url . $count);
            $dom = new domDocument;
            $dom->loadHTML($content);
            $divs = $dom->getElementsByTagName('div');

            $cycle = 0;
            foreach ($divs as $div) {
                $style = $div->getAttribute('style');
                $match_count = preg_match('/background-image:(.*?).jpg/', $style, $matches);
                if ($match_count > 0) {
                    array_push($arr[$i], $matches[0]);
                    $cycle++;
                }
                if ($cycle == 5) {
                    break;
                }
            }
            $i++;
        }

        echo json_encode($arr);

    }
    else{
        echo json_encode("Please Write The Digit Up To Three");
    }

}
else{
    echo json_encode("Pleace Wait Correct");
}
