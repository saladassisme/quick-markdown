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
    document.getElementById('article').innerHTML = mdRender.render(data)
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

