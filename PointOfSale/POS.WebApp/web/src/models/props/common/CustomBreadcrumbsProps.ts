export interface CustomBreadcrumbsProps {
    pages : CustomBreadcrumbsPage[]
}

export interface CustomBreadcrumbsPage {
    link:string | null,
    name:string
}