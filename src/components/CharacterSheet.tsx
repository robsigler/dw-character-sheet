import * as React from "react";
import { Item, ItemProps } from "./Item";
import { Stats, StatsProps } from "./Stats"; 

export interface CharacterSheetProps { name: string; stats: StatsProps; gear: ItemProps[] }

export interface CharacterSheetState { name: string; stats: StatsProps; gear: ItemProps[] }

export class CharacterSheet extends React.Component<CharacterSheetProps, {}> {
    render() {
        const gearHtml = this.props.gear.map((item: ItemProps) => <Item {...item}/>);
        return <div>
            <div>
                <label htmlFor="Name">Name:</label>
                <input type="text" id="Name" value={this.props.name}/>
            </div>
            <Stats {...this.props.stats} />
            <div>
                <h1>Gear</h1>
                <ul>
                    {gearHtml}
                </ul>
            </div>
        </div>;
    }
}

