// 設定變數
var googleKeepURL = "keep.google.com";

// 載入 library
var self = require("sdk/self");
var tabs = require("sdk/tabs");
var prefs = require("sdk/simple-prefs");

// 追蹤所有連結到使用中 Google Keep 頁面的 Workers
var workers = new Set();

// 監聽所有 tabs
tabs.on("ready", function(tab) {
    if (tab.url.search(googleKeepURL) > -1) {
        var worker = tab.attach({
            contentScriptFile: self.data.url("color-adjuster.js")
        });

        // 把載入完成的頁面加入 set
        workers.add(worker);
        // console.log("Add a new worker, set size: " + workers.size);

        // 讓頁面 unload 時自動把自己從 set 中刪除
        worker.on("detach", function() {
            workers.delete(worker);
            // console.log("Delete a worker, set size: " + workers.size);
        });
    }
});

// 注意 preferences 狀態
prefs.on("enableAdjusting", function(prefName) {
    // console.log("The 'enable' status has been changed to '" + prefs.prefs["enableAdjusting"] + "'");
    notifyAdjustingStatus(prefs.prefs["enableAdjusting"]);
});

// 通知 Google Keep 頁面設定狀態更新
function notifyAdjustingStatus(newStatus) {
    workers.forEach(function(worker) {
        worker.port.emit("enableAdjusting", newStatus);
    });
}
