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
  /** INR; for ranged products use midpoint so cart/checkout totals stay consistent */
  price: number;
  priceRange?: { min: number; max: number };
  showZeroRupee?: boolean;
};

const productFeaturesBySlug: Record<string, string[]> = {
  "haro380-advanced-kit": [
    "6-Axis + 1 DoF Desktop Industrial Robot Arm",
    "±0.05 mm Repeatability for high-precision automation & teaching",
    "500 g Rated Payload (Up to 1000 g Max under specific conditions)",
    "434 mm Reach (393 mm from wrist) for compact yet extended workspace",
    "Open API & Multi-Protocol Control (USB / RS485 / Wi-Fi / Bluetooth / UART / Modbus)",
    "Industrial-Grade Harmonic Drive Joints for accuracy & rigidity",
    "Advanced Multi-Tool Package (electric, pneumatic, soft-beak, and suction end-effectors)",
    "Developer-Friendly Ecosystem (Blockly, Python, ROS2, MATLAB, C++, LLM AI frameworks)",
    "Any-Angle Mounting & Ultra-Compact Desktop Deployment",
  ],
  "haro380-core-kit": [
    "6-Axis + 1 DoF Desktop Industrial Robot Arm",
    "±0.05 mm Repeatability for high-precision automation & teaching",
    "500 g Rated Payload (Up to 1000 g Max under specific conditions)",
    "434 mm Reach (393 mm from wrist) for compact yet extended workspace",
    "Open API & Multi-Protocol Control (USB / RS485 / Wi-Fi / Bluetooth / UART / Modbus)",
    "Industrial-Grade Harmonic Drive Joints for accuracy & rigidity",
    "Core Essential Setup optimized for custom laboratory/developer integration",
    "Developer-Friendly Ecosystem (Blockly, Python, ROS2, MATLAB, C++, LLM AI frameworks)",
    "Any-Angle Mounting & Ultra-Compact Desktop Deployment",
  ],
  "mirobot-advanced-kit": [
    "6-Axis + 1 DoF Desktop Educational Robot Arm",
    "±0.2 mm Repeatability for stable teaching demos",
    "250 g Payload (Up to 400 g Max) for pick-and-place & tool experiments",
    "315 mm Reach for a compact educational workspace",
    "Open API & Multi-Protocol Control (USB / Serial / RS485 / Bluetooth / Wi-Fi)",
    "Lightweight 1.5 kg Design for easy classroom deployment",
    "Expanded End-Effectors & AI Voice Control Box for hands-free LLM integration",
    "Developer-Friendly Ecosystem (ROS, MATLAB, Python, Arduino, C++)",
    "Digital Twin & Simulation Integration (CoppeliaSim / V-REP / Omniverse)",
  ],
  "mirobot-professional-kit": [
    "6-Axis + 1 DoF Desktop Educational Robot Arm",
    "±0.2 mm Repeatability for stable teaching demos",
    "250 g Payload (Up to 400 g Max) for pick-and-place & tool experiments",
    "315 mm Reach for a compact educational workspace",
    "Open API & Multi-Protocol Control (USB / Serial / RS485 / Bluetooth / Wi-Fi)",
    "Lightweight 1.5 kg Design for easy classroom deployment",
    "Professional Software Suite integration for university-level kinematic studies",
    "Developer-Friendly Ecosystem (ROS, MATLAB, Python, Arduino, C++)",
    "Digital Twin & Simulation Integration (CoppeliaSim / V-REP / Omniverse)",
  ],
  "mirobot-education-kit": [
    "6-Axis + 1 DoF Desktop Educational Robot Arm",
    "±0.2 mm Repeatability for stable teaching demos",
    "250 g Payload (Up to 400 g Max) for pick-and-place & tool experiments",
    "315 mm Reach for a compact educational workspace",
    "Open API & Multi-Protocol Control (USB / Serial / RS485 / Bluetooth / Wi-Fi)",
    "Lightweight 1.5 kg Design for easy classroom deployment",
    "Standard Gripper & Pen Holder included for basic robotics tasks",
    "K-12 STEM Curriculum Ready for straightforward classroom adoption",
    "Developer-Friendly Ecosystem (Blockly, Python, Arduino)",
  ],
  "mt4-edu-kit": [
    "Metal 4-Axis + 1 DoF Desktop Robot Arm",
    "±0.1 mm Repeatability for stable labs, demos, and calibration practice",
    "500 g Rated Payload (Up to 600 g Max) for pick-and-place, sorting, and light tooling",
    "359 mm Reach for wide operational range",
    "Open API & Multi-Protocol Control (USB / Serial / RS485 / Bluetooth / Wi-Fi)",
    "CNC Machined Rebuildable Structure for hands-on reverse engineering learning",
    "Industrial-Class End Effectors included (soft grippers, electromagnetic grippers)",
    "Developer-Friendly Ecosystem (ROS2, Arduino, Omniverse Digital Twin)",
    "PC-Free Operation via included AI Assistant Voice Control Box",
  ],
  "ai-vision-set-programmable-educational-robotics": [
    "OpenMV Machine Vision Module with 640×480 color camera",
    "High-Quality CNC-Machined Aluminum Casing for durability",
    "Dedicated Digital Textbook & 15+ Experiments included for guided learning",
    "Python Programmable directly via the OpenMV IDE",
    "Universal Compatibility with Mirobot, MT4, and Haro380 robotic arms",
    "Built-in Display Screen & Light Ring for real-time visual feedback",
    "Visual Calibration Board & Wooden Blocks included for immediate setup",
  ],
  "opencv-advanced-vision-suite-with-textbook": [
    "Professional-Grade Camera Sensor tailored for advanced computer vision",
    "OpenCV Algorithm Integration for complex object tracking and manipulation",
    "High-Resolution Perception for intricate laboratory and university research",
    "Dedicated Advanced Textbook focusing on higher-education AI concepts",
    "Universal Compatibility with WLKATA industrial and educational robotic arms",
    "Python & C++ Developer Environment for algorithmic testing",
    "Industrial-Grade Mounting Stand for stability during experiments",
  ],
  "agv-rover-set": [
    "Programmable Automated Guided Vehicle (AGV) Base",
    "Mobile Manipulator Capable when integrated with WLKATA robotic arms",
    "Multi-Directional Navigation for warehouse and factory simulations",
    "Open API Control for integration into smart factory ecosystems",
    "Built-in Sensor Array for obstacle avoidance and line-following",
    "Expandable Chassis for mounting custom tooling or secondary modules",
    "Python & Arduino Programmable for logistics training",
  ],
  "conveyor-belt-set-mirobot": [
    "Motorized Mini Conveyor Belt for simulating industrial continuous flow",
    "Adjustable Speed Control for precise assembly line timing and synchronization",
    "Universal Compatibility seamlessly linking Haro380, Mirobot, and MT4 stations",
    "Plug-and-Play Integration into WLKATA XFactory controller hubs",
    "Heavy-Duty Belting designed to reliably move various miniature objects",
    "Sensor Integration Ready for IR triggers and color inspection checkpoints",
  ],
  "sliding-rail-set-mirobot": [
    "Motorized Linear Axis Track (7th Axis) for expanding robotic workspaces",
    "High-Precision Stepper Motor Drive for accurate multi-axis synchronization",
    "Seamless Hardware Integration allowing Mirobot/MT4 to travel laterally",
    "Open API Control for programming complex, wide-area pick-and-place tasks",
    "Durable Aluminum Extrusion Build for smooth and rigid travel",
    "WLKATA Studio & ROS Integration for advanced kinematic programming",
  ],
  "ai-navigation-learning-suite-with-textbook": [
    "XFactory Brain Central Control Console for multi-modal operations",
    "Voice, Vision, and Gesture Recognition sensors included",
    "Arduino MEGA 2560 Based architecture for accessible programming",
    "Comprehensive Digital Textbook featuring step-by-step smart factory labs",
    "IoT Ready with included Wi-Fi, Bluetooth, and RS485 communication modules",
    "Mini AGV & VisionGrip integration for comprehensive automation training",
    "Built-in Infrared Detection & Color Recognition modules",
  ],
  "ai-hub-ai-development-kit": [
    "XFactory Brain Central Control Console designed for modular expansion",
    "Arduino MEGA 2560 Based Development Board for core processing",
    "Built-in Air Pump & Extender Box for driving pneumatic end-effectors",
    "Offline Voice Recognition Sensor for responsive verbal commands",
    "Infrared & Color Detection Modules for immediate environmental sensing",
    "Multi-Robot Synchronization hub for building complex smart miniature factories",
  ],
  "fruit-picking-cell-mirobot-ai-vision-touch-screen": [
    "Standalone Mini Workcell simulating agricultural automation workflows",
    "Integrated AI Vision Module for crop recognition, color, and shape tracking",
    "Touch Screen Interface for intuitive, PC-free system control and operation",
    "Mirobot 6-Axis Arm Integration for precise, delicate pick-and-place tasks",
    "Enclosed Safety Design suitable for CTE (Career and Technology Education)",
    "Pre-Programmed Sorting Algorithms ready for immediate classroom demonstration",
  ],
  "automobile-assembly-cell-mirobot-touch-screen": [
    "Standalone Automotive CTE Training Workstation",
    "Miniature Car Chassis Components provided for realistic assembly simulations",
    "Touch Screen Interface for managing complex, multi-step assembly flows",
    "Mirobot 6-Axis Arm Integration mimicking real-world automotive line robotics",
    "Enclosed Safety Design ideal for high school and vocational training",
    "Process Validation & Quality Control programming capabilities",
  ],
  "ai-automatic-sorting-cell-mirobot-touch-screen": [
    "Standalone Classic Factory Training Workstation",
    "Color & Shape Vision Sensors for identifying and categorizing objects",
    "Customized Physical Pathway for routing sorted materials",
    "Touch Screen Interface for workflow monitoring and manual overrides",
    "Mirobot 6-Axis Arm Integration for rapid, continuous pick-and-place sorting",
    "Enclosed Safety Design for continuous exhibition or classroom use",
  ],
  "logistic-warehouse-cell-mt4-mirobot": [
    "Dual-Robot Integrated Workstation mimicking modern warehouse logistics",
    "MT4 4-Axis Arm for heavy-lifting, sorting, and primary palletizing",
    "Mirobot 6-Axis Arm for precise routing and complex shelving operations",
    "Multi-Robot Coordination programmed via centralized XFactory architecture",
    "Miniature Racking & Pallet System included for realistic simulation",
    "Open API Ready for custom routing algorithms and digital twin tracking",
  ],
  "mirobot-automobile-intelligent-manufacturing-line": [
    "Extended Multi-Station Setup simulating an end-to-end car manufacturing plant",
    "Multi-Robot Linkage allowing multiple Mirobots to perform sequential tasks",
    "Integrated Conveyor Systems connecting distinct assembly checkpoints",
    "Intelligent Sensor Arrays for triggering actions as chassis move down the line",
    "Full CTE Training Curriculum focus on line balancing and systems integration",
    "Open API & PLC Compatible for advanced factory automation software training",
  ],
  "automobile-assembly-line-robotics-training": [
    "Comprehensive CTE Training Setup focused on sequential assembly workflows",
    "Multi-Robot Synchronization teaching collaborative automation concepts",
    "Component Feeding Systems simulating real-world automotive supply lines",
    "Quality Assurance Vision Checkpoints for in-line inspections",
    "XFactory Brain Integration for unified line control and monitoring",
    "Open API & ROS Compatible for advanced university-level logistics research",
  ],
  "ai-automatic-sorting-line-mirobot-training-solution": [
    "Extended Continuous Sorting Line with multiple intervention points",
    "Multi-Stage Vision & IR Sensors for complex quality control routing",
    "Integrated Conveyor Belts moving components between sorting stations",
    "Mirobot 6-Axis Arm Integration for rapid defect removal or categorization",
    "PLC & XFactory Control for real-time adjustments and line speed modifications",
    "Comprehensive CTE Training Curriculum for automated logistics",
  ],
  "educational-programmable-robotics-fruit-picking-line": [
    "Multi-Station Agricultural Automation Line simulating harvest-to-packaging",
    "Multi-Stage Vision Sensors identifying crop ripeness (color/size)",
    "Integrated Conveyor Systems linking the picking and packaging zones",
    "Mirobot 6-Axis Arm Integration equipped with soft-grippers for delicate handling",
    "Digital Twin / Simulation Ready for virtual testing before physical deployment",
    "Open API Control for teaching agricultural tech (AgTech) programming",
  ],
  "mini-t-slot-starter-set": [
    "Structural Hardware Kit for building custom automated workcells",
    "High-Quality Aluminum Extrusion Profiles included (8x8mm, 10x10mm, 15x15mm)",
    "Modular Design for endless configurations of miniature smart factories",
    "Custom Brackets & Mounting Hardware included for rigid assembly",
    "Seamless XFactory Compatibility for mounting sensors, cameras, and robots",
    "Lightweight yet durable foundation for desktop engineering projects",
  ],
  "omniconveyor-standard-set": [
    "Modular XFactory Conveyor Component for expansive smart factory builds",
    "Omni-Directional Routing Capabilities for complex material handling simulations",
    "Seamless Hardware Integration locking perfectly into WLKATA T-slot environments",
    "Adjustable Speed & Reversible Motors for versatile flow control",
    "Open API Control via AI-HUB for synchronous multi-robot operations",
  ],
  "world-builder-set": [
    "Advanced Structural Ecosystem Kit for expanding XFactory footprints",
    "Environmental Framing Components for building multi-level miniature factories",
    "Modular Connectors & Bases to secure robots, rails, and conveyors",
    "Heavy-Duty Desktop Mounting to ensure precision during high-speed operations",
    "Seamless XFactory Compatibility prioritizing scalable engineering curriculums",
  ],
  "brave-edu-kit-biped-robot-sim2real": [
    "Bipedal Multi-Modal Legged Robot Platform for advanced humanoid research",
    "Sim2Real Ready bridging virtual simulations to physical robot hardware",
    "3-in-1 Modular Foot-End (Point, Wheeled, Sole) for unmatched testing versatility",
    "Multi-Modal RGBD Camera integration for complex environmental perception",
    "High-Performance Motion Control Algorithms included out-of-the-box",
    "Fully Open SDK & Hardware Interface for custom algorithm validation",
    "Reinforcement Learning (RL) Optimized for embodied intelligence development",
    "Peripheral Expansion Ports for cross-field sensory integration",
  ],
  "march-x-pro-lidar-kit-robotic-dog": [
    "Quadruped Robot (Robotic Dog) Platform for agile mobility and AI research",
    "Sim2Real & Reinforcement Learning (RL) SDK integration for rapid development",
    "130° Wide-Angle 1080p Depth Camera for visual perception and mapping",
    "Built-in LiDAR & Dual Ultrasonic Radars for precise spatial navigation",
    "Quad-core ARM Cortex-A76 & Cortex-A55 with 6 TOPs NPU for on-device AI computing",
    "Auto-Stop & People Tracking advanced navigation and safety capabilities",
    "Smartphone Remote Control App (Android 6.0+) for manual piloting",
    "Built-in Front Light for safe operation in low-light environments",
  ],
};

