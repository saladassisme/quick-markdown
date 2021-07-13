<h1 class="doc-title">Hi, 欢迎使用 quick-markdown</h1>

quick-markdown 是一个 markdown 展示工具，能够快速为你的 markdown 文件生成展示页面。

$<toc{"containerId":"header-toc"}>

## 快速开始

fork 本项目，然后将你的 markdown 文件上传至 `docs` 目录，然后打开 github pages 服务，然后访问

```
<username>.github.io/quick-markdown/?<filename>
```

比如，我将文件名为 `example.md` 的文件上传至 docs 目录后，只需要访问

```
mengrru.github.io/quick-markdown/?example.md
```

即可浏览该文件的渲染后页面。

## config.js 说明

| 字段 | 说明 |
|----|----|
| docRoot | markdown 文件根目录，非必须，默认为本项目的 index.html 所在的目录 |
| homepage | 主页路由，非必须，默认是 index.md |
| defaultTitle | 页面默认标题，非必须 |
| notFoundText | 找不到页面时要显示的文字，非必须 |
| notFoundPage | 找不到页面时要显示的页面路由，非必须，在与 notFoundText 同时设置时，此项优先显示 |

## 路由规则

定义 url 中 `?` 后面的部分为路由。

- 路由中无须含有 docRoot
- 当目标目录中含有同名文件和目录时，会优先解析为目录中的 index.md

举例：

config.js:

```js
var Config = {
    docRoot: 'docs/',
    homepage: '',
    defaultTitle: '',
    notFoundText: '',
    notFoundPage: '',
}
```

docs/ 目录结构：

```
docs/
    example.md
    example
        index.md
```

如果路由为 `example` ，则会显示 `docs/example/index.md` 中的内容；如果路由为 `example.md`，则会显示 `docs/example.md` 中的内容。

如果 docs/ 的目录结构变为：

```
docs/
    example.md
```
则路由无论是 `example` 还是 `example.md` 都会显示 `docs/example.md` 中的内容。

## 支持语法

本项目 markdown 解释器使用 [markdown-it](https://github.com/markdown-it/markdown-it)，所以支持所有 markdown-it 原生支持的 markdown 语法。同时支持代码高亮显示。

除此之外，还默认支持以下几个 markdown-it 配套插件：

- [markdown-it-mark](https://github.com/markdown-it/markdown-it-mark)
- [markdown-it-container](https://github.com/markdown-it/markdown-it-container)
- [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor)
- [markdown-it-toc-done-right](https://github.com/nagaozen/markdown-it-toc-done-right)

其中为 markdown-it-container 设置了两个默认样式：`tips` 和 `warning`

另外，你可以通过为文字添加class `doc-title` 的方式来定义页面的标题：

```
<h1 class="doc-title">页面标题<h1>
```

## 样式自定义

你可以通过修改 `statics/md.style.default.css` 来自定义样式。

## 其它用途

由于 markdown-it 支持 html 和 markdown 混写，所以你可以使用 quick-markdown 来搭建自己的博客，比如这个[示例博客](https://github.com/mengrru/mengrru.github.io)