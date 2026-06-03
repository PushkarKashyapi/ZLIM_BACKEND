require("dotenv").config()

const express = require("express")
const cors = require("cors")

const connectDB =
  require("./mongo")

const Workspace =
  require("./models/model")

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Zlim Backend Running 🚀")
})

app.post(
  "/workspace",
  async (req, res) => {
    try {
      const {
        name,
        trigger,
        autoLaunch,
        tabs
      } = req.body

      const workspace =
        await Workspace.create({
          name,
          trigger,
          autoLaunch,
          tabs
        })

      res.status(201).json({
        success: true,
        workspace
      })
    } catch (error) {
      console.error(error)

      res.status(500).json({
        success: false,
        message:
          error.message
      })
    }
  }
)

app.get(
  "/workspace",
  async (req, res) => {
    try {
      const workspaces =
        await Workspace.find().sort({
          createdAt: -1
        })

      res.status(200).json({
        success: true,
        workspaces
      })
    } catch (error) {
      console.error(error)

      res.status(500).json({
        success: false,
        message:
          error.message
      })
    }
  }
)

app.get("/debug", (req, res) => {
  res.send("DEBUG ROUTE")
})

app.delete(
  "/workspace/:id",
  async (req, res) => {
    try {
      await Workspace.findByIdAndDelete(
        req.params.id
      )

      res.status(200).json({
        success: true,
        message:
          "Workspace deleted"
      })
    } catch (error) {
      console.error(error)

      res.status(500).json({
        success: false,
        message:
          error.message
      })
    }
  }
)

const PORT =
  process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  )
})
