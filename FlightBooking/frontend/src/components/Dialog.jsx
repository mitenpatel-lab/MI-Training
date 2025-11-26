
import React from "react";

function Dialog({ open, onConfirm, onCancel }) {
    if (!open) return null;

    return (
        <div
            id="popup-modal"
            tabIndex="-1"
            className="fixed inset-0 z-50 flex justify-center items-center bg-black/40"
        >
            <div className="relative p-4 w-full max-w-md">
                <div className="bg-neutral-primary-soft border border-default rounded-base shadow-sm p-6 relative">
                    <button
                        type="button"
                        className="absolute top-3 right-3 text-body hover:bg-neutral-tertiary rounded-base w-9 h-9 flex justify-center items-center"
                        onClick={onCancel}
                    >
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <div className="text-center mt-4">
                        <svg
                            className="mx-auto mb-4 text-fg-disabled w-12 h-12"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>

                        <h3 className="mb-6 text-body">
                            Are you sure you want to delete?
                        </h3>

                        <div className="flex items-center space-x-4 justify-center">
                            <button
                                type="button"
                                className="text-white bg-danger hover:bg-danger-strong border border-transparent rounded-base px-4 py-2.5"
                                onClick={onConfirm}
                            >
                                Yes, I'm sure
                            </button>

                            <button
                                type="button"
                                className="text-body bg-neutral-secondary-medium hover:bg-neutral-tertiary-medium border border-default-medium rounded-base px-4 py-2.5"
                                onClick={onCancel}
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dialog;
