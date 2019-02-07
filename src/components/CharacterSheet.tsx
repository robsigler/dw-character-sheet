import * as React from "react";
import { Item, ItemProps } from "./Item";
import { Stats, StatsProps } from "./Stats"; 
import { Gear } from "./Gear";

export interface CharacterSheetProps { name: string; stats: StatsProps; initialGear: ItemProps[] }

export interface CharacterSheetState {
    name: string;
    stats: StatsProps;
    gear: ItemProps[];
}

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
            gear: this.props.initialGear,
        };

        this.modifyStat = this.modifyStat.bind(this);
        this.addGear = this.addGear.bind(this);
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

    addGear(item: ItemProps) {
        this.setState((state: CharacterSheetState) => {
            state.gear.push(item)
            return {
                gear: state.gear
            };
        })
    }

    render() {
        const statsProps: StatsProps = this.props.stats;
        statsProps.modifyStat = this.modifyStat;
        return <div>
            <div className="p-3">
                <h1>
                    <label htmlFor="Name">Name:</label>
                    <input type="text" id="Name" defaultValue={this.props.name}/>
                </h1>
            </div>
            <Stats {...statsProps} />
            <div className="p-3">
                <Gear addGear={this.addGear} stats={this.state.stats} gear={this.state.gear}/>
            </div>
        </div>;
    }
}

