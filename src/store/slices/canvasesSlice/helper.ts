import { CanvasData, TabsState, CanvasTab } from './type';

export const getInitialCanvasData = (): CanvasData => {
    return {
        canvasObjects: [],
        size: {
            height: 500,
            width: 500,
        },
        zoom: 1,
        currentDrawingObjectId: null
    }
}

export const getCurrentTab = (state: TabsState): CanvasTab => {
    return state.tabs[state.selectedTabId];
}

export const getNewTabName = (state?: TabsState): string => {
    let name = "New Canvas";
    return name;
}