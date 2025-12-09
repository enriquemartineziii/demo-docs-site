# Workato AI Documentation Assistant - Implementation Guide

**Last Updated:** December 9, 2024

This guide provides step-by-step instructions for implementing the AI documentation assistant using Workato Genies, Workato MCP Server, and the demo-docs-site repository.

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Workato Components to Create](#workato-components-to-create)
4. [Step-by-Step Setup](#step-by-step-setup)
5. [Testing & Validation](#testing--validation)
6. [Demo Script](#demo-script)
7. [Troubleshooting](#troubleshooting)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         WORKATO PLATFORM                         │
│                                                                  │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐  │
│  │    Slack     │──────▶│   Recipe     │──────▶│     Jira     │  │
│  │   Trigger    │      │ Orchestrator │      │   Ticket     │  │
│  └──────────────┘      └──────┬───────┘      └──────────────┘  │
│                               │                                  │
│                               ▼                                  │
│                        ┌──────────────┐                         │
│                        │    Genie     │                         │
│                        │   (AI Agent) │                         │
│                        └──────┬───────┘                         │
│                               │                                  │
│                               ▼                                  │
│                        ┌──────────────┐                         │
│                        │  MCP Server  │                         │
│                        │ (Git + Files)│                         │
│                        └──────┬───────┘                         │
└───────────────────────────────┼──────────────────────────────────┘
                                │
                                ▼
                        ┌──────────────┐
                        │    GitHub    │
                        │ demo-docs-   │
                        │    site      │
                        └──────────────┘
```

### Data Flow

1. **User posts in Slack** (#docs-requests channel)
2. **Recipe triggers** and captures message
3. **Jira ticket created** with request details
4. **Genie invoked** with context (Slack message + Jira ID)
5. **Genie uses MCP Server** to:
   - Pull latest code from GitHub
   - Search for relevant files
   - Read file contents
   - Analyze and decide on fix
   - Write changes to files
   - Commit and push to new branch
6. **Recipe creates PR** on GitHub
7. **Slack notification** sent with PR link

---

## 📦 Prerequisites

### 1. GitHub Repository Access

- **Repository:** `enriquemartineziii/demo-docs-site`
- **Access Token:** Create a GitHub Personal Access Token
  - Go to: https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Scopes needed:
    - ✅ `repo` (full control of private repositories)
    - ✅ `workflow` (update GitHub Actions workflows)
  - Copy token (save it - you won't see it again!)

### 2. Workato Connections

You'll need to set up connections to:

- **Slack** - For reading messages and posting responses
- **Jira** - For creating and updating tickets
- **GitHub** - For creating pull requests
- **Anthropic Claude** - For AI capabilities (may be built into Genies)

### 3. Access to Workato Features

- **Workato Genies** - AI agent capabilities
- **Workato MCP Server** - Enterprise MCP features
- **Workato Recipes** - Workflow automation

---

## 🔧 Workato Components to Create

### Component 1: MCP Server Connection
**Purpose:** Provides file system and git operations to the Genie

### Component 2: Documentation Fixer Genie
**Purpose:** AI agent that analyzes issues and fixes documentation

### Component 3: Slack Listener Recipe
**Purpose:** Monitors Slack, orchestrates the workflow

### Component 4: GitHub PR Creator (part of recipe)
**Purpose:** Creates pull requests with fixes

---

## 📝 Step-by-Step Setup

### Step 1: Configure MCP Server Connection

**Location in Workato:**
- Navigate to: `Tools` → `MCP Servers` (or `Connections` → `MCP`)
- Click `+ New MCP Server`

**Configuration:**

```yaml
# MCP Server Details
Name: "demo-docs-mcp-server"
Description: "MCP server for demo-docs-site repository"

# Server Type
Type: "Git + Filesystem"

# Repository Configuration
Repository:
  URL: "https://github.com/enriquemartineziii/demo-docs-site.git"
  Branch: "main"
  Authentication:
    Type: "Token"
    Token: "<YOUR_GITHUB_TOKEN>"

# Working Directory
Workspace Path: "/workspace/demo-docs-site"
Auto Pull: true  # Pull latest before each operation
Clone on Start: true

# Enabled Tools
Tools:
  - name: "git_pull"
    description: "Pull latest changes from remote"

  - name: "git_create_branch"
    description: "Create a new git branch"

  - name: "git_commit"
    description: "Commit changes with a message"

  - name: "git_push"
    description: "Push changes to remote"

  - name: "filesystem_read"
    description: "Read contents of a file"
    allowed_paths: ["docs/**/*"]

  - name: "filesystem_write"
    description: "Write content to a file"
    allowed_paths: ["docs/**/*"]

  - name: "filesystem_search"
    description: "Search for text patterns in files"
    allowed_paths: ["docs/**/*"]
    engine: "ripgrep"  # Fast search

  - name: "filesystem_list"
    description: "List files in a directory"
    allowed_paths: ["docs/**/*"]

# Security Settings
Permissions:
  - read
  - write
  - execute_git_commands

# Rate Limits (optional)
Rate Limit:
  Max Operations per Minute: 100
  Max File Size: "10MB"
```

**Testing the MCP Server:**
1. After creating, click `Test Connection`
2. Try these test commands:
   - `git_pull` - Should succeed
   - `filesystem_list` with path: `docs/` - Should return file list
   - `filesystem_read` with path: `docs/README.md` - Should return content

---

### Step 2: Create Documentation Fixer Genie

**Location in Workato:**
- Navigate to: `AI & Automation` → `Genies` (or `Tools` → `Genies`)
- Click `+ New Genie`

**Genie Configuration:**

#### Basic Information
```yaml
Name: "Documentation Fixer"
Description: "Intelligent AI agent that fixes documentation issues"
Avatar: "📚" # Optional emoji
Version: "1.0"
```

#### System Instructions

Paste this into the Genie's system instructions:

```markdown
You are an intelligent documentation assistant for the demo-docs-site project. Your role is to analyze reported documentation issues and fix them accurately.

## Your Capabilities

You have access to the demo-docs-site GitHub repository via MCP tools. You can:
- Pull the latest code
- Search for text patterns across all documentation
- Read file contents
- Write changes to files
- Create git branches
- Commit and push changes

## Your Process

When a user reports a documentation issue, follow this process:

1. **Pull Latest Changes**
   - Always start by pulling the latest code: `git_pull`
   - This ensures you're working with the most current version

2. **Search & Discovery**
   - Use `filesystem_search` to find relevant files
   - Search broadly first, then narrow down
   - Example: If user mentions "Node version", search for "Node" across docs/

3. **Read & Analyze**
   - Use `filesystem_read` to read the full context of relevant files
   - Understand what's around the issue
   - Check multiple files if the same content appears elsewhere

4. **Intelligent Decision Making**

   **For Simple Typos:**
   - Fix directly, one location

   **For Repeated Content:**
   - Search for all instances of the same information
   - Update consistently everywhere
   - Note in your response how many places were updated

   **For Vue Components:**
   - If you find a `.vue` file in `docs/.vuepress/components/`
   - Recognize this is a REUSABLE component
   - Check which pages use it (search for `<ComponentName>` or `<ComponentName />`)
   - If fixing the component, explain this affects multiple pages

   **For Context-Dependent Issues:**
   - Read surrounding text carefully
   - Example: "Node.js 14" in "Legacy Support" section is correct
   - Example: "Node.js 14" in "Current Requirements" is wrong
   - Only update what's actually incorrect
   - Explain why you left certain instances unchanged

5. **Make Changes**
   - Create a descriptive branch: `fix/brief-description`
   - Use `filesystem_write` to update files
   - Write clear, accurate content
   - Preserve formatting and style

6. **Commit Changes**
   - Write descriptive commit messages
   - Format: "Fix: [what was wrong] in [where]"
   - Example: "Fix: Update Node.js requirements from 14 to 16"

7. **Push & Report**
   - Push to the new branch
   - Return a detailed summary including:
     - What was wrong
     - What you changed
     - Which files were affected
     - Any important context (e.g., "this is a component used in 3 places")

## Important Guidelines

- **Be thorough:** Don't just fix the first instance, search for related issues
- **Be conservative:** If unsure, ask for clarification rather than guessing
- **Be contextual:** Read surrounding content to understand intent
- **Be explanatory:** Always explain your reasoning
- **Respect history:** Don't change historical/legacy documentation that's intentionally different

## Example Scenarios

### Scenario 1: Simple Typo
Request: "There's a typo - 'tittle' should be 'title'"
Action: Search for "tittle", fix all instances, commit

### Scenario 2: Version Update
Request: "Installation docs say Node 14, should be 16"
Action:
1. Search for all "Node" version references
2. Read context of each
3. Update "current" requirements to 16
4. Leave "legacy" docs at 14 (if they're historical)
5. Explain what you changed and what you kept

### Scenario 3: Component Fix
Request: "System requirements are outdated"
Action:
1. Find it's in SystemRequirements.vue component
2. Search for pages using `<SystemRequirements`
3. Update the component
4. Note: "Updated SystemRequirements.vue which affects installation.md, first-project.md, and legacy-support.md"

## Response Format

Always respond with:
1. **Analysis:** What you found
2. **Action Taken:** What you changed
3. **Files Modified:** List of files
4. **Branch Created:** Branch name
5. **Summary:** Brief explanation for PR description
```

#### MCP Server Connection

In the Genie configuration:
```yaml
MCP Servers:
  - "demo-docs-mcp-server"

# This makes all MCP tools available to the Genie
```

#### Conversation Settings

```yaml
Max Conversation Turns: 10
Context Window: "Full conversation history"
Temperature: 0.3  # Lower = more consistent, focused
Max Tokens: 8192
```

#### Test the Genie

Before using in a recipe, test the Genie directly:

**Test 1: Simple Search**
```
You: "Search for the word 'tittle' in the documentation"
Expected: Genie uses filesystem_search, finds it in getting-started.md
```

**Test 2: Read a File**
```
You: "Read the getting-started.md file"
Expected: Genie uses filesystem_read, returns content
```

**Test 3: Make a Change (dry run)**
```
You: "What would you do to fix the typo 'tittle' → 'title'?"
Expected: Genie explains process without actually making changes
```

---

### Step 3: Create Slack Listener Recipe

**Location in Workato:**
- Navigate to: `Recipes` → `+ Create Recipe`
- Choose `Trigger: Slack` → `New Message in Channel`

**Recipe Name:** `Slack Docs Request → AI Fix → PR`

#### Trigger Configuration

```yaml
Trigger: New message posted to channel
Channel: "#docs-requests"
Options:
  - Exclude bot messages: true
  - Exclude messages from self: true
  - Thread messages: "Include"
```

#### Recipe Steps

**Step 1: Filter Valid Requests**

```ruby
# Only process messages that aren't from bots
# and contain keywords like "fix", "typo", "update", "wrong", etc.

if: Message.user.is_bot == false
```

**Step 2: Create Jira Ticket**

```yaml
Action: Jira - Create Issue
Connection: <Your Jira Connection>

Configuration:
  Project: "DOCS"
  Issue Type: "Task"
  Summary: "[DOCS] {{Message.text}}"
  Description: |
    Documentation issue reported in Slack by {{Message.user.name}}

    **Original Message:**
    {{Message.text}}

    **Slack Link:**
    {{Message.permalink}}

    **Reporter:** {{Message.user.real_name}} (@{{Message.user.name}})
    **Channel:** {{Channel.name}}
    **Timestamp:** {{Message.ts}}

  Priority: "Medium"
  Labels: ["documentation", "ai-generated"]

Output Fields:
  - Issue Key (e.g., DOCS-123)
  - Issue URL
```

**Step 3: Post "Working on it" Message**

```yaml
Action: Slack - Post Message
Connection: <Your Slack Connection>

Configuration:
  Channel: "#docs-requests"
  Thread TS: "{{Message.ts}}"  # Reply in thread
  Message: |
    🤖 I'm on it! Creating Jira ticket and analyzing the issue...

    Ticket: {{Jira.issue_key}}
```

**Step 4: Invoke Genie**

```yaml
Action: Genie - Invoke
Genie: "Documentation Fixer"

Input:
  Message: |
    A user reported this documentation issue:

    **Request:** {{Message.text}}
    **Jira Ticket:** {{Jira.issue_key}}
    **Reporter:** {{Message.user.real_name}}

    Please analyze and fix this issue. Follow these steps:
    1. Pull the latest code
    2. Search for the reported issue
    3. Read relevant files for context
    4. Make the necessary fixes
    5. Commit to a new branch named: fix/{{Jira.issue_key}}
    6. Push your changes

    Return a detailed summary of what you changed.

Settings:
  Timeout: 300 seconds  # 5 minutes
  Max Retries: 2

Output Fields:
  - Branch Name
  - Files Changed (array)
  - Summary (text)
  - Commit Message
```

**Step 5: Create GitHub Pull Request**

```yaml
Action: GitHub - Create Pull Request
Connection: <Your GitHub Connection>

Configuration:
  Repository Owner: "enriquemartineziii"
  Repository Name: "demo-docs-site"

  Title: "Fix: {{Message.text | truncate(60)}}"

  Body: |
    ## 📋 Issue
    {{Message.text}}

    ## 🔧 Changes Made
    {{Genie.summary}}

    ## 📁 Files Modified
    {{Genie.files_changed | join(', ')}}

    ## 🎫 Jira Ticket
    [{{Jira.issue_key}}]({{Jira.issue_url}})

    ## 👤 Requested By
    {{Message.user.real_name}} (@{{Message.user.name}})

    ---
    🤖 Generated by Workato AI Documentation Assistant

  Head Branch: "{{Genie.branch_name}}"
  Base Branch: "main"

  Reviewers:
    - "enriquemartineziii"  # Add yourself or team members

  Labels:
    - "documentation"
    - "ai-generated"

Output Fields:
  - PR Number
  - PR URL
  - PR State
```

**Step 6: Update Jira Ticket**

```yaml
Action: Jira - Add Comment
Connection: <Your Jira Connection>

Configuration:
  Issue Key: "{{Jira.issue_key}}"
  Comment: |
    ✅ AI has created a pull request to fix this issue.

    **PR:** {{GitHub.pr_url}}
    **Branch:** {{Genie.branch_name}}
    **Files Changed:** {{Genie.files_changed | size}}

    **Summary:**
    {{Genie.summary}}

    Waiting for review from docs team.
```

**Step 7: Post Success Message in Slack**

```yaml
Action: Slack - Post Message
Connection: <Your Slack Connection>

Configuration:
  Channel: "#docs-requests"
  Thread TS: "{{Message.ts}}"  # Reply in same thread
  Message: |
    ✅ Done! I've created a pull request to fix this.

    **PR:** <{{GitHub.pr_url}}|#{{GitHub.pr_number}}>
    **Jira Ticket:** <{{Jira.issue_url}}|{{Jira.issue_key}}>
    **Branch:** `{{Genie.branch_name}}`

    **Changes Made:**
    {{Genie.summary}}

    **Files Modified:** {{Genie.files_changed | size}} file(s)
    {{#each Genie.files_changed}}
    • `{{this}}`
    {{/each}}

    A docs team member will review and merge soon! 👍

  Blocks: |
    [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "✅ *Documentation fix ready for review*"
        }
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*PR:*\n<{{GitHub.pr_url}}|#{{GitHub.pr_number}}>"
          },
          {
            "type": "mrkdwn",
            "text": "*Jira:*\n<{{Jira.issue_url}}|{{Jira.issue_key}}>"
          }
        ]
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*Summary:*\n{{Genie.summary}}"
        }
      }
    ]
```

**Error Handling:**

Add error handling steps after each major action:

```yaml
On Error:
  Action: Slack - Post Message
  Channel: "#docs-requests"
  Thread TS: "{{Message.ts}}"
  Message: |
    ❌ Oops! Something went wrong while processing your request.

    **Error:** {{Error.message}}
    **Step:** {{Error.step}}
    **Jira Ticket:** {{Jira.issue_key}}

    A human will need to look at this one. cc: @docs-team
```

---

### Step 4: Optional - Create PR Review Notifier Recipe

**Purpose:** Notify in Slack when PR is reviewed/merged

**Trigger:** GitHub - Pull Request Event

**Steps:**
1. When PR is reviewed → Post in Slack thread
2. When PR is merged → Update Jira ticket → Post success message
3. When PR is closed without merge → Notify requester

---

## ✅ Testing & Validation

### Phase 1: Component Testing

#### Test 1: MCP Server Connection
```
1. Go to MCP Server settings
2. Click "Test Connection"
3. Try: git_pull → Should succeed
4. Try: filesystem_list with path "docs/" → Should list files
5. Try: filesystem_read "docs/README.md" → Should return content
```

#### Test 2: Genie Alone
```
1. Open Genie interface in Workato
2. Send: "Pull the latest code"
   → Verify it uses git_pull tool
3. Send: "Search for the word 'VuePress'"
   → Verify it uses filesystem_search
4. Send: "Read the file docs/README.md"
   → Verify it uses filesystem_read and returns content
5. Send: "What would you do to fix a typo?"
   → Verify it explains process (doesn't actually change anything)
```

#### Test 3: Recipe with Mock Data
```
1. Use "Test Recipe" feature in Workato
2. Provide sample Slack message: "Fix typo in getting-started.md"
3. Step through each action
4. Verify Jira ticket created
5. Verify Genie invoked
6. Stop before GitHub PR (optional)
```

### Phase 2: End-to-End Testing

Use the test scenarios from `TESTING_SCENARIOS.md`:

#### Test Scenario 1: Simple Typo
```
Slack Message: "There's a typo on the Getting Started page - it says 'tittle' instead of 'title'"

Expected Flow:
1. ✅ Recipe triggers
2. ✅ Jira ticket created (DOCS-XXX)
3. ✅ "Working on it" message posted
4. ✅ Genie searches for "tittle"
5. ✅ Genie finds it in docs/guide/getting-started.md:37
6. ✅ Genie reads file for context
7. ✅ Genie creates branch: fix/DOCS-XXX
8. ✅ Genie updates file (tittle → title)
9. ✅ Genie commits and pushes
10. ✅ PR created on GitHub
11. ✅ Success message in Slack thread

Validation:
- Check PR shows correct change
- Check only one line changed
- Check commit message is descriptive
```

#### Test Scenario 2: Multiple Locations
```
Slack Message: "The docs say we need Node 14 but shouldn't it be Node 16?"

Expected Flow:
1-3. Same as above
4. ✅ Genie searches for "Node 14" or "14.0"
5. ✅ Genie finds multiple locations
6. ✅ Genie reads each file for context
7. ✅ Genie identifies which are current vs legacy
8. ✅ Genie creates branch
9. ✅ Genie updates only current requirement docs
10. ✅ Genie commits with explanation
11. ✅ PR created
12. ✅ Success message explains multiple files changed

Validation:
- PR shows changes in 2-3 files
- Legacy docs unchanged
- Commit message mentions "multiple locations"
```

#### Test Scenario 3: Component Fix (Advanced)
```
Slack Message: "The system requirements on the installation page are outdated"

Expected Flow:
1-3. Same as above
4. ✅ Genie searches for "system requirements"
5. ✅ Genie finds SystemRequirements.vue component
6. ✅ Genie searches for pages using <SystemRequirements>
7. ✅ Genie realizes fixing component affects 3 pages
8. ✅ Genie creates branch
9. ✅ Genie updates component file
10. ✅ Genie commits
11. ✅ PR created
12. ✅ Success message notes "affects 3 pages"

Validation:
- PR only changes the .vue file
- PR description mentions blast radius
- Commit message explains it's a component
```

### Phase 3: Error Handling

Test error scenarios:

```
Test 1: Network error
- Disconnect MCP server temporarily
- Post message in Slack
- Verify error message posted

Test 2: Invalid file path
- Post: "Fix the file nonexistent.md"
- Verify Genie handles gracefully

Test 3: Merge conflict
- Manually edit same file
- Have Genie try to fix
- Verify conflict is detected and reported
```

---

## 🎬 Demo Script for Hackathon

### Setup (5 minutes before demo)

**Pre-Demo Checklist:**
- [ ] Workato Recipe is running
- [ ] Slack #docs-requests channel ready
- [ ] GitHub repo at https://enriquemartineziii.github.io/demo-docs-site/ is live
- [ ] Jira project accessible
- [ ] Screen share ready (show Slack, Workato logs, GitHub)

### Demo Flow (10-15 minutes)

#### Act 1: Introduction (2 min)
```
"Hi everyone! Today I'm showing an AI documentation assistant built entirely
on Workato's platform - Genies, Enterprise MCP, and Recipes.

The problem: Our docs team gets 50+ requests per week in Slack.
Simple typos, outdated versions, broken links - things that take time but
are straightforward to fix.

The solution: An AI agent that automatically fixes these issues and creates
pull requests for review."

[Show architecture diagram]
```

#### Act 2: Simple Fix Demo (3 min)
```
"Let me show you a simple example."

[Open Slack, type in #docs-requests:]
"Fix the typo 'availible' on the deployment page"

[Screen share showing:]
1. Message appears in Slack
2. Bot replies: "🤖 I'm on it! Creating Jira ticket..."
3. Switch to Jira - show ticket created
4. Switch to Workato - show recipe running, logs streaming
5. Show Genie using MCP tools:
   - git_pull
   - filesystem_search "availible"
   - filesystem_read to get context
   - filesystem_write with fix
   - git_commit and git_push
6. Bot replies in Slack with PR link
7. Click PR - show the fix

[Point out:]
"30 seconds from request to PR.
The AI found the typo, understood the context, and fixed it."
```

#### Act 3: Intelligence Demo (5 min)
```
"But here's where it gets interesting. Let's try something more complex."

[Type in Slack:]
"The FAQ says we need Node 14 but shouldn't it be Node 16?"

[Show process:]
1. Bot acknowledges
2. Workato logs show Genie thinking:
   - Searching for all "Node 14" references
   - Reading multiple files
   - Analyzing context
3. Show Genie's reasoning in logs:
   "Found Node 14 in 4 files.
    - installation.md: Current requirements → Should update to 16
    - FAQ.md: Current requirements → Should update to 16
    - SystemRequirements.vue: Component used in 3 pages → Should update
    - legacy-support.md: Legacy documentation → Should NOT change (historically accurate)

   Decision: Update first 3, leave legacy doc unchanged."

4. PR created with all changes
5. PR description explains reasoning

[Point out:]
"The AI didn't just find and replace '14' with '16'.
It understood CONTEXT. It knew that legacy documentation
should reference older versions. That's intelligence."
```

#### Act 4: Component Blast Radius (4 min)
```
"One more example that shows architectural awareness."

[Type in Slack:]
"System requirements on installation page are outdated"

[Show process:]
1. Genie searches, finds it's in SystemRequirements.vue
2. Genie searches for pages using this component
3. Genie's analysis (show logs):
   "Found SystemRequirements component.
    Used in:
    - docs/guide/installation.md
    - docs/tutorials/first-project.md
    - docs/guide/legacy-support.md

   Decision: Update the component file (single source of truth).
   This will affect all 3 pages."

4. PR shows only the component file changed
5. PR description notes: "Updated SystemRequirements.vue (affects 3 pages)"

[Point out:]
"The AI understood this was a reusable component.
It didn't update each page individually - it fixed the source.
It understood the architecture and blast radius."

[Pull up the actual live site to show the component on multiple pages]
```

#### Act 5: Wrap Up (1 min)
```
"So what did we build?

✅ Fully automated from Slack to PR
✅ Context-aware AI decisions
✅ Understands documentation architecture
✅ Built entirely on Workato platform:
   - Genies for AI reasoning
   - MCP Server for git/file operations
   - Recipes for orchestration
   - All our existing integrations (Slack, Jira, GitHub)

This is production-ready. We could deploy this today and start
handling 50% of our documentation requests automatically.

Questions?"
```

### Backup Scenarios

If something fails during demo:

**Backup 1:** Show pre-recorded screencast
**Backup 2:** Walk through Workato recipe step-by-step
**Backup 3:** Show previous successful PRs

---

## 🐛 Troubleshooting

### Issue: MCP Server Connection Failed

**Symptoms:** Genie can't access files

**Checks:**
1. Verify GitHub token is valid
2. Check token has `repo` scope
3. Test MCP connection manually
4. Check repository URL is correct
5. Verify branch name is "main" not "master"

**Fix:**
```
1. Go to GitHub Settings → Developer Settings → Tokens
2. Regenerate token with correct scopes
3. Update in Workato MCP Server connection
4. Test connection again
```

### Issue: Genie Not Using MCP Tools

**Symptoms:** Genie gives generic responses, doesn't search files

**Checks:**
1. Verify MCP server is connected to Genie
2. Check tools are enabled in MCP server
3. Review Genie's system instructions
4. Check Genie's tool usage in logs

**Fix:**
```
1. Edit Genie configuration
2. Ensure "MCP Servers" section includes "demo-docs-mcp-server"
3. Add explicit instructions: "Use filesystem_search to find files"
4. Test again with simple command: "Search for 'VuePress'"
```

### Issue: Git Operations Fail

**Symptoms:** Can pull but can't push, or commit fails

**Checks:**
1. Verify GitHub token has write access
2. Check branch name doesn't already exist
3. Verify no uncommitted changes from previous run
4. Check file permissions in MCP server

**Fix:**
```
1. Ensure token has `repo` scope (not just `public_repo`)
2. In MCP server config, add:
   permissions:
     - read
     - write
     - execute_git_commands
3. Test git_push command manually
```

### Issue: PR Creation Fails

**Symptoms:** Changes committed but no PR created

**Checks:**
1. Verify GitHub connection in Recipe
2. Check branch exists on GitHub
3. Verify base branch is "main"
4. Check PR doesn't already exist for that branch

**Fix:**
```
1. Check Recipe logs for exact error
2. Verify GitHub connection has PR creation permission
3. Try creating PR manually to test permissions
4. Check branch name format (avoid special characters)
```

### Issue: Genie Makes Wrong Changes

**Symptoms:** Fixes wrong file, or misunderstands request

**Checks:**
1. Review Genie's analysis in logs
2. Check system instructions for clarity
3. Verify temperature setting (should be low for consistency)
4. Check if request was ambiguous

**Fix:**
```
1. Improve Genie instructions with more examples
2. Lower temperature to 0.2-0.3 for more focused behavior
3. Add validation step: "Confirm before committing"
4. Test with clearer, more specific requests
```

### Issue: Slow Performance

**Symptoms:** Takes >5 minutes to complete

**Checks:**
1. Check MCP server response times
2. Review Genie's tool usage (too many searches?)
3. Check repository size
4. Verify network latency

**Fix:**
```
1. Optimize Genie instructions: "Search narrowly first"
2. Increase Recipe timeout to 600 seconds
3. Consider caching frequently accessed files
4. Use filesystem_search with specific paths: "docs/guide/*"
```

---

## 📚 Additional Resources

### Workato Documentation
- [Workato Genies Documentation](https://docs.workato.com/genies)
- [Workato MCP Server Guide](https://docs.workato.com/mcp)
- [Recipe Best Practices](https://docs.workato.com/recipes)

### Related Files in This Repo
- `TESTING_SCENARIOS.md` - All 13 test scenarios with expected behaviors
- `README.md` - Project overview
- `deploy.sh` - Manual deployment script
- `.github/workflows/deploy.yml` - Auto-deployment on push

### GitHub Repo
- **Repository:** https://github.com/enriquemartineziii/demo-docs-site
- **Live Site:** https://enriquemartineziii.github.io/demo-docs-site/
- **Issues:** Test cases are documented as intentional issues

### Support Contacts
- **Workato Support:** [support portal link]
- **Team Slack:** #hackathon-ai-docs
- **Repo Owner:** @enriquemartineziii

---

## 🎯 Success Criteria

Your implementation is successful when:

- [ ] Slack message triggers recipe automatically
- [ ] Jira ticket is created with correct details
- [ ] Genie analyzes the issue and searches files
- [ ] Genie makes appropriate changes to files
- [ ] Changes are committed to a new branch
- [ ] Pull request is created on GitHub
- [ ] PR description includes clear explanation
- [ ] Slack notification sent with PR link
- [ ] Entire flow completes in <5 minutes
- [ ] Can handle all 4 complexity levels:
  - [ ] Simple typos
  - [ ] Multi-location updates
  - [ ] Component fixes
  - [ ] Context-aware decisions

---

## 📝 Notes & Tips

### For Hackathon Demo
1. **Prepare fallbacks** - Have screenshots/video ready
2. **Test morning of** - Run through all scenarios
3. **Clear Slack channel** - Start with clean channel for demo
4. **Use separate branch** - Don't pollute main with test PRs
5. **Explain as you go** - Don't just show, narrate the "why"

### For Production Use
1. **Add approval step** - Require human review before merging
2. **Add tests** - Run automated tests before creating PR
3. **Rate limiting** - Prevent spam/abuse
4. **Monitoring** - Track success rate, errors, performance
5. **Cost management** - Monitor AI API usage

### Advanced Features to Add Later
- [ ] Auto-merge PRs that pass tests
- [ ] Notify specific team members based on file changed
- [ ] Support for images and diagrams
- [ ] Detect breaking changes
- [ ] Learning from merged vs rejected PRs
- [ ] Multi-file coordinated changes
- [ ] Suggest related improvements

---

**Last Updated:** December 9, 2024
**Version:** 1.0
**Status:** Ready for Implementation
