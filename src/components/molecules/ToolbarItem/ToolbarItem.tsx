import { FC } from "react";
import styles from "./ToolbarItem.module.css";
import cs from "classnames";

interface IToolbarItem {
  name: string;
  onClick: () => void;
  icon?: React.ReactNode;
  selected?: boolean;
}

const ToolbarItem: FC<IToolbarItem> = ({ name, onClick, icon, selected }) => {
  return (
    <div
      className={cs(styles.root, selected && styles.selected)}
      onClick={onClick}
    >
      {icon ?? name}
    </div>
  );
};

export default ToolbarItem;
