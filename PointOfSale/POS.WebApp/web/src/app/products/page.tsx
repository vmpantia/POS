'use client'
import { GetAllCategoryLites } from '@/api/CategoryApis';
import { DeleteProductById, GetAllProducts, GetProductById } from '@/api/ProductApis';
import CustomBreadcrumbs from '@/components/CustomBreadcrumbs';
import CustomCardCounts from '@/components/CustomCardCounts';
import useCustomNotification from '@/components/hooks/useCustomNotification';
import ProductFormModal from '@/components/modals/ProductFormModal';
import { ProductColumns } from '@/components/tables/CustomTableColumns';
import ProductsTableWithAction from '@/components/tables/ProductsTableWithAction';
import { DefaultProductViewModel } from '@/data/DefaultProductViewModel';
import { CommonStatus } from '@/models/enums/CommonStatus';
import { CategoryLiteViewModel } from '@/models/interfaces/viewmodels/category/CategoryLiteViewModel';
import { ProductViewModel } from '@/models/interfaces/viewmodels/product/ProductViewModel'
import { CustomBreadcrumbsPage } from '@/models/props/CustomBreadcrumbsProps';
import { CustomCardCount } from '@/models/props/CustomCardCountProps';
import { Result } from '@/models/response/Result';
import React, { useEffect, useState } from 'react'
import { ConvertErrorToString } from '../../utils/ConversionHelper';

const page = () => {
    
    // Hooks
    const [products, setProducts] = useState<ProductViewModel[]>([]);
    const [isTableLoading, setIsTableLoading] = useState<boolean>(true);
    const [isRequiresReload, setIsRequiresReload] = useState<boolean>(false);
    const [product, setProduct] = useState<ProductViewModel>(DefaultProductViewModel);
    const [categories, setCategories] = useState<CategoryLiteViewModel[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isNew, setIsNew] = useState<boolean>(true);
    const { notification, ShowNotification } = useCustomNotification('bottomLeft');

    // Component Configurations
    const productCards : CustomCardCount[] = [
        { title: 'All', count: isTableLoading ? '-' : products.length },
        { title: 'Active', count: isTableLoading ? '-' : products.filter(prod => prod.status === CommonStatus.Active).length },
        { title: 'Inactive', count: isTableLoading ? '-' : products.filter(prod => prod.status === CommonStatus.Inactive).length },
    ]
    const productPages : CustomBreadcrumbsPage[] = [
        { link: 'http://localhost:3000/', name: 'Home' },
        { link: null, name: 'Products' },
    ] 

    // Functions
    const fetchAllProductsFromApi = () => {
        setIsTableLoading(true);
        GetAllProducts()
        .then((res:Result<ProductViewModel[]>) => {
            if(res.isSuccess) setProducts(res.data!);
        })
        .catch((res:any) => {
            ShowNotification('error', ConvertErrorToString(res.response.data.error));
        })
        .finally(() => {
            setIsTableLoading(false);
        });
    }
    const fetchProductByIdFromApi = (id:string) => {
        GetProductById(id!)
        .then((res:Result<ProductViewModel>) => {
            if(res.isSuccess) setProduct(res.data!);
        })
        .catch((res:any) => {
            ShowNotification('error', ConvertErrorToString(res.response.data.error));
        });
    }
    const fetchAllCategoryLitesFromApi = () => {
        GetAllCategoryLites()
        .then((res:Result<CategoryLiteViewModel[]>) => {
            if(res.isSuccess) setCategories(res.data!);
        })
        .catch((res:any) => {
            ShowNotification('error', ConvertErrorToString(res.response.data.error));
        });
    }
    const onEditActionClick = (id:string) => {
        fetchProductByIdFromApi(id);
        setIsNew(false);
        setIsModalOpen(true);
    }
    const onDeleteActionClick = (id:string) => {
        DeleteProductById(id)
        .then((res:Result<string>) => {
            if(res.isSuccess) {
                ShowNotification('success', res.data!);
                setIsRequiresReload(true);
            }
        })
        .catch((res:any) => {
            ShowNotification('error', ConvertErrorToString(res.response.data.error));
        });
    }
    const onModalClose = () => {
        setProduct(DefaultProductViewModel);
        setIsModalOpen(false);
    }
    
    // Effects
    useEffect(() => {
        fetchAllProductsFromApi();
        fetchAllCategoryLitesFromApi();
    }, [])

    useEffect(() => {
        if(isRequiresReload) {
            fetchAllProductsFromApi();
            fetchAllCategoryLitesFromApi();
            setIsRequiresReload(false);    
        }
    }, [isRequiresReload])

    return (
        <>
            <div className='p-10'>
                <CustomBreadcrumbs pages={productPages} />
                <CustomCardCounts cards={productCards} isLoading={isTableLoading} />
                <ProductsTableWithAction title='Products'
                                         data={products}
                                         columns={ProductColumns}
                                         isLoading={isTableLoading}
                                         onEditActionClickedHandler={onEditActionClick}
                                         onDeleteActionClickedHandler={onDeleteActionClick} />
            </div>
            <ProductFormModal product={product}
                              isNew={isNew}
                              setProduct={setProduct}
                              isOpen={isModalOpen} 
                              onModalCloseHandler={onModalClose}
                              setIsRequiresReload={setIsRequiresReload}
                              categories={categories} />
            {notification}
        </>
    );
}

export default page