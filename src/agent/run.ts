import "dotenv/config"

import { generateText, type ModelMessage } from "ai";

import { openai } from "@ai-sdk/openai";

import { SYSTEM_PROMPT } from "./system/prompt.ts";

import type { AgentCallbacks } from "../types.ts";
import { tools } from "./tools/index.ts";
import { executeTools } from "./tools/executeTools.ts";

const MODEL_NAME = "gpt-5-mini";

export const runAgent = async (userMessage: string, conversationHistory?: ModelMessage[], callbacks?: AgentCallbacks) => {
    const { text, toolCalls } = await generateText({
        model: openai(MODEL_NAME),
        prompt: userMessage,
        system: SYSTEM_PROMPT,
        tools: tools
    });

    console.log(text, toolCalls);

    toolCalls.forEach(async (tc) => {
        await executeTools(tc.toolName, tc.input)
    })
}

runAgent("What is the current time right now?")