const express = require("express")
const controllers =
  require("../controller")

console.log(controllers)
const router = express.Router()

router.get("/", (req, res) => {
  res.send("API WORKING")
})

module.exports = router
