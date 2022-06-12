import React, {useState} from 'react';
import {
    getCurrentYearAndMonth,
    generateMonthWeeks
} from "../utils/calendar";

const WEEK_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function WeekHeaderItem(props) {
    const {name} = props;
    return (
        <p className="w-12 h-5 text-sm font-medium text-gray-800 uppercase">
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
            className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
            <p className="text-sm font-medium text-gray-800">{name}</p>
        </div>
    )
}

function WeekItemHidden(props) {
    const {name} = props;
    return (
        <div
            className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
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
                    ? <WeekItem key={item.toString()} name={item.getDate()} />
                    : <WeekItemHidden key={i} name={item.getDate()}/>
            ))
        }</WeekRow>
    ))

    const updateMonth = (direction) => setMonth((prevStateMonth) => {
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
        <div className="bg-white md:py-8 px-4 lg:max-w-7xl lg:mx-auto lg:px-8">
            <div className="flex justify-between">
                <p className="text-4xl font-bold text-gray-800 mb-8">{year}年 {month}月</p>
                <div>
                    <button
                        className="px-3 py-1 hover:bg-gray-50"
                        onClick={() => updateMonth(false)}
                    >
                        &lt;
                    </button>
                    <button
                        className="px-3 py-1 hover:bg-gray-50"
                        onClick={() => updateMonth(true)}
                    >
                        &gt;
                    </button>
                </div>
            </div>
            <div className="inline-flex flex-col space-y-1 items-start justify-start h-full w-full">
                <div className="inline-flex space-x-28 items-start justify-start pr-24 w-full h-10">
                    {WeekHeader}
                </div>
                <div className="flex flex-col items-start justify-start">
                    {WeekRows}
                </div>
            </div>
        </div>
    )
}
