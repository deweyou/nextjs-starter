import styles from "./page.module.scss";
import {getTranslations} from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('HomePage')
  return (
    <div className={styles.page}>
      {t('title')}
    </div>
  );
}
