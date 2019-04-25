'use strict';
const syncMemberOnCreation = require('../../methods/sync.member.on.creation')
module.exports = function (Member) {
  syncMemberOnCreation(Member)
}
