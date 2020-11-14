const MembersModelTest = require('./services/models/member.model');
const membersController = require('./members').membersController;
const dbSetUP = require('./services/utils/mock.data');
const fakeFirstMember = dbSetUP.members[0];
describe("Members.membersController", () => {
    beforeAll(() => {
        MembersModelTest.find = jest.fn().mockResolvedValue(dbSetUP.members);
        MembersModelTest.findById = jest.fn().mockResolvedValue(fakeFirstMember);
        MembersModelTest.create = jest.fn().mockResolvedValue(fakeFirstMember);
        MembersModelTest.findByIdAndUpdate = jest.fn().mockResolvedValue(fakeFirstMember);
        MembersModelTest.findByIdAndDelete = jest.fn().mockResolvedValue(fakeFirstMember);
    });
    it("should membersController type of 'function'", () => {
        expect(typeof membersController.getAllMembers).toBe("function");
        expect(typeof membersController.getMemberById).toBe("function");
        expect(typeof membersController.createMember).toBe("function");
        expect(typeof membersController.deleteMember).toBe("function");
        expect(typeof membersController.updateMember).toBe("function");
    });

    it("should getAllMembers", () => {
        expect(membersController.getAllMembers()).resolves.toEqual(dbSetUP.members);
    });
    it("should getMemberById", () => {
        expect(membersController.getMemberById(fakeFirstMember._id)).resolves.toEqual(fakeFirstMember);
    });
    it("should createMember", () => {
        expect(membersController.createMember(fakeFirstMember)).resolves.toEqual(fakeFirstMember);
    });
    it("should deleteMember", () => {
        expect(membersController.deleteMember(fakeFirstMember._id)).resolves.toEqual(fakeFirstMember);
    });
    it("should updateMember", () => {
        expect(membersController.updateMember(fakeFirstMember._id, fakeFirstMember)).resolves.toEqual(fakeFirstMember);
    });
});