const productDemoVideoBySlug: Record<string, string> = {
  "haro380-advanced-kit": "https://youtu.be/4jfa3B4-_dk",
  "haro380-core-kit": "https://youtu.be/4jfa3B4-_dk",
  "mirobot-advanced-kit": "https://youtu.be/immhJ6bx5-0",
  "mirobot-professional-kit": "https://youtu.be/immhJ6bx5-0",
  "mirobot-education-kit": "https://youtu.be/immhJ6bx5-0",
  "mt4-edu-kit": "https://youtu.be/qEXNajcEBNA?si=iTuBp5klb3JULw_3",
  "ai-vision-set-programmable-educational-robotics": "https://youtu.be/Fp3NbSee_hE?si=LFT916asVSdexkCL",
  "opencv-advanced-vision-suite-with-textbook": "https://youtu.be/Fp3NbSee_hE?si=LFT916asVSdexkCL",
  "agv-rover-set": "https://youtu.be/dGIHI7k4GEs?si=LMFo61sWkJxxMpMm",
  "sliding-rail-set-mirobot": "https://youtu.be/7617gnW9c8w?si=pETYJIcW_3X0Bpw2",
  "ai-navigation-learning-suite-with-textbook": "https://youtu.be/N2vFpkILVNc?si=4Y6BbTt6X95xuNOv",
  "ai-hub-ai-development-kit": "https://youtu.be/N2vFpkILVNc?si=WenKv9ykpkwXnkqJ",
  "fruit-picking-cell-mirobot-ai-vision-touch-screen": "https://youtu.be/5tubEeYvcEc?si=pdnoFPeI9walRWgY",
  "automobile-assembly-cell-mirobot-touch-screen": "https://youtu.be/W-wJ-wGru6Q?si=P_hPgZR8jgYIeFhv",
  "ai-automatic-sorting-cell-mirobot-touch-screen": "https://youtu.be/LC5UEwBN-6M?si=NiYKVSsTy1Wzp2sJ",
  "mirobot-automobile-intelligent-manufacturing-line": "https://youtu.be/XTS2Kw1yzds?si=a9AtWqlYgTRAnaRc",
  "automobile-assembly-line-robotics-training": "https://youtu.be/XTS2Kw1yzds?si=a9AtWqlYgTRAnaRc",
  "ai-automatic-sorting-line-mirobot-training-solution": "https://youtu.be/XTS2Kw1yzds?si=a9AtWqlYgTRAnaRc",
  "educational-programmable-robotics-fruit-picking-line": "https://youtu.be/cGGV7HuHrfc?si=zgff1SPUPt_7XtFe",
  "omniconveyor-standard-set": "https://youtu.be/mY0FeIqtmlY?si=Ti8XhEuaqgIb3FqM",
  "world-builder-set": "https://youtu.be/qEXNajcEBNA?si=UX2DCI5PtOQIbUtD",
  "brave-edu-kit-biped-robot-sim2real": "https://youtu.be/9QQWipVWoeo?si=SSceVuSKMWB1fd2c",
  "march-x-pro-lidar-kit-robotic-dog": "https://youtu.be/oA3h9lV1bL8?si=QTb-5Fp1hG3jXD1I",
};

