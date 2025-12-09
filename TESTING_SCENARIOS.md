# Testing Scenarios for AI Documentation Assistant

This document lists all intentional issues in the demo docs site for testing your Workato Genie + AI automation workflow.

**Last Updated:** December 9, 2024

---

## Simple Issues (Type 1: Basic Fixes)

### 1. Simple Typos

These are straightforward typos that need to be fixed in one location.

#### Issue 1.1: "tittle" → "title"
- **File:** `docs/guide/getting-started.md`
- **Line:** 37
- **Current:** "Site tittle and description"
- **Should be:** "Site title and description"
- **Slack Message Example:** "Hey @docs-team, there's a typo on the Getting Started page - it says 'tittle' instead of 'title' in the configuration section"

#### Issue 1.2: "recomended" → "recommended"
- **File:** `docs/faq/README.md`
- **Line:** 29
- **Current:** "4GB recomended"
- **Should be:** "4GB recommended"
- **Slack Message Example:** "Found a typo in the FAQ - 'recomended' is misspelled in the system requirements"

#### Issue 1.3: "availible" → "available"
- **File:** `docs/tutorials/deployment.md`
- **Line:** 90
- **Current:** "Your site will be availible at:"
- **Should be:** "Your site will be available at:"
- **Slack Message Example:** "The deployment tutorial has 'availible' instead of 'available' - can someone fix this?"

#### Issue 1.4: "troubleshoting" → "troubleshooting" (Broken Link)
- **File:** `docs/guide/installation.md`
- **Line:** 66
- **Current:** Link to `/guide/troubleshoting.md`
- **Should be:** Link to `/guide/troubleshooting.md`
- **Slack Message Example:** "The troubleshooting link in the installation guide is broken - it's missing an 'o'"

---

## Medium Complexity (Type 2: Multiple Instances)

### 2. Outdated Version Numbers (Appears in Multiple Places)

The documentation incorrectly states Node.js 14 and npm 6 as requirements. This needs to be updated across multiple files.

#### Issue 2.1: Outdated Node.js version in installation.md
- **File:** `docs/guide/installation.md`
- **Line:** 9
- **Current:** "Version 14.0.0 or higher (recommended: v16.x)"
- **Should be:** "Version 16.0.0 or higher (recommended: v18.x)"

#### Issue 2.2: Outdated versions in FAQ
- **File:** `docs/faq/README.md`
- **Lines:** 27-28
- **Current:**
  - "Node.js 14.0 or higher"
  - "npm 6.0 or higher"
- **Should be:**
  - "Node.js 16.0 or higher"
  - "npm 7.0 or higher"

**Slack Message Example:** "The installation guide says we need Node 14+, but I thought we required Node 16 now? Can you verify and update if needed?"

**AI Challenge:** The AI should:
1. Recognize this appears in multiple locations
2. Verify the correct version from other sources
3. Update ALL instances consistently

---

## Complex Issues (Type 3: Reusable Components)

### 3. SystemRequirements Component (Affects Multiple Pages)

The `SystemRequirements.vue` component has outdated version numbers and is used on multiple pages:

- **Component File:** `docs/.vuepress/components/SystemRequirements.vue`
- **Lines:** 14-18
- **Used In:**
  - `docs/guide/installation.md`
  - `docs/tutorials/first-project.md`
  - `docs/guide/legacy-support.md`

#### Current (Wrong):
```
Node.js: 14.0.0 minimum, v16.x recommended
npm: 6.0.0 minimum, 8.x recommended
```

#### Should Be:
```
Node.js: 16.0.0 minimum, v18.x recommended
npm: 7.0.0 minimum, 9.x recommended
```

**Slack Message Example:** "The system requirements box on the installation page shows Node 14 - isn't that outdated? I see the same requirements on the tutorial page too."

**AI Challenge:** The AI must:
1. Detect this is a reusable Vue component
2. Understand that fixing the component affects ALL pages that use it
3. Decide: Fix the component source (affects 3 pages) vs. only addressing the specific page mentioned
4. Explain the blast radius of the change

---

## Very Complex Issues (Type 4: Context-Dependent)

