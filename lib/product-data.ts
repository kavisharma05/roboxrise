export interface ProductImage {
  src: string;
  alt: string;
}

export interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  verified: boolean;
  title: string;
  body: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  sku: string;
  price: number;
  originalPrice?: number;
  /** When set, UI shows "₹min – ₹max"; `price` is the midpoint for cart/checkout totals. */
  priceRange?: { min: number; max: number };
  currency: string;
  stock: number;
  rating: number;
  reviewCount: number;
  images: ProductImage[];
  usps: string[];
  emiText: string;
  descriptionHtml: string;
  specifications: { label: string; value: string }[];
  inTheBox: string[];
  reviews: Review[];
  faqs: { question: string; answer: string }[];
  /** When true and price is 0, UI shows ₹0 and purchasable controls instead of contact-for-quote. */
  showZeroRupee?: boolean;
  demoVideoUrl?: string;
}

type ProductSeed = {
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  images: string[];
  /** INR */
  price: number;
  priceRange?: { min: number; max: number };
  showZeroRupee?: boolean;
  description: string;
  inTheBox: string[];
};

const productDemoVideoBySlug: Record<string, string> = {
  "haro380-advanced-kit": "https://youtu.be/4jfa3B4-_dk",
  "haro380-core-kit": "https://youtu.be/4jfa3B4-_dk",
  "mirobot-advanced-kit": "https://youtu.be/immhJ6bx5-0",
  "mirobot-professional-kit": "https://youtu.be/immhJ6bx5-0",
  "mirobot-education-kit": "https://youtu.be/immhJ6bx5-0",
  "mt4-edu-kit": "https://youtu.be/qEXNajcEBNA?si=iTuBp5klb3JULw_3",
  "mt4-advanced-kit": "https://youtu.be/qEXNajcEBNA?si=iTuBp5klb3JULw_3",
  "mt4-arduino-adventure-project-bundle": "https://youtu.be/qEXNajcEBNA?si=iTuBp5klb3JULw_3",
  "ai-vision-set-programmable-educational-robotics": "https://youtu.be/Fp3NbSee_hE?si=LFT916asVSdexkCL",
  "opencv-advanced-vision-suite-with-textbook": "https://youtu.be/Fp3NbSee_hE?si=LFT916asVSdexkCL",
  "agv-rover-set": "https://youtu.be/dGIHI7k4GEs?si=LMFo61sWkJxxMpMm",
  "sliding-rail-set-mirobot": "https://youtu.be/7617gnW9c8w?si=pETYJIcW_3X0Bpw2",
  "conveyor-belt-set-mirobot": "https://youtu.be/FSiEQ2FfHVM",
  "ai-hub-ai-development-kit": "https://youtu.be/N2vFpkILVNc?si=WenKv9ykpkwXnkqJ",
  "fruit-picking-cell-mirobot-ai-vision-touch-screen": "https://youtu.be/5tubEeYvcEc?si=pdnoFPeI9walRWgY",
  "automobile-assembly-cell-mirobot-touch-screen": "https://youtu.be/W-wJ-wGru6Q?si=P_hPgZR8jgYIeFhv",
  "ai-automatic-sorting-cell-mirobot-touch-screen": "https://youtu.be/LC5UEwBN-6M?si=NiYKVSsTy1Wzp2sJ",
  "mirobot-automobile-intelligent-manufacturing-line": "https://youtu.be/XTS2Kw1yzds?si=a9AtWqlYgTRAnaRc",
  "automobile-assembly-line-robotics-training": "https://youtu.be/XTS2Kw1yzds?si=a9AtWqlYgTRAnaRc",
  "automotive-manufacturing-simulation-production-line": "https://youtu.be/XTS2Kw1yzds?si=a9AtWqlYgTRAnaRc",
  "logistic-warehouse-cell-mt4-mirobot": "https://youtu.be/XTS2Kw1yzds?si=a9AtWqlYgTRAnaRc",
  "world-builder-set": "https://youtu.be/qEXNajcEBNA?si=UX2DCI5PtOQIbUtD",
  "brave-edu-kit-biped-robot-sim2real": "https://youtu.be/9QQWipVWoeo?si=SSceVuSKMWB1fd2c",
  "march-x-pro-lidar-kit-robotic-dog": "https://youtu.be/oA3h9lV1bL8?si=QTb-5Fp1hG3jXD1I",
};

