import { CanvasObject, Point2d } from "store/slices/canvasSlice/type";
import LinkedList from "types/LinkedList";
import { PolygonState } from "./type";

export default class Polygon implements CanvasObject {
  private points: LinkedList<Point2d>;
  private state: PolygonState;

  constructor(public id: string, startingPoint: Point2d) {
    this.points = new LinkedList<Point2d>();
    this.points.insertInBegin(startingPoint);
    this.state = "open";
  }

  public addPoint(point: Point2d): void {
    if (
      JSON.stringify(this.points.checkLast()?.data) === JSON.stringify(point)
    ) {
      // Can't select last point again
      return;
    }

    if (
      JSON.stringify(this.points.checkHead()?.data) !== JSON.stringify(point)
    ) {
      this.points.insertAtEnd(point);
      return;
    } else if (this.points.size() === 2) {
      // Can't finish polygon lower than 3 point
      return;
    } else {
      this.close();
    }
  }

  public deletePoint(point: Point2d): boolean {
    if (this.state === "close" && this.points.size() === 3) {
      return false;
    }

    const node = this.points.search(
      (p) => JSON.stringify(p) === JSON.stringify(point)
    );

    if (node !== null) {
      this.points.deleteNode(node);
    }

    return true;
  }

  public open(): void {
    if (this.state === "open") return;

    this.state = "open";
  }

  public close(): void {
    if (this.state === "close") return;

    this.state = "close";
  }
}