const Concat = require('concat-with-sourcemaps')
const growl = require('growl')
const chokidar = require('chokidar')
const chalk = require('chalk')
const cache = require('./cache')
const util = require('./util')
const loadConfig = require('./config')
const fs = require('fs')
const convert = require('convert-source-map')
const jsondiffpatch = require('jsondiffpatch').create({
  cloneDiffValues: false
})

let buildPromise = null
let currConfig = JSON.parse(fs.readFileSync(util.makeAbsolute('./app.json'), 'utf8'))

exports.load = function () {
  return new Promise(function (resolve, reject) {
    if (buildPromise) {
      buildPromise.then(function (res) {
        resolve(res)
      }, reject)
    } else {
      build().then(resolve, reject)
    }
  })
}

let build = exports.build = function () {
  buildPromise = Promise.all([loadConfig.appConfig(), util.globJSfiles()])
    .then(function (res) {
      let config = res[0]
      let files = res[1].map(f => util.normalizePath(f))
      let pages = config.pages
      let [utils, routes] = util.groupFiles(files, config)
      let codes = []
      let paths = utils.concat('app.js', routes)
      return Promise.all(paths.map(path => util.parseJavascript(config, path)))
        .then(function (arr) {
          let obj = paths.map((path, i) => {
            return {path, code: arr[i].code, map: arr[i].map}
          })
          return concatFiles(obj, pages)
        })
    })
  return buildPromise
}

// build service file on start
build().then(res => {
  return res
}, err => {
  // exit on build error
  util.notifyError(err)
  throw new Error(err)
})


chokidar.watch('app.json', { cwd: loadConfig.cwd() }).on('change', path => {
  fs.readFile(util.makeAbsolute('./app.json'), 'utf8', (err, content) => {
    if (err) {
      console.log(chalk.red(err.stack))
      util.notifyError(err)
      return
    }
    let obj
    try {
      obj = JSON.parse(content)
    } catch (e) {}
    if (!obj) return
    let delta = jsondiffpatch.diff(currConfig, obj)
    currConfig = obj
    if (delta.pages) {
      buildPromise = null
      cache.del('codes')
      build().catch(err => {
        // exit on build error
        console.log(chalk.red(err.stack))
        util.notifyError(err)
        buildPromise = null
      })
    }
  })
})

// rebuild server.js for specified file
exports.buildFile = function (file) {
  let codes = cache.get('codes')
  if (!codes) return build()
  buildPromise = loadConfig.appConfig().then(config => {
    let pages = config.pages
    let route = file.replace(/\.js$/, '')
    let isPage = pages.indexOf(route) !== -1
    return util.parseJavascript(config, file).then(({code, map}) => {
      let exists
      for (let o of codes) {
        if (o.path == file) {
          exists = true
          o.code = code
          o.map = map
        }
      }
      if (!exists) {
        if (isPage) {
          codes.push({ path: file, code, map })
        } else {
          codes.unshift({ path: file, code, map })
        }
      }
      let result = concatFiles(codes, pages)
      buildPromise = null
      return result
    }, err => {
      buildPromise = null
      util.notifyError(err)
    })
  }, err => {
    buildPromise = null
    util.notifyError(err)
  })
}

function concatFiles(obj, pages) {
  cache.set('codes', obj)
  let concat = new Concat(true, 'service.js', '\n')
  for (let item of obj) {

    let path = item.path
    let route = path.replace(/\.js$/, '')
    let isPage = pages.indexOf(route) !== -1
    let code = item.code
    let map = item.map
    if (!isPage) {
      concat.add(item.path, item.code, item.map)
    } else {
      concat.add(null, `var __wxRoute = "${route}", __wxRouteBegin = true;`)
      concat.add(item.path, item.code, item.map)
    }
  }
  console.log(chalk.green(' ✓ service.js build success'))
  return concat.content + "\n" + convert.fromJSON(concat.sourceMap).toComment()
}