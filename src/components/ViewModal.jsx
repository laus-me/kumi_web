import React, {useRef} from 'react';
import ModalContainer from "./ModalContainer";
import {CheckCircleIcon, QuestionMarkCircleIcon} from "@heroicons/react/outline";
import {Dialog} from "@headlessui/react";
import PropTypes from "prop-types";

function DetailItem(props) {
    return (
        <div className="text-gray-600 pt-1">
            <div className="text-sm font-semibold">
                {props.name}
            </div>
            <div className="w-full h-full">
                {props.content}
            </div>
        </div>
    )
}

function ViewModal(props) {
    const {open, onClose, setOpen, db, currentItem, onEdit} = props;
    const focusModalButtonRef = useRef(null);

    const handleResolve = () => {
        currentItem.resolved = !currentItem.resolved;
        db
            .then((x) => x.transaction('items', 'readwrite').store.put(currentItem))
            .catch((e) => console.error(e));
    };
    const handleOK = () => {
        setOpen(false);
        onClose();
    };
    const handleEdit = () => {
        onEdit(currentItem);
    };

    return (
        <ModalContainer open={open} setOpen={setOpen} initialFocus={focusModalButtonRef}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div
                        className="cursor-pointer"
                        onClick={handleResolve}
                    >
                        {
                            currentItem.resolved
                                ? (<CheckCircleIcon
                                    title="已完成"
                                    className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
                                />)
                                : (<QuestionMarkCircleIcon
                                    title="未完成"
                                    className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
                                />)
                        }
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            {currentItem.resolved ? "已完成" : "未完成"}
                        </Dialog.Title>
                        <div className="mt-2">
                            <div className="flex-auto w-full mb-1 text-base space-y-2">
                                <DetailItem name="標題" content={currentItem.title}/>
                                {
                                    currentItem.enabledNotification && (
                                        <div>
                                            <DetailItem
                                                name="開始提醒時間"
                                                content={currentItem.notificationStart}
                                            />
                                            <DetailItem
                                                name="結束提醒時間"
                                                content={currentItem.notificationEnd}
                                            />
                                        </div>
                                    )
                                }
                                {
                                    currentItem.description &&
                                    <DetailItem name="備註" content={currentItem.description}/>
                                }
                                <DetailItem name="板上釘釘" content={currentItem.enabledPin ? "已釘上歐耶" : "並沒有"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleOK}
                    ref={focusModalButtonRef}
                >
                    了解
                </button>
                <button
                    type="button"
                    className="mt-3 sm:mt-0 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleEdit}
                >
                    編輯
                </button>
            </div>
        </ModalContainer>
    )
}

ViewModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
}

export default ViewModal;
