const memeberModel = require('./member.model');
describe('Members Model', () => {
    it('should check schema', () => {
        expect(memeberModel.schema).toBeTruthy();
    });
    it('should check members functions', () => {
        expect(memeberModel.find).toBeTruthy();
        expect(memeberModel.create).toBeTruthy();
        expect(memeberModel.findByIdAndUpdate).toBeTruthy();
        expect(memeberModel.findByIdAndDelete).toBeTruthy();
        expect(memeberModel.findById).toBeTruthy();
    });
})