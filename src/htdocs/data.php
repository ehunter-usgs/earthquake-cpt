<?php

if (!isset($TEMPLATE)) {
  include_once '../conf/config.inc.php';

  $HEAD = '
    <link rel="stylesheet" href="css/data.css"/>
  ';
  $FOOT = '
    <script src="js/data.js"></script>
  ';

  // $STYLESHEETS = '/style.css,' .
  //   '/library/com/leaflet-0.6.4/leaflet.css,' .
  //   '/library/com/leaflet-0.6.4/MarkerCluster.Default.css,' .
  //   '/library/com/leaflet-0.6.4/MarkerCluster.css';

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

  if ($display == 'map') {

    // $SCRIPTS = '/library/com/leaflet-0.6.4/leaflet.min.js,' .
    //   '/library/com/leaflet-0.6.4/leaflet.markercluster.min.js,' .
    //   'script.js,' .
    //   '/research/cpt/getStationList.json.php?callback=CPT.storeSoundings&region=' . $region;
    //


    $html = sprintf ('<div id="map" class="%s"></div>', $region);
    $html .= '<p id="numstations"></p>';
    $html .= '<p><a href="./table/">View data in tabular format</a> &raquo;</p>';
    if ($region == 'alameda') $html .= '<h2>See Also</h2><p><a href="/regional/nca/alameda/">Liquefaction Hazard and Shaking Maps</a> for Alameda County, CA</p>';

  } else {

    // query db w/ region parameter
    $query_rsPoints = sprintf("SELECT * FROM nca_cptdata WHERE `map` LIKE '%s' ORDER BY sounding ASC", $db_filter);
    $rsPoints = mysql_query($query_rsPoints, $db) or die(mysql_error());

    $html = '<table id="soundings" cellspacing="1" class="tabular">';
    $html .= '<tr><th>Sounding</th><th>Download</th><th>Date</th><th>Depth (m)</th><th>Longitude</th><th>Latitude</th><th>V,30 (m/s)</th></tr>';
    while ($row_rsPoints = mysql_fetch_assoc($rsPoints)) {
      $pdf_file = sprintf('%s/pdf/%s.pdf', $_SERVER['REDIRECT_APP_DATA_DIR'], $row_rsPoints['sounding']);
      $pdf = 'Adobe .pdf';
      if (file_exists($pdf_file)) {
        $pdf = sprintf('<a href="%s/data/pdf/%s.pdf">Adobe .pdf</a>', $_SERVER['REDIRECT_APP_URL_PATH'], $row_rsPoints['sounding']);
      }
      $txt_file = sprintf('%s/txt/%s.txt', $_SERVER['REDIRECT_APP_DATA_DIR'], $row_rsPoints['sounding']);
      $txt = 'ASCII .txt';
      if (file_exists($txt_file)) {
        $txt = sprintf('<a href="%s/data/txt/%s.txt">ASCII .txt</a>', $_SERVER['REDIRECT_APP_URL_PATH'], $row_rsPoints['sounding']);
      }
      $html .= sprintf ('<tr><td>%s</td><td>%s | %s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>',
        $row_rsPoints['sounding'],
        $pdf,
        $txt,
        $row_rsPoints['date'],
        $row_rsPoints['depth'],
        $row_rsPoints['lon'],
        $row_rsPoints['lat'],
        $row_rsPoints['v30']
      );
    }
    $html .= '</table>';
    $html .= '<p>&laquo; <a href="../">Back to map view of data</a></p>';

  }

  // flatten regions array
  $regions_flat = array();
  array_walk_recursive($regions, function($v, $k) use (&$regions_flat) {
    $regions_flat[$k] = $v;
  });

  $TITLE = sprintf('%s of CPT Data<span>:</span> <strong>%s</strong>',
      ucfirst($display), $regions_flat[$region]);

  include_once 'template.inc.php';
}
  print $html;

?>
