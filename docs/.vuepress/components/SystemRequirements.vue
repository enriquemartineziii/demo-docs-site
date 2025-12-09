<template>
  <div class="system-requirements">
    <h3>📋 System Requirements</h3>
    <table>
      <thead>
        <tr>
          <th>Component</th>
          <th>Minimum Version</th>
          <th>Recommended</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Node.js</td>
          <td>14.0.0</td>
          <td>v16.x</td>
        </tr>
        <tr>
          <td>npm</td>
          <td>6.0.0</td>
          <td>8.x</td>
        </tr>
        <tr>
          <td>RAM</td>
          <td>2GB</td>
          <td>4GB</td>
        </tr>
        <tr>
          <td>Disk Space</td>
          <td>500MB</td>
          <td>1GB</td>
        </tr>
      </tbody>
    </table>
    <p class="note">
      <strong>Note:</strong> Make sure you have the minimum versions installed before proceeding.
    </p>
  </div>
</template>

<style scoped>
.system-requirements {
  margin: 1.5rem 0;
  padding: 1rem;
  border: 1px solid var(--c-border);
  border-radius: 6px;
  background-color: var(--c-bg-light);
}

.system-requirements h3 {
  margin-top: 0;
  color: var(--c-brand);
}

.system-requirements table {
  width: 100%;
  margin: 1rem 0;
  border-collapse: collapse;
}

.system-requirements th,
.system-requirements td {
  padding: 0.5rem;
  text-align: left;
  border-bottom: 1px solid var(--c-border);
}

.system-requirements th {
  font-weight: 600;
  background-color: var(--c-bg);
}

.note {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--c-text-lighter);
}
</style>
