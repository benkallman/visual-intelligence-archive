---
id: mcp-server-outline
title: MCP Server Outline
type: documentation
audience: [developers]
updated_at: 2026-04-17
---

# MCP Server Outline

## What to Build

A minimal MCP server that exposes the Visual Intelligence Archive as:
1. Retrievable resources (concepts, manifesto, agent notes)
2. Callable prompt templates (interpret, compare, score)
3. A concept lookup tool

## Technology

- Runtime: Node.js with TypeScript
- SDK: `@modelcontextprotocol/sdk`
- Transport: stdio (for local/CLI use) or HTTP SSE (for hosted deployment)
- No database required — all content is read from the filesystem

## Server Structure

```
mcp-server/
├── package.json
├── tsconfig.json
├── README.md
└── src/
    └── index.ts        ← server entry point
```

## Resource Registration

For each entry in `mcp/resource-map.json`:
- Register a resource with the given URI
- On read request, load and return the corresponding file from the repo

Resources are static — no dynamic content. The server reads from the repo filesystem at startup or on-demand.

## Prompt Registration

For each entry in `mcp/prompt-map.json`:
- Register a prompt with the given name and description
- On prompt request, load the prompt template from `prompts/` and return it
- Prompts may accept arguments (see each prompt file for argument definitions)

## Tool Registration

One tool: `lookup_concept`
- Accept a `query` string (concept ID or keyword)
- Match against concept IDs and `retrieval_hints` in `index/concepts.json`
- Return the full content of the best-matching concept file
- If no match, return a list of available concept IDs

## Implementation Status (Scaffold)

| Feature | Status |
|---|---|
| Resource listing | Implemented in scaffold |
| Resource read | Implemented in scaffold |
| Prompt listing | Implemented in scaffold |
| Prompt get | Implemented in scaffold |
| Concept lookup tool | Implemented in scaffold |
| Full concept index search | Stubbed — returns exact-ID match only |
| HTTP SSE transport | Not implemented — stdio only |
| Authentication | Not implemented |
| Caching | Not implemented |

## Extending the Server

To add a new resource:
1. Add an entry to `mcp/resource-map.json`
2. The server reads this map at startup — no code changes required

To add a new prompt:
1. Create the prompt file in `prompts/`
2. Add an entry to `mcp/prompt-map.json`

To add a new tool:
1. Add a handler in `src/index.ts` following the existing pattern
