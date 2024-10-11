import { FaRegSnowflake } from "react-icons/fa";

const Header = () => {
  return (
    <div className="fixed w-full header-shadow h-20 bg-white flex justify-center items-center gap-2 rounded">
      <p className="text-2xl font-bold font-montserrat">C</p>
      <p className="text-2xl font-bold font-montserrat">R</p>
      <FaRegSnowflake color="red" size={25} />
      <p className="text-2xl font-bold font-montserrat">P</p>
      <p className="text-2xl font-bold font-montserrat">T</p>
      <FaRegSnowflake color="red" size={25} />
    </div>
  );
};

export default Header;
