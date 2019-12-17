## egg-react-instagram

### 后端
egg + sequeize + mysql

### 前端
create-react-app + less + mobx + flyio


- git clone [git@github.com:localSummer/egg-react-instagram.git](git@github.com:localSummer/egg-react-instagram.git)

> 启动后端 http://localhost:7000
- 请确保本地已装mysql，并配置全局变量
- mysql -u root -p 并输入数据库密码
- create database learn; 创建learn数据库
- use learn; 切换数据库
- source learn.sql的路径(项目db目录下，source 路径使用绝对路径)
配置egg.js连接数据库信息

- cd egg-instagram
- npm i
- npm run dev

> 启动前端 http://localhost:3000
跨域请求代理 在 `src/setupProxy.js` 配置

- cd react-instagram
- npm install
- npm start

> 该项目参考了 Github 作者 zhoushaw 的开源项目 Instagram [https://github.com/zhoushaw/Instagram](https://github.com/zhoushaw/Instagram)