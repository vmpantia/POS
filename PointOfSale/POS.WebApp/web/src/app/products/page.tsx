'use client'
import { DeleteProductById, GetAllProducts } from '@/api/ProductApis';
import CustomBreadcrumbs from '@/components/CustomBreadcrumbs';
import CustomCardCounts from '@/components/CustomCardCounts';
import ProductFormModal from '@/components/modals/ProductFormModal';
import { ProductColumns } from '@/components/tables/CustomTableColumns';
import ProductsTableWithAction from '@/components/tables/ProductsTableWithAction';
import { CommonStatus } from '@/models/enums/CommonStatus';
import { ProductViewModel } from '@/models/interfaces/product/ProductViewModel'
import { CustomBreadcrumbsPage } from '@/models/props/CustomBreadcrumbsProps';
import { CustomCardCount } from '@/models/props/CustomCardCountProps';
import { Result } from '@/models/response/Result';
import React, { useEffect, useState } from 'react'

const page = () => {

    // Hooks
    const [products, setProducts] = useState<ProductViewModel[]>([]);
    const [isTableLoading, setIsTableLoading] = useState<boolean>(true);
    const [isRequiresReload, setIsRequiresReload] = useState<boolean>(false);

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
            if(res.isSuccess)
                setProducts(res.data!);
            else
                console.log(`${res.error!.code} | ${res.error!.type} | ${res.error!.description}`);
        })
        .catch((err:any) => {
            console.log(err);
        })
        .finally(() => {
            setIsTableLoading(false);
        });
    }
    const handleTableEditAction = (id:string) => {
        console.log(id);
    }
    const handleTableDeleteAction = (id:string) => {
        DeleteProductById(id)
        .then((res:Result<string>) => {
            if(res.isSuccess) {
                setIsRequiresReload(true);
                console.log(res.data!);
            }
            else
                console.log(`${res.error!.code} | ${res.error!.type} | ${res.error!.description}`);
        })
        .catch((err:any) => {
            console.log(err);
        });
    }
    
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
        <div className='p-10'>
            <ProductFormModal />
            <CustomBreadcrumbs pages={productPages} />
            <CustomCardCounts cards={productCards} isLoading={isTableLoading} />
            <ProductsTableWithAction title='Products'
                                     data={products}
                                     columns={ProductColumns}
                                     isLoading={isTableLoading}
                                     onEditActionClicked={handleTableEditAction}
                                     onDeleteActionClicked={handleTableDeleteAction} />
        </div>
    );
}

export default page