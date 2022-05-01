import Image from 'next/image';
import React from 'react';
import styles from '../styles/result.module.css';
import type { Item, Result } from '../types/result';

type Props = {
  result: Result;
  error: any;
  loading: boolean;
  selectData: (item: Item) => void;
};

const Index: React.VFC<Props> = ({ result, error, loading, selectData }) => {
  if (loading) {
    return (
      <div className={styles.loading}>
        <Image src='/images/icon_loading.svg' alt='' width='38' height='38' />
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.error}>
        <p>エラーが発生しました</p>
      </div>
    );
  }
  if (!(result?.data)) {
    return (
      <div className={styles.empty}>
        <p>検索結果が見つかりません</p>
      </div>
    );
  }
  return (
    <ul className={styles.lists}>
      {
        result?.data.map((item) => (
          <li
            key={item.id}
            className={styles.list}
            onClick={() => selectData(item)}
          >
            <div className={styles.image}>
              {item.images[0] && (
                <Image
                  src={item.images[0]}
                  layout={'fill'}
                  alt=''
                />
              )}
            </div>
            <div>
              <ul>
                <li>ID: {item.id}</li>
                <li>{item.name}</li>
                <li>
                  {item.prices.data.map((price) =>
                    (
                      <dl key={price.id}>
                        <dt>価格</dt>
                        <dd>
                          <span>{price.unit_amount.toLocaleString()} {price.currency.toLocaleUpperCase()}</span>
                          {price.transform_quantity ? <small>({price.transform_quantity.divide_by}アイテム毎)</small> : null}
                        </dd>
                      </dl>
                    )
                  )}
                </li>
              </ul>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default Index;
