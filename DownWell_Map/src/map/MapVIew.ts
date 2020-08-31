class MapVIew extends egret.DisplayObjectContainer{
	
	private box1;
	private box2;
	public constructor() {
		super();

		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this)

		this.box1 = new Box();
		this.addChild(this.box1);
		this.box2 = new Box();
		this.box2.y = this.box1.y + this.box1.height;
		this.addChild(this.box2);
	}

	private onEnterFrameHandler():void
	{
		this.box1.y -= 10;
		this.box2.y -= 10;

		if(this.box1.y < -this.box1.height)
		{
			this.box1.y = this.box2.y + this.box2.height;
			this.box1.arrangeBar();
		} 
		else if(this.box2.y < -this.box2.height)
		{
			this.box2.y = this.box1.y + this.box1.height;
			this.box2.arrangeBar();
		}
	}	
}

class Box extends egret.DisplayObjectContainer{

	private barContainer;
	public constructor() {
		super();
		//
		this.arrangeGrid();
		//
		this.barContainer = new egret.DisplayObjectContainer();
		this.addChild(this.barContainer);
		this.arrangeBar();
	}
	/**
	 * 
	 */
	private arrangeGrid():void
	{
		for(var i = 0; i < 20; i ++)
		{
			let mapGridLeft = new MapGrid();
			mapGridLeft.skin = "grid_left_png";
			mapGridLeft.x = 0;
			mapGridLeft.y = i * 70;
        	this.addChild(mapGridLeft);

			let mapGridRight = new MapGrid();
			mapGridRight.skin = "grid_right_png";
			mapGridRight.x = 640 - 70;
			mapGridRight.y = i * 70;
        	this.addChild(mapGridRight);
		}
	}

	/**
	 * 
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
				mapGridCenter.x = leftOrRight == true ? (70 * j + 70) : (70 * j + 640 - (arr[i] + 1) * 70);
				mapGridCenter.y = (arr.length - 2 - i) * 70;
				
			}
		}
	}

	/**
	 * 
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



