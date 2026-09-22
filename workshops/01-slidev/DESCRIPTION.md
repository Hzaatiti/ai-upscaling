# AI-Assisted Presentations with Slidev

## Description

Learn how to create interactive, web-based presentations with Slidev, a Markdown-powered presentation framework. In this hands-on workshop, you will use AI tools to plan and refine presentation content, learn the fundamentals of Slidev syntax, build an interactive scientific demonstration, write scripts that pull data and update slides automatically, collaborate and manage revisions with GitHub, and publish your presentation online as a shareable website. By the end of the session, you will have a practical workflow for creating, maintaining, exporting, and publishing polished presentations from plain-text source files.

## Prerequisites

- A laptop running Windows, macOS, or Linux.
- Node.js 18 or newer, pnpm 9 or newer, and Git. Follow the installation appendix below before the workshop.
- A [GitHub account](https://github.com/signup). Eligible participants can also apply for the optional [GitHub Education benefits](https://education.github.com/pack).
- Basic familiarity with Markdown or a command-line terminal is helpful, but no previous Slidev experience is required.

## Appendix: installation and workshop setup

Slidev is included as a dependency of the workshop repository, so you do not need to install it globally. Install Node.js, pnpm, and Git, then clone the repository and install its dependencies. Run all commands in a terminal unless noted otherwise.

### Windows

Open PowerShell and install the current Node.js LTS release and Git:

```powershell
winget install OpenJS.NodeJS.LTS
winget install --id Git.Git -e
```

Close PowerShell and open a fresh window so the new commands are available. Install pnpm and verify the required tools:

```powershell
npm install -g pnpm@9
node --version
pnpm --version
git --version
```

Node.js should report version 18 or newer. On Windows, pnpm uses symbolic links. If `pnpm install` reports an `EPERM` error, enable **Developer Mode** under **Settings > Privacy & security > For developers**, then open a fresh PowerShell window.

### macOS

Install [Homebrew](https://brew.sh/) first if it is not already available, then run:

```bash
brew install node git
npm install -g pnpm@9
node --version
pnpm --version
git --version
```

Node.js should report version 18 or newer.

### Linux (Debian or Ubuntu)

Install Node.js, npm, and Git, then install pnpm:

```bash
sudo apt update
sudo apt install -y nodejs npm git
npm install -g pnpm@9
node --version
pnpm --version
git --version
```

Node.js should report version 18 or newer. If your distribution provides an older version, install the current LTS release from [nodejs.org](https://nodejs.org/) and repeat the verification commands. On Fedora, Arch Linux, or another distribution, use the equivalent packages from your system package manager.

### Download and run the workshop

Run these commands on Windows, macOS, or Linux:

```bash
git clone https://github.com/Hzaatiti/ai-upscaling.git
cd ai-upscaling
pnpm install
pnpm dev:01
```

After the development server starts, open [http://localhost:3030/](http://localhost:3030/) in your browser. The presenter view, which includes speaker notes and a next-slide preview, is available at [http://localhost:3030/presenter](http://localhost:3030/presenter).

### Create a standalone Slidev deck

The workshop slides also demonstrate how to add Slidev to a separate project. In the folder that contains your `slides.md` file, run:

```bash
npm init -y
npm install -D "@slidev/cli@^0.49.0" @slidev/theme-default
npx slidev
```

This repository currently pins Slidev to version `^0.49.0` for compatibility with its local theme and Windows setup.
