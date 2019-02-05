import * as React from "react";

export interface ItemProps { name: string; weight: number; }

export class Item extends React.Component<ItemProps, {}> {
    render() {
        const text = this.props.name + " (" + this.props.weight + " weight)";
        return <li>{text}</li>
    }
}

