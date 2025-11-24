import { SiGithub } from "react-icons/si";

const NavBar = () => {
  return (
    <header>
      <h1 className="text-[2.5rem] md:text-[3.5rem] tracking-[0.15em] my-[50px_0_10px_0] text-[var(--color-ink-primary)] text-center relative inline-block font-[var(--font-display)] uppercase">
        Memento Mori
        <span className="block w-[60%] h-0.5 bg-[var(--color-accent-red)] mx-auto mt-2.5"></span>
      </h1>
      <div className="text-base tracking-[0.2em] text-[var(--color-accent-red)] mb-[60px] font-bold text-center">
        Daily Inspiration
      </div>
      <a
        href="https://github.com/jjozic/memento-mori-react"
        target="_blank"
        rel="noreferrer"
        title="Github Repo"
        className="fixed right-0 bottom-0 bg-[var(--color-ink-primary)] p-5 rounded-tl-3xl border-l-2 border-[var(--color-bg-parchment)] hover:bg-[var(--color-ink-secondary)] transition-colors"
      >
        <SiGithub className="text-2xl text-[var(--color-bg-parchment)]" />
      </a>
    </header>
  );
};

export default NavBar;
