import * as React from "react";

export interface Item { count: number; name: string; weight: number; }

export interface ItemProps { item: Item; itemId: number; }

export class ItemElement extends React.Component<ItemProps, {}> {
    render() {
        const item: Item = this.props.item;
        const text = item.count + " " + item.name + " (" + item.weight + " weight)";
        return <li className="list-group-item">{text}</li>
    }
}

