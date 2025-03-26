const Modal = ({
    open,
    onClose,
    title,
    children,
    onConfirm,
    confirmText = "Confirmer",
    cancelText = "Annuler",
    onAdd,
    modalType,
    formData,
    setFormData,
}) => {
    if (!open) return null;

    const handleAddClick = async (e) => {
        e.preventDefault();
        if (onAdd) {
            await onAdd();
        }
        onClose();
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-xl shadow-lg w-96">
                <h2 className="text-lg font-bold">{title}</h2>
                <div className="mt-4">{children}</div>
                <div className="mt-4 flex justify-end gap-2">
                    <button onClick={onClose} className="bg-gray-300 px-3 py-1 rounded">{cancelText}</button>
                    {modalType === "ajouter" && (
                        <button onClick={handleAddClick} className="bg-green-500 text-white px-3 py-1 rounded">{confirmText}</button>
                    )}
                    {onConfirm && modalType !== "ajouter" && (
                        <button onClick={onConfirm} className="bg-red-500 text-white px-3 py-1 rounded">{confirmText}</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;

