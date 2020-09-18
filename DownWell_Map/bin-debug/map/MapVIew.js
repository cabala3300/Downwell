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
        _this.downCount = 1;
        _this.start();
        //关卡提示
        _this.round = new RoundView();
        _this.addChild(_this.round);
        //左墙
        _this.box1 = new Box();
        _this.box1.y = 1136;
        _this.addChild(_this.box1);
        //右墙
        _this.box2 = new Box();
        _this.box2.y = _this.box1.y + _this.box1.height + 50;
        _this.addChild(_this.box2);
        return _this;
    }
    MapVIew.prototype.start = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this);
    };
    MapVIew.prototype.stop = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHandler, this);
    };
    MapVIew.prototype.onEnterFrameHandler = function () {
        //地图移动速度
        this.round.y -= MapConfig._downSpeed;
        this.box1.y -= MapConfig._downSpeed;
        this.box2.y -= MapConfig._downSpeed;
        if (this.box1.y < -this.box1.height && this.box2.y < -this.box2.height && this.downCount >= 4) {
            this.stop();
        }
        //地图由两块组成
        if (this.box1.y < -this.box1.height) {
            ++this.downCount;
            if (this.downCount >= 4)
                this.round.y = this.box2.y + this.box2.height;
            else if (this.downCount < 4)
                this.box1.y = this.box2.y + this.box2.height + 50;
            // this.box1.arrangeBar();
        }
        else if (this.box2.y < -this.box2.height) {
            ++this.downCount;
            if (this.downCount >= 4)
                this.round.y = this.box1.y + this.box1.height;
            else if (this.downCount < 4)
                this.box2.y = this.box1.y + this.box1.height + 50;
            // this.box2.arrangeBar();
        }
    };
    return MapVIew;
}(egret.DisplayObjectContainer));
__reflect(MapVIew.prototype, "MapVIew");
var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        var _this = _super.call(this) || this;
        //添加左右障碍墙
        _this.arrangeGrid();
        //
        _this.barContainer = new egret.DisplayObjectContainer();
        _this.addChild(_this.barContainer);
        return _this;
        // this.arrangeBar();
    }
    /**
     * 排列左右障碍墙
     */
    Box.prototype.arrangeGrid = function () {
        for (var i = 0; i < 50; i++) {
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
     * 排列中间障碍
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
                mapGridCenter.x = leftOrRight == true ? (MapConfig._width * j + MapConfig._width) : (MapConfig._width * j + 640 - (arr[i] + 1) * MapConfig._width);
                mapGridCenter.y = (arr.length - 2 - i) * MapConfig._height;
            }
        }
    };
    Object.defineProperty(Box.prototype, "getArrangerBar", {
        /**
         * 随机障碍
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