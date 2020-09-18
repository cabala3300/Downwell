class MapVIew extends egret.DisplayObjectContainer{
	
	private round;
	private box1;
	private box2;
	private downCount = 1;
	public constructor() {
		super();

		this.start();

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

	private start():void
	{
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this)
	}

	private stop():void
	{
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this)
	}	
	
	private onEnterFrameHandler():void
	{
		//地图移动速度
		this.round.y -= MapConfig._downSpeed;
		this.box1.y -= MapConfig._downSpeed;
		this.box2.y -= MapConfig._downSpeed;

		if(this.box1.y < -this.box1.height && this.box2.y < -this.box2.height && this.downCount >= 4)
		{
			this.stop();
		}

		//地图由两块组成
		if(this.box1.y < -this.box1.height)
		{
			++ this.downCount;
			if(this.downCount >= 4)
				 this.round.y = this.box2.y + this.box2.height;
			else if(this.downCount < 4)	
				this.box1.y = this.box2.y + this.box2.height + 50;
			// this.box1.arrangeBar();
		} 
		else if(this.box2.y < -this.box2.height)
		{
			++ this.downCount;
			if(this.downCount >= 4)
				 this.round.y = this.box1.y + this.box1.height;
			else if(this.downCount < 4)				
				this.box2.y = this.box1.y + this.box1.height + 50;
			// this.box2.arrangeBar();
		}
	}	
}







































class Box extends egret.DisplayObjectContainer{

	private barContainer;
	public constructor() {
		super();
		//添加左右障碍墙
		this.arrangeGrid();
		//
		this.barContainer = new egret.DisplayObjectContainer();
		this.addChild(this.barContainer);
		// this.arrangeBar();
	}

	/**
	 * 排列左右障碍墙
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

		let leftOrRight = Math.random() < 0.5 ? true : false;

		let arr = this.getArrangerBar;
		let index = 0;
		for(var i = arr.length - 2; i >= 0 ; i --)
		{
			for(var j = 0; j < arr[i]; j ++)
			{	
				let mapGridCenter;
				if(this.barContainer.numChildren > index)
				{
					mapGridCenter = this.barContainer.getChildAt(index);					
				}
				else
				{
					mapGridCenter = new MapGrid();
					mapGridCenter.skin = "grid_center_png";
					this.barContainer.addChild(mapGridCenter);
				}	
				index ++;					
				mapGridCenter.x = leftOrRight == true ? (MapConfig._width * j + MapConfig._width) : (MapConfig._width * j + 640 - (arr[i] + 1) * MapConfig._width);
				mapGridCenter.y = (arr.length - 2 - i) * MapConfig._height;
				
			}
		}
	}

	/**
	 * 随机障碍
	 */
	private get getArrangerBar():Array<number>
	{
		let arr = new Array<number>();		
		let totalCont = 0;
		let verticalCount = Math.floor(Math.random() * 4) + 1;
		let lastCount = 5;
		for(var i = 0; i < verticalCount; i ++)
		{
			let horizontalCount = Math.floor(Math.random() * lastCount) + 1;
			lastCount = horizontalCount;
			arr.push(horizontalCount);
			totalCont += horizontalCount;
			if(i == verticalCount - 1) arr.push(totalCont);
		}
		console.log(arr);
		return arr;
	}
}



