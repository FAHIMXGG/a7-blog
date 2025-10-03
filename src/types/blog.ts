export type Blog = {
    _id: string
    title: string
    content: string
    excerpt?: string
    tags?: string[]
    categories?: string[]
    isFeatured?: boolean
    createdAt?: string
    updatedAt?: string
    }
    
    
    export type BlogCreateInput = {
    title: string
    content: string
    excerpt?: string
    tags?: string[]
    categories?: string[]
    isFeatured?: boolean
    }
    
    
    export type BlogUpdateInput = Partial<BlogCreateInput> & { title?: string }