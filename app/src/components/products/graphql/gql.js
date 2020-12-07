import {gql} from '@apollo/client';

const PRODUCTS = gql`
    query productsQuery(
        $name: String,
        $category_id: ID,
        $featured: Int,
        $new: Int,
        $min: Int,
        $max: Int,
        $page: Int
    ) {
        products(filter: {
            name: $name,
            category_id: $category_id,
            is_featured: $featured,
            is_new: $new,
            min: $min,
            max: $max,
            page: $page
        }) {
            products {
                id
                name
                price
                old_price
                short_text
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