import * as React from "react";

export default function AppContainer(props) {
    const {children} = props;
    return (
        <main className="sm:h-full flex-1 flex flex-col min-h-0 min-w-0 overflow-auto">
            {children}
        </main>
    )
}
