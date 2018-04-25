# LRC-m

### 一套基于 [LRC](https://lrc.jd.com) 的移动端组件库



## 开发

#### 代码结构

源码均在 [src 目录](./src)内。每个组件有自己的子目录。最终所有组件统一在 [src/index.js](./src/index.js) 中 export 出来。


为了实现按需加载，我们在项目中使用babel-plugin-import插件，所以组件目录结构遵循以下规范：
> 组件文件夹一律小写，实际组件名字使用大驼峰，则文件夹名字小写中间使用-分割(如 SearchBar ->  search-bar )

组件目录结构：(以Switch为例)
```
--switch(Switch组件文件夹)
----index.js(Switch组件)
----style（样式文件夹）
------index.js(样式入口js文件，在此入口js中 import './index.scss')
------index.scss

```


#### 编辑器

我们推荐使用 [Visual Studio Code](https://code.visualstudio.com/)。

#### 代码规范

我们已经为项目配置好了基于 [Airbnb JavaScript style guide](https://github.com/airbnb/javascript) 的 [ESLint](https://eslint.org/) 检查。**⚠请务必为你的 IDE 安装对应的 ESLint 插件。⚠**

#### 构建代码

执行 `npm run build`。

## 测试

执行 `npm test` 运行单元测试。

我们的单元测试使用 Facebook 开源的 [jest](https://facebook.github.io/jest/) 框架编写。如果你之前没接触过，请移步 [jest 文档](https://facebook.github.io/jest/docs/en/getting-started.html)学习。

**❤作为一名靠谱的工程师，请为你提交的修改编写相应的单元测试❤**


## 运行example示例

### 在编写组件时 首先执行

```
npm run watch
```
此命令会实时编译src下的代码到lib文件夹下


### 运行

```
npm run dev

```


## 讨论 / 问题反馈 / 建议

请移步 [issue 页面](http://git.jd.com/JDC-FE/lrc-m/issues)。

## Warning（重要！！！）

YepUI在编写scss时使用的是rem为单位，这样不够规范，在开发本组件时，统一换算成px，最终提供给用户的样式使用的都是px单位。
但是像border width 不需要转换的，需要使用大写  PX 为单位，这样插件会忽略
用户使用该组件库时，需要自己安装postcss的px-to-rem插件进行计算
