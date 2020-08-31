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
var MapGrid = (function (_super) {
    __extends(MapGrid, _super);
    function MapGrid() {
        return _super.call(this) || this;
    }
    Object.defineProperty(MapGrid.prototype, "skin", {
        set: function (name) {
            this.texture = RES.getRes(name);
        },
        enumerable: true,
        configurable: true
    });
    return MapGrid;
}(egret.Bitmap));
__reflect(MapGrid.prototype, "MapGrid");
//# sourceMappingURL=MapGrid.js.map