// ─── Type Definitions ─────────────────────────────────────────────────────────

export interface Photo {
  id: string;
  url: string;
  caption: string;
  category:
    | "Living room"
    | "Bedroom"
    | "Bathroom"
    | "Balcony & outdoor"
    | "Pool & exterior"
    | "Kitchen & dining";
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  avatarColor: string;
  avatarTextColor?: string;
  memberInfo: string;
  date: string;
  rating: number;
  content: string;
}

export interface ReviewMentionTag {
  emoji?: string;
  iconSrc?: string;
  label: string;
  count: number;
}

export interface Amenity {
  id: string;
  name: string;
  category: string;
  icon: string;
  strikethrough?: boolean;
}

export interface SleepingArrangement {
  roomName: string;
  bedType: string;
  image: string;
}

export interface CoHost {
  name: string;
  avatar: string;
  avatarColor: string;
  avatarTextColor?: string;
}

export interface Listing {
  id: string;
  title: string;
  propertyType: string;
  location: string;
  address: string;
  rating: number;
  reviewCount: number;
  isSuperhost: boolean;
  isGuestFavorite: boolean;
  guestCount: number;
  bedroomCount: number;
  bedCount: number;
  bathCount: number;
  basePrice: number;
  currency: string;
  cleaningFee: number;
  serviceFee: number;
  maxGuests: number;
  host: {
    name: string;
    avatar: string;
    hostReviewCount: number;
    hostRating: number;
    yearsHosting: number;
    responseRate: string;
    responseTime: string;
    personalInfo: string[];
    coHosts: CoHost[];
  };
  highlights: {
    icon: string;
    title: string;
    description: string;
  }[];
  translationNotice: boolean;
  description: string[];
  sleepingArrangements: SleepingArrangement[];
  amenities: Amenity[];
  ratingsBreakdown: {
    cleanliness: number;
    accuracy: number;
    checkIn: number;
    communication: number;
    location: number;
    value: number;
  };
  starDistribution: { stars: number; count: number }[];
  reviewMentionTags: ReviewMentionTag[];
  reviews: Review[];
  photos: Photo[];
  houseRules: string[];
  safetyInfo: string[];
  neighbourhoodHighlights: string;
}

// ─── Listing Data ─────────────────────────────────────────────────────────────

