import type {
  DrawObject,
  LineObject,
  RectangleObject,
  CircleObject,
  TextObject,
  Point,
} from '~/types/canvas.types';

export function isPointInObject(point: Point, object: DrawObject): boolean {
  switch (object.type) {
    case 'line':
      return isPointNearLine(point, object);
    case 'rectangle':
      return isPointInRectangle(point, object);
    case 'circle':
      return isPointInCircle(point, object);
    case 'text':
      return isPointInText(point, object);
    default:
      return false;
  }
}

function isPointNearLine(point: Point, line: LineObject): boolean {
  const threshold = line.properties.strokeWidth + 5;

  for (let i = 0; i < line.points.length - 1; i++) {
    const p1 = line.points[i];
    const p2 = line.points[i + 1];

    const distance = distanceToLineSegment(point, p1, p2);
    if (distance <= threshold) return true;
  }

  return false;
}

function distanceToLineSegment(p: Point, a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lengthSquared = dx * dx + dy * dy;

  if (lengthSquared === 0) {
    return Math.sqrt((p.x - a.x) ** 2 + (p.y - a.y) ** 2);
  }

  let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / lengthSquared;
  t = Math.max(0, Math.min(1, t));

  const projX = a.x + t * dx;
  const projY = a.y + t * dy;

  return Math.sqrt((p.x - projX) ** 2 + (p.y - projY) ** 2);
}

function isPointInRectangle(point: Point, rect: RectangleObject): boolean {
  const minX = Math.min(rect.start.x, rect.end.x);
  const maxX = Math.max(rect.start.x, rect.end.x);
  const minY = Math.min(rect.start.y, rect.end.y);
  const maxY = Math.max(rect.start.y, rect.end.y);

  const threshold = rect.properties.strokeWidth + 5;

  return (
    point.x >= minX - threshold &&
    point.x <= maxX + threshold &&
    point.y >= minY - threshold &&
    point.y <= maxY + threshold
  );
}

function isPointInCircle(point: Point, circle: CircleObject): boolean {
  const distance = Math.sqrt(
    (point.x - circle.center.x) ** 2 + (point.y - circle.center.y) ** 2
  );

  const threshold = circle.properties.strokeWidth + 5;

  return Math.abs(distance - circle.radius) <= threshold;
}

function isPointInText(point: Point, text: TextObject): boolean {
  const width = text.text.length * text.fontSize * 0.6;
  const height = text.fontSize;

  return (
    point.x >= text.position.x &&
    point.x <= text.position.x + width &&
    point.y >= text.position.y - height &&
    point.y <= text.position.y
  );
}

export function findObjectAtPoint(
  point: Point,
  objects: DrawObject[]
): DrawObject | null {
  for (let i = objects.length - 1; i >= 0; i--) {
    if (isPointInObject(point, objects[i])) {
      return objects[i];
    }
  }

  return null;
}
