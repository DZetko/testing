import { useCallback } from "react";
import { RowItemProps } from "./RowItemInterface";

const RowItem = (props: RowItemProps) => {
    const { onClick, type } = props;
    const handleClick = useCallback(() => {
        onClick?.();
    }, [onClick]);
    
    const renderContent = useCallback(() => {
        if (type === "icon" && "icon" in props) {
            const { icon, position } = props;
            return (
                <div className="row__item" onClick={handleClick}>
                    <div className={position === "top" ? "row__item-top" : "row__item-bottom"}>
                        {icon}
                    </div>
                </div>
            )
        }
    
        if (type === "data" && "data" in props) {
            const { data } = props;
            const { key, value } = data;
            return (
                <div className="row__item" onClick={handleClick}>
                    <span className="row__item-top">{key}</span>
                    <span className="row__item-bottom">{value}</span>
                </div>
            );
        }
    }, [handleClick, props, type]);
    
    return (
        <>
            {renderContent()}
        </>
    );
}

export default RowItem;