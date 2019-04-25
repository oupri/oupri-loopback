module.exports = function (Topic) {
  Topic.observe('before save', function (ctx, next) {
    var topic = ctx.instance
    console.log('topic instance ', topic)
    var promise_result = null
    if (!topic.synced) {
      if (topic.level == 1) {
        promise_result = Topic.app.neo4j.execute('create_topic', {
          path: topic.path,
          title: topic.title
        })
      } else {
        console.log('topic path - ', topic.path)
        var parent_path = topic.path.slice(0, topic.path.length - topic.title.length - 1)
        console.log('topic path ', topic.path, ' parent_path ', parent_path)
        promise_result = Topic.app.neo4j.execute('create_and_connect_topic', {
          path: topic.path,
          title: topic.title,
          parent_path: parent_path
        })
      }
      promise_result.then(function () {
        ctx.instance.synced = true
        next()
      }).catch(function (err) {
        next(err)
      })
    } else {
      next()
    }

  });
}
