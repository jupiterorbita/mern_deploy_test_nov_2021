const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;
const DB = "full_stack_review_DB";

// middleware
app.use(cors());
app.use(express.json(), express.urlencoded({extended:true}));

// database connection link to file

require('./config/mongoose.config')(DB);
// const mongooseConnectionFunc = require('./config/mongoose.config');
// mongooseConnectionFunc(DB)

// connect the routes
require("./routes/routes")(app);


// start the server
app.listen(PORT, () => console.log(`🎈🎈🎈 server up on port:${PORT}`)) 
