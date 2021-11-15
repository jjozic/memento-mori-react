import { SiGithub } from "react-icons/si";

const NavBar = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between">
          <h1 className="uppercase font-extrabold">Memento Mori</h1>
          <ul className="flex gap-4">
            {/* <li>Info</li> */}
            <li>
              <a href="https://github.com/jjozic/memento-mori-react" target="_blank" rel="noreferrer">
                <SiGithub className="text-2xl"/>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
