function pInit(p, vTable, level){
	p.x = 4;
	p.y = 0;
	p.rotate = 1;
	p.main = p.nextMain;
	p.sub = p.nextSub;
	
	var temp = 0;
	switch( level ){
		case 1: temp = 3; break; // 무작위
		case 2: temp = 4; break; // 무작위
		case 3: temp = 5; break; // 개구리
		case 4: temp = 3; break; // 개구리
		case 5: temp = 4; break; // 탐욕1
		case 6: temp = 4; break; // 탐욕2
		case 7: temp = 5; break; // 탐욕1
		case 8: temp = 4; break; // 탐욕3
	}
	p.nextMain = Math.floor(Math.random()*temp)+1;
	p.nextSub = Math.floor(Math.random()*temp)+1;
	
	p.sx = 0;
	p.sy = 1;
	
	if( vTable[p.y][p.x] != 0 || vTable[p.y+1][p.x] != 0 ){
		return false;
	}
	vTable[p.y][p.x] = p.main;
	vTable[p.y+1][p.x] = p.sub;
	
	pUpdate(p);
	return true;
};

function pMove(p, vTable, isDo, dir){
	vTable[p.y][p.x] = 0;
	vTable[p.y+p.sy][p.x+p.sx] = 0;
	// 하
	
	if( dir == 1 ){
		if( vTable[p.y+1][p.x] != 0 || vTable[p.y+p.sy+1][p.x+p.sx] != 0 ){
			isDo.Touch = true;
		}else{
			p.y++;
		}
	}
	// 좌
	else if( dir == 2 ){
		if( vTable[p.y][p.x-1] == 0 && vTable[p.y+p.sy][p.x+p.sx-1] == 0 ){
			p.x--;
		}
	}
	// 우
	else if( dir == 3 ){
		if( vTable[p.y][p.x+1] == 0 && vTable[p.y+p.sy][p.x+p.sx+1] == 0 ){
			p.x++;
		}
	}
	vTable[p.y][p.x] = p.main;
	vTable[p.y+p.sy][p.x+p.sx] = p.sub;
};

function pUpdate(p){
	switch( p.rotate ){
		case 1: p.sx = 0; p.sy = 1; break;
		case 2: p.sx = 1; p.sy = 0; break;
		case 3: p.sx = 0; p.sy = -1; break;
		case 4: p.sx = -1; p.sy = 0; break;
	};
};

function pRotate(p, vTable, rotate){
	if( (rotate == 1 && p.rotate == 1) || (rotate == 2 && p.rotate == 3) ){
		if( vTable[p.y][p.x+1] == 0 ){
			vTable[p.y+p.sy][p.x+p.sx] = 0;
			vTable[p.y][p.x+1] = p.sub;
			p.rotate = 2;
		}else if( vTable[p.y][p.x+1] != 0 && vTable[p.y][p.x-1] == 0 ){
			vTable[p.y][p.x] = 0;
			vTable[p.y+p.sy][p.x+p.sx] = 0;
			p.x--;
			vTable[p.y][p.x] = p.main;
			vTable[p.y][p.x+1] = p.sub;
			p.rotate = 2;
		}
	}
	else if( (rotate == 1 && p.rotate == 2) || (rotate == 2 && p.rotate == 4) ){
		if( p.y > 0 ){
			if( vTable[p.y-1][p.x] == 0 ){
				vTable[p.y+p.sy][p.x+p.sx] = 0;
				vTable[p.y-1][p.x] = p.sub;
				p.rotate = 3;
			}
		}
	}
	else if( (rotate == 1 && p.rotate == 3) || (rotate == 2 && p.rotate == 1) ){
		if( vTable[p.y][p.x-1] == 0 ){
			vTable[p.y+p.sy][p.x+p.sx] = 0;
			vTable[p.y][p.x-1] = p.sub;
			p.rotate = 4;
		}else if( vTable[p.y][p.x-1] != 0 && vTable[p.y][p.x+1] == 0 ){
			vTable[p.y][p.x] = 0;
			vTable[p.y+p.sy][p.x+p.sx] = 0;
			p.x++;
			vTable[p.y][p.x] = p.main;
			vTable[p.y][p.x-1] = p.sub;
			p.rotate = 4;
		}
	}
	else if( (rotate == 1 && p.rotate == 4) || (rotate == 2 && p.rotate == 2) ){
		if( vTable[p.y+1][p.x] == 0 ){
			vTable[p.y+p.sy][p.x+p.sx] = 0;
			vTable[p.y+1][p.x] = p.sub;
			p.rotate = 1;
		}else if( vTable[p.y+1][p.x] != 0 ){
			vTable[p.y][p.x] = 0;
			vTable[p.y+p.sy][p.x+p.sx] = 0;
			p.y--;
			vTable[p.y][p.x] = p.main;
			vTable[p.y+1][p.x] = p.sub;
			p.rotate = 1;
		}
	}
	
	pUpdate(p);
};
	
function pDraw( img, type ){
	switch( type ){
		case 1: return img.Red;
		case 2: return img.Blue;
		case 3: return img.Yellow;
		case 4: return img.Green;
		case 5: return img.Purple;
		case 9: return img.Dis;
	};
	return img.Red;
};