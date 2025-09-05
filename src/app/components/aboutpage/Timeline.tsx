import { timeline } from "@/contents/timeline";
import Link from "next/link";
import { FaFileAlt } from "react-icons/fa";

const Timeline = () => {
  return (
    <section className="mb-16">
      <div className="section-title flex items-center justify-center space-x-3">
        <h2>
          Education & Experience
        </h2>
        <Link
        href="../projects/Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group text-2xl text-gray-600 hover:text-primary dark:text-gray-300 transition-colors duration-300">
          <FaFileAlt />
          <span className="tooltip tooltip-show">
          View Resume
          </span>
        </Link>
      </div>
      {/* Vertical line */}
      <div className="relative">
        <div
          aria-hidden
          className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-zinc-500/40 via-zinc-600/30 to-transparent md:left-1/2"
        />

        <ul className="space-y-10">
          {timeline.map((item, index) => (
            <li key={index} className="relative group">
              {/* Node dot */}
              <span
                aria-hidden
                className="absolute left-4 -translate-x-1/2 mt-2 h-3 w-3 rounded-full ring-4 ring-zinc-900 bg-blue-400/90 group-hover:bg-blue-300 transition md:left-1/2"
              />

              {/* Card */}
              <div
                className={[
                  // Alternate sides on md+ screens
                  "md:w-[46%]",
                  index % 2 === 0 ? "md:ml-[54%]" : "md:mr-[54%] md:text-right",
                  "bg-zinc-900/50 border border-zinc-800 backdrop-blur rounded-2xl p-5",
                  "shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]",
                  "hover:border-zinc-700 transition"
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between gap-3 md:flex-row md:gap-6">
                  <div className="min-w-0">
                    <h3 className="text-lg font-medium leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {item.href ? (
                        <a 
                        href={item.href} 
                        target="_blank"
                        rel='nooperner noreferrer'
                        className="underline decoration-dotted underline-offset-4 hover:text-zinc-200">
                          {item.org}
                        </a>
                      ) : (
                        item.org
                      )}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-300">
                    {item.start} — {item.end}
                  </span>
                </div>

                <ul className="mt-3 space-y-2 text-sm text-zinc-300 leading-relaxed">
                  {item.bullets.map((b, j) => (
                    <li key={j} className="pl-4 relative">
                      <span aria-hidden className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-500/70" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Timeline