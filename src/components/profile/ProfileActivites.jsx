import {
  FiBook,
  FiBriefcase,
  FiCoffee,
  FiGlobe,
  FiHeart,
} from "react-icons/fi";

const ProfileActivites = () => {
  return (
    <div className="p-4 sm:p-5 md:p-6 bg-[#e7e8f2] backdrop-blur-md border border-white/10 shadow-xl min-h-[300px]">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Additional Information
      </h2>

      <div className="space-y-4 text-sm text-gray-600">
        {/* Profession */}
        <div className="flex items-start gap-3">
          <FiBriefcase className="mt-1 text-gray-500" />
          <div>
            <p className="text-xs text-gray-400">Profession</p>
            <p className="font-medium">Frontend Developer</p>
          </div>
        </div>

        {/* Education */}
        <div className="flex items-start gap-3">
          <FiBook className="mt-1 text-gray-500" />
          <div>
            <p className="text-xs text-gray-400">Education</p>
            <p className="font-medium">Computer Science</p>
          </div>
        </div>

        {/* Website */}
        <div className="flex items-start gap-3">
          <FiGlobe className="mt-1 text-gray-500" />
          <div>
            <p className="text-xs text-gray-400">Website</p>
            <p className="font-medium">www.yourwebsite.com</p>
          </div>
        </div>

        {/* Interests */}
        <div className="flex items-start gap-3">
          <FiHeart className="mt-1 text-gray-500" />
          <div>
            <p className="text-xs text-gray-400">Interests</p>
            <p className="font-medium">
              Coding, Design, Open Source, Technology
            </p>
          </div>
        </div>

        {/* Hobbies */}
        <div className="flex items-start gap-3">
          <FiCoffee className="mt-1 text-gray-500" />
          <div>
            <p className="text-xs text-gray-400">Hobbies</p>
            <p className="font-medium">Reading, Traveling, Gaming</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileActivites;
