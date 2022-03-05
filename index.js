const express = require("express")
const app = express()
const ejs = require("ejs")
const {
  Client,
  Collection,
  Intents
} = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]
});

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.set("view engine", "ejs");
app.use(express.static("public"))

client.on("ready", () => {
  console.log("bot on")
})

app.get("/", async (req, res) => {
  var guild = client.guilds.cache.get(process.env.GUILD_ID)
  var info = []
  //LISTA DE ID DE USUÁRIOS
  let ids = ["646783301020942337", "780548574035443722", "687022032726392839", "434034998400778240"]
  for (var i = 0; i < ids.length; i++) {
    await client.users.fetch(ids[i]).then((u) => {
      info.push(u)
    })
  }

  res.render('index', {
    info: info,
    guild: guild
  })
})

app.listen(process.env.PORT, () => {
  console.log('Express iniciado.')
});
client.login(process.env.TOKEN)