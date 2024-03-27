import React from 'react'
import CustomModal from './CustomModal'
import { ProductFormModalProps } from '@/models/props/modals/ProductFormModalProps'
import CustomInputText from '../inputs/CustomInputText'
import CustomActionButton from '../actions/CustomActionButton'
import { ButtonType } from '@/models/enums/ButtonType'
import CustomInputTextArea from '../inputs/CustomInputTextArea'
import CustomSelectionBox from '../inputs/CustomSelectionBox'
import { EditProductById } from '@/api/ProductApis'
import { EditProductByIdDto } from '@/models/interfaces/dtos/product/EditProductByIdDto'
import { Result } from '@/models/response/Result'

const ProductFormModal = ({product, isNew, setProduct, isOpen, onModalCloseHandler, setIsRequiresReload, categories} : ProductFormModalProps) => {

    // Functions
    const onProductValueChange = (input:any) => {
        let property = input.target.id.split("_")[0];
        let value = input.target.value;
        setProduct((data:any) => { return {...data, [property]: value} });
    }
    const onCategoryValueChange = (input:any) => {
        let value = input.target.value;
        let selectedValue = categories.filter(data => data.id == value)[0];
        setProduct((data:any) => { return {...data, category: selectedValue} });
    }
    const onSaveActionClick = () => {
        // Prepare request
        let request:EditProductByIdDto = {
            categoryId: product.category.id,
            name: product.name,
            description: product.description
        };
        EditProductById(product.id, request)
        .then((res:Result<string>) => {
            if(res.isSuccess) {
                onModalCloseHandler();
                setIsRequiresReload(true);
            }
        });
    }
    
    return (
        <CustomModal title={isNew ? "New Product" : `Edit Product [${product.code}]`} isOpen={isOpen} onClose={onModalCloseHandler}>
            <CustomInputText id='name' label='Name' value={product.name} placeholder='Type Product Name' isRequired={true} onValueChangedHandler={onProductValueChange} />
            <CustomSelectionBox id='category' label='Category' data={categories} value={product.category.id} isRequired={true} onSelectedValueChangedHandler={onCategoryValueChange} />
            <CustomInputTextArea id='description' label='Description' value={product.description} placeholder='Type Product Description' isRequired={false} onValueChangedHandler={onProductValueChange}  />
            <div className='flex gap-4 columns-2 w-full'>
                <CustomActionButton title='Save'
                                    type={ButtonType.Primary}
                                    onButtonClickHandler={onSaveActionClick}/>
                <CustomActionButton title='Cancel'
                                    type={ButtonType.Secondary}
                                    onButtonClickHandler={onModalCloseHandler}/>
            </div>    
        </CustomModal>
    )
}

export default ProductFormModal