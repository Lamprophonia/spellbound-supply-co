import type { Product } from '../../domain/catalog.ts'

const bottledHandling = {
  title: 'Bottled preparation handling',
  notes: ['Bottle securely stoppered and wax sealed', 'Cushioned upright in a rigid shipping container', 'Tamper seal inspected before dispatch', 'Standard courier permitted unless otherwise marked'],
  disclaimer: 'Inspect the seal and label before use. Do not consume merchandise damaged in transit.',
}

const bookHandling = {
  title: 'Bookseller’s packing',
  notes: ['Corners and boards protected', 'Wrapped against rain and ordinary damp', 'Packed flat with no bottles or loose reagents above', 'Standard courier permitted'],
  disclaimer: 'Working grimoires should be stored closed and dry when not in use.',
}

const implementHandling = {
  title: 'Attunement implement handling',
  notes: ['Crystal and core checked before dispatch', 'Implement secured in a fitted sleeve or case', 'Packed apart from loose ferrous goods', 'Standard courier permitted'],
  disclaimer: 'New implements should be attuned gradually and in accordance with the maker’s instructions.',
}

const reagentHandling = {
  title: 'Workshop material handling',
  notes: ['Inner package sealed and clearly marked', 'Packed separately from food and bottled preparations', 'Kept dry during storage and transit', 'Lot number retained for workshop records'],
  disclaimer: 'Materials are sold for trained household, laboratory, or workshop use as indicated.',
}

