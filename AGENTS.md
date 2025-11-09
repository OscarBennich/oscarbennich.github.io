# Agent Instructions

## Prompt Logging

After executing each user command/prompt, you must add an entry to `docs/agents/PROMPTS.md` with the following information:

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
3. Always log **after** successfully executing the requested task
4. Use the exact prompt text provided by the user
5. Include a **Changes** section with brief summary of additions and modifications
6. Maintain chronological order
7. Keep formatting consistent across all entries
