# node-proxy
使用node服务代理请求，例如xxx.js被墙无法请求到，可以使用该程序运行在可以访问的服务器上，然后通过代理请求返回结果；

如：
本程序部署在aaa.com下，我们需要获取bbb.com下的一个被墙的js可以使用：
```
<script src="aaa.com?url=http://bbb.com/xxx/xxx/js"></script>
```
替换原本的：
```
<script src="http://bbb.com/xxx/xxx/js"></script>
```

## 部署：

```
cd node-proxy
yarn install
node index.js

// 或者使用pm2
pm2 index.js
```