function buildCatalogDescriptionHtml(name: string, description: string): string {
  return `<h3>${name}</h3><p>${description}</p>`;
}

function deriveUsps(description: string, subcategory: string): string[] {
  const sentences = description
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const filler = [
    `${subcategory} configuration for labs and training centers.`,
    "Institutional procurement and EMI options available via sales.",
    "Contact our team for integration guidance and delivery timelines.",
  ];
  const merged = [...sentences, ...filler];
  return merged.slice(0, 3);
}

function defaultCatalogFaqs(): { question: string; answer: string }[] {
  return [
    {
      question: "What is included with this product?",
      answer:
        "Refer to the In the box section on this page for the items shipped with this configuration.",
    },
    {
      question: "Is institutional pricing or EMI available?",
      answer:
        "Yes. Contact sales for institutional procurement, EMI options, and deployment support tailored to labs and training centers.",
    },
    {
      question: "Can this integrate with our curriculum or existing lab hardware?",
      answer:
        "Most solutions support open APIs and standard robotics stacks (such as ROS/ROS2 and MATLAB). Share your requirements with our team for integration guidance.",
    },
  ];
}

/** Same Cloudinary URLs previously used for MT4 Edu Kit gallery. */
const MT4_EDU_IMAGES = [
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161313/2_5_bo01l4.png",
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161310/2_4_elbie8.png",
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158765/2_3_fxihmy.png",
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158751/2_2_fa1diu.png",
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158746/2_1_mnabc1.png",
];

/** Images previously used for Automobile Assembly Line Robotics Training. */
const AUTOMOTIVE_MANUFACTURING_LINE_IMAGES = [
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158553/8_1_ihiscd.png",
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158558/8_3_l0gwux.png",
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158563/8_2_sq5tnt.png",
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158567/8_4_uedtbd.png",
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161464/8_8_yotnbb.png",
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161468/8_10_oeopwl.png",
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161598/8_9_d6gfzo.png",
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161602/8_5_jvklrv.png",
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161607/8_7_tnf3t4.png",
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161695/8_6_icv1qs.png",
];

