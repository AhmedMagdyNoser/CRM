function CaptionCard({ className = '', image, title, paragraph }) {
  return (
    <div className={'flex flex-col items-center gap-3 ' + className}>
      {image && (
        <div className="h-[215px] w-[215px]">
          <img className="h-full" src={image} alt={title} />
        </div>
      )}
      <h1 className="text-center">{title}</h1>
      <p className="text-center">{paragraph}</p>
    </div>
  );
}

export default CaptionCard;
