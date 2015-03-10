<?php

// Does database query. Sets a $results associative array of returned data

include_once '../conf/config.inc.php';

if (!function_exists('data_file_exists')) {

  function data_file_exists ($result, $extension) {
    $file = $GLOBALS['DATA_DIR'] . '/' . $extension . '/' . $result['sounding'] . '.' .
        $extension;
    return file_exists($file);
  }
}

try {
  $allowed = '/^[\w-.]+$/';
  $region = param('region', '');

  if (!preg_match($allowed, $region)) {
    $region = '';
    $db_filter = '%';
  } else {
    $db_filter = strtolower($region);
  }


  $statement = $db->prepare('
    SELECT
      *
    FROM
      nca_cptdata
    WHERE
      map
    LIKE
      :filter
    ORDER BY
      date
  ');

  $statement->bindValue(':filter', $db_filter, PDO::PARAM_STR);
  $statement->execute();

  $results = array_map(function ($result) {
    $result['hasPdf'] = data_file_exists($result, 'pdf');
    $result['hasTxt'] = data_file_exists($result, 'txt');
    return $result;
  }, $statement->fetchAll(PDO::FETCH_ASSOC));

  $statement->closeCursor();
} catch (Exception $e) {
  print_r($e); // TODO :: Make this better
}
