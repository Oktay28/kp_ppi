import {gql} from '@apollo/client';

const PRODUCTS = gql`
    query productsQuery(
        $name: String,
        $category: ID,
        $featured: Int,
        $new: Int,
        $min: Int,
        $max: Int,
        $page: Int,
        $discount: Int
    ) {
        products(filter: {
            name: $name,
            category_id: $category,
            is_featured: $featured,
            is_new: $new,
            min: $min,
            max: $max,
            page: $page,
            discount: $discount
        }) {
            products {
                id
                name
                price
                old_price
                short_text
                is_featured
                image
            }
            count
        }
    }
`;

const CATEGORIES = gql`
    query {
        categories {
            id
            name
        }
    }
`;

export {
    PRODUCTS,
    CATEGORIES
}