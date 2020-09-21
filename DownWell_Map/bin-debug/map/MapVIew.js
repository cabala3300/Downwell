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
        //结束停止
        if (this.box1.y < -this.box1.height && this.box2.y < -this.box2.height && this.downCount >= 4) {
            this.stop();
        }
        //当前关卡阶段数
        var count = MapConfig.round_1_down_cout;
        //地图由两块组成
        if (this.box1.y < -this.box1.height) {
            ++this.downCount;
            //每关结束显示关卡图
            if (this.downCount >= count)
                this.round.y = this.box2.y + this.box2.height;
            else if (this.downCount < count)
                this.box1.y = this.box2.y + this.box2.height + 50;
            // this.box1.arrangeBar();
        }
        else if (this.box2.y < -this.box2.height) {
            ++this.downCount;
            //每关结束显示关卡图
            if (this.downCount >= count)
                this.round.y = this.box1.y + this.box1.height;
            else if (this.downCount < count)
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
        //障碍容器
        _this.barContainer_l = new egret.DisplayObjectContainer();
        _this.addChild(_this.barContainer_l);
        _this.barContainer_r = new egret.DisplayObjectContainer();
        _this.addChild(_this.barContainer_r);
        _this.arrangeBar();
        return _this;
    }
    /**
     * 排列左右障碍墙
     * 50为一阶段，每关卡由若干个关卡组成
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
        // let count = MapConfig.round_1_down_cout;
        var countArr_l = [[2, 1, 5000 / 10000], [2, 1, 5000 / 10000], [2, 1, 5000 / 10000], [2, 1, 5000 / 10000]];
        var countArr_r = [[3, 1, 5000 / 10000], [3, 1, 5000 / 10000], [3, 1, 5000 / 10000], [3, 1, 5000 / 10000]];
        for (var i = 0; i < 50; i++) {
            var j = void 0;
            var index = 0;
            var mapGrid_l = void 0;
            //刷出阻碍几率
            var leftOrRight = Math.random() < 0.5 ? true : false;
            if (leftOrRight) {
                //左障碍
                for (j = 0; j < 2; j++) {
                    if (leftOrRight) {
                        // if(this.barContainer_l.numChildren > index)
                        // {
                        // 	mapGrid_l = this.barContainer_l.getChildAt(index);					
                        // }
                        // else
                        // {
                        mapGrid_l = new MapGrid();
                        mapGrid_l.skin = "bar_png";
                        this.barContainer_l.addChild(mapGrid_l);
                        // }	
                        index++;
                        mapGrid_l.x = j * MapConfig._width;
                        mapGrid_l.y = i * MapConfig._height;
                    }
                }
            }
            index = 0;
            //刷出阻碍几率
            leftOrRight = Math.random() < 0.5 ? true : false;
            //右障碍
            for (j = 0; j < 3; j++) {
                if (leftOrRight) {
                    // if(this.barContainer_l.numChildren > index)
                    // {
                    // 	mapGrid_l = this.barContainer_l.getChildAt(index);					
                    // }
                    // else
                    // {
                    mapGrid_l = new MapGrid();
                    mapGrid_l.skin = "bar_png";
                    this.barContainer_l.addChild(mapGrid_l);
                    // }	
                    index++;
                    mapGrid_l.x = (19 - j) * MapConfig._width;
                    mapGrid_l.y = i * MapConfig._height;
                }
            }
        }
        // //左障碍
        // for(var i = 0; i < count; i ++)
        // {
        // 	var j = 0;
        // 	var left = countArr_l[i];
        // 	var right = countArr_r[i];
        // 	for(var j = 0; j < count; j ++)
        // 	{
        // 	}
        // }
        //右障碍
        // let leftOrRight = Math.random() < 0.5 ? true : false;
        // let arr = this.getArrangerBar;
        // let index = 0;
        // for(var i = arr.length - 2; i >= 0 ; i --)
        // {
        // 	for(var j = 0; j < arr[i]; j ++)
        // 	{	
        // 		let mapGridCenter;
        // 		if(this.barContainer.numChildren > index)
        // 		{
        // 			mapGridCenter = this.barContainer.getChildAt(index);					
        // 		}
        // 		else
        // 		{
        // 			mapGridCenter = new MapGrid();
        // 			mapGridCenter.skin = "bar_png";
        // 			this.barContainer.addChild(mapGridCenter);
        // 		}	
        // 		index ++;					
        // 		mapGridCenter.x = leftOrRight == true ? (MapConfig._width * j + MapConfig._width) : (MapConfig._width * j + 640 - (arr[i] + 1) * MapConfig._width);
        // 		mapGridCenter.y = (arr.length - 2 - i) * MapConfig._height;
        // 	}
        // }
    };
    return Box;
}(egret.DisplayObjectContainer));
__reflect(Box.prototype, "Box");
//# sourceMappingURL=MapVIew.js.map