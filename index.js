// 設定變數
var googleKeepURL = "keep.google.com";

// 載入 library
var self = require("sdk/self");
var tabs = require("sdk/tabs");

// 監聽所有 tabs
tabs.on("ready", logURL);
function logURL(tab) {
    if (tab.url.search(googleKeepURL) > -1) {
        tab.attach({
            contentScriptFile: self.data.url("color-adjuster.js")
        });
    }
}
