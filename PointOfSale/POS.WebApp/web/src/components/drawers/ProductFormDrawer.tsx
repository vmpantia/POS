import React, { useEffect, useState } from 'react'
import { ProductFormModalProps } from '@/models/props/modals/ProductFormModalProps'
import { Drawer } from 'antd'
import CustomFieldText from '../fields/CustomFieldText'
import CustomFieldTextArea from '../fields/CustomFieldTextArea'
import CustomFieldSelectionBox from '../fields/CustomFieldSelectionBox'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ProductViewModel } from '@/models/interfaces/viewmodels/product/ProductViewModel'
import { ConvertErrorToString } from '@/utils/ConversionHelper'
import { AddProduct, EditProductById, GetProductById } from '@/api/ProductApis'
import { Result } from '@/models/response/Result'
import { GetAllCategoryLites } from '@/api/CategoryApis'
import { CategoryLiteViewModel } from '@/models/interfaces/viewmodels/category/CategoryLiteViewModel'
import { EditProductByIdDto } from '@/models/interfaces/dtos/product/EditProductByIdDto'
import { AddProductDto } from '@/models/interfaces/dtos/product/AddProductDto'
import CustomActionButton from '../actions/CustomActionButton'

const ProductFormDrawer = ({ productId, 
                            isOpen, 
                            setIsRequiresReloadHandler, 
                            showNotificationHandler, 
                            onModalCloseHandler } : ProductFormModalProps) => {
                                
    // Check if the transaction will be new or edit
    const isNew = !productId;

    // Hooks
    const [product, setProduct] = useState<ProductViewModel>();
    const [categories, setCategories] = useState<CategoryLiteViewModel[]>([]);
    const {
        register, 
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting } 
    } = useForm<EditProductByIdDto | AddProductDto>();

    // Functions
    const fetchProductByIdFromApi = (id:string) => {
        GetProductById(id!)
        .then((res:Result<ProductViewModel>) => {
            if(res.isSuccess) {
                setValue('categoryId', res.data!.category.id);
                setValue('name', res.data!.name);
                setValue('description', res.data?.description);
                setProduct(res.data!);
            } 
        })
        .catch((res:any) => {
            showNotificationHandler('error', res.response === undefined ? res.message : ConvertErrorToString(res.response.data.error));
        });
    }
    const fetchAllCategoryLitesFromApi = () => {
        GetAllCategoryLites()
        .then((res:Result<CategoryLiteViewModel[]>) => {
            if(res.isSuccess) setCategories(res.data!);
        })
        .catch((res:any) => {
            showNotificationHandler('error', res.response === undefined ? res.message : ConvertErrorToString(res.response.data.error));
        });
    }
    const onSubmit: SubmitHandler<EditProductByIdDto | AddProductDto> = async (data) => {
        (isNew ? AddProduct(data) : 
                 EditProductById(product!.id, data))
        .then((res:Result<string>) => {
            if(res.isSuccess) {
                showNotificationHandler('success', res.data!);
                setIsRequiresReloadHandler(true);
                onModalCloseHandler();
            }
        })
        .catch((res:any) => {
            showNotificationHandler('error', res.response === undefined ? res.message : ConvertErrorToString(res.response.data.error));
        });
    };

    useEffect(() => {
        // Always reset and fetch required data when opening modal
        if(isOpen) {
            reset();
            fetchAllCategoryLitesFromApi();
            if (!isNew) fetchProductByIdFromApi(productId);
        }
    }, [isOpen]);
    
    return (
        <Drawer title={isNew ? "New Product" : `Edit Product [${product?.code}]`} onClose={onModalCloseHandler} open={isOpen}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomFieldText 
                    id='name' 
                    label='Name' 
                    type='text' 
                    placeholder='Type Product Name' 
                    optional={false} 
                    error={errors.name} 
                    register={register('name', {
                        required: "Product name is required.",
                        maxLength: {
                            value: 50,
                            message: "Product name must be 50 characters."
                        }
                    })} />
                <CustomFieldSelectionBox
                    id='category'
                    label='Category'
                    placeholder='Select Product Category'
                    optional={false}
                    data={categories}
                    error={errors.categoryId} 
                    register={register('categoryId', {
                        required: "Product category is required."
                    })} />
                <CustomFieldTextArea 
                    id='description' 
                    label='Description' 
                    placeholder='Type Product Description' 
                    optional={true} 
                    error={errors.description}
                    register={register('description')} />
                <div className='flex gap-4 columns-2 w-full'>
                    <CustomActionButton 
                        label={isSubmitting ? "Loading..." : "Save"} 
                        type="submit"
                        style="primary"
                        disabled={isSubmitting} />
                    <CustomActionButton label='Cancel'
                                        type="button"
                                        style="danger"
                                        onButtonClickHandler={onModalCloseHandler}/>
                </div>
            </form>
        </Drawer>
    )
}

export default ProductFormDrawer