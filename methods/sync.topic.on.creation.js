module.exports = function (Topic) {
  Topic.observe('after save', function (ctx, next) {
    var topic = ctx.instance
    if (!topic.synced) {
      next()
      //   console.log('created topic instance ', ctx.instance)
      //   Member.app.neo4j.execute('create_topic_query', {
      //     alias: ctx.instance.alias
      //   }).then(function () {
      //     console.log('created member on graph')
      //     next()
      //   })
    } else {
      next()
    }

  });
}
