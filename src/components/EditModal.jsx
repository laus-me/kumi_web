import React, {useRef, useState} from 'react'
import {Dialog, Switch} from "@headlessui/react";
import {CalendarIcon, PlusCircleIcon} from "@heroicons/react/outline";
import ModalContainer from "./ModalContainer";
import PropTypes from "prop-types";

function EditModal(props) {
    const {open, setOpen} = props;
    const focusModalButtonRef = useRef(null);
    const [enabledNotification, setEnabledNotification] = useState(false)
    const [enabledPin, setEnabledPin] = useState(false)

    return (
        <ModalContainer open={open} setOpen={setOpen} initialFocus={focusModalButtonRef}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <PlusCircleIcon
                        className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"/>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            建立新事項
                        </Dialog.Title>
                        <div className="mt-2">
                            <div className="flex-auto w-full mb-2 text-xs space-y-2">
                                <label className="font-semibold text-gray-600 py-2">標題</label>
                                <input placeholder="您想讓我提醒您些什麼？"
                                       className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                       required="required" type="text" name="integration[shop_name]"
                                       id="integration_shop_name"/>
                            </div>
                            <div className="flex-auto w-full mb-2 text-xs space-y-2">
                                <Switch.Group>
                                    <div className="flex items-center">
                                        <Switch.Label className="font-semibold text-gray-600 mr-4">
                                            啟用提醒
                                        </Switch.Label>
                                        <Switch
                                            checked={enabledNotification}
                                            onChange={setEnabledNotification}
                                            className={`${enabledNotification ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                        >
                                            <span className={`${enabledNotification ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}/>
                                        </Switch>
                                    </div>
                                </Switch.Group>
                            </div>
                            {enabledNotification && (
                                <div>
                                    <div className="flex-auto w-full mb-2 text-xs space-y-2">
                                        <label className="font-semibold text-gray-600 py-2">開始提醒時間</label>
                                        <div className="relative focus-within:text-gray-600 text-gray-400">
                                            <input type="text"
                                                   className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                   placeholder="25/02/2020 13:00"/>
                                            <div className="absolute left-3 top-2">
                                                <CalendarIcon className="w-6 h-6"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-auto w-full mb-2 text-xs space-y-2">
                                        <label className="font-semibold text-gray-600 py-2">結束提醒時間</label>
                                        <div className="relative focus-within:text-gray-600 text-gray-400">
                                            <input type="text"
                                                   className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                   placeholder="26/02/2020 13:00"/>
                                            <div className="absolute left-3 top-2">
                                                <CalendarIcon className="w-6 h-6"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex-auto w-full mb-2 text-xs space-y-2">
                                <label className="font-semibold text-gray-600 py-2">備註</label>
                                <textarea required="" name="message" id=""
                                          className="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4"
                                          placeholder="是因為什麼重要的人嗎？" spellCheck="false"></textarea>
                                <p className="text-xs text-gray-400 text-left my-3">你已經輸入了 n 個字了</p>
                            </div>
                            <div className="flex-auto w-full mb-2 text-xs space-y-2">
                                <Switch.Group>
                                    <div className="flex items-center">
                                        <Switch.Label className="font-semibold text-gray-600 mr-4">
                                            成為板上釘釘
                                        </Switch.Label>
                                        <Switch
                                            checked={enabledPin}
                                            onChange={setEnabledPin}
                                            className={`${enabledPin ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                        >
                                            <span
                                                className={`${enabledPin ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}/>
                                        </Switch>
                                    </div>
                                </Switch.Group>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                >
                    儲存
                </button>
                <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
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
