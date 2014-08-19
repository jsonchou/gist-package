/*!
 * jsonchou canvas filter
 * v: 0.1
 * d: 2014-8-19
*/

var jsonCanvasFilter = {
	//克隆
	_clone: function(imgData) {

		var d = imgData.data;
		var width = imgData.width;
		var height = imgData.height;

		var node=document.createElement('canvas');
		node.setAttribute('id','cloneCanvas')
		document.body.appendChild(node);
		if (node.getContext) {
			var ctx = node.getContext('2d');
			var cloneImgData = ctx.createImageData(width, height);
			cloneImgData.data.set(d);
			return cloneImgData;
		}
		return "";
	},
	//清除克隆节点
	_clearClone: function() {
		var node = document.getElementById('cloneCanvas');
		if (node) {
			document.body.removeChild(node);
		}
	},
	//灰度效果
	grayscale: function(imgData) {

		var d = imgData.data;

		for (var i = 0; i < d.length; i += 4) {
			var r = d[i];
			var g = d[i + 1];
			var b = d[i + 2];
			d[i] = d[i + 1] = d[i + 2] = (r + g + b) / 3;
		}

		return imgData;

	},

	//复古效果
	sepia: function(imgData) {

		var d = imgData.data;

		for (var i = 0; i < d.length; i += 4) {
			var r = d[i];
			var g = d[i + 1];
			var b = d[i + 2];
			d[i] = (r * 0.393) + (g * 0.769) + (b * 0.189); // red
			d[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168); // green
			d[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131); // blue
		}

		return imgData;

	},

	//红色蒙版效果
	red: function(imgData) {

		var d = imgData.data;

		for (var i = 0; i < d.length; i += 4) {
			var r = d[i];
			var g = d[i + 1];
			var b = d[i + 2];
			d[i] = (r + g + b) / 3; // 红色通道取平均值
			d[i + 1] = d[i + 2] = 0; // 绿色通道和蓝色通道都设为0
		}

		return imgData;

	},

	//绿色蒙版效果
	green: function(imgData) {

		var d = imgData.data;

		for (var i = 0; i < d.length; i += 4) {
			var r = d[i];
			var g = d[i + 1];
			var b = d[i + 2];
			d[i + 1] = (r + g + b) / 3; // 绿色通道取平均值
			d[i] = d[i + 2] = 0; // 红色通道和蓝色通道都设为0
		}
		return imgData;

	},

	//蓝色蒙版效果
	blue: function(imgData) {

		var d = imgData.data;

		for (var i = 0; i < d.length; i += 4) {
			var r = d[i];
			var g = d[i + 1];
			var b = d[i + 2];
			d[i + 2] = (r + g + b) / 3; // 蓝色通道取平均值
			d[i] = d[i + 1] = 0; // 红色通道和绿色通道都设为0
		}

		return imgData;

	},

	//亮度效果
	brightness: function(imgData, delta) {

		var d = imgData.data;

		for (var i = 0; i < d.length; i += 4) {
			d[i] += delta; // red
			d[i + 1] += delta; // green
			d[i + 2] += delta; // blue   
		}

		return imgData;

	},

	//反转效果
	invert: function(imgData) {

		var d = imgData.data;

		for (var i = 0; i < d.length; i += 4) {
			d[i] = 255 - d[i];
			d[i + 1] = 255 - d[i + 1];
			d[i + 2] = 255 - d[i + 2];
		}

		return imgData;

	},

	//镜像效果
	mirror: function(imgData) {
		var d = imgData.data;
		var width = imgData.width;
		var height = imgData.height;

		var cloneImgData = this._clone(imgData);
		var cd=cloneImgData.data;
		 
		for (var x = 0; x < width; x++) // column  
		{
			for (var y = 0; y < height; y++) // row  
			{

				// Index of the pixel in the array      
				var idx = (x + y * width) * 4;
				var midx = (((width - 1) - x) + y * width) * 4;

				// assign new pixel value      
				d[midx + 0] = cd[idx + 0]; // Red channel      
				d[midx + 1] = cd[idx + 1];; // Green channel      
				d[midx + 2] = cd[idx + 2];; // Blue channel      
				d[midx + 3] = 255; // Alpha channel      
			}
		}

		this._clearClone();
	},

	//雕刻效果
	sculpture:function(imgData){
		var d = imgData.data;
		var width = imgData.width;
		var height = imgData.height;

		var cloneImgData = this._clone(imgData);
		var cd=cloneImgData.data;

		for ( var x = 1; x < width-1; x++)   
        {      
            for ( var y = 1; y < height-1; y++)  
            {      
      
                // Index of the pixel in the array      
                var idx = (x + y * width) * 4;         
                var bidx = ((x-1) + y * width) * 4;  
                var aidx = ((x+1) + y * width) * 4;  
                  
                // calculate new RGB value  
                var nr = cd[bidx + 0] - cd[aidx + 0] + 128;  
                var ng = cd[bidx + 1] - cd[aidx + 1] + 128;  
                var nb = cd[bidx + 2] - cd[aidx + 2] + 128;  
                nr = (nr < 0) ? 0 : ((nr >255) ? 255 : nr);  
                ng = (ng < 0) ? 0 : ((ng >255) ? 255 : ng);  
                nb = (nb < 0) ? 0 : ((nb >255) ? 255 : nb);  
                  
                // assign new pixel value      
                d[idx + 0] = nr; // Red channel      
                d[idx + 1] = ng; // Green channel      
                d[idx + 2] = nb; // Blue channel      
                d[idx + 3] = 255; // Alpha channel      
            }  
        } 
        this._clearClone();

	},

	//浮雕效果 
	relief:function(imgData){
		var d = imgData.data;
		var width = imgData.width;
		var height = imgData.height;

		var cloneImgData = this._clone(imgData);
		var cd=cloneImgData.data;

		for ( var x = 1; x < width-1; x++)   
        {      
            for ( var y = 1; y < height-1; y++)  
            {      
      
                // Index of the pixel in the array      
                var idx = (x + y * width) * 4;         
                var bidx = ((x-1) + y * width) * 4;  
                var aidx = ((x+1) + y * width) * 4;  
                  
                // calculate new RGB value  
                var nr = cd[aidx + 0] - cd[bidx + 0] + 128;  
                var ng = cd[aidx + 1] - cd[bidx + 1] + 128;  
                var nb = cd[aidx + 2] - cd[bidx + 2] + 128;  
                nr = (nr < 0) ? 0 : ((nr >255) ? 255 : nr);  
                ng = (ng < 0) ? 0 : ((ng >255) ? 255 : ng);  
                nb = (nb < 0) ? 0 : ((nb >255) ? 255 : nb);  
                  
                // assign new pixel value      
                d[idx + 0] = nr; // Red channel      
                d[idx + 1] = ng; // Green channel      
                d[idx + 2] = nb; // Blue channel      
                d[idx + 3] = 255; // Alpha channel      
            }  
        }  
        this._clearClone();

	},

	//模糊效果
	blur: function(imgData) {
		var d = imgData.data;
		var width = imgData.width;
		var height = imgData.height;

		var cloneImgData = this._clone(imgData);
		var cd = cloneImgData.data;

        var sumred = 0.0;
        var sumgreen = 0.0; 
        var sumblue = 0.0;

        for ( var x = 0; x < width; x++) {      
            for ( var y = 0; y < height; y++) {      
      
                // Index of the pixel in the array      
                var idx = (x + y * width) * 4;         
                for(var subCol=-2; subCol<=2; subCol++) {  
                    var colOff = subCol + x;  
                    if(colOff <0 || colOff >= width) {  
                        colOff = 0;  
                    }  
                    for(var subRow=-2; subRow<=2; subRow++) {  
                        var rowOff = subRow + y;  
                        if(rowOff < 0 || rowOff >= height) {  
                            rowOff = 0;  
                        }  
                        var idx2 = (colOff + rowOff * width) * 4;      
                        var r = cd[idx2 + 0];      
                        var g = cd[idx2 + 1];      
                        var b = cd[idx2 + 2];  
                        sumred += r;  
                        sumgreen += g;  
                        sumblue += b;  
                    }  
                }  
                  
                // calculate new RGB value  
                var nr = (sumred / 25.0);  
                var ng = (sumgreen / 25.0);  
                var nb = (sumblue / 25.0);  
                  
                // clear previous for next pixel point  
                sumred = 0.0;  
                sumgreen = 0.0;  
                sumblue = 0.0;  
                  
                // assign new pixel value      
                d[idx + 0] = nr; // Red channel      
                d[idx + 1] = ng; // Green channel      
                d[idx + 2] = nb; // Blue channel      
                d[idx + 3] = 255; // Alpha channel      
            }  
        }  

		this._clearClone();

	}

}