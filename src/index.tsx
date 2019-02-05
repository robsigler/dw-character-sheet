import * as React from "react";
import * as ReactDOM from "react-dom";

import { CharacterSheet } from "./components/CharacterSheet";

const gearList = [{ name: "Adventuring Gear", weight: 1 }];
const stats = {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
}
ReactDOM.render(
    <CharacterSheet name="Helga" stats={stats} gear={gearList} />,
    document.getElementById("app")
);
