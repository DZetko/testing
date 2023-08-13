export type RowItemProps = {
    onClick?: () => void;
} & ({
    type: "icon";
    icon: React.ReactNode;
    position: "top" | "bottom";
} | {
    type: "data";
    data: { key: string, value: string };
});