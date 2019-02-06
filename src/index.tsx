import * as React from "react";
import * as ReactDOM from "react-dom";

import { CharacterSheet, CharacterSheetProps } from "./components/CharacterSheet";

const characterSheetProps: CharacterSheetProps = {
    name: "Helga",
    gear: [{ name: "Adventuring Gear", weight: 1 }],
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
ReactDOM.render(
    <CharacterSheet {...characterSheetProps} />,
    document.getElementById("app")
);
