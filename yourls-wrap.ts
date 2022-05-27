import got from "got";
import { Context } from "grammy";
import { telegram, yourls } from "./types";
import { nanoid, random } from "nanoid";

const YOURLS_TOKEN = process.env.YOURLS_TOKEN!;
let RANDOM_KEYWORD_CHARS = Number(process.env.RANDOM_KEYWORD_CHARS);
if (isNaN(RANDOM_KEYWORD_CHARS)) {
  RANDOM_KEYWORD_CHARS = 8;
}

export async function getCustomShortUrl(
  ctx: Context,
  TeleUserMessage: telegram.UserMessage
) {
  const encodedKeyword = encodeURIComponent(TeleUserMessage.customKeyword!);
  const encodedUrl = encodeURIComponent(TeleUserMessage.url);
  const apiCustomUrl = `https://ln.wbba.xyz/yourls-api.php?signature=${YOURLS_TOKEN}&action=shorturl&format=json&url=${encodedUrl}&keyword=${encodedKeyword}`;
  const res = await got(apiCustomUrl, { throwHttpErrors: false });
  const body: yourls.Response = JSON.parse(res.body);
  switch (body.status) {
    case "success":
      ctx.reply(`${body.shorturl}`, { disable_web_page_preview: true });
      break;
    default:
      ctx.reply(`${body.message}`);
      break;
  }
}

export async function getShortUrl(
  ctx: Context,
  TeleUserMessage: telegram.UserMessage
) {
  const randomKeyword = nanoid(RANDOM_KEYWORD_CHARS).toLowerCase();
  const encodedUrl = encodeURIComponent(TeleUserMessage.url);
  const apiUrl = `https://ln.wbba.xyz/yourls-api.php?signature=${YOURLS_TOKEN}&action=shorturl&format=json&url=${encodedUrl}&keyword=${randomKeyword}`;
  const res = await got(apiUrl, { throwHttpErrors: false });
  const body: yourls.Response = JSON.parse(res.body);
  switch (body.status) {
    case "success":
      ctx.reply(`${body.shorturl}`, { disable_web_page_preview: true });
      break;
    default:
      ctx.reply(`${body.message}`);
      break;
  }
}
