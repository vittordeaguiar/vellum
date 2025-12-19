import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { useCanvasStore } from "~/store/canvas-store";
import { createLineObject, createRectangleObject, createCircleObject, createTextObject } from "~/lib/object-factory";
import type { Point, LineObject } from "~/types/canvas.types";

export function useDrawing(canvasRef: RefObject<HTMLCanvasElement>) {
  const currentTool = useCanvasStore((state) => state.currentTool);
  const currentProperties = useCanvasStore((state) => state.currentProperties);
  const { addObject, setTempObject, setIsDrawing } = useCanvasStore();

  const startPointRef = useRef<Point | null>(null);
  const [textModalOpen, setTextModalOpen] = useState(false);
  const [textPosition, setTextPosition] = useState<Point | null>(null);

  const getMousePos = useCallback(
    (e: MouseEvent): Point => {
      const rect = canvasRef.current!.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    [canvasRef]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (currentTool === "select" || currentTool === "eraser") return;

      if (currentTool === "text") {
        const pos = getMousePos(e);
        setTextPosition(pos);
        setTextModalOpen(true);
        return;
      }

      const pos = getMousePos(e);
      startPointRef.current = pos;
      setIsDrawing(true);

      if (currentTool === "pencil") {
        setTempObject(createLineObject([pos], currentProperties));
      }
    },
    [currentTool, currentProperties, getMousePos, setIsDrawing, setTempObject]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!startPointRef.current) return;
      if (currentTool === "select" || currentTool === "eraser") return;

      const pos = getMousePos(e);

      switch (currentTool) {
        case "pencil": {
          const tempObj = useCanvasStore.getState().tempObject as LineObject;
          if (tempObj) {
            setTempObject({
              ...tempObj,
              points: [...tempObj.points, pos],
            });
          }
          break;
        }
        case "rectangle": {
          const start = startPointRef.current;
          setTempObject(createRectangleObject(start, pos, currentProperties));
          break;
        }
        case "circle": {
          const start = startPointRef.current;
          const radius = Math.sqrt(Math.pow(pos.x - start.x, 2) + Math.pow(pos.y - start.y, 2));
          setTempObject(createCircleObject(start, radius, currentProperties));
          break;
        }
      }
    },
    [currentTool, currentProperties, getMousePos, setTempObject]
  );

  const handleMouseUp = useCallback(() => {
    if (!startPointRef.current) return;

    const tempObj = useCanvasStore.getState().tempObject;

    if (tempObj) {
      addObject(tempObj);
      setTempObject(null);
    }

    startPointRef.current = null;
    setIsDrawing(false);
  }, [addObject, setTempObject, setIsDrawing]);

  const handleTextSubmit = useCallback(
    (text: string) => {
      if (textPosition) {
        addObject(
          createTextObject(textPosition, text, currentProperties.fontSize, currentProperties)
        );
        setTextPosition(null);
      }
    },
    [textPosition, currentProperties, addObject]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, canvasRef]);

  return {
    textModalOpen,
    setTextModalOpen,
    handleTextSubmit,
  };
}
