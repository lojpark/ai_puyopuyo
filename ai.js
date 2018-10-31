var count1, count2;

/* Rand */
function ai1( dest ){
	dest.X = Math.floor(Math.random()*7)+1;
	dest.R = Math.floor(Math.random()*4)+1;
}

/* Frog */
function ai2( dest ){
	dest.X = 1; //Math.floor(Math.random()*7)+1;
	dest.R = Math.floor(Math.random()*4)+1;
}

/* Greed */
function ai3( dest, p, vTable ){
	var i, j;
	var n = 0, can = new Array();
	var max = 0;
	
	var cTable = new Array();
	for(var i = 0; i <= 12; i++){
		cTable[i] = new Array();
	}
	initTable(vTable, cTable, 2);
	
	for( j = 1; j <= 7; j++ ){
		for( i = 1; i <= 12; i++ ){
			if( vTable[i][j] != 0 ){
				n++;
				can[n] = i-1;
				break;
			}
		}
	}
	
	max = 0;
	n = 0;
	for( j = 1; j <= 7; j++ ){
		n++;
		if( can[n]-1 < 0 ) continue;
		vTable[can[n]-1][j] = p.nextMain;
		vTable[can[n]][j] = p.nextSub;
		
		count = 0;
		rec(vTable, cTable, j, can[n]-1);
		count1 = count;
		count = 0;
		rec(vTable, cTable, j, can[n]);
		count2 = count;
		
		if( max < count1 + count2 ){
			max = count1 + count2;
			dest.X = j;
			dest.R = 1;
		}
		
		vTable[can[n]-1][j] = 0;
		vTable[can[n]][j] = 0;
	}
	n = 0;
	for( j = 1; j <= 6; j++ ){
		n++;
		vTable[can[n]][j] = p.nextMain;
		vTable[can[n+1]][j+1] = p.nextSub;
		
		count = 0;
		rec(vTable, cTable, j, can[n]);
		count1 = count;
		count = 0;
		rec(vTable, cTable, j+1, can[n+1]);
		count2 = count;
		
		if( max < count1 + count2 ){
			max = count1 + count2;
			dest.X = j;
			dest.R = 2;
		}
		
		vTable[can[n]][j] = 0;
		vTable[can[n+1]][j+1] = 0;
	}
	n = 0;
	for( j = 1; j <= 7; j++ ){
		n++;
		if( can[n]-1 < 0 ) continue;
		vTable[can[n]][j] = p.nextMain;
		vTable[can[n]-1][j] = p.nextSub;
		
		count = 0;
		rec(vTable, cTable, j, can[n]);
		count1 = count;
		count = 0;
		rec(vTable, cTable, j, can[n]-1);
		count2 = count;
		
		if( max < count1 + count2 ){
			max = count1 + count2;
			dest.X = j;
			dest.R = 3;
		}
		
		vTable[can[n]][j] = 0;
		vTable[can[n]-1][j] = 0;
	}
	n = 0;
	for( j = 2; j <= 7; j++ ){
		n++;
		vTable[can[n+1]][j] = p.nextMain;
		vTable[can[n]][j-1] = p.nextSub;
		
		count = 0;
		rec(vTable, cTable, j, can[n+1]);
		count1 = count;
		count = 0;
		rec(vTable, cTable, j-1, can[n]);
		count2 = count;
		
		if( max < count1 + count2 ){
			max = count1 + count2;
			dest.X = j;
			dest.R = 4;
		}
		
		vTable[can[n+1]][j] = 0;
		vTable[can[n]][j-1] = 0;
	}
	
	if( max == 2 ){
		dest.X = Math.floor(Math.random()*7)+1;
		dest.R = Math.floor(Math.random()*4)+1;
	}
}

