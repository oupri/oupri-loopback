const bluebird = require('bluebird')
const async = require('async')
const ALREADY_EXISTS_ERROR = 409
module.exports = function (Topic, topics) {
  var D = bluebird.pending()
  //console.log('topics ', topics)
  console.log('topics array ', Object.keys(topics).slice(0, 5))
  var topics_list = Object.keys(topics) //.slice(0, 5)
  async.mapSeries(topics_list, function (topic_path, cb) {
    var topic = topics[topic_path]
    console.log('topic_path ', topic_path)
    console.log('topic instance ', topic)

    topic.synced = false
    topic.level = topic_path.split('/').length - 1

    Topic.findById(topic.path)
      .then(function (existing_topic) {
        if (existing_topic) {
          console.log('topic ', topic.path, ' already exists')
          cb(null)
        } else {
          Topic.create(topic)
            .then(function () {
              cb(null)
            }).catch(function (err) {
              console.log('Error while creating topic instance ', err.statusCode)
              cb(err)
            })
        }
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
