<h1 class="doc-title">插件系统</h1>

$<toc{}>

## 运行

执行命令：

```
node plugins/index.js
```

即可运行所有在 `plugins/config.json` 中设置的插件。

`plugins/config.json` 格式为 `插件目录名: 插件参数列表` 。同一个插件可运行多次。

如：

```
{
    "files-list": [
        "-d", "docs/",
        "-o", "data/docs-list",
        "-e", ".md"
    ],
    "files-list": [
        "-d", "docs/",
        "-o", "data/docs-list-2",
        "-e", ".html"
    ]
}
```

## 预置插件

### files-list - 文件列表

在 `index.html` 底部引入：

```
<script src="./plugins/files-list/ui.js"></script>
```

然后执行：

```
node plugins/files-list/index.js -d docs
```

最后在需要显示文件列表的地方插入代码：

```
<div class="plugins-files-list" data-path="data/files-list.output"></div>
```

效果如下：

<div data-time data-tags class="plugins-files-list" data-path="data/files-list.output"></div>

html 标签属性可选参数：

| 属性名 | 值类型 | 可选值 | 注释 |
| --- | --- | --- | --- |
| data-path | String | - | 数据源路径 |
| data-time | - | - | 显示时间 |
| data-tags | - | - | 显示标签 |
| data-abstract | - | - | 显示摘要 |
| data-sort | String | 'time' | 根据什么进行排序 |
| data-asc | - | - | 按照升序排列 |

### display - issue 内容展示
