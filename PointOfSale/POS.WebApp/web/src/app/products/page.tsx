'use client'
import { DeleteProductById, GetAllProducts } from '@/api/ProductApis';
import { ProductColumns } from '@/components/table/CustomTableColumns';
import ProductsTableWithAction from '@/components/table/ProductsTableWithAction';
import { ProductViewModel } from '@/models/interfaces/product/ProductViewModel'
import { Result } from '@/models/response/Result';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react'

const page = () => {

    // Hooks
    const [products, setProducts] = useState<ProductViewModel[]>([]);
    const [isTableLoading, setIsTableLoading] = useState<boolean>(true);
    const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [productId, setProductId] = useState<string | null>(null);
 
    // Functions
    const getAllProductsFromApi = () => {
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
        setShowModal(true);
        setProductId(id);
    }

    const handleModalCancelAction = () => {
        setShowModal(false);
        setProductId(null);
    }

    const handleModalOkAction = () => {
        // Check if productId is NULL 
        if(productId === null) return;

        setIsModalLoading(true);
        DeleteProductById(productId)
        .then((res:Result<string>) => {
            if(res.isSuccess)
                console.log(res.data!);
            else
                console.log(`${res.error!.code} | ${res.error!.type} | ${res.error!.description}`);
        })
        .catch((err:any) => {
            console.log(err);
        })
        .finally(() => {
            setIsModalLoading(false);
            handleModalCancelAction();
        });
    }
    
    useEffect(() => {
        getAllProductsFromApi();
    }, [])

    return (
        <>
            <ProductsTableWithAction title='Products'
                                            data={products}
                                            columns={ProductColumns}
                                            isLoading={isTableLoading}
                                            onEditActionClicked={handleTableEditAction}
                                            onDeleteActionClicked={handleTableDeleteAction} />
            <Modal title="Title"
                    open={showModal}
                    onOk={handleModalOkAction}
                    confirmLoading={isModalLoading}
                    onCancel={handleModalCancelAction}>
                <p>Test Test Modal</p>
            </Modal>
        </>
    );
}

export default page