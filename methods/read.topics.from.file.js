const readline = require('linebyline')
const bluebird = require('bluebird')

module.exports = function () {
  var D = bluebird.pending()
  var topics = {}
  rl = readline('./assets/google.content.categories.txt');

  rl.on('line', function (line, lineCount, byteCount) {
    // do something with the line of text
    console.log('read line ', line)
    var words = line.split('/')
    var path = line
    var title = words[words.length - 1]
    topics[path] = {
      title: title,
      path: path
    }
  }).on('error', function (e) {
    D.reject(e)
    // something went wrong
  }).on('close', function () {
    console.log('completed reading the file')
    D.resolve(topics)
  })

  return D.promise
}
