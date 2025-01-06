import { getCategories, getProducts } from '@/actions/products-data';
import Header from '@/components/Header';
import ShopComp from '@/components/ShopComp';
import axios from 'axios';

export default async function Products() {

  const products = await getProducts()
  const cats = await getCategories()

    if (products.length === 0) {
      return (
        <div className="p-8">
          <Header title="محصولات" />
          <p className="text-center p-10">هنوز محصولی موجود نیست</p>
        </div>
      );
    }

    return (
      <div className="py-8">
        <Header title="محصولات" />
        <ShopComp data={products} cats={cats} />
      </div>
    );
  }