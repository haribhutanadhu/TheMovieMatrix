import { MdOutlineClose } from "react-icons/md";

const Alert = (props) => {
  return (
    <div
      className={`flex justify-between items-center border border-opacity-60 w-80 ${
        props.colourset === "red" ? `border-red-600` : "border-green-600"
      }`}
    >
      <h1 className="text-white/80 text-lg py-2 mx-3">{props.name}</h1>
      <div className="mx-3">
        <MdOutlineClose
          className={`${props.colourset === "red" ? "text-red-600" : "text-green-600"} text-xl text-opacity-70`}
        />
      </div>
    </div>
  );
};

export default Alert;
