var fishGame = fishGame || {};

(function(){
	fishGame.Config = {
		//生成道具行列数
		ROWS: 6,
		COLS: 8,
		//初始生成格子数
		INIT_GRIDS: 16,

		//ROWS*COLS个格子占用屏幕百分比
		GRIDS_WIDTH: 80,
		GRIDS_HEIGHT: 70,

		//格子垂直对齐方式0-1
		GRIDS_VERTICAL_ALIGN: 0.25,

		//鱼钩移动速度, xxx像素/秒
		HOOK_SPEED: 500,

		//闲置状态下，鱼钩的摆动速度, xxx像素/秒
		HOOK_SHAKE_SPEED: 20,

		//闲置状态下，鱼钩的摆动幅度
		HOOK_SHAKE_RANGE: 40,

		//闲置状态下，鱼钩上下浮动幅度
		HOOK_SHAKE_Y: 25,

		//单局游戏时间
		TIME: 45,

		//在鱼钩正处于下沉时，是否允许更改它的目的地
		ALLOW_CHANGE_AIM: true,

		//答题时的默认选项
		//-1表示没有默认选项，此时用户点确定，会提示选择一个选项
		//0,1 表示默认选项为第几个
		DEFAULT_SELECTION: -1,

		//分享后额外奖励积分数
		SHARE_REWARD_SCORE: 50,

		/*
		* 气泡生成(距离屏幕底部)位置
		*/
		BUBBLE_GEN_TOP: [0, 80],
		/*目前气泡图片尺寸为32x32*/
		/*
		* 气泡上浮最大高度
		* 实际上浮目标点应该是,钓鱼区域高度-BUBBLE_TOP_RANGE
		* 钓鱼区域高度为屏幕高度的2/3
		* 对于高度为960的设备，钓鱼区域高度为: 640
		* 则气泡上浮高度范围为: [640-50, 640-250]
		*/
		BUBBLE_TOP_RANGE: [50, 250],
		//单个气泡存活时间(秒)
		BUBBLE_LIFE_RANGE: [5, 10],
		//气泡生成时的缩放比例
		BUBBLE_INIT_SCALE: 0.1,
		//单个气泡放到范围
		BUBBLE_SCALE_RANGE: [0.3, 0.8],
		//气泡产生屏幕 x秒/个
		BUBBLE_FREQUENCE: 1,
		//抓住道具时，生成的气泡数量
		GEN_BUBBLE_RANGE: [3, 8],

		//屏幕上同时存在的气泡数量
		//目前气泡有两种产生方式
		//1, 每隔(BUBBLE_FREQUENCE)生成一个
		//2, 当有道具被抓住时，在道具位置生成(GEN_BUBLE_RANGE)个气泡
		//抓住道具时生成气泡的数量不受MAX_BUBBLES限制
		MAX_BUBBLES: 15,

		//排行榜界面显示最大排行数
		MAX_ARENA: 15,

		//用于设定每种道具同时存在于屏幕的最大个数
		//以及单局游戏做多出现个数
		//[道具名,同时存在最大个数,单局出现最大个数]
		//如果单局出现最大个数为-1，表示没有限制
		STUFFS: [
			['box', 3, 3],
			['can', 5, -1],
			['gold', 4, -1],
			['gold2', 4, -1],
			['silver', 4, -1],
			['clock', 2, -1],
			['bomb', 3, -1]
		],
		//用于定于显示与结束界面上的道具列表
		//SHOWS,UNITS,NAMES元素个数【【必须一样】】
		SHOWS: ['can', 'gold', 'gold2', 'silver'],
		//道具计量单位
		UNITS: ['桶', '盎司', '个', '个'],
		//道具名
		NAMES: ['原油','黄金','金元宝','银元宝'],
		ALL_STUFFS: ['can','gold','gold2','silver','bomb','box','clock'],
		ALL_NAMES: ['原油','黄金','金元宝','银元宝', "炸弹", '宝箱', '沙漏'],
	};

	//题目列表
	/**
	* 题目结构
	* {
	*	id: "题目id",
	*	title: "题目",
	* 	selections: ["选项1","选项2"]
	* 	index: 0	//答案
	* }
	**/
	fishGame.Questions = [
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest1"
		},
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest2"
		},
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest3"
		},
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest4"
		},
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest5"
		},
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest6"
		},
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest7"
		},
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest8"
		},
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest9"
		},
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest10"
		},
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest11"
		},
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest12"
		},
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest13"
		},
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest14"
		},
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest15"
		},
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest16"
		},
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest17"
		},
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest18"
		},
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest19"
		},
		{
			title: "请问你知道本拉登被击毙，对原油投资带来了哪些影响吗？",
			selections: ["原油价格下跌13.2%", "本拉登都死了，这还重要吗？！"],
			index: 0,
			id: "quest20"
		}
	];

	/*获取排名数据
	 *	cb原型
	 *	function(succ, list)
	 *	succ 获取成功与否
	 *	list 排名列表
	 *	列表结构:
	 * 	[{
	 *		openid: '',		//string 	微信openid
	 *		nickname: ''，	//string 	粉丝昵称
	 *		score: 1000		//integer 	积分数
	 * 	}]
	 * 	注意:
	 * 	列表应该按照积分从大到小排序
	 */
	fishGame.__GET_ARENA__ = function(cb){

		setTimeout(function(){
			/*test data*/
			var list = [];
			for(var i=0; i<fishGame.Config.MAX_ARENA; ++i){
				list.push({
					openid: '123',
					nickname: '照这个名字稍微有点长',
					score: 999999999
				});
			}

			cb(true, list);
		}, 3000);

		
	};

	/**
	* 	上传积分
	*  	cb原型
	* 	function(succ)
	*	succ: 成功与否
	**/
	fishGame.__UPLOAD_ARENA__ = function(score, cb){
		setTimeout(function(){
			cb(true);
		}, 3000);
	};

	/*
	* 返回微信分享信息(带成绩版)
	*
	*	score 	游戏分数
	*	hookes 	当前局捞取道具列表
	*	{
	*		can: 1,
	*		box: 3,
	*		gold: 5,
	*		....
	*   } 
	*	
	*	道具类型参照: fishGame.Config.ALL_STUFFS
	*
	*  	返回结构
	*	{
    *        "imgUrl": "http://xxxx",		//分享图片地址
    *        "img_width": "200",			//宽
    *        "img_height": "200",			//高
    *        "link": "http://xxxx",			//分享地址
    *        "desc": "",	//分享描述
    *        "title": ""						//分享标题
   	* 	};
	*/
	fishGame.__GET_SHARE_INFO__ = function(score, hookes){
		return {
            "imgUrl": "http://182.92.241.162/ICBC/res/index_banner.jpg",
            "img_width": "200",
            "img_height": "200",
            "link": "http://182.92.241.162/ICBC",
            "desc": "获得分数后的分享",
            "title": "黄金矿工"
    	};
	};

	/**
	* 返回默认微信分享信息
	* 在没有获得游戏分数时，使用这个版本的分享文案
	* 返回结构同__GET_SHARE_INFO__
	**/
	fishGame.__GET_DEFAULT_SHARE_INFO__ = function(){
		return {
            "imgUrl": "http://182.92.241.162/ICBC/res/index_banner.jpg",
            "img_width": "200",
            "img_height": "200",
            "link": "http://182.92.241.162/ICBC",
            "desc": "没获得分数前的分享",
            "title": "黄金矿工"
    	};
	}
})();