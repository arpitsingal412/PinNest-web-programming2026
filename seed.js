// seed.js
// Seed script to populate MongoDB with sample furniture/interior data
// Run with: node seed.js
// This creates a default user, sample pins, boards

var mongoose = require('mongoose');
var Pin = require('./models/Pin');
var Board = require('./models/Board');
var User = require('./models/User');
var bcrypt = require('bcryptjs');

// MongoDB connection (same as server.js)
var MONGODB_URI = 'mongodb://localhost:27017/pinnest';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(function() {
    console.log('Connected to MongoDB for seeding');
    return seedDatabase();
  })
  .then(function() {
    console.log('Seeding complete!');
    console.log('Login with:  email: arpit@pinnest.com   password: pinnest123');
    mongoose.connection.close();
  })
  .catch(function(err) {
    console.log('Seeding error:', err.message);
    mongoose.connection.close();
  });

// Main seed function
function seedDatabase() {
  // Clear existing data first
  return Pin.deleteMany({})
    .then(function() { return Board.deleteMany({}); })
    .then(function() { return User.deleteMany({}); })
    .then(function() {
      console.log('Cleared existing data');

      // ============================================================
      // CREATE DEFAULT USER
      // ============================================================
      var defaultUser = new User({
        name: 'Arpit Singal',
        email: 'arpit@pinnest.com',
        // Password is hashed before it is stored — never saved as plain text
        password: bcrypt.hashSync('pinnest123', 10),
        bio: 'Interior design enthusiast. Love modern and minimal furniture.',
        avatar: '/images/loginpic.jpg'
      });

      return defaultUser.save();
    })
    .then(function(user) {
      console.log('Created default user:', user.name);

      // ============================================================
      // CREATE SAMPLE PINS — 24 furniture items using Kartika's images
      // ============================================================
      var samplePins = [
        // --- SOFAS ---
        {
          title: 'Modern Grey Fabric Sofa',
          description: 'Comfortable 3-seater fabric sofa with plush cushions. Clean lines and neutral grey tones make it perfect for any modern living room.',
          imageUrl: '/images/sofa1.jpg',
          room: 'Living Room',
          category: 'Sofa',
          style: 'Modern',
          tags: ['comfortable', 'grey', 'fabric', '3-seater'],
          price: 45000,
          createdBy: user._id
        },
        {
          title: 'Velvet Tufted Sofa',
          description: 'Elegant tufted sofa in rich velvet upholstery. A statement piece that adds sophistication to your living space.',
          imageUrl: '/images/sofa2.jpg',
          room: 'Living Room',
          category: 'Sofa',
          style: 'Modern',
          tags: ['velvet', 'tufted', 'luxury', 'statement'],
          price: 62000,
          createdBy: user._id
        },
        {
          title: 'Scandinavian Linen Sofa',
          description: 'Light and airy linen sofa with wooden legs. Scandinavian simplicity at its best.',
          imageUrl: '/images/sofa3.jpg',
          room: 'Living Room',
          category: 'Sofa',
          style: 'Scandinavian',
          tags: ['linen', 'wooden legs', 'scandinavian', 'light'],
          price: 38000,
          createdBy: user._id
        },
        {
          title: 'Compact Loveseat Sofa',
          description: 'Space-saving 2-seater loveseat, ideal for small living rooms and studio apartments.',
          imageUrl: '/images/sofa4.jpg',
          room: 'Living Room',
          category: 'Sofa',
          style: 'Minimal',
          tags: ['loveseat', '2-seater', 'compact', 'studio'],
          price: 28000,
          createdBy: user._id
        },

        // --- CHAIRS ---
        {
          title: 'Upholstered Armchair',
          description: 'Cozy upholstered armchair with wide seat and padded armrests. Perfect reading corner companion.',
          imageUrl: '/images/armchair1.jpg',
          room: 'Living Room',
          category: 'Chair',
          style: 'Modern',
          tags: ['armchair', 'upholstered', 'cozy', 'reading'],
          price: 19500,
          createdBy: user._id
        },
        {
          title: 'Accent Lounge Chair',
          description: 'Stylish accent chair with curved design. Adds character to any room.',
          imageUrl: '/images/armchair2.jpg',
          room: 'Living Room',
          category: 'Chair',
          style: 'Modern',
          tags: ['accent', 'lounge', 'curved', 'character'],
          price: 22000,
          createdBy: user._id
        },
        {
          title: 'Wooden Dining Chair',
          description: 'Classic wooden dining chair with clean lines. Sturdy construction and timeless design.',
          imageUrl: '/images/chair1.jpg',
          room: 'Dining',
          category: 'Chair',
          style: 'Scandinavian',
          tags: ['wooden', 'dining', 'classic', 'sturdy'],
          price: 8500,
          createdBy: user._id
        },

        // --- TABLES ---
        {
          title: 'Wooden Coffee Table',
          description: 'Natural wood coffee table with clean lines. A functional centrepiece for your living room.',
          imageUrl: '/images/coffeetable.jpg',
          room: 'Living Room',
          category: 'Table',
          style: 'Scandinavian',
          tags: ['wood', 'coffee table', 'centrepiece', 'natural'],
          price: 18000,
          createdBy: user._id
        },
        {
          title: 'Round Coffee Table',
          description: 'Elegant round coffee table with marble-effect top and gold-tone legs.',
          imageUrl: '/images/round-coffee-table.jpg',
          room: 'Living Room',
          category: 'Table',
          style: 'Modern',
          tags: ['round', 'marble', 'gold', 'elegant'],
          price: 24000,
          createdBy: user._id
        },
        {
          title: 'Dining Table Set',
          description: 'Solid wood dining table that comfortably seats six. Perfect for family gatherings.',
          imageUrl: '/images/foodtable1.jpg',
          room: 'Dining',
          category: 'Table',
          style: 'Modern',
          tags: ['dining', 'wood', '6-seater', 'family'],
          price: 35000,
          createdBy: user._id
        },
        {
          title: 'Study Desk',
          description: 'Clean minimal study desk with drawer storage. Ideal workspace for students and professionals.',
          imageUrl: '/images/dstable1.jpg',
          room: 'Study',
          category: 'Table',
          style: 'Minimal',
          tags: ['desk', 'study', 'drawer', 'workspace'],
          price: 16000,
          createdBy: user._id
        },
        {
          title: 'Bedside Nightstand',
          description: 'Compact bedside nightstand with single drawer. Warm wood finish pairs with any bedroom style.',
          imageUrl: '/images/nightstand1.jpg',
          room: 'Bedroom',
          category: 'Table',
          style: 'Scandinavian',
          tags: ['nightstand', 'bedside', 'drawer', 'compact'],
          price: 7500,
          createdBy: user._id
        },

        // --- BEDS ---
        {
          title: 'Upholstered Platform Bed',
          description: 'Modern platform bed with padded headboard. Clean silhouette creates a serene bedroom atmosphere.',
          imageUrl: '/images/bed1.jpg',
          room: 'Bedroom',
          category: 'Bed',
          style: 'Modern',
          tags: ['platform', 'upholstered', 'headboard', 'queen'],
          price: 55000,
          createdBy: user._id
        },
        {
          title: 'Wooden Frame Bed',
          description: 'Solid wood bed frame with slatted headboard. Natural beauty meets sturdy construction.',
          imageUrl: '/images/bed2.jpg',
          room: 'Bedroom',
          category: 'Bed',
          style: 'Scandinavian',
          tags: ['wooden', 'slatted', 'natural', 'solid'],
          price: 42000,
          createdBy: user._id
        },
        {
          title: 'Minimalist Low Bed',
          description: 'Low-profile minimalist bed frame. Japanese-inspired design for a calm sleeping space.',
          imageUrl: '/images/bed3.jpg',
          room: 'Bedroom',
          category: 'Bed',
          style: 'Minimal',
          tags: ['low-profile', 'minimalist', 'japanese', 'calm'],
          price: 35000,
          createdBy: user._id
        },

        // --- LIGHTING ---
        {
          title: 'Pendant Ceiling Lamp',
          description: 'Elegant pendant lamp that casts a warm ambient glow. Statement lighting for dining areas.',
          imageUrl: '/images/lamp1.jpg',
          room: 'Dining',
          category: 'Lighting',
          style: 'Modern',
          tags: ['pendant', 'ceiling', 'ambient', 'warm'],
          price: 6500,
          createdBy: user._id
        },
        {
          title: 'Decorative Table Lamp',
          description: 'Stylish table lamp with textured shade. Perfect for bedside tables and study desks.',
          imageUrl: '/images/lamp2.jpg',
          room: 'Bedroom',
          category: 'Lighting',
          style: 'Modern',
          tags: ['table lamp', 'textured', 'bedside', 'decorative'],
          price: 4800,
          createdBy: user._id
        },
        {
          title: 'Rattan Floor Lamp',
          description: 'Natural rattan floor lamp with woven shade. Casts beautiful light patterns.',
          imageUrl: '/images/floorlamp1.jpg',
          room: 'Living Room',
          category: 'Lighting',
          style: 'Boho',
          tags: ['rattan', 'floor lamp', 'woven', 'natural'],
          price: 5200,
          createdBy: user._id
        },

        // --- STORAGE ---
        {
          title: 'Tall Bookshelf',
          description: 'Tall wooden bookshelf with five open shelves. Display books, plants, and decor in style.',
          imageUrl: '/images/bookshelf1.jpg',
          room: 'Study',
          category: 'Storage',
          style: 'Scandinavian',
          tags: ['bookshelf', 'wooden', 'tall', 'display'],
          price: 22000,
          createdBy: user._id
        },
        {
          title: 'Modern Wardrobe',
          description: 'Spacious wardrobe with sliding doors and internal shelving. Clean modern design.',
          imageUrl: '/images/wardrobe1.jpg',
          room: 'Bedroom',
          category: 'Storage',
          style: 'Modern',
          tags: ['wardrobe', 'sliding', 'spacious', 'bedroom'],
          price: 48000,
          createdBy: user._id
        },
        {
          title: 'Bathroom Cabinet',
          description: 'Wall-mounted bathroom cabinet with mirrored front. Practical storage for bath essentials.',
          imageUrl: '/images/cabinets1.jpg',
          room: 'Bathroom',
          category: 'Storage',
          style: 'Modern',
          tags: ['cabinet', 'bathroom', 'mirrored', 'wall-mounted'],
          price: 12000,
          createdBy: user._id
        },

        // --- WALL DECOR ---
        {
          title: 'Abstract Wall Art Set',
          description: 'Set of abstract art prints in neutral tones. Modern wall decor that elevates any room.',
          imageUrl: '/images/wallart1.jpg',
          room: 'Living Room',
          category: 'Wall Decor',
          style: 'Modern',
          tags: ['art', 'abstract', 'neutral', 'print'],
          price: 7200,
          createdBy: user._id
        },
        {
          title: 'Round Wall Mirror',
          description: 'Elegant round wall mirror with gold frame. Makes spaces look bigger and brighter.',
          imageUrl: '/images/mirror1.jpg',
          room: 'Bedroom',
          category: 'Wall Decor',
          style: 'Modern',
          tags: ['mirror', 'round', 'gold', 'elegant'],
          price: 9500,
          createdBy: user._id
        },
        {
          title: 'Woven Wall Hanging',
          description: 'Handcrafted woven wall hanging in earth tones. Bohemian texture for bedrooms and living rooms.',
          imageUrl: '/images/decor1.jpg',
          room: 'Bedroom',
          category: 'Wall Decor',
          style: 'Boho',
          tags: ['woven', 'handmade', 'bohemian', 'earth tones'],
          price: 3200,
          createdBy: user._id
        },

        // --- SOFAS (batch 2) ---
        {
          title: 'Charcoal Grey Fabric Sofa',
          description: 'Boxy 3-seater sofa in charcoal grey boucle-style fabric with tapered wooden legs. Pairs easily with a mix of cushions.',
          imageUrl: '/images/sofa-modern-1.jpg',
          room: 'Living Room',
          category: 'Sofa',
          style: 'Modern',
          tags: ['grey', 'fabric', 'wooden legs', '3-seater'],
          price: 52000,
          createdBy: user._id
        },
        {
          title: 'Curved Boucle Sectional',
          description: 'Low, curved sectional sofa in taupe boucle with round bolster cushions. A soft, sculptural centrepiece for a lounge corner.',
          imageUrl: '/images/sofa5.jpg',
          room: 'Living Room',
          category: 'Sofa',
          style: 'Modern',
          tags: ['sectional', 'boucle', 'curved', 'lounge'],
          price: 68000,
          createdBy: user._id
        },
        {
          title: 'Arched Nook Sectional Sofa',
          description: 'Cream L-shaped sectional set beneath a glowing arch niche, with a round ottoman and layered coffee tables.',
          imageUrl: '/images/livingroom.jpg',
          room: 'Living Room',
          category: 'Sofa',
          style: 'Minimal',
          tags: ['sectional', 'cream', 'arch', 'ottoman'],
          price: 58000,
          createdBy: user._id
        },

        // --- CHAIRS (batch 2) ---
        {
          title: 'Minimalist Oak Dining Chair',
          description: 'Scandinavian-style dining chair in solid oak with a curved backrest. Light, simple, and built to last.',
          imageUrl: '/images/chair-minimal-1.jpg',
          room: 'Dining',
          category: 'Chair',
          style: 'Scandinavian',
          tags: ['oak', 'dining chair', 'minimal', 'wood'],
          price: 9500,
          createdBy: user._id
        },

        // --- TABLES (batch 2) ---
        {
          title: 'Curved Blush Coffee Table',
          description: 'Sculptural round coffee table in a soft blush finish, with a cut-out base for a lighter visual footprint.',
          imageUrl: '/images/coffeetable2.jpg',
          room: 'Living Room',
          category: 'Table',
          style: 'Modern',
          tags: ['coffee table', 'round', 'blush', 'sculptural'],
          price: 14500,
          createdBy: user._id
        },
        {
          title: 'Cream Leather Nightstand',
          description: 'Rounded two-drawer nightstand in cream leather-look finish. Soft edges suit a calm bedroom palette.',
          imageUrl: '/images/sidetable1.jpg',
          room: 'Bedroom',
          category: 'Table',
          style: 'Minimal',
          tags: ['nightstand', 'cream', 'rounded', 'drawers'],
          price: 8200,
          createdBy: user._id
        },
        {
          title: 'Rounded Two-Drawer Nightstand',
          description: 'Compact bedside table with wooden knobs and tapered legs. Simple storage that fits tight bedroom corners.',
          imageUrl: '/images/sidetable2.jpg',
          room: 'Bedroom',
          category: 'Table',
          style: 'Scandinavian',
          tags: ['nightstand', 'wood legs', 'compact', 'bedside'],
          price: 7600,
          createdBy: user._id
        },
        {
          title: 'Open-Shelf Wood Nightstand',
          description: 'Bedside table with open display shelves and two drawers, in warm oak and white. Great for books and everyday items.',
          imageUrl: '/images/sidetable3.jpg',
          room: 'Bedroom',
          category: 'Table',
          style: 'Scandinavian',
          tags: ['nightstand', 'open shelf', 'oak', 'storage'],
          price: 6800,
          createdBy: user._id
        },
        {
          title: 'Glass-Top Dining Table Set',
          description: 'Rectangular glass-top dining table on a solid oak trestle base, shown with eight upholstered cream chairs.',
          imageUrl: '/images/foodtable2.jpg',
          room: 'Dining',
          category: 'Table',
          style: 'Modern',
          tags: ['glass top', 'dining set', 'oak base', '8-seater'],
          price: 45000,
          createdBy: user._id
        },
        {
          title: 'Oval Wood Dining Table',
          description: 'Oval dining table on a fluted pedestal base, paired with curved wooden-armed chairs beneath a globe chandelier.',
          imageUrl: '/images/diningroom.jpg',
          room: 'Dining',
          category: 'Table',
          style: 'Modern',
          tags: ['oval', 'dining table', 'pedestal', 'wood'],
          price: 38000,
          createdBy: user._id
        },

        // --- LIGHTING (batch 2) ---
        {
          title: 'Ivory Carved Chandelier',
          description: 'Ornate eight-arm chandelier in a carved ivory finish with candle-style bulbs. A classic statement piece for a dining room.',
          imageUrl: '/images/chandler.jpg',
          room: 'Dining',
          category: 'Lighting',
          style: 'Classic',
          tags: ['chandelier', 'carved', 'ivory', 'statement'],
          price: 22000,
          createdBy: user._id
        },
        {
          title: 'Ribbed Ceramic Table Lamp',
          description: 'Fluted ceramic lamp base in matte white with a linen drum shade. Warm, soft lighting for a side table.',
          imageUrl: '/images/lamp4.jpg',
          room: 'Living Room',
          category: 'Lighting',
          style: 'Minimal',
          tags: ['table lamp', 'ceramic', 'ribbed', 'linen shade'],
          price: 4200,
          createdBy: user._id
        },
        {
          title: 'Lotus Petal Table Lamp',
          description: 'Decorative table lamp with a layered lotus-flower shade and a bronze leaf base. A soft focal point for a nightstand.',
          imageUrl: '/images/lamp5.jpg',
          room: 'Bedroom',
          category: 'Lighting',
          style: 'Boho',
          tags: ['table lamp', 'decorative', 'lotus', 'bronze'],
          price: 5600,
          createdBy: user._id
        },
        {
          title: 'Arched Brass Floor Lamp',
          description: 'Tall arched floor lamp in brushed brass with a cone shade, ideal for reading beside a sofa or armchair.',
          imageUrl: '/images/floorlamp2.jpg',
          room: 'Living Room',
          category: 'Lighting',
          style: 'Modern',
          tags: ['floor lamp', 'brass', 'arched', 'reading light'],
          price: 8900,
          createdBy: user._id
        },

        // --- STORAGE (batch 2) ---
        {
          title: 'Curved TV Console',
          description: 'Low, rounded media console in matte cream with brass handles. Space for a soundbar and closed storage either side.',
          imageUrl: '/images/tvunit1.jpg',
          room: 'Living Room',
          category: 'Storage',
          style: 'Modern',
          tags: ['tv console', 'media unit', 'cream', 'brass handles'],
          price: 32000,
          createdBy: user._id
        },
        {
          title: 'Open Wall-Mounted Clothing Rail',
          description: 'Simple wooden rail mounted to the wall for an open, boutique-style wardrobe display.',
          imageUrl: '/images/wardrobe2.jpg',
          room: 'Bedroom',
          category: 'Storage',
          style: 'Minimal',
          tags: ['clothing rail', 'open wardrobe', 'wood', 'wall-mounted'],
          price: 6500,
          createdBy: user._id
        },
        {
          title: 'Built-In Wardrobe with Desk Nook',
          description: 'Floor-to-ceiling white wardrobe with a fitted desk and shelving nook — a full storage wall for a bedroom or study.',
          imageUrl: '/images/wardrobe3.jpg',
          room: 'Study',
          category: 'Storage',
          style: 'Minimal',
          tags: ['built-in wardrobe', 'desk nook', 'white', 'study'],
          price: 55000,
          createdBy: user._id
        },
        {
          title: 'Minimalist Kitchen Cabinetry',
          description: 'Handleless kitchen cabinetry in warm taupe with a marble backsplash and built-in oven column.',
          imageUrl: '/images/cabinets2.jpg',
          room: 'Kitchen',
          category: 'Storage',
          style: 'Modern',
          tags: ['kitchen cabinets', 'taupe', 'marble', 'built-in oven'],
          price: 78000,
          createdBy: user._id
        },
        {
          title: 'White Built-In Bookshelf',
          description: 'Floor-to-ceiling white bookshelf styled with books and dried flower stems. Fits neatly into a study or reading nook.',
          imageUrl: '/images/bookshelf2.jpg',
          room: 'Study',
          category: 'Storage',
          style: 'Minimal',
          tags: ['bookshelf', 'built-in', 'white', 'study'],
          price: 16500,
          createdBy: user._id
        },
        {
          title: 'Marble Kitchen Backsplash Set',
          description: 'Full kitchen run with veined marble backsplash, integrated cooktop, and soft-close cabinetry in warm greige.',
          imageUrl: '/images/kitchen.jpg',
          room: 'Kitchen',
          category: 'Storage',
          style: 'Modern',
          tags: ['kitchen', 'marble backsplash', 'cabinetry', 'greige'],
          price: 145000,
          createdBy: user._id
        },

        // --- WALL DECOR (batch 2) ---
        {
          title: 'Pampas Grass & Candle Set',
          description: 'Dried pampas grass in a curved ceramic vase, styled with a scented candle and bubble candle holder.',
          imageUrl: '/images/decor2.jpg',
          room: 'Living Room',
          category: 'Wall Decor',
          style: 'Boho',
          tags: ['pampas grass', 'candle', 'vase', 'dried flowers'],
          price: 2400,
          createdBy: user._id
        },
        {
          title: 'Trio Ceramic Bud Vases',
          description: 'Set of three matte white donut-shaped bud vases in varying sizes, styled with dried baby\u2019s breath.',
          imageUrl: '/images/decor3.jpg',
          room: 'Bedroom',
          category: 'Wall Decor',
          style: 'Minimal',
          tags: ['vase set', 'ceramic', 'dried flowers', 'nightstand'],
          price: 1800,
          createdBy: user._id
        },
        {
          title: 'Organic Asymmetric Wall Mirror',
          description: 'Frameless mirror with a soft, organic asymmetric outline. A quietly sculptural alternative to a round mirror.',
          imageUrl: '/images/mirror2.jpg',
          room: 'Living Room',
          category: 'Wall Decor',
          style: 'Boho',
          tags: ['mirror', 'asymmetric', 'frameless', 'organic'],
          price: 11000,
          createdBy: user._id
        },
        {
          title: 'Framed Desert Art Duo',
          description: 'Two framed abstract prints — a desert-toned landscape and an arch motif — leaned together for an easy gallery look.',
          imageUrl: '/images/wallart2.jpg',
          room: 'Living Room',
          category: 'Wall Decor',
          style: 'Boho',
          tags: ['art prints', 'framed', 'desert tones', 'gallery'],
          price: 5200,
          createdBy: user._id
        },
        {
          title: 'Arc Pattern Textured Rug',
          description: 'Cream area rug with a carved arc pattern underfoot. Adds texture to a living room without adding colour.',
          imageUrl: '/images/rug1.jpg',
          room: 'Living Room',
          category: 'Wall Decor',
          style: 'Minimal',
          tags: ['rug', 'textured', 'cream', 'arc pattern'],
          price: 13500,
          createdBy: user._id
        },
        {
          title: 'Abstract Swirl Area Rug',
          description: 'Ivory and beige area rug with an abstract swirl motif outlined in charcoal. Anchors a living room seating area.',
          imageUrl: '/images/rug2.jpg',
          room: 'Living Room',
          category: 'Wall Decor',
          style: 'Minimal',
          tags: ['rug', 'abstract', 'ivory', 'living room'],
          price: 15800,
          createdBy: user._id
        },
        {
          title: 'Light Cream Curtains',
          description: 'Eyelet curtains in a soft chenille-textured cream, hung on a brushed steel rod. A lighter-weight window treatment.',
          imageUrl: '/images/curtains1.jpg',
          room: 'Living Room',
          category: 'Wall Decor',
          style: 'Minimal',
          tags: ['curtains', 'light', 'cream', 'eyelet'],
          price: 4200,
          createdBy: user._id
        },
        {
          title: 'Heavy Tan Curtains with Sheers',
          description: 'Floor-length tan curtains layered over sheer inner panels, tied back with tasselled cord. A fuller, more formal drape.',
          imageUrl: '/images/curtains2.jpg',
          room: 'Bedroom',
          category: 'Wall Decor',
          style: 'Modern',
          tags: ['curtains', 'heavy', 'tan', 'sheer'],
          price: 6800,
          createdBy: user._id
        },

        // --- BED (batch 2) ---
        {
          title: 'Channel-Tufted Upholstered Bed',
          description: 'King-size bed with a tall channel-tufted headboard in cream upholstery, styled beneath a ring chandelier.',
          imageUrl: '/images/bedroom.jpg',
          room: 'Bedroom',
          category: 'Bed',
          style: 'Modern',
          tags: ['upholstered bed', 'tufted headboard', 'king size', 'cream'],
          price: 72000,
          createdBy: user._id
        },

        // --- BATHROOM ---
        {
          title: 'Floating Stone Vanity Set',
          description: 'Wall-mounted oak vanity with a vessel sink and backlit storage niches, set against travertine-look tiling.',
          imageUrl: '/images/bathroom.jpg',
          room: 'Bathroom',
          category: 'Storage',
          style: 'Modern',
          tags: ['vanity', 'floating', 'vessel sink', 'bathroom'],
          price: 42000,
          createdBy: user._id
        },
        {
          title: 'Classic Cream TV Console',
          description: 'Long cream TV console with an oak top, four drawers, and an open shelf for books and decor.',
          imageUrl: '/images/tvunit2.jpg',
          room: 'Living Room',
          category: 'Storage',
          style: 'Classic',
          tags: ['tv console', 'cream', 'oak top', 'drawers'],
          price: 28000,
          createdBy: user._id
        }
      ];

      return Pin.insertMany(samplePins);
    })
    .then(function(pins) {
      console.log('Created ' + pins.length + ' sample pins');

      // ============================================================
      // CREATE SAMPLE BOARDS
      // ============================================================

      return User.findOne({}).then(function(user) {
        // Sort pins into board categories
        var livingRoomPins = [];
        var bedroomPins = [];
        var studyPins = [];
        var diningPins = [];

        for (var i = 0; i < pins.length; i++) {
          if (pins[i].room === 'Living Room' && livingRoomPins.length < 6) {
            livingRoomPins.push(pins[i]._id);
          }
          if (pins[i].room === 'Bedroom' && bedroomPins.length < 5) {
            bedroomPins.push(pins[i]._id);
          }
          if (pins[i].room === 'Study' && studyPins.length < 3) {
            studyPins.push(pins[i]._id);
          }
          if (pins[i].room === 'Dining' && diningPins.length < 3) {
            diningPins.push(pins[i]._id);
          }
        }

        var sampleBoards = [
          {
            name: 'Living Room Ideas',
            description: 'Inspiration for a cozy and modern living room',
            pins: livingRoomPins,
            createdBy: user._id
          },
          {
            name: 'Bedroom Inspiration',
            description: 'Creating the perfect relaxing bedroom space',
            pins: bedroomPins,
            createdBy: user._id
          },
          {
            name: 'Study Setup',
            description: 'Productive and stylish study room ideas',
            pins: studyPins,
            createdBy: user._id
          },
          {
            name: 'Dining Room Decor',
            description: 'Beautiful dining spaces for family meals',
            pins: diningPins,
            createdBy: user._id
          }
        ];

        return Board.insertMany(sampleBoards).then(function(boards) {
          console.log('Created ' + boards.length + ' sample boards');
          return { user: user, pins: pins };
        });
      });
    });
}