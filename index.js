const express = require('express')
const path = require('path')
const Discord = require("discord.js");
const config = require("./config.json");
const https = require('https');
const PORT = process.env.PORT || 4999

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
client.login(config.BOT_TOKEN);

const prefix = "!";

client.on("messageCreate", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

    if (command == "floor") { 
        const collection = message.content.substring(message.content.indexOf(' ') + 1);
        const url = 'https://api.opensea.io/api/v1/collection/'+collection+'/stats?format=json'
        https.get(url, function(res){
        var body = '';

        res.on('data', function(chunk){
          body += chunk;
        });

        res.on('end', function(){
          var apiResponse = JSON.parse(body);
          if(apiResponse.hasOwnProperty("stats")){
          const floorPrice = apiResponse.stats.floor_price;
          message.reply("Got a response: "+floorPrice);
          }
          else{
          message.reply("Bad collection");
          }
        });
      });
    }

    if (command == "report") { 
        const collection = message.content.substring(message.content.indexOf(' ') + 1);
        const url = 'https://api.opensea.io/api/v1/collection/'+collection+'/stats?format=json'
        https.get(url, function(res){
        var body = '';

        res.on('data', function(chunk){
          body += chunk;
        });

        res.on('end', function(){
          var apiResponse = JSON.parse(body);
          if(apiResponse.hasOwnProperty("stats")){
          const floorPrice = apiResponse.stats.floor_price;
          const sevenDayPrice = apiResponse.stats.seven_day_average_price;
          const sevenDaySales = apiResponse.stats.seven_day_sales;
          const thirtyDayPrice = apiResponse.stats.thirty_day_average_price;
          const thirtyDaySales = apiResponse.stats.thirty_day_sales;

          const sevenDaySalesDaily = sevenDaySales/7;
          const thirtyDaySalesDaily = thirtyDaySales/30;

          var salesTrend;
          if (sevenDaySalesDaily>thirtyDaySalesDaily){
            salesTrend = "Daily Sales Trending UP";
          }
          else {
            salesTrend = "Daily Sales Trending DOWN";
          }

          var priceTrend; 
          if(sevenDayPrice>thirtyDayPrice){
            priceTrend = "Price Trending UP";
          }
          else {
            priceTrend = "Price Trending DOWN"
          }

          message.reply("Got a response"+
                      "\n------------------------"+
                      "\nSales Number Analysis"+
                      "\nSeven Day Sales: "+sevenDaySales+
                      "\nSeven Day Sales Daily: "+ sevenDaySalesDaily+
                      "\nThirty Day Sales: "+thirtyDaySales+
                      "\nThirty Day Sales Daily: "+thirtyDaySalesDaily+
                      "\n"+salesTrend+
                      "\n------------------------"+
                      "\nPrice Analysis"+
                      "\nFloor: "+floorPrice+
                      "\nSeven Day Average Price: "+sevenDayPrice+
                      "\nThirty Day Average Price: "+thirtyDayPrice+
                      "\n"+priceTrend);
          }
          else{
          message.reply("Bad collection, no report for you");
          }
        });
      });
    }

    let lok = Math.floor(Math.random() * 1100);
    if (command == "kevin") {
    message.reply("https://ipfs.io/ipfs/QmfG78Zygz3tDaA6jXRQSCpLgujt2cwy6cyLDDhnQ6Vqgq/" + lok + ".png");
    }

    var ban = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
    if (command == "woosh") {
      if(ban==1){
        message.reply("https://imgur.com/WFiPqbH");
      }
      if (ban==2){
        message.reply("https://imgur.com/FLhYnJv");
      }
      if (ban==3){
        message.reply("https://imgur.com/p4MDGNS");
      }
      if (ban==4){
        message.reply("https://imgur.com/LX13I42");
      }
      if(ban==5){
        message.reply("https://imgur.com/hIiFFzz");
      }
      if(ban==6){
        message.reply("https://imgur.com/0D8iNS4");
      }
      if(ban==7){
        message.reply("https://imgur.com/evxolvV");
      }
      if(ban==8){
        message.reply("https://imgur.com/9c5Nvx8");
      }

    }

    let toad = Math.floor(Math.random() * 6969);
    if (command == "vibe") {
      message.reply("https://opensea.io/assets/0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6/" + toad);
    }

    var arrest = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    if (command == "arrest") {
      if(arrest==1){
        message.reply("https://c.tenor.com/VliyAOYladAAAAAC/handcuffs-shackles.gif");
      }
      if(arrest==2){
        message.reply("https://c.tenor.com/1AhUNYnySx4AAAAC/f-bi-raid.gif");
      }
      if(arrest==3){
        message.reply("https://c.tenor.com/sffC5YBOV5sAAAAC/arresting-under-arrest.gif");
      }
    }
    
  });

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
