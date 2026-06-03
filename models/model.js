const mongoose = require("mongoose")

const workspaceSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },

      trigger: {
        type: String,
        required: true
      },

      autoLaunch: {
        type: Boolean,
        default: true
      },

      tabs: [
        {
          type: String
        }
      ]
    },
    {
      timestamps: true
    }
  )

module.exports =
  mongoose.model(
    "Workspace",
    workspaceSchema
  )
