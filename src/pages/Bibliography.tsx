import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, GameIcon } from '../components/Icons'

type Ref = { id: string; body: ReactNode; url?: string }

/* APA 7, alphabetical by first author. Italics: journal + volume, or the title of a standalone work. */
const references: Ref[] = [
  {
    id: 'denning-1968',
    body: (
      <>
        Denning, P. J. (1968). The working set model for program behavior. <i>Communications of the ACM, 11</i>(5),
        323-333.
      </>
    ),
    url: 'https://doi.org/10.1145/363095.363141',
  },
  {
    id: 'denning-1970',
    body: (
      <>
        Denning, P. J. (1970). Virtual memory. <i>ACM Computing Surveys, 2</i>(3), 153-189.
      </>
    ),
    url: 'https://doi.org/10.1145/356571.356573',
  },
  {
    id: 'fsf',
    body: (
      <>
        Free Software Foundation. (s. f.). Overlay description. En <i>Using ld, the GNU linker</i>.
      </>
    ),
    url: 'https://sourceware.org/binutils/docs/ld/Overlay-Description.html',
  },
  {
    id: 'onu',
    body: (
      <>
        Naciones Unidas. (s. f.).{' '}
        <i>
          Objetivo 9: Construir infraestructuras resilientes, promover la industrialización inclusiva y sostenible y
          fomentar la innovación
        </i>
        .
      </>
    ),
    url: 'https://sdgs.un.org/es/goals/goal9',
  },
  {
    id: 'nakamoto',
    body: (
      <>
        Nakamoto, S. (2008). <i>Bitcoin: A peer-to-peer electronic cash system</i>.
      </>
    ),
    url: 'https://bitcoin.org/bitcoin.pdf',
  },
  {
    id: 'ods-metadata',
    body: (
      <>
        Proyecto de Traducción de los Metadatos de los ODS. (s. f.).{' '}
        <i>Metadatos del indicador 9.5.1 de los Objetivos de Desarrollo Sostenible</i>.
      </>
    ),
    url: 'https://worldbank.github.io/sdg-metadata/metadata/es/9-5-1',
  },
  {
    id: 'saltzer',
    body: (
      <>
        Saltzer, J. H., y Schroeder, M. D. (1975). The protection of information in computer systems.{' '}
        <i>Proceedings of the IEEE, 63</i>(9), 1278-1308.
      </>
    ),
  },
  {
    id: 'silberschatz',
    body: (
      <>
        Silberschatz, A., Galvin, P. B., y Gagne, G. (2018). <i>Operating system concepts</i> (10.ª ed.). Wiley.
      </>
    ),
  },
  {
    id: 'stallings',
    body: (
      <>
        Stallings, W. (2018). <i>Operating systems: Internals and design principles</i> (9.ª ed.). Pearson.
      </>
    ),
  },
  {
    id: 'stonebraker',
    body: (
      <>
        Stonebraker, M. (1981). Operating system support for database management.{' '}
        <i>Communications of the ACM, 24</i>(7), 412-418.
      </>
    ),
  },
  {
    id: 'tanenbaum',
    body: (
      <>
        Tanenbaum, A. S., y Bos, H. (2015). <i>Modern operating systems</i> (4.ª ed.). Pearson.
      </>
    ),
  },
]

export default function Bibliography() {
  useEffect(() => {
    document.title = 'Bibliografía · Overlay'
    window.scrollTo(0, 0)
    return () => {
      document.title = 'La Técnica de Overlay'
    }
  }, [])

  return (
    <div className="min-h-dvh bg-bg text-ink">
      <header className="sticky top-0 z-10 border-b border-line/60 bg-bg/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-3xl items-center gap-3 px-4">
          <Link to="/" className="-ml-2 flex size-11 items-center justify-center rounded-xl text-muted hover:bg-surface hover:text-ink" aria-label="Volver a la presentación">
            <ChevronLeft className="size-6" />
          </Link>
          <p className="font-bold">Overlay</p>
          <Link to="/quiz" className="ml-auto flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-root hover:bg-surface">
            <GameIcon className="size-5" />
            Quiz
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="t-title">Bibliografía</h1>
        <p className="mt-3 text-muted">Formato APA 7.ª edición · orden alfabético</p>

        <ol className="mt-10 flex flex-col gap-6">
          {references.map((r) => (
            <li key={r.id} className="pl-8 -indent-8 text-base leading-relaxed sm:text-lg">
              {r.body}
              {r.url && (
                <>
                  {' '}
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-root underline decoration-root/40 underline-offset-4 hover:decoration-root"
                  >
                    {r.url}
                  </a>
                </>
              )}
            </li>
          ))}
        </ol>

        <p className="mt-14 border-t border-line pt-6 text-sm text-muted">
          La Técnica de Overlay: Ejecutando Programas Más Grandes que la Memoria · Bryan Maciel de Almeida · Ingeniería
          de Sistemas · UPDS · Docente: Ing. Alex Escobar
        </p>
      </main>
    </div>
  )
}
