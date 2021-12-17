import TagObj from "./TagObj";

export interface UniTagP {
    value?: TagObj[];
    edit?: boolean;
    style?: React.CSSProperties;
    itemStyle?: React.CSSProperties;
    onChange?: (value: TagObj[]) => void;
    onDelete?: (keyid: string) => void;
    onAdd?: (keyid: string) => void;
}

export interface UniTagS {
    value: TagObj[];
    edit: boolean;
    style?: React.CSSProperties;
    itemStyle?: React.CSSProperties;
    onChange?: (value: TagObj[]) => void;
    onDelete?: (key: string) => void;
    onAdd?: (key: string) => void;
}

export interface UniTagItemP {
    keyid: string;
    children?: JSX.Element | string;
    style?: React.CSSProperties;
    desc?: string;
    url?: string;
    edit?: boolean;
    onClick?: (e: any) => void;
    onMouseEnter?: (e: any) => void;
    onMouseLeave?: (e: any) => void;
    onDelete?: (keyid: string) => void;

    parentProps?: UniTagP;
}