const Members = require('./services/models/member.model');

const getAllMembers = async () => {
    try {
        return await Members.find({});
    }
    catch (ex) {
        throw new Error({ status: 500, error: ex });
    }

}
const getMemberById = async (id) => {
    try {
        return await Members.findById({ _id: id });
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
            jobtitle: member.jobtitle,
            status: member.status
        });
        return newMember;
    }
    catch (ex) {
        throw new Error({ status: 500, error: ex });
    }
}
const updateMember = async (id, member) => {
    try {
        const updateMember = await Members.findByIdAndUpdate({ _id: id }, member);
        return updateMember;
    }
    catch (ex) {
        throw new Error({ status: 500, error: ex });
    }
}
const deleteMember = async (id) => {
    try {
        const deletedMember = await Members.findByIdAndDelete(id);
        return deletedMember;
    }
    catch (ex) {
        throw new Error({ status: 500, error: ex });
    }
}
module.exports.membersController = {
    getAllMembers: getAllMembers,
    getMemberById: getMemberById,
    createMember: createMember,
    updateMember: updateMember,
    deleteMember: deleteMember
}
