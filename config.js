var Config = {
    docRoot: 'pages/',
    homepage: 'docs/index.md',
    defaultTitle: 'quick-markdown',
    notFoundText: '',
    notFoundPage: '',
    theme: 'default',
    showFooterText: true,
    footerText: ''
}

if (typeof module === 'object') {
    module.exports = Config
}
