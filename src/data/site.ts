/**
 * All business facts and copy live here, so the pages, the footer and the
 * structured data Google reads can never disagree with each other (consistent
 * name / address / phone is the backbone of local SEO).
 */

export const business = {
  name: 'Harlequin Auto Repairs',
  legalName: 'Harlequin Auto Repairs & Services',
  short: 'Harlequin',
  tagline: 'Auto repairs & services in Brackenhurst, Alberton',
  phoneDisplay: '078 555 3354',
  phoneIntl: '+27785553354',
  whatsapp: '27785553354',
  email: 'harlequinautorepairs@gmail.com',
  address: {
    street: '04 Kalkoentjie Street',
    suburb: 'Brackenhurst',
    city: 'Alberton',
    region: 'Gauteng',
    postcode: '1448',
    country: 'ZA',
    landmark: 'On the TotalEnergies forecourt, next to Bracken Gardens (Checkers)',
  },
  facebook: 'https://www.facebook.com/profile.php?id=61593911076852',
  areaServed: ['Brackenhurst', 'Brackendowns', 'Meyersdal', 'Randhart', 'Mayberry Park', 'Alberton'],
};

export const fullAddress = `${business.address.street}, ${business.address.suburb}, ${business.address.city}, ${business.address.postcode}`;
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.legalName}, ${fullAddress}, South Africa`)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(`${fullAddress}, South Africa`)}&output=embed`;
export const telHref = `tel:${business.phoneIntl}`;
export const waHref = (text = 'Hi Harlequin Auto Repairs, I would like to book my car in.') =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;

