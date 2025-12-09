<template>
  <div class="install-command">
    <div class="tabs">
      <button
        v-for="pm in packageManagers"
        :key="pm"
        :class="['tab', { active: selectedPm === pm }]"
        @click="selectedPm = pm"
      >
        {{ pm }}
      </button>
    </div>
    <div class="command-box">
      <code>{{ commands[selectedPm] }}</code>
      <button class="copy-btn" @click="copyCommand" :class="{ copied }">
        {{ copied ? '✓ Copied' : 'Copy' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    package: {
      type: String,
      default: 'vuepress@next'
    },
    dev: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectedPm: 'npm',
      packageManagers: ['npm', 'yarn', 'pnpm'],
      copied: false
    }
  },
  computed: {
    commands() {
      const flag = this.dev ? '-D' : ''
      return {
        npm: `npm install ${flag} ${this.package}`,
        yarn: `yarn add ${flag} ${this.package}`,
        pnpm: `pnpm add ${flag} ${this.package}`
      }
    }
  },
  methods: {
    async copyCommand() {
      try {
        await navigator.clipboard.writeText(this.commands[this.selectedPm])
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }
}
</script>

<style scoped>
.install-command {
  margin: 1.5rem 0;
  border: 1px solid var(--c-border);
  border-radius: 6px;
  overflow: hidden;
}

.tabs {
  display: flex;
  background-color: var(--c-bg);
  border-bottom: 1px solid var(--c-border);
}

.tab {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 500;
  color: var(--c-text-lighter);
  transition: all 0.3s;
}

.tab:hover {
  color: var(--c-text);
  background-color: var(--c-bg-light);
}

.tab.active {
  color: var(--c-brand);
  border-bottom: 2px solid var(--c-brand);
}

.command-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: var(--c-bg-light);
}

.command-box code {
  flex: 1;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.95rem;
}

.copy-btn {
  padding: 0.4rem 0.8rem;
  margin-left: 1rem;
  border: 1px solid var(--c-border);
  border-radius: 4px;
  background-color: var(--c-bg);
  color: var(--c-text);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s;
}

.copy-btn:hover {
  background-color: var(--c-brand);
  color: white;
  border-color: var(--c-brand);
}

.copy-btn.copied {
  background-color: #42b983;
  color: white;
  border-color: #42b983;
}
</style>
