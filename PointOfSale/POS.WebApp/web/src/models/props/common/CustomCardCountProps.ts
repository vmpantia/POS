export interface CustomCardCountProps {
    title:string,
    cards: CustomCardCount[],
    isLoading: boolean,
}

export interface CustomCardCount {
    title : string,
    count: string | number
}