// 預設設定
var settings = {
	enableAdjusting: true
};

// 預先訂好的字串
var SUCCESS_INFO = "設定已更新";

// 先取得某些 DOM Object
var statusInfo = document.getElementById("save_status");

// 讀取並顯示目前的設定
function restoreOptions() {
	// 讀取資料
	chrome.storage.sync.get(settings, function(items) {
		// 暫存設定
		settings.enableAdjusting = items.enableAdjusting;

		// 顯示設定
		document.getElementById("enable_check").checked = items.enableAdjusting;
    });
}

// 儲存設定
function saveOptions() {
	// 取得使用者的選擇
	settings.enableAdjusting = document.getElementById("enable_check").checked;

	// 儲存資料
	chrome.storage.sync.set(settings, function() {
		// 顯示成功訊息
		statusInfo.innerHTML = SUCCESS_INFO;
		setTimeout(function() {
			statusInfo.innerHTML = "";
		}, 2000);

		// 更新 content scripts 狀態
		sendOptionsChangedMessage(settings);
	});
}

// 送出 update 訊息給 content scripts
function sendOptionsChangedMessage(message) {
	chrome.tabs.query({
		url: "*://keep.google.com/*"
	}, function(tabs) {
		tabs.forEach(function(tab) {
			chrome.tabs.sendMessage(tab.id, message);
		});
	});
}

// 註冊一些事件的 listener
document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save_button").addEventListener("click", saveOptions);
