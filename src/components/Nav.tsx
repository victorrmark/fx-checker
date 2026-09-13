import Logo from "../assets/logo.svg";

function Nav() {
  const items = ["55 currencies", "EOD", "ECB DATA"];

  return (
    <>
      <div className="w-full p-4 md:px-6 md:py-5 flex flex-row justify-between items-center">
        <img src={Logo} className="w-[107.5px] md:w-34.75 h-auto" alt="" />
        <ul className="flex items-center uppercase text-6 md:text-4 text-neutral-200">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center first:before:content-none before:content-['•'] before:mx-2.5 "
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Nav;
