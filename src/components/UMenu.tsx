import { UMenuItemData } from '../utils/umenu';
import UMenuItem from './UMenuItem';
import './UMenu.css';

interface P {
  items: UMenuItemData[];
  onCheck: (index: number) => void;
}

export default function UMenu(props: P) {
  return (
    <menu id="mainMenu">
      {props.items.map((item, i) => {
        return (
          <UMenuItem
            key={i}
            data={item}
            onClick={() => {
              props.onCheck(i);
            }}
          />
        );
      })}
    </menu>
  );
}
