import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "../../");

// Load maps from repo
const resourceMap = JSON.parse(
  readFileSync(resolve(REPO_ROOT, "mcp/resource-map.json"), "utf-8")
);
const promptMap = JSON.parse(
  readFileSync(resolve(REPO_ROOT, "mcp/prompt-map.json"), "utf-8")
);
const conceptIndex = JSON.parse(
  readFileSync(resolve(REPO_ROOT, "index/concepts.json"), "utf-8")
);

const server = new Server(
  { name: "visual-intelligence", version: "0.1.0" },
  {
    capabilities: {
      resources: {},
      prompts: {},
      tools: {},
    },
  }
);

// ── Resources ──────────────────────────────────────────────────────────────

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: resourceMap.resources.map((r: { uri: string; name: string; description: string; mimeType: string }) => ({
    uri: r.uri,
    name: r.name,
    description: r.description,
    mimeType: r.mimeType,
  })),
}));

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const resource = resourceMap.resources.find(
    (r: { uri: string; file: string }) => r.uri === request.params.uri
  );
  if (!resource) {
    throw new Error(`Resource not found: ${request.params.uri}`);
  }
  const content = readFileSync(resolve(REPO_ROOT, resource.file), "utf-8");
  return {
    contents: [{ uri: request.params.uri, mimeType: "text/markdown", text: content }],
  };
});

// ── Prompts ────────────────────────────────────────────────────────────────

server.setRequestHandler(ListPromptsRequestSchema, async () => ({
  prompts: promptMap.prompts.map((p: { name: string; description: string; arguments?: { name: string; description: string; required: boolean }[] }) => ({
    name: p.name,
    description: p.description,
    arguments: p.arguments ?? [],
  })),
}));

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const prompt = promptMap.prompts.find(
    (p: { name: string; file: string }) => p.name === request.params.name
  );
  if (!prompt) {
    throw new Error(`Prompt not found: ${request.params.name}`);
  }
  let content = readFileSync(resolve(REPO_ROOT, prompt.file), "utf-8");

  // Simple argument substitution for provided arguments
  const args = request.params.arguments ?? {};
  for (const [key, value] of Object.entries(args)) {
    // Replace {{#if key}}...{{/if}} blocks with content if arg is provided
    const ifRegex = new RegExp(`\\{\\{#if ${key}\\}\\}([\\s\\S]*?)\\{\\{/if\\}\\}`, "g");
    content = content.replace(ifRegex, `$1`);
    // Replace {{key}} with value
    content = content.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), String(value));
  }
  // Remove unfilled {{#if}} blocks
  content = content.replace(/\{\{#if \w+\}\}[\s\S]*?\{\{\/if\}\}/g, "");

  return {
    description: prompt.description,
    messages: [{ role: "user", content: { type: "text", text: content } }],
  };
});

// ── Tools ──────────────────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "lookup_concept",
      description: "Look up a Visual Intelligence concept by ID or keyword. Returns the full concept file content.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Concept ID (e.g. 'witness') or retrieval keyword (e.g. 'observer', 'archive bias')",
          },
        },
        required: ["query"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "lookup_concept") {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }

  const query = String((request.params.arguments as { query: string }).query).toLowerCase().trim();

  // Exact ID match
  let concept = conceptIndex.concepts.find(
    (c: { id: string }) => c.id === query
  );

  // Partial retrieval_hints match (stubbed: simple string includes)
  if (!concept) {
    concept = conceptIndex.concepts.find(
      (c: { retrieval_hints: string[] }) =>
        c.retrieval_hints.some((hint: string) => hint.toLowerCase().includes(query) || query.includes(hint.toLowerCase()))
    );
  }

  if (!concept) {
    const available = conceptIndex.concepts.map((c: { id: string }) => c.id).join(", ");
    return {
      content: [
        {
          type: "text",
          text: `No concept found matching "${query}". Available concept IDs: ${available}`,
        },
      ],
    };
  }

  const content = readFileSync(resolve(REPO_ROOT, concept.file), "utf-8");
  return {
    content: [{ type: "text", text: content }],
  };
});

// ── Start ──────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
