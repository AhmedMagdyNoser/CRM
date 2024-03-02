import defaultImage from '../../assets/defaultImage.svg';

function ImageFormBox({ image, children }) {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
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
  return <div className="mx-2 my-12 hidden w-[2px] rounded bg-gray-100 xl:flex"></div>;
}

function ImageBox({ image = defaultImage }) {
  return (
    <div className="hidden w-[545px] flex-1 p-12 xl:flex">
      <div className="flex h-full items-center justify-center">
        <img src={image} alt="Join our community" className="w-4/5" />
      </div>
    </div>
  );
}
