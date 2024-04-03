'use client'
import { DeleteProductById, EditProductStatusById, GetAllProducts, GetProductById } from '@/api/ProductApis';
import CustomBreadcrumbs from '@/components/common/CustomBreadcrumbs';
import CustomCardCounts from '@/components/common/CustomCardCounts';
import useCustomNotification from '@/components/hooks/useCustomNotification';
import { ProductColumns } from '@/components/tables/CustomTableColumns';
import ProductsTableWithAction from '@/components/tables/ProductsTableWithAction';
import { CommonStatus } from '@/models/enums/CommonStatus';
import { ProductViewModel } from '@/models/interfaces/viewmodels/product/ProductViewModel'
import { CustomBreadcrumbsPage } from '@/models/props/CustomBreadcrumbsProps';
import { CustomCardCount } from '@/models/props/CustomCardCountProps';
import { Result } from '@/models/response/Result';
import React, { useEffect, useState } from 'react'
import { ConvertErrorToString } from '../../utils/ConversionHelper';
import ProductFormDrawer from '@/components/drawers/ProductFormDrawer';
import { EditProductStatusByIdDto } from '@/models/interfaces/dtos/product/EditProductStatusByIdDto';

const page = () => {
    
    // Hooks
    const [products, setProducts] = useState<ProductViewModel[]>([]);
    const [isTableLoading, setIsTableLoading] = useState<boolean>(true);
    const [isRequiresReload, setIsRequiresReload] = useState<boolean>(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { notification, showNotification } = useCustomNotification('bottomLeft');

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
            showNotification('error', res.response === undefined ? res.message : ConvertErrorToString(res.response.data.error));
        })
        .finally(() => {
            setIsTableLoading(false);
        });
    }
    const onEditActionClick = (id:string) => {
        setSelectedProductId(id);
        setIsModalOpen(true);
    }
    const onEditStatusActionClick = (id:string, newStatus:CommonStatus) => {
        let request:EditProductStatusByIdDto = { newStatus: newStatus }
        EditProductStatusById(id, request)
        .then((res:Result<string>) => {
            if(res.isSuccess) {
                showNotification('success', res.data!);
                setIsRequiresReload(true);
            }
        })
        .catch((res:any) => {
            showNotification('error', res.response === undefined ? res.message : ConvertErrorToString(res.response.data.error));
        });
    }
    const onDeleteActionClick = (id:string) => {
        DeleteProductById(id)
        .then((res:Result<string>) => {
            if(res.isSuccess) {
                showNotification('success', res.data!);
                setIsRequiresReload(true);
            }
        })
        .catch((res:any) => {
            showNotification('error', res.response === undefined ? res.message : ConvertErrorToString(res.response.data.error));
        });
    }
    const onAddActionClick = () => {
        setSelectedProductId(null);
        setIsModalOpen(true);
    }
    const onModalClose = () => {
        setSelectedProductId(null);
        setIsModalOpen(false);
    }
    
    // Effects
    useEffect(() => {
        fetchAllProductsFromApi();
    }, [])

    useEffect(() => {
        if(isRequiresReload) {
            fetchAllProductsFromApi();
            setIsRequiresReload(false);    
        }
    }, [isRequiresReload])

    return (
        <>
            <div className='p-10'>
                <CustomBreadcrumbs pages={productPages} />
                <CustomCardCounts title='Summary' cards={productCards} isLoading={isTableLoading} />
                <ProductsTableWithAction title='Products'
                                         data={products}
                                         columns={ProductColumns}
                                         isLoading={isTableLoading}
                                         onEditActionClickedHandler={onEditActionClick}
                                         onEditStatusActionClickedHandler={onEditStatusActionClick}
                                         onDeleteActionClickedHandler={onDeleteActionClick}
                                         onAddActionClickedHandler={onAddActionClick} />
            </div>
            <ProductFormDrawer productId={selectedProductId}
                              isOpen={isModalOpen} 
                              setIsRequiresReloadHandler={setIsRequiresReload}
                              showNotificationHandler={showNotification}
                              onModalCloseHandler={onModalClose} />
            {notification}
        </>
    );
}

export default page