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
var RoundView = (function (_super) {
    __extends(RoundView, _super);
    function RoundView() {
        var _this = _super.call(this) || this;
        var bmp = new egret.Bitmap();
        bmp.x = 210;
        bmp.y = 460;
        bmp.texture = RES.getRes("round_png");
        _this.addChild(bmp);
        return _this;
    }
    return RoundView;
}(egret.DisplayObjectContainer));
__reflect(RoundView.prototype, "RoundView");
//# sourceMappingURL=RoundView.js.map