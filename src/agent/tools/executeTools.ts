import { tools } from "./index";

export type ToolName = keyof typeof tools;

export const executeTools = async (name: string, args: any) => {
    const tool = tools[name as ToolName];

    if (!tool) {
        throw new Error(`Tool ${name} not found`);
    }

    const execute = tool.execute;

    if (!execute) {
        return `this is not a registed tool`;
    }

    const result = await execute(args, {
        toolCallId: "",
        messages: []
    });

    return String(result);
}