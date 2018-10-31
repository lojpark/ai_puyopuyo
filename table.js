var count;

function initTable( vTable, cTable, type ){
	var i, j;
	if( type == 1 ){
		for(i = 0; i <= 11; i++){
			for(j = 1; j <= 7; j++){
				vTable[i][j] = 0;
			}
		}
		for(i = 0; i <= 12; i++){
			vTable[i][0] = -1;
			vTable[i][8] = -1;
		}
		for(j = 1; j <= 7; j++){
			vTable[12][j] = -1;
		}
	}else{
		for(i = 1; i <= 11; i++){
			for(j = 1; j <= 7; j++){
				cTable[i][j] = false;
			}
		}
		for(i = 0; i <= 12; i++){
			cTable[i][0] = true;
			cTable[i][8] = true;
		}
		for(j = 1; j <= 7; j++){
			cTable[0][j] = true;
			cTable[12][j] = true;
		}
	}
}
	
function gravity( vTable ){
	var chk;
	var i, j;
	chk = false;
	for(i = 11; i >= 1; i--){
		for(j = 1; j <= 7; j++){
			if( vTable[i][j] == 0 && vTable[i-1][j] != 0 ){
				vTable[i][j] = vTable[i-1][j];
				vTable[i-1][j] = 0;
				chk = true;
			}
		}
	}
	return chk;
};

function recDestroy(vTable, cTable, x, y){
	count++;
	cTable[y][x] = true;
	if( vTable[y-1][x] == vTable[y][x] && cTable[y-1][x] == false ){
		recDestroy(vTable, cTable, x, y-1);
	}
	if( vTable[y+1][x] == vTable[y][x] && cTable[y+1][x] == false ){
		recDestroy(vTable, cTable, x, y+1);
	}
	if( vTable[y][x-1] == vTable[y][x] && cTable[y][x-1] == false ){
		recDestroy(vTable, cTable, x-1, y);
	}
	if( vTable[y][x+1] == vTable[y][x] && cTable[y][x+1] == false ){
		recDestroy(vTable, cTable, x+1, y);
	}
};
function destroy( vTable, cTable, dis, isDo, who ){
	var chk, combo;
	var i, j;
	chk = false;
	combo = false;
	for(i = 11; i >= 1; i--){
		for(j = 1; j <= 7; j++){
			if( vTable[i][j] != 0 && vTable[i][j] != 9 ){
				count = 0;
				initTable(vTable, cTable, 2);
				recDestroy(vTable, cTable, j, i);
				if( count >= 4 ){
					chk = true;
					for(var k = 1; k <= 11; k++){
						for(var l = 1; l <= 7; l++){
							if( cTable[k][l] ){
								if( vTable[k][l] > 100 ){
									vTable[k][l] = 0;
									combo = true;
									if( vTable[k+1][l] == 19 ) vTable[k+1][l] = 0;
									if( vTable[k][l+1] == 19 ) vTable[k][l+1] = 0;
									if( vTable[k-1][l] == 19 ) vTable[k-1][l] = 0;
									if( vTable[k][l-1] == 19 ) vTable[k][l-1] = 0;
									chk = false;
								}
								else{
									vTable[k][l] += 10;
									if( vTable[k+1][l] == 9 ) vTable[k+1][l] = 19;
									if( vTable[k][l+1] == 9 ) vTable[k][l+1] = 19;
									if( vTable[k-1][l] == 9 ) vTable[k-1][l] = 19;
									if( vTable[k][l-1] == 9 ) vTable[k][l-1] = 19;
								}
							}
						}
					}
					if( !chk ){
						chk = true;
						if( who == 1 ){ // 2p의 공격
							if( dis.b > 0 ){ // 상쇄
								if( isDo.Combo ){
									dis.b -= count*isDo.Combo;
								}else{
									dis.b -= count-3;
								}
								if( isDo.Clear > 0 ){
									dis.b -= 28;
									isDo.Clear = 0;
								}
								if( dis.b < 1 ){
									dis.a += dis.b*-1;
									dis.b = 0;
								}
							}
							else{
								if( isDo.Combo ){
									dis.a += count*isDo.Combo;
								}else{
									dis.a += count-3;
								}
								if( isDo.Clear > 0 ){
									dis.a += 28;
									isDo.Clear = 0;
								}
							}
						}
						if( who == 2 ){ // 1p의 공격
							if( dis.a > 0 ){ // 상쇄
								if( isDo.Combo ){
									dis.a -= count*isDo.Combo;
								}else{
									dis.a -= count-3;
								}
								if( isDo.Clear > 0 ){
									dis.a -= 28;
									isDo.Clear = 0;
								}
								if( dis.a < 1 ){
									dis.b += dis.a*-1;
									dis.a = 0;
								}
							}
							else{
								if( isDo.Combo ){
									dis.b += count*isDo.Combo;
								}else{
									dis.b += count-3;
								}
								if( isDo.Clear > 0 ){
									dis.b += 28;
									isDo.Clear = 0;
								}
							}
						}
					}
				}
			}
		}
	}
	
	if( combo ) isDo.Combo ++;
	
	return chk;
};

function clear( vTable ){
	var i, j;
	
	for(i = 1; i <= 11; i++){
		for(j = 1; j <= 7; j++){
			if( vTable[i][j] != 0 ){
				return false;
			}
		}
	}
	return true;
}

function printTable( vTable, img, context, lr ){
	var i, j;
	var xsp, ysp;
	
	for(i = 1; i <= 11; i++){
		for(j = 1; j <= 7; j++){
			if( vTable[i][j] != 0 ){
				xsp = ysp = 0;
				if( vTable[i-1][j] == vTable[i][j] && vTable[i][j-1] == vTable[i][j] && vTable[i][j+1] == vTable[i][j]){
					xsp = 7;
				}else if( vTable[i-1][j] == vTable[i][j] && vTable[i][j-1] == vTable[i][j]){
					xsp = 4;
				}else if( vTable[i-1][j] == vTable[i][j] && vTable[i][j+1] == vTable[i][j]){
					xsp = 5;
				}else if( vTable[i][j-1] == vTable[i][j] && vTable[i][j+1] == vTable[i][j]){
					xsp = 6;
				}else if( vTable[i-1][j] == vTable[i][j]){
					xsp = 1;
				}else if( vTable[i][j-1] == vTable[i][j]){
					xsp = 2;
				}else if( vTable[i][j+1] == vTable[i][j]){
					xsp = 3;
				}else{
					xsp = 0;
				};
				
				if( vTable[i][j] > 10 ){
					ysp = 1;
				}
				context.drawImage(pDraw(img, vTable[i][j]%10), 32*xsp, 32*ysp, 32, 32, lr*400 + j*32, 34+i*32, 32, 32);
			}
		}
	}
};