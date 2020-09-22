class Player extends egret.DisplayObjectContainer{

	private _mcData:any;
    private _mcTexture:egret.Texture;
    private mcDataFactory:egret.MovieClipDataFactory;
    private role:egret.MovieClip;
    private lastDirection:string;

	public constructor() {
		super();
        // this.aDdEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

    private static _instance:Player;
    public static get instance():Player
    {
        if(!this._instance)
            this._instance = new Player();
        return this._instance;
    }

    public onAddToStage():void
	{
        this._mcData = RES.getRes("player_json");
        this._mcTexture = RES.getRes("player_png");
        this.mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
        this.run("center");
    }

    
    public run(direction:string):void
    {
        if(this.lastDirection == direction) return;
        this.lastDirection = direction;

        if(this.role)
        {
            this.role.parent.removeChild(this.role);
            this.role = null;
        }
        
        this.role = new egret.MovieClip(this.mcDataFactory.generateMovieClipData(direction));
        this.addChild(this.role);
        this.role.gotoAndPlay(1, 50);        
        this.role.addEventListener(egret.Event.COMPLETE, function (e:egret.Event):void {
            egret.log("play over!")
        }, this);
        
        var count:number = 0;
        this.role.addEventListener(egret.Event.LOOP_COMPLETE, function (e:egret.Event):void {
            egret.log("play times:" + ++count);
        }, this);
        this.role.addEventListener(egret.MovieClipEvent.FRAME_LABEL, function (e:egret.MovieClipEvent):void {
            egret.log("frameLabel:" + e.frameLabel);
        }, this);
        
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent):void {
            count = 0;
            this.role.gotoAndPlay(1, 4);
        }, this);
    }
}