const seeds: ProductSeed[] = [
  {
    slug: "haro380-advanced-kit",
    name: "Haro380 Advanced Kit – 6-Axis Industrial Grade, PLC ROS2 MATLAB Voice Control",
    category: "Robotic Arms",
    subcategory: "Haro380",
    images: [
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161389/44_2_nuy4nl.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161493/44_3_zdjgj4.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161497/44_1_ukwce7.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161626/44_4_xojwpw.png",
    ],
    price: 1000000,
    description:
      "A high-end industrial robotic arm system designed for advanced automation, research, and smart manufacturing. It supports PLC integration, ROS2, MATLAB, and voice control, enabling real-world industrial workflows like pick-and-place, assembly, inspection, and AI-assisted operations. Ideal for engineering labs, industrial training centers, and R&D environments.",
    inTheBox: [
      "Full industrial arm",
      "Multiple grippers (soft, suction, pneumatic, electric)",
      "AI voice control system",
      "Pneumatic setup",
      "Controllers",
      "Calibration tools",
      "Cables",
      "Safety case",
    ],
  },
  {
    slug: "haro380-core-kit",
    name: "Haro380 Core Kit – 6-Axis Industrial Grade, PLC ROS2 MATLAB Voice Control",
    category: "Robotic Arms",
    subcategory: "Haro380",
    images: [
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161394/45_2_btaxed.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161508/45_1_r0dpij.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161639/45_3_zpjkth.png",
    ],
    price: 900000,
    description:
      "A streamlined version of the Haro380 Advanced Kit, focused on essential industrial automation capabilities. Suitable for institutions and labs that require industrial-grade robotics with reduced tooling complexity while still supporting PLC, ROS2, MATLAB, and AI-based control.",
    inTheBox: ["Robotic arm", "Essential grippers", "Control systems", "Cables", "Calibration tools", "Safety kit"],
  },
  {
    slug: "mirobot-advanced-kit",
    name: "Mirobot Advanced Kit – 6-Axis Robotic Arm, ROS & MATLAB",
    category: "Robotic Arms",
    subcategory: "Mirobot",
    images: [
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158657/3_2_ro3ruh.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158662/3_3_s0jvpg.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158668/3_4_v6v7s8.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158672/3_5_uf0ycq.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158676/3_6_ubyxzu.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158682/3_7_qytyzr.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161408/3_8_jmiu4g.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161526/3_1_nyolf1.png",
    ],
    price: 425000,
    description:
      "A versatile 6-axis robotic arm designed for advanced robotics education and prototyping. Supports ROS and MATLAB for simulation, control, and AI integration. Includes pneumatic and electromagnetic tools for performing real-world automation tasks such as sorting, gripping, and manipulation.",
    inTheBox: [
      "Robotic arm",
      "Grippers",
      "Pneumatic kit",
      "Controller",
      "AI voice module",
      "Cables",
      "Programming resources",
    ],
  },
  {
    slug: "mirobot-professional-kit",
    name: "Mirobot Professional Kit – 6-Axis Robotic Arm, ROS & MATLAB Simulation",
    category: "Robotic Arms",
    subcategory: "Mirobot",
    images: [
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161662/3_3_jsbvp5.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161417/3_8_orcmy5.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158741/3_7_dwuaxh.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158736/3_6_codjgb.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158731/3_5_j061jg.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158727/3_4_yt80xp.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158722/3_2_vrkfte.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158716/3_1_zaa6qa.png",
    ],
    price: 400000,
    description:
      "A professional training solution focused on simulation-based robotics learning. Enables students and engineers to understand kinematics, motion planning, and industrial workflows using ROS and MATLAB without requiring full industrial hardware complexity.",
    inTheBox: ["Robotic arm", "Grippers", "Pneumatic setup", "Controller", "Cables", "Learning material"],
  },
  {
    slug: "mirobot-education-kit",
    name: "Mirobot Education Kit – 6-Axis Robotic Arm, ROS & MATLAB Simulation",
    category: "Robotic Arms",
    subcategory: "Mirobot",
    images: [
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158692/1_1_ele0mv.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158697/1_2_m8omgl.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158702/1_3_sbgkwo.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158706/1_4_z68khh.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158711/1_5_wkvtxo.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161531/1_8_vmeiok.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161536/1_7_cokkyf.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161658/1_6_b4ryes.png",
    ],
    price: 375000,
    description:
      "An entry-to-intermediate level robotic arm kit tailored for education. Designed to introduce robotics concepts like programming, motion control, and basic automation through hands-on experiments and simulation environments.",
    inTheBox: ["Robotic arm", "Basic grippers", "Cables", "Extender box", "Learning resources"],
  },
  {
    slug: "mt4-edu-kit",
    name: "MT4 Edu Kit – 4-Axis Metal Robotic Arm (0.1mm Repeatability, ROS)",
    category: "Robotic Arms",
    subcategory: "MT4",
    images: MT4_EDU_IMAGES,
    price: 300000,
    description:
      "A precision 4-axis metal robotic arm designed for foundational robotics education and light industrial training. With high repeatability (0.1mm), it is suitable for teaching pick-and-place, drawing, and basic automation workflows.",
    inTheBox: ["Robotic arm", "Grippers", "Pneumatic kit", "Controller modules", "Cables", "Safety case"],
  },
  {
    slug: "mt4-advanced-kit",
    name: "MT4 Advanced Kit – 4-Axis Metal Robotic Arm (0.1mm Repeatability, ROS)",
    category: "Robotic Arms",
    subcategory: "MT4",
    images: [...MT4_EDU_IMAGES],
    price: 350000,
    description:
      "An upgraded version of the MT4 Edu Kit with enhanced tooling and AI capabilities. Supports more complex automation tasks including multi-gripper operations, voice interaction, and integrated control systems for advanced training and prototyping.",
    inTheBox: ["Robotic arm", "Multiple grippers", "AI voice module", "Controller", "Cables", "Accessories"],
  },
  {
    slug: "opencv-advanced-vision-suite-with-textbook",
    name: "OpenCV Advanced Vision Suite for Programmable Robotics",
    category: "AI & Vision",
    subcategory: "Vision Systems",
    images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161570/86_lqxnzk.png"],
    price: 700000,
    description:
      "A complete machine vision system built on OpenCV for industrial and educational use. Enables applications like object detection, sorting, barcode recognition, defect inspection, and vision-guided robotics. Ideal for integrating AI vision into automation workflows.",
    inTheBox: ["Industrial camera", "AI edge processor", "Display system", "Full project-based learning modules"],
  },
  {
    slug: "ai-vision-set-programmable-educational-robotics",
    name: "AI Vision Set for Programmable Educational Robotics",
    category: "AI & Vision",
    subcategory: "Vision Systems",
    images: [
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158279/4_1_sn2uxy.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158283/4_2_w2uw7q.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158288/4_3_aqcrub.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158292/4_4_mezacl.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158515/4_5_tdc9ht.png",
    ],
    price: 250000,
    description:
      "A compact vision system designed for teaching computer vision concepts in robotics. Supports object detection, color recognition, and calibration tasks, making it ideal for beginner to intermediate AI learning environments.",
    inTheBox: ["Camera module", "Lighting system", "Calibration tools", "Display", "Learning materials"],
  },
  {
    slug: "ai-hub-ai-development-kit",
    name: "AI-HUB AI Development Kit / AI Navigation Learning Suite",
    category: "AI & Vision",
    subcategory: "AI Platforms",
    images: [
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158520/5_1_tf85iz.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158524/5_3_doxccx.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158530/5_4_ci6fsa.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158535/5_5_oqglep.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158539/5_7_p9pymm.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161346/5_2_uhz1qs.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161347/5_6_cwazub.png",
    ],
    price: 250000,
    description:
      "An all-in-one AI experimentation platform combining sensors, control systems, and robotics integration. Enables learning and development in voice recognition, gesture control, navigation, and multi-sensor automation systems.",
    inTheBox: ["AI controller", "Sensors", "AGV platform", "Communication modules", "Project-based curriculum"],
  },
  {
    slug: "agv-rover-set",
    name: "AGV Rover Set for Programmable Robotics",
    category: "Accessories",
    subcategory: "Add-ons",
    images: [
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161460/111_1_cqyu4w.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161350/111_2_pxfsyh.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161360/111_3_vmj8wo.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158248/11_djwoid.png",
    ],
    price: 250000,
    description:
      "An autonomous guided vehicle platform designed for robotics navigation and mobile automation experiments. Useful for warehouse simulation, path planning, and logistics automation training.",
    inTheBox: ["Robotic vehicle", "Controller system"],
  },
  {
    slug: "world-builder-set",
    name: "World Builder Set – XFactory Add-on",
    category: "Accessories",
    subcategory: "XFactory Add-ons",
    images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161570/49_qbf6a4.png"],
    price: 225000,
    description:
      "A modular factory simulation add-on that allows users to create customizable production environments. Includes feeders, sensors, and modular structures to simulate real industrial workflows such as material handling and sorting.",
    inTheBox: ["Feeder modules", "Sensor units", "Floor system", "AGVs", "Accessories"],
  },
  {
    slug: "sliding-rail-set-mirobot",
    name: "Sliding Rail Set for Programmable Robotics",
    category: "Accessories",
    subcategory: "Add-ons",
    images: [
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161578/14_d8qqrs.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161338/14_4_rq03qf.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161333/14_3_l9hvxh.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161329/14_2_uw4fez.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161319/14_1_ekpqqd.png",
    ],
    price: 200000,
    description:
      "A linear motion extension system that increases the working range of robotic arms. Enables long-distance pick-and-place operations and simulates industrial gantry systems.",
    inTheBox: ["Rail system", "Mounting plate", "Cable carrier"],
  },
  {
    slug: "conveyor-belt-set-mirobot",
    name: "Conveyor Belt for Programmable Robotics",
    category: "Accessories",
    subcategory: "Add-ons",
    images: [
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158582/13_2_ik9l7p.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158577/13_1_ainavq.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158595/13_3_t4ryi1.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158599/13_jfyqym.jpg",
    ],
    price: 150000,
    description:
      "An industrial-style conveyor module designed for material handling and sorting applications. Integrates with robotic arms and vision systems to simulate automated production lines.",
    inTheBox: ["Conveyor unit", "Sensor module", "Cables"],
  },
  {
    slug: "march-x-pro-lidar-kit-robotic-dog",
    name: "March X Pro LiDAR Kit – Quadruped Robotic Dog (Sim2Real)",
    category: "Advanced Robots",
    subcategory: "Quadruped",
    images: [
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161497/18_1_elvmqs.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158647/18_7_ezfjig.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158642/18_5_y2sozo.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161512/18_6_zjutvv.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161631/18_2_boba7y.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161502/18_3_sdshuu.png",
    ],
    price: 3000000,
    description:
      "A high-performance quadruped robot designed for advanced robotics research, AI navigation, and real-world deployment scenarios. Equipped with LiDAR and depth sensing for autonomous movement and environment mapping.",
    inTheBox: ["Robot", "Sensors", "Battery system", "Accessories"],
  },
  {
    slug: "brave-edu-kit-biped-robot-sim2real",
    name: "BRAVE Edu Kit Standard – Biped Robot (Sim2Real, RGBD)",
    category: "Advanced Robots",
    subcategory: "Brave",
    images: [
      "https://res.cloudinary.com/dixayfqq8/image/upload/v1770365190/products_1_uaiuhf.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161374/16_2_hl5umf.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161380/16_4_zbifh9.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161478/16_3_wasb7q.png",
    ],
    price: 2500000,
    description:
      "A biped humanoid robot platform for studying locomotion, balance, and human-like movement. Supports AI and simulation-to-real-world transfer (Sim2Real) for advanced robotics research and education.",
    inTheBox: ["Robot", "Mobility modules", "Controller", "Accessories"],
  },
  {
    slug: "automotive-manufacturing-simulation-production-line",
    name: "Automotive Manufacturing Simulation Production Line",
    category: "Training & Simulation",
    subcategory: "Industrial Lines",
    images: [...AUTOMOTIVE_MANUFACTURING_LINE_IMAGES],
    price: 6000000,
    description:
      "A full-scale smart factory simulation system replicating real automotive production processes including assembly, welding, material handling, and warehousing. Designed for advanced industrial training and research in smart manufacturing systems.",
    inTheBox: [
      "Multiple robotic arms",
      "AGVs",
      "Conveyors",
      "Vision systems",
      "Centralized control platform",
    ],
  },
  {
    slug: "mirobot-automobile-intelligent-manufacturing-line",
    name: "Mirobot Intelligent Manufacturing Line (Engraved Souvenirs AI Line)",
    category: "Training & Simulation",
    subcategory: "Industrial Lines",
    images: [
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158687/7_2_be3yci.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161412/7_1_uxn18v.png",
    ],
    price: 5200000,
    description:
      "An integrated automation system combining robotics, vision, and engraving processes to simulate end-to-end manufacturing. Ideal for demonstrating Industry 4.0 concepts and automated production workflows.",
    inTheBox: ["Robotic arms", "Conveyor system", "Vision system", "Engraving unit", "Control modules"],
  },
  {
    slug: "mt4-arduino-adventure-project-bundle",
    name: "MT4 Arduino Adventure Project Bundle",
    category: "Training & Simulation",
    subcategory: "Bundles",
    images: [...MT4_EDU_IMAGES],
    price: 3000000,
    description:
      "A comprehensive educational bundle designed to teach robotics, automation, and AI through hands-on projects. Combines multiple robotic systems with conveyors, AI modules, and structured curriculum for complete learning pathways.",
    inTheBox: ["Robotic kits", "Automation add-ons", "Educational content"],
  },
  {
    slug: "automobile-assembly-cell-mirobot-touch-screen",
    name: "Automobile Assembly Cell – Touch Screen Training Solution",
    category: "Training & Simulation",
    subcategory: "Training Cells",
    images: [
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158544/9_2_jx7w7y.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158549/9_5_zc4clk.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161473/9_4_dqtpvb.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161586/9_1_g3wd7o.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161592/9_3_ixy0zw.png",
    ],
    price: 1250000,
    description:
      "A compact industrial training setup that simulates automobile assembly processes. Includes multiple robotic arms and a touchscreen interface for interactive learning and control.",
    inTheBox: ["Robotic arms", "Assembly modules", "Control system", "Training materials"],
  },
  {
    slug: "automobile-assembly-line-robotics-training",
    name: "Automobile Assembly Line Robotics Training",
    category: "Training & Simulation",
    subcategory: "Industrial Lines",
    images: [...AUTOMOTIVE_MANUFACTURING_LINE_IMAGES],
    price: 1150000,
    description:
      "A simplified version of an automotive assembly system designed for teaching production line automation and coordination between multiple robotic systems.",
    inTheBox: ["Robotic arms", "Assembly setup", "Control modules"],
  },
  {
    slug: "ai-automatic-sorting-cell-mirobot-touch-screen",
    name: "AI Automatic Sorting Cell – Touch Screen",
    category: "Training & Simulation",
    subcategory: "Training Cells",
    images: [
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158247/9_6_obaf0x.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158259/9_8_qthuki.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158260/9_1_i1qqwd.png",
    ],
    price: 1100000,
    description:
      "An AI-powered sorting system that uses vision and robotics to identify and sort objects automatically. Demonstrates real-world applications of machine vision and automation.",
    inTheBox: ["Robotic arms", "Conveyor system", "Vision module", "Control interface"],
  },
  {
    slug: "logistic-warehouse-cell-mt4-mirobot",
    name: "Logistic Warehouse Cell (MT4 + Mirobot Integration)",
    category: "Training & Simulation",
    subcategory: "Training Cells",
    images: [
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158638/6_2_bqde65.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158633/6_1_mtgu4j.png",
    ],
    price: 800000,
    description:
      "A warehouse automation training system that simulates logistics operations such as sorting, storage, and material handling using integrated robotic systems.",
    inTheBox: ["Robotic arms", "Conveyor", "Warehouse modules", "Control system"],
  },
  {
    slug: "fruit-picking-cell-mirobot-ai-vision-touch-screen",
    name: "Fruit Picking Cell – AI Vision Touch Screen",
    category: "Training & Simulation",
    subcategory: "Training Cells",
    images: [
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158628/9_7_w5hwu1.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158623/9_4_kj4dw2.png",
    ],
    price: 250000,
    description:
      "An AI-based agricultural robotics training system designed to simulate fruit detection and picking using vision systems and robotic manipulation. Useful for demonstrating agri-automation concepts.",
    inTheBox: ["Robotic arm", "Vision system", "Simulation setup", "Control interface"],
  },
];