/* Greed2 */
function ai4( dest, p, vTable ){
	var i, j;
	var n = 0, can = new Array();
	var max = 0;
	var maxLine = 0;
	
	var cTable = new Array();
	for(var i = 0; i <= 12; i++){
		cTable[i] = new Array();
	}
	initTable(vTable, cTable, 2);

	for( j = 1; j <= 7; j++ ){
		for( i = 1; i <= 12; i++ ){
			if( vTable[i][j] != 0 ){
				n++;
				can[n] = i-1;
				break;
			}
		}
	}
	
	max = 0;
	n = 0;
	for( j = 1; j <= 7; j++ ){
		n++;
		if( can[n]-1 < 0 ) continue;
		vTable[can[n]-1][j] = p.nextMain;
		vTable[can[n]][j] = p.nextSub;
		
		count = 0;
		rec(vTable, cTable, j, can[n]-1);
		count1 = count;
		if( count1 == 3 ) count1 += 10;
		count = 0;
		rec(vTable, cTable, j, can[n]);
		count2 = count;
		if( count2 == 3 ) count2 += 10;
		
		if( max < count1 + count2 ){
			max = count1 + count2;
			dest.X = j;
			dest.R = 1;
		}
		
		vTable[can[n]-1][j] = 0;
		vTable[can[n]][j] = 0;
	}
	n = 0;
	for( j = 1; j <= 6; j++ ){
		n++;
		vTable[can[n]][j] = p.nextMain;
		vTable[can[n+1]][j+1] = p.nextSub;
		
		count = 0;
		rec(vTable, cTable, j, can[n]);
		count1 = count;
		if( count1 == 3 ) count1 += 10;
		count = 0;
		rec(vTable, cTable, j+1, can[n+1]);
		count2 = count;
		if( count2 == 3 ) count2 += 10;
		
		if( max < count1 + count2 ){
			max = count1 + count2;
			dest.X = j;
			dest.R = 2;
		}
		
		vTable[can[n]][j] = 0;
		vTable[can[n+1]][j+1] = 0;
	}
	n = 0;
	for( j = 1; j <= 7; j++ ){
		n++;
		if( can[n]-1 < 0 ) continue;
		vTable[can[n]][j] = p.nextMain;
		vTable[can[n]-1][j] = p.nextSub;
		
		count = 0;
		rec(vTable, cTable, j, can[n]);
		count1 = count;
		if( count1 == 3 ) count1 += 10;
		count = 0;
		rec(vTable, cTable, j, can[n]-1);
		count2 = count;
		if( count2 == 3 ) count2 += 10;
		
		if( max < count1 + count2 ){
			max = count1 + count2;
			dest.X = j;
			dest.R = 3;
		}
		
		vTable[can[n]][j] = 0;
		vTable[can[n]-1][j] = 0;
	}
	n = 0;
	for( j = 2; j <= 7; j++ ){
		n++;
		vTable[can[n+1]][j] = p.nextMain;
		vTable[can[n]][j-1] = p.nextSub;
		
		count = 0;
		rec(vTable, cTable, j, can[n+1]);
		count1 = count;
		if( count1 == 3 ) count1 += 10;
		count = 0;
		rec(vTable, cTable, j-1, can[n]);
		count2 = count;
		if( count2 == 3 ) count2 += 10;
		
		if( max < count1 + count2 ){
			max = count1 + count2;
			dest.X = j;
			dest.R = 4;
		}
		
		vTable[can[n+1]][j] = 0;
		vTable[can[n]][j-1] = 0;
	}
	
	if( max == 2 ){
		dest.X = Math.floor(Math.random()*7)+1;
		dest.R = Math.floor(Math.random()*4)+1;
	}
}

