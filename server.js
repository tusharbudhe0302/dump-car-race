
const app = require('./backend/app').app;
const dbUtil = require('./backend/controller/services/utils');
const dbUtilSync = require('./backend/controller/services/utils/dbsync').dbSync;

const port = process.env.PORT || 3000;
// app.use(function(req, res, next) {
//     res.setHeader("Content-Security-Policy","script-src 'self' http://localhost:3000/")
//     return next();
// });

// app.use(express.static(path.join(__dirname, '/dist/dump-car-race')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/dist/dump-car-race/index.html'));
// });

app.listen(port, async () => {
    await dbUtil.connectDatabase();
    await dbUtilSync.teamsync();
    await dbUtilSync.memberssync();
    console.log(`mongoodb connection done!`)
    console.log(`Dump Car Race API is listening on port: ${port}`);
});