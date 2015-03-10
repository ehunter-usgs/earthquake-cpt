<?php

if (!isset($TEMPLATE)) {
  include_once '../conf/config.inc.php';
  include_once 'functions.inc.php';

  $HEAD = '
    <link rel="stylesheet" href="' . $MOUNT_PATH . '/css/data.css"/>
  ';

  $region = '';
  if (isset($_GET['region']) && preg_match("/^\w+$/", $_GET['region'])) {
    $region = $_GET['region'];
  }
  ($region == '' ? $db_filter = '%' : $db_filter = strtolower($region));

  $display = 'map';
  if (isset($_GET['display']) && preg_match("/^(table|map)$/", $_GET['display'])) {
    $display = $_GET['display'];
  }


  // array of regions
  include_once 'regions.inc.php';

  $NAVIGATION = '';
  foreach ($regions as $key => $value) {
    if (is_array($value)) {
      $children = '';
      foreach ($value as $child_key => $child_value) {
        $children .= navItem($MOUNT_PATH . '/data/' . $child_key . '/',
            $child_value);
      }
      $NAVIGATION .= navGroup($key, $children);
    } else {
      if ($key === '') {
        if ($region === '') {
          $NAVIGATION .= '<strong>' . $value . '</strong>';
        } else {
          $NAVIGATION .= '<a href="' . $MOUNT_PATH . '/data/">' . $value .
              '</a>';
        }
      } else {
        $NAVIGATION .= navItem($MOUNT_PATH . '/data/' . $key . '/', $value);
      }
    }
  }

  if ($display == 'map') {

    $FOOT = '
      <script>var DATA_URL = \'' . $MOUNT_PATH . '/getStationList.json.php?region=' . $region . '\';</script>
      <script src="' . $MOUNT_PATH . '/js/data.js"></script>
    ';

    $html = sprintf ('<div id="map" class="%s"></div>', $region);
    $html .= '<p id="numstations"></p>';
    $html .= '<p><a href="./table/">View data in tabular format</a> &raquo;</p>';
    if ($region == 'alameda') {
      $html .= '<h2>See Also</h2><p><a href="/regional/nca/alameda/">Liquefaction Hazard and Shaking Maps</a> for Alameda County, CA</p>';
    }

  } else {
    include_once 'db.inc.php';
    $html = '<table id="soundings" cellspacing="1" class="tabular">';
    $html .= '<tr><th>Sounding</th><th>Download</th><th>Date</th><th>Depth (m)</th><th>Longitude</th><th>Latitude</th><th>V,30 (m/s)</th></tr>';

    foreach ($results as $result) {
      if ($result['hasPdf']) {
        $pdf = sprintf('<a href="%s/data/pdf/%s.pdf">Adobe .pdf</a>',
            $MOUNT_PATH, $result['sounding']);
      } else {
        $pdf = 'Adobe .pdf';
      }

      if ($result['hasTxt']) {
        $txt = sprintf('<a href="%s/data/txt/%s.txt">ASCII .txt</a>',
            $MOUNT_PATH, $result['sounding']);
      } else {
        $txt = 'ASCII .txt';
      }

      $html .= sprintf('
        <tr>
          <td>%s</td>
          <td>%s | %s</td>
          <td>%s</td>
          <td>%s</td>
          <td>%s</td>
          <td>%s</td>
          <td>%s</td>
        </tr>',
        $result['sounding'],
        $pdf,
        $txt,
        $result['date'],
        $result['depth'],
        $result['lon'],
        $result['lat'],
        $result['v30']
      );
    }

    $html .= '</table>';
    $html .= '<p>&laquo; <a href="../">Back to map view of data</a></p>';
  }

  // find region display name
  $regionDisplay = null;
  foreach ($regions as $k1 => $v1) {
    if ($k1 === $region) {
      $regionDisplay = $v1;
      break;
    }

    if (is_array($v1)) {
      foreach ($v1 as $k2 => $v2) {
        if ($k2 === $region) {
          $regionDisplay = $v2;
          break;
        }
      }
    }
  }

  $TITLE = sprintf('%s of CPT Data<span>:</span> <strong>%s</strong>',
      ucfirst($display), $regionDisplay);

  include_once 'template.inc.php';
}
  print $html;

?>
