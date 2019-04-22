import * as React from "react";
import * as ReactDOM from "react-dom";

import { App, AppProps } from "./components/App";

const appProps: AppProps = {
}

ReactDOM.render(
    <App {...appProps} />,
    document.getElementById("app")
);