export const LISTING: Listing = {
  id: "1599895892448055764",
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  propertyType: "Entire serviced apartment",
  location: "Candolim, Goa, India",
  address: "Amor De Goa, Fort Aguada Road, Candolim, Goa 403515, India",
  rating: 4.97,
  reviewCount: 33,
  isSuperhost: false,
  isGuestFavorite: true,
  guestCount: 3,
  bedroomCount: 1,
  bedCount: 1,
  bathCount: 1,
  basePrice: 1900,
  currency: "₹",
  cleaningFee: 500,
  serviceFee: 312,
  maxGuests: 3,

  host: {
    name: "Mirashya Homes",
    avatar: "",
    hostReviewCount: 1558,
    hostRating: 4.68,
    yearsHosting: 2,
    responseRate: "100%",
    responseTime: "within an hour",
    personalInfo: [
      "Born in the 80s",
      "Where I went to school: NICMAR GOA",
    ],
    coHosts: [
      { name: "Sharath", avatar: "/cohost-sharath.png", avatarColor: "#F3F4F6", avatarTextColor: "" },
      { name: "Aman Dev Pahwa", avatar: "/cohost-amandev.png", avatarColor: "#F3F4F6", avatarTextColor: "" },
      { name: "Maria Karen Priyanka", avatar: "/cohost-mariakaren.png", avatarColor: "#F3F4F6", avatarTextColor: "" },
      { name: "Simran", avatar: "/cohost-simran.png", avatarColor: "#F3F4F6", avatarTextColor: "" },
      { name: "Pallavi", avatar: "/cohost-pallavi.png", avatarColor: "#F3F4F6", avatarTextColor: "" },
      { name: "Sanyukta", avatar: "/cohost-sanyukta.png", avatarColor: "#F3F4F6", avatarTextColor: "" },
      { name: "Shruti", avatar: "", avatarColor: "#FCE7F3", avatarTextColor: "#BE185D" },
      { name: "Amisha", avatar: "", avatarColor: "#DDF4FF", avatarTextColor: "#0284C7" },
    ],
  },

  highlights: [
    {
      icon: "Waves",
      title: "Dive right in",
      description: "This is one of the few places in the area with a pool.",
    },
    {
      icon: "DoorOpen",
      title: "Self check-in",
      description: "You can check in with the building staff.",
    },
    {
      icon: "MapPin",
      title: "Peace and quiet",
      description: "Guests say this home is in a quiet area.",
    },
  ],

  translationNotice: true,

  description: [
    "🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 📶, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🌙, it's ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. 💕🌴",
    "The space\nEscape to Amor de Goa by Mirashya Homes, a serene 1BHK retreat in the heart of Candolim, Goa. This beautifully designed apartment blends modern comfort with warm aesthetics — perfect for a romantic escape or a quiet solo retreat.",
    "The apartment features a private jacuzzi hot tub for ultimate relaxation, a fully equipped kitchen, 55\" Smart TV, high-speed WiFi (150 Mbps), dedicated workspace, and a cozy balcony with garden views. The Amor De Goa complex includes a shared swimming pool, landscaped gardens, and 24/7 security.",
  ],

  sleepingArrangements: [
    {
      roomName: "Bedroom",
      bedType: "1 double bed",
      image: "https://a0.muscache.com/im/pictures/hosting/Hosting-1599895892448055764/original/67c61c6f-6260-4809-9510-0360e58a345d.jpeg?im_w=720",
    },
    {
      roomName: "Living room",
      bedType: "1 sofa",
      image: "https://a0.muscache.com/im/pictures/hosting/Hosting-1599895892448055764/original/090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpeg?im_w=720",
    },
  ],

  amenities: [
    { id: "1", name: "Kitchen", category: "Kitchen & Dining", icon: "UtensilsCrossed" },
    { id: "2", name: "Wifi", category: "Internet & Office", icon: "Wifi" },
    { id: "3", name: "Dedicated workspace", category: "Internet & Office", icon: "Laptop" },
    { id: "4", name: "Free parking on premises", category: "Parking", icon: "Car" },
    { id: "5", name: "Pool", category: "Outdoor", icon: "Waves" },
    { id: "6", name: "Hot tub", category: "Bathroom", icon: "Bath" },
    { id: "7", name: "Pets allowed", category: "Home", icon: "PawPrint" },
    { id: "8", name: "Exterior security cameras on property", category: "Home Safety", icon: "Camera" },
    { id: "9", name: "Carbon monoxide alarm", category: "Home Safety", icon: "ShieldOff", strikethrough: true },
    { id: "10", name: "Smoke alarm", category: "Home Safety", icon: "ShieldOff", strikethrough: true },
  ],

  ratingsBreakdown: {
    cleanliness: 5.0,
    accuracy: 4.9,
    checkIn: 5.0,
    communication: 4.9,
    location: 4.9,
    value: 4.9,
  },

  starDistribution: [
    { stars: 5, count: 31 },
    { stars: 4, count: 2 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ],

  reviewMentionTags: [
    { iconSrc: "/tag-hottub.png", label: "Hot tub", count: "11" },
    { iconSrc: "/tag-accuracy.png", label: "Accuracy", count: "10" },
    { iconSrc: "/tag-condition.png", label: "Condition", count: "8" },
    { iconSrc: "/tag-hospitality.png", label: "Hospitality", count: "14" },
    { iconSrc: "/tag-comfort.png", label: "Comfort", count: "9" },
    { iconSrc: "/tag-cleanliness.png", label: "Cleanliness", count: "8" },
    { iconSrc: "/tag-amenities.png", label: "Amenities", count: "4" },
    { iconSrc: "/tag-transit.png", label: "Goa", count: "" },
  ],

  reviews: [
    {
      id: "r1",
      author: "Jithin",
      avatar: "",
      avatarColor: "#DDEDFE",
      avatarTextColor: "#1150AC",
      memberInfo: "4 months on Airbnb",
      date: "2 weeks ago",
      rating: 5,
      content: "Comfy stay. The ground host (Neeraj) was very helpful. The amenities were great.",
    },
    {
      id: "r2",
      author: "Suraj",
      avatar: "",
      avatarColor: "#E0EEFB",
      avatarTextColor: "#1150AC",
      memberInfo: "4 months on Airbnb",
      date: "3 weeks ago",
      rating: 5,
      content: "The stay was absolutely wonderful! The property was beautiful, clean, comfortable, and exactly as described. The location was great, and everything was well maintained. The ...",
    },
    {
      id: "r3",
      author: "Mohammed",
      avatar: "/avatar-mohammed.png",
      avatarColor: "#F3F4F6",
      avatarTextColor: "",
      memberInfo: "2 years on Airbnb",
      date: "2 weeks ago",
      rating: 5,
      content: "Had a good stay. The room was clean, comfortable, and as described with a nice jacuzzi. The host was friendly and helpful, and the overall experience was smooth and hassle-...",
    },
    {
      id: "r4",
      author: "Mayuresh",
      avatar: "",
      avatarColor: "#FEE5E7",
      avatarTextColor: "#A21039",
      memberInfo: "6 years on Airbnb",
      date: "4 weeks ago",
      rating: 5,
      content: "Absolutely loved our stay! ✨ The room was beautiful, cozy, spotless, and the jacuzzi was the perfect touch for a relaxing getaway. Everything was thoughtfully arranged, and...",
    },
    {
      id: "r5",
      author: "Rishi Raj",
      avatar: "/avatar-rishiraj.png",
      avatarColor: "#F3F4F6",
      avatarTextColor: "",
      memberInfo: "5 years on Airbnb",
      date: "August 2026",
      rating: 5,
      content: "It was worth it. Well maintained and was very clean.",
    },
    {
      id: "r6",
      author: "Ritika",
      avatar: "",
      avatarColor: "#FDE8D4",
      avatarTextColor: "#8F3400",
      memberInfo: "New Delhi, India",
      date: "July 2026",
      rating: 5,
      content: "A perfect home at a perfect location in Candolim! Our favorite Candolim Beach was just a 10-minute drive away, which made the stay even more convenient....",
    },
  ],

  photos: [
    {
      id: "p1",
      url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1599895892448055764/original/090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpeg?im_w=1200",
      caption: "Warm living room with wooden pergola seating",
      category: "Living room",
    },
    {
      id: "p2",
      url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1599895892448055764/original/9be71047-fc52-438a-9270-75cb470f6752.jpeg?im_w=1200",
      caption: "Private Jacuzzi hot tub",
      category: "Bathroom",
    },
    {
      id: "p3",
      url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1599895892448055764/original/c904e1ab-a39d-4ef0-bdea-8c0bd16b9e3d.jpeg?im_w=1200",
      caption: "Exterior view of Amor De Goa complex",
      category: "Pool & exterior",
    },
    {
      id: "p4",
      url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1599895892448055764/original/67c61c6f-6260-4809-9510-0360e58a345d.jpeg?im_w=1200",
      caption: "Cozy bedroom with ambient lighting",
      category: "Bedroom",
    },
    {
      id: "p5",
      url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1599895892448055764/original/2367476f-11c4-4a14-a7c6-267be62c1d59.jpeg?im_w=1200",
      caption: "Indoor atrium and living patio",
      category: "Living room",
    },
    {
      id: "p6",
      url: "/tour-bathroom-hires.jpg",
      caption: "Modern bathroom with walk-in rain shower and backlit vanity mirror",
      category: "Bathroom",
    },
    {
      id: "p7",
      url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1599895892448055764/original/70325367-cbae-4993-b560-18cd3f6edd53.jpeg?im_w=720",
      caption: "Fully equipped kitchen with dining area",
      category: "Kitchen & dining",
    },
    {
      id: "p8",
      url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1599895892448055764/original/f6de1663-4e9c-4414-b63b-29a154a92ee1.jpeg?im_w=720",
      caption: "Balcony with garden view",
      category: "Balcony & outdoor",
    },
    {
      id: "p9",
      url: "/tour-pool-hires.jpg",
      caption: "Central swimming pool surrounded by residential balconies",
      category: "Pool & exterior",
    },
    {
      id: "p10",
      url: "/tour-gym-hires.jpg",
      caption: "Modern fitness center gym with cardio and weight equipment",
      category: "Pool & exterior",
    },
  ],

  houseRules: [
    "Check-in after 2:00 pm",
    "Checkout before 11:00 am",
    "3 guests maximum",
  ],

  safetyInfo: [
    "Carbon monoxide alarm not reported",
    "Smoke alarm not reported",
    "Exterior security cameras on property",
  ],

  neighbourhoodHighlights:
    "Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.",
};
