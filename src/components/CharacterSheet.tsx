import * as React from "react";

export interface CharacterSheetProps { name: string; gear: Item[] }

export interface CharacterSheetState { name: string; gear: Item[] }

export interface Item { name: string; weight: number; }

// 'CharacterSheetProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class CharacterSheet extends React.Component<CharacterSheetProps, {}> {
    render() {
        const gearHtml = this.props.gear.map((item: Item) => <li>{item.name}</li>);
        return <div>
            <div>
                <label htmlFor="Name">Name:</label>
                <input type="text" id="Name" value={this.props.name}/>
            </div>
            <div>
                <h1>Gear</h1>
                <ul>
                    {gearHtml}
                </ul>
            </div>
        </div>;
    }
}

