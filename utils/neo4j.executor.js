const neo4j = require('neo4j-driver').v1;
const queries = require('../assets/graph.queries')

module.exports = function (uri, user, password) {
  var driver = null,
    session = null

  return {
    initialize: function () {
      driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
      session = driver.session()
    },
    execute: function (query_id, json) {
      console.log('Executing Query ' + query_id)
      console.log('with json ', json)
      return resultPromise = session.run(queries[query_id], json)

      //   resultPromise.then(result => {
      //     session.close();

      //     const singleRecord = result.records[0];
      //     const node = singleRecord.get(0);

      //     console.log(node.properties.name);

      //     // on application exit:
      //     driver.close();
      //   });
    },
    close: function () {
      session.close()
      driver.close()
    }
  }
}
