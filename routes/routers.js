const express = require("express")
app.use(cors())
app.use(express.json())
const {
  createWorkspace,
  getWorkspaces,
  deleteWorkspace
} = require(
  "../controllers"
)

const router = express.Router()

router.post(
  "/workspace",
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