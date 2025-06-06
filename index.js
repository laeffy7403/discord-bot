const express = require("express")
const app = express();
app.listen(3000, () => {
  console.log(`Project is running!`);
})
app.get("/", (req, res) => {
  res.send("wes is running!");
})
const Discord = require("discord.js")
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"]
});


//FETCH DISCORD USERNAME BY ID
let creator; // Declare up here for global access later

client.once('ready', async () => {
  try {
    creator = await client.users.fetch("693111194319323197");
    console.log(`Logged in as ${client.user.tag}, owned by ${creator.tag}`);
  } catch (err) {
    console.error("Failed to fetch owner user:", err);
  }
});



// Load environment variables for toggle bot repplies
// Part of the code that handles keyword toggling (IMPORTANT)
const keywordToggleStates = new Map(); 

// Helper function to get toggle state for a guild (default: enabled)
function getKeywordToggleState(guildId) {
  return keywordToggleStates.get(guildId) !== false; // Default to true if not set
}


// TEXT-BASED SECTION
client.on("messageCreate", message => {
  if (message.author.bot) return;

  if (message.content === "test") {
    message.channel.send("wes is running from replit!");
  }

    //VARIABLES FOR THIS REGION ONLY
  const msgContent = message.content.toLowerCase();
  const botMsg = `\n\n**(I am a bot, and this action was performed automatically. Please contact ${creator.tag} the moderators of this sub if you have any questions or concerns.)**`;


    // Check for simple toggle commands
  if (msgContent === "t on") {
    // Check if user has permission to manage messages
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      message.reply("❌ You need 'Manage Messages' permission to control keyword triggering.");
      return;
    }

    const guildId = message.guild.id;
    keywordToggleStates.set(guildId, true);
    message.reply("✅ Keyword Control is now **enabled** for this server.");
    return;
  }

  if (msgContent === "t off") {
    // Check if user has permission to manage messages
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      message.reply("❌ You need 'Manage Messages' permission to control keyword triggering.");
      return;
    }

    const guildId = message.guild.id;
    keywordToggleStates.set(guildId, false);
    message.reply("❌ Keyword Control is now **disabled** for this server.");
    return;
  }

  // Check status command
  if (msgContent === "t status") {
    const guildId = message.guild.id;
    const isEnabled = getKeywordToggleState(guildId);
    const status = isEnabled ? "enabled" : "disabled";
    const emoji = isEnabled ? "✅" : "❌";
    message.reply(`${emoji} Keyword Contorl is currently **${status}** for this server.`);
    return;
  }

  // Check for help command
  var manualToggle = "keyword control toggle[need access from the server]\n[on] - enable keyword control to prevent word triggering off with certain word.(shut down)\n[off] - disable keyword control allow certain word to be trigger through texting in the chat.\n[status] - check the status of keyword contorl in the server.\n\n-- moderator respond with care msg to stop negative or bad mind spread among to people, when sensitive word like 'wtf' 'dick' and more. As the mod find it to be sentitive it will trigger the care msg --"; 
  var manualAI = "\n\nAI command [not in the toggle scope can be call when keyword control is on]\n`@wes`[your message] - use this command to trigger the AI to respond to your message.\n\n**Note:** The AI is using outdated data from 2022-2021, so it may not have the latest information.";
    if (msgContent.includes("help")) {
    message.channel.send(" ```" + manualToggle + manualAI + "```" + botMsg);
  }


    // Only process keyword triggers if enabled for this guild
  if (!getKeywordToggleState(message.guild.id)) {
    // Still process other commands like "yes" even when keywords are disabled

  //   return;
  // }

    const triggerResponses = {
    ratio: [
      "dont care",
      "you didn't ask",
      "ratio",
      "go breathe trash air",
      "dog water",
      "you entering my cringe compilation",
      "ur dad left",
      "you dress like garbage",
      "genshin player",
      "your problem",
      "get a job",
      "not funny didn't laugh"
    ]
  };

  for (const [trigger, responses] of Object.entries(triggerResponses)) {
    if (msgContent.includes(trigger)) {
      const responseText = responses.join(" + ") + botMsg;
      message.channel.send(responseText);
      break; // Only respond to one trigger at a time
    }
  }

  var keyGroupA = ["cj", "father", "fathers", "dad"];
  if (keyGroupA.some(trigger => msgContent.includes(trigger))) {
    message.channel.send("is having daugthers the ultimate cuckoldry? I cannot think or comprehend of anything more cucked than having a daughter. Honestly, think about it rationally. You are feeding, clothing, raising and rearing a girl for at least 18years sorely so she can go and get ravaged by another man. All the hard work you put into your beautiful little girl - reading her stories at bedtime, making her go to sport practise, making sure she had a healthy diet, educating her, playing with her. All of it has one simple result: her body is more enjoyable for the men that will eventually fuck her in every hole. Raised the perfect girl? Great. Who benefits? If you're lucky, a random man had nothing to do with the way she grew up, who marries her. He gets to fuck her tight pussy every night. He gets the benefits of her kind and sweet personallity that came from the way you raised her. As a man who has a daughter, you are LITERALLY dedicating at least 20 years of you life simply to raise a girl for another man to enjoy. It is the ULYIMATE AND FINAL cuck. Think about it logically. " + botMsg);

  }


  var keyGroupB = ["lean", "wow", "damn", "dem", "lol", "lmao"];
  if (keyGroupB.some(trigger => msgContent.includes(trigger))) {
    message.channel.send("It literally just cola you piece of shit. There's no cough syrup or anything. What the fuck is wrong with you. How fucking desperate are you to seem cool that you decide you want to force a `joke` about a child consuming drugs. Which would be funny except nothing in this scene implies that they're doing drugs or a drug stand-in. You just saw a can of soda and the two neurons in your head fired for the first time in a week, and you jumped into the comments to screech lEAn and spam purple emojis like a clown bastard. You people are the reason art is dying. Fuck you. " + botMsg);
  }


  var keyGroupC = ["i see", "ic"];
  if (keyGroupC.some(trigger => msgContent.includes(trigger))) {
    message.channel.send("My mom fucked my friend while we were on vacation and now I want to fucking die, she mom took us to Miami for a spring break vacation. Everything seemed normal when we were there and when we got back. But then rumors started. They spread all throughout my school and a bunch of kids asked me if my mom really had sex with a student. Of course I denied it. Until my close friend who was there told me. He told me one of the nights we went down to the hotel pool and said friend stayed up, saying he wanted to go to bed early. He stayed up there and then something happened and my mom slept with him. I feel sick to my stomach and so mad writing it. I confronted her and she admitted and tried to apologize, but I just can’t with her. She’s so disgusting. I’m contemplating just telling my dad so he can fly me up to his house, but I hate being around his dumb bimbo gold digging girlfriend. I want to fight that fucking asshole that did this. He’s ruining my fucking life. " + botMsg);
  }


  var keyGroupD = ["wtf", "bru", "bra"];
  if (keyGroupD.some(trigger => msgContent.includes(trigger))) {
    message.channel.send("Please put an NSFW tag on this. I was on the train and when I saw this I had to start furiously masturbating. Everyone else gave me strange looks and were saying things like “what the fuck” and “call the police”. I dropped my phone and everyone around me saw this image. Now there is a whole train of men masturbating together at this one image. This is all your fault, you could have prevented this if you had just tagged this post NSFW. " + botMsg);
  }


  var keyGroupE = ["copy", "ow", "bot"];
  if (keyGroupE.some(trigger => msgContent.includes(trigger))) {
    message.channel.send("You fucking dumbass, I try to have a real conversation & your bot literally belittles anyone that mentions any keywords with low hanging fruit that you think is funny I guess? Just ban me so I never see a post from this cumguzzling community again. " + botMsg);
  }


  var keyGroupF = ["fact", "dick", "dih", "period", "rip"];
  if (keyGroupF.some(trigger => msgContent.includes(trigger))) {
    message.channel.send("every girl has a dick. it's a fact. the problemis that it grows every month so long that they have to cut it off to not make usual men insecure about it . So basically that's what we call `period`. Also every girl has a little grave nearby her house where they keep rip dicks. Dicks that died in agony og being cutting off. This world is so sick. Poor dicks. So i offer you to join our STD-club - `Save The Dicks`. We stand with dicks 👩  😔 . Do no let dicks die. Share this post to let people know the truth.. " + botMsg);
  }

  var keyGroupG = ["shit", "poop", "toilet"];
  if (keyGroupG.some(trigger => msgContent.includes(trigger))) {
    message.channel.send("I hate taking shits. Taking shits is the worst function of the human organism after sex. You have to sit on the most uncomfortable seat ever, then you have to go through so much pain to push the shit out of your asshole (not to mention sometimes they get stuck in there). And as if those weren't enough then you have to wipe, you have to take your hand along with toilet paper and shove it up your asshole, this process can sometimes take minutes out of your life, it fucking sucks. i hate taking shit. " + botMsg);
  }


  var keyGroupH = ["clown", "🤡"];
  if (keyGroupH.some(trigger => msgContent.includes(trigger))) {
    message.channel.send("im so desparate to have sex with a female clown i cant take it. More than anything i just want a beautiful women with a clown costume, amke up and a big red nose to have sweaty passionate sex with. I want her to lay on my bed, take her big shoes off and let me suck blows up condoms and makes them into balloon animals.They i want her to take off her clown pants and clown u underwear then start pulling several feet of colored scarves out of her pussy.Once the scarves are out I want to enter her then fuck her as she honks her big red noise in time to my thrusts. I want her to do the clown laugh and spray me with a squirt gun flower as I cum i dont know why i have this fantasy but i do its killing me.i want clown pussy so bad it hurt.. " + botMsg);
  }


  var keyGroupI = ["base"];
  if (keyGroupI.some(trigger => msgContent.includes(trigger))) {
    message.channel.send("Based? Based on what? On your dick? Please shut the fuck up and use words properly you fuckin troglodyte, do you think God gave us a freedom of speech just to spew random words that have no meaning that doesn't even correllate to the topic of the conversation? Like please you always complain about why no one talks to you or no one expresses their opinions on you because you're always spewing random shit like poggers based cringe and when you try to explain what it is and you just say that it's funny like what? What the fuck is funny about that do you think you'll just become a stand-up comedian that will get a standing ovation just because you said 'cum' in the stage? HELL NO YOU FUCKIN IDIOT, so please shut the fuck up and use words properly.. " + botMsg);
  }


  var keyGroupJ = ["pedo", "genshin", "curse", "child", "league"];
  if (keyGroupJ.some(trigger => msgContent.includes(trigger))) {
    message.channel.send("This is fucking terrible. Genshin is a good game. We are not pedophiles. We are not obese. We dont care about bitches. Most of us arent fatherless. Blame the league of legend players for this shit not us. " + botMsg);
  }


  var keyGroupK = ["mac", "cheese"];
  if (keyGroupK.some(trigger => msgContent.includes(trigger))) {
    message.channel.send("i swear all she does all day is masterbate and masterbate, it sound like she's mixing mac and cheese and you can hear it throughtout the whole fucking house. My mom has been complaining to her but my sister just started going louder and louder. Worst part is my computer is in her room so everyday i have to go in there and see her just fucking DEMOLISHING her pussy, juice flying everywhere! and then i say, 'hey maybe out down a towel to keep clean atleast', BUT SHE JUST FUCKING IGNORES ME. I cant stand living here honestly. Yesterday when i went to go use my couputer it was absolutely drenched in her juices, and she stained atleast 6 of my shirts by now. And all my friends at school tease me, 'haha haha tobias got his sister's grool on his shirt', 'girlcum tobias' has become my nickname. i fucking hate it!. " + botMsg);
  }


  if (message.content.toLowerCase().includes("mom")) {
    message.channel.send("I do not care what you say about my mother. Your opinion is your opinion. But trust me, if you actually attempt to do something to my mother, even though she's made some bad decisions in the past that we still need to work through, I will personally call the police on you and I'll be laughing as your mugshot is shown on TV. You don't even know her, do you? The point of your entire existence seems to be to just tease other people. Well, I believe your jokes are in bad taste, and you should cease and desist digging through the dregs left at the bottom of the joke barrel; you could get a splinter, whose pain will be significantly increased by the significantly high amount of salt you carry in your bloodstream. Thank you, and let us cease talking about each other's parents. " + botMsg);
  }

  // if (message.content.toLowerCase().includes("dream")) {
  //   message.channel.send("It was a saturday afternoon, and I was exhausted after an intense 17-part masturabation session to dream minecraft manhunt, when i suddenly had the urge to go outside. I was scared. It's been so long since i've left the warmth of my parents basement with my dream body pillows. I didnt know what to expect. Clutching my dream figurine in front of my chest, i pried open the door to the outside world. The gleaming sun blared through the door, bequeathing a brilliant warmth on my cum-covered boxers. I quaverly took a step outside. My body flintched from the strange feel of the dirt under my feet. And then i saw it. The lustrous field of grass, covered in a light sprinkle of water from the noon rain shower. And then i realized. Dream... grass... the trees... it was all coming together. Grass is green, just like Dream. Dream is everpresent, in the grass, the flowers, He was there. I immediately new what to do next. I flinged off my clothes faster than the speed at which i would click on a new dream rule 34 post. My dick was already throbbing as i leaped onto the field of grass, dorito dust stained shirt getting carried away by the wind. I dug a small hole in the ground, and passionately thrust my 7-inch erect cock into it. I knew, this was Dream. His spirit was in this grass, and he felt my dick in his man pussy as i fucked that grass. I lost track how long i was there. Hours went by, day turned to night, but it didnt matter. I was finally together, with Dream. Nothing could separate us. I took a long stem of a flower, and forced it in my asshole. I imagined it being Dream's hot penis being lustfully forced into me in bed. I stayed there on my front yard for god knows how long. Until my butt was sore, balls drier than the Saharan desert after a long drought. The lawn looked like there was a layer of fresh snow on a Christmas morning. Trudging indoors, i had a enormous smile stretching across my face. I couldn't wait until tomorrow, when i may go outside again and be with Dream. " + botMsg);
  // }

  if (message.content.toLowerCase().includes("dream")) {
    message.channel.send("i was in science class… i got up to sharpen my dream pencil, and then my dream themed dildo fell out of my ass. i always keep it down there cause I like to imagine daddy dream ♥♥♥♥♥♥♥ me 24/7 and it feels so good. anyways it fell out of my ass and out of my pants and my dreamphobic classmates started laughing and making fun of me. the teacher sent me to the office and i had to explain what happened. the principal suspended me from school for a week!!! this is unacceptable. just because i love dream is not a reason to harass me" + botMsg);
  }

  if (message.content.toLowerCase().includes("ok")) {
    message.channel.send("'ok', i see. So you built up the energy to reply nothing other than 'ok'. Out of all the things you could've replied, you just went 'ok' . Wow. Fuck you dipshit. This is not 'ok' . Dont think this is even funny. Even a feminist comedian is funnier than is shit. i sat and typed a proper message, I put time and thought into it and you jizz all over it by posting the two letter message 'ok'. You did not take one bit of my message into consideration, you just replied that without the intention of contributing to the conversation. I cant believe that you're this stupid. I do NOT waste my time when i write messages. YOU did, you took 5 second out of your life just to say 'ok' and piss me off. You fucking piece of shit. I hope you die alone in pain. You're an absolute disgrace to humanity and you know it. im amazed you even have friends. They must be assholes who spend all their time replying 'ok' to proper messages too. Now find something else to do with your life. You're fucking dead, 'ok' iddo. " + botMsg);
  }

  // if (message.content.toLowerCase().includes("?")) {
  //   message.channel.send("'?', i see. So you built up the energy to reply nothing other than '?'. Out of all the things you could've replied, you just went '?' . Wow. Fuck you dipshit. This is not '?' . Dont think this is even funny. Even a feminist comedian is funnier than is shit. i sat and typed a proper message, I put time and thought into it and you jizz all over it by posting the two letter message '?'. You did not take one bit of my message into consideration, you just replied that without the intention of contributing to the conversation. I cant believe that you're this stupid. I do NOT waste my time when i write messages. YOU did, you took 5 second out of your life just to say '?' and piss me off. You fucking piece of shit. I hope you die alone in pain. You're an absolute disgrace to humanity and you know it. im amazed you even have friends. They must be assholes who spend all their time replying 'ok' to proper messages too. Now find something else to do with your life. You're fucking dead, '?' iddo. )" + botMsg);
  // }

  if (message.content === "💀") {
    message.channel.send("Ok everyone since you dot listen when im nice, im going to get mean.reacting to message with clown (🤡), a skull (💀), or a nerd face (🤓) isn't funny. it's not cool, it's not interesting, it's annoying.reacting 3 emojis in particular aren't funny, they're RUDE. We as staff work hard to keep this place safe, and to have you all constantly react to our messages with mean emojis makes me FURIOUS.STOP reacting to our messages with rude emojis. They do NOTHING but make you look really, really stupid. it shows you have no rebuttals to our arguments, so you have to use juvenile tacties paramount to terrosism in order to stop us from being able to speak out truth.FROM NOW ON, IF YOU REACT WITH ANY MEAN EMOJIS, I AM WRITING YOUR NAME DOWN. IF YOU ARE A SERIAL REACTOR, YOUR USERNAME IS GOING TO A GOOGLE DOC. AT THE END OF THE MONTH, I WILL TAKE THIS DOC TO THE APPROPIATE AUTHORITIES FOR THEM TO INVESTIGATE AND ARREST YOU.  (I am a bot, and this action was performed automatically. Please contact yp the moderators of this sub if you have any questions or concerns.)");
  }

  if (message.content === "huh") {
    message.channel.send("i swear all she does all day is masterbate and masterbate, it sound like she's mixing mac and cheese and you can hear it throughtout the whole fucking house. My mom has been complaining to her but my sister just started going louder and louder. Worst part is my computer is in her room so everyday i have to go in there and see her just fucking DEMOLISHING her pussy, juice flying everywhere! and then i say, 'hey maybe out down a towel to keep clean atleast', BUT SHE JUST FUCKING IGNORES ME. I cant stand living here honestly. Yesterday when i went to go use my couputer it was absolutely drenched in her juices, and she stained atleast 6 of my shirts by now. And all my friends at school tease me, 'haha haha tobias got his sister's grool on his shirt', 'girlcum tobias' has become my nickname. i fucking hate it!. (I am a bot, and this action was performed automatically. Please contact yp the moderators of this sub if you have any questions or concerns.)");
  }





  //GRAPHICS SECTION [VIDEO, IMGAE, GIF]
  const keyItemsA = ["pee", "ass"];
  if (keyItemsA.some(trigger => msgContent.includes(trigger))) {
    message.channel.send("https://cdn.discordapp.com/attachments/835877241292455966/1030533060678123572/unknown.png" + botMsg);
  }
  // More key items and response can be added here as needed


    return;
  }
})




