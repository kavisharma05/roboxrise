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
  "https://res.cloudinary.com/dixayfqq8/image/upload/v1779165269/8_9_d6gfzo_1_pt6jbz.png",
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158553/8_1_ihiscd.png",
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158558/8_3_l0gwux.png",
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158563/8_2_sq5tnt.png",
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158567/8_4_uedtbd.png",
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161464/8_8_yotnbb.png",
  "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161468/8_10_oeopwl.png",
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
      "The Haro380 Advanced Kit is a professional-grade 6-axis robotic arm system designed for industrial simulation, advanced research, and high-level engineering education. Built to industrial tolerances, it supports PLC integration, ROS2, MATLAB, and AI-powered voice control, making it one of the most versatile teaching and prototyping platforms available. The Advanced Kit includes the full gripper ecosystem — soft, pneumatic, suction, and electric end-effectors — enabling hands-on exploration of real-world pick-and-place, assembly, and material handling workflows. Ideal for universities, engineering labs, and R&D centers seeking an industrial-grade platform without industrial floor-space requirements.",
    inTheBox: [
      "HARO380 Robotic Arm X 1",
      "Soft-Beak Gripper (Light-Industrial) X 1",
      "3-Finger Soft Gripper (Adjustable Light-Industrial) X 1",
      "4-Finger Soft Gripper (Adjustable Light-Industrial) X 1",
      "2-Finger Suction Cup (Adjustable, with 3 Cup Head Pairs S/M/L) X 1",
      "4-Finger Suction Cup (Adjustable, with 3 Cup Head Pairs S/M/L) X 1",
      "Pneumatic Parallel Gripper X 1",
      "2-Finger Soft Gripper (Adjustable Light-Industrial) X 1",
      "Electric Gripper (Adjustable Stroke and Force) X 1",
      "Suction Cup (with 3 Cup Head Pairs S/M/L) X 1",
      "AI Assistant Voice Control Box X 1",
      "Pneumatic Box X 1",
      "Multifunctional Box X 1",
      "MCP Servers X 1",
      "Emergency Stop Switch X 1",
      "Aluminum Base with Thumb Screws X 1",
      "Calibration Board & Blocks X 1",
      "Robotic Arm Firmware Upgrade Cable X 1",
      "UART Programming Cable X 1",
      "USB & IDC Cable X 1",
      "Power Supply X 1",
      "Handbook X 1",
      "Safety Carry Case X 1",
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
      "The Haro380 Core Kit delivers the same industrial-grade 6-axis robotic arm platform as the Advanced Kit, configured for institutions looking for a focused, cost-efficient entry point into serious robotics education and research. Supporting PLC, ROS2, MATLAB, and AI voice control out of the box, the Core Kit covers the full spectrum of programming paradigms — from block-based control to industrial PLC ladder logic. It ships with essential end-effectors covering soft-grip, electric, and suction modalities, with the ability to expand into the full Advanced Kit accessory range at any time.",
    inTheBox: [
      "HARO380 Robotic Arm X 1",
      "2-Finger Soft Gripper (Adjustable Light-Industrial) X 1",
      "Electric Gripper (Adjustable Stroke and Force) X 1",
      "Suction Cup (with 3 Cup Head Pairs S/M/L) X 1",
      "AI Assistant Voice Control Box X 1",
      "Pneumatic Box X 1",
      "Multifunctional Box X 1",
      "MCP Servers X 1",
      "Emergency Stop Switch X 1",
      "Aluminium Base with Thumb Screws X 1",
      "Calibration Board & Blocks X 1",
      "Robotic Arm Firmware Upgrade Cable X 1",
      "UART Programming Cable X 1",
      "USB & IDC Cable X 1",
      "Power Supply X 1",
      "Handbook X 1",
      "Safety Carry Case X 1",
    ],
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
      "The Mirobot Advanced Kit is a compact yet capable 6-axis robotic arm solution built for engineering education, robotics research, and smart manufacturing simulation. Compatible with ROS, MATLAB, and ROBOXRISE Studio, it supports multi-modal programming from visual block-coding to Python and G-code. The Advanced Kit layers in AI voice control and an electromagnetic gripper on top of the full pneumatic and servo gripper set, enabling a wider range of end-effector experiments. Accompanied by a comprehensive online programming and control textbook, it provides a structured learning path from fundamentals through advanced automation concepts.",
    inTheBox: [
      "ROBOXRISE Mirobot robotic arm X 1",
      "Power cable & High-speed USB cable & IDC cable X 1",
      "Pen holder X 1",
      "Micro servo gripper X 1",
      "Multifunctional extender box X 1",
      "Mirobot sticker X 1",
      "Handbook X 1",
      "Pneumatic set (including pneumatic box, suction cup, two-finger gripper, three-finger soft gripper) X 1",
      "Robot Controller (with USB cable) X 1",
      "AI Assistant Voice Control Box X 1",
      "Electromagnetic Gripper X 1",
      "Online Textbook (ROBOXRISE Mirobot Robotic Arm Programming and Control) X 1",
    ],
  },
  {
    slug: "mirobot-professional-kit",
    name: "Mirobot Professional Kit – 6-Axis Robotic Arm, ROS & MATLAB Simulation",
    category: "Robotic Arms",
    subcategory: "Mirobot",
    images: [
      "https://res.cloudinary.com/dixayfqq8/image/upload/v1779164280/3_3_jsbvp5_1_axcjdm.png",
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
      "The Mirobot Professional Kit is designed for institutions and educators who need a fully equipped 6-axis robotic arm platform for simulation-based teaching and applied robotics training. It supports ROS and MATLAB for academic research workflows while remaining approachable enough for undergraduate and polytechnic-level coursework. Shipping with a complete pneumatic end-effector set, a dedicated robot controller, and the official ROBOXRISE programming and control textbook, the Professional Kit provides everything needed to run structured lab sessions covering kinematics, trajectory planning, and end-effector programming.",
    inTheBox: [
      "ROBOXRISE Mirobot robotic arm X 1",
      "Power cable & High-speed USB cable & IDC cable X 1",
      "Pen holder X 1",
      "Micro servo gripper X 1",
      "Multifunctional extender box X 1",
      "Mirobot sticker X 1",
      "Handbook X 1",
      "Pneumatic set (including pneumatic box, suction cup, two-finger gripper, three-finger soft gripper) X 1",
      "Robot Controller (with USB cable) X 1",
      "Online Textbook (ROBOXRISE Mirobot Robotic Arm Programming and Control) X 1",
    ],
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
      "The Mirobot Education Kit is the accessible entry point into the ROBOXRISE Mirobot ecosystem, purpose-built for classrooms, training labs, and educational institutions introducing students to industrial robotics. The 6-axis arm supports ROS and MATLAB simulation, covering core robotics concepts including forward and inverse kinematics, path planning, and multi-modal control. With the full pneumatic gripper set and the official online programming textbook included, students gain practical exposure to real-world material handling scenarios within a safe, compact, and easy-to-deploy platform.",
    inTheBox: [
      "ROBOXRISE Mirobot robotic arm X 1",
      "Power cable & High-speed USB cable & IDC cable X 1",
      "Pen holder X 1",
      "Micro servo gripper X 1",
      "Multifunctional Extender box X 1",
      "Mirobot sticker X 1",
      "Handbook X 1",
      "Pneumatic set (including pneumatic box, suction cup, two-finger gripper, three-finger soft gripper) X 1",
      "Online Textbook (ROBOXRISE Mirobot Robotic Arm Programming and Control) X 1",
    ],
  },
  {
    slug: "mt4-edu-kit",
    name: "MT4 Edu Kit – 4-Axis Metal Robotic Arm (0.1mm Repeatability, ROS)",
    category: "Robotic Arms",
    subcategory: "MT4",
    images: MT4_EDU_IMAGES,
    price: 300000,
    description:
      "The MT4 Edu Kit is a high-precision 4-axis metal robotic arm built for hands-on robotics education at the secondary and undergraduate level. With 0.1mm repeatability and full ROS compatibility, it brings genuine industrial accuracy to the classroom in a compact, durable form factor. The Edu Kit ships with pneumatic and suction end-effectors, a heavy-duty metal servo gripper, and MCP server integration, enabling students to explore pick-and-place automation, sensor integration, and ROS-based programming from day one. Its rugged all-metal construction ensures longevity in high-use educational environments.",
    inTheBox: [
      "MT4 Robotic Arm X 1",
      "Pen holder X 1",
      "Multifunctional extender box X 1",
      "Pneumatic edu set (including pneumatic box, suction cup, two-finger soft gripper) X 1",
      "Big metal servo gripper X 1",
      "Power supply & high-speed USB cable & IDC cable X 1",
      "Handbook X 1",
      "MCP server X 1",
      "Safety Carry Case X 1",
    ],
  },
  {
    slug: "mt4-advanced-kit",
    name: "MT4 Advanced Kit – 4-Axis Metal Robotic Arm (0.1mm Repeatability, ROS)",
    category: "Robotic Arms",
    subcategory: "MT4",
    images: [...MT4_EDU_IMAGES],
    price: 350000,
    description:
      "The MT4 Advanced Kit expands on the Edu Kit's precise 4-axis metal robotic arm platform with a broader set of end-effectors and control modalities for institutions requiring greater experimental depth. In addition to pneumatic and servo grippers, it includes an electric gripper, electromagnetic gripper, and AI voice control box — enabling comparative end-effector studies and voice-commanded automation demonstrations. A dedicated robot controller and full pneumatic pro set round out the package, making this kit suitable for advanced lab projects, multi-modal robotics courses, and technology showcases.",
    inTheBox: [
      "MT4 Robotic Arm X 1",
      "Pen holder X 1",
      "Multifunctional extender box X 1",
      "Pneumatic pro set (including pneumatic box, suction cup, two-finger soft gripper, three-finger soft gripper) X 1",
      "Big metal servo gripper X 1",
      "Electric Gripper X 1",
      "Electromagnetic Gripper X 1",
      "AI Assistant Voice Control Box X 1",
      "Robot Controller (with USB cable) X 1",
      "Power supply & high-speed USB cable & IDC cable X 1",
      "Handbook X 1",
      "MCP server X 1",
      "Robot Controller (with USB cable) X 1",
      "Safety Carry Case X 1",
    ],
  },
  {
    slug: "opencv-advanced-vision-suite-with-textbook",
    name: "OpenCV Advanced Vision Suite for Programmable Robotics",
    category: "AI & Vision",
    subcategory: "Vision Systems",
    images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161570/86_lqxnzk.png"],
    price: 700000,
    description:
      "The OpenCV Advanced Vision Suite is a high-performance industrial vision system purpose-built for AI-driven robotic automation education and applied research. Developed on the OpenCV library, it delivers a complete hardware-software package — from a 5MP wide-angle camera with precision optics to an NVIDIA Jetson-based AI edge terminal with 128-core GPU acceleration. Seven fully worked source-code projects cover the core curriculum of modern robotic vision: calibration, color and shape sorting, QR and barcode recognition, defect detection, character and plate recognition, vision-guided assembly, and pill sorting. A 7-inch Full HD touchscreen provides a self-contained development and demonstration interface.",
    inTheBox: [
      "Functional Requirements: Developed based on the OpenCV library. Includes projects with source code: vision-robot calibration, color & shape sorting, QR/barcode recognition, screw/nut & fruit sorting, object recognition (characters, plates, defects), vision-guided robotic assembly, pill sorting.",
      "Camera: 5 MP color, 2952 × 1944. Size: 50 × 56 × 91 mm. DC 5V, 0–60°C. Supports AEC, AWB, AGC. Adjustable: brightness, contrast, saturation, sharpness, exposure. Min illumination: 0.2 lux, SNR: 30 dB.",
      "Lens: 1/2.3\", 100° FOV. Relative illumination: 70%. IR filter: 650 ± 10 nm.",
      "AI Edge Terminal: CPU: Quad-core ARM A57 @ 1.43 GHz. GPU: 128-core Maxwell. Memory: 4 GB LPDDR4. Storage: 32 GB microSD. Interfaces: HDMI, DP, USB 3.0, Ethernet, MIPI CSI-2. Expansion: GPIO, I2C, SPI, UART. Size: 110 × 100 × 50 mm.",
      "Display: 7\" IPS (B701-GM), 1920 × 1080, HDMI / AV / VGA, Response time: 8 ms.",
    ],
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
      "The AI Vision Set is a dedicated computer vision add-on for the ROBOXRISE Mirobot and compatible robotic arm platforms, enabling students and researchers to explore machine vision-guided automation. Built around the OpenMV 3 camera module with 3-megapixel resolution, the set provides everything needed to run vision-based sorting, object detection, and calibration experiments. A dedicated display screen, light ring for controlled illumination, wooden block targets, and a visual calibration board create a self-contained vision lab environment. An accompanying online textbook guides learners through developing robotic vision applications using the OpenMV framework.",
    inTheBox: [
      "Vision stand X 1",
      "Vision camera module (OpenMV 3; 3 Million dpi) X 1",
      "Light Ring X 1",
      "Wooden blocks package X 1",
      "Visual calibration board X 1",
      "Display screen X 1",
      "Online Textbook (AI Vision Set - Developing Robotic Vision with OpenMV and ROBOXRISE Mirobot) X 1",
    ],
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
      "The AI-HUB AI Development Kit is a comprehensive all-in-one platform for teaching artificial intelligence, robotics, and automation in an integrated, hands-on environment. At its core is the AI-HUB Console Module — an Arduino MEGA 2560-based controller with built-in AI voice control, color recognition, gesture sensing, infrared detection, and I2C expansion — paired with a Mini AGV mobile robot and an AI vision suction end-tool for robotic arm integration. The kit supports over 15 structured experiments spanning voice-commanded automation, color-based sorting, gesture control, navigation, and multi-sensor fusion, all backed by online textbook access with full source code and tutorial videos. Ideal for secondary schools, vocational institutes, and undergraduate programs building interdisciplinary AI and robotics curricula.",
    inTheBox: [
      "AI-HUB Console Module X 1 (includes: one development board based on Arduino MEGA 2560, one multifunctional extender box for the robotic arm, one built-in air pump, one built-in AI voice speak control module with offline language learning voice recognition sensor and voice announcement function, one infrared detection module, one color recognition module, one I2C expansion module, one green LED, one red LED, one gesture recognition module, one joystick control module, one green button, one red button, and one rotary potentiometer)",
      "AI Vision + Suction Cup End Tool X 1",
      "Mini AGV Set X 1 (includes: one Mini AGV, one fan module, and one RGB color light module)",
      "Scene Map X 1",
      "AI-HUB Online Textbook Access Card X 1 (includes more than 15 detailed experiments with source code and videos for educators)",
      "IR Remote Control X 1",
      "USB to RS485 Module X 1",
      "TF Card X 1",
      "Wi-Fi Module X 1",
      "Bluetooth Module X 1",
      "Blocks Set X 1 (includes: one large cylinder, one small cylinder, one large cuboid, one small cuboid)",
      "Cables Package X 1 (includes: one AI vision module cable, one serial cable XH 0.5m, one RS485 cable 1m, one USB-TypeC cable, one Mini AGV charging cable, and one DC 2-way splitter cable)",
      "Product List X 1",
    ],
  },
  {
    slug: "agv-rover-set",
    name: "AGV Rover Set for Programmable Robotics",
    category: "Accessories",
    subcategory: "Add-ons",
    images: [
      "https://res.cloudinary.com/dixayfqq8/image/upload/v1779164485/111_1_cqyu4w_1_sqbsel.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161350/111_2_pxfsyh.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161360/111_3_vmj8wo.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158248/11_djwoid.png",
    ],
    price: 250000,
    description:
      "The AGV Rover Set introduces autonomous ground vehicle technology to the ROBOXRISE robotics ecosystem, enabling combined arm-and-mobile-robot experiments for smart logistics and flexible manufacturing simulation. The robotic arm vehicle integrates directly with compatible Mirobot and MT4 arm platforms, allowing students to program coordinated pick, carry, and place workflows that reflect real-world AGV deployments in warehouse and factory environments. With a dedicated controller included, the set is ready to integrate into larger production cell configurations or run as a standalone mobile robotics learning module.",
    inTheBox: [
      "Robotic arm vehicle X 1",
      "Controller X 1",
    ],
  },
  {
    slug: "world-builder-set",
    name: "World Builder Set – XFactory Add-on",
    category: "Accessories",
    subcategory: "XFactory Add-ons",
    images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161570/49_qbf6a4.png"],
    price: 225000,
    description:
      "The World Builder Set is a modular factory floor expansion pack for the XFactory ecosystem, giving students and instructors the building blocks to design and reconfigure custom production cell layouts. Featuring roller and push feeder modules, drop gates, a smart sensor storage module, and two Mini AGV robot platforms, it enables the simulation of dynamic material flow, timed release mechanisms, and sensor-triggered logistics sequences. The metal modular floor set and T-slot compatible material trays provide a flexible physical canvas for constructing varied factory scenarios, making it an essential add-on for institutions looking to move beyond fixed-layout production cell experiments into open-ended industrial design challenges.",
    inTheBox: [
      "LED indicator light X 1",
      "Roller feeder module X 1",
      "Push feeder module X 1",
      "Drop gate module X 2",
      "Smart sensor storage module X 1",
      "Material tray set (base connectors and trays) X 1 set",
      "Metal modular floor set X 1 set",
      "Miniature accessories X 1 set",
      "Mini AGV robot platform X 2",
    ],
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
      "The Sliding Rail extends the working envelope of compatible ROBOXRISE robotic arms — Mirobot, MT4, and Haro380 — by adding a linear 7th axis of motion. This transforms stationary arm setups into linear-traversal systems capable of simulating extended-reach industrial workflows such as multi-station assembly, long-run material transfer, and collaborative dual-arm configurations. The mounting plate is precision-engineered for direct arm attachment, and the integrated cable carrier ensures clean, tangle-free cable management throughout the full range of rail travel.",
    inTheBox: [
      "Sliding rail X 1",
      "A mounting plate for robotic arm X 1",
      "Cable carrier X 1",
    ],
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
      "The Conveyor Belt is a modular automation add-on designed to integrate seamlessly with ROBOXRISE Mirobot, MT4, and Haro380 robotic arm platforms, enabling realistic material handling and production line simulations. The included photoelectric sensor module allows students to program trigger-based automation — detecting object presence and coordinating arm response in real time, mirroring industrial conveyor-integrated robotic workflows. Whether used as part of a sorting cell, assembly line, or logistics simulation, the conveyor belt is a foundational component for building multi-station production environments.",
    inTheBox: [
      "Conveyor belt X 1",
      "Photoelectric sensor module X 1",
      "Data cable X 1",
    ],
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
      "The March X Pro LiDAR Kit is a research-grade quadruped robot platform built for autonomous navigation, Sim2Real policy transfer, and advanced legged locomotion research. Equipped with both LiDAR and depth camera sensors, the March X Pro constructs detailed environmental maps and navigates complex terrain with high spatial awareness — capabilities that place it firmly in professional research and advanced vocational training territory. The interface extension module enables custom sensor and payload integration, while the dedicated charging base and replaceable battery support extended experimental sessions. Delivered in a purpose-built transport case, the March X Pro is ready for deployment in robotics labs, university research programs, and high-level robotics competitions.",
    inTheBox: [
      "Robot X 1",
      "Transport Case X 1",
      "Sole Kit X 1",
      "Replaceable Battery X 1",
      "Charger X 1",
      "Charging Base X 1",
      "Interface Extension Module X 1",
      "Depth Camera X 1",
      "LiDAR X 1",
      "User Manual X 1",
    ],
  },
  {
    slug: "brave-edu-kit-biped-robot-sim2real",
    name: "BRAVE Standard Kit – Biped Robot (Sim2Real, Multi-modal RGBD Camera)",
    category: "Advanced Robots",
    subcategory: "Brave",
    images: [
      "https://res.cloudinary.com/dixayfqq8/image/upload/v1779164791/products_1_uaiuhf_2_gew5tf.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161374/16_2_hl5umf.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161380/16_4_zbifh9.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161478/16_3_wasb7q.png",
    ],
    price: 2500000,
    description:
      "The BRAVE Standard Kit is a full-scale bipedal humanoid robot platform designed for advanced research and education at the intersection of legged locomotion, Sim2Real transfer, and multi-modal sensing. Supporting point-foot, wheeled, and sole locomotion modes via interchangeable modals, BRAVE enables systematic experimentation across different gait strategies and terrain interactions. The integrated RGBD camera delivers depth-aware perception for navigation and environment mapping, while the Sim2Real capability allows control policies trained in simulation to be deployed directly on the physical platform. With a handheld remote controller, replaceable battery, and dedicated transport case, the BRAVE Standard Kit is field-ready for campus demonstrations, laboratory research, and robotics competition preparation.",
    inTheBox: [
      "Robot X 1",
      "Transport Case X 1",
      "Point-foot Modal X 1",
      "Wheeled Modal X 1",
      "Sole Modal X 1",
      "Replaceable Battery X 1",
      "Charger X 1",
      "Handheld Remote Controller X 1",
      "User Manual X 1",
    ],
  },
  {
    slug: "automotive-manufacturing-simulation-production-line",
    name: "Automotive Manufacturing Simulation Production Line",
    category: "Training & Simulation",
    subcategory: "Industrial Lines",
    images: ["https://res.cloudinary.com/dixayfqq8/image/upload/v1779165030/AutomotiveManufacturingLine_fi1rkc.jpg"],
    price: 6000000,
    description:
      "In order to better cater to the concepts of industrial flexible production and to restore the automated production processes such as \"handling, assembly, welding, grinding, and warehousing\" during the process of intelligent manufacturing automobiles, a complete set of automobile manufacturing production line is formed accordingly. The controlling code can be stored in the multi-function control box through ROBOXRISE Studio, which is convenient to modify according to the scene, and provides a safe, open and friendly platform for learning robot programming and the engineering of intelligent manufacturing system controlling.",
    inTheBox: [
      "ROBOXRISE Mirobot Education Kit X 5",
      "Bottom plate X 1",
      "ROBOXRISE Robot Vehicle In One X 2",
      "AI Vision Set X 1",
      "400mm Conveyor belt X 5",
      "Car Models, parts and accessories X 1",
      "Display screen X 1",
      "Signaling unit X 5",
      "Main control box (based on Arduino) X 1",
      "Warehousing Unit X 2",
      "Touchscreen module X 1",
    ],
  },
  {
    slug: "mirobot-automobile-intelligent-manufacturing-line",
    name: "Engraved Souvenirs Manufacturing AI Robotics Line",
    category: "Training & Simulation",
    subcategory: "Industrial Lines",
    images: [
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158687/7_2_be3yci.png",
      "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161412/7_1_uxn18v.png",
    ],
    price: 5200000,
    description:
      "The Engraved Souvenirs AI Robotics Manufacturing Line is a full-scale smart manufacturing simulation that takes students through every stage of a real production line — from raw material feeding and AI vision-guided processing to laser engraving, automated packaging, and warehousing. Four Mirobot education arms and an MT4 four-axis arm collaborate across a structured bottom plate with conveyor, OpenCV vision, and a laser engraving machine, all orchestrated by a central control box and touchscreen HMI. This end-to-end manufacturing line delivers the most comprehensive available simulation of AI-integrated industrial production, suitable for advanced vocational institutions, engineering colleges, and technology showcase environments.",
    inTheBox: [
      "ROBOXRISE Mirobot Education Kit X 4",
      "Bottom plate X 1",
      "ROBOXRISE MT4 Edu Kit 4-axis robotic arm X 1",
      "Material Feeding Set X 1",
      "Conveyor belt X 1",
      "OpenCV Vision Set X 1",
      "Auto Packaging Set X 1",
      "Main control box X 1",
      "Accessories (Label boxes, label materials) X 1",
      "Laser engraving machine X 1",
      "Warehousing Unit X 1",
      "Touchscreen module X 1",
    ],
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
      "The Automobile Assembly Cell is a multi-robot production cell simulation replicating the key stages of automotive assembly — including handling, welding simulation, and coordinated multi-arm sequencing — within a structured, touchscreen-controlled training environment. Three Mirobot arms work in coordinated sequence across the medium smart base, guided by an Arduino-based main control system and a touchscreen HMI. A sliding rail extends the working range to simulate real transfer and station-to-station handoff workflows. The full educator documentation kit — including source code, installation guide, and demonstration videos — enables institutions to deploy job-ready automotive manufacturing training without specialist integration expertise.",
    inTheBox: [
      "ROBOXRISE Mirobot (Education Kit X 2 & Professional Kit X 1)",
      "Production Cell Smart Base - M X 1",
      "Sliding rail set X 1",
      "Car Model X 1",
      "Main control box (based on Arduino) X 1",
      "Accessories and welding simulation module X 1",
      "Touchscreen module X 1",
      "Document and educational resource kit (experiment handbook for educators, source code, installation handbook, PPT quick start guide, demonstration videos) X 1",
    ],
  },
  {
    slug: "automobile-assembly-line-robotics-training",
    name: "Automobile Assembly Line Robotics Training",
    category: "Training & Simulation",
    subcategory: "Industrial Lines",
    images: [...AUTOMOTIVE_MANUFACTURING_LINE_IMAGES],
    price: 1150000,
    description:
      "The Automobile Assembly Line Robotics Training system is a full production line configuration that simulates the multi-stage robotic processes of automotive manufacturing — including handling, assembly, sliding rail-based transfer, and welding simulation — using three coordinated ROBOXRISE Mirobot arms on a shared bottom plate. Unlike the cell-based version, this line configuration covers the spatial and sequencing complexity of a real factory floor layout, giving students exposure to multi-station coordination, inter-arm handoffs, and programmable production flow. The complete educator documentation package — with source code, demonstration videos, PPT guides, and installation handbook — enables institutions to run structured automotive robotics courses from day one.",
    inTheBox: [
      "ROBOXRISE Mirobot (Education Kit X 2 & Professional Kit X 1)",
      "Bottom plate X 1",
      "Sliding rail set X 1",
      "Car Model X 1",
      "Main control box (based on Arduino) X 1",
      "Accessories and welding simulation module X 1",
      "Document and educational resource kit (experiment handbook for educators, source code, installation handbook, PPT quick start guide, demonstration videos) X 1",
    ],
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
      "The AI Automatic Sorting Cell combines ROBOXRISE Mirobot robotic arms with AI vision, a conveyor belt, and touchscreen control to simulate an intelligent industrial sorting line. Objects are fed via conveyor, identified by the AI Vision Set, and sorted by the robotic arms into color-coded bins — replicating real-world automated quality-control and logistics workflows. The dual-arm, dual-kit configuration enables students to explore single-arm and collaborative sorting strategies, while the Arduino control box and touchscreen HMI make the system reconfigurable for different sorting scenarios. The full educator resource kit ensures rapid deployment in lab and classroom environments.",
    inTheBox: [
      "ROBOXRISE Mirobot (Education Kit X 1 & Professional Kit X 1)",
      "Production Cell Smart Base - M X 1",
      "Conveyor belt X 1",
      "AI Vision Set X 1",
      "Color block accessories (including color sorting boxes and color blocks) X 1",
      "Main control box (based on Arduino) X 1",
      "Touchscreen module X 1",
      "Document and educational resource kit (experiment handbook for educators, source code, installation handbook, PPT quick start guide, demonstration videos) X 1",
    ],
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
      "The Logistic Warehouse Cell simulates a complete inbound-to-storage warehouse workflow using a coordinated two-arm, two-platform system — a ROBOXRISE Mirobot for inbound handling and an MT4 four-axis arm for precision placement — linked by a conveyor belt. Students program the full material flow: receipt at the conveyor, transfer between arms, and final warehousing with logistics accessories, all managed through a touchscreen HMI on an Arduino control base. This cell bridges mobile inbound logistics with fixed-arm warehousing operations, making it an ideal platform for teaching smart warehouse automation, inter-device coordination, and production cell programming.",
    inTheBox: [
      "ROBOXRISE Mirobot Professional Kit X 1",
      "Production Cell Smart Base - M X 1",
      "ROBOXRISE MT4 Four-Axis Manipulator X 1",
      "Conveyor belt X 1",
      "Logistics accessories X 1",
      "Main control box (based on Arduino) X 1",
      "Touchscreen module X 1",
      "Document and educational resource kit (experiment handbook for educators, source code, installation handbook, PPT quick start guide, demonstration videos) X 1",
    ],
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
    price: 550000,
    description:
      "The Fruit Picking Cell is a self-contained, themed production cell that combines the ROBOXRISE Mirobot Professional Kit with AI color vision, touchscreen control, and a simulated agricultural picking scenario to teach robotic automation in an engaging, accessible format. Students program the Mirobot to identify fruit by color using the onboard sensor module, pick from a simulated tree, and sort into cups — all controlled through a touchscreen interface built on an Arduino main control box. A complete educator resource kit including experiment handbook, source code, PPT quick-start guide, and demonstration videos makes it immediately deployable in classroom and lab settings.",
    inTheBox: [
      "ROBOXRISE Mirobot Professional Kit X 1",
      "Production Cell Smart Base - S X 1",
      "Color sensor module X 1",
      "Fruit tree kit (fruit tree, fruit, cup) X 1",
      "Main control box (based on Arduino) X 1",
      "Touchscreen module X 1",
      "Document and educational resource kit (experiment handbook for educators, source code, installation handbook, PPT quick start guide, demonstration videos) X 1",
    ],
  },
];

