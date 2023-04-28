const { Tokenizer } = require("@huggingface/tokenizers");
const { AutoTokenizer } = require("tokenizers");

// Load the tokenizer for the Davinci model
const tokenizer = await AutoTokenizer.fromPretrained("openai/davinci");

// Estimate the number of tokens for a given input text
const inputText = "Hello, how are you?";
const encoding = await tokenizer.encode(inputText);
const numTokens = encoding.tokens.length;

console.log(`Number of tokens for '${inputText}': ${numTokens}`);
