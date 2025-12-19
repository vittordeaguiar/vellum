import type {
  DrawObject,
  LineObject,
  RectangleObject,
  CircleObject,
  TextObject,
} from "~/types/canvas.types";

export class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Could not get 2D context");
    }
    this.ctx = context;
    this.setupCanvas();
  }

  private setupCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
  }

  render(objects: DrawObject[], tempObject: DrawObject | null, selectedId: string | null) {
    const rect = this.canvas.getBoundingClientRect();
    this.ctx.clearRect(0, 0, rect.width, rect.height);

    objects.forEach((obj) => {
      this.drawObject(obj, obj.id === selectedId);
    });

    if (tempObject) {
      this.drawObject(tempObject, false);
    }
  }

  private drawObject(obj: DrawObject, isSelected: boolean) {
    const { color, strokeWidth, opacity } = obj.properties;

    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.lineWidth = strokeWidth;
    this.ctx.globalAlpha = opacity / 100;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    switch (obj.type) {
      case "line":
        this.drawLine(obj);
        break;
      case "rectangle":
        this.drawRectangle(obj);
        break;
      case "circle":
        this.drawCircle(obj);
        break;
      case "text":
        this.drawText(obj);
        break;
    }

    if (isSelected) {
      this.drawSelectionHandles(obj);
    }

    this.ctx.globalAlpha = 1;
  }

  private drawLine(obj: LineObject) {
    if (obj.points.length < 2) return;

    this.ctx.beginPath();
    this.ctx.moveTo(obj.points[0].x, obj.points[0].y);

    for (let i = 1; i < obj.points.length; i++) {
      this.ctx.lineTo(obj.points[i].x, obj.points[i].y);
    }

    this.ctx.stroke();
  }

  private drawRectangle(obj: RectangleObject) {
    const width = obj.end.x - obj.start.x;
    const height = obj.end.y - obj.start.y;

    this.ctx.strokeRect(obj.start.x, obj.start.y, width, height);
  }

  private drawCircle(obj: CircleObject) {
    this.ctx.beginPath();
    this.ctx.arc(obj.center.x, obj.center.y, obj.radius, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  private drawText(obj: TextObject) {
    this.ctx.font = `${obj.fontSize}px Inter, sans-serif`;
    this.ctx.fillText(obj.text, obj.position.x, obj.position.y);
  }

  private drawSelectionHandles(obj: DrawObject) {
    const originalAlpha = this.ctx.globalAlpha;
    this.ctx.globalAlpha = 1;

    this.ctx.strokeStyle = "#6366F1";
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([5, 5]);

    const bounds = this.getBounds(obj);
    this.ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);

    this.ctx.setLineDash([]);
    this.ctx.globalAlpha = originalAlpha;
  }

  private getBounds(obj: DrawObject): {
    x: number;
    y: number;
    width: number;
    height: number;
  } {
    switch (obj.type) {
      case "line": {
        const xs = obj.points.map((p) => p.x);
        const ys = obj.points.map((p) => p.y);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        return {
          x: minX - 5,
          y: minY - 5,
          width: maxX - minX + 10,
          height: maxY - minY + 10,
        };
      }
      case "rectangle": {
        const minX = Math.min(obj.start.x, obj.end.x);
        const maxX = Math.max(obj.start.x, obj.end.x);
        const minY = Math.min(obj.start.y, obj.end.y);
        const maxY = Math.max(obj.start.y, obj.end.y);
        return {
          x: minX - 5,
          y: minY - 5,
          width: maxX - minX + 10,
          height: maxY - minY + 10,
        };
      }
      case "circle":
        return {
          x: obj.center.x - obj.radius - 5,
          y: obj.center.y - obj.radius - 5,
          width: obj.radius * 2 + 10,
          height: obj.radius * 2 + 10,
        };
      case "text": {
        const width = obj.text.length * obj.fontSize * 0.6;
        const height = obj.fontSize;
        return {
          x: obj.position.x - 5,
          y: obj.position.y - height - 5,
          width: width + 10,
          height: height + 10,
        };
      }
    }
  }

  resize() {
    this.setupCanvas();
  }

  destroy() {
    // TODO: Cleanup if needed
  }
}
