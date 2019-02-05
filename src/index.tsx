import * as React from "react";
import * as ReactDOM from "react-dom";

import { CharacterSheet } from "./components/CharacterSheet";

const gearList = [{ name: "Adventuring Gear", weight: 1 }];
ReactDOM.render(
    <CharacterSheet name="Helga" gear={gearList} />,
    document.getElementById("app")
);
