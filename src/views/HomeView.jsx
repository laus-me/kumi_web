import * as React from 'react';

import CheckIcon from '../assets/icons/check.svg';
import InfoIcon from '../assets/icons/info.svg';

function Item() {
    return (
        <div className="flex px-5 py-3 hover:bg-gray-100">
            <div className="flex-none w-10 mr-5">
                <img src={CheckIcon} alt="已完成" />
            </div>
            <div className="grow w-64 select-none">
                <div>Do Something</div>
                <div>Do the thing</div>
            </div>
            <div className="flex-none w-10 cursor-pointer" title="詳細資料">
                <img src={InfoIcon} alt="詳細資料" />
            </div>
        </div>
    )
}

export default function HomeView() {
    return (
        <section className="flex-1 pt-3 md:p-6 lg:mb-0 lg:min-h-0 lg:min-w-0">
            <div className="flex flex-col lg:flex-row h-full w-full">
                <div className="border pb-2 lg:pb-0 w-full lg:max-w-sm px-3 flex flex-row lg:flex-col flex-wrap lg:flex-nowrap">
                    <Item/>
                </div>
                <div className="border h-full w-full lg:flex-1 px-3 min-h-0 min-w-0">
                    <div className="bg-white w-full h-full min-h-0 min-w-0 overflow-auto">
                        <Item/>
                    </div>
                </div>
            </div>
        </section>
    )
}
