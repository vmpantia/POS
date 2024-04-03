import { CustomCardCount, CustomCardCountProps } from '@/models/props/common/CustomCardCountProps'
import React from 'react'

const CustomCardCounts = ({ title, cards, isLoading }:CustomCardCountProps) => {
    const displayCardCount = (index:number, card:CustomCardCount) => 
        isLoading ?
            <div key={index} className="p-6 bg-white rounded-lg drop-shadow-md">
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-5 mb-5 bg-stone-200 rounded"></div>
                        <div className="h-11 bg-stone-200 rounded"></div>
                    </div>
                </div>
            </div> 
            :
            <div key={index} className="p-6 bg-white rounded-lg drop-shadow-md">
                <h5 className="mb-2 text-xl font-bold tracking-tight">{card.title}</h5>
                <h1 className="p-3 text-5xl font-bold text-center">{card.count}</h1>
            </div> 
        
    return (
        <>
            <div className='text-xl font-bold mb-5'>
                {title}
            </div>
            <div className="pb-10 grid gap-4 grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                {cards.map((card:CustomCardCount, index:number) => displayCardCount(index, card))}
            </div>
        </>
    )
}

export default CustomCardCounts