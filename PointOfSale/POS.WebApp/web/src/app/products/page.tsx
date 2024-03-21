'use client'
import { GetAllProducts } from '@/api/ProductApis';
import CustomTable from '@/components/table/CustomTable';
import { ProductColumns } from '@/components/table/CustomTableColumns';
import { ProductViewModel } from '@/models/interfaces/product/ProductViewModel'
import { Result } from '@/models/response/Result';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useState } from 'react'

const page = () => {

    // Hooks
    const [products, setProducts] = useState<ProductViewModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Functions
    const GetAllProductsFromApi = () => {
        setIsLoading(true);
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
            setIsLoading(false);
        });
    }
    
    useEffect(() => {
        GetAllProductsFromApi();
    }, [])

    return <CustomTable title='Products'
                        data={products}
                        columns={ProductColumns}
                        isLoading={isLoading} />
}

export default page