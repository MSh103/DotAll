# DotAll

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/JavaScript-ESNext-yellow?style=for-the-badge&logo=javascript" alt="JavaScript">
  <img src="https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/WebAssembly-WASM-654FF0?style=for-the-badge&logo=webassembly" alt="WebAssembly">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License">
</p>

> ⚠️ **Work in Progress**

DotAll is a privacy-focused, browser-based file conversion toolkit designed to convert, compress, and process files entirely on the user's device.

Unlike traditional online file converters, DotAll aims to eliminate the need for server-side file processing. Files are processed locally within the browser without being uploaded to external servers.

## Features

- Local file processing without server-side uploads
- Image format conversion (PNG, JPEG, BMP, GIF, WebP, etc.)
- Document conversion (PDF, DOCX, XLSX, PPTX, etc.)
- Archive creation and extraction (ZIP, TAR, etc.)
- Image compression and optimization
- Document compression
- Audio and video conversion
- Audio and video compression
- No account or registration required
- Privacy-focused architecture

Features are planned and will be implemented progressively.

## Technology Stack

DotAll currently uses or plans to use:

- **React** — User interface and application structure
- **JavaScript** — Application logic and conversion management
- **Vite** — Development environment and build tooling
- **WebAssembly** — Running native conversion engines inside the browser
- **Browser APIs** — File handling, image processing, and downloads

## Architecture

DotAll is designed around client-side processing.

The application uses JavaScript conversion managers to coordinate different conversion engines depending on the input and target formats.

Conversion engines operate locally within the browser using JavaScript libraries, browser APIs, and WebAssembly where appropriate.

No application backend is required for file conversion.

## Requirements

- Node.js (for development and building)
- npm
- Modern web browser with JavaScript and WebAssembly support

## Building

Clone the repository:

```bash
git clone https://github.com/MSh103/DotAll.git
cd DotAll
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the production application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Privacy

Privacy is a core design principle of DotAll.

The application is designed to process files locally within the browser rather than uploading them to a remote server.

Third-party conversion libraries and dependencies may be used to perform format-specific processing. Their licensing and security requirements will be respected.

## License

DotAll is licensed under the MIT License. See [LICENSE](LICENSE) for more information.

## About

DotAll is an open-source project focused on making file conversion and processing accessible, convenient, and private.