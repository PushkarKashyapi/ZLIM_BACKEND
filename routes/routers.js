const express = require("express")
const createWorkspace =
  require("../controller")

console.log(createWorkspace)
const router = express.Router()

router.get("/", (req, res) => {
  res.send("API WORKING")
})

module.exports = router
