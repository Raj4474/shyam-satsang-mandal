import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing database and seeding clean blog-style Biography content...');

  // 1. Clean all existing tables
  await prisma.bhajan.deleteMany();
  await prisma.dhun.deleteMany();
  await prisma.author.deleteMany();
  await prisma.biographySection.deleteMany();
  await prisma.mediaItem.deleteMany();
  await prisma.siteSetting.deleteMany();

  // 2. Seed Authors
  const shyamjibapa = await prisma.author.create({
    data: {
      name: 'Shyamjibapa',
      gujaratiName: 'શામજીબાપા',
      slug: 'shyamjibapa',
      profileImage: '/shyamjibapa.jpg',
      shortBio: 'શ્યામ સત્સંગ મંડળના પ્રેરણાસ્રોત અને પરમ સદ્ગુરુ.',
      birthInfo: 'ગુજરાત',
      tags: 'સત્સંગ, મંગલાચરણ, હરિ ભક્તિ',
      featured: true,
    },
  });

  const dasaSavo = await prisma.author.create({
    data: {
      name: 'Sant Dasa Savo',
      gujaratiName: 'સંત દાસ સવો',
      slug: 'sant-dasa-savo',
      profileImage: '/shyamjibapa.jpg',
      shortBio: 'પ્રાચીન સંતવાણી કવિ અને આત્મ ચેતનાના સાધક.',
      birthInfo: 'ગુજરાત',
      tags: 'સંતવાણી, ચેતાવણી, નિજ નુર',
      featured: true,
    },
  });

  const ghasurama = await prisma.author.create({
    data: {
      name: 'Bapu Ghasurama Jasarama',
      gujaratiName: 'બાપુ ઘસુારામ - જસારામ',
      slug: 'bapu-ghasurama-jasarama',
      profileImage: '/shyamjibapa.jpg',
      shortBio: 'યોગમાર્ગ, પિંડ-બ્રહ્માંડ અને નિજ અનુભવ પદોના ક્રાંતિકારી કવિ.',
      birthInfo: 'ગુજરાત',
      tags: 'યોગ સાધના, બ્રહ્મજ્ઞાન, સુરતા નુરતા',
      featured: true,
    },
  });

  const kabir = await prisma.author.create({
    data: {
      name: 'Sant Kabir',
      gujaratiName: 'સંત કબીર સાહેબ',
      slug: 'sant-kabir',
      profileImage: '/shyamjibapa.jpg',
      shortBio: 'નિર્ગુણ ભક્તિ શાખાના અમર સંત કવિ અને સમાજ બોધક.',
      birthInfo: 'કાશી, વારાણસી',
      tags: 'કબીર વાણી, નિર્ગુણ, આત્મજ્ઞાન',
      featured: true,
    },
  });

  const raviram = await prisma.author.create({
    data: {
      name: 'Mahatma Raviram Ravidas',
      gujaratiName: 'મહાત્મા રવિરામ - રવિદાસ',
      slug: 'mahatma-raviram-ravidas',
      profileImage: '/shyamjibapa.jpg',
      shortBio: 'સંતવાણી અને અનુભવ વાણીના મહાન કવિયત સંત.',
      birthInfo: 'ગુજરાત',
      tags: 'અનુભવ વાણી, સૂરતા યોગ, બ્રહ્મરસ',
      featured: true,
    },
  });

  const satar = await prisma.author.create({
    data: {
      name: 'Sant Satar',
      gujaratiName: 'સંત સતાર સાહેબ',
      slug: 'sant-satar',
      profileImage: '/shyamjibapa.jpg',
      shortBio: 'વૈરાગ્ય, દિલડાની વાત અને સદ્ગુરુ સેવાના સંત પદકાર.',
      birthInfo: 'ગુજરાત',
      tags: 'વૈરાગ્ય, દિલડા ની વાત, સક્ષમ સેવા',
      featured: true,
    },
  });

  const kaviRamesh = await prisma.author.create({
    data: {
      name: 'Kavi Ramesh',
      gujaratiName: 'કવિ રમેશ',
      slug: 'kavi-ramesh',
      profileImage: '/shyamjibapa.jpg',
      shortBio: 'ગુરુ શરણાગતિ અને શ્યામ ધણી પદોના ભક્ત કવિ.',
      birthInfo: 'ગુજરાત',
      tags: 'ગુરુ શરણાગતિ, શ્યામ ધણી, સંતવાણી',
      featured: true,
    },
  });

  const meram = await prisma.author.create({
    data: {
      name: 'Meram Saheb',
      gujaratiName: 'મેરામ સાહેબ',
      slug: 'meram-saheb',
      profileImage: '/shyamjibapa.jpg',
      shortBio: 'સૂક્ષ્મ વેદ અને સત્સંગ પદોના રહસ્યવાદી સંત કવિ.',
      birthInfo: 'ગુજરાત',
      tags: 'સૂક્ષ્મ વેદ, સત્ત ગુરુ, અનહદ નાદ',
      featured: false,
    },
  });

  // 3. Bhajans (Empty array - removed as requested)
  const rawBhajans: any[] = [];

  // 4. Dhuns
  await prisma.dhun.createMany({
    data: [
      {
        title: '1. આવો આવો સદ્ગુરુ શ્યામ (કેવી બતાવી એણે વાતડી રે)',
        slug: 'aavo-aavo-sadguru-shyam',
        authorId: kaviRamesh.id,
        description: 'કવિ રમેશ રચિત પવિત્ર સદ્ગુરુ શ્યામ ધૂન.',
        lyrics: `આવો.. આવો અગમનિગમની ગુરુજી વાતું બતાવો
ગુરુની વાત તો નરાની રે પાર છે
આવો.. આવો નરાની પાર ઈ તો એનું સ્વરૂપ છે
કેવી બતાવી એણે વાતડી રે...

આવો.. આવો ગુણથી ભરેલી એની ગુણીયલ વાણી
ગુરુ મારા ગુણનાં ભંડાર છે
આવો આવો ભક્તિ, મુક્તિ ને જ્ઞાનનાં દાતા
કેવી બતાવી એણે વાતડી રે...

આવો.. આવો સદ્ગુરુ શ્યામ મારા દિલમાં
બાળક અમે તારા લેજો સંભાળી
આવો આવો રમેશ બોલે ગુરુની ને વાણી
કેવી બતાવી એણે વાતડી રે...`,
        audioUrl: null,
        coverImage: '/shyamjibapa.jpg',
        featured: true,
        status: 'PUBLISHED',
      },
    ],
  });

  // 5. Seed Clean Blog-Style Biography Chapters for "શામજીબાપા જીવન ચરિત્ર"
  await prisma.biographySection.createMany({
    data: [
      {
        title: 'પ્રકરણ ૧: પ્રાકટ્ય અને દિવ્ય બાલ્યાવસ્થા',
        slug: 'prakatya-ane-balyavastha',
        type: 'TEXT',
        sortOrder: 1,
        content: `પૂજ્ય શામજીબાપાનો જન્મ ગુજરાતના પવિત્ર અને સંસ્કારધામ ભૂમિ પર થયો હતો. બાળપણથી જ તેમનામાં સામાન્ય બાળકોથી જુદા જ દિવ્ય સંસ્કારો, કરુણા અને સત્ય પ્રતિનો અગાધ પ્રેમ જોવા મળતો હતો.

નાની વયે જ તેઓ ઈશ્વરીય ભક્તિ અને સંતવાણીના સાંભળવાના શોખીન હતા. ગામમાં કે આસપાસ થતા સત્સંગ અને ભજન મંડળોમાં તેઓ પ્રથમ હરોળમાં બેસી અખંડ એકાગ્રતાથી સુરતા અને સંતવાણીનું શ્રવણ કરતા.

તેમના બાળજીવનનું પ્રમુખ લક્ષણ એ હતું કે તેઓ હંમેશાં સચ્ચાઈ, નમ્રતા અને જીવદયાનો માર્ગ અપનાવતા. કોઈ પણ દુઃખી કે પીડિત જીવને જોઈને તેમનું હૃદય દ્રવી ઉઠતું. બાલ્યાવસ્થાના આ સંસ્કારો જ આગળ જતાં તેમના મહાન સાધુતા અને સદ્ગુરુ પદનો પાયો બન્યા.`,
        mediaUrl: '/shyamjibapa.jpg',
        published: true,
      },
      {
        title: 'પ્રકરણ ૨: સદ્ગુરુ શરણાગતિ અને ગહન સાધના કાળ',
        slug: 'sadguru-sharanagati-ane-sadhana',
        type: 'TEXT',
        sortOrder: 2,
        content: `આત્મજ્ઞાન અને અગમનિગમના ગૂઢ ભેદને સમજવા માટે શામજીબાપાએ સદ્ગુરુ ચરણોમાં સંપૂર્ણ શરણાગતિ સ્વીકારી. ગુરુદેવના મુખેથી નીકળેલા બ્રહ્મવચનોને તેમણે પોતાના શ્વાસોશ્વાસમાં વણી લીધા.

તેમણે નિર્ગુણ ભક્તિ, સોહમ સાધના, સુરતા-નૂરતા યોગ અને અનુભવ વાણીનો ગહન અભ્યાસ કર્યો. રાત-દિન પ્રભુ સ્મરણ અને ધ્યાન સાધનામાં મગ્ન રહીને તેમણે પોતાના મન અને વિષય-વાસનાઓ પર અદ્ભુત વિજય મેળવ્યો.

સદ્ગુરુની કૃપાથી તેમને 'નિરાધારનો આધાર' એવા પરમ ચેતન આત્માનું સાક્ષાત્ દર્શન થયું. ગુરુમુખી વાણી અને અનુભવ વાણીના રસપાનથી તેમનું અંતઃકરણ સદા માટે અખંડ આનંદથી છલકાઈ ગયું.`,
        published: true,
      },
      {
        title: 'પ્રકરણ ૩: શ્યામ સત્સંગ મંડળની સ્થાપના અને સંતવાણી પ્રચાર',
        slug: 'satsang-mandal-sthapna',
        type: 'TEXT',
        sortOrder: 3,
        content: `સાધનાના ઉત્કૃષ્ટ શિખરે પહોંચ્યા બાદ પૂજ્ય શામજીબાપાએ સમાજના કલ્યાણ અર્થે અને સંતવાણીના પવિત્ર વિચારો ઘર-ઘર સુધી પહોંચાડવા માટે "શ્યામ સત્સંગ મંડળ"ની સ્થાપના કરી.

મંડળ દ્વારા તેમણે અજ્ઞાન, કુરિવાજો, વહેમ અને અહંકાર દૂર કરીને લોકોને સાચી હરિભક્તિ અને પવિત્ર જીવન જીવવાનો દિવ્ય માર્ગ બતાવ્યો. બાપુના સત્સંગમાં પ્રાચીન મહાન સંતો જેવાં કે સંત કબીર સાહેબ, સંત દાસ સવો, બાપુ ઘસુારામ - જસારામ અને મહાત્મા રવિરામના ભજનોનું પવિત્ર વિવેચન કરવામાં આવતું.

ગામડે-ગામડે અને નગરોમાં સત્સંગ મંડળો દ્વારા લાખો મુમુક્ષુ આત્માઓને સદ્ગુરુ શરણાઈ અને હરિરસનો લાભ મળ્યો. શામજીબાપાએ ક્યારેય પણ જ્ઞાતિ-જાતિ કે ઊંચ-નીચના ભેદભાવ રાખ્યા નથી; તેમના દરબારમાં દરેક ભક્ત માટે પ્રેમનો અખંડ કટોરો ખુલ્લો રહેતો.`,
        published: true,
      },
      {
        title: 'પ્રકરણ ૪: દિવ્ય ઉપદેશ અને જીવનમૂલ્યો',
        slug: 'divya-upadesh-ane-jivanmaruda',
        type: 'TEXT',
        sortOrder: 4,
        content: `પૂજ્ય શામજીબાપાના મુખ્ય ઉપદેશો નીચે મુજબના અમૂલ્ય સિદ્ધાંતો પર આધારિત છે:

૧. આત્મ ઓળખાણ: "બહાર ગોતે કદીયે નહીં મળે, જેને ગોતે તે તું પોતે - પોતાના અંતરમાં સ્થિત રામ તત્વને ઓળખો."
૨. સત્સંગ અને હરિનામ: "શ્વાસે શ્વાસે સત્તશબ્દનું સ્મરણ કરો. મનુષ્ય અવતાર વારંવાર મળતો નથી, તેને વિષય વાસનામાં વેડફશો નહીં."
૩. દયા અને જનસેવા: "દરેક પ્રાણીમાત્ર પર દયા રાખો. સાચી પૂજા એ દુઃખીયાના આંસુ લૂછવા અને નિર્દોષ સેવા કરવી એ જ છે."
૪. ગુરુ શરણાગતિ: "સદ્ગુરુ વિના જ્ઞાન મિથ્યા છે. સદ્ગુરુના ચરણોમાં અહંકાર સમર્પિત કરવાથી જ ભવસાગર પાર કરી શકાય છે."`,
        published: true,
      },
      {
        title: 'પ્રકરણ ૫: અવિનાશી વારસો અને અમર સંદેશ',
        slug: 'avinashi-varaso-ane-amar-sandesh',
        type: 'TEXT',
        sortOrder: 5,
        content: `પૂજ્ય શામજીબાપાનું ભૌતિક જીવન ભલે સમય જતાં પૂરું થયું હોય, પણ તેમનો દિવ્ય વારસો, તેમના સત્સંગ બોધ અને તેમની પ્રેરણા આજે પણ લાખો ભક્તોના હૃદયમાં અખંડ જ્યોતની જેમ ઝળહળે છે.

શ્યામ સત્સંગ મંડળ દ્વારા આજે પણ તેમની પવિત્ર વાણી, સંતવાણી ડિજિટલ સંગ્રહાલય અને સત્સંગના માધ્યમથી નવી પેઢી સુધી પહોંચાડવામાં આવી રહી છે.

બાપાનો અમર સંદેશ સદા ગુજતો રહેશે:
"સત્યના માર્ગે ચાલો, ગુરુવચનમાં વિશ્વાસ રાખો અને પ્રભુ ભક્તિમાં મન પરોવો — એ જ માનવ જીવનનું સાચું કલ્યાણ છે."`,
        published: true,
      },
    ],
  });

  // 6. Seed Homepage Settings
  await prisma.siteSetting.createMany({
    data: [
      {
        key: 'heroTitle',
        value: 'ભજન, ધૂન અને આધ્યાત્મિક વારસાનું ડિજિટલ સંગ્રહાલય',
      },
      {
        key: 'heroSubtitle',
        value: 'સંતવાણી, ભક્તિ અને જીવનમૂલ્યોને આગામી પેઢી સુધી પહોંચાડવાનો એક પ્રયાસ.',
      },
    ],
  });

  console.log('Seeding completed successfully with clean Blog-style Biography chapters!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
