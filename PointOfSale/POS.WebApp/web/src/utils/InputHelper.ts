export const CheckRequireField = (isRequired: boolean, value:any) : string | null => {
    return (isRequired && value === null || value === "" ? "This field is required." : null);
}