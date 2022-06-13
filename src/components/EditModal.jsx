import React, {useEffect, useRef, useState} from 'react'
import {Dialog, Switch} from "@headlessui/react";
import {CalendarIcon, PlusCircleIcon} from "@heroicons/react/outline";
import ModalContainer from "./ModalContainer";
import PropTypes from "prop-types";

function InputBox(props) {
    const {name, placeholder, value, setValue} = props;
    return (
        <div>
            <label className="font-semibold text-gray-600 py-2">{name}</label>
            <input
                type="text"
                placeholder={placeholder}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 mt-2 px-4"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}

function DateSelector(props) {
    const {name, value, setValue} = props;
    return (
        <div className="flex-auto w-full mb-2 text-xs space-y-2">
            <label className="font-semibold text-gray-600 py-2">{name}</label>
            <div className="relative focus-within:text-gray-600 text-gray-400">
                <input
                    type="text"
                    placeholder="25/02/2020 13:00"
                    className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <div className="absolute left-3 top-2">
                    <CalendarIcon className="w-6 h-6"/>
                </div>
            </div>
        </div>
    );
}

function Switcher(props) {
    const {name, value, setValue} = props;
    return (
        <Switch.Group>
            <div className="flex items-center">
                <Switch.Label className="font-semibold text-gray-600 mr-4">
                    {name}
                </Switch.Label>
                <Switch
                    checked={value}
                    onChange={setValue}
                    className={[
                        value ? 'bg-blue-600' : 'bg-gray-200',
                        "relative",
                        "inline-flex",
                        "h-6",
                        "w-11",
                        "items-center",
                        "rounded-full",
                        "transition-colors",
                        "focus:outline-none",
                        "focus:ring-2",
                        "focus:ring-indigo-500",
                        "focus:ring-offset-2"
                    ].join(" ")}
                >
                    <span
                        className={[
                            value ? 'translate-x-6' : 'translate-x-1',
                            "inline-block",
                            "h-4",
                            "w-4",
                            "transform",
                            "rounded-full",
                            "bg-white",
                            "transition-transform"
                        ].join(" ")}
                    />
                </Switch>
            </div>
        </Switch.Group>
    );
}

function TextBox(props) {
    const {name, placeholder, value, setValue} = props;
    return (
        <div>
            <label className="font-semibold text-gray-600 py-2">{name}</label>
            <textarea
                name="message"
                className="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg mt-2 py-2 px-4"
                placeholder={placeholder}
                spellCheck="false"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            ></textarea>
            <p className="text-xs text-gray-400 text-left my-3">
                你已經輸入了 {value?.length || "?"} 個字了
            </p>
        </div>
    )
}

function EditModal(props) {
    const {open, onClose, setOpen, db, data} = props;
    const focusModalButtonRef = useRef(null);
    const [id, serId] = useState(null);
    const [title, setTitle] = useState("");
    const [enabledNotification, setEnabledNotification] = useState(false);
    const [notificationStart, setNotificationStart] = useState("");
    const [notificationEnd, setNotificationEnd] = useState("");
    const [description, setDescription] = useState("");
    const [enabledPin, setEnabledPin] = useState(false);

    const clear = () => {
        serId(null);
        setTitle("");
        setEnabledNotification(false);
        setNotificationStart("");
        setNotificationEnd("");
        setDescription("");
        setEnabledPin(false);
    };
    const handleSave = () => {
        db.then(async (x) => {
            await x.transaction('items', 'readwrite').store.put({
                id,
                title,
                enabledNotification,
                notificationStart,
                notificationEnd,
                description,
                enabledPin
            });
            onClose();
            clear();
            setOpen(false);
        });
    };
    const handleCancel = () => {
        onClose();
        clear();
        setOpen(false);
    };

    useEffect(() => {
        if (data.id) {
            serId(data.id);
            setTitle(data.title);
            setEnabledNotification(data.enabledNotification);
            setNotificationStart(data.notificationStart);
            setNotificationEnd(data.notificationEnd);
            setDescription(data.description);
            setEnabledPin(data.enabledPin);
        }
    }, [data]);

    return (
        <ModalContainer open={open} setOpen={setOpen} initialFocus={focusModalButtonRef}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <PlusCircleIcon
                        title={!id ? "新增" : "編輯"}
                        className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
                    />
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            {!id ? "建立新事項" : "編輯事項"}
                        </Dialog.Title>
                        <div className="mt-2">
                            <div className="flex-auto w-full mb-2 text-xs space-y-2">
                                <InputBox
                                    name="標題"
                                    placeholder="您想讓我提醒您些什麼？"
                                    value={title}
                                    setValue={setTitle}
                                />
                            </div>
                            <div className="flex-auto w-full mb-2 text-xs space-y-2">
                                <Switcher
                                    name="啟用提醒"
                                    value={enabledNotification}
                                    setValue={setEnabledNotification}
                                />
                            </div>
                            {enabledNotification && (
                                <div>
                                    <DateSelector
                                        name="開始提醒時間"
                                        value={notificationStart}
                                        setValue={setNotificationStart}
                                    />
                                    <DateSelector
                                        name="結束提醒時間"
                                        value={notificationEnd}
                                        setValue={setNotificationEnd}
                                    />
                                </div>
                            )}
                            <div className="flex-auto w-full mb-2 text-xs space-y-2">
                                <TextBox
                                    name="備註"
                                    placeholder="是因為什麼重要的人嗎？"
                                    value={description}
                                    setValue={setDescription}
                                />
                            </div>
                            <div className="flex-auto w-full mb-2 text-xs space-y-2">
                                <Switcher
                                    name="成為板上釘釘"
                                    value={enabledPin}
                                    setValue={setEnabledPin}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleSave}
                >
                    儲存
                </button>
                <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleCancel}
                    ref={focusModalButtonRef}
                >
                    取消
                </button>
            </div>
        </ModalContainer>
    )
}

ModalContainer.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
}

export default EditModal;
