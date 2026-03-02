---
inclusion: always
---   
<!------------------------------------------------------------------------------------
   Add rules to this file or a short description that will apply across all your workspaces.
   
   Learn about inclusion modes: https://kiro.dev/docs/steering/#inclusion-modes
-------------------------------------------------------------------------------------> 

# Universal Coding Principles

0. **Single Responsibility Principle (SRP)**

1. **DRY (Don't Repeat Yourself)**: Avoid code duplication
2. **KISS (Keep It Simple, Stupid)**: Keep solutions simple and straightforward
3. **YAGNI (You Aren't Gonna Need It)**: Don't add functionality before needing it
4. **Composition over Inheritance**: Prefer component composition over inheritance
5. **Immutability**: Treat data as immutable to avoid side effects

The practices and patterns described here should be followed by all team members to ensure efficient and sustainable development.

You should always use context7 mcp tool when I need code generation, setup or configuration steps, or library/API documentation. This means you should automatically use the Context7 MCP tools to resolve library id and get library docs without me having to explicitly ask.

## Personal Instructions

Always follow these rules [always prefer to do (something)]:
- Write powershell compatible commands.
- Prefer 'pnpm' or 'pnpm dlx' or 'pnpm exec' as package manager command.
- Follow project's naming and taxionomy for components, files, vars or folders.
- Prefer to use tailwindcss classes v4 to avoid lint errors.
- Ask to clarify if there are complexity and project's nuances.
- If its a repo url use Github mcp.
- Avoid Emojis when answering me.

Analyse the conditions to prompt these rules [when condition; prefer to do (something)]:
- When using a lib or when the user ask you: prefer to use Context7 mcp before generating code for better results.
- When implementing a new feature ask the user for futher clarification and engage him to use  the command '/speckit.specify' to start a spec of the feature.

Folder Organization
.gitkeep Files
Use .gitkeep files in important folders to document immutable rules and conventions
Keep rules concise and actionable (they need to be balanced)
Example: src/constants/.gitkeep contains SSOT rules for constants folder