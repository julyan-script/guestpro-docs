import React from 'react';
import styles from './styles.module.css';

type FooterItem = {
  label: string;
  sub?: string;
  href?: string;
};

type FooterSection = {
  title: string;
  items: FooterItem[];
};

type FooterProps = {
  sections: FooterSection[];
};

export default function Footer({ sections = [] }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer__inner">

        <div className="footer__links">

          {sections?.map((section, i) => (
            <div key={i} className="footer__col">
              <div className="footer__title">{section.title}</div>

              <div className="footer__items">
                {section.items.map((item, j) => (
                  <a
                    key={j}
                    href={item.href || '#'}
                    className="footer__link-item"
                  >
                    {item.label}
                    {item.sub && `\n${item.sub}`}
                  </a>
                ))}
              </div>

            </div>
          ))}

        </div>

        <div className="footer__bottom">
          © 2026 Your Company. All rights reserved.
        </div>

      </div>
    </footer>
  );
}