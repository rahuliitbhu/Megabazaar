import {gql} from "@apollo/client"

export const GET_ALL_PRODUCTS=gql`query Products($pagination: PaginationArg) {
  products(pagination: $pagination) {
    data {
      id
      attributes {
        Name
        Price
        Discription
        Images {
          data {
            attributes {
              url
            }
          }

        }

      }
    }
    meta {
      pagination {
        pageCount
      }
    }
  }
}`


  


export const GET_PRODUCT_BY_ID = gql`query getProductbyId($productId: ID) {
  product(id: $productId) {
    data {
      id
      attributes {
        Name
        Discription
        Price
        Images {
          data {
            id
            attributes {
              url
            }
          }
        }
      }
    }
  }
}`

  

  export const GET_CATEGORY = gql`query Categories {
    categories {
      data {
        id
        attributes {
          Name
        }
      }
    }
  }`


  export const GET_CATEGORY_BY_ID = gql`
  query Category($categoryId: ID) {
    category(id: $categoryId) {
      data {
        id
        attributes {
          Name
          products {
            data {
              id
              attributes {
                Name
                Discription
                Price
                Images {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `
  
  export const SEARCH_PRODUCT_BY_NAME=gql`
  
  query Products($filters: ProductFiltersInput) {
    products(filters: $filters) {
       data {
         id
          attributes {
            Name
          }
       }
    }
  }
  `