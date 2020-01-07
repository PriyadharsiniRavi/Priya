sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, MessageBox, JSONModel) {
	"use strict";

	return Controller.extend("CSVtoJSON.CSVtoJSON.controller.FileUpload", {

		handleUpload: function (oEvent) {
			var that = this;
			var oFile = oEvent.getParameter("files")[0];
			if (oFile && window.FileReader) {
				var reader = new FileReader();
				reader.onload = function (evt) {
					var strCSV = evt.target.result; //string in CSV 
					that.csvJSON(strCSV);
				};
				reader.readAsText(oFile);
			}
		},

		csvJSON: function (csv) {
			var oTable = this.getView().byId("jsonTable");
			var oUploader = this.getView().byId("fileUploader");
			var lines = csv.split("\n");
			var result = [];
			var headers = lines[0].split(",");
			for (var i = 1; i < lines.length; i++) 
			{
				var obj = {};
				var currentline = lines[i].split(",");
				for (var j = 0; j < headers.length; j++) {
					obj[headers[j]] = currentline[j];
				}
				result.push(obj);
			}
			var oStringResult = JSON.stringify(result);
			var oFinalResult = JSON.parse(oStringResult.replace(/\\r/g, ""));
			//sap.ui.getCore().getModel().setProperty("/", oFinalResult);
			console.log("JSON format");
			console.log(oFinalResult);
			console.log(result);
			var oModel = new JSONModel();
			oModel.setData({
				data: oFinalResult
			});
			this.getView().setModel(oModel, "jsonModel");
		}

	});
});