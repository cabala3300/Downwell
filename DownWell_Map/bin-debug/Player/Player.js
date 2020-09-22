var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        return _super.call(this) || this;
        // this.aDdEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Player.prototype.onAddToStage = function () {
        this._mcData = RES.getRes("player_json");
        this._mcTexture = RES.getRes("player_png");
        this.mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
        this.run("center");
    };
    Player.prototype.run = function (direction) {
        if (this.lastDirection == direction)
            return;
        this.lastDirection = direction;
        if (this.role) {
            this.role.parent.removeChild(this.role);
            this.role = null;
        }
        this.role = new egret.MovieClip(this.mcDataFactory.generateMovieClipData(direction));
        this.addChild(this.role);
        this.role.gotoAndPlay(1, 50);
        this.role.x = 270;
        this.role.y = 370;
        this.role.addEventListener(egret.Event.COMPLETE, function (e) {
            egret.log("play over!");
        }, this);
        var count = 0;
        this.role.addEventListener(egret.Event.LOOP_COMPLETE, function (e) {
            egret.log("play times:" + ++count);
        }, this);
        this.role.addEventListener(egret.MovieClipEvent.FRAME_LABEL, function (e) {
            egret.log("frameLabel:" + e.frameLabel);
        }, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            count = 0;
            this.role.gotoAndPlay(1, 4);
        }, this);
    };
    return Player;
}(egret.DisplayObjectContainer));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map