import React from "react";

type SliderStatusProps = {
  variant?: "dark" | "light";
};

const SliderStatus: React.FC<SliderStatusProps> = ({ variant = "dark" }) => {
  const rectFill = variant === "dark" ? "#484848" : "#FEFEFE";
  const blurFill = variant === "dark" ? "white" : "#DBDBDB";
  const blurOpacity = variant === "dark" ? 0.48 : 0.4;
  const strokeOpacity = variant === "dark" ? 0.12 : 0.08;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 38 38"
      fill="none"
      style={{ display: "block" }}
    >
      {/* Top group */}
      <g clipPath="url(#clip0)">
        <rect
          width="38.1505"
          height="13.2666"
          transform="matrix(0.74707 -0.664745 -0.664745 -0.74707 8.82031 36.3291)"
          fill={rectFill}
        />
        <g filter="url(#filter0)">
          <path
            d="M37.3214 10.9688L8.82031 36.3291L0.00142166 26.418L28.5025 1.0577L37.3214 10.9688Z"
            fill={blurFill}
            fillOpacity={blurOpacity}
          />
        </g>
        <path
          d="M9.01172 36.1602L0.192828 26.2491"
          stroke="black"
          strokeOpacity="0.15"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <path
          d="M37.1328 11.1377L28.3139 1.22664"
          stroke="black"
          strokeOpacity="0.15"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <path
          opacity="0.3"
          d="M37.3214 10.9688L8.82031 36.3291L0.00142166 26.418L28.5025 1.0577L37.3214 10.9688Z"
          stroke="black"
          strokeOpacity={strokeOpacity}
          strokeWidth="10"
        />
      </g>

      {/* Bottom group */}
      <g clipPath="url(#clip1)">
        <rect
          width="38.1505"
          height="13.2666"
          transform="matrix(0.661505 0.749941 0.749941 -0.661505 1.06641 8.77588)"
          fill={rectFill}
        />
        <g filter="url(#filter1)">
          <path
            d="M26.3031 37.3865L1.06641 8.77588L11.0156 -1.73222e-05L36.2523 28.6106L26.3031 37.3865Z"
            fill={blurFill}
            fillOpacity={blurOpacity}
          />
        </g>
        <path
          d="M1.23438 8.9668L11.1835 0.190901"
          stroke="black"
          strokeOpacity="0.15"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <path
          d="M26.1367 37.1958L36.0859 28.4199"
          stroke="black"
          strokeOpacity="0.15"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <path
          opacity="0.3"
          d="M26.3031 37.3865L1.06641 8.77588L11.0156 -1.73222e-05L36.2523 28.6106L26.3031 37.3865Z"
          stroke="black"
          strokeOpacity={strokeOpacity}
          strokeWidth="10"
        />
      </g>

      <defs>
        <filter
          id="filter0"
          x="-2"
          y="-0.942383"
          width="41.3203"
          height="39.2715"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" />
          <feGaussianBlur stdDeviation="1" />
        </filter>
        <filter
          id="filter1"
          x="-0.933594"
          y="-2"
          width="39.1875"
          height="41.3867"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" />
          <feGaussianBlur stdDeviation="1" />
        </filter>
        <clipPath id="clip0">
          <rect
            width="38.1505"
            height="13.2666"
            transform="matrix(0.74707 -0.664745 -0.664745 -0.74707 8.82031 36.3291)"
          />
        </clipPath>
        <clipPath id="clip1">
          <rect
            width="38.1505"
            height="13.2666"
            transform="matrix(0.661505 0.749941 0.749941 -0.661505 1.06641 8.77588)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SliderStatus;
// import React from "react";

// type SliderStatusProps = {
//   variant?: "dark" | "light";
// };

// const SliderStatus: React.FC<SliderStatusProps> = ({ variant = "dark" }) => {
//   // If you want to control fill/stroke by variant, you can still do so here.
//   const fillColor = variant === "dark" ? "#fff" : "#000";
//   const strokeColor = variant === "dark" ? "#000" : "#000";

//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       xmlnsXlink="http://www.w3.org/1999/xlink"
//       x="0px"
//       y="0px"
//       viewBox="0 0 20.8 21.3"
//       xmlSpace="preserve"
//       width="100%"
//       height="100%"
//     >
//       <polygon
//         points="20.3,17 16.9,20.3 10.6,14 4.1,20.5 0.7,17.2 7.3,10.7 0.9,4.3 4.3,1 10.6,7.3 16.7,1.2 20,4.5 13.9,10.6"
//         fill={fillColor}
//         stroke={strokeColor}
//         strokeWidth={1}
//       />
//     </svg>
//   );
// };

// export default SliderStatus;
