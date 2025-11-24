import { SiGithub } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="mt-auto pb-3 text-center text-[0.8rem] font-[var(--font-display)] text-ink-secondary opacity-70">
      Made by{" "}
      <a
        href="https://www.julianjozic.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Julian Jozic
      </a>{" "}
      &bull; Inspired by{" "}
      <a
        href="https://waitbutwhy.com/2014/05/life-weeks.html"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Tim Urban
      </a>{" "}
      &bull;{" "}
      <a
        href="https://github.com/jjozic/memento-mori-react"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-baseline gap-1 hover:underline"
        title="GitHub Repository"
      >
        <SiGithub className="text-xs" />
        GitHub
      </a>
    </footer>
  );
};

export default Footer;
