const Members = require('../models/member.model');
const Teams = require('../models/team.model');
const setUp = require('./mock.data');
const membersSync = async () => {
    await Members.deleteMany();
    await Members.insertMany(setUp.members)
}
const teamSync = async () => {
    await Teams.deleteMany();
    await Teams.insertMany(setUp.teams);
}
module.exports.dbSync = {
    memberssync: membersSync,
    teamsync: teamSync
}