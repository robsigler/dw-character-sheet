import * as React from "react";

export interface StatsProps { 
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    modifyStat: any;
}

export class Stats extends React.Component<StatsProps, {}> {
    constructor(props: StatsProps) {
        super(props);

        this.modifyStatClick = this.modifyStatClick.bind(this);
    }

    modifyStatClick(statName: string, delta: number) {
        console.log("Hello, world!");
        return () => {
            this.props.modifyStat(statName, delta)
        };
    }

    renderStat(shortName: string, realName: string, value: number) {
        const text = shortName + ": " + value;
        return (
        <div>
            <button onClick={this.modifyStatClick(realName, -1)}>-</button>
            {text}
            <button onClick={this.modifyStatClick(realName, 1)}>+</button>
        </div>);
    }

    render() {
        return (<div>
            {this.renderStat("STR", "strength", this.props.strength)}
            {this.renderStat("DEX", "dexterity", this.props.dexterity)}
            {this.renderStat("CON", "constitution", this.props.constitution)}
            {this.renderStat("INT", "intelligence", this.props.intelligence)}
            {this.renderStat("WIS", "wisdom", this.props.wisdom)}
            {this.renderStat("CHA", "charisma", this.props.charisma)}
        </div>);
    }
}

