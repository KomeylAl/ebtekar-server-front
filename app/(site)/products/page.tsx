import Header from '@/components/Header';
import ShopComp from '@/components/ShopComp';
import axios from 'axios';

export default async function Products() {
  try {
    const [productsRes, catsRes] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}products`),
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}product/categories`),
    ]);

    const products = productsRes.data || [];
    const cats = catsRes.data || [];

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
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div className="p-8">
        <Header title="خطا" />
        <p className="text-center p-10">مشکلی در دریافت اطلاعات رخ داده است.</p>
      </div>
    );
  }
}
