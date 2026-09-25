import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

function getBasePath(): string {
  // If explicitly overridden via environment variable
  if (process.env.VITE_BASE_PATH) {
    return process.env.VITE_BASE_PATH;
  }
  // In GitHub Actions environment:
  // GITHUB_REPOSITORY format: "owner/repo"
  // e.g. "irslabdgist/irslabdgist.github.io" -> "/"
  // e.g. "user/lab-homepage" -> "/lab-homepage/"
  if (process.env.GITHUB_REPOSITORY) {
    const parts = process.env.GITHUB_REPOSITORY.split('/');
    if (parts.length === 2) {
      const [owner, repo] = parts;
      if (repo.toLowerCase() === `${owner.toLowerCase()}.github.io`) {
        return '/';
      }
      return `/${repo}/`;
    }
  }
  return '/';
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
});
