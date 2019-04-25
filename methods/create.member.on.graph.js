const create_query = 'CREATE (a:Member {alias: $alias}) RETURN a'
module.exports = function (Member) {
  Member.observe('after save', function (ctx, next) {
    if (ctx.isNewInstance) {
      //create member on graph database and then call next
      console.log('created member instance ', ctx.instance)
      Member.app.neo4j.execute(create_query, {
          alias: ctx.instance.alias
        })
        .then(function () {
          console.log('created member on graph')
          next()
        })
    } else {
      next()
    }

  });
}