function buildDescriptionHtml(name: string, features: string[]): string {
  if (features.length === 0) {
    return `<h3>${name}</h3><p>Official ROBOXRISE catalog entry. Contact sales for full technical details, pricing, and delivery timelines.</p>`;
  }
  const intro = buildIntroSummary(features);
  const featuresHtml = features.map((feature) => `<li>${feature}</li>`).join("");
  return `<h3>${name}</h3><p>${intro}</p><p>Product Features</p><ul>${featuresHtml}</ul>`;
}

function buildIntroSummary(features: string[]): string {
  const lead = features[0];
  const secondary = features[1];
  if (lead && secondary) {
    return `${lead}. ${secondary}. Built for practical deployment, training, and rapid prototyping across educational and industrial workflows.`;
  }
  if (lead) {
    return `${lead}. Built for practical deployment, training, and rapid prototyping across educational and industrial workflows.`;
  }
  return "Built for practical deployment, training, and rapid prototyping across educational and industrial workflows.";
}

function deriveSpecLabel(feature: string, index: number): string {
  const normalized = feature.toLowerCase();
  if (normalized.includes("repeatability")) return "Repeatability";
  if (normalized.includes("payload")) return "Payload";
  if (normalized.includes("reach")) return "Reach";
  if (normalized.includes("axis")) return "Axis Configuration";
  if (normalized.includes("open api") || normalized.includes("multi-protocol")) return "Connectivity & Control";
  if (normalized.includes("digital twin") || normalized.includes("simulation")) return "Simulation Support";
  if (normalized.includes("camera") || normalized.includes("vision")) return "Vision System";
  if (normalized.includes("lidar")) return "LiDAR";
  if (normalized.includes("sdk")) return "SDK & Development";
  if (normalized.includes("curriculum") || normalized.includes("textbook")) return "Learning Resources";
  if (normalized.includes("touch screen")) return "User Interface";
  if (normalized.includes("conveyor")) return "Conveyor Integration";
  if (normalized.includes("multi-robot")) return "Multi-Robot Coordination";
  return `Feature ${index + 1}`;
}

