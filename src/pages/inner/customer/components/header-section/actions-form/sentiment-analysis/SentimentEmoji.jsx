import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../../../../../../../utils/faIcons";

function SentimentEmoji({ sentiment }) {
  return sentiment === 'error' || sentiment === 'idle' ? null : (
    <span className="flex-center absolute bottom-2 right-2 h-8 w-8 rounded-xl bg-white text-sm sm:text-lg">
      {sentiment === 'loading' && (
        <FontAwesomeIcon title="Analyzing..." icon={icons.spinner} spin className="text-gray-500" />
      )}
      {sentiment === 'Positive' && (
        <FontAwesomeIcon title="Positive" icon={icons.sentiment.positive} className="animate-fade-in-fast text-green-600" />
      )}
      {sentiment === 'Negative' && (
        <FontAwesomeIcon title="Negative" icon={icons.sentiment.negative} className="animate-fade-in-fast text-red-500" />
      )}
      {(sentiment === 'Neutral' || sentiment === 'Irrelevant') && (
        <FontAwesomeIcon title="Neutral" icon={icons.sentiment.neutral} className="animate-fade-in-fast text-orange-500" />
      )}
    </span>
  );
}

export default SentimentEmoji;
