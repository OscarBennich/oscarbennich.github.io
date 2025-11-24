# Agent Instructions

## Workflow

1. **Wait for a prompt** - User provides instructions for changes
2. **Execute the task** - Make the necessary code/file changes
3. **Wait for review** - User tests and reviews the changes
4. **Iterate if needed** - If issues are found, fix them and repeat step 3
5. **Finalize** - When user says it's complete/perfect:
   - Log the prompt(s) to `docs/agents/PROMPTS.md`
   - Commit the changes with an appropriate message

## Prompt Logging

When the user indicates work is complete, add an entry to `docs/agents/PROMPTS.md` with the following information:

### Required Metadata:
- **Prompt Number**: Sequential number (Prompt 1, Prompt 2, etc.)
- **Date & Time**: ISO 8601 format in UTC (YYYY-MM-DD HH:MM:SS UTC)
- **Tool**: Agent tool being used (such as "GitHub Copilot CLI" or "Claude Code"), including the version (such as v0.0.354)
- **Model**: Underlying LLM model being used (such as "Claude Sonnet 4.5" or "GPT-5")

### Format:
```markdown
## Prompt N
**Date & Time:** YYYY-MM-DD HH:MM:SS UTC  
**Tool:** GitHub Copilot CLI  
**Model:** Claude Sonnet 4.5

**Prompt:**
```
[Full text of the user's prompt]
```

**Changes:**
- Brief summary of files added
- Brief summary of files modified
- Brief summary of key changes made

---
```

### Instructions:
1. **Only log prompts that result in file changes** (creation, modification, or deletion)
2. Do NOT log prompts that:
   - Ask questions or request information
   - Run git commands without modifying files
   - Execute read-only operations (viewing, searching, etc.)
3. Log only when the user indicates the work is complete and satisfactory
4. If multiple prompts/iterations were needed, log the **initial prompt** that started the work
5. Use the exact prompt text provided by the user for the initial request
6. Include a **Changes** section with brief summary of additions and modifications
7. Maintain chronological order
8. Keep formatting consistent across all entries
