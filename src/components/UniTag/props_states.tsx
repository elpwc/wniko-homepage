export interface UniTagP {
  value?: string[];
  edit?: boolean;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  children?: JSX.Element | any;
  editDropdown?: JSX.Element | any;
  gap?: string;
  onChange?: (value: string[]) => void;
  onDelete?: (value: string) => void;
  onAdd?: (value: string) => void;
  onEditInputhange?: (value: string) => void;
}

export interface UniTagS {
  value: string[];
  items: JSX.Element[];
  edit: boolean;
  editing: boolean;
  editingTagInputValue: string;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  editDropdown?: JSX.Element | any;
  gap?: string;
  onChange?: (value: string[]) => void;
  onDelete?: (value: string) => void;
  onAdd?: (value: string) => void;
  onEditInputhange?: (value: string) => void;
}

export interface UniTagItemP {
  value: string;
  children?: JSX.Element | string;
  style?: React.CSSProperties;
  edit?: boolean;
  onClick?: (e: any, value: string) => void;
  onMouseEnter?: (e: any, value: string) => void;
  onMouseLeave?: (e: any, value: string) => void;
  onDelete?: (value: string) => void;

  parentProps?: UniTagP;
}
