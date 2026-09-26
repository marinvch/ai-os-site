# MCP brain

An optional MCP server over stdio that turns Cortex's memory into live tools for any agent that
speaks MCP. It ships inside the plugin and, like the rest of Cortex, has **no dependencies** — the
transport is about a hundred lines of plain Node.

## Two modes, decided by the root

The server serves one of two worlds, and it **detects** which from the root it is given — it is
never configured:

- **Repo mode** — the root is a repo's `.cortex/` directory. Tools: {{repoTools}}.
- **Vault mode** — the root is a personal vault. Tools: {{vaultTools}}.

The plugin starts it in repo mode, pointed at the project you opened. Vault tools are **hidden
*and* refused** in repo mode, so an agent can never be invited to write a personal inbox into
someone's product repository.

## Safety that belongs to the tool, not the caller

- **A tool that returns someone else's text says so.** Recalled memory was written outside the
  conversation, so every such tool's description tells the model to treat the result as data, not
  instructions — the standard prompt-injection path through a retrieval tool.
- **A tool that publishes is gated.** Anything that commits or pushes content goes through the same
  secret gate as memory.
- **Results are capped.** Every tool result is held to a size an agent can read in full; an
  oversized result comes back marked `truncated` with a hint to ask for less, instead of being cut
  silently.

## All {{mcpToolCount}} tools
