/* global MOUNT_PATH, REGION */

var CPT = require('./CPT');

CPT({
  container: document.querySelector('#map'),
  baseUrl: MOUNT_PATH,
  dataUrl: MOUNT_PATH + '/getStationList.json.php',
  region: REGION
});