/* Greed3 */
function ai5( dest, p, vTable ){
	var i, j;
	var n = 0, can = new Array();
	var max = 0;
	var minLine = 12;
	
	var cTable = new Array();
	for(var i = 0; i <= 12; i++){
		cTable[i] = new Array();
	}
	initTable(vTable, cTable, 2);
	
	for( j = 1; j <= 7; j++ ){
		for( i = 1; i <= 12; i++ ){
			if( vTable[i][j] != 0 ){
				n++;
				can[n] = i-1;
				if( minLine > i ) minLine = i;
				break;
			}
		}
	}
	
	max = 0;
	n = 0;
	for( j = 1; j <= 7; j++ ){
		n++;
		if( can[n]-1 < 0 ) continue;
		vTable[can[n]-1][j] = p.nextMain;
		vTable[can[n]][j] = p.nextSub;
		
		count = 0;
		rec(vTable, cTable, j, can[n]-1);
		count1 = count;
		if( count1 == 3 ) count1 += 10;
		if( count1 >= 4 && minLine > 4 ) count1 -= 3;
		count = 0;
		rec(vTable, cTable, j, can[n]);
		count2 = count;
		if( count2 == 3 ) count2 += 10;
		if( count2 >= 4 && minLine > 4 ) count2 -= 3;
		
		if( max < count1 + count2 ){
			max = count1 + count2;
			dest.X = j;
			dest.R = 1;
		}
		
		vTable[can[n]-1][j] = 0;
		vTable[can[n]][j] = 0;
	}
	n = 0;
	for( j = 1; j <= 6; j++ ){
		n++;
		vTable[can[n]][j] = p.nextMain;
		vTable[can[n+1]][j+1] = p.nextSub;
		
		count = 0;
		rec(vTable, cTable, j, can[n]);
		count1 = count;
		if( count1 == 3 ) count1 += 10;
		if( count1 >= 4 && minLine > 4 ) count1 -= 3;
		count = 0;
		rec(vTable, cTable, j+1, can[n+1]);
		count2 = count;
		if( count2 == 3 ) count2 += 10;
		if( count2 >= 4 && minLine > 4 ) count2 -= 3;
		
		if( max < count1 + count2 ){
			max = count1 + count2;
			dest.X = j;
			dest.R = 2;
		}
		
		vTable[can[n]][j] = 0;
		vTable[can[n+1]][j+1] = 0;
	}
	n = 0;
	for( j = 1; j <= 7; j++ ){
		n++;
		if( can[n]-1 < 0 ) continue;
		vTable[can[n]][j] = p.nextMain;
		vTable[can[n]-1][j] = p.nextSub;
		
		count = 0;
		rec(vTable, cTable, j, can[n]);
		count1 = count;
		if( count1 == 3 ) count1 += 10;
		if( count1 >= 4 && minLine > 4 ) count1 -= 3;
		count = 0;
		rec(vTable, cTable, j, can[n]-1);
		count2 = count;
		if( count2 == 3 ) count2 += 10;
		if( count2 >= 4 && minLine > 4 ) count2 -= 3;
		
		if( max < count1 + count2 ){
			max = count1 + count2;
			dest.X = j;
			dest.R = 3;
		}
		
		vTable[can[n]][j] = 0;
		vTable[can[n]-1][j] = 0;
	}
	n = 0;
	for( j = 2; j <= 7; j++ ){
		n++;
		vTable[can[n+1]][j] = p.nextMain;
		vTable[can[n]][j-1] = p.nextSub;
		
		count = 0;
		rec(vTable, cTable, j, can[n+1]);
		count1 = count;
		if( count1 == 3 ) count1 += 10;
		if( count1 >= 4 && minLine > 4 ) count1 -= 3;
		count = 0;
		rec(vTable, cTable, j-1, can[n]);
		count2 = count;
		if( count2 == 3 ) count2 += 10;
		if( count2 >= 4 && minLine > 4 ) count2 -= 3;
		
		if( max < count1 + count2 ){
			max = count1 + count2;
			dest.X = j;
			dest.R = 4;
		}
		
		vTable[can[n+1]][j] = 0;
		vTable[can[n]][j-1] = 0;
	}
	
	if( max == 2 ){
		dest.X = Math.floor(Math.random()*7)+1;
		dest.R = Math.floor(Math.random()*4)+1;
	}
}

function rec(vTable, cTable, x, y){
	count++;
	cTable[y][x] = true;
	if( y-1 >= 0 ){
		if( vTable[y-1][x] == vTable[y][x] && cTable[y-1][x] == false ){
			rec(vTable, cTable, x, y-1);
		}
	}
	if( vTable[y+1][x] == vTable[y][x] && cTable[y+1][x] == false ){
		rec(vTable, cTable, x, y+1);
	}
	if( vTable[y][x-1] == vTable[y][x] && cTable[y][x-1] == false ){
		rec(vTable, cTable, x-1, y);
	}
	if( vTable[y][x+1] == vTable[y][x] && cTable[y][x+1] == false ){
		rec(vTable, cTable, x+1, y);
	}
};