class MapGrid extends egret.Bitmap{


	public constructor() {
		super();
		
	}

	public set skin(name:string){
		this.texture = RES.getRes(name);
	}
}