<template>
  <div class="api-endpoint">
    <div class="endpoint-header">
      <span class="method" :class="method.toLowerCase()">{{ method }}</span>
      <code class="path">{{ path }}</code>
    </div>
    <p v-if="description" class="description">{{ description }}</p>
    <div v-if="$slots.default" class="endpoint-details">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    method: {
      type: String,
      required: true,
      validator: (value) => ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(value)
    },
    path: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.api-endpoint {
  margin: 1.5rem 0;
  padding: 1rem;
  border: 1px solid var(--c-border);
  border-radius: 6px;
  background-color: var(--c-bg-light);
}

.endpoint-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.method {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-weight: 600;
  font-size: 0.85rem;
  border-radius: 4px;
  text-transform: uppercase;
}

.method.get {
  background-color: #61affe;
  color: white;
}

.method.post {
  background-color: #49cc90;
  color: white;
}

.method.put {
  background-color: #fca130;
  color: white;
}

.method.delete {
  background-color: #f93e3e;
  color: white;
}

.path {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  background-color: var(--c-bg);
  border-radius: 4px;
}

.description {
  margin: 0.5rem 0;
  color: var(--c-text);
}

.endpoint-details {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--c-border);
}
</style>
