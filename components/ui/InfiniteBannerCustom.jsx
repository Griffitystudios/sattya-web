const InfiniteBannerCustom = ({
  items,
  bannerColor = "black",
  textColor = "white",
  className = "",
}) => {
  const doubledItems = [...items, ...items];
  return (
    <div className="scroller" data-animated="true">
      <div className="scroller-inner">
        {doubledItems.map((item, index) => (
          <span
            key={index}
            className={`scroller-item ${className} bg-${bannerColor} text-${textColor}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InfiniteBannerCustom;