/** Opening hours (read from the workshop's sign). `opens`/`closes` are 24h. */
export const hours = [
  {days: 'Monday – Friday', short: 'Mon – Fri', opens: '08:00', closes: '17:00', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']},
  {days: 'Saturday', short: 'Sat', opens: '08:00', closes: '12:00', schema: ['Saturday']},
  {days: 'Sunday & public holidays', short: 'Sun', opens: null, closes: null, schema: []},
] as const;

export const nav = [
  {label: 'Home', href: '/'},
  {label: 'Services', href: '/services/'},
  {label: 'Tyres & Batteries', href: '/tyres-batteries/'},
  {label: 'About', href: '/about/'},
  {label: 'Gallery', href: '/gallery/'},
  {label: 'Contact', href: '/contact/'},
];

export type Service = {
  slug: string;
  name: string;
  /** Short label for lists and panels. */
  short: string;
  /** Title tag + meta description for the service's own page. */
  title: string;
  description: string;
  /** Headline lines; `i` lines are set in italic. */
  hero: {t: string; i?: boolean}[];
  intro: string;
  body: string[];
  includes: string[];
  signs: string[];
  faqs: {q: string; a: string}[];
};

export const services: Service[] = [
  {
    slug: 'vehicle-diagnostics',
    name: 'Vehicle Diagnostics',
    short: 'Diagnostics',
    title: 'Car Diagnostics in Brackenhurst, Alberton',
    description:
      'Computer diagnostics for check-engine lights, warning lights and fault codes on all makes. Harlequin Auto Repairs, Brackenhurst, Alberton. Call 078 555 3354.',
    hero: [{t: 'Find the'}, {t: 'real fault.', i: true}, {t: 'Fix it'}, {t: 'once.', i: true}],
    intro:
      'A warning light on the dash is your car asking for help. We plug in, read the fault codes and then test the actual components, so you pay for the repair your car needs and not for guesswork.',
    body: [
      'Modern cars are run by computers that log every misfire, sensor fault and electrical hiccup. Our diagnostic scan reads those codes on all makes and models, but a code only tells us where to look. We follow it up with hands-on testing of sensors, wiring and mechanical parts to confirm the cause before we recommend any work.',
      'You get a clear explanation of what we found, what is urgent, and what can wait, with a quote before any repair starts.',
    ],
    includes: ['Full computer fault-code scan', 'Live sensor data checks', 'Electrical and wiring tests', 'Warning-light reset after repair', 'Clear report and quote'],
    signs: ['Check-engine or other warning light on', 'Car losing power or hesitating', 'Rough idle or stalling', 'Higher fuel use than normal'],
    faqs: [
      {q: 'Can you diagnose any make of car?', a: 'Yes. We do diagnostics and repairs on all makes and models, petrol and diesel.'},
      {q: 'Will you just clear the warning light?', a: 'No. Clearing a code without fixing the cause means the light comes back. We find and repair the fault first, then reset it.'},
    ],
  },
  {
    slug: 'car-service',
    name: 'Major & Minor Services',
    short: 'Servicing',
    title: 'Major & Minor Car Services in Alberton',
    description:
      'Major and minor car services on all makes in Brackenhurst, Alberton: oil, filters, plugs, fluids and safety checks. Book on 078 555 3354.',
    hero: [{t: 'Major or'}, {t: 'minor.', i: true}, {t: 'Serviced'}, {t: 'properly.', i: true}],
    intro:
      'Regular servicing is the cheapest repair there is. We service all makes and models to keep your car reliable, safe and running at its best, whether it is due for a quick minor service or a full major service.',
    body: [
      'A minor service covers the essentials that keep your engine healthy: fresh oil and oil filter, a check of all fluids, tyres, lights, brakes and belts. A major service goes further, with air, fuel and cabin filters, spark plugs and a deeper inspection of the brakes, suspension and cooling system.',
      'We use quality lubricants and parts, and we tell you about anything we spot along the way before it turns into an expensive problem.',
    ],
    includes: ['Engine oil and oil filter', 'Air, fuel and cabin filters (major)', 'Spark plugs (major)', 'Fluid top-ups and checks', 'Brake, tyre, light and belt inspection', 'Service reminder reset'],
    signs: ['Service light or mileage due', 'It has been a year since the last service', 'Oil looks dark or is low', 'Buying a second-hand car'],
    faqs: [
      {q: 'What is the difference between a major and minor service?', a: 'A minor service is an oil and filter change with safety checks. A major service adds filters, spark plugs and a deeper inspection, usually at longer intervals set by your manufacturer.'},
      {q: 'How often should my car be serviced?', a: 'Follow your manufacturer’s interval, typically every 10,000 to 15,000 km or once a year, whichever comes first. We can check what your car needs.'},
    ],
  },
  {
    slug: 'engine-repairs',
    name: 'Engine Repairs',
    short: 'Engine',
    title: 'Engine Repairs in Alberton | All Makes',
    description:
      'Engine repairs in Brackenhurst, Alberton: oil leaks, overheating, timing belts, gaskets and rebuilds on all makes. Harlequin Auto Repairs, call 078 555 3354.',
    hero: [{t: 'Heart of'}, {t: 'the car.', i: true}, {t: 'Hands of'}, {t: 'a mechanic.', i: true}],
    intro:
      'From an oil leak to a full rebuild, we handle major and minor engine repairs on all makes, and we explain the options so you can decide what makes sense for your car and your budget.',
    body: [
      'Engine trouble rarely fixes itself. Strange noises, smoke, overheating or oil on the driveway are early warnings that are far cheaper to deal with now than after a breakdown. We diagnose the cause, quote the repair and keep you updated while your car is with us.',
    ],
    includes: ['Oil and coolant leak repairs', 'Head gasket and gasket replacement', 'Timing belt and chain replacement', 'Overheating and cooling system repairs', 'Engine mounts', 'Engine rebuilds and replacements'],
    signs: ['Knocking, ticking or rattling noises', 'Blue, white or black smoke', 'Temperature gauge climbing', 'Oil spots under the car'],
    faqs: [
      {q: 'When should my timing belt be replaced?', a: 'Every engine has its own interval, often between 60,000 and 120,000 km. A snapped belt can wreck an engine, so ask us to check yours if you do not know when it was last done.'},
    ],
  },
  {
    slug: 'gearbox-clutch-repairs',
    name: 'Gearbox & Clutch Replacement',
    short: 'Gearbox & clutch',
    title: 'Clutch Replacement & Gearbox Repairs Alberton',
    description:
      'Clutch replacement and gearbox repairs in Brackenhurst, Alberton for all makes. Slipping clutch or crunching gears? Call Harlequin Auto Repairs on 078 555 3354.',
    hero: [{t: 'Smooth'}, {t: 'shifting.', i: true}, {t: 'Every'}, {t: 'gear.', i: true}],
    intro:
      'A slipping clutch or a grinding gearbox gets worse with every kilometre. We replace clutches and repair gearboxes on all makes so your car pulls cleanly and shifts smoothly again.',
    body: [
      'Clutch kits wear out with normal driving, faster in stop-start traffic. We replace the full kit, check the flywheel and release bearing, and test drive the car before handing it back. For gearbox problems we diagnose whether a repair, a service or a replacement unit is the right call.',
    ],
    includes: ['Clutch kit replacement', 'Flywheel inspection and replacement', 'Clutch release bearing and slave cylinder', 'Gearbox repairs and replacement', 'Gearbox oil service'],
    signs: ['Engine revs rise but the car does not speed up', 'Clutch pedal feels high, soft or heavy', 'Grinding or crunching when changing gear', 'Burning smell after pulling away'],
    faqs: [
      {q: 'How long does a clutch replacement take?', a: 'It depends on the vehicle, but most clutch replacements are done in a day. We will give you a time estimate with your quote.'},
    ],
  },
  {
    slug: 'brakes',
    name: 'Brakes',
    short: 'Brakes',
    title: 'Brake Repairs in Brackenhurst, Alberton',
    description:
      'Brake pads, discs, drums, brake fluid and brake repairs in Brackenhurst, Alberton. Squealing or soft brakes? Harlequin Auto Repairs, call 078 555 3354.',
    hero: [{t: 'Stop'}, {t: 'with confidence.', i: true}],
    intro:
      'Your brakes are the most important safety system on your car. We inspect, repair and replace brake pads, discs, drums, shoes and fluid on all makes, and we never let a car leave with brakes we are not happy with.',
    body: [
      'Worn pads cut into discs, and old brake fluid absorbs water and loses its stopping power. Catching both early saves money and keeps you safe. We measure pad and disc wear, check for leaks and tell you exactly what needs doing.',
    ],
    includes: ['Brake pad replacement', 'Disc and drum replacement or skimming', 'Brake shoes', 'Brake fluid replacement', 'Calipers, hoses and brake lines', 'Handbrake adjustment'],
    signs: ['Squealing or grinding when braking', 'Soft or spongy brake pedal', 'Car pulls to one side when braking', 'Vibration through the pedal or steering wheel'],
    faqs: [
      {q: 'How often should brake pads be replaced?', a: 'It varies with driving style, often between 20,000 and 50,000 km. We check them at every service and can inspect them any time you are worried.'},
    ],
  },
  {
    slug: 'suspension-steering',
    name: 'Suspension & Steering',
    short: 'Suspension',
    title: 'Suspension & Shock Absorber Repairs Alberton',
    description:
      'Shock absorbers, bushes, ball joints, tie rods and suspension repairs in Brackenhurst, Alberton. Harlequin Auto Repairs, call 078 555 3354.',
    hero: [{t: 'Ride'}, {t: 'smoother.', i: true}, {t: 'Steer'}, {t: 'straighter.', i: true}],
    intro:
      'Potholes take their toll. We repair and replace suspension and steering components on all makes so your car rides comfortably, handles safely and stops wearing out tyres.',
    body: [
      'Worn shocks and bushes make a car bounce, knock and wander, and they shorten tyre life. We put the car on the lift, check every joint and mounting and replace what is worn, from a single bush to a full set of shock absorbers.',
    ],
    includes: ['Shock absorbers and struts', 'Control arm bushes', 'Ball joints and tie rod ends', 'Stabiliser links', 'Coil springs', 'Steering rack inspection'],
    signs: ['Knocking over bumps', 'Car bounces or dips when braking', 'Steering wheel off-centre or vague', 'Uneven tyre wear'],
    faqs: [
      {q: 'Should shocks be replaced in pairs?', a: 'Yes. Shocks on the same axle should be replaced together so the car stays balanced and handles predictably.'},
    ],
  },
  {
    slug: 'cv-joints-wheel-bearings',
    name: 'CV Joints & Wheel Bearings',
    short: 'CV joints & bearings',
    title: 'CV Joint & Wheel Bearing Replacement Alberton',
    description:
      'CV joint, CV boot and wheel bearing replacement in Brackenhurst, Alberton. Clicking on turns or humming at speed? Call Harlequin Auto Repairs on 078 555 3354.',
    hero: [{t: 'Clicking?'}, {t: 'Humming?', i: true}, {t: 'We’ll sort'}, {t: 'it out.', i: true}],
    intro:
      'A clicking noise when you turn or a humming that gets louder with speed usually points to a CV joint or wheel bearing. Both are safety items, and both are repairs we do every week.',
    body: [
      'CV joints transfer power to the wheels while they steer and move with the suspension. When the rubber boot splits, grit gets in and the joint wears quickly. Wheel bearings let the wheels spin freely, and a failing bearing can eventually seize. We replace both on all makes.',
    ],
    includes: ['CV joint replacement', 'CV boot replacement', 'Driveshaft replacement', 'Front and rear wheel bearings', 'Hub assemblies'],
    signs: ['Clicking when turning at full lock', 'Grease on the inside of the wheel', 'Humming or growling that rises with speed', 'Play or wobble in a wheel'],
    faqs: [
      {q: 'Can I keep driving with a clicking CV joint?', a: 'Not for long. The clicking gets worse and a failed joint can leave you stranded. Have it checked as soon as you hear it.'},
    ],
  },
  {
    slug: 'car-aircon',
    name: 'Air Conditioning',
    short: 'Air con',
    title: 'Car Aircon Repairs & Regas in Alberton',
    description:
      'Car air conditioning repairs, re-gas and leak checks in Brackenhurst, Alberton. Aircon blowing warm? Harlequin Auto Repairs, call 078 555 3354.',
    hero: [{t: 'Cool cabin.'}, {t: 'Hot summer.', i: true}],
    intro:
      'If your aircon is blowing warm, smells musty or makes a noise, we can find out why. We check, repair and re-gas car air conditioning systems on all makes.',
    body: [
      'Air conditioning systems slowly lose gas over time, and a leak or a failing component can stop them working altogether. We test the system pressure, look for leaks and check the compressor, condenser and fans before recommending a re-gas or repair.',
    ],
    includes: ['Aircon performance check', 'Leak detection', 'Re-gas', 'Compressor, condenser and fan repairs', 'Cabin filter replacement'],
    signs: ['Air blowing warm or only slightly cool', 'Musty smell from the vents', 'Noise when the aircon is switched on', 'Water inside the cabin'],
    faqs: [
      {q: 'How often does my aircon need a re-gas?', a: 'There is no fixed interval. If it is not as cold as it used to be, a check will tell us whether it needs a re-gas or has a leak.'},
    ],
  },
  {
    slug: 'car-audio-alarms',
    name: 'Custom Car Audio & Alarms',
    short: 'Audio & alarms',
    title: 'Car Audio & Alarm Installation Alberton',
    description:
      'Custom car audio and car alarm installations in Brackenhurst, Alberton. Neat, reliable wiring on all makes. Harlequin Auto Repairs, call 078 555 3354.',
    hero: [{t: 'Turn it'}, {t: 'up.', i: true}, {t: 'Lock it'}, {t: 'down.', i: true}],
    intro:
      'Upgrade your sound or protect your car. We install custom car audio and car alarms with neat, reliable wiring that does not cause electrical problems down the line.',
    body: [
      'A good install is all in the wiring. We fit head units, speakers, amplifiers and subwoofers, and we install and repair car alarms and immobilisers, keeping everything tidy and properly fused.',
    ],
    includes: ['Head unit installation', 'Speakers, amplifiers and subwoofers', 'Car alarm installation', 'Immobilisers', 'Electrical fault finding'],
    signs: ['Factory sound is flat or distorted', 'Alarm faulty or not arming', 'Battery draining overnight after an old install'],
    faqs: [
      {q: 'Can you fit equipment I bought myself?', a: 'Get in touch with the details of what you have and we will let you know.'},
    ],
  },
];

/** Tyres and batteries have their own page, but also appear in service lists. */
export const tyreServices = {
  tyres: ['New tyres for most cars, bakkies and SUVs', 'Free fitting & balancing', 'Puncture repairs', 'Tyre rotation', 'Wheel balancing'],
  batteries: ['Battery testing', 'New batteries supplied and fitted', 'Charging system checks', 'Jump-start and flat battery help'],
};

export const homeFaqs = [
  {q: 'Where is Harlequin Auto Repairs?', a: `We are at ${fullAddress}, on the TotalEnergies forecourt next to Bracken Gardens and Checkers.`},
  {q: 'What are your opening hours?', a: 'Monday to Friday 08:00 to 17:00 and Saturday 08:00 to 12:00. We are closed on Sundays and public holidays.'},
  {q: 'Do you work on all makes and models?', a: 'Yes. We do major and minor repairs on all cars, from small hatchbacks to bakkies and SUVs.'},
  {q: 'Do you fit tyres?', a: 'Yes. We stock tyres for most vehicles, and fitting and balancing are free.'},
  {q: 'How do I book my car in?', a: `Call or WhatsApp us on ${business.phoneDisplay}, or use the booking form on our contact page.`},
];
