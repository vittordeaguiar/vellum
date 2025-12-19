export type ToolType = "select" | "pencil" | "rectangle" | "circle" | "text" | "eraser";

export interface Point {
  x: number;
  y: number;
}

export interface DrawingProperties {
  color: string;
  strokeWidth: number;
  opacity: number;
  fontSize: number;
}

export type DrawObjectType = "line" | "rectangle" | "circle" | "text";

export interface BaseDrawObject {
  id: string;
  type: DrawObjectType;
  properties: DrawingProperties;
  createdAt: number;
}

export interface LineObject extends BaseDrawObject {
  type: "line";
  points: Point[];
}

export interface RectangleObject extends BaseDrawObject {
  type: "rectangle";
  start: Point;
  end: Point;
}

export interface CircleObject extends BaseDrawObject {
  type: "circle";
  center: Point;
  radius: number;
}

export interface TextObject extends BaseDrawObject {
  type: "text";
  position: Point;
  text: string;
  fontSize: number;
}

export type DrawObject = LineObject | RectangleObject | CircleObject | TextObject;

export interface CanvasState {
  objects: DrawObject[];
  selectedObjectId: string | null;
  currentTool: ToolType;
  currentProperties: DrawingProperties;
  isDrawing: boolean;
  tempObject: DrawObject | null;
}

export interface MouseState {
  isDown: boolean;
  startPoint: Point | null;
  currentPoint: Point | null;
}

export interface StorageData {
  objects: DrawObject[];
  version: string;
  lastModified: number;
}
