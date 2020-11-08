const Members = require('./services/models/member.model');

const getAllMembers = async () => {
    try {
        return await Members.find({});
    }
    catch (ex) {
        throw new Error({ status: 500, error: ex });
    }

}
const getAllMembersById = async (id) => {
    try {
        return await Members.findById(id);
    }
    catch (ex) {
        throw new Error({ status: 500, error: ex });
    }
}
const createMember = async (member) => {
    try {
        const newMember = await Members.create({
            firstname: member.firstname,
            lastname: member.lastname,
            team: member.team,
            jobtitle:member.jobtitle,
            status: member.status
        });
        return newMember;
    }
    catch (ex) {
        throw new Error({ status: 500, error: ex });
    }
}
const updateMember = async (id,member) => {
    try {
        const updateMember = await Members.findByIdAndUpdate(id,member);
        return updateMember;
    }
    catch (ex) {
        throw new Error({ status: 500, error: ex });
    }
}
module.exports.membersController = {
    getAllMembers: getAllMembers,
    getAllMembersById: getAllMembersById,
    createMember: createMember,
    updateMember:updateMember
}
