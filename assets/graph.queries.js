module.exports = {
  create_member: 'CREATE (a:Member {alias: $alias}) RETURN a',
  create_topic: 'CREATE (a:Topic {title:$title,path: $path}) RETURN a',
  create_and_connect_topic: 'MATCH (parent:Topic) WHERE parent.path = $parent_path \
  CREATE (topic:Topic {title:$title,path: $path}),\
  (topic)-[:under]->(parent)'
}
