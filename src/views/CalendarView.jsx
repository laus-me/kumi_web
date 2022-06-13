import React, {useState} from 'react';
import {generateMonthWeeks, getCurrentYearAndMonth} from "../utils/calendar";

const WEEK_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function WeekHeaderItem(props) {
    const {name} = props;
    return (
        <p className="w-5 xl:w-12 h-5 text-sm font-medium text-gray-800 uppercase">
            {name}
        </p>
    )
}

function WeekRow(props) {
    const {children} = props;
    return (
        <div className="inline-flex items-center justify-start w-full h-full">
            {children}
        </div>
    )
}

function WeekItem(props) {
    const {name} = props;
    return (
        <div
            className="flex items-start justify-start w-14 h-full xl:w-40 xl:pl-2 xl:pr-32 xl:pt-2.5 xl:pb-24 border border-gray-200">
            <p className="text-sm font-medium text-gray-800">{name}</p>
        </div>
    )
}

function WeekItemHidden(props) {
    const {name} = props;
    return (
        <div
            className="flex items-start justify-start w-14 h-full xl:w-40 xl:pl-2 xl:pr-32 xl:pt-2.5 xl:pb-24 border border-gray-200">
            <p className="opacity-50 text-sm font-medium text-gray-800">{name}</p>
        </div>
    )
}

export default function CalendarView() {
    const {
        year: computedYear,
        month: computedMonth,
    } = getCurrentYearAndMonth();

    const [year, setYear] = useState(computedYear);
    const [month, setMonth] = useState(computedMonth);

    const weeks = generateMonthWeeks(year, month);

    const WeekHeader = WEEK_DAYS.map((name, index) => (
        <WeekHeaderItem key={index} name={name}/>
    ));
    const WeekRows = weeks.map((row, index) => (
        <WeekRow key={index}>{
            row.map((item, i) => (
                item.inMonth
                    ? <WeekItem key={item.toString()} name={item.getDate()}/>
                    : <WeekItemHidden key={i} name={item.getDate()}/>
            ))
        }</WeekRow>
    ))

    const handleUpdateMonth = (direction) => setMonth((prevStateMonth) => {
        if (!direction && prevStateMonth === 1) {
            setYear((prevStateYear) => prevStateYear - 1);
            return 12;
        }
        if (direction && prevStateMonth === 12) {
            setYear((prevStateYear) => prevStateYear + 1);
            return 1;
        }
        return prevStateMonth + (direction ? 1 : -1);
    });

    return (
        <div className="bg-white xl:py-8 px-4 lg:max-w-7xl lg:mx-auto lg:px-8">
            <div className="flex justify-between">
                <p className="text-4xl font-bold text-gray-800 mb-8">{year}年 {month}月</p>
                <div>
                    <button
                        className="px-3 py-1 hover:bg-gray-50"
                        onClick={() => handleUpdateMonth(false)}
                    >
                        &lt;
                    </button>
                    <button
                        className="px-3 py-1 hover:bg-gray-50"
                        onClick={() => handleUpdateMonth(true)}
                    >
                        &gt;
                    </button>
                </div>
            </div>
            <div className="inline-flex flex-col space-y-1 items-start justify-start h-full w-full mb-5">
                <div className="inline-flex space-x-10 xl:space-x-28 items-start justify-start xl:pr-24 w-full xl:h-10">
                    {WeekHeader}
                </div>
                <div className="flex flex-col items-start justify-start">
                    {WeekRows}
                </div>
            </div>
        </div>
    )
}
