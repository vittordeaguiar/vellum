import { useCallback, useEffect, useRef, type RefObject } from 'react';
import { useCanvasStore } from '~/store/canvas-store';
import { findObjectAtPoint } from '~/lib/hit-detection';
import { moveObject } from '~/lib/object-factory';
import type { Point } from '~/types/canvas.types';

export function useSelection(canvasRef: RefObject<HTMLCanvasElement>) {
  const currentTool = useCanvasStore((state) => state.currentTool);
  const objects = useCanvasStore((state) => state.objects);
  const selectedObjectId = useCanvasStore((state) => state.selectedObjectId);
  const { selectObject, updateObject, deleteObject } = useCanvasStore();

  const dragStateRef = useRef<{
    isDragging: boolean;
    startPoint: Point | null;
    initialObjectState: any;
  }>({
    isDragging: false,
    startPoint: null,
    initialObjectState: null,
  });

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
      const pos = getMousePos(e);

      if (currentTool === 'select') {
        const clickedObject = findObjectAtPoint(pos, objects);

        if (clickedObject) {
          selectObject(clickedObject.id);
          dragStateRef.current = {
            isDragging: true,
            startPoint: pos,
            initialObjectState: clickedObject,
          };
        } else {
          selectObject(null);
        }
      } else if (currentTool === 'eraser') {
        const clickedObject = findObjectAtPoint(pos, objects);
        if (clickedObject) {
          deleteObject(clickedObject.id);
        }
      }
    },
    [currentTool, objects, getMousePos, selectObject, deleteObject]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (
        !dragStateRef.current.isDragging ||
        !selectedObjectId ||
        currentTool !== 'select'
      ) {
        return;
      }

      const currentPos = getMousePos(e);
      const dx = currentPos.x - dragStateRef.current.startPoint!.x;
      const dy = currentPos.y - dragStateRef.current.startPoint!.y;

      const selectedObject = objects.find((obj) => obj.id === selectedObjectId);
      if (!selectedObject) return;

      const movedObject = moveObject(
        dragStateRef.current.initialObjectState,
        dx,
        dy
      );
      updateObject(selectedObjectId, movedObject);
    },
    [currentTool, selectedObjectId, objects, getMousePos, updateObject]
  );

  const handleMouseUp = useCallback(() => {
    if (dragStateRef.current.isDragging && selectedObjectId) {
      dragStateRef.current.initialObjectState = objects.find(
        (obj) => obj.id === selectedObjectId
      );
    }
    dragStateRef.current.isDragging = false;
  }, [selectedObjectId, objects]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, canvasRef]);
}
