import * as React from "react";

function AppCopyright() {
    return (
        <p className="text-gray-600">
            &copy; 2022 <a href="https://github.com/poyang31">Po-Yang Chen</a>
        </p>
    )
}

export default function AppFooter() {
    return (
        <footer className="px-6 py-3 border-t flex w-full items-end">
            <AppCopyright/>
        </footer>
    )
}
