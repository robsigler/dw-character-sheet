import * as React from "react";
import { Item, ItemProps } from "./Item";
import { Stats, StatsProps } from "./Stats"; 

export interface CharacterSheetProps { name: string; stats: StatsProps; gear: ItemProps[] }

export interface CharacterSheetState {
    name: string;
    stats: StatsProps;
    gear: ItemProps[];
    addingGear: boolean;
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
            gear: this.props.gear,
            addingGear: false,
        };

        this.enableNewGearForm = this.enableNewGearForm.bind(this);
        this.disableNewGearForm = this.disableNewGearForm.bind(this);
        this.addNewGear = this.addNewGear.bind(this);
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

    enableNewGearForm() {
        this.setState((state: CharacterSheetState) => {
            return {addingGear: true};
        });
    }

    disableNewGearForm() {
        this.setState((state: CharacterSheetState) => {
            return {addingGear: false};
        });
    }

    addNewGear(evt: any) {
        console.log(evt.target.parentElement);
        this.setState((state: CharacterSheetState) => {
            return {addingGear: false};
        });
    }

    render() {
        const gearHtml = this.props.gear.map((item: ItemProps) => <Item {...item}/>);
        const load: number = this.props.gear.reduce(((load: number, item: ItemProps) => load + (item.weight * item.count)), 0);
        const maxLoad: number = this.props.stats.strength + 10;
        const statsProps: StatsProps = this.props.stats;
        statsProps.modifyStat = this.modifyStat;
        let addGearButton = (<button onClick={this.enableNewGearForm} className="list-group-item list-group-item-action">+ Add an item</button>);
        if (this.state.addingGear) {
            addGearButton = (<li className="list-group-item">
                <label htmlFor="NewGearCount">Count:</label>
                <input type="text" id="NewGearCount" defaultValue="1"/>
                <label htmlFor="NewGearName">Item name:</label>
                <input type="text" id="NewGearName" defaultValue=""/>
                <label htmlFor="NewGearWeight">Weight:</label>
                <input type="text" id="NewGearWeight" defaultValue="1"/>
                <button onClick={this.addNewGear} type="button" className="btn btn-success">Add</button>
                <button onClick={this.disableNewGearForm} type="button" className="btn btn-light">Back</button>
            </li>);
        }
        return <div>
            <div className="p-3">
                <h1>
                    <label htmlFor="Name">Name:</label>
                    <input type="text" id="Name" defaultValue={this.props.name}/>
                </h1>
            </div>
            <Stats {...statsProps} />
            <div className="p-3">
                <h1>Gear</h1>
                <ul className="list-group">
                    {gearHtml}
                    {addGearButton}
                </ul>
                <div className="p-2">Load: {load}/{maxLoad}.</div>
            </div>
        </div>;
    }
}

