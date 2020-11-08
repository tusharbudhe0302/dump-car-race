const Teams = require('./services/models/team.model');

const getAllTeams = async () => {
    try {
        return await Teams.find({});
    }
    catch (ex) {
        throw new Error({ status: 500, error: ex });
    }

}
const getAllTeamById = async (id) => {
    try {
        return await Teams.findById(id);
    }
    catch (ex) {
        throw new Error({ status: 500, error: ex });
    }
}
module.exports.teamsController = {
    getAllTeams: getAllTeams,
    getAllTeamById: getAllTeamById
}
