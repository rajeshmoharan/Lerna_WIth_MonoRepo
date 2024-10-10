import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";

function Footer() {
    const currentYear = new Date();
    const getYear = currentYear.getFullYear();

  return (
    <>
      <footer className="relative py-5 left-0 bottom-0 h-[10vh] flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800">
        <section className="test-lg">
          Copyright {getYear} || All right reserved
        </section>
        <section className="flex items-center justify-center gap-5 text-2xl text-white">
            <a className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                <BsFacebook/>
            </a>
            <a className="hover:text-yellow-500 transition-all ease-in-out duration-300">
               <BsInstagram/>
            </a>
            <a className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                <BsLinkedin/>
            </a>
            <a className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                <BsTwitterX/>
            </a>
        </section>
      </footer> 
    </>
  );
}
export default Footer;
