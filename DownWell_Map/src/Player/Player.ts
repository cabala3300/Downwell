class Player extends egret.DisplayObjectContainer{


	private _mcData:any;
    private _mcTexture:egret.Texture;

	public constructor() {
		super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

    private onAddToStage(event: egret.Event) {
        // this.load(this.initMovieClip);

        this._mcData = RES.getRes("player_json");
        this._mcTexture = RES.getRes("player_png");

        this.initMovieClip();
    }

    private initMovieClip():void {
        /*** 本示例关键代码段开始 ***/
        var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
        var role:egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("player2"));
        this.addChild(role);
        role.gotoAndPlay(1, 50);
        role.x = 270;
        role.y = 370;
        role.addEventListener(egret.Event.COMPLETE, function (e:egret.Event):void {
            egret.log("play over!")
        }, this);
        
        var count:number = 0;
        role.addEventListener(egret.Event.LOOP_COMPLETE, function (e:egret.Event):void {
            egret.log("play times:" + ++count);
        }, this);
        role.addEventListener(egret.MovieClipEvent.FRAME_LABEL, function (e:egret.MovieClipEvent):void {
            egret.log("frameLabel:" + e.frameLabel);
        }, this);
        
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent):void {
            count = 0;
            role.gotoAndPlay(1, 3);
        }, this);
        /*** 本示例关键代码段结束 ***/
    }

	protected load(callback:Function):void {
        var count:number = 0;
        var self = this;
        
        var check = function () {
            count++;
            if (count == 2) {
                callback.call(self);
            }
        }
        
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;

            this._mcTexture = loader.data;
            
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        var request = new egret.URLRequest("resource/assets/mc/animation.png");
        loader.load(request);
        
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;

            this._mcData = JSON.parse(loader.data);
            
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request = new egret.URLRequest("resource/assets/mc/animation.json");
        loader.load(request);
    }
}