import React from 'react'
import CustomModal from './CustomModal'
import { ProductFormModalProps } from '@/models/props/modals/ProductFormModalProps'
import CustomInputText from '../inputs/CustomInputText'

const ProductFormModal = ({product, isOpen, onClose} : ProductFormModalProps) => {
    return (
        <CustomModal title={product === null ? "New Product" : "Edit Product"} isOpen={isOpen} onClose={onClose}>
            <CustomInputText id='name' label='Name' value={product?.name} placeholder='Type Product Name' isRequired={true} />
            <CustomInputText id='code' label='Code' value={product?.code} placeholder='Type Product Code' isRequired={true} />
            <CustomInputText id='category' label='Category' value={product?.category?.name} placeholder='Type Product Category' isRequired={true} />
            <CustomInputText id='description' label='Description' value={product?.description} placeholder='Type Product Description' isRequired={false} />
            <CustomInputText id='description' label='Description' value={product?.description} placeholder='Type Product Description' isRequired={false} />
            <CustomInputText id='description' label='Description' value={product?.description} placeholder='Type Product Description' isRequired={false} />
            <CustomInputText id='description' label='Description' value={product?.description} placeholder='Type Product Description' isRequired={false} />
            <CustomInputText id='description' label='Description' value={product?.description} placeholder='Type Product Description' isRequired={false} />
            <CustomInputText id='description' label='Description' value={product?.description} placeholder='Type Product Description' isRequired={false} />
        </CustomModal>
    )
}

export default ProductFormModal