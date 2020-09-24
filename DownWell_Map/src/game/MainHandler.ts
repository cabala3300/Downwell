class MainHandler {

	private main:Main

	private mapView:MapView;

	private player:Player;
    private _touchStatus:boolean = false;              //当前触摸状态，按下时，值为true
    private _distance:egret.Point = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差

	public constructor(_this : Main) {
		this.main = _this;

        this.mapView = new MapView();
        this.main.addChild(this.mapView);

        this.player = Player.instance;
		this.player.x = 270;
        this.player.y = 370;        
		this.player.addEventListener( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		this.main.addChild(this.player);
		
		this.start();

		this.main.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        this.main.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
	}

	private start():void
	{
		this.main.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this)
	}

	private stop():void
	{
		this.main.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this)
	}	

	public onEnterFrameHandler():void
	{
		if(this.mapView.run)
			this.mapView.onEnterFrameHandler();
	}

	private onAddToStage(event:egret.Event)
    {
		this.player.onAddToStage();
		this.player.touchEnabled = true;
		
		this.player.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        this.player.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
	}

	private mouseDown(evt:egret.TouchEvent)
    {
		let _x = this.player.x;
		let _y = 370;

		if(evt.stageX < this.player.x)
		{
			_x -= 30;
			this.player.run("left");
		}
		else
		{
			_x += 30;
			this.player.run("right");
		}

		egret.Tween.get( this.player )
		.to( {x : _x, y : _y - 100}, 200 )
		.wait( 0 )
		.to( {x :  _x, y : _y}, 100 );
		
		function onCom(){
			Player.instance.run("center");
		}
		setTimeout(onCom, 300);

    }

    private mouseMove(evt:egret.TouchEvent)
    {
        if( this._touchStatus )
        {
			// let _x = evt.stageX - this._distance.x;
			// let _y = this._distance.y;

			// if(_x <  this.player.x)
			// 	this.player.run("left");
			// else if(_x >  this.player.x)
			// 	this.player.run("right");
			// else if(_x ==  this.player.x)
			// 	this.player.run("center");
			
			// console.log(this.player.x);
            // this.player.x = _x;
			// this.player.y = _y;
			// console.log(this.player.x);

			

			// egret.Tween.get( this.player ).to({x:_x,y:_y}, 1000, egret.Ease.sineIn);
        }
    }

    private mouseUp(evt:egret.TouchEvent)
    {
		// this.player.run("center");
        // this._touchStatus = false;
        // this.main.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }

}