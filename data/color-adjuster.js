
// 顏色依序是：Default, Red, Orange, Yellow, Gray, Bule, Teal, Green
var oldColors = ["250, 250, 250", "255, 109, 63", "255, 155, 0", "255, 218, 0", "184, 196, 201", "63, 195, 255", "28, 232, 181", "149, 214, 65"];
var newColors = ["250, 250, 250", "241, 169, 160", "244, 179, 80", "255, 231, 91", "184, 196, 201", "92, 151, 191", "162, 222, 208", "189, 228, 101"];

// 一些指標性名稱
var targetContainerName = "neVct-SX9D7d-ObfsIf";

// 每秒鐘檢查一次
var checkTimer = setInterval(checkFunction, 1000);
console.log("Start checking...");

function checkFunction() {
	// 檢查是否目標 container
	var container = document.getElementsByClassName(targetContainerName)[0];
	if (container != null) {
		adjustColors(container);
		clearInterval(checkTimer);
	}
}

function adjustColors(container) {
	var tmp = container.innerHTML;

	// 替換目標顏色 (g 代表 global，這樣才會替換所有 match 的字串)
	for (var i = 0; i < oldColors.length; i++)
		tmp = tmp.replace(new RegExp(oldColors[i], 'g'), newColors[i]);

	container.innerHTML = tmp;
	console.log("Color are adjusted.");
}
