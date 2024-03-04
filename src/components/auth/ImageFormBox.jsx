import defaultImage from '../../assets/defaultImage.svg';
import ScreenBox from './ScreenBox';

function ImageFormBox({ image, children }) {
  return (
    <ScreenBox>
      <ImageBox image={image} />
      <Divider />
      {children}
    </ScreenBox>
  );
}

export default ImageFormBox;

function Divider() {
  return <div className="my-12 hidden w-[2px] rounded bg-progray-100 xl:flex"></div>;
}

function ImageBox({ image = defaultImage }) {
  return (
    <div className="xl:flex-center hidden w-[550px] p-12">
      <img src={image} alt="Join our community" className="w-4/5" />
    </div>
  );
}
