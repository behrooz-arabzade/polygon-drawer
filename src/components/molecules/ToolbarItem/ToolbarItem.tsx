import React, { FC } from "react";
import styles from "./ToolbarItem.module.css";
import cs from "classnames";

interface IToolbarItem {
  name: string;
  onSelect: (name: string) => void;
  icon?: React.ReactNode;
  selected?: boolean;
}

const ToolbarItem: FC<IToolbarItem> = ({ name, onSelect, icon, selected }) => {
  return (
    <div
      className={cs(styles.root, selected && styles.selected)}
      onClick={() => onSelect(name)}
    >
      {icon ?? name}
    </div>
  );
};

export default React.memo(ToolbarItem);
