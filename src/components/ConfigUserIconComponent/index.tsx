import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef } from "react";

const ConfigUserIcon_Dropdown: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => { document.removeEventListener("mousedown", handleClickOutside)}
    }, [onClose])

    return (
        <motion.div
            ref={dropdownRef}
            className="absolute right-0 mt-3 w-80 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-50 origin-top-right"
            initial={{ scale: 0.9, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <div className="flex-col pb-2 mb-2 border-b border-gray-200">
               <h4 className="font-semibold text-gray-800">Menu de Configurações</h4>
               <div className='flex flex-col items-start justify-around'>
                 <button className="text-xs text-blue-500 hover:text-blue-700 transition-colors py-2">Modo Noturno</button>
                 <button className="text-xs text-blue-500 hover:text-blue-700 transition-colors py-2">Modo Noturno</button>
                 <button className="text-xs text-blue-500 hover:text-blue-700 transition-colors py-2">Modo Noturno</button>
               </div>
            </div>
        </motion.div>
    )
}

export default ConfigUserIcon_Dropdown