export interface CustomCardCountProps {
    cards: CustomCardCount[],
    isLoading: boolean,
}

export interface CustomCardCount {
    title : string,
    count: string | number
}