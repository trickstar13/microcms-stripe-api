import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import Result from '../components/Result';
import { useMicrocms } from '../hooks/useMicrocms';
import { useSearch } from '../hooks/useSearch';
import styles from '../styles/index.module.css';

const Index: NextPage = () => {
  const [data, selectData] = useMicrocms();

  const [query, setQuery] = useState<string>('');
  const [result, error, loading, search] = useSearch(query);

  const onKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        search();
      }
    },
    [search]
  );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.selected}>
          {data ? (
            <>
              <div className={styles.selectedImage}>
                {data.images[0] && (
                  <Image
                    src={data.images[0]}
                    layout={'fill'}
                    alt=''
                  />
                )}
              </div>
              <p className={styles.title}>ID: {data.id}</p>
              <p className={styles.title}>{data.name}</p>
            </>
          ) : (
            <p>選択中のアイテムがありません</p>
          )}
        </div>
        <div className={styles.search}>
          <div className={styles.form}>
            <input
              type='text'
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              className={styles.input}
            />
            <button onClick={search} className={styles.button}>
              検索
            </button>
          </div>
          <div className={styles.result}>
            <Result
              result={result}
              error={error}
              loading={loading}
              selectData={selectData}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
