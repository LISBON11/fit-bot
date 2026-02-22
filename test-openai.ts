import { OpenAI } from 'openai';
console.log(Object.keys(new OpenAI({apiKey: 'test'}).beta || {}));
console.log(Object.keys(new OpenAI({apiKey: 'test'}).chat?.completions || {}));
