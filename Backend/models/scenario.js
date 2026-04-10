const mongoose = require("mongoose")

const ScenarioSchema = new mongoose.Schema({

 title: String,

 difficulty: String,

 initialMessage: String,

 scamGoal: String,

 tactics: [String]

})

module.exports = mongoose.model("Scenario", ScenarioSchema)
