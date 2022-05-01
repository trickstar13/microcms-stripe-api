import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripeApiKey = process.env.STRIPE_API_KEY || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { keyword }
  } = req;

  // キーワードからクエリを作る
  const query = keyword ? `active:'true' AND name~"${keyword}"`: "active:'true'";

  // Stripe SDKをセットアップする
  const stripe = new Stripe(stripeApiKey, {
    apiVersion: '2020-08-27',
    maxNetworkRetries: 3
  });

  try {
    // 商品データを取得する
    const products = await stripe.products.search({
      query
    });
    // 商品の価格データを取得する
    await Promise.all(products.data.map(async (product, i) => {
      // @ts-ignore
      products.data[i].prices = await stripe.prices.list({
        product: product.id
      });
    }));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error);
  }
}
