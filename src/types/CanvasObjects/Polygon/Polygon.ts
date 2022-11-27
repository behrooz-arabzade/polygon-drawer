import { Point2d } from "store/slices/canvasesSlice/type";
import LinkedList from "types/LinkedList";
import { PolygonState, SerializablePolygon } from './type';

export default class Polygon {
  public points: LinkedList<Point2d>;
  public state: PolygonState;

  constructor(public id: string, initialPoints: Point2d[], initialState: PolygonState = "open") {
    this.points = new LinkedList<Point2d>();
    initialPoints.forEach(point => {
      this.points.insertAtEnd(point);
    });
    this.state = initialState;
  }

  public updatePoint(index: number, newPoint: Point2d): void {
    let node = this.points.checkAtIndex(index);

    if (!node) return;

    node.data = newPoint;
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

  public getSerializablePolygon(): SerializablePolygon {
    return {
      id: this.id,
      points: this.points.traverse(),
      state: this.state
    }
  }
}
