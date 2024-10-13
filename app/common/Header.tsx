import { FaRegSnowflake } from "react-icons/fa";

const Header = () => {
  return (
    <div className="fixed w-full header-shadow h-20 bg-white flex justify-center items-center gap-2 rounded">
      <p className="text-2xl font-bold font-montserrat bg-white">C</p>
      <p className="text-2xl font-bold font-montserrat bg-white">R</p>
      <FaRegSnowflake color="red" size={25} className="bg-white" />
      <p className="text-2xl font-bold font-montserrat bg-white">P</p>
      <p className="text-2xl font-bold font-montserrat bg-white">T</p>
      <FaRegSnowflake color="red" size={25} className="bg-white" />
    </div>
  );
};

export default Header;
