const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require('constants');

const teamsController = require('../controller/teams').teamsController;

module.exports.teamsRoute = (routes) => {
    routes.get('/teams', async (req, res, next) => {
        try {
            const teams = await teamsController.getAllTeams();
            return res.status(200).send(teams);
        } catch (ex) {
            next(ex);
        }
    });
    routes.get('/teams/:id', async (req, res, next) => {
        try {
            if (!req.params.id) throw { status: 400, error: 'missing id' };
            const team = await teamsController.getAllTeamById(req.params.id);
            if (!team) res.status(404).send();
            return res.status(200).send(team);
        } catch (ex) {
            next(ex);
        }
    });
    return routes;
}