// const { send } = require('process');

const membersController = require('../controller/members').membersController;

module.exports.membersRoute = (routes) => {
    routes.get('/members', async (req, res, next) => {
        try {
            const members = await membersController.getAllMembers();
            return res.status(200).send(members);
        } catch (ex) {
            next(ex);
        }
    });
    routes.get('/members/:id', async (req, res, next) => {
        try {
            if (!req.params.id) throw { status: 400, error: `Members id required` };
            const member = await membersController.getMemberById(req.params.id);
            return res.status(200).send(member);
        } catch (ex) {
            next(ex);
        }
    });
    routes.post('/members', async (req, res, next) => {
        try {
            if (!req.body || !req.body.firstname || !req.body.lastname || !req.body.team || !req.body.jobtitle || !req.body.status) {
                throw {status: 400, message: `firstname,lastname,team,status, id , jobtitle required`};
            }
            else {
                const member = await membersController.createMember(req.body);
                return res.status(201).send(member);
            }
        } catch (ex) {
            next(ex);
        }
    });
    routes.put('/members/:id', async (req, res, next) => {
        try {
            if (!req.body || !req.body.firstname || !req.body.lastname || !req.body.team || !req.body.jobtitle || !req.body.status || !req.params.id) {
                throw {status: 400, message: `firstname,lastname,team,status, id , jobtitle required`};
            }
            else {
                const id = req.params.id;
                const updatedMember = await membersController.updateMember(id,req.body);
                return res.status(200).send(updatedMember);
            }
        } catch (ex) {
            next(ex);
        }
    });
    routes.delete('/members/:id', async (req, res, next) => {
        try {
            if (!req.params.id) throw { status: 400, error: `Members id required` };
            const member = await membersController.deleteMember(req.params.id);
            return res.status(200).send(member);
        } catch (ex) {
            next(ex);
        }
    });
    return routes;
}