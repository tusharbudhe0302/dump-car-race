const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const hsts = require('hsts');
const xssFilter = require('x-xss-protection');
const nosniff = require('dont-sniff-mimetype');
const morgan = require('morgan');


const app = express();
const routes = express.Router();
// app.use(routes);
const membersRoutes = require('./express-routes/members-router').membersRoute(routes);
const teamsRoutes = require('./express-routes/teams-router').teamsRoute(routes);

// app.use(express.static(path.join(__dirname, 'dist/f1-track'), { etag: false }));
app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);

// To setup policy
app.use(helmet({ noCache: false }));
// 180 days in seconds
app.use(hsts({ maxAge: 15552000 }));
function logErrors(error, req, res, next) {
    // console.log(`Next Error handdler status: ${error.message.status}`);
    if (error) {
        var newError = {};
        newError.status = error.status || 404;
        switch (error.status) {
            case 400:
                newError.message = `Bad Request ${error.message}`,
                    newError.error = error;
                break;
            case 500:
                newError.message = `Internal Server Error. ${error.message}`,
                    newError.error = error.message.error;
                break;
            default:
                newError.message = 'Not Found',
                    newError.error = error;

        }
        res.status(newError.status).send(newError);
    } else {
        //JWT Logic verify here.
        next();
    }
}

app.set('enableLogger', true);
app.use(morgan('combined'));
app.get('/api/hello', (req,res,next) => {
    res.status(200).send({ message: 'Hello' });
})
app.use('/api', membersRoutes);
app.use('/api', teamsRoutes);
app.use(logErrors);

module.exports.app = app;
