import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';
import Footer from '../theme/Footer';

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className={styles.container}>
        
        {/* LEFT TEXT */}
        <div className={styles.left}>
          <h1>
            Solusi Teknologi Terlengkap <br />
            untuk Mengembangkan Bisnis Anda
          </h1>

          <p>
            Solusi Software-as-a-Service terbaik berbasis cloud untuk meningkatkan
            pendapatan, merampingkan operasional, sampai memberikan pengalaman
            yang tak terlupakan.
          </p>

          <div className={styles.buttons}>
            <button className={styles.primary}>
              Coba Gratis Selama 14 Hari
            </button>
            <button className={styles.secondary}>
              Whatsapp Kami Sekarang!
            </button>
          </div>
        </div>

        {/* RIGHT GRID IMAGE */}
        <div className={styles.right}>
          <div className={styles.grid}>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
            <div className={styles.boxTall}></div>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
            <div className={styles.boxWide}></div>
          </div>
        </div>

      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const footerData = [
  {
    title: "Produk Kami",
    items: [
      {
        label: "GuestPro Cloud PMS",
        sub: "Integrated Cloud Property Management System",
        href: "/docs",
      },
      {
        label: "Booking Engine",
        sub: "Direct Booking Website",
        href: "/docs",
      },
    ],
  },
  {
    title: "Hubungi Kami",
    items: [
      {
        label: "Kantor Pusat",
        sub: "Jakarta, Indonesia",
      },
      {
        label: "WhatsApp",
        sub: "+62 812 xxxx",
        href: "https://wa.me/62812xxxx",
      },
    ],
  },
];
  return (
    <Layout
      title={siteConfig.title}
      description="Guestpro Documentation">
      <main>
        <HomepageFeatures />
      </main>
      <HomepageHeader />
      <Footer sections={footerData}/>
    </Layout>
  );
}
