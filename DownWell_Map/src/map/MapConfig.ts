class MapConfig {


	public static _width = 32;
	public static _height = 32;

	public static _downSpeed = 10;

	//第一关左右 [纵数, 阻挡类型, 万分比]
	public static round_1_down_cout = 4;
	public static round_1_l_1= [2, 1, 5000/10000];
	public static round_1_l_2= [2, 1, 5000/10000];
	public static round_1_l_3= [2, 1, 5000/10000];
	public static round_1_l_4= [2, 1, 5000/10000];

	public static round_1_r_1= [3, 2, 5000/10000];
	public static round_1_r_2= [3, 2, 5000/10000];
	public static round_1_r_3= [3, 2, 5000/10000];
	public static round_1_r_4= [3, 2, 5000/10000];

	public constructor() {
		
	}

}

enum Person {
  name = 4,
  age = 3,
  love = 2,
  hobby = 1
}