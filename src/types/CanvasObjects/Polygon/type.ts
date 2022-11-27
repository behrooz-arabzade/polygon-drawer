import { Point2d } from "store/slices/canvasSlice/type";
import LinkedList from "types/LinkedList";

export type PolygonState = "open" | "close";

export interface IPolygon {
    points: LinkedList<Point2d>;
    state: PolygonState;
    updatePoint(index: number, newPoint: Point2d): void;
    addPoint(point: Point2d): void;
    deletePoint(point: Point2d): boolean;
    open(): void;
    close(): void;
    getSerializablePolygon(): SerializablePolygon;
}

export interface SerializablePolygon {
    id: string;
    points: Point2d[];
    state: PolygonState;
}