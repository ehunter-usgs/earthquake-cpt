'use strict';

var ModalView = require('mvc/ModalView'),
    Xhr = require('util/Xhr');


var coneLink,
    shakeLink,

    openDialog;

coneLink = document.querySelector('[rel="cone"]');
shakeLink = document.querySelector('[rel="shaking"]');

openDialog = function (link) {
  Xhr.ajax({
    url: link,
    success: function (content) {
      var container = document.createElement('div');
      container.innerHTML = content;
      ModalView(
        container.querySelector('.content'),
        {
          title: container.querySelector('title').innerHTML,
          buttons: null
        }
      ).show();
    }
  });
};

coneLink.addEventListener('click', function (evt) {
  openDialog(this.href);
  evt.preventDefault();
  return false;
});

shakeLink.addEventListener('click', function (evt) {
  openDialog(this.href);
  evt.preventDefault();
  return false;
});
