const app = require('./app').app;
const dbUtil = require('./controller/services/utils/dbconnection');
const dbUtilSync = require('./controller/services/utils/dbsync').dbSync;

const port = process.env.PORT || 3000;
app.listen(port, async () => {
    await dbUtil.mongoose.createmongodbconnection()
    await dbUtilSync.teamsync();
    await dbUtilSync.memberssync();
    console.log(`mongoodb connection done!`)
    console.log(`Dump Car Race API is listening on port: ${port}`);
});