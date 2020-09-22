var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MainHandler = (function () {
    function MainHandler(_this) {
        this._touchStatus = false; //当前触摸状态，按下时，值为true
        this._distance = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差
        this.mian = _this;
        this.mapView = new MapView();
        this.mian.addChild(this.mapView);
        this.player = new Player();
        this.player.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.mian.addChild(this.player);
        this.start();
    }
    MainHandler.prototype.start = function () {
        this.mian.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this);
    };
    MainHandler.prototype.stop = function () {
        this.mian.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this);
    };
    MainHandler.prototype.onEnterFrameHandler = function () {
        if (this.mapView.run)
            this.mapView.onEnterFrameHandler();
    };
    MainHandler.prototype.onAddToStage = function (event) {
        this.player.onAddToStage();
        this.player.touchEnabled = true;
        this.player.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        this.player.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
    };
    MainHandler.prototype.mouseDown = function (evt) {
        console.log("Mouse Down.");
        this._touchStatus = true;
        this._distance.x = evt.stageX - this.player.x;
        this._distance.y = this.player.y;
        // this._distance.y = evt.stageY - this.player.y;
        this.mian.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    MainHandler.prototype.mouseMove = function (evt) {
        var _x = evt.stageX - this._distance.x;
        var _y = this._distance.y;
        if (_x < 0)
            this.player.run("left");
        else if (_x > 0)
            this.player.run("right");
        else if (_x == 0)
            this.player.run("center");
        if (this._touchStatus) {
            // let _x = evt.stageX - this._distance.x;
            // let _y = this._distance.y;
            // if(_x < 0)
            // 	this.player.run("left");
            // else if(_x > 0)
            // 	this.player.run("right");
            // else if(_x == 0)
            // 	this.player.run("center");
            console.log(this.player.x);
            // console.log("moving now ! Mouse: [X:"+evt.stageX+",Y:"+evt.stageY+"]");
            this.player.x = _x;
            this.player.y = _y;
            console.log(this.player.x);
            // let _y = evt.stageY - this._distance.y;
            // egret.Tween.get( this.player ).to({x:_x,y:_y}, 1000, egret.Ease.sineIn);
        }
    };
    MainHandler.prototype.mouseUp = function (evt) {
        this.player.run("center");
        this._touchStatus = false;
        this.mian.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    return MainHandler;
}());
__reflect(MainHandler.prototype, "MainHandler");
//# sourceMappingURL=MainHandler.js.map