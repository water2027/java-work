## 开发     
建议使用VScode+vue插件         
如果没有pnpm,执行以下指令
```sh
npm install -g pnpm
```    
如果没有npm，在[这里](https://nodejs.org/)下载        
记得添加环境变量

## Project Setup
克隆完成后进入根目录执行
```sh
pnpm install
```

### Compile and Hot-Reload for Development
开发环境，可以实时查看变化
```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production
生产环境，部署的时候用
```sh
pnpm build
```

### 代码规范        
组件名必须由两个单词组成，并且使用大驼峰命名。比如FormInput.vue       
页面命名最后是View，并且使用大驼峰命名。比如HomeView.vue            
接口/类型名使用大驼峰命名，变量使用小驼峰命名                  

写完代码记得用prettier插件格式化代码                 
尽量不要写成anyscript       

***
pr前先拉取，再推送            
先连接上游远程仓库
```sh
git remote add upstream https://github.com/water2027/java-work.git
```
之后拉取代码可以这样           
```sh
git pull upstream master --rebase
```
推送到自己仓库还是一样
```sh
git push origin master
```
                     