//AI SECTION
require("dotenv").config();
// const Discord = require("discord.js");
const { Intents } = require("discord.js");
const fetch = require("node-fetch");

const clienta = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.MESSAGE_CONTENT]
});

// Discord bot ready
clienta.once("ready", () => {
  console.log(`Logged in as ${clienta.user.tag}`);
});

// Message listener for AI responses
clienta.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // Skip very short messages
  if (message.content.length < 3) return;

  // Only respond when bot is mentioned or in DMs
  if (!message.mentions.has(clienta.user) && message.guild) return;

  const userInput = message.content.replace(`<@${clienta.user.id}>`, '').trim();
  const userName = message.author.username;

  try {
    console.log("Sending request to OpenRouter..."); // Debug log

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "HTTP-Referer": "https://82789d11-f845-4fd8-8b36-e4dffbf0d2c8-00-3iodwrpsko3j0.worf.replit.dev/", // Optional: your site URL
        "X-Title": "Discord Bot" // Optional: your app name
      },
      body: JSON.stringify({
        model: "openai/gpt-4-turbo", // Note: "gpt-4.1" might not be valid, use "gpt-4" or "gpt-4-turbo"
        messages: [
          { 
            role: "system", 
            content: `You are a helpful Discord bot. Respond to ${userName} in a casual, friendly way. Keep responses concise and natural for Discord chat.` 
          },
          { role: "user", content: userInput }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    // Exception handling
    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenRouter API error:", response.status, errText);
      return await message.reply("OpenRouter API is having issues 😓. Check your key or try again later.");
    }

    const data = await response.json();
    console.log("OpenRouter response:", data); // Debug log

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Unexpected API response format:", data);
      return await message.reply("AI gave me a weird response 🤔. Try again?");
    }

    let reply = data.choices[0].message.content.trim();

    if (reply.length > 0) {
      // Discord has a 2000 character limit
      if (reply.length > 2000) {
        reply = reply.substring(0, 1997) + "...";
      }
      await message.reply(reply);
    } else {
      await message.reply("Hmm, I'm not sure how to respond to that 🤔");
    }

  } catch (error) {
    console.error("Error calling OpenRouter:", error.message);
    await message.reply("Something went wrong with my AI brain 🤖⚠️");
  }
});
// Login to Discord
clienta.login(process.env.DIS_TOKEN);










