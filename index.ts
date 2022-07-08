import { Bot } from "grammy";
import { getCustomShortUrl, getShortUrl } from "./yourls-wrap";
import { TeleUserMessage } from "./validate";
import { telegram } from "./types";

const BOT_TOKEN = process.env.BOT_TOKEN!;
const bot = new Bot(BOT_TOKEN);

bot.command("start", (ctx) =>
  ctx.reply(
    //prettier-ignore
    "Hi! Send a URL for me to shorten.\nYou can also set a custom url like\n<b>{original url} &lt;space&gt; {custom keyword} </b>",
    { parse_mode: "HTML" }
  )
);

bot.command("help", (ctx) =>
  ctx.reply(
    // prettier-ignore
    "Get a short url by sending a url like\nhttps://www.wbba.xyz\nor create a custom url like\n<b>https://www.wbba.xyz &lt;space&gt; wbba</b>\nand get https://ln.wbba.xyz/wbba",
    { parse_mode: "HTML", disable_web_page_preview: true }
  )
);

bot.on("message", (ctx) => {
  const text = ctx.update.message.text;
  if (text != undefined) {
    const custom_n_original_url = text.split(" ");

    // More than 2 arguments from telegram message
    if (custom_n_original_url.length > 2) {
      ctx.reply(
        // prettier-ignore
        "Too many arguments, please keep it to\n<b>{custom url} &lt;space&gt; {original url}</b>\ne.g. wbba https://www.wbba.xyz",
        {
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }
      );

      // 2 arguments from telegram message
    } else if (custom_n_original_url.length > 1) {
      const x: telegram.UserMessage = {
        customKeyword: custom_n_original_url[1],
        url: custom_n_original_url[0],
      };
      if (!TeleUserMessage.validate(x).error) {
        getCustomShortUrl(ctx, x);
      } else {
        ctx.reply(`URL provided is not a valid URL`);
      }

      // 1 argument from telegram message
    } else {
      const x: telegram.UserMessage = {
        url: custom_n_original_url[0],
      };
      if (!TeleUserMessage.validate(x).error) {
        getShortUrl(ctx, x);
      } else {
        ctx.reply(`URL provided is not a valid URL`);
      }
    }
  }
});

console.info("Bot starting...");

bot.start({
  onStart: (botInfo) => console.info("Bot started in polling mode"),
});
