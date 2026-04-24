import React from "react";
interface SplitLayoutProps<T>{
    items: T[];
    selectedItem: T | null;
    onSelectItem:(item: T) => void;
    renderListItem:(item:T) => React.ReactNode;
    renderDetail:(item:T) => React.ReactNode;
}
function SplitLayout<T extends {id: number}>({
    items,
    selectedItem,
    onSelectItem: onSelect,
    renderListItem,
    renderDetail
}:SplitLayoutProps<T>){
    return(
        <div className="flex h-screen">
            <div className="w-2/5 border-r overflow-y-auto">
            {Array.isArray(items) && items.map((item) =>(
                <div
                    key={item.id}
                    onClick={()=> onSelect(item)}
                    className={`p-4 cursor-pointer ${
                        selectedItem?.id === item.id ? "bg-gray-200" : "hover:bg-gray-100"
                    }`}
                >
                    {renderListItem(item)}
                </div>
            ))}
            </div>
            <div className="w-3/5 p-6">
                {selectedItem ? renderDetail(selectedItem) : <p className="text-gray-500">Select an item to view details</p>}
            </div>
        </div>
    );
}
export default SplitLayout;