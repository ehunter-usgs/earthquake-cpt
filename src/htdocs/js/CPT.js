'use strict';

var L = require('leaflet'),
    Xhr = require('util/Xhr');

require('leaflet.markercluster-src');


var CPT = function (options) {
  var _this,
      _initialize,

      _bounds,
      _cluster,
      _container,
      _ctrlLayers,
      _map,
      _markers,

      _addBaseLayers,
      _addMarkers,
      _fetchMarkers,
      _initMap;


  _this = {};

  _initialize = function (options) {
    _container = options.container || document.createElement('div');

    _initMap();
  };


  _addBaseLayers = function () {
    var osm,
        sat;

    osm = L.tileLayer('http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
      subdomains: ['otile1', 'otile2', 'otile3', 'otile4'],
      attribution: 'Maps provided by <a href="http://open.mapquest.com" ' +
          '>MapQuest</a>, ' +
          '<a href="http://www.openstreetmap.org/" ' +
          '>OpenStreetMap</a> and contributors.'
    }).addTo(_map);

    sat = L.tileLayer('http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
        subdomains: ['otile1', 'otile2', 'otile3', 'otile4'],
        attribution: 'Maps provided by <a href="http://open.mapquest.com" ' +
            '>MapQuest</a> (portions courtesy NASA/JPL and USDA).'
    });

    _ctrlLayers.addBaseLayer(osm, 'Map (Mapquest)')
        .addBaseLayer(sat, 'Satellite');
  };

  _addMarkers = function (markerData) {
    _cluster = new L.MarkerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 60,
      disableClusteringAtZoom: 9
    });

    _markers = L.geoJson(markerData, {
      pointToLayer: function (feature, latlng) {
        var marker;

        _bounds.extend(latlng);
        marker = L.circleMarker(latlng, {
          radius: 8,
          color: '#C00',
          opacity: 0.5,
          weight: 2,
          fillColor: '#C00',
          fillOpacity: 0.2
        });
        _cluster.addLayer(marker);
        return marker;
      },
      onEachFeature: function (feature, layer) {
        var props,
            sounding;

        props = feature.properties;
        sounding = props.sounding;

        layer.bindPopup([
          '<div class="bubble">',
            '<h1>',
              sounding,
              '<span>',
                props.date,
              '</span>',
            '</h1>',
            '<p>',
              '<h2>Download Data</h2>',
              '<ul>',
                '<li>',
                  '<a href="/reserach/cpt/data/pdf/',
                      sounding, '.pdf">Processed Data</a> (Adobe .pdf)',
                '</li>',
                '<li>',
                  '<a href="/research/cpt/data/txt/',
                      sounding, '.txt">Raw Data</a> (ASCII .txt)',
                '</li>',
              '</ul>',
            '</p>',
          '</div>'
        ].join(''));
      }
    });
    _map.fitBounds(_bounds);

    if (markerData.metadata.count > 300) {
      _map.addLayer(_cluster);
    } else {
      _map.addLayer(_markers);
    }
  };

  _fetchMarkers = function () {
    Xhr.ajax({
      url: 'getStationList.json.php',
      success: function (data) {
        _addMarkers(data);
      }
    });
  };

  _initMap = function () {
    _map = L.map(_container, {
      scrollWheelZoom: false
    });

    // seems like a bug in Leaflet implementation, need to use "new" form
    _bounds = new L.LatLngBounds();

    _ctrlLayers = L.control.layers().addTo(_map);
    L.control.scale().addTo(_map);

    _addBaseLayers();
    _fetchMarkers();
  };


  _initialize(options);
  options = null;
  return _this;
};

module.exports = CPT;