### 4. Context-Dependent Version References

The same text ("Node.js 14") appears in different contexts with different meanings:

#### Issue 4.1: WRONG - Current requirements
- **File:** `docs/guide/installation.md`
- **Context:** "Prerequisites" section for current VuePress setup
- **Current:** Mentions Node.js 14
- **Should be:** Node.js 16+

#### Issue 4.2: CORRECT - Legacy support documentation
- **File:** `docs/guide/legacy-support.md`
- **Line:** 22
- **Context:** "Legacy Support" section specifically about VuePress 1.x
- **Current:** "Node.js: Version 14.0.0 or higher"
- **Should be:** LEFT AS IS (this is historically accurate for VuePress 1.x)

**Slack Message Example:** "I noticed we mention Node 14 in several places. Some say it's deprecated, others say it's the requirement. Can you check which is correct?"

**AI Challenge:** The AI must:
1. Read surrounding context to understand intent
2. Recognize that "Node.js 14" is:
   - WRONG in "current requirements" contexts
   - CORRECT in "legacy version" contexts
3. Update only the incorrect instances
4. Explain why some instances were left unchanged

---

## API Endpoint Duplication (Type 5: Scattered Information)

### 5. Base API URL Mentioned in Multiple Files

The API base URL `https://api.vuepress-docs.com/v1` appears in multiple places and should be consistent.

**Correct URL:** `https://api.vuepress-docs.com/v1`

#### Locations:
1. `docs/api/README.md` - Line 9 ✓ (Correct)
2. `docs/api/endpoints.md` - Line 9 ✓ (Correct)
3. `docs/guide/getting-started.md` - Line 55 ✓ (Correct)

**Intentional inconsistency to test:**

#### Issue 5.1: Legacy API section mentions old rate limit
- **File:** `docs/api/endpoints.md`
- **Line:** 308
- **Current:** "Limited to 14 requests per hour"
- **Also in:** `docs/guide/legacy-support.md` - Line 54 (same statement)

**Slack Message Example:** "The API rate limit in the endpoints docs says 14 requests per hour for the old API - that seems way too low, wasn't it 100?"

**AI Challenge:** The AI should:
1. Search for all mentions of API rate limits
2. Identify which are referring to legacy vs. current API
3. Verify if "14 requests per hour" is correct or a typo
4. Update if wrong, or explain if intentionally different

---

## Broken Links (Type 6: Non-existent Pages)

### 6. Links to Pages That Don't Exist

#### Issue 6.1: Config Reference (doesn't exist)
- **File:** `docs/guide/getting-started.md`
- **Line:** 60
- **Current:** Link to `/guide/config-reference.md`
- **Issue:** This page doesn't exist
- **Should:** Either create it or link to `/guide/configuration.md` instead

#### Issue 6.2: CLI Documentation (wrong filename)
- **File:** `docs/api/README.md`
- **Line:** 51
- **Current:** Link to `/api/command-line.md`
- **Issue:** File is actually named `/api/cli.md`
- **Should:** Link to `/api/cli.md`

**Slack Message Example:** "Clicked on the 'Configuration Reference' link in Getting Started and got a 404"

**AI Challenge:** The AI should:
1. Detect broken links
2. Search for similar/correct page names
3. Decide whether to fix the link or create the missing page
4. Verify the fix doesn't break other pages

---

## Wrong Configuration Example (Type 7: Incorrect Code)

### 7. Incorrect Config Value

#### Issue 7.1: Missing leading slash in base path
- **File:** `docs/api/configuration-api.md`
- **Line:** 43
- **Current:**
```js
export default {
  base: 'my-repo/'
}
```
- **Issue:** Missing leading slash (contradicts the warning right below it)
- **Should be:**
```js
export default {
  base: '/my-repo/'
}
```

**Slack Message Example:** "The base configuration example in the API docs doesn't have a leading slash, but the warning says it must. Which is correct?"

**AI Challenge:** The AI must:
1. Parse code examples
2. Understand the warning context
3. Recognize the inconsistency
4. Fix the code to match the documented requirement

---

## Test Workflow Scenarios

