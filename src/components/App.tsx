import * as React from "react";
import { withAuthenticator } from 'aws-amplify-react';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';

import { CharacterSheet, CharacterSheetProps } from "./CharacterSheet";

Amplify.configure(awsmobile);

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

function App() {
    return (
        <CharacterSheet {...characterSheetProps} />
    );
}

export default withAuthenticator(App);