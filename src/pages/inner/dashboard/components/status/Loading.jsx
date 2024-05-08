import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../../../../utils/faIcons';
import statsImg1 from '../../../../../assets/stats/1.png';
import statsImg2 from '../../../../../assets/stats/2.png';
import statsImg3 from '../../../../../assets/stats/3.png';
import statsImg4 from '../../../../../assets/stats/4.png';

const backBoxClasses = 'rounded-xl bg-gray-100 shadow relative overflow-hidden';
const centerPosistion = 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2';

export default function Loading() {
  return (
    <div className="relative grid h-full grid-cols-2 grid-rows-2 gap-3">
      <div className={backBoxClasses}>
        <BackgroundImg img={statsImg1} />
      </div>
      <div className={backBoxClasses}>
        <BackgroundImg img={statsImg2} />
      </div>
      <div className={backBoxClasses}>
        <BackgroundImg img={statsImg3} />
      </div>
      <div className={backBoxClasses}>
        <BackgroundImg img={statsImg4} />
      </div>
      <div className={`flex-center ${centerPosistion} h-full w-full rounded-xl border bg-gray-200 shadow sm:h-80 sm:w-96`}>
        <div className="flex flex-col gap-5">
          <FontAwesomeIcon icon={icons.spinner} spin className="text-xl text-gray-500 sm:text-3xl" />
          <span className="text-center text-sm text-gray-500 sm:text-base">Generating your report...</span>
        </div>
      </div>
    </div>
  );
}

function BackgroundImg({ img }) {
  return (
    <div className={`${centerPosistion} animate-pulse`}>
      <img src={img} alt="Loading" className="scale-50 opacity-20" />
    </div>
  );
}
