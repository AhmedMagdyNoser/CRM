import defaultImage from '../../assets/defaultImage.svg';

function ImageFormBox({ image, children }) {
  return (
    <div className="flex-center h-screen bg-progray-50">
      <div className="flex h-full w-full bg-white sm:h-fit sm:w-fit sm:rounded-xl sm:shadow-lg">
        <ImageBox image={image} />
        <Divider />
        {children}
      </div>
    </div>
  );
}

export default ImageFormBox;

function Divider() {
  return <div className="my-12 hidden w-[2px] rounded bg-progray-100 xl:flex"></div>;
}

function ImageBox({ image = defaultImage }) {
  return (
    <div className="hidden w-[550px] p-12 xl:flex">
      <div className="flex h-full animate-fade-in-medium items-center justify-center">
        <img src={image} alt="Join our community" className="w-4/5" />
      </div>
    </div>
  );
}
