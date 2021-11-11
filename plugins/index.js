const NodeUtils = require('util')
const exec = NodeUtils.promisify(require('child_process').exec)
const fs = require('fs/promises')

main()

async function main () {
    const Config = JSON.parse(await fs.readFile(__dirname +'/config.json').catch(_ => process.exit(0)))

    for (const pluginName in Config) {
        try {
            const scriptPath = __dirname + '/' + pluginName + '/index.js'
            await fs.access(scriptPath)
            await exec(`node ${scriptPath} ${Config[pluginName].join(' ')}`)
        } catch (_) {}
    }
}

