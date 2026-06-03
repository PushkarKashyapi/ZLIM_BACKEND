const express = require("express")

const router = express.Router()

router.post(
  "/",
  createWorkspace
)

router.get(
  "/",
  getWorkspaces
)

router.delete(
  "/:id",
  deleteWorkspace
)

module.exports = router
