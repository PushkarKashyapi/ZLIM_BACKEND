const mongoose = require("mongoose")

const workspaceSchema =
  new mongoose.Schema(
    {
      name: String,

      trigger: String,

      autoLaunch: Boolean,

      tabs: [String],

      // ADDED: Links this workspace directly to the logged-in user
      userEmail: {
        type: String,
        required: true,
        index: true // Makes searching by user email ultra-fast in MongoDB
      },

      routine: {
        enabled: {
          type: Boolean,
          default: false
        },

        time: {
          type: String
        },

        repeat: {
          type: String,
          enum: [
            "daily",
            "weekdays",
            "weekends",
            "weekly"
          ]
        }
      }
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
