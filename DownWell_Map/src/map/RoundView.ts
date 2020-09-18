class RoundView  extends egret.DisplayObjectContainer{


	public constructor() {
		super();

		var bmp = new egret.Bitmap();
		bmp.x = 210;
		bmp.y = 460;
		bmp.texture = RES.getRes("round_png");
		this.addChild(bmp);
	}
}