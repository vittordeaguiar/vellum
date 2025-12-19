import { create } from "zustand";
import type { DrawObject, ToolType, DrawingProperties } from "~/types/canvas.types";

interface CanvasStore {
  objects: DrawObject[];
  selectedObjectId: string | null;
  currentTool: ToolType;
  currentProperties: DrawingProperties;
  isDrawing: boolean;
  tempObject: DrawObject | null;

  addObject: (object: DrawObject) => void;
  updateObject: (id: string, updates: Partial<DrawObject>) => void;
  deleteObject: (id: string) => void;
  clearAll: () => void;
  setCurrentTool: (tool: ToolType) => void;
  setCurrentProperties: (props: Partial<DrawingProperties>) => void;
  selectObject: (id: string | null) => void;
  setIsDrawing: (isDrawing: boolean) => void;
  setTempObject: (object: DrawObject | null) => void;
  setObjects: (objects: DrawObject[]) => void;
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  objects: [],
  selectedObjectId: null,
  currentTool: "select",
  currentProperties: {
    color: "#1E293B",
    strokeWidth: 3,
    opacity: 100,
    fontSize: 16,
  },
  isDrawing: false,
  tempObject: null,

  addObject: (object) =>
    set((state) => ({
      objects: [...state.objects, object],
    })),

  updateObject: (id, updates) =>
    set((state) => ({
      objects: state.objects.map((obj) =>
        obj.id === id ? ({ ...obj, ...updates } as DrawObject) : obj
      ),
    })),

  deleteObject: (id) =>
    set((state) => ({
      objects: state.objects.filter((obj) => obj.id !== id),
      selectedObjectId: state.selectedObjectId === id ? null : state.selectedObjectId,
    })),

  clearAll: () =>
    set({
      objects: [],
      selectedObjectId: null,
      tempObject: null,
    }),

  setCurrentTool: (tool) =>
    set({
      currentTool: tool,
      selectedObjectId: null,
    }),

  setCurrentProperties: (props) =>
    set((state) => ({
      currentProperties: { ...state.currentProperties, ...props },
    })),

  selectObject: (id) =>
    set({
      selectedObjectId: id,
    }),

  setIsDrawing: (isDrawing) =>
    set({
      isDrawing,
    }),

  setTempObject: (object) =>
    set({
      tempObject: object,
    }),

  setObjects: (objects) =>
    set({
      objects,
    }),
}));
