import * as React from "react";
import { Auth } from 'aws-amplify';
import axios from 'axios';
import { Item, ItemProps } from "./Item";
import { Stats, StatsProps } from "./Stats";
import { Gear } from "./Gear";

export interface CharacterSheetProps { }

export interface CharacterSheetState {
    character: Character;
    loaded: boolean;
}

export interface Character {
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

        this.state = {
            character: {
                name: "",
                gear: [],
                stats: {
                    strength: 1,
                    dexterity: 1,
                    constitution: 1,
                    intelligence: 1,
                    wisdom: 1,
                    charisma: 1,
                    modifyStat: undefined
                },
                nextGearKey: 1,
            },
            loaded: false
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
            return {
                loaded: true,
                character: stateFromDb
            }
        });
    }

    modifyStat(statName: string, delta: number) {
        this.setState((state: CharacterSheetState) => {
            const character: Character = state.character;
            if (statName === Stat.strength) {
                character.stats.strength = character.stats.strength + delta;
            } else if (statName === Stat.dexterity) {
                character.stats.dexterity = character.stats.dexterity + delta;
            } else if (statName === Stat.constitution) {
                character.stats.constitution = character.stats.constitution + delta;
            } else if (statName === Stat.intelligence) {
                character.stats.intelligence = character.stats.intelligence + delta;
            } else if (statName === Stat.wisdom) {
                character.stats.wisdom = character.stats.wisdom + delta;
            } else if (statName === Stat.charisma) {
                character.stats.charisma = character.stats.charisma + delta;
            }
            return { character: character };
        });
    }

    addGear(item: Item) {
        this.setState((state: CharacterSheetState) => {
            state.character.gear.push({ item: item, itemId: state.character.nextGearKey });
            state.character.nextGearKey = state.character.nextGearKey + 1;
            return {
                character: state.character
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
        return response.data;
    }

    async saveState() {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        const userId = user.username;
        axios({
            method: 'put',
            url: '/api/character/' + userId,
            headers: {
                Authorization: token
            },
            data: this.state.character
        })
            .then(function (response) {
                console.log(response);
            });
    }

    render() {
        const statsProps: StatsProps = this.state.character.stats;
        statsProps.modifyStat = this.modifyStat;
        if (!this.state.loaded) {
            return (<div>Loading...</div>)
        }
        return (<div>
            <div className="p-3">
                <h1>
                    <label htmlFor="Name">Name:</label>
                    <input type="text" id="Name" defaultValue={this.state.character.name} />
                </h1>
            </div>
            <div className="p-3">
                <button onClick={this.getState} type="button" className="btn btn-success">Get</button>
                <button onClick={this.saveState} type="button" className="btn btn-success">Save</button>
            </div>
            <Stats {...statsProps} />
            <div className="p-3">
                <Gear addGear={this.addGear} stats={this.state.character.stats} gear={this.state.character.gear} />
            </div>
        </div>);
    }
}

