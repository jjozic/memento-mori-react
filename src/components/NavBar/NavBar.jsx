import { SiGithub } from "react-icons/si";

const NavBar = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between">
          <h1 className="uppercase font-extrabold"><a href="/">Memento Mori</a></h1>
          <ul className="flex gap-4">
            {/* <li>Info</li> */}
            <li>
              <a href="https://github.com/jjozic/memento-mori-react" target="_blank" rel="noreferrer" title="Github Repo"
                className="fixed right-0 bottom-0 bg-gray-800 p-5 rounded-tl-3xl hover:bg-gray-600"
              >
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
