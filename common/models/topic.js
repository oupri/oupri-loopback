'use strict';
const readTopicsFromFile = require('../../methods/read.topics.from.file')
const createTopicInstances = require('../../methods/create.topic.instances')
const syncTopicOnCreation = require('../../methods/sync.topic.on.creation')

module.exports = function (Topic) {

  Topic.sync = function (cb) {
    /*
        1. Read all the topics from a file and create instances
        2. In after save hook of topic, sync with the graph
    */
    readTopicsFromFile()
      .then(function (topics) {
        createTopicInstances(Topic, topics)
      })
      .then(function () {
        cb(null, 'Synced... ');
      }).catch(function (e) {
        console.log('Error while syncinc ', e)
      })

  }

  Topic.remoteMethod('sync', {})

  //add operation hook that will sync instance with graph on creation
  syncTopicOnCreation(Topic)
}
