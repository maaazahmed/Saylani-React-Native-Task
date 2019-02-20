var express = require("express")
var bodyParser = require("body-parser")
var cors = require("cors");
var app = express()
var router = require("./app/app")






app.set("port", process.env.PORT || 8000)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: "5000kb" }))
app.use(cors())
app.use("/", router);
app.use("/setUser", router);
app.use("/addCategory", router);
app.use("/getCategory", router);
app.use("/mailEdit", router);
app.use("/nhoneNumberEdit", router);
app.use("/addService", router);
app.use("/getServieces", router);
app.use("/rejectOrder", router);
app.use("/saveRatting", router);
app.use("/svaeLocation", router);
app.use("/getUsers", router);
app.use("/setStatus", router);
// 


app.listen(app.get("port"), (err, succ) => {
    console.log(`Server is runing on port ${app.get("port")}`)
})