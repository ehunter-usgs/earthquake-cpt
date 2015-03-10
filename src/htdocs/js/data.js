// var CPT = function() {

var CPT = require('./CPT');

CPT({
  container: document.querySelector('#map')
});

// 	var map, bounds, ctrl_layers, soundings;
//
// 	// $(document).ready(function() {
// 	// 	initMap();
// 	// });
//
// 	function initMap() {
// 		var ctrl_scale;
//
// 		map = L.map('map', {
// 			scrollWheelZoom: false
// 		});
// 		bounds = new L.LatLngBounds();
// 		ctrl_layers = L.control.layers().addTo(map);
// 		ctrl_scale = L.control.scale().addTo(map);
//
// 		addBaseLayers();
// 		addMarkersLayer();
// 	}
//
// 	function addBaseLayers() {
// 		var mapq_osm, mapq_sat;
//
// 		// Mapquest base layers
// 		mapq_osm = L.tileLayer('http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
// 			_id: 'mapq_osm',
// 			maxZoom: 18,
// 			subdomains: ['otile1','otile2','otile3','otile4'],
// 			attribution: 'Maps provided by <a href="http://open.mapquest.com" target="_blank">MapQuest</a>, <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> and contributors.'
// 		}).addTo(map);
//
// 		mapq_sat = L.tileLayer('http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
// 			_id: 'mapq_sat',
// 			maxZoom: 18,
// 			subdomains: ['otile1','otile2','otile3','otile4'],
// 			attribution: 'Maps provided by <a href="http://open.mapquest.com" target="_blank">MapQuest</a> (portions courtesy NASA/JPL and USDA).'
// 		});
//
// 		// Add layers to layer controller
// 		ctrl_layers.addBaseLayer(mapq_osm, 'Map (Mapquest)')
// 			.addBaseLayer(mapq_sat, 'Satellite');
// 	}
//
// 	function addMarkersLayer() {
// 		var cluster, markers, marker, popup, count = soundings.metadata.count;
//
// 		cluster = new L.MarkerClusterGroup({
// 			showCoverageOnHover: false,
// 			maxClusterRadius: 60,
// 			disableClusteringAtZoom: 9
// 		});
//
// 		markers = L.geoJson(soundings, {
// 			pointToLayer: function(feature, latlng) {
// 				bounds.extend(latlng);
// 				marker = L.circleMarker(latlng, {
// 					radius: 8,
// 					color: '#c00',
// 					opacity: 0.5,
// 					weight: 2,
// 					fillColor: '#c00',
// 					fillOpacity: 0.2
// 				});
// 				cluster.addLayer(marker);
// 				return marker;
// 			},
// 			onEachFeature: function(feature, layer) {
// 				popup = [
// 					'<div class="bubble"><h1>',
// 					feature.properties.sounding,
// 					'<span>',
// 					feature.properties.date,
// 					'</span></h1><p>Depth: ',
// 					feature.properties.depth,
// 					'm</p><h2>Download Data</h2><ul><li><a href="/research/cpt/data/pdf/',
// 					feature.properties.sounding,
// 					'.pdf" target="new">Processed Data</a> (Adobe .pdf)</li><li><a href="/research/cpt/data/txt/',
// 					feature.properties.sounding,
// 					'.txt" target="new">Raw Data</a> (ASCII .txt)</li></ul></div>'
// 				].join('');
// 				layer.bindPopup(popup);
// 			}
// 		});
// 		map.fitBounds(bounds);
// 		$('#numstations').html(count + ' soundings on this map');
//
// 		// either display indiv. markers or cluster
// 		if (count > 300) {
// 			map.addLayer(cluster);
// 		} else {
// 			map.addLayer(markers);
// 		}
// 	}
//
// 	// expose public methods, etc outside protected 'CPT' namespace
// 	var pub = {};
// 	pub.storeSoundings = function(geojson) { // called via jsonp callback in HTML source
// 		soundings = geojson;
// 	};
// 	return pub;
//
// }();