function buildFaqsFromFeatures(features: string[]): { question: string; answer: string }[] {
  if (features.length === 0) return [];

  const hasOpenApi = features.some((f) => /open api|multi-protocol/i.test(f));
  const hasSimulation = features.some((f) => /digital twin|simulation|sim2real/i.test(f));
  const hasVision = features.some((f) => /vision|camera|lidar|color/i.test(f));

  const faqs: { question: string; answer: string }[] = [
    {
      question: "What are the core capabilities of this product?",
      answer: features.slice(0, 3).join(" "),
    },
  ];

  if (hasOpenApi) {
    faqs.push({
      question: "Can this product be integrated with custom software?",
      answer:
        "Yes. This model supports open API-based integration and protocol-level control for custom workflows in labs, classrooms, and industrial training setups.",
    });
  }

  if (hasSimulation) {
    faqs.push({
      question: "Does it support simulation or digital twin workflows?",
      answer:
        "Yes. This product includes simulation-oriented capabilities, making it suitable for virtual validation and model-based experimentation before physical deployment.",
    });
  }

  if (hasVision) {
    faqs.push({
      question: "Is this suitable for AI vision and perception exercises?",
      answer:
        "Yes. Its vision/perception-ready feature set supports object detection, tracking, and AI-assisted automation training depending on the configured setup.",
    });
  }

  faqs.push({
    question: "Who is this product designed for?",
    answer:
      "It is intended for STEM education, CTE labs, universities, robotics developers, and smart-factory training environments.",
  });

  return faqs.slice(0, 4);
}

