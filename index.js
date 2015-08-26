'use strict';

var constValues = require("./constValues.json");
var Component = require('./Component');

function ImagePublish(controllerCallBacks, dataStore) {
	Component.call(this, controllerCallBacks, dataStore, [constValues.componentOutputTypes.imageURL]);
  this._controllerCallBacks = controllerCallBacks;
}

ImagePublish.prototype = Object.create(Component.prototype);

ImagePublish.prototype.setProvider = function(fbProvider) {
	var self = this;
  fbProvider.post('/me/photos', {
    url: this._inputs[constValues.componentOutputTypes.imageURL]
  }, function(err, res) {
    if (err) {
      self._controllerCallBacks.error(err);
      return;
    }
    self._controllerCallBacks.finish();
    console.log('success');
  });
};

ImagePublish.prototype.execute = function() {
	this._controllerCallBacks.providerRequest(constValues.providerTypes.facebook);
};

module.exports = ImagePublish;
