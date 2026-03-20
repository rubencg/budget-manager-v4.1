# Deployment Configuration Explanation: budgetmanager-web

This document explains the staged changes in the `budgetmanager-web` directory and their role in the Docker-based deployment of the Proxmox Budget Manager.

## 1. File Breakdown

### A. Dockerfile (Multi-Stage Build)
The `Dockerfile` is responsible for transforming the React source code into a production-ready container image.

*   **Stage 1: Build**
    *   Uses `node:18-alpine` as a base.
    *   Uses `npm ci` for a clean, deterministic dependency installation.
    *   **Crucial Step:** It defines `ARG` (Build Arguments) which are passed from `docker-compose.yml`. These are then turned into `ENV` variables so that the Vite build process (`npm run build`) can embed the correct API URLs and Auth0 credentials into the Javascript bundles.
*   **Stage 2: Serve**
    *   Uses `nginx:alpine` for an extremely small footprint.
    *   Copies the custom `nginx.conf` into the container.
    *   Copies only the `/dist` folder from Stage 1, ensuring the production image does not contain source code or development tools.

### B. nginx.conf (Web Server Configuration)
This file configures how Nginx handles incoming traffic on port 80 inside the container.

*   **SPA Support:** The configuration `try_files $uri $uri/ /index.html;` ensures that client-side routing (React Router) works. Without this, refreshing any page other than the home page would result in a 404 error.
*   **Security Headers:** Includes headers like `X-Frame-Options` and `X-Content-Type-Options` to improve the security profile of the frontend.
*   **Performance:** Enables Gzip compression for text, CSS, and JS files, significantly reducing initial load times.
*   **Caching Strategy:** Static assets (JS/CSS) are cached for 1 year, while `index.html` is never cached to ensure users always receive the latest bridge to the application logic.

### C. .dockerignore
Acts as a filter for the `COPY . .` command in the Dockerfile.

*   Excludes `node_modules` and `dist` to ensure the container build is clean and doesn't rely on local artifacts.
*   Excludes `.git` and `.env` files for security and to keep the build context small and fast.

## 2. Integration with docker-compose.yml

The root `docker-compose.yml` file is the orchestrator that brings the frontend and backend together. The staged changes are the "implementation details" that the orchestrator relies on.

| docker-compose.yml property | Related File / Logic |
| :--- | :--- |
| `context: ./budgetmanager-web` | The directory where these 3 files are located. |
| `dockerfile: Dockerfile` | Points directly to the staged `Dockerfile`. |
| `args:` | These variables are picked up by the `ARG` lines in the `Dockerfile`. |
| `ports: "3000:80"` | Maps your host's port 3000 to the Nginx port 80 defined in `nginx.conf`. |

## 3. Conclusion

These changes are **essential** for a successful deployment. They ensure that:
1.  The frontend knows which API to talk to (via build args).
2.  The frontend handles page refreshes correctly (via Nginx config).
3.  the build process is fast and the resulting image is secure and lightweight.
