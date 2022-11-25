import ToolbarItem from "components/molecules/ToolbarItem/ToolbarItem";
import { FC } from "react";
import { AppDispatch, RootState } from "store/store";
import { Tool } from "types/Tool";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Toolbar.module.css";
import { toolSelected } from "store/slices/toolbarSlice/toolbarSlice";

const tools: Tool[] = [
  {
    name: "select",
    icon: "sel",
  },
  {
    name: "hand",
    icon: "hand",
  },
  {
    name: "polygon",
    icon: "pol",
  },
];

const Toolbar: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const selectedTool = useSelector(
    (state: RootState) => state.toolbar.selectedTool
  );

  const handlToolSelected = (tool: Tool) => {
    dispatch(toolSelected(tool.name));
  };

  return (
    <div className={styles.root}>
      {tools.map((tool) => {
        return (
          <ToolbarItem
            selected={tool.name === selectedTool}
            name={tool.name}
            icon={tool.icon}
            onClick={() => handlToolSelected(tool)}
          />
        );
      })}
    </div>
  );
};

export default Toolbar;
