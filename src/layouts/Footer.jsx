import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  const year = new Date().getFullYear();

  const personalData = {
    github: "https://github.com/mgrahul63",
    facebook: "https://web.facebook.com/mgrahul639/",
    linkedIn: "https://www.linkedin.com/in/mgrahul639/",
    twitter: "https://twitter.com/#",
    leetcode: "https://leetcode.com/#",
  };

  return (
    <footer className="bg-gray-100 px-6 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {/* copyright */}
        <p className="text-gray-600 text-sm">
          © {year} My App. All rights reserved.
        </p>

        {/* developer */}
        <a
          href="https://github.com/mgrahul63"
          target="_blank"
          className="text-blue-500 hover:underline text-sm"
        >
          Developed by: Md. Rahul Mia
        </a>

        {/* social icons */}
        <div className="flex items-center gap-5">
          <a href={personalData.github} target="_blank">
            <BsGithub size={22} />
          </a>

          <a href={personalData.linkedIn} target="_blank">
            <BsLinkedin size={22} />
          </a>

          <a href={personalData.facebook} target="_blank">
            <FaFacebook size={22} />
          </a>

          <a href={personalData.leetcode} target="_blank">
            <SiLeetcode size={22} />
          </a>

          <a href={personalData.twitter} target="_blank">
            <FaTwitterSquare size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
