import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className={styles.container}>
        {/* LEFT TEXT */}
        <div className={styles.left}>
          <h1>
            Comprehensive Technology Solutions <br />
            to Empower Your Business Growth
          </h1>

          <p>
            A leading Software-as-a-Service solution built on cloud technology
            to enhance revenue, streamline operations, and deliver exceptional
            user experiences.
          </p>

          <div className={styles.buttons}>
            <Link to="/docs/" className={styles.primary}>
              View Documentation
            </Link>
          </div>
        </div>

        {/* RIGHT GRID IMAGE */}
        <div className={styles.right}>
          <img src="\img\main-picture.png" alt="main" />
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description="Guestpro Documentation">
      <main>
        <HomepageFeatures />
      </main>
      <HomepageHeader />
    </Layout>
  );
}
