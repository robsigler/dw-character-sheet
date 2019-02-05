import * as React from "react";

export interface StatsProps { 
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

export class Stats extends React.Component<StatsProps, {}> {
    renderStat(name: string, value: number) {
        const text = name + ": " + value;
        return <div>{text}</div>
    }

    render() {
        return <div>
            {this.renderStat("STR", this.props.strength)}
            {this.renderStat("DEX", this.props.dexterity)}
            {this.renderStat("CON", this.props.constitution)}
            {this.renderStat("INT", this.props.intelligence)}
            {this.renderStat("WIS", this.props.wisdom)}
            {this.renderStat("CHA", this.props.charisma)}
        </div>
    }
}

