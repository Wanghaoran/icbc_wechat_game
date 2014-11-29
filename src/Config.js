var fishGame = fishGame || {};

(function(){
	fishGame.Config = {
		REDIRECT_URL: "http://mp.weixin.qq.com/s?__biz=MjM5MTUxMDIwNA==&mid=202304968&idx=1&sn=787317e40529c7a8afb5edf50e98ec39#rd",
		//游戏规则文案
		GAME_TIP: "游戏开始后，依据吊钩摆动的角度，适时点击屏幕下放鱼钩，钓取宝物，点击宝箱还有额外惊喜，快来挑战吧！",
		//提示分享文案
		SHARE_TIP: "快快分享游戏，拉小伙伴一起挑战吧~",
		//答对文案
		QUESTION_CORRECT_TIP: "恭喜你，向投资大鳄的方向又迈进了一步！+800 points",
		//答错文案
		QUESTION_WRONG_TIP: "还需要继续努力呦，错失增加800积分机会，关注工银投资交易订阅号，了解更多答题秘籍！",
		//开始答题前界面文案
		QUESTION_START_TIP: "恭喜您，获得宝箱一个，快快点击有惊喜！",

		ARENA_TOP_TIP: "★ 以下为截至目前积分排名前100名的用户",
		ARENA_BOTTOM_TIP: "★ 由于系统数据传输存在一定延迟，实时排行榜仅供参考。",

		REWARD_BOTTOM_TIP: "★ 获奖玩家须于名单公布后一周内发送自己的“姓名+手机号”（分享达人奖获奖玩家还须发送寄送地址）至“工银投资交易”官方微信，用于手机话费充值和奖品寄送，未在规定时间内发送相关信息，视为用户主动放弃获奖资格。为保证您及时获取获奖信息，请点击关注“工银投资交易”官方微信。",

		//排行榜第一名文字颜色
		ARENA_1_COLOR: [255, 99, 27, 255],
		//排行榜其他排名文字颜色
		ARENA_COLOR: [0, 0, 0, 255],

		ARENA_TOP_TIP_COLOR: [195, 0, 19, 255],
		ARENA_BOTTOM_TIP_COLOR: [195, 0, 19, 255],

		REWARD_TIP_COLOR: [195, 0, 19, 255],
		REWARD_COLOR: [0, 0, 0, 255],

		//生成道具行列数
		ROWS: 6,
		COLS: 8,
		//初始生成格子数
		INIT_GRIDS: 20,

		//ROWS*COLS个格子占用屏幕百分比
		GRIDS_WIDTH: 80,
		GRIDS_HEIGHT: 70,

		//格子垂直对齐方式0-1
		GRIDS_VERTICAL_ALIGN: 0.25,

		//鱼钩移动速度, xxx像素/秒
		HOOK_SPEED: 500,

		//闲置状态下，鱼钩的摆动速度, xxx像素/秒
		HOOK_SHAKE_SPEED: 80,

		//鱼钩相对于水池高度的百分比
		//用于定位鱼钩起始Y坐标
		//此值越小，鱼钩越靠下
		HOOK_POSITION_Y: 90,

		//闲置状态下，鱼钩的摆动幅度
		HOOK_SHAKE_RANGE: 80,

		//闲置状态下，鱼钩上下浮动幅度
		HOOK_SHAKE_Y: 25,

		//鱼钩下沉类型(1, 点哪到哪 2，保持鱼钩和y轴夹角不变)
		HOOK_MOVE_TYPE: 2,

		//游戏界面上的分数背景颜色,空表示没有背景
		//否则为颜色值[red,green,blue,alpha], 举例[255,255,255,128]
		SCORE_BG_COLOR: null,
		//游戏界面上计时器背景颜色，空表示没有，填法统SCORE_BG_COLOR
		TIMER_BG_COLOR: null,
		//分数控件文字颜色
		SCORE_COLOR: [0, 0, 0, 255],
		//时间空间文字颜色
		TIMER_COLOR: [0, 0, 0, 255],

		//单局游戏时间
		TIME: 45,

		//在鱼钩正处于下沉时，是否允许更改它的目的地
		ALLOW_CHANGE_AIM: false,

		//答题时的默认选项
		//-1表示没有默认选项，此时用户点确定，会提示选择一个选项
		//0,1 表示默认选项为第几个
		DEFAULT_SELECTION: -1,

		//分享后额外奖励积分数,0表示不奖励积分
		SHARE_REWARD_SCORE: 0,

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
		MAX_ARENA: 100,

		//奖励名单界面显示最大行数
		MAX_REWARD: 15,

		//用于设定每种道具同时存在于屏幕的最大个数
		//以及单局游戏做多出现个数
		//[道具名,同时存在最大个数,单局出现最大个数]
		//如果单局出现最大个数为-1，表示没有限制
		STUFFS: [
			['box', 6, 8],
			['can', 6, -1],
			['gold', 6, -1],
			['gold2', 4, -1],
			['silver', 5, -1],
			['clock', 2, -1],
			['bomb', 3, -1],
			['stone', 5, -1]
		],
		//箱子比较特殊，它的积分额外定义
		BOX_REWARD_SCORE: 800,
		//每种道具奖励时间和积分数
		STUFF_REWARDS: {
			can: {
				score: 500, time: 0
			},
			gold: {
				score: 300, time: 0
			},
			gold2: {
				score: 300, time: 0
			},
			silver: {
				score: 50, time: 0
			},
			clock: {
				score: 0, time: 15
			},
			bomb: {
				score: -100, time: 0
			},
			stone: {
				score: 0, time: 0
			}
		},

		//抓取到道具时，对鱼钩上浮速度的影响
		//xxx像素/秒
		//注意，这里任何一个值和HOOK_SPEED都不应该变成负数
		STUFFS_SPEED: {
			box: -280,
			can: -350,
			gold: -320,
			gold2: -200,
			silver: -280,
			clock: -250,
			bomb: -220,
			stone: -400
		},
		//用于定于显示与结束界面上的道具列表
		//SHOWS,UNITS,NAMES元素个数【【必须一样】】
		SHOWS: ['can', 'gold', 'gold2', 'silver','box'],
		//道具计量单位
		UNITS: ['桶', '盎司', '个', '个','个'],
		//道具名
		NAMES: ['原油','黄金','金元宝','银元宝', '宝箱'],
		ALL_STUFFS: ['can','gold','gold2','silver','bomb','box','clock','stone'],
		ALL_NAMES: ['原油','黄金','金元宝','银元宝', "炸弹", '宝箱', '沙漏','石头'],

		//称号列表
		//[能获得称号的最低积分数，称号名称]
		SHARE_TITLES: [
			[0, "初级学者"],
			[1501, "投资能手"],
			[3001, "投资达人"],
			[4501, "投资大鳄"]
		]
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
			title: "前苏联与阿富汗的战争，除了对国际战略格局影响深远外，在金价的起伏上还带来了哪些影响？",
			selections: ["黄金价格上涨", "金价下跌"],
			index: 0,
			id: "quest1"
		},
		{
			title: "伊拉克战争对国际原油价格带来了什么影响？",
			selections: ["原油价格上涨", "原油价格下跌"],
			index: 0,
			id: "quest2"
		},
		{
			title: "想当年轰动全球的美国911恐怖袭击，对金融界产生的影响是以下哪一个？",
			selections: ["原油价格下跌", "黄金价格上涨"],
			index: 1,
			id: "quest3"
		},
		{
			title: "那一年美国发生的911恐怖袭击，对金融界产生的影响是以下哪一个？",
			selections: ["金价下跌", "原油价格上涨了"],
			index: 1,
			id: "quest4"
		},
		{
			title: "本拉登从地球上消失后，对全球金融市场造成重大影响。在黄金价格方面都发生了哪些变化？",
			selections: ["金价下跌", "金价上涨"],
			index: 0,
			id: "quest5"
		},
		{
			title: "本拉登从地球上消失后，对全球金融市场造成了重大影响。其中大宗商品价格中的",
			selections: ["原油价格上涨", "原油价格下跌"],
			index: 1,
			id: "quest6"
		},
		{
			title: "美国金融危机时的第一轮量化宽松政策解救了华尔街的金融公司，同时导致了（）",
			selections: ["黄金价格下跌", "黄金价格上涨"],
			index: 1,
			id: "quest7"
		},
		{
			title: "美国金融危机带来的全球性影响，让原油价格也随之发生了怎样的变化？",
			selections: ["原油价格上涨", "原油价格下跌"],
			index: 1,
			id: "quest8"
		},
		{
			title: "2013年美国零售数据以及消费者信心的意外下降，对大宗商品价格中的原油价格产生了以下哪种影响？",
			selections: ["原油价格下跌", "原油价格上涨"],
			index: 0,
			id: "quest9"
		},
		{
			title: "1990年，英国央行连续5次拍卖黄金。蝴蝶拍拍翅膀引起的连锁效应，都体现在以下哪个方面？",
			selections: ["黄金价格下跌", "原油价格下跌"],
			index: 0,
			id: "quest10"
		},
		{
			title: "2013年塞浦路斯出售黄金储备传言，降低了黄金购入成本，相当于变相的对黄金价格带来怎样的影响？",
			selections: ["黄金价格上涨", "黄金价格下跌"],
			index: 1,
			id: "quest11"
		},
		{
			title: "欧债危机作为美国次贷危机的延续，对原油价格产生了哪些影响？",
			selections: ["原油价格下跌", "原油价格上涨"],
			index: 0,
			id: "quest12"
		},
		{
			title: "你知道乌克兰危机所带来的大宗商品价格影响都有哪些吗？",
			selections: ["原油价格上涨", "原油价格下跌"],
			index: 0,
			id: "quest13"
		},
		{
			title: "作为史上代价最昂贵的灾难，日本大海啸引起的核泄漏导致黄金价格发生了怎样的变化？",
			selections: ["黄金价格下跌", "黄金价格上涨"],
			index: 1,
			id: "quest14"
		},
		{
			title: "工银账户类交易产品的实时交易资金需要多久才能到账？",
			selections: ["迅猛快捷，即时到账", "只需要T+1天"],
			index: 0,
			id: "quest15"
		},
		{
			title: "印有以下何种肖像的币种可作为工银账户原油的交易币种？",
			selections: ["英格兰银行首任行长约翰·霍布伦&李滉", "毛爷爷&本杰明·富兰克林"],
			index: 1,
			id: "quest16"
		},
		{
			title: "账户原油按期次推出，每期产品的期限大约为（）",
			selections: ["只需要30-40天", "足以环游世界的60-70天"],
			index: 0,
			id: "quest17"
		},
		{
			title: "“纸黄金”是纸做的吗？",
			selections: ["不是 ", "是的"],
			index: 0,
			id: "quest18"
		},
		{
			title: "账户原油可以做空吗？",
			selections: ["可以的，油价下跌时做空可以赚钱", "不可以"],
			index: 0,
			id: "quest19"
		},
		{
			title: "“纸白银”开户要交钱吗？",
			selections: ["免费的呢，开户费和交易手续费都没有的", "要交钱的"],
			index: 0,
			id: "quest20"
		},
		{
			title: "“纸黄金”可以提取实物黄金吗？",
			selections: ["不可以", "可以"],
			index: 0,
			id: "quest21"
		},
		{
			title: "客户买入工银账户黄金的价格为（）",
			selections: ["银行卖出价", "银行买入价"],
			index: 0,
			id: "quest22"
		},
		{
			title: "客户的账户贵金属份额可用于（）",
			selections: ["交易买卖", "支取"],
			index: 0,
			id: "quest23"
		},
		{
			title: "账户贵金属可以实现双向交易，如预期贵金属价格下跌，可以选择（）交易，实现价差收益。",
			selections: ["先买入后卖出", "先卖出后买入"],
			index: 1,
			id: "quest24"
		},
		{
			title: "一般情况下客户可以制定账户贵金属定投计划的时间为（）",
			selections: ["任意自然日", "任意工作日"],
			index: 0,
			id: "quest25"
		},
		{
			title: "账户原油的每笔交易起点与最小交易递增单位为：",
			selections: ["1桶", "0.1桶"],
			index: 0,
			id: "quest26"
		},
		{
			title: "目前世界上最大的黄金市场是（）",
			selections: ["苏黎世黄金市场", "伦敦黄金市场"],
			index: 1,
			id: "quest27"
		},
		{
			title: "在工行办理账户贵金属交易业务进行委托的有限期最长为（）",
			selections: ["96小时", "720小时"],
			index: 1,
			id: "quest28"
		},
		{
			title: "工银账户原油挂单交易的方式不包括（）",
			selections: ["获利挂单", "实时挂单"],
			index: 1,
			id: "quest29"
		},
		{
			title: "下列哪项目前不属于工行的账户贵金属产品？",
			selections: ["账户钯金", "账户铁"],
			index: 1,
			id: "quest30"
		},
		{
			title: "不同品种的账户原油可以转期吗？",
			selections: ["可以", "不可以"],
			index: 1,
			id: "quest31"
		},
		{
			title: "工银账户贵金属双向挂单中一个挂单生效后，另一挂单（）",
			selections: ["也生效", "自动失效"],
			index: 1,
			id: "quest32"
		},
		{
			title: "工银账户贵金属网银渠道交易时间安排是？（）",
			selections: ["可实现24小时连续交易", "有闭市时间"],
			index: 0,
			id: "quest33"
		},
		{
			title: "工银账户类交易涵盖的品种有：（）",
			selections: ["金、银、铂、钯", "金、银、铂"],
			index: 0,
			id: "quest34"
		},
		{
			title: "工银账户原油的品种有几个？",
			selections: ["3个", "2个"],
			index: 1,
			id: "quest35"
		},
		{
			title: "美元账户类交易产品中，哪一种交易起点和其他不同？",
			selections: ["铂", "银"],
			index: 1,
			id: "quest36"
		},
		{
			title: "工银账户类交易可以用信用卡开户吗？",
			selections: ["可以", "不可以"],
			index: 1,
			id: "quest37"
		},
		{
			title: "工银账户类交易能不能加杠杆？",
			selections: ["不能", "可以加"],
			index: 0,
			id: "quest38"
		},
		{
			title: "根据建立的投资计划，在一定期限内按照计划投资金额或数量定期买入账户贵金属产品的业务，称为（）",
			selections: ["账户贵金属定投交易", "账户贵金属双向交易"],
			index: 0,
			id: "quest39"
		}
	];

	/**
	* 拉取获奖名单列表
	* cb原型
	* function(succ, list)
	* succ 成功与否
	* list 获奖名单列表
	* 列表结构
	* [{
	* 	nickname: '', 		//String 昵称
	* }]
	**/
	fishGame.__GET_REWARD__ = function(cb){
		setTimeout(function(){
			/*test data*/
			var list = [];
			for(var i=0; i<fishGame.Config.MAX_REWARD; ++i){
				list.push({
					nickname: '照这个名字稍微有点长',
				});
			}

			cb(true, list);
		}, 3000);
	}

	/*获取排名数据
	 *	cb原型
	 *	function(succ, list)
	 *	succ 获取成功与否
	 *	list 排名列表
	 *	列表结构:
	 * 	[{
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
		var titles = fishGame.Config.SHARE_TITLES;
		var i = titles.length - 1;
		for(; i>=0; --i){
			if(score >= titles[i][0]){
				break;
			}
		}

		i = Math.max(0, i);

		return {
            "imgUrl": "http://182.92.241.162/ICBC/res/index_banner.jpg",
            "img_width": "200",
            "img_height": "200",
            "link": "http://182.92.241.162/ICBC",
            "desc": "我在投资交易大亨中赢得了"+score+"积分，获得了"+titles[i][1]+"称号",
            "title": "投资大亨"
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
            "desc": "钓宝有惊喜，等你来挑战！",
            "title": "投资大亨"
    	};
	}
})();