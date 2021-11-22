function loadPage (mdRender, query, errfn) {
    loadFile(resolveQuery(query, true), function (data) {
        renderPage(data, mdRender)
    }, function () {
        loadFile(resolveQuery(query, false), function (data) {
            renderPage(data, mdRender)
        }, function () {
            typeof errfn === 'function' ? errfn() : ''
        })
    })
}
function load404 (mdRender) {
    document.title = '404'
    if (Config.notFoundPage) {
        loadPage(mdRender, Config.notFoundPage, function () {
            document.getElementById('article').innerHTML = '<p style="text-align: center;">' + notFoundMessage + '</p>'
        })
    } else {
        document.getElementById('article').innerHTML = '<p style="text-align: center;">' + notFoundMessage + '</p>'
    }
}
function renderPage (data, mdRender) {
    document.getElementById('article').innerHTML = mdRender.render(renderFrontMatter(data))
    try {
        document.title = document.getElementsByClassName('doc-title')[0].textContent
    } catch (_) {}
}
function resolveQuery (query, isFileName) {
    if (query.substring(query.length - 3) === '.md') {
        return Config.docRoot + query
    }
    return query
    ? decodeURIComponent(Config.docRoot + query + (isFileName ? '.md' : '/index.md'))
    : resolveQuery(Config.homepage || 'index.md')
}

function loadFile (path, fn, errfn) {
    const request = new XMLHttpRequest()
    request.open('get', path)
    request.send(null)
    request.onload = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                fn(request.responseText)
            } else {
                console.warn('Load file ' + path + ' failed.')
                typeof errfn === 'function' ? errfn() : ''
            }
        }
    }
}
function loadCSS (url) {
    if (!url) {
        document.getElementsByTagName('html')[0].style.display = 'block'
        return
    }
    const head = document.getElementsByTagName('head')[0]
    const link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = url
    head.appendChild(link)
    document.getElementsByTagName('html')[0].style.display = 'block'
    return link
} 

function renderFrontMatter (content) {
    const res = {}
    if (content.indexOf('<!--') === 0) {
        const raw = content.match(/^<!--(.*?)-->/s)[1]
        raw.split('\n')
            .forEach(e => {
                if (e.replace(' ', '').length === 0) {
                    return
                }
                const d = e.split(':')
                res[d[0].replace(' ', '')] = d.slice(1).join('').replace(/^ /, '') 
            })
    }
    res.tags = res.tags ? res.tags.split(' ') : []

    let renderedTitle = ''
    let renderedTime = ''
    let renderedTags = ''
    let renderedAbstract = ''

    if (res.title) {
        renderedTitle = '<h1 class="doc-title">' + res.title + '</h1>'
    }
    if (res.time) {
        renderedTime = '<div class="doc-time">' + res.time + '</div>'
    }
    if (res.tags.length) {
        for (var i = 0; i < res.tags.length; i++) {
            renderedTags += '<span class="doc-single-tag">' + res.tags[i] + '</span>'
        }
        renderedTags = '<div class="doc-tags">' + renderedTags + '</div>'
    }
    if (res.abstract) {
        renderedAbstract = '\n\n> ' + res.abstract + '\n\n'
    }
    const rendered = 
        renderedTitle
        + '<div class="doc-info">'
            + renderedTime + renderedTags
        + '</div>'
        + renderedAbstract

    return rendered + content
}
