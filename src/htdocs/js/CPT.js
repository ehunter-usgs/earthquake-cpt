'use strict';

var L = require('leaflet'),
    Xhr = require('util/Xhr');

require('leaflet.markercluster-src');


var CPT = function (options) {
  var _this,
      _initialize,

      _baseUrl,
      _bounds,
      _cluster,
      _container,
      _ctrlLayers,
      _map,
      _markers,
      _dataUrl,
      _region,

      _addBaseLayers,
      _addMarkers,
      _fetchMarkers,
      _initMap;


  _this = {};

  _initialize = function (options) {
    _baseUrl = options.baseUrl || '';
    _container = options.container || document.createElement('div');
    _dataUrl = options.dataUrl || 'getStationList.json.php';
    _region = options.region || '';

    _initMap();
  };


  _addBaseLayers = function () {
    var baseLayers = {};

    baseLayers.terrain = L.tileLayer('https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri and partners',
      subdomains: ['server', 'services']
    }).addTo(_map);

    baseLayers.greyscale = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">' +
        'OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">' +
        'CartoDB</a>',
      maxZoom: 19,
      subdomains: 'abcd'
    });

    _ctrlLayers.addBaseLayer(baseLayers.terrain, 'Terrain')
        .addBaseLayer(baseLayers.greyscale, 'Greyscale');
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
                  '<a href="', _baseUrl, '/data/pdf/',
                      sounding, '.pdf">Processed Data</a> (Adobe .pdf)',
                '</li>',
                '<li>',
                  '<a href="', _baseUrl, '/data/txt/',
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
      url: _dataUrl + '?region=' + _region,
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
