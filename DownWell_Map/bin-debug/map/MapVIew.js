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
var MapVIew = (function (_super) {
    __extends(MapVIew, _super);
    function MapVIew() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrameHandler, _this);
        _this.box1 = new Box();
        _this.addChild(_this.box1);
        _this.box2 = new Box();
        _this.box2.y = _this.box1.y + _this.box1.height;
        _this.addChild(_this.box2);
        return _this;
    }
    MapVIew.prototype.onEnterFrameHandler = function () {
        this.box1.y -= 10;
        this.box2.y -= 10;
        if (this.box1.y < -this.box1.height) {
            this.box1.y = this.box2.y + this.box2.height;
            this.box1.arrangeBar();
        }
        else if (this.box2.y < -this.box2.height) {
            this.box2.y = this.box1.y + this.box1.height;
            this.box2.arrangeBar();
        }
    };
    return MapVIew;
}(egret.DisplayObjectContainer));
__reflect(MapVIew.prototype, "MapVIew");
var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        var _this = _super.call(this) || this;
        //
        _this.arrangeGrid();
        //
        _this.barContainer = new egret.DisplayObjectContainer();
        _this.addChild(_this.barContainer);
        _this.arrangeBar();
        return _this;
    }
    /**
     *
     */
    Box.prototype.arrangeGrid = function () {
        for (var i = 0; i < 20; i++) {
            var mapGridLeft = new MapGrid();
            mapGridLeft.skin = "grid_left_png";
            mapGridLeft.x = 0;
            mapGridLeft.y = i * MapConfig._height;
            this.addChild(mapGridLeft);
            var mapGridRight = new MapGrid();
            mapGridRight.skin = "grid_right_png";
            mapGridRight.x = 640 - MapConfig._width;
            mapGridRight.y = i * MapConfig._height;
            this.addChild(mapGridRight);
        }
    };
    /**
     *
     */
    Box.prototype.arrangeBar = function () {
        var leftOrRight = Math.random() < 0.5 ? true : false;
        var arr = this.getArrangerBar;
        var index = 0;
        for (var i = arr.length - 2; i >= 0; i--) {
            for (var j = 0; j < arr[i]; j++) {
                var mapGridCenter = void 0;
                if (this.barContainer.numChildren > index) {
                    mapGridCenter = this.barContainer.getChildAt(index);
                }
                else {
                    mapGridCenter = new MapGrid();
                    mapGridCenter.skin = "grid_center_png";
                    this.barContainer.addChild(mapGridCenter);
                }
                index++;
                mapGridCenter.x = leftOrRight == true ? (70 * j + 70) : (70 * j + 640 - (arr[i] + 1) * 70);
                mapGridCenter.y = (arr.length - 2 - i) * 70;
            }
        }
    };
    Object.defineProperty(Box.prototype, "getArrangerBar", {
        /**
         *
         */
        get: function () {
            var arr = new Array();
            var totalCont = 0;
            var verticalCount = Math.floor(Math.random() * 4) + 1;
            var lastCount = 5;
            for (var i = 0; i < verticalCount; i++) {
                var horizontalCount = Math.floor(Math.random() * lastCount) + 1;
                lastCount = horizontalCount;
                arr.push(horizontalCount);
                totalCont += horizontalCount;
                if (i == verticalCount - 1)
                    arr.push(totalCont);
            }
            console.log(arr);
            return arr;
        },
        enumerable: true,
        configurable: true
    });
    return Box;
}(egret.DisplayObjectContainer));
__reflect(Box.prototype, "Box");
//# sourceMappingURL=MapVIew.js.map