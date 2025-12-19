import type {
  DrawObject,
  LineObject,
  RectangleObject,
  CircleObject,
  TextObject,
  Point,
  DrawingProperties,
} from "~/types/canvas.types";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function createLineObject(points: Point[], properties: DrawingProperties): LineObject {
  return {
    id: generateId(),
    type: "line",
    points,
    properties,
    createdAt: Date.now(),
  };
}

export function createRectangleObject(
  start: Point,
  end: Point,
  properties: DrawingProperties
): RectangleObject {
  return {
    id: generateId(),
    type: "rectangle",
    start,
    end,
    properties,
    createdAt: Date.now(),
  };
}

export function createCircleObject(
  center: Point,
  radius: number,
  properties: DrawingProperties
): CircleObject {
  return {
    id: generateId(),
    type: "circle",
    center,
    radius,
    properties,
    createdAt: Date.now(),
  };
}

export function createTextObject(
  position: Point,
  text: string,
  fontSize: number,
  properties: DrawingProperties
): TextObject {
  return {
    id: generateId(),
    type: "text",
    position,
    text,
    fontSize,
    properties,
    createdAt: Date.now(),
  };
}

export function moveObject(obj: DrawObject, dx: number, dy: number): DrawObject {
  switch (obj.type) {
    case "line":
      return {
        ...obj,
        points: obj.points.map((p) => ({
          x: p.x + dx,
          y: p.y + dy,
        })),
      };
    case "rectangle":
      return {
        ...obj,
        start: { x: obj.start.x + dx, y: obj.start.y + dy },
        end: { x: obj.end.x + dx, y: obj.end.y + dy },
      };
    case "circle":
      return {
        ...obj,
        center: { x: obj.center.x + dx, y: obj.center.y + dy },
      };
    case "text":
      return {
        ...obj,
        position: { x: obj.position.x + dx, y: obj.position.y + dy },
      };
  }
}
