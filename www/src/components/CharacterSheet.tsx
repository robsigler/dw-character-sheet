import * as React from "react";
import { Auth } from 'aws-amplify';
import axios from 'axios';
import { Item, ItemProps } from "./Item";
import { Stats, StatsProps } from "./Stats";
import { Gear } from "./Gear";

export interface CharacterSheetProps { name: string; stats: StatsProps; initialGear: Item[] }

export interface CharacterSheetState {
    name: string;
    stats: StatsProps;
    gear: ItemProps[];
    nextGearKey: number;
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

        let nextGearKey = 1;

        const gear = this.props.initialGear.map((item: Item) => {
            const thisGearKey = nextGearKey;
            nextGearKey = nextGearKey + 1;
            return { item: item, itemId: thisGearKey };
        })

        this.state = {
            name: this.props.name,
            stats: this.props.stats,
            gear: gear,
            nextGearKey: nextGearKey,
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.modifyStat = this.modifyStat.bind(this);
        this.addGear = this.addGear.bind(this);
        this.getState = this.getState.bind(this);
        this.saveState = this.saveState.bind(this);
    }

    async componentDidMount() {
        const stateFromDb = await this.getState();
        this.setState((state: CharacterSheetState) => {
            return stateFromDb
        });
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
            return { stats: stats };
        });
    }

    addGear(item: Item) {
        this.setState((state: CharacterSheetState) => {
            state.gear.push({ item: item, itemId: state.nextGearKey });
            return {
                gear: state.gear,
                nextGearKey: state.nextGearKey + 1,
            };
        })
    }

    async getState() {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        const userId = user.username;
        console.log(user)
        const response = await axios({
            method: 'get',
            url: '/api/character/' + userId,
            headers: {
                Authorization: token
            }
        });
        const data = JSON.parse(response.data);
        return data;
    }

    async saveState() {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        const userId = user.username;
        console.log(this.state.gear);
        axios({
            method: 'put',
            url: '/api/character/' + userId,
            headers: {
                Authorization: token
            },
            data: this.state
        })
            .then(function (response) {
                console.log(response);
            });
    }

    render() {
        const statsProps: StatsProps = this.props.stats;
        statsProps.modifyStat = this.modifyStat;
        return (<div>
            <div className="p-3">
                <h1>
                    <label htmlFor="Name">Name:</label>
                    <input type="text" id="Name" defaultValue={this.props.name} />
                </h1>
            </div>
            <div className="p-3">
                <button onClick={this.getState} type="button" className="btn btn-success">Get</button>
                <button onClick={this.saveState} type="button" className="btn btn-success">Save</button>
            </div>
            <Stats {...statsProps} />
            <div className="p-3">
                <Gear addGear={this.addGear} stats={this.state.stats} gear={this.state.gear} />
            </div>
        </div>);
    }
}