//EXPERIMENTING NEW FEATURE SECTION
client.on("messageCreate", message => {
  if (message.author.bot) return;

//   const msgContent = message.content.toLowerCase();
//   const botMsg = "\n\n**(I am a bot, and this action was performed automatically. Please contact the moderators of this server if you have any questions or concerns.)**";

//   // Check for simple toggle commands
//   if (msgContent === "on") {
//     // Check if user has permission to manage messages
//     if (!message.member.permissions.has("MANAGE_MESSAGES")) {
//       message.reply("❌ You need 'Manage Messages' permission to control keyword triggering.");
//       return;
//     }

//     const guildId = message.guild.id;
//     keywordToggleStates.set(guildId, true);
//     message.reply("✅ Keyword triggering is now **enabled** for this server.");
//     return;
//   }

//   if (msgContent === "off") {
//     // Check if user has permission to manage messages
//     if (!message.member.permissions.has("MANAGE_MESSAGES")) {
//       message.reply("❌ You need 'Manage Messages' permission to control keyword triggering.");
//       return;
//     }

//     const guildId = message.guild.id;
//     keywordToggleStates.set(guildId, false);
//     message.reply("❌ Keyword triggering is now **disabled** for this server.");
//     return;
//   }

//   // Check status command
//   if (msgContent === "status") {
//     const guildId = message.guild.id;
//     const isEnabled = getKeywordToggleState(guildId);
//     const status = isEnabled ? "enabled" : "disabled";
//     const emoji = isEnabled ? "✅" : "❌";
//     message.reply(`${emoji} Keyword triggering is currently **${status}** for this server.`);
//     return;
//   }


//   // Only process keyword triggers if enabled for this guild
//   if (!getKeywordToggleState(message.guild.id)) {
//     // Still process other commands like "yes" even when keywords are disabled



//     if (message.content.toLowerCase() === "yes") {
//       message.channel.send("https://tenor.com/view/yes-giga-chad-chad-gif-23788137");


//     }
//     return;
//   }

});





//BOTTOM SECTION
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
    await interaction.followUp('Pong again!');
  }
});



client.login(process.env.DIS_TOKEN)
clienta.login(process.env.DIS_TOKEN)
const mySecret = process.env['DIS_TOKEN']
