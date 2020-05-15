//Install express server
const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();
 
// Serve only the static files form the angularapp directory
app.use(express.static(__dirname + '/angularapp'));

app.use(cors())
 
app.get('/*', function(req,res) {
 
res.sendFile(path.join(__dirname+'/angularapp/index.html'));
});
 
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);