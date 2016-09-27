var i_share = {
    init: function(){
        var hrefs = location.search.split(/[=&]/g);
        var index = hrefs.indexOf('fromsharefriend');
        var self = this;

        self.setHtml();
        self.setEvent();

        if (self.browser.isFromQQBrower) {
            self.setQQBrower();
            if (index > -1) {
                var it =  setInterval(function(){
                    if (window.browser) {
                        clearInterval(it);
                        self.qbWxShare(hrefs[index+1]*1);
                    }
                },100);
            }
        }
    },
    QQBrower: false,
    setQQBrower: function(){
        var d = document.createElement("script");
        var a = document.getElementsByTagName("body")[0];
        d.setAttribute("src", 'http://jsapi.qq.com/get?api=app.share');
        a.appendChild(d);
        this.QQBrower = true;
    },
    $: $('#nativeShare'),
    setEvent: function(){
        var self = this;

        self.$.on('click', '.nativeShare', function(event) {
            var shareType = $(this).attr('data-app').split(':');
            self[shareType[0] + 'Share'](shareType[1]);
        });

        self.$.on('click', '.cancel', function(event) {
            self.$.addClass('hide');
        });
    },
    browser: (function() {
        var t = window.navigator.userAgent;
        return {
            isFromAndroid: /android/gi.test(t),
            isFromIos: /iphone|ipod|ios/gi.test(t),
            isFromWx: /MicroMessenger/gi.test(t),
            isFromQQ: /mobile.*qq/gi.test(t),
            isFromUC: /ucbrowser/gi.test(t),
            isFromQQBrower: /mqqbrowser[^LightApp]/gi.test(t),
            isFromQQBrowerLight: /MQQBrowserLightApp/gi.test(t)
        };
    })(),
    setHtml: function() {
        var html = '<div>' +
                    '<div class="sharetip hide">点击这里进行分享↑</div>' +
                    '<div class="list clearfix">' +
                        '<div data-app="tx:1" class="nativeShare weixin"> <i></i>' +
                        '<span>微信好友</span>' +
                        '</div>' +
                        '<div data-app="tx:8" class="nativeShare weixin_timeline"> <i></i>' +
                            '<span>微信朋友圈</span>' +
                        '</div>' +
                        '<div data-app="sinaWeibo" class="nativeShare weibo">' +
                            '<i></i>' +
                            '<span>新浪微博</span>' +
                        '</div>' +
                        '<div data-app="tx:4" class="nativeShare qq">' +
                            '<i></i>' +
                            '<span>QQ好友</span>' +
                        '</div>' +
                        '<div data-app="tx:3" class="nativeShare qzone">' +
                            '<i></i>' +
                            '<span>QQ空间</span>' +
                        '</div>' +
                        '<div data-app="TxWb:2" class="nativeShare more">' +
                            '<i></i>' +
                            '<span>腾讯微博</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="share-error-tip hide">请复制链接进行分享！</div>' +
                    '<div class="cancel">' +
                        '<a>取消</a>' +
                    '</div>' +
                '</div>';
        this.$.html(html);
    },
    shareConfig: {
        title: '1',
        description: '1',
        url: location.href,
        from: '',
        imgUrl: ''
    },
    appList: {
        sinaWeibo: ['kSinaWeibo', 'SinaWeibo', 11, '新浪微博'],
        weixin: ['kWeixin', 'WechatFriends', 1, '微信好友'],
        weixinCircle: ['kWeixinFriend', 'WechatTimeline', '8', '微信朋友圈'],
        QQ: ['kQQ', 'QQ', '4', 'QQ好友'],
        Qzone: ['kQzone', 'Qzone', '3', 'QQ空间']
    },
    url: {
        QQBDownload: 'http://mdc.html5.qq.com/d/directdown.jsp?channel_id=10349',
        sinaWeiboUrl: 'http://service.weibo.com/share/share.php?title={{title}}&url={{url}}&pic={{pic}}',
        TxWbShareUrl: 'http://share.v.t.qq.com/index.php?c=share&a=index&title={{title}}&url={{url}}&pic={{pic}}'
    },
    shareTip: function(){
        var it,$tip;

        clearTimeout(it);
        $tip = this.$.find('.sharetip').removeClass('hide');
        it = setTimeout(function(){
            $tip.addClass('hide');
        },3000);
    },
    isQbInstalled: function(t) {
        t = t || {};
        var e = t.testUrl || location.href
          , i = t.onSucc
          , n = t.onFail
          , a = Date.now()
          , o = 0
          , r = navigator.userAgent
          , s = 0
          , c = r.match(/iphone\s*os\s*\d/gi);
        c && (s = parseInt(c[0].split(" ")[2])),
        e = "mttbrowser://url=" + e.replace(/http:\/\//gi, "");
        var l = function() {
            a += 1e3,
            o += 1,
            3 > o ? setTimeout(l, 1e3) : Math.abs(a - Date.now()) > 1e3 ? i && i() : n && n()
        };

        if (s > 8){
            location.href = e;
        }
        else {
            var d = document.createElement("iframe");
            d.src = e,
            d.id = "qbInstallValidator_" + Date.now(),
            d.style.display = "none",
            document.body.appendChild(d),
            setTimeout(l, 1e3),
            setTimeout(function() {
                d && d.parentNode && d.parentNode.removeChild(d)
            }, 5e3)
        }
        return !1
    },
    qbWxShare: function(t) {
        console.log(1);
        var e = this.shareConfig;
        var ah = {
            title: e.title,
            description: e.description,
            url: e.url,
            img_url: e.imgUrl,
            to_app: t //微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,复制网址10,分享到微博11,创意分享13
        };

        window.browser && browser.app && browser.app.share && browser.app.share(ah);
    },
    ucWxShare: function(t) {
        var A = this.browser;
        var e = this.shareConfig;
        var p = this.appList;
        var l;
        var i = A.isFromIos ? 0 : 1;

        if (t == 1) {
            l = p.weixin;
        }else if (t == 8) {
            l = p.weixinCircle;
        }else if (t == 4) {
            l = p.QQ;
        }else if (t == 3) {
            l = p.Qzone;
        }

        if (A.isFromIos) {
            ucbrowser && ucbrowser.web_share(e.title, e.description, e.url, l[i], '', '@' + e.from, '');
        }else{
            A.isFromAndroid && ucweb && ucweb.startRequest("shell.page_share", [e.title, e.description, e.url, l[i], '', '@' + e.from, '']);
        }
    },
    txShare: function(t) {
        var A = this.browser;
        var self = this;
        var i = self.shareConfig.url.split("#");
        var n = i[0].indexOf("?") > 0 ? "&" : "?";
        var a = i[1] ? "#" + i[1] : "";
        var o = 'fromsharefriend=' + t;
        var e =  i[0] + n + o + a;


        if (A.isFromWx || A.isFromQQ) {
            self.shareTip();
        }else if(A.isFromUC){
            self.ucWxShare(t);
        }else if(A.isFromQQBrower){
            self.qbWxShare(t);
        }else if(A.isFromQQBrowerLight){
            self.fail.call(self, t);
        }else{
            self.isQbInstalled({
                testUrl: e,
                onSucc: function() {},
                onFail: function() {
                    self.fail.call(self, t);
                    //location.href = self.url.QQBDownload;
                }
            });
        }
    },
    sinaWeiboShare: function() {
        var e = this.shareConfig;
        var str = this.url.sinaWeiboUrl.replace('{{title}}', e.title).replace('{{url}}', e.url).replace('{{pic}}', e.imgUrl);

       window.location.href = str;
    },
    TxWbShare: function(t) {
       var e = this.shareConfig;
        var str = this.url.TxWbShareUrl.replace('{{title}}', e.title).replace('{{url}}', e.url).replace('{{pic}}', e.imgUrl);

       window.location.href = str;
       this.txShare(t);
    },
    fail: function(t){
        var $et = this.$.find('.share-error-tip').removeClass('hide');

        clearTimeout(this.to);
        this.to = setTimeout(function(){
            $et.addClass('hide');
        },3000);
    }
};
i_share.init();
