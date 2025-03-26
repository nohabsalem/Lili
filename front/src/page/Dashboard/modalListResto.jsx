// const modalListResto = ({
//     open,
//     onClose,
//     title,
//     children,
//     onConfirm,
//     confirmText = "Confirmer",
//     cancelText = "Annuler" }) => {
//         if (!open) return null;

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//                 <h2 className="text-lg font-bold">{title}</h2>
//                 <div className="mt-4">{children}</div>
//                 <div className="mt-4 flex justify-end gap-2">
//                     <button onClick={onClose} className="bg-gray-300 px-3 py-1 rounded">{cancelText}</button>
//                     {onConfirm && <button onClick={onConfirm} className="bg-red-500 text-white px-3 py-1 rounded">{confirmText}</button>}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default modalListResto;