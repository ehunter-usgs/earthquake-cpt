<?php

include_once '../conf/config.inc.php';
include_once 'functions.inc.php';

date_default_timezone_set('UTC');

include_Once 'db.inc.php'; // Do db query. Have

$soundings = array(
  'type' => 'FeatureCollection',
  'metadata' => array(
    'generated' => date('c'),
    'count' => count($results)
  ),
  'features' => array()
);

foreach ($results as $result) {
  $feature = array(
    'type' => 'Feature',
    'properties' => array(
      'date' => $result['date'],
      'sounding' => $result['sounding'],
      'map' => $result['map'],
      'depth' => $result['depth'],
      'v30' => $result['v30'],
    ),
    'geometry' => array(
      'type' => 'Point',
      'coordinates' => array(
        floatval($result['lon']),
        floatval($result['lat'])
      )
    ),
    'id' => intval($result['ID'])
  );

  array_push($soundings['features'], $feature);
}

$callback = param('callback', '');
if ($callback == '' || !preg_match($allowed, $callback)) {
  $callback = '';
}

// Create json object from array and display
$json = json_encode($soundings);

if ($callback) {
  header('Content-Type: text/javascript');
  printf ('%s(%s);', $callback, $json);
} else {
  header('Content-Type: application/json');
  print $json;
}
