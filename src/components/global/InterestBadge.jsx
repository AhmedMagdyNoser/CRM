import { colorPairs } from "../../utils/utils";

function InterestBadge({ interest }) {
  const colorPair = colorPairs[Math.floor(Math.random() * colorPairs.length)];
  return (
    <div
      className="rounded-full p-1 px-3 text-xs sm:text-sm"
      style={{ backgroundColor: colorPair.bg, color: colorPair.text, boxShadow: `0px 1px 1px ${colorPair.text}35` }}
    >
      {interest}
    </div>
  );
}

export default InterestBadge;