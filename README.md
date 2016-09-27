# share
移动端分享微信、qq等的工具

## 本分享的样式是在nativeShare基础上进行修改的，js代码也参考和使用了一些nativeShare的代码。

## 本分享也参考了腾讯新闻移动端分享的代码，由于腾讯代码是经过压缩的，我整理了很久。

### 使用方法

引入CSS文件

```
<link rel="stylesheet" href="nativeShare.css"/>
```

在需要放分享的地方插入以下代码


初始化

```
<script>
   i_share.init({
        title: '分享标题', 
        description: '分享内容',
        url: '分享地址',
        from: '来源',
        imgUrl: '分享图片'
    });
</script>
```

样式一

```
<div id="nativeShare" class="show"></div>
```

[<img src="http://365tianzhuan.com/share/share-demo1.png">](http://365tianzhuan.com/share/index.html).


样式二

```
<div id="nativeShare" class="hide"></div>
```

[<img src="http://365tianzhuan.com/share/share-demo2.png">](http://365tianzhuan.com/share/index2.html).
