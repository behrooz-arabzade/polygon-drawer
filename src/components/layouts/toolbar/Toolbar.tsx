import ToolbarItem from "components/molecules/ToolbarItem/ToolbarItem";
import React, { FC, useCallback } from "react";
import { RootState } from "store/store";
import { Tool } from "types/Tool";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Toolbar.module.css";
import { toolSelected } from "store/slices/toolbarSlice/toolbarSlice";

const tools: Tool[] = [
  // {
  //   name: "select",
  //   icon: "sel",
  // },
  // {
  //   name: "hand",
  //   icon: "hand",
  // },
  {
    name: "polygon",
    icon: "pol",
  },
];

const Toolbar: FC = () => {
  //...... redux states ......//
  const selectedTool = useSelector(
    (state: RootState) => state.toolbar.selectedTool
  );
  //...... redux states ......//

  //...... constants ......//
  const dispatch = useDispatch();
  //...... constants ......//

  //...... handlers ......//
  const handleToolSelected = useCallback((name: string) => {
    dispatch(toolSelected(name));
  }, []);
  //...... handlers ......//

  return (
    <div className={styles.root}>
      {tools.map((tool) => {
        return (
          <ToolbarItem
            key={tool.name}
            selected={tool.name === selectedTool}
            name={tool.name}
            icon={tool.icon}
            onSelect={handleToolSelected}
          />
        );
      })}
    </div>
  );
};

export default React.memo(Toolbar);
