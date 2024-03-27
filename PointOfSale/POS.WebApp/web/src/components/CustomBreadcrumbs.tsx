import { CustomBreadcrumbsProps } from '@/models/props/CustomBreadcrumbsProps';
import React from 'react'

const CustomBreadcrumbs = ({ pages }:CustomBreadcrumbsProps) => {
    const rightArrow = 
        <svg className="rtl:rotate-180 w-3 h-3 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
        </svg>;
    
    const currentPage = (index:number, page:string) => 
        <li key={index} className="flex items-center">
            <div className="flex items-center">
                {rightArrow}
                <span className="ms-1 text-md font-bold md:ms-2">{page}</span>
            </div>
        </li>

    const previousPage = (index:number, link: string, page:string, isFirst = false) => 
        <li key={index} className="flex items-center">
            <div className="flex items-center">
                {isFirst ? <></> : rightArrow}
                <a href={link} className="ms-1 text-md font-medium md:ms-2">{page}</a>
            </div>
        </li>

    return (
        <div className='pb-10'>
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    {pages.map((page, index) => {
                        if (index === (pages.length - 1) && page.link === null)
                            return currentPage(index, page.name);
                        
                        if(page.link === null)
                            return currentPage(index, page.name);
                        
                        return previousPage(index, page.link!, page.name, index === 0);
                    })}
                </ol>
            </nav>
        </div>
    )
}

export default CustomBreadcrumbs