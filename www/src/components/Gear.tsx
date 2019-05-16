import * as React from "react";
import { ItemElement, Item, ItemProps } from "./Item";
import { StatsProps } from "./Stats";

export interface GearProps {
    addGear: any;
    stats: StatsProps;
    gear: ItemProps[];
}

export interface GearState {
    newGearForm: NewGearForm;
}

export interface NewGearForm {
    active: boolean;
    newItem: Item;
}

export class Gear extends React.Component<GearProps, GearState> {
    constructor(props: GearProps) {
        super(props);
        this.state = {
            newGearForm: {
                active: false,
                newItem: {
                    count: 1,
                    name: "",
                    weight: 1,
                },
            },
        };

        this.enableNewGearForm = this.enableNewGearForm.bind(this);
        this.disableNewGearForm = this.disableNewGearForm.bind(this);
        this.addNewGear = this.addNewGear.bind(this);
        this.handleNewGearCountChange = this.handleNewGearCountChange.bind(this);
        this.handleNewGearNameChange = this.handleNewGearNameChange.bind(this);
        this.handleNewGearWeightChange = this.handleNewGearWeightChange.bind(this);
    }

    enableNewGearForm() {
        this.setState((state: GearState) => {
            return {
                newGearForm: {
                    active: true,
                    newItem: state.newGearForm.newItem,
                }
            };
        });
    }

    disableNewGearForm() {
        this.setState((state: GearState) => {
            return {
                newGearForm: {
                    active: false,
                    newItem: state.newGearForm.newItem,
                }
            };
        });
    }

    addNewGear() {
        this.setState((state: GearState) => {
            this.props.addGear(state.newGearForm.newItem);
            return {
                newGearForm: {
                    active: false,
                    newItem: {
                        count: 1,
                        name: "",
                        weight: 1,
                    },
                }
            }
        });
    }

    handleNewGearCountChange(evt: any) {
        const newCount: number = Number(evt.target.value);
        this.setState((state: GearState) => {
            const newGearForm = state.newGearForm;
            newGearForm.newItem.count = newCount;
            return {
                newGearForm: newGearForm,
            };
        });
    }

    handleNewGearNameChange(evt: any) {
        const newName: string = evt.target.value;
        this.setState((state: GearState) => {
            const newGearForm = state.newGearForm;
            newGearForm.newItem.name = newName;
            return {
                newGearForm: newGearForm,
            };
        });
    }

    handleNewGearWeightChange(evt: any) {
        const newWeight: number = Number(evt.target.value);
        this.setState((state: GearState) => {
            const newGearForm = state.newGearForm;
            newGearForm.newItem.weight = newWeight;
            return {
                newGearForm: newGearForm,
            };
        });
    }

    render() {
        const gearHtml = this.props.gear.map((itemProps: ItemProps) => <ItemElement key={itemProps.itemId} {...itemProps} />);
        const load: number = this.props.gear.reduce(((load: number, itemProps: ItemProps) => load + (itemProps.item.weight * itemProps.item.count)), 0);
        const maxLoad: number = this.props.stats.strength + 10;
        let addGearButton = (<button onClick={this.enableNewGearForm} className="list-group-item list-group-item-action">+ Add an item</button>);
        if (this.state.newGearForm.active) {
            addGearButton = (<li className="list-group-item">
                <label>Count:</label>
                <input onChange={this.handleNewGearCountChange} type="text" id="NewGearCount" value={this.state.newGearForm.newItem.count} />
                <label>Item name:</label>
                <input onChange={this.handleNewGearNameChange} type="text" id="NewGearName" value={this.state.newGearForm.newItem.name} />
                <label>Weight:</label>
                <input onChange={this.handleNewGearWeightChange} type="text" id="NewGearWeight" value={this.state.newGearForm.newItem.weight} />
                <button onClick={this.addNewGear} type="button" className="btn btn-success">Add</button>
                <button onClick={this.disableNewGearForm} type="button" className="btn btn-light">Back</button>
            </li>);
        }
        return (<div>
            <h1>Gear</h1>
            <ul className="list-group">
                {gearHtml}
                {addGearButton}
            </ul>
            <div className="p-2">Load: {load}/{maxLoad}.</div>
        </div>);
    }
}