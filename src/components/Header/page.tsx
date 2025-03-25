import Link from "next/link";

const Header = () => {
  return (
    <header className="text-black p-4">
      <h1 className="mb-8 text-4xl">Blog Hub</h1>
      <nav className="container mx-auto w-full flex justify-between">
        <ul className="p-4 flex space-x-4 bg-gray-800 text-white">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/posts" className="hover:underline">
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
