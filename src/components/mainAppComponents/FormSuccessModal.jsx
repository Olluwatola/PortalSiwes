import success from "../../assets/success.svg";
import { BsArrowDownCircle } from "react-icons/bs";
import { motion } from "framer-motion";
import ConfettiExplosion from "react-confetti-explosion";

const FormSuccessModal = ({ conditionGood, setApplyModal, setConditionGood }) => {
  const closeApplyModal = () => {
    setApplyModal(false);
    setConditionGood(null);
  }
  return (
    conditionGood == "good" && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bg-white gap-4 w-full h-full z-10 flex flex-col justify-center items-center"
      >
        <div className="w-full absolute h-full flex justify-center">
          <ConfettiExplosion
            force={0.7}
            duration={4000}
            particleCount={300}
            width={900}
            height={1000}
            colors={["#0071BC", "#DBE5FF", "#8A8A8A"]}
          />
        </div>
        <img src={success} alt="success" className="w-48" />
        <span className="text-2xl font-medium">Success!</span>
        <span className="w-[55%] text-center">
          Your application has been submitted and you will be contacted shortly
          via email.
        </span>
        <span className="w-[55%] mt-10 mb-1 tracking-[0.5rem] text-sm font-light text-center ">
          VISIT OUR HOME WEBSITE FOR OTHER SERVICES
        </span>
        <BsArrowDownCircle className="text-2xl" />
        <div className="w-full px-10 mt-2 cursor-pointer z-30">
          <button
            type="button"
            onClick={closeApplyModal}
            className="bg-primary w-full py-3 rounded-lg text-white text-sm transition-all duration-300 ease-in-out hover:bg-white hover:text-primary hover:border-primary border border-primary"
          >
            Go to Website
          </button>
        </div>
      </motion.div>
    )
  );
};

export default FormSuccessModal;
