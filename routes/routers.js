const express = require("express")

const {
  createWorkspace,
  getWorkspaces,
  deleteWorkspace
} = require("../controller")

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