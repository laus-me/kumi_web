import * as React from "react";

export default function RootContainer(props) {
    const {children} = props;
    return (
        <section
            className="h-screen w-screen bg-gray-200 flex flex-col-reverse sm:flex-row min-h-0 min-w-0 overflow-hidden"
        >
            {children}
        </section>
    )
}
