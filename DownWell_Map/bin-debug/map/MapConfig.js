var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapConfig = (function () {
    function MapConfig() {
    }
    MapConfig._width = 32;
    MapConfig._height = 32;
    MapConfig._downSpeed = 10;
    //第一关左右 [纵数, 阻挡类型, 万分比]
    MapConfig.round_1_down_cout = 4;
    MapConfig.round_1_l_1 = [2, 1, 5000 / 10000];
    MapConfig.round_1_l_2 = [2, 1, 5000 / 10000];
    MapConfig.round_1_l_3 = [2, 1, 5000 / 10000];
    MapConfig.round_1_l_4 = [2, 1, 5000 / 10000];
    MapConfig.round_1_r_1 = [3, 2, 5000 / 10000];
    MapConfig.round_1_r_2 = [3, 2, 5000 / 10000];
    MapConfig.round_1_r_3 = [3, 2, 5000 / 10000];
    MapConfig.round_1_r_4 = [3, 2, 5000 / 10000];
    return MapConfig;
}());
__reflect(MapConfig.prototype, "MapConfig");
var Person;
(function (Person) {
    Person[Person["name"] = 4] = "name";
    Person[Person["age"] = 3] = "age";
    Person[Person["love"] = 2] = "love";
    Person[Person["hobby"] = 1] = "hobby";
})(Person || (Person = {}));
//# sourceMappingURL=MapConfig.js.map