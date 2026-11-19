import Link from "next/link";
import { Icon } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="page-hero not-found">
      <div className="container page-hero-inner">
        <p className="eyebrow">Помилка 404</p>
        <h1 className="page-title">
          Тут ще <span className="red">не змонтовано</span>
        </h1>
        <p className="page-lead">Такої сторінки немає. Подивіться каталог систем або фото готових об’єктів.</p>
        <div className="page-hero-actions">
          <Link className="btn btn-red btn-lg" href="/systemy">
            Каталог систем <Icon name="arrow" size={18} />
          </Link>
          <Link className="btn btn-outline btn-lg" href="/portfolio">
            Портфоліо
          </Link>
        </div>
      </div>
    </section>
  );
}
