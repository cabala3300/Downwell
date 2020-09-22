class MapView extends egret.DisplayObjectContainer{
	
	private round;
	private box1;
	private box2;
	private downCount = 1;
	public constructor() {
		super();
		
		this.run = true;

		//关卡提示
		this.round = new RoundView();
		this.addChild(this.round);
		
		//左墙
		this.box1 = new Box();
		this.box1.y = 1136;
		this.addChild(this.box1);
		
		//右墙
		this.box2 = new Box();
		this.box2.y = this.box1.y + this.box1.height + 50;
		this.addChild(this.box2);
	}
	
	public onEnterFrameHandler():void
	{
		//地图移动速度
		this.round.y -= MapConfig._downSpeed;
		this.box1.y -= MapConfig._downSpeed;
		this.box2.y -= MapConfig._downSpeed;

		//结束停止
		if(this.box1.y < -this.box1.height && this.box2.y < -this.box2.height && this.downCount >= 4)
		{
			this.run = false;
		}

		//当前关卡阶段数
		let count = MapConfig.round_1_down_cout;
		//地图由两块组成
		if(this.box1.y < -this.box1.height)
		{
			++ this.downCount;
			//每关结束显示关卡图
			if(this.downCount >= count)
				 this.round.y = this.box2.y + this.box2.height;
			//重新排列地图循环
			else if(this.downCount < count)	
				this.box1.y = this.box2.y + this.box2.height + 50;
			// this.box1.arrangeBar();
		} 
		else if(this.box2.y < -this.box2.height)
		{
			++ this.downCount;
			//每关结束显示关卡图
			if(this.downCount >= count)
				 this.round.y = this.box1.y + this.box1.height;
			///重新排列地图循环
			else if(this.downCount < count)				
				this.box2.y = this.box1.y + this.box1.height + 50;
			// this.box2.arrangeBar();
		}
	}	

	private _run: boolean;
	public get run() {
        return this._run;
    }
 
    public set run(value : boolean) {
        this._run = value;
    }

}


class Box extends egret.DisplayObjectContainer{

	private barContainer_l;
	private barContainer_r;
	public constructor() {
		super();
		//添加左右障碍墙
		this.arrangeGrid();
		//障碍容器
		this.barContainer_l = new egret.DisplayObjectContainer();
		this.addChild(this.barContainer_l);

		this.barContainer_r = new egret.DisplayObjectContainer();
		this.addChild(this.barContainer_r);
		this.arrangeBar();
	}

	/**
	 * 排列左右障碍墙
	 * 50为一阶段，每关卡由若干个关卡组成
	 */
	private arrangeGrid():void
	{
		for(var i = 0; i < 50; i ++)
		{
			let mapGridLeft = new MapGrid();
			mapGridLeft.skin = "grid_left_png";
			mapGridLeft.x = 0;
			mapGridLeft.y = i * MapConfig._height;
        	this.addChild(mapGridLeft);

			let mapGridRight = new MapGrid();
			mapGridRight.skin = "grid_right_png";
			mapGridRight.x = 640 - MapConfig._width;
			mapGridRight.y = i * MapConfig._height;
        	this.addChild(mapGridRight);
		}
	}

	/**
	 * 排列中间障碍
	 */
	public arrangeBar():void{

		// let count = MapConfig.round_1_down_cout;
		let countArr_l = [[2, 1, 5000/10000], [2, 1, 5000/10000], [2, 1, 5000/10000], [2, 1, 5000/10000]];
		let countArr_r = [[3, 1, 5000/10000], [3, 1, 5000/10000], [3, 1, 5000/10000], [3, 1, 5000/10000]];

		for(var i = 0; i < 50; i ++)
		 {
			 let j;
			 let index = 0;
			 let mapGrid_l;
			 //刷出阻碍几率
			 let leftOrRight = Math.random() < 0.5 ? true : false;
			 if(leftOrRight)
			 {
				//左障碍
				for(j = 0; j < 2; j ++)
				{
					if(leftOrRight)
					{
						
						// if(this.barContainer_l.numChildren > index)
						// {
						// 	mapGrid_l = this.barContainer_l.getChildAt(index);					
						// }
						// else
						// {
						mapGrid_l = new MapGrid();
						mapGrid_l.skin = "bar_png";
						this.barContainer_l.addChild(mapGrid_l);
						// }	
						index ++;
						mapGrid_l.x = j * MapConfig._width;
						mapGrid_l.y = i * MapConfig._height;
					}				 
				}
			 }
			 
			 index = 0
			//刷出阻碍几率
			 leftOrRight = Math.random() < 0.5 ? true : false;
			 //右障碍
			 for(j = 0; j < 3; j ++)
			 {
				if(leftOrRight)
				{
					
					// if(this.barContainer_l.numChildren > index)
					// {
					// 	mapGrid_l = this.barContainer_l.getChildAt(index);					
					// }
					// else
					// {
					mapGrid_l = new MapGrid();
					mapGrid_l.skin = "bar_png";
					this.barContainer_l.addChild(mapGrid_l);
					// }	
					index ++;
					mapGrid_l.x = (19 -j) * MapConfig._width;
					mapGrid_l.y = i * MapConfig._height;
				}	
			 }			 
		 }

		// //左障碍
		// for(var i = 0; i < count; i ++)
		// {
		// 	var j = 0;
		// 	var left = countArr_l[i];
		// 	var right = countArr_r[i];
		// 	for(var j = 0; j < count; j ++)
		// 	{

		// 	}
		// }

		//右障碍

		// let leftOrRight = Math.random() < 0.5 ? true : false;

		// let arr = this.getArrangerBar;
		// let index = 0;
		// for(var i = arr.length - 2; i >= 0 ; i --)
		// {
		// 	for(var j = 0; j < arr[i]; j ++)
		// 	{	
		// 		let mapGridCenter;
		// 		if(this.barContainer.numChildren > index)
		// 		{
		// 			mapGridCenter = this.barContainer.getChildAt(index);					
		// 		}
		// 		else
		// 		{
		// 			mapGridCenter = new MapGrid();
		// 			mapGridCenter.skin = "bar_png";
		// 			this.barContainer.addChild(mapGridCenter);
		// 		}	
		// 		index ++;					
		// 		mapGridCenter.x = leftOrRight == true ? (MapConfig._width * j + MapConfig._width) : (MapConfig._width * j + 640 - (arr[i] + 1) * MapConfig._width);
		// 		mapGridCenter.y = (arr.length - 2 - i) * MapConfig._height;
				
		// 	}
		// }
	}

	// /**
	//  * 随机障碍
	//  */
	// private get getArrangerBar():Array<number>
	// {
	// 	let arr = new Array<number>();		
	// 	let totalCont = 0;
	// 	let verticalCount = Math.floor(Math.random() * 4) + 1;
	// 	let lastCount = 5;
	// 	for(var i = 0; i < verticalCount; i ++)
	// 	{
	// 		let horizontalCount = Math.floor(Math.random() * lastCount) + 1;
	// 		lastCount = horizontalCount;
	// 		arr.push(horizontalCount);
	// 		totalCont += horizontalCount;
	// 		if(i == verticalCount - 1) arr.push(totalCont);
	// 	}
	// 	console.log(arr);
	// 	return arr;
	// }
}



