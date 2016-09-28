# share
i_share是移动端分享微信、qq等的工具

## 本分享的样式是在nativeShare基础上进行修改的，js代码也参考和使用了一些nativeShare的代码。（非常感谢nativeShare作者的奉献精神！）

## 因为nativeShare只对qq和uc浏览器进行了判断，有不少局限性，同时发现腾讯新闻移动端网页有分享的功能，于是研究之！分享的代码还不错，由于是经过压缩的，我整理了很久。

## 浏览器支持
   - iphone
      - qq浏览器
      - uc不行（不知道是uc奇葩还是iPhone奇葩，即使是浏览器自带分享也不行）
   - Android
      - qq浏览器
      - uc浏览器
      - 一些支持调用qq浏览器的浏览器（需要安装了qq浏览器）
   - 除了uc外都有失败回调函数

### 使用方法

引入CSS文件

```
<link rel="stylesheet" href="css/i_share.css"/>
```

引入js文件

```
<script src="js/i_share.js"></script>
```

初始化

```
<script>
   i_share.init({
        title: '分享标题'
        ,description: '分享内容'
        ,url: '分享地址'
        ,from: '来源'
        ,imgUrl: '分享图片'
        //,fail: function(){} //分享不成功回调函数
    });
</script>
```

样式一

```
<div id="i_share" class="**show**"></div>
```

### 效果图
[<img src="http://365tianzhuan.com/share/share-demo3.png">](http://365tianzhuan.com/share/index.html).

### 扫码查看示例
[<img src="http://365tianzhuan.com/share/share-demo1.png">](http://365tianzhuan.com/share/index.html).


### 样式二

```
<div id="i_share" class="**hide**"></div>
```

### 效果图
[<img src="http://365tianzhuan.com/share/share-demo4.png">](http://365tianzhuan.com/share/index2.html).

扫码查看示例
[<img src="http://365tianzhuan.com/share/share-demo2.png">](http://365tianzhuan.com/share/index2.html).
