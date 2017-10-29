## XSS攻击
主要是注入脚本，如论坛里面用户输入<script>alert();</script>，页面回显的时候如果没有处理js脚本，就可能造成攻击。angular的$sce就是用来处理XSS攻击的。

## CXRF攻击
http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html

https://mp.weixin.qq.com/s/WbrXl2PS4Kh7JtqXRCGAzQ

https://item.jd.com/12878817351.html

