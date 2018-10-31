
$(document).ready(function(){
	// variable - canvas
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();
	
	// variable
	var play;
	var hide;
	var level;
	var score;
	var delay1 = Object(), delay2 = Object();
	
	var isDo1 = Object(), isDo2 = Object();
		
	var key1 = Object(), key2 = Object();
		
	var dest = Object();
	dest.X = 1;
	dest.R = 1;
	
	var dis = Object();
	
	var vTable1, cTable1, vTable2, cTable2;
	vTable1 = new Array();
	for(var i = 0; i <= 12; i++){
		vTable1[i] = new Array();
	}	
	cTable1 = new Array();
	for(var i = 0; i <= 12; i++){
		cTable1[i] = new Array();
	}
	vTable2 = new Array();
	for(var i = 0; i <= 12; i++){
		vTable2[i] = new Array();
	}	
	cTable2 = new Array();
	for(var i = 0; i <= 12; i++){
		cTable2[i] = new Array();
	}

	var P = function(){//x, y, main, sub, rotate, sx, sy){
		this.x = 4;
		this.y = 0;
		this.rotate = 1;
		this.main = Math.floor(Math.random()*3)+1;
		this.sub = Math.floor(Math.random()*3)+1;
		this.nextMain = Math.floor(Math.random()*3)+1;
		this.nextSub = Math.floor(Math.random()*3)+1;
		this.sx = 0;
		this.sy = 1;
		
		vTable1[this.y][this.x] = this.main;
		vTable1[this.y+1][this.x] = this.sub;
	};
	var p1 = new P(), p2 = new P();
	pUpdate(p1);
	pUpdate(p2);

	// img src
	var img = new Object();
	img.Red = new Image();
	img.Blue = new Image();
	img.Yellow = new Image();
	img.Green = new Image();
	img.Purple = new Image();
	img.Dis = new Image();
	img.Disview = new Image();
	img.Clear = new Image();
	img.Back = new Image();
	img.Red.src = "image/red.png";
	img.Blue.src = "image/blue.png";
	img.Yellow.src = "image/yellow.png";
	img.Green.src = "image/green.png";
	img.Purple.src = "image/purple.png";
	img.Dis.src = "image/dis.png";
	img.Disview.src = "image/disview.png";
	img.Clear.src = "image/clear.png";
	img.Back.src = "image/back.png";


	function startGame(){
		hide = false;
		play = true;
		animate();
	};

	function CompleteGame(){
		play = false
	};

	function init(){
		score = 0;
		delay1.Down = delay2.Down = 0;
		delay1.Left = delay2.Left = 0;
		delay1.Right = delay2.Right = 0;
		delay1.Rotate = delay2.Rotate = 0;
		delay1.Calc = delay2.Calc = 0;
		
		key1.Up = key2.Up = false;
		key1.Down = key2.Down = false;
		key1.Left = key2.Left = false;
		key1.Right = key2.Right = false;
		key1.Z = key2.Z = false;
		key1.X = key2.X = false;
		
		play = true;
		
		isDo1.Touch = isDo2.Touch = false;
		isDo1.Calc = isDo2.Calc = false;
		isDo1.Combo = isDo2.Combo = 0;
		isDo1.Clear = isDo2.Clear = 0;
		
		dis.a = dis.b = 0;
		
		initTable(vTable1, cTable1, 1);
		initTable(vTable1, cTable1, 2);
		initTable(vTable2, cTable2, 1);
		initTable(vTable2, cTable2, 2);
				
		if( level == null ) level = 1;
		else level++;
		
		p1.nextMain = Math.floor(Math.random()*3)+1;
		p1.nextSub = Math.floor(Math.random()*3)+1;
		p2.nextMain = Math.floor(Math.random()*3)+1;
		p2.nextSub = Math.floor(Math.random()*3)+1;
		pInit(p1, vTable1, level);
		pInit(p2, vTable2, level);
		
		alert("level" + level + " Start!");
		
		startGame();
	};
	
	/* 키 입력 */
	document.onkeydown = function(e){
		var press_key = e || window.event;
		switch (press_key.keyCode) {
			case 38: key1.Up = true; break;
			case 40: key1.Down = true; break;
			case 37: key1.Left = true; break;
			case 39: key1.Right = true; break;
			case 90: key1.Z = true; break;
			case 88: key1.X = true; break;
		}
	};
	document.onkeyup = function(e){
		var press_key = e || window.event;
		switch (press_key.keyCode) {
			case 38: key1.Up = false; break;
			case 40: key1.Down = false; break;
			case 37: key1.Left = false; break;
			case 39: key1.Right = false; break;
			case 90: key1.Z = false; break;
			case 88: key1.X = false; break;
			case 65: level++; break;
			case 32:
				hide = !hide;
				context.fillStyle = "rgb(255,255,255)";
				context.fillRect(0, 0, 800, 600);
				animate();
				break;
		}
	};
	
	function animate(){
		if( hide ) return;
	
		var i, j;
		context.clearRect(0,0,canvasWidth,canvasHeight);
		context.fillStyle = "rgb(255,100,100)";

/*		
		context.fillStyle = "rgb(255,0,0)";
		context.font = "30px helvetica";
		context.fillText("Next", 100,100);
*/
		
		var xsp = 0;
		if( p1.nextMain == p1.nextSub ) xsp = 1;
		context.drawImage( pDraw(img, p1.nextMain), 0, 0, 32, 32, 280, 34+60, 32, 32 );
		context.drawImage( pDraw(img, p1.nextSub), 32*xsp, 0, 32, 32, 280, 34+92, 32, 32);
		xsp = 0;
		if( p2.nextMain == p2.nextSub ) xsp = 1;
		context.drawImage( pDraw(img, p2.nextMain), 0, 0, 32, 32, 376, 34+60, 32, 32 );
		context.drawImage( pDraw(img, p2.nextSub), 32*xsp, 0, 32, 32, 376, 34+92, 32, 32);
		
		context.drawImage(img.Back, 0, 0, 230, 358, 29, 34+29, 230, 358);
		printTable(vTable1, img, context, 0);
		
		context.drawImage(img.Back, 0, 0, 230, 358, 429, 34+29, 230, 358);
		printTable(vTable2, img, context, 1);
		
		if( isDo1.Clear > 0 ){
			context.drawImage(img.Clear, 0, 0, 230, 70, 29, isDo1.Clear, 230, 70);
			if( isDo1.Clear > 90 ) isDo1.Clear -= 4;
		}
		if( isDo2.Clear > 0 ){
			context.drawImage(img.Clear, 0, 0, 230, 70, 429, isDo2.Clear, 230, 70);
			if( isDo2.Clear > 90 ) isDo2.Clear -= 4;
		}

		
		if( dis.a > 0 ){
			var pos = 0;
			for( i = 1; i <= dis.a/25; i++ ){
				context.drawImage(img.Disview, 34*2, 0, 34, 34, 29+pos, 29, 34, 34);
				pos += 34;
			}
			for( i = 1; i <= (dis.a%25)/5; i++ ){
				context.drawImage(img.Disview, 34, 0, 34, 34, 29+pos, 29, 34, 34);
				pos += 34;
			}
			for( i = 1; i <= dis.a%5; i++ ){
				context.drawImage(img.Disview, 0, 0, 34, 34, 29+pos, 29, 34, 34);
				pos += 34;
			}
		}
		if( dis.b > 0 ){
			var pos = 0;
			for( i = 1; i <= dis.b/25; i++ ){
				context.drawImage(img.Disview, 34*2, 0, 34, 34, 429+pos, 29, 34, 34);
				pos += 34;
			}
			for( i = 1; i <= (dis.b%25)/5; i++ ){
				context.drawImage(img.Disview, 34, 0, 34, 34, 429+pos, 29, 34, 34);
				pos += 34;
			}
			for( i = 1; i <= dis.b%5; i++ ){
				context.drawImage(img.Disview, 0, 0, 34, 34, 429+pos, 29, 34, 34);
			}
		}
		
		delay1.Down++;
		delay1.Left++;
		delay1.Right++;
		delay1.Rotate++;
		delay1.Calc++;
		
		if( !isDo1.Calc ){
			if( key1.Z && delay1.Rotate >= 10 ){
				delay1.Rotate = 0;
				pRotate(p1, vTable1, 1);
			}
			if( key1.X && delay1.Rotate >= 10 ){
				delay1.Rotate = 0;
				pRotate(p1, vTable1, 2);
			}
			
			if( key1.Left && delay1.Left >= 7 ){
				delay1.Left = 0;
				pMove(p1, vTable1, isDo1, 2);
			}
			if( key1.Right && delay1.Right >= 7 ){
				delay1.Right = 0;
				pMove(p1, vTable1, isDo1, 3);
			}
			if( key1.Down && delay1.Down < 28 ){
				delay1.Down = 28;
			}
			
			if( delay1.Down >= 30 && !isDo1.Touch ){
				delay1.Down = 0;
				pMove(p1, vTable1, isDo1, 1);
			}
			if( isDo1.Touch && delay1.Down >= 60 ){
				delay1.Down = 0;
				isDo1.Touch = false;
				if( (p1.rotate == 1 && vTable1[p1.y+p1.sy+1][p1.x+p1.sx] == 0) || ((p1.rotate == 2 || p1.rotate == 4) && vTable1[p1.y+1][p1.x] == 0 && vTable1[p1.y+p1.sy+1][p1.x+p1.sx] == 0) || (p1.rotate == 3 && vTable1[p1.y+1][p1.x] == 0) ){
					pMove(p1, vTable1, isDo1, 1);
				}else{
					isDo1.Calc = true;
				}
			}
		}
		
		if( isDo1.Calc && delay1.Calc >= 7 ){
			delay1.Calc = 0;
			if( !gravity(vTable1, cTable1) ){
				if( !destroy(vTable1, cTable1, dis, isDo1, 2) ){
					if( clear(vTable1) ){
						isDo1.Clear = 90 + 358;
					}
					if( dis.a > 0 && isDo2.Combo == 0 ){
						if( dis.a >= 7 ){
							for( i = 1; i <= 7; i++ ){
								vTable1[0][ i ] = 9;
							}
							dis.a -= 7;
						}
						else{
							for( i = 1; i <= 7; i++ ){
								vTable1[0][ i ] = 0;
							}
							for( i = 1; i <= dis.a; i++ ){
								while( true ){
									var temp = Math.floor(Math.random()*7)+1;
									if( vTable1[0][ temp ] == 0 ){
										vTable1[0][ temp ] = 9;
										break;
									}
								}
							}
							dis.a = 0;
						}
					}
					else{
						isDo1.Combo = 0;
						isDo1.Calc = 0;
						if( !pInit(p1, vTable1, level) ){
							alert("Level"+level+" failed!");
							level--;
							init();
							return;
						}
					}
				}
			}
		}
		
		
		delay2.Down++;
		delay2.Left++;
		delay2.Right++;
		delay2.Rotate++;
		delay2.Calc++;
		
		
		if( p2.x < dest.X ) key2.Right = true;
		else key2.Right = false;
		if( p2.x > dest.X ) key2.Left = true;
		else key2.Left = false;
		if( p2.rotate != dest.R && p2.y > 1 ) key2.Z = true;
		else key2.Z = false;
		if( p2.x == dest.X && p2.rotate == dest.R ) key2.Down = true;
		else key2.Down = false;
		
		if( !isDo2.Calc ){
			if( key2.Z && delay2.Rotate >= 10 ){
				delay2.Rotate = 0;
				pRotate(p2, vTable2, 1);
			}
			if( key2.X && delay2.Rotate >= 10 ){
				delay2.Rotate = 0;
				pRotate(p2, vTable2, 2);
			}
			
			if( key2.Left && delay2.Left >= 7 ){
				delay2.Left = 0;
				pMove(p2, vTable2, isDo2, 2);
			}
			if( key2.Right && delay2.Right >= 7 ){
				delay2.Right = 0;
				pMove(p2, vTable2, isDo2, 3);
			}
			if( key2.Down && delay2.Down < 28 ){
				delay2.Down = 28;
			}
			
			if( delay2.Down >= 30 && !isDo2.Touch ){
				delay2.Down = 0;
				pMove(p2, vTable2, isDo2, 1);
			}
			if( isDo2.Touch && delay2.Down >= 60 ){
				delay2.Down = 0;
				isDo2.Touch = false;
				if( (p2.rotate == 1 && vTable2[p2.y+p2.sy+1][p2.x+p2.sx] == 0) || ((p2.rotate == 2 || p2.rotate == 4) && vTable2[p2.y+1][p2.x] == 0 && vTable2[p2.y+p2.sy+1][p2.x+p2.sx] == 0) || (p2.rotate == 3 && vTable2[p2.y+1][p2.x] == 0) ){
					pMove(p2, vTable2, isDo2, 1);
				}else{
					isDo2.Calc = true;
				}
			}
		}
		
		if( isDo2.Calc && delay2.Calc >= 10 ){
			delay2.Calc = 0;
			if( !gravity(vTable2, cTable2) ){
				if( !destroy(vTable2, cTable2, dis, isDo2, 1) ){
					if( clear(vTable2) ){
						isDo2.Clear = 90 + 358;
					}
					if( dis.b > 0 && isDo1.Combo == 0 ){
						if( dis.b >= 7 ){
							for( i = 1; i <= 7; i++ ){
								vTable2[0][ i ] = 9;
							}
							dis.b -= 7;
						}
						else{
							for( i = 1; i <= 7; i++ ){
								vTable2[0][ i ] = 0;
							}
							for( i = 1; i <= dis.b; i++ ){
								while( true ){
									var temp = Math.floor(Math.random()*7)+1;
									if( vTable2[0][ temp ] == 0 ){
										vTable2[0][ temp ] = 9;
										break;
									}
								}
							}
							dis.b = 0;
						}
					}
					else{
						isDo2.Combo = 0;
						isDo2.Calc = 0;
						switch( level ){
							case 1: ai1(dest);	break;
							case 2: ai1(dest);	break;
							case 3: ai2(dest); break;
							case 4: ai2(dest); break;
							case 5: ai3(dest, p2, vTable2); break;
							case 6: ai4(dest, p2, vTable2); break;
							case 7: ai3(dest, p2, vTable2); break;
							case 8: ai5(dest, p2, vTable2); break;
						}
						if( !pInit(p2, vTable2, level) ){
							alert("Level" + level + " Clear!");
							if( level == 8 ){
								alert("All Clear!");
								return;
							}
							init();
							return;
						}
					}
				}
			}
		}
		
		if(play && !hide){
			setTimeout(animate,15);
		};
	};
	init();
});
