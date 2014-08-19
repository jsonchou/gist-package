$(function() {
	var arrow = document.getElementById('j_arrowBox');

	//arrow
	if (arrow.getContext) {
		var ctx = arrow.getContext('2d');

		ctx.beginPath(); // 开始路径绘制

		//左箭头
		ctx.moveTo(30, 50); // 设置路径起点，坐标为(20,20)
		ctx.lineTo(0, 80); // 绘制一条到(200,20)的直线
		ctx.lineTo(30, 110); // 绘制一条到(200,20)的直线

		//右箭头
		ctx.moveTo(90, 50); // 设置路径起点，坐标为(20,20)
		ctx.lineTo(120, 80); // 绘制一条到(200,20)的直线
		ctx.lineTo(90, 110); // 绘制一条到(200,20)的直线

		//上箭头
		ctx.moveTo(30, 50); // 设置路径起点，坐标为(20,20)
		ctx.lineTo(60, 20); // 绘制一条到(200,20)的直线
		ctx.lineTo(90, 50); // 绘制一条到(200,20)的直线

		//下箭头
		ctx.moveTo(30, 110); // 设置路径起点，坐标为(20,20)
		ctx.lineTo(60, 140); // 绘制一条到(200,20)的直线
		ctx.lineTo(90, 110); // 绘制一条到(200,20)的直线

		ctx.lineWidth = 1.0; // 设置线宽
		ctx.strokeStyle = "#000"; // 设置线的颜色
		ctx.stroke(); // 进行线的着色，这时整条线才变得可见

		ctx.closePath();

	}

	var rect = document.getElementById('j_rectBox');
	//rect
	if (rect.getContext) {
		var ctx = rect.getContext('2d');
		ctx.fillStyle = '#000';
		ctx.fillRect(50, 50, 200, 100);

		ctx.strokeStyle = 'red';
		ctx.lineWidth = 5.0;
		ctx.strokeRect(10, 10, 200, 100);
		ctx.clearRect(100, 80, 50, 50);
		ctx.closePath();

	}

	var text = document.getElementById('j_textBox');
	//text
	if (text.getContext) {
		var ctx = text.getContext('2d');
		ctx.font = "Bold 50px impact";
		ctx.textAlign = "left";
		ctx.fillStyle = "#000";
		ctx.fillText('Hellow Canvas!', 0, 50);
		ctx.strokeText("Hellow Canvas!", 2, 52);
		ctx.closePath();

	}

	var arc = document.getElementById('j_arcBox');
	//arc
	if (arc.getContext) {
		var ctx = arc.getContext('2d');
		ctx.beginPath();
		ctx.arc(120, 60, 40, 0, Math.PI * 2 / 3, true);
		ctx.fillStyle = "#000";
		ctx.fill();
		ctx.shadowOffsetX = 5; // 设置水平位移
		ctx.shadowOffsetY = 5; // 设置垂直位移
		ctx.shadowBlur = 5; // 设置模糊度
		ctx.shadowColor = "rgba(0,0,0,0.9)"; // 设置阴影颜色
		ctx.closePath();

		ctx.beginPath();
		ctx.arc(260, 60, 50, 0, Math.PI * 2, true);
		ctx.lineWidth = 5.0;
		ctx.strokeStyle = "#fff";
		ctx.stroke();
		ctx.closePath();

	}


	var gradient = document.getElementById('j_gradientBox');
	//gradient
	if (gradient.getContext) {
		var ctx = gradient.getContext('2d');
		var gra = ctx.createLinearGradient(0, 0, 250, 50);
		gra.addColorStop(0, "#fff");
		gra.addColorStop(1, "#000");
		ctx.fillStyle = gra;
		ctx.fillRect(0, 30, 500, 160);
		ctx.closePath();

	}


	var img = document.getElementById('j_imageBox');
	//img
	if (img.getContext) {
		var ctx = img.getContext('2d');
		ctx.beginPath();
		var image=new Image();
		image.src="http://resource.uzai.com/content/common/logo.gif";
		ctx.drawImage(image,130,30, 209, 59);
		ctx.closePath();
	}


	//animation demo
	var anim = document.getElementById('j_animBox');
	if (anim.getContext) {

		var posX = 20;
		var posY = 20;

		var ctxa = anim.getContext('2d');
		ctxa.beginPath();
		ctxa.fillStyle = "#000";
		ctxa.fillRect(0, 0, ctxa.width, ctxa.height);
		setInterval(function() {

			posX += 1;
			posY += 0.25;

			if (posX > 60) {
				posX -= 1;
			}


			if (posY > 100) {
				posY -= 0.5;
			}

			ctxa.fillStyle = "#fff";
			ctxa.arc(posX, posY, 3, 0, Math.PI * 2, true);
			ctxa.closePath();
			ctxa.fill();
		}, 30);
		ctxa.closePath();
		
	}
	
	//ball demo
	var ball = document.getElementById('j_ballBox');
	if (ball.getContext) {
		var ctxb=ball.getContext("2d");

		var posX = 10;
		var posY = 10;


		var x=10;
		var y=-10;
		var gravity=1;

		ctxb.beginPath();
		ctxb.fillStyle = "#000";
		ctxb.fillRect(0, 0, ctxb.width, ctxb.height);

		setInterval(function() {
			posX += x;
			posY += y;

			if (posY > ctxb.height * 0.75) {
				y *= -0.6;
				x *= 0.75;
				posY = ctxb.height * 0.75;
			}

			y += gravity;

			ctxb.beginPath();
			ctxb.fillStyle = "#fff";

			ctxb.arc(posX, posY, 5, 0, Math.PI * 2, true);
			ctxb.closePath();
			ctxb.fill();

		}, 30);
		ctxb.closePath();
		 
	}












	


});