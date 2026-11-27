import { Link } from "@tanstack/react-router";
import { STOREFRONT_CATEGORIES } from "~/features/shop/data/storefront";

export function CategoryGrid() {
  const categories = STOREFRONT_CATEGORIES;

  return (
    <section
      aria-label="Kategori pilihan cepat"
      className="mx-auto max-w-7xl px-4 pt-6 sm:px-6"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-base font-bold tracking-tight text-[#1C1917]">
          Kategori Pilihan Cepat
        </h2>
        <Link
          to="/categories"
          className="text-xs font-semibold text-[#BE185D] underline-offset-4 hover:text-[#9D174D] hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE185D]"
        >
          Lihat Semua Kategori
        </Link>
      </div>
      <ul className="grid grid-cols-4 gap-3 sm:grid-cols-8">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              to="/katalog"
              search={
                category.catalogCategory
                  ? { category: category.catalogCategory }
                  : {}
              }
              aria-label={`Jelajahi kategori ${category.name}`}
              className="group flex flex-col items-center gap-1.5 rounded-xl py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE185D]"
            >
              <span className="h-14 w-14 overflow-hidden rounded-full ring-2 ring-[#EAE2DE] transition-all group-hover:ring-[#BE185D] sm:h-16 sm:w-16">
                <img
                  src={category.image}
                  alt=""
                  width={400}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </span>
              <span className="text-center text-[11px] leading-tight font-medium text-[#1C1917] group-hover:text-[#BE185D]">
                {category.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
