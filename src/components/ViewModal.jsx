import React, {useRef} from 'react';
import ModalContainer from "./ModalContainer";
import {CheckCircleIcon, QuestionMarkCircleIcon} from "@heroicons/react/outline";
import {Dialog} from "@headlessui/react";
import PropTypes from "prop-types";

function ViewModal(props) {
    const {open, onClose, setOpen, db, data, onEdit} = props;
    const focusModalButtonRef = useRef(null);

    const handleResolve = () => {
        data.resolved = !data.resolved;
        db.then(async (x) => {
            await x.transaction('items', 'readwrite').store.put(data);
        });
    };
    const handleCancel = () => {
        onClose();
        setOpen(false);
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
                            data.resolved
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
                            {data.title}
                        </Dialog.Title>
                        <div className="mt-2">
                            <div className="flex-auto w-full mb-2 text-xs space-y-2">
                                <div className="font-semibold text-gray-600 py-2">
                                    <div>
                                        備註
                                    </div>
                                    <div className="bg-gray-50 w-full h-full">
                                        {data.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleCancel}
                    ref={focusModalButtonRef}
                >
                    了解
                </button>
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onEdit}
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
