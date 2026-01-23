'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import milkIMG from '@/images/our-product/milk.png';

export default function ProductScrollSection({ subcategory, locale }) {
  const sectionRefs = useRef({});
  const [active, setActive] = useState(null);
 const gradientBgs = [
  'bg-[radial-gradient(circle_at_center,#a36ed2,#50227d)]',
  'bg-[radial-gradient(circle_at_center,#6ea8d2,#224d7d)]',
  'bg-[radial-gradient(circle_at_center,#d29c6e,#7d3e22)]',
  'bg-[radial-gradient(circle_at_center,#6ed2b1,#227d63)]',
  'bg-[radial-gradient(circle_at_center,#d26e6e,#7d2222)]',
];

const getBg = (index) =>
  gradientBgs[index % gradientBgs.length];



  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative flex">
      {/* LEFT DOT NAV */}
      <ul className="fixed hidden md:block right-6 top-[61%] -translate-y-1/2 z-50 ">
        {subcategory?.map((item) => (
          <li
            key={item.id}
            onClick={() => scrollTo(`product-${item.id}`)}
            className={`cursor-pointer flex uppercase justify-end items-center text-[11px] gap-2 transition ${
              active === `product-${item.id}`
                ? 'text-black font-semibold'
                : 'text-gray-400'
            }`}
          >
            
            {item?.attributes?.title}
            <span
              className={`w-3 h-3 rounded-full ${
                active === `product-${item.id}`
                  ? 'bg-black'
                  : 'bg-gray-300'
              }`}
            />
            
          </li>
        ))}
      </ul>

      {/* SCROLL SECTIONS */}
      <div className="w-full">
        {subcategory?.map((item, index) => {
          const imageUrl =
            item?.attributes?.image?.data?.[0]?.attributes?.url
              ? `${item.attributes.image.data[0].attributes.url}`
              : '/placeholder.png';

          return (
            <section
              key={item.id}
              id={`product-${item.id}`}
              ref={(el) => (sectionRefs.current[`product-${item.id}`] = el)}
              className={`min-h-screen flex items-center ${getBg(index)} px-6`}
            >
              <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <img
                //   src={item?.attributes?.image?.data?.[0]?.attributes?.url}
                src={milkIMG.src}
                  alt={item?.attributes?.title}
                  className="mx-auto max-h-[420px] object-contain"
                />

                <div>
                  <h2 className="absolute top-[-50px] md:left-[50%] text-6xl text-[#fff] opacity-[.4] font-bold mb-6">
                    {item?.attributes?.title}
                  </h2>

                  <Link
                    href={`/${locale}/our-product/${item.id}`}
                    className="inline-flex items-center gap-2 border border-[#fff] px-6 py-3 hover:bg-black hover:text-white transition"
                  >
                    Explore more →
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
