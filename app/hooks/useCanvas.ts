import { useEffect, useRef } from "react";
import { CanvasRenderer } from "~/lib/canvas-renderer";
import { useCanvasStore } from "~/store/canvas-store";

export function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<CanvasRenderer | null>(null);

  const objects = useCanvasStore((state) => state.objects);
  const tempObject = useCanvasStore((state) => state.tempObject);
  const selectedObjectId = useCanvasStore((state) => state.selectedObjectId);

  useEffect(() => {
    if (!canvasRef.current) return;

    rendererRef.current = new CanvasRenderer(canvasRef.current);

    const handleResize = () => {
      rendererRef.current?.resize();
      rendererRef.current?.render(objects, tempObject, selectedObjectId);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      rendererRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.render(objects, tempObject, selectedObjectId);
    }
  }, [objects, tempObject, selectedObjectId]);

  return canvasRef;
}
