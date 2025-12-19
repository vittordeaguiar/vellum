import type { DrawObject } from "~/types/canvas.types";

export function exportCanvasToPNG(
  canvas: HTMLCanvasElement,
  filename: string = "vellum-whiteboard.png"
) {
  canvas.toBlob((blob) => {
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  }, "image/png");
}

export function exportCanvasToJSON(objects: DrawObject[]): string {
  return JSON.stringify(
    {
      version: "1.0.0",
      objects,
      exportedAt: Date.now(),
    },
    null,
    2
  );
}
