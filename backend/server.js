const app = require('./app').app;
const dbUtil = require('./controller/services/utils/');
const dbUtilSync = require('./controller/services/utils/dbsync').dbSync;

const port = process.env.PORT || 3000;
app.listen(port, async () => {
    await dbUtil.connectDatabase();
    await dbUtilSync.teamsync();
    await dbUtilSync.memberssync();
    console.log(`mongoodb connection done!`)
    console.log(`Dump Car Race API is listening on port: ${port}`);
});