### Scenario A: Simple Fix
**User Reports:** "Typo on Getting Started page - says 'tittle'"
**Expected AI Actions:**
1. Search for "tittle" in codebase
2. Find it at `docs/guide/getting-started.md:37`
3. Verify context (configuration section)
4. Change "tittle" → "title"
5. Create PR with title: "Fix typo: 'tittle' → 'title' in Getting Started"

### Scenario B: Multi-Location Fix
**User Reports:** "Installation docs say Node 14 but I thought we needed 16?"
**Expected AI Actions:**
1. Search for "Node" or "14" version references
2. Find multiple locations
3. Determine correct version (16.0.0+)
4. Update ALL instances in current requirement contexts
5. Leave legacy documentation unchanged
6. Create PR explaining all changes

### Scenario C: Component Fix with Blast Radius
**User Reports:** "The system requirements on the installation page are outdated"
**Expected AI Actions:**
1. Locate the requirements section
2. Discover it's a Vue component
3. Find all pages using the component
4. Update the component source
5. Test build to verify
6. Create PR noting: "Updates SystemRequirements component (affects 3 pages)"

### Scenario D: Context-Aware Decision
**User Reports:** "Why do some pages say Node 14 and others say Node 16?"
**Expected AI Actions:**
1. Search for all Node version references
2. Analyze context of each mention
3. Categorize: current requirements vs. legacy documentation
4. Update only current requirement sections
5. Create PR explaining why some were changed and others weren't

---

## Measuring AI Success

### Level 1: Basic (Simple Typos)
- ✓ Finds and fixes single-location typos
- ✓ Creates meaningful commit messages
- ✓ Doesn't break any links

### Level 2: Intermediate (Multi-Location)
- ✓ Finds all instances of duplicated information
- ✓ Updates consistently across files
- ✓ Verifies changes don't conflict

### Level 3: Advanced (Components)
- ✓ Identifies reusable components
- ✓ Understands blast radius of changes
- ✓ Updates source component vs. individual files
- ✓ Tests build after changes

### Level 4: Expert (Context-Aware)
- ✓ Reads surrounding context
- ✓ Makes intelligent decisions about what to change
- ✓ Leaves historically accurate information unchanged
- ✓ Explains reasoning in PR description

---

## Additional Test Cases

### Edge Cases to Consider

1. **False Positives:** "Node 14" in legacy docs should NOT trigger fixes
2. **Ambiguous Requests:** "Fix the API stuff" - AI should ask for clarification
3. **Conflicting Information:** If sources disagree, AI should ask which is correct
4. **Scope Creep:** User reports one issue, AI finds related issues - should it fix all or just the reported one?

---

## Summary of All Issues

| # | Type | Location | Issue | Complexity |
|---|------|----------|-------|------------|
| 1.1 | Typo | getting-started.md:37 | tittle → title | Simple |
| 1.2 | Typo | faq/README.md:29 | recomended → recommended | Simple |
| 1.3 | Typo | deployment.md:90 | availible → available | Simple |
| 1.4 | Broken Link | installation.md:66 | troubleshoting → troubleshooting | Simple |
| 2.1 | Outdated | installation.md:9 | Node 14 → 16 | Medium |
| 2.2 | Outdated | faq/README.md:27-28 | Node 14 & npm 6 → 16 & 7 | Medium |
| 3.1 | Component | SystemRequirements.vue | Node 14 & npm 6 → 16 & 7 | Complex |
| 4.1 | Context | installation.md | Node 14 (wrong context) | Complex |
| 4.2 | Context | legacy-support.md | Node 14 (correct context) | Complex |
| 5.1 | Inconsistent | endpoints.md:308 | "14 requests/hour" seems wrong | Complex |
| 6.1 | Broken Link | getting-started.md:60 | /guide/config-reference.md | Medium |
| 6.2 | Broken Link | api/README.md:51 | /command-line.md → /cli.md | Medium |
| 7.1 | Wrong Code | configuration-api.md:43 | Missing leading / in base | Medium |

**Total Issues:** 13
**Simple:** 4
**Medium:** 5
**Complex:** 4
