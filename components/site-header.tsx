import Link from "next/link";

const links = [
  ["Orientador", "/orientador"],
  ["Etapas", "/etapas"],
  ["Problemas frecuentes", "/problemas"],
  ["Fuentes", "/fuentes"],
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-row">
        <Link className="brand" href="/">
          <span className="brand-kicker">Egreso</span>
          <span>LCD</span>
        </Link>

        <nav className="desktop" aria-label="Navegación principal">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>

        <details className="mobile-nav">
          <summary>Menú</summary>
          <nav className="mobile-panel" aria-label="Navegación móvil">
            {links.map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