export const canonicalProducts: Product[] = [
  {
    sku: 'SSC-POT-0001', slug: 'common-healing-potion', name: 'Common Healing Potion', departmentId: 'potions-elixirs', contentStatus: 'canonical',
    shortDescription: 'A standardized vitality potion for minor injuries, ailments, or common sicknesses.',
    price: { amount: 5, denomination: 'Copper', unit: 'ounce' }, art: 'bottle',
    facts: {
      category: 'Vitality potion', volatility: 'None', supplier: 'Bramblewick Bottling & Alchemical Works', recommendedUsage: 'Consume all at once', dosage: '1 oz per 50 lbs', onset: 'Immediate',
      primaryEffects: 'Heal minor injuries, ailments, or common sicknesses', notRecommendedFor: 'Major wounds, missing limbs, curses, magical ailments, or major infections', secondaryEffects: 'None',
      sideEffects: 'May include randomly colored urine for several days', minimumUserAge: 'None', minimumUserWeight: '50 lbs',
    },
    handling: bottledHandling,
  },
  {
    sku: 'SSC-POT-0201', slug: 'hedge-draught-of-restfulness', name: 'Hedge Draught of Restfulness', departmentId: 'potions-elixirs', contentStatus: 'canonical',
    shortDescription: 'A rustic restorative draught for occasions when a full night’s sleep cannot be had.',
    price: { amount: 15, denomination: 'Copper', unit: 'ounce' }, art: 'bottle',
    facts: {
      category: 'Restorative potion', volatility: 'Very low', supplier: 'Bramblewick Bottling & Alchemical Works', recommendedUsage: 'Consume one complete measured dose at least one hour before rest would ordinarily be required', dosage: '1 oz per 50 lbs', onset: '1–2 hours',
      primaryEffects: 'Temporarily eases ordinary fatigue and the immediate effects of a missed night’s sleep', notRecommendedFor: 'Repeated use, children, or work requiring exceptional judgment during the following two days',
      secondaryEffects: 'Mild forgetfulness or reduced lucidity may persist for up to 48 hours', sideEffects: 'May include vivid daydreams, unusual cheerfulness, or temporary disorientation', minimumUserAge: 'Adult use only', minimumUserWeight: '50 lbs',
    },
    handling: bottledHandling,
  },
  {
    sku: 'SSC-POT-0310', slug: 'hearth-ease-digestive-cordial', name: 'Hearth-Ease Digestive Cordial', departmentId: 'potions-elixirs', contentStatus: 'canonical',
    shortDescription: 'A pleasant after-supper cordial for smoke belly, pepper reflux, and overindulgence.',
    price: { amount: 8, denomination: 'Copper', unit: 'ounce' }, art: 'bottle',
    facts: {
      category: 'Household cordial', volatility: 'None', supplier: 'Bramblewick Bottling & Alchemical Works', recommendedUsage: 'Sip after meals as needed', dosage: '1 oz; do not exceed 3 oz in one day', onset: 'Within 10 minutes',
      primaryEffects: 'Settles ordinary indigestion, smoke belly, and minor alchemical reflux', notRecommendedFor: 'Poisoning, cauldron fume exposure, persistent pain, or active internal combustion', secondaryEffects: 'Freshens the breath with a mild anise scent',
      sideEffects: 'May cause harmless silver-colored belching', minimumUserAge: '12 years', minimumUserWeight: '40 lbs',
    },
    handling: bottledHandling,
  },
  {
    sku: 'SSC-POT-0450', slug: 'mariners-reserve-water-breathing-draught', name: 'Mariner’s Reserve Water-Breathing Draught', departmentId: 'potions-elixirs', contentStatus: 'canonical',
    shortDescription: 'A sealed working draught for brief submerged inspections, recoveries, and repairs.',
    price: { amount: 3, denomination: 'Silver', unit: 'vial' }, art: 'bottle',
    facts: {
      category: 'Occupational transformation draught', volatility: 'Low', supplier: 'Bramblewick Bottling & Alchemical Works', recommendedUsage: 'Consume immediately before entering the water', dosage: 'One 2 oz vial per adult', onset: 'Within 2 minutes',
      primaryEffects: 'Permits comfortable breathing in ordinary fresh or salt water for approximately 30 minutes', notRecommendedFor: 'Abyssal depths, polluted water, children, or persons with known gill sensitivity', secondaryEffects: 'Improved low-light vision underwater',
      sideEffects: 'Dry coughing and a briny taste may persist for one hour', minimumUserAge: 'Adult use only', minimumUserWeight: '80 lbs',
    },
    handling: bottledHandling,
  },
  {
    sku: 'SSC-TOM-0014', slug: 'wards-about-the-house', name: 'Wards About the House: A Practical Manual', departmentId: 'scrolls-tomes', contentStatus: 'canonical',
    shortDescription: 'Plain instruction for threshold marks, pantry wards, chimney seals, and other domestic protections.',
    price: { amount: 18, denomination: 'Copper', unit: 'copy' }, art: 'book',
    facts: { category: 'Household reference', supplier: 'Quill & Sigil Publishing House', author: 'M. C. Bellweather', edition: 'Seventh edition, revised', format: 'Illustrated octavo', binding: 'Green buckram over boards', extent: '224 pages with 36 diagrams', language: 'Common', recommendedUsage: 'For householders familiar with basic chalk, salt, and iron warding practice' },
    handling: bookHandling,
  },
  {
    sku: 'SSC-TOM-0108', slug: 'principles-of-thaumaturgic-conduction', name: 'Principles of Thaumaturgic Conduction', departmentId: 'scrolls-tomes', contentStatus: 'canonical',
    shortDescription: 'The standard introductory treatment of current, resistance, sympathetic loss, and safe grounding.',
    price: { amount: 9, denomination: 'Silver', unit: 'copy' }, art: 'book',
    facts: { category: 'Academic textbook', supplier: 'Meridian Arcane Press', author: 'Professor Linet Vey', edition: 'Twelfth collegiate edition', format: 'Royal octavo', binding: 'Sewn cloth binding with foil-stamped spine', extent: '612 pages, appendices, and fold-out conduction tables', language: 'Common with Old Imperial formulae', recommendedUsage: 'Approved for supervised introductory coursework' },
    handling: bookHandling,
  },
  {
    sku: 'SSC-TOM-0240', slug: 'celestial-herbarium', name: 'The Celestial Herbarium', departmentId: 'scrolls-tomes', contentStatus: 'canonical',
    shortDescription: 'A lavishly illuminated survey of plants governed by moon, planet, comet, and wandering star.',
    price: { amount: 2, denomination: 'Gold', unit: 'volume' }, art: 'book',
    facts: { category: 'Fine illustrated reference', supplier: 'Illuminated Editions', author: 'Ilyra of Lethalas', edition: 'Numbered trade edition', format: 'Hand-illuminated folio', binding: 'Midnight-blue calf with gilt brass furniture', extent: '188 vellum leaves and 72 full-page plates', language: 'Common and High Elvish', recommendedUsage: 'Reference, collection, and ceremonial display' },
    handling: bookHandling,
  },
  {
    sku: 'SSC-TOM-0325', slug: 'one-hundred-useful-hexes', name: 'One Hundred Useful Hexes for the Busy Household', departmentId: 'scrolls-tomes', contentStatus: 'canonical',
    shortDescription: 'A compact collection of modest charms for stains, squeaks, drafts, pests, and discourteous callers.',
    price: { amount: 32, denomination: 'Copper', unit: 'copy' }, art: 'book',
    facts: { category: 'Popular practical handbook', supplier: 'Quill & Sigil Publishing House', author: 'Agnes Thimble', edition: 'Third edition', format: 'Pocket duodecimo', binding: 'Wipe-clean red cloth', extent: '160 pages with index tabs', language: 'Common', recommendedUsage: 'Everyday household reference; observe all margin cautions' },
    handling: bookHandling,
  },
  {
    sku: 'SSC-WND-0001', slug: 'common-channeling-wand', name: 'Common Channeling Wand', departmentId: 'wands-staves', contentStatus: 'canonical',
    shortDescription: 'A dependable oak implement for elementary channeling, household charms, and general practice.',
    price: { amount: 10, denomination: 'Silver', unit: 'wand' }, art: 'wand',
    facts: { category: 'Attunement instrument', supplier: 'Blackbriar', material: 'Seasoned oak', core: 'Common-grade attunement crystal set in the hilt', dimensions: '10 inches long', finish: 'Smooth taper, simple carved handle, and leather grip', attunement: 'General-purpose; suitable for most novice practitioners', recommendedUsage: 'Elementary channeling and ordinary household spellwork' },
    handling: implementHandling,
  },
  {
    sku: 'SSC-WND-0042', slug: 'firstlight-student-wand', name: 'Firstlight Student Wand', departmentId: 'wands-staves', contentStatus: 'canonical',
    shortDescription: 'A forgiving school wand with a restrained channel and a replaceable practice crystal.',
    price: { amount: 6, denomination: 'Silver', unit: 'wand' }, art: 'wand',
    facts: { category: 'Student attunement instrument', supplier: 'Blackbriar', material: 'Ash with a dark beech handle', core: 'Replaceable low-flux practice crystal', dimensions: '9½ inches long', finish: 'Satin wax with indexed finger rests', attunement: 'Deliberately limited output with broad novice compatibility', recommendedUsage: 'Supervised lessons, drills, and examination practice' },
    handling: implementHandling,
  },
  {
    sku: 'SSC-STF-0110', slug: 'wayfarers-field-staff', name: 'Wayfarer’s Field Staff', departmentId: 'wands-staves', contentStatus: 'canonical',
    shortDescription: 'A weatherproof traveling staff built for route wards, camp work, and sustained field casting.',
    price: { amount: 42, denomination: 'Silver', unit: 'staff' }, art: 'wand',
    facts: { category: 'Field channeling staff', supplier: 'Blackbriar', material: 'Storm-felled blackthorn with brass ferrule', core: 'Braided copper conduit and smoky quartz crown', dimensions: '58–64 inches; sized before dispatch', finish: 'Boiled oil, waxed grip, and rainproof cap', attunement: 'Moderate sustained load; personal fitting recommended', recommendedUsage: 'Surveying, travel, camp wards, and outdoor professional work' },
    handling: implementHandling,
  },
  {
    sku: 'SSC-WND-0870', slug: 'silverbough-court-wand', name: 'Silverbough Court Wand', departmentId: 'wands-staves', contentStatus: 'canonical',
    shortDescription: 'A poised, heirloom-grade wand balanced for formal workings and exceptionally fine control.',
    price: { amount: 8, denomination: 'Gold', unit: 'wand' }, art: 'wand',
    facts: { category: 'Fine attunement instrument', supplier: 'Aelthir & Vale, Lethalas', material: 'Silver-birch heartwood with moon-silver fittings', core: 'Hand-selected star-sapphire filament', dimensions: '11 inches long', finish: 'Twelve-coat hand polish with fitted silkwood case', attunement: 'Individually balanced; purchaser’s casting profile requested before dispatch', recommendedUsage: 'Formal practice, precision work, and ceremonial occasions' },
    handling: implementHandling,
  },
  {
    sku: 'SSC-REA-0018', slug: 'nine-tooth-processed-mandrake-root', name: 'Nine-Tooth Processed Mandrake Root', departmentId: 'ingredients-reagents', contentStatus: 'canonical',
    shortDescription: 'Washed, silenced, sectioned mandrake root for standard restorative and transmutative recipes.',
    price: { amount: 12, denomination: 'Copper', unit: 'packet' }, art: 'bundle',
    facts: { category: 'Processed botanical reagent', supplier: 'Nine-Tooth Botanical Processing Cooperative', grade: 'Workshop standard', origin: 'Cooperative farms of the Lower Fen', packageSize: '4 oz waxed packet', storage: 'Keep cool, dry, and beyond earshot of unprocessed roots', shelfLife: '18 months sealed', recommendedUsage: 'Grinding, decoction, and ordinary restorative bases' },
    handling: reagentHandling,
  },
  {
    sku: 'SSC-REA-0060', slug: 'mooncap-powder-standard-grade', name: 'Mooncap Powder, Standard Grade', departmentId: 'ingredients-reagents', contentStatus: 'canonical',
    shortDescription: 'Uniformly milled mooncap for sleep preparations, pale inks, and low-light reactive compounds.',
    price: { amount: 28, denomination: 'Copper', unit: 'tin' }, art: 'bundle',
    facts: { category: 'Powdered botanical reagent', supplier: 'Nine-Tooth Botanical Processing Cooperative', grade: 'Standard, 80-mesh', origin: 'Shade houses of the Lower Fen', packageSize: '2 oz sealed tin', storage: 'Keep tightly closed and away from direct moonlight', shelfLife: '12 months sealed; 90 days after opening', recommendedUsage: 'Measured addition to established formulae; avoid inhalation' },
    handling: reagentHandling,
  },
  {
    sku: 'SSC-REA-0144', slug: 'ironbelly-alchemical-salt-number-four', name: 'Ironbelly Alchemical Salt No. 4', departmentId: 'ingredients-reagents', contentStatus: 'canonical',
    shortDescription: 'Reliable bulk buffering salt for wash baths, neutralization barrels, and large-batch extraction.',
    price: { amount: 7, denomination: 'Silver', unit: 'sack' }, art: 'bundle',
    facts: { category: 'Bulk mineral reagent', supplier: 'Ironbelly Alchemical Bulk', grade: 'Commercial No. 4', origin: 'Ironbelly Works, North Quarry District', packageSize: '25 lb lined sack', storage: 'Keep dry and raised from stone floors', shelfLife: 'Indefinite while dry and uncontaminated', recommendedUsage: 'Workshop-scale buffering, neutralization, and extraction' },
    handling: reagentHandling,
  },
  {
    sku: 'SSC-REA-0216', slug: 'grix-and-gromm-general-purpose-crucible-flux', name: 'Grix & Gromm General-Purpose Crucible Flux', departmentId: 'ingredients-reagents', contentStatus: 'canonical',
    shortDescription: 'An economical mixed flux for routine metal, glass, and mineral preparations in ordinary crucibles.',
    price: { amount: 55, denomination: 'Copper', unit: 'pail' }, art: 'bundle',
    facts: { category: 'Industrial process reagent', supplier: 'Grix & Gromm Crucible Works', grade: 'General purpose', origin: 'Lot varies; see pail stamp', packageSize: '10 lb lidded pail', storage: 'Keep lid secured; break up harmless settling before use', shelfLife: '24 months sealed', recommendedUsage: 'Routine workshop melts below white heat; test a small batch before precision work' },
    handling: reagentHandling,
  },
]
