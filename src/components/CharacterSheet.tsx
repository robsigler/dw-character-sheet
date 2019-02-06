import * as React from "react";
import { Item, ItemProps } from "./Item";
import { Stats, StatsProps } from "./Stats"; 

export interface CharacterSheetProps { name: string; stats: StatsProps; gear: ItemProps[] }

export interface CharacterSheetState { name: string; stats: StatsProps; gear: ItemProps[] }

export enum Stat {
    strength = "strength",
    dexterity = "dexterity",
    constitution = "constitution",
    intelligence = "intelligence",
    wisdom = "wisdom",
    charisma = "charisma",
}

export class CharacterSheet extends React.Component<CharacterSheetProps, CharacterSheetState> {
    constructor(props: CharacterSheetProps) {
        super(props);
        this.state = {
            name: this.props.name,
            stats: this.props.stats,
            gear: this.props.gear,
        };

        this.modifyStat = this.modifyStat.bind(this);
    }

    modifyStat(statName: string, delta: number) {
        this.setState((state: CharacterSheetState) => {
            const stats: StatsProps = state.stats;
            if (statName === Stat.strength) {
                stats.strength = stats.strength + delta;
            } else if (statName === Stat.dexterity) {
                stats.dexterity = stats.dexterity + delta;
            } else if (statName === Stat.constitution) {
                stats.constitution = stats.constitution + delta;
            } else if (statName === Stat.intelligence) {
                stats.intelligence = stats.intelligence + delta;
            } else if (statName === Stat.wisdom) {
                stats.wisdom = stats.wisdom + delta;
            } else if (statName === Stat.charisma) {
                stats.charisma = stats.charisma + delta;
            }
            return {stats:stats};
        });
    }

    render() {
        const gearHtml = this.props.gear.map((item: ItemProps) => <Item {...item}/>);
        const load: number = this.props.gear.reduce(((load: number, item: ItemProps) => load + item.weight), 0);
        const maxLoad: number = this.props.stats.strength + 10;
        const statsProps: StatsProps = this.props.stats;
        statsProps.modifyStat = this.modifyStat;
        return <div>
            <div>
                <label htmlFor="Name">Name:</label>
                <input type="text" id="Name" defaultValue={this.props.name}/>
            </div>
            <Stats {...statsProps} />
            <div>
                <h1>Gear</h1>
                <ul>
                    {gearHtml}
                </ul>
                <div>Load: {load}/{maxLoad}.</div>
            </div>
        </div>;
    }
}

