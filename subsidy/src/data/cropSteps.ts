import type { CropStep, CropType } from '../types';

export const cropSteps: Record<CropType, CropStep[]> = {
  potato: [
    {
      id: 'potato-1',
      title: 'Pre-Season Planning & Soil Preparation',
      days: 10,
      icon: 'fas fa-clipboard-list',
      checklist: [
        'Conduct comprehensive soil health testing (pH, NPK, organic matter)',
        'Select certified disease-free seed potatoes (variety selection)',
        'Prepare land with deep plowing (20-25 cm depth)',
        'Apply organic matter (25-30 tons FYM per hectare)',
        'Install drainage system for waterlogging prevention'
      ],
      videoUrl: 'https://www.youtube.com/embed/LzEIntM23gY',
      description: 'Scientific land preparation forms the foundation of successful potato cultivation. Proper soil health assessment and preparation ensures optimal growing conditions for high-yield potato production.',
      detailedSteps: [
        'Test soil pH (optimal range: 6.0-7.0) and adjust with lime if acidic',
        'Analyze soil for nutrient deficiencies and organic matter content',
        'Select appropriate potato variety based on climate and market demand',
        'Deep plow field to break hard pan and improve soil structure',
        'Apply and incorporate farmyard manure uniformly across the field',
        'Create proper drainage channels to prevent waterlogging',
        'Prepare raised beds or ridges for better drainage and aeration'
      ],
      proofRequired: 'Field preparation photo showing plowed land with organic matter incorporation'
    },
    {
      id: 'potato-2',
      title: 'Seed Treatment & Planting',
      days: 5,
      icon: 'fas fa-seedling',
      checklist: [
        'Cut seed potatoes into proper sized pieces (40-60g each)',
        'Treat cut seeds with fungicide (Mancozeb 2g/L) and dry',
        'Plant at optimal spacing (60cm x 20cm) and depth (8-10cm)',
        'Apply basal fertilizer as per soil test recommendations',
        'Ensure proper seed orientation (eyes facing upward)'
      ],
      videoUrl: 'https://www.youtube.com/embed/5VkgYxwos0w',
      description: 'Proper seed treatment and planting technique ensures uniform germination and healthy crop establishment. This critical phase determines the foundation for entire crop cycle.',
      detailedSteps: [
        'Cut seed potatoes 2-3 days before planting to allow wound healing',
        'Apply fungicide treatment to prevent seed-borne diseases',
        'Mark planting lines with proper row spacing (60cm apart)',
        'Dig furrows 8-10cm deep for seed placement',
        'Place treated seed pieces at 20cm intervals within rows',
        'Apply recommended NPK fertilizer in furrows before covering',
        'Cover seeds with fine soil and level the surface gently'
      ],
      proofRequired: 'Photo of planted field showing proper row spacing and planting pattern'
    },
    {
      id: 'potato-3',
      title: 'Early Growth Management (0-30 days)',
      days: 20,
      icon: 'fas fa-sprout',
      checklist: [
        'Monitor germination and plant emergence (7-14 days)',
        'Apply first irrigation if soil moisture is insufficient',
        'Conduct gap filling with reserve seedlings if needed',
        'Apply first dose of nitrogen fertilizer (1/3 of total)',
        'Monitor for early pest attacks (cutworms, wireworms)'
      ],
      videoUrl: 'https://www.youtube.com/embed/8ulpy_GFLDk',
      description: 'Early growth phase management ensures uniform crop establishment and sets the stage for healthy plant development throughout the growing season.',
      detailedSteps: [
        'Check daily for germination starting from day 7 after planting',
        'Maintain soil moisture at 70-80% field capacity',
        'Replace missing plants with healthy seedlings if germination is poor',
        'Apply 40kg nitrogen per hectare as first split dose',
        'Scout fields regularly for early season pest damage',
        'Remove weeds manually or with shallow cultivation',
        'Document plant height and growth stage weekly'
      ],
      proofRequired: 'Photo showing uniform plant emergence with healthy green shoots'
    },
    {
      id: 'potato-4',
      title: 'Vegetative Growth & Tuber Formation',
      days: 35,
      icon: 'fas fa-leaf',
      checklist: [
        'Conduct earthing up operations for tuber development',
        'Apply second dose of nitrogen and potash fertilizers',
        'Monitor and control late blight and other diseases',
        'Manage pest attacks (Colorado beetle, aphids)',
        'Ensure consistent irrigation during tuber bulking'
      ],
      videoUrl: 'https://www.youtube.com/embed/A6zhvmVuPZc',
      description: 'Critical phase for tuber initiation and development. Proper nutrition, disease management, and cultural practices determine final yield and quality.',
      detailedSteps: [
        'Conduct first earthing up at 30-35 days after planting',
        'Apply 40kg nitrogen and 60kg potash per hectare',
        'Spray copper-based fungicide for late blight prevention',
        'Monitor for Colorado potato beetle and apply control measures',
        'Maintain consistent soil moisture for optimal tuber development',
        'Conduct second earthing up at 50-55 days after planting',
        'Apply foliar micronutrient spray for healthy plant growth'
      ],
      proofRequired: 'Photo of potato plants after earthing up showing healthy vegetative growth'
    },
    {
      id: 'potato-5',
      title: 'Maturity & Harvesting',
      days: 20,
      icon: 'fas fa-warehouse',
      checklist: [
        'Monitor plant senescence and tuber maturity indicators',
        'Stop irrigation 10-15 days before harvest',
        'Harvest tubers when skin is set and plants have dried',
        'Handle tubers carefully to prevent bruising',
        'Cure and grade potatoes for storage and marketing'
      ],
      videoUrl: 'https://www.youtube.com/embed/1o7u2gsoXos',
      description: 'Final phase focusing on optimal harvest timing and proper post-harvest handling to maintain tuber quality and maximize storage life.',
      detailedSteps: [
        'Check tuber maturity by rubbing skin - mature tubers have set skin',
        'Stop irrigation when 75% of plants show yellowing',
        'Harvest on clear, dry days to reduce disease risk',
        'Use proper digging equipment to minimize tuber damage',
        'Allow tubers to dry in field for 2-3 hours before collection',
        'Grade tubers by size: small (<40mm), medium (40-60mm), large (>60mm)',
        'Store in ventilated, dark storage at 4-6°C temperature'
      ],
      proofRequired: 'Photo of harvested potatoes showing proper grading and handling'
    }
  ],
  
  onion: [
    {
      id: 'onion-1',
      title: 'Nursery Establishment & Seed Management',
      days: 30,
      icon: 'fas fa-seedling',
      checklist: [
        'Prepare raised nursery beds with proper drainage',
        'Select high-quality certified onion seeds (disease-free)',
        'Treat seeds with fungicide and growth promoters',
        'Sow seeds at recommended spacing (2-3 cm apart)',
        'Apply organic compost and maintain moisture levels'
      ],
      videoUrl: 'https://www.youtube.com/embed/4m63KmpL6-w?si=glH_aWVrRlz6cppY',
      description: 'Quality nursery management is fundamental to onion production success. Healthy seedlings from well-managed nurseries ensure uniform crop establishment and higher yields.',
      detailedSteps: [
        'Prepare 1m wide raised beds with 30cm height for drainage',
        'Apply 10kg compost per square meter and mix thoroughly',
        'Treat seeds with Thiram 2g/kg and soak for 8 hours',
        'Sow seeds in shallow furrows 1cm deep across bed width',
        'Cover lightly with fine compost and water gently',
        'Install shade net (50%) for first 10 days after sowing',
        'Maintain nursery moisture with light frequent watering'
      ],
      proofRequired: 'Photo of organized nursery beds showing proper seed sowing and emerging seedlings'
    },
    {
      id: 'onion-2',
      title: 'Field Preparation & Transplantation',
      days: 10,
      icon: 'fas fa-tractor',
      checklist: [
        'Prepare main field with deep plowing and leveling',
        'Apply basal fertilizers and organic manure',
        'Create raised beds with furrows for drainage',
        'Select healthy 6-8 week old seedlings for transplanting',
        'Transplant seedlings at proper spacing (10cm x 15cm)'
      ],
      videoUrl: 'https://www.youtube.com/embed/nN1Vmoc1LPY?si=KvZWPQa684FGvr6s',
      description: 'Proper field preparation and careful transplantation are crucial for establishing strong onion plants that will develop into high-quality bulbs.',
      detailedSteps: [
        'Deep plow field 2-3 times to 20-25cm depth',
        'Apply 20-25 tons farmyard manure per hectare',
        'Mix NPK fertilizer (60:30:30 kg/ha) as basal dose',
        'Form raised beds 1.2m wide with 30cm furrows',
        'Select pencil-thick seedlings without pest damage',
        'Trim seedling roots to 2cm and tops to 10cm',
        'Plant seedlings in rows 15cm apart with 10cm plant spacing'
      ],
      proofRequired: 'Photo of transplanted field showing uniform seedling establishment'
    },
    {
      id: 'onion-3',
      title: 'Early Growth Management & Care',
      days: 30,
      icon: 'fas fa-water',
      checklist: [
        'Maintain consistent soil moisture through drip irrigation',
        'Apply first top-dressing of nitrogen fertilizer',
        'Conduct regular weeding and intercultural operations',
        'Monitor and manage early pest attacks (thrips, aphids)',
        'Ensure proper plant establishment and growth'
      ],
      videoUrl: 'https://www.youtube.com/embed/5TAj6g6RB70',
      description: 'Critical growth phase requiring careful water management, nutrition, and pest control to establish strong plant foundation for bulb development.',
      detailedSteps: [
        'Install drip irrigation system with 30cm lateral spacing',
        'Apply 20kg nitrogen per hectare at 3 weeks after transplanting',
        'Conduct shallow cultivation to control weeds',
        'Spray systemic insecticide for thrips control',
        'Monitor plant height and leaf development weekly',
        'Maintain soil moisture at 70-80% field capacity',
        'Remove any diseased or weak plants immediately'
      ],
      proofRequired: 'Photo of healthy growing onion plants with proper irrigation setup'
    },
    {
      id: 'onion-4',
      title: 'Bulb Development & Maturity Management',
      days: 40,
      icon: 'fas fa-chart-line',
      checklist: [
        'Apply second top-dressing of potash and nitrogen',
        'Manage irrigation to promote bulb enlargement',
        'Control fungal diseases (purple blotch, downy mildew)',
        'Monitor bulb sizing and neck formation',
        'Gradually reduce watering as harvest approaches'
      ],
      videoUrl: 'https://www.youtube.com/embed/ZY4AybX4aEw',
      description: 'This phase focuses on optimal bulb development through balanced nutrition, disease management, and controlled water stress for proper bulb maturation.',
      detailedSteps: [
        'Apply 30kg potash and 20kg nitrogen per hectare at 8 weeks',
        'Reduce irrigation frequency but maintain adequate moisture',
        'Spray copper-based fungicide for disease prevention',
        'Earth up around bulbs lightly to prevent greening',
        'Monitor for neck softening and leaf yellowing',
        'Stop irrigation 2 weeks before expected harvest',
        'Inspect bulbs weekly for size and maturity indicators'
      ],
      proofRequired: 'Photo of mature bulbs showing proper sizing and neck formation'
    },
    {
      id: 'onion-5',
      title: 'Harvesting & Post-Harvest Management',
      days: 10,
      icon: 'fas fa-warehouse',
      checklist: [
        'Harvest onions when 70% of tops have dried down',
        'Cure bulbs properly in field or ventilated area',
        'Grade bulbs according to size and quality standards',
        'Store onions in proper ventilated storage conditions',
        'Package and prepare for market distribution'
      ],
      videoUrl: 'https://www.youtube.com/embed/AJ8nryMnkjM',
      description: 'Final stage focusing on proper harvesting timing, curing, grading, and storage to maintain onion quality and maximize market value.',
      detailedSteps: [
        'Harvest when neck becomes soft and tops fall over',
        'Lift bulbs carefully to avoid bruising and damage',
        'Cure in field for 3-4 days or under shade for 7 days',
        'Remove dried tops leaving 2-3cm neck length',
        'Grade into small (2-4cm), medium (4-6cm), large (6cm+)',
        'Store in ventilated bags or crates in dry location',
        'Maintain storage temperature at 0-4°C with 65-70% humidity'
      ],
      proofRequired: 'Photo of properly harvested, cured and graded onions ready for storage'
    }
  ],

  tomato: [
    {
      id: 'tomato-1',
      title: 'Nursery Management & Seedling Production',
      days: 25,
      icon: 'fas fa-seedling',
      checklist: [
        'Prepare disease-free nursery beds with proper sterilization',
        'Sow certified hybrid tomato seeds with proper spacing',
        'Maintain optimal temperature (20-25°C) and humidity',
        'Apply appropriate fertilizers for healthy seedling growth',
        'Monitor for damping-off and other nursery diseases'
      ],
      videoUrl: 'https://www.youtube.com/embed/IRwMPGEoXjQ',
      description: 'Professional nursery management ensures production of healthy, vigorous seedlings that form the foundation of successful tomato cultivation with higher yields and disease resistance.',
      detailedSteps: [
        'Sterilize nursery soil with formaldehyde or solar sterilization',
        'Prepare raised beds 15cm high with proper drainage',
        'Sow seeds 1cm deep with 2cm spacing in rows 10cm apart',
        'Cover with fine compost and maintain consistent moisture',
        'Provide partial shade with 50% shade net for first 15 days',
        'Apply weekly foliar nutrition with balanced NPK',
        'Harden seedlings by gradual exposure to full sunlight'
      ],
      proofRequired: 'Photo of healthy nursery with uniform seedling growth and proper management practices'
    },
    {
      id: 'tomato-2',
      title: 'Field Preparation & Transplantation',
      days: 5,
      icon: 'fas fa-tractor',
      checklist: [
        'Prepare field with deep plowing and proper bed formation',
        'Apply organic matter and basal fertilizers uniformly',
        'Install drip irrigation system and mulching material',
        'Transplant 4-5 week old healthy seedlings',
        'Provide temporary shade and wind protection'
      ],
      videoUrl: 'https://www.youtube.com/embed/StNZUCwPI28',
      description: 'Proper field preparation and transplantation techniques ensure strong plant establishment and create optimal growing conditions for maximum tomato production.',
      detailedSteps: [
        'Deep plow field to 25-30cm depth and form raised beds',
        'Apply 25-30 tons farmyard manure per hectare',
        'Mix NPK (120:80:100 kg/ha) as basal fertilizer application',
        'Install drip irrigation with 60cm row spacing',
        'Transplant seedlings at 45cm plant spacing within rows',
        'Apply plastic mulch to conserve moisture and control weeds',
        'Provide temporary shade net for 7-10 days after transplanting'
      ],
      proofRequired: 'Photo of transplanted field showing proper plant spacing and irrigation setup'
    },
    {
      id: 'tomato-3',
      title: 'Vegetative Growth & Support System Installation',
      days: 30,
      icon: 'fas fa-leaf',
      checklist: [
        'Install staking or trellising system for plant support',
        'Apply first top-dressing of nitrogen fertilizer',
        'Conduct regular pruning and side shoot removal',
        'Monitor and control early pests (whitefly, aphids)',
        'Maintain optimal soil moisture through drip irrigation'
      ],
      videoUrl: 'https://www.youtube.com/embed/fDiu2YS_khU',
      description: 'Critical vegetative growth phase requiring proper support systems, nutrition management, and pest control for strong plant framework development.',
      detailedSteps: [
        'Install bamboo stakes or string trellising system 6ft high',
        'Apply 40kg nitrogen per hectare at 3 weeks after transplanting',
        'Remove suckers and lower branches up to first fruit cluster',
        'Tie plants to supports using soft materials every 15cm',
        'Spray systemic insecticide for early pest management',
        'Maintain soil moisture at 80-85% field capacity',
        'Apply foliar nutrition with micronutrients weekly'
      ],
      proofRequired: 'Photo of tomato plants with proper support system and healthy vegetative growth'
    },
    {
      id: 'tomato-4',
      title: 'Flowering, Fruit Setting & Development',
      days: 30,
      icon: 'fas fa-flower',
      checklist: [
        'Monitor flower initiation and fruit setting percentage',
        'Apply phosphorus and potassium rich fertilizers',
        'Control major diseases (early blight, late blight)',
        'Manage fruit development with proper pruning',
        'Ensure consistent water supply during fruit development'
      ],
      videoUrl: 'https://www.youtube.com/embed/5Tq8kkCUCmw',
      description: 'Crucial reproductive phase focusing on flower development, fruit setting, and early fruit growth through balanced nutrition and disease management.',
      detailedSteps: [
        'Monitor for flower drop and apply growth regulators if needed',
        'Apply 60kg phosphorus and 80kg potassium per hectare',
        'Spray copper-based fungicide for disease prevention',
        'Remove excess fruits to maintain 4-5 fruits per cluster',
        'Ensure plants receive 6-8 hours of direct sunlight daily',
        'Maintain consistent soil moisture to prevent fruit cracking',
        'Apply calcium spray to prevent blossom end rot'
      ],
      proofRequired: 'Photo of tomato plants with healthy flower clusters and early fruit development'
    },
    {
      id: 'tomato-5',
      title: 'Harvesting & Post-Harvest Management',
      days: 10,
      icon: 'fas fa-warehouse',
      checklist: [
        'Harvest tomatoes at proper maturity stage (breaker stage)',
        'Handle fruits carefully to prevent bruising and damage',
        'Grade tomatoes according to size and quality standards',
        'Pack in appropriate containers for market transport',
        'Store under controlled temperature conditions'
      ],
      videoUrl: 'https://www.youtube.com/embed/274JyRAjY-U',
      description: 'Final phase focusing on optimal harvesting timing, proper handling, grading, and post-harvest management to maximize quality and market value.',
      detailedSteps: [
        'Harvest when fruits show first signs of color change',
        'Use sharp pruning shears to cut fruits with short stems',
        'Handle fruits gently to avoid bruising and damage',
        'Grade into categories: large (>150g), medium (100-150g), small (<100g)',
        'Pack in ventilated crates or cartons for transport',
        'Store at 12-15°C temperature with 85-90% humidity',
        'Market within 7-10 days for best quality and prices'
      ],
      proofRequired: 'Photo of properly harvested, graded and packed tomatoes ready for market'
    }
  ],

  wheat: [
    {
      id: 'wheat-1',
      title: 'Pre-Sowing Operations & Land Preparation',
      days: 15,
      icon: 'fas fa-tractor',
      checklist: [
        'Conduct soil health assessment and nutrient analysis',
        'Select appropriate wheat variety based on agro-climatic zone',
        'Prepare land with proper tillage operations',
        'Apply organic matter and soil amendments',
        'Install irrigation infrastructure for the season'
      ],
      videoUrl: 'https://www.youtube.com/embed/latA3FQ_nts',
      description: 'Scientific pre-sowing operations set the foundation for successful wheat production. Proper variety selection and land preparation ensure optimal crop establishment and yield potential.',
      detailedSteps: [
        'Test soil for pH, organic carbon, and available NPK',
        'Select suitable variety: early (HD-2967), medium (DBW-88), late (HD-3086)',
        'Deep plow field after harvest of previous crop',
        'Apply 8-10 tons FYM per hectare and incorporate',
        'Prepare fine seedbed with 2-3 harrowings',
        'Level field properly using laser leveler if available',
        'Install bore well or canal irrigation connections'
      ],
      proofRequired: 'Photo of well-prepared field showing fine tilth and proper land preparation'
    },
    {
      id: 'wheat-2',
      title: 'Seed Treatment & Sowing Operations',
      days: 10,
      icon: 'fas fa-seedling',
      checklist: [
        'Treat certified seeds with recommended fungicides',
        'Apply seed treatment with bio-fertilizers (Azotobacter)',
        'Sow seeds at optimal depth and spacing using seed drill',
        'Apply basal fertilizers during sowing operation',
        'Ensure proper seed coverage and compaction'
      ],
      videoUrl: 'https://www.youtube.com/embed/JN0ICendQns?si=kcqj6xGAaDWUREo1',
      description: 'Proper seed treatment and precision sowing are critical for uniform germination and crop establishment, ensuring optimal plant population and yield potential.',
      detailedSteps: [
        'Treat seeds with Carbendazim 2.5g per kg of seed',
        'Mix seeds with Azotobacter biofertilizer before sowing',
        'Sow 100-125 kg seeds per hectare using seed drill',
        'Maintain row spacing of 18-22cm for optimal growth',
        'Place seeds at 3-5cm depth for proper germination',
        'Apply NPK (120:60:40 kg/ha) as basal fertilizer',
        'Follow sowing with light irrigation for germination'
      ],
      proofRequired: 'Photo of seed drill operation showing proper sowing technique and row spacing'
    },
    {
      id: 'wheat-3',
      title: 'Germination & Early Growth Management',
      days: 30,
      icon: 'fas fa-sprout',
      checklist: [
        'Monitor germination and ensure uniform crop emergence',
        'Apply first irrigation at crown root initiation stage',
        'Conduct first weeding and intercultural operations',
        'Apply first top-dressing of nitrogen fertilizer',
        'Monitor for early season pests and diseases'
      ],
      videoUrl: 'https://www.youtube.com/embed/AonJkhqCRwk',
      description: 'Critical early growth phase management ensures uniform crop establishment and strong root system development for optimal nutrient and water uptake.',
      detailedSteps: [
        'Check germination percentage 7-10 days after sowing',
        'Apply first irrigation (40-50mm) at 20-25 days after sowing',
        'Remove weeds manually or with wheel hoe at 25-30 DAS',
        'Apply 40kg nitrogen per hectare at crown root stage',
        'Scout for aphids, army worms, and fungal diseases',
        'Apply post-emergence herbicide if weed pressure is high',
        'Monitor plant height and tillering development'
      ],
      proofRequired: 'Photo of uniform wheat crop showing healthy germination and early growth'
    },
    {
      id: 'wheat-4',
      title: 'Tillering & Vegetative Growth Phase',
      days: 40,
      icon: 'fas fa-leaf',
      checklist: [
        'Monitor tillering and apply second nitrogen dose',
        'Provide second irrigation during active tillering',
        'Control weeds with appropriate herbicide application',
        'Manage pest attacks (aphids, termites) if present',
        'Monitor crop health and nutrient deficiency symptoms'
      ],
      videoUrl: 'https://www.youtube.com/embed/141CXYcO4GI?si=MQMMTBgzlfAkWFvB',
      description: 'Tillering phase is crucial for determining grain yield potential. Proper nutrition and water management during this phase maximizes productive tillers.',
      detailedSteps: [
        'Apply 40kg nitrogen per hectare at maximum tillering stage',
        'Provide irrigation (50-60mm) at tillering stage (45-50 DAS)',
        'Apply 2,4-D herbicide for broad leaf weed control',
        'Monitor for rust diseases and apply fungicide if needed',
        'Check for micronutrient deficiencies (zinc, iron)',
        'Ensure adequate plant population of 350-400 plants/m²',
        'Document tiller count and overall crop health status'
      ],
      proofRequired: 'Photo of wheat crop during tillering showing healthy plant growth and tiller development'
    },
    {
      id: 'wheat-5',
      title: 'Grain Formation & Maturity Management',
      days: 35,
      icon: 'fas fa-wheat-awn',
      checklist: [
        'Provide irrigation during flowering and grain filling stages',
        'Apply final nitrogen dose during booting stage',
        'Monitor for disease outbreaks (rusts, blight)',
        'Protect crop from birds during grain filling',
        'Assess grain maturity for optimal harvest timing'
      ],
      videoUrl: 'https://www.youtube.com/embed/latA3FQ_nts',
      description: 'Final growth phase focusing on grain filling and maturity. Proper water and nutrient management ensures maximum grain weight and quality.',
      detailedSteps: [
        'Apply last 40kg nitrogen per hectare at booting stage',
        'Provide irrigation during flowering (80-85 DAS)',
        'Apply irrigation during milk stage (100-105 DAS)',
        'Monitor for yellow rust, brown rust, and loose smut',
        'Use bird scarers or netting during grain filling',
        'Check grain moisture content for harvest readiness',
        'Prepare harvesting equipment and storage facilities'
      ],
      proofRequired: 'Photo of mature wheat crop showing golden color and grain-filled heads'
    },
    {
      id: 'wheat-6',
      title: 'Harvesting & Post-Harvest Operations',
      days: 20,
      icon: 'fas fa-warehouse',
      checklist: [
        'Harvest wheat when grain moisture is 12-14%',
        'Use combine harvester for efficient grain separation',
        'Clean grains to remove chaff and foreign matter',
        'Dry grains to safe moisture content (10-12%)',
        'Store grains in proper storage structures'
      ],
      videoUrl: 'https://www.youtube.com/embed/GwsaD0oFs6E?si=vXiKMV1Iq5-S0iqo',
      description: 'Harvesting and post-harvest management determine final grain quality and storage life. Proper timing and handling maintain grain quality and market value.',
      detailedSteps: [
        'Test grain moisture using moisture meter before harvest',
        'Harvest during morning hours for better grain quality',
        'Adjust combine harvester settings for minimum grain damage',
        'Use grain cleaning machines to remove impurities',
        'Sun dry grains to reduce moisture to 12% or below',
        'Store in well-ventilated godowns with pest control measures',
        'Maintain proper records of yield and quality parameters'
      ],
      proofRequired: 'Photo of harvested wheat grains showing clean, dry grain ready for storage'
    }
  ]
};