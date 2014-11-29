/**!
 * ΢�������������Javascript API�����ܰ�����
 *
 * 1�����?΢������Ȧ
 * 2�������΢�ź���
 * 3�����?��Ѷ΢��
 * 4���µķ���ӿڣ�������Ȧ�����ѡ�΢���ķ��?for iOS��
 * 5������/��ʾ���ϽǵĲ˵����
 * 6������/��ʾ�ײ������������
 * 7����ȡ��ǰ������״̬
 * 8������΢�ſͻ��˵�ͼƬ�������
 * 9���رչ���ƽ̨Webҳ��
 * 10���жϵ�ǰ��ҳ�Ƿ���΢������������д�
 * 11�����Ӵ�ɨ���ά��
 * 12��֧��WeixinApi�Ĵ�����
 *
 * @author zhaoxianlie(http://www.baidufe.com)
 */
var WeixinApi = (function () {

    "use strict";

    /**
     * ���?΢������Ȧ
     * @param       {Object}    data       ��������Ϣ
     * @p-config    {String}    appId      ����ƽ̨��appId������ſ��ã�
     * @p-config    {String}    imgUrl     ͼƬ��ַ
     * @p-config    {String}    link       ���ӵ�ַ
     * @p-config    {String}    desc       ����
     * @p-config    {String}    title      ����ı���
     *
     * @param       {Object}    callbacks  ��ػص�����
     * @p-config    {Boolean}   async                   ready�����Ƿ���Ҫ�첽ִ�У�Ĭ��false
     * @p-config    {Function}  ready(argv)             ����״̬
     * @p-config    {Function}  dataLoaded(data)        ��ݼ�����ɺ���ã�asyncΪtrueʱ���ã�Ҳ����Ϊ��
     * @p-config    {Function}  cancel(resp)    ȡ��
     * @p-config    {Function}  fail(resp)      ʧ��
     * @p-config    {Function}  confirm(resp)   �ɹ�
     * @p-config    {Function}  all(resp)       ���۳ɹ�ʧ�ܶ���ִ�еĻص�
     */
    function weixinShareTimeline(data, callbacks) {
    	data = data || __WX_SHARE_DATA;
        callbacks = callbacks || {};
        var shareTimeline = function (theData) {
            WeixinJSBridge.invoke('shareTimeline', {
                "appid":theData.appId ? theData.appId : '',
                "img_url":theData.imgUrl,
                "link":theData.link,
                "desc":theData.title,
                "title":theData.desc, // ע������Ҫ�����ȥ��������desc
                "img_width":"640",
                "img_height":"640"
            }, function (resp) {
                switch (resp.err_msg) {
                    // share_timeline:cancel �û�ȡ��
                    case 'share_timeline:cancel':
                        callbacks.cancel && callbacks.cancel(resp);
                        break;
                    // share_timeline:confirm ���ͳɹ�
                    case 'share_timeline:confirm':
                    case 'share_timeline:ok':
                        callbacks.confirm && callbacks.confirm(resp);
                        break;
                    // share_timeline:fail������ʧ��
                    case 'share_timeline:fail':
                    default:
                        callbacks.fail && callbacks.fail(resp);
                        break;
                }
                // ���۳ɹ�ʧ�ܶ���ִ�еĻص�
                callbacks.all && callbacks.all(resp);
            });
        };
        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            if (callbacks.async && callbacks.ready) {
                window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function();
                if(window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0) {
                    window["_wx_loadedCb_"] = new Function();
                }
                callbacks.dataLoaded = function (newData) {
                    window["_wx_loadedCb_"](newData);
                    shareTimeline(newData);
                };
                // Ȼ�����
                callbacks.ready && callbacks.ready(argv);
            } else {
                // ����״̬
                callbacks.ready && callbacks.ready(argv);
                shareTimeline(__WX_SHARE_DATA);
            }
        });
    }

    /**
     * ���͸�΢���ϵĺ���
     * @param       {Object}    data       ��������Ϣ
     * @p-config    {String}    appId      ����ƽ̨��appId������ſ��ã�
     * @p-config    {String}    imgUrl     ͼƬ��ַ
     * @p-config    {String}    link       ���ӵ�ַ
     * @p-config    {String}    desc       ����
     * @p-config    {String}    title      ����ı���
     *
     * @param       {Object}    callbacks  ��ػص�����
     * @p-config    {Boolean}   async                   ready�����Ƿ���Ҫ�첽ִ�У�Ĭ��false
     * @p-config    {Function}  ready(argv)             ����״̬
     * @p-config    {Function}  dataLoaded(data)        ��ݼ�����ɺ���ã�asyncΪtrueʱ���ã�Ҳ����Ϊ��
     * @p-config    {Function}  cancel(resp)    ȡ��
     * @p-config    {Function}  fail(resp)      ʧ��
     * @p-config    {Function}  confirm(resp)   �ɹ�
     * @p-config    {Function}  all(resp)       ���۳ɹ�ʧ�ܶ���ִ�еĻص�
     */
    function weixinSendAppMessage(data, callbacks) {
    	data = data || __WX_SHARE_DATA;
        callbacks = callbacks || {};
        var sendAppMessage = function (theData) {
            WeixinJSBridge.invoke('sendAppMessage', {
                "appid":theData.appId ? theData.appId : '',
                "img_url":theData.imgUrl,
                "link":theData.link,
                "desc":theData.desc,
                "title":theData.title,
                "img_width":"640",
                "img_height":"640"
            }, function (resp) {
                switch (resp.err_msg) {
                    // send_app_msg:cancel �û�ȡ��
                    case 'send_app_msg:cancel':
                        callbacks.cancel && callbacks.cancel(resp);
                        break;
                    // send_app_msg:confirm ���ͳɹ�
                    case 'send_app_msg:confirm':
                    case 'send_app_msg:ok':
                        callbacks.confirm && callbacks.confirm(resp);
                        break;
                    // send_app_msg:fail������ʧ��
                    case 'send_app_msg:fail':
                    default:
                        callbacks.fail && callbacks.fail(resp);
                        break;
                }
                // ���۳ɹ�ʧ�ܶ���ִ�еĻص�
                callbacks.all && callbacks.all(resp);
            });
        };
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            if (callbacks.async && callbacks.ready) {
                window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function();
                if(window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0) {
                    window["_wx_loadedCb_"] = new Function();
                }
                callbacks.dataLoaded = function (newData) {
                    window["_wx_loadedCb_"](newData);
                    sendAppMessage(newData);
                };
                // Ȼ�����
                callbacks.ready && callbacks.ready(argv);
            } else {
                // ����״̬
                callbacks.ready && callbacks.ready(argv);
                sendAppMessage(__WX_SHARE_DATA);
            }
        });
    }

    /**
     * ���?��Ѷ΢��
     * @param       {Object}    data       ��������Ϣ
     * @p-config    {String}    link       ���ӵ�ַ
     * @p-config    {String}    desc       ����
     *
     * @param       {Object}    callbacks  ��ػص�����
     * @p-config    {Boolean}   async                   ready�����Ƿ���Ҫ�첽ִ�У�Ĭ��false
     * @p-config    {Function}  ready(argv)             ����״̬
     * @p-config    {Function}  dataLoaded(data)        ��ݼ�����ɺ���ã�asyncΪtrueʱ���ã�Ҳ����Ϊ��
     * @p-config    {Function}  cancel(resp)    ȡ��
     * @p-config    {Function}  fail(resp)      ʧ��
     * @p-config    {Function}  confirm(resp)   �ɹ�
     * @p-config    {Function}  all(resp)       ���۳ɹ�ʧ�ܶ���ִ�еĻص�
     */
    function weixinShareWeibo(data, callbacks) {
    	data = data || __WX_SHARE_DATA;
        callbacks = callbacks || {};
        var shareWeibo = function (theData) {
            WeixinJSBridge.invoke('shareWeibo', {
                "content":theData.desc,
                "url":theData.link
            }, function (resp) {
                switch (resp.err_msg) {
                    // share_weibo:cancel �û�ȡ��
                    case 'share_weibo:cancel':
                        callbacks.cancel && callbacks.cancel(resp);
                        break;
                    // share_weibo:confirm ���ͳɹ�
                    case 'share_weibo:confirm':
                    case 'share_weibo:ok':
                        callbacks.confirm && callbacks.confirm(resp);
                        break;
                    // share_weibo:fail������ʧ��
                    case 'share_weibo:fail':
                    default:
                        callbacks.fail && callbacks.fail(resp);
                        break;
                }
                // ���۳ɹ�ʧ�ܶ���ִ�еĻص�
                callbacks.all && callbacks.all(resp);
            });
        };
        WeixinJSBridge.on('menu:share:weibo', function (argv) {
            if (callbacks.async && callbacks.ready) {
                window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function();
                if(window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0) {
                    window["_wx_loadedCb_"] = new Function();
                }
                callbacks.dataLoaded = function (newData) {
                    window["_wx_loadedCb_"](newData);
                    shareWeibo(newData);
                };
                // Ȼ�����
                callbacks.ready && callbacks.ready(argv);
            } else {
                // ����״̬
                callbacks.ready && callbacks.ready(argv);
                shareWeibo(__WX_SHARE_DATA);
            }
        });
    }


    /**
     * �µķ���ӿ�
     * @param       {Object}    data       ��������Ϣ
     * @p-config    {String}    appId      ����ƽ̨��appId������ſ��ã�
     * @p-config    {String}    imgUrl     ͼƬ��ַ
     * @p-config    {String}    link       ���ӵ�ַ
     * @p-config    {String}    desc       ����
     * @p-config    {String}    title      ����ı���
     *
     * @param       {Object}    callbacks  ��ػص�����
     * @p-config    {Boolean}   async                   ready�����Ƿ���Ҫ�첽ִ�У�Ĭ��false
     * @p-config    {Function}  ready(argv,shareTo)             ����״̬
     * @p-config    {Function}  dataLoaded(data)        ��ݼ�����ɺ���ã�asyncΪtrueʱ���ã�Ҳ����Ϊ��
     * @p-config    {Function}  cancel(resp,shareTo)    ȡ��
     * @p-config    {Function}  fail(resp,shareTo)      ʧ��
     * @p-config    {Function}  confirm(resp,shareTo)   �ɹ�
     * @p-config    {Function}  all(resp,shareTo)       ���۳ɹ�ʧ�ܶ���ִ�еĻص�
     */
    function weixinGeneralShare(data, callbacks) {
    	data = data || __WX_SHARE_DATA;
        callbacks = callbacks || {};
        var generalShare = function (general,theData) {

            // ����Ƿ��?����Ȧ������Ҫ��title��desc����һ��
            if(general.shareTo == 'timeline') {
                var title = theData.title;
                theData.title = theData.desc || title;
                theData.desc = title;
            }

            // �����ȥ
            general.generalShare({
                "appid":theData.appId ? theData.appId : '',
                "img_url":theData.imgUrl,
                "link":theData.link,
                "desc":theData.desc,
                "title":theData.title,
                "img_width":"640",
                "img_height":"640"
            }, function (resp) {
                switch (resp.err_msg) {
                    // general_share:cancel �û�ȡ��
                    case 'general_share:cancel':
                        callbacks.cancel && callbacks.cancel(resp ,general.shareTo);
                        break;
                    // general_share:confirm ���ͳɹ�
                    case 'general_share:confirm':
                    case 'general_share:ok':
                        callbacks.confirm && callbacks.confirm(resp ,general.shareTo);
                        break;
                    // general_share:fail������ʧ��
                    case 'general_share:fail':
                    default:
                        callbacks.fail && callbacks.fail(resp ,general.shareTo);
                        break;
                }
                // ���۳ɹ�ʧ�ܶ���ִ�еĻص�
                callbacks.all && callbacks.all(resp ,general.shareTo);
            });
        };
        WeixinJSBridge.on('menu:general:share', function (general) {
            if (callbacks.async && callbacks.ready) {
                window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function();
                if(window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0) {
                    window["_wx_loadedCb_"] = new Function();
                }
                callbacks.dataLoaded = function (newData) {
                    window["_wx_loadedCb_"](newData);
                    generalShare(general,newData);
                };
                // Ȼ�����
                callbacks.ready && callbacks.ready(general,general.shareTo);
            } else {
                // ����״̬
                callbacks.ready && callbacks.ready(general,general.shareTo);
                generalShare(general,__WX_SHARE_DATA);
            }
        });
    }

    /**
     * �ӹ�ע���˹���ֻ����ʱ�ȼ��ϣ�������ΪȨ���������⣬�����ã�������վ���ǲ�����*.qq.com�£�Ҳ����У�
     * @param       {String}    appWeixinId     ΢�Ź��ں�ID
     * @param       {Object}    callbacks       �ص�����
     * @p-config    {Function}  fail(resp)      ʧ��
     * @p-config    {Function}  confirm(resp)   �ɹ�
     */
    function addContact(appWeixinId,callbacks){
        callbacks = callbacks || {};
        WeixinJSBridge.invoke("addContact", {
            webtype: "1",
            username: appWeixinId
        }, function (resp) {
            var success = !resp.err_msg || "add_contact:ok" == resp.err_msg || "add_contact:added" == resp.err_msg;
            if(success) {
                callbacks.success && callbacks.success(resp);
            }else{
                callbacks.fail && callbacks.fail(resp);
            }
        })
    }

    /**
     * ����΢��Native��ͼƬ���������
     * �������Բ������ǿ��⣬������Ϸ���ֱ�ӻᵼ��΢�ſͻ���crash
     *
     * @param {String} curSrc ��ǰ���ŵ�ͼƬ��ַ
     * @param {Array} srcList ͼƬ��ַ�б�
     */
    function imagePreview(curSrc,srcList) {
        if(!curSrc || !srcList || srcList.length == 0) {
            return;
        }
        WeixinJSBridge.invoke('imagePreview', {
            'current' : curSrc,
            'urls' : srcList
        });
    }

    /**
     * ��ʾ��ҳ���Ͻǵİ�ť
     */
    function showOptionMenu() {
        WeixinJSBridge.call('showOptionMenu');
    }


    /**
     * ������ҳ���Ͻǵİ�ť
     */
    function hideOptionMenu() {
        WeixinJSBridge.call('hideOptionMenu');
    }

    /**
     * ��ʾ�ײ�������
     */
    function showToolbar() {
        WeixinJSBridge.call('showToolbar');
    }

    /**
     * ���صײ�������
     */
    function hideToolbar() {
        WeixinJSBridge.call('hideToolbar');
    }

    /**
     * �������¼������ͣ�
     *
     * network_type:wifi     wifi����
     * network_type:edge     ��wifi,��3G/2G
     * network_type:fail     ����Ͽ�����
     * network_type:wwan     2g����3g
     *
     * ʹ�÷�����
     * WeixinApi.getNetworkType(function(networkType){
     *
     * });
     *
     * @param callback
     */
    function getNetworkType(callback) {
        if (callback && typeof callback == 'function') {
            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                // �������õ�e.err_msg��������Ͱ������е���������
                callback(e.err_msg);
            });
        }
    }

    /**
     * �رյ�ǰ΢�Ź���ƽ̨ҳ��
     * @param       {Object}    callbacks       �ص�����
     * @p-config    {Function}  fail(resp)      ʧ��
     * @p-config    {Function}  success(resp)   �ɹ�
     */
    function closeWindow(callbacks) {
        callbacks = callbacks || {};
        WeixinJSBridge.invoke("closeWindow",{},function(resp){
            switch (resp.err_msg) {
                // �رճɹ�
                case 'close_window:ok':
                    callbacks.success && callbacks.success(resp);
                    break;

                // �ر�ʧ��
                default :
                    callbacks.fail && callbacks.fail(resp);
                    break;
            }
        });
    }

    /**
     * ��ҳ�������Ϻ�ִ�У�ʹ�÷�����
     * WeixinApi.ready(function(Api){
     *     // ������ֻ��Api����WeixinApi
     * });
     * @param readyCallback
     */
    function wxJsBridgeReady(readyCallback) {
        if (readyCallback && typeof readyCallback == 'function') {
            var Api = this;
            var wxReadyFunc = function () {
                readyCallback(Api);
            };
            if (typeof window.WeixinJSBridge == "undefined"){
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', wxReadyFunc, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', wxReadyFunc);
                    document.attachEvent('onWeixinJSBridgeReady', wxReadyFunc);
                }
            }else{
                wxReadyFunc();
            }
        }
    }

    /**
     * �жϵ�ǰ��ҳ�Ƿ���΢������������д�
     */
    function openInWeixin(){
        return /MicroMessenger/i.test(navigator.userAgent);
    }

    /*
     * ��ɨ���ά��
     * @param       {Object}    callbacks       �ص�����
     * @p-config    {Function}  fail(resp)      ʧ��
     * @p-config    {Function}  success(resp)   �ɹ�
     */
    function scanQRCode (callbacks) {
        callbacks = callbacks || {};
        WeixinJSBridge.invoke("scanQRCode",{},function(resp){
            switch (resp.err_msg) {
                // ��ɨ�����ɹ�
                case 'scan_qrcode:ok':
                    callbacks.success && callbacks.success(resp);
                    break;

                // ��ɨ����ʧ��
                default :
                    callbacks.fail && callbacks.fail(resp);
                    break;
            }
        });
    }

    /**
     * ����Api��debugģʽ��������˸�ʲô������alert�����㣬����һֱ�ܿ�Ƶ������Ķ��������
     * @param    {Function}  callback(error) �����Ļص���Ĭ����alert
     */
    function enableDebugMode(callback){
        /**
         * @param {String}  errorMessage   ������Ϣ
         * @param {String}  scriptURI      ������ļ�
         * @param {Long}    lineNumber     ���������к�
         * @param {Long}    columnNumber   ���������к�
         */
        window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber) {

            // ��callback������£���������Ϣ���ݵ�options.callback��
            if(typeof callback === 'function'){
                callback({
                    message : errorMessage,
                    script : scriptURI,
                    line : lineNumber,
                    column : columnNumber
                });
            }else{
                // �������������alert��ʽֱ����ʾ������Ϣ
                var msgs = [];
                msgs.push("������д?����");
                msgs.push("\n������Ϣ��" , errorMessage);
                msgs.push("\n�����ļ���" , scriptURI);
                msgs.push("\n����λ�ã�" , lineNumber + '�У�' + columnNumber + '��');
                alert(msgs.join(''));
            }
        }
    }

    return {
        version         :"2.4",
        enableDebugMode :enableDebugMode,
        ready           :wxJsBridgeReady,
        shareToTimeline :weixinShareTimeline,
        shareToWeibo    :weixinShareWeibo,
        shareToFriend   :weixinSendAppMessage,
        generalShare    :weixinGeneralShare,
        addContact      :addContact,
        showOptionMenu  :showOptionMenu,
        hideOptionMenu  :hideOptionMenu,
        showToolbar     :showToolbar,
        hideToolbar     :hideToolbar,
        getNetworkType  :getNetworkType,
        imagePreview    :imagePreview,
        closeWindow     :closeWindow,
        openInWeixin    :openInWeixin,
        scanQRCode      :scanQRCode
    };
})();