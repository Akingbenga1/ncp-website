export type PixabayCredit = {
  file: string;
  alt: string;
  pageUrl: string;
  photographer: string;
};

/** Pixabay Content License — free for use. Credits kept for transparency. */
export const pixabayCredits: PixabayCredit[] = [
  {
    file: "/images/community/friends-on-bench-uk.jpg",
    alt: "Two Black women friends sitting together on a park bench outside a red-brick building in the UK",
    pageUrl: "https://pixabay.com/photos/people-6299321/",
    photographer: "Pixabay community",
  },
  {
    file: "/images/community/women-laughing-together.jpg",
    alt: "Two Black women laughing together on a sofa, sharing a warm moment of friendship",
    pageUrl: "https://pixabay.com/photos/black-women-7047086/",
    photographer: "Pixabay community",
  },
  {
    file: "/images/community/family-in-park.jpg",
    alt: "A Black family walking hand in hand through a green park on a sunny day",
    pageUrl: "https://pixabay.com/photos/family-6886803/",
    photographer: "Pixabay community",
  },
  {
    file: "/images/community/heritage-community-celebration.jpg",
    alt: "A joyful crowd of African children and young people celebrating together outdoors",
    pageUrl: "https://pixabay.com/photos/people-3137672/",
    photographer: "Pixabay community",
  },
  {
    file: "/images/community/uk-street-market.jpg",
    alt: "A busy outdoor street market with a diverse crowd in a UK city",
    pageUrl: "https://pixabay.com/photos/street-5666538/",
    photographer: "Pixabay community",
  },
  {
    file: "/images/community/jollof-rice-plate.jpg",
    alt: "A plate of West African fried rice with grilled fish and pepper sauce",
    pageUrl: "https://pixabay.com/photos/jollof-4659747/",
    photographer: "Pixabay community",
  },
  {
    file: "/images/community/hands-unity.jpg",
    alt: "Diverse hands stacked together in a circle, showing unity and teamwork",
    pageUrl: "https://pixabay.com/photos/team-4529717/",
    photographer: "Pixabay community",
  },
  {
    file: "/images/community/clasped-hands-welcome.jpg",
    alt: "Two people holding hands in a gesture of welcome and support",
    pageUrl: "https://pixabay.com/photos/mom-9034408/",
    photographer: "Pixabay community",
  },
  {
    file: "/images/community/uk-rolling-hills.jpg",
    alt: "Rolling green hills and rural English countryside under soft cloud",
    pageUrl: "https://pixabay.com/photos/landscape-3610887/",
    photographer: "Pixabay community",
  },
  {
    file: "/images/community/uk-green-fields.jpg",
    alt: "Lush green fields and hills across the English countryside",
    pageUrl: "https://pixabay.com/photos/fields-4578172/",
    photographer: "Pixabay community",
  },
  {
    file: "/images/community/uk-malham-cove.jpg",
    alt: "Malham Cove stone landscape in Yorkshire, England",
    pageUrl: "https://pixabay.com/photos/malham-cove-3196076/",
    photographer: "Pixabay community",
  },
  {
    file: "/images/community/uk-chilterns.jpg",
    alt: "Chilterns English countryside with green valleys and trees",
    pageUrl: "https://pixabay.com/photos/chilterns-4339200/",
    photographer: "Pixabay community",
  },
  {
    file: "/images/community/uk-lake-district.jpg",
    alt: "Lake District mountains, stream, and green hills in England",
    pageUrl: "https://pixabay.com/photos/lake-district-4098351/",
    photographer: "Pixabay community",
  },
  {
    file: "/images/community/friends-black-women.jpg",
    alt: "Three young Black women smiling together, close and joyful",
    pageUrl: "https://pixabay.com/photos/friendship-day-3104635/",
    photographer: "Pixabay community",
  },
  {
    file: "/images/community/couple-smiling.jpg",
    alt: "A Black couple laughing together in a joyful studio portrait",
    pageUrl: "https://pixabay.com/photos/couple-1194312/",
    photographer: "Pixabay community",
  },
  {
    file: "/images/community/pro-black-businessman.jpg",
    alt: "A well-dressed young Black professional in a suit adjusting his cuff",
    pageUrl: "https://pixabay.com/photos/black-businessman-4599851/",
    photographer: "elsimage",
  },
  {
    file: "/images/community/pro-black-businessman-2.jpg",
    alt: "A confident Black professional in modern formal attire",
    pageUrl: "https://pixabay.com/photos/black-businessman-4599846/",
    photographer: "elsimage",
  },
  {
    file: "/images/community/pro-male-portrait.jpg",
    alt: "A smiling Black man in a tailored suit looking warmly at the camera",
    pageUrl: "https://pixabay.com/photos/male-portrait-1156365/",
    photographer: "Pixabay community",
  },
];

export const communityPhotos = {
  friendsOnBench: pixabayCredits[0],
  womenTogether: pixabayCredits[1],
  familyInPark: pixabayCredits[2],
  heritageCelebration: pixabayCredits[3],
  ukStreetMarket: pixabayCredits[4],
  jollofPlate: pixabayCredits[5],
  handsUnity: pixabayCredits[6],
  claspedHands: pixabayCredits[7],
  ukRollingHills: pixabayCredits[8],
  ukGreenFields: pixabayCredits[9],
  ukMalhamCove: pixabayCredits[10],
  ukChilterns: pixabayCredits[11],
  ukLakeDistrict: pixabayCredits[12],
  friendsBlackWomen: pixabayCredits[13],
  coupleSmiling: pixabayCredits[14],
  proBusinessman: pixabayCredits[15],
  proBusinessman2: pixabayCredits[16],
  proMalePortrait: pixabayCredits[17],
} as const;

export const ukLandscapeSlides = [
  communityPhotos.ukRollingHills,
  communityPhotos.ukGreenFields,
  communityPhotos.ukMalhamCove,
  communityPhotos.ukChilterns,
] as const;

export const communityPortraitSlides = [
  communityPhotos.friendsBlackWomen,
  communityPhotos.friendsOnBench,
  communityPhotos.proBusinessman,
  communityPhotos.coupleSmiling,
  communityPhotos.womenTogether,
  communityPhotos.proMalePortrait,
  communityPhotos.familyInPark,
] as const;
