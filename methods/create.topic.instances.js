const bluebird = require('bluebird')
const async = require('async')

module.exports = function (Topic, topics) {
  var D = bluebird.pending()
  //console.log('topics ', topics)
  console.log('topics array ', Object.keys(topics).slice(0, 5))
  async.mapSeries(Object.keys(topics).slice(0, 5), function (topic_path, cb) {
    var topic = topics[topic_path]
    console.log('topic_path ', topic_path)
    console.log('topic instance ', topic)

    topic.synced = false
    topic.level = topic_path.split('/').length - 1

    Topic.create(topic)
      .then(function () {
        cb(null)
      }).catch(function (err) {
        cb(err)
      })

  }, function (err, results) {
    if (err) {
      D.reject(err)
    } else {
      D.resolve(results)
    }
  })

  return D.promise
}
