import { colorPairs } from '../../utils/utils';

export default function InterestBadge({ interest }) {
  const colorPair = colorPairs[Math.floor(Math.random() * colorPairs.length)];
  return (
    <div
      className="text-nowrap rounded-full p-1 px-3 text-xs sm:text-sm"
      style={{ backgroundColor: colorPair.bg, color: colorPair.text, boxShadow: `0px 1px 1px ${colorPair.text}35` }}
    >
      {interest}
    </div>
  );
}
