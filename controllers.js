require("dotenv").config()

const express = require("express")
const cors = require("cors")

const connectDB = require("./mongo")
const Workspace = require("./models/model")

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Zlim Backend Running 🚀")
})

// 1. CREATE WORKSPACE (Now linked to userEmail)
app.post(
  "/workspace",
  async (req, res) => {
    try {
      const {
        name,
        trigger,
        autoLaunch,
        tabs,
        userEmail, // <-- Destructure the user identity sent from Plasmo

        routineEnabled,
        routineTime,
        routineRepeat
      } = req.body

      // Validation check to make sure an anonymous workspace isn't created
      if (!userEmail) {
        return res.status(400).json({
          success: false,
          message: "User email identity is required to create a workspace."
        })
      }

      const workspace =
        await Workspace.create({
          name,
          trigger,
          autoLaunch,
          tabs,
          userEmail, // <-- Save it directly into MongoDB

          routine: {
            enabled: routineEnabled,
            time: routineTime,
            repeat: routineRepeat
          }
        })

      res.status(201).json({
        success: true,
        workspace
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }
)

// 2. GET WORKSPACES (Now filtered by user query string)
app.get(
  "/workspace",
  async (req, res) => {
    try {
      const { user } = req.query // <-- Reads ?user=email from the request URL

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Missing 'user' query string parameter."
        })
      }

      // Finds ONLY the workspaces belonging to this specific userEmail string
      const workspaces =
        await Workspace.find({ userEmail: user }).sort({
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
        message: error.message
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
        message: "Workspace deleted"
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }
)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
