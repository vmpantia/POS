import React from 'react'
import CustomModal from './CustomModal'
import { ProductFormModalProps } from '@/models/props/modals/ProductFormModalProps'
import CustomInputText from '../inputs/CustomInputText'

const ProductFormModal = ({product, setProduct, isOpen, onModalCloseHandler} : ProductFormModalProps) => {

    // Functions
    const onProductValueChange = (input:any) => {
        let property = input.target.id.split("_")[0];
        let value = input.target.value;
        setProduct((data:any) => { return {...data, [property]: value} });
    }

    return (
        <CustomModal title={product === null ? "New Product" : "Edit Product"} isOpen={isOpen} onClose={onModalCloseHandler}>
            <CustomInputText id='name' label='Name' value={product?.name} placeholder='Type Product Name' isRequired={true} onValueChangedHandler={onProductValueChange} />
            <CustomInputText id='code' label='Code' value={product?.code} placeholder='Type Product Code' isRequired={true} onValueChangedHandler={onProductValueChange} />
            <CustomInputText id='category' label='Category' value={product?.category?.name} placeholder='Type Product Category' isRequired={true} onValueChangedHandler={onProductValueChange} />
            <CustomInputText id='description' label='Description' value={product?.description} placeholder='Type Product Description' isRequired={false} onValueChangedHandler={onProductValueChange}  />
        </CustomModal>
    )
}

export default ProductFormModal