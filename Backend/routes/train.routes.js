const express = require("express")
const router = express.Router()

const {
  getRandomMessage,
  checkAnswer,
  startScamChat,
  chat,
  analyzeMessage
} = require("../controllers/trainController")

router.get("/message", getRandomMessage)
router.post("/answer", checkAnswer)
router.post("/start-chat", startScamChat)
router.post("/chat", chat)
router.post("/analyze", analyzeMessage)

module.exports = router