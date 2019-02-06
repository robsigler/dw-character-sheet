import * as React from "react";

export interface ItemProps { count: number; name: string; weight: number; }

export class Item extends React.Component<ItemProps, {}> {
    render() {
        const text = this.props.count + " " + this.props.name + " (" + this.props.weight + " weight)";
        return <li className="list-group-item">{text}</li>
    }
}

