import { SiGithub } from "react-icons/si";

const NavBar = () => {
  return (
    <header>
      <h1 className="relative my-[50px_0_10px_0] inline-block text-center text-[2.5rem] font-[var(--font-display)] tracking-[0.15em] text-ink-primary uppercase md:text-[3.5rem]">
        Memento Mori
        <span className="mx-auto mt-2.5 block h-0.5 w-[60%] bg-accent-red"></span>
      </h1>
      <div className="mb-[60px] text-center text-base font-bold tracking-[0.2em] text-accent-red">
        Daily Inspiration
      </div>
      <a
        href="https://github.com/jjozic/memento-mori-react"
        target="_blank"
        rel="noreferrer"
        title="Github Repo"
        className="fixed right-0 bottom-0 rounded-tl-3xl border-l-2 border-bg-parchment bg-ink-primary p-5 transition-colors hover:bg-ink-secondary"
      >
        <SiGithub className="text-2xl text-bg-parchment" />
      </a>
    </header>
  );
};

export default NavBar;
