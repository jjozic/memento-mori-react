import { SiGithub } from "react-icons/si";

const NavBar = () => {
  return (
    <header className="pt-12">
      <h1 className="relative my-[0_0_4px_0] inline-block text-center text-[2rem] leading-tight font-[var(--font-display)] tracking-[0.15em] text-ink-primary uppercase sm:text-[2.5rem] sm:leading-normal md:text-[3.5rem]">
        Memento Mori
        <span className="mx-auto mt-1 mb-4 block h-0.5 w-[60%] bg-accent-red"></span>
      </h1>
      <div className="mb-[30px] text-center text-sm font-bold tracking-[0.2em] text-accent-red sm:text-base">
        Daily Inspiration
      </div>
      <a
        href="https://github.com/jjozic/memento-mori-react"
        target="_blank"
        rel="noreferrer"
        title="Github Repo"
        className="fixed right-0 bottom-0 z-50 rounded-tl-3xl border-l-2 border-bg-parchment bg-ink-primary p-4 transition-colors hover:bg-ink-secondary sm:p-5"
      >
        <SiGithub className="text-xl text-bg-parchment sm:text-2xl" />
      </a>
    </header>
  );
};

export default NavBar;
