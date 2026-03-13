// config/colors.js
export const colors = {
    makerspace: "rgba(236, 81, 47, 1)",   // #ec512f
    artcafe: "rgba(233, 175, 172, 1)",    // #E9AFAC
    cowork: "rgba(246, 151, 39, 1)",      // #F69727
    podlab: "rgba(133, 143, 117, 1)",     // #858F75
    stay: "rgb(167, 147, 122)",       // #A7937A
    aloft: "rgba(158, 119, 91, 1)",       // #9E775B
    roof: "rgba(146, 205, 194, 1)",       // #92CDC2
} as const;


export type colorKey = keyof typeof colors;