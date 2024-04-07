'use client'
import { DeleteProductById, EditProductStatusById, GetAllProducts } from '@/api/ProductApis';
import CustomBreadcrumbs from '@/components/common/CustomBreadcrumbs';
import CustomCardCounts from '@/components/common/CustomCardCounts';
import useCustomNotification from '@/components/hooks/useCustomNotification';
import { ProductColumns } from '@/components/tables/CustomTableColumns';
import { CommonStatus } from '@/models/enums/CommonStatus';
import { ProductViewModel } from '@/models/interfaces/viewmodels/product/ProductViewModel'
import { CustomBreadcrumbsPage } from '@/models/props/common/CustomBreadcrumbsProps';
import { CustomCardCount } from '@/models/props/common/CustomCardCountProps';
import { Result } from '@/models/response/Result';
import React, { useEffect, useState } from 'react'
import { ConvertErrorToString } from '../../utils/ConversionHelper';
import { EditProductStatusByIdDto } from '@/models/interfaces/dtos/product/EditProductStatusByIdDto';
import CustomProductFormDrawer from '@/components/drawers/CustomProductFormDrawer';
import CustomProductsTableWithAction from '@/components/tables/CustomProductsTableWithAction';

const page = () => {
    
    // Hooks
    const [products, setProducts] = useState<ProductViewModel[]>([]);
    const [isTableLoading, setIsTableLoading] = useState<boolean>(true);
    const [isRequiresReload, setIsRequiresReload] = useState<boolean>(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>();
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
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
        setIsDrawerOpen(true);
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
        setIsDrawerOpen(true);
    }
    const onDrawerClose = () => {
        setSelectedProductId(null);
        setIsDrawerOpen(false);
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
            <CustomBreadcrumbs pages={productPages} />
            <CustomCardCounts title='Summary' cards={productCards} isLoading={isTableLoading} />
            <CustomProductsTableWithAction title='Products'
                                            data={products}
                                            columns={ProductColumns}
                                            isLoading={isTableLoading}
                                            onEditActionClickedHandler={onEditActionClick}
                                            onEditStatusActionClickedHandler={onEditStatusActionClick}
                                            onDeleteActionClickedHandler={onDeleteActionClick}
                                            onAddActionClickedHandler={onAddActionClick} />
            <CustomProductFormDrawer productId={selectedProductId}
                                        isOpen={isDrawerOpen} 
                                        setIsRequiresReloadHandler={setIsRequiresReload}
                                        showNotificationHandler={showNotification}
                                        onModalCloseHandler={onDrawerClose} />
            {notification}
        </>
    );
}

export default page