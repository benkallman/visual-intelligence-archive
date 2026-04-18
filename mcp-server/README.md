# Visual Intelligence MCP Server

A minimal MCP server exposing the Visual Intelligence Archive as resources, prompt templates, and a concept lookup tool.

## Status

This is a **starter scaffold**. See the implementation status table below for what works and what is stubbed.

## What This Server Exposes

### Resources
Ten resources covering the core concepts, manifestos, and agent processing note. Loaded from the repo filesystem at request time.

### Prompts
Three prompt templates: `interpret_image_888`, `compare_images_888`, `score_interpretation`.

### Tools
One tool: `lookup_concept` — accepts a concept ID or keyword, returns the matching concept file content.

## Implementation Status

| Feature | Status | Notes |
|---|---|---|
| Resource listing | ✅ Implemented | Reads from `../mcp/resource-map.json` |
| Resource read | ✅ Implemented | Reads files from repo root |
| Prompt listing | ✅ Implemented | Reads from `../mcp/prompt-map.json` |
| Prompt get | ✅ Implemented | Returns prompt template content |
| `lookup_concept` tool | ✅ Implemented | Exact ID match + partial retrieval_hints match |
| Semantic concept search | ⚠️ Stubbed | Returns keyword match only, not embedding search |
| HTTP SSE transport | ❌ Not implemented | stdio only |
| Authentication | ❌ Not implemented | |
| Caching | ❌ Not implemented | Files are read on each request |

## Setup

```bash
npm install
npm run dev        # development (tsx, no build)
npm run build      # compile to dist/
npm start          # run compiled server
```

## Integration with Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "visual-intelligence": {
      "command": "node",
      "args": ["/path/to/visual-intelligence-archive/mcp-server/dist/index.js"]
    }
  }
}
```

## What This Server Does Not Do

- Does not process images (no vision model)
- Does not store state between sessions
- Does not provide ground-truth art historical interpretation
- Does not embed or semantically index content at runtime

The server provides the interpretive framework. The calling agent does the image processing.
