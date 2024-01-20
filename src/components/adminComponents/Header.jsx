import { IoNotificationsOutline } from "react-icons/io5";

const Header = () => {
  return (
    <div className="flex items-center gap-4 justify-end h-16">
      <div className="w-12 h-12 relative rounded-full border-4 flex justify-center items-center text-darkBlue overflow-hidden border-neutral-100">
        <IoNotificationsOutline className="text-2xl" />
        <div className="bg-red-500 w-2 h-2 rounded-full absolute top-2 right-2.5"></div>
      </div>
      <div className="w-12 h-12 rounded-full border-[7px] overflow-hidden border-neutral-100">
        <img
          src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp"
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Header;
