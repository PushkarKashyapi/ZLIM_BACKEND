const Workspace = require("./models/model")

const createWorkspace = async (
  req,
  res
) => {
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
      message: error.message
    })
  }
}

const getWorkspaces = async (
  req,
  res
) => {
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
      message: error.message
    })
  }
}

const deleteWorkspace = async (
  req,
  res
) => {
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
      message: error.message
    })
  }
}



module.exports = {
  createWorkspace,
  getWorkspaces,
  deleteWorkspace
}