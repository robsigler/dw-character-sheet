import * as React from "react";
import { withAuthenticator } from 'aws-amplify-react';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';

import { CharacterSheet, CharacterSheetProps } from "./CharacterSheet";

Amplify.configure(awsmobile);

const characterSheetProps: CharacterSheetProps = {
}

function App() {
    return (
        <CharacterSheet {...characterSheetProps} />
    );
}

export default withAuthenticator(App);