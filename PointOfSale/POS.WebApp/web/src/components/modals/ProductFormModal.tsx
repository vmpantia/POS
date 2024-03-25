import React, { useEffect, useState } from 'react'
import CustomModal from './CustomModal'
import { ProductFormModalProps } from '@/models/props/modals/ProductFormModalProps'

const ProductFormModal = ({product, isOpen, onClose} : ProductFormModalProps) => {
    return (
        <CustomModal title={product === null ? "New Product" : "Edit Product"} isOpen={isOpen} onClose={onClose}>
            <input placeholder='Type Product Name'></input>
            <input placeholder='Type Product Name'></input>
            <input placeholder='Type Product Name'></input>
            <input placeholder='Type Product Name'></input>
        </CustomModal>
    )
}

export default ProductFormModal