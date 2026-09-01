import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing all Bhajans from Bhajan section as requested...');

  // 1. Remove all bhajans from the database
  await prisma.bhajan.deleteMany();

  // 2. Ensure 18 Authors remain seeded in the Authors section
  const authorsData = [
    { name: 'Ghusaram Bapu', gujaratiName: 'ઘુસારામ બાપુ', slug: 'ghusaram-bapu', profileImage: '/shyamjibapa.jpg', shortBio: 'પવિત્ર સંતવાણી કવિ અને અનહદ સાધનાના મહાન સંત.', tags: 'સંતવાણી, અગમ વાણી, સદ્ગુરુ ભક્તિ', featured: true },
    { name: 'Shyamjibapa', gujaratiName: 'શામજીબાપા', slug: 'shyamjibapa', profileImage: '/shyamjibapa.jpg', shortBio: 'શ્યામ સત્સંગ મંડળના પ્રેરણાસ્રોત અને પરમ સદ્ગુરુ.', tags: 'સત્સંગ, મંગલાચરણ, હરિ ભક્તિ', featured: true },
    { name: 'Kabir Saheb', gujaratiName: 'કબીર સાહેબ', slug: 'kabir-saheb', profileImage: '/shyamjibapa.jpg', shortBio: 'નિર્ગુણ ભક્તિ શાખાના અમર સંત કવિ અને આત્મબોધક.', tags: 'કબીર વાણી, નિર્ગુણ, આત્મજ્ઞાન', featured: true },
    { name: 'Ravi Saheb', gujaratiName: 'રવિ સાહેબ', slug: 'ravi-saheb', profileImage: '/shyamjibapa.jpg', shortBio: 'અનુભવ વાણી અને સૂરતા યોગના સંત કવિયીવર.', tags: 'અનુભવ વાણી, સૂરતા યોગ, બ્રહ્મરસ', featured: true },
    { name: 'Meram Saheb', gujaratiName: 'મેરામ સાહેબ', slug: 'meram-saheb', profileImage: '/shyamjibapa.jpg', shortBio: 'સૂક્ષ્મ વેદ અને સત્સંગ પદોના રહસ્યવાદી સંત કવિ.', tags: 'સૂક્ષ્મ વેદ, સત્ત ગુરુ, અનહદ નાદ', featured: true },
    { name: 'Satar Saheb', gujaratiName: 'સતાર સાહેબ', slug: 'satar-saheb', profileImage: '/shyamjibapa.jpg', shortBio: 'વૈરાગ્ય, દિલડાની વાત અને સદ્ગુરુ સેવાના સંત પદકાર.', tags: 'વૈરાગ્ય, દિલડા ની વાત, સક્ષમ સેવા', featured: true },
    { name: 'Trambak Saheb', gujaratiName: 'ત્રંબક સાહેબ', slug: 'trambak-saheb', profileImage: '/shyamjibapa.jpg', shortBio: 'અગમ નિગમ વાણી અને શ્યામ સ્મરણના સંત કવિ.', tags: 'અગમ નિગમ, નાદ બિંદુ, રામ સ્મરણ', featured: false },
    { name: 'Amar Saheb', gujaratiName: 'અમર સાહેબ', slug: 'amar-saheb', profileImage: '/shyamjibapa.jpg', shortBio: 'અમર વાણી અને અખંડ આનંદના મહાન અનુભવી સંત.', tags: 'અમર વાણી, અખંડ આનંદ, સદ્ગુરુ સેવા', featured: true },
    { name: 'Prem Saheb', gujaratiName: 'પ્રેમ સાહેબ', slug: 'prem-saheb', profileImage: '/shyamjibapa.jpg', shortBio: 'પ્રેમ લક્ષણા ભક્તિ અને સદ્ગુરુ વાણીના કવિ.', tags: 'પ્રેમ ભક્તિ, રસીલા નયન, સંતવાણી', featured: false },
    { name: 'Morar Saheb', gujaratiName: 'મોરાર સાહેબ', slug: 'morar-saheb', profileImage: '/shyamjibapa.jpg', shortBio: 'સદ્ગુરુ મહોત્સવ અને આત્મજ્ઞાન પદોના સંત.', tags: 'આત્મજ્ઞાન, હરિ સંત, અચરજ નજર', featured: true },
    { name: 'Bhan Saheb', gujaratiName: 'ભાણ સાહેબ', slug: 'bhan-saheb', profileImage: '/shyamjibapa.jpg', shortBio: 'ગુરુ શરણાગતિ અને સુરતા શબ્દના સંત કવિ.', tags: 'સુરતા શબ્દ, ગુરુ શરણાઈ, સત્તકર્મ', featured: false },
    { name: 'Trikam Saheb', gujaratiName: 'ત્રિકમ સાહેબ', slug: 'trikam-saheb', profileImage: '/shyamjibapa.jpg', shortBio: 'નિજ ભક્તિ અને શૂન્ય મંડળ વાણીના સાધક સંત.', tags: 'નિજ ભક્તિ, શૂન્ય મંડળ, અલખ જોગી', featured: false },
    { name: 'Laxmi Saheb', gujaratiName: 'લક્ષ્મી સાહેબ', slug: 'laxmi-saheb', profileImage: '/shyamjibapa.jpg', shortBio: 'આનંદ લીલા અને પવિત્ર સદ્ગુરુ પદોના રચયિતા.', tags: 'આનંદ લીલા, દિવ્ય પ્રકાસ, શબ્દ સુણ', featured: false },
    { name: 'Labhu Dada', gujaratiName: 'લાભૂ દાદા', slug: 'labhu-dada', profileImage: '/shyamjibapa.jpg', shortBio: 'સંતવાણી, જીવદયા અને ગહન આત્મબોધ પદોના અનુભવી કવિ.', tags: 'જીવદયા, આત્મબોધ, સંતવાણી', featured: true },
    { name: 'Ugaram Bapa', gujaratiName: 'ઉગારામ બાપા', slug: 'ugaram-bapa', profileImage: '/shyamjibapa.jpg', shortBio: 'નિર્ભય નામ અને અખંડ ઝાલર વાણીના પરમ સાધક.', tags: 'નિર્ભય નામ, અખંડ ઝાલર, બ્રહ્મજ્ઞાન', featured: false },
    { name: 'Narsinh Mehta', gujaratiName: 'નરસિંહ મહેતા', slug: 'narsinh-mehta', profileImage: '/shyamjibapa.jpg', shortBio: 'આદિ કવિ, વૈષ્ણવ જન પદકાર અને હરિભક્ત પિરોમણિ.', tags: 'વૈષ્ણવ જન, પ્રભાતિયા, કૃષ્ણ ભક્તિ', featured: true },
    { name: 'Mirabai', gujaratiName: 'મીરાંબાઈ', slug: 'mirabai', profileImage: '/shyamjibapa.jpg', shortBio: 'કૃષ્ણ ભક્તિની અમર ગોપી અને પ્રેમાસ્પદ સંત કવિયીત્રી.', tags: 'ગિરધર નાગર, પાયોજી મેને, રામ રતન', featured: true },
    { name: 'Sant Dasa Savo', gujaratiName: 'સંત દાસ સવો', slug: 'sant-dasa-savo', profileImage: '/shyamjibapa.jpg', shortBio: 'પ્રાચીન સંતવાણી કવિ અને આત્મ ચેતનાના સાધક.', tags: 'સંતવાણી, ચેતાવણી, નિજ નુર', featured: true }
  ];

  for (const a of authorsData) {
    await prisma.author.upsert({
      where: { slug: a.slug },
      update: a,
      create: a,
    });
  }

  console.log('Successfully cleared all Bhajans from database!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
