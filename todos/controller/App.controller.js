sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("com.kalyaka.test.controller.App", {
        onInit: function () {
            // this.getView().addStyleClass(
            //     this.getOwnerComponent().getContentDensityClass());
        },
        
        onOpenDialog: function () {
            this.getOwnerComponent().openHelloDialog();
        }
    });
});
