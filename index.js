'use strict';

let bbComponent = require('bb-component'),
    constValues = bbComponent.constValues,
    ComponentResult = bbComponent.ComponentResult,
    Component = bbComponent.Component;

class ImagePublish extends Component {
    constructor(controllerCallBacks) {
        super(controllerCallBacks, [constValues.componentOutputTypes.imageURL]);
    }

    _executeIfReady() {
        if (this._fbProvider && this._imageUrl) {
            this._fbProvider.post('/me/photos', {
                url: this._imageUrl
            }, (err, res) => {
                if (err) {
                    this._controllerCallBacks.error(err);
                    return;
                }
                this._controllerCallBacks.finish();
                console.log('success');
            });
        }
    }

    setProvider(fbProvider) {
        this._fbProvider = fbProvider;
        this._executeIfReady();
    }

    dataInput(imageUrl) {
        this._imageUrl = imageUrl;
        this._executeIfReady();
    }

    execute() {
        this._controllerCallBacks.providerRequest(constValues.providerTypes.facebook);
    }
}

module.exports = ImagePublish;
