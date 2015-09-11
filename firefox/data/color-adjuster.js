
// 定義要替換的顏色
// Color Names: Default, Red, Orange, Yellow, Gray, Bule, Teal, Green
var originalColors = ["250, 250, 250", "255, 109, 63", "255, 155, 0", "255, 218, 0", "184, 196, 201", "63, 195, 255", "28, 232, 181", "149, 214, 65"];
var newColors = ["250, 250, 250", "241, 169, 160", "244, 179, 80", "255, 231, 91", "184, 196, 201", "92, 151, 191", "162, 222, 208", "189, 228, 101"];

// Regular Expression
// 規則：數字 + [空白或逗號] + 數字 + [空白或逗號] + 數字
var rgbColorPattern = /\d+[\s,]+\d+[\s,]+\d+/;

// 一些指標性名稱
var backgroundColorClass = "IZ65Hb-TBnied";

// 每秒鐘檢查一次
var checkTimer = setInterval(checkFunction, 1000);
//console.log("Start checking...");

// 換色功能是否啟動 (一開始 index.js 會送一次更新訊息來更新初始值)
var enableAdjusting = false;

function getBackgrounds() {
	return document.getElementsByClassName(backgroundColorClass);
}

function checkFunction() {
	// 檢查目標是否有出現
	var backgrounds = getBackgrounds();
	if (backgrounds != null && backgrounds.length > 0) {
		if (enableAdjusting)
			adjustColors(backgrounds, 1);

		// 替換成功之後就不再檢查
		//clearInterval(checkTimer);
	}
}

// 替換顏色
// changedTo: 1 = 換新顏色， -1 = 換舊顏色
function adjustColors(backgrounds, changedTo) {

	// console.log("Background length: " + backgrounds.length);

	// 逐一替換每個 note 的背景
	for (var i = 0; i < backgrounds.length; i++) {
		var results = backgrounds[i].style.backgroundColor.match(rgbColorPattern);
		var color = results[0];
		// console.log("Current color: " + color);

		// 決定新顏色
		if (changedTo == 1) {
			var index = originalColors.indexOf(color);
			// console.log("Index of old color: " + index);
			if (index < 0)
				continue;
			color = newColors[index];
		} else {
			var index = newColors.indexOf(color);
			// console.log("Index of new color: " + index);
			if (index < 0)
				continue;
			color = originalColors[index];
		}

		// 套用新顏色
		backgrounds[i].style.backgroundColor = "rgb(" + color + ")";
	}

	// console.log("Adjust colors: " + changedTo);
}

// 監聽 script 啟動狀態
self.port.on("enableAdjusting", function(newStatus) {
	enableAdjusting = newStatus;

	// console.log("New status: " + newStatus + " types of: " + typeof newStatus);

	// 強制換色
	if (newStatus)
		adjustColors(getBackgrounds(), 1);
	else
		adjustColors(getBackgrounds(), -1);
});
