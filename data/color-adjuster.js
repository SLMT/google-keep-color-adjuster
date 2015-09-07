
// 定義要替換的顏色
var replaceMap = {
	"250, 250, 250" : "250, 250, 250", // Default
	"255, 109, 63" : "241, 169, 160", // Red
	"255, 155, 0" : "244, 179, 80", // Orange
	"255, 218, 0" : "255, 231, 91", // Yellow
	"184, 196, 201" : "184, 196, 201", // Gray
	"63, 195, 255" : "92, 151, 191", // Bule
	"28, 232, 181" : "162, 222, 208", // Teal
	"149, 214, 65" : "189, 228, 101" // Green
};

// Regular Expression
// 規則：數字 + [空白或逗號] + 數字 + [空白或逗號] + 數字
var rgbColorPattern = /\d+[\s,]+\d+[\s,]+\d+/;

// 一些指標性名稱
var backgroundColorClass = "IZ65Hb-TBnied";

// 每秒鐘檢查一次
var checkTimer = setInterval(checkFunction, 1000);
//console.log("Start checking...");

function checkFunction() {
	// 檢查目標是否有出現
	var backgrounds = document.getElementsByClassName(backgroundColorClass);
	if (backgrounds != null) {
		adjustColors(backgrounds);

		// 替換成功之後就不再檢查
		//clearInterval(checkTimer);
	}
}

function adjustColors(backgrounds) {

	// 逐一替換每個 note 的背景
	for (var i = 0; i < backgrounds.length; i++) {
		var originalColor = backgrounds[i].style.backgroundColor.match(rgbColorPattern);
		var newColor = replaceMap[originalColor];
		backgrounds[i].style.backgroundColor = backgrounds[i].style.backgroundColor.replace(originalColor, newColor);
	}

	//console.log("Color are adjusted.");
}
