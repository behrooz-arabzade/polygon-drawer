import React, { FC } from "react";
import styles from "./Tab.module.css";
import MuiTab from '@mui/material/Tab';
import cs from 'classnames';

interface ITab {
  name: string,
  id: string;
  selected?: boolean,
  value?: any,
  onClick: (tabId: string) => void
}

const Tab: FC<ITab> = ({ name, id, selected, value, onClick }) => {
  //...... handlers ......//
  const closeTab = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO handle closing tab
  }
  //...... handlers ......//

  return (
    <MuiTab
      onClick={() => onClick(id)}
      value={value}
      label={
        <div className={styles.labelRoot}>
          <p className={styles.name}>{name}</p>
          {/* <p className={styles.close} onClick={closeTab}>C</p> */}
        </div>
      }
      className={cs(styles.root, selected && styles.selected)}
    />
  );
};

export default React.memo(Tab);
