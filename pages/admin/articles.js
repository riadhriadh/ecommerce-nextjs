import React from 'react'
import Products from '../../components/products'
import { useQuery } from '@apollo/client';
import { PRODUCTS, SORT_PRODUCT_SECTION } from '../../apollo/client/queries';
import ProductsGrid from '../../components/productsGrid';
import offlineProducts from '../../db/offlineData/products';
import ProductItem from '../../components/productItem';

export default function articles() {
    const sortQueryResult = useQuery(SORT_PRODUCT_SECTION);
    var { data, loading, error } = useQuery(PRODUCTS, {
        variables: {
          field: sortQueryResult.data.sortProductSection[0],
          order: sortQueryResult.data.sortProductSection[1],
        },
      });

      if (loading)
      return (
        <>
          <p className="loading">Loading...</p>
          <style jsx>{`
            .loading {
              width: 100%;
              text-align: center;
              align-self: center;
              font-size: 18px;
            }
          `}</style>
        </>
      );
      if (!data?.products || error)
      return (
        <ProductsGrid>
            
          {offlineProducts.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              rating={product.rating}
              img_url={product.img_url}
              price={product.price}
            />
          ))}
        </ProductsGrid>
      );
      return (
        <ProductsGrid>
          
          {data.products.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              rating={product.rating}
              img_url={product.img_url}
              price={product.price}
            />
          ))}
        </ProductsGrid>
      );
}
