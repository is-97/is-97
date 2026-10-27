<template>
  <footer class="site-footer">
    <div class="footer-inner page-shell">
      <div class="footer-brand">
        <img class="footer-mark" src="/brand-x-light.svg" alt="" width="40" height="40" />
        <div>
          <strong>{{ profile.name }}</strong>
          <p>{{ profile.title }} · Shanghai</p>
        </div>
      </div>

      <div class="footer-contact">
        <a :href="`mailto:${profile.email}`">Email</a>
        <a :href="profile.github" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a :href="profile.website" target="_blank" rel="noopener noreferrer">Website</a>
      </div>

      <div class="footer-meta">
        <span>© {{ currentYear }} SZX</span>
        <span>Designed for clarity</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { profile } from '../data/profile'

const currentYear = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  margin-top: 7rem;
  border-top: 1px solid var(--color-line);
}

.footer-inner {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 0.8fr;
  gap: 2rem;
  padding-top: 2.25rem;
  padding-bottom: 2.25rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.footer-mark {
  flex: 0 0 auto;
  width: 40px;
  height: 40px;
}

.footer-brand strong {
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.footer-brand p,
.footer-meta {
  margin: 0;
  color: var(--color-ink-faint);
  font-size: 0.72rem;
}

.footer-contact {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.footer-contact a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  color: var(--color-ink-soft);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.05em;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-contact a:hover {
  color: var(--color-accent);
}

.footer-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-end;
  justify-content: center;
  text-align: right;
}

@media (max-width: 768px) {
  .site-footer {
    margin-top: 4.5rem;
  }

  .footer-inner {
    grid-template-columns: 1fr;
    gap: 1.4rem;
    padding-top: 1.75rem;
    padding-bottom: calc(1.75rem + env(safe-area-inset-bottom, 0px));
  }

  .footer-contact {
    flex-wrap: wrap;
  }

  .footer-meta {
    align-items: flex-start;
    text-align: left;
  }
}
</style>
