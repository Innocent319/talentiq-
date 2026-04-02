# TalentIQ - Automated Version Control Flow

This project is configured with an automated version control and deployment workflow.

## Development Workflow

### 1. Feature Branching
Always create a new branch for your changes:
```bash
git checkout -b feat/my-new-feature
```

### 2. Conventional Commits
We use the [Conventional Commits](https://www.conventionalcommits.org/) standard for commit messages. This allows us to automate changelogs and versioning.

Format: `<type>(optional scope): <description>`

Common types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

Example: `feat: add user authentication`

### 3. Pre-commit Hooks
When you run `git commit`, `husky` and `lint-staged` will automatically run ESLint on your changed files. If there are linting errors, the commit will be blocked until they are fixed.

### 4. Continuous Integration (CI)
When you push your branch to GitHub and open a Pull Request, GitHub Actions will automatically:
- Install dependencies
- Run linting (`npm run lint`)
- Run build (`npm run build`)

Your PR should only be merged if these checks pass.

> **Note**: There are currently pre-existing linting errors in the codebase. These will be highlighted by the automated CI checks. It is recommended to address these as part of your development to ensure a clean, error-free codebase.

### 5. Automated Release and Versioning
When you are ready to create a new version:
1. Merge your changes into the `main` branch.
2. From the `main` branch, run:
   ```bash
   npm run release
   ```
   This will:
   - Bump the version in `package.json` based on your commit messages.
   - Generate/update `CHANGELOG.md`.
   - Create a new git tag.
3. Push the new commit and tag:
   ```bash
   git push --follow-tags origin main
   ```

### 6. Continuous Deployment (CD)
Every push to the `main` branch (including releases) triggers a GitHub Action that builds the project and deploys it to **GitHub Pages**.

- **Deployment URL**: `https://Innocent319.github.io/talentiq-/`

---

## Getting Started Locally

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
