// ─────────────────────────────────────────────────────────────────────────────
// Tranquil by Glims — Menu Data
// Extracted from: Tranquil Food and Drinks Lounge.pdf
//                 Tranquil Food and Drinks ground floor 2.pdf
// All prices exclusive of VAT per the original PDFs.
// ─────────────────────────────────────────────────────────────────────────────

export const WHATSAPP_NUMBER = '2348121558483';

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  /** Single price (same on all floors) — null means "price on request" */
  price?: string | null;
  /** Ground Floor specific price */
  priceGF?: string;
  /** Lounge & Rooftop specific price */
  priceLounge?: string;
  /** Short qualifier shown as a badge, e.g. "Ground Floor only" */
  note?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  type: 'food' | 'drinks';
  /** High quality representative image for the category */
  image: string;
  /** Small notice shown beneath the category heading */
  categoryNote?: string;
  items: MenuItem[];
}

// ─── WhatsApp Order URL ───────────────────────────────────────────────────────

export function createOrderUrl(item: MenuItem): string {
  const hasFloorPrices = !!(item.priceGF || item.priceLounge);

  let priceLine = '';
  if (item.priceGF && item.priceLounge) {
    priceLine =
      `\n\nPricing by floor:\n` +
      `  • Ground Floor: ${item.priceGF}\n` +
      `  • Lounge & Rooftop: ${item.priceLounge}`;
  } else if (item.priceGF) {
    priceLine = ` — ${item.priceGF}`;
  } else if (item.priceLounge) {
    priceLine = ` — ${item.priceLounge}`;
  } else if (item.price) {
    priceLine = ` — ${item.price}`;
  }

  const message =
    `Hello Tranquil by Glims! 🍽️\n\n` +
    `I would like to order: *${item.name}*${hasFloorPrices && item.priceGF && item.priceLounge ? '' : priceLine}` +
    (item.priceGF && item.priceLounge ? priceLine : '') +
    `\n\nKindly fill in the details below to complete your order:\n` +
    `  • Full Name:\n` +
    `  • Seating Area (Ground Floor / Lounge / Rooftop):\n` +
    `  • Date & Time of Visit:\n` +
    `  • Number of Guests:\n` +
    `  • Any Special Requests:\n\n` +
    `Thank you! 🙏`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ─── Food Categories ──────────────────────────────────────────────────────────

export const foodCategories: MenuCategory[] = [
  {
    id: 'starters',
    name: 'Starters & Appetizers',
    type: 'food',
    image: '/assets/starters-appetizers.jpg',
    items: [
      {
        id: 'chicken-wing',
        name: 'Chicken Wing',
        description: 'Wings in herb chili sauce',
        price: '₦9,500',
      },
      {
        id: 'chicken-spring-rolls',
        name: 'Chicken Spring Rolls',
        description: 'Mince chicken, dark soy sauce, basil',
        price: '₦6,000',
      },
      {
        id: 'veg-spring-rolls',
        name: 'Vegetable Spring Rolls',
        description: 'Cabbage, carrots, capsicum, fish sauce',
        price: '₦7,000',
      },
      {
        id: 'crispy-calamari',
        name: 'Crispy Calamari',
        description: 'Breadcrumbs, sweet chili sauce, eggwash',
        price: '₦9,000',
      },
      {
        id: 'chicken-escalope',
        name: 'Chicken Escalope',
        description: 'Boneless flat chicken, breadcrumbs, onion powder, chips, eggwash',
        price: '₦9,000',
      },
      {
        id: 'bbq-chicken-lollipop',
        name: 'BBQ Chicken Lollipop',
        description: 'Chicken wings, BBQ sauce, garlic and onion powder',
        price: '₦8,000',
      },
      {
        id: 'small-chops',
        name: 'Small Chops',
        description: 'Gizzards, puff puff, spring rolls',
        price: '₦9,000',
      },
    ],
  },
  {
    id: 'salads',
    name: 'Salads',
    type: 'food',
    image: '/assets/salads.jpg',
    items: [
      {
        id: 'seafood-salad',
        name: 'Seafood Salad',
        description: 'Lettuce, cucumber, tomato, carrots, sweet corn, prawn, calamari, shrimps',
        price: '₦10,500',
      },
      {
        id: 'chicken-salad',
        name: 'Chicken Salad',
        description: 'Shredded chicken, lettuce, cucumber, tomato, carrots, sweet corn',
        price: '₦7,500',
      },
      {
        id: 'avocado-shrimp-salad',
        name: 'Avocado & Shrimp Salad',
        description: 'Avocado, shrimp, lettuce, cucumber, tomato, carrots, sweet corn',
        price: '₦8,500',
      },
      {
        id: 'coleslaw',
        name: 'Coleslaw',
        description: 'Cabbage, carrot, mayonnaise',
        price: '₦2,500',
      },
    ],
  },
  {
    id: 'platters',
    name: 'Platters',
    type: 'food',
    image: '/assets/platters.jpg',
    items: [
      { id: 'tranquil-4way', name: 'Tranquil 4-Way Platter', price: '₦35,000' },
      { id: 'tranquil-signature-platter', name: 'Tranquil Signature Platter', price: '₦40,000' },
      { id: 'tranquil-special', name: 'Tranquil Special Platter', price: '₦45,000' },
      { id: 'tranquil-seafood-platter', name: 'Tranquil Seafood Platter', price: '₦50,000' },
      { id: 'meat-platter', name: 'Meat Platter', price: '₦30,000' },
    ],
  },
  {
    id: 'spicy',
    name: 'Spicy',
    type: 'food',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    items: [
      {
        id: 'peppered-gizzard',
        name: 'Peppered Gizzard',
        price: null,
        note: 'Price on request',
      },
      {
        id: 'gizdodo',
        name: 'Gizdodo',
        description: 'Gizzards, plantain, pepper sauce, capsicum',
        price: '₦9,000',
      },
      {
        id: 'peppered-snails',
        name: 'Peppered Snails',
        description: 'Snail, pepper sauce, veggie',
        price: '₦9,000',
      },
      {
        id: 'catfish-pepper-soup',
        name: 'Catfish Pepper Soup',
        description: 'Catfish, crayfish, pepper, yam',
        price: '₦12,500',
      },
      {
        id: 'goat-pepper-soup',
        name: 'Goat Meat Pepper Soup',
        description: 'Goat meat, yam, pepper, crayfish',
        price: '₦7,000',
      },
      {
        id: 'peppered-turkey',
        name: 'Peppered Turkey',
        description: 'Diced turkey, pepper sauce, veggie',
        price: '₦11,500',
      },
      {
        id: 'peppered-chicken',
        name: 'Peppered Chicken',
        description: 'Diced chicken, pepper sauce, veggies',
        price: '₦9,500',
      },
      {
        id: 'asun',
        name: 'Asun',
        description: 'Goat meat, pepper, onion, cabbage',
        price: '₦6,000',
      },
      {
        id: 'pepper-goat-meat',
        name: 'Pepper Goat Meat',
        price: null,
        note: 'Price on request',
      },
      {
        id: 'pepper-croaker-fish',
        name: 'Pepper Croaker Fish',
        price: null,
        note: 'Price on request',
      },
      {
        id: 'isiewu',
        name: 'Isiewu (Goat Head)',
        description: 'Homemade sauce',
        price: '₦15,000',
      },
      {
        id: 'nkwobi',
        name: 'Nkwobi (Cow Leg)',
        description: 'Homemade sauce',
        price: '₦9,500',
      },
    ],
  },
  {
    id: 'native-soups',
    name: 'Native Soups',
    type: 'food',
    image: '/assets/egusi-soup.jpg',
    categoryNote: 'Served with choice of swallow',
    items: [
      {
        id: 'afang-soup',
        name: 'Afang Soup',
        description: 'Ukazi leaf, water leaf, dry fish, pomo, stock fish, goat meat',
        price: '₦17,000',
      },
      {
        id: 'egusi-soup',
        name: 'Egusi Soup',
        description: 'Egusi, dry fish, pomo, stock fish, uziza/ugu leaf',
        price: '₦18,000',
      },
      {
        id: 'seafood-okra',
        name: 'Seafood Okra',
        description: 'Okra, calamari, shrimp, prawn, snail, croaker fish',
        price: '₦18,000',
      },
      {
        id: 'fisherman-soup',
        name: 'Fisherman Soup',
        description: 'Prawn, croaker fish, calamari, shrimp, snail, periwinkle',
        price: '₦26,500',
      },
      {
        id: 'seafood-oha-soup',
        name: 'Seafood Oha Soup',
        description: 'Oha leaf, periwinkle, shrimp, prawn, croaker fish, calamari, snail',
        price: '₦21,500',
      },
      {
        id: 'white-soup',
        name: 'White Soup',
        description: 'Yam, stock fish, goat meat, dry fish, pomo, uziza leaf',
        price: '₦17,000',
      },
      {
        id: 'efo-riro',
        name: 'Efo Riro',
        description: 'Shoko leaf, pomo, stock fish, goat, dry fish',
        price: '₦18,000',
      },
    ],
  },
  {
    id: 'swallow',
    name: 'Swallow',
    type: 'food',
    image: '/assets/swallow-food.jpg',
    items: [
      { id: 'eba', name: 'Eba', price: '₦2,500' },
      { id: 'semo', name: 'Semovita (Semo)', price: '₦2,500' },
      { id: 'poundo', name: 'Poundo', price: '₦2,500' },
    ],
  },
  {
    id: 'rice',
    name: 'Main Course — Rice',
    type: 'food',
    image: '/assets/asian-rice.jpg',
    items: [
      {
        id: 'asian-special-rice',
        name: 'Asian Special Rice',
        description: 'Basmati rice, shrimp, chicken breast, egg, prawn',
        price: '₦18,500',
      },
      {
        id: 'village-rice',
        name: 'Village Rice',
        description: 'Local rice, ponmo, dry fish, meat, onion, tomato',
        price: '₦12,500',
      },
      {
        id: 'jollof-basmati',
        name: 'Jollof Rice (Basmati)',
        description: 'Tomato sauce, butter, onion — Chicken, Turkey or Fish',
        price: '₦14,500',
      },
      {
        id: 'jollof-local',
        name: 'Jollof Rice (Local)',
        description: 'Tomato sauce, butter, onion — Chicken, Turkey or Fish',
        price: '₦13,500',
      },
      {
        id: 'stir-fried-rice',
        name: 'Stir Fried Rice',
        description: 'Basmati rice, veggies, dark soy sauce — Chicken, Turkey or Fish',
        price: '₦15,500',
      },
      {
        id: 'seafood-jollof',
        name: 'Seafood Jollof',
        description: 'Jollof rice, calamari, shrimp, prawns',
        price: '₦16,500',
      },
      {
        id: 'signature-rice',
        name: 'Tranquil Signature Rice',
        description: 'Basmati rice, grilled chicken breast, spring onion, oyster sauce, fresh pepper',
        price: '₦15,000',
      },
    ],
  },
  {
    id: 'pasta',
    name: 'Main Course — Pasta & Noodles',
    type: 'food',
    image: '/assets/alfredo-pasta.jpg',
    items: [
      {
        id: 'alfredo-chicken',
        name: 'Alfredo Pasta (Chicken)',
        description: 'Creamy sauce, cornflour, parmesan cheese',
        price: '₦15,000',
      },
      {
        id: 'alfredo-prawn',
        name: 'Alfredo Pasta (Prawns)',
        description: 'Creamy sauce, cornflour, parmesan cheese',
        price: '₦17,500',
      },
      {
        id: 'meatballs-pasta',
        name: 'Meatballs Pasta',
        description: 'Spaghetti, meatballs in sauce',
        price: '₦15,000',
      },
      {
        id: 'seafood-pasta',
        name: 'Seafood Pasta',
        description: 'Spaghetti, calamari, shrimps, prawns in tomato or cream sauce',
        price: '₦19,000',
      },
      {
        id: 'stir-fried-spaghetti',
        name: 'Stir Fried Spaghetti',
        description: 'Sausage, capsicum, vegetables, soy & oyster sauce — Chicken, Turkey or Fish',
        price: '₦14,000',
      },
      {
        id: 'singapore-noodles',
        name: 'Singapore Noodles',
        description: 'Rice sticks, veggies, calamari, shrimps, egg, chicken',
        price: '₦15,500',
      },
    ],
  },
  {
    id: 'grills',
    name: 'Grills',
    type: 'food',
    image: '/assets/grilled-meat.jpg',
    items: [
      {
        id: 'grilled-tiger-prawns',
        name: 'Grilled Tiger Prawns',
        description: 'King prawn, garlic, onion, chips',
        price: '₦26,000',
      },
      {
        id: 'grilled-fish',
        name: 'Grilled Fish (Big)',
        description: 'Croaker fish, pepper, chips',
        price: '₦15,000',
      },
      {
        id: 'grilled-chicken',
        name: 'Grilled Chicken',
        description: 'Chicken laps, pepper, chips',
        price: '₦11,500',
      },
      {
        id: 'grilled-turkey',
        name: 'Grilled Turkey',
        description: 'Turkey, pepper, chips',
        price: '₦13,500',
      },
      {
        id: 'grilled-catfish',
        name: 'Grilled Catfish (Big)',
        description: 'BBQ catfish, pepper, chips',
        price: '₦18,000',
      },
    ],
  },
  {
    id: 'burgers',
    name: 'Burgers & Sandwiches',
    type: 'food',
    image: '/assets/burgers-sandwiches.jpg',
    items: [
      {
        id: 'chicken-burger-crispy',
        name: 'Chicken Burger (Crispy)',
        description: 'Served with chips',
        price: '₦9,500',
      },
      {
        id: 'chicken-burger-plain',
        name: 'Chicken Burger (Plain)',
        description: 'Served with chips',
        price: '₦9,000',
      },
      {
        id: 'beef-burger',
        name: 'Beef Burger',
        description: 'Served with chips',
        price: '₦8,500',
      },
      {
        id: 'shawarma-chicken-single',
        name: 'Shawarma Chicken (Single)',
        description: 'Cabbage, carrot, mayonnaise, lemon juice, diced chicken',
        price: '₦4,500',
      },
      {
        id: 'shawarma-chicken-double',
        name: 'Shawarma Chicken (Double)',
        price: '₦5,000',
      },
      {
        id: 'shawarma-beef-single',
        name: 'Shawarma Beef (Single)',
        description: 'Mayonnaise, ketchup, paprika, mince beef, cabbage, carrots',
        price: '₦4,000',
      },
      {
        id: 'shawarma-beef-double',
        name: 'Shawarma Beef (Double)',
        price: '₦4,500',
      },
    ],
  },
  {
    id: 'sides',
    name: 'Sides',
    type: 'food',
    image: '/assets/sides.jpg',
    items: [
      { id: 'french-fries', name: 'French Fries', price: '₦2,500' },
      { id: 'yam-fries', name: 'Yam Fries', price: '₦2,500' },
      { id: 'plantain', name: 'Plantain', price: '₦2,500' },
      { id: 'coleslaw-side', name: 'Coleslaw', price: '₦2,500' },
      { id: 'jollof-local-side', name: 'Jollof Rice (Local)', price: '₦3,000' },
      { id: 'jollof-basmati-side', name: 'Jollof Rice (Basmati)', price: '₦4,000' },
      { id: 'white-rice-local', name: 'White Rice (Local)', price: '₦2,000' },
      { id: 'white-rice-basmati', name: 'White Rice (Basmati)', price: '₦2,500' },
    ],
  },
  {
    id: 'dessert',
    name: 'Dessert',
    type: 'food',
    image: '/assets/dessert.jpg',
    items: [
      {
        id: 'flavour-custom-dessert',
        name: 'Flavour Custom Dessert',
        description: 'Bake of choice with creamy spray & candlelight',
        price: '₦15,000',
      },
    ],
  },
];

// ─── Drinks Categories ────────────────────────────────────────────────────────

export const drinkCategories: MenuCategory[] = [
  {
    id: 'cocktails',
    name: 'Cocktails',
    type: 'drinks',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop',
    categoryNote: 'All prices exclusive of VAT',
    items: [
      {
        id: 'tranquility-jar',
        name: 'Tranquility Jar',
        description: 'Tequila, vodka, gin, triple sec, orange juice, pineapple juice, cranberry juice, grenadine',
        priceGF: '₦14,000',
        priceLounge: '₦15,000',
      },
      {
        id: 'mojito',
        name: 'Mojito',
        description: 'Rum infused with fresh lime, mint and sugar — Strawberry, Passion fruit & Mango flavour',
        priceGF: '₦9,500',
        priceLounge: '₦10,500',
      },
      {
        id: 'margarita',
        name: 'Margarita',
        description: 'Tequila, lime juice, rum with pinch of salt — Strawberry, Passion fruit & Mango flavour',
        priceGF: '₦9,500',
        priceLounge: '₦10,500',
      },
      {
        id: 'long-island',
        name: 'Long Island',
        description: 'Rum, vodka, gin, tequila & cointreau, top with cola',
        priceGF: '₦9,500',
        priceLounge: '₦10,500',
      },
      {
        id: 'pornstar-martini',
        name: 'Pornstar Martini',
        description: 'Passion fruit, vanilla flavoured vodka, fresh lime juice & prosecco',
        priceGF: '₦9,500',
        priceLounge: '₦10,500',
      },
      {
        id: 'tranquility-cocktail',
        name: 'Tranquility',
        description: 'Brown sugar, lime and sugar mixed with whiskey',
        priceGF: '₦9,500',
        note: 'Ground Floor only',
      },
      {
        id: 'sex-on-the-beach',
        name: 'Sex on the Beach',
        description: 'Vodka, peach, cranberry, orange juice & few dashes of grenadine',
        priceGF: '₦9,500',
        priceLounge: '₦10,500',
      },
      {
        id: 'whiskey-sour',
        name: 'Whiskey Sour',
        description: 'Egg white or without, fresh lemon juice infused premium whiskey and lime',
        priceGF: '₦9,500',
        priceLounge: '₦10,500',
      },
      {
        id: 'pina-colada',
        name: 'Piña Colada',
        description: 'Rum, coconut liqueur, coconut cream, fresh pineapple, coconut syrup and skimmed milk',
        priceGF: '₦9,500',
        priceLounge: '₦10,500',
      },
      {
        id: 'blue-hawaii',
        name: 'Blue Hawaii',
        description: 'Rum, coconut liquor, pineapple juice and blue curaçao',
        priceGF: '₦9,500',
        priceLounge: '₦10,500',
      },
      {
        id: 'tequila-sunrise',
        name: 'Tequila Sunrise',
        description: 'Tequila, orange juice, lemon juice and grenadine',
        priceGF: '₦9,500',
        priceLounge: '₦10,500',
      },
      {
        id: 'cuba-libra',
        name: 'Cuba Libra',
        description: 'Rum, lemon juice and coke',
        priceGF: '₦9,500',
        priceLounge: '₦10,500',
      },
    ],
  },
  {
    id: 'mocktails',
    name: 'Mocktails',
    type: 'drinks',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1200&auto=format&fit=crop',
    categoryNote: 'All prices exclusive of VAT',
    items: [
      {
        id: 'chapman',
        name: 'Chapman',
        description: 'Fanta, sprite, grenadine, orange juice and bitters',
        priceGF: '₦8,500',
        priceLounge: '₦9,500',
      },
      {
        id: 'virgin-colada',
        name: 'Virgin Colada',
        description: 'Coconut cream, fresh pineapple, coconut syrup & skimmed milk',
        priceGF: '₦8,500',
        priceLounge: '₦9,500',
      },
      {
        id: 'virgin-mojito',
        name: 'Virgin Mojito',
        description: 'Fresh lime, mint & sugar',
        priceGF: '₦8,500',
        priceLounge: '₦9,500',
      },
      {
        id: 'virgin-daiquiri',
        name: 'Virgin Daiquiri',
        description: 'Lemon juice and sugar',
        priceGF: '₦8,500',
        priceLounge: '₦9,500',
      },
      {
        id: 'mint-julep',
        name: 'Mint Julep',
        description: 'Mint leaves, ginger juice, pineapple & orange juice, fresh lemon juice and simple syrup',
        priceGF: '₦8,500',
        priceLounge: '₦9,500',
      },
      {
        id: 'lemonade',
        name: 'Lemonade',
        description: 'Teem, lemon juice, sugar mix',
        priceGF: '₦8,500',
        priceLounge: '₦9,500',
      },
      {
        id: 'smoothie-mix',
        name: 'Smoothie Mix',
        description: 'Pineapple, banana, watermelon, skimmed milk, whipping cream',
        priceGF: '₦8,500',
        priceLounge: '₦9,500',
      },
    ],
  },
  {
    id: 'milkshakes',
    name: 'Milkshakes',
    type: 'drinks',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200&auto=format&fit=crop',
    items: [
      {
        id: 'milkshake-cookies',
        name: 'Milkshake Cookies (Premium)',
        description: 'Whole milk, cookies, sprinkles, fudge, whipped cream — Vanilla, Strawberry, Chocolate or Caramel',
        price: '₦14,000',
      },
      {
        id: 'milkshake-regular',
        name: 'Milkshake (Regular)',
        description: 'Caramel, strawberry, chocolate & vanilla, ice cream, milk, topped with whipped cream',
        priceGF: '₦9,500',
        note: 'Ground Floor only',
      },
    ],
  },
  {
    id: 'shots',
    name: 'Shots',
    type: 'drinks',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?q=80&w=1200&auto=format&fit=crop',
    categoryNote: 'All prices exclusive of VAT',
    items: [
      { id: 'tequila-shot', name: 'Tequila Shot', price: '₦4,500' },
      { id: 'tequila-6shots', name: 'Tequila (6 Shots)', price: '₦22,000' },
      { id: 'whiskey-shot', name: 'Whiskey Shot', price: '₦4,500' },
      { id: 'whiskey-6shots', name: 'Whiskey (6 Shots)', price: '₦22,000' },
    ],
  },
  {
    id: 'whiskey',
    name: 'Whiskey',
    type: 'drinks',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=1200&auto=format&fit=crop',
    categoryNote: 'Bottle prices. All prices exclusive of VAT',
    items: [
      { id: 'glenfiddich-18', name: 'Glenfiddich (18 Years)', price: '₦280,000' },
      { id: 'glenfiddich-15', name: 'Glenfiddich (15 Years)', price: '₦170,000' },
      { id: 'monkey-shoulder', name: 'Monkey Shoulder', price: '₦100,000' },
      { id: 'jameson-black', name: 'Jameson (Black Barrel)', price: '₦100,000' },
      { id: 'jameson-regular', name: 'Jameson Regular', price: '₦70,000' },
      { id: 'black-label', name: 'Black Label', price: '₦70,000' },
      { id: 'red-label', name: 'Red Label', price: '₦50,000' },
      { id: 'jack-daniels', name: 'Jack Daniels', price: '₦50,000' },
      { id: 'william-lawson', name: 'William Lawson', price: '₦45,000' },
    ],
  },
  {
    id: 'cognac',
    name: 'Cognac',
    type: 'drinks',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=1200&auto=format&fit=crop',
    categoryNote: 'Bottle prices. All prices exclusive of VAT',
    items: [
      { id: 'hennessy-xo', name: 'Hennessy XO', price: '₦500,000' },
      { id: 'hennessy-vsop', name: 'Hennessy VSOP', price: '₦210,000' },
      { id: 'martel-blue-swift', name: 'Martel Blue Swift', price: '₦200,000' },
      { id: 'hennessy-vs', name: 'Hennessy VS', price: '₦110,000' },
      { id: 'martel-vs', name: 'Martel VS', price: '₦105,000' },
    ],
  },
  {
    id: 'tequila-bottles',
    name: 'Tequila',
    type: 'drinks',
    image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=1200&auto=format&fit=crop',
    categoryNote: 'Bottle prices. All prices exclusive of VAT',
    items: [
      { id: 'don-julio', name: 'Don Julio', price: '₦290,000' },
      { id: 'casamigos', name: 'Casamigos', price: '₦280,000' },
      { id: 'salamanca', name: 'Salamanca', price: '₦90,000' },
      { id: 'olmeca', name: 'Olmeca', price: '₦50,000' },
      { id: 'sierra', name: 'Sierra', price: '₦40,000' },
    ],
  },
  {
    id: 'champagne',
    name: 'Champagne',
    type: 'drinks',
    image: 'https://images.unsplash.com/photo-1594488507235-d0333b3723ee?q=80&w=1200&auto=format&fit=crop',
    categoryNote: 'Bottle prices. All prices exclusive of VAT',
    items: [
      { id: 'moet-rose', name: 'Moët Rosé', price: '₦210,000' },
      { id: 'moet-nectar', name: 'Moët Nectar Impérial', price: '₦230,000' },
      { id: 'belaire', name: 'Belaire', price: '₦90,000' },
      { id: 'andre-rose', name: 'André Rosé', price: '₦40,000' },
    ],
  },
  {
    id: 'wine',
    name: 'Wine',
    type: 'drinks',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop',
    categoryNote: 'Bottle prices. All prices exclusive of VAT',
    items: [
      { id: 'carlo-rossi', name: 'Carlo Rossi', price: '₦28,000' },
      { id: 'baron', name: 'Baron', price: '₦25,000' },
      { id: 'four-cousins', name: 'Four Cousins', price: '₦28,000' },
      { id: 'santa-alba-sour', name: 'Santa Alba (Sour)', price: '₦30,000' },
      { id: 'santa-alba-sweet', name: 'Santa Alba (Sweet)', price: '₦30,000' },
      { id: 'asconi-agor', name: 'Asconi Agor', price: '₦30,000' },
    ],
  },
  {
    id: 'vodka',
    name: 'Vodka',
    type: 'drinks',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=1200&auto=format&fit=crop',
    categoryNote: 'Bottle prices. Ground Floor only. All prices exclusive of VAT',
    items: [
      { id: 'absolute-vodka', name: 'Absolute Vodka', priceGF: '₦38,500', note: 'Ground Floor only' },
      { id: 'bombay', name: 'Bombay', priceGF: '₦38,500', note: 'Ground Floor only' },
      { id: 'smirnoff-vodka', name: 'Smirnoff Vodka', priceGF: '₦38,500', note: 'Ground Floor only' },
    ],
  },
  {
    id: 'liqueur',
    name: 'Liqueur',
    type: 'drinks',
    image: 'https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?q=80&w=1200&auto=format&fit=crop',
    categoryNote: 'Bottle prices. All prices exclusive of VAT',
    items: [
      { id: 'campari', name: 'Campari', price: '₦55,000' },
      { id: 'jagermeister', name: 'Jägermeister', price: '₦45,000' },
      { id: 'baileys', name: 'Baileys', price: '₦35,000' },
    ],
  },
  {
    id: 'mixers',
    name: 'Mixers & Energy Drinks',
    type: 'drinks',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1200&auto=format&fit=crop',
    categoryNote: 'All prices exclusive of VAT',
    items: [
      { id: 'cranberry', name: 'Cranberry', price: '₦13,500' },
      { id: 'red-bull', name: 'Red Bull', price: '₦4,000' },
      { id: 'power-horse', name: 'Power Horse', price: '₦4,000' },
      { id: 'black-bullet', name: 'Black Bullet', priceGF: '₦5,000', note: 'Ground Floor only' },
      { id: 'monster', name: 'Monster', priceGF: '₦4,000', note: 'Ground Floor only' },
    ],
  },
  {
    id: 'softs',
    name: 'Soft Drinks & Juices',
    type: 'drinks',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=1200&auto=format&fit=crop',
    categoryNote: 'All prices exclusive of VAT',
    items: [
      { id: 'active', name: 'Active', priceGF: '₦3,500', note: 'Ground Floor only' },
      { id: '5alive', name: '5Alive Pulpy', priceGF: '₦4,000', note: 'Ground Floor only' },
      { id: 'berry-blast', name: 'Berry Blast', priceGF: '₦4,500', note: 'Ground Floor only' },
      { id: 'hollandia-yogurt', name: 'Hollandia Yogurt', priceGF: '₦4,000', priceLounge: '₦5,000' },
      { id: 'maltina', name: 'Maltina', priceGF: '₦1,200', note: 'Ground Floor only' },
      { id: 'cocacola', name: 'CocaCola', priceGF: '₦1,200', priceLounge: '₦2,000' },
      { id: 'fanta', name: 'Fanta', priceGF: '₦1,200', note: 'Ground Floor only' },
      {
        id: 'orange-juice',
        name: 'Orange Juice',
        priceLounge: '₦5,000',
        note: 'Lounge & Rooftop only',
      },
      {
        id: 'fresh-juice',
        name: 'Fresh Juice',
        description: 'Orange, Apple, Watermelon or Pineapple',
        priceLounge: '₦9,500',
        note: 'Lounge & Rooftop only',
      },
      { id: 'water', name: 'Water', price: '₦600' },
    ],
  },
  {
    id: 'beer',
    name: 'Beer',
    type: 'drinks',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=1200&auto=format&fit=crop',
    categoryNote: 'Ground Floor only. All prices exclusive of VAT',
    items: [
      { id: 'heineken', name: 'Heineken', priceGF: '₦3,000', note: 'Ground Floor only' },
      { id: 'goldberg', name: 'Goldberg', priceGF: '₦2,500', note: 'Ground Floor only' },
      { id: 'trophy', name: 'Trophy', priceGF: '₦2,500', note: 'Ground Floor only' },
      { id: 'goldberg-black', name: 'Goldberg Black', priceGF: '₦3,500', note: 'Ground Floor only' },
      { id: 'radler', name: 'Radler', priceGF: '₦2,500', note: 'Ground Floor only' },
      { id: 'gulder', name: 'Gulder', priceGF: '₦3,000', note: 'Ground Floor only' },
      { id: 'guinness', name: 'Guinness', priceGF: '₦3,000', note: 'Ground Floor only' },
      { id: 'budweiser', name: 'Budweiser', priceGF: '₦3,000', note: 'Ground Floor only' },
      { id: 'desperado', name: 'Desperado', priceGF: '₦2,500', note: 'Ground Floor only' },
      { id: 'smirnoff-ice', name: 'Smirnoff Ice', priceGF: '₦3,000', note: 'Ground Floor only' },
      { id: 'flying-fish', name: 'Flying Fish', priceGF: '₦2,500', note: 'Ground Floor only' },
    ],
  },
  {
    id: 'shisha',
    name: 'Shisha & Puff',
    type: 'drinks',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1200&auto=format&fit=crop',
    categoryNote: 'All prices exclusive of VAT',
    items: [
      {
        id: 'shisha-single',
        name: 'Shisha (Single)',
        priceGF: '₦8,000',
        priceLounge: '₦11,000',
      },
      {
        id: 'shisha-double',
        name: 'Shisha (Double)',
        priceGF: '₦11,000',
        priceLounge: '₦15,500',
      },
      { id: 'vape', name: 'Vape', price: '₦16,500' },
      {
        id: 'cigarettes',
        name: 'Cigarettes',
        priceGF: '₦1,500',
        priceLounge: '₦2,000',
      },
    ],
  },
];

export const allCategories = [...foodCategories, ...drinkCategories];