/** Controls the display order of products on the product listing page. */
const desiredSlugOrder: string[] = [
  "haro380-advanced-kit",
  "haro380-core-kit",
  "mirobot-advanced-kit",
  "mirobot-professional-kit",
  "mirobot-education-kit",
  "mt4-edu-kit",
  "mt4-advanced-kit",
  "ai-vision-set-programmable-educational-robotics",
  "opencv-advanced-vision-suite-with-textbook",
  "agv-rover-set",
  "conveyor-belt-set-mirobot",
  "sliding-rail-set-mirobot",
  "ai-hub-ai-development-kit",
  "fruit-picking-cell-mirobot-ai-vision-touch-screen",
  "automobile-assembly-cell-mirobot-touch-screen",
  "ai-automatic-sorting-cell-mirobot-touch-screen",
  "logistic-warehouse-cell-mt4-mirobot",
  "mirobot-automobile-intelligent-manufacturing-line",
  "automobile-assembly-line-robotics-training",
  "world-builder-set",
  "brave-edu-kit-biped-robot-sim2real",
  "march-x-pro-lidar-kit-robotic-dog",
  "automotive-manufacturing-simulation-production-line",
];

const orderedSeeds: ProductSeed[] = desiredSlugOrder.map((slug) => {
  const s = seeds.find((seed) => seed.slug === slug);
  if (!s) throw new Error(`Product seed not found for slug: ${slug}`);
  return s;
});

export const allProducts: Product[] = orderedSeeds.map((seed, idx) => ({
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
