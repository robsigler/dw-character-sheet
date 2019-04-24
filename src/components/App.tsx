import * as React from "react";
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { Auth } from 'aws-amplify';
import awsmobile from './aws-exports';

import { CharacterSheet, CharacterSheetProps } from "./CharacterSheet";
import { Login, LoginProps } from "./Login";

Amplify.configure(awsmobile);

const loggedIn = false;
const characterSheetProps: CharacterSheetProps = {
    name: "Helga",
    initialGear: [
        { count: 3, name: "Adventuring Gear", weight: 1 },
        { count: 1, name: "Enchanted Dagger", weight: 1 },
    ],
    stats: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
        modifyStat: undefined,
    },
}

// export interface AppProps { }

// export interface AppState {
// }

// export class App extends React.Component<AppProps, AppState> {
//     constructor(props: CharacterSheetProps) {
//         super(props);
//     }

//     render() {
//         if (loggedIn) {
//             return (
//                 <CharacterSheet {...characterSheetProps} />
//             );
//         } else {
//             const loginProps = {};
//             return (
//                 <Login {...loginProps} />
//             );
//         }
//     }
// }

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.js</code> and save to reload.
        </p>
            </header>
        </div>
    );
}

export default withAuthenticator(App);