export const allProducts: Product[] = seeds.map((seed, idx) => ({
  slug: seed.slug,
  name: seed.name,
  category: seed.category,
  subcategory: seed.subcategory,
  sku: `RBR-CATALOG-${String(idx + 1).padStart(3, "0")}`,
  price: seed.price,
  priceRange: seed.priceRange,
  showZeroRupee: seed.showZeroRupee,
  demoVideoUrl: productDemoVideoBySlug[seed.slug],
  currency: "INR",
  stock: 10,
  rating: 4.8,
  reviewCount: 0,
  images: seed.images.map((src, i) => ({ src, alt: `${seed.name} - Image ${i + 1}` })),
  usps: deriveUsps(seed.description, seed.subcategory),
  emiText: "EMI options and institutional procurement support available via sales.",
  descriptionHtml: buildCatalogDescriptionHtml(seed.name, seed.description),
  specifications: [
    { label: "Category", value: seed.category },
    { label: "Series", value: seed.subcategory },
  ],
  inTheBox: seed.inTheBox,
  reviews: [],
  faqs: defaultCatalogFaqs(),
}));

/** PDP / grid: show list price; ranged products show "₹min – ₹max". */
export function formatProductPriceDisplay(product: Pick<Product, "price" | "showZeroRupee" | "priceRange">): string {
  if (product.price === 0 && !product.showZeroRupee) return "Contact for Pricing";
  if (product.price === 0 && product.showZeroRupee) return "₹0";
  if (product.priceRange) {
    return `₹${product.priceRange.min.toLocaleString("en-IN")} – ₹${product.priceRange.max.toLocaleString("en-IN")}`;
  }
  return "₹" + product.price.toLocaleString("en-IN");
}

/** Cart line unit price (matches PDP range display when `priceRange` is present). */
export function formatCartUnitPrice(item: {
  price: number;
  originalPrice?: number;
  priceRange?: { min: number; max: number };
}): string {
  if (item.priceRange) {
    return `₹${item.priceRange.min.toLocaleString("en-IN")} – ₹${item.priceRange.max.toLocaleString("en-IN")}`;
  }
  return "₹" + item.price.toLocaleString("en-IN");
}

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}
