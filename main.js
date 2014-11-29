/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */
(function(){

    var _isPortraitShown = false;
    var isPortrait = function(){
        //电脑不判断
        if(!cc.sys.isMobile)return true;
        var d = document.documentElement;

        return d.clientWidth < d.clientHeight;
    };

    var isPortraitShown = function(){
        return _isPortraitShown;
    };
    //显示竖屏提示
    var showPortraitTip = function(){
        if(!_isPortraitShown){
            var div = cc.$("#portraitTip");
            if(div){
                _isPortraitShown = true;
                div.style.display = "block";
            }
        }
    };
    //隐藏竖屏提示
    var hidePortraitTip = function(){
        if(_isPortraitShown){
            _isPortraitShown = false;
            var div = cc.$("#portraitTip");
            if(div){
                div.style.display = "none";
            }
        }
    };

    var checkProtraitIntervar = null;

    var checkProtrait = function(){
        if(!checkProtraitIntervar){
            checkProtraitIntervar = setInterval(function(){
                if(!isPortrait()){
                    showPortraitTip();

                    cc.eventManager.dispatchCustomEvent("portrait", false);
                }else if(isPortraitShown()){
                    hidePortraitTip();

                    cc.eventManager.dispatchCustomEvent("portrait", true);
                }
            }, 1000);
        }
    };

    var waitPortrait = function(cb){
         if(!isPortrait()){
            showPortraitTip();

            var intervalId = setInterval(function(){
                if(isPortrait()){
                    hidePortraitTip();

                    clearInterval(intervalId);

                    cb();
                }
            }, 1000);

            return;
        }

        cb();
    };

    var preload = function(cb){
        var loaderScene = cc.LoaderScene.preload(g_resources, cb);
        loaderScene.setVisible(false);
    };

    var enterScene = function(){
        //开启横竖屏检查
        checkProtrait();

        //cc.director.runScene(new HelloWorldScene());
        var scene = fishGame.MainScene.create();
        cc.director.runScene(scene);
        fishGame.ViewManager.showView("StartView", scene);
    };

    var startup = function(){
        //cc.$("#gameCanvas").style.display = "block";
        var isWeixin = (cc.sys.isMobile && window.navigator.userAgent.indexOf("MicroMessenger") != -1);

        cc.view.adjustViewPort(true);
        //部分手机微信内置浏览器，在进入时，尺寸会发生改变
        //所以在微信下，把此值设置为true
        var autoResize = true;
        cc.view.resizeWithBrowserSize(false);
        var mode = (isWeixin)
                    ? cc.ResolutionPolicy.FIXED_WIDTH : (cc.sys.isMobile ? cc.ResolutionPolicy.FIXED_WIDTH : cc.ResolutionPolicy.SHOW_ALL);
        
        cc.view.setDesignResolutionSize(640, 1008, mode);

        cc.__jsLoader = {
            load: function(realUrl, url, res, cb){
                cc.loader._createScript(realUrl, false, cb);
            }
        } 

        cc.loader.register(".js", cc.__jsLoader);

        preload(function(){
            waitPortrait(function(){
                cc.$("#loadingView").style.display = "none";
                enterScene();
            })
        });
    };

    var timeout = 2500;


    cc.game.onStart = function(){
        cc.audioEngine.playMusic("res/bg.mp3", true);
        startup();
    };
    
    setTimeout(function(){
        waitPortrait(function(){
             cc.game.run();
        });
        //startup();
    }, timeout);
    
})();

