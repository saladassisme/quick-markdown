var Config = {
    docRoot: 'pages/',
    homepage: 'blog/index.md',
    defaultTitle: 'Centrifugal',
    notFoundText: '',
    notFoundPage: '',
    theme: 'default',
    showFooterText: true,
    footerText: ''
}

if (typeof module === 'object') {
    module.exports = Config
}
