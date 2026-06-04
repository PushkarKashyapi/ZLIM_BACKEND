const workspaceSchema =
  new mongoose.Schema(
    {
      name: String,

      trigger: String,

      autoLaunch: Boolean,

      tabs: [String],

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
