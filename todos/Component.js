sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "com/kalyaka/test/controller/HelloDialog",
    "sap/ui/Device"
], function (UIComponent, JSONModel, HelloDialog, Device) {
    "use strict";

    return UIComponent.extend("com.kalyaka.test.Component", {
        metadata: {
            manifest: "json"
        },

        init: function() {
            UIComponent.prototype.init.apply(this, arguments);

            let oData = {
                recipient: {
                    name: "Test user"
                }
            };

            let oModel = new JSONModel(oData);
            this.setModel(oModel);

            this._helloDialog = new HelloDialog(this.getAggregation("rootControl"));

            this.getRouter().initialize();

            let oDeviceModel = new JSONModel(Device);
            oDeviceModel.setDefaultBindingMode("OneWay");
            this.setModel(oDeviceModel, "device");
        },

        // getContentDensityClass: function () {
        //     if (!this._contentDensityClass) {
        //         if (!sap.ui.Device.support.touch) {
        //             this._contentDensityClass = "sapUiSizeCompact";
        //         } else {
        //             this._contentDensityClass = "sapUiSizeCozy";
        //         }
        //     }
        //     return this._contentDensityClass;
        // },

        openHelloDialog: function () {
            this._helloDialog.open();
        }
    });
});

