window.onload = function() {
	var bar = $('#j_bar');
	bar.find('input').on('click', function() {
		var o = $(this);
		var cls = o.attr('class');
		invoke(cls);
	});
	bar.find('input').eq(0).click(); //初始化
}

var invoke = function(tag) {
	var can = document.getElementById('can');
	if (can.getContext) {
		var ctx = can.getContext('2d');
		var img = new Image();
		img.src = "1.jpg";
		img.onload = function() {
			if (can.width > 0 && can.height > 0) {
				ctx.beginPath();
				ctx.drawImage(img, 0, 0, 800, 1200);
				var imageData = ctx.getImageData(0, 0, can.width, can.height);
				switch (tag) {
					case "grayscale":
						jsonCanvasFilter.grayscale(imageData);
						break;
					case "sepia":
						jsonCanvasFilter.sepia(imageData);
						break;
					case "red":
						jsonCanvasFilter.red(imageData);
						break;
					case "green":
						jsonCanvasFilter.green(imageData);
						break;
					case "blue":
						jsonCanvasFilter.blue(imageData);
						break;
					case "brightness":
						jsonCanvasFilter.brightness(imageData, 100);
						break;
					case "invert":
						jsonCanvasFilter.invert(imageData);
						break;
					case "mirror":
						jsonCanvasFilter.mirror(imageData);
						break;
					case "sculpture":
						jsonCanvasFilter.sculpture(imageData);
						break;
					case "relief":
						jsonCanvasFilter.relief(imageData);
						break;
					case "blur":
						jsonCanvasFilter.blur(imageData);
						break;
					default:
						break;

				}
				ctx.putImageData(imageData, 0, 0);
				ctx.closePath();

			}
		}

	}
}