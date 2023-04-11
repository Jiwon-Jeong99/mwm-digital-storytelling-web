import SpaceBack from "../components/SpaceBack";
import Planet1 from "../components/Planet1";
import Planet2 from "../components/Planet2";

const Galaxy = () => {
  return (
    <div className="relative overflow-hidden w-screen h-screen flex justify-center items-center">
      <SpaceBack />
      {/* <Planet1 /> */}
      <Planet2 />
    </div>
  );
};

export default Galaxy;
