const express = require("express")
const router = express.Router()
const mongodb = require("mongodb");
const db = mongodb.MongoClient;
const url = "mongodb://maazahmed:maazahmed1@ds163764.mlab.com:63764/learn_mongodb"





router.post("/setUser", (req, res) => {
    const user = {
        phoneNumber: req.body.phoneNumber,
        username: req.body.displayName,
        profilePic: req.body.photoURL,
        email: req.body.email,
        uid: req.body.uid,
    }
    db.connect(url, (err, suc) => {
        if (err) throw err;
        else {
            const dbo = suc.db("learn_mongodb")
            dbo.collection("User").findOne({ uid: req.body.uid }, (fail, done) => {
                if (fail) {
                } else {
                    if (done) {
                        res.status(200)
                        res.send(done)
                    }
                    else {
                        dbo.collection("User").insertOne(user, (error) => {
                            if (error) throw error;
                            else {
                                suc.close(() => {
                                    // console.log(user, "USER")
                                    res.status(200)
                                    res.send()
                                })
                            }
                        })
                    }
                }
            })
        }
    })
})



router.post("/adminlogin", (req, res) => {
    const user = req.body
    db.connect(url, (err, suc) => {
        if (err) {
            res.send(err)
        }
        else {
            const dbo = suc.db("learn_mongodb")
            dbo.collection("admin").findOne({ email: req.body.email, password: req.body.password }, (fail, done) => {
                console.log(done)
                if (fail) {
                    res.send(fail)
                } else {
                    if (done) {
                        res.status(200)
                        res.send(done)
                    }
                }
            })
        }
    })
})





router.post("/addCategory", (req, res) => {
    const data = req.body
    //    console.log(data)
    db.connect(url, (error, succes) => {
        if (error) throw error
        else {
            const dbo = succes.db("learn_mongodb")
            dbo.collection("Categorys").findOne({ categoryVal: req.body.categoryVal }, (fail, done) => {
                if (fail) {
                    console.log(fail)
                }
                else {
                    if (done) {
                        succes.close(() => {
                            console.log(done)
                            res.send({ Message: "Already have this category" })
                        })
                    }
                    else {
                        dbo.collection("Categorys").insert(data, (err, suc) => {
                            if (err) throw err;
                            else {
                                succes.close(() => {
                                    res.send({ Message: "Data submited" })
                                })
                            }
                        })
                    }
                }
            })
        }
    })
})


router.get("/getCategory", (req, res) => {
    db.connect(url, (err, suc) => {
        if (err) {
            res.send(err)
        }
        else {
            const dbo = suc.db("learn_mongodb")
            dbo.collection("Categorys").find({}).toArray((err2, data) => {
                if (err2) throw err2
                res.send(data)
            })
        }
    })
})




router.post("/mailEdit", (req, res) => {
    // console.log(req.body)
    db.connect(url, (err, suc) => {
        if (err) throw err;
        else {
            const dbo = suc.db("learn_mongodb")
            var newvalues = { $set: { emailForUser: req.body.email } };
            dbo.collection("User").updateOne({ uid: req.body.uid }, newvalues, (error, data) => {
                if (error) throw error
                else {
                    console.log(data)
                }
            })
        }
    })
})




router.post("/nhoneNumberEdit", (req, res) => {
    db.connect(url, (err, suc) => {
        if (err) throw err;
        else {
            const dbo = suc.db("learn_mongodb")
            var newvalues = { $set: { phoneNumber: req.body.phoneNumber } };
            dbo.collection("User").updateOne({ uid: req.body.uid }, newvalues, (error, data) => {
                if (error) throw error
                else {
                    suc.close(() => {
                        res.send({
                            Message: "Phone number successfuly updated"
                        })
                    })
                }
            })
        }
    })
})



router.post("/addService", (req, res) => {
    const obj = req.body
    db.connect(url, (error, success) => {
        if (error) throw error;
        else {
            const dbo = success.db("learn_mongodb")
            dbo.collection("Services").insert(obj, (err) => {
                if (err) throw err;
                else {
                    success.close(() => {
                        res.send({
                            Message: "Service added successfuly"
                        })
                    })
                }
            })
        }
    })
})




router.post("/getServieces", (req, res) => {
    console.log(req.body.id)
    
    db.connect(url, (err, suc) => {
        if (err) {
            res.send(err)
        }
        else {
            const dbo = suc.db("learn_mongodb")
            dbo.collection("Services").find({categoryID:req.body.id}).toArray((err2, data) => {
                if (err2) throw err2;
                res.send(data)
            })
        }
    })
})







module.exports = router
