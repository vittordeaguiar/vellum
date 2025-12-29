# Vellum

Vellum is a modern, fast, and interactive whiteboard application built for the web. It leverages the power of React Router v7 and HTML5 Canvas to provide a seamless drawing experience.

## Features

*   **Diverse Drawing Tools**: Sketch freely with the **Pencil**, create structured diagrams with **Rectangle** and **Circle** shapes, or add annotations with the **Text** tool.
*   **Intuitive Editing**: Select, move, and manipulate objects on the canvas with the **Select** tool.
*   **Customizable Properties**: Adjust stroke colors, widths, opacity, and font sizes via the Properties Panel.
*   **Eraser Tool**: Easily remove unwanted elements.
*   **State Management**: Built with Zustand for performant state handling.
*   **Local Persistence**: Your work is automatically saved to your browser's local storage.
*   **Modern UI**: Styled with Tailwind CSS v4 and Glassmorphism design principles.

## Tech Stack

*   **Framework**: [React Router v7](https://reactrouter.com/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/)

## Getting Started

### Prerequisites

*   Node.js (v20 or later recommended)
*   npm (or yarn/pnpm/bun)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/vellum.git
    cd vellum
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## 🔧 Building for Production

To build the application for production deployment:

```bash
npm run build
```

To preview the production build locally:

```bash
npm start
```

## Project Structure

*   `app/components`: UI components organized by feature (Canvas, Toolbar, Properties, etc.).
*   `app/hooks`: Custom React hooks for canvas logic (`useDrawing`, `useSelection`, etc.).
*   `app/lib`: Core logic for rendering, hit detection, and object manipulation.
*   `app/store`: Global state management using Zustand.
*   `app/types`: TypeScript definitions for canvas objects and tools.
*   `app/routes`: Application routes (Home, Whiteboard).