const seeds: ProductSeed[] = [
  { slug: "ai-automatic-sorting-cell-mirobot-touch-screen", name: "AI Automatic Sorting Cell (Mirobot) Touch Screen ROBOXRISE", category: "Training & Simulation", subcategory: "Training Cells", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158247/9_6_obaf0x.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158259/9_8_qthuki.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158260/9_1_i1qqwd.png"], price: 1055000 },
  { slug: "agv-rover-set", name: "AGV Rover Set ROBOXRISE", category: "Accessories", subcategory: "Add-ons", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161460/111_1_cqyu4w.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161350/111_2_pxfsyh.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161360/111_3_vmj8wo.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158248/11_djwoid.png"], price: 200000 },
  { slug: "ai-navigation-learning-suite-with-textbook", name: "AI Navigation Learning Suite (With Textbook) - XFactory Brain - Control Robotic Arms with AI Vision, Voice, Gesture, Arduino ROBOXRISE", category: "AI & Vision", subcategory: "Learning Suites", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158270/5_3_hibnx4.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158271/5_1_mqdyxr.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158279/5_7_c2wckc.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161455/5_pc32nn.png"], price: 200000 },
  { slug: "ai-vision-set-programmable-educational-robotics", name: "AI Vision Set for Programmable Educational Robotics ROBOXRISE", category: "AI & Vision", subcategory: "Vision Systems", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158279/4_1_sn2uxy.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158283/4_2_w2uw7q.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158288/4_3_aqcrub.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158292/4_4_mezacl.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158515/4_5_tdc9ht.png"], price: 200000 },
  { slug: "ai-hub-ai-development-kit", name: "AI-HUB AI Development Kit ROBOXRISE", category: "AI & Vision", subcategory: "AI Platforms", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158520/5_1_tf85iz.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158524/5_3_doxccx.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158530/5_4_ci6fsa.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158535/5_5_oqglep.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158539/5_7_p9pymm.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161346/5_2_uhz1qs.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161347/5_6_cwazub.png"], price: 125000 },
  { slug: "ai-automatic-sorting-line-mirobot-training-solution", name: "AI Automatic Sorting Line (Mirobot) Training Solution ROBOXRISE", category: "Training & Simulation", subcategory: "Industrial Lines", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161445/15_4_dbqbw4.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161436/15_2_prfaew.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161441/15_3_lkplnh.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161431/15_1_hgsggn.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161449/15_5_nhbn4t.png"], price: 1450000, priceRange: { min: 1350000, max: 1550000 } },
  { slug: "automobile-assembly-cell-mirobot-touch-screen", name: "Automobile Assembly Cell (Mirobot) Car Manufacturing Training Solution Touch Screen ROBOXRISE", category: "Training & Simulation", subcategory: "Training Cells", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158544/9_2_jx7w7y.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158549/9_5_zc4clk.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161473/9_4_dqtpvb.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161586/9_1_g3wd7o.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161592/9_3_ixy0zw.png"], price: 1180000 },
  { slug: "automobile-assembly-line-robotics-training", name: "Automobile Assembly Line Robotics Training ROBOXRISE", category: "Training & Simulation", subcategory: "Industrial Lines", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158553/8_1_ihiscd.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158558/8_3_l0gwux.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158563/8_2_sq5tnt.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158567/8_4_uedtbd.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161464/8_8_yotnbb.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161468/8_10_oeopwl.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161598/8_9_d6gfzo.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161602/8_5_jvklrv.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161607/8_7_tnf3t4.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161695/8_6_icv1qs.png"], price: 1080000 },
  { slug: "brave-edu-kit-biped-robot-sim2real", name: "BRAVE Edu Kit - Biped Robot Sim2Real Multi-modal RGBD Camera SD ROBOXRISE", category: "Advanced Robots", subcategory: "Brave", images: ["https://res.cloudinary.com/dixayfqq8/image/upload/v1770365190/products_1_uaiuhf.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161374/16_2_hl5umf.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161380/16_4_zbifh9.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161478/16_3_wasb7q.png"], price: 2480000 },
  { slug: "conveyor-belt-set-mirobot", name: "Conveyor belt Set Mirobot ROBOXRISE", category: "Accessories", subcategory: "Add-ons", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158582/13_2_ik9l7p.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158577/13_1_ainavq.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158595/13_3_t4ryi1.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158599/13_jfyqym.jpg"], price: 125000 },
  { slug: "educational-programmable-robotics-fruit-picking-line", name: "Educational Programmable Robotics Simulation Fruit Picking Line ROBOXRISE", category: "Training & Simulation", subcategory: "Industrial Lines", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158614/10_3_ysfiab.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158609/10_2_u22o7n.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158604/10_1_non9af.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158619/10_5_jxtbmn.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161384/10_4_udqubb.png"], price: 700000, priceRange: { min: 650000, max: 750000 } },
  { slug: "fruit-picking-cell-mirobot-ai-vision-touch-screen", name: "Fruit Picking Cell (Mirobot)  AI Vision Touch Screen ROBOXRISE", category: "Training & Simulation", subcategory: "Training Cells", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158628/9_7_w5hwu1.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158623/9_4_kj4dw2.png"], price: 505000 },
  { slug: "haro380-advanced-kit", name: "Haro380 Advanced Kit  6-Axis Industrial Grade, PLC ROS2 MATLAB Voice Control ROBOXRISE", category: "Robotic Arms", subcategory: "Haro380", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161389/44_2_nuy4nl.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161493/44_3_zdjgj4.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161497/44_1_ukwce7.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161626/44_4_xojwpw.png"], price: 950000 },
  { slug: "haro380-core-kit", name: "Haro380 Core Kit  6-Axis Industrial Grade, PLC ROS2 MATLAB Voice Control ROBOXRISE", category: "Robotic Arms", subcategory: "Haro380", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161394/45_2_btaxed.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161508/45_1_r0dpij.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161639/45_3_zpjkth.png"], price: 850000 },
  { slug: "logistic-warehouse-cell-mt4-mirobot", name: "Logistic Warehouse Cell (MT4 and Mirobot) ROBOXRISE", category: "Training & Simulation", subcategory: "Training Cells", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158638/6_2_bqde65.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158633/6_1_mtgu4j.png"], price: 755000 },
  { slug: "march-x-pro-lidar-kit-robotic-dog", name: "March X Pro LiDAR Kit - Robotic Dog - Quadruped Robot, Sim2Real ROBOXRISE", category: "Advanced Robots", subcategory: "Quadruped", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161497/18_1_elvmqs.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158647/18_7_ezfjig.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158642/18_5_y2sozo.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161512/18_6_zjutvv.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161631/18_2_boba7y.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161502/18_3_sdshuu.png"], price: 2955000 },
  { slug: "mini-t-slot-starter-set", name: "Mini T-slot Starter Set _ Aluminum profiles 8x8mm 10x10mm 15x15mm – ROBOXRISE", category: "Accessories", subcategory: "XFactory Add-ons", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158652/15_2_kndsnk.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161402/15_1_unap0p.png"], price: 75000 },
  { slug: "mirobot-advanced-kit", name: "Mirobot Advanced Kit  6-Axis Robotic Arm Ros and Matlab ROBOXRISE", category: "Robotic Arms", subcategory: "Mirobot", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158657/3_2_ro3ruh.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158662/3_3_s0jvpg.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158668/3_4_v6v7s8.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158672/3_5_uf0ycq.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158676/3_6_ubyxzu.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158682/3_7_qytyzr.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161408/3_8_jmiu4g.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161526/3_1_nyolf1.png"], price: 375000 },
  { slug: "mirobot-automobile-intelligent-manufacturing-line", name: "Mirobot Automobile intelligent manufacturing line ROBOXRISE", category: "Training & Simulation", subcategory: "Industrial Lines", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158687/7_2_be3yci.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161412/7_1_uxn18v.png"], price: 1550000, priceRange: { min: 1450000, max: 1650000 } },
  { slug: "mirobot-education-kit", name: "Mirobot Education Kit  6 Axis Robotic Arm Ros and Matlab Simulation Teaching ROBOXRISE", category: "Robotic Arms", subcategory: "Mirobot", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158692/1_1_ele0mv.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158697/1_2_m8omgl.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158702/1_3_sbgkwo.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158706/1_4_z68khh.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158711/1_5_wkvtxo.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161531/1_8_vmeiok.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161536/1_7_cokkyf.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161658/1_6_b4ryes.png"], price: 655000 },
  { slug: "mirobot-professional-kit", name: "Mirobot Professional Kit  6-Axis Robotic Arm Ros and Matlab Simulation Teaching ROBOXRISE", category: "Robotic Arms", subcategory: "Mirobot", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161662/3_3_jsbvp5.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161417/3_8_orcmy5.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158741/3_7_dwuaxh.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158736/3_6_codjgb.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158731/3_5_j061jg.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158727/3_4_yt80xp.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158722/3_2_vrkfte.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158716/3_1_zaa6qa.png"], price: 755000 },
  { slug: "mt4-edu-kit", name: "MT4 Edu Kit - 0.1mm Repeatability Metal 4 Axis Robotic Arm, ROS ROBOXRISE", category: "Robotic Arms", subcategory: "MT4", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161313/2_5_bo01l4.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161310/2_4_elbie8.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158765/2_3_fxihmy.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158751/2_2_fa1diu.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158746/2_1_mnabc1.png"], price: 275000 },
  { slug: "omniconveyor-standard-set", name: "OmniConveyor Standard Set - XFactory Add-on ROBOXRISE", category: "Accessories", subcategory: "XFactory Add-ons", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161422/85_bagpbf.png"], price: 225000 },
  { slug: "opencv-advanced-vision-suite-with-textbook", name: "OpenCV Advanced Vision Suite (with Textbook) ROBOXRISE", category: "AI & Vision", subcategory: "Vision Systems", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161570/86_lqxnzk.png"], price: 650000 },
  { slug: "sliding-rail-set-mirobot", name: "Sliding Rail Set Mirobot _ 6 Axis Educational Robotics ROBOXRISE", category: "Accessories", subcategory: "Add-ons", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161578/14_d8qqrs.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161338/14_4_rq03qf.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161333/14_3_l9hvxh.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161329/14_2_uw4fez.png", "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161319/14_1_ekpqqd.png"], price: 175000 },
  { slug: "world-builder-set", name: "World Builder Set - XFactory Add-on ROBOXRISE", category: "Accessories", subcategory: "XFactory Add-ons", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161570/49_qbf6a4.png"], price: 200000 },
  { slug: "test-product", name: "test product", category: "Testing", subcategory: "Sandbox", images: ["https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158260/9_1_i1qqwd.png"], price: 0, showZeroRupee: true },
];

export const allProducts: Product[] = seeds.map((seed, idx) => {
  const features = productFeaturesBySlug[seed.slug] ?? [];
  const defaultSpecs = [
    { label: "Category", value: seed.category },
    { label: "Series", value: seed.subcategory },
  ];
  const featureSpecs = features.map((feature, featureIndex) => ({
    label: deriveSpecLabel(feature, featureIndex),
    value: feature,
  }));

  return {
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
  usps:
    features.length > 0
      ? features.slice(0, 3)
      : [seed.subcategory, "Official ROBOXRISE catalog item", "Contact sales for latest pricing"],
  emiText:
    features.length > 0
      ? "EMI options and institutional procurement support available via sales."
      : "Contact sales for pricing and EMI options",
  descriptionHtml: buildDescriptionHtml(seed.name, features),
  specifications: featureSpecs.length > 0 ? [...defaultSpecs, ...featureSpecs] : defaultSpecs,
  inTheBox:
    features.length > 0
      ? ["Main unit and standard mounting hardware", ...features.slice(0, 3)]
      : ["As per official product configuration"],
  reviews: [],
  faqs: buildFaqsFromFeatures(features),
  };
});

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
  return allProducts.find(p => p.slug === slug);
}
