import { useEffect } from "react";
import { useCanvasStore } from "~/store/canvas-store";

export function useKeyboard() {
  const selectedObjectId = useCanvasStore((state) => state.selectedObjectId);
  const { setCurrentTool, deleteObject, selectObject } = useCanvasStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();

      switch (key) {
        case "v":
          setCurrentTool("select");
          break;
        case "p":
          setCurrentTool("pencil");
          break;
        case "r":
          setCurrentTool("rectangle");
          break;
        case "c":
          setCurrentTool("circle");
          break;
        case "t":
          setCurrentTool("text");
          break;
        case "e":
          setCurrentTool("eraser");
          break;
        case "delete":
        case "backspace":
          if (selectedObjectId) {
            e.preventDefault();
            deleteObject(selectedObjectId);
          }
          break;
        case "escape":
          selectObject(null);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedObjectId, setCurrentTool, deleteObject, selectObject]);
}
