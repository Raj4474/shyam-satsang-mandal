import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Bhajans and Authors...');

  // 1. Ensure Authors exist
  const authorsData = [
  {
    "name": "Akha Bhagat",
    "gujaratiName": "અખા ભગત",
    "slug": "akha-bhagat",
    "profileImage": "/authors/akha-bhagat.jpg",
    "shortBio": "અખા ભગત (અખો) - જ્ઞાનમાર્ગી, છપ્પા કવિ અને બ્રહ્મજ્ઞાન સંત સાહિત્યના આદિ શિરોમણી.",
    "tags": "અખા ભગત, અખો, છપ્પા, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Attar Shah",
    "gujaratiName": "અત્તાર શાહ",
    "slug": "attar-shah",
    "profileImage": "/default-avatar.png",
    "shortBio": "સંત અત્તાર શાહ (અત્તાર શાહ) - અગમ વાણી, અનુભવી જ્ઞાન અને ઈશ્ક-અનુભવના પદકાર.",
    "tags": "અત્તાર શાહ, સંત અત્તાર શાહ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Anvar",
    "gujaratiName": "અનવર",
    "slug": "anvar",
    "profileImage": "/default-avatar.png",
    "shortBio": "સંત અનવર - અનુભવી નિર્ગુણ ભક્ત અને સુફી-સંત કવિ.",
    "tags": "અનવર, સંત અનવર, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Anya Santo",
    "gujaratiName": "અન્ય સંતો",
    "slug": "anya-santo",
    "profileImage": "/default-avatar.png",
    "shortBio": "અન્ય સંતો - વિવિધ મહાન સંતો, પદકારો અને ભક્તિ કવિઓની અમર વાણી તથા સંતવાણી પદો.",
    "tags": "અન્ય સંતો, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Amar Saheb",
    "gujaratiName": "અમર સાહેબ",
    "slug": "amar-saheb",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "અમર વાણી અને અખંડ આનંદના મહાન અનુભવી સંત.",
    "tags": "અમર વાણી, અખંડ આનંદ, સદ્ગુરુ સેવા",
    "featured": true
  },
  {
    "name": "Arjan Bhagat",
    "gujaratiName": "અરજણ ભગત",
    "slug": "arjan-bhagat",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "અરજણ ભગત (દાસ અરજણ) - અનુભવ વાણી અને સદ્ગુરુ કુંવરજી પરંપરાના સંત કવિ.",
    "tags": "અરજણ ભગત, દાસ અરજણ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Ukram Bhagat",
    "gujaratiName": "ઉકરામ ભગત",
    "slug": "ukram-bhagat",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "ઉકરામ ભગત (ઉગારામ બાપા) - અગમ નિગમ અને સંતવાણી પદોના પરમ અનુભવી કવિ.",
    "tags": "ઉકરામ ભગત, ઉગારામ બાપા, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Ugaram Bapa",
    "gujaratiName": "ઉગારામ બાપા",
    "slug": "ugaram-bapa",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "નિર્ભય નામ અને અખંડ ઝાલર વાણીના પરમ સાધક.",
    "tags": "નિર્ભય નામ, અખંડ ઝાલર, બ્રહ્મજ્ઞાન",
    "featured": true
  },
  {
    "name": "Rishi Markandi",
    "gujaratiName": "ઋષિ મારકંડી",
    "slug": "rishi-markandi",
    "profileImage": "/default-avatar.png",
    "shortBio": "ઋષિ મારકંડી (ઋષિ મારકંડ) - પૌરાણિક ચિરંજીવી ઋષિ અને શિવ-મહામંત્રના દ્રષ્ટા કવિ.",
    "tags": "ઋષિ મારકંડી, ઋષિ મારકંડ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Rishi Raj",
    "gujaratiName": "ઋષિ રાજ",
    "slug": "rishi-raj",
    "profileImage": "/default-avatar.png",
    "shortBio": "ઋષિ રાજ (ઋષિરાજ) - અનુભવી સંતવાણી કવિ અને આત્મબોધક ઉપદેશક.",
    "tags": "ઋષિ રાજ, ઋષિરાજ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Kapad Chand",
    "gujaratiName": "કપાડ ચંદ",
    "slug": "kapad-chand",
    "profileImage": "/default-avatar.png",
    "shortBio": "સંત કપાડ ચંદ - અનુભવી સંત અને નિર્ગુણ પદકાર.",
    "tags": "કપાડ ચંદ, સંત કપાડ ચંદ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Kabir Saheb",
    "gujaratiName": "કબીર સાહેબ",
    "slug": "kabir-saheb",
    "profileImage": "/authors/kabir-saheb.jpg",
    "shortBio": "નિર્ગુણ ભક્તિ શાખાના અમર સંત કવિ અને આત્મબોધક.",
    "tags": "કબીર વાણી, નિર્ગુણ, આત્મજ્ઞાન",
    "featured": true
  },
  {
    "name": "Kamal",
    "gujaratiName": "કમાલ",
    "slug": "kamal",
    "profileImage": "/default-avatar.png",
    "shortBio": "સંત કમાલ (કમાલ કબીર કા બાલક) - સંત કબીર સાહેબના સુપુત્ર અને અનુભવી નિર્ગુણ સંત કવિ.",
    "tags": "કમાલ, સંત કમાલ, કબીર, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Karak",
    "gujaratiName": "કરક",
    "slug": "karak",
    "profileImage": "/default-avatar.png",
    "shortBio": "સંત કરક (કરક સાહેબ) - અનુભવી નિર્ગુણ ભક્ત અને પ્રેમલક્ષણા સંત કવિ.",
    "tags": "કરક, સંત કરક, કરક સાહેબ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Kashi",
    "gujaratiName": "કાશી",
    "slug": "kashi",
    "profileImage": "/default-avatar.png",
    "shortBio": "સંત કાશી (કાશીજી) - અનુભવી પ્રેમલક્ષણા સંત કવિ અને પદકાર.",
    "tags": "કાશી, સંત કાશી, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Keshav Das",
    "gujaratiName": "કેશવ દાસ",
    "slug": "keshav-das",
    "profileImage": "/default-avatar.png",
    "shortBio": "કેશવ દાસ (કેશવ હરિ) - સમર્થ સંત કવિ જેમણે પ્રભુ શરણાગતિ, પાટ આરાધના અને ગુરુ મહિમાના અમર ભજનો રચ્યા.",
    "tags": "કેશવ દાસ, કેશવ હરિ, પાટ આરાધના, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Khara Bhagat",
    "gujaratiName": "ખારા ભગત",
    "slug": "khara-bhagat",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "ખારા ભગત - અનહદ અનુભવ વાણી અને પ્રાચીન વૈરાગ્ય પદોના સંત કવિ.",
    "tags": "ખારા ભગત, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Khim Saheb",
    "gujaratiName": "ખીમ સાહેબ",
    "slug": "khim-saheb",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "સૂક્ષ્મ વેદ, સત્ત શબ્દ અને અગમ રહેણીના અનુભવી સંત પદકાર.",
    "tags": "સૂક્ષ્મ વેદ, અગમ વાણી, સૂરતા શબ્દ",
    "featured": true
  },
  {
    "name": "Ganga Das",
    "gujaratiName": "ગંગા દાસ",
    "slug": "ganga-das",
    "profileImage": "/shyamjibapa.jpg",
    "shortBio": "ગંગા દાસ (રામદાસ ચરણાનુરાગી) - અગમ નિગમ અને સંતવાણી પદોના પરમ અનુભવી કવિ.",
    "tags": "ગંગા દાસ, ગંગાદાસ, રામદાસ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Ganga Sati",
    "gujaratiName": "ગંગા સતી",
    "slug": "ganga-sati",
    "profileImage": "/authors/ganga-sati.jpg",
    "shortBio": "ગંગાસતી - સૌરાષ્ટ્રના પરમ યોગિની અને મહાન સંત કવિયત્રી જેમણે પાનબાઈને ૫૨ પદોમાં ઉપદેશ આપ્યો.",
    "tags": "ગંગાસતી, પાનબાઈ, સંતવાણી, મેરૂ તો ડગે",
    "featured": true
  },
  {
    "name": "Ganpat Maharaj",
    "gujaratiName": "ગણપત મહારાજ",
    "slug": "ganpat-maharaj",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "ગણપત મહારાજ (ગણપત રામ) - અનુભવ વાણી, સદ્ગુરુ મહિમા અને સંતવાણી પદોના પરમ સાધક કવિ.",
    "tags": "ગણપત મહારાજ, ગણપત રામ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Garib Das",
    "gujaratiName": "ગરીબ દાસ",
    "slug": "garib-das",
    "profileImage": "/default-avatar.png",
    "shortBio": "ગરીબ દાસ - અગમ નિગમ અને સંતવાણી પદોના પરમ અનુભવી કવિ.",
    "tags": "ગરીબ દાસ, દાસ ગરીબ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Guru Nanak",
    "gujaratiName": "ગુરુ નાનક",
    "slug": "guru-nanak",
    "profileImage": "/default-avatar.png",
    "shortBio": "શ્રી ગુરુ નાનક દેવજી - સિખ ધર્મના પ્રથમ સદ્ગુરુ, મહાન અમર સંત કવિ અને નિર્ગુણ બ્રહ્મભક્તિના પરમ ઉપદેશક.",
    "tags": "ગુરુ નાનક, ગુરૂ નાનક, સિદ્ધવાણી, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Gebi Nath",
    "gujaratiName": "ગેબી નાથ",
    "slug": "gebi-nath",
    "profileImage": "/default-avatar.png",
    "shortBio": "ગેબી નાથ - સિદ્ધ નાથ પંથી સંત કવિ જેમણે ગુરુ ભક્તિ, અગમ વાણી અને આત્મ સાધનાના પદો રચ્યા.",
    "tags": "ગેબી નાથ, નાથ સંપ્રદાય, અગમ વાણી, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Godad Bhagat",
    "gujaratiName": "ગોદડ ભગત",
    "slug": "godad-bhagat",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "ગોદડ ભગત - ગહન આત્મજ્ઞાન અને અનુભવ વાણીના પ્રાચીન સંત કવિ.",
    "tags": "ગોદડ ભગત, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Gorakh Nath",
    "gujaratiName": "ગોરખ નાથ",
    "slug": "gorakh-nath",
    "profileImage": "/default-avatar.png",
    "shortBio": "શ્રી ગુરુ ગોરખનાથ - હઠયોગ, નાથ સંપ્રદાય અને અમર આત્મવાણીના પ્રણેતા પરમ સિદ્ધ મહાયોગી.",
    "tags": "ગોરખ નાથ, નાથ સંપ્રદાય, હઠયોગ, અગમ વાણી, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Ghusaram Bapu",
    "gujaratiName": "ઘુસારામ બાપુ",
    "slug": "ghusaram-bapu",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "પવિત્ર સંતવાણી કવિ અને અનહદ સાધનાના મહાન સંત.",
    "tags": "સંતવાણી, અગમ વાણી, સદ્ગુરુ ભક્તિ",
    "featured": true
  },
  {
    "name": "Jan Chotam",
    "gujaratiName": "જન છોટમ",
    "slug": "jan-chotam",
    "profileImage": "/default-avatar.png",
    "shortBio": "કવિ છોટમ (જન છોટમ) - ગુજરાતના મહાન વેદાંતિ અને જ્ઞાનમાર્ગી સંત કવિ.",
    "tags": "જન છોટમ, છોટમ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Jivan Bhagat",
    "gujaratiName": "જીવણ ભગત",
    "slug": "jivan-bhagat",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "જીવણ ભગત (દાસી જીવણ) - ૧૮મી સદીના સૌરાષ્ટ્રના મહાન અનુભવી રામસનેહી અને સંત કવિ જેમણે ગુરુ ભીમ સાહેબના પ્રતાપે અમર ભજનોની રચના કરી.",
    "tags": "જીવણ ભગત, દાસી જીવણ, ભીમ સાહેબ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Jethi Ram",
    "gujaratiName": "જેઠી રામ",
    "slug": "jethi-ram",
    "profileImage": "/default-avatar.png",
    "shortBio": "જેઠી રામ - અગમ નિગમ અને સંતવાણી પદોના પરમ અનુભવી કવિ.",
    "tags": "જેઠી રામ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Dungar Puri",
    "gujaratiName": "ડુંગર પૂરી",
    "slug": "dungar-puri",
    "profileImage": "/default-avatar.png",
    "shortBio": "ડુંગર પૂરી (ડુંગરપુરી) - અનુભવી સંતવાણી કવિ અને પરમ આત્મબોધક પદકાર.",
    "tags": "ડુંગર પૂરી, ડુંગરપુરી, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Tilak Das",
    "gujaratiName": "તિલક દાસ",
    "slug": "tilak-das",
    "profileImage": "/default-avatar.png",
    "shortBio": "તિલક દાસ - સમર્થ સંત કવિ જેમણે આત્મસાક્ષાત્કાર અને હરિ નામ સ્મરણના અમર ભજનો રચ્યા.",
    "tags": "તિલક દાસ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Tulsi Das",
    "gujaratiName": "તુલસી દાસ",
    "slug": "tulsi-das",
    "profileImage": "/default-avatar.png",
    "shortBio": "તુલસી દાસ - પરમ રામભક્ત અને પવિત્ર સંતવાણી પદોના રચયિતા.",
    "tags": "તુલસી દાસ, તુલસીદાસ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Telvo",
    "gujaratiName": "તેલવો",
    "slug": "telvo",
    "profileImage": "/default-avatar.png",
    "shortBio": "સંત ગુરુ તેલવો (તેલવો) - અનુભવી સંતકવિ અને ગુરુવાણીના પદકાર.",
    "tags": "તેલવો, સંત તેલવો, ગુરૂ તેલવો, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Toral Pari Rukhadiyo",
    "gujaratiName": "તોરલ પરી રૂખડિયો",
    "slug": "toral-pari-rukhadiyo",
    "profileImage": "/default-avatar.png",
    "shortBio": "તોરલ પરી રૂખડિયો - અનુભવી સંતવાણી કવિ અને પરમ દિવ્ય પદકાર.",
    "tags": "તોરલ પરી રૂખડિયો, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Sati Toral",
    "gujaratiName": "તોરલ બાઈ",
    "slug": "toral-bai",
    "profileImage": "/authors/toral-bai.jpg",
    "shortBio": "સતી તોરલ બાઈ - કચ્છ-સૌરાષ્ટ્રના અમર સંત કવિયત્રી જેમણે જેસલ જાડેજાને અધર્મમાંથી તારીને ભક્તિમાર્ગે વાળ્યા.",
    "tags": "સતી તોરલ, જેસલ તોરલ, સંતવાણી, પાટ પૂજા",
    "featured": true
  },
  {
    "name": "Trambak Saheb",
    "gujaratiName": "ત્રંબક સાહેબ",
    "slug": "trambak-saheb",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "અગમ નિગમ વાણી અને શ્યામ સ્મરણના સંત કવિ.",
    "tags": "અગમ નિગમ, નાદ બિંદુ, રામ સ્મરણ",
    "featured": true
  },
  {
    "name": "Trikam Saheb",
    "gujaratiName": "ત્રિકમ સાહેબ",
    "slug": "trikam-saheb",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "નિજ ભક્તિ અને શૂન્ય મંડળ વાણીના સાધક સંત.",
    "tags": "નિજ ભક્તિ, શૂન્ય મંડળ, અલખ જોગી",
    "featured": true
  },
  {
    "name": "Dada Mekaran",
    "gujaratiName": "દાદા મેકરાણ",
    "slug": "dada-mekaran",
    "profileImage": "/default-avatar.png",
    "shortBio": "સંત દાદા મેકરાણ કાપડી - કચ્છના અમર મહાત્મા અને જ્ઞાન-વૈરાગ્ય, લોકસેવા તથા સંતવાણીના દિવ્ય સાધક કવિ.",
    "tags": "દાદા મેકરાણ, મેકરણ કાપડી, કચ્છ સંતવાણી, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Dayanand",
    "gujaratiName": "દાસ દયાનંદ",
    "slug": "dayanand",
    "profileImage": "/default-avatar.png",
    "shortBio": "દાસ દયાનંદ (સ્વામી દયાનંદ) - અગમ નિગમ, સોહમ સાધના અને પરમ અનુભવી સંત કવિ જેમણે જ્ઞાન-વૈરાગ્ય અને સદ્ગુરુ બોધના અમર પદો આપ્યા.",
    "tags": "દાસ દયાનંદ, દયા નંદ, બ્રહ્માનંદ વચન, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Hothi",
    "gujaratiName": "દાસ હોથી",
    "slug": "hothi",
    "profileImage": "/default-avatar.png",
    "shortBio": "દાસ હોથી - ગુરુ મોરાર સાહેબના પરમ શિષ્ય, સંત કવિ અને અનુભવ વાણીના મહાન પદકાર.",
    "tags": "હોથી, દાસ હોથી, મોરાર સાહેબ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Dina Bhagat",
    "gujaratiName": "દિના ભગત",
    "slug": "dina-bhagat",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "દિના ભગત - શ્વાસ જ્ઞાન અને સંતવાણી પદોના અનુભવી સંત કવિ.",
    "tags": "દિના ભગત, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Dedal",
    "gujaratiName": "દેદલ",
    "slug": "dedal",
    "profileImage": "/default-avatar.png",
    "shortBio": "સંત દાસ દેદલ (દેદલ) - અનુભવી નિર્ગુણ કવિ અને સંત પદકાર.",
    "tags": "દેદલ, દાસ દેદલ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Devayat Pandit",
    "gujaratiName": "દેવાયત પંડિત",
    "slug": "devayat",
    "profileImage": "/default-avatar.png",
    "shortBio": "દેવાયત પંડિત (દેવાયત પીર) - સૌરાષ્ટ્રના મહાન અગમવાણી વચનકાર સંત અને કળિયુગ-સતયુગ એંધાણ વાણીના પરમ જ્ઞાની પદકાર.",
    "tags": "દેવાયત, દેવાયત પંડિત, દેવાયત પીર, અગમ વાણી, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Dhana Bhagat",
    "gujaratiName": "ધના ભગત",
    "slug": "dhana-bhagat",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "ધના ભગત - ગુર્જર સંત સાહિત્યના અમર સંત કવિ અને રામબાણ પદના રચયિતા.",
    "tags": "ધના ભગત, સંતવાણી, ભજન, રામબાણ",
    "featured": true
  },
  {
    "name": "Dharam Gir",
    "gujaratiName": "ધરમ ગીર",
    "slug": "dharam-gir",
    "profileImage": "/default-avatar.png",
    "shortBio": "સંત ધરમ ગીર (ધરમગીર) - સંત સુરતા-વિવાહ અને નિર્ગુણ વાણીના અનુભવી કવિ.",
    "tags": "ધરમ ગીર, ધરમગીર, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Dhira Bhagat",
    "gujaratiName": "ધીરા ભગત",
    "slug": "dhira-bhagat",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "ધીરા ભગત (ધીરો) - ૧૮મી સદીના મધ્ય ગુજરાતના સમર્થ કવિ અને સંત જેમણે કાફીઓ અને ચાબખા દ્વારા સામાજિક તથા આધ્યાત્મિક જાગૃતિ ફેલાવી.",
    "tags": "ધીરા ભગત, ધીરો, કાફી, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Nathu Ram",
    "gujaratiName": "નથુ રામ",
    "slug": "nathu-ram",
    "profileImage": "/default-avatar.png",
    "shortBio": "નથુ રામ - અગમ નિગમ અને સંતવાણી પદોના પરમ અનુભવી કવિ.",
    "tags": "નથુ રામ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Narbhe Ram",
    "gujaratiName": "નરભે રામ",
    "slug": "narbhe-ram",
    "profileImage": "/default-avatar.png",
    "shortBio": "નરભે રામ (નરભો) - અગમ નિગમ અને સંતવાણી પદોના પરમ અનુભવી કવિ.",
    "tags": "નરભે રામ, નરભો, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Narsinh Mehta",
    "gujaratiName": "નરસિંહ મહેતા",
    "slug": "narsinh-mehta",
    "profileImage": "/authors/narsinh-mehta.jpg",
    "shortBio": "આદિ કવિ, વૈષ્ણવ જન પદકાર અને હરિભક્ત પિરોમણિ.",
    "tags": "વૈષ્ણવ જન, પ્રભાતિયા, કૃષ્ણ ભક્તિ",
    "featured": true
  },
  {
    "name": "Nazir Bhagat",
    "gujaratiName": "નાઝીર ભગત",
    "slug": "nazir-bhagat",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "નાઝીર ભગત - આધ્યાત્મિક અને સંતવાણી પદોના ભાવુક કવિ.",
    "tags": "નાઝીર ભગત, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Naran Das",
    "gujaratiName": "નારણ દાસ",
    "slug": "naran-das",
    "profileImage": "/default-avatar.png",
    "shortBio": "નારણ દાસ - અનુભવી સંત કવિ જેમણે પ્રભુ કૃપા અને ગુરુ બોધના પદો રચેલા છે.",
    "tags": "નારણ દાસ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Nirant Maharaj",
    "gujaratiName": "નિરાંત મહારાજ",
    "slug": "nirant-maharaj",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "નિરાંત મહારાજ - અનુભવ વાણી, આત્મજ્ઞાન અને નિર્મોહી પરંપરાના મહાન સંત કવિ.",
    "tags": "નિરાંત મહારાજ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Nishkulanand Swami",
    "gujaratiName": "નિષ્કુળાનંદ સ્વામી",
    "slug": "nishkulanand",
    "profileImage": "/default-avatar.png",
    "shortBio": "નિષ્કુળાનંદ સ્વામી - સ્વામિનારાયણ સંપ્રદાયના મહાન વૈરાગ્યમૂર્તિ સંત, કવિ અને પુરુષોત્તમ પ્રકાશ, વૈરાગ્યહૃદય જેવા અમર ગ્રંથોના રચયિતા.",
    "tags": "નિષ્કુળાનંદ સ્વામી, નિષ્કુળા નંદ, વૈરાગ્ય, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Padam Puri",
    "gujaratiName": "પદમ પૂરી",
    "slug": "padam-puri",
    "profileImage": "/default-avatar.png",
    "shortBio": "પદમ પૂરી (પદમપુરી) - અનુભવી સંતવાણી કવિ અને પરમ આત્મબોધક પદકાર.",
    "tags": "પદમ પૂરી, પદમપુરી, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Pitha Das",
    "gujaratiName": "પીઠા દાસ",
    "slug": "pitha-das",
    "profileImage": "/default-avatar.png",
    "shortBio": "પીઠા દાસ - અગમ નિગમ અને સંતવાણી પદોના પરમ અનુભવી કવિ.",
    "tags": "પીઠા દાસ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Purshottam Das",
    "gujaratiName": "પુરષોત્તમ દાસ",
    "slug": "purshottam-das",
    "profileImage": "/shyamjibapa.jpg",
    "shortBio": "પુરષોત્તમ દાસ - અગમ નિગમ અને સંતવાણી પદોના પરમ અનુભવી કવિ.",
    "tags": "પુરષોત્તમ દાસ, પુરુષોત્તમ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Prahlada",
    "gujaratiName": "પ્રહલાદ",
    "slug": "prahlada",
    "profileImage": "/default-avatar.png",
    "shortBio": "ભક્ત શિરોમણી પ્રહલાદ (પ્રહલાદ ભગત) - શ્રદ્ધા અને આત્મસમર્પણના નિષ્કામ ભક્ત કવિ.",
    "tags": "પ્રહલાદ, ભક્ત પ્રહલાદ, પ્રહલાદ ભગત, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Pritam Das",
    "gujaratiName": "પ્રીતમ દાસ",
    "slug": "pritam-das",
    "profileImage": "/default-avatar.png",
    "shortBio": "પ્રીતમ દાસ (પ્રીતમજી) - સૌરાષ્ટ્ર અને ગુજરાતના પરમ જ્ઞાની અને પ્રેમલક્ષણા ભક્તિના મહાન અનુભવી સંત કવિ.",
    "tags": "પ્રીતમ દાસ, પ્રીતમ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Prem Saheb",
    "gujaratiName": "પ્રેમ સાહેબ",
    "slug": "prem-saheb",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "પ્રેમ લક્ષણા ભક્તિ અને સદ્ગુરુ વાણીના કવિ.",
    "tags": "પ્રેમ ભક્તિ, રસીલા નયન, સંતવાણી",
    "featured": true
  },
  {
    "name": "Premal Das",
    "gujaratiName": "પ્રેમળ દાસ",
    "slug": "premal-das",
    "profileImage": "/shyamjibapa.jpg",
    "shortBio": "પ્રેમળ દાસ - સંત કવિ જેમણે હરિ ભક્તિ અને શરણાગતિના ભજનોની રચના કરી.",
    "tags": "પ્રેમળ દાસ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Babu Bhai",
    "gujaratiName": "બાબુ ભાઈ",
    "slug": "babu-bhai",
    "profileImage": "/default-avatar.png",
    "shortBio": "બાબુભાઈ - પવિત્ર સંતવાણી કવિ અને સદ્ગુરુ શ્યામ સ્મરણના પરમ સંત સાધક.",
    "tags": "બાબુ ભાઈ, બાબુભાઈ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Brahmanand",
    "gujaratiName": "બ્રહ્માનંદ",
    "slug": "brahmanand",
    "profileImage": "/default-avatar.png",
    "shortBio": "સ્વામી બ્રહ્માનંદ - મહાન અનુભવી સંત કવિ, વૈરાગી અને આત્મજ્ઞાની જેમણે હિંદી તથા ગુજરાતી ભાષામાં અમર સંતવાણી પદો આપ્યા.",
    "tags": "બ્રહ્માનંદ, બ્રહ્મજ્ઞાન, વૈરાગ્ય, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Bhavani Das",
    "gujaratiName": "ભવાની દાસ",
    "slug": "bhavani-das",
    "profileImage": "/default-avatar.png",
    "shortBio": "ભવાની દાસ - સમર્થ અનુભવી સંત કવિ જેમણે ગુરુજ્ઞાન, આત્મ બોધ અને નિજ ધર્મના અમર પદોની રચના કરી.",
    "tags": "ભવાની દાસ, ગુરુ જ્ઞાન, નિજ ધર્મ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Bhakhar",
    "gujaratiName": "ભાખર",
    "slug": "bhakhar",
    "profileImage": "/default-avatar.png",
    "shortBio": "સંત ભાખર (ભાખર સ્વામી) - અનન્ય કૃષ્ણ ભક્તિ અને ગોપી ભાવના અમર સંત પદકાર.",
    "tags": "ભાખર, સંત ભાખર, કૃષ્ણ ભક્તિ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Bhan Saheb",
    "gujaratiName": "ભાણ સાહેબ",
    "slug": "bhan-saheb",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "ગુરુ શરણાગતિ અને સુરતા શબ્દના સંત કવિ.",
    "tags": "સુરતા શબ્દ, ગુરુ શરણાઈ, સત્તકર્મ",
    "featured": true
  },
  {
    "name": "Bhadur Das",
    "gujaratiName": "ભાદુર દાસ",
    "slug": "bhadur-das",
    "profileImage": "/shyamjibapa.jpg",
    "shortBio": "ભાદુર દાસ - ગુરુ રામદાસના શિષ્ય અને પરમ અનુભવી સંત કવિ જેમણે આત્મજ્ઞાન અને અનુભવ વાણીના અમર પદો આપ્યા.",
    "tags": "ભાદુર દાસ, રામદાસ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Bhairav Nath",
    "gujaratiName": "ભૈરવ નાથ",
    "slug": "bhairav-nath",
    "profileImage": "/default-avatar.png",
    "shortBio": "શ્રી ગુરુ ભૈરવ નાથ - નાથ સંપ્રદાયના સિદ્ધ સંત કવિ જેમણે પરમ આત્મબોધ, યોગ સાધના અને ગુરુ મહિમાના ભજનોની રચના કરી.",
    "tags": "ભૈરવ નાથ, નાથ સંપ્રદાય, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Bhoja Bhagat",
    "gujaratiName": "ભોજા ભગત",
    "slug": "bhoja-bhagat",
    "profileImage": "/authors/bhoja-bhagat.jpg",
    "shortBio": "ભોજા ભગત - ૧૮મી-૧૯મી સદીના સૌરાષ્ટ્રના મહાન સંત અને જ્ઞાનમાર્ગી કવિ જેમણે પોતાના પ્રખ્યાત ચાબખા અને ભજનો દ્વારા સામાજિક કુરિવાજો, દંભ અને માયા પર માર્મિક પ્રહાર કર્યો.",
    "tags": "ભોજા ભગત, ચાબખા, સંતવાણી, ભજન, આત્મબોધ",
    "featured": true
  },
  {
    "name": "Mangal Das",
    "gujaratiName": "મંગળ દાસ",
    "slug": "mangal-das",
    "profileImage": "/default-avatar.png",
    "shortBio": "મંગળ દાસ - મહાન સંત કવિ જેમણે ગુરુ મહિમા અને અધ્યાત્મ ભક્તિના ભજનોની રચના કરી.",
    "tags": "મંગળ દાસ, ગુરુ મહિમા, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Mansur",
    "gujaratiName": "મંસૂર",
    "slug": "mansur",
    "profileImage": "/default-avatar.png",
    "shortBio": "મંસૂર અલ્-હલ્લાજ (સંત મંસૂર) - 'અનાલ હક્' (હું જ બ્રહ્મ છું) નું ઉચ્ચારણ કરનાર મહાન પ્રેમલક્ષણા અને પરમહંસ સુફી સાધક.",
    "tags": "મંસૂર, સંત મંસૂર, અનાલ હક, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Madhav Das",
    "gujaratiName": "માધવ દાસ",
    "slug": "madhav-das",
    "profileImage": "/default-avatar.png",
    "shortBio": "માધવ દાસ - પરમ ભક્ત અને અનુભવી સંત કવિ જેમણે હરિ નામ સ્મરણ અને ગુરુ બોધના પદો આપ્યા.",
    "tags": "માધવ દાસ, રામ નામ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Mamad",
    "gujaratiName": "મામદ",
    "slug": "mamad",
    "profileImage": "/default-avatar.png",
    "shortBio": "સંત મામદ સાહેબ (મામદ શાહ) - જ્ઞાનમાર્ગી, અનુભવી અને નૂર-અનુભવ સંત કવિ.",
    "tags": "મામદ, સંત મામદ, મામદ શાહ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Mirabai",
    "gujaratiName": "મીરાંબાઈ",
    "slug": "mirabai",
    "profileImage": "/authors/mirabai.jpg",
    "shortBio": "કૃષ્ણ ભક્તિની અમર ગોપી અને પ્રેમાસ્પદ સંત કવિયીત્રી.",
    "tags": "ગિરધર નાગર, પાયોજી મેને, રામ રતન",
    "featured": true
  },
  {
    "name": "Mool Das",
    "gujaratiName": "મૂળ દાસ",
    "slug": "mool-das",
    "profileImage": "/default-avatar.png",
    "shortBio": "મૂળ દાસ (મૂળદાસ) - અગમ નિગમ અને સંતવાણી પદોના પરમ અનુભવી કવિ.",
    "tags": "મૂળ દાસ, મૂળદાસ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Meram Saheb",
    "gujaratiName": "મેરામ સાહેબ",
    "slug": "meram-saheb",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "સૂક્ષ્મ વેદ અને સત્સંગ પદોના રહસ્યવાદી સંત કવિ.",
    "tags": "સૂક્ષ્મ વેદ, સત્ત ગુરુ, અનહદ નાદ",
    "featured": true
  },
  {
    "name": "Morar Saheb",
    "gujaratiName": "મોરાર સાહેબ",
    "slug": "morar-saheb",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "સદ્ગુરુ મહોત્સવ અને આત્મજ્ઞાન પદોના સંત.",
    "tags": "આત્મજ્ઞાન, હરિ સંત, અચરજ નજર",
    "featured": true
  },
  {
    "name": "Mohan Das",
    "gujaratiName": "મોહન દાસ",
    "slug": "mohan-das",
    "profileImage": "/shyamjibapa.jpg",
    "shortBio": "મોહન દાસ (દાસ મોહન) - અગમ નિગમ અને કૃષ્ણ પ્રેમ લક્ષણા ભક્તિના સંત કવિ.",
    "tags": "મોહન દાસ, દાસ મોહન, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Ramesh",
    "gujaratiName": "રમેશ",
    "slug": "ramesh",
    "profileImage": "/default-avatar.png",
    "shortBio": "રમેશ - પરમ અનુભવી સંત કવિ અને સદ્ગુરુ શ્યામ સ્મરણના ભાવાનુરાગી સાધક પદકાર.",
    "tags": "રમેશ, સદ્ગુરુ શ્યામ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Ravi Saheb",
    "gujaratiName": "રવિ સાહેબ",
    "slug": "ravi-saheb",
    "profileImage": "/authors/ravi-saheb.jpg",
    "shortBio": "અનુભવ વાણી અને સૂરતા યોગના સંત કવિયીવર.",
    "tags": "અનુભવ વાણી, સૂરતા યોગ, બ્રહ્મરસ",
    "featured": true
  },
  {
    "name": "Ramdev Pir",
    "gujaratiName": "રામદેવ પીર",
    "slug": "ramdev-pir",
    "profileImage": "/default-avatar.png",
    "shortBio": "બાબા રામદેવ પીર (રામોપીર) - કળિયુગના અવતારી પુરુષ, નિજાર ધર્મના પ્રવર્તક અને પંચપીર.",
    "tags": "રામદેવ પીર, રામોપીર, બાબા રામદેવ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Sati Rupade",
    "gujaratiName": "રૂપાદે",
    "slug": "rupade",
    "profileImage": "/authors/default-sati.jpg",
    "shortBio": "રાણી રૂપાદે - માલદેવજીના સતી પત્ની અને ગુરુ નિજ ધર્મ વચનના સાધક સંત કવિયત્રી.",
    "tags": "સતી રૂપાદે, સંતવાણી, ગુરુ પ્રતાપ",
    "featured": true
  },
  {
    "name": "Laxmi Saheb",
    "gujaratiName": "લક્ષ્મી સાહેબ",
    "slug": "laxmi-saheb",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "આનંદ લીલા અને પવિત્ર સદ્ગુરુ પદોના રચયિતા.",
    "tags": "આનંદ લીલા, દિવ્ય પ્રકાસ, શબ્દ સુણ",
    "featured": true
  },
  {
    "name": "Lakhmo Mali",
    "gujaratiName": "લખમો માળી",
    "slug": "lakhmo-mali",
    "profileImage": "/default-avatar.png",
    "shortBio": "લખમો માળી (લખમોજી / લખમા સ્વામી) - અનુભવી સંત કવિ, નિર્ગુણ સાધક અને આત્મ જ્ઞાની પદકાર.",
    "tags": "લખમો માળી, લખમોજી, લખમા, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Labhu Dada",
    "gujaratiName": "લાભૂ દાદા",
    "slug": "labhu-dada",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "સંતવાણી, જીવદયા અને ગહન આત્મબોધ પદોના અનુભવી કવિ.",
    "tags": "જીવદયા, આત્મબોધ, સંતવાણી",
    "featured": true
  },
  {
    "name": "Lal Das",
    "gujaratiName": "લાલ દાસ",
    "slug": "lal-das",
    "profileImage": "/default-avatar.png",
    "shortBio": "લાલ દાસ - અગમ નિગમ અને સંતવાણી પદોના પરમ અનુભવી કવિ.",
    "tags": "લાલ દાસ, લાલદાસ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Lilan Bai",
    "gujaratiName": "લીલણ બાઈ",
    "slug": "lilan-bai",
    "profileImage": "/authors/default-sati.jpg",
    "shortBio": "પવિત્ર સંતવાણી કવિયત્રી અને સૂરતા પ્રેમ સાધિકા.",
    "tags": "સંતવાણી, અમર વેલડી, સંત ચરણ",
    "featured": true
  },
  {
    "name": "Loyan Bai",
    "gujaratiName": "લોયણ બાઈ",
    "slug": "loyan-bai",
    "profileImage": "/authors/default-sati.jpg",
    "shortBio": "શ્રી સેલરશીજી મહારાજશ્રીના શિષ્યા અને લાખા ફુલાણીને બોધ આપનાર પરમ સિદ્ધ સતી કવિયત્રી.",
    "tags": "સતી લોયણ, સંતવાણી, લાખો ફુલાણી, નિજ બોધ",
    "featured": true
  },
  {
    "name": "Visram Bhagat",
    "gujaratiName": "વિસરામ ભગત",
    "slug": "visram-bhagat",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "વિસરામ ભગત - અનહદ અનુભવ જ્ઞાન અને સૂરતા શબ્દ પદોના સંત કવિ.",
    "tags": "વિસરામ ભગત, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Shankar Das",
    "gujaratiName": "શંકર દાસ",
    "slug": "shankar-das",
    "profileImage": "/default-avatar.png",
    "shortBio": "શંકર દાસ - અગમ નિગમ અને સંતવાણી પદોના પરમ અનુભવી કવિ.",
    "tags": "શંકર દાસ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Shambhu Ram",
    "gujaratiName": "શંભુ રામ",
    "slug": "shambhu-ram",
    "profileImage": "/default-avatar.png",
    "shortBio": "શંભુ રામ - અગમ નિગમ અને સંતવાણી પદોના પરમ અનુભવી કવિ.",
    "tags": "શંભુ રામ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Sharvan Kapadi",
    "gujaratiName": "શરવણ કાપડી",
    "slug": "sharvan-kapadi",
    "profileImage": "/default-avatar.png",
    "shortBio": "સંત શરવણ કાપડી - આગમ એંધાણ અને નિર્ગુણ વાણીના અનુભવી કવિ.",
    "tags": "શરવણ કાપડી, સંત શરવણ, કાપડી, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Shyamjibapa",
    "gujaratiName": "શામજીબાપા",
    "slug": "shyamjibapa",
    "profileImage": "/authors/shyamjibapa.jpg",
    "shortBio": "શ્યામ સત્સંગ મંડળના પ્રેરણાસ્રોત અને પરમ સદ્ગુરુ.",
    "tags": "સત્સંગ, મંગલાચરણ, હરિ ભક્તિ",
    "featured": true
  },
  {
    "name": "Shiv Lal",
    "gujaratiName": "શિવ લાલ",
    "slug": "shiv-lal",
    "profileImage": "/default-avatar.png",
    "shortBio": "સંત શિવ લાલ (શિવલાલ) - જ્ઞાનમાર્ગી, અનુભવી કવિ અને સંત સાધક.",
    "tags": "શિવ લાલ, શિવલાલ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Satar Saheb",
    "gujaratiName": "સતાર સાહેબ",
    "slug": "satar-saheb",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "વૈરાગ્ય, દિલડાની વાત અને સદ્ગુરુ સેવાના સંત પદકાર.",
    "tags": "વૈરાગ્ય, દિલડા ની વાત, સક્ષમ સેવા",
    "featured": true
  },
  {
    "name": "Sant Dasa Savo",
    "gujaratiName": "સવા ભગત",
    "slug": "sant-dasa-savo",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "સવા ભગત (સંત દાસ સવો) - ગહન આત્મજ્ઞાન અને અનુભવ વાણીના મહાન અનુભવી કવિ.",
    "tags": "સવા ભગત, સંત દાસ સવો, સંતવાણી, આત્મજ્ઞાન",
    "featured": true
  },
  {
    "name": "Sahadev",
    "gujaratiName": "સહદેવ",
    "slug": "sahadev",
    "profileImage": "/default-avatar.png",
    "shortBio": "સહદેવ (સહદેવ જોષી) - પંચ પાંડવમાં સહદેવ જોષી, જેમણે કળિયુગના લક્ષણો અને આગમ વાણીની રચનાઓ કરી.",
    "tags": "સહદેવ, સહદેવ જોષી, આગમ વાણી, કળિયુગ, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Sukhram Bhagat",
    "gujaratiName": "સુખરામ ભગત",
    "slug": "sukhram-bhagat",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "સુખરામ ભગત - અનહદ અનુભવ વાણી અને નાદ બ્રહ્મ પદોના મહાન સંત કવિ.",
    "tags": "સુખરામ ભગત, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Sur Das",
    "gujaratiName": "સૂર દાસ",
    "slug": "sur-das",
    "profileImage": "/default-avatar.png",
    "shortBio": "સૂર દાસ - ૧૬મી સદીના મહાન કૃષ્ણ ભક્ત સંત કવિ જેમણે સૂરસાગર અને ભક્તિ પદોની અમર રચનાઓ કરી.",
    "tags": "સૂર દાસ, કૃષ્ણ ભક્તિ, સૂરસાગર, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Soham Das",
    "gujaratiName": "સોહમ દાસ",
    "slug": "soham-das",
    "profileImage": "/default-avatar.png",
    "shortBio": "સોહમ દાસ - પરમ અનુભવી સંત કવિ જેમણે ગુરુ જ્ઞાન, અદ્વૈત બોધ અને બ્રહ્મજ્ઞાનના પદો રચેલા છે.",
    "tags": "સોહમ દાસ, ગુરુ જ્ઞાન, અદ્વૈત, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Harji Bhati",
    "gujaratiName": "હરજી ભાઠી",
    "slug": "harji-bhati",
    "profileImage": "/authors/default-sant.jpg",
    "shortBio": "હરજી ભાઠી - રામદેવપીર પરંપરાના મહાન અનુભવી સંત કવિ.",
    "tags": "હરજી ભાઠી, રામદેવપીર, સંતવાણી, ભજન",
    "featured": true
  },
  {
    "name": "Hari Das",
    "gujaratiName": "હરી દાસ",
    "slug": "hari-das",
    "profileImage": "/default-avatar.png",
    "shortBio": "હરી દાસ - ગુરુ ભીમ સાહેબના શિષ્ય અને સમર્થ કવિ જેમણે આત્મજ્ઞાન અને હરિ ભક્તિના ભજનોની રચના કરી.",
    "tags": "હરી દાસ, સંત ભીમ, સંતવાણી, ભજન",
    "featured": true
  }
];

  const authorMap: Record<string, string> = {};
  for (const a of authorsData) {
    const upserted = await prisma.author.upsert({
      where: { slug: a.slug },
      update: a,
      create: a,
    });
    authorMap[a.slug] = upserted.id;
  }
  console.log('Successfully upserted authors.');

  // 2. Bhajans Data
  const rawBhajans = [
  {
    "title": "1. એક પંખી છે વસનારો",
    "slug": "1-ek-pankhi-che-vasnaro",
    "authorSlug": "ghusaram-bapu",
    "category": "ઘૂસારામ બાપુ",
    "sortOrder": 1,
    "lyrics": "એક પંખી છે વસનારો, એકવીશ બ્રહ્માંડ થી બારો,\nમૂરખ ની નજરૂથી ન્યારો, એક પંખી છે વસનારો………………..(ટેક)\n\nઅજ્ઞાનથી સાહેબ ન્યારો, જ્ઞાને થી એને ઓળખો \nઘડી પલમાં નવીન ઘડનારો, નુરતે સુરતે નીરખો……………….એક \n\nનિર્ગુણ સગુણ ને એક કરીને, હરિગુરૂ માં સુરતાને પહોંચાડો \nગગન ઘટમાં જુઓ વિચારી, શું બોલે બોલનહારો...................એક \n\nનામ ધરમ ને નીતી હશે, એ નર પાર પહોંચનારો \nઘટ ભીતરમાં જુઓ તપાસી, ખુલ્લો દશમો દ્વારો.....................એક\n\nજસારામ ચરણે બોલ્યા ઘુસારામ, આત્મા અનુભવ વિચારો \nવિવેકી નર તમે વિશ્વાસ રાખો,અનંત કળા છે અપારો…………...એક"
  },
  {
    "title": "2. હે જી નિજ સ્વરૂપ માં રહેજો",
    "slug": "2-he-ji-nij-swaroop-ma-rahejo",
    "authorSlug": "ghusaram-bapu",
    "category": "ઘૂસારામ બાપુ",
    "sortOrder": 2,
    "lyrics": "હે જી નિજ સ્વરૂપ માં રહેજો અખંડ આનંદ આણી રે \nએવી બ્રહ્મચક્ષુ થઈ દો જણી રે ............................................(ટેક)\n\nહે જી પોતે પોઢ્યા છે પરાગવડ ને પાંદડે રે,એવા પંખીડા વસે દોનુ પાસ રે \nએક શ્વાસ ને બીજો ઉશ્વાસ લેજો જાણી રે...............................એવી \n\nહે જી ચંદ્ર સૂરજ પ્રકાશતા ન્હોતા રે, એવા પારસમણી નાં પ્રકાશ હતા રે \nએને જાણે કોઈ ચતુર સુજાણી રે...........................................એવી \n\nહે જી પૃથ્વી જળ અગ્નિ વાયુ આકાશ રે , એવા આદિ પુરૂષ નાં થયા ઉપદેશા રે \nત્યારે પ્રકૃતિ પુરૂષ વરતાણી રે............................................એવી\n\nબાપુ જસારામ ચરણે બોલ્યા ઘુસારામ રે,ગુરૂજી નાં દેશમાં ન દેખ્યા રાતદિવસ રે \nએવી અમુલખ આકાશવાણી સમજાણી રે............................એવી"
  },
  {
    "title": "3. સત્તગુરૂ નો દેશ છે નિરધાર નિર્વાણ",
    "slug": "3-sattaguru-no-desh-che-nirdhar-nirvan",
    "authorSlug": "ghusaram-bapu",
    "category": "ઘૂસારામ બાપુ",
    "sortOrder": 3,
    "lyrics": "સત્તગુરૂ નો દેશ છે નિરધાર નિર્વાણ, સમજે કોઈ સંત સુજાણ..........(ટેક)\n\nશૂન રે મંડળની શેરીએ રાત દિન ચાલવું \nપાવ રે વિના પાંગળું, એ ઘરે પહોંચવું......................................સત્તગુરૂ\n\nસત્તગુરૂ ની ગાદી આગે વીણા ઝંતર બજાવું \nગગન મંડળમાં સુરતા રાખો, નુરત નિશાન સમજાવું..................સત્તગુરૂ\n\nઉન અખરાતીત આત્મા ઓળખાઈ બતાવુ\nસૂર્યે ઉગ્યો સોહમ પ્રકાશ, શાંતિ પરમ સ્થાને બતાઈ...................સત્તગુરૂ\n\nઓહમ સોહમ ની ઉપરે પરમ પુરૂષ કહાવે \nજસારામ ચરણે બોલ્યા ઘુસારામ, નુરતમેં સુરત મિલાવે.............સત્તગુરૂ"
  },
  {
    "title": "4. અંતર આત્માની ઓળખાણ નથી કરીને",
    "slug": "4-antar-aatmani-olkhan-nathi-karine",
    "authorSlug": "ghusaram-bapu",
    "category": "ઘૂસારામ બાપુ",
    "sortOrder": 4,
    "lyrics": "અંતર આત્માની ઓળખાણ નથી કરીને, અવિદ્યા વધી છે અનેરી\nઠરીને ઠેકાણે બેઠા નથીને, મોટપ વધી છે મનમાં ઘણેરી………….........................અંતર\n\nધ્રુવ પ્રહલાદ ને મીરાબાઈ, અવિનાશી ની છે કચેરી \nરાજપાટ છોડીને ઉદાસી ફરે, બંસરી ની લગાડી લહેરી.........................................અંતર\n\nરાજા ગોપીચંદ ગુરૂવચન સમજ્યા, પાછું વળીને જોવું ફરી\nદેશ દેશાવર ફરીને અવસ્થા પાંચમી, અમર કીર્તિ ને વરી....................................અંતર\n\nરામ રટણ કોઈ કરે નહીં, વાદ વિવાદનાં મોરચા કરે ખરેખરી \nવાદ વિવાદમાં કૌરવો ખૂબ કુટાણા, પાંડવો ગયા વનવાસ ફરી............................અંતર\n\nસત્તશબ્દ થી સમરણ થાય છે, શ્વાસે ઉશ્વાસે પીપાભગતે આત્મ ઓળખાણ કરી\nબાપુ જસારામ ચરણે બોલ્યા ઘુસારામ, જીવ ને ફેરો ન આવે ચોરાસી ફરી............અંતર"
  },
  {
    "title": "5. સત્તગુરૂ જયારે લગન લઈને આવ્યા",
    "slug": "5-sattaguru-jayare-lagan-laine-aavya",
    "authorSlug": "ghusaram-bapu",
    "category": "ઘૂસારામ બાપુ",
    "sortOrder": 5,
    "lyrics": "સત્તગુરૂ જયારે લગન લઈને આવ્યા, સુરતા સખીને મન ભાવ્યા\nપ્રેમ રતિ મોતીડે વધાવ્યા ને, પાપ ગયા પેલા ભવ તણા............................સત્તગુરૂ\n\nશબ્દ સ્વરૂપી ચાંદલો ચોડ્યો, નિર વરતી કન્યા સાથે વહેવાર જોડયો\nકાળ ક્રોધ સમાઈ ગયાને, વહેવાર જોડયો પ્રીતમ સે.....................................સત્તગુરૂ\n\nગગનમંડળમાં માંડવડો રચ્યો ને, પંચરંગી મનોહર રસીયો\nઅમિરસ દોરીએ દિલમાં દર્શાયો, દોર લાગ્યો સાચા તાર સાથે.......................સત્તગુરૂ\n\nઈ રે મંડપની શોભા ઘણી સારી, રતન જડાવ ઝરૂખાની બારી\nકોટી બ્રાહ્મણ લઇ જાય બલિહારી, જળહળ જ્યોતુ ઝળહળે.............................સત્તગુરૂ\n\nહરખ સહિત વર તોરણે આવ્યા ને, સુક્ષ્મણા સાસુ પોખવા આવ્યા \nઈંગલા પીંગલા નેવલી એ ચડાવ્યા, પોખણા પોખ્યા પ્રેમ સાથે.....................સત્તગુરૂ\n\nનિરવરતિ કન્યા ને ચોરી માં પધરાવીને, ઓહમ સોહમ હથેળી મિલાવી\nઓમકાર શબ્દ ની ધૂન મચાવી, ગડહડ વાજા ગડહડે...................................સત્તગુરૂ\n\nભજન કરીને હરિવર વરીયાને, આવાગમન નાં ફેરા ટળીયા\nકહે ઘુસારામ બાપુ જસારામ ચરણે, અખંડ ચૂડલો અમર કહાવે.....................સત્તગુરૂ"
  },
  {
    "title": "6. હેલી મારી હેલી રે",
    "slug": "6-heli-mari-heli-re",
    "authorSlug": "ghusaram-bapu",
    "category": "ઘૂસારામ બાપુ",
    "sortOrder": 6,
    "lyrics": "હેલી મારી હેલી રે,આત્મા નિર્વાણ હેલી\nનૂરત નિશાન થી ગગન સૂઝે, સત્તપ્રેમની લ્હેર ઝીલી....................હેલી\n\nઓહમ સોહમ ની ધૂનમાં રહેવે ખેલી\nઅખરા તીત છે આત્મા, જાણે વેલે ફળ લાગ્યા ફુલી.......................હેલી\n\nરેચક પૂરક નો કરી રિપોટ રાતનો ઠેલી\nકુંભક સ્થિર કરીને લોચનિયા માં ગેબી પુરૂષ લીધો ઝીલી..............હેલી\n\nઅનુમાન થી અટકી જવાય, અનુભવ હોય તો સુરતા બને ઘેલી \nસુરતા સંદેશો દીએ નૂરતને, નુરત નિર્વાણ ચડે પહેલી...................હેલી\n\nબાપુ જસારામ ચરણે બોલ્યા ઘુસારામ, શીંગીનાદ રહ્યો ખીલી\nઅવિગત ગાદી ગગન મઢી ચેતન, બ્રહ્મ લીધો ચીની.....................હેલી"
  },
  {
    "title": "7. મોર અઘાટ સુરમાં ગાડી એ",
    "slug": "7-mor-aghat-surma-gadi-e",
    "authorSlug": "ghusaram-bapu",
    "category": "ઘૂસારામ બાપુ",
    "sortOrder": 7,
    "lyrics": "મોર અઘાટ સુરમાં ગાડી એ, અનહદ રમત આણી\nમાયા નાણુ નજરે ન ચડયુ, સુરતા શબ્દ માં ઠેરાણી..................................મોર\n\nઅકળ કળા છે કિરતારમાં, નિરભે નામ તણી નિશાની\nસખી ચાલો ઉનદેશમાં જઈએ, પિયુ સાથે અનહદ લીલા વરતાણી..............મોર\n\nનુરત નિશાનમાં જોઈએ પલપલ, પોકારે હંસો વાણી\nએ વાણીમાં શબ્દ નાં ઝારા ઝરે છે, એ છે આત્માની એંધાણી......................મોર\n\nઉન દેશમાં નહીં રાત કે દિવસ, સોહમ પ્રકાશ ચેતન તણી\nઅમર દેશમાં અખંડ અમી વરસે, હંસ પીવે શ્વેત મોતીનું પાણી...................મોર\n\nચાર જોજનથી ઉપર અમર અજિત છે, ઝગમગ ઝગમગ જ્યોત કળાણી\nબાપુ જસારામ ચરણે બોલ્યા ઘુસારામ, સુરત નુરત શબ્દ માં સમાણી.........મોર"
  },
  {
    "title": "8. કાંઈ નવ જાણુ, કાંઈ નવ જાણુ",
    "slug": "8-kai-nav-janu-kai-nav-janu",
    "authorSlug": "shyamjibapa",
    "category": "શામજીબાપા",
    "sortOrder": 8,
    "lyrics": "કાંઈ નવ જાણુ, કાંઈ નવ જાણુ, ઘાટ અઘાટ એક રૂપ માનું, બીજું હું કાંઈ નવ જાણુ\nડાબી ઈંગલા જમણી પીંગલા, સૂક્ષ્મણામાં મોજું માણું\nચડી સુરતા આસમાનમાં, અગમ સુખ ને માણું..................બીજું\n\nસત્તગુરૂ ચરણમાં સુરતા ઠેરાવો, નુરતાથી દર્શન પાવું\nસત્ત સાહેબ કા ભજન કરું, આનંદ સુખ ને માણું.......................બીજું\n\nભેદ ભાવ થી છુ હું ન્યારો, ગુણ અવગુણ ને ત્યાગુ\nઆશા તૃષ્ણા મમતા ને મારી, કામ ક્રોધ પરજાળુ...............બીજું\n\nભવસાગર ણી ભુલવણીમાં, સત્તગુરૂ તારે તો તરૂ \nસત્તગુરૂ ચરણે શ્યામ બોલ્યા, એક સત્યનામ સાચું.............બીજું"
  },
  {
    "title": "9. પ્રથમ પહેલા ગુણપતિ દેવને સમરીએ",
    "slug": "9-pratham-pahela-gunpati-devne-samrie",
    "authorSlug": "shyamjibapa",
    "category": "શામજીબાપા",
    "sortOrder": 9,
    "lyrics": "પ્રથમ પહેલા ગુણપતિ દેવને સમરીએ, સમરીએ સ્વામિ સૂંઢાળા રે........(ટેક)\n\nહૃદય કમળ માં થાય અજવાળા, તો મટે અજ્ઞાન અંધારા\nઆવન જાવન માયા કહાવે, અખંડ છે આતમરામા..............................પ્રથમ\n\nસરાસર માં રામ બિરાજે, ઘટોઘટ માં વસનારા\nદેવળે દેવળે કરે હોંકારા, સત્ત સાહેબ સરજનહારા................................પ્રથમ\n\nભાવે થી ભજન કરી લ્યો, મટી જાય જન્મ જંજાળા\nમળ્યો છે મનુષ્ય અવતાર, નહિ મળે વારંવાર....................................પ્રથમ\n\nસત્તગુરૂ પ્રતાપે શ્યામ બોલ્યા, થાય અંતરમાં ઉજીયારા\nભવસાગરમાં ડૂબતા તારો, દેવ દયાળુ સત્તગુરૂ દાતા મારા.......................પ્રથમ"
  },
  {
    "title": "10. રામ વસે છે તારા હૃદયમાં",
    "slug": "10-ram-vase-che-tara-hrudayama",
    "authorSlug": "shyamjibapa",
    "category": "શામજીબાપા",
    "sortOrder": 10,
    "lyrics": "રામ વસે છે તારા હૃદયમાં, બહાર ગોતે કદીયે નહિં મળે\nજેને ગોતે તે તું પોતે, ગોતી લે સોહમ નામ ને આધારે…………......રામ\n\nભવ સાગરમાં ભૂલો પડયો, પકડી લે સતની દોરી\nસત સાહેબ કા ભજન કરી લે, ઉતરી જાય ભવપારા.......................રામ\n\nસામે ઝરૂખે મારા સદ્  ગુરૂજી બિરાજે, ખેલ ખેલે છે નોંધારા\nસાચા ખોટાની વ્હાલો ખબરૂ લે છે, અગમ ગતિ જાણનારા...............રામ\n\nનૂરતે ને સુરતે તું જોઈ લે, આ છે જ્યોતિ પ્રકાશા\nસતગુરૂ પ્રતાપે શ્યામ બોલ્યા, સાચું છે એક સત્તનામ......................રામ"
  },
  {
    "title": "11. અનુભવ ઉરમાં આવ્યો",
    "slug": "11-anubhav-urma-aavyo",
    "authorSlug": "shyamjibapa",
    "category": "શામજીબાપા",
    "sortOrder": 11,
    "lyrics": "અનુભવ ઉરમાં આવ્યો, સંત ચરણ ચિત્ત લાયો......................(ટેક)\n\nમૂળ કમળમાં ત્રણ પાંખડી, એમાં શિવે વાસ કરાયો\nલાલ રંગ રળિયામણો.........................................................એવો\n\nબીજા કમળ ની ચાર પાંખડી, ગુણપતિ વાસ કરાયો\nરાતા ભુવન રળિયામણા......................................................એવો\n\nત્રીજા કમળ ની છ પાંખડી, ત્યાં બ્રહ્માએ  વાસ કરાયો\nએને સૃષ્ટિ રચાવી નામ ધરાયા, લાલ રંગ રળિયામણો..........એવો\n\nચોથા કમળ માં દસ પાંખડી, નકળંક વાસ કરાયો\nલીલા ભવન ભવનાથ નાં, નકળંક નામ ધરાયો....................એવો\n\nપાંચમા કમળ માં બાર પાંખડી, એમાં બીલુ કલર કહાયો\nઈંગલા પીંગલા સૂક્ષ્મણા  વાસ કહાયો.................................એવો\n\nછઠ્ઠા કમળમાં સોળ પાંખડી, આછો પીળો કલર કહાયો\nપાંખડી એ પાંખડી એ દેવ બિરાજતા, સર્વ નો વાસ કહાયો....એવો\n\nઆજ્ઞા કમળ માં બે પાંખડી, એમાં પીળો કલર કહાયો\nપીળા રે રંગ મેં પારખ્યા.....................................................એવો\n\nઅષ્ટદલ કમળ હજાર પાંખડી, સફેદ રંગ સોહામણો\nએમ ગુરૂ ધ્યાન કહાયો........................................................એવો\n\nઅષ્ટ કમળ નું આ રૂપ છે, સતગુરૂ ચરણે સ્વરૂપ દર્શાયુ\nઘુસારામ ચરણે શ્યામ સત્ય બોલ્યા.....એવો અમર લોક ઓળખાયો"
  },
  {
    "title": "12. રામ રસ ઐસો હે મેરે ભાઈ",
    "slug": "12-ram-ras-aiso-he-mere-bhai",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 12,
    "lyrics": "રામ રસ ઐસો હે મેરે ભાઈ, કોઈ પીવે અમર હો જાઈ..........(ટેક)\nમીઠા મીઠા સબ કોઈ પીવે, કડવા ન પીવે કોઈ\nએક બાર જો કડવા પીવે તો, સબસે મીઠા હોઈ..............રામ રસ\n\nઉંચા ઉંચા સબ કોઈ ચાલે, નીચા ન ચાલે કોઈ\nએક બાર જો નીચા ચાલે તો, સબસે ઉંચા હોઈ..............રામ રસ\n\nધ્રુવ ને પીયા પ્રહલાદ ને પીયા ઔર પીયા રોહિદાસ \nદાસ કબીરને ભર ભર પીયા, ઔર પીવન કી આશ.......રામ રસ"
  },
  {
    "title": "13. હમ પરદેશી પંખી મુસાફિર",
    "slug": "13-ham-pardeshi-pankhi-musafir",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 13,
    "lyrics": "હમ પરદેશી પંખી મુસાફિર, આયે સહેલાણી\nરહેવું તમારી આ નગરીમાં રામ, જબ લગ હો દાણાપાણી......રહેવું\n\nખેલ કર ખેલ કર ખેલ કરીલે, આ ખેલ ચોગાની\nઆ અવસર તારો ફેર નહિં આવે, ફેર મિલન કો નાંહી...........રહેવું\n\nચેતન હોકર ચેતજો ભાઈ, નહિતર હે હેરાની\nદેખો દુનિયા યું ચાલી જાવે, જૈસે નાદિયા કા પાની...............રહેવું\n\nપરદેશી ની પ્રિતડી માટે, ડૂબ ગઈ જિંદગાની\nબોલ્યુ ચાલ્યુ હવે માફ કરજો, રખના મહેરબાની..................રહેવું\n\nમનુષ્ય દેહ મહા પદારથ, હે પારસ કી ખાની\nકહત કબીર સુનો ભાઈ સાધુ, સંત વિરલા એ જાણી.............રહેવું"
  },
  {
    "title": "14. મેરા ખલકા ભરી દે આનંદ કા",
    "slug": "14-mera-khalka-bhari-de-anand-ka",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 14,
    "lyrics": "મેરા ખલકા ભરી દે આનંદ કા......(ટેક)\n\nઆનંદ કા પરમાનંદ કા, મેં પ્યાસી હુવા એક વચન કા......મેરા\n\nખેતર ખેડયા મેં તો ડુંગરા ખેડયા \nએક ન ખેડયા મેરા મન કા મતા.....................................મેરા\n\nવાઘ માર્યા મેં તો દીપડા માર્યા\nએક ન માર્યા મેરા મન કા મતા......................................મેરા\n\nગંગા ન્હાયો હું તો ગોમતી ન્હાયો \nએક ન ન્હાયો મેરા મન કા મતા.....................................મેરા\n\nકહે કબીર સુનો ભાઈ સાધુ\nમેં બાલક ભયા ગુરૂ રામાનંદ કા.....................................મેરા"
  },
  {
    "title": "15. રામ નામ તબ જાણ્યો સંતો",
    "slug": "15-ram-nam-tab-janyo-santo",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 15,
    "lyrics": "રામ નામ તબ જાણ્યો સંતો, રામ નામ તબ જાણ્યો \nઆત્મ તત્વ પિછાણ્યો સંતો, રામ નામ તબ જાણ્યો...........(ટેક)\n\nકોણ મરે ને કોણ અવતરે, ભાઈ કોણ જીતે કોણ હારે\nજલ કી લહેરી જલ સે ઉપજી, કોણ તરે કોણ તારે............સંતો\n\nકાચા કુંભ જળ જળ માંહિ ભરીયા, બાહિર ભીતર પાણી\nફુટ્યા કુંભ જળ જળમાં ભળીયા, સો ગત્ત વિરલે જાણી......સંતો\n\nહરિ અથાહ થાહ મેં પાયો, શાયર સુરતા સમાણી\nઢીમર જાલ ડાલે ક્યા કર હી, મન હી હો ગઈ પાની.........સંતો\n\nગુરૂ બિન જ્ઞાન રામ બિન બોલે, મિથ્યા વાદ કહાવે\nકહે કબીર ગુંગે કી સમસ્યા, ગૂંગા હોઈ સો પાવે...............સંતો"
  },
  {
    "title": "16. પાની મેં મીન પ્યાસી",
    "slug": "16-pani-mem-meen-pyasi",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 16,
    "lyrics": "પાની મેં મીન પ્યાસી, મોહે દેખત આવત હાંસી\nઆત્મજ્ઞાન વિના નર ભટકે, કોઈ મથુરા કોઈ કાશી...................(ટેક)\n\nજોગી હોકર બસે જંગલ મેં, બન બન ફિરે ઉદાસી\nકસ્તુરી મૃગ નાભિ બસત હે, ઢૂંઢત હે બન વાસી.......................પાની\n\nપોથી પઢ પંડિત હુવે, તોય ન મિલે અવિનાશી\nમસ્જિદ ચડકર મુલ્લા પોકારે, તોય ન મિટે જમ ફાંસી...............પાની\n\nકહત કબીર સુનો ભાઈ સાધુ, ગુરૂ બિન નહિં ટળે ચોરાસી..........પાની"
  },
  {
    "title": "17. ખાખ મેં ખપી જાના રે બંદા",
    "slug": "17-khakh-mem-khapi-jana-re-banda",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 17,
    "lyrics": "ખાખ મેં ખપી જાના રે બંદા, પવન સે ઉડી જાના\nથોડા કરો અભિમાન, એક દિન મિટ્ટી મેં મિલ જાના..............થોડા\n\nમિટ્ટી ચૂન ચૂન મહેલ બનાયા, ગમાર કહે ઘર મેરા\nજમડા રે આવશે જીવને લેવા, કહાં મૂરખ ઘર તેરા..............થોડા\n\nજાડા રે પહેરો તમે ઝીણા રે પહેરો , પહેરો મખમલ વેશા\nરૂપિયે ગજની અત્તલશ પહેરો,તોય મરણ કેરી આશા............થોડા\n\nસોના રે પહેરો તમે રૂપા પહેરો, પહેરો હિરલા સાચા\nવાળે વાળે મોતી રે પહેરો, તોય મરણ કેરી આશા................થોડા\n\nએક દિન જીઓ કે દો દિન જીઓ, જીઓ વરસ પચાસા\nકહત કબીર સુનો ભાઈ સાધુ, તોય મરણ કેરી આશા.............થોડા"
  },
  {
    "title": "18. ઇતના ભેદ ગુરૂ હમકો બતા દો રે",
    "slug": "18-itna-bhed-guru-hamko-bata-do-re",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 18,
    "lyrics": "ઇતના ભેદ ગુરૂ હમકો બતા દો રે, હમકો બતા દો રે\nસમજણ પકડ ગુરૂ મોરી બૈયા રે હો જી..................................હો હોજી\n\nજળ કેરી મછીયા જળમાં વિહાણી રે, જળમાં વિહાણી રે\nઈંડા એના અધ્ધર જમાયા રે જી...........................................હો હોજી\nઈ રે ઈંડા માં છીંડા ન્હોતા (૨) પવન એમાં કહાં સે સમાયા રે…..........ઈતના\n\nજમીન પર ચૂલા રે બનાયા રે, ચૂલા રે બનાયા રે\nઆસમાન તવા રે બનાયા રે જી............................................હો હોજી\nચાર ચાર જુગની લકડી જલાઈ (૨) ધુવા એનાં કહા રે સમાયા રે.........ઈતના\n\nગગન મંડળમાં ગૌઆ રે વિહાણી રે, ગાવા રે વિહાણી રે\nગોરસ એનાં અધ્ધર જમાયા રે જી.........................................હો હોજી\nસબ સંત મિલ કે કિયા રે વલોણાં (૨) માખણ કોઈ વિરલા પાયા રે......ઈતના\n\nશૂન રે શિખર પર ભ્રમર ગુફામાં રે, ભ્રમર ગુફામાં રે\nઆસન અધ્ધર જમાયા રે જી................................................હો હોજી\nકહત કબીરા સુનો મેરે સાધુ (૨) જાગ્યા સોઈ નર પાયા રે...................ઈતના"
  },
  {
    "title": "19. હે જ્ઞાની તમે કરો ને વિચાર",
    "slug": "19-he-jnani-tame-karo-ne-vichar",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 19,
    "lyrics": "હે જ્ઞાની તમે કરો ને વિચાર, આમાં બોલનહારો જોને ક્યાં વસે\nપાણીથી પાતળો જેમ ,ધુમ્મસ કેરી ધાર\nપિંડ બ્રહ્માંડ થી પાર છે, નિરાધારનો આધાર..................હે જ્ઞાની \n\nશૂન્ય કી ધૂન મેં ધમધમે જ્યાં પવનનો છે વાસ \nમોતી તણા જ્યાં મેહુલા વરસે, ઘનઘોર આકાશ.............હે જ્ઞાની\n\nત્રિવેણીનાં તિરમાં ખેલ ખેલે રે અપાર \nપાંચ તત્વ જ્યાં પ્રગટ રમે, વીજ કરે ચમકાર................હે જ્ઞાની\n\nગગનમંડળ ની ગોખમાં, વાગે અનહદ નાદ\nઉનમુનિ એ ઓળખાય જે, ખેલ છે ખાંડા ની ધાર.....,,,,,,,હે જ્ઞાની\n\nદશ મેં દ્વારે દેવ છે, સોહમ શબ્દ ની પાર \nકહે કબીર જૂઠું નહિ, સાચું અગમ અપાર.......................હે જ્ઞાની"
  },
  {
    "title": "20. જા ઘરહરિ કથા નહિં કિર્તન",
    "slug": "20-ja-gharhari-katha-nahim-kirtan",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 20,
    "lyrics": "જા ઘરહરિ કથા નહિં કિર્તન, સંત નહિં મિજમાના\nતા ઘર જમડે ડેરા દીના, સાંજ પડે સમશાના...................જા ઘર\n\nફુલા ફગરા ક્યાં ફિરત હે, ક્યાં દિખલાવત અંગા\nએક પલક મેં ફના હો જાવેગા, જૈસા રંગ પતંગા...............જા ઘર \n\nનાભિકમળ મેં નાવ ચલત હે, દ્વાદશ મીન ઠેરાના\nઅધર તખત કા દેખ તમાશા, સોઈ સદગુરૂ કી શાના.......જા ઘર\n\nવ્રેહ વૈરાગે ગુરૂગમ જાગે, સદગુરૂ નામ નિશાના\nસાધુજન કી સેવા ન કીની, કિસ બિધ હોવે કલ્યાણા..........જા ઘર\n\nમેરી મેરી કર મર ગયો મૂરખ, મિટા નહિં માન ગુમાના\nકહત કબીરા સુનો ભાઈ સાધુ, કિસ બિધ હોવે કલ્યાણા.....જા ઘર"
  },
  {
    "title": "21. મોહે કહા તું ઢૂંઢે બંદે",
    "slug": "21-mohe-kaha-tu-dhundhe-bande",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 21,
    "lyrics": "મોહે કહા તું ઢૂંઢે બંદે, મેં તો તેરે પાસ મેં\nના મેં કોઈ ક્રિયા કરમ મેં, ના મેં જોગ સંન્યાસ મેં......મોહે\n\nના મેં પોથી, ના મેં પંડિત, ના કાશી કૈલાશ મેં\nના રહેતા મેં શ્રી દ્વારિકા, ના જગન્નાથ મેં...................મોહે\n\nના રહેતા મેં મક્કા  મદીના, ના રહેતા હિમાલય મેં\nના રહેતા મેં જંગલ સહરા, મેં રહેતા વિશ્વાસ મેં.........મોહે\n\nકહત કબીરા સુનો ભાઈ સાધુ, સબ શ્વાસન કે શ્વાસ મેં \nજો ખોજે તો તુરત મિલું મેં, ક્ષણભર કી તલાશ મેં......મોહે"
  },
  {
    "title": "22. સંત કહે ગોરખા, આમાં પવિત્ર વસ્તુ કઈ",
    "slug": "22-sant-kahe-gorkha-aama-pavitra-vastu-kai",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 22,
    "lyrics": "સંત કહે ગોરખા, આમાં પવિત્ર વસ્તુ કઈ……...(ટેક)\nજળ પવિત્ર જળ પવિત્ર, જળ પવિત્ર નહિ \nસંત કહે છે ગોરખા, જળ પવિત્ર નહિ\nજળમાં સારા જીવ જન્મત હે, જળ મડદાને ખાય\nએ જળ પવિત્ર કેમ કરી કહેવાય.......................................સંત\n\nઅગ્નિ પવિત્ર, અગ્નિ પવિત્ર, અગ્નિ પવિત્ર નહિ \nસંત કહે છે ગોરખા, અગ્નિ પવિત્ર નહિ…………… સંત\nઅગ્નિ મેં સારા જીવ જલત હે, અગ્નિ મડદા ને ખાય\nએ અગ્નિ પવિત્ર કેમ કરી કહેવાય ?..........................સંત\n\nકહે કબીર સુનો ગોરખા, એક નામ પાર સહી\nઘટોઘટ જે વસી રહ્યું, પવિત્ર તો તેને કહી..................સંત"
  },
  {
    "title": "23. ગર્વ કિયો સોઈ નર હાર્યો",
    "slug": "23-garv-kiyo-soi-nar-haryo",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 23,
    "lyrics": "ગર્વ કિયો સોઈ નર હાર્યો, સીયા રામજી સે....,,,,,,,,,,,,(ટેક)\nગર્વ કિયો રત્નાકર સાગરે, નીર ખારો કરી ડાર્યો................\nગર્વ કિયો વનની ચણોઠી એ, મુખ કાળો કરી ડાર્યો............\nગર્વ કિયો ચકવા ને ચકવી એ, રેન વિયોગ કરી ડાર્યો.......\nગર્વ કિયો અંજની કેરા પુત્રે, પાવ ખોડો કરી ડાર્યો.............\nગર્વ કિયો હિરણાકંસ રાજાએ, ન્હોર વધારીને માર્યો...........\nગર્વ કિયો લંકાપતિ રાવણે, દશ શીશ મુગટ કાટ ડાર્યો......\nગર્વ કિયો આવળ કેરે ફૂલડે, લઈને ચમાર કુંડ ડાર્યો.........\nકહત કબીર સુનો ભાઈ સાધુ, શરણે આયો વાકો તાર્યો......"
  },
  {
    "title": "24. તેરે દયા ધરમ નહિ મનમેં",
    "slug": "24-tere-daya-dharam-nahi-manmem",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 24,
    "lyrics": "તેરે દયા ધરમ નહિ મનમેં, મુખડા ક્યાં દેખે દરપન મેં.........(ટેક)\nકાગજ કી એક નવ બનાઈ, છોડા સમંદર જલ મેં\nનુગરા બેઠને વાલે ડૂબે,  સુગરા તર જાય ઉનમેં................મુખડા\n\nમૂછ સમારી પાઘડી બાંધે, તેલ લગાવત તન મેં\nડુંગર કા પાની જોબન કા લટકા, ઢલ જાવેગા ક્ષણ મેં.......મુખડા\n\nઆ રે કાયામાં ઘાસ ઉગત હે, ગૌવા ચરેગે વનમેં\nકહત કબીરા સુન ભાઈ સાધુ, રહ ગઈ  મન કી મન મેં......મુખડા"
  },
  {
    "title": "25. નિરધન કો ધન રામ હમારા",
    "slug": "25-nirdhan-ko-dhan-ram-hamara",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 25,
    "lyrics": "નિરધન કો ધન રામ હમારા, નિરધન કો ધન રામ\nચોર ન લેવે, ઘટ હી ન જાવે, વખત પર આવે કામ...................નિરધન\n\nસોવત બેઠત જાગત ઉઠત, જપું હું નિરંતર નામ હમારો\nદિન દિન હોતા સવાઈ દોલત, ખુટત નહિ  એક દાણ હમારો......નિરધન \n\nઠાકોર ચલે નગર દરબારે, પાસ નહિં કુછ દામ\nકહત કબીરા સુન ભાઈ સાધુ, પારસ કો નહિં કામ......................નિરધન"
  },
  {
    "title": "26. ભાગ્ય બડે જા ઘર સંત પધારે",
    "slug": "26-bhagya-bade-ja-ghar-sant-padhare",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 26,
    "lyrics": "ભાગ્ય બડે જા ઘર સંત પધારે, કર સમરણ ભવસાગર તારે.............(ટેક)\nઆવેલ સંત કા આદર કીજે, ચરણ પખાજી ચરણામૃત લીજે...........ભાગ્ય\n\nયહી સંત હે પર ઉપકારી, શરણ આયે કો લેત ઉગારી...................ભાગ્ય\n\nજીનકે મુખ કી સુનો વાણી, સુનત મિટે ચારેય ખાણી.....................ભાગ્ય\n\nભવસાગરમાં તે ડુબત કાઢે, સાહેબ સે અતિ પ્રીતિ બઢાવે..............ભાગ્ય\n\nસાહેબ કા ઘર સંત માંહી, સાહેબ સંત કુછ અંતરૂ નાહી..................ભાગ્ય\n\nકહે કબીર સંત ભલે હી પધારે, જનમ જનમ કે કારજ સારે............ભાગ્ય"
  },
  {
    "title": "27. ભુલ્યો મન ભમરા તું ક્યાં ભમ્યો",
    "slug": "27-bhulyo-man-bhamra-tu-kya-bhamyo",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 27,
    "lyrics": "ભુલ્યો મન ભમરા તું ક્યાં ભમ્યો ? ભમ્યો દિવસ ને રાત\nમાયા નો બાંધેલ પ્રાણિયો, સમજ્યો નહિં શુદ્ધ વાત............ભમરા\n\nકુંભ કાચો કાયા જાજરી, જોઈ ને કરો રે જતન\nવણસતા વાર નહિં લાગે, રાખો રૂડું રતન.........................ભમરા\n\nકોના છોરું કોના વાછરું ? કોના માં ને બાપ ?\nઅંતકાળે જાવુ એકલા, સાથે પુણ્ય ને પાપ\n\nજે ઘેરે નોબત વાગતી, રૂડા છત્રીશ રાગ\nખંડેર થઇ તે ખાલી પડયા, કાળા ઉડે છે કાગ...................ભમરા\n\nજીવની આશા ડુંગર જેવડી, મરણ પગલાંની હેઠ\nમોટા મોટા મરી ચાલ્યા, લાખો લખપતિ શેઠ\n\nઉલ્ટી નદી પૂર ઉતરી, જાવુ છે પેલે પાર\nઆગળ નીર નહિં મળે, જોઈએ તે લેજો હાર....................ભમરા\n\nસત્તકર્મ સત્તવસ્તુ વ્હોરજો, ઈશ્વર સમરણ સાથ\nકબીર જુહારીને નિસર્યા, લેખું સાહેબને હાથ."
  },
  {
    "title": "28. સદગુરૂ વિના વાત કૈસી",
    "slug": "28-sadguru-vina-vat-kaisi",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 28,
    "lyrics": "સદગુરૂ વિના વાત કૈસી, ગુરૂ વિના વાત કૈસી\nકોઈ મળ્યા સંત ઉપદેશી.........................................................(ટેક)\n\nએ ગુણપતિ આયા રિદ્ધ સિદ્ધ લાયા \nનિરભે નામ સુનાયા, સંતો નિરભે નામ સુનાયા.........................મળ્યા\n\nઆ રે કાયામાં રતન પદારથ, ભવસાગર માં મોતી....................મળ્યા\n\nએ કોઈ વોરે છે ત્રાંબા ને પિત્તળ, સદગુરૂ વોરે સાચા હિરલા.....મળ્યા\n\nકહત કબીર સુનો ભાઈ સાધુ, નેક ટેક મેં રહેના.........................મળ્યા"
  },
  {
    "title": "29. ધર્મદાસ પૂછે ચિત્તલાઈ",
    "slug": "29-dharmadas-puche-chittalai",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 29,
    "lyrics": "ધર્મદાસ પૂછે ચિત્તલાઈ, કાયા કા ભેદ ગુરૂ દિયો બતાઈ........(ટેક)\nકોન બીજ સે બની આ કાયા ? કોન દોર હંસા ચાલ આયા ?\nકોન કમલ મેં શ્વાસ ઉશ્વાસા ? કોન કમલ મેં જીવ કે વાસા ?\nકોન કમલ મેં નિરંજન રાય, કોન કમલ મેં ફિરત હે દુવાઈ\nકોન કમલ મેં પુરૂષ કા વાસા, કોન શબ્દ સે ચાલ જાત હે હંસા\nબેર બેર પૂછુ ગુરૂ મેરા, અગમ ભેદ કા નિવેડા\nકર્મ બીજ સે બની આ કાયા, સોહમ દોર હંસા ચાલી આયા\nનાભિ કમલ શ્વાસ ઉશ્વાસા, હિરદા કમલ મેં જીવ કા વાસા\nત્રિકુટી કમલ મેં નિરંજન રાય, કાયા નગર મેં કિરાત હે દુવાઈ\nઅમર લોક મેં પુરૂષ કા વાસા, સત્ત શબ્દ સે ચાલ જાત હે હંસા\nકહત કબીર સુનો ધર્મદાસા, અગમ ભેદ કા યહ પ્રકાશા."
  },
  {
    "title": "30. સાધો, સહજ સમાધ ભલી",
    "slug": "30-sadho-sahaj-samadh-bhali",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 30,
    "lyrics": "સાધો, સહજ સમાધ ભલી\nગુરૂ પ્રતાપ જા દિન સે જાગી, દિન દિન અધિક ચલી…........(ટેક)\n\nજહાં જહાં ડોલો તે પરિક્રમા, જો કુછ કરો તે સેવા\nજબ સોવે તબ કરો દંડવત, પૂજો ઔર ન દેવા...................સાધો\n\nકહો તે નામ, સુનો તે સમરણ, ખાવો પીવો તે પૂજા\nગિરહ ઉજાડ એક સમ લેખો, ભાવ મિટાવો દુજા..................સાધો\n\nઆંખ ન મુંદો કાન ન રૂંધો, તનિક કષ્ટ નહિં ધારો\nખુલ્લે નૈન પહેચાનો, હંસી હંસી સુંદર રૂપ નિહાળો...............સાધો\n\nશબ્દ નિરંતર સે મન લાગ્યા, મલિન વાસના ત્યાગી\nઉઠત બેઠત કબ હુ ન છુટે, ઐસી તાળી લાગી.....................સાધો\n\nકહત કબીર યહ ઉનમુની રહેણી, જે પ્રગટ કરી ગાઈ\nસુખ દુઃખથી પર પરમ પદ, તે પદ રહ્યા સમાઈ.................સાધો"
  },
  {
    "title": "31. આંબો મોર્યો રે સદગુરૂને દરબાર",
    "slug": "31-aambo-moryo-re-sadgurune-darbar",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 31,
    "lyrics": "આંબો મોર્યો રે સદગુરૂને દરબાર, સાહેલી આંબો મોર્યો…………………....(ટેક)\nઆંબે સદગુરૂએ થાણા રે થાપીયા, બોયા બોયા રે કાંઈ નિર્ગુણ બીજ.....સાહેલી\nઆંબો અષ્ટકમલ દળે ઉપન્યો, તેની ડાળી ગઈ ગગન મોઝાર.............સાહેલી\nઆંબાને પત્રે પત્રે અમી ઝરે, એનાં ઘુંમટની રે બહુ શોભા દેખાય..........સાહેલી\nઆંબો ભ્રમર ગુફામાંથી ફાલ્યો, ફળ લાગ્યા રે બ્રહ્મ શું મોઝાર...............સાહેલી\nફળ દ્રષ્ટે દેખીને ગ્રહી રહ્યો, શુદ્ધિ ચાખતા રે મરી મરી જાય..................સાહેલી\nરસ અતિ કડવો ને તીખો ઘણો, કોઈ વિરલા રે, તેનાં પેટ સમાય.........સાહેલી\nરસ થોડે થોડે સાધતા, પોતે અમલી રે બની તેને ખાય.......................સાહેલી\nરસ રતિ એક ઘટમાં જો સંચરે, તેને તરત જ તેનો સાહ્યબો દેખાય.......સાહેલી\nકહે કબીર ધર્મદાસ ને, આપનો આંબો રે મેં તો દિયો બતાય................સાહેલી"
  },
  {
    "title": "32. હમ હે જોગી અલખ અનાદિ",
    "slug": "32-ham-he-jogi-alakh-anadi",
    "authorSlug": "kabir-saheb",
    "category": "કબીર સાહેબ",
    "sortOrder": 32,
    "lyrics": "હમ હે જોગી અલખ અનાદિ, પાર બ્રહ્મ સે હે પારા……….\nનામ રૂપ કછુ નહીં હમારે, જળ થળ મેં પ્રભુ ભાળ્યા…......\nવેશ ભેખ કછુ નહીં હમારે, નહીં કોઈ વર્ણ દ્વારા……………\nમતિ મૂર્તિ નહીં હમારે, કર્મ કાંડ સે હે ન્યારા……………….\nઅજર અમર એક છે આત્મા, જન્મ મરણથી હે બહારા……\nઅકળ કળા ગુરૂ કળી કેમ જાવે, બ્રહ્મ ગુફાનાં રમનારા……\nઆત્મ જ્ઞાની બહુ હે નામી, હરખ શોકથી હે ન્યારા………...\nઐસા જોગી પ્રેમરસ ભોગી, પ્રેમ પદનાં રમનારા………....\nઆપે જાણે પોતે માણે, મનકી નહીં કોઈ કહેનારા…………\nસમદ્રષ્ટિમાં રહે સમાય, મન મસ્તાના ફરનારા……………\nશીલ સંતોષનાં શૂરા પુરા, બ્રહ્મ વિદ્યાનાં ભણનારા……….\nકહત કબીર સુનો ભાઈ સાધુ, પાપ પુણ્યથી  હે ન્યારા….."
  },
  {
    "title": "33. પ્રભુજી ને સમર્યા વિના",
    "slug": "33-prabhuji-ne-samarya-vina",
    "authorSlug": "ravi-saheb",
    "category": "રવિ સાહેબ",
    "sortOrder": 33,
    "lyrics": "પ્રભુજી ને સમર્યા વિના, નાથજી નિવાજ્યા વિના\nપાર નહિં પહોંચો, કાયા તો ધુતારા નાં શહેર છે\n\nજન્મો હતો રે તે દી શું રે બોલી બોલતોને, હવે રે બોલ્યામાં ઘણો ફેર રે\nમાયા માં મનડું તારૂ ઘણું રે લોભાણુ, પ્રભુ ને ભજ્યા થી તારે વેર છે.......પ્રભુજી\n\nમોટપણું રે તે તો બહુ રે લીધુ છે ને, મોટપણું તને વેડશે\nકૂડી રે કમાણી તારી ચોપડે રે ચડશે, લેખા લેવાને ઘણી ખેર છે..............પ્રભુજી\n\nહિરા ને ઝવેર ભાઈ માણેક મોતી, છિપે રે છિપે ઘણો ફેર છે\nસાધુ રે થયા તેથી શું રે થયું ને, પ્યાલે પ્યાલા માં ઘણો ફેર છે...............પ્રભુજી\n\nરવિરામ કહે છે ભાઈ ગુરૂજી ની સાખે, દિધા રે વિના ક્યાંથી પામશો?\nદેવુ રે હોય તો તમે દઈને જાજો, મહાપ્રભુ ની સાચી મ્હેર છે...................પ્રભુજી"
  },
  {
    "title": "34. મેં સિપાહી સદગુરૂ સાહેબ કા",
    "slug": "34-mem-sipahi-sadguru-saheb-ka",
    "authorSlug": "ravi-saheb",
    "category": "રવિ સાહેબ",
    "sortOrder": 34,
    "lyrics": "મેં સિપાહી સદગુરૂ સાહેબ કા, લડુ ટોપ બખતર પહેરી…..............(ટેક)\n\nસાત સાયર કી ઘુંટ ભરાવું, મારૂ કાળ ક્રોધ દુશ્મન વેરી\nપ્રેમ તણી માંહી પેટી રે બાંધુ, સમશેર લઉં સદગુરૂ કેરી.........મેં સિપાહી\n\nસિંહ ને બકરી ભેળા ચરાવુ, રાજા રંક ની એક જ શેરી\nપાંચ પચ્ચીસ કોઈ જાન ન પાવે, બ્રહ્મ મહેલ માં જોઉં હેરી.....મેં સિપાહી\n\nસત્ત શબ્દ કી ચડી ખુમારી, શુન શિખરે સુરતા મેરી\nપરિ બ્રહ્મ  કે મેં પરચે ખેલુ, કરું ટહેલ સંત સબુરી.......................મેં સિપાહી\n\nઆદિ રાજ ને આદિ દુવાયુ, મોર છાપ બાદશાહ કેરી\nકહે રવિરામ ગુરૂ ભાણ પ્રતાપે, માંગુ મોજ ચાકરી તેરી..........મેં સિપાહી"
  },
  {
    "title": "35. મૂળ રે વિનાનું કાયા ઝાડવું",
    "slug": "35-mul-re-vinanu-kaya-jadvu",
    "authorSlug": "ravi-saheb",
    "category": "રવિ સાહેબ",
    "sortOrder": 35,
    "lyrics": "મૂળ રે વિનાનું કાયા ઝાડવું, એને પડતા નહીં લાગે વાર.....(ટેક)\n\nએને પુણ્ય રે રૂપી ખાતર પૂરજો\nએજી એનાં મુળીયા પાતાળમાં જોને જાય.........................મૂળ રે\n\nએને સત્ય રૂપી જળ સિંચજો\nએજી એની નુરત સુરત દોનુ પાણિયાર…………………......મૂળ રે\n\nએજી એને શીલ ને સંતોષ એવા ફળ લાગશે\nએજી એ તો અમર ફળ જેવા હોય...................................મૂળ રે\n\nએમ કહે રવિરાય ગુરૂ ભાણ પ્રતાપે\nએજી પ્રભુ ને ભજી ને ઉતરો ભવપાર..............................મૂળ રે"
  },
  {
    "title": "36. હે જી રામ કોણે બનાવ્યો પવન સરખો",
    "slug": "36-he-ji-ram-kone-banavyo-pavan-sarkho",
    "authorSlug": "ravi-saheb",
    "category": "રવિ સાહેબ",
    "sortOrder": 36,
    "lyrics": "હે જી રામ કોણે બનાવ્યો પવન સરખો, હે જી એનાં ઘડનારા ને નિરખો\nહે જી પૂરણ રહ્યો તેને પરખો...................................................(ટેક)\n\nઆવે જાવે બોલે બોલાવે, જ્યાં જોઉં ત્યાં સરખો\nદેવળ દેવળ કરે હોંકારા, પારખ થઈને પરખો...................હે જી રામ\n\nધ્યાન ધરૂ તો માંહે જ્યોત જલત હે, મિટ્યો અંધાર ઉન ઘરકો\nએ અજવાળે અગમ સૂઝે, ભેદ જડયો ઉન ઘરકો...............હે જી રામ\n\nપાંચ તત્વનો બન્યો આ ચરખો, ખેલ ખરો ઈ નરકો\nપવન પૂતળી રમે પ્રેમ સે, જ્ઞાની હોકર નિરખો.......................હે જી રામ\n\nરવિરામ બોલ્યા પડદા ખોલ્યા, મેં ગુલામ ઉન ઘરકો\nએ ચરખાની આશા ન કરશો, ચરખો નહિં રહે સરખો........હે જી રામ"
  },
  {
    "title": "37. સત્તભજન સે કર લે ગુંજારવ",
    "slug": "37-sattabhajan-se-kar-le-gunjarav",
    "authorSlug": "ravi-saheb",
    "category": "રવિ સાહેબ",
    "sortOrder": 37,
    "lyrics": "સત્તભજન સે કર લે ગુંજારવ, મેરામ સદગુરૂ માંહી બોલે\nમાંયલા શહેરમાં રતન અમૂલખ, વસ્તુ છે માંહી વણતોલે..........................(ટેક)\n\nદિલ દરિયામાં અખંડ દિવો, દેખ્યા વિનાનું મારૂ મન ડોલે\nભ્રાંતિના ભરીયા ભવોભવ ભૂલ્યા, સદગુરૂ વિના તાળા કોણ ખોલે.....સત્ત ભજન\n\nગગન ગુફામાં ગુપ્ત ગેબી, બાવન બાર સોહમ બોલે\nનૂર તખત પર નામ નિરંજન, નૂરતે સુરતે નટ ખેલે........................સત્ત ભજન\n\nઆદિ અનાદિ ની જેને છે ઓળખાણ, મૂળ ભજન તે નહિં મેલે\nલાગી પ્રિત સદગુરૂ સાહેબ સે, ફળ લાગ્યા જેમ વૃક્ષ વેલે.......................સત્ત ભજન\n\nઆ રે મારગડે આવતા ને જાતા, આનંદ ભયો મન મેરે\nઆ સંસાર માં ચેતો મારા ભાયલા, સંત પોકારે અવસર છેલ્લો.........સત્ત ભજન\n\nપટા લખાયા જેને ધણી હજુરા, અવર દિલ હવે નહિં ડોલે\nકહે રવિરામ ગુરૂ ભાણ પ્રતાપે, અમર પ્યાલા સંત પીવે..................સત્ત ભજન"
  },
  {
    "title": "38. હૃદય સૂનુ હરિ નામ વિના",
    "slug": "38-hruday-sunu-hari-nam-vina",
    "authorSlug": "ravi-saheb",
    "category": "રવિ સાહેબ",
    "sortOrder": 38,
    "lyrics": "હૃદય સૂનુ હરિ નામ વિના, લોચનીયું સૂનુ કાજળ વિનાં\nદિપક વિના જેમ મંદિર સૂનુ, રજની સુની જેમ ચંદ્ર વિના.............(ટેક)\n\nદશરથ વિનાની અયોધ્યા સુની, ભરત સૂના શ્રી રામ વિના\nસ્નેહ વિના સગપણ સૂનુ, પરિવાર સુનો જેમ પુત્ર વિના...............હૃદય\n\nજળ વિના જેમ પોયણ સુની, ભ્રમર સુનો કમલ વિના\nભણે રવિદાસ સુણ સારંગપાણી, નિર્ધનીયા સુના હરિનામ વિના....હૃદય"
  },
  {
    "title": "39. અમર પ્યાલો મારા ગુરૂજી એ પાયો",
    "slug": "39-amar-pyalo-mara-guruji-e-payo",
    "authorSlug": "ravi-saheb",
    "category": "રવિ સાહેબ",
    "sortOrder": 39,
    "lyrics": "અમર પ્યાલો મારા ગુરૂજી એ પાયો, મન મસ્તાના ફીરૂ દિવાના\nઅમરાપુર કી આશ કરો તો, છોડી દિયો ને અભિમાના...........(ટેક)\n\nકિતના લંબા કિતના ચૌડા, કિતના હે બ્રહ્મ અનુમાના\nસોઈ શબ્દ કા ભેદ બતાવો, ઔર છોડી દિયો સબજ્ઞાના.........અમર\n\nપૃથ્વી સે પહોળા પવન સે ઝિણા, આ દમ હે અપરંપારા\nલંબા ચૌડા સર્વ મેં બરાબર, કાયમ હે ઈ કિરતારા................અમર\n\nપ્રતિતી વિનાનાં પંડિત કહેવાણા, મર વાંચે પુસ્તક પાના\nવૃતિ પોતાની વાળી ન શક્યા, ધરાવે પંડિત નામા................અમર\n\nભેદ સમજ્યા વિના ઘરોઘર ભટકે, મૂર્ખ લજાવે ઉજળા બાના\nઆપ ન સૂઝે પથરા ને પૂજે, ઔર ઘરે કૂડા ધ્યાના...............અમર\n\nઅબ નહિં આવુ, અબ નહિં જાવુ, અબ નહિં ધરૂ કુડા ધ્યાના\nકહે રવિરામ ગુરૂ ભાણ પ્રતાપે, લીખ દિયા પરવાના.............અમર"
  },
  {
    "title": "40. દિલ દરિયામાં હંમેશ ન્હાતા",
    "slug": "40-dil-dariyama-hamesh-nhata",
    "authorSlug": "ravi-saheb",
    "category": "રવિ સાહેબ",
    "sortOrder": 40,
    "lyrics": "દિલ દરિયામાં હંમેશ ન્હાતા, મન મેલા તેરા કયું રહેતા\nરામ સરીખો સાબુ છોડકર, કાદવ કપડા કયું ધોતા....................(ટેક)\n\nશ્રાદ્ધ રે ચડાવતા કોટી યુગ ગયા, મુવા પછી મુખ નહિં જોતા\nઆવેલ પુરૂષ ને આદર નહિં દેતા, મુવા બાપ કુ કયો રોતા........દિલ\n\nઉગે ત્યાં તો કબહુ ન વાવે ને, ઇંગારે બીજ જઈ બોતા\nખાય પીવે ને મારે ખાંસડે, ખરો માલ મૂરખ યું ખોતા................દિલ\n\nઆંબા વૃક્ષ કી છાંયા છોડકર, આંક આસન કયું સોતા\nહંસ સભામાં કબહુ ન બેસતા, બગલા સાથે ખાવે ગોથા..............દિલ\n\nપર પ્રિયા સે સ્નેહ કરતા, ખોટી નજરે કયું જોતા\nપતિવ્રતા ઘેર નાર પદમણી, ગુણીકા સે મન કયું મ્હોતા............દિલ\n\nકરી લે બંદગી સાચા સાહેબ ની, અમર રહે તેરા તોતા\nકહે રવિરામ ગુરૂ ભાણ પ્રતાપે, આ અવસર ફિર નહિં હોતા........દિલ"
  },
  {
    "title": "41. વિના વિચાર સકલ જગ ભૂલે",
    "slug": "41-vina-vichar-sakal-jag-bhule",
    "authorSlug": "ravi-saheb",
    "category": "રવિ સાહેબ",
    "sortOrder": 41,
    "lyrics": "વિના વિચાર સકલ જગ ભૂલે, જ્ઞાન વિના ગૂંચવાય\nરામ માયા મૂળે નહિં.............................................................(ટેક)\n\nમાયા માયા સિદ્ધ સાદ્ધ પોકારે, અચરજ એ જ કહાવે\nભોરીંગ જેસા ચીંધરા ભોંય પર, દેખો કિસ બિધ મારે................રામ\n\nમાટી કેરા બન્યા માળીયા, ચિતર્યો વાઘ ચિતારે\nઐસો ભ્રમ દેખી જીવ ભટક્યો, દેખો વાઘ કિસ બિધ ખાય.........રામ\n\nખેત બડા બિન રખવાલા, ઓડા ઉભા કિના\nઅક્કલ વિનાનાં ઓડા ને ન ઓળખ્યા, દેખત હરણાં બિના.......રામ\n\nમાયા નીંદર સ્વપ્ન જૈસી, બિન ગુરૂગમ અંધિયારા \nકહે રવિરામ ચેતન જબ જાગ્યા, ભયા બ્રહ્મ ઉજીયારા...............રામ"
  },
  {
    "title": "42. દેખો ભરથરી ભયા ફકીરા",
    "slug": "42-dekho-bharthari-bhaya-fakira",
    "authorSlug": "ravi-saheb",
    "category": "રવિ સાહેબ",
    "sortOrder": 42,
    "lyrics": "દેખો ભરથરી ભયા ફકીરા, છોડયા શહેર ગઢ ઉજેણી\nબાણું લાખ માળવા નો રાજા, સર્વે માયા ત્યાગન કી.......................(ટેક)\n\nમિટ્યા માન મન ભયા નિર્મળા, ગોરખ ની ગુરૂ દિક્ષા લીની\nઆશા ને તૃષ્ણા એકે નહિં ઉરમા, સદગુરૂ ચરણે વૃતિ દિની..............દેખો\n\nનાથ નિવાજ્યાં દિયા નિજ ભેદા, લાગ્યા ધ્યાન ધૂન ત્રિવેણી\nબાજ્યાં નાદ ઘૂર્યા ગગનમાં, શ્રવણે સુણી મોરલી ઝીણી...................દેખો\n\nછૂટ્યા આપા જપ્યા અજંપા, નહિં વર્ણા વર્ણી ભિન્ના ભિન્નિ\nઅમર અજિતા સાખ જુગ જીત્યા, સચરાચર વસ્તુ ચીની...................દેખો\n\nરામ હી રામ, રામ અસંગા, મતિ અગાધ અનંત રહેણી\nરવિરામ સોઈ અકળ પુરૂષ હે, સમી ગ્યા સ્વપ્નાં, મીટ ગઈ રેની.......દેખો"
  },
  {
    "title": "43. આનંદ ઘડી હેતે ભજવા હરિ",
    "slug": "43-anand-ghadi-hete-bhajva-hari",
    "authorSlug": "ravi-saheb",
    "category": "રવિ સાહેબ",
    "sortOrder": 43,
    "lyrics": "આનંદ ઘડી હેતે ભજવા હરિ, અમને સંત સોહાગી મળિયા..............................(ટેક)\n\nપ્રેમ ના પ્યાલા રે મારા ગુરૂજી એ પાયા, જોત રે જોતામાં અમને વસ્તુ જડી.....મારા\n\nનાભિકમળ સે સંતો ભયા ઉજીયારા, ત્રિવેણી તખત પર જ્યોત ખડી.................મારા\n\nગગનમંડળ માં વાજા રે વાગે, શુન શિખર પર સુરતા ચડી.............................મારા \n\nકહે રવિસાહેબ સંતો ભાણ પ્રતાપે, ગુરૂ નાં ભજનમાં મારી સુરતા ચડી..............મારા"
  },
  {
    "title": "44. રૂડા રામને સંભારો",
    "slug": "44-ruda-ramne-sambharo",
    "authorSlug": "ravi-saheb",
    "category": "રવિ સાહેબ",
    "sortOrder": 44,
    "lyrics": "રૂડા રામને સંભારો, તારો મટી જાય ઘોર અંધારો\nઘણા જન્મથી ગોથા ખાતો, આવ્યો જીવ દુ:ખીયારો..........................(ટેક)\n\nભવસાગર ની ભુલવણીમાં, સદગુરૂ તે નવ ધાર્યા\nભૂંડા માણસની ભાઈબંધી કરતો, ચરતો અખાજ ચારો........................રૂડાં\n\nસંકટ પડયું ત્યારે હરિ ને સંભાર્યા, હવે મને પાર ઉતારો\nસદગુરૂ એ દાવો છોડી દિધો, ત્યારે જમે કર્યો પડકારો........................રૂડાં\n\nગુરૂ ને ગોવિંદ દોનો રીસાણા, તો ઉગરવાનો ક્યાંથી આવે આરો\nતનમન ધન ગુરૂજીને અર્પણ કિધા, ત્યારે આવ્યો ઉગરવાનો વારો......રૂડાં\n\nગુના હતા તે માફ કર્યા, ત્યારે ગોવિંદ કહે મત મારો\nત્રણ ભુવનમાં તેજ તમારું, માંહી વણજ કરે વણજારો.........................રૂડાં\n\nહાથીનાં મુખમાં  પૂળો હતો, તે સદગુરૂ એ કાઢ્યો બારો\nસદગુરૂનો મહિમા છે મોટો, પ્રિતેથી કારજ સુધારો.............................રૂડાં\n\nજલ પલ સભર ભરીયા, બ્રહ્માંડે વસનારો\nકહે રવિદાસ સત્ત ભાણ પ્રતાપે, બાવન અક્ષર બારો.........................રૂડાં"
  },
  {
    "title": "45. સંતો નિરગુણ કી ગતિ ન્યારી",
    "slug": "45-santo-nirgun-ki-gati-nyari",
    "authorSlug": "ravi-saheb",
    "category": "રવિ સાહેબ",
    "sortOrder": 45,
    "lyrics": "સંતો નિરગુણ કી ગતિ ન્યારી \nસમસ્યા હે સદગુરૂ કી ઐસી, સમજે તો સુખકારી............સંતો\n\nઅડસઠ તિરથ ફરી ઘેર આવે, એહ ઈનુ કે યારી\nપ્રિત વિના પાલવ તજી બેસે, મળે નહીં મોરારી.............સંતો\n\nજોગી જપી તપી સંન્યાસી, રહ્યા સૌ રામ પોકારી\nફળ મીઠા કોઈને હાથ ન આવે, ગયા હૈયામાં હારી.........સંતો\n\nસપ્ત પાતાળ એકવીસ બ્રહ્માંડા, રહ્યા સો રામ પોકારી\nસદગુરૂ નામ પ્રતાપ વિના, આ ભેદ સમજવો ભારી.......સંતો\n\nકહે રવિરામ ગુરૂ ભાણ પ્રતાપે, સુઈ રહ્યો સંસારી\nજગ્યા નર સો જગમાં જીત્યા, પ્રેમ પિયુ ગત્ત ન્યારી.......સંતો"
  },
  {
    "title": "46. સંતો નામ શબ્દ નામ રાજા",
    "slug": "46-santo-nam-shabd-nam-raja",
    "authorSlug": "ravi-saheb",
    "category": "રવિ સાહેબ",
    "sortOrder": 46,
    "lyrics": "સંતો નામ શબ્દ નામ રાજા, મુખ સે કહુ તો કોઈ ન માને\nઆ સર્વે નામકા સાજા, સંતો નામ શબ્દ રાજા.....................(ટેક)\n\nદશ અવતાર લીના સબ નામે, કારણ ભક્તિ કાજા\nએક પલક મેં સબ હી હુવા, જબ મૂળથી ઉઠયા અવાજા.......સંતો\n\nનામ કો પકડે સો પાર પહોંચત હે, ઐસા નામ કા આજા\nકરડી કમાન ચડે એ નામકી, બાજત અનહદ બાજા.............સંતો\n\nરહે માઝા મેં નિરાળા ખેલે, તીન લોક પર હે અવાજા\nનામ ઉસીકા અખંડ નૂર હે, જ્યાં કોટી રવિ ચંદ લાજા..........સંતો\n\nઆવુ ન જાવુ કરૂ ન વ્યવહારા, નહિં રાજા નહિં પરજા\nરવિરામ રમતા રામ કબીરા, જે નહિં મૂવા નહિં સરજા.........સંતો"
  },
  {
    "title": "47. પ્યાલો મેં પીધો રે",
    "slug": "47-pyalo-mem-pidho-re",
    "authorSlug": "ravi-saheb",
    "category": "રવિ સાહેબ",
    "sortOrder": 47,
    "lyrics": "પ્યાલો મેં પીધો રે, લીધો અતિ લગન કરી\nપરિબ્રહ્મ ભાસ્યા રે, અદ્વેત સુભર ભરી........................................(ટેક)\n\nસદગુરૂ એ શ્રવણે રસ રેડયો, ચોંટ્યો હૃદય ની માંય\nસાંધે સાંધે મહારાસ સંચર્યો, ઉનમુની રહ્યો ઠેરાઇ \nસુરતા જેની શુન થઇ રે, પાછી ઉતરે નહિં ફરી..................પ્યાલો\n\nલોભ લાલચ માયા ને મમતા, એવા આવરણ પામ્યા અસ્ત\nનવ પંદર આભાસ અંતરથી ટળ્યા, મટી ગઈ પીડા સમસ્ત\nહવે નજરે ન આવે રે, સદગુરૂ વિના બીજો હરિ................પ્યાલો\n\nગુંગે સાકર ગળી ગળામાં, સમજ સમજ મુસ્કાય\nકહે રવિરામ એ વસ્તુ વિના, કેમ કરી જીવાય\nઘટોઘટ બોલે રે, સ્વાંગ તો અનેક ધરી.............................પ્યાલો"
  },
  {
    "title": "48. મેં વલોભુ ત્યાં કોઈ વલોભે",
    "slug": "48-mem-valobhu-tya-koi-valobhe",
    "authorSlug": "ravi-saheb",
    "category": "રવિ સાહેબ",
    "sortOrder": 48,
    "lyrics": "મેં વલોભુ ત્યાં કોઈ વલોભે, એનાં આવાગમન મટી જાય.....................(ટેક)\n\nસ્થુળ સુકામ કારણ નહિં, મહાકારણ થી ન્યારો\nજાપ અજંપા હું કદી નહિં જગાવું, આ છે ઓહમ સોહમ થી બારો.....મેં વલોભુ\n\nકર્મ કિયા કદી નહિં સાધુ, ભેદ ભાવ સે ન્યારો\nપાંચ તત્વની પાર છે વસ્તુ, ચારેય અવસ્થા થી બારો...................મેં વલોભુ\n\nલખ્યા વિના છે અણલેખા, હું નહિં તું નહિં, તે નહિં\nપાંચ તત્વ ને પડદે બોલે, એબ ગેબ સે ન્યારો.............................મેં વલોભુ\n\nપવન પાર છે નિજ નિરખી લેજો, બ્રહ્મ અગોચર ની માંય\nકહે રવિરામ મેં કેમ સમજાવું, આ વસ્તુ છે વણ જીભે....................મેં વલોભુ"
  },
  {
    "title": "49. આ જુગમાં છે દેહ અભિમાન ઘણુ",
    "slug": "49-aa-jugma-che-deh-abhiman-ghanu",
    "authorSlug": "ravi-saheb",
    "category": "રવિ સાહેબ",
    "sortOrder": 49,
    "lyrics": "આ જુગમાં છે દેહ અભિમાન ઘણુ\nતેણે કરીને ભોગવે ઈ આત્તમ જીવપણુ........................(ટેક)\n\nસાચે મનથી સદગુરૂ સાથે હૈયે ન આણ્યુ હેત\nસંત ને ન નમ્યો હરિને ન ગમ્યો, અંતે થયો ફજેત\nસુખ દુઃખમાં વ્યાપેરે, આનંદ નહિં આવે અણુ.........આ જુગમાં \n\nમારૂ મારૂ કરતો પ્રાણી, ઝાઝુ જતન કરે\nઆ સંસાર સ્વ્પ્ન સરીખો, અર્થ ન એક સરે\nકાંઈ નથી લેતા એ કારણ કબુધ તણું...................આ જુગમાં\n\nતન અભિમાની, મન અભિમાની, વચન અભિમાની કહે\nજુઠુ બોલે જુઠુ રે ચાલે, લાખ ચોરાસી વહે\nભજન હરિનું બેસી ને ન કિધુ એક ક્ષણુ................આ જુગમાં\n\nસત્તશાસ્ત્ર સદગુરૂથી, સમજે ઉપજે સદ્ વિચાર\nઆપ ટળે અભિમાન ગળે, એમ કહે રવિદાસ પુકાર\nથઈ સ્વરૂપે રે રતિ એક રહે ન અણુ.....................આ જુગમાં"
  },
  {
    "title": "50. કોઈ લહંદા રે સત્તશબ્દ કા વિચાર",
    "slug": "50-koi-lahanda-re-sattashabda-ka-vichar",
    "authorSlug": "ravi-saheb",
    "category": "રવિ સાહેબ",
    "sortOrder": 50,
    "lyrics": "કોઈ લહંદા રે સત્તશબ્દ કા વિચાર...............................(ટેક)\n\nમૂળ શબ્દ નાભી થી ઉઠે, ત્રિવેણી રહી બોલે\nશુન મંડળ શબ્દ કા વાસા, ખોળતલ સાધુ ખોલે..............કોઈ\n\nદ્વાદશ આંગળ બાહિર લંબા, ચૌડા હે સર્વ અંગા\nજૈસા દિપક ધર્યા મંદિર મે, વૈસા શબ્દ કા રૂપા...............કોઈ \n\nહલકા હોઈ તે સંત ન માને, ખારા વાકુ કહીએ\nમીઠી સો મરજાદ ગુરૂકી, શ્વાંત બુદ્ધિ એ રહીએ.................કોઈ\n\nઅર્થ ન સૂઝે ઐસા અટપટા, વસે ભારે હોઈ\nઝીણા સો સમજી સંત ભાખે, ઐસા વિરલા કોઈ...............કોઈ\n\nદોઈ કમલ કી અણી અગ્ર પર, રૂપ શબ્દ કા દેખ્યા\nસુરતા શબ્દ માં લિન ભઈ, દિયા કર્મ પર મેખા..............કોઈ\n\nછતે પિંડ જબ સન્મુખ દરશા, દ્વાદશ અંગુલ જબ હી\nબ્રહ્મ ચક્ષુ ભઈ બ્રહ્મ અગન સે, જલી વાસના તબ હી.......કોઈ\n\nસદગુરૂ શબ્દે ભયા ગયા સ્વતંત્ર, ઘર મઠ પર દરશાયા\nકહે રવિરામ પિંડ પડયા તબ, શબ્દ નિરાધાર સમાયા.....કોઈ"
  },
  {
    "title": "51. સોઈ વાત કોઈ જાણે ઝવેરલા",
    "slug": "51-soi-vat-koi-jane-jhaverla",
    "authorSlug": "meram-saheb",
    "category": "મેરામ સાહેબ",
    "sortOrder": 51,
    "lyrics": "સોઈ વાત કોઈ જાણે ઝવેરલા, સુક્ષમ વેદ સુણાવું મેરે દાતા\nસદગુરૂ રામને રિઝાવું રે.....જી…………………………………..….(ટેક)\n\nમન પવન નો મૂળો બાંધી, અગમ ખડકી એ આવું\nખરી ખબર થી એ ખોજુ ખાવિંદને, તે પર લગની લાગવુ.....મેરે દાતા\n\nમૂળ કમળ ને મધ્ય માં લાવું, ઉનમુન ધ્યાન લગાવું\nઈ અટકળ થી જપુ અજંપા, શ્વાસો શ્વાસ સમાવુ....................મેરે દાતા\n\nચલી સુરતા ચડી ગગન પર, અનહદ નાદ સુણાવું\nજલહલ જ્યોતિ જાગી જરૂખે, શ્રુતિ ભ્રમ શહેર જગાવું............મેરે દાતા\n\nઆવન જાવન કા મિટયા અંતરા, એ પરવાના પાવું\nમેરામ સાહેબ સત્ત ગુરૂ ચરણે, નવી નકલમાં ન આવું..........મેરે દાતા"
  },
  {
    "title": "52. મોંઘો મનુષ્ય દેહ ફરી ફરીને",
    "slug": "52-mongho-manushya-deh-fari-farine",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 52,
    "lyrics": "મોંઘો મનુષ્ય દેહ ફરી ફરીને, મળે નહીં વારંવાર\nભાઈ તું ભજી લે ને કિરતાર............................................(ટેક)\nજૂઠી છે કાયા ને જૂઠી છે માયા, જૂઠો કુટુંબ પરિવાર \nરાજા ગોપીચંદ અને ભરથરી, છોડી ગયા ઘરબાર..........ભાઈ તું\nકામ ક્રોધ મદ લોભે મોહમાં, જ્ઞાને જુઓ નથી સાર\nઆ અવસર જો ચુકી ગયા તો, ખાશો જમનાં માર..........ભાઈ તું\nલાખો ગયા ને તુ પણ જવાનો, મૂરખ મનમાં વિચાર \nસાચું કહું છું છતાં જૂઠું માને તો, મુવા કુટુંબને સંભાળ.....ભાઈ તું\nસત્ત ચલણ સદગુરૂની સેવા, સજ્જન નો શણગાર\nદાસ સતાર કહે કર જોડી, હરિ ભજી ઉતરો પાર............ભાઈ તું"
  },
  {
    "title": "53. કોને કહુ દિલડા ની વાતુ",
    "slug": "53-kone-kahu-dilda-ni-vatu",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 53,
    "lyrics": "કોને કહુ દિલડા ની વાતુ, નથી રહેવાતુ, નથી રહેવાતુ\nજેને જેને કહુ તે કહ્યું ન માને\nમૂરખ ગણી ને મને મારે છે લાતુ..........................................નથી રહેવાતુ\nદિલ નાં દરદ તો દરદી દિલ જાણે, વૈદોને નથી સમજાતુ.......નથી રહેવાતુ\nસુગરા મળે તો શાંતિ સ્થાપે, નુગરા પાછળથી કરે છે વાતુ......નથી રહેવાતુ\nકહે સતારદાસ ભજો એક અવિનાશ,\nપ્રભુ ને ભજતા, ભક્તિ કરતા રહે મન રાતુ............................નથી રહેવાતુ"
  },
  {
    "title": "54. શું પૂછો છો મુજને કે હું શું કરું છું",
    "slug": "54-shu-pucho-cho-mujne-ke-hu-shu-karu-chu",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 54,
    "lyrics": "શું પૂછો છો મુજને કે હું શું કરું છું\nમને જ્યાં ગમે ત્યાં હરું છુ ફરું છુ.....(૨)\nન જાવુ ન જાવુ કુમાર્ગે કદાપી, વિચારી વિચારીને પગલાં ભરું છુ...........મને\nકરે કોઈ લાખો બુરાઈ છતાં હું, બુરાઈ ને બદલે ભલાઈ કરું છુ................મને\nનથી બીક કોઈની મને આ જગતમાં, ફક્ત એક મારા પ્રભુ થી ડરૂ છુ.......મને\nછે સાદુ કવન ભક્ત સતાર નુ, કવિ જ્ઞાનીઓને ચરણે ધરું છુ..................મને"
  },
  {
    "title": "55. હરિ ગુણ ગાના ગુરૂ રૂપ કા ઘર ધ્યાના",
    "slug": "55-hari-gun-gana-guru-rup-ka-ghar-dhyana",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 55,
    "lyrics": "હરિ ગુણ ગાના ગુરૂ રૂપ કા ઘર ધ્યાના, હરિગુણ ગાના\nગુરૂ કા ધ્યાન ધરો, બુરે કામો સે ડરો\nપ્રભુ ભજન કરો, સાચા ધન કમાના રે.................હરિગુણ\nગુરૂ ગોવિંદ એક દુબ્જા કો દૂર ફેંક \nજ્ઞાન ચક્ષુ સે દેખ દોનો કા ઠિકાના એક...............હરિગુણ\nનામ સે બનત કામ, ધ્યાન સે મિલત રામ\nવસે વો તો ઠામોઠામ, ચરણો મેં ચિત્ત લાના રે.....હરિગુણ\nપ્રભુ કી માયા જાનો માતા જૈસી માયા માનો\nમતામતિ નહિં તાણો, પ્રેમ સે મનાના..................હરિગુણ\nપ્રભુ કી માયાજાલ, ફસે ઉનકે બુરે હાલ\nશિર પે ભમત કાલ, ફંદે મેં ન આના...................હરિગુણ\nમાયા કો હદ માંહિ, હદ બેહદ સાંઈ\nરંગરૂપ ગુણ નાંહિ, ઐસા હે ઠિકાના રે................હરિગુણ\nદાસ સતાર સાંઈ, ગુરૂ અલખ ગોંસાઈ\nહદ બેહદ માંહી, જાનત હે કોઈ જાના................હરિગુણ"
  },
  {
    "title": "56. હું તો આ ચાલી ભરવાને પાણી",
    "slug": "56-hu-to-aa-chali-bharvane-pani",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 56,
    "lyrics": "હું તો આ ચાલી ભરવાને પાણી, મને બોલાવે સત્તગુરૂ જ્ઞાની\nછોડી પિયરીયું મારે જાવું સાસરીયે, એમાં શરમ મને શાની..................હું તો\nહવે તો પિયુજી વિના ઘડી ન ચાલે, મારી વિતી જાય છે જુવાની..........હું તો\nઈંગલાને પીંગલાનો મારગ છોડી, હું તો સૂક્ષ્મણા માર્ગે જવાની............હું તો\nઉનમુખ કૂવો બેની ગગનમંડળમાં, માંહિ અમૃત ભર્યુ છે પાણી..............હું તો\nઅધર તખત પર મારા ગુરૂજી બિરાજે, એની પૂરી મળી છે એંધાણી......હું તો\nદાસ સતાર ગુરૂ જ્ઞાનીને મળીયા, એ તો વાતો બતાવે છાની છાની......હું તો"
  },
  {
    "title": "57. ચેત સમજ મન પ્રભુ કા ભજન કર",
    "slug": "57-chet-samaj-man-prabhu-ka-bhajan-kar",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 57,
    "lyrics": "ચેત સમજ મન પ્રભુ કા ભજન કર\nભજન કરે સુખ થાય, રામને શીદને ભૂલી જાય..............(ટેક)\nસેવા ભક્તિ કળી કાળમાં, ઉત્તમ ધર્મ ગણાય\nઅનુરાગી થઈ વર્તે જગતમાં, બંધન મુક્તિ થાય............રામ\nઅભિમાને અને અજ્ઞાને બાંધ્યા, તે જ ફસાય\nપ્રભુ સમર્પણ કર્મ કરો શુભ, આનંદ અંગે ન માય...........રામ\nમનુષ્ય દેહ મળ્યો અતિ દુર્લભ, શીદને તું ગભરાય\nરામ ભરોસો રાખ હૃદયમાં, સુખ દુઃખ આવે ને જાય........રામ\nસેવા ભક્તિ પ્રેમ સહિત કર ત્યારે સત્ય જણાય\nદાસ સતાર કહે કરજોડી, સર્વ સ્થળે જગરાય.................રામ"
  },
  {
    "title": "58. ધાર્યું ધણીનું થાય",
    "slug": "58-dharyu-dhaninu-thay",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 58,
    "lyrics": "ધાર્યું ધણીનું થાય, પરંતુ સત્યકર્મ કરતો જા\nસેવક બનીને સેવા કરજે, ધ્યાન ધણીનું ધરતો જા\nતનથી મનથી વચનથી, સાચી સેવા કરજો ભાઈ\nસત્યમેવ જય તે આખિર, તો એમાં શાની નવાઈ\nદયા ધરમમાં નિશદિન રહેજે, નિડર થઈને વિચારતો જા......સેવક\nયોગી તો પોતાનું કરતા, ભક્તો તો દુઃખમાં દુઃખીયા\nસુખ દુઃખમાં સૌના સાથી, પ્રભુ નામમાં સુખીયા\nબે મારગ છે સમજુ શાણા, મન ફાવે તે કરતો જા.................સેવક\nજીવવું તો મરવાનું છોડો. મરવું તો પછી જીવવું શું\nસમજુ શાનમાં સમજી જાશે, જનમ ધરીને કરવું શું\nદાસ સતાર કહે કર જોડી, ભવસાગરને તરતો જા…………....સેવક"
  },
  {
    "title": "59. એવી પ્યાલી પીધી મેં તો",
    "slug": "59-evi-pyali-pidhi-mem-to",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 59,
    "lyrics": "એવી પ્યાલી પીધી મેં તો, સત્તગુરૂનાં હાથે રે\nપિતા મારી પ્રિત બંધાણી, પ્રીતમ ની સાથે રે……….એવી\nપ્રેમ તણી લાગી છે અગ્નિ, પ્રગટી હાડો હાડ રે\nઅણસમજુ અજ્ઞાની મુજને, ગાંડી ગણીને કાઢે રે......એવી\nપ્રેમે મુજને સદગુરૂ મળીયા, સફળ થયો જન્મારો રે\nહું ગાંડી કે દુનિયા ગાંડી, જ્ઞાની આપ વિચારો રે......એવી\nસ્વામિનાં સુખને બેની, પરણેલી સ્ત્રી જાણે રે\nશું સમજે કુંવારી કન્યા, પિયરીયું જ વખાણે રે........એવી\nદાસ સતાર સત્તગુરૂ પ્રતાપે, પરણી મોજું માણે રે\nજોવું હોય જો પિયુનાં સુખને, પરણો વચન પ્રમાણે રે.....એવી"
  },
  {
    "title": "60. ભુલાતી નથી એ સુખી જિંદગીને",
    "slug": "60-bhulati-nathi-e-sukhi-jindagine",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 60,
    "lyrics": "ભુલાતી નથી એ સુખી જિંદગીને\nહંમેશા હતી જ્યાં ખુશી જિંદગીને.....(ટેક)\nસુખી જિંદગી બાળપણમાં ગુજારી\nજુવાની એ કિધી દુઃખી જિંદગીને.........ભુલાતી\nચડી ષડરિપુને ફંદે જવાની\nબગાડે ઉમંગો ભરી જિંદગીને.............ભુલાતી\nમળે વૃદ્ધપણુ ત્યારે પસ્તાવો થાએ\nદુઃખોમાં ગુજારે રડી જિંદગીને............ભુલાતી\nઆ અવનિમાં ઉત્તમ મનુષ્ય દેહ પામી,\nકુમાર્ગે ચડી વેડફી જિંદગીને..............ભુલાતી\nકહે જીવ અજ્ઞાનમાં ભાન ભુલી, \nહજી હું સમજતો નથી જિંદગીને..........ભુલાતી\nવિચારીને જો જિંદગી બંદગી છે,\nમુરખ તું સમજતો નથી જિંદગીને........ભુલાતી\nકર સત્ત સમાગમ તો જીવન સુધરશે\nદુવાઓ મળે છે ભલી જિંદગીને...........ભુલાતી\nકીધો બોધ સત્તારશાહ સદગુરૂએ \nકૃપા મુજ પ્રભુની મળી જિંદગીને.........ભુલાતી"
  },
  {
    "title": "61. સાધુ વો નર હમકો ભાવે",
    "slug": "61-sadhu-vo-nar-hamko-bhave",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 61,
    "lyrics": "સાધુ વો નર હમકો ભાવે\nસુખ ઔર દુઃખમેં આનંદ રહેવે, હરદમ હરિગુણ ગાવે\nપરનારી પરધન કો ત્યાગી, સત્ત કી રોજી ખાવે\nતન મન ધન ઔર વચન સે, કોઈ જીવ કો નાંહિ દુભાવે....સાધુ\nસેવા કરે કોઈ સંત કી તો સાચો રાહ બતાવે\nધર્મ કરતા ધાડ આવે તો હિંમત હારી ન જાવે...................સાધુ\nપરદુઃખ ભંજન હોકર રહેવે, ગુરૂ ગોવિંદ ગુણ ગાવે\nદાસ સતાર ગુરૂ ગોવિંદ મિલકર, કાલ કો માર હટાવે........સાધુ"
  },
  {
    "title": "62. હૃદયમાં વસ્તુ છે અણમોલી",
    "slug": "62-hrudayama-vastu-che-anmoli",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 62,
    "lyrics": "હૃદયમાં વસ્તુ છે અણમોલી\nતારા રે ઘટમાં પિયુજી બિરાજે, જો અંતરપટ ખોલી.........(ટેક)\nસંત સમાગમ નિશ દિન કરીએ, સાંભળીએ શુદ્ધ બોલી\nસજ્જન કેરા સંગ માં ભાઈ, પ્રેમ ની પ્રગટે હોળી.........હૃદયમાં\nસત્ય સમશેર લઈને મારજો ભાઈ, પાંચ પચ્ચીસની ટોળી\nશુદ્ધ શબ્દો સંતો નાં ભાઈ, પીજો ઘોળી ઘોળી..............હૃદયમાં\nગુરૂ કરી ગુરૂ ચરણમાં રહેજો, લેજો શબ્દો ને તોળી\nદાસ સતાર ગુરૂ પ્રતાપે, વાગે જ્ઞાન ની ગોળી............હૃદયમાં"
  },
  {
    "title": "63. જીવન નાં સુર ચાલે",
    "slug": "63-jivan-na-sur-chale",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 63,
    "lyrics": "જીવન નાં સુર ચાલે, છે એક તાર દિલમાં\nભક્તિ કરીને રીઝાવું, મારો છે પ્યાર દિલમાં\nમિથ્યા જગતને જાણું, સત્તબ્રહ્મ એક માનું\nજોયું અસાર જગમાં, સાચો છે સાર દિલમાં........ભક્તિ\nછે પ્રાણથી એ પ્યારો, હું એનો એ છે મારો\nમાને ન માને કોઈ, મારો યાર છે દિલમાં \nનામી છતાં અનામી, છે વિશ્વ વ્યાપી વ્હાલો\nઅજ્ઞાનીઓ શું જાણે, રાખે વિકાર દિલમાં...........ભક્તિ\nઅજ્ઞાન ઉંઘ ત્યાગી, જાગીને જો જણાશે\nખેલે અનેરા ખેલો, એ યાદગાર દિલમાં\nકર બંધ બાહ્ય દ્રષ્ટિ, અંતર તપાસ તારૂ\nજાગીને જો જણાશે, સાચો સિતાર દિલમાં.........ભક્તિ\nસત્ત સેવા પ્રેમ ભક્તિ, સત્તાર નિત્ય સાચુ\nમને એવા વિચાર દેજે, પરવર દિગાર દિલમાં"
  },
  {
    "title": "64. હે એને જાણે કોઈ અનુભવી જ્ઞાની",
    "slug": "64-he-ene-jane-koi-anubhavi-jnani",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 64,
    "lyrics": "હે એને જાણે કોઈ અનુભવી જ્ઞાની, આ જ્ઞાનની વાતો છાની.....(ટેક)\nહે જી વાલીડા મારા, મૂંગે સપનામાં મોજું માણી\nઈ તો સમજે પણ વંદે નહિં વાણી.................આ જ્ઞાન\nહે જી વાલીડા મારા મૂંગો સમસ્યામાં બોલે વાણી\nકોઈ જ્ઞાની એ ગત્ત એની જાણી....................આ જ્ઞાન\nહે જી વાલીડા મારા, જ્ઞાનમાં મોજો મજાની\nએને શું સમજે અભિમાની.............................આ જ્ઞાન\nહે જી વાલીડા મારા કહે સત્તારદાસ ધ્યાની\nતમે શીદ ને કરો છો ખેંચાતાણી................આ જ્ઞાન"
  },
  {
    "title": "65. સબ તિરથ કર આઈ તુંબડીયા",
    "slug": "65-sab-tirath-kar-aai-tumbadiya",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 65,
    "lyrics": "સબ તિરથ કર આઈ તુંબડીયા, સબ તિરથ કર આઈ\nગંગા ન્હાયી, ગોમતી ન્હાયી, અડસઠ તિરથ ધાઈ\nનિત નિત ઉઠ મંદિર મેં આઈ, તો ભી ન ગઈ કડવાઈ......તુંબડીયા\nસત્તગુરૂ સંત કે નજર ચડી જબ અપને પાસ મંગાઈ\nકાટ કુટ કર સાફ બનાઈ,અંદર રાખ મિલાઈ....................તુંબડીયા\nરાખ મિલાકર પાક બનાઈ, તબ તો ગઈ કડવાઈ\nઅમૃત જળ ભર લાઈ તુંબડીયા, સંતન કે મન ભાઈ........તુંબડીયા\nએ બાતા સબ સત્ય સુનાઈ, જૂઠ નહિં હે મેરે ભાઈ\nદાસ સતાર તુંબડીયા, ફિર તો, કરતી ફિરે ઠકુરાઈ..........તુંબડીયા"
  },
  {
    "title": "66. વાણીયા રે એ તો લોભ કરી પસ્તાશે",
    "slug": "66-vaniya-re-e-to-lobh-kari-pastashe",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 66,
    "lyrics": "વાણીયા રે એ તો લોભ કરી પસ્તાશે\nલોભ કરી પસ્તાશે, સમજુને સંતોષે સુખ થાશે...........(ટેક)\nલોભી નું મન થોભે નહિ ને આમ તેમ અથડાશે\nસત્તને ભૂલી લોભમાં ડોલે, નિશ્ચય નરકે જાશે...................\nલોભે લાગ્યો જ્ઞાને ન જાગ્યો, તારૂ રે શું થાશે\nધાઈ ધુતીને ધન ભેળું કીધું, પછી ખાનારાઓ ખાશે..........\nસત્તમારગ સત્ત સંગત છોડે, તારી તે શી ગતિ થાશે\nલોકો તારા અવગુણ ગાશે, માતાપિતા લજવાશે...............\nલોભે હણાયો, લોભે તણાયો, લોભમાં ડૂબી જાશે\nદાસ સતાર કહે કર જોડી, ઓલ્યા નિલોર્ભી તારી જાશે......"
  },
  {
    "title": "67. જહાં મેરે અપને સિવા કુછ નથી",
    "slug": "67-jaha-mere-apne-siva-kuch-nahi",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 67,
    "lyrics": "જહાં મેરે અપને સિવા કુછ નથી, મુજે મેરી મસ્તી કહાં લેકે આઈ\nપતા જબ લગા મેરી હસ્તીકા મુજકો, સિવા મેરે અપને કહી કુછ નાંહી...................\nસભી મેં સભી મેં બડા મેં હી મેં હું, સિવા મેરે અપને કહી કુછ નાંહી\nના સુખ હે ના દુઃખ હે, ના હે શોક કુછ ભી, અજબ હે યે મસ્તી સિવા કુછ નાંહી......\nસાગર યે લહેરે એ તો કલ્પિત હે, કલ્પિત હે જલ કે સિવા કહી કુછ નાંહી\nમેં હું આનંદ પે આનંદ હે મેરા, મસ્તી હી મસ્તી હે, ઓર કુછ ભી નાંહી.................\nબ્રહ્મ હે એ દ્વંદ હે મુજકો હુવા હે, હટાયા જો ઉસકો ખફા કુછ નાંહી\nસતાર પરદા હે દુરી કા હટાકર જો દેખા, બસ એક મેં હું, કહી કુછ નાંહી..............."
  },
  {
    "title": "68. મનકો કર દે મુસલમાન",
    "slug": "68-manko-kar-de-musalman",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 68,
    "lyrics": "મનકો કર દે મુસલમાન, અબ તો યહિ શિખામણ માન.....(ટેક)\nરોઝા રખ લે નમાજ પઢ લે, સાચી રાહ પહેચાન\nઇસ દુનિયા કે અંદર તું તો દો દિન કા મહેમાન\nએક દિન નિકલ જાયેગી જાન.....................................મન કો\nપૈસા હો તો હજ તું કરલે, જકાત પર રખ ધ્યાન\nચેત ચેત ચેતાવું તુજકો, કયું ભુલા હે ભાન\nઆખિર મોત નિદાન………………………………………….....મન કો\nદયા ધર્મ કો ભૂલ નહિં, પાપ મૂલ અભિમાન\nમેં મેં કર માટે ભૂલ હે બંદે, ખોલ જરા તો કાન\nહર કા હરદમ ધર લે ધ્યાન.......................................મન કો\nએબ પરાઈ ક્યા દેખે તું, જાત તેરી પહેચાન\nકોણ બુંદ સે બની આ કાયા, કયું હુઆ અન્જાન\nભાઈ મત કર તું માન ગુમાન…………………………………………....મન કો\nપરાઈ નીંદા કરને સે તો બિગડ જાએગા ઈમાન\nકામ ક્રોધ મદ લોભ મોહ મેં, આન પડે સૈતાન\nફિર તું નહિં રહે ઇન્સાન…………………………………………....મન કો\nમુરીદ બન જા પીર કા પહેલે, શબ્દ પીર કાં માન\nફિર સદગુરૂ કે ચરન મેં જાવે, તબ તો આવે જ્ઞાન\nઇશ્ક કા અજબ બના હે મેદાન…………………………………………......મન કો\nપરનારી સે પ્રિતી મત કર, યહી નર્ક કી ખાણ\nદાસ સતાર કહે કર જોડી, સાચે સબ ફરમાન\nમત બન તું હેવાન………………………………………….....મન કો"
  },
  {
    "title": "69. મેં આપ મેં આપ સમાવું",
    "slug": "69-mem-aap-mem-aap-samavu",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 69,
    "lyrics": "મેં આપ મેં આપ સમાવું, કિસી કે ગુણ ગાઉ\nમેરે સિવાય ઔર ન દૂજો, મેં કિસીકો સમજાઉં....(ટેક)\nમેં નહિં વ્યોમ, નહિં પવન, નહિં અગ્નિ, નહિં પાની, નહિં માટી\nમેરી માયા કી યહી હે રચના, મેં દેખ દેખ મુસ્કાવુ......................મેં\nમેરી માયા જ્યોતિ સ્વરૂપી, રંગ રૂપ ગુણ વાળી\nપાંચ તત્વ ત્રણ ગુણ જગત કા, ખેલ ખેલું ને ખેલાવુ..................મેં\nમેં રંગરૂપ ગુણથી ન્યારો, બોલું બાવન બારો\nમેં અવિનાશી ઘટોઘટ માંથી જ્યોતિ પ્રકાશી\nકાળ મુજકો કભી ન ખાવે, મેં કાળ કો ખાવુ..............................મેં\nજ્ઞાની મુજકો જ્ઞાન સે સમજે, ધ્યાની ધ્યાન સે દેખે\nદાસ સતાર કહે આ મિથ્યા જગત, ભૂલે ઉનકો મેં પાઉ…….......મેં"
  },
  {
    "title": "70. ભજન બિન નર હે જીવન પશુ કે સમાન",
    "slug": "70-bhajan-bin-nar-he-jivan-pashu-ke-saman",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 70,
    "lyrics": "ભજન બિન નર હે જીવન પશુ કે સમાન, જેસે ફિરત હે ઢોર હરાયો\nખાત ફિરત હે ઘાસ પરાયો, અપને ધણી કા નામ લજાયો, મૂંઢ મુરખ મસ્તાન\nકોલ વચન દેકર બહાર આયો, આકર લોભ મેં ચિત્ત લગાયો\nધિક ધિક હરિ કા ગુણ ન ગાયો, બે વચની નાદાન...............ભજન\nઅજ્ઞાની ક્યા ફલ કો પાવે, તેરી મેરી મેં જનમ ગુમાવે\nહિરલા હાથ ફિર કહાં સે આવે, નિકલ ગયો જબ પ્રાણ..........ભજન\nપ્રેમ સે હરિ કા જે ગુણ ગાવે, જ્ઞાની હોકર ધ્યાન લગાવે\nદાસ સતાર વોહી ફલ પાવે, જો ભજતે હે ભગવાન..............ભજન"
  },
  {
    "title": "71. ભજન કરી લેને ઓ ગુણીયલ જ્ઞાની",
    "slug": "71-bhajan-kari-lene-o-guniyal-jnani",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 71,
    "lyrics": "ભજન કરી લેને ઓ ગુણીયલ જ્ઞાની, જો જે જાતી રહેશે આ જુવાની\nભજને નામ પ્રભુનુ પ્યારૂ, ભક્તિ વિના દિસે અંધારૂ, સાચુ માની લેને કહ્યું મારૂ......................\nસમજુ શાનમાં સમજી જાશે, મૂરખ હોય તે ગોથા ખાશે, અંતે તેની ફજેતી થાશે.....................\nઆવ્યું હરિ ભજવાનું ટાણું, ગાને પ્રભુ નામનું ગાણુ, સાથે બાંધી લે સાચુ એ નાણુ………………\nમૂરખા મનમાં બહુ મલકાય, ધનને દેખીને છલકાય, અંતે ખાલી હાથ તે જાય.......................\nતું તો શેઠનો છે વાણોત્તર, તારા શેઠ છે શ્રી પરમેશ્વર, ભક્તિ કરવા રાખ્યો છે તને નોકર……..\nકમાણી એવી કરીને જઈએ, માંગે હિસાબ તો પુરો દઈએ, ત્યારે શેઠનાં વ્હાલા થઈએ………….\n ભાઈ શાનમાં સમજી જાવું, નિત્ય હરિનાં ગુણને ગાવું, તારે દૂરનાં દેશે છે જાવું.....................\nભક્તિ જે કોઈ કરશે ભાવે, તેનાં જનમ મરણ મટી જાવે, સતાર સત્ય કહી સમજાવે…………..."
  },
  {
    "title": "72. મૂરખ મન ગુરૂ વિના ગમ નહિં પડે",
    "slug": "72-murakh-man-guru-vina-gam-nahim-pade",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 72,
    "lyrics": "મૂરખ મન ગુરૂ વિના ગમ નહિં પડે, ગુરૂ કરો તો તમને જ્ઞાન બતાવે\nત્યારે મુક્તિનો મારગ જડે.......મૂરખ\nનુગરા રહીને તમે ભજન કરો તો, બેડલી અધવચ ડૂબે\nગુરૂ કરો તો ભવપાર ઉતારે, ત્યારે સુરતા ગગને ચડે.......મૂરખ\nભજન કરે પણ ભેદ ન જાણે, નાહક મૂરખા લડે\nકહેણી કહે પણ રહેણી વિના, આ કાચી કાયા સડે.......મૂરખ\nસહુ કુતરાઓ જેમ ભેગા મળીને, હું હું કહીને રડે\nતેમનાં રડવાથી કાંઈ દયા નહિં ઉપજે, એ જ્યાં જાય ત્યાં થાય હડે......મૂરખ\nસુગરા નર સંતોષી હોય, નુગરા નર બડબડે\nદાસ સતાર ગુરૂ સાચા મળે તો, ભક્તિનો રંગ ભલો ચડે......મૂરખ"
  },
  {
    "title": "73. જ્ઞાની ગુરૂ મળીયા રે",
    "slug": "73-jnani-guru-maliya-re",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 73,
    "lyrics": "જ્ઞાની ગુરૂ મળીયા રે, ગોળી તો મારી જ્ઞાન તણી\nકંચન કાયા કિધી રે, ગુરૂ તો મારા પારસમણી......(ટેક)\nહું તો જન્મની આંધળી, મને ગુરૂએ આપી આંખ\nગુરૂ ચરણનું અંજન આંજ્યું, તો મટી ગઈ સહુ ઝાંખ\nઆંખો ખોલી જોયું રે, ઘટોઘટમાં બેઠો અલખધણી.....જ્ઞાની\nગુરૂનાં ગુણને હું શું ગાવું, એ ગુણનો ન આવે પાર\nગુરૂ તો મારા આંખની જ્યોતિ, ગુરૂ હૃદયનાં હાર\nગુરૂ દયાળુ દેવા રે, ગુરૂકૃપા તો ઘણી રે ઘણી.....જ્ઞાની\nતન મન ધન સદગુરૂને અર્પણ, હું તો ગુરૂનો દાસ \nગુરૂ ગરીબ નિવાજે અમારા, પુરે ગરીબોની આશ\nગુરૂ ચરણમાં રહેવું રે, ગુરૂ તો મારા ધીંગા ધણી.......જ્ઞાની\nગુરૂનાં દર્શન કરતા નિશદિન, અડસઠ તિરથ થાય\nદાસ સતાર ગુરૂની સેવા કરતા, હરખ ન સમાય\nગુરૂ અમારા પ્રેમી રે, પીધી છે પ્યાલી પ્રેમ તણી......જ્ઞાની"
  },
  {
    "title": "74. આ અવસર છે રામ ભજનનો",
    "slug": "74-aa-avasar-che-ram-bhajanno",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 74,
    "lyrics": "આ અવસર છે રામ ભજનનો, કોડી નવ બેસે દામ....ભજી લે\nકામ ક્રોધ મદ લોભ મોહને મૂકી દે, મનથી તમામ.....ભજી લે\nમાત પિતા સુત બાંધવ તારા કોઈ ન આવે કામ.....ભજી લે\nઅંધ થઈને  અથડામાં, ઘટ ઘટ સુંદર શ્યામ.....ભજી લે\nદાસ સતાર કહે કરજોડી, સહુ સંતોને પ્રણામ.....ભજી લે"
  },
  {
    "title": "75. સદગુરૂ જેનાં સાચા રે",
    "slug": "75-sadguru-jena-sacha-re",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 75,
    "lyrics": "સદગુરૂ જેનાં સાચા રે, એ તો સહુને સરખા ગણે\nસાચી તેની વાચા રે, મુખથી જૂઠું નહીં તો ભણે .....(ટેક)\nકોઈ બ્રાહ્મણ કોઈ વાણીયા, કોઈ સૈયદ કોઈ શેખ\nજ્ઞાન કરીને જોઈ લ્યો ભાઈ, આત્મા સહુનો એક\nનાત પડી ગઈ જુદી રે, પણ માતા સહુને સરખા જણે.....એવાં\nજ્યાંથી હિંદુ આવ્યા, ત્યાંથી આવ્યા મુસલમાન \nત્યાંથી પારસી ત્યાંથી યહુદી, ત્યાંથી કિરસ્તાન\nઅજ્ઞાની ને મન જુદા રે, પણ જ્ઞાની સહુ ને સરખા ગણે......એવાં\nમહેતાજી એ પહેલા શીખવ્યુ, એકડે એક તો એક\nબગડે બે થી બગડી જઈને, એક નાં બન્યા અનેક\nએક પ્રભુ છે જાણો રે તમે, ભક્તિ કરો શાંત પણે.....એવાં\nવટાલ શબ્દનો અર્થ ન જાણે, ને કહે વટલી જઈશુ ભાઈ\nબ્રાહ્મણને ઘેર ભંગી વટલાઈ, એ તો કેવી નવાઈ\nભેદ એનો છે ઉંડો રે, એ રસ્તો છે ભાઈ દૂર ઘણો.....એવાં\nબાપીકો માર્ગ કેમ છૂટે એમ, મુખથી સહુ કોઈ ગાય\nબાપ અર્થનો અનર્થ કરીને, અજ્ઞાને અથડાય\nજ્ઞાની મુક્તિ પામે રે, અજ્ઞાની ભૂલો થઈને ભમે....એવાં\nકડવું ઓષડ રોગને કાપે, એમ અજ્ઞાનને કાપે જ્ઞાન\nદાસ સતાર તો સાચુ કહે છે, સમજો ચતુર સુજાણ\nકાયર થઈ શું બેઠા રે, શુરવીર થઈને આવો રણે.....એવાં"
  },
  {
    "title": "76. નર ઉત્તમ થઈને નીચ કર્મ ન છોડયા",
    "slug": "76-nar-uttam-thaine-nich-karm-na-chodya",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 76,
    "lyrics": "નર ઉત્તમ થઈને નીચ કર્મ ન છોડયા, ધિક જન્મ ધર્યો નામ માત તાતનાં બોળ્યા\nઘણાં સ્વાર્થી જનો એ, સ્વાર્થ પ્રમાણો જોડયા, મૂળ તત્વ તજી મમતામાં માથા ફોડયા\nશું થયુ વિષયમાં લાખો શસ્ત્રોને ઘોળ્યા, એલા તત્વમસી ૐ બ્રહ્માસ્મિ ન ખોળ્યા......\nબની અંધ વિષયમાં અજ્ઞાની જન ભમતા, છોડી સત્યકર્મને અસત્યમાં જઈ રમતા\nજુઓ કામક્રોધ શેતાન ભક્તોને દમતા, બની બગલા ભગત એ વિષય માછલા જમતા\nશું થયુ વિષયમાં લાખો શસ્ત્રોને ઘોળ્યા, એલા તત્વમસી ૐ બ્રહ્માસ્મિ ન ખોળ્યા......\nભજો ભયભંજન ભગવાન પ્રભુ સુખદાઈ, ત્યજો કામ ક્રોધ મદ લોભ મોહ દુઃખદાઈ\nભજો સગુણ નિર્ગુણ નાથ મૂકી  દયો ભવાઈ, દાસ સતાર નહિં તો પડશો નર્કની માંહી\nશું થયુ વિષયમાં લાખો શસ્ત્રોને ઘોળ્યા, એલા તત્વમસી ૐ બ્રહ્માસ્મિ ન ખોળ્યા......"
  },
  {
    "title": "77. જમડે સે મેં ખૂબ લડુંગા",
    "slug": "77-jamade-se-mem-khub-ladunga",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 77,
    "lyrics": "જમડે સે મેં ખૂબ લડુંગા, હરિભજન કો ગાવુગા\nમરને સે પહેલે મેં મરજાવું, ઔર અમર હો જાવુગા....(ટેક)\nપ્રેમ પલીતા શબ્દ કા ગોલા, સત્ત કી તોપ બનાવુગા\nરહેણી કે ગઢ પર ખડા રહુગા, કાલ કોટ ઉડાવુગા......જમડે\nપાંચ કો માર પચ્ચીસકો બાંધુ, જ્ઞાન ગુરૂ કા જગાવુગા\nઅમર નગર કા હું મેં વાસી, જમકો ખૂબ ડરાવુગા......જમડે\nનુરત સુરત કા ઘોડા છોડુ, ગગનમંડળ મેં ઘુમાવુગા\nઓહમ સોહમ કા જાપ જપુગા, અનહદ તૂર બજાવુગા....જમડે\nસ્વર્ગ ભુવન કા હુ સહેલાણી, મન મહારાજ બન આવુગા\nદાસ સતાર સદગુરૂ દાતા કા જગ મેં દાસ કહાવુગા......જમડે"
  },
  {
    "title": "78. મેને ઢૂંઢા અપના શરીર",
    "slug": "78-mene-dhundha-apna-sharir",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 78,
    "lyrics": "મેને ઢૂંઢા અપના શરીર,  વામે પાયા અલખ અમીર\nભાઈ મેં તો બની ગયા રે ફકીર જી....(ટેક)\nજન્મો જનમ કા મેલ ચડિયા, ધોબી મળીયા પીર રે\nધર્મ ઘાટ પે દે પછાડા, ન્હાયા નિર્મળ નીર.....ભાઈ\nઅલ્લાહ કા જાપ જપીયા, તબ તો આઈ ધિર રે\nસુરતા નુરતા એક કિધી, હુવા મનવા સ્થિર....ભાઈ\nબીના બાદલ એક બિજલી ચમકે, ઝરમર વરસે નીર રે \nઅનહદ નોબત બાજે નિશદિન, જ્ઞાન ઘર હે ગંભીર......ભાઈ\nસુરતા શુન મેં આઈ ઠહરી, અવઘટ ઘાટ કે તીર રે\nતનકો તોડા મનકો જોડા, કંચન હુવા હે શરીર.....ભાઈ\nડુંગર ચડીયા દેખી મઢીયા, ભયા મેં શુરવીર રે\nદાસ સતાર ગુરૂકૃપા સે, અમર હુઈ જાગીર....ભાઈ"
  },
  {
    "title": "79. જો આનંદ સંત ફકીર કરે",
    "slug": "79-jo-anand-sant-fakir-kare",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 79,
    "lyrics": "જો આનંદ સંત ફકીર કરે, વો આનંદ નાહીં અમીરી મેં\nસુખ દુઃખ મેં સમતા સાધ રહે, તો કુછ ખૌફ નહિં જાગીરી મેં......(ટેક)\nહર રંગ મેં સેવક રૂપ રહે, અમૃત જલકા જ્યું કૂપ રહે\nસત્ત કર્મ કરે ઔર ચૂપ રહે, ભલે છાવ મિલે યા ધૂપ રહે\nનિસ્પૃહી બને જગમેં વિચરે , ઔર રહેવે ઘીર ગંભીરીમેં.....જો આનંદ\nજગતારણ કારણ દેહ ધરે, સત્ત સેવા કરે જગ પાપ હરે\nજિજ્ઞાસુ કે ઘટમેં જ્ઞાન ભરે, સત્તવાણી સદા મુખ સે ઉચરે\nવાસના કો વશકર રંગ મેં રમે, ઔર રહેવે સદા શૂરવીરી મેં....જો આનંદ\nસત્ત બોધ જગત મેં આય કહે, સત્ત મારગ કો દિખલાય કહે\nગુરૂ જ્ઞાન સે પદ એ ગાય કહે, સતાર શબ્દ સમજાય કહે.......જો આનંદ"
  },
  {
    "title": "80. બિગડે સો બન જાવે સમજકર",
    "slug": "80-bigade-so-ban-jave-samajkar",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 80,
    "lyrics": "બિગડે સો બન જાવે સમજકર, બિગડે સો બન જાવે....(ટેક)\nહમ બિગડે તુમ બિગડો, ભાઈ સતગુરૂ સત્ત સમજાવે\nસમજે બિના બિગડે જો કોઈ, આખર ધૂલ કો પાવે....સમજકર\nનીતી રીતી સે જબ દૂધ બિગડે, દહીં હોકર રહ જાવે\nદહીં પર સાચી મહેનત હો તો માખણ ઝટ તીર આવે.....સમજકર\nઆગ લાગે માખણ કે નીચે, તબ વો ઘી હો જાવે\nદાસ સતાર કહે સમજાકર, સમજુ કો સમજાવે.......સમજકર"
  },
  {
    "title": "81. કળીયુગ મેં કહેણી કે બહોત મજૂર",
    "slug": "81-kaliyug-mem-kaheni-ke-bahot-majur",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 81,
    "lyrics": "કળીયુગ મેં કહેણી કે બહોત મજૂર, માલૂમ નહિ રહેણી બીના ઘર દૂર......(ટેક)\nશૂરવીર હોય તો સન્મુખ લડે, ને કાયર ભાગે દૂર\nપ્રેમ પ્યાલા કોઈ મરજીવા પીવે, નિત રહે ચકચૂર.....કળીયુગ\nકામ ક્રોધ મદ લોભ મોહકે, નામ પે ડાલ દે ધૂલ\nપાંચ કો માર પચ્ચીસ કો વશકર, તો મુખ પર વર્ષે નૂર.....કળીયુગ\nયે રે હંસા કે ક્યા હે ભરોસા, ઉડ જાવે જ્યું કપૂર\nદાસ સતાર ભજો ભય ભંજન, સાહેબ હાલ હજુર.....કળીયુગ"
  },
  {
    "title": "82. હરદમ રામ ચરણ લવ લીના",
    "slug": "82-hardam-ram-charan-lav-lina",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 82,
    "lyrics": "હરદમ રામ ચરણ લવ લીના, રહે કોઈ સંત સોહાગી પ્રવિણ.....(ટેક)\nદાસન કા જો દાસ બને ઔર બનકર રહેવે દીન\nનામ પ્રતાપ કટે ભાવ બંધન, પાપ હોવે સબ ક્ષીણ......હરદમ\nનામ સમર ધર ધ્યાન પ્રભુ કા, મેં મેં કો મત ગીન\nહરદમ તુંહી તુંહી ભજ લે મનવા, સત્ય સ્વરૂપ કો ચીન.....હરદમ\nઅસાર યે સંસાર હે, ઇસ મેં જરા મેષ નહિ મીન\nદાસ સતાર બજાવે પ્રેમ સે, સોહં સોહં કી બિન....હરદમ"
  },
  {
    "title": "83. ડરના પ્રભુ સે લડના નથી જગમેં",
    "slug": "83-darna-prabhu-se-ladna-nahi-jagmem",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 83,
    "lyrics": "ડરના પ્રભુ સે લડના નહિ જગમેં, સબસે હિલમિલ રહેના\nબન શકે તો નેકી કરના, સંત સેવા કર લેના.......(ટેક)\nકર લેના સત્તસંગ ખુશી સે, સુખ દુઃખ આપે તો સહેના\nદાન ધરમ ઔર ભક્તિ કર લે, સાહેબ નામ સુમરના......ડરના\nમાત પિતા ઔર કુટુંબ કબીલા, સબ કી સેવા કરના\nદાસ સતાર કહે કર જોડી, આખર તો હે મરના.....ડરના"
  },
  {
    "title": "84. જોતા જણાયુ શાંતિ સંતોષમાં મળે છે",
    "slug": "84-jota-janayu-shanti-santoshma-male-che",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 84,
    "lyrics": "જોતા જણાયુ શાંતિ સંતોષમાં મળે છે \nસંતોષી જન સુખી છે, તૃષ્ણા એ શું વળે છે......\nકુદરત નો કાયદો એ છે જે વાવશો તે લણશો\nજવ વાવે જવ મળે છે, ઘઉ વાવે ઘઉ ફળે છે.......\nસ્વાર્થી કે પક્ષ પાતી, કરતા કુસંપ કલેશો\nજ્ઞાની ને પ્રેમી ભક્તો, સહુમાં હળે મળે છે.......\nસત્ત કર્મ કર ઓ ભાઈ, દુનિયામાં કર ભલાઈ\nટૂંકા જીવનમાં માનવ, દુનિયામાં શું છળે છે......\nસતાર શાહ સમજો, કુદરતનાં ખેલ ન્યારા\nલખ્યા લલાટે લેખો, ટાળ્યા ન એ ટળે છે....."
  },
  {
    "title": "85. બેવફા દિલને પ્યાર કોણ કરે",
    "slug": "85-bevafa-dilne-pyar-kon-kare",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 85,
    "lyrics": "બેવફા દિલને પ્યાર કોણ કરે, માથે દુશ્મન હજાર કોણ કરે\nએવાં ખોટા વિચાર કોણ કરે, જિંદગાનીને ખુવાર કોણ કરે.....(ટેક)\nતું છે માયા મહાન મતવાલી, વળી નયને ભરેલી છે લાલી\nતારા વચનો જણાય છે ખાલી, તારી સાથે કરાર કોણ કરે.....બેવફા\nજૂઠી માયાનાં રંગ છે જૂઠા, જૂઠા તારા તરંગ છે  જૂઠા\nપ્રભુ વિના તારા સંગ છે જૂઠા,  જૂઠાનો ઈતબાર કોણ કરે....બેવફા\nનેમી જીવો છે સ્વર્ગ નાં પ્યાસી, વહેમી જીવો છે નર્ક નાં વાસી\nપ્રેમીઓ દર્શન નાં અભિલાષી, છોડી રોકડ ઉધાર કોણ કરે.....બેવફા\nકિધી પરવર દિગારથી યારી, કહે સત્તારશાહ લલકારી\nગુરૂ પ્રભુ વિના નૌકા મારી, ભવસાગરથી પાર કોણ કરે.....બેવફા"
  },
  {
    "title": "86. બંદગી વિણ જીવન જીવ્યા",
    "slug": "86-bandagi-vin-jivan-jivya",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 86,
    "lyrics": "બંદગી વિણ જીવન જીવ્યા, જિંદગી ખાલી ગઈ\nઆ જરા આવી જુવાની, હાથ તાળી દઈ ચાલી ગઈ\nનયન ઝાંખા થઈ ગયાને, મુખ તણી લાલી ગઈ\nવાદળી આકાશમાં આવીને ચાલી ગઈ.......(ટેક)\nવિશ્વમાં ઉત્તમ મનુષ્ય દેહ દુર્લભ પામીને\nએ છતાં હે મૂરખ તે જાણ્યા નહિં અંતર્યામીને\nમૃત્યુ એ આવી પછાડયો, મસ્તી મતવાલી ગઈ.....વાદળી\nપુત્ર વ્હાલો પત્ની વ્હાલી, સ્વાર્થમાં ગુલતાન છે\nહું ને મમતામાં ડૂલે છે, છતાં કયાં ભાન છે\nકાળે ઝાલી ચોટલી તારી, કયાં વ્હાલો ને વ્હાલી ગઈ.....વાદળી\nસરસો રહી સંસારમાં, મન રાખ પ્રભુની પાસમાં\nસત્તારશાહ સમજી જુઓ, ઉદ્ધાર છે વિશ્વાસમાં\nનહિં તો જાણો જિંદગી જીવ્યા છતાં ખાલી ગઈ.....વાદળી"
  },
  {
    "title": "87. પ્રેમ કેરા દર્દનાં દર્દી દવા લેતા નથી",
    "slug": "87-prem-kera-dardna-dardi-dava-leta-nathi",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 87,
    "lyrics": "પ્રેમ કેરા દર્દનાં દર્દી દવા લેતા નથી\nદર્દ દિલને પ્રેમીઓ ઓછું થવા દેતાં નથી\nપ્રેમીઓ વિના વ્હેમીઓ દુઃખ દર્દોના ઘા સહેતા નથી\nતો પછી જાઓ અમે દિલની કથા કહેતાં નથી.....(ટેક)\nપ્રેમ સાચો માર્ગ છે, સમજીને પ્રેમી જાય છે\nપ્રેમ કેરા વમળમાં વ્હેમીજનો અટવાય છે\nવ્હેમીઓ શુદ્ધ પ્રેમમાં બંધાયેલા રહેતા નથી.....તો પછી\nપ્રેમ પંથે ચાલતા પ્રેમીઓ હજારો થઈ ગયા\nવ્હેમમાં ભૂલા પડેલા જ્યાં હતા ત્યાં રહી ગયા\nવ્હેમીઓ શુદ્ધ પ્રેમની મોંઘી મજા લેતા નથી.......તો પછી\nશું કહુ, કોને જઈને પ્રેમની વાતો કરૂ\nમનની મનમાં રાખીને હું, પ્રેમમાં ઘેલો ફરૂ\nપ્રેમનાં ભેદો કહેવા સનમ રાજા  દેતાં નથી.... તો પછી\nવ્હેમ હારી જાય છે, ત્યાં પ્રેમી નો જયકાર છે\nજોઈ લ્યો સત્તારશાહ પ્રેમીનો બેડો પાર છે\nવ્હેમીઓને દર્શ પણ એ દિલરૂબા દેતાં નથી.....તો પછી"
  },
  {
    "title": "88. વ્હેમ ભૂલી પ્રેમમાં ભરપૂર થાતો જાવ છું",
    "slug": "88-vhem-bhuli-premma-bharpuri-thato-jav-chu",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 88,
    "lyrics": "વ્હેમ ભૂલી પ્રેમમાં ભરપૂર થાતો જાવ છું\nસત્ય અહિંસક શસ્ત્રધારી, શૂર થાતો જાવ છું\nપ્રેમ પંથે ચાલતા આતમ બને પરમાત્મા\nએ વિચારે વહેમથી હું દૂર થાતો જાવ છું\nપ્રેમ મય થઈને પ્રભુ નાં નામની માળા જપુ\nભક્તનાં ઉપનામથી મશહૂર થાતો જાવ છું \nએક સત્તનાં નૂરથી, આ વિશ્વની છે ઉત્પતિ\nનુરમાં લય થાવ છુ ને નુર થાતો જાવ છું\nછે અમી મય આંખડી સતગુરૂની સત્તારશાહ\nએમની નજરોમાં હું મંજૂર થાતો જાવ છું"
  },
  {
    "title": "89. હૃદયમાં જો તપાસીને છુપાયેલો ખજાનો છે",
    "slug": "89-hrudayama-jo-tapasine-chupayelo-khajano-che",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 89,
    "lyrics": "હૃદયમાં જો તપાસીને છુપાયેલો ખજાનો છે\nલઈ લે સદગુરૂથી જ્ઞાન, એનો ભેદ શાનો છે\nપ્રભુ છે કોણ ને તું કોણ છે, જ્ઞાને વિચારી જો\nહતો તું ક્યાં, વળી આવ્યો છે ક્યાં ને પાછો ક્યાં જવાનો છે\nહજી છે બાજી હાથમાં, ઓ જીવડા જો જરા જાગી\nધરીને ધ્યાન ઘટમાં જો, મળ્યો અવસર મજાનો છે\nકળીનો દોર ચાલે છે જગતમાં, જામે નાસ્તિકતા\nઅનેરા કાલનો આરંભ, દુનિયામાં થવાનો છે\nગુરૂથી જ્ઞાન લઈ, સત્ત ભેદ ને સત્તારશાહ સમજો\nમનુષ્ય દેહ મળ્યો મોંઘો, અનુભવ પામવાનો છે"
  },
  {
    "title": "90. જિંદગાની હું ગુજારું",
    "slug": "90-jindagani-hu-gujaru",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 90,
    "lyrics": "જિંદગાની હું ગુજારું, પ્રેમના વેપાર પર\nપ્રેમ હુંડી મેં લખી છે, સદગુરૂ સરકાર પર\nજીવ તન મન પ્રેમની કિંમતમાં મેં અર્પણ કર્યા\nહાટની વસ્તુ નથી, વેચાય જે કલદાર પર\nપ્રેમ પંથે ચાલવું કે ખેલવું સહેલું નથી\nખેલવું ખુલ્લા પગે જેમ ખાંડા કેરી ધાર પર\nપ્રેમમાં જોયું તપાસી માર સાથે પ્યાર છે\nપ્યાર પણ આવી મળે, કુરબાન એવાં માર પર\nજીવતા જીવત કાઢી મારી આશા રહી ગઈ\nફુલડા શાને ચડાવો ખાક નાં અંબાર પર\nમાનુ છું પ્રારબ્ધ પણ પુરૂષાર્થ હું મૂકું નહિં\nઆળસુ શીદને બનુ, પ્રારબ્ધ નાં આધાર પર\nહું નથી શાયર કે કવિ, ન જાણુ પિંગલ કાયદા\nદિલની ઉર્મિ એ લખાવી છે ગઝલ શણગાર પર\nપ્રેમનાં પાઠો ભણી સત્તારશાહ શું શું લવે\nહું દિવાનો થઈ ગયો છુ, યારનાં દિદાર પર"
  },
  {
    "title": "91. ધર્મનાં નામે જુઓ જગતમાં ધતીંગો થાય છે",
    "slug": "91-dharmana-name-juo-jagatma-dhatingo-thay-che",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 91,
    "lyrics": "ધર્મનાં નામે જુઓ જગતમાં ધતીંગો થાય છે\nઆ કળીયુગમાં પ્રપંચી ઢોંગી ફાવી જાય છે\nસાચાને સમજ્યા વિના સન્માન જૂઠાને મળે\nથાય છે સતિયા દુઃખી, પાંખડીઓ પૂજાય છે\nપાંદડુ હલે નહિં જગદિશની આજ્ઞા વિના\nહું કરૂ આ મેં કર્યું મિથ્યા મનુષ્ય ફુલાય છે\nહું ને મમતાને ત્યાગી સેવા ભક્તિ કર સદા \nનિત્ય પર ઉપકાર કર એમાં જ સાચો ન્યાય છે\nનમ્ર થઈ યાચુ છું દે સત્ત સેવા ભક્તિ 'હે સતાર'\nમુજ હૃદયમાં ભાવનાઓ કઈ કઈ જાગી જાય છે"
  },
  {
    "title": "92. એવાં રસીલા નયન વિણ બીજે હૃદય ઘવાય ક્યાં",
    "slug": "92-eva-rasila-nayan-vin-bije-hruday-ghavay-kya",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 92,
    "lyrics": "એવાં રસીલા નયન વિણ બીજે હૃદય ઘવાય ક્યાં\nઋણી બનીને આપના, બીજે હવે જવાય ક્યાં\nજો જો અમારી પ્રિતડી અંત સુધી નિભાવજો\nદ્વાર તમારૂ છોડીને દિવાના દિલડા જાય ક્યાં\nપ્યાસી તમારા પ્રેમનાં આવી ઉભા છે બારણે\nપ્રેમ સુરા વિણ હે સનમ, પ્યાસી હૃદય ધરાય ક્યાં\nતારો હૃદયમાં વાસ છે, સર્વ સ્થળે પ્રકાશ છે\nગેબી અવાજો થાય કે દ્વારે દ્વારે અથડાય ક્યાં\nજોયુ જગે ફરી ફરી પાસે મળ્યા છો શ્રી હરી\nજ્ઞાની ગુરૂ મળ્યા વિના સતાર યોગ થાય ક્યાં"
  },
  {
    "title": "93. જણાશે અનેરી અદાઓ કદી તો",
    "slug": "93-janashe-aneri-adao-kadi-to",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 93,
    "lyrics": "જણાશે અનેરી અદાઓ કદી તો, થાશે માફ મારી ખતાઓ કદી તો\nહજારો નિરાશામાં આશા રહી છે, થશે દૂર એ આપદાઓ કદી તો\nદુઃખી દિલને દયો દિલાસો પ્રભુ, રડાવો હંમેશા હસાવો કદી તો\nજફા છો કરે એ વફાદાર હું છું, ફળીને જ રહેશે વફાઓ કદી તો\nભરોસો હૃદયમાં છે સતાર મારા, હે મંજુર થાશે દુવાઓ કદી તો"
  },
  {
    "title": "94. વિશ્વ વ્યાપી છે છતાં સંતાય છે",
    "slug": "94-vishwa-vyapi-che-chata-santay-che",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 94,
    "lyrics": "વિશ્વ વ્યાપી છે છતાં સંતાય છે, એ સનમ શરમાળ છે શરમાય છે\nઆશિકોનાં દિલમાં લાગી લાહય છે, નેવાનાં જળ મોભે જઈ ઉભરાય છે\nદેખીને બળતુ હૃદય બોલ્યા સનમ, છો બળે એ મોજ મારી થાય છે\nજિંદગી કુરબાન કરવા પ્રેમમાં, પ્રેમી જીવો પ્રેમ પંથે ધાય છે\nપ્રેમ વિણ મન મોહનાં ફંદે ફસી, દામમાં કે કામમાં લલચાય છે\nકોઈ રડતા કોઈ હસતા જાય છે, જેવા જેના કર્મ તેવો તેનો ન્યાય છે\nસતગુરૂ કર સત અનુભવ પામવા, મન સુખી ઉંચે ચડી પછડાય છે\nઆશિકો પહેલા રડે પાછળ હસે, સાંભળો છો શું કહ્યું, સમજાય છે\nઆશિકો વિના બીજાઓ સત્તારશાહ, કોણ દુનિયાથી હસીને જાય છે."
  },
  {
    "title": "95. ન મતલબ પર અરે નર મર તું ભક્તિ કર",
    "slug": "95-na-matlab-par-are-nar-mar-tu-bhakti-kar",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 95,
    "lyrics": "ન મતલબ પર અરે નર મર તું ભક્તિ કર તું ભક્તિ કર\nઉમ્મીદો થશે તારી પૂરી, તું ભક્તિ કર તું ભક્તિ કર\nજશે ઘોડા અને ગાડી, વજીફા વિત્તને વાડી\nધરી દિલમાં પ્રભુનો ડર તું........ભક્તિ\nઅરે છે કાચની કાયા, જવું પડશે ત્યજી માયા\nન કાયમનું સમજ આ ઘર તું......ભક્તિ\nભરી ભંડાર શું કરશે, પછી ભવપાર કેમ તરશે\nન ત્રિજોરી માર્ગ કર તું......ભક્તિ\nબધા ધન માલને મેલી, તું ભક્તિમાં જીગર જોડી\nથશે કાલે ખલાસ ઉમર તું.......ભક્તિ\nભક્તિ છે સ્વર્ગની સાથી, વધુ શું ઈચ્છે છે આથી\nજરા સમજી જાને દિલબર તું.....ભક્તિ\nસતાર સાચું કહે છે કે સદા ભક્તિમાં મશગૂલ રહે\nનહિં તો તું ગણાશે ખર તું.....ભક્તિ"
  },
  {
    "title": "96. અમને અડશોમા અભડાશો પછી ક્યાં ન્હાવાને જશો",
    "slug": "96-amne-adshoma-abhdasho-pachi-kya-nhavane-jasho",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 96,
    "lyrics": "અમને અડશોમા અભડાશો પછી ક્યાં ન્હાવાને જશો.......(ટેક)\nનાત જાતનાં બંધન છૂટ્યા, છૂટી જૂઠી લાજ\nગુરૂ પ્રતાપે અમને મળ્યું પ્રેમ નગર નું રાજ......અમને\nઅભડાવાની બીક ન હોય તો આવો અમારી પાસ\nનાતીલા સહુ નિંદા કરે તો પાપ બધા ધોવાશે....અમને\nનાતનાં જૂઠા બંધનમાં કદી નહિં બંધાશું\nસર્વાંગી બની સર્વ સ્થળે, અમે પ્રેમી થઈને જઈશુ......અમને\nપ્રેમ પંથના અમે પ્રવાસી, પ્રેમી નામ અમારૂ\nવ્હેમની વાટે કોણ જાય, ત્યાં જણાય હું ને મારૂ.....અમને\nઉંચ નીચનાં ભેદ ભૂલીને, સંપીલા થઈ ફરશુ\nસત્ત સેવા સત્તકર્મ કરીને, અમર વરને વરશુ.....અમને\nઉંચ નીચનાં ભેદને ભૂલે તે સાચું સુખ માણે\nદાસ સતાર કહે સમજાવી, અભિમાની શું જાણે......અમને"
  },
  {
    "title": "97. સફર કા સૌદા કર લે મુસાફિર",
    "slug": "97-safar-ka-sauda-kar-le-musafir",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 97,
    "lyrics": "સફર કા સૌદા કર લે મુસાફિર, અસલ વતન કો જાના પડેગા.....(ટેક)\nજો પુણ્ય કરના હો સો કર લે, વહાં સંગ આને કા સમાન ભર લે\nપહોચેંગે જબ વતન કો અપને, તો ફિર નહિં યહા આના પડેગા\nજો પુણ્ય તુમને યહા કરે હે, વોહી તુમ્હારે સંગ ચલેંગે\nએ મહેલ માળીયા ઔર બગીચે, સભી કો  છોડકર જાના પડેગા\nસબ પીર પયગંબર દેવ દેવતા, યહાં સે જા વહાં ચાલ બસે હે\nતેરા ભી જાને કા હોગા એક દિન, મૌલા કો મુંહ દિખલાના પડેગા\nકહે અબ્દુલ સતાર માલિક કા બંદા, કરો પુણ્ય ઔર ભક્તિ કા ધંધા\nનહિં તો ફિર વહાં પડેગા ફંદા, તો ફિર તુમ્હે પસ્તાના પડેગા"
  },
  {
    "title": "98. કર ભજન દિલ સે તું પ્યારે",
    "slug": "98-kar-bhajan-dil-se-tu-pyare",
    "authorSlug": "satar-saheb",
    "category": "સતાર સાહેબ",
    "sortOrder": 98,
    "lyrics": "કર ભજન દિલ સે તું પ્યારે, તો મજા કો પાએગા\nયાદ રાખ ભૂલ અગર તો, ફિર ભોટ પસ્તાયેગા\nમત અભિમાન કર તું પ્યારે, જાગીરી કો પાકર\nછોડકર સબ જાગીરી, એક દિન ફના હો જાએગા\nકયું ફસા માયા કે ફંદે મેં, જરા તો ચેત હે નર\nયું હી ફંદે મેં ૫ડા રહેગા, તો તું સડ જાએગા\nચડતી હે ઘર પે તેરે ઉધઈ, તું ઉસકો સાફ કર\nઘર કે સ્થંભ ખાએગી તો, ઘર તેરા ગીર જાએગા\nઘર મેં તેરે વો છુપા હે, ઔર નહિં તુજકો ખબર\nઢૂંઢ લે તું ચૂપકે ચૂપકે, તો વો મિલ જાએગા\nભૂલ કર કયું દરબદર ફિરતા હે તું બંદે સતાર\nતેરે ઘર મેં ચોર આકર, ઝટ રતન લે જાયેગા."
  },
  {
    "title": "99. નામ છે નૈયા નામ ખેવૈયા",
    "slug": "99-nam-che-naiya-nam-khevaiya",
    "authorSlug": "trambak-saheb",
    "category": "ત્રંબક સાહેબ",
    "sortOrder": 99,
    "lyrics": "નામ છે નૈયા નામ ખેવૈયા, નામ છે તારણહાર\nજુગમાં નામ છે તારણહાર, જુગોજુગ નામ છે તારણહાર.....(ટેક)\nઅધમ અજામીલ સજન કસાઈ, આધે નામે ગુણિકા તરાઈ\nઝુડને મારી ગજને બચાઈ, બંધન છોડાવનહાર.....જુગમાં\nબાઈ મીરાનાં ઝેર અમૃત કિધા, એઠા બોર વ્હાલે હથોહથ લીધા\nશબરી બાઈને દર્શન દિધા, કરૂણારૂપ કિરતાર.....જુગમાં\nદાસ કબીરની ભીડુને જાણી, વારે ચડયા'તા સારંગપાણી\nપોઠુ ભરીને વ્હાલે માલ પહોંચાડયો, ભીડુના ભાંગણહાર....જુગમાં\nધૂળમાંથી ધાન ધનાનું કિધુ, ભક્ત જલાનું પારખુ લીધુ\nદાસી જીવણનું  દેણુ દીધુ, લજ્યાનાં રાખણહાર.....જુગમાં\nખેંચો ખેંચો કહી વહાણ ઉગાર્યું, દાદા રેવુનાં દલડાને ભાવ્યુ\nક્ષણ એક પલકમાં કાંઠે આવ્યુ, ઉગમ છે તારણહાર....જુગમાં\nકહેતા ન આવે પાર સંસારે, અનેક ભક્તોની ચડયા વારે\nસમરણ કરો તો વ્હાલો નાવડી તારે, ત્રંબક નામ આધાર.....જુગમાં"
  },
  {
    "title": "100. જાગ મુસાફિર ભજન કરી લે",
    "slug": "100-jag-musafir-bhajan-kari-le",
    "authorSlug": "trambak-saheb",
    "category": "ત્રંબક સાહેબ",
    "sortOrder": 100,
    "lyrics": "જાગ મુસાફિર ભજન કરી લે, શીદને તું ગભરાય\nગુરૂજીનાં વચન થકી બેડો પાર, ગુરૂજીનાં ભજન થકી ભવપાર......(ટેક)\nઆઠ નવ માસ ગર્ભમેં રાખ્યો, જુક્તિ કરી અવતાર આપ્યો\nબહાર આવીને મોહ્યો માયામાં, ભૂલ્યો વચન નાદાર......ગુરૂજી\nરતન પદારથ દેહ આ તારી, માટે ગુમાવ તેરી મેરી કરી\nસંત સમાગમ સાર શોધી લે, ગ્રહી લે વિવેક વિચાર....ગુરૂજી\nદેહ દેવળમાં આપ બિરાજે, અખંડ ધૂન ગગનમાં ગાજે\nસુરતા ધરીને શ્રવણ કરો તો, અખંડ પડે ટંકશાળ.....ગુરૂજી\nપૂરણ બ્રહ્મ તો પૂરી રહ્યો છે, જ્યાં જેવો ત્યાં તેવો થયો છે\nનામ નિરંજન નામ ઠાલુ નહિં, મૂર્તિ અનંત અપાર.....ગુરૂજી\nજપી લે અજંપા શ્વાસો શ્વાસે, શિવ શક્તિ રૂપ એક જ થાશે\nદાસ ત્રંબકનાં નાથ ઉગ્મેશ્વર, દરશાસે અખંડ અપાર....ગુરૂજી"
  },
  {
    "title": "101. દેહનાં સુખમાં બુદ્ધિ ઠેરાણી",
    "slug": "101-dehna-sukhma-buddhi-therani",
    "authorSlug": "trambak-saheb",
    "category": "ત્રંબક સાહેબ",
    "sortOrder": 101,
    "lyrics": "દેહનાં સુખમાં બુદ્ધિ ઠેરાણી, મિથ્યા સુખ કહેવાય\nઆમાં સમરણ ક્યાંથી થાય, સંતો નામ વિના કેમ રહેવાય.....(ટેક)\nઅખાજ વિષયનો ચારો ચરતો, કર્મ ધર્મની વાતો કરતો\nપશુ પંખીથી હલકો ઠરતો, દ્વારકા સંઘ ન જાય....આમાં\nસંત ચરણમાં કદી નથી નમતો, લોક લજ્જા મોટપમાં ભમતો\nભ્રાંતિ ભેદ ભ્રમણામાં રમતો, ક્યાંથી રૂપ ઓળખાય.....આમાં\nમહિમા ગાવે રામ રહિમનો,નિશાન વિનાનાં ઘા શું કામના\nઆધાર લે જો સદગુરૂ શ્યામનો, વચન વિવેકી થવાય....આમાં\nગુરૂ સેવ્યા વિના નહિં મળે મુક્તિ, સાર અસાર વિવેકને જુક્તિ\nસમરણ સેવા ભલેરી ભક્તિ, સતસંગ બિન અથડાય.....આમાં\nસદગુરૂ ચરણે પહોંચી જ બંદા, જન્મ મરણનાં તૂટે ફંદા\nબની જ નામી આનંદ આનંદા, ત્રંબક મૂળ પકડાય......આમાં"
  },
  {
    "title": "102. પંપા સરોવર કાંઠે વડલો",
    "slug": "102-pampa-sarovar-kanthe-vadlo",
    "authorSlug": "trambak-saheb",
    "category": "ત્રંબક સાહેબ",
    "sortOrder": 102,
    "lyrics": "પંપા સરોવર કાંઠે વડલો, રટે ત્યાં રામનું નામ, શબરી રટે છે રામનું નામ\nએક દિન આવશે સ્વામી મારા, અંતરનાં અભિરામ......શબરી\nશીતળ છાંયે ઝૂંપડી એની, માતપિતા નહિં બાંધવ બેની\nએકાંકી એકલી ધ્યાને બેઠી, નિંદા કરે આખુ ગામ....શબરી\nપ્રભાતે જાય ફળો લેવા વનમાં, ઉમંગ અનેરો ભાવ છે મનમાં\nલેહ લગની લાગી છે મનમાં, આરોગશે શ્રી રામ.....શબરી\nગુરૂજીનાં વચનો સુરતામાં રાખી, આઘે આઘે નજરું નાખી\nબોર લાવે છે ચાખી ચાખી, નિશદિન એક જ કામ.....શબરી\nરટણા રટતા વરસો વિત્યા, જોબન ગયુ ને વૃદ્ધાવસ્થા\nઅંતરમાં એક આશા જ્યોતિ, સુકાણાં હાડ ને ચામ.....શબરી\nખટઋતુમાં વસંત ખીલી, રામ પધાર્યા મેના બોલી\nદિવ્ય દ્રષ્ટિ ગુરૂએ ખોલી, નિરખ્યા પ્રગટ રામ.....શબરી\nઆજે પધાર્યા ઘટડાનાં સ્વામિ, સુરતા ગુરૂ વચન અનુરાગી\nઓછા બોલી રામ ચરણમાં, મનડું થઈ ગયું જામ....શબરી\nબાંયે ઝાલી હૃદયે ચાંપી, ગુરૂચરણમાં મુક્તિ આપી\nભવનાં બંધનો નાખ્યા કાપી, ત્રંબક રટવું નામ.... શબરી"
  },
  {
    "title": "103. શ્રી ગુરૂ ચરણ વંદુ",
    "slug": "103-shri-guru-charan-vandu",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 103,
    "lyrics": "શ્રી ગુરૂ ચરણ વંદુ, કોટી કોટી કરું પ્રણામ\nકષ્ટ મારા કાપજો, શ્રી જય જય ઉગારામ\nઉગામ ઉગ્યા ઘાટ માંહી, ઝિલમિલ પ્રગટ્યા ભાણ\nજ્યોતિ પ્રગટી થયા અજવાળા, કરાવી સત્તવચન ની જાણ..... શ્રી ગુરૂ\nસદગુરૂ તમે સમરથ ધણી, કરી મુજ પર મહેર\nઆંટી છૂટી અંતરની, પ્રગટી અંતરની લહેર.....શ્રી ગુરૂ\nદયાનીધી કરૂણાસાગર, આપ ચો ગરીબ નવાઝ રે\nબોલ્યુ નવ બોલ્યુ ક્ષમા કરજો, જય જાય ઉગ્મેશ્વર મહારાજ.....શ્રી ગુરૂ\nહોય કઈ ક્ષતિ અમતણી, તો કરજો દૂર ગુરૂદેવ રે\nઅમર અબૂધ બાલ તમારો, ઉગારો ઉગમ તત ખેવ રે.....શ્રી ગુરૂ"
  },
  {
    "title": "104. ઉગમ સદગુરૂ અમને મળીયા",
    "slug": "104-ugam-sadguru-amne-maliya",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 104,
    "lyrics": "ઉગમ સદગુરૂ અમને મળીયા, દયા કરીને આજ રે\nપ્રિત કરી મંદિર પધાર્યા, કરવા કલ્યાણ કાજ રે.....\nશબ્દ સુણાવ્યો સત્ત  નામનો, આપવા અવિચળ રાજ રે\nજાપ અજંપાના સમરણ કરવા, સન્મુખ ઉભા સાથ રે.....ઉગમ\nશ્વાસ ઉશ્વાસમાં જપો અજંપા, ઓહમ-સોહમ એક તાર રે\nનિર્ભય પદનું છે નિશાન, જપજો તમે એણીવાર રે....ઉગમ\nચાર વેદ પર પંચમવેદ, દિયા ગુરૂએ બતાઈ રે\nસુરતા ધરો ઉન દેશ મેં તો આપ સે આપ સમજાઈ રે.....ઉગમ\nનાભિ કમળમાં જુઓ તપાસી, સદગુરૂ કે ઘર ત્યાં રે\nઓહમ સોહમ દોનો ચોકીદારા, મેરામ ધણી ઉનકે પાર રે....ઉગમ\nબંકનાળ કે દ્વાર ખોલીને, સમાવો સુરતા શુન માંહી રે\nદાસ અમર ઉગમ ચરણે, અનુભવી હોય તે ઘર પાય રે....ઉગમ"
  },
  {
    "title": "105. એ જી ગુરૂજી સુણજો ઉગમ મહારાજ રે",
    "slug": "105-e-ji-guruji-sunjo-ugam-maharaj-re",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 105,
    "lyrics": "એ જી ગુરૂજી સુણજો ઉગમ મહારાજ રે, હે જી બુડતાનાં બેલી રે\nકૃપાસિંધુ તમે છો કિરતાર, વારૂ કરજો વેલી રે.....એ જી\nએ જી ગુરૂજી ભૂલ રે પડયા ભવસાગરની માંય, તુંબડા રે બનીને તારો રે\nનથી અમે તરવાનાં જાણકાર, અરજી રે સુણી વેલા એવો રે....એ જી\nએ જી ગુરૂજી કળીયુગની કારમી છે લાત, તમ વિના કોણ બચાવે રે\nવધ્યા કાંઈ પાપીને પાખંડનાં વેપાર, રંગરૂપથી લલચાવે રે....એ જી\nએ જી ગુરૂજી અમે છિએ આપના બાળ, એ જી કાલાઘેલા તમારા રે\nધરો ઉર ઉગમ તાત એણીવાર, અમર તમ આધાર રે....એ જી"
  },
  {
    "title": "106. હે જી કરીલે કમાયુ મન મુસાફિર",
    "slug": "106-he-ji-karile-kamayu-man-musafir",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 106,
    "lyrics": "હે જી કરીલે કમાયુ મન મુસાફિર, વ્યથા જીવન વહ્યું  જાય\nપલ રે ઘડીમાં પ્રાણ જાશે, પાછળથી ખૂબ પછતાય.....હે જી\nહે જી પ્રિત રે બાંધી લે સદગુરૂદેવ સે, બેડલી ઉતારે ભવપાર\nગ્રહી લે આધાર નિજ વચનનો, સંત પોકારે વારંવાર......હે જી\nહે જી સ્વાર્થ તણો છે સંસાર, તૂટતા નહિં લાગે વાર\nમિથ્યા સુખને અળગુ કરીને, મેલી દે ખોટા ભટકાર.....હે જી\nહે જી સાચુ રે સુખ ગુરૂનાં ચરણે, જેનો મહિમા અપરંપાર\nકહે રે અમર ભવબંધન તૂટ્યા, મળ્યા ગુરૂ ઉગારામ.....હે જી"
  },
  {
    "title": "107. હરિજનો રાખોને વિશ્વાસ",
    "slug": "107-harijano-rakhone-vishvas",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 107,
    "lyrics": "હરિજનો રાખોને વિશ્વાસ, સંતો રાખો ને  વિશ્વાસ\nવ્હાલો મારો જરૂર કરશે કાજ......સંતો\nહોલી બેઠી હરિને સમરે, ઉપર વળુંભ્યો બાજ\nશિકારીને સર્પ જ ડંસ્યો, બાણે માર્યો બાજ......સંતો\nકૌરવ પાપી ઘણાં હતા ને પાંડવ હતા પાંચ\nભાનુમતિને રંડાપો દિધો ને દ્રોપદીની રાખી લાજ......સંતો\nસિંધુ માથે સૈન્ય ઉતાર્યું, પાણી માથે પાજ\nપાપી રાવણને મારીને આપ્યુ, આપ્યુ વિભીષણને રાજ......સંતો\nગોરો હતો ભક્ત હરિનો, દમડી ન્હોતી પાસ\nકુંભાર બનીને કૃષ્ણજી આવ્યા, બન્યા ગોરાનાં દાસ.....સંતો\nપ્રિત કરીને પ્રિતમને સમરો, સમરો શ્વાસો શ્વાસ\nભીડ પડે તો ભૂધર આવે, આવે ઉગારામ\nઅમર તું એક છે ઓહમને પ્રતાપ......સંતો"
  },
  {
    "title": "108. તારૂ મૂળ સ્વરૂપ વિચાર જીવ અભાગી રે",
    "slug": "108-taru-mul-swaroop-vichar-jiv-abhagi-re",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 108,
    "lyrics": "તારૂ મૂળ સ્વરૂપ વિચાર જીવ અભાગી રે\nછોડી મોહ જાળ બની જા વૈરાગી રે, તેથી ઉતરીશ તું ભવપાર.....\nકાળ ક્રોધ મોહ મમતા, એમાં ગયો તું લપટાઈ\nવિષય વાસના અંગડે વ્યાપી, ભૂલી ગયો તુ ભગવાન, અજ્ઞાનતા સાથે રે.....\nસ્વાર્થ તણા સ્વાદ માંહી, ચાલ્યો નહિં સત્તવાટ\nઆવરણ તણા ઘાડા આવે, ગયો હિંમત તું હારી, કઠિન પંથ જાણી રે.......\nજેને ગોતે તે તું પોતે, અવળો તે શીદ અથડાય\nહરદમ હરિ વસે તારામાં, તેની કરી લે ઓળખાણ, સદગુરૂ શાને રે.....\nવાંચન પાઠન પૂજા પ્રાર્થના, છોડી દે ઢંગ તમામ\nઅમર કહે તું આવી જા ચરણે, ઉગમ ગુરૂ મહારાજ, તે વાતુ જાણે રે....."
  },
  {
    "title": "109. સત્યનામ વિચાર પામર પ્રાણી રે",
    "slug": "109-satyanam-vichar-pamar-prani-re",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 109,
    "lyrics": "સત્યનામ વિચાર પામર પ્રાણી રે\nછોડી દંભ તમામ લે ગુરૂગમ જાણી રે, તેથી ઉતરીશ તું ભવપાર.....\nઅજ્ઞાન સ્ત્રીનો સંગ ત્યજીને, સુરતા રાણી સંભાળ\nભવસાગરમાં પાર ઉતરવા, ગ્રહી લે ગુરૂ આધાર, એક ચિત્ત ધારી રે......\nસંકલ્પ વિકલ્પનો લય કરીને, નિર્વિકલ્પ વિચાર\nઘડેલા ઘાટ નાશ જ પામે, અઘાટ સ્વરૂપ આધાર, નિર્ગુણ નિરાકારી રે.....\nમન બુદ્ધિ ચિત્ત અહંકાર, છે ભુલવણીનો તાર\nમન બાંધી દે પવન સાથે, ચિત્તમાં સમરણ સાર, નાસે બુદ્ધિ અહંકાર રે…..\nદમ કદમમાં જાપ અજંપા, સાંધી ત્રિવેણીનો તાર\nનૂરતે સુરતે નામ નિરખ લે, પામો પેડ એણીવાર, નિરંજન નિરાકારી રે…..\nભ્રમણામાં ભટકીશ નહિં ને, કરજે વિચાર તત્કાળ\nઘડીક પલનું આ છે ચટકુ, દાસ અમર ગુણ ગાય, ઉગમ ગુરૂ ધારી રે......."
  },
  {
    "title": "110. લાગ્યો સુરતાનો તાર સદગુરૂ માંહી રે",
    "slug": "110-lagyo-suratano-tar-sadguru-manhi-re",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 110,
    "lyrics": "લાગ્યો સુરતાનો તાર સદગુરૂ માંહી રે\nદેખ્યા દિલ દિદાર સહજ શૂન માંહી રે, તેથી પદ પાયા નિર્વાણ.....\nઅનંતમુખી એક કરી ઉભી, દમ કદમને ધાર\nત્રણ ગુણ પર ત્રિવેણી તીરે, નિરખ્યા આતમરામ, નિરંજન નિરકારી રે……\nસતગુરૂનાં સત્તવચનમાં મનવા ભયા હે એકવાર\nમન પવન ભળ્યા બ્રહ્મ બ્રહ્મમાં હુવા જ્યોત પ્રકાશ, બાજે અનહદ તૂરા રે....\nનુરત નિશાન સુરત સમરણ, ચાલી શૂન શિખર માંહી\nઅધર તખત પર અમર પુરૂષ, બેઠા આસન વાળી, સદા આનંદી રે.....\nપાંચ તત્વ ત્રણ ગુણ નાંહિ, નહિ મન વાણીનો વિસ્તાર\nકાળ કર્મ સંચય નહિ, એક ઉગમ આધાર, દાસ અમરનાં સ્વામી રે......"
  },
  {
    "title": "111. કોઈ ધ્યાની બનીને સુને આ ઘટમાં",
    "slug": "111-koi-dhyani-banine-sune-aa-ghatma",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 111,
    "lyrics": "કોઈ ધ્યાની બનીને સુને આ ઘટમાં, નાદ અહોનિશ ઘૂરે\nમૂળને પકડી સુરતા સાંધી, ઘાયલ મન નામમાં ગળે\nનુરતા નિશાની અડગ પકડી, સ્થિર થઈને ઠરે.....કોઈ\nઅમર લોક તો વો નર પાવે, ગુરૂ ગોવિંદ એક કરી માને\nતત્વદર્શી થઈને તપાસે વો, સબ ઘટ બ્રહ્મને ભાળે.....કોઈ\nધ્યાન વિના ફોગટ સાધના, મન નવ બેસે માળે\nગુરૂજી એમાં શું કરે, ચિત્તડું લાગ્યુ છે જેમના શાળે....કોઈ\nપ્રિત વિના પ્રતિતિ ન આવે, કારજ તેનું નવ સરે\nઅડગ શ્રદ્ધા હોય ગુરૂ પર, ભજનનું ભાથું ભરે....કોઈ\nગુરૂ સર્વનો એક છે, જ્યાં સુધી જુદાપણુ ભાળે\nકહે અમર ગુરૂ ઉગમ ચરણે, તેનાં ચોરાસીનાં ફેરા નહિં ટળે....કોઈ"
  },
  {
    "title": "112. સુન લે હંસા સત્ત ઉપદેશા",
    "slug": "112-sun-le-hansa-satt-updesha",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 112,
    "lyrics": "સુન લે હંસા સત્ત ઉપદેશા, નહિં કાળ કર્મ કલેશા\nસોઈ દેશમેં શ્યામ બિરાજે, પ્રેમ પુરૂષ કા પ્રકાશા.....સુન લે\nઆવે ન જાવે ઓહી સંસારમેં, અલ્પ ધરૂ નહિં અવતારા\nપાંચ તત્વ ત્રણ ગુણ કે પર, મોહે સતગુરૂ હે ખેલનહાર.....સુન લે\nઓમકાર કી ઉતરે આરતી, ધ્યાન કા ધૂપ ધરાયા\nવિવેક વિચાર કી વાગે વધાયુ, પ્રાણ પુરૂષ ત્યાં સમાયા.....સુન લે\nશ્વાસ ઉશ્વાસ વો ઘર નહિં, નહિં મન અરૂ માયા રે\nશુન શિખર પર હે સતગુરૂ, અખંડ ધામ વસાયા રે.....સુન લે\nસુણી સંદેશો કોઈ નર જાવે, ફિર ચોરાશી મેં નાવે રે\nદાસ અમરનાં ઉગમ સ્વામિ, સત્યલોક બતાવે.....સુન લે"
  },
  {
    "title": "113. સંત મિલે ઉપકારી",
    "slug": "113-sant-mile-upkari",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 113,
    "lyrics": "સંત મિલે ઉપકારી, વાકી પલ પલ બલિહારી, જગતમેં સંત મિલે ઉપકારી\nસ્વાર્થ રહિત કરત ઉપકારા, કરત સેવા જગમેં સારી\nપ્રભુ કા ભજન દિલ સે ન અળગા, આઠેય પહોર સુખિયારી....જગત\nચરણ સેવતા સંતજનો કા, કાલ કી ફાંસી નાખે ડારી\nઆપ સરીખા આપને બનાકર, તીન લોકે જય જય કારી.....જગત\nસંત કી કૃપા ગહન હે ભૈયા, જો પ્રિત હોવે પૂરવ કી તારી\nમાત - પિતા - સુત - ધન મિલત હે, સંત ન મિલે વારી વારી.....જગત\nદ્રષ્ટિ તેરી ડાલ નહિં જાત પે, દેખલે સદગુણ ઉનકા ભારી\nગ્રહી લે શાન તુ સંતજનો કી, હો જાવે પાવનકારી....જગત\nભૂલ ભ્રમણા સબ કુછ પ્રગટે, મિટાવે પલ મેં દુઃખીયારી\nદાસ અમર કો ગુરૂ ઉગમ મીલા, પ્રગટી જ્યોત ઉજીયારી......જગત"
  },
  {
    "title": "114. દેખી મૂરત સારી મંદિર મેં",
    "slug": "114-dekhi-murat-sari-mandir-mem",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 114,
    "lyrics": "દેખી મૂરત સારી મંદિર મેં દેખી મૂરત સારી.....\nવોહી મંદિર મેં નવ દરવાણી, અનંત અટપટી બારી રે\nખડકી પે ખડકી બનાઈ હે, કારીગર કી કળા હે ન્યારી.....મંદિર\nઓહમ - સોહમ દોઈ દરવાણી, કરે હુકમ સે ચોકીદારી રે\nપાંચ સખીયા નૃત્ય કરે મેરા, સદગુરૂ બ્રહ્મચારી......મંદિર\nપાંચ તત્વ ત્રણ ગુણ સે કિની, જગત કી રચના સારી રે\nઓમકાર કા ઉદગાર ભયા હે, પ્રાણ કી પ્રતિષ્ઠા ડારી.....મંદિર\nગાફેલ નર તો ગોથા ખાવે, જુગો જગ કી હોય જો તૈયારી રે \nપૂરા નર દિદાર પાવે, હોય પ્રિત સદગુરૂ સે પ્યારી.....મંદિર\nસમજાય તો અતિ સહેલ છે ઘણુ, ગુરૂગમ કી હોય જો આવી રે\nકુંચી લેકર તાળા ખોલ દે, ખુલ જાવે સોહમ કી બારી.....મંદિર\nદાસ અમરનાં ઉગમ સ્વામિ, સન્મુખ દર્શન પાયા રે\nદ્વૈત સર્વે ટળી ગયાને, નૂર નજરમેં આયા.....મંદિર"
  },
  {
    "title": "115. વાદ કરોમાં વીરા મારા",
    "slug": "115-vad-karoma-vira-mara",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 115,
    "lyrics": "વાદ કરોમાં વીરા મારા, જુઓને જ્ઞાન થકી\nરે સંતો નામ વિના બીજું કાંઈ નથી.....(ટેક)\nબ્રહ્મા વિષ્ણુ મહેશ જેવા નામ થકી દેવ જ થયા\nભજન કરીને એણે જોયું અંતરમાં, રામ રહિમ જુદા નથી.......રે સંતો\nનામ થકી દેવી ને દેવતા, નામ થી નારી સતિ\nનામ થકી એ પીર પયગંબર, નામથી સદગતિ......રે સંતો\nસમજણની શાને જે નર ચાલ્યા, વાળી લીધી એણે વૃત્તિ\nસંત થઈને જેણે સંતને સેવ્યા, આંગણે આવેલ અતિથી.....રે સંતો\nજીવતા નર અમર પદ પાવે, મુવા પછી મુક્તિ નાંહિ\nદાસ અમરને ગુરૂ ઉગમ મળીયા, સાચી આપી સમજૂતિ.....રે સંતો"
  },
  {
    "title": "116. અમર ઘર પાયા રે સંતો",
    "slug": "116-amar-ghar-paya-re-santo",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 116,
    "lyrics": "અમર ઘર પાયા રે સંતો, શુદ્ધ ચેતન બ્રહ્મ પાયા રે સંતો.....અમર\nત્રણ ગુણ પર ત્રિવેણી તીરે, સાચા મોતી ચુગાયા રે\nનાભી નાસીકા ધ્યાન લગાયા, મેરામ માંહી દરશાયા રે....સંતો\nડાબી ઈંગલા જમણી પીંગલા, સુક્ષ્મણા ઘર પાયા\nનૂરત- સુરત ખેલનહારી, પિયા કે ઘર જાયા રે.....સંતો\nઆડ આડંબર કુછ નાંહિ કરીયા, નાંહિ મેં ભેખ ધરાયા રે\nમાલા તિલક કુછ ન લગાયા, નાંહિ મેં ગુફા મેં સમાયા રે.....સંતો\nપાંચ પચ્ચીસ લૂંટારા હે, ઉનકો માર હટાયા\nપંચ વિષય કો પરહરીને, અહોનિશ ધ્યાન લગાયા રે....સંતો\nગુરૂકૃપા સે સબવશ હુવા, મનકા વેગ સમાયા રે\nદાસ અમર ગુરૂ ઉગમ ચરણે, તાર મેં તાર મિલાયા રે.....સંતો"
  },
  {
    "title": "117. એવો દેશ રે દેખાડયો",
    "slug": "117-evo-desh-re-dekhadyo",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 117,
    "lyrics": "એવો દેશ રે દેખાડયો, ગુરૂએ કૃપા રે કરીને\nએવી ઝિલમિલ જ્યોતુ જાગી રે, સન્મુખ દેખાણા શ્રી હરિ......\nઉગમ ઉગીયા ઘટ વિશે, મટી ગયો ઘોર અંધકાર\nઅનંત કોટી ભાણ પ્રગટ્યા, જેનું વર્ણન કરતા ન આવે પાર\nએવી વાણી ખાણી નવ પહોંચે રે, એવો છે સાહેબનો દરબાર....એવો\nઆનંદ તણા ઓઘ ઉમટ્યા ને, મારે હૈડે હરખ અપાર\nસાહેબ ધણીને સન્મુખ નિરખતા, મટી ગયો ભવોભવનો ભાર\nએવા અજર અમર પદ પાયા રે, ન આવું ચોરાશી મેં ફરી......એવો\nગુરૂનાં ગુણનો પાર ન આવે, તેનો કેમ ભુલાય ઉપકાર\nદાસ અમર ગુણ ગાયને રીઝે, ઉગમ રામ આધાર\nએવાં ગુરૂજી મારા અલખ છે રે, ખેલે હાર ઘટોઘટની માંય....એવો"
  },
  {
    "title": "118. પ્રથમ સમરીએ ગુણપતિ દાતા",
    "slug": "118-pratham-samrie-gunpati-data",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 118,
    "lyrics": "પ્રથમ સમરીએ ગુણપતિ દાતા, દિન દયાળુ સૂંઢાળા રે\nસમરણ કરતા સંકટ કાપો, વિઘન હશેને સૂંઢાળા રે.....(ટેક)\nભજન પહેલા સમરણ તમારૂ, બ્રહ્મ કબાટ ખોલનારા રે\nરિદ્ધિ સિદ્ધિનાં આગેવાન તમે, શુભ કામ કરનારા રે....પ્રથમ\nઆદિ અનાદિની સ્થાપના તમારી, ઘટોઘટમાં રમનારા રે\nહરદમ સમરે નામ તમારૂ, સદાય દાસ તમારા રે......પ્રથમ\nબ્રહ્મા વિષ્ણુ મહેશ જેવા, જપે છે જાપ તમારા રે\nતેત્રીસ કોટી દેવ સમરે, ચરણું પૂજે તમારા રે.....પ્રથમ\nઅપાર ગુણ છે સ્વામિ તમારા, દોષ અમારા ટાળનારા રે\nસત્તબુદ્ધિ આપો દાસ અમરને, ગુરૂજીનાં ગુણ ગાવા રે.....પ્રથમ"
  },
  {
    "title": "119. પ્રથમ સમરીએ ગુણપતિ દાદા",
    "slug": "119-pratham-samrie-gunpati-dada",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 119,
    "lyrics": "પ્રથમ સમરીએ ગુણપતિ દાદા, તમે છો સર્વ વિઘન હરનારા રે\nશુભ અશુભ સ્થાપન તમારૂ, રિદ્ધિ સિદ્ધિનાં ઘરવાળા રે......(ટેક)\nસર્વ જગતમાં વાસ તમારો, દયાળુ દેવ સુંઢાળા રે\nનારદ શારદ શિવ સનકાદિક, ચમર ઢોળે દુંદાળા રે....પ્રથમ\nપીર પયગંબર આદિ દેવતા, સમરે નામ તમારા રે\nજોગી જતિ તપસ્વી સંન્યાસી, મથે છે દર્શન કરવા રે...પ્રથમ\nઅમરને ગુરૂ ઉગમ મળીયા, પલ મેં હુવા દિદારા રે\nપ્રથમ સમરીએ ગુણપતિ દાદા, તમે છો સર્વ વિઘન હરનારા રે....પ્રથમ"
  },
  {
    "title": "120. જીવ તું કરી લેને ભલાઈ",
    "slug": "120-jiv-tu-kari-lene-bhalai",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 120,
    "lyrics": "જીવ તું કરી લેને ભલાઈ, પાગલ હરિગુણ લેને ગાઈ\nભૂંડો બનીને ભટકે જગમાં, શીદને કરે બુરાઈ\nકિરતાર આગળ ચાલે નહિં કોઈનું, લાખ કરે ચતુરાઈ.....જીવ તું\nદ્રશ્ય જોને દુર્યોધનનું, જેણે કૃષ્ણ એ સમજાય\nભીષ્મ જેવાં ભેળા હતા તોય, રાજ ગયુ રોળાઈ......જીવ તું\nઅર્જુનજી એ અવળું કિધુ, વાળી ઋષિની ગાય\nપરશુરામે ફરશી ફેરવી, કંઈક શૂરા ગયા કપાઈ.....જીવ તું\nલંકાપતિએ લડાઈ કરવા, રામથી બાથ ભીડેલ\nદેવ જેવાં પણ એનાથી ડરતા, પલમાં પ્રાણ હરેલ....જીવ તું\nસૌથી સારી સંતની સેવા, ગુરૂ દાતા હૃદયની માંય\nઅમર હરિગુણ ગાઈ લે તો, સઘળી બલા જાય..... જીવ તું"
  },
  {
    "title": "121. ગેબ નિરંતર ગુરૂજી મળીયા",
    "slug": "121-geb-nirantar-guruji-maliya",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 121,
    "lyrics": "ગેબ નિરંતર ગુરૂજી મળીયા, કાપી કરમની ફાંસી રે\nઅખંડ અજંપા જાપ સુણાયા, પૂરણ મળ્યા અવિનાશી રે....(ટેક)\nડેમ કદમની દોરી પકડી, દુબ્જા સર્વે ગઈ નાસી રે\nત્રિવેણી તીરે તાર મિલાવી, અખંડ જ્યોતિ પ્રકાશી.....ગેબ\nપ્રવૃતિની પળોજણ મટી, જીવન બન્યું છે સુવાસી રે\nનિજ નામ સાથે નેડો બાંધ્યો, મટી ગઈ સર્વે રાશિ રે.....ગેબ\nદુશ્મન તણો દાટ વાળ્યો, થયો પ્રેમ વૈરાગ નો પ્યાસી રે\nપૂરણાનંદ પરિબ્રહ્મ પેખ્યા, પ્રિત બંધાણી સાચી રે .....ગેબ\nગુરૂગમ વાળા સાથ ન છોડે, ઈ છે સત્તલોકનાં વાસી રે\nઅમર ને ગુરૂ ઉગમ મળીયા, શાન ઠેરાવી સાચી રે....ગેબ"
  },
  {
    "title": "122. દેખ લે તમાસા ત્રિવેણી તીરે",
    "slug": "122-dekh-le-tamasa-triveni-tire",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 122,
    "lyrics": "દેખ લે તમાસા ત્રિવેણી તીરે, ગુરૂ બેઠા છે અલખ ગોંસાઇ\nનિરાકાર નિર્લેપ નિરધારા, ખેલ રહા હે સદાઈ.....(ટેક)\nનાભિ કમલ સે ઉઠત બેસત, હરદા કમલ મેં હરિરાય\nસોહમ પુરૂષ ખેલ રહા હે, પવન પડદાની માંય રે......દેખ લે\nઓમકાર સે વચન ઉઠત હે, તૂંહી તૂંહી એકતાર\nઈંગલા પીંગલા નાડી સાધીને, જોઈ લે સુક્ષમણા સાર....દેખ લે\nગુણપત માતમ પ્રથમ આરાધી, કરી લે મહામંત્ર ઉચ્ચાર\nપદ્માસન વાળી એક ચિત્ત ધારી, કરી લે અલખનાં દિદાર રે.....દેખ લે\nસુરતા સમરણ નુરતા નિશાન, એ જ સાધન સાચું જાણ\nકહે અમર ગુરૂ ઉગમ ચરણે, ભીતર પ્રગટ્યા ભાણ રે......દેખ લે"
  },
  {
    "title": "123. નિજ સ્વરૂપ નિરખ્યા વિના",
    "slug": "123-nij-swaroop-nirkhya-vina",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 123,
    "lyrics": "નિજ સ્વરૂપ નિરખ્યા વિના, સાધના સર્વે ફોક રે\nહું ને મારૂ મિથ્યા કરી માને, ઐસા વિરલા કોક રે....નિજ\nદેહ દમન શીદને કરે, તારી બાહિર વૃતિને રોક રે\nઅંધશ્રદ્ધા અજ્ઞાન ત્યજીને, સુરત શબ્દને જોડ રે....નિજ\nગુરૂ વિના ગમ નહિં પડેને, શીદ ને કરે તું મરોડ રે\nઆપ બળ અટકળમાં રહી તારે, ખાટલે પડી મોટી ખોટ રે....નિજ\nપિંડ ખોજયા વિના જૂઠી ભક્તિ કરે, નિત રંગ અનેક રે\nસ્વાર્થ પોતાનો લલચાવે બીજાને, લબાડવૃતિ ધરીયો ભેખ રે.....નિજ\nસંત તણી નીંદા કરે, કષ્ટ વેઠી મરે કમોતે રે\nકહે અમર ગુરૂ ઉગમ ચરણે, એવાં કાયમ સરજે પ્રેત રે....નિજ"
  },
  {
    "title": "124. સગુણ નિર્ગુણ દો બ્રહ્મ કહાવે",
    "slug": "124-sagun-nirgun-do-brahm-kahave",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 124,
    "lyrics": "સગુણ નિર્ગુણ દો બ્રહ્મ કહાવે, તેને ભિન્ન ન આણો ઉર રે\nસગુણ ની તું સેવા કરી લે, તો નિર્ગુણ નથી દૂર રે....સગુણ\nરજ તમ સત્વ ત્રિગુણી માયા, તેને દિલડેથી રાખો દૂર રે\nપાંચ પચ્ચીસમાં જૂઠો બંધાણો, તેનું ગોતી લેજો મૂળ રે....સગુણ\nસગુણ સ્વરૂપે સંત કહાવે, વચન છે નિરગુણ રૂપ રે\nદોય પારખી લક્ષ લગાવો તો, અલખ પુરૂષ છે અકળ અરૂપ....અગુણ\nવાળ તણાં વાડા ટાળીને, જોઈ લે સબઘટમાં ભરપૂર રે\nપંથ પરનાં બીડા ત્યાં ન પહોંચે, જો સદગુરૂ મળે હજૂર રે.....સગુણ\nનિજ વસ્તુ નિજ દેશમાં, શીદને ગોતે છે તું દૂર રે\nઅમર ને ગુરૂ ઉગમ મળીયા, વરસ્યા નિર્મલ નૂર રે.....સગુણ"
  },
  {
    "title": "125. નિત્ય નિત્ય ધ્યાન ધરો રે ધણીનું",
    "slug": "125-nitya-nitya-dhyan-dharo-re-dhaninu",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 125,
    "lyrics": "નિત્ય નિત્ય ધ્યાન ધરો રે ધણીનું, નિજ્યા પંથી નરને નાર....(ટેક)\nએકાંતે બેસી અલખ આરાધો, રાખી વચનમાં વિશ્વાસ અપાર\nસતગુરૂ સંત સુણાવે, સાંભળો તમે ચતુર સુજાણ......(ટેક)\nપ્રથમ વાણી લાવો નિયમમાં, શુદ્ધ વિચાર રાખો દિલમાંય\nગુરૂ વચનમાં ઉઠો બેસો, સહેજે કરો એક તાર....નિત્ય\nશીલ સંતોષ ધિરજ ધારણા, પ્રિતી રાખો નિજ પદની માંય\nસંચળ મનને સ્થિર કરી રાખો, નિર્મળ રાખો આતમ જ્ઞાન.....નિત્ય\nઅંતઃકરણથી અળગા રહીને, પ્રભુથી રાખો ભાવ અપાર\nસતગુરૂ સેવા સાહેબ સમરણ, રહો આનંદમાં આઠેય પહોર....નિત્ય\nસતગુરૂ પ્રત્યે દેહભાવ મટાડો, માનીને રહો નિજ કિરતાર\nતર્ક વિતર્ક કદી નવ કરવા, નિત્ય રહેવું, તેનાં ચરણોની માંય....નિત્ય\nમથામાણા છે જેનાં માટે, તે પુરૂષ વસે કાયાગઢ માંય\nઈંગલા પીંગલા આસન વાળી, સુરતા લગાવો નિજ ઘરની માંય....નિત્ય\nસરળ ચિત્ત દ્વેષ રહિત, પામો પદ અભય એણીવાર\nઅમર આદેશ લઈ ગુરૂ ઉગમનો, સત્ય કહું છું નર ને નાર....નિત્ય"
  },
  {
    "title": "126. આવી દેહુનો ઘડનાર",
    "slug": "126-aavi-dehuno-ghadnar",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 126,
    "lyrics": "આવી દેહુનો ઘડનાર, મારી કાયાનો રચનાર\nએનો કેમ ભૂલાય ઉપકાર.....(ટેક)\nમહામોજમાં સંસાર કિધોને, એણે દીધો અવતાર\nજઠરામાં મારૂ જતન કિધુને, અંદર આપેલ આહાર....એનો\nભાઈ ભત્રીજાને ભાણેજ આપ્યા, સારો રચ્યો સંસાર\nસેવા કરવા સુંદરી આપી, આપ્યો છે પરિવાર....એનો\nભોજન તો ભૂધરો આપે, રહેવાને ઘર બાર\nસર્વ પ્રાણીને સરખું બાટે, આપે સાંજને સવાર....એનો\nવિધ વિધનાં રસ એણે આપ્યા છે તત્કાલ\nકડવા, મીઠા, તીખાંને તૂરા, ખાટાને ખારા....એનો\nસર્વ પદાર્થ શામળીયાનાં, તું વેઠે કાં એનો ભાર \nએવાં ધણીને અમર તું ભૂલી જા તો, તને લાખો વાર ધિક્કાર.....એનો"
  },
  {
    "title": "127. હરિનું નામ છે સુખદાઈ",
    "slug": "127-harinu-nam-che-sukhdai",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 127,
    "lyrics": "હરિનું નામ છે સુખદાઈ, પ્રભુને ભજે તો દુઃખ જાય.....(ટેક)\nચિત્તમાં સમરણ શામળીયાનું, પલભરનાં વિસરાય\nભૂધર નામનાં ભડકો એવો, કુંડ કપટ બળી જાય....હરિનું\nહરિનાં નામે ગુણિકા તારી, તારી દીધા રે કસાઈ\nમચ્છીમાર ઢીમરને તાર્યા, તારી દીધા છે નાઈ.....હરિનું\nકુડ કપટથી જેસલ આવ્યો, મળી ગયા તોળીબાઈ\nહરિનું નામ હોઠે ચડતા, પલમાં આપી પીરાઈ....હરિનું\nવાળ વિવાદ જે નર વિસર્યા, એને સહેજે ગયુ સમજાઈ\nદાસ અમર કહે સદગુરૂ ચરણે, હેતે અનુભવ ગાય....હરિનું"
  },
  {
    "title": "128. કેટલો વખાણું વ્હાલા કેટલો વખાણું",
    "slug": "128-ketlo-vakhanu-vhala-ketlo-vakhanu",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 128,
    "lyrics": "કેટલો વખાણું વ્હાલા કેટલો વખાણું\nસંતોનો દેશ વ્હાલા કેટલો વખાણું.....(ટેક)\nઈ રે દેશમાં જનમ મરણ ન આવે વ્હાલા\nઅહોનિશ આનંદનું, જ્યાં થાણુ રે થપાણુ.....સંતો\nઈ રે દેશમાં ક્રિયા કર્મ ન આવે વ્હાલા\nહરખ અને શોક ત્યાં જતા જ મરાણો.....સંતો\nઈ રે દેશમાં અહોનિશ વાજા વાગે વ્હાલા\nબંસીનાં નાદે મારૂ ચિત્તડું ચોરાણું....સંતો\nમનને ઇન્દ્રિયનો જ્યાં ચારો નહિં વ્હાલા\nઅમર પુરૂષનું જ્યાં છે બેસણુ.....સંતો\nસદગુરૂ ઉગમ છે અમરૂને એ દેશ પહોંચાડે વ્હાલા\nમૂળ રે વચનમાં જેનું મનડુ વિંધાણુ.....સંતો"
  },
  {
    "title": "129. ગગનઘર મેં રહેના મેરે સંતો",
    "slug": "129-gaganghar-mem-rahena-mere-santo",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 129,
    "lyrics": "ગગનઘર મેં રહેના મેરે સંતો, ભાઈ ગગન ઘર મેં રહેના રે\nએહી જગ હે દરિયા કા પાની, તામે નજર નવ કિનારે\nત્રિવિધી તાપ સે અળગા રહીને, ગુરૂ કા ભજન કિનારે....ગગન\nબાહિર વૃતિ કો સમેટી લઈને, દિલમેં ડૂબકી દેના રે\nનૂરત-સુરત કી શાન ઠેરાવી લે, જ્યું નાદ બજત હે ઝિણા રે....ગગન\nઅનહદ નાદ ઘૂરે ગગન મેં, વાગે ઝાંઝ - પખાજને વીણા રે\nનોબત નિશાન ગડહડે ને, અહોનિશ સમરણ કિનારે....ગગન\nપાંચ  પચ્ચીસકી સંગત છોડ દે, વૃતિ ગુરૂ ચરણ દિના રે\nનાભિ - નાસિકા ધ્યાન ધરી લે, દેખ લે પુરૂષ આકૃતિ વિના રે...ગગન\nસર્વે આપદા મીટ ગઈ મેરી, કુછભી કર્મ કાંડ વિના રે\nઅમરને ગુરૂ ઉગમ મળ્યા, અગોચર વસ્તુ દિના રે.....ગગન"
  },
  {
    "title": "130. માનવ તન છે મોક્ષ કિનારો",
    "slug": "130-manav-tan-che-moksh-kinaro",
    "authorSlug": "amar-saheb",
    "category": "અમર સાહેબ",
    "sortOrder": 130,
    "lyrics": "માનવ તન છે મોક્ષ કિનારો, કોઈ સમરથ સદગુરૂ ધારો\nજ્ઞાન ધ્યાન આધીનતાએ, મળેલો ભવ સુધારો.....(ટેક)\nકોટી જન્મનાં પુન્યથી પામ્યો, જલખંડ શ્રેમંડ ઈંજડથી સારો\nસર્વ સત્તાધિશ તુ છે આત્મા, તેને ગુરૂ વચનથી વિચારો....કોઈ\nજન્મ મરણ સહુ કોઈને છે, તેને નામ જપથી વિદારો\nયોનિ અવતરણ ગુરૂકૃપાથી છૂટે, જે શુરો થઈ ખેલનારો....કોઈ\nહું ને મારૂ ફોગટ મદમાં, શીદને જીવન ને ગુજારો\nતારક મંત્ર સોહમ જપ છે, જુગતે જપો કિરતારો.....કોઈ\nશબ્દ રણુંકાર નાદને નેડે, સ્નેહથી સુરતા ધારો\nઉનમુન આસને મોજ માણો, થાય બંધ મોક્ષથી છુટકારો...કોઈ\nતત્વમસી પદ તે તું છે, શીદને લે છો અજ્ઞાન ઓથારો\nદાસ અમર ગુરૂ ઉગમ સેવતા, આવ્યો મોક્ષ કિનારો....કોઈ"
  },
  {
    "title": "131. દાણ ન માંગે દાણી રે",
    "slug": "131-dan-na-mange-dani-re",
    "authorSlug": "prem-saheb",
    "category": "પ્રેમ સાહેબ",
    "sortOrder": 131,
    "lyrics": "દાણ ન માંગે દાણી રે, સદગુરૂ સાહેબની લખી પરવાની......(ટેક)\nઅહોનિશ આજે મારે નેણલે આવે, બરકી બોલાવું બાની\nરામનામની રટ જેને લાગી, નશાએ પહોંચે નિરવાણી....સદગુરૂ\nઈંગલા પીંગલાઉનકી અધવચ, ધ્યાન ધરી લે ધ્યાની\nલઈ પવન ગગનમેં જાવે, ઉલટ ચડે આસમાની.......સદગુરૂ\nનજરે આયા મેરી નજરે આયા, હરદમ હિરલા ખાણી\nસત્તશબ્દનાં સુખ જેને લાધ્યા, એણે વાત આ માની.....સદગુરૂ\nઘોર ઘનુકા વિજ ચમુકા, સુરતા શબ્દ સમાણી\nપ્રેમ ને ગુરૂ જીવણ ભેટ્યા, ગયા ગગન નિશાની......સદગુરૂ"
  },
  {
    "title": "132. નથી વાત કઈ નાની",
    "slug": "132-nathi-vat-kai-nani",
    "authorSlug": "prem-saheb",
    "category": "પ્રેમ સાહેબ",
    "sortOrder": 132,
    "lyrics": "નથી વાત કઈ નાની, એ ઘર દૂર છે ગુરૂનાં જ્ઞાની હે જી......(ટેક)\nહંસ બગાને હુવો નેડલો, હંસે હંસાની ગત્ત જાણી\nસલિલ સાનમાં સમજ્યો નહિં, સિલાર ચાંચ ઠેરાણી.....એ ઘર\nમધ્ય સાયરે વસે છિપ, તે અનંત જળે ઉભરાણી\nઓર નિરની આશ નહિં ને, પીવે શ્વાંતિ જળ પાણી.....એ ઘર\nસંસાર સાગર સીધ ચિત્ત માંહી, શબ્દ સ્વાંતિ જળ પાણી\nહરદમ હિરલા બોલે નાદ સે, મોતી મતિ ઠહરાણી.....એ ઘર\nગાજ્યા ગગના ભયા મન મગના, બંકનાળ રસ આણી\nપ્રેમને ગુરૂ જીવણ ભેટ્યા, ઠિક નિશાને ઠેરાણી.......એ ઘર"
  },
  {
    "title": "133. તમે સદાય હરિના સંત",
    "slug": "133-tame-saday-harina-sant",
    "authorSlug": "morar-saheb",
    "category": "મોરાર સાહેબ",
    "sortOrder": 133,
    "lyrics": "તમે સદાય હરિના સંત, એવી રૂડી રીત પાળો ને.....(ટેક)\nસાચુ બોલો તમે હાકે હાલો, રૂડી પાળો રીત\nઆપ સ્વાર્થને ઈચ્છે નહિં, જેને પરમાર્થમાં પ્રિત.....એવી\nસેવા સમરણ ભાવ ઘણેરો, પ્રેમ તણો આભાસ\nતન મન ધન જેણે અર્પણ કિધા, થઈ બેઠા નિજ દાસ.....એવી\nવાચ, કાછ તમે વશ કરી રાખો, મન વરતી એક ઠોર\nઆંખલડીમાં અમી વરસે, શીલવંતા સાડી સોળ....એવી\nરંગભોગમાં રાચે નહિં, કિરયા બંધા જેહ\nસદગુરૂ શબ્દે ઉઠે બેસે, પરમાણી બંદા તેહ.....એવી\nસતધરમમાં સુરતા રાખો, ભજનમાં રહો ભરપૂર\nમન બડાઈ મોટપ મેલો, ગ્રહી બેસો નિજ મૂળ.....એવી\nઆપાપણું જેણે અર્પણ કિધુ, નિસ્પૃહી તે કહેવાય\nઅભ્યાગતનો ઓળો લઈ, તમે લળી લળી લાગો પાય.....એવી\nઆઠેય પહોર રટણા રટો, ત્રિકમ છે એક તાર\nમહારાજ મારો મુજરો માનો, હરિજન ઉતારો પાર.....એવી\nદર્શન કરી લ્યો સદગુરૂદેવનાં, કટે કોટિક કરમ\nમોરાર કહે ત્યાં સંત મેળાવો, પોતે છે પરિબ્રહ્મ....એવી"
  },
  {
    "title": "134. કહોને ઓધવજી અમે કેમ કરીએ",
    "slug": "134-kahone-odhavji-ame-kem-karie",
    "authorSlug": "morar-saheb",
    "category": "મોરાર સાહેબ",
    "sortOrder": 134,
    "lyrics": "કહોને ઓધવજી અમે કેમ કરીએ, મનડા હેરાણા પ્યારી મોરલીએ\nવ્યાકુળ થઈને અમે વનમાં ફરીએ, હરિ હરિ મુખથી ઓચરીએ.....\nનથી રહેવાતું ચિત્ત ચોરી લીધા, પ્રિત કરીને પરવશ કિધા\nએને ચરણે અનેક સિધ્યા, પ્રેમનાં પ્યાલા પાય ને પીધા.....કહોને\nદર્શન દયો તો મારે દીવાળી, વ્હાલા લાગો છો તમે વનમાળી\nત્રિભુવન સાથે મારે લાગી તાળી, નયણા રહ્યા છે મારા નિહાળી.....\nવેદે નિષેધ કિધી રે નારી, ઓતમ કરી વ્હાલે ઓઘારી\nવહેતા પુરથી વ્હાલે લીધા વાળી, બહુનામી એ બિરદ સંભાળી.....કહોને\nપ્રગટ રૂપે હરિ પરમાણુ, જુગનાં જીવન મારે સાચુ નાણુ\nદાસ મોરારને રવિ ગુરૂનું બાનુ, છુપાવ્યુ નહિં રહે છાનું........"
  },
  {
    "title": "135. દેખ્યા દિલ દિદારા",
    "slug": "135-dekhya-dil-didara",
    "authorSlug": "morar-saheb",
    "category": "મોરાર સાહેબ",
    "sortOrder": 135,
    "lyrics": "દેખ્યા દિલ દિદારા, મેરે સદગુરૂ કી અણસારા....(ટેક)\nઅઢાર તખત પર આપ બિરાજે, કરણીગર કિરતારા\nઅટળ અભંગી દેવ ત્રિભંગી, સકલ રૂપ સંસારા.....દેખ્યા\nધનનન ધનનન ઘંટ જ વાગે, ઝાલરનાં ઝણકારા\nમોર બોલે માંહી મોરલી વાગે, તંતુ મિલા એક તારા.....દેખ્યા\nનયને નિરખ્યા પરખ્યા પુરા, સુરતે નુરત સારા\nવરસે મોતી ઝળકે જ્યોતિ, અખંડ અમૃત ધારા....દેખ્યા\nઅગમ ખેલ અનહદ કી આગે, રમતા હે રણુકારા\nપાંચ સાહેલી પિયુ કી પાસે, નૃત્ય કરે નિરધારા....દેખ્યા\nગુરૂ પ્રતાપે સો ઘર પાયા, ભક્તિ મુક્તિ ભંડારા\nરજ મોરાર રવિ ગુરૂ ચરણે, અલપ મેં નહિં અવતારા....દેખ્યા"
  },
  {
    "title": "136. આંબો અમર છે સંતો કોક ભોમને ભાવે રે",
    "slug": "136-aambo-amar-che-santo-kok-bhomne-bhave-re",
    "authorSlug": "morar-saheb",
    "category": "મોરાર સાહેબ",
    "sortOrder": 136,
    "lyrics": "આંબો અમર છે સંતો કોક ભોમને ભાવે રે.....(ટેક)\nધરતી તપાસીને ધરા ખેડાવો, કામનાં કુંડા કાઢો\nનિજ નામનાં બીજ મંગાવી, વિગતેથી વવરાવો રે.....સંતો\nઅકાળ ધરાથી ઘડો મંગાવી, હેતની હેલ ભરાવો\nનુરત સુરત દોનુ પાણિયારી, પ્રેમ કરીને પીવરાવો.....સંતો\nકાચા મ્હોર તો ખરી જાશે, ફુલ ને ફળ પછી આવે\nહુકમદાર બંદા હાલે હજુરમાં, ખરી નીતી સે ખાવે....સંતો\nકાચા ભડદા કામ નહિં આવે, જીરવ્યા કેમ જીરવાશે\nત્રણ ગુણનો ટોપો રખાવી, જાળવો તો જાળવાશે.....સંતો\nભાણ સાહેબે ધરા તપાસી, રવિસાહેબ ત્યાં ભેળા\nદાસ મોરાર ગુરૂ રવિનાં ચરણે, વરતી લીધી વેળા.....સંતો"
  },
  {
    "title": "137. જગતમાં જેને વળગ્યુ",
    "slug": "137-jagatma-jene-valagyu",
    "authorSlug": "morar-saheb",
    "category": "મોરાર સાહેબ",
    "sortOrder": 137,
    "lyrics": "જગતમાં જેને વળગ્યુ, ભ્રાંતિ રૂપી ભૂતડુ\nજેણે ભુલાવી છે પ્રભુની વાત.....જેને વળગ્યુ\nરાત દિવસ ધંધામાં ધુણાવ્યો\nમાયા પાછળ કરે છે હાય હાય\nપછી સત્તગુરૂ ભુવા ગોતીયા\nજઈને ચરણે નમાવ્યુ શીશ.....જેને વળગ્યુ\nદાણા જોયા રે વિવેક વિચારનાં\nબાધા દિધી છે સત્તસંગ સાર\nપછી જ્ઞાન રાવળીયો બોલાવ્યો\nડાક વગાડી છે બ્રહ્મ જ્ઞાન.....જેને વળગ્યુ\nબ્રહ્મ અગ્નિ પ્રગટ આગે ધરી\nકુક કપટનો દીધો છે ધૂપ\nઆશા તૃષ્ણા ભાગી છે બે ડાકણી\nમદ મોહ નાં ભાગ્યા મેલા બે વીર.....જેને વળગ્યુ\nપછી આળસ અજ્ઞાન બે કાઢીયા\nકાઢ્યો મોટો હતો તે અહંકાર\nભરત ખંડમાં રવિસાહેબ ભેટતા\nસાહેબ મોરારનાં સરીયા છે કાજ..........જેને વળગ્યુ"
  },
  {
    "title": "138. અચરજ નજરે આયા સંતો",
    "slug": "138-acharaj-najare-aaya-santo",
    "authorSlug": "morar-saheb",
    "category": "મોરાર સાહેબ",
    "sortOrder": 138,
    "lyrics": "અચરજ નજરે આયા સંતો, જલમેં જ્યોતિ જગાયા......(ટેક)\nબિના મૂળ એક તરૂવર ડોલે, ડાળ પાન નહિં છાયા\nફુલ બિન ફળ, ફળ બિન ફળીયા, તીન લોક છવરાયા.....અચરજ\nવિના પાળ એક પંખી બેઠું, પગ પાંખ નહિં કાયા\nવિના ચાંચે હંસા ચુગત હે, મોતી ગોતી લાયા....અચરજ\nવિના મેઘ એક વિજ ચમકે, વિના વાદળ વરસાયા\nઅધર દરિયા સુભર ભરીયા, સમુદ્ર લ્હેર સમાયા.....અચરજ\nવિના પૃથ્વી એક પર્વત દીઠા, તા પર જલ જમાયા\nઉન જલ બિચ એક જોગી બેઠા, નુરતે નાદ બજાયા....અચરજ\nજુગત બેટીએ માતા જાયા, પુત્ર પિતાકુ જાયા\nરજ મોરાર રવિ ગુરૂ ચરણા, તુરત તમાસા પાયા.....અચરજ"
  },
  {
    "title": "139. દુર્મતિ દૂર કરના",
    "slug": "139-durmati-dur-karna",
    "authorSlug": "morar-saheb",
    "category": "મોરાર સાહેબ",
    "sortOrder": 139,
    "lyrics": "દુર્મતિ દૂર કરના, નિત્ય ધ્યાન ધણીકા ધરના.....(ટેક)\nનેકી અદલ દિલ સાચ કરીને, લે સદગુરૂનાં ચરણા\nતીન તલબ ગુણ ત્યાગ કરીને, પાંચ પચ્ચીસ કો પકડના...સંતો\nજપો અજંપા જાપ અંદર, સત કા નામ સુમરના\nનુરત સુરત કી દોરી લગાકે, ઠિક વહાં જઈ કરના...સંતો\nઅમર ઠોર આતમ સ્થાના, અહોનિશ અમૃત ઝરના\nગુરૂમુખ પીવે મન મસ્તાના, સોહમ અજરા ઝરના....સંતો\nરમતા રવિ ગુરૂ ભાણ કબીરા, પલ પલ પાયે પડના\nરજ મોરાર રવિ ગુરૂ ચરણા, સોહમ અમર વાર વરના......સંતો"
  },
  {
    "title": "140. ફેરો નામની માળા",
    "slug": "140-fero-namni-mala",
    "authorSlug": "khim-saheb",
    "category": "ખીમ સાહેબ",
    "sortOrder": 140,
    "lyrics": "ફેરો નામની માળા, તેરા ખાતે જનમ જંજાળા સંતો.....(ટેક)\nગુરૂગમ કેરી કુંચી કરી લે, કટે મોહ કા તાળા\nઈ તાળાને દૂર કરોતો, ઘટ ભીતર અજવાળા....સંતો\nઆ કાયામાં પ્રગટ ગંગા, શીદ ફરો પંથપાળા\nએ ગંગામાં અખંડ નાહી લ્યો, મત નાવ નદીયુ નાળા....સંતો\nઆ દિલ અંદર બુદ્ધિ સમુંદર, ચલત નાવ ચોધારા\nઈ રે નાવમાં હિરા માણેક છે, ખો જે ખોજાનહારા......સંતો\nસમરણ કરી લે પ્રાયશ્ચિત પર લે, ચિત્ત મેલી દે ચાળા\nખીમદાસ ગુરૂ ભાણ પ્રતાપે, હરદમ બોલે પ્યારા......સંતો"
  },
  {
    "title": "141. સુક્ષ્મ વેદ સે ન્યારા પ્યારા",
    "slug": "141-sukshma-ved-se-nyara-pyara",
    "authorSlug": "khim-saheb",
    "category": "ખીમ સાહેબ",
    "sortOrder": 141,
    "lyrics": "સુક્ષ્મ વેદ સે ન્યારા પ્યારા, સોઈ સદગુરૂ હમારા.....(ટેક)\nપાંચ તત્વ કા દેવળ બન્યા, તામેં હે દશ દ્વારા\nનવ દરવાજે નોબત વાગે, દશ મેં દિદારા.....સોઈ\nઉસ દેવાલ મેં દેવ બિરાજે, આરતી અખંડ ધારા\nચંદ્ર સૂર્ય  કી જ્યોત જલત હે, ઝિલમિલ નૂર અપારા..... સોઈ\nમતવાલા જોગી શુન પર બેઠા, ખેલ રમે છે ચોધારા\nગગનમંડળ મેં રમતા દેખ્યા, ભીતર જોઉં ત્યાં બારા.....સોઈ\nઓહમ સોહમ કી ચોકી ફિરત હે, હાકેમ બાવન બારા\nસુક્ષમ વેદ સે આપ ગળે, ટેબ પાવે સરજનહારા.....સોઈ\nસાચા સદગુરૂ નેણે નિરખ્યા, સળંગ સુતર એક તારા\nખીમદાસ ગુરૂ ભાણ પ્રતાપે, હરદમ બોલે છે પ્યારા......સોઈ"
  },
  {
    "title": "142. કોઈ પરખંદા સત્ત શબ્દ કા રૂપ",
    "slug": "142-koi-parakhanda-satt-shabd-ka-rup",
    "authorSlug": "khim-saheb",
    "category": "ખીમ સાહેબ",
    "sortOrder": 142,
    "lyrics": "કોઈ પરખંદા સત્ત શબ્દ કા રૂપ......(ટેક)\nમૂળ શબ્દ કહા સે ઉઠે, કોન દેશમેં બોલે\nકોન મંડળ શબ્દુ કા વાસા, તત્વ વિચારો તોલે....કોઈ\nકિતના લંબા કિતના ચૌડા, કિતના હે અનુમાના\nકૈસા સ્વરૂપ શબ્દ કા સાધુ, બતલાઈ દિયો કર ધ્યાના....કોઈ\nકિતના હલકા કિતના ભારી, ખારા હે કે મીઠા\nમોહે ગરીબ કો કહી સમજાવો, શબ્દ કોન વિધ દિઠા.....કોઈ\nશરીર ખોજે શબ્દ કો પકડો, હાથ ગ્રહી બતલાવો\nપડે પિંડ પ્રગટ ઘર ભાંગે, શબ્દ કહા સમાવો....કોઈ\nખીમ સાહેબ રવિ સાહેબ કો પૂછે, ગમ કરી ગગના હેરી\nકોન નિરંતર કોન દેશ મેં, કહાં સમાવો દોરી.....કોઈ"
  },
  {
    "title": "143. સાધુ ભેદ અગમ કેરા પાયા",
    "slug": "143-sadhu-bhed-agam-kera-paya",
    "authorSlug": "khim-saheb",
    "category": "ખીમ સાહેબ",
    "sortOrder": 143,
    "lyrics": "સાધુ ભેદ અગમ કેરા પાયા.....(ટેક)\nકેમ કરી સદગુરૂ સમરીએ ? કેમ કરી લઈએ નામ ?\nકોણ ગુરૂને નીરખીએ ? ક્યાં છે આતરામ ?.......સાધુ\nશ્વાસે ઉશ્વાસે સમરીએ, ને અહોનિશ લઈએ નામા\nનૂરતે સુરતે જયારે નિરખીએ, ત્યારે સબ ઘટ આતમ રામા.....સાધુ\nકેમ કરી વિજ માંહિ કરે ચમુકા ?  કેમ કરી જ્યોતુ જાગે\nશૂન મંડળ મેં નોબત વાગે, તખતે અખંડ આપ બિરાજે.....સાધુ\nકહાં સે આયા કહાં જાએગા ? કોણ તુમ્હારા ઠામા\nઆ કાયા તો પલમાં પડી જાશે, ફેર બતાવો ધામા.....સાધુ\nઅમે આવ્યા ગુરૂ નૂર સે, ને અમરપુરમાં ઠામા\nચડી સુરત આસમાન ઠેરાણી, તો બ્રહ્મ અમારા ધામા......સાધુ\nકોન શબ્દ સે ધ્યાન લગાયા ? કોન નામ નિરધાર્યા\nખીમદાસ રવિદાસ કો પૂછે, તમે ભીતર ખેલો છો કે બારા ?....સાધુ\nસત્ત શબ્દ સે ધ્યાન લગાયા, આદ્ય નામ નિરધાર્યા\nખીમદાસ ગુરૂ ભાણ પ્રતાપે, ઓહમ સોહમ સે પારા.....સાધુ"
  },
  {
    "title": "144. સંતો જુઓ ગગના હેરી",
    "slug": "144-santo-juo-gagana-heri",
    "authorSlug": "khim-saheb",
    "category": "ખીમ સાહેબ",
    "sortOrder": 144,
    "lyrics": "સંતો જુઓ ગગના હેરી, ત્યાં બંસરી બાજે, ઘેરી ઘેરી....(ટેક)\nત્રિવેણી ટંકશાળ પડત હે, તા પર ઝીણી શેરી\nઅમર અજીતા આસાન પે બેઠા, નગર બસાયા ફેરી.....સંતો\nઘડી ઘડીનાં ઘડીયાળા  વાગે, વાગે સ્વર ઘંટેરી\nઢોલ નગારા શરણાઈ વાગે, ધૂમ મચી ચૌટા ફેરી.....સંતો\nગગન મંડળ મેં કરલે વાસા, વહાં હે જોગી  લહેરી\nસદગુરૂએ અમને શાન બતાવી, જાપ અજંપા ફેરી.....સંતો\nશ્વાસ ઉશ્વાસ દોનું નહિં પહોંચે, વહાં લેહ લાગી મેરી\nનુરતે સુરતે નામ નિરખ લે, સુખમન માળા ફેરી.....સંતો\nસાચા સદગુરૂ જેણે નિરખ્યા, મીટ ગઈ રેન અંધેરી\nખીમદાસ ગુરૂ ભાણ પ્રતાપે, ચોંટ નહિં જમ કેરી....સંતો"
  },
  {
    "title": "145. સંતો આતમ હિરલા પાયા",
    "slug": "145-santo-aatam-hirla-paya",
    "authorSlug": "khim-saheb",
    "category": "ખીમ સાહેબ",
    "sortOrder": 145,
    "lyrics": "સંતો આતમ હિરલા પાયા, જબ હરિ ચરણે ચિત્ત લાયા.....(ટેક)\nઆ ઘર મેં માલ અમૂલખ ભરીયા, જુગતે જોગ કમાયા\nજન્મ સુધારણ સદગુરૂ ભેટ્યા, ફેર હી ઘાટ ઘડાયા.....સંતો\nતેરા તખત તુંજ મેં બિરાજે, અગમ ભૂમિ પર આયા\nજલકે જ્યોતિ નૂર અપારા, મેરામ માંહી દરશાયા......સંતો\nઆવન જાવન અષ્ટ કમલ મેં, નુરત સુરત લેર લાયા\nશૂન કે પાર નિરંતર દિસે, ચૈતન્ય સિંધુ સમાયા.....સંતો\nપૂરણ બ્રહ્મ પૂરવની પ્રિતે, સહેજે સોહમ ઘર પાયા\nખીમદાસ સંત ભાણ પ્રતાપે, ઠિક નિશાન ઠેરાયા.....સંતો"
  },
  {
    "title": "146. રામ ભજી લે રાણા",
    "slug": "146-ram-bhaji-le-rana",
    "authorSlug": "bhan-saheb",
    "category": "ભાણ સાહેબ",
    "sortOrder": 146,
    "lyrics": "રામ ભજી લે રાણા, ત્યારે ગુણ તો ગોવિંદનાં ગવાણા\nમન તું રામ ભજી લે રાણા.....(ટેક)\nખોટી માયાની ખબર પડી નહિં, કળ વિના એ કુટાણા\nજુઠી માયા સે ઝઘડો માંડયો, બળ કરીને બંધાણા......મન\nકુડિયા તારે કામ નથી આવે, ભેળા નહિં આવે નાણા\nહરામની માયા ચાલી જાશે, રહેશે દામ હટાણા.....મન\nકમાઈ વિનાનાં નર કૂડા દિસે, ભીતર ન ભીંજાણા\nહરિ વિનાનાં હળવા હિંડે, નર ફરે છે નીમાણા...મન\nસો સો વરસ રહે સિંધુમાં, છતાં જેના ભીતર ન ભીંજાણા\nજળનું તો કાંઈ જોર ન ચાલ્યુ, પલળ્યા નહિં ઓલા પાણા....મન\nતારા હરિચંદ્ર તૂંહી તૂંહી જપ્યા, રોહિદાસ રુંધાણા\nદિક્ષા લઈને દાતાર ચાલ્યા, હરિચંદ્ર હાટે વેચાણા......મન\nરાવણ સરીખા રહ્યા નહિં ને, ઇન્દ્ર જેવા અટવાણા\nજરાસંઘ તો જતા રહ્યાને,કૌરવ ખુબ કુટાણા....મન\nશક્તિ માયા ભેળી કરીને, નીચે ભરીયા નાણા\nમુવા પછી મણિધર થઈને બેઠા, રાફડા રુંધાણા.....મન\nઅસંખ્ય તો અવતાર ધર્યા તે, ભવોભવ ભટકાણા\nજરા મરણ તો જીવ્યા નહિં ને, લોભ ન ગયો લુવાણા....મન\nફરી ફરી પણ વૃત્તિ ન ફરીને, બોલ નહિં બદલાણા\nછબી ફરી પણ ચાલ ફરી નહિં, ભ્રાંતિ ન ગઈ ભાણા....મન"
  },
  {
    "title": "147. મારી હેલી રે જાણ રે કરો ઉન દેશની",
    "slug": "147-mari-heli-re-jan-re-karo-un-deshni",
    "authorSlug": "bhan-saheb",
    "category": "ભાણ સાહેબ",
    "sortOrder": 147,
    "lyrics": "મારી હેલી રે જાણ રે કરો ઉન દેશની, ધરો સત્તવચનમાં ધ્યાન.....(ટેક)\nમારી હેલી રે, કોણ જગાડે સતનામને, કોણ જગાડે પ્રેમ\nકોણ રે જગાડે પુરૂષને, કોણ જગાડે બ્રહ્મ.....મારી હેલી\nમારી હેલી રે સુરતા રે જગાડે સતનામને, નામ જગાડે પ્રેમ\nપ્રેમ રે જગાડે પુરૂષને, પુરૂષ જગાડે બ્રહ્મ....મારી હેલી\nમારી હેલી રે કોન બ્રહ્મ કે રૂપ હે, કોન બ્રહ્મ કે સ્થાન\nકોન બ્રહ્મ કા બેસણા, કોન બ્રહ્મ કા મેલાણ.....મારી હેલી\nમારી હેલી રે જન્મ મરણ તબ હી મિટે, જબ હી બ્રહ્મ દર્શાય\nભાણ કહે હંસદાસને, ફિર ભટકના નાંહિ.....મારી હેલી"
  },
  {
    "title": "148. સદગુરૂ સાહેબે સહી કર્યા જેણે",
    "slug": "148-sadguru-sahebe-sahi-karya-jene",
    "authorSlug": "bhan-saheb",
    "category": "ભાણ સાહેબ",
    "sortOrder": 148,
    "lyrics": "સદગુરૂ સાહેબે સહી કર્યા જેણે, પ્રેમ જ્યોતિ પ્રકાશી રે\nઅખંડ જાપ આયો આતમરો, કરી કાળ કી ફાંસી....પ્રેમ\nગગન ગરજ્યા શ્રવણે સુણ્યા, મેઘજ બારે માસી\nચમક દામિની ચમકન લાગી, દેખ્યા એક ઉદાસી....પ્રેમ\nગેબ તણા આમાં ઘડિયાળા વાગે, દૈત્ય ગયા દળ નાશી રે\nજીણપણામાં ઝાલર વાગી, ઉદય ભયા અવિનાશી....પ્રેમ\nમહી વલોયા માખણ પાયા, મ્રથ તણી ગામ આસી\nચાર સખી મિલ ભયા વલોણા, અમર લોક કા વાસી....પ્રેમ\nસપ્ત દિપને શાયર નાંહિ, નહિં ધરણી આકાશી રે\nએક નિરંતર આતમ બોલે, સો વિધિ વિરલા પાસી....પ્રેમ\nગેબ નિરંતર ગુરૂમુખ બોલ્યા, દેખ્યા શ્યામ સુહાગી\nસ્વપ્ન ગયાને સાહેબ પાયા, ભાણ ભયા સમાસી....પ્રેમ"
  },
  {
    "title": "149. સદગુરૂ મળ્યા સહેજમાં",
    "slug": "149-sadguru-maliya-sahejma",
    "authorSlug": "bhan-saheb",
    "category": "ભાણ સાહેબ",
    "sortOrder": 149,
    "lyrics": "સદગુરૂ મળ્યા સહેજમાં, જેણે સત્તનો શબ્દ સુણાયો\nચોરાસીનો રાહ ચુકાવી, અખંડ ધામ ઓળખાવ્યો.....(ટેક)\nપંથ હતા તે થયા પરિપૂર્ણ, નવધા નામ મિટાયો\nદશમ દશા આવી દિલ ભીતર, એક મેં અનેક સમાયો.....સદગુરૂ\nએક હતા સો અખંડ સમાયો, નહિં આયો નહિં જાયો\nજિકર કરતા ગઈ જામિની, સોહમ સાહેબ પાયો.....સદગુરૂ\nજપ તપ તિરથ જોગ ન ધરતા, સળંગ શેરડો પાયો\nખટ્ટદર્શનમાં ખેજ કરીને, ફરી ફરી ઘરે આવ્યો.....સદગુરૂ\nઅનંત કરોડમાં આગે ઉભા, સમસ્યા એ સાધ કહાયો\nભણે ભાણો હરિ ભીતર પેખ્યા, જ્યોતમાં જ્યોત મિલાયો.....સદગુરૂ"
  },
  {
    "title": "150. નિજ ભક્તિ કોઈ વિરલા જાણે",
    "slug": "150-nij-bhakti-koi-virla-jane",
    "authorSlug": "trikam-saheb",
    "category": "ત્રિકમ સાહેબ",
    "sortOrder": 150,
    "lyrics": "નિજ ભક્તિ કોઈ વિરલા જાણે, સબ જુગ કરત કમાઈ\nઅબ મન ચેતી લે મેરે ભાઈ.....(ટેક)\nજપ તપ તિરથ જોગ જુગત સે, કહો કરણી ક્યાં લાગી જાઈ\nતીનુ દેવને દશ અવતારા, વાકી ખબર ન પાઈ....અબ\nજલખંડ વ્રેમંડ દંડ લગી માયા, તીન પાંચ કે માંહી\nઅરધ ઉરધ રૂપ વસે વચન કા, શ્વાસ ઉશ્વાસ સમાય.....અબ\nપહેલા પદ કો સબ કોઈ જાણે, દૂજા વૈકુંઠ બતાઈ\nતીસરા પદ પર જ્યોતિ જલત હે, વહાં લગી નિર્ભય નાંહિ......અબ\nઅલખ અખંડિત અકળ અરૂપી, અજર અમર ઘર પાઈ\nમન પવન સે ન્યારા ખેલે, દૂરમતિ દૂર હટાઈ......અબ\nસત્તસંગ કરી લે સદગુરૂ કા, મન ચિત્ત ચરણુ માંહી\nત્રીકમદાસ સંત ખીમ કા ચરણા, ગ્રહી ટેક ગમ પાઈ......અબ"
  },
  {
    "title": "151. મૂળને બાંધો સુક્ષમણા સાધો",
    "slug": "151-mulne-bandho-sukshamna-sadho",
    "authorSlug": "trikam-saheb",
    "category": "ત્રિકમ સાહેબ",
    "sortOrder": 151,
    "lyrics": "મૂળને બાંધો સુક્ષમણા સાધો, દ્રઢ મન રાખો એક ધડે\nપ્રેમ નિશાન તમે નિશ્ચવે પકડો, ચડવું હોય તો એમ ચડો.....\nશબ્દ વિચારી તમે વચને ચાલો, તો આઠેય કર્મ તમને નહિં નડે\nસુરત - નુરત સન્મુખ રહેવે, ગર્જે ગગનગઢ નિશાન ગડે.......મૂળને\nદિલ દરિયામાં ડૂબકી દિધા વિના, કહો મરજીવા તને કેમ મળે\nશબ્દનાં શૂરા જે વચનુ નાં પુરા, એ તો ખરી વૃત્તિનાં ખેલ ખેલે.....\nશબ્દ સોનારો સબઘટ બોલે, ઘણ એરણ વિના ઘાટ ઘડે\nસદગુરૂ વચને સર્વે સૂઝે, અમર વસ્તુ જરૂર જડે.....મૂળને\nગગનમંડળમાં ગોતી લેજો, રામરતન નજરે પડે\nદાસ ત્રિકમ સંત ખીમને ચરણે, ગોતી લેજો ગુરૂ જ્ઞાન વડે......"
  },
  {
    "title": "152. એવો અમારે મોલે ઓત્તર દિશાથી એક રમતો જોગી આવ્યો",
    "slug": "152-evo-amare-mole-ottar-dishathi-ek-ramto-jogi-aavyo",
    "authorSlug": "trikam-saheb",
    "category": "ત્રિકમ સાહેબ",
    "sortOrder": 152,
    "lyrics": "એવો અમારે મોલે ઓત્તર દિશાથી એક રમતો જોગી આવ્યો\nઆવી આવી અલખ જગાયો......(ટેક)\nવાલીડા મારા સત્ત કેરી સોયુ ને શબ્દોનાં ધાગા\nખેલ તો રે ખૂબ બનાયો.....એવો\nવાલીડા મારા પહેરણ પીતાંબરને કેસરિયા વાઘા\nકેસર ભીનો તિલક લગાયો....એવો\nવાલીડા મારા એ રે જોગીડાને જનમ મરણ ન આવે\nનહિં રે આયો ને નહિં જોયો રે....એવો\nવાલીડા મારા ત્રિકમ સાહેબ ખીમ કેરે ચરણે\nહરખ હરખ ગુણ ગાયો.....એવો"
  },
  {
    "title": "153. વરતાણી આનંદ લીલા મારી બાયુ રે",
    "slug": "153-vartani-aanand-lila-mari-bayu-re",
    "authorSlug": "laxmi-saheb",
    "category": "લક્ષ્મી સાહેબ",
    "sortOrder": 153,
    "lyrics": "વરતાણી આનંદ લીલા મારી બાયુ રે, બેની મને ભીતર સદગુરૂ મળીયા....(ટેક)\nચોરાસી ચૌટાને બાવન બજારૂ, કાચ બંધ મહેલ કિના\nતે પર મારા સદગુરૂ બિરાજે, દોય કર જોડી આસાન દિના.....આજ\nકોટા ને કોટી રવિ ઉગ્યા દિલ ભીતર, તેથી ભોમ સઘળી મેં ભાળી\nશૂન મંડળમાં મારો શ્યામ બિરાજે, ત્રિકુટીમાં લાગી મને તાળી.....આજ\nઘડી ઘડીનાં આમાં ઘડીયાળા વાગે, રાગ છત્રીશ થાય ચીની\nઆ જલકત શહેરને ઝરૂખે જાળીયા, ઝાલરી વાગે ઝિણી ઝિણી....આજ\nપવન પુતળી રમે પ્રેમ સે, એને નખશિખ નેણે નિરખી\nઆ અંગનાં ઓશિકાને પ્રેમનાં પાથરણા, ગુરૂજીને દેખી હું હરખાણી......આજ\nસતવચનનો સિતાર બનાવ્યો, ગુણ તખત પર ગાયો\nલક્ષ્મીસાહેબ ગુરૂ કરમણ ચરણે, ગુરૂજી એ ગુપ્ત પ્યાલો પાયો......આજ"
  },
  {
    "title": "154. ઈ દ્વાર દેખ લે ભાઈ",
    "slug": "154-ee-dwar-dekh-le-bhai",
    "authorSlug": "laxmi-saheb",
    "category": "લક્ષ્મી સાહેબ",
    "sortOrder": 154,
    "lyrics": "ઈ દ્વાર દેખ લે ભાઈ, જેમાં સદગુરૂ સાહેબ એક છે.....(ટેક)\nચેતવણી કે ચણતર ચણી લે, પરા પાર સુ પાયા\nગમ અગમનાં તાળા રચીયા, મણીએ મંદિર છાયા.....ઈ દ્વાર\nપારસમણી કા બન્યા પગથીયા, અક્કલમણી કા ઓરા\nસત્તનામ કી સીડી મંડાવી લે, તારા મંદિર સૌથી મોટા.....ઈ દ્વાર\nછત્રીસ મન મણીએ ઈચ્છયા, કોઈ નથી ઈચ્છયા કામી\nઅસલ જુગનાં ઈ દ્વારે, તેમાં બેઠા અંતરયામી..... ઈ દ્વાર\nઘાટ ઘડયા એને ચડયા નેજા, ત્યાં સદગુરૂ મારા રહેતા\nલખમી સાહેબ તમે સત કરી માનો, એમ ગુરૂ મારા કરમણ કહેતા....ઈ દ્વાર"
  },
  {
    "title": "155. ભ્રમણામાં ભટકાણા",
    "slug": "155-bhramnama-bhatkana",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 155,
    "lyrics": "ભ્રમણામાં ભટકાણા, ભારે ખોટામાં ખોવાણા\nમૂરખ મણ તું લેને વિચારી રે, આ તો ભ્રમણામાં ભટકાણા......\nમાને સંસાર સિંહ જેવો, ડરે મહિપતી રાણા\nઅજાપુત્ર ધર્મ તણા, દે બલિદાન બિચારા....મૂરખ\nઆભડવા જાવા થાય ઉતાવળો, કહે વહેવારમાં વિંટાણા\nસત્તસંગમાં જાવું પણ શું કરીએ, નથી હજી એ ટાણા.....મૂરખ\nવહેવાર કહે છે કાચો તાંતણો, સમજે કહેવાય શાણા\nજિંદગી જાણે જુગોજુગ હોય, તેમ ખડકે વહેવારનાં પાણા.....મૂરખ\nઢીકા સાટે ઢીકો પામે, એવા વહેવારી વખણાણા\nતે તો માને ભ્રમણા ધારી, લેવડ દેવડનાં લ્હાણા......મૂરખ\nલાભુ વહેવાર સમજે સંતો, અપકાર ઉરમાં ન આણ્યા\nસંસારને શિયાળ જાણી, ધર્મસિંહ સમજાણા.....મૂરખ"
  },
  {
    "title": "156. એવી વ્હેમે હદ વાળી રે",
    "slug": "156-evi-vheme-had-vali-re",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 156,
    "lyrics": "એવી વ્હેમે હદ વાળી રે, સંશય વધ્યો સામટો\nદેખાદેખીની દાજે રે, ખોજે નહિં તન આપનો.....એવી\nમાયા કે મોહન કહે છે, તે જોતો નથી તેની જાત\nવાસના એ માનુષ જન્મ ખોયો, એવી વેદથી સાબિત વાત\nએવી વાસનાને ન વારે રે, આવાગમનમાં ભટકતો......એવી\nગજરાજ સમાન વિદ્વાન થયો, જોગ કર્યો દેહ ધર્મ\nસોયનાં નાકારૂપી ભક્તિ માંહિ, રહી ગયો સંશય ભરમ\nભ્રમણા મનની ન ભાંગી રે, માથે રહ્યો કાળ ઝપાટો......એવી\nઆત્મા શક્તિથી જીવદયા કાઢી, તૃષ્ણાથી ઉપજે લોભ\nઝીણી બુદ્ધિ રૂપી કિડીએ, આતમ ગજરાજની કરી શોધ\nએવા જેનાં કર્મ જેવા રે, તેવું પદ તે પામતો.....એવી\nબાહિર આચારમાં બહુ મન ભટકે, ખોજે નહિં તનમન\nઅનેક પરનાળ દિસે ભટકી, સંશય માંહિ સળંગ\nદાસ લાભુ એમ કહે છે રે, નિજ ધર્મને જાણવો.....એવી"
  },
  {
    "title": "157. દેખ પ્રભુ આજ તારે દ્વારે આવ્યો રણછોડરાય",
    "slug": "157-dekh-prabhu-aaj-tare-dware-aavyo-ranchhodray",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 157,
    "lyrics": "દેખ પ્રભુ આજ તારે દ્વારે આવ્યો રણછોડરાય, \nતું કેમ બોલે નહિં ભગવાન.....(ટેક)\nભક્ત તણા તમે છો રખવાળા, ચરણાગત્ત નાં હો પ્રતિપાળા\nછપ્પન ભોગ હરિથાળ ભરેલા, પૂજારી તમને વિનવે ઘણેરા\nખાવો ન પીવો જુઓ ન સામુ, હે કરૂણા નિધાર.....તું કેમ\nમહેતાજી કો મોહ મિટાવી, દ્વારકાનાથે હૂંડી સ્વીકારી\nરામલીલા રંગ પ્રગટ બતાવી, સદા રહેતી આપ સહાઈ\nગાવે જબ હી રાગ કેદારા, ભૂલી દેહનું ભાન.....તું કેમ\nમીરા તણા તમે ઝેર જીરવ્યા, ગિરધર સંગે સદા વિચર્યા\nસદાય સાથમેં રમત રમૈયા, એકનાં અનેક રૂપ જ લીધા\nઅંતે સમાયા આપ ચરણમાં, ગાતા હરિગુણ ગાન....તું કેમ\nસાકાર નિરાકાર રૂપ તુમ્હારા, નિજરૂપ કો કહાં રહેના\nમૂર્તિ રૂપે હરિ અહિં બિરાજે, આપ સ્વરૂપ તો કહાં બિરાજે\nહું તો મળવા આવ્યો પ્રગટ સુખને, કરવા સફળ કામ......તું કેમ\nકાલા ઘેલા વચન સાંભળી, કહે પૂજારી હરી ધર્યા માંહી\nદિધી ડૂબકી દ્વારકા ત્યાં હિ, સાક્ષાત હરી બિરાજે અહિં\nમળ્યા અજમલને પ્રેમે કરીને, દાસ લાભુનાં નાથ.....તું કેમ"
  },
  {
    "title": "158. જાકી સેવા થકી જીવ તરશે નક્કી ભવપારા",
    "slug": "158-jaki-seva-thaki-jiv-tarshe-nakki-bhavpara",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 158,
    "lyrics": "જાકી સેવા થકી જીવ તરશે નક્કી ભવપારા\nધન્ય ધન્ય ગુરૂદેવ હમારા.....(ટેક)\nજેનાં ચરણ તિરથ સમાના, પામી છૂટે આ માનગુમાના\nધ્યાના નિત્ય મેં ધ્યાવું, હરદમ ગુરૂ ગુણ ગાવુ, પ્રાણ આધારા.....ધન્ય\nગુરૂ સેવા વિના સૂકા જ્ઞાના, ગુરૂ સેવા વિના નહિં ધ્યાના\nજાણી ગુરૂ મરજી કરૂ સેવા સર્વથી, ભાવ અપારા......ધન્ય\nકાયા ચરણની દાસી બનાવી, ગુણ ગાય નિત્ય ચારેય વાણી\nભાન સાચી તું માન, ગુરૂ સેવા પ્રમાણ દિલ વિચારા....ધન્ય\nદેહ સર્વ પ્રકારે ગુરૂનો દાસ, મન નિત્ય રહે તેની પાસ\nદાસ દાસાનો દાસ, રાખ ગુરૂ વિશ્વાસ, લાભુ તમારા......ધન્ય"
  },
  {
    "title": "159. ભક્તિ કરોને ભલા ભાવથી",
    "slug": "159-bhakti-karone-bhala-bhavthi",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 159,
    "lyrics": "ભક્તિ કરોને ભલા ભાવથી, કરજો ભલેરા કામ\nશિખામણ રૂડી દિલમાં માનજો, રહેજો સંતો નાં ધામ.....(ટેક)\nમળ્યો રે મોંઘેરો દેહ માનવી, કરજો કિંમત એણીવાર\nભરમ મેં ભટકશો નાં ભૂલમાં, ગ્રહીને ગુરૂનો આધાર.....ભક્તિ\nસાચા રે વેપારી વ્હાલા સંત છે, સદગુરૂ દિન દયાળ\nકૂડ રે કપટ ને પરહરી, મન અર્પો ગુરૂજી ની પાસ......ભક્તિ\nજ્ઞાન રે દિપક ગુરૂજી આપશે, સદગુરૂ ભગવાન આપોઆપ\nમનુષ્ય ન લેખો તેને પ્રાણીયા, નહિંતર નકામો આ ભાર......ભક્તિ\nસર્વ રે પદાર્થનો હું આત્મા, ગુરૂ સેવા એ ખુશ થાઉ\nબીજા કોઈ કર્મ મને નહિં રિઝવે, લાભુ નિત્ય ગુરૂ ગુણ ગાઉ.....ભક્તિ"
  },
  {
    "title": "160. ભલા રે કહુ ભલી એક વાતડી",
    "slug": "160-bhala-re-kahu-bhali-ek-vatdi",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 160,
    "lyrics": "ભલા રે કહુ ભલી એક વાતડી, તુ તારો જ કર વિચાર\nતારૂ રે સ્વરૂપ તું ભૂલી ગયો, માન્યો પડછાયામાં સાર......(ટેક)\nદિપડો પકડવા વાનરને, મારે પડછાયામાં લાત\nવાનર ભાગે  ભય ભીતથી,ખરેખર પડીને પકડાય......ભલા રે\nફરતા કાચ અરીસા તણા, પુર્યું શ્વાન તે ઘર માંય\nભસી રે ભસીને મરે ભયથી, સમજે નહિં નિજ છાંય.......ભલા રે\nપ્રતિબિંબ તારો આ દેહ છે, પ્રતિબિંબ જગત સાર\nબિંબ રૂપે છો તું આત્મા, કર ગુરૂ જ્ઞાન વિચાર......ભલા રે\nભલી રે વાત એક ભાતની, જગત ભાત છે અપાર\nદાસ રે લાભુ ચેતન એક છે, નિજ રૂપ તે જ વિસ્તાર.......ભલા રે"
  },
  {
    "title": "161. ગુરૂ બિના કોણ કરે શુભકારી",
    "slug": "161-guru-bina-kon-kare-shubhkari",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 161,
    "lyrics": "ગુરૂ બિના કોણ કરે શુભકારી\nબોલત દુનિયા બહુત પ્રકારે, સ્વાર્થ સગપણ ધારી......ગુરૂ\nમોહ ધરે માતપિતા બહુ, પુત્રદેહ પર વારી\nનિકલ ગયો જબ પ્રાણ દેહ સે, તુરત દિએ જલાઈ.......ગુરૂ\nદેહ છતાં બને પુત્ર અકર્મી, મુવો માને સમજાઈ\nસ્વાર્થ છૂટ્યો જબ સંસારી, દિએ સગાઇ વિસારી....ગુરૂ\nબને કોઈ મતવાલો મન સે, પ્રભુ મેં ચિતા લગાવી\nબિગડ ગયો કહે સગા સંબંધી, એસી દુનિયાદારી --- ગુરૂ\nશુભકારી સર્વેમાં આત્મા, ગુરૂ દિએ ઓળખાવી\nઉગમેશ્વર સદગુરૂ પ્રતાપે, દાસ લાભુ સુખકારી.....ગુરૂ"
  },
  {
    "title": "162. તે તો તું જ બોલે ભગવાન",
    "slug": "162-te-to-tu-j-bole-bhagwan",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 162,
    "lyrics": "તે તો તું જ બોલે ભગવાન, નહિં કદી ન્યારો\nઆ પાંચ તત્વની માંય, બોલનહારો\nરહી કાયા નગરની માંય, સદા એકતારો.....એને ગુરૂગમથી વિચાર....(ટેક)\nખેલ કર્યો રે ખાવિંદ કેવો, જુદા જુદા દિદાર\nકર્મ કાર્ય કરણી જુદી, ઘાટ ઘડયા અપાર, ખેલ ધણી તારો......તે તો\nકોઈ બ્રાહ્મણ, કોઈ ચાંડાલ, રામ રંક હોશિયાર\nકોઈ તપસ્વી, કોઈ કુકર્મી, જ્ઞાની અજ્ઞાની ગમાર, મનમાં વિચારો......તે તો\nવર્ણ અભિમાન, દેહ અભિમાન, કુળ અભિમાન અપાર\nદેહરૂપ થઈ મારૂ માન્યુ, જાણ્યો નહિં કિરતાર, બોલનહારો......તે તો\nદેહમાં દેવ આત્મા પોતે, જાણ્યો નહિં મદાર\nઓળખી લે તું આપમાં આપે, છેટો નથી લગાર, ધણી લાભુ તારો......તે તો"
  },
  {
    "title": "163. તારા પ્રેમને પડછંદે સૌ કોઈને જગાડી",
    "slug": "163-tara-premne-padchhande-sau-koine-jagadi",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 163,
    "lyrics": "તારા પ્રેમને પડછંદે સૌ કોઈને જગાડી, તું દેજે સંદેશો એક પ્રેમનો.......\nતોડી ભેદ ભ્રમણા, બેડી સ્વાર્થ દુબજાની, તું રહેજે પૂરક એક પ્રેમનો......\nતારા દિલ વાદળમાં ઘનઘોર મચાવી, બીજ ચમકાવે ચમક પ્રેમનો......\nતારા ભાવથી ભીની હૃદય ભૂમિ પર, ઉગે લીલુડો છોડ પ્રેમનો......\nતોડી દુબજાની આંટી, બની જાને તું માટી, તો પામીશ લીલુડો છોડ પ્રેમનો.......\nતેની શીતળ સુગંધે જગત ભાર મધ્યે, પામીશ સુગંધ તે પ્રેમનો.....\nસર્વનો પ્યારો તું, સર્વ તારા બની , સૌ રહેશે પોકારી રાહ પ્રેમનો......\nબની મસ્ત સ્વતંત્ર આઝાદ આ દિલનાં, પામી અરસ પરસ કોલ પ્રેમનો......\nમનનાં સડા, મદ ધનનાં બડા, તેને શીખવજે પાઠ એક પ્રેમનો......\nમીટે અંધારા ગંધારા દુબજાનાં જાળા, લાભુ પોકારે રાહ એક પ્રેમનો......"
  },
  {
    "title": "164. પોતે પોતાને જાણે નહિં",
    "slug": "164-pote-potane-jane-nahi",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 164,
    "lyrics": "પોતે પોતાને જાણે નહિં, તે આત્મા હત્યારો પોતે\nસૂર્ય પ્રકાશે સર્વ સ્થળે, તેને દીવો લઈને ગોતે.....(ટેક)\nઆંખ આંખને જોતી નથી, તો આંખ નથી કીધુ કોઈએ\nસર્વ રૂપનું કારણ તે છે, નામ તેનાં પર હોય......પોતે\nઅગ્નિથી અગ્નિ ને બાળવા, પાણી તૃષાવંત પોતે\nઅન્ન કહે મને ભૂખ લાગી, કેવું અચરજ કહો તે....પોતે\nસોનાની કંઠી સુવર્ણ વિયોગે , નિશદિન ઉદાસ હોતે\nભૂપ ભયો ભિખારી ઘેનમાં, ઘોર અજ્ઞાનને ઓથે....પોતે\nચૈતન્ય પદ તું નિજ આત્મા, સ્વયં પ્રકાશી જ્યોતે\nદાસ લાભુ કહે ગુરૂ વિના ગાંડા, પોતે પોતાને ગોતે....પોતે"
  },
  {
    "title": "165. ભૂતનો વળગાડ ભેળોને ભેળો",
    "slug": "165-bhutno-valgad-bhelone-bhelo",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 165,
    "lyrics": "ભૂતનો વળગાડ ભેળોને ભેળો, ભાગીને ક્યાં જઈએ\nપેટનું તે પેટને ખૂંચે, બાહિર કોને કહીએ.....(ટેક)\nઘર ત્યજીને વન સિધાવે, વન માંય ઘર તેડાવે\nપ્રગટ ઘાટ પડતા મેલી, કલ્પનાનાં ઘાટ ઘડાવે......ભૂત\nઆ ઉજ્જડ આ છે વસ્તી, મન માન્યતા કહિએ\nહું સિદ્ધ થાવ અગર થયો છું, મનથી નક્કી કરીએ.....ભૂત\nજાગૃત સ્વપ્ન સુષુપ્તિમાં, ઘર શહેર વન વસીએ\nમનની ચોકી બધે પુરી, સ્થિર ગુરૂથી કરીએ.....ભૂત\nજે સ્થિતિમાં જે દેશમાં, જે વેશમાં વિચરીએ\nમન માનવા ગુરૂ ચરણે, દાસ લાભુ નિત્ય રહીએ....ભૂત"
  },
  {
    "title": "166. શાસ્ત્રોય શું સમજાવે",
    "slug": "166-shastroya-shu-samjave",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 166,
    "lyrics": "શાસ્ત્રોય શું સમજાવે, મૂરખ મન ચડયુ ચગડોળને ચાળે\nએને શાસ્ત્રોય શું સમજાવે.....(ટેક)\nછૂં છા માં ઘડી ઘડી છોવાતો, પિંડ પવિત્રાઈ પાળે\nમનમાં ફડકો આભડછેટનો, તે કેમ મનથી ટાળે....એને\nઆંધળીને પાથરતા વહાણુ વાયુ, ઉંઘે કેવે ટાણે\nઆ આદિ ગયુ ને તે અડી ગયુ, તેમાં જન્મ ગુમાવે.....એને\nમળનો ઢગલો સો મણ પાણીએ, ધોતાય ગંધ ન જાવે\nદેહ દ્વારથી મળ રહે ઝરતા, કેમ પવિત્ર એ થાવે.....એને\nવ્યાજને લેતા મૂડી ગુમાવી, દેહ આચાર અટવાયે\nદાસ લાભુ મન જો વિચારી, ક્યાંક કરવાનું રહી જાવે......એને"
  },
  {
    "title": "167. હે ઈશ્વર તેરા નામ",
    "slug": "167-he-ishwar-tera-nam",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 167,
    "lyrics": "હે ઈશ્વર તેરા નામ, જય ગુરૂદેવ, જય ગુરૂદેવ\nતું અખિલ જગ વિશ્રામ, જય ગુરૂદેવ, જય ગુરૂદેવ......(ટેક)\nતું ઉપદ્રષ્ટા તું અનુમંતા, તું ભર્તા તું ભોક્તા \nતું મહેશ્વર તું પરમેશ્વર, તું કર્તા અકર્તા.......હે ઈશ્વર\nતું પ્રત્યક્ષ, તું અદ્રશ્ય, તું અકળ અપાર\nતું અલખ, તું અવિગત, તું વિગત સૌ સાર.....હે ઈશ્વર\nતું હે અંજન તું નિરંજન, તું નામ ઔર અનામ\nતું અગમ્ય તું હે ગમ્ય, તું સર્વસ્વ દયાળ....હે ઈશ્વર\nસર્વ સ્વરૂપે તુમ હો, તુમ હો અંદર બહાર\nઉગામ અગમ નિગમ લાભુ, તું પૂર્ણ વિશ્રામ....હે ઈશ્વર"
  },
  {
    "title": "168. જીવન સહેલ કરવાને આવ્યો",
    "slug": "168-jivan-sahel-karvane-aavyo",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 168,
    "lyrics": "જીવન સહેલ કરવાને આવ્યો, ભાવ સાગરની માંહી.....(ટેક)\nરત્ન રૂડા રત્નાકરમાં ડુબકી દેવા જાઈ\nઅધવચ જતા જોર જાઝેરા, નીર માંહી નિપજાયા\nસ્થિર થઈ તેણે તળિયાનાં ભેદ નહિં પરખાયા, તેથી મોતી નહિં મિલાયા.....સ્થિર\nનીરખી વૃક્ષ વિશાળ ઘણેરા, ફળ દિઠા બહુ સારા\nચડતા વૃક્ષે અધવચ જાતા, વા વિટોળે વિટાયા\nન દેખાય ત્યાં ઉપર નીચે, અધવચ રહી અટવાયા....સ્થિર\nબીજ નહિં કોઈ મૂળ નહિં, નહિં ડાળ પાન વિસ્તારા\nશબ્દ નહિં જ્યાં શૂન્ય નહિં, નહિં કર્મ ફાંસ વિસારા\nભેદ દર્શી ભમરા એ ભમતા, ગંધ માંહી બંધાયા.....સ્થિર\nનામ નહિં લાભુ, રૂપ નહિં, નહિં ગુણ અવગુણ મિટાયા\nનામ રૂપ ગુણથી પર, જે સદગુરૂ સંત દરશાયા\nઆપમતે અટકળે  રહીને, જ્ઞાન અહંકારે અટવાયા......સ્થિર"
  },
  {
    "title": "169. આજ દિન પ્રેમી પંખીડા રે",
    "slug": "169-aaj-din-premi-pankhida-re",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 169,
    "lyrics": "આજ દિન પ્રેમી પંખીડા રે, આવો ચેતન ચબુતરે.....(ટેક)\nસર્વ મહેલ છે તેથી નીચા, નીચી બજાર કચેરી\nનીચા મંદિર માળીયા, નીચા મહેલ કારભારી\nસર્વથી ઉંચો તારો ચબૂતરો, દેખાય શોભા સારી\nસર્વ મળીને સાથે રમશુ, કરશુ પ્રેમ સગાઈ......આજ\nસાચા મોતીનો ચારો ચરવા, ભરવા હૃદય ભંડાર\nજૂદી જૂદી દિશાથી આવે, જૂદા રંગ દર્શાયે\nઆવ્યા ચબૂતરે એક છાંયામાં, મટી ગયા રંગદોરંગી\nસર્વ મળીને સાથે ચણશુ, મોતી સાચા અભંગી......આજ\nન દેખાય ત્યાં ઉંચા નીચા, શહેર મહેલ અટારી\nજૂદા જૂદા ન લાગે ચૌટા, એકરસ શોભા સારી\nબહુ ઉંચો એ તારો ચબૂતરો, નીચા ગગનનાં તારા\nચંદ્ર સૂર્ય એ નીચે ચાલે, ચબુતરા નિરાધારા......આજ\nજ્ઞાની સમાયા, ધ્યાની સમાયા, સમાયા યોગી તપસી\nકર્મ અહંકારી કોઈ ન પહોંચ્યા, અધવચ પડીયા લપસી\nપહોંચ્યા કોઈ પ્રેમી પંખીડા, તન મન શુદ્ધ વિચારી\nપ્રેમ વિલાસી, ગુરૂ વિશ્વાસી, ચિદ્રુપ લાભુ ચિતારી.....આજ"
  },
  {
    "title": "170. ભગવા ધરી કયું ભટકો ભાઈ",
    "slug": "170-bhagwa-dhari-kayu-bhatko-bhai",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 170,
    "lyrics": "ભગવા ધરી કયું ભટકો ભાઈ, વેશ મેં પાર ન પાયો\nમાયાને તમે જાણો જોગી, ભેખમેં કયું ભરમાયો......(ટેક)\nરત્નખાણ સમ સ્ત્રી વગોવી, ભેદ બિન કયું અથડાયો\nમાતા નાં જાયા અનેક સિધ્યા, તુમ ભી કહાં સે આયો.....ભાઈ\nજનક રાજાને અષ્ટાવક્ર મળીયા, અનાદિ ધર્મ બતાયો\nરાજપાટ સ્ત્રી ધન ભોગવી, જીવનમુક્ત કહેવાયો.....ભાઈ\nશ્રી કૃષ્ણ વાસુદેવ ઘેર જનમ્યા, દ્વારકા રાજ ચલાયો\nસોળ સે ગોપી વ્રેહ કરી, તે બાળ બ્રહ્મચારી કહેવાયો....ભાઈ\nભેદ સમજ્યા બિન ભોગ ભોગવે, સ્વાદ મેં જે અટવાયો\nનિશ્વે તે તો જાવે નરક મેં, જે વિષય મેં લપટાયો.....ભાઈ\nમનકો ભેખ ધરો મેરે ભાઈ, ભેદ કી ભભૂતિ લગાવો\nદાસ લાભુ ને સદગુરૂ મળીયા, ઓહી ભેદ બતાયો.....ભાઈ"
  },
  {
    "title": "171. વાસના જીતવા બને સંન્યાસી",
    "slug": "171-vasna-jitva-bane-sannyasi",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 171,
    "lyrics": "વાસના જીતવા બને સંન્યાસી, દૈહિક કર્મને ત્યાગે\nત્યાગ કરવાનો ત્યાગ ન થાય, ભ્રમણા મનની ન ભાંગે....(ટેક)\nદેહ તો સદા કર્મથી બનેલો, કર્મ થકી દેહ ચાલે\nકર્મ વિના દેહ ઘડી ન રહેવે, તો કર્મ ત્યાગી કેમ થાવે.......વાસના\nઇન્દ્રિયો મન નિયમમાં લાવે, કરે કર્મ પ્રારબ્ધે \nહાનિ - લાભ, સુખ દુઃખની માંહે, રહેવે સહજ સ્વભાવે.....વાસના\nઆજ આવ્યું તે ભોગવી, હરખ શોક ન ધારે\nપ્રભુ પ્રત્યે પણ રહેવે નિષ્કામ, જગમાં તે શું માંગે......વાસના\nઆત્મા મદારી દેહ મરકટ છે, વિધ વિધ નાચ નચાવે\nએ નાચથી જગત રીજે, મદારી મન નહિં કાંઈ......વાસના\nદેહ છે કર્મથી, કર્મ છે દેહનાં, ગુરૂમુખી ગમ પાવે\nઅસંગ સ્વરૂપ સોહમ સમાવે, લાભુ ગુરૂની માંહે......વાસના"
  },
  {
    "title": "172. સરળ સ્વાભાવ રહે બ્રહ્મજ્ઞાની",
    "slug": "172-saral-swabhav-rahe-brahmgyani",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 172,
    "lyrics": "સરળ સ્વાભાવ રહે બ્રહ્મજ્ઞાની, હિલમિલ રહે જગ માંહી.....(ટેક)\nજે કુળ દેહિક વર્ણ ધર્મ સૌ, પાળે દેહિક માંહી\nમન કર્મ વચન થકી, તે સૌને રહે સુખદાઈ......સરળ\nઆત્મા માં રમતો આત્મ સ્વરૂપી, આત્માનંદે આનંદી\nઆત્મા ભિન્ન ન ભલે જગતમાં, સદા સ્વરૂપમાં રાજી.......સરળ\nકર્મ નહિં અવશેષ બાકી પણ, બને પર હિતકારી\nકરે કરાવે સત્યકર્મ તે, જીવને બોધ સમજાવી.......સરળ\nકર્મ કરે તોય ફળ નવ ધારે, ન કરે તો નહિં હાની\nસઘળુ કર્તા છતાં અકર્તા, આત્મપદ સમાઈ......સરળ\nબ્રહ્મજ્ઞાની તે જ શુદ્ધ સ્વરૂપી, દેહ વ્યવહારે સંસારી\nદાસ લાભુ ઉગ્મેશ્વર જોઈ, શુદ્ધ સ્વરૂપ દિલ ધારી......સરળ"
  },
  {
    "title": "173. વિષયસુખમાં રહે મન જેનું",
    "slug": "173-vishaysukhma-rahe-man-jenu",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 173,
    "lyrics": "વિષયસુખમાં રહે મન જેનું, આશા પાસે બંધાઈ\nસુખ જે માને વિષયના સુખને, કેમ તે નિજ સુખ માણે.....મન\nભૂખ્યો મનુષ્ય જેમ ભૂખ ટાળવા, છાલોતરા પણ ખાવે\nઆત્મસુખ અનુભવ વિના, વિષયસુખ વખાણે.....મન\nમૃગજળ દેખી હરણા દોડે, વ્યાકુળ તૃષાથી થાવે\nતૃષા ન છિપતા અકળાઈ મરે, અંતે દુઃખ ઉપજાવે.......મન\nવિષય સુખ શરૂઆતમાં, સુખનો આભાસ કરાવે\nસુખ નહિં પણ દુઃખનો પાયો, સુખ શોક કરાવે......મન\nકડવી દવા લાગે દરદીને, મહારોગ મિટાવે\nઆત્મસુખ પ્રાપ્તિ પહેલા, કઠિન ઘણેરૂ લાગે.......મન\nવાસના જીતી ઇન્દ્રિય વાળે, હું પણુ જે ત્યાગે\nનિર્માની થઈ રહેવું જગતમાં, એ જ કઠિન કહાવે......મન\nમહારોગ માટે આ મનનો, સદગુરૂ વૈદ મિલ જાવે\nદાસ લાભુ સદગુરૂ કૃપાથી, જન્મ મરણ રોગ જાવે.......મન"
  },
  {
    "title": "174. સર્વ દેવમાં દેવ હું છું",
    "slug": "174-sarva-devma-dev-hu-chu",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 174,
    "lyrics": "સર્વ દેવમાં દેવ હું છું, દેવીમાં છું દેવી\nઇષ્ટ ફળ પણ હું જ આપુ, પ્રભુ કહે વાત એવી.....(ટેક)\nચંડિકા, અંબિકા, બહુચરાને, સરસ્વતી, શારદા જેવી\nમુજ આત્મ વિશેષણ સર્વે, મુજ કળા છે કેવી......સર્વ\nફળ ઈચ્છાએ ભજે દેવોને, સ્વર્ગની વસ્તુ લેવી\nતે દેવરૂપમાં હું જ બનીને, આપુ વસ્તુ તેવી.....સર્વ\nમૂંઢ જન અજ્ઞાને કરીને, દેવ જૂદા રહ્યા હેરી\nમુજ સ્વરૂપ આત્મા ન જાણે, અજ્ઞાને ફરે  ફેરી......સર્વ\nસર્વ દેવમાં દેવ સ્વરૂપે, આત્માને લ્યો સેવી\nદાસ લાભુનાં નાથ બિરાજે, ઘાટે ઘાટમાં ઘેરી.....સર્વ"
  },
  {
    "title": "175. કર્તા છતાં અકર્તા આત્મા",
    "slug": "175-karta-chata-akarta-aatma",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 175,
    "lyrics": "કર્તા છતાં અકર્તા આત્મા, ભેદ એ લેવો જાણી.....(ટેક)\nરાજાએ એક નગર વસાવ્યુ, વાત એવી કહાવી\nરાજાને શું કરવું પડે છે? તે તો અસંગ સદાઈ......કર્તા\nમોજા ઉદ્ભવે સમુદ્ર થકી, સમુદ્રને તે નહિં કાંઈ\nથાવા મટવાનું તે નથી કહેતો, તે આપે બને ને અલપાઈ....કર્તા\nઝાડ પાન ફળ સર્વ ઉદ્ભવે, પૃથ્વીમાં તે થાઈ\nપૃથ્વીને કાંઈ ઉપાધી ન ઉપજે, અક્રિય રહે સદાઈ......કર્તા\nઆત્મા રાજાનાં દેહ નગરમાં, મન ઇન્દ્રિય કારભારી\nદાસ લાભુ એ રાજ મળતા, પોતે તે રૂપ થાય.......કર્તા"
  },
  {
    "title": "176. મૂળ તત્વને મેલી માનવ",
    "slug": "176-mul-tatvane-meli-manav",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 176,
    "lyrics": "મૂળ તત્વને મેલી માનવ, ફોટરે રહ્યો કુટાઈ......(ટેક)\nઆત્મા તત્વ પિછાન નહિં ને, કર્મે રહ્યો બંધાઈ\nવૈદિક કર્મો કરે ઘણેરાં, સ્વર્ગ ઈચ્છા ધરાઈ....માનવ\nકલ્પતરૂ તળે બેસી માનવ, માંગળા ઝોળી બનાઈ\nકલ્પતરૂ તળેથી ઉઠી, રહ્યો છે ભીખ મંગાઈ......માનવ\nગંગાજળ શુદ્ધ ઉદક માંહી, નાહ્યો નહિં તું પ્રાણી\nખારા પાટમાં ખૂબ પ્રેમથી, કાદવ માંહી કુટાઈ......માનવ\nધન વિનાનાં કણસલાને, મસળવા તું ધાઈ\nજે સુખમાં તે આનંદ માન્યો, અંતે મહા દુઃખ દાઈ....માનવ\nમોટા મોટા કર્મ કરે પણ, આત્મા અર્પણ નવ થાઈ\nદાસ લાભુ એ કર્મ ભોગી, આવાગમને અથડાઈ......માનવ"
  },
  {
    "title": "177. પ્રેમ રહિત આપા પણે જે",
    "slug": "177-prem-rahit-aapa-pane-je",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 177,
    "lyrics": "પ્રેમ રહિત આપા પણે જે, કરે ભક્તિ ઉપચાર\nઆત્માપદની ઈચ્છા ન મનમાં, વિષય સુખ વિચાર......(ટેક)\nવરરાજા વિના જાન એક ચાલી, શોભાનો નહિં પાર\nનથી જેનું કોઈ ઠામ ઠેકાણુ, અંતે થાશે ખુંવાર....પ્રેમ\nપારસમણી વેચી કરીને, કોદાળી લીધી કુંભાર\nમાટી ખોદીને ઘાટ ઘડીને, સુખ ગોત્યુ ગમાર....પ્રેમ\nઆત્માનંદ અઢળક સુખ, આપમાં ન જોયુ આપ\nબીજ ચંદ્ર પ્રકાશ જેવું, વિષય સુખ વિલાસ....પ્રેમ\nગુરૂ કરી કોઈ સાર શોધતા, પારસ દિયે પરખાય\nદાસ લાભુ એ આત્મસુખ, સતગુરૂ મળે અપાર......પ્રેમ"
  },
  {
    "title": "178. તન વાડી કા જુઓ તમાશા",
    "slug": "178-tan-vadi-ka-juo-tamasha",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 178,
    "lyrics": "તન વાડી કા જુઓ  તમાશા, સતગુરૂએ સમજાયા હે\nજ્યાં જોઉ ત્યાં હુવા નિવાસા, એક જ આપ સમાયા હે.....તન\nમહા કૂપ એ પ્રેમ જળ ભર્યો, નાભિ કમલ બીચ આયા\nશ્વાસ ઉશ્વાસ બે હુવા માલિક, ઉપજ ધણી કી માયા હે.....તન\nનુરત સુરત કી વરત રાસડીયા, દ્વાદશ આંગુલ પૈયાં હે\nપાછા ભરતાં ફેર ઠલવાતા, નિરંતર કોશ કઢાયા હે......તન\nસુરતા રાશ પર બેઠા શામળો, નિશદિન નિર બહાયા હે\nઉલટ સુલટ મેં ચલતા કોશ, તે પ્રેમ પ્રવાહે પાયા હે.....તન\nપ્રેમ જળ ઈ પાઈ ખેતરમેં, કણ સવાયા કરાયા હે\nદાસ લાભુ મેરે સદગુરૂ ઐસા, ઐસી ખેડ ખેડાયા હે......તન"
  },
  {
    "title": "179. રામનામ તું ભજી લે પ્યારે",
    "slug": "179-ramnam-tu-bhaji-le-pyare",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 179,
    "lyrics": "રામનામ તું ભજી લે પ્યારે, હરદમ હરદમ ધ્યાન ધરી\nબક બક કરના બંધ કરી દે, વૈખરી વાણી વિચાર કરી.....(ટેક)\nજે ક્ષેત્રમાં કણ ન નિપજે, તે ક્ષેત્રમાં શું ખેડ કરી\nમિથ્યાવાદમાં ફોગટ ભૂલ્યો, ફળ ચાખ્યુ નહિં કોઈ જરી......રામનામ\nડાળ પાન મેં જળ સિંચન હો, ડાળ પાન સબ જાય ખરી\nમૂળ ગ્રહી કર સેવન મૂળ મેં, ફળ પાવે વિસ્તાર સરી.....રામનામ\nમૂળ તપાસી જો \"તૂંહી\" તુજ મેં, કારણ રૂપ રહ્યો કોણ ઠરી\nબોલે બોલાવે સબ ઘટ સ્વામી, સાક્ષી રૂપે રહ્યો હરી......રામનામ\nઆપ સ્વરૂપે એ રહ્યો આત્મા, સોહમ રામ રણુંકાર કરી\nદાસ લાભુ ભજ ભજ ગુરૂ કો, ભવસાગર એમ જાણે તરી......રામનામ"
  },
  {
    "title": "180. વિચારો જુઓ મેરે ભાઈ",
    "slug": "180-vichari-juo-mere-bhai",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 180,
    "lyrics": "વિચારી જુઓ મેરે ભાઈ, ગાણા ગાવાથી પાર ન થાઈ.....(ટેક)\nગાઈ વાઈ ને વાજા બજાવે, એમ ગાય છે ઘણી ભવાઈ\nએવાં વેપારમાં ખોટ આવે, પાસે નહિં વધે પાઈ.....ગાણાં\nદિન પર દિન જાય છે વહ્યા, શ્વાસા ખાલી સબ જાય\nઅમૂલ્ય ભંડાર નજરે પડયો, કરી લ્યો કોઈ કમાઈ.....ગાણાં\nસત્તસંગમાં સત્ત ઓળખાણુ, તેનાંથી ભક્તિ થાય\nજેને મનમાં માયા વ્હાલી, હરિ નહિં રીજાય.....ગાણાં\nતન મન ધન ગુરૂને સોંપો, મનથી દ્વૈત મીટાઈ\nદાસ લાભુ કહે સતગુરૂ મળીયા, અગમ શાન બતાઈ......ગાણાં"
  },
  {
    "title": "181. ફોગટ કયું ફીર જાવે મુસાફિર",
    "slug": "181-fogat-kayu-fir-jave-musafir",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 181,
    "lyrics": "ફોગટ કયું ફીર જાવે મુસાફિર, ફોગટ કયું ફીર જાવે......(ટેક)\nલખ ચોરાસી છૂટવા માટે, મનુષ્ય દેહ હરિ આપે\nબહુ ભટક્યો ચારેય ખાણમાં, તું કેમ ભૂલી જાવે.....મુસાફિર\nઅમૂલખ અવસર આજ મળ્યો, મનુષ્ય દેહની માંય\nજો ભૂલશો તો પસ્તાશો, ભવો ભવ રહ્યા ભટકાવે......મુસાફિર\nસમજ સમજ મનવા શાણાં, સમજણ શાંતિ પાવે\nજાણ્યા નર તે જીત્યા જગમાં, ઔર સબ અટકાવે.......મુસાફિર\nઆવ્યો ફેરો કરી લે નિવેડો, લખ ચોરાશી મિટાવે\nરામ ભજન કર રૂદિયા માંહી, દાસ લાભુ એમ ગાવે.....મુસાફિર"
  },
  {
    "title": "182. જેનું માયામાં મનડુ મોહ્યુ રે",
    "slug": "182-jenu-mayama-manadu-mohyu-re",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 182,
    "lyrics": "જેનું માયામાં મનડુ મોહ્યુ રે, સત અસત તેને નહિં જડે\nમૂરખ માયામાં અંધ થયો રે, અંતે ચોરાસીમાં પડે.....(ટેક)\nસદા માનવી મોહી રહ્યો ધન સંપતિ માંય\nઆઠે પહોર લાગી રહી, માયા તાણી મન લ્હાય\nતે અનેક પાપ કર્મ કરે રે, ધનને માટે આદરે....જેનું\nમાયાનાં આવરણે ઘેરાયો, જેમ કાગે ઘેર્યુ ઘૂડ\nમાયાની મોટપમાં મોહી રહ્યો, જેમ કેસર મળીયું ધુળ\nએવો આવ્યો અવસર ચૂકે રે માયાનાં પુરમાં તણાઈ.....જેનું\nહું હું કરી હડકીયો ફરે, મારા તારણો જંજાળ\nકર્મ કરી કામી રહ્યો, દાન ન દીધું લગાર\nપછી કાળ આવ્યો અંત સમયે, પસ્તાવો મન ઘણું કરે.....જેનું\nમનુષ્ય જન્મ એળે જાશે, કાં જપ્યો નહીં જગદિશ\nહંસલો ઉડતા વાર નહિં લાગે, કાળ ઝંબુળે શીશ\nએમ દાસ લાભુ ચેતો રે, કાળ ચક્કર માથે ફરે......જેનું"
  },
  {
    "title": "183. એવી જીવદશાને મેલી રે",
    "slug": "183-evi-jivdashane-meli-re",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 183,
    "lyrics": "એવી જીવદશાને મેલી રે, મનનાં વેગને પારખો\nદેહપણાનાં જે કર્મો રે, આત્મામાં નવ ઓળખો.....(ટેક)\nઆતમરૂપ બનવા સારૂ, વેચી દે જાત ભાત\nઉંચ નીચનો ભેદ મૂકી, ભાંગી મનની ભ્રાંત\nકર્મ પ્રમાણે જાત ભાસે રે, આત્મા એક જ નિરખો......એવી\nજનમ્યો ત્યારે હતો અનામી, ન હતી દેહની ભાન\nજાત ભાત મન કાંઈ નહિં, આતમ રૂપ અનામ\nતે દેહ અધ્યાસ સાથે રે, આતમરૂપ ભૂલી ગયો.......એવી\nજેવો વાસ તેવો અધ્યાસ, જાતિ કર્મ જોઈ\nદેહરૂપ પોતે બની ગયો, હું પદમાં રહ્યો મોહી\nએવો પૂરણ બ્રહ્મ રૂપ આત્મા રે, દેહપણામાં દાખવ્યો......એવી\nસદગુરૂ જેને મળે સાચા, આતમ દિયે ઓળખાય\nસંસારમાં સરસો રહે, તોય માયામાં નહિં લોપાય\nદાસ લાભુ અભય બનવા રે, હું પદ ગઢને ભાંગવો.....એવી"
  },
  {
    "title": "184. જેણે શ્વાસ ઉશ્વાસને જાણ્યા રે",
    "slug": "184-jene-shwas-ushwasne-janya-re",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 184,
    "lyrics": "જેણે શ્વાસ ઉશ્વાસને જાણ્યા રે, સુરતા નામમાં લગાવી\nતે સહેજે સમાધિ સાધે રે, તારમાં તાર મિલાવી.....જેણે\nસાચા સતગુરૂ મળતા, મળે ખટ દર્શનની ભાન\nહરદમે રટણા ઈ રટે, લાગે નાભિકમલ પાર ધ્યાન\nગુરૂ ગોવિંદ રૂપ જાણે રે, ભવફેરા દુઃખ નાખે કાપી.....જેણે\nનવ નાડીકા મૂળ દબાવી, આસન ગોઢ બંધાય\nસતગુરૂને સુરતામાં લાવી, ગુપ્ત ધ્યાન લગાય\nતંઈ ઉલટ પવન ચડાવે રે, બંકનાળે બદલાવી....જેણે\nચંદ્ર સૂરજ એક ઘરમાં, જ્યોતમાં જ્યોત મિલાઈ\nરમ રામ રણુંકાર મેં, તેજમાં તેજ મળી જાય\nતેને બ્રહ્મનિષ્ઠ યોગી કહીએ રે, સુરતા શબ્દમાં સમાવી.....જેણે\nઓહંગ સોહં એક કરી જાણે, ચંદ્ર સૂરજ ઉજાસ\nઅક્કલ અનુપમ પ્રગટ હે, પરિબ્રહ્મ કી પાસ\nનિર્વાણપદ તેને કહીએ રે, દાસ લાભુ ખોજે તન માંહી......જેણે"
  },
  {
    "title": "185. એવાં નિર્વાણપદની રમત રે",
    "slug": "185-evan-nirvanpadni-ramat-re",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 185,
    "lyrics": "એવાં નિર્વાણપદની રમત રે, મરજીવા કોઈ સંત જાણે\nતે બ્રહ્મરસનાં ભોગી રે, અજર અમર સુખ તે માણે....એવી\nમનુષ્ય દેહ તે મુક્તિ મળી, તેમાં જુક્તિનો ખેલ\nપાંચ તત્વને નિરખતા, માંહી વસે છે સેલ વસેલ\nતેને જાણ્યા વિના નહિં સિધે રે, સર્વ સંત તેને વખાણે......એવી\nચાર જુગનાં ચાર મહાત્મા, કરતા તેની સેવ\nઅઠ્યાવીશ હજાર ઋષીમુનીઓ, ભવ ઉતર્યા છે એમ\nએવું બ્રહ્મ તત્વ ચિન્હે રે, કેવલ પદ નિત આરાધે......એવી\nસર્વ દેવ એમ સેવતા નિજ નામ આધાર\nદશ અવતારને આશા એની, સતગુરૂ છે સરદાર\nતે અખંડ સ્નાન અર્ધમાત્રા રે, ગુરૂગમ થકી સંત જાણે.....એવી\nવસ્તુ તે અમૂલ્ય છે, સતગુરૂ ઘરમેં આબાદ\nઅલખ શબ્દને ઓળખે, છૂટે ચોરાશી ખાણ\nલાભુ સતગુરૂ સાચા રે, ભવસાગર તે નક્કી તારે......એવી"
  },
  {
    "title": "186. સંતો પ્રાણ ગતિ તપાસો રે",
    "slug": "186-santo-pran-gati-tapaso-re",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 186,
    "lyrics": "સંતો પ્રાણ ગતિ તપાસો રે, પ્રાણાયમ ધ્યાન ધરવા\nએવાં ઉલટથી સુલટમાં લાવો રે, અખંડ શાંતિ લાવવા......સંતો\nશ્વાસા આંગુલ બાર ચાલે, સાધારણ ગતિ પ્રાણ\nઓછો ચાલે શાંતિ રહે, વધ્યે આયુષ્યની હાણ\nકોઈ કુંભક કરી માંહી પૂરે રે, પ્રાણ ગતિ બદલાવવા....સંતો\nચંદ્ર સૂરજ કી બીચ હે, સુખમણા કા વાસા\nગંગા જમના સરસ્વતી હે, ત્રિવેણી કા તમાસા\nજે બાર આંગળને બુઝે રે, પૂરણ શાંતિ સ્થાપવા......સંતો\nચંદ્રમા સૂરજ મિલાવી, સુખમણા ધ્યાન લગાયા\nહાથપગ નવ ઇન્દ્રિય વિના, સહેજે પ્રાણાયમ થાય\nઈ સહેજ સમાધિ સાંધે રે, અખંડ સુખ અનુભવવા.....સંતો\nદમ પર દમ કોઈ હરિ ભજે, નાદ બુંદ કો જોગ\nગુરૂ શિષ્ય એકરૂપ રહે, જનમ મરણ મિટે રોગ\nએમ લાભુ કહે ગુરૂ ધારો રે, પ્રાણાયમને જાણવા.......સંતો"
  },
  {
    "title": "187. પલ સુખ પામર રે",
    "slug": "187-pal-sukh-pamar-re",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 187,
    "lyrics": "પલ સુખ પામર રે, મોહ્યો શું રે માનવી રે\nસ્વપ્ન સરીખો જીવન તણો છે સાર....પલ સુખ\nમનવો એમ જાણે રે, સારા કામ સંસારનાં રે\nમોહ્યો એમ ક્ષણિક માયા માંય રે.....પલ સુખ\nપ્રગટ્યો પરપોટો રે, જળ કેરા જૂથમાં રે\nફૂટતા તેને નહિં લાગે પલવાર રે......પલ સુખ\nબીજ તિથિ ચંદ્ર રે પ્રકાશ કેવો આપશે રે\nએવું આ સંસાર સુખ લગાર રે.....પલ સુખ\nપૂનમ રૂપ પૂરણ રે, પરમાત્મા પરિબ્રહ્મ છે\nતેને પામ્યે અમરાપુરમાં વાસ રે......પલ સુખ\nદાસ લાભુ કહે છે રે, ગુરૂદેવ પ્રતાપથી\nસતગુરૂનું સુખ છે અગમ અપાર......પલ સુખ"
  },
  {
    "title": "188. મેં હું વૈરાગી રે",
    "slug": "188-mem-hu-vairagi-re",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 188,
    "lyrics": "મેં હું વૈરાગી રે, ધણી તારા નામનો રે\nનામ વચનમાં નિરભે તમારો આધાર.....મેં હું\nમૂળ વૈરાગે રે, મન જેનાં માનીયા રે\nતેમાં તમે આપે વસો તતકાળ......મેં હું\nપ્રહલાદની પત રાખી રે, મૂળ નામ વૈરાગથી રે\nબળતા ઉગાર્યા છે બિલાડી કેરા બાળ......મેં હું\nતોળી રૂપાંદે તાર્યા રે, સંતને સમાગમ રે\nનામ વચને ગુણિકા તરી પલવાર......મેં હું\nઆદિ અંત મધ્યે રે, સંત ઓધારણ શામળા\nદાસ લાભુનાં તમે છો દિન દયાળ......મેં હું"
  },
  {
    "title": "189. દેખો આ જગતમાં મન કારભારી",
    "slug": "189-dekho-aa-jagatma-man-karbhari",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 189,
    "lyrics": "દેખો આ જગતમાં મન કારભારી,  કબ્જે કાર્ય છે દેશ ઝાઝા રે\nઆત્માને વિસારીને પોતે બની ગયો, હું પદથી મેલી માઝા રે.....(ટેક)\nવેપાર કરવો હિરામાણેકનો, સામટી મૂડીનાં કિધા સાટા રે\nગાફેલ રહ્યોને ખોટ જ ખાધી, લાખ ચોરાશી કરજ આડા રે.....દેખો\nમૂળગી મૂડી ખોઈ મૂરખ શું મોહ્યો રે, હરિ ભજનનાં કાઢ્યા દેવાળા રે\nહિરા માણેકને વ્હોરવા તું આવ્યો રે, કથીરનાં વેપારે શું કમાયા રે.....દેખો\nમાંડ રીજ્યો તો શેઠ શામળીયો, મનુષ્ય દેહ રતન દિધા ઝાઝા રે\nદાસ લાભુ મન રાખો ગુરૂ ચરણમાં, જ્ઞાન રૂપી સર્વે સાઝા રે......દેખો"
  },
  {
    "title": "190. મુસાફિર જો વિચારી તું",
    "slug": "190-musafir-jo-vichari-tu",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 190,
    "lyrics": "મુસાફિર જો વિચારી તું, કહાં કૌન દેશ હે જાના\nનહિં કોઈ રાહ તેરે પાસ, ઔર જાને કા ઠિકાના.....(ટેક)\nરેન અંધેરી બહુત હે, વિકટ હે રાહ અનજાના\nઉસમેં ગલતી કિસકી, કયું નહિં દિપક પ્રગટાતા....મુસાફિર\nનહિં કોઈ સંગ ખોરાકી, નહિં ભંડાર ત્યાં અન્નકા\nન લીધા સાથમેં કોઈ, દેતે હો કિસકો ઠપકા....મુસાફિર\nઅજ્ઞાની રેન હે અંધી, ચોરાશી વાટ ભટકાના\nભૂલ્યો શીદ મોહમાયામાં, લીયા નહિં જ્ઞાન કે ધ્યાન.....મુસાફિર\nહવે સમજી જરા તું જો, ગ્રહી સતગુરૂ કે જ્ઞાના\nમમતા મોહ ત્યાગ કે, લાગે લાભુ હરિ ધ્યાના........મુસાફિર"
  },
  {
    "title": "191. શું રે ધરૂ સતગુરૂજી હું તમને નહિં કુછ ગુરૂજી હમારા રે",
    "slug": "191-shu-re-dharu-satguruji-hu-tamne",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 191,
    "lyrics": "શું રે ધરૂ સતગુરૂજી હું તમને નહિં કુછ ગુરૂજી હમારા રે\nજો કુછ મેરી નજર મેં આવે, વો સબ હે ગુરૂજી તુમ્હારા રે\nસબ હે ગુરૂજી તુમ્હારા મેરે દાતા, તુમ્હારા સભી વિસ્તારા.....(ટેક)\nશું રે ચરણમાં અર્પુ મેરે દાતા, કેમ કરી કહુ મેરા રે\nકેમ રે નવરાવુ તમને ચંબુ જળ માંહી, બાર મેઘ કરે તમ સેવા રે\nશું રે ચંદન તમને પુષ્પ ચઢાવું, વ્હાલા તમને અઢારેય વનસ્પતિનાં હેવા રે........\nધૂપ રે દિપનું તમને શું રે અજવાળું વ્હાલા, જ્યાં કોટીક સૂર્ય ઉજીયારા\nશું રે તમને હું હીંચોળું રે વ્હાલા, જ્યાં અનેક વાયુ વિસ્તારા......\nમારા રે દિધા વસ્ત્રો તમે કેમ પહેરો વ્હાલા, ધારણ કરેલ જગ સારા\nકેમ રે પોઢાડુ જમાડુ હું  તમને, તમે પાલખમાં કેમ સમાણા.......\nઝિણામાં ઝિણુ વળી મોટામાં મોટુ, તું જ તત્વ અણુ સમાના\nઅનેક બ્રહ્માંડા તુ જ એક રોમ સે, એવા અનંતના કેમ કરૂ ધ્યાના.......\nસતગુરૂ વિના સમજણ જૂઠી કયું, કરતા વાદ વિવાદા રે\nસતનામ સમજી નિરખી લે ભાઈ, મીટ જાય મન કા વિખવાદા રે........\nપ્રેમ વિના પ્યારા પ્રભુ નહિં રીઝે, ગુરૂગમ વિના અંધકારા રે\nદાસ લાભુ સતગુરૂ આશા લીજે, ગુરૂદેવ કરે ઉજીયારા......"
  },
  {
    "title": "192. કાળ લેશે ઘેરી અંતે કોણ ત્યાં બેલી રે",
    "slug": "192-kal-leshe-gheri-ante-kon-tya-beli-re",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 192,
    "lyrics": "કાળ લેશે ઘેરી અંતે કોણ ત્યાં બેલી રે\nપ્રભુનાં ભજન વિના કોણ તારૂ બેલી......(ટેક)\nસગાને સહોદર મેલી, પડી રહેશે ધનની થેલી\nપડી રે રહેશે તારી, માયાને હવેલી....પ્રભુનાં\nઉડી જાશે શુદ્ધિ તારી, દેહ જાશે સર્વે હારી\nકર્યા રે કરમ તારા, દેખાશે વેરી.....પ્રભુનાં\nજમડાને જોઈ ભાઈ, મનડુ બહુ બીસે ભારી\nઉપાડશે જીવને, દેહને પણ મેલી.....પ્રભુનાં\nકર્મનાં લેખા માંગી, આપશે ચોરાશી ખાણી\nદાસ લાભુ ચેતો એની, વારસ કરો વહેલી......પ્રભુનાં"
  },
  {
    "title": "193. દેખ્યા અજબ તમાશા",
    "slug": "193-dekhya-ajab-tamasha",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 193,
    "lyrics": "દેખ્યા અજબ તમાશા, મેરે સતગુરૂ કે ઘર વાસા.....(ટેક)\nઆદિ અનાદિ અગન કૂંડ હે, પંડિત એક નિવાસા\nઅહોનિશ ત્યાં યજ્ઞ કરતા, હોમ હવન એક પાસા.......દેખ્યા\nપલ પલમેં દિની હે આહુતિ, દમ દમ કર્યા ઉજાસા\nસત વચન ઉઠત હે મંત્ર, તું હી શબ્દ ભણ સ્વાહા......દેખ્યા\nયજ્ઞ કૂંડ કે આસન ઉપર, સંત સર્વે નિવાસા\nસબ દેવન કા મોક્ષ વહાં હે, પુર્ણાહુતિ નિર્વાણા.....દેખ્યા\nપ્રસન્ન કિયા અલખ ગુરૂકો, આરતી કરે અજાયા\nદાસ લાભુ અમર ગુરૂ પાયા, કબહુ નહિં હે નાશા....દેખ્યા"
  },
  {
    "title": "194. દેહ નથી તું ચેતન આત્મા",
    "slug": "194-deh-nathi-tu-chetan-aatma",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 194,
    "lyrics": "દેહ નથી તું ચેતન આત્મા, નિજ સ્વરૂપ કર ભાન.....(ટેક)\nકોટિક કાળનો અભ્યાસી જીવ, દેહમાં હું પેડ ભાન\nદેહ તો બન્યો પંચભૂતનો, વેદ શાસ્ત્ર પ્રમાણ....દેહ નથી\nઘર છે તારૂ તું ઘર નાંહી, તે સત્ય કર નિદાન\nરહિશ છ ઘડી તે ઘર માંહી, છોડી દે મિથ્યાભિમાન.....દેહ નથી\nછે તું સિંહ અજ નથી તું, આપ સ્વરૂપ પિછાન\nઅરીસા રૂપ સતગુરૂ કરીને, સત્ય સ્વરૂપ નિજ માન.....દેહ નથી\nસોહમ સ્વરૂપ નિજ આત્મા હે, છોડી દે દેહ અભિમાન\nદાસ લાભુને સતગુરૂ મળીયા, પ્રગટ કિયા બ્રહ્મજ્ઞાન......દેહ નથી"
  },
  {
    "title": "195. સતગુરૂ તો તેને કહીએ",
    "slug": "195-satguru-to-tene-kahie",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 195,
    "lyrics": "સતગુરૂ તો તેને કહીએ, આત્મ સ્વરૂપ ઓળખાવ્યુ.......(ટેક)\nભેખ ન ધર્યો ભલે વેશ ન કાઢ્યો, મન સદા જેણે માર્યુ\nહોય સિદ્ધ ભલે રહે સંસારી, ગુણ લક્ષણ આચારૂ.......સતગુરૂ\nસત પુરૂષ હે સદાચારી, સદ્ બોધી મન સારૂ\nશુભ નિષ્ઠા શુભ ગુણ સંપન્ન, સદાય પરમ દયાળુ.....સતગુરૂ\nસમદ્રષ્ટિ વળી શાંતિ ધિરજ, ક્ષમાવાન કૃપાળુ\nકામક્રોધ મદ લોભ નાંહી, વિષય થકી મન વાળ્યુ.......સતગુરૂ\nબ્રહ્મ જ્ઞાની વળી અનુભવ સિદ્ધિ, સતગુરૂ તારક જાણુ\nદાસ લાભુ સતગુરૂ ચરણ મેં, તન મન ધન ઓવારૂ.......સતગુરૂ"
  },
  {
    "title": "196. હું કોણ છું તે જો તું જાણે",
    "slug": "196-hu-kon-chu-te-jo-tu-jane",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 196,
    "lyrics": "હું કોણ છું તે જો તું જાણે, જન્મ મરણ ત્યારે ટળશે......(ટેક)\nદેહ હું છું તેવું માન્યુ, તે કર્મ બંધન કરશે\nકર્તા ભોક્તા તું થઈ બેઠો, જીવ ચોરાશી ફરશે....હું કોણ છું\nદેહ જન્મે છે દેહ વધે છે, દેહ તો નક્કી મરશે\nદેહપણામાં બંધાઈ રહે તો, જન્મ મરણ નહિં મટશે......હું કોણ છું\nદેહ નથી તું દ્રષ્ટા તેનો, બ્રહ્મજ્ઞાને સમજાશે\nશુદ્ધ ચૈતન્ય છો બ્રહ્મ સ્વરૂપી, સતગુરૂ દ્વારા દેખાશે.....હું કોણ છું\nદેહ છતાં તું દેહથી ન્યારો, સોહમ આપ ઉજાશે\nદાસ લાભુ સતગુરૂ મળ્યેથી, આપ સ્વરૂપ ઓળખાશે.....હું કોણ છું"
  },
  {
    "title": "197. શ્રવણ મનન નિધિધ્યાસ કરવુ",
    "slug": "197-shravan-manan-nidhidhyas-karvu",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 197,
    "lyrics": "શ્રવણ મનન નિધિધ્યાસ કરવુ, મુમુક્ષ જને સદાય.....(ટેક)\nચિત્ત ચપળતા ત્યજી એકાગ્રે ધીર ધરી મન માંય\nસદગુરૂ જ્ઞાન શ્રવણ કરવું તે, ત્યજી સર્વે કામનાથ.....શ્રવણ\nસદગુરૂ જ્ઞાન શ્રવણ કર્યુ તે મનમાં દ્રઢ કરાય\nસંશય તેનાં નાશ જ પામે, મનન તે જ કહાય.....શ્રવણ\nમનન કરેલુ બ્રહ્મજ્ઞાનમાં, રહેવું બ્રહ્મ અભ્યાસી \nઈયળ ભમરી ધ્યાન થકી, ઈયળ ભમરી થાય....શ્રવણ\nશ્રવણ મનન નિધિધ્યાસ થકી, મિથ્યા ભ્રમ મિટાય\nદાસ લાભુ કહે નિત્ય આત્મા, સતગુરૂ દિયે સમજાય.....શ્રવણ"
  },
  {
    "title": "198. કર્મ કહ્યા છે ત્રણ રૂપે",
    "slug": "198-karma-kahya-che-tran-rupe",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 198,
    "lyrics": "કર્મ કહ્યા છે ત્રણ રૂપે, પ્રારબ્ધ સંચિત ક્રિયામાણ.....(ટેક)\nસંચય કરેલા એકઠા કર્મો, રહે સુક્ષ્મ શરીર\nસંચિત કર્મ કહે છે તેને, રહે અજ્ઞાન યુક્ત.....કર્મ\nવર્તમાનકાળે ચાલુ દેહે, કર્મ જે કરાય\nક્રિયામાણ કહે છે તેને, વેદ વદે છે વાણી.......કર્મ\nપૂર્વથી કરેલા કર્મોથી, પ્રારબ્ધે દેહ બંધાય\nતે કર્મ પ્રારબ્ધથી તો, દેહાદિક ભોગ ભોગવાય.....કર્મ\nસુખ દુઃખ હાનિ લાભ તે, પ્રારબ્ધ આધિન થાય\nદાસ લાભુ કહે પ્રારબ્ધ મિટે, પંચભૂત કર્મ મિટાય......કર્મ"
  },
  {
    "title": "199. પચ્ચીસ તત્વનો સુક્ષ્મ દેહ છે",
    "slug": "199-pachchis-tatvano-sukshma-deh-che",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 199,
    "lyrics": "પચ્ચીસ તત્વનો સુક્ષ્મ દેહ છે, તે પણ તું નહિં ભાઈ.....(ટેક)\nઅંતઃકરણ મન બુદ્ધિ ચિત્ત, અહંકાર તે પંચ કહાઈ\nસ્ફુરણ ચિંતવન સંકલ્પ, નિશ્ચય તેથી કરાય......પચ્ચીસ\nવ્યાન સમાન ઉદાન પ્રાણ, અયાન વાયુ કા હોય\nવહન કરે છે સ્થુળ દેહ માંય, જૂદી જૂદી ક્રિયા........પચ્ચીસ\nનાક કાન આંખ જીભ ચામ, પાંચ તેજની હોય\nપંચ કર્મેન્દ્રિય જળ તત્વની, કર્મ તેથી કરાઈ.......પચ્ચીસ\nપાંચ ભૂતનાં પચ્ચીસ તત્વ, સુક્ષ્મ દેહ દર્શાય\nદાસ લાભુ કહે આપ સ્વરૂપ, સુક્ષ્મ દેહે નાંહિ.....પચ્ચીસ"
  },
  {
    "title": "200. સંચિત ક્રિયામણ નાશ પામે",
    "slug": "200-sanchit-kriyaman-nash-pame",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 200,
    "lyrics": "સંચિત ક્રિયામણ નાશ પામે, સતગુરૂ મળે મહાજ્ઞાની......(ટેક)\nઆ દેહનાં એકઠાં કરેલા, કર્મ સંચિત કહેવાય\nવર્તમાને થતા કર્મો, ક્રિયામાણ કહેવાય......સંચિત\nસંચિત ક્રિયામાણ પાપ કર્મો, બ્રહ્મજ્ઞાનીનાં જે હોય\nનિંદા કરનારા પાપ કર્મ લે, પુન્ય સેવક લઈ જાય......સંચિત\nદેહધારીને પાપ પુન્ય છે, ભલે હોય આતમજ્ઞાની\nદેહપણુ જેને નથી દિલમાં, તે કર્તા ભોક્તા નાંહી.......સંચિત\nપ્રારબ્ધ થકી આ દેહ બંધાયો, તે ભોગવે મહાજ્ઞાની\nદાસ લાભુ પ્રારબ્ધે સુખ દુઃખ, દેહ તણાં લ્યો જાણી.......સંચિત"
  },
  {
    "title": "201. પ્રારબ્ધ કર્મ ભોગવે તે જ્ઞાની",
    "slug": "201-prarabdha-karma-bhogve-te-gyani",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 201,
    "lyrics": "પ્રારબ્ધ કર્મ ભોગવે તે જ્ઞાની, દેહ થકી સદાય......(ટેક)\nપૂર્વે કરેલા સંચિત કર્મ, પ્રારબ્ધે બંધાય\nએ જ પ્રારબ્ધે દેહ ચાલે, પ્રારબ્ધ છૂટ્યે છૂટી જાય......પ્રારબ્ધ\nપ્રારબ્ધ કર્મ જો નાશ પામે તો, દેહ પણ નાશ થઈ જાય\nભોગવ્યા વિના તે ન છૂટે, મનુષ્ય અવતાર માંય.....પ્રારબ્ધ\nપ્રારબ્ધ કર્મ છૂટતા હોય તો, રામ દુઃખ ન પાય\nનળ યુધિષ્ઠિર વન નવ રખડે, પ્રારબ્ધ જો મિટ જાય.......પ્રારબ્ધ\nપ્રારબ્ધ કર્મ મારા નથી, તે દેહ તણાં તે જાણ\nદાસ લાભુ કહે જીવન મુક્ત, કર્મ રહિત સદાય.......પ્રારબ્ધ"
  },
  {
    "title": "202. એક ક્ષણવાર જો ચિત્ત વિરામે",
    "slug": "202-ek-kshnanvar-jo-chitt-virame",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 202,
    "lyrics": "એક ક્ષણવાર જો ચિત્ત વિરામે, બ્રહ્મ સ્વરૂપની માંય.....(ટેક)\nકોટિક કાળનાં કરેલા કર્મો, તે જ સમયે બળી જાય\nબ્રહ્મ સ્વરૂપ જેણે નક્કી કર્યુ, એક પલ મન માંય.....એક ક્ષણ\nજપ તપ જોગ કર્યાથી અધિક, પરમ પદ એ પાય\nકાળ ઝપાટો ન આવે તે પર, અમરપદ એ કહાય.....એક ક્ષણ\nકોટી જન્મનાં મહા પુરૂષાર્થે, બ્રહ્મપદ ઉર ભાવે\nવગળવંશીને વાત કરે તો, ઉલટુ મન ગભરાવે......એક ક્ષણ\nસર્વ જગતનું ડેન કર્યુ જેણે, કોટી યજ્ઞ ફળ આવે\nબ્રહ્મરૂપ ગુરૂ પદ અધિક, લાભુ નિત નિત ગાવે....એક ક્ષણ"
  },
  {
    "title": "203. સમજ સમજ હો મનવા મેરા",
    "slug": "203-samaj-samaj-ho-manva-mera",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 203,
    "lyrics": "સમજ સમજ હો મનવા મેરા, પીછે બહુત પસ્તાયેગા\nયહ જીવન હે દો દિનોકા, જમ કે હાથ સપડાયેગા......(ટેક)\nયહ સંસારમેં બહુત હાટ હે, હિરા માણેક ઔર રતન કો\nલોહ કથીર ઔર શાક બકાલે, વણજ હે ભાત ભાત કા......સમજ\nકરને આયા વણજ હિરાકી, સોદા પડયા કથીર કા\nશાક બકાલુ લીલામાં મોહ્યો, ખોયા વણજ હિરે કા......સમજ\nયહ નર દેહ મળ્યો ભવ તરવા, દ્વારા મિલા ચોરાશી કા\nખુજલી ભઈ જો માયા વિષયની, ચોરાશી કોટ પુરાયેગા......સમજ\nસતગુરૂ કરી ખરો સાર શોધી લે, રાહ પકડ હરિ ભજને કા\nકોઈ દિન મેરે નાથ નિવાજે, બેડા પાર કર લાભુ કા.....સમજ"
  },
  {
    "title": "204. લે લે લ્હાવ જીવ અભાગી",
    "slug": "204-le-le-lhav-jiv-abhagi",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 204,
    "lyrics": "લે લે લ્હાવ જીવ અભાગી, અવસર બહુત ભલા આયા\nઅમૂલખ નામ પ્રભુનાં ત્યાગી, મીઠી લાગી તને માયા......(ટેક)\nકાયા માયા કા રૂપ બડા હે , ધન  જોબન અરૂ સુત દારા\nકાયમ નહિં તે સબ કોઈ જાને, ઝાંકળ જળ જયું અલપાયા.....લે લે\nસાથે ન લાવ્યો કાંઈ જરીયે, સાથે ન આવે આ કાયા\nક્ષણિક સુખ મોહ નિવાસી, અજ્ઞાને જીવ ભરમાયા.....લે લે\nસત્ય ને અસત્ય માનીને, અસત્યમાં મન રાચ્યા\nસત્ય પ્રભુ પિછાન્યા નહિં, વિષય સુખ મેં રીઝવાયા.....લે લે\nકર્મ કરે જીવ લખ ચોરાસીનાં, તે જ કર્મ મનુષ્ય કિયા\nદાસ લાભુ કહે અમૂલ્ય અવસર, ક્ષણિક સુખ મેં ખોઈ દિયા.......લે લે"
  },
  {
    "title": "205. મત ભટકે મેના પિંજર કી",
    "slug": "205-mat-bhatke-mena-pinjar-ki",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 205,
    "lyrics": "મત ભટકે મેના પિંજર કી, પઢ સોહં સોહં સુરત સે\nખોજે તું તુજે  કહાં સે, નિજ સ્વરૂપ તેરી સુરત મેં......(ટેક)\nજી સે ખોજે  વહી તું જ સ્વરૂપ હે, નહિં મિલે યહ જગતમેં\nજ્ઞાન ધ્યાન પરખી અનુભવ સે, જાણી મર્મ ગુરૂ વચન મેં.....મત\nભટકત ભટકત બહુત ભુલાયા, ભુલ્યા જગત કી હરકત મેં\nપારખ પદ પાવે કોઈ જ્ઞાની, નિજ સ્વરૂપ હે હરદમ મેં......મત\nદમ કદમ પર સુરતા ધરકે, ગુરૂગમ ગ્રહે અમૃત મેં\nઝરે ઝારો અખંડ અહોનિશ, સોહં અમરપદ પલ પલ મેં....મન\nમૂળમાં આસન દ્રઢ કરીને, આપ ઓળખ આપ ગુરૂગમ સે\nનિત ભજતા દમે દમ માંહી, દાસ લાભુ ગુરૂ વચન મેં......મત"
  },
  {
    "title": "206. મત અટકે મેના પિંજર કી",
    "slug": "206-mat-atke-mena-pinjar-ki",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 206,
    "lyrics": "મત અટકે મેના પિંજર કી, અબ દૂર દેશ પર જાના હે\nયહ હરદમ કે તાર મિલાવી, સોહં સોહં ગાના હે......(ટેક)\nઅટક અટક મેં ખટક બડી હે, કપટ નફ્ફટ તજાના હે\nસોહમ કી એ સડક સીડી મેં, ચટક ચટક ચલાના હે......મત\nઝટપટ તજી ખટપટ મનકા, પંચ પ્રપંચ મિટાના હે\nયહ દેશ કે બડા તમાશા, સતગુરૂ ઘર પિછાના હે......મત\nનટ કરે પટ ખેલ જહાં જટ, સુરત નુરત મેં સમાના હે\nનુરત નિશાન પકડ સોહં કે, સબઘટ એ જ સુનાના હે......મત\nપાંખ બે આંખ ઔર ઉડે નિશદિન, રાહ બડે અનજાના હે\nતુંહિ તુંહિ કરકે પંખી મેરા, લાભુ સતગુરૂ શાણા હે......મત"
  },
  {
    "title": "207. અચરજ દેખ્યા હમે આ દુનિયા મેં",
    "slug": "207-acharaj-dekhya-hame-aa-duniyama",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 207,
    "lyrics": "અચરજ દેખ્યા હમે આ દુનિયા મેં, ભાત ભાતનાં ઉપાય કરે\nલીયા પથ્થર કી નાવ સાથ મેં, ભવસાગર કેમ  પાર તરે.....(ટેક)\nસુંદર શહેરમાં ગુફા એક મોટી, સદા અંધકાર ત્યાં વાસ કરે\nધોકા મારીને કાઢે અંધારા, પ્રકાશ વિના કહો કેમ ટળે......અચરજ\nલેકર બચ્ચુ એક ઘેટાનું, ગોપાળ નિત નિજ કાંધે ધરે\nકૂવા નીરમાં દ્રશ્ય નિહાળે, તેમાં તે બચ્ચુ કેમ જડે......અચરજ\nજપ તપ અરૂ પુન્ય દાન કર્યાથી, કર્મ કરે તેવાં ફળ મળે\nઆપ સ્વરૂપ કો જાણ્યા વિના, મોક્ષ પદમાં તે કેમ ભળે......અચરજ\nસતગુરૂ મળે સત્ત જ્ઞાન પ્રકાશી, સોહં સ્વરૂપ હે નિજ પદે\nદાસ લાભુ સતગુરૂ વિના, ધોખો મનનો નહિં મટે......અચરજ"
  },
  {
    "title": "208. ભજી લે હરદમ મેં રઘુ રાયા",
    "slug": "208-bhaji-le-hardam-mem-raghu-raya",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 208,
    "lyrics": "ભજી લે હરદમ મેં રઘુ રાયા, ભજી લે હરદમ મેં રઘુરાયા......(ટેક)\nયહ સંસાર સ્વપ્ને કી બાજી, દેખી જીવ ભરમાયા\nદેખત દ્રશ્ય નાશ જ પામે, રહે ન તેરી કાયા....ભજી લે\nભૂલત ભૂલત સબ સંસારી, મીઠી લગત હે માયા\nઘડી પલવારમાં અલપાય જાશે, જૈસે બાદલ છાંયા......ભજી લે\nનર દેહ કા કર આજ નિવેડા, કહાં સે તુમ અહિં આયા\nકોન કર્મ તુ જે કરને કો દિયા, મનુષ્ય અવતારા.....ભજી લે\nભવ સાગર મેં નાવ સ્વરૂપી, ચોરાશી છૂટવા આયા\nકર સુકાની સતગુરૂ કો, લાભુ કો મન ભાવા......ભજી લે"
  },
  {
    "title": "209. જાગ જાગ મનવા પ્રભાત ભયો",
    "slug": "209-jag-jag-manva-prabhat-bhayo",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 209,
    "lyrics": "જાગ જાગ મનવા પ્રભાત ભયો, અજ્ઞાન નિંદ્રા ત્યાગ રે......(ટેક)\nમનુષ્ય દેહ દિધો ભજન માટે, ઉઠી હરિ સંભાળ રે\nસંસાર વ્યવહાર કામની માંહી, કરવાનુ ભૂલી જાય રે......જાગ\nભૂલ્યો ભમરા ભ્રમણા માંહી, પડછાયામાં પછડાય રે\nમાયા ઓળો પડયો તારા પર, તેનાથી શીદ ઢંકાય રે......જાગ\nપારસમણી હાથ આવી, કથીરમાં શું માંગ રે\nમાયા મોહન સાથ પડયા છે, માંગી લે એક ભાગ રે......જાગ\nધુમ્ર સમાન માયા છે મિથ્યા, ઉડતા ન લાગે વાર રે\nધિક ધિક મનવા તેમાં મોહ્યો, ભુલવણીને ત્યાગ રે......જાગ\nક્ષણ ભંગુર આ દેહને દેખી, કેમ ન આવે વૈરાગ્ય રે\nદાસ લાભુ કહે પ્રભુ ભજ્યા વિના, ચડવું જમને  લાગ રે.....જાગ"
  },
  {
    "title": "210. ચેતી લે મૂરખ ચેતી જા મનવા",
    "slug": "210-cheti-le-murakh-cheti-ja-manva",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 210,
    "lyrics": "ચેતી લે મૂરખ ચેતી જા મનવા, અંતકાળ કોઈ નહિં સાથ રે......(ટેક)\nકર્મ કરીને કામી રહ્યો છે, બાંધવું સદાય પાપ રે\nશેર અનાજ ઉદર ભરને કો, કરી રહ્યો ઉત્પાત રે......ચેતી લે\nપાપ કરી ધન ભેગુ કિધુ, કામ્યો તુ લાખ બે લાખ રે\nશેર અનાજની સગાઇ તારે, ફોગટ રહ્યો ફસાઈ રે......ચેતી લે\nમૂકી મોલાતુ માળીયા કિધા, હરામની માયા હાથ રે\nપુત્ર માટે પરાયુ લેવાં, ઈચ્છા કરે મન માંય રે....ચેતી લે\nભેગુ કર્યુ તારા ભેળુ નહિં આવે, ભલે ખાશે તારા બાળ રે\nપૈસો મેળવવાનાં પાપ કર્મ, આવશે તારા સંગાથ રે....ચેતી લે\nધનમાલનાં સૌ ધણી થાશે, કર્મ તારા સુવાંગ રે\nલાભુ કહે તારા અંતકાળે, પાડશે મોટી બાંગ રે......ચેતી લે"
  },
  {
    "title": "211. અખંડ સમરણ સાધે યોગી",
    "slug": "211-akhand-samran-sadhe-yogi",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 211,
    "lyrics": "અખંડ સમરણ સાધે યોગી, મન પવનને બાંધી રે......(ટેક)\nઉનમુન હોકર આસન બેઠા, સુરતા શબ્દમાં સાંધી રે\nહોઠ કંઠ જીભ હલાવ્યા વિના, અખંડ ધૂન રહી લાગી રે....અખંડ\nનવ દરવાજે શાંતિ કિધી, ત્રિવિધ તાપને ઠારી રે\nવૃત્તિ ધજાને વીંટી લઈને, ફગવા ન દિધી બારી રે......અખંડ\nઉનમુન થઈને અગમ ઘરની, ઉઘાડવી છે બારી રે\nઅગમ ઘરમાં આપ બિરાજે, સતગુરૂ અંતરયામી રે.......અખંડ\nઅગમ ઘરને આડા તાળા, છ પાંખડે કૂંચી સારી રે\nદાસ લાભુ મેરે સદગુરૂ દાતા, મહેર કરી બતાવી રે......અખંડ"
  },
  {
    "title": "212. સબ ઘટ વ્યાપક એક જ આતમ",
    "slug": "212-sab-ghat-vyapak-ek-j-aatam",
    "authorSlug": "labhu-dada",
    "category": "લાભૂ દાદા",
    "sortOrder": 212,
    "lyrics": "સબ ઘટ વ્યાપક એક જ આતમ, લ્યો સંત વિચારી.....(ટેક)\nકિડી કુંજર પ્રાણી પદારથ, સબ મેં રહ્યો સમાઈ રે\nસ્થાવર જંગમ એક જ રૂપે, પોતે આપ વિસ્તારી રે.......સબઘટ\nરાજા રંક બ્રાહ્મણ ચાંડાલ, બાળ જોબન વૃદ્ધ માંહી રે\nઆત્મા છે એક જ સ્વરૂપે, કર્મ જૂદા દેખાઈ રે.......સબઘટ\nનામરૂપ સૌ ન્યારા દિસે, કળા નાથ તમારી રે\nરૂપ રૂપની પ્રકૃતિ નોખી, ભુલવણી ભાત બનાવી રે.......સબઘટ\nનામરૂપ સૌ નાશવંત છે, અખંડ લ્યો વિચારી રે\nદાસ લાભુ અખંડ અજન્મા, આત્મા લે સંભારી રે......સબઘટ"
  },
  {
    "title": "213. નિરવરતિ પરવરતિ પરખી",
    "slug": "213-nirvarati-parvarati-parakhi",
    "authorSlug": "ugaram-bapa",
    "category": "ઉગારામ બાપા",
    "sortOrder": 213,
    "lyrics": "નિરવરતિ પરવરતિ પરખી, સંકલ્પ વિકલ્પને દૂર કરો\nઆમાં જીવન મુક્તિ જાણી, તમે સંતોષવરને વરો.....(ટેક)\nઆ છે અવલ કવલની સાધના, તેનું સહેજે સમરણ કરજો\nઅનાદિ વચન છે ગુરૂદેવનું, તેનું ધ્યાન તમારી નાભીમાં ધરજો.......\nઆ છે પોતાનાં પુણ્યનાં પારખા, તમે ગુપતદાન દેજો\nસર્વમાં શાંતિ તપ સોહમ છે, તે તમારો આત્મા ઓળખી લેજો.......\nઈ વૃક્ષરૂપે તો એક જ છે, તેમાંથી દ્વાદશ પ્રગટ્યા છે ડાળા\nઅનુભવથી ઓળખો તો, સોહમપદ છે બાવન અક્ષરથી બારા......\nદમ કદમનાં દોરમાં ચાલે, તે નિર્ભયપદને નિહાળો\nદસમાં સોહમમાં સુરતા લગાવો તો, ઝરે છે અખંડિત ઝારો......\nઈ વચન સદગુરૂએ શ્રવણે સુણાવ્યો, તે જરાય નથી જૂઠો\nસત્તસંગરૂપી પાટી કરી, વચન વતરણેથી તમે એક જ એકડો ઘૂંટો......\nઅનુભવી ઈ સ્કૂલમાં અભેવચન સદગુરૂએ શ્રવણે સુણાવ્યા\nદાસ ઉગાને ગુરૂ હિરસાગર મળ્યા, ત્યારે આ દેહમાં દરશાણા......"
  },
  {
    "title": "214. નિર્ભય નામ વિચારો હરિજનો નિર્ભય નામ વિચારો",
    "slug": "214-nirbhay-nam-vicharo-harijano",
    "authorSlug": "ugaram-bapa",
    "category": "ઉગારામ બાપા",
    "sortOrder": 214,
    "lyrics": "નિર્ભય નામ વિચારો હરિજનો નિર્ભય નામ વિચારો\nજે ભવસાગરનો આરો, હરિજનો નિર્ભય નામ વિચારો.......(ટેક)\nજોલી તર્ક વિતર્ક મનનાં, ગુરૂ વચન ઉર ધારો\nનિશ્ચળ વૃત્તિ કરો ગુરૂ મેં, મીટે ભવ ભટકારો.......હરિજનો\nઅખંડ અવિચળ આત્મા, નહિં જાત વર્ણ વિચારો\nજે નિશદિન ઘટમાં ગાજે, મન પવનથી ન્યારો....હરિજનો\nહરદમ મેં હાજર રહેતા, સુરતા કરે સંઘારો\nઓહમ - સોહમ બે તાર ગાજે, વાગે છે એકતારો....હરિજનો\nસદગુરૂદેવે કૃપા કરી જબ કિયો નામ ઉજીયારો\nઉગારામ ગુરૂદેવ હમારા, હિરસાગર કિનારો......હરિજનો"
  },
  {
    "title": "215. અખંડ ઝાલર વાગે ઘટમાં",
    "slug": "215-akhand-zalar-vage-ghatma",
    "authorSlug": "ugaram-bapa",
    "category": "ઉગારામ બાપા",
    "sortOrder": 215,
    "lyrics": "અખંડ ઝાલર વાગે ઘટમાં, અખંડ ઝાલર વાગે\nગુરૂગમ જ્ઞાની જાગે ઘટમાં, અખંડ ઝાલર વાગે.....(ટેક)\nત્રણ ગુણ પર ત્રિવેણી તીરે, તારમાં તાર મિલાવે\nગગન મંડળમાં ગેબી ગાજે, સુરતા ધ્યાન લગાવે.....ઘટમાં\nત્રિકુટી આગે તેજ સ્વરૂપી, સદગુરૂ આપ બિરાજે\nસોહમ સ્વરૂપ બનકર પોતે, ગુરૂ સ્વરૂપમાં સમાવે......ઘટમાં\nઓહમ સોહમ રણુકારમાં, નિશદિન ગુરૂગમ જાગે\nઓમકાર એ નિરાકારમાં, અર્ધમાત્રા આરાધે.......ઘટમાં\nઅર્ધમાત્રા સહિત ઓમ, સબીજ શબ્દ સુહાગે\nવેદ નેતિ નેતિ પોકારે, ગુરૂ થકી લક્ષ લાગે......ઘટમાં\nદેવી દેવતાઓ ઘર ગોતે, પુરાન કુરાન વિચારે\nકહે ઉગારામ ઉગ્યા ઘટમાં, પ્રગટ જ્યોતુ જાગે....ઘટમાં"
  },
  {
    "title": "216. સદગુરૂ ભજી લે ભવપાર બેડલી થાશે",
    "slug": "216-sadguru-bhaji-le-bhavpar-bedli-thashe",
    "authorSlug": "ugaram-bapa",
    "category": "ઉગારામ બાપા",
    "sortOrder": 216,
    "lyrics": "સદગુરૂ ભજી લે ભવપાર બેડલી થાશે, નામરૂપ નાશવંત જનમ્યા તે જાશે\nએક અલિંગી નામ નિત્ય ગુણ ગાશે, તેનો થાશે બેડો પાર........(ટેક)\nનામ રૂપ ગુણ નાશવંત છે, ચોથા પદે અવિનાશ\nએ અવિનાશી સ્વરૂપ પિછાણે, અખંડ નામ નિરાકાર, અનામી કહેવાશે......સદગુરૂ\nજે જે પદાર્થ ઘાટ જુઓ, તેને તેને કલ્પયુ નામ\nતે કરાવે છે મનુષ્ય તણો, નામ ઠરાવથી બહાર, સંતો ઉપાસે.........સદગુરૂ\nમેલી ઝગડા વાક્બાણનાં, સદગુરૂ શરણ સ્વીકાર\nહિરસાગર સદગુરૂ ભેટ્યા, ઉગામ નામ નિરાકાર, રહ્યુ શ્વાસ ઉશ્વાસે........સદગુરૂ"
  },
  {
    "title": "217. હે જી વ્હાલા અખંડ રોજી હરિનાં હાથમાં",
    "slug": "217-he-ji-vhala-akhand-roji-harina-hatma",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 217,
    "lyrics": "હે જી વ્હાલા અખંડ રોજી હરિનાં હાથમાં, વ્હાલો મારો જુએ છે વિચારી\nદેવા રે વાળો નથી દુબળો, ભગવાન નથી રે ભિખારી......(ટેક)\nહે જી વ્હાલા જળને થળ તો અગમ છે, અને આ કાયા છે વિનાશી\nસર્વને વ્હાલો મારે આપશે, મન તમે રાખોને મિતવાસી......અખંડ\nહે જી વ્હાલા નવ નવ મહિના, ઉદરમાં વસ્યા, તે દી વ્હાલે જળથી જીવાડયા\nઉદાર વસ્યાને આપશે, આપશે સુતાને જગાડી....અખંડ\nહે જી વ્હાલા ગરૂડે ચડીને આવજો, આવજો અંતર જામી\nભક્તોના સંકટ તમે કાપજો, મહેતા નરસિંહનાં સ્વામી......અખંડ"
  },
  {
    "title": "218. વૈષ્ણવ જન તો તેને રે કહીએ",
    "slug": "218-vaishnav-jan-to-tene-re-kahie",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 218,
    "lyrics": "વૈષ્ણવ જન તો તેને રે કહીએ, જે પીડ પરાઈ જાણે રે\nપર દુઃખે ઉપકાર કરે તોય, મન અભિમાન ન આણે રે......(ટેક)\nસકળ લોકમાં સહુને વંદે, નિંદા ન કરે કોઈની રે\nવાચ, કાછ, મન નિશ્ચલ રાખે, ધન ધન જનની તેની રે......વૈષ્ણવ\nસમદ્રષ્ટિને તૃષ્ણા ત્યાગી, પરસ્ત્રી જેને માત રે\nજિહવા થકી અસત્ય ન બોલે, પરધન નવ ઝાલે હાથ રે.......વૈષ્ણવ\nમોહમાયા જેને વ્યાપે નહિં ને, દ્રઢ વૈરાગ જેનાં મનમાં રે\nરામનામ શું તાળી લાગી, સકળ તિરથ તેનાં તનમાં રે......વૈષ્ણવ\nવણલોભીને કપટ રહિત છે, કામ ક્રોધ નિવાર્યા રે\nભણે નરસૈયો તેનું દર્શન કરતા, કુલ એકોતેર તાર્યા રે.......વૈષ્ણવ"
  },
  {
    "title": "219. પઢો રે પોપટ રાજા રામનાં",
    "slug": "219-padho-re-popat-raja-ramna",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 219,
    "lyrics": "પઢો રે પોપટ રાજા રામનાં, સતી સીતાજી પઢાવે\nપાસે બાંધી પાંજરૂ, મુખેથી રામ જપાવે.......(ટેક)\nપોપટ તારે કારણે, લીલુડા વાંસ મંગાવું\nતેનું ઘડાવું પાંજરૂ, હીરા રતને જડાવુ......પઢો રે\nપોપટ તારે કારણે શી શી રસોઈ બનાવું\nસાકરનાં કરી ચૂરમા, ઉપર ઘી પીરસાવુ....પઢો રે\nપાંખ પીળીને પગ પાંડુરા, કોટે કાંઠલો કાળો\nનરસૈયાનાં સ્વામીને ભજો, રાગ તાણી રૂપાળો.......પઢો રે"
  },
  {
    "title": "220. ભૂતળ ભક્તિ પદારથ મોટુ",
    "slug": "220-bhutal-bhakti-padarath-motu",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 220,
    "lyrics": "ભૂતળ ભક્તિ પદારથ મોટુ, સ્વર્ગે લોકે નાંહિ રે\nપુણ્ય કરી અમરાપુરી પામ્યા, અંતે ચોરાસીની માંહી રે......(ટેક)\nહરિનાં જન તો મુક્તિ ન માંગે, માંગે જન્મો જનમ અવતારા રે\nનિત્ય સેવા, નિત્ય કિર્તન ઓચ્છવ, નિરખવા નંદ દુલારા રે.......ભૂતળ\nભરતખંડ ભૂતળમાં જન્મી, જેણે ગુણ ગોવિંદનાં ગાયા રે\nધન્ય ધન્ય તેનાં માતપિતાને, સફળ કરી તેની કાયા રે.....ભૂતળ\nધન્ય વૃંદાવન ધન્ય શ્રી ગોકુળ, ધન્ય એ વ્રજના વાસી રે\nઅષ્ટ મહાસિદ્ધિ આંગણીએ ઉભી, મુક્તિ છે તેની દાસી રે....ભૂતળ\nએ રસનો સ્વાદ શંકર જાણે, જાણે શુકદેવ જોગી રે\nકંઈક જાણે એ વ્રજની ગોપી, ભણે નરસૈયો ભોગી રે........ભૂતળ"
  },
  {
    "title": "221. નારાયણનું નામ જ લેતા",
    "slug": "221-narayannu-nam-ja-leta",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 221,
    "lyrics": "નારાયણનું નામ જ લેતા, વારે તેને તજીએ રે\nમનસા વાસા કર્મણાએ, લક્ષ્મીવરને ભજીએ રે......(ટેક)\nકુળને ત્યજીએ કુટુંબને ત્યજીએ, ત્યજીએ મા ને બાપ રે\nભગીની સુત દારાને ત્યજીએ, જેમ ત્યજે કાંસલી સાપ રે......નારાયણ\nપ્રથમ પિતા પ્રહલાદે ત્યજીયા, નવ તજીયુ હરિનામ રે\nભરત શત્રુઘને ત્યજી જનેતા, નવ ત્યજીયા શ્રીરામ રે........નારાયણ\nઋષિ પત્નીએ હરિને કાજે, ત્યજીયા નિજ  ભરથાર રે\nતેમાં તેનું કાંઈ ગયુ નહિં, પામી પદારથ ચાર રે.....નારાયણ\nવ્રજ વનિતા વિઠ્ઠલને કાજે, સર્વ ત્યજી વેન ચાલી રે\nભણે નરસૈયો વૃંદાવનમાં, માધવ સંગે માલી રે.......નારાયણ"
  },
  {
    "title": "222. તેનો જાય અફળ અવતાર રે",
    "slug": "222-teno-jay-afal-avtar-re",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 222,
    "lyrics": "તેનો જાય અફળ અવતાર રે\nતુલસીની માળા તિલક વણ પાખે, બીજા જુઠા શણગાર રે......(ટેક)\nદશ માસ માતા મહાદુઃખ પામી, અકાર જ વેઠયો ખરભાર રે \nદેહ ધરીને હરિનો દાસ ન કહાવ્યો, તેની જનનીને ધિક્કાર રે.....હરિ\nનરસૈયાનાં સ્વામિ વિના બીજા, અનેક ધર્મ વ્યાભિચાર રે\nહરિભક્તિ વિના જે જન જાવે, તેનો જાય અફળ અવતાર રે....હરિ"
  },
  {
    "title": "223. બાનાની પત રાખ પ્રભુ તારા બાનાની પત રાખ",
    "slug": "223-banani-pat-rakh-prabhu-tara-banani-pat-rakh",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 223,
    "lyrics": "બાનાની પત રાખ પ્રભુ તારા બાનાની પત રાખ\nબાનાને માટે જો દુઃખ દેશે, તો કોણ પૂરે તારી સાખ.....(ટેક)\nરોહિદાસની રે તમે રાબડી ખાધી, તે નવ જોઈ જાત કે ભાત\nશેનાં માટે સન્મુખ રહીને, તમે નાઈ કહેવાણા હો નાથ.....પ્રભુ\nપ્રહલાદની પ્રતિ તે પાલણ પાળીને, સ્તંભમાં પૂર્યો વાસ\nઉકળતી કડા તમે શીતળ કિધી, સુધનવાને પાસ....પ્રભુ\nપાંચાળીનાં ચીર પૂર્યા, ને રાખી સભામાં લાજ\nશાયરમાંથી બુડતો રાખ્યો, રામ કેહતા ગજરાજ......પ્રભુ\nઝેર હતા તેનાં અમૃત કિધાને, આપ્યા મીરાને હાથ\nમહેતાને માંડળીક મારવાને આવ્યુ, ત્યારે કેદારો લાવ્યા મધરાત.....પ્રભુ\nભક્તોનાં તમે સંકટ ભાંગ્યા, ત્યારે દ્રઢ આવ્યો વિશ્વાસ\nનરસિંહના સ્વામિને કહુ કરજોડી, જર પૂરો અંતરની આશ....પ્રભુ"
  },
  {
    "title": "224. રઝળતી રાંડનાં રડવડતા છોકરા",
    "slug": "224-razalti-randna-radvadta-chokra",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 224,
    "lyrics": "રઝળતી રાંડનાં રડવડતા છોકરા, કોણ શિક્ષા દઈ ઠોર આણે\nઅંધ ગુરૂએ વળી નિરંધ ચેલા કર્યા, બ્રહ્મની વાત તે શું જાણે.....(ટેક)\nભરમેં ભૂલા ફરે આનંદે આખડે, પૂર્ણ બ્રહ્મ પોતે ણ જાણે\nસ્વપ્નનું સુખ સાચું કરી લેખવે, પાસેથી પ્રભુને દૂર વખાણે......રઝળતી\nમૂરખ મમતા કરે ભૂતળ ભમતા ફરે, જોને રિઝાય તે કર્મકાંડે\nશ્રીમંતનું સુખ નિરધનને ન મળે, વંદન કરે ને વિષય વખાણે......રઝળતી\nનિર્ગુણ નાથને તે નિરખી ન શકે, સગુણને સુરતે ન જાણે\nચેતનની નિંદા કરે, જડની વંદના કરે, અચેત ભૂલ્યો ફરે ભિન્ન ભાવ આણે.......રઝળતી\nઅગમ ગુરૂથી નિગમ શિષ્ય નિપજ્યા, તે બ્રહ્મની વાતનો ભેદ જાણે\nપાસેથી અન્યને અળગો દેખે નહિં, કહે નરસૈંયો પાસે તે કોણ જાણે.....રઝળતી"
  },
  {
    "title": "225. રામસભામાં અમે રમવાને ગ્યા તા",
    "slug": "225-ramsabhama-ame-ramvane-gya-ta",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 225,
    "lyrics": "રામસભામાં અમે રમવાને ગ્યા તા\nપસલી ભરીને રસ પીધો રે......હરિનો રસ પૂરણ પાયો\nપહેલો પ્યાલો મારા સદગુરૂજી એ પાયો\nબીજે પ્યાલે રંગની રેલી રે....હરિનો\nત્રીજો પ્યાલો મારે રોમે રોમ વ્યાપ્યો\nચોથે પ્યાલે થાય છું ઘેલી.....હરિનો\nરસ બસ થઈ છું રંગ રસીયાની સાથે\nવાત ન સૂઝે બીજી વાટે રે.....હરિનો\nમોટા જોગેશ્વરને જે સપને ન આવે\nતે તો મારા મંદિરયામાં મ્હાલે.....હરિનો\nઅખંડ હેવાતણ મારા સદગુરૂજીએ દીધા\nઅખંડ સોહાગી અમને કિધા......હરિનો\nભલે મળ્યા મહેતા નરસિંહનાં સ્વામિ\nદાસ પરમ સુખનો રે.....હરિનો"
  },
  {
    "title": "226. હે ઓધાજી રે મારા વ્હાલાને વઢીને કહેજો રે",
    "slug": "226-he-odhaji-re-mara-vhalane-vadhine-kahjo-re",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 226,
    "lyrics": "હે ઓધાજી રે.....મારા વ્હાલાને વઢીને કહેજો રે\nમાને તો મનાવી લેજો રે, મારા વ્હાલાને વઢીને કહેજો\nમથુરાનાં રાજા થયા છો, ગોવાળોને ભૂલી ગ્યા છો\nએ માનીતીને મોલે ગ્યા છો, મારા વ્હાલાને વઢીને કહેજો\nએકવાર ગોકુળ આવો, માતાજીને મોઢે થાઓ\nગાયોને સંભારી જાઓ, મારા વ્હાલાને વઢીને કહેજો\nસરખી સાહેલીની સાથે, કાગળ લખ્યો મારા હાથે\nવાંચ્યો નથી દીનાનાથે, મારા વ્હાલાને વઢીને કહેજો"
  },
  {
    "title": "227. વ્હાલો મારો પ્રેમને વશ થયો રાજી",
    "slug": "227-vhalo-maro-premne-vash-thayo-raji",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 227,
    "lyrics": "વ્હાલો મારો પ્રેમને વશ થયો રાજી, એમાં શું કરે પંડિતને કાજી........(ટેક)\nકરમાબાઈનો આરોગ્યો ખીચડો, ને વિદૂરની ખાધી ભાજી\nજૂઠા બોર શબરીનાં ખાધા, વ્હાલે છપ્પન ભોગ મેલ્યા ત્યાગી....વ્હાલો\nવિદુરને ઘેર શ્રીકૃષ્ણ પધાર્યા, કેળા લાવ્યા તા માગી\nગર્ભ કાઢીને છાલ ખવડાવી, વ્હાલે તોય ન જોયુ જાગી....વ્હાલો\nગુણિકા હતી તે પોપટ પઢાવતી, તેમાંથી લ્હેર એને લાગી\nભગવાન તો તેને સહેજમાં મળીયા, એની સંસારની ભ્રમણા ભાંગી......વ્હાલો\nભક્તની લોકો નિંદા કરેને , જગત થયું છે પાજી\nભલે મળ્યા મહેતા નરસિંહનાં સ્વામિ, માથે ગિરધર રહ્યો ગાજી.....વ્હાલો"
  },
  {
    "title": "228. જાગને જાદવા કૃષ્ણ ગોવાળીયા",
    "slug": "228-jagne-jadva-krishna-govaliya",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 228,
    "lyrics": "જાગને જાદવા કૃષ્ણ ગોવાળીયા\nતું જ વિન ઘેનમાં કોણ જાશે?........(ટેક)\nત્રણસોને સાંઠ ગોવાળો ટોળે મળ્યા\nવડો રે ગોવાળ કોણ થાશે?.....(ટેક)\nદહીં તણા દહિંથરા, ઘી તણા ઢેબરા\nકઢિયલ દૂધ તે કોણ પીશે\nહરિ તારો હાથીયો કાળીનાગ નાથીયો\nભૂમિનો ભાર તે કોણ લેશે.....જાગને\nજમુનાનાં તીરે ગૌધણ ચરાવતા, મધુરીસી મોરલી કોણ વગાડશે\nભણે નરસૈયો તારા ગુણ ગાઈ રીઝીએ, બૂડતા બાવડી કોણ સંહાશે....જાગને"
  },
  {
    "title": "229. રાત રહે પાછલી ખટઘડી",
    "slug": "229-rat-rahe-pachhli-khatghadi",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 229,
    "lyrics": "રાત રહે પાછલી ખટઘડી, સાધુ પુરૂષે સુઈ ન રહેવું.....(ટેક)\nનિંદ્રાને પરહરી સમરવા શ્રી હરિ, એક તૂંહિ એક તૂંહિ એમ કહેવું\nજોગીયા હોય તેણે જોગ સંભાળવા, ભોગીયા હોય તેણે ભોગ ત્યજ્યા....રાત રહે\nસુકવિ હોય એણે સદગ્રંથ બાંધવા, દાતાર હોય તેણે દાન કરવું\nપતિવ્રતા નારીએ કંથને પૂછવું, કંથ કહે તે ચિત્ત ધરવુ......રાત રહે\nઆપણે આપણા ધર્મ સંભાળવા, કર્મનો લેવો મર્મ વિચારી\nનરસૈયાનાં સ્વામિને સ્નેહથી સમરતા, ફરી ન અવતરે નર ને નારી......રાત રહે"
  },
  {
    "title": "230. જેને ઘેર હરિજન હરિરસ ગાય",
    "slug": "230-jene-gher-harijan-hariras-gay",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 230,
    "lyrics": "જેને ઘેર હરિજન હરિરસ ગાય, તે તો નિત્ય ગંગામાં ન્હાય\nઅડસઠ તિરથ ગુરૂને ચરણે, દૂર ગયે શું થાય.....(ટેક)\nધ્રુવ ન્હાયા પ્રહલાદ ન્હાયા, હેતે ન્હાયા હનુમાન\nપ્રિત કરી પરીક્ષિત ન્હાયા, જોગી શુકદેવ ગાય.....જેને\nસહુ સંતો મળી ધારણ બાંધ્યુ, જ્ઞાન ગંગા તોળાય\nજપ તપ તિરથ જોડે મળીયા, તેમાં સર્વ સાધન મળી જાય.....જેને\nભલે મળ્યા મહેતા નરસિંહ નાં સ્વામિ, હેતે હરિનાં ગુણ ગાય\nજ્ઞાનગંગાનો મહિમા મોટો, મુખે કહ્યો ન જાય.....જેને"
  },
  {
    "title": "231. જ્યાં લગી આત્મ તત્વ ચિન્યો નહિં",
    "slug": "231-jya-lagi-aatm-tatva-chinyo-nahi",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 231,
    "lyrics": "જ્યાં લગી આત્મ તત્વ ચિન્યો નહિં, ત્યાં લગી સાધના સર્વ જૂઠી\nમનુષ્ય દેહ તારો એમ એળે ગયો, માવકાની જેમ વૃષ્ટિ જૂઠી....(ટેક)\nશું થયુ સ્નાન પૂજાને સેવા થકી, શું થયુ ઘેર રહી દાન દીધે\nશું થયુ ધરી જરા ભસ્મ લેપન કર્યે, શું થયુ વાળ લોચન કીધે....જ્યાં\nશું થયુ તપ ને તિરથ કીધા થકી, શું થયુ માળા ગ્રહી નામ લીધે\nશું થયુ તિલક ને તુલસી ધર્યા થકી , શું થયુ ગંગાજળ પાન કિધે....જ્યાં\nશું થયુ વેદવ્યાકરણ વાણી વદે, શું થયુ રંગને રાગ જાણે\nશું થયુ ખટદર્શન સેવ્યા થકી, શું થયુ વરણનાં ભેદ આણે....જ્યાં\nએ છે પ્રપંચ સહુ પેટ ભરવા તણા, આત્મરામ પરિબ્રહ્મ ન જાણ્યો\nભણે નરસૈયો તત્વ દર્શન વિના, રત્ન ચિંતામણી જન્મ ખોયો....જ્યાં"
  },
  {
    "title": "232. સંતો અમે રે વહેવારીયા શ્રી રામનામનાં",
    "slug": "232-santo-ame-re-vahevariya-shri-ramnamna",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 232,
    "lyrics": "સંતો અમે રે વહેવારીયા શ્રી રામનામનાં\nવેપારી આવે બધા ગામ ગામનાં.......(ટેક)\nઅમારૂ વસાણુ સાધુ સહુ કોઈને ભાવે\nઅઢારે વરણ જેને વહોરવાને આવે.....સંતો\nઅમારૂ વસાણુ કાળ - દુકાળે ન ખૂટે\nરાજા ન દંડે જેને ચોર ન લૂંટે.....સંતો\nરામનામ ધન્ય મારે વાજે ને ગાજે\nછપન ઉપર ભેર ભૂંગળ વાજે....સંતો\nલાખ તણાં તો લેખા નહિં ને પાર વિનાની પૂંજી\nવ્હોરવું હોય તો વ્હોરી લેજો, કસ્તુરી છે સોંઘી.....સંતો\nઆવરો ને ખાતાવહીમાં, લક્ષ્મીવરનું નામ\nચિઠ્ઠીમાં ચતુર્ભુજ લખીયા, નરસૈયાનું કામ......સંતો"
  },
  {
    "title": "233. નીરખને ગગનમાં કોણ ઘૂમી રહ્યો",
    "slug": "233-nirakhne-gaganma-kon-ghumi-rahyo",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 233,
    "lyrics": "નીરખને ગગનમાં કોણ ઘૂમી રહ્યો, તે જ હું, તે જ હું શબ્દ બોલે\nઈ નાથનાં ચરણે ઈચ્છુ શરણ હું, અવર ન દેખુ કોઈ એની તોલે.....(ટેક)\nરૂપ અનંત વળી બુદ્ધિ ના શકે કળી, ચડી બહુ પંથે ગયો જીવ ભૂલી\nજડને ચેતન વિશે રસ રૂપે રમી રહ્યો, પકડને તે જ સજીવન મુળી......નીરખ\nઝળહળે જ્યોત ઉદ્યોત રવિ કોટિ જ્યાં, નેતિ નેતિ કહી નિગમ ભાંખે\nઅનુપમ ઉપમા આપી શકાય શું, સત્તચિત્ત આનંદ આનંદ રૂપે.....નીરખ\nબતી વિણ, તેલ વિણ, સુત્ર વિણ જો વળી, અચળ ઝળકે સદા અનલ દીવો\nનેત્ર વિણ નિરખવો, રૂપ વિણ પરખવો, વણ જીભે રસ સરસ પીવો.....નીરખ\nઅકળ અવિનાશી એ નવ જાય કળ્યો, અરધ ઉરધની માંહે મહાલે\nનરસૈંયાનો સ્વામી સકળ વ્યાપી રહ્યો, પ્રેમનાં તંતમાં સંત ઝાલે....નીરખ"
  },
  {
    "title": "234. અખિલ બ્રહ્માંડમાં એક તૂં શ્રી હરિ",
    "slug": "234-akhil-brahmandma-ek-tu-shri-hari",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 234,
    "lyrics": "અખિલ બ્રહ્માંડમાં એક તૂં શ્રી હરિ, જુજવે રૂપે અનંત ભાસે \nદેહમાં દેવ તું, તેજમાં તત્વ તું, શૂન્યમાં શબ્દ થઈ વેદ વાસે.....(ટેક)\nપવન તું, પાણી તું, ભૂમિ તું ભૂધરા, વૃક્ષ થઈ ફૂલી રહ્યો આકાશે\nવિવિધ રચના કરી અનેક રસ લેવાને, શિવ થકી જીવ થયો એ જ આશે......અખિલ\nવેદ તો એમ વદે, શ્રુતિ-સ્મૃતિ  સાખ દે, કનક કુંડળ વિષે ભેદ ન હોય\nઘાટ ઘડીયા પછી નામ રૂપ જૂજવા, અંતે તો હેમનું હેમ હોય.....અખિલ\nવૃક્ષમાં બીજ તું, બીજમાં વૃક્ષ તું, જોઉં પટંતરો એજ પાસે,\nભણે નરસૈયો એ મન તણી શોધનાં, પ્રિત કરો પ્રેમથી પ્રગટ થાશે.....અખિલ"
  },
  {
    "title": "235. કોઈ નો ભાર ન રાખે મુરારી",
    "slug": "235-koi-no-bhar-na-rakhe-murari",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 235,
    "lyrics": "કોઈ નો ભાર ન રાખે મુરારી, આપે વ્યાજ શીખે ગર્થવાળી\nસુદામાજીનાં તાંદૂલ લીધા, તેનાં મહેલ કનકનાં કિધા.....(ટેક)\nદ્રોપદીજીનું આવ્યું ટાણુ, ચીર પૂર્યા હતા નવસે નવાણુ\nપાટો બાંધ્યો તો પીડા જાણી, ચીર પૂર્યાની એ એંધાણી....કોઈ\nથોડું ચંદન કુબ્જાનું લીધુ, એને રૂપ અનુપમ દીધુ\nગોવાળીએ ઓચ્છવ કિધો, વ્હાલે કર પર ગોવર્ધન લીધો.....કોઈ\nજેનું લીધુ હતું તેનું દીધુ, તેમાં પરમારથ શું કીધું?\nધન્ય ધન્ય નરસિંહ તારી વાણી, એમ બોલ્યા છે સારંગપાણી....કોઈ"
  },
  {
    "title": "236. પ્રાણ થકી મને વૈષ્ણવ વ્હાલા",
    "slug": "236-pran-thaki-mane-vaishnav-vhala",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 236,
    "lyrics": "પ્રાણ થકી મને વૈષ્ણવ વ્હાલા, અહોનિશ એને ગાઉ રે\nતપ તીરથ વૈકુંઠ પેડ મુકી, મારા ભક્ત બોલાવે ત્યાં જાઉ......(ટેક)\nઅંબરીષ રાજા મને અતિ ઘણો વ્હાલો, દુર્વાસાએ મન ભંગ કિધુ રે\nમેં મારૂ અભિમાન ત્યજીને, ચક્ર સુદર્શન વાળી લીધુ રે....પ્રાણ\nગજને કારણ પાળો ધાયો, સંતોની કરવા સાર રે\nઉંચ નીચ હું તો કાંઈ ન જાણુ, મને ભજે તે મારા રે....પ્રાણ\nલક્ષ્મીજી અર્ધાંગના મારી, પણ મારા સંતની દાસી રે\nઅડસઠ તિરથ મારા સંતને ચરણે, કોટી ગંગા કોટી કાશી....પ્રાણ\nસંત ચાલે ત્યાં હું આગળ ચાલુ, ને સંત સુવે તો હું જાગુ રે\nમારા સંતની નિંદા કરે તેની જિહવા સદ્યજ કાપું રે....પ્રાણ\nમારા બાંધ્યા વૈષ્ણવ છોડે, વૈષ્ણવે બાંધ્યા મારાથી ન છૂટે રે\nએકવાર વૈષ્ણવ મને બાંધે તો, તે બંધન મારાથી ન તૂટે રે....પ્રાણ\nબેસી ગાય ત્યાં ઉભો ઉભો સાંભળુ, ઉભો ઉભો ગાય ત્યાં હું નાચું રે\nહું તો વૈષ્ણવથી ફાણ નહિં અળગો, ભણે નરસૈંયો સાચુ રે.....પ્રાણ"
  },
  {
    "title": "237. અરે ભાઈ શાંતિ પમાડે તેને સંત કહીએ",
    "slug": "237-are-bhai-shanti-pamade-tene-sant-kahie",
    "authorSlug": "narsinh-mehta",
    "category": "નરસિંહ મહેતા",
    "sortOrder": 237,
    "lyrics": "અરે ભાઈ શાંતિ પમાડે તેને સંત કહીએ\nએના દાસના દાસ થઈને રહીએ.....(ટેક)\nવિદ્યાનું મૂળ જયારે ગુરૂજી ન બતાવે\nત્યારે મહેતાનો માર શીદ ખાઈએ.....શાંતિ\nગુરૂ મળ્યાને બોધ ન દિધો\nત્યારે તેનાં ચેલા તે શીદ થઈએ.....શાંતિ\nકલ્પવૃક્ષ સેવ્યે જયારે દરિદ્ર રહે ઉભુ\nત્યારે તેને છાંયે તે શીદ રહિએ.....શાંતિ\nરાજાની ચાકરીમાં ભૂખ ન ભાંગે\nત્યારે તેની વેઠે તે શીદ જઈએ....શાંતિ\nવૈદની ગોળી ખાધે દુઃખ રહ્યુ ઉભુ\nત્યારે તેની ગોળી તે શીદ ખાઈએ....શાંતિ\nલીધા વળાવીયા ને ચોર જયારે લૂંટે\nત્યારે તેની સંગે તે શીદ જઈએ રે......શાંતિ\nનામ અમૃત મારા ગુરૂએ બતાવ્યુ\nતે તો ચોટ્યું છે મારે હૈયે રે.....શાંતિ\nમહેતા નરસિંહની વાણી મધુરી \nશોધીને રહિએ ચરણે રે......શાંતિ"
  },
  {
    "title": "238. સદ્દગુરૂજીએ જુગતિ કિધી",
    "slug": "238-sadgurujie-jugti-kidhi",
    "authorSlug": "mirabai",
    "category": "મીરાંબાઈ",
    "sortOrder": 238,
    "lyrics": "સદ્દગુરૂજીએ  જુગતિ કિધી, મને વર તો રૂડાને દીધી.\nકુલ સજની સારૂ જોયુ, મારા દેહનું દુઃખડુ ખોયું\nમારા ગુરૂજીએ મૂરત સારૂ લીધુ, પરિબ્રહ્મ સે સગપણ કીધુ.....સદ્દગુરૂજી\nશૂનમાં સાસરિયું મારૂ, મહીયરીરૂ લાગે ખારૂ\nમારા પિયુજીનો સત્તસંગ ઉંડો, મહિયરીયો લાગે ભૂંડો.....સદ્દગુરૂજી\nસુરતા જેઠાણી સારી, નુરતા નણંદલ મારી\nસુક્ષ્મણાની સેજુ રૂડી, મેં પહેરી અમર ચુડી.....સદ્દગુરૂજી\nઆણલા હવે ના વળીએ, પગલા પાછા ન ભરીએ\nમારી પ્રીત પૂરવની જાગી, મારા ચિત્તડામાં ચટકી લાગી....સદ્દગુરૂજી\nઆપે અલખ અવિનાશી, હું છું તમારી દાસી\nબાઈ મીરાનાં ગિરધર સ્વામિ, હું તો આનંદ સુખડા પામી......સદ્દગુરૂજી"
  },
  {
    "title": "239. આત્માને ઓળખ્યા વિના રે",
    "slug": "239-aatmane-olakhya-vina-re",
    "authorSlug": "mirabai",
    "category": "મીરાંબાઈ",
    "sortOrder": 239,
    "lyrics": "આત્માને ઓળખ્યા વિના રે, લખ ચોરાશી નહિં તો મટે\nભ્રમણાને ભાંગ્યા વિના રે, ભવનાં ફેરા નહિં તો ટળે.......આત્મા\nકોયલને કાગરે હે જી રંગરૂપે એક છે\nઈ તો એની બોલી થકી ઓળખાય રે......આત્મા\nહંસલો ને બગલો રે, હે જી રંગરૂપે એક છે\nઈ તો એનાં આહાર થકી ઓળખાય રે......આત્મા\nસતીને ગુણિકા રે, હે જી રંગરૂપે એક છે\nસતી નારી એની સેવા થકી ઓળખાય રે.....આત્મા\nગુરૂનાં પ્રતાપે બાઈ મીરા બોલીયા\nદેજો અમને સંત ચરણમાં બસ રે........આત્મા"
  },
  {
    "title": "240. છિએ દુઃખીયા અમે નથી સુખીયા",
    "slug": "240-chie-dukhiya-ame-nathi-sukhiya",
    "authorSlug": "mirabai",
    "category": "મીરાંબાઈ",
    "sortOrder": 240,
    "lyrics": "છિએ દુઃખીયા અમે નથી સુખીયા\nહે....દેહુનાં દાઝેલા અમે ભાવ દુઃખીયા.....(ટેક)\nવા રે વંટોળીએ અમે આવીને ભરાણા\nસામા રે કાંઠા નાં અમે છિએ પંખીયા......હે\nછિછરા રે જળમાં અમે રહી ન શકીએ વ્હાલા\nઉંડા રે જળનાં અમે છિએ મછીયા.....હે\nપરદેશી સાથે અમારે પ્રિતુ રે બંધાણી વ્હાલા\nરોઈ રોઈ થઈ છે મારી લાલ અંખીયા......હે\nબાઈ મીરા કહે પ્રભુ ગિરિધર નાગર વ્હાલા\nચરણોમાં રાખો તો, અમે થઈએ સુખીયા.....હે"
  },
  {
    "title": "241. મુખડાની માયા લાગી રે મોહન પ્યારા",
    "slug": "241-mukhani-maya-lagi-re-mohan-pyara",
    "authorSlug": "mirabai",
    "category": "મીરાંબાઈ",
    "sortOrder": 241,
    "lyrics": "મુખડાની માયા લાગી રે મોહન પ્યારા.....(ટેક)\nમુખડુ મે જોયું તારૂ, સર્વ જગ થયુ ખારૂ\nમન મારૂ રહ્યુ ન્યારૂ ન્યારૂ રે.....મોહન\nસંસારીનું સુખ એવું, ઝાંઝવા નાં નિર જેવું\nએને તુચ્છ કરી ગણીએ રે....મોહન\nસંસારીનું સુખ કાચું, પરણીને રંડાવું પાછુ\nતેને ઘેર કેમ રાચું રે....મોહન\nપરણી હું પ્રિતમ પ્યારો, અખંડ સૌભાગ્ય  મારો\nરંડાવાનો ભય ટાળ્યો રે.....મોહન\nવ્હાલા મારા વ્રજવાસી, દર્શન દેજો અવિનાશી\nપ્યાસી છું હું દિન દાસી રે......મોહન\nમીરાંબાઈ બલિહારી, આશા મને એક તારી\nહવે હું તો બડભાગી રે.....મોહન"
  },
  {
    "title": "242. મોહે લાગી લગન ગુરૂ ચરનન કી",
    "slug": "242-mohe-lagi-lagan-guru-charan-ki",
    "authorSlug": "mirabai",
    "category": "મીરાંબાઈ",
    "sortOrder": 242,
    "lyrics": "મોહે લાગી લગન ગુરૂ ચરનન કી.....(ટેક)\nચરન બિના મોહે કછું નહીં સૂઝે\nજુઠ માયા સબ સપનન કી.....મોહે\nભવસાગર સબ સૂક ગયે હે\nફિકર નહિં મુજે તરનન કી.....મોહે\nમીરા કહે પ્રભુ ગિરિધર નાગર\nઉલટ ભઈ મોરે નૈનન કી......મોહે"
  },
  {
    "title": "243. જૂનુ તો થયુ દેવળ જૂનુ તો થયુ",
    "slug": "243-junu-to-thayu-deval-junu-to-thayu",
    "authorSlug": "mirabai",
    "category": "મીરાંબાઈ",
    "sortOrder": 243,
    "lyrics": "જૂનુ તો થયુ દેવળ જૂનુ તો થયુ \nમારો હંસલો નાનો ને દેવળ જૂનુ તો થયુ.....(ટેક)\nઆ રે કાયા રે હંસા ડોલવાને લાગી\nપડી ગયા દાંત માંયલી રેખુ તો રહ્યુ.....મારો\nતારે ને મારે હંસા પ્રિતુ રે બંધાણી\nઉડી ગયો હંસ પિંજર પડી તો રહ્યુ.....મારો\nબાઈ મીરા કહે પ્રભુ ગિરિધરનાં ગુણ\nપ્રેમનો પ્યાલો તમને પાઉ ને પીઉ.....મારો"
  },
  {
    "title": "244. પાયોજી મેને રામ રતન ધન પાયો",
    "slug": "244-payoji-mene-ram-ratan-dhan-payo",
    "authorSlug": "mirabai",
    "category": "મીરાંબાઈ",
    "sortOrder": 244,
    "lyrics": "પાયોજી મેને રામ રતન ધન પાયો\nવસ્તુ અમૂલખ દીધી મેરે સદગુરૂ કૃપા કરી અપનાયો.......(ટેક)\nજન્મ મરણ કી પુંજી પાઈ, જગમેં સભી ખોવાયો\nખરચે ન ખૂંટે વાંકો ચોર ન લૂંટે, દિન દિન બઢત સવાયો......પાયોજી\nસત્ત કી નાવ કેવટિયા સદગુરૂ, ભવસાગર તર આયો\nમીરા કે પ્રભુ ગિરિધર નાગર, હરખ હરખ જશ ગાયો.....પાયોજી"
  },
  {
    "title": "245. સત્તસંગનો રસ ચાખ",
    "slug": "245-satsangno-ras-chakh",
    "authorSlug": "mirabai",
    "category": "મીરાંબાઈ",
    "sortOrder": 245,
    "lyrics": "સત્તસંગનો રસ ચાખ, પ્રાણી તું સત્તસંગનો રસ ચાખ\nપ્રથમ લાગે તીખો ને કડવો, પછી આંબા કેરી સાખ....(ટેક)\nઆ રે કાયાનો ગર્વ ન કરીએ, અંતે થવાની છે ખાખ\nહસ્તી ઘોડા ને માલ ખજાના, કાંઈ ન આવે સાથ....પ્રાણી તું\nસત્તસંગથી બે ઘડીમાં મુક્તિ, વેદ પૂરે તેની સાખ\nબાઈ મીરા કે પ્રભુ ગિરિધર નાગર, હરિ ચરણે ચિત્ત રાખ....પ્રાણી તું"
  },
  {
    "title": "246. તમે જુઓને આ વાત વિચારી",
    "slug": "246-tame-juone-aa-vat-vichari",
    "authorSlug": "mirabai",
    "category": "મીરાંબાઈ",
    "sortOrder": 246,
    "lyrics": "તમે જુઓને આ વાત વિચારી, ઓધવજી કર્મન કી ગતિ ન્યારી.....(ટેક)\nનિર્મલ નીર કે નાના સરોવર, સમદર હો ગઈ ખારી\nબગલે કો બહુ રૂપ દિયા હે, કોયલ કર દી કાળી....ઓધવજી\nસુંદર લોચન મૃગ કો દિયા હે, બન બન ફિરત દુખારી\nમૂરખ રાજા રાજ કરત હે, પંડિત ભયો રે ભિખારી......ઓધવજી\nલોભી કો ધન બહુત દિયા હે, દાતા કો મિલે ના જુવારી\nમીરા કહે પ્રભુ ગિરિધરનાં ગુણ, ચરણ કમલ બલિહારી.....ઓધવજી"
  },
  {
    "title": "247. વારૂ મારા વીરા રે",
    "slug": "247-varu-mara-vira-re",
    "authorSlug": "mirabai",
    "category": "મીરાંબાઈ",
    "sortOrder": 247,
    "lyrics": "વારૂ મારા વીરા રે, સંગ નવ કરીએ નીચનો\nનીચપણું નક્કી નરકે લઈ જાય રે.....(ટેક)\nઆંકડીયા નાં દૂધ રે અતિ ઘણાં ઉજળા રે\nતેને પીધે તરત મૃત્યુ થાય......વારૂ\nગરવી ગાયનાં દૂધ રે, અતિ ઘણાં મીઠડા રે\nસાકર ભળે સ્વાદ અનેરો થાય......વારૂ\nબાવળ તે કાંટાળો રે, દિસે અળખામણો રે\nછાંયે બેસે અંગને વસ્ત્ર ઉઝરડાય.....વારૂ\nઆંબલીયાની છાંયા રે, દિસે રે રળિયામણી રે\nતેને સેવે ફળની પ્રાપ્તિ થાય.....વારૂ\nગુરૂનાં પ્રતાપે રે મીરાંબાઈ બોલીયા રે\nરાખો અમને સંત ચરણની માંય......વારૂ"
  },
  {
    "title": "248. કાનુડા તારી મોરલી અમને",
    "slug": "248-kanuda-tari-morli-amne",
    "authorSlug": "mirabai",
    "category": "મીરાંબાઈ",
    "sortOrder": 248,
    "lyrics": "કાનુડા તારી મોરલી અમને, દુઃખડા દિએ છે દાડી દાડી.....(ટેક)\nમાઝમ રાતની મધુરા રે સુરની, કોણે આ મોરલી વગાડી\nહું રે સૂતી હતી મારા શયન ભુવનમાં, મને નિંદ્રાથી કોણે જગાડી.....કાનુડા\nસાસુ સસરાથી અછતી હું ઉઠી વ્હાલા, હળવેથી દ્વાર ઉઘાડી\nવ્યાકુળ થઈ હું તો તનડામાં મારા, પહેરતા ભૂલી ગઈ સાડી.....કાનુડા\nકયો રે કબાડી તને કાપીને લાવ્યો, ક્યાં રે સુધા રે સમારી\nશરીર તારું જોને સંઘાડે ચડાવી, તારા તનડામાં છિદ્ર પડાવી.....કાનુડા\nમોરલી કહે હું કામણગારી વ્હાલા, હું છું વ્રજ કેરી નારી\nબાઈ મીરા કહે પ્રભુ ગિરિધરનાં ગુણ, તનમાં તાપ સમાવી....કાનુડા"
  },
  {
    "title": "249. અખંડ વરને વરી",
    "slug": "249-akhand-varne-vari",
    "authorSlug": "mirabai",
    "category": "મીરાંબાઈ",
    "sortOrder": 249,
    "lyrics": "અખંડ વરને વરી, સાહેલી હું તો અખંડ વરને વરી......(ટેક)\nભવસાગરમાં મહાદુઃખ પામી, લખ ચોરાશી ફરી\nસંસાર સર્વ ભયંકર કાળો, તે દેખી થર થરી......સાહેલી\nકુટુંબ સહોદર સ્વાર્થી સર્વે, પ્રપંચથી પરહરી\nજન્મ ધરીને મહાદુઃખ પામી, ઘરમાં ધંધો કરી....સાહેલી\nસદગુરૂની પૂરણ કૃપાથી, ભવસાગર હું તરી\nબાઈ મીરા કહે પ્રભુ ગિરિધરનાં ગુણ, સંતોના ચરણે પડી......સાહેલી"
  },
  {
    "title": "250. બાયુ પૂરા રે મળે તો રાવું રેડીએ",
    "slug": "250-bayu-pura-re-male-to-ravu-redie",
    "authorSlug": "lilan-bai",
    "category": "લીલણ બાઈ",
    "sortOrder": 250,
    "lyrics": "બાયુ પૂરા રે મળે તો રાવું રેડીએ, અધુરીયા શું જાણે દિલની વાત....(ટેક)\nએવા ખાડા રે ખાબોચીયાની દેડકી \nએ શું જાણે સમદરીયાની લ્હેર રે....બાયુ\nએવા દુરીજનને આડા મોટા ડુંગરા\nમારા હરિજનોને મળીયા મુખોમુખ રે.....બાયુ\nએવા દુરીજનને મોઢે કાળી મેશ ઢળે\nમારા હરિજનોને મુખડે વરસે નૂર રે....બાયુ\nકૂવાની છાંયા રે કૂવામાં વિસમે\nચોરની માં રૂવે ખૂણાની માંય રે.......બાયુ\nમેઘધારણ પ્રતાપે લીલળબાઈ બોલીયા\nદેજો અમને ગુરૂ ચરણમાં વાસ રે.....બાયુ"
  },
  {
    "title": "251. અમને મળ્યા અંતરયામી રે હાં",
    "slug": "251-amne-malya-antaryami-re-han",
    "authorSlug": "lilan-bai",
    "category": "લીલણ બાઈ",
    "sortOrder": 251,
    "lyrics": "અમને મળ્યા અંતરયામી રે હાં\nહાં હારે ગુરૂજી કહો ભજન કેમ કરીએ\nલેવાય તો રામનામ લેજો, દેવાય તો તમે ટુકડો દેજો\nહિરો પડયો મેદાનમાં, એને લેવાય તો લઈ લેજો.......ગુરૂજી\nમોટા ધણીની ફેરો માળા, છોડી દયો જગતનાં ચાળા\nઝિણા માંયલા ઝિણા, મારા પ્રભુ છે પરવાળા.....ગુરૂજી\nબાવન તો બજારૂ લાગે, જવેરલા નર કોક જાગે\nધ્યાન ધરી લ્યો શૂંન માંહી, વાજા ઝીણા ઝીણા વાગે......ગુરૂજી\nનિજ નામનાં પડદા ખોલે, ધરણીને આકાશ ડોલે\nબોલ્યા છે લીલળબાઈ, પ્રભુ ઉભા મારે મોલે.....ગુરૂજી"
  },
  {
    "title": "252. આવા રૂડા અમર ફળ લાગ્યા રે હાં",
    "slug": "252-aava-ruda-amar-fal-lagya-re-han",
    "authorSlug": "lilan-bai",
    "category": "લીલણ બાઈ",
    "sortOrder": 252,
    "lyrics": "આવા રૂડા અમર ફળ લાગ્યા રે હાં\nહાં હારે ગુરૂજી સત્તની વેલડીએ\nબીજક વરતીથી બીજ આણી, વાવ્યુ છે વિશ્વાસ જાણી\nકરણીનાં તો ક્યારે કિધા, સીંચ્યા પ્રેમ જળ પાણી.....ગુરૂજી\nઉગી છે આ અમરવેલી, એનાં મૂળ તો પિયાળે મેલી\nફાલીને ફૂલી આ છે નિજ્યા ધરમની વેલી.....ગુરૂજી\nપ્રથમ તો પ્રહલાદે જાણી, હરિચંદ્ર તારા દે રાણી\nપાંચ પાંડવ સતી દ્રૌપદી, રાજા બળ ઘેર ઓળખાણી.....ગુરૂજી\nભાયલાનાં ભાવ જાગ્યા, વેલડીએ સોઈ ફળ લાગ્યા\nઊંચાને અદકેરા એ છે, અમર લોકથી આઘા.....ગુરૂજી\nભાયલા સે ભાવ રાખો, કાળુ મેલી રૂડા ફળ ચાખો\nબોલ્યા છે લીલળબાઈ, અમને સંત ચરણુમાં રાખો.....ગુરૂજી"
  },
  {
    "title": "253. મોટા મોટા મુનિવર મળીયા રે હાં",
    "slug": "253-mota-mota-munivar-maliya-re-han",
    "authorSlug": "lilan-bai",
    "category": "લીલણ બાઈ",
    "sortOrder": 253,
    "lyrics": "મોટા મોટા મુનિવર મળીયા રે હાં\nહાં હારે ગુરૂજી આજ મારે આંગણે\nબીજ થાહોર રેન રૂડી, જમલે મેં જુગત તેડી\nઆજની રાત મારે બાયુ, આનંદની ઘડી...ગુરૂજી\nઆવ્યા સંત તેને આદર દઈએ, પગ ધોઈ રૂડા પાહોળ લઈએ\nએડી એડી રીતે બાઈ મારો સાયબો રીઝે.....ગુરૂજી\nચોખ લીયાનાં ચોક પુરી, બેઠા છે ધણીનાં નુરી\nકરી લ્યો કમાણી વેળા જાય છે વળી.....ગુરૂજી\nપાટ માંડી રૂડા કળશ થાપ્યા, જ્યોત જમલે જાગશે\nકોળીને પાહોળ આજ મારી ગતમાં વપરાશે....ગુરૂજી\nસંત ચરણમાં લડહડી, હું તો આવીને હાજર ખડી\nબોલ્યા રે લીલળબાઈ, એની પરીક્ષા હવે પડી....ગુરૂજી"
  },
  {
    "title": "254. ભક્તિનો મારગ રે",
    "slug": "254-bhaktino-marag-re",
    "authorSlug": "lilan-bai",
    "category": "લીલણ બાઈ",
    "sortOrder": 254,
    "lyrics": "ભક્તિનો મારગ રે, ફુલ કેરી પાંખડી રે\nસૂંઘે એને હોય તેનો સ્વાદ રે હાં.....(ટેક)\nકરણીનાં પુરા રે શૂરા થઈને ચાલશે રે\nકાયર જોને ખાશે જમ કેરા માર રે હાં....ભક્તિ\nધરણીનાં ધીંગા રે, પુરા નર જે હશે રે\nમરજીવા તો ખેલે મેદાન રે હાં....ભક્તિ\nસ્વાદને સુંઘ્યાં રે ગોપીચંદ ભરથરી રે\nજેને વાતમાં ઉપજ્યો વૈરાગ રે હાં......ભક્તિ\nગુરૂ પ્રતાપે રે લીલળબાઈ બોલ્યા રે\nદેજો અમને સંત ચરણમાં વાસ રે હાં.....ભક્તિ"
  },
  {
    "title": "255. રમતો જોગી રે કયાંથી આવ્યો",
    "slug": "255-ramto-jogi-re-kyanthi-aavyo",
    "authorSlug": "lilan-bai",
    "category": "લીલણ બાઈ",
    "sortOrder": 255,
    "lyrics": "રમતો જોગી રે કયાંથી આવ્યો,\nઆવી મારી નગરીમાં અલખ જગાયો રે, વૈરાગણ હું તો બની.....(ટેક)\nકોરી ગાગર રે ઠંડા પાણી, એવાં પાણીડાં ભરે નંદ કેરી નારી રે.....વૈરાગણ.....રમતો\nકાચી કેરી રે આંબા ડાળે, એની રક્ષા કરે કોયલરાણી રે......વૈરાગણ.....રમતો\nકાન મેં કુંડળ રે જટાધારી, એને નમણું કરે નર ને નારી રે......વૈરાગણ.....રમતો\nબોલ્યાં બોલ્યાં રે લીલળબાઈ, મારા સાધુડાં અમરાપર મ્હાલે રે.....વૈરાગણ.....રમતો"
  },
  {
    "title": "256. જી રે લાખા, પ્રથમ સદગુરૂનાં પાય પૂજી ને",
    "slug": "256-ji-re-lakha-pratham-sadgurunan-pay-puji-ne",
    "authorSlug": "loyan-bai",
    "category": "લોયણ બાઈ",
    "sortOrder": 256,
    "lyrics": "જી રે લાખા, પ્રથમ સદગુરૂનાં પાય પૂજી ને\n     તમે મન વાંછિત ફળ માંગો\nજી રે લાખા, હાણ ને લાભ તમે મેલી દયો\n     અને મોહ નિંદ્રાથી જાગો\nજી રે લાખા, માન મેલીને ગુરૂને ચરણે નમીએ\n     અને મન ગુરૂને અર્પો\nજી રે લાખા, હરિને જાણવાનો એક જ મારગ છે\n     જેનું છે તેને લઈને સોંપો રે\nજી રે લાખા, અનભે ભક્તિની ઈચ્છા કરો તો\n     તમે સદગુરૂને શિશ નમાવો\nજી રે લાખા, માંડ કરીને મનુષ્ય દેહ મળ્યો\n     ફરી અવસર નહિં આવે આવો રે\nજી રે લાખા, મન કરમ વચને કરી, સદગુરૂને સેવો\n     પ્રેમ ભક્તિ અનુભવ લેવા\nજી રે લાખા, શેલર્ષીની ચેલી સતી લોયણ બોલ્યા\n     માથે ધારો સદગુરૂદેવ પુરા"
  },
  {
    "title": "257. જી રે લાખા, સદગુરૂનાં પદનો કોઈ પાર ન પામે",
    "slug": "257-ji-re-lakha-sadgurunan-padno-koi-par-n-pame",
    "authorSlug": "loyan-bai",
    "category": "લોયણ બાઈ",
    "sortOrder": 257,
    "lyrics": "જી રે લાખા, સદગુરૂનાં પદનો કોઈ પાર ન પામે\n     જેને શિવ ઉમિયાજી વખાણે\nજી રે લાખા, મોટા મોટા મુની જેની આશ કરે છે\n     તે પદ અનુભવ ઉરમાં આવે રે\nજી રે લાખા, બ્રહ્માંનાં પુત્ર સનકાદિક જેવાં\n     તેણે હંસને ગુરૂ કિધા રે\nજી રે લાખા, હંસના મુખેથી ઉપદેશ લઈને\n    એણે મુક્તિનો મારગ લીધો રે\nજી રે લાખા, શૂરવીર થઈને જે વચને ચાલે\n    તે તો સદગુરૂનો મહિમા જાણે\nજી રે લાખા, માન અંતરમાંથી મેલી દઈને\n     અને વચન પ્રમાણે વરતે રે\nજી રે લાખા, એવાં અધિકારી જેને આવરણ ન આવે\n     એ તો રહેણીકરણીનાં પૂરા રે\nજી રે લાખા, શેલર્ષીની સતી લોયણ બોલ્યા \n     તેને સદગુરૂ વચન સમજાવે રે"
  },
  {
    "title": "258. જી રે લાખા, મૂળ વચનનો મહિમા બહુ મોટો",
    "slug": "258-ji-re-lakha-mul-vacanno-mahima-bahu-moto",
    "authorSlug": "loyan-bai",
    "category": "લોયણ બાઈ",
    "sortOrder": 258,
    "lyrics": "જી રે લાખા, મૂળ વચનનો મહિમા બહુ મોટો\n     એને સંત જ વિરલા જાણે રે\nજી રે લાખા, વચન થકી જે કોઈ હોય અધુરા\n     તે તો પ્રેમરસને શું પિછાણે રે\nજી રે લાખા, વચન થકી તો બ્રહ્માંએ સૃષ્ટિ રચાવી\n     એ વચનથી પૃથ્વી ઠેરાણી રે\nજી રે લાખા, ચૌદ લોકમાં એક વચન રમે છે\n     તેને જાણે પુરૂષ પુરાણી રે\nજી રે લાખા, એ રે વચનની જેને પ્રતિતિ આવે \n     એ તો કદી ચોરાશીમાં ન આવે\nજી રે લાખા, વચનને ભરોસે જે કોઈ વરતે\n     એની સુરતા શૂન્યમાં સમાય રે\nજી રે લાખા, એ રે વચન મળે શિર ને સાટે\n     એ તો ઓછા માણસને ના કહેવું\nજી રે લાખા, સદગુરૂ આગળ શીશ નમાવી\n     એનાં હુકમમાં હંમેશા રહેવું રે\nજી રે લાખા, આદિ અનાદિમાં વચન છે મોટું\n     એને જાણે વિવેકી જાણ પુરા\nજી રે લાખા, શેલર્ષીની ચેલી સતી લોયણ બોલ્યા\n     જેણે નયન વરસે છે નૂરા"
  },
  {
    "title": "259. જી રે લાખા, હરિ ગુરૂ સંતને તમે એકરૂપ જાણો",
    "slug": "259-ji-re-lakha-hari-guru-santne-tame-ekrup-jano",
    "authorSlug": "loyan-bai",
    "category": "લોયણ બાઈ",
    "sortOrder": 259,
    "lyrics": "જી રે લાખા, હરિ ગુરૂ સંતને તમે એકરૂપ જાણો\n     એમાં જૂદાપણુ ઉરમાં ન આણો\nજી રે લાખા, ગુરૂમાં હરિ - હરિમાં ગુરૂ એક મેક છે\n     એક મેક જાણી રસ માણો રે\nજી રે લાખા, ગુરૂનાં વિશે કદી અભાવ ન લાવો\n     એ છે સમજણ મોટી રે\nજી રે લાખા, જ્યાં લગી ગુરૂમાં વરણ ભેદ ભાળો\n    ત્યાં લગી વાતુ છે ખોટી રે\nજી રે લાખા, ગુરૂ ગોવિંદ કદી નથી જૂદા\n     એવો ભરોસો ઉરમાં આવે રે\nજી રે લાખા, મૂળવચનનાં એ છે અધિકારી\n     એને ખચિત્ત ભજન દિલમાં ભાવે રે\nજી રે લાખા, ગુરૂ ચરણનાં જે છે વિશ્વાસી\n     તે તો રહેણી કરણીનાં ખાસા રે\nજી રે લાખા, શેલર્ષીની ચેલી સતી લોયણ બોલ્યા\n     એ તો કદી પડે નહિં પાછા રે"
  },
  {
    "title": "260. જી રે લાખા, બ્રહ્મમાં ભળવું હોય તો હેત વધારો",
    "slug": "260-ji-re-lakha-brahmama-bhalvu-hoy-to-het-vadharo",
    "authorSlug": "loyan-bai",
    "category": "લોયણ બાઈ",
    "sortOrder": 260,
    "lyrics": "જી રે લાખા, બ્રહ્મમાં ભળવું હોય તો હેત વધારો\n     અને મનનાં પ્રપંચને મેલો\nજી રે લાખા, નુરત સુરતથી કરી લ્યો મેળો\n     અને ફળની ઈચ્છાને ત્યાગો રે\nજી રે લાખા, તરણા બરોબર આ જગતની માયા\n    એને જાણજો મનથી જૂઠી રે\nજી રે લાખા, કાળનાં ઝપાટે એ તો ઝડપાઈ જશે\n    ત્યારે જીવડો તે જાશે ઉડી રે\nજી રે લાખા, જાગીને જોશો તો ઈશ્વર મળશે\n    ત્યારે તો મનની ભ્રાંતિ ભાંગી પડશે\nજી રે લાખા, સંકલ્પ વિકલ્પની ગાંઠું બંધાણી\n     એ તો ગુરૂ વચનથી ગળશે રે\nજી રે લાખા, હાર ન પામો તો તમે હિંમત રાખો\n     અને ગુરૂવચનનો રસ ચાખો\nજી રે લાખા, શેલર્ષીની ચેલી સતી લોયણ બોલ્યા\n     તમે વચન સમજીને સુખને સુખ માણો"
  },
  {
    "title": "261. જી રે લાખા, ધ્યાન પ્રાણાયમમાં ગુરૂગમ રાખો",
    "slug": "261-ji-re-lakha-dhyan-pranayamama-gurugam-rakho",
    "authorSlug": "loyan-bai",
    "category": "લોયણ બાઈ",
    "sortOrder": 261,
    "lyrics": "જી રે લાખા, ધ્યાન પ્રાણાયમમાં ગુરૂગમ રાખો\n    તો દ્રષ્ટિ સંચળ ચિત્ત થાવે\nજી રે લાખા, અવિગત અગમ અગોચર પોતે\n     એ તો નુરતે - સુરતે જોવામાં આવે\nજી રે લાખા, ચિત્ત સંવેદન તેને નવ વ્યાપે\n     જેને મળ્યા અખંડ અજંપા રે\nજી રે લાખા, સુરતા જેની ચડી ધૂન ઉપર\n     જ્યાં નહિં મોહ કે નહિં માયા રે\nજી રે લાખા, કામ કર્મ તો લેશે નવ લાગે\n    જેમ સિંહથી શિયાળ ભાગે\nજી રે લાખા, યોગનાં માર્ગથી તિમિર નાસે\n     જયારે યથાર્થ સુરતા જાગે\nજી રે લાખા, અખંડ શૂનમાં જેની થઈ સમાધી\n     તે ગુરૂ મુખી પુરા યોગી રે\nજી રે લાખા, નિશ્ચલ રૂપ પરમાત્મા થયુ છે\n     તે તો કહીએ ખરો રસ ભોગી રે\nજી રે લાખા, અક્ષરાતિત અખંડ બ્રહ્મ પોતે\n     એ તો નિરાલંબ નિર્વિકારી રે\nજી રે લાખા, શેલર્ષીની ચેલી સતી લોયણ બોલ્યા\n     જેણે જોયું નિજ પદ ધારી રે"
  },
  {
    "title": "262. જી રે લાખા, જનકે આત્મા એક જ્યારે જાણ્યો",
    "slug": "262-ji-re-lakha-janake-aatma-ek-jyare-janyo",
    "authorSlug": "loyan-bai",
    "category": "લોયણ બાઈ",
    "sortOrder": 262,
    "lyrics": "જી રે લાખા, જનકે આત્મા એક જ્યારે જાણ્યો\n    ત્યારે દેહ છતાં વિદેહ પામ્યો\nજી રે લાખા, સ્ત્રીપુરૂષનો ભેદ જ્યારે ટળ્યો\n    ત્યારે દિલની દુબ્જાને વામ્યો રે\nજી રે લાખા, અષ્ટાવક્ર ગુરૂને પ્રશ્ન જ્યારે પૂછ્યો\n     તેનો ભેદ તને બતાવું રે\nજી રે લાખા, ગુપ્તમાં ગુપ્ત અને ઝીણામાં ઝીણો\n    તારા રૂદિયામાં દર્શાવું રે\nજી રે લાખા, અષ્ટાવક્રે એક આત્મા કિધો\n    ત્યારે રાજાએ સંશય લીધો\nજી રે લાખા, વાત  તેને ધ્યાનમાં ન બેઠી\n     પછી ફરીને વાત તેને કિધી રે\nજી રે ગુરૂજી, આત્મા તો તમે એક કહો છો\n     તો જ્ઞાન અજ્ઞાન કેમ ઘટશે\nજી રે ગુરૂજી, એક નરકમાં એક સ્વર્ગમાં\n     બેઉ એમના કહેવાથી ખોટા પડશે રે\nજી રે લાખા, જનકનો પ્રશ્ન અષ્ટાવક્રે સાંભળ્યો\n    ત્યારે ખરો અધિકારી એમ બોલ્યા\nજી રે લાખા, જેમ છે તેમ તેનું સમાધાન કરીને\n     જનકનાં સંચય તોડયા રે\nજી રે લાખા, જનકનાં સંચયનું સમાધાન કિધુ\n     તે તમને સમજાવુ રે\nજી રે લાખા, શેલર્ષીની ચેલી સતી લોયણ બોલ્યા\n     તારા રૂદિયામાં સ્થિર કરી સ્થાપુ રે"
  },
  {
    "title": "263. જી રે જનક, આત્મા તો નિરંતર એક છે",
    "slug": "263-ji-re-janak-aatma-to-nirantar-ek-che",
    "authorSlug": "loyan-bai",
    "category": "લોયણ બાઈ",
    "sortOrder": 263,
    "lyrics": "જી રે જનક, આત્મા તો નિરંતર એક છે\n    પણ મનનાં અજ્ઞાને જીવ ભાસે\nજી રે જનક, તેથી જ્ઞાન અજ્ઞાનનું ઘટે છે તેમાં\n     સ્વર્ગ નરક બેઉ સાચા રે\nજી રે જનક, અજ્ઞાનનું કારણ અવિદ્યા છે\n    નહિં તો જ્ઞાન અજ્ઞાન નહિં તેમાં રે\nજી રે જનક, તેવો લક્ષ અલક્ષ કોઈ વિરલા જાણે\n    તેનું મન રમે છે આત્મામાં રે\nજી રે જનક, આત્મા અનાત્મા ભેદ છે ન્યારો\n    એક નિત્ય અનિત્ય કહાવે રે\nજી રે જનક, આત્મા નિત્ય અનાત્મા અનિત્ય\n    તેનો મર્મ કોઈ યોગી પાવે રે\nજી રે જનક, ખટપટ મેલી ધ્યાન ચિત્તમાં ધરો\n    તો લક્ષ દ્રષ્ટિમાં આવે રે\nજી રે જનક, આઠેય પહોર જેનો નશો ઉતરે નહિં\n     એ જ પુરા ભજની કહાવે રે\nજી રે જનક, પરોક્ષ અપરોક્ષ પરિપૂર્ણ પોતે\n     તેનો ભેદ સદગુરૂ બતાવે રે\nજી રે જનક, શેલર્ષીની ચેલી સતી લોયણ બોલ્યા\n    ત્યારે આત્મા જોવામાં આવે રે"
  },
  {
    "title": "264. જી રે રાણી, મૂળ વાસના જેની બ્રહ્મમાં ભળી છે",
    "slug": "264-ji-re-rani-mul-vasna-jeni-brahmama-bhali-che",
    "authorSlug": "loyan-bai",
    "category": "લોયણ બાઈ",
    "sortOrder": 264,
    "lyrics": "જી રે રાણી, મૂળ વાસના જેની બ્રહ્મમાં ભળી છે\n    એનું નામ જીવન્મુક્ત યોગી રે\nજી રે રાણી, સંકલ્પ વિકલ્પ જેનાં સમય ગયા છે\n    એ તો પોતે બ્રહ્મરસ ભોગી રે\nજી રે રાણી, કેવળ અભ્યાસી પરિપુરણ પોતે \n    આઠેય પહોર સમાધીમાં રહેવે રે\nજી રે રાણી, ચિત્ત સંવેદન જેનું સમાઈ ગયુ છે\n    એ તો અક્ષરાતિત કહાવે રે\nજી રે રાણી, વાદ વિવાદ જેનાં મટી ગયા છે\n    એ તો પૂરણ બ્રહ્મ છે પોતે રે\nજી રે રાણી, અનહદ ઘરમાં જેની સુરતા રમે છે\n    એ કળા નવ જડે જેને રે\nજી રે રાણી, તેત્રીસ દેવ તેનાં ચરણમાં લોટે\n    અષ્ટ સિદ્ધિ છે તેની દાસી રે\nજી રે રાણી, અખંડ અનાદી અજન્મા છે પોતે\n    તેણે તોડી માયાની ફાંસી રે\nજી રે રાણી, જે ઘરથી અજાણ હતો તે ઘર આવ્યો\n    ત્યારે ભવનો ફેરો ફાવ્યો રે\nજી રે રાણી, શેલર્ષીની ચેલી સતી લોયણ બોલ્યા\n    ત્યારે વ્યાપમાં આપ સમાયો રે"
  },
  {
    "title": "265. જી રે રાણી, શુદ્ધ સ્વરૂપમાં જેનું લક્ષ લાગ્યુ છે",
    "slug": "265-ji-re-rani-shuddh-swarupma-jenu-laks-lagyu-che",
    "authorSlug": "loyan-bai",
    "category": "લોયણ બાઈ",
    "sortOrder": 265,
    "lyrics": "જી રે રાણી, શુદ્ધ સ્વરૂપમાં જેનું લક્ષ લાગ્યુ છે\n    તેને કેવળ પદ દ્રષ્ટિમાં આવે રે\nજી રે રાણી, તત્ પદ ત્વં પદ મેલી દઈને\n    એ તો અસી પદમાં સુરતા સમાવે રે\nજી રે રાણી, ધ્યાતા - ધ્યાન - ધ્યેયની ત્રિપુટી જ્યાં ન મળે\n    તે તો અખંડ ધ્યાની કહાવે રે\nજી રે રાણી, જીવ ઈશ્વરની જે ભ્રાંતિ ન ભાંગે\n    તેને લોક પરલોક નજરે ન આવે રે\nજી રે રાણી, અસલ યોગની જેણે જુક્તિને જાણી\n    એને સાક્ષાત્કાર થઈ જાવે રે\nજી રે રાણી, પરા પશ્યંતી મધ્યમાને વૈખરી વાણી\n    એ ચારેયથી જુદો કહાવે રે\nજી રે રાણી, સ્થુળ સુક્ષમ કારણ - મહાકારણ સમાવે\n    એને આત્મા અભેદ નજરે આવે રે\nજી રે રાણી, અખંડ સુખમાં અલમસ્ત ફરે છે\n    ત્યાં દ્વૈતપણુ અંતર ન આવે રે\nજી રે રાણી, શેલર્ષીની ચેલી સતી લોયણ બોલ્યા\n    એ તો વ્યાપમાં આપ સમાવે રે"
  },
  {
    "title": "266. જી રે રાણી, જ્યાં લાગી જીવની જાત જાણી નહિ",
    "slug": "266-ji-re-rani-jya-lagi-jivni-jat-jani-nahi",
    "authorSlug": "loyan-bai",
    "category": "લોયણ બાઈ",
    "sortOrder": 266,
    "lyrics": "જી રે રાણી, જ્યાં લાગી જીવની જાત જાણી નહિ\n    ત્યાં લગી અભિમાન આવે રે\nજી રે રાણી, પૂરાં ગુરૂ વિના ખબર પડે નહિ\n    જનમ મરણનો રોગ ન જાવે રે\nજી રે રાણી, વિષય સુખનો જયારે થશે અભાવો\n    ત્યારે સદગુરૂ શાન બતાવે રે\nજી રે રાણી, સતસંગનું મૂળ પ્રથમ તે છે\n    ત્યારે ગુરૂવચનનો રંગ લાગે રે\nજી રે રાણી, ખટ્ટ ઉર્મિ જ્યાં સુધી શુદ્ધ નથી કિધી\n    તે જીવ શિવની ખોજ નહિં પાવે રે\nજી રે રાણી, ઘણાં જન્મથી જીવ ભટકે છે\n    ખરા સતસંગ વિના એ ઘેરે ન આવે રે\nજી રે રાણી, ભેદ ભ્રાંતિ જેનાં ઉરમાં વસે છે\n    તેને સદગુરૂ શું સમજાવે\nજી રે રાણી, જેને જાત ભાતનો ગર્વ નથી ગળ્યો\n    એ ગુરૂનાં ઘરમાં કેમ આવે રે\nજી રે રાણી, બંધ મોક્ષ એવું ગુરૂ બતાવે\n   ભાગ ત્યાગ લક્ષણા કરી આવે રે\nજી રે રાણી, શેલર્ષીની ચેલી સતી લોયણ બોલ્યા\n \t    તેમ ભવનું સંકટ કાપે રે"
  },
  {
    "title": "267. જી રે લાખા, અબળા લોયણ એમ ભણે, કૂંચીયુ છે માલમ ગુરૂજીને હાથ",
    "slug": "267-ji-re-lakha-abala-loyan-em-bhane-kunciyu-che-malam-gurujine-hath",
    "authorSlug": "loyan-bai",
    "category": "લોયણ બાઈ",
    "sortOrder": 267,
    "lyrics": "જી રે લાખા, અબળા લોયણ એમ ભણે, કૂંચીયુ છે માલમ ગુરૂજીને હાથ\n     ગુરૂજી આવે તો તાળા ઉઘડે......અબળા\nજી રે લાખા, અમ્મર આંબો જયારે રોપિયો, એનાં મૂળ તો પહોંચ્યા છે પાતાળ\n     શાખુ સરગાપર પહોંચીયુ‚ એને વેડનારો છે હોશિયાર....અબળા\nજી રે લાખા, ખૂંદી ખમે માતા પૃથ્વી, વાઢી ખમે વનરાઈ\n     કઠણ વચન બોલ્યા સાધુડા ખમે ને, નીર તો સાગરમાં સમાય.....અબળા\nજી રે લાખા, સૂરજ સમો નહિં ચાંદલો ને ધરણી સમો નહિં આભ\n     ગુરૂ સમો નહિં ચેલકો, જેણે મૂળગો ગુમાવ્યો લાભ.....અબળા\nજી રે લાખા, દૂધે ભરી તળાવડી ને, જેની મોતીડે બાંધી પાળ\n     સુગરા હશે તે તો ભરી ભરી પીશે, નુગરા પ્યાસા રે જાય.....અબળા\nજી રે લાખા, કાશી નગરનાં ઘાટમાં, લખ આવે ને લખ જાય\n     સદગુરૂનો સંદેશડો, નુગરાને કહ્યો ન જાય.....અબળા\nજી રે લાખા, લાખોની વોરે ગત વ્હોરતોને, કરતો હિરા હું દો મૂલ\n     ક્રિયા ચૂક્યોને થયો કોઢીયો, ને થયો કોડીને મૂલ.....અબળા\nજી રે લાખા, બાર બાર વરસે ગુરૂજી આવ્યા, લેવા જોને લાખાની સંભાળ\n     હાથ અડયાને કાયા થઈ હેમની, લાખો થયો છે કંચનની તોલ....અબળા\nજી રે લાખા, સોનુ જાણીને તને સેવીયો ને, કરમે નીવડયું કથીર\n     શેલર્ષીની ચેલી સતી લોયણ બોલ્યા, દેજો સાધુ ચરણમાં વાસ....અબળા"
  },
  {
    "title": "268. જી રે લાખા, હરિ ભજવા હોય તો મિથ્યાપણુ મેલો",
    "slug": "268-ji-re-lakha-hari-bhajva-hoy-to-mithyapnu-melo",
    "authorSlug": "loyan-bai",
    "category": "લોયણ બાઈ",
    "sortOrder": 268,
    "lyrics": "જી રે લાખા, હરિ ભજવા હોય તો મિથ્યાપણુ મેલો\n    આ અવસર આવ્યો છે છેલ્લો રે\nજી રે લાખા, ભવસાગર તરવાનું આ છે ટાણુ\n     તમે હું ને મારૂ મેલો રે \nજી રે લાખા, નામ રૂપ નિશ્વવે જાણો ખોટા\n     તમે એથી રહેજો અળગા રે\nજી રે લાખા, ત્રિગુણી  માયાથી જગત બંધાણુ\n     તમે એ માયાને શીદને વળગો રે\nજી રે લાખા, વિવિધ તાપથી જગત બળે છે\n     તેનો સ્પર્શ તમને નહિં લાગે રે\nજી રે લાખા, સદગુરૂનાં હુકમે તમે ચાલો\n     તેથી મોહ માયાનું બળ ભાગે રે\nજી રે લાખા, અનભે થવું હોય તો એ પદ પાળો\n    તો બાહિર ભીતર બ્રહ્મ ભાળો\nજી રે લાખા, શેલર્ષીની ચેલી સતી લોયણ બોલ્યા\n    તમને ગુરૂ વચનનું આપું જ્ઞાન રે"
  },
  {
    "title": "269. જી રે લાખા, વાસણ છોટાને આ વસ્તુ બહુ મોટી",
    "slug": "269-ji-re-lakha-vasan-chotane-aa-vastu-bahu-moti",
    "authorSlug": "loyan-bai",
    "category": "લોયણ બાઈ",
    "sortOrder": 269,
    "lyrics": "જી રે લાખા, વાસણ છોટાને આ વસ્તુ બહુ મોટી\n   અધિકારીનાં ઉરમાં ઠેરાય રે\nજી રે લાખા, માટે તમે બહુ ધિરજ રાખજો\n    નહિંતર વસ્તુ અલફાઈ જાવે રે\nજી રે લાખા, ગુપ્તમાં ગુપ્ત રહી ભજન જોને કરવું\n    કોઈની આગળ નહિં રે ઓચરવું\nજી રે લાખા, ગુપ્ત આવવાનું ને ગુપ્ત આનુ સમરણ\n    કોઈ ન જાણે એમ ધ્યાન ધરવુ\nજી રે લાખા, હરિને મળવું હોય તો દંભ ન કરવો જરીએ\n    બહુ રે એકાંતે જોને રહેવું\nજી રે લાખા, જગતનાં જીવ સાથે બહુ વાત ન કરવી\n     મુની પણુ જોને લેવું રે\nજી રે લાખા, એવી રીતે જોને રીતીમાં વરતવું\n     ખપે એટલું વચન જોને કહેવું\nજી રે લાખા, શેલર્ષીની ચેલી સતી લોયણ બોલ્યા\n     ગુણ ગ્રાહી થઈને રહેવું"
  },
  {
    "title": "270. જી રે લાખા, માન મેલીને આવો મેદાનમાં",
    "slug": "270-ji-re-lakha-man-meline-aavo-medanma",
    "authorSlug": "loyan-bai",
    "category": "લોયણ બાઈ",
    "sortOrder": 270,
    "lyrics": "જી રે લાખા, માન મેલીને આવો મેદાનમાં\n     સદગુરૂ ચરણે શીશ નમાવો\nજી રે લાખા, શેઠપણાને તમે કોરે મૂકી દઈને\n     તમે સંકલ્પ - વિકલ્પ સમાવો રે\nજી રે લાખા, સદગુરૂનાં વચનની કરજો ઓળખાણું\n    ઈ વગર પાર નહિ આવે રે\nજી રે લાખા, ભવસાગરમાં બહુ મત છે ઝાઝા\n     ઈ મત આપણી બુદ્ધિને ભમાવે રે\nજી રે લાખા, સદગુરૂનાં આપણે વેચ્યા વેચાઈએ\n     આપણે મનનું ડહાપણ હરીએ રે\nજી રે લાખા, ગુરૂજીને પૂછી આપણે પગલા ભરીએ\n     સદગુરૂ કહે એમ કરીએ રે\nજી રે લાખા, એવું મન છે ઈ એની આગળ ધરીએ\n     એનાં વચનોમાં આપણે રહીએ રે\nજી રે લાખા, સદગુરૂ ઘરની ઉંડી ઉંડી રમતુ\n    એની અધુરીયાને ગુંજ ન દઈએ રે\nજી રે લાખા, વિવેક વૃતિની આપણે હદમાં રહેવું\n    ગુરૂ હુકમ કરે એટલું કરવું રે\nજી રે લાખા, શેલર્ષીની ચેલી સતી લોયણ બોલ્યા\n    આપણે ગુરૂ ચરણે શિશ જોને ધરવુ રે"
  },
  {
    "title": "271. જી રે લાખા, મન શુદ્ધ કરીને તમે ચાલો",
    "slug": "271-ji-re-lakha-man-shuddh-karine-tame-chalo",
    "authorSlug": "loyan-bai",
    "category": "લોયણ બાઈ",
    "sortOrder": 271,
    "lyrics": "જી રે લાખા, મન શુદ્ધ કરીને તમે ચાલો\n    પાળોને સાચી જોને રહેણી\nજી રે લાખા, વાદ વિવાદ નહિં આ ઘરમાં\n    તમે કહેવા ન શીખો, નકરી કહેણી\nજી રે લાખા, એક એક યોગ તેની બાર છે ક્રિયા\n    એક ચિત્ત કરી સાંભંભળજો રે\nજી રે લાખા, આ વાણી નથી ક્યાંય કહેવા જેવી\n    તમે જ્ઞાન હિમાળામાં ગળજો રે\nજી રે લાખા, પ્રથમ ક્રિયા તો ગુરૂનું વચન છે\n    બીજી ક્રિયા જોને ઝરણાં જાપ રે\nજી રે લાખા, ત્રીજી ક્રિયા જોને બ્રહ્મચર્ય પાળવું\n    ચોથી રે ક્રિયા અમીરસ ચાખો રે\nજી રે લાખા, પાંચમી ક્રિયા તમે ઇન્દ્રિયોને જીતો\n     છઠ્ઠી ક્રિયા પવન થંભાવો રે\nજી રે લાખા, સાતમી ક્રિયા તમે મનને જીતો\n    આઠમી ક્રિયા વાણી નિયમમાં લાવો રે\nજી રે લાખા, નવમી ક્રિયા તમે સુરતા સાધો\n    દશમીમાં મૂળને બાંધો રે\nજી રે લાખા, અગિયારમી ક્રિયા સૂર્ય ચંદ્રને જાણો\n    બારમી એ પ્રેમને જગાડો રે\nજી રે લાખા, એવી ક્રિયા જયારે ગુરૂજી બતાવે\n    ત્યારે ફરીને ચોરાસીમાં ન આવે રે\nજી રે લાખા, શેલર્ષીની ચેલી સતી લોયણ બોલ્યા\n     આ ભવનો ફેરો ફાવે રે"
  },
  {
    "title": "272. જી રે લાખા, જીવદશાને તમે દૂર કરો",
    "slug": "272-ji-re-lakha-jivdashane-tame-dur-karo",
    "authorSlug": "loyan-bai",
    "category": "લોયણ બાઈ",
    "sortOrder": 272,
    "lyrics": "જી રે લાખા, જીવદશાને તમે દૂર કરો\n    તો અનુભવનું સુખ થાશે\nજી રે લાખા, દેહની ઉપાધીમાં જ્યાં લગી વળગ્યા\n    ત્યાં લગી અવિદ્યા કેમ જાશે રે\nજી રે લાખા, શત્રુને મિત્ર જ્યાં નહિં પક્ષાપક્ષી\n    એવી જાણો તમે જોગીની જુગ્તી\nજી રે લાખા, સુરતા નિરંતર રાખોને તખત પર\n    તો જીવદશામાંથી થાશે મુક્તિ રે\nજી રે લાખા, ધ્યાન ધરવામાં તમે આળસ ન કરશો\n     તમે સદગુરૂનાં વચનમાં હાલો\nજી રે લાખા, નુરત સુરતનાં તમે ખેલ ખેલો\n    તો તમે નિરગુણ પદમાં માલો રે\nજી રે લાખા, યોગનાં પદની રમત છે જુદી\n    તમે સદગુરૂ શાનને જાણો રે\nજી રે લાખા, શેલર્ષીની ચેલી સતી લોયણ બોલ્યા\n    સમજીને મહાસુખ માણો રે"
  },
  {
    "title": "273. એવા સંતો રે પધાર્યા રંગમહેલમાં",
    "slug": "273-eva-santo-re-padharya-rangmahelma",
    "authorSlug": "loyan-bai",
    "category": "લોયણ બાઈ",
    "sortOrder": 273,
    "lyrics": "એવા સંતો રે પધાર્યા રંગમહેલમાં, આનંદ ઉત્સવ થાય\nસંતોને વધાવે રાણી સુરજા, હૈયે હરખ ન માંય.....(ટેક)\n\nએવી ગત રે ગંગા મળી ઘરને આંગણે, એક મના નરને નાર\nનિજને વરેલા નર નિજારી, કરતા ભજનનો લલકાર....સંતો\n\nએવા વ્રેમંડ કુંભને સ્થાપ્યા, ઉઘડ્યા અલખનાં દ્વાર\nઅખંડ આરાધે ધણી આવ્યા, દિઠા દિલડે દિદાર....સંતો\n\nએવુંય ભક્તિ રે મટાડે ભવનાં રોગને, સદગુરૂ શિખવે નિદાન\nકડવા રે ઓષડ પાવે પ્રેમથી, નિવડે અમૃત સમાન....સંતો\n\nએવી ભક્તિની જુગતિ રે તમે જાણજો, બની જાવ દાસાનો દાસ\nશેલર્ષીની ચેલી સતી લોયણ બોલ્યા, પામે અમરાપુરમાં વાસ.....સંતો"
  },
  {
    "title": "274. સુરતા બાણથી સદગુરૂનું પુજન કરીએ સારૂ હે",
    "slug": "274-surta-banthi-sadgurunu-pujan-karie-saru-he",
    "authorSlug": "loyan-bai",
    "category": "લોયણ બાઈ",
    "sortOrder": 274,
    "lyrics": "સુરતા બાણથી સદગુરૂનું પુજન કરીએ સારૂ હે....જી\nસદગુરૂજી કૃપા કરીને આપે અભવ પદ ન્યારૂ હે....જી\n\nપહેલા બાણે ગંગા જળથી સ્નાન કરાવું સારું હે....જી\nબીજું બાણે કોમળ અંગને છે કોરૂ કરનારૂ હે....જી\nત્રીજા બાણે કનક સિંહાસન સદગુરૂને પધરાવું હે....જી\nચોથા બાણે પંચામૃતથી ચરણ કમળ પખાળું હે....જી\nપાંચમા બાણે કેસર ચંદનનું લલાટે તિલક લગાવું હે....જી\nછઠે બાણે ગુલાબ મોગરાની હાર ગુથીને પહેરાવુ હે....જી\nસાતમાં બાણે શુદ્ધ ઘીનો દીપક લઈ પ્રગટાવું હે....જી\nઆઠમાં બાણે ગુગળ લોબાનનો દુધ ગુરૂને ધરાવું હે....જી\nનાવમાં બાણે નિવેદ રૂપે પ્રસાદ ગુરૂને જમાડું હે....જી\nદસમા બાણે દોઈ કર જોડી ચરણે શીશ નમાવું હે....જી\n\nપ્રેમથી ગુરૂ પુજન કરીને મારા હૃદય કમળ પધરાવું હે....જી\nદાસ જયંતિ સદગુરૂને નિત્ય ધ્યાનમાં બોલાવું હે....જી"
  },
  {
    "title": "275. આ રે કાયાનો હિંડોળો રચીયો",
    "slug": "275-aa-re-kayano-hindolo-rachiyo",
    "authorSlug": "rupade",
    "category": "રૂપાદે",
    "sortOrder": 275,
    "lyrics": "આ રે કાયાનો હિંડોળો રચીયો, જગમગ ઝોલા ખાય રે માંયલા\nચેતી ચાલો ભાઈ રે.....(ટેક)\n\nચેતી ને ચાલશો તો પાર ઉતરી જાશો\nભાવસાગરીયાની માંય રે માંયલા.....ચેતી\n\nકાયા વાડીની થઈ ગઈ તૈયારી\nસુકરીત મન કર માંય રે માંયલા....ચેતી\n\nકાયાવાડીનો કિલ્લો લૂંટાશે\nભર જોબનીયાની માંય રે માંયલા....ચેતી\n\nબુઢ્ઢો થયો ત્યારે માળા પકડી\nઠાકોરને ઠગવાય રે માંયલા.....ચેતી\n\nઆ રે મારગડે અનેક નર સિધ્યા\nતોળી રાણી સાધ્ય કહેવાય રે માંયલા.....ચેતી\n\nગુરૂ પ્રતાપે રૂપાદે બોલ્યા\nમાલદેને વિનંતી સુણાય રે માંયલા.....ચેતી"
  },
  {
    "title": "276. વચન વિવેકી જે નરનારી",
    "slug": "276-vacan-viveki-je-narnari",
    "authorSlug": "ganga-sati",
    "category": "ગંગા સતી",
    "sortOrder": 276,
    "lyrics": "વચન વિવેકી જે નરનારી, બ્રહ્માદિક લાગે જેને પાય રે\nજથારથ વચનની શાન જેણે જાણી, એને કરવું હોય એમ થાય રે......(ટેક)\n\nવચનમાં સમજે તેને મહાસુખ થાવે, એ તો ગત્ત રે ગંગાજી કહેવાય\nએક મના થઈને અલખને આરાધે તો, નકળંગ પ્રસન્ન તેને થાય......વચન\n\nવચને સ્થાપન. વચને ઉથાપન, વચને મંડાય પ્રભુનો પાટ\nવચનુંના પૂરા એ તો નહિં રે અધુરીયા, લાવો તમે વચનનો ઠાઠ......વચન\n\nવસ્તુ વચનમાં છે પરિપૂર્ણ, વચન છે ભક્તિ કેરૂ અંગ\nગંગાસતી એમ જ બોલીયા, કરવો વચનવાળાનો સંગ......વચન"
  },
  {
    "title": "277. વિજળીને ચમકારે મોતીડા પરોવવા",
    "slug": "277-vijaline-camkare-motida-parovva",
    "authorSlug": "ganga-sati",
    "category": "ગંગા સતી",
    "sortOrder": 277,
    "lyrics": "વિજળીને ચમકારે મોતીડા પરોવવા, અચાનક અંધારા થાય રે \nજોત રે જોતામાં દિવસો વહ્યા રે જાશેને, એકવીશ હજાર  છસોને કાળ ખાય રે....વિજળી\n\nભાઈ રે જાણ્યા જેવી વસ્તુ અજાણ છે, એ તો અધુરીયાને ન કહેવાય\nગુપત રસનો ખેલ છે અટપટો, આંટી મેલો તો સમજાય..... વિજળી \n\nભાઈ રે નિર્મલ થઈને આવોને મેદાનમાં, જાણી લેવી જીવની જાત રે \nઅજાતિ વિજાતિની જુક્તિ બતાવુને, બીબે પાડી દઉ બીજી ભાત રે......વિજળી \n\nપિંડ રે બ્રહ્માંડથી પર છે ગુરૂજી, તેનો રે દેખાડુ તમને દેશ \nગંગાસતી એમ બોલીયા, ત્યાં નહિં માયા કેરો લેશ રે.......વિજળી"
  },
  {
    "title": "278. મેરૂ તો ડગે જેનાં મનનાં ડગે",
    "slug": "278-meru-to-dage-jena-manna-dage",
    "authorSlug": "ganga-sati",
    "category": "ગંગા સતી",
    "sortOrder": 278,
    "lyrics": "મેરૂ તો ડગે જેનાં મનનાં ડગે, ભલે ભાંગી પડે બ્રહ્માંડ રે \nવિપત્ત પડે પણ વણસે નહિં, સોઈ મારા હરિજનનાં પ્રમાણ રે....(ટેક) \n\nચિત્તની વૃત્તિ સદા નિર્મળ  રાખેને, કરે નહિં કોઈની આશ \nદિએ દાન પણ રહે અજાચક, વચનમાં રાખે વિશ્વાસ......મેરૂ\n\nસુખ રે દુઃખની જેને ન આવે હેડકીને, આઠેય પહોર આનંદ રે\nનિત્ય રહેવે સત્તસંગમાં એ તો, કાટે માયા કેરી  જાળ રે.......મેરૂ\n\nતન મન ધન પ્રભુને અર્પી દે, ધન્ય નિજારી નરને નાર \nએકાંતે બેસી અલખને આરાધે તો, પ્રભુ પધારે તેને દ્વાર......મેરૂ\n\nસંગતુ કરો તો તમે એવાની કરજો, ભજનમાં રહેજો ભરપુર રે\nગંગાસતી એમ બોલીયા, જેનાં નયનોમાં વરસે સાચા નૂર રે.......મેરૂ"
  },
  {
    "title": "279. ભક્તિ કરવી તેણે રાંક થઈને રહેવુ",
    "slug": "279-bhakti-karvi-tene-rank-thaine-rahevu",
    "authorSlug": "ganga-sati",
    "category": "ગંગા સતી",
    "sortOrder": 279,
    "lyrics": "ભક્તિ કરવી તેણે રાંક થઈને રહેવુ, મેલવું અંતરનું અભિમાન\nસદગુરુનાં ચરણમાં શિશ નમાવી, કરજોડી લાગવું પાય રે......(ટેક)\n\nજાતિપણુ છોડી અજાતિ રે થાવુને, કાઢવો વરણ વિકાર રે\nજાતિ ભાતી નહિ હરિનાં દેશમાં રે, એવી રીતે રહેવું નિર્મળ રે.....ભક્તિ\n\nપારકા અવગુણ જોવા નહિં કોઈનાં, એને કહીએ હરિનાં દાસ રે\nઆશાને તૃષ્ણા એકે નહિ ઉરમાં, ને દ્રઢ કરવો વિશ્વાસ રે......ભકિત.\n\nભકિત કરો તો એવી રીતે કરજો, રાખજો વેચનમાં વિશ્વાસ રે\nગંગાસતી એમ બોલીયા એને કહિએ હરિનાં દાસ રે......ભકિત."
  },
  {
    "title": "280. શીલવંત સાધુને વારંવાર નમીએ",
    "slug": "280-silvant-sadhune-varamvar-namie",
    "authorSlug": "ganga-sati",
    "category": "ગંગા સતી",
    "sortOrder": 280,
    "lyrics": "શીલવંત સાધુને વારંવાર નમીએ, જેનાં બદલે નહિ વર્તમાન\nચિત્તની વૃતિ જેની નિર્મળ રહેવે ને, મહારાજ થયા મહેરબાન --- (ટેક) \n\nશત્રુને મિત્ર જેને એકેય નહિં ઉરમાં, પરમારથમાં જેને પ્રિત \nમન કર્મ વાણીથી વચનમાં ચાલે, રૂડી પાળે એની રીત.......શીલવંત\n\nઆઠેય પહોર મન મસ્ત થઈ રહેવે, જેને જાગી ગયો તુરીયાનો તાર\nનામને રૂપ જેણે મિથ્યા કરી જાણ્યા ને, સદાયે ભજન નો એને આહાર.......શીલવંત\n\nસંગતુ તમે જ્યારે એવાની કરશો, ઉતરશો ભવપાર\nગંગાસતી એમ બોલીયા, જેને વચનો સાથે વહેવાર.......શીલવંત"
  },
  {
    "title": "281. નવધા ભકિતમાં નિર્મળ રહેવુંને",
    "slug": "281-navdha-bhaktima-nirmal-rahevune",
    "authorSlug": "ganga-sati",
    "category": "ગંગા સતી",
    "sortOrder": 281,
    "lyrics": "નવધા ભકિતમાં નિર્મળ રહેવુંને, શિખવો વચન માં વિશ્વાસ \nસદ્દગુરૂને પૂછી ને પગલા ભરવાને, થઈને રહેવું ગુરૂ નાં દાસ……(ટેક)\n\nરંગરૂપ માં બહુ રમવું નહિં ને, કાયમ કરવો ભજન નો અભ્યાસ\nસદ્દગુરૂને સંગે નિર્મળ રહેવુંને , ત્યજી દેવી ફળની આશ......નવધા\n\nદાતા ને ભોકતા હરિ એમ કહેવું ને, રાખવું નિર્મળ જ્ઞાન \nસદ્દગુરૂ ચરણોમાં શિષ નમાવુ ને, ઘરવું ગુરૂજીનું ધ્યાન......નવધા\n\nઅભ્યાસી ને એવી રીતે રહેવુંને, જાણવો વચનનો મર્મ\nગંગાસતી એમ બોલીયા, છોડી દેવા અસૂરી કર્મ......નવધા"
  },
  {
    "title": "282. સરળ ચિત્ત રાખી ને નિર્મળ રહેવુંને",
    "slug": "282-saral-citt-rakhi-ne-nirmal-rahevune",
    "authorSlug": "ganga-sati",
    "category": "ગંગા સતી",
    "sortOrder": 282,
    "lyrics": "સરળ ચિત્ત રાખી ને નિર્મળ રહેવુંને, આણવું નહિ અંતરમાં અભિમાન\nપ્રાણી રે માત્ર માં સમદ્રષ્ટિ રાખવીને, અભ્યાસે જીતવો અપાન………(ટેક)\n\nરજ કર્મથી તમારે સદા દુર રહેવુંને, કાયમ કરવો અભ્યાસ \nપાંચેય પ્રાણને એક ઘરે લાવવાને, રાખવો વચનમાં વિશ્વાસ………સરળ\n\nડાબી છે ઇંગલા, જમણી છે પીંગલા, રાખવું સ્વરભેદ માં ધ્યાન \nસૂર્ય માં જમવુ ને ચંદ્રમાં જળ પીવું, એમ કાયમ લેવું વર્તમાન……..સરળ\n\nનાંડી શુદ્ધ થયા પછી અભ્યાસ જાગેને, નક્કી જાણવું નિર્ધાર\nગંગાસતી એમ બોલીયા, આ ખેલ છે અગમ અપાર……..સરળ"
  },
  {
    "title": "283. તમે વિશ્વાસી નર ને કાઁ વેડો, માણારાજ રે",
    "slug": "283-tame-visvasi-nar-ne-kam-vedo-manaraj-re",
    "authorSlug": "toral-bai",
    "category": "તોરલ બાઈ",
    "sortOrder": 283,
    "lyrics": "તમે વિશ્વાસી નર ને કાઁ વેડો, માણારાજ રે\nનર ને નુગરાની સાથે નેડલો ન કરીએ રે....\n\nધણી તારા નામનો રે, પાટ મંડાણો રે\nએની જળહળ જ્યોત બિરાજે, માણારાજ રે....નર\n\nસાચા ખોટા બોલીને આવે રે મંદિરીએ\nએ તો ઠાલા રે બજારૂ માં માણે.... માણારાજ રે.....નર\n\nહંસલાને જોઈએ, રૂડા મોતીડા નો ચારો રે\nઓલ્યા બગલા ડોળે, કાદવ ગારો, માણારાજ રે....નર\n\nગુરૂ નાં પ્રતાપે સતી તોરલ બોલીયા રે\nમારા સાધુડા અમરાપર માં માલે....માણારાજ રે....નર"
  },
  {
    "title": "284. જેસલ રચ્યો મહામંડપ આજ, આનંદ મારા ઉરમા રે",
    "slug": "284-jesal-racyo-mahamandap-aaj-aanand-mara-urma-re",
    "authorSlug": "toral-bai",
    "category": "તોરલ બાઈ",
    "sortOrder": 284,
    "lyrics": "જેસલ રચ્યો મહામંડપ આજ, આનંદ મારા ઉરમા રે\nગુરૂગાદી પર મહારાજ, પધરાવુ રે ઉમંગમાં રે......\n\nજેસલ લાવ્યા સુરતા દોરી આજ, ખીમડા ગુરૂની શાનમાં રે\nતેનો રચ્યો મહામંડપ આજ, ગુણ ગાઉ તેનાં વચનમાં રે......જેસલ\n\nજેસલ બાવન અક્ષરનો આ સ્થંભ, રંગ્યો બહુ રંગમાં રે\nતે પર ચાર વેદ ની સોગઠ, પંચમ વેદ વચમાં રે......જેસલ\n\nજેસલ સાત ભૂમિકાની એ શાન, વાસણ સાત એકમાં રે\nબાંધ્યા તેને ચાર લાકડીની માંય, ભક્તિ અંગ ચારમાં રે....જેસલ\n\nજેસલ નવ ઈન્દ્રિયોનાં દોર, બાંધ્યા છે નવ નવ નાડા રે\nદશમી દોરી સુરતા ધાર, બાંધી વેદ નાં મૂળમાં રે......જેસલ\n\nજેસલ સુરતા અનંત દિશાથી આવી, બાંધી વેદનાં મૂળમાં રે\nઅજાતિ સાધુ દોરી પર, બેઠા છે આનંદમાં રે....જેસલ\n\nજેસલ સ્થાપન કિધા સ્થૂળ દેહનાં, તત્વ ચોરાશી ખાના રે\nતેના રંગ તો ઉપર દેખાય, પંચરંગી ધજામાં રે.....જેસલ\n\nજેસલ સુક્ષમ વેદ પંચમથી પર, જ્યોતિ નિજીયા શિખરમાં રે\nતેને જુએ કોઈ અનુભવી સંત, નિજ પદે ગુરૂગમમાં રે.......જેસલ\n\nજેસલ આજે ગુરૂગાદી પર મહારાજ, દાદા ઉગમશી મંડપમાં રે\nએમ કરી ગાય છે તોરલબાઈ, એ જ લાભની સમજમાં રે......જેસલ"
  },
  {
    "title": "285. જેસલ કરી લે વિચાર, માથે જમ કેરો માર",
    "slug": "285-jesal-kari-le-vicar-mathe-jam-kero-mar",
    "authorSlug": "toral-bai",
    "category": "તોરલ બાઈ",
    "sortOrder": 285,
    "lyrics": "જેસલ કરી લે વિચાર, માથે જમ કેરો માર\nસપના જેવો છે સંસાર, તોળી રાણી કરે છે પોકાર\nઆવો ને જેસલ રાય, આપણે પ્રેમ થકી મળીએ રે\nપૂરા સંત હોય ત્યાં જઈ ભળીએ રે.....(ટેક)\n\nઆવ્યો અમૂલખ અવતાર, માથે સદગુરૂ આધાર\nજાવુ છે ધણીને દરબાર, કાયા બેડી ઉતારે ભવપાર....આવોને\n\nગુરુ નાં ગુણ નો નહિ પાર, ભકિત છે ખાંડાની ધાર\nનુગરા શું જાણે સંસાર, એનો એળે જાય અવતાર....આવોને\n\nજીવની ગતિ ગુરૂની પાસ, જેવી કસ્તુરી માં વાસ\nજ્યાં ધણી તારા નામનો વિશ્વાસ, દિનોનાથ પૂરે આશ.....આવોને\n\nદેખા દેખી કરવાને જાય, આત્મા દીવડીયો દરશાય\nકુડિયા કુવે પડવા જાય, મુરખ મૂડીયો ગુમાય.....આવોને\n\nભેદુ વિના ભેળા થાય, એ તો અધુરીયા કહેવાય\nએને કાયા નૂર ન વરતાય, એનું કલ્યાણ કેમ કરી થાય.....આવોને\n\nછિપું સમુંદર માં થાય, એની ધન્ય રે કમાય\nસ્વાતિ નાં મેહુલા વરસાય, ત્યારે સાચા મોતીડા બંધાય.....આવોને\n\nમોતીડા એરણમાં ઓરાય, માથે ઘણ કેરા ઘા થાય\nફૂટે તે ફટકીયા કહેવાય, ખરાની ખરે ખબરૂ થાય.....આવોને\n\nચાંદો સૂરજ વસે છે આકાશ, નવલખ તારા એની પાસ\nપવન પાણી ને પ્રકાશ, સૌ લોક કરે તેની આશ..... આવોને\n\nનવલખ કોથળીયુ બંધાય, તે તો ગાંધીડો કહેવાય\nહિરા માણેક હાટડે વેચાય, તે દી એનાં મૂલ મોંધા થાય......આવોને\n\nનિત નિત ઉઠી ન્હાવા જાય, કોયલા ઉજળા ન થાય\nગુણિકાને બેટો જો થાય, બાપ કોને કહેવા જાય....આવોને\n\nપ્રેમ નો પાટ પ્રેમનો ઠાઠ, પ્રેમની જયોત નો પ્રકાશ\nઆગળ તેની નમણુ થાય, સાહ્યબો  પુરે આપણી આશ.....આવોને\n\nમનની માંડવીયું રોપાય, તન કેરા પડદા બંધાય\nજતિ સતી મળી ભેગા થાય, સતીયુનાં પંજા જ્યાં મેળાય.....આવોને\n\nદેતે હરિગુણ ગાય, પ્રેમે ગુરૂ પૂજા થાય\nકોળી પાવળીએ વરતાય, ચાર જુગની વાણી તોરલ ગાય......આવોને"
  },
  {
    "title": "286. સંતો સત્તશબ્દ ચિત્ત જોડો",
    "slug": "286-santo-sattasabd-citt-jodo",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 286,
    "lyrics": "સંતો સત્તશબ્દ ચિત્ત જોડો પાછળથી પસ્તાવુ પડશે ને વખત રહ્યો છે થોડો.....(ટેક)\n\nજેને અંતરથી ભૂલી જવું છે, તેને રાતદિન શીદ ગોખો\nલાભ હાણનાં લેખા કરો છો, એ અજ્ઞાન છે ચોખ્ખો.........સંતો\n\nદરવેશ પહેરી ફરે દુનિયામાં, અંદર વેશ જો એનો\nનામ રૂપ ગુણ થી છે ન્યારો, ઈ પરખ્યા વિના પ્રેમ શાનો......સંતો\n\nચાર વેદ ખટશાસ્ત્ર કહે છે, ઉત્પત્તિ લય એ માયા\nએનાં ગુણ ગાઈ ભક્તિ કરો છો, મનમાં બહુ મલકાયા........સંતો\n\nશૂરાતન છે પણ ક્યાં જઈ લડીયે, સામા મળ્યા ન કોઈ શૂરા\nવ્યાપક ચેતન વિશ્વ નિરંતર, દાસ સવો નિજ નુરા...........સંતો"
  },
  {
    "title": "287. મરવું હોય તે નર એમ મરો, સંશય સર્વે વ્યાગો",
    "slug": "287-marvu-hoy-te-nar-em-maro",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 287,
    "lyrics": "મરવું હોય તે નર એમ મરો, સંશય સર્વે વ્યાગો\nમન મારી તમે રહેજો જીવતા, ત્રણે ગુણને ત્યાગો\nછતી આંખે થઈ આંધળા, મોહ નીંદરથી જાગો.....\n\nતન મન ધન ત્રણેય મરે પછી, વેવાર વિદેહથી રાખો\nશ્વાસા વિના સમરણ કરો, રસ વિના જીભેથી ચાખો......\n\nઆપ મટ્યુ ને મટી આપદા, મટ્યુ મારૂ ને તારૂ\nકામ કલ્પના સર્વે મટી, એમ મરે તેને ઉગારૂ......\n\nત્રણેય તાપથી તે નહીં બળે, જેણે સર્વે દિધુ સળગાવી\nબ્રહ્મ અગ્નિમાં ભેગો રમે, ગુરૂ એ ગુરૂગમ બતાવી......\n\nનિજારી પુરૂષનો આ નાવ છે, તે કૂંચી સદગુરૂ જાણે\nદાસ સવો કહે ખોલ જો દ્વારને, માયા મૂવા પછી માણે......"
  },
  {
    "title": "288. નામ સમાન બીજુ કાંઈ ન આવે",
    "slug": "288-nam-saman-biju-kami-n-aave",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 288,
    "lyrics": "નામ સમાન બીજુ કાંઈ ન આવે, મેં તો નિજ શબ્દનાં ગુણ ગાવુ......(ટેક)\n\nકર્મ ઉપાસી સારી દુનિયા, નિત નિત જળમાં ન્હાવે\nજળનાં જીવ સદા સંતાપે, ઉલ્ટા એ કરમ બંધાવે.......\n\nઠાકર સેવાનો ઠાઠ મચાવે, ફુલડાની ફાટુ મંગાવે\nમનમાં જાણે મે કરમને કાપ્યુ, પણ બમણુ બંધન થાવે......\n\nકુલ ક્રિયામાં જુવો તપાસી, મન મોહ કરીને બંધાવે\nહું ને મારૂ તો હરદામાં રાખે, મર જપ તપ જોગ બનાવે.......\n\nસુક્ષમ સેવા સતગુરૂ બતાવે, ત્રિગુણ રહિત કોઈ આવે\nઅગમ પંથમાં અલખ ઉપાસી, નિક્રમ કરમ કરાવે......\n\nશિલતાનું સ્નાન અંગે ધરાવે, ઠાકર મનવો ઠેરાવે\nપ્રેમ પુષ્પનો હાર ગળામાં, ઈસ બિધ દેવ રીઝાવે......\n\nશબ્દ વિવેકી મળે સંત ઝવેરી, તો કરમની રેખા કપાવે\nસ્વામિ ફુલગરજી સંત ચરણમાં, દાસ સવો ગુણ ગાવે........"
  },
  {
    "title": "289. ભક્તિને વોરતા ભ્રાંત મટી નહિં",
    "slug": "289-bhaktine-vorta-bhrant-mati-nahim",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 289,
    "lyrics": "ભક્તિને વોરતા ભ્રાંત મટી નહિં, અંતરમાં ઉંડુ જોયું નહિં જાગી\nશબ્દ પરખ્યા વિના સંગ કરવા ગયા, ઉલટી બેસવાની ડાળ ભાંગી\nભૂલ છે પંડમાં નજર પડતી નથી, અંગમાં કાળની ઝાળ લાગી\nશત્રુ તારા તને મારશે મૂરખા, ભ્રાંતિને ક્રોધથી નાસ ભાગી\nસમ સંતોષ વિચારને જ્ઞાન લઈ, મુક્તિનાં દ્વારે બેસ જાગી\nદાસ સવાને ગુરૂ ફુલગરજી મળીયા, તો અનાદિ કાળની ભીડ ભાંગી"
  },
  {
    "title": "290. જગત સબ જાદરી અનીતી આદરી",
    "slug": "290-jagat-sab-jadari-aniti-adari",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 290,
    "lyrics": "જગત સબ જાદરી અનીતી આદરી, વાઘરી સારૂ ભેંસ મારે\nખબર નહિં નામની માયા છે રામની, ખાલી કુટઈ મૂવા ખેદ ખારે\nખોજ્યો નહિં તંતને પોંખ્યા નહિં સંતને, કોણ આગળ થશે જઈશ ત્યારે\nકુટુંબને કામની ઓથ સૌવે ગામની, અંતે તો કર્મને ધર્મ વારે\nમરણની ચિઠ્ઠીયુ અચાનક ઉતરે, ચાલવું મૂરખ ખડગ ધારે\nરામના નામથી ફરે તું રૂસણે, પણ મોત બગડી જાશે જમ મારે\nસવો કહે છોડી દે હું પણુ હાથથી, રહો ભાઈ સતગુરૂ સંત લારે"
  },
  {
    "title": "291. ભજનમાં ભ્રાંત ન રાખો રે",
    "slug": "291-bhajanma-bhrant-n-rakho-re",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 291,
    "lyrics": "ભજનમાં ભ્રાંત ન રાખો રે, આ છે ન ભ્રાંતિલાનો ખેલ\nભ્રાંત ભરાણી જેનાં અંગમાં, તેને દુઃખ સવાયા દાડી\nજ્ઞાન દ્રષ્ટિએ ગોતજો, નહિતર વેંખી નાખશે વાડી.....ભજનમાં\n\nભોરીંગ જેવી ભ્રાંત છે, તેને ડસ્યો આ જુગ સારો \nસતગુરૂજીનાં બાળકો કોઈ, રહ્યો ભ્રાંતથી ન્યારો......ભજનમાં\n\nઇન્દ્ર વજરની નહિં આપદા, તેથી ભ્રાંત દુઃખ ભારે\nજ્ઞાની નરને ગરે અંગમાં તો, શુભ ગુણ નાખે સંહારી.....ભજનમાં\n\nભ્રાંતીલા માણસ ભલે થયા, તે પરને પાવન કરે\nઅરથ બગાડી આપનો અને લખ ચોરાસી ફરે.....ભજનમાં\n\nસ્વામી ફુલગરજી સંત મળ્યા, ત્યારે લે ગગનમાં લાગી\nદાસ સવા પર દયા કરીને, ભ્રાંત દેરડી ભાંગી.....ભજનમાં"
  },
  {
    "title": "292. દુનિયામાં રહેવું દહાડા ચાર",
    "slug": "292-duniyama-rahevu-dahada-car",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 292,
    "lyrics": "દુનિયામાં રહેવું દહાડા ચાર, કાંઈક કાંઈક તો કરો વિચાર\nકોના પુરૂષ ને કોની નાર, જૂઠી બંધાણી છે જાળ\nસંકટ વેઠયા અપરંપાર, માંડ મળ્યો મનુષ્ય અવતાર\nતેમાં સત્તસંગ મોટો સાર, પ્રિત કરજો પાર ઉપકાર\nઆજકાલ ઉપાડે કાળ, કોઈ નહિં ચડે વાંહે વાર\nજીતી બાજી હવે ન હાર, જહાજ પડ્યું સમુદ્ર મોજાર\nરહેજો સંત ચરણની લાર, અંત વખત સુધી એકતાર\nદાસ સવો કહે ભેદ ન ભાળ, તો ગુરૂ ઉતારે પેલે પાર"
  },
  {
    "title": "293. સમજ મન મારા રે, કરાર તારો ક્યાં ગયો",
    "slug": "293-samaj-man-mara-re-karar-taro-kya-gayo",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 293,
    "lyrics": "સમજ મન મારા રે, કરાર તારો ક્યાં ગયો\nજિંદગી બેઠો હારી રે, વદાડ હવે થોડો રહ્યો.....(ટેક)\n\nખોટી ચીજોમાં ખોટી થયો, ને ભૂલી ગયો તારૂ ભાન\nપાખંડની પોળમાં અથડી મુવો, સમજી લે મૂરખ નાદાન\nમાન કહ્યુ મારૂ રે, વહેતા પુરે જઈશ વહ્યો.......\n\nસ્વપ્નમાં તે સુધ ન રાખી, કર્યો ઉંઘનો આર\nધન દોલત સુત દારા સાથે, ખાલી મળ્યો ખુવાર\nજાગીને ન જોયુ રે, ચોરાશીમાં ફરતો રહ્યો.......\n\nપર નીંદા કરી પેટ ભરે છે, વળી આઠે પહોર ઈ કામ\nહરી હિરાને હાથથી ખોયો, તે નિમક કર્યો હરામ\nઅજ્ઞાન અંધારે રે, માનતો નથી કોઈનું કહ્યુ.......\n\nપરને જઈને બહુ પરમોદે, વળી મનમાં જાણે હું મોટો\nતું તારા સ્વરૂપને ભૂલ્યો, એ જ સ્વભાવ છે ખોટો\nતપાસ્યું નહિં તનમાં રે, વ્યાજ લેતા મુળગો રહ્યો......\n\nઅવિચાર ઉંચાઈને દૂર કરો, હરદમ રહો હુંશિયાર\nદાસ સવો ફૂલગરજી ચરણે, પ્રગટ કરે પોકાર\nવહેતા મનને વાળી રે, નિરભે નામે નાતો થયો......."
  },
  {
    "title": "294. નિશ્વે નકકી માનજો રે, કહ્યા છે સૌને ઢોલ વગાડી",
    "slug": "294-nisve-nakki-manjo-re-kahya-che-saune-dhol-vagadi",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 294,
    "lyrics": "નિશ્વે નકકી માનજો રે, કહ્યા છે સૌને ઢોલ વગાડી.....(ટેક)\n\nસમરણ સુખ સદા એક લેજો, દલ ખોજીયે દાડી\nરાત દિવસ છે કાળ કવાડો, પલમાં દેશે પાડી......\n\nબન્યો બગીચો બહુ રંગનો, ભાત ભાતની ઝાડી\nપણ મરણ તો કોઈને નહિં મૂકે, મર પોકારે માડી......\n\nકાંધે ઘા કરશે કઠિયારો, દેશે ધાક ઉઘાડી\nસગા સંબંધી સૌ મળીને જોશે તારી નાડી......\n\nનોકર ચાકર ને નોબત ડંકા, ગમતી ઘોડા ગાડી\nપણ મોત મરદમાં સબી ગરદ, મર કરોડ ફોજ આડી......\n\nખૂંટો પકડી ખબર રાખજો, રહેણી વાડ કરી આડી\nફુલગરજી ચરણે દાસ સવો કહે, જન્મ મરણ ભે કાઢી......"
  },
  {
    "title": "295. ખેતરમાં ખબર રાખજો રે, નહિંતર પાછળથી પસ્તાશો",
    "slug": "295-khetarma-khabar-rakhjo-re-nahintar-pachalthi-pastaso",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 295,
    "lyrics": "ખેતરમાં ખબર રાખજો રે, નહિંતર પાછળથી પસ્તાશો.\nખેતર છે તારૂં ખાર મોળીયું, ખેડ વિના શું ખાશો \nવાયદો આવશે વિઘોટીનો, તેદી પૈસા ક્યાંથી પતાવશો…….\n\nકોટી ગુંડા માંહિ પડ્યા કુંડના, સંશય છોડ મહીં બાસ્યો \nતૃષ્ણા તૃણને નિંદી નાખજો, હાલ હરીના દાસો…..\n\nકુડ સુડ કાઢ સમુળુ, નહિંતર મોલ પાકશે ઓછો\nકરણીના કણ નહી નીપજે, પ્રસાદ ક્યાંથી પાશો……\n\nહું ને મારું એમાં હિમ આવશે, ધંધો ધુડ મીલાવશો \nબીજવાળાની બૂમ આવશે, નક્કી જેલમાં જાશો…..\n\nલખ ચોરાશીનું લેણું થાશે, કપટ કઢારો ન ખાશો \nએવી ખેડથી અમથા સારા, જમ પુરીમાં જાશો……\n\nહરખ હળને નિર્ભય ભોમિકા, સાચે સાબદા થાશો\nસદગુરૂ ચરણે દાસ સવો કહે, કોટી નિપજ કમાશો......"
  },
  {
    "title": "296. આતમ ધન હેરાણું રે, તેથી દીન ફરો છો દિલદાર",
    "slug": "296-aatam-dhan-heranum-re-tethi-din-faro-cho-dildar",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 296,
    "lyrics": "આતમ ધન હેરાણું રે, તેથી દીન ફરો છો દિલદાર……(ટેક)\n\nજ્ઞાન રૂપી કરી દીવડો, તરત તપાસો તનમાં\nઆતમ રૂપી ધન આપણુ, ગળત થયું છે ગગનમાં......\n\nવિવેક વિચારે હરદમ હાલો, એમાં ચોર એક મોટો\nપાંચ ચોર તો ખાતર દેશે, ફેરે છોય નો જોટો.......\n\nઈ તારૂ ને ઈ લેકારૂ, પારખ થઈ ને પરખો\nભજન ભડાકે દિયો ઉડાડી, નુરતે સુરતે નિરખો......\n\nજ્ઞાન ઘોડે કરો ચડાઈયુ, પ્રિતે પલાણુ માંડી\nલગનીની લગામ ગ્રહો હાથમાં, ધિરપ ઢાલુ બાંધી......\n\nપ્રેમ થકી ઝટ લ્યો પગેરૂ, આતમ ધન હેરાણુ\nદશ દરવાજા રોકી લેજો, નથી નીકળ્યુ બારૂ......\n\nહરિ ગુર સંત જન્મ સદા હિતકારી, આતમ ધન અબ પાયો\nસ્વામિ ફૂલગરજી સંત પ્રતાપે, દાસ સવે ગુણ ગાયો......"
  },
  {
    "title": "297. મિથ્યા મેં નહિં ભાખુ રે, સુણજો આગુ તણી એંધાણી",
    "slug": "297-mithya-mem-nahim-bhakhu-re-sunjo-aagu-tani-endhani",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 297,
    "lyrics": "મિથ્યા મેં નહિં ભાખુ રે, સુણજો આગુ તણી એંધાણી....(ટેક)\n\nહું હતો તે દી રામજી ન હતા, ન હતી વેદને વાણી\nજ્ઞાન ગરીબી કશું ન હતુ, સાચી કહું સેલાણી.......\n\nજોગ જુગતી નો જન્મ ન હતો, ન હતા સત્ય કમાણી\nદયા ધરમ દો તે દી ન હતા, ન હતા પ્રેમરસ પાણી.....\n\nશીલ સંતોષ ક્ષમા પણ ન હતા, ન હતી સુરતા રાણી\nશુભ ગુણ સર્વે ત્યાં લગી ન હતા, પરખી જુઓ પુરાણી......\n\nહું ગયોને હરી આવીયા, પુરા જુઓ પીછાણી\nસતગુરૂ ચરણે દાસ સવો કહે, અદલ ફકીરી આણી......"
  },
  {
    "title": "298. માયા ખવરાવે છે માર, તોય ઉપાડે માથે ભાર",
    "slug": "298-maya-khavrave-che-mar-toy-upade-mathe-bhar",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 298,
    "lyrics": "માયા ખવરાવે છે માર, તોય ઉપાડે માથે ભાર\nમૂરખ માં મુખી થઈ ફરે, મરણ થકી મનમાં ન ડરે\nઅંતરમાં આપદા મુખમાં ગાળ, એમ કરી ચલવે વેવાર\nચાડી ચુગલથી નવ ડરે, જૂઠ કપટ લઈ જગમાં ફરે\nકુડી સાક્ષીમાં તૈયાર, કરે અનીતિનો નિત આહાર\nમોટી પાઘડી માથે ધરે, હાથમાં હોકલો ને ઘર ઘર ફરે\nપ્રપંચનો રાખે નહિં પાર, ભે પામી સર્વે કરે જુવાર\nબીવે જુવાન બુઢ્ઢાને બાળ, રખે ચડાવે કૂડી આળ\nકરણી ખોટી કર્મ ચંડાળ, કુટી નાંખશે પલમાં કાળ\nદાસ સવો કહે દુરમતિ ટાળ, કર્મ ફુટ કહાં ફોડ કપાળ"
  },
  {
    "title": "299. પુરણહારો પીર રામદે, સંતોનાં સમરથ ધણી",
    "slug": "299-puranharo-pir-ramde-santonam-samrath-dhani",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 299,
    "lyrics": "પુરણહારો પીર રામદે, સંતોનાં સમરથ ધણી\nઓથ રાખો ઓલીયાની, રિધ્ધિ સિધ્ધિ આપે ઘણી....(ટેક)\n\nનરસિંહ મહેતા નિર્ધન હતા, નાગરોએ હાંસી કરી ઘણી\nસાતસો રૂપીયા શામળીયાએ, દ્વારકા માં દિધા ગણી........પૂરણ\n\nવિપ્ર સુદામે વિપદ વેઠી, ખાલ સુકાણી દેહુ તણી\nકાયમ ધણી કારીગર થઈને, મહેલ કંચનના દીધા ચણી.....પૂરણ\n\nદુર્યોધનને દુરમતિ સુઝી, તે દી ત્રિકમ પધાર્યા ત્યાં ભણી\nદ્રોપદીજીની લજ્જા રાખી, સાડી ઓઢાડી વગર ગણી.......પૂરણ\n\nપછમ ધરામાં પીર પ્રગટયા, ખબર લેવા ખાવનધણી\nદાસ સવાની વહારે આવીયા, હરિજનનાં મુગટમણી.......પૂરણ"
  },
  {
    "title": "300. અંગુઠો મરડીને પિયુને જગાડીયા, ગોરી કહે તને શું આવે ઉંઘ",
    "slug": "300-angutho-mardine-piyune-jagadiya",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 300,
    "lyrics": "અંગુઠો મરડીને પિયુને જગાડીયા, ગોરી કહે તને શું આવે ઉંઘ\nઆડુ જાય અવળું જાય, નણંદલ લેરીયુ રે.....(ટેક)\n\nવર ઠુંઠોને અણવર પાંગળો રે\nકન્યા તો વર વરવા જાય, ઉમંગ ન માંય.......નણંદલ\n\nપાંચ પારખ તો પેલા મુવો રે\nનગરમાં હાટે થઈ હડતાલ, કરી જો વિચાર......નણંદલ\n\nકિડીની હડબેઠે હાથી મુવો રે\nકુંજરને પાડયો છે પગલાની હેઠ, પહોંચાડયો ઠેઠ......નણંદલ\n\nનિર્વિઘ્ને વર પરણીને આવ્યા રે\nકન્યા વરનાં આ ભવજલ તીર, ભર્યા હૈયાનાં નીર.......નણંદલ\n\nનરતન નગરીમાં વિવાહ થયા રે\nજયાં કોઈ ન મળે નર કે નાર, થયો ઝણકાર.....નણંદલ\n\nદાસ સવો કહે છે સુણી સોયરો રે\nસમજે જનમ મરણ ભય જાય, ગુરૂગમ સે ગાય.......નણંદલ"
  },
  {
    "title": "301. ભટકેલા મનની મારી ભૂલ રે સુધારજો, સમજણની સાથે અમને ચરણમાં લેજો",
    "slug": "301-bhatkela-manni-mari-bhul-re-sudharjo",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 301,
    "lyrics": "ભટકેલા મનની મારી ભૂલ રે સુધારજો \nસમજણની સાથે અમને ચરણમાં લેજો.........(ટેક)\n\nકાયાનાં  દેવળ અમને લાગે છે કાચા \nદોહ્યલી વેળાએ દર્શન દેજો રે......સદ્દગુરૂજી મારા \n\nઆવન જાવનની ગલીયું છે વાંકી\nસમજણની સુઝ અમને દેજો......સદ્દગુરૂજી મારા\n\nમરણ તિથીનો બાપા મહિમા છે મોટો\nઅવસર વેળાએ આડા રહેજો......સદ્દગુરૂજી મારા\n\n છોડીને જશો તો તો શોભે નહીં તમને \nનવખંડમાં લાજે તમારો નેઝો......સદ્દગુરૂજી મારા \n\nસવો કહે છે સ્વામિ  અવિચળ રામા સ્વામિ \nઅવગુણ ન લેજો અંતર માંહી રે.......સદ્દગુરૂજી મારા"
  },
  {
    "title": "302. કોઈ સુરતા સુઘડ સમેટે, એનાં ઘટમાં સાહેબ ભેટે",
    "slug": "302-koi-surta-sughad-samete-enan-ghatma-saheb-bhete",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 302,
    "lyrics": "કોઈ સુરતા સુઘડ સમેટે, એનાં ઘટમાં સાહેબ ભેટે.....(ટેક)\n\nતીરથ વ્રતમાં બહુ ફરે ને, જાય બદ્રીને બેટે\nબહાર વાસના બહુ ફેલાવે, નજર ન રાખે નેઠે......\n\nપડયુ છે ત્યાં ગોતે નહિં ને, ગોતે છેટે છેટે\nવેરીથી જેમ ફરે વિરોધે, જોઈને ઘાલે હેઠે........\n\nઆદમ તો અંતરમાં રહે છે, ભજન કરો તો ભેટે\nદિલ દરીયામાં દયો ડુબકી, શીદ ફરો છો છેટે......\n\nદાસ સવાને ગુરૂ ફુલગર મળીયા, નાદ બૂંદને નેઠે\nવર પરણીને ઘેર આવીયા, સુરતા શબ્દને ભેટે......."
  },
  {
    "title": "303. મે નામ સાહેબ કા નુરી, નથી યોગ સિદ્ધિની જરૂરી",
    "slug": "303-me-nam-saheb-ka-nuri-nathi-yog-siddhini-jaruri",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 303,
    "lyrics": "મે નામ સાહેબ કા નુરી, નથી યોગ સિદ્ધિની જરૂરી.....(ટેક)\n\nદિલ દિદાર કરી લઉ દિલમાં, જયાં બાજે અનહદ તુરી\nઅડગ આસને રહુ એકાંતે, સુરતા ગગનમાં પુરી...... \n\nપાંચ પચ્ચીસ કી ફોજ હટાવી દઉં, સમજી કરૂ સબુરી\nઅમરનગરમાં આસન મેરા, રહુ રાત દિન ઝુરી......\n\nકપડા લત્તા મેં નહિં રંગ્યા, પહેરી ફકર ફકિરી\nચેતન હોકર પોરે જાગુ, હરદમ રહુ હજુરી.......\n\nદશ દરવાજે દોડ ન રાખુ, નથી ભલી નહિં બુરી\nસદગુરૂ ચરણે દાસ સવો કહે, જોયુ બ્રહ્મ ભરપુરી........"
  },
  {
    "title": "304. પોકાર કરૂં છું પોકાર તારી કાયા કાંચલી ધોઇ લે",
    "slug": "304-pokar-karu-hu-pokar-tari-kaya-kancli-dhoi-le",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 304,
    "lyrics": "પરગટ કરૂં છું પોકાર, તારી કાયા કાંબળી ધોઈ લે\nતારી દેહીની કાંબળી ધોઈ લે, પરગટ કરું છું પોકાર...\n\nસુરતા શલ્યાને ઠીક ઠેરાવોજી, ધ્યાન ધોકલે ધોઈ લે\nપ્રેમ પાણીમાં બોળ બે ઘડી, નુરત સુરત ઘર જોઈ લે....\n\nસત્ કર સાબુ લગન લપેટોજી, નખ શીખ નુરને જોઈ લે\nદુબજ્યાનો ડાગ દુર કરીને, પલ પલ સુરતા પરોઈ લે....\n\nતખત ત્રીવેણીમાં જઈને તારવોજી, શબદ વાડે સુકાઈ લે\nકરણીના આરેથી કાઢ કુબુદ્ધિ, નુર નીરંતર નહાઈ લે....\n\nશાન્તિના છેડા પકડ પ્રેમથીજી, આદમને ઓઢાઈ લે\nઘરથી ધીર પાક દીલ પેરી, ગુણ ગોવિંદના ગાઈ લે....\n\nનીશદીન રહો નામને નાતેજી, હરખ શોક હઠાઈ લે\nફુલગરજી ચરણે દાસ સવો કહે, જમકો માર મીટાઈ લે...."
  },
  {
    "title": "305. કપટીના કર્તવ્યને જોતા દિન દિન દિલડું કરે છે. ",
    "slug": "305-uparo-nam-upadesh-ne-jota",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 305,
    "lyrics": "કપટીના કરતવ્યને જોતાં, દિન દિન દીલડું ડરે છે રે...\n\nપ્રતીજ્ઞા લઈ પ્રીતું કરે છે, સવારથ દેખી મનડું ચળે છે,\nથાકલ મનુષ્ય ફુંકીને ગળે છે, મેલા હરદે મળે છે રે; કપટી-\n\nશેળો સરપનું પુંછ પકડે છે, બોલ્યા વિનાનો બેસી રહે છે,\nભુંડપ ઉલ્ટી ભોરીંગને દે છે, મણીધરનું મરણ કરે છે; કપટી-\n\nમીની મુસાને પકડી લે છે, મુખમાં લઈ પાછો મુકી દે છે,\nપકડ્યાની પેરવાઈમાં રેછે, આખર આહાર કરે છે રે; કપટી-\n\nમરમ મગરના જેવો કરે છે, જખ મારીને પેટ ભરે છે,\nપ્રભુ ભગત થઈ પૂજામાં ૨ે છે, દાસ સવો તેથી ડરે છે; કપટી"
  },
  {
    "title": "306. જોઈ લ્યો ઊંડાણની બજારમાં",
    "slug": "306-koi-lyo-undani-khabarma",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 306,
    "lyrics": "જોઈ લ્યો બંકનાળની બજારમાં, સુરતા નીશાને ચડી\nસુરતા નીશાને ચડી, મધ્ય મહેલ માં જઈ ને ખડી......બંકનાળ\n\nઅખંડ નાદ રહયો એકતાર, જ્યાં બાજી રહી જાલરી\nસદગુરૂના દેશમાં આજ, નિરભે નોબત ગડી....બેંકતાળ\n\nચંદ્રમાં ભાણ તે દોનું ચોકીએ, શબ્દ પટ્ટો લઈ ચડી\nશુન મંડળ ની શેરીએ, આજ જૂની વસ્તુ જડી..બંકનાળ\n\nખમૈયાની ખડગ હાથ ધરૂ, વાણી આગે અમર આરસી જડી\nશબ્દ ભરોસે સુખમણા લઈ, સોહમ દોર પર ચડી....બેંકનાળ\n\nજરમર જરમર મેહુલા વરસે, વિના વાદળે થઈ જડી\nકોઈ પ્રેમી પુરૂષના સંગ થી, હું એ ઘેર આવી ચડી....બેંકનાળ\n\nદાસ સવાને ફુલગરજી મળ્યા, જુગોજુગ ની ઓથુ જડી\nખાવન ખડકી ખોલતા આજ, પરગટ વસ્તુ પડી...બંકનાળ"
  },
  {
    "title": "307. કોઈ કાયા તુંબડી કળે, તેને જન્મ મરણ ભય ટળે...",
    "slug": "307-કોઈ-કાયા-તુંબડી-કળે-તેને-જન્મ-મરણ-ભય-ટળે-mtr6dc0y",
    "authorSlug": "sant-dasa-savo",
    "category": "સંતવાણી",
    "sortOrder": 307,
    "lyrics": "“કોઈ કાયા તુંબડી કળે, તેને જન્મ મરણ ભય ટળે...\n\nશરીર રૂપી તુંબડી, માંહી ભ્રાંતી રેત લઈ ભરે,\nમુકે મધ્ય દરિયા વિશે, તે કેમ કરીને તરે;\n\nવાસના રૂપી કાંકરા, જન્મ મરણ ઈ જળ,\nતન દેહી એ તુંબડી, પણ ભુલી ગયો નીજ ઘર;\n\nસંસાર રૂપી મહા સમુદ્રમાં, કોઈ છુટે છેડે ફરે,\nકાઢી નાખો કાંકરા, તો તરત તુંબડી તરે;\n\nત્રણ ગુણની બની તુંબડી, ને પાંચ તત્ત્વના પાન,\nસોહ વેલે રહી છે ચોંટી, તુટે સવાર કે સાંજ;\n\nતુટતી વેળાયે તપાસ રાખજો, પડે કરમની છાપ,\nએક તુંબડે ભીખ મગાય છે, એકે જપાય છે જાપ;\n\nસ્વામી ફુલગરજીના ચરણ પ્રતાપે, આ તન તુંબડી જોડી,\nદાસ સવો કહે અદલ ભરાશે, ત્યારે તરત નાખશે તોડી;"
  },
  {
    "title": "308. મન તુંહી તુંહી બોલે રે, સપના જેવું આ તન તારું",
    "slug": "308-man-tuhi-tuhi-bole-re-sapna-jevu-aa-tan-taru",
    "authorSlug": "dhira-bhagat",
    "category": "ધીરા ભગત",
    "sortOrder": 308,
    "lyrics": "મન તુંહી તુંહી બોલે રે, સપના જેવું આ તન તારું\nઅચાનક ઊડી જાશે રે, દેવતામાં જેમ દારૂ... (૩૦૮)\n\nઝાકળનું જળ પળમાં ઊડી જાશે, જેમ કાગળમાં પાણી\nકાયાવાડી તારી એમ કરમાશે, થઈ જાશે ધૂળધાણી\nએવા પછવાડેથી પસ્તાશે રે, મિથ્યા કરી તારું મારું... મન.\n\nકાયા જાણે તારી કાચનો કૂબો, વણસતાં નહીં લાગે વાર\nજીવ કાયાને સગાઈ કેટલી? મેલીને ચાલે વનમોઝાર\nએવું ફોગટ શું ફુલાવું રે, ઓચિંતું થાશે અંધારું... મન.\n\nજીવ્યું તેનું જરૂર જાશે, નથી ઊગરવાનો ઉધારો\nદેવ ગાંધર્વ મનુષ્ય આ સૌને, મરણતણો વારો\nએવો આશાનો મહેલ ઊચો રે, નીચે દટાયું કારભારું... મન.\n\nચંચળ ચિત્ત તમે ચેતીને ચાલો, જપો હરિનું નામ\nપરમાર્થ જાણી નિશ્ચય કરો, એક હરિ ઠરવાનું ઠામ\nધીરા ધરતી ઉપર નથી કોઈ રહેનારું... મન."
  },
  {
    "title": "309. જેને રામ રાખે રે, તેને કોણ મારી શકે",
    "slug": "309-jene-ram-rakhe-re-tene-kon-mari-shake",
    "authorSlug": "dhira-bhagat",
    "category": "ધીરા ભગત",
    "sortOrder": 309,
    "lyrics": "જેને રામ રાખે રે, તેને કોણ મારી શકે\nઅવર નહીં દેખું રે, બીજો કોઈ પ્રભુ પેખે... (ટેક)\n\nચાહે તો અમીર ને ભીખ મંગાવે, ને રંકને કરે રાય\nસ્થળને સ્થાને જળ ચલાવે, જળ સ્થાનક સ્થળ થાય\nતરણાનો તો મેરુ રે, મેરુનું તરણું કરી દાખવે... જેને.\n\nનિભાણામાંથી બળતાં બચાવ્યાં, માંજરીનાં બાળ\nટીટોડીનાં ઈંડાં ઉગાર્યાં, એવો છે રામ રખેવાળ\nઅંતવેળાએ આવે રે, પ્રભુ તમે તેની કને... જેને.\n\nબાણ તાણીને ઊભો પારધી, સિંચાણો કરે તકાવ\nપારધીને પગે સર્પ ડંસ્યો, સિંચાણા શિર મહી દાવ\nબાજ પડ્યો હેઠે રે, પંખી ઊડી ગયાં સુખે... જેને.\n\nગજ કાતરણી લઈને બેઠા, દરજી દીનદયાળ\nવધે ઘટે તેને કરે બરાબર, સૌની લે સંભાળ\nધણી તો ધીરાનો રે, હરિ તો મારો હિંડે હકે... જેને."
  },
  {
    "title": "310. હેતે હરિનો રસ પીજીએ, પ્રીતે પ્રભુનો રસ પીજીએ",
    "slug": "310-hete-harino-ras-pijie-prite-prabhuno-ras-pijie",
    "authorSlug": "dhira-bhagat",
    "category": "ધીરા ભગત",
    "sortOrder": 310,
    "lyrics": "કઠણ ચોટ છે કાળની, મરણ મોરેરો માર\nકંઈક રાણા ને કંઈક રાયજી, છોડીને ચાલ્યા સંસાર રે\nહેતે હરિનો રસ પીજીએ, પ્રીતે પ્રભુનો રસ પીજીએ... (ટેક)\n\nસંસાર ધુમાડાના ખાચકા રે, સાથે આવે ન કોઈ\nરંગ પતંગનો ઊડી જાશે, જેમ આંકડાનું તૂર\nકોના છોરું ને કોના વાછરૂ, કોના મા ને બાપ\nઅંતકાળે જાવું એકલું, સાથે પુણ્ય ને પાપ... હેતે.\n\nમાળી વીણે રૂડાં ફૂલડાં, કળીઓ કરે વિચાર\nઆજનો દિન રળિયામણો, કાલે આપણે શિર ઘાત... હેતે.\n\nઆવ્યા તે તો સર્વે જાશે રે, નથી કાયા રહેનાર\nમરનારાને તમે શું રોવો, રોનારા નથી રહેનાર... હેતે.\n\nદાસ ધીરો રમે રંગમાં રે, રમો દિવસ ને રાત\nહું ને મારું મિથ્યા કરો, રમો પ્રભુની સંગાથ... હેતે."
  },
  {
    "title": "311. ગુરુ સો એક ગુરુ રે, ગુરુ જેવું નાહી કોઈ",
    "slug": "311-guru-so-ek-guru-re-guru-jevu-nahi-koi",
    "authorSlug": "dhira-bhagat",
    "category": "ધીરા ભગત",
    "sortOrder": 311,
    "lyrics": "ગુરુ સો એક ગુરુ રે, ગુરુ જેવું નહી કોઈ\nઅભ્યંતર હોય ઊંડું રે, મેં તો નાખ્યું સહુ ખોઈ... (૩૧૧)\n\nગુરુથી જ્ઞાન ને ધ્યાન મળે, વળી મળે માન સન્માન\nબ્રહ્મનું ભાવેથી દાન કરી દે, કહો એનાથી કોણ મહાન\nરાન રાન રખડી રે, રામ રામ કરી રોઈ... ગુરુ.\n\nતોય ગુરુ જેવું કોઈ મળે નહીં, ન અપાય કોઈથી નિર્ધાર\nગુરુજી તો ગુપ્તમાં ગુપ્ત આપી દે, દાખવી દે નિજ દિદાર\nધન્ય ગુરુ, ધન્ય જ રે, ઉપમા અન્ય ન હોય... ગુરુ.\n\nભ્રમ જે મોટો ભવિષ્ય ભુલાવે, તેને ટાળે ગુરુદેવ\nભૂત વર્તમાનની વાતો બતાવે, બ્રહ્મ હણાવી તતખેવ\nથાય એવું કોઈથી રે, જુઓ વિચારી સૌ કોઈ... ગુરુ.\n\nખરા ખોટાનો નિશ્ચય કરાવે, પરખ પરખાવે પૂરણપેર\nઝવેરી ઝળહળનો કરી મેલે, વિસરાવે સહુથી વેર\nધીરે માન્યા ધીંગો રે, જદુવર સમ જોઈ... ગુરુ."
  },
  {
    "title": "312. એવી કળિયુગની છે એંધાણી રે",
    "slug": "312-evi-kaliyugni-che-endhani-re",
    "authorSlug": "dhira-bhagat",
    "category": "ધીરા ભગત",
    "sortOrder": 312,
    "lyrics": "એવી કળિયુગની છે એંધાણી રે,\nન જોઈ હોય તો જોઈ લ્યો ભાઈ આણી... (ટેક)\n\nવરસો વરસ દુકાળ પડે ને, સાધુ કરશે સુરાપાન\nબ્રાહ્મણ માટી ભરખશે ને, ગાયત્રીનું કરશે નહિ કાન\nએવા જોગી ભોગી થાશે રે, બાવા થાશે વ્યભિચારી... એવી.\n\nશેઢે શેઢો ઘસાશે, ખેતરમાં નહીં રહે ખૂંટ\nઆદી વાહન ચોરી કરી, બ્રાહ્મણ ચડશે ઊંટ\nએવા ગાયો ભેંસો જાશે રે, દુજાણામાં બકરી રહેશે... એવી.\n\nકારડિયા તો કર્મી કહેવાશે અને વળી જાડેજા ખોદશે જાળા\nમાયાને કાજે ઘોડા બાંધશે ને શ્રીમંત ચાલશે પાળા\nમહાજન ચોરી કરશે રે, એવા વાણિયા થાશે વેપારી... એવી.\n\nરાજ તો રાણીઓનાં થાશે, વળી પુરુષ થાશે ગુલામ\nગરીબની અરજ કોઈ સાંભળશે નહીં, સાહેબને કરશે સલામ\nબહેની રોતી રહેશે રે, સગાપણમાં તો સાળી રહેશે... એવી.\n\nધર્મ કોઈનો રહેશે નહીં, એક ચાલશે વરણાસંકર\nશહેરોમાં તો બાકી કંઈ નહીં રહે, ને શોભામાં રહેશે આતુર\nઓછા વણકરા વાડું લૂંટશે રે, રહેશે નહીં કોઈ પતિવ્રતા નારી... એવી.\n\nદૂધમાં માખણ નહીં તરે, વળી દરિયે નહીં ચાલે વહાણ\nચાંદા સૂરજ ઝાંખા થાશે, એ છે એંધાણની એંધાણી\nદાસ ધીરો એમ કહે છે રે, સદ્ગુરુએ કહી વિચાર કરી... એવી."
  },
  {
    "title": "313. ઈશ્વર તું પણ છે વિજ્ઞાની",
    "slug": "313-ishwar-tu-pan-che-vijnani",
    "authorSlug": "dhira-bhagat",
    "category": "ધીરા ભગત",
    "sortOrder": 313,
    "lyrics": "ઈશ્વર તું પણ છે વિજ્ઞાની,\nપથ્થર અંદર જીવ જીવે ને, બંધ શ્રીફળમાં પાણી... (૩૧૩)\n\nજવાબ દેને પીળા નભમાં, સૂર્ય ચંદ્ર ક્યાં રહેતા હશે\nજનનીનાં ઉદરમાં જીવ જીવે, એ વાયુ ક્યાંથી લેતા હશે\nતું સર્જાવે, તું સંહારે પણ રાખે નહીં તું નિશાની... ઈશ્વર.\n\nપયપાન માટે પ્રભુજી તેં લોહીનું દૂધ બનાવ્યું\nક્યા કર્મે આ જીવ અવતરે, એ તો ન સમજાયું\nકોને બંધન આત્મા કોને મુક્તિ, વાત રાખે છે છાની... ઈશ્વર."
  },
  {
    "title": "314. ખબરદાર મન સૂબાજી, ખાંડાની ધારે ખડવું છે",
    "slug": "314-khabardar-man-subaji-khandani-dhare-khadvu-che",
    "authorSlug": "dhira-bhagat",
    "category": "ધીરા ભગત",
    "sortOrder": 314,
    "lyrics": "ખબરદાર મન સૂબાજી, ખાંડાની ધારે ખડવું છે\nહિંમત હથિયાર બાંધી, સત્યની લડાઈએ લડવું છે... (૩૧૪)\n\nએક ઉમરાવ ને ચાર પટાવત, એક એક નીચે ત્રીસ ત્રીસ\nએક ધણીને એક ધણિયાણી, એમ વિગતે સાતસો ને વીસ... ખબરદાર.\n\nસો સરદારે ગઢ ઘેર્યો રે, તેને જીતી પાર પડવું છે\nપાંચ પ્યાદાં તારી પૂંઠે ફરે છે, ને વળી કામ ને ક્રોધ... ખબરદાર.\n\nપ્રેમ પલાણ કરી જ્ઞાન ઘોડે ચડી, સદ્ગુરુ શબ્દ લગામ\nશીલ સંતોષ ને ક્ષમા ખડગ ધરી, ભજન ભડાકે રામ... ખબરદાર.\n\nલોભ મોહ માયા ને મમતા, એવા જુલમી જોરાવર જોધ\nઅતિ બલિષ્ટ સવારી રે, તેની સાથે આખડવું છે... ખબરદાર.\n\nધર્મ ઢાલ ઝાલી રે, નિર્ભય નિશાને ચડવું છે\nસુરત નુરત ને ઇંગલા પીંગલા, સુષુમ્ણા સ્નાન કીજે... ખબરદાર.\n\nમન પવનથી ગગનમંડળ ચડી, ધીરા સુધારસ પીજે\nરણશિંગું વાગે રે, ભજન વડે લડવું છે... ખબરદાર."
  },
  {
    "title": "315. આતમ ધન હેરાણું રે, તેથી દીન ફરો છો દિલદાર",
    "slug": "315-aatam-dhan-heranu-re-tethi-din-faro-cho-dildar",
    "authorSlug": "dhira-bhagat",
    "category": "ધીરા ભગત",
    "sortOrder": 315,
    "lyrics": "આતમ ધન હેરાણું રે, તેથી દીન ફરો છો દિલદાર... (૩૧૫)\n\nજ્ઞાનરૂપી કરી દીવડો, તરત તપાસો તનમાં\nઆતમરૂપી ધન આપણું, ગલત થયું છે ગગનમાં... આતમ.\n\nવિવેક વિચારે હરદમ હાલો, એમાં ચોર બેઠા મોટા\nપાંચ ચોર તો ખાતર દેશે, ફેર છેવનો ખોટો... આતમ.\n\nઈ લૂંટે ને ઈ લેવાડૂ, પારખ થઈને પરખો\nભજન ભડાકે દિયો ઉડાડી, નૂરતે સૂરતે નિરખો... આતમ.\n\nજ્ઞાન ઘોડે કરો અસવારીયું, પ્રીતે પલાણું બાંધી\nલગનીની લગામ ગ્રહો હાથમાં, ધીરજ ઠાઠું બાંધી... આતમ.\n\nપ્રેમ થકી કદર લ્યો પતંગ, આતમ ધન હેરાણું\nદશ દરવાજા રોકી લેજો, નથી નીકળવું બારું... આતમ.\n\nહરિ ગુરુ સંત સદા હિતકારી, આતમ ધન અબ પાયો\nસ્વામી સદ્ગુરુ સંત પ્રતાપે, દાસ ધીરો ગુણ ગાયો... આતમ."
  },
  {
    "title": "316. દુનિયા તો દીવાની રે, બ્રહ્માંડ પાખંડ પૂજે",
    "slug": "316-duniya-to-divani-re-brahmand-pakhand-puje",
    "authorSlug": "dhira-bhagat",
    "category": "ધીરા ભગત",
    "sortOrder": 316,
    "lyrics": "દુનિયા તો દીવાની રે, બ્રહ્માંડ પાખંડ પૂજે\nકર્તા વસે પાસે રે, મૂરખને તે નવ સૂઝે... (૩૧૬)\n\nજીવ નહીં તેને શિવ કરી માને, પૂજે કાષ્ઠ પાષાણ\nચૈતન્ય પુરુષને અળગો મૂકે, એવો અંધો જગ અજ્ઞાન\nઅર્કને અજવાળે રે, પારસમણી નવ સૂઝે... દુનિયા.\n\nપથ્થરનું નાવ નીરમાં મૂકે, સો વાર પટકે શીશ\nકોટી ઉપાયે તરે નહીં, એ તો બૂડે વસા વીસ\nવેળુમાં તેલ ક્યાંથી રે, ધાતુની ધેનુ કેમ દૂઝે... દુનિયા.\n\nઅંતર મેલ ભર્યા અતિ પૂરણ, અને નિર્મળ જળમાં ન્હાય\nસર્પ ડંસીને દરમાં પેઠો પછી, રાફડો રુંધે શું થાય\nઘાયલની ગત ઘાયલ જાણે, એમી જ્ઞાની હૃદયે... દુનિયા.\n\nદૂર નથી નાથ છે ઘણા નજીક, પ્રગટ પિંડમાં પેખે\nદિલ સુધારી દિદાર તારો, આપે હૃદયમાં દેખે\nધણી તો ધીરાનો રે, જગતમાં જાહેર ઝૂઝે... દુનિયા."
  },
  {
    "title": "317. બ્રહ્માનંદ ભાસ્‍યો રે, આત્મા અનુભવ પોતે",
    "slug": "317-brahmanand-bhasyo-re-aatma-anubhav-pote",
    "authorSlug": "dhira-bhagat",
    "category": "ધીરા ભગત",
    "sortOrder": 317,
    "lyrics": "બ્રહ્માનંદ ભાસ્‍યો રે, આત્મા અનુભવ પોતે\nસોહમ સાધો સાધન રે, પ્રગટે પોતામાંથી પોતે... (૩૧૭)\n\nએકવીશ હજાર છસો અજંપા, જપે બ્રહ્મા વિષ્ણુ શિવ દેવ\nચૌદ બ્રહ્માંડ જે છે ચૈતન્યમય, તેની સિદ્ધ સાધક કરે સેવ\nસુર નર સાધે રે, જેને જ્ઞાની ગોતે પોતે... બ્રહ્માનંદ.\n\nરવિનાં તેજ વડે રવિરૂપ ભાસ્‍યું, મળીને તેજ મળી જ્યોત\nઆત્માને તેજ આત્મા ઓળખાયો, ઊગ્યો અંતર અર્ક ઉદ્યોત\nથયું અજવાળું રે, વસ્તુ મળી મનમાં તે... બ્રહ્માનંદ.\n\nપંદરમી ભૂમિકામાં રમે પૂરણ બ્રહ્મ, ખેલ અખંડ નિશદિન\nશૂન્ય શિખર પર અનહદ ગાજે, ઉન્મુનિ મન મગન\nપાળ બાંધી પોતે રે, પ્રીત બાંધી ચિત્ત પૂરે... બ્રહ્માનંદ.\n\nઆળપંપાળ મૂક્યા મથી મથી, ઊલટપૂલટ ગૂંથ્યું ચિત્ત\nજે જેમ હતું તે તેમ થયું, ભ્રમ ભાંગ્યા અનંત અદ્વૈત\nધીરા મરજીવા રે, અણછતા રમે અણુ ઓથે... બ્રહ્માનંદ."
  },
  {
    "title": "318. એવા ઢોરંગા ભેળા ન બેસીએ, પત એમાં પોતાની જાય",
    "slug": "318-eva-dhoranga-bhela-na-besie-pat-ema-potani-jay",
    "authorSlug": "jivan-bhagat",
    "category": "જીવણ ભગત",
    "sortOrder": 318,
    "lyrics": "એવા ઢોરંગા ભેળા ન બેસીએ, પત એમાં પોતાની જાય... (૩૧૮)\n\nએવા ઘડીકમાં રંગ બદલે ને, ઘડીકમાં ઊતરે રે\nઘડીકમાં વૈરાગી બની જાય... એવા.\n\nએવા ઘડીકમાં ભૂત ને ઘડીકમાં ભેલકા રે\nઘડીકમાં પાર થઈને પૂજાય... એવા.\n\nએવા કામી ને ક્રોધી ને લોભી લાલચુ રે\nએ તો પારકા દુઃખે ન દુભાય... એવા.\n\nએવા ગુરુના પ્રતાપે દાસી જીવણ બોલિયા રે\nએ તો નકટાં નરકે લઈ જાય રે... એવા."
  },
  {
    "title": "319. રામ ભજ તું રામ ભજી લે, પ્રભુને ભજી લે પ્રાણીયા",
    "slug": "319-ram-bhaj-tu-ram-bhaji-le-prabhune-bhaji-le-praniya",
    "authorSlug": "jivan-bhagat",
    "category": "જીવણ ભગત",
    "sortOrder": 319,
    "lyrics": "રામ ભજ તું રામ ભજી લે, પ્રભુને ભજી લે પ્રાણીયા\nપ્રભુ ભજ્યા ઈ તો પાર પહોંચ્યા, ચૌદ લોક ભણિયા... (૩૧૯)\n\nસૌની માયા ભેળી કીધી, હારી બેઠા ભોંય આમ\nમરણ વેળાએ એને કામ ન આવી, અળગાને અળગાયા... રામ.\n\nમોહમાયા એ બહુ બંધ લીધા, એમાં પ્રભુને ન ભજિયા\nભૂંડી વેળાનાં ભૂત સર્જાયા, એમ કહેતા જાય છે પ્રાણીયા... રામ.\n\nહે માયા મનચોરી કીધી છે, એમાં કોક વિરલા રહી ભજિયા\nઆધિ વ્યાધિ એને ખૂબ ખર્ચી, દિલમાં દાગ ન વ્યાપિયા... રામ.\n\nબળવંત કાયા દીધી, સગાળશા શેઠ વણઝારિયા\nમોરધ્વજ રાજા ને જનક વિદેહી, હરિશ્ચંદ્ર હરિ વેચાયા... રામ.\n\nમારા ગુરુએ ગોવાળી કીધી, ગૂઢ ધર્મમાં લાવિયા\nદાસી જીવણ સંતો ભીમને શરણે, સંત અમરાપુર પહોંચિયા... રામ."
  },
  {
    "title": "320. અજવાળું રે અજવાળું, ગુરુજી તમે આવ્યાને મારે અજવાળું",
    "slug": "320-ajvalu-re-ajvalu-guruji-tame-aavyane-mare-ajvalu",
    "authorSlug": "jivan-bhagat",
    "category": "જીવણ ભગત",
    "sortOrder": 320,
    "lyrics": "અજવાળું રે અજવાળું, ગુરુજી તમે આવ્યાને મારે અજવાળું... (૩૨૦)\n\nપ્રેમનો પ્યાલો મારા ગુરુજીએ પાયો, ભીમ ભીમને લાગ્યું રામબાણ... ગુરુજી.\n\nસતનો શબ્દ મારા ગુરુજીએ સુણાવ્યો, સતભક્તિનો પંથ એવો પાળું... ગુરુજી.\n\nશૂન્યને ભાલ રવિ રમતા રામા, તેજ તત્વમાં ગુરુજી તમને ભાળું... ગુરુજી.\n\nદાસી જીવણ સંતો ભીમના શરણે, અવર ધણી હવે નાહીં ધાઉં... ગુરુજી."
  },
  {
    "title": "321. નહિ મરે રે નહિ મરે, સાચા સદ્ગુરુ સેવ્યા ઈ નર નહિ મરે",
    "slug": "321-nahi-mare-re-nahi-mare-sacha-sadguru-sevya-i-nar-nahi-mare",
    "authorSlug": "jivan-bhagat",
    "category": "જીવણ ભગત",
    "sortOrder": 321,
    "lyrics": "નહિ મરે રે નહિ મરે, સાચા સદ્ગુરુ સેવ્યા ઈ નર નહિ મરે... (૩૨૧)\n\nઆવાગમનનું તેને નથી નડતું, સર્પ ડંસની ઉતારી બીક લાવે... ગુરુ.\n\nપ્રેમનાં પ્યાલા મારા સદ્ગુરુએ પાયા, અમૃત છોડી વિષ કોણ ખાવે... ગુરુ.\n\nતન મન ધન ગુરુજીને સોંપીને, દ્વંદ્વ છોડી રહેવું નિર્ભય દાવે... ગુરુ.\n\nભીમ ભગવાને મારા ભવદુઃખ ભાંગ્યા, બેઉ કરજોડી દાસી જીવણ ગાવે... ગુરુ."
  },
  {
    "title": "322. જીવણ જીવને ક્યાં રાખીએ, વાગે અનહદ નૂર",
    "slug": "322-jivan-jivne-kyam-rakhie-vage-anhad-nur",
    "authorSlug": "jivan-bhagat",
    "category": "જીવણ ભગત",
    "sortOrder": 322,
    "lyrics": "જીવણ જીવને ક્યાં રાખીએ, વાગે અનહદ નૂર\nઝિલમિલ જ્યોતો જ્યાં ઝળહળે, વરસે નિર્મળ નૂર... (૩૨૨)\n\nપાંચ તત્વ ને ત્રણ ગુણ, પચ્ચીસ અંગ વિચારી\nમંથન કરો એના મૂળને, તત્વને અંગે તમે તારી... જીવણ.\n\nગંગા જમુના સરસ્વતી, આ છે ત્રિવેણીને ધારે\nસુષુમ્ણા સૂરતા રાખીએ, વળગી રહીએ આ વાટે... જીવણ.\n\nઅણિ અગ્ર પર એક છે, હરિ રમતા રામા\nનિશદિન નિરખો નયણાં, સત પુરુષ ઊભા છે સામા... જીવણ.\n\nઅધ્ધર ઝળહળ થઈ રહ્યા, કર બિન વાગે વાણાં\nસૂરતા ધરીને સાંભળો, ધૂન ગગનમાં ગાજે... જીવણ.\n\nનૂરત સૂરતની સાધના, કોઈ પ્રેમી નર પામે\nઅંધારું ટળે એની આંખનું, સૂર નજરમાં આવે... જીવણ.\n\nસંદેશો બતાવીને ભીમ સાહેબે મોકલ્યો રે\nપત્ર પાઠવ્યો ગુરુએ પ્રેમનો, જીવણ લખાણેથી લેજો... જીવણ."
  },
  {
    "title": "323. મતિ શું મુંઝાણી તારી, એવો વણજે આવ્યો વેપારી",
    "slug": "323-mati-shu-munjani-tari-evo-vanje-aavyo-vepari",
    "authorSlug": "jivan-bhagat",
    "category": "જીવણ ભગત",
    "sortOrder": 323,
    "lyrics": "મતિ શું મુંઝાણી તારી, એવો વણજે આવ્યો વેપારી\nબાંધું રે ઝાલીને ભાઈ સાધુ ન કરજે, વસ્તુ લેજે ને વિચારી... (૩૨૩)\n\nમનુષ્ય અવતાર માંડ મળ્યો છે, બાંધા મંડપની શું ભારી\nસદ્ગુરુનો સંગ સત્સંગ કરજો, આપે શીખામણ સારી... એવો.\n\nહરિજન હારે સાચા હિરલા રે વરજે, આપે બુદ્ધિ તેથી સારી\nદાસી જીવણ ભીમ કેરા ચરણે, વહાલા એક અલખ આશા તારી... એવો."
  },
  {
    "title": "324. મને માર્યા મોહનબાણે રે, મને માર્યા પ્રીતમબાણે",
    "slug": "324-mane-marya-mohanbane-re-mane-marya-pritambane",
    "authorSlug": "jivan-bhagat",
    "category": "જીવણ ભગત",
    "sortOrder": 324,
    "lyrics": "મને માર્યા મોહનબાણે રે, મને માર્યા પ્રીતમબાણે\nશામળા તારી શોભાનું, વાલમ તારી વાતોનું... (૩૨૪)\n\nપાંચ તત્વ ને ત્રણ ગુણ એનું મારે વહાલે બનાવ્યું વાંસ\nમરજીવા થઈ મહાસુખ લૂંટે, હરિ એ ભંડારી મળ્યા હૂંડી લહાણ... શામળા.\n\nરાત થાકી ને મને સુઝ નહિ, આ તો આવી મળ્યા બહેરાણ\nવાંસળી ભરીને વહાલે મારી રે, મારે હૃદયે ઊગ્યા રવિ ભાણ... શામળા.\n\nજીવણ કહે કાયામાં ગુરુ ગોતીએ, શું કરું મારા વહાલાનો લહાણ\nદશમે મોલે એની મેડી બિરાજે, રાખજો ખોળી રે ધર્મનો પ્રમાણ... શામળા.\n\nગુરુ મળ્યા ને ગુરુગમ જડી, મટી મનની તાણાવાણ\nદાસી જીવણ સંત ભીમને ચરણે, આ છે પ્યાલો પાયાનો પ્રમાણ... શામળા."
  },
  {
    "title": "325. હરિજન વિરલા જાણે, વચન કોઈ સંત જ વિરલા જાણે",
    "slug": "325-harijan-virla-jane-vacan-koi-sant-ja-virla-jane",
    "authorSlug": "jivan-bhagat",
    "category": "જીવણ ભગત",
    "sortOrder": 325,
    "lyrics": "હરિજન વિરલા જાણે, વચન કોઈ સંત જ વિરલા જાણે... (૩૨૫)\n\nમૂરખ નર ને હીરો સાંપડ્યો, ઓળખ્યો નહિ અંધાણે\nપરખ વિનાનો પડ્યો પથ્થરમાં, પથ્થરને પરમાણે... વચન.\n\nક્ષુધિયા નરે ક્ષુધા ન ભાંગી, ભોજન ભર્યા છે ભાણે\nસૂરજ ઊગ્યા છતાં રહ્યું અંધારું, વળી ન સુઝ્યું વાણે... વચન.\n\nકહ્યા શબ્દ કાને ન ધર્યા, ઠર્યો નહિ ઠેકાણે\nભૂલવણીમાં અરે ભટકતો, કર્યા કરમ પ્રમાણે... વચન.\n\nપરનારી શું પ્રીત કરીને, વિષયરસને માણે\nફરી ફરીને ગર્ભ અવતરે, પડે ચોરાશી જાણે... વચન.\n\nબિંધી બાણ સદ્ગુરુ બનાવે, નૂરતે-સૂરતે માણે\nદાસી જીવણ સંતો ભીમને ચરણે, એની ખબર પડે ખરા ટાણે... વચન."
  },
  {
    "title": "326. નામ ભજન બિન નહિ નિસ્તારા, ભજ મન ભજ તું સીતારામા",
    "slug": "326-nam-bhaj-bin-nahi-nistara-bhaj-man-bhaj-tu-sitarama",
    "authorSlug": "jivan-bhagat",
    "category": "જીવણ ભગત",
    "sortOrder": 326,
    "lyrics": "નામ ભજન બિન નહિ નિસ્તારા, ભજ મન ભજ તું સીતારામા\nઅદ્ભુત નગરીને ચોર નહિ છૂટે, જાળ મારેણા જમદૂતા... (૩૨૬)\n\nજપ તપ કર કોટી યજ્ઞ કર, કાશી એ જઈ કરવત લેવરાવે\nતોય આ જીવને મુક્તિ મળે નહિ, નકામાં સરજે જંજાળા... નામ.\n\nજોગી હોકર જટા વધારે, અંગ લગાવે ભભૂતા\nદમડી કારણ દેહ જલાવે, એની નાંઈ પણ સાધૂતા... નામ.\n\nજાકી સૂરતા લાગી સાહેબ સે, કામ ક્રોધ ગરહન હતા\nઅધ્ધર તખત પર આસન રાખતા, સોઈ જોગી હે અવધૂતા... નામ.\n\nસૂતા સો નર ગયા ચોરાશી, જાગ્યા તે તો જગ જીત્યા\nદાસી જીવણ સંત ભીમને શરણે, અનુભવી કોઈ પાર પહોંચ્યા... નામ."
  },
  {
    "title": "327. એવા હેત રાખજો તમે રામથી, જેવા રાખે બગડા ને મોર",
    "slug": "327-eva-het-rakhjo-tame-ramthi-jeva-rakhe-bagda-ne-mor",
    "authorSlug": "jivan-bhagat",
    "category": "જીવણ ભગત",
    "sortOrder": 327,
    "lyrics": "એવા હેત રાખજો તમે રામથી, જેવા રાખે બગડા ને મોર\nરાખે જમ બંધ ને બકોર... (૩૨૭)\n\nહેત રે વાઝાળી એ કુંજડીયું કેરાં, બચેલાં મળીને મહેરામણથી જાય રે\nસાત આઠ માસે આવીને ઓળખે, એનું નામ હેત રે કહેવાય... એવા.\n\nહેત રે વાઝાળી એ સિંહણ કેરાં, બચેલાંને સોંપી દે શરીર\nઆપ રે મરે ને પરને ઉગારે, એવા બેની મેરુ સરખી ધીર... એવા.\n\nરંગ બે રંગી ભમરલો રે લાય, ઊડીને આકાશે રે જાય રે\nદાસી જીવણ સંત વિનવે આ વાતો, અનુભવીને ઓળખાય... એવા.\n\nહેત રે વાઝાળી એ પનિહારી કેરાં, જળ ભરવાને જાય\nહૈયે રે તાણી એની સૂરતા ઘડુલાની મોંય... એવા."
  },
  {
    "title": "328. મળજો રે મને મળજો રે મને, મારી દેહુંના દલાલી હંસા",
    "slug": "328-maljo-re-mane-maljo-re-mane-mari-dehuna-dalali-hansa",
    "authorSlug": "jivan-bhagat",
    "category": "જીવણ ભગત",
    "sortOrder": 328,
    "lyrics": "મળજો રે મને મળજો રે મને, મારી દેહુંના દલાલી હંસા મળતો મને... (૩૨૮)\n\nહંસલો બનીને તને મળવા રે વાલમ, મોતીડાનો ચારો ચરતો રે મને... મારી.\n\nનવ નવ મહિના કેણે ઉદરમાં રાખ્યા, માતા પિતાની સેવા કરતો રે મને... મારી.\n\nધાઈ ધૂલીને ધન બાપુએ દીધું, જમણે હાથે પુણ્ય કરતો રે મને... મારી.\n\nદાસી રે જીવણ સંતો ભીમને ચરણે, રામરસનો રસ પીવો રે બની... મારી."
  },
  {
    "title": "329. રામ ભજવાની રીતુ રે, પ્રભુ ભજવાની પ્રીતુ રે",
    "slug": "329-ram-bhajvani-ritu-re-prabhu-bhajvani-pritu-re",
    "authorSlug": "jivan-bhagat",
    "category": "જીવણ ભગત",
    "sortOrder": 329,
    "lyrics": "રામ ભજવાની રીતુ રે, પ્રભુ ભજવાની પ્રીતુ રે, ઓધા મંદિરે આવજે\nજોઈ જોઈને ઓરીએ જાતું, બીબા વિના પડે નહીં ભાતું... ઓધા. (૩૨૯)\n\nભાર ઝીલે ભાંતુ રે... ઓધા.\n\nઆવો તો વાલમ કરીએ વાતું, તમ વિના નથી રહેવાતું\nઆવી મળ્યું છે એકાંતુ... ઓધા.\n\nદાસી માથે શેનો છે દાવો, મંદિર મારે કેમ ન આવે વ્હાલો\nઆવડો શેનો અબાળો રે... ઓધા.\n\nદાસી જીવણાની ભાંગી ભ્રાંતિ, ભીમ સાહેબે દીધી શાંતિ\nત્યારે વરસતી 'તી સ્વાંતિ... ઓધા."
  },
  {
    "title": "330. મૂરખા મતિ હરિ તારી રે (૨૧૭)",
    "slug": "330-murkha-mati-hari-tari-re",
    "authorSlug": "bhoja-bhagat",
    "category": "ભોજા ભગત",
    "sortOrder": 330,
    "lyrics": "મૂરખા મતિ હરિ તારી રે, મેલ્યા વિઠ્ઠલ વિસારી ... (ટેક)\n\nજન્મ થયા પહેલાં જઠરામાં, તું કહેતો પોકારી રે\nબહાર આવ્યા પછી બુદ્ધિ હણાણી, હીરો ગયો હારી ... મૂરખા\n\nદોલત દેખી જીવ થયો દિવાનો, બોલે અવળું અહંકારી\nપુણ્ય કર્યા વિના પછી થઈશ, ભવોભવ ભિખારી ... મૂરખા\n\nભાતભાતનો ભોજન ત્યજી ને, થયો અભક્ષ નો આહારી રે\nચોરી-ચિનાળી ને સુરાપાને, મસ્ત થયો પરનારી ... મૂરખા\n\nસાચો થઈ ને સદ્ગુરુ શરણે, લેશે તને ઉગારી\nભોજે ભગત કહે ગુરૂ પ્રતાપે, માન શિખામણ મારી ... મૂરખા"
  },
  {
    "title": "331. જગતમાં શું રહ્યા મહાલી (૨૧૮)",
    "slug": "331-jagatma-shu-rahya-mahali",
    "authorSlug": "bhoja-bhagat",
    "category": "ભોજા ભગત",
    "sortOrder": 331,
    "lyrics": "જગતમાં શું રહ્યા મહાલી, ભરાણી પાપ તણી પાલી રે ... (ટેક)\n\nભામા મળી ભલો ભગવાન મળીયા, બોલે અંતરમાં વહાલી રે\nકામ તો તારે કંઈ નહીં આવે, રાખ જાશે બાળી રે ... જગતમાં\n\nઅલખ ધણી ની ઓળખાણ પડી, એની ઝોળી નહીં જાય ખાલી\nભ્રમ થકી ભવ ભૂલી ગયા, એને જમ જાશે ગાળી ... જગતમાં\n\nપેટ ચોળીને શૂળ ઉપજાવ્યું, ને જળતે ધાર ઘાલી રે\nભોજા ભગત કહે ભજન કર્યા વિના, ઠકુરાઈ છે ઠાલી રે ... જગતમાં"
  },
  {
    "title": "332. મૂરખ ને કઈ રીતે સમજાવું (૨૧૯)",
    "slug": "332-murakh-ne-kai-rite-samjavu",
    "authorSlug": "bhoja-bhagat",
    "category": "ભોજા ભગત",
    "sortOrder": 332,
    "lyrics": "મૂરખ ને કઈ રીતે સમજાવું, નિશ્ચય નરકમાં જાવું ... (ટેક)\n\nસવળું કહેતા અવળું લાગે, કહીને મહાઈ થાવું\nવાદ કરીને વઢવાડ કરે, અમૃત ત્યજી ને વિષ ખાવું ... મૂરખ\n\nખાટકી વાસે છેટો ચાલી જાય, મહાજન ભણે મુકાવું\nઇન્દ્રિય સ્વાદે અવળો ચાલે, તેને ઊંધે માથે ટીંગાવું ... મૂરખ\n\nસનિપાત નો બાળો થયો, તેને ગાળ્યું ઔષધ શું પાવું\nભોજા ભગત કહે પ્રગટ પારખું, પીતળ માં શું તાવું ... મૂરખ"
  },
  {
    "title": "333. લોભ રહ્યો હૃદયમાં વસી (૨૨૦)",
    "slug": "333-lobh-rahyo-hrudayma-vasi",
    "authorSlug": "bhoja-bhagat",
    "category": "ભોજા ભગત",
    "sortOrder": 333,
    "lyrics": "લોભ રહ્યો હૃદયમાં વસી, મૂરખ ને શિખામણ કૈસી ... (ટેક)\n\nસંતની નિંદા સારી લાગે, જીવ તેમાં રહે વસી\nપરમાર્થ થી પાછો ભાગી જાય, ત્યાંથી ઉઠે ખસી ... લોભ\n\nધર્મ નું કામ જોઈ કહેવા આવે, તેની સામો ઉઠે ભસી\nરામ નામ વિના બીજું લાવે, મુખ કાપડી જોઈ એ હસી ... લોભ\n\nવખાણ પોતાના વહાલા લાગે, જીવ તે શું બોલે હસી\nકાંકડ નું રૂડું કાને સાંભળતા, જાણે વાગે બરછી ... લોભ\n\nમોતથી બચવા મથ્યો ઘણું, તોય કાળે લીધો ઘસી\nભોજા ભગત કહે ભૂત થઈને, જીવ ભમ્યો મૂવા પછી ... લોભ"
  },
  {
    "title": "334. ખૂટલ ને મન ખરખરો થાશે (૨૨૧)",
    "slug": "334-khutal-ne-man-kharkharo-thashe",
    "authorSlug": "bhoja-bhagat",
    "category": "ભોજા ભગત",
    "sortOrder": 334,
    "lyrics": "ખૂટલ ને મન ખરખરો થાશે, જીતી બાજી હાથે થી જાશે ... (ટેક)\n\nકોઈ કહ્યું નથી માનતા, પણ છેલ્લે દુઃખ બહુ સહશે\nભલ ભલાડુ કરી હંસે, આ રંગ જાતો રહેશે રે ... ખૂટલ\n\nહક નથી ચાલતો હરિ ભજ્યા વિના, કાળ ગળી જાશે\nછએ દશાનાં બેહ ઉપર પછી, વાવલીયા વાશે ... ખૂટલ\n\nવિચાર કરી જો ભજ્યા વિના, ફળ ક્યાંથી થાશે\nભોજા ભગત કહે ભજન કર્યા વિના, નીર ખારે ન્હાશે ... ખૂટલ"
  },
  {
    "title": "335. જીવ તું વેળા વર્તી લે (૨૨૨)",
    "slug": "335-jiv-tu-vela-varti-le",
    "authorSlug": "bhoja-bhagat",
    "category": "ભોજા ભગત",
    "sortOrder": 335,
    "lyrics": "જીવ તું વેળા વર્તી લે, માથે મરણ તણો ભય ... (ટેક)\n\nમોટા મોટા નૃપ ચાલ્યા ગયા, તારું જોર શું છે\nરિદ્ધિ - સિદ્ધિ પડી રહી તેની, મનમાં વિચારી લે ... જીવ\n\nપરસ્ત્રી ની ગમન કરવામાં, સ્વાદ લાગ્યો તને\nઆગળ તારું શું રે થાશે, એવો મનમાં નથી ભય તને ... જીવ\n\nપરનિંદા કરવામાં પૂરી, હરિરસ લાગે ખારો\nભોજા ભગત કહે રામ ભજ્યા વિના, જડશે માંયડા માં મારી ... જીવ"
  },
  {
    "title": "336. એ ત્રણે નો સંગ ન કરશો ભાઈ (૨૨૩)",
    "slug": "336-e-trane-no-sang-na-karsho-bhai",
    "authorSlug": "bhoja-bhagat",
    "category": "ભોજા ભગત",
    "sortOrder": 336,
    "lyrics": "એ ત્રણે નો સંગ ન કરશો ભાઈ, વાણીયો, સોની ને ત્રીજો સાઈ ... (ટેક)\n\nવાણીયો કહે અમે ધર્મી કહેવાઈએ, ઓછું તોલીએ નહીં\nઆખી ઉંમર જ્યારે ઓછું તોલ્યું, ત્યારે દાંડી બગડી થઈ ... એ\n\nસોની કહે અમે ધર્મી કહેવાઈએ, પિતળ ગાળીએ નહીં\nઆખી ઉંમર જ્યારે પિતળ ગાળ્યું, ત્યારે પૂરી ફજેતી થઈ ... એ\n\nદરજી કહે અમે ધર્મી કહેવાઈએ, કપડું કાતરીએ નહીં\nઆખી ઉંમર જ્યારે કપડું કાતર્યું, ત્યારે રાંડ ને કાતણ થઈ ... એ\n\nલોભી વાણીયો ને મન છે સોની, ક્રોધ ને જાણો સાઈ\nભોજા ભગત કહે ગુરૂ પ્રતાપે, સત ની મુક્તિ થઈ ... એ"
  },
  {
    "title": "337. મન પડ્યું મોહ્ય ને બાજે (૨૨૪)",
    "slug": "337-man-padyu-mohya-ne-baje",
    "authorSlug": "bhoja-bhagat",
    "category": "ભોજા ભગત",
    "sortOrder": 337,
    "lyrics": "મન પડ્યું મોહ્ય ને બાજે, પ્રભુ એની વેળા કેમ વાજે ... (ટેક)\n\nમહાજન કહે અમે ધર્મી કહેવાઈએ, દૂધ પાઈ અંડા પાળે\nમોટું થાય ત્યારે મોઢું મૂકે, પછી ઊંદર નો દાટ વાજે ... મન\n\nચાર પાંચ ભેંસો આંગણે કૂદે, છોકરાંનાં પેટડા બાળે\nપાડોશી પાડોશણ છાશ લેવા આવે, ત્યારે વહાલા સગાનો સોંગ પાળે ... મન\n\nખોટી દાનત તેથી ખાવા મળે નહીં, દિકરીનું ઘરેણું ગાળે\nસાસરે જઈને સાસુ પૂછે, ત્યારે માવતર નું મોં બાળે ... મન\n\nસોનું શોધી ને રૂપું શોધી, કથીર ને શું ગાળે\nભોજા ભગત કહે કાંસા કૂટે ને, પિતળ શું ઊકળે ... મન"
  },
  {
    "title": "338. મન પડ્યું મોહ્ય ને પેટે (૨૨૫)",
    "slug": "338-man-padyu-mohya-ne-pete",
    "authorSlug": "bhoja-bhagat",
    "category": "ભોજા ભગત",
    "sortOrder": 338,
    "lyrics": "મન પડ્યું મોહ્ય ને પેટે, તે તો હરી રહ્યાં સાહેબ છેટે ... (ટેક)\n\nઅંતર ની કાલ્પ, અજ્ઞાની, જીવને કેમ કરી ભેટે\nદેખાવા માત્ર દિસે રૂપાણો, જેમ રંગ કાળ્યો રે રે ... મન\n\nમાયાનાં મદમાં ફરે મસ્તાનો, જેમ ડીલ ઘાલ્યું ઘેરે રે\nહક ના હાલ્યા ને ખાધું હરામનું, બોળ્યું બાપનું કુળ બેટે રે ... મન\n\nજોબનમાં તને યુવતી વહાલી, ને ફરીયો રાતડીયે રોય રે\nભોજા ભગત કહે ભાવ વિનાનાં, તને ભૂધર કેમ ભેટ રે ... મન"
  },
  {
    "title": "339. મન નું કહ્યું શિખામણ માન (૨૨૬)",
    "slug": "339-man-nu-kahyu-shikhaman-man",
    "authorSlug": "bhoja-bhagat",
    "category": "ભોજા ભગત",
    "sortOrder": 339,
    "lyrics": "મન નું કહ્યું શિખામણ માન, એક દિન જાવું છે સ્મશાન ... (ટેક)\n\nલખ ચોરાશી અવતાર ધરી, ને ખરી ભોગવી ખાણ\nએ તારો અવગુણ ઘણો છે, હરિ ભજ્યા વિન હાણ ... મન\n\nભજન કરશ તો ભય મટે, સંત શબ્દ ધરજે કાન\nઅમર દેવ ને આરાધી લેજે, સમજ સદ્ગુરૂ ની શાન ... મન\n\nબુદ્ધિ વિચારીને ચાલજે, ભાઈ રહેવું પડશે રાન\nમુવા પછી નથી માણવું, પાછળ સગા કરે સ્નાન ... મન\n\nરાજા પરીક્ષિત પામ્યા, ભૂલ્યો નહીં ભગવાન\nસાત દિવસ સાંભળ્યું બેસી, ગોવિંદ કરે જ્ઞાન ... મન\n\nપ્રેમપદ ને પામવા, તું મેલી દે મનની તાણ\nભોજા ભગત કહે ગુરૂ પ્રતાપે, ભક્તિ છે નિર્વાણ ... મન"
  },
  {
    "title": "340. પ્રાણીયા ભજી લેને કિરતાર (૨૨૭)",
    "slug": "340-praniya-bhaji-lene-kirtar",
    "authorSlug": "bhoja-bhagat",
    "category": "ભોજા ભગત",
    "sortOrder": 340,
    "lyrics": "પ્રાણીયા ભજી લેને કિરતાર, આ તો સપનું છે સંસાર ... (ટેક)\n\nધન દોલત ને માલ ખજાના, વળી પુત્ર ને પરવાર\nએમાંથી જશે તું એકલો, પછી ખાશે જમના માર ... પ્રાણીયા\n\nઊંચી મેડી ને અજબ ઝરૂખા, ગંભીર તણો નહીં પાર\nકોટિ ધ્વજ ને લખપતિ તેનાં, બાંધ્યા રહ્યા ઘરબાર ... પ્રાણીયા\n\nકૂપર ફરેરા ફરહરે ને હેઠે શ્રીફળ થાળ\nઠેક કરીને ઠાઠડી માં ઘાલ્યા, પછી પાછળ પડે પોકાર ... પ્રાણીયા\n\nસેજ તળાયુ વિના સુતો નહીં, જીવ હુન્નર કરતો હજાર\nખોરી ખોરી ને ખૂબ જલાયો, જેમ લોઢું ગાળે લુહાર ... પ્રાણીયા\n\nસ્મશાન જઈને બેહ ખડકી, ને માથે છે કાષ્ઠ નો ભાર\nઅગ્નિ મેલીને ઉભા રહ્યા, અને નિશ્ચય કરે છે અંગાર ... પ્રાણીયા\n\nસ્નાન કરી ને ચાલી નીકળ્યા, નર ને વળી નાર\nભોજા ભગત કહે દશ દિવસ રોઈ ને, પછી મેલ્યો વિસારી ... પ્રાણીયા"
  },
  {
    "title": "341. ભક્તિ શૂરવીર ની સાચી (૨૨૮)",
    "slug": "341-bhakti-shurvir-ni-sachi",
    "authorSlug": "bhoja-bhagat",
    "category": "ભોજા ભગત",
    "sortOrder": 341,
    "lyrics": "ભક્તિ શૂરવીર ની સાચી, લીધા પછી નહીં મેલે પાછી ... (ટેક)\n\nમન તણો જેને મોરચો કીધો, વહિયા વિષયથી રે\nકામ ક્રોધ મદ લોભ તાળી, જેણે ગળે દીધી ફાંસી ... ભક્તિ\n\nશબ્દ નાં ગોળા જ્યારે છૂટવા લાગ્યા, મામલો ૧૪ માસી\nકાયર હતા તે કાંપવા લાગ્યા, એ તો નિશ્ચય ગયા નાસી ... ભક્તિ\n\nસાચા હતા તે શૂરા પૂરા, હરિ સંગે રહ્યા રાચી\nપાંચ પચ્ચીસ થી પર થયા, એક બ્રહ્મ રહ્યા ભાસી ... ભક્તિ\n\nધર્મ નાં ફાસલા કાપી નાંખ્યા, ઓળખ્યા અવિનાશી\nઅષ્ટ સિદ્ધિ ને ઈચ્છે નહીં, મુક્તિ છે એની દાસી ... ભક્તિ\n\nતનુ મન ધન વેળે તુચ્છ કરી મળ્યા, અહોનિશ ઉદાસી\nભોજા ભગત કહે ભાઈડા ઈ તો વૈકુંઠ નાં વાસી ... ભક્તિ"
  },
  {
    "title": "342. મૂરખ ની દાઢી થઈ ધોળી રે (૨૨૯)",
    "slug": "342-murakh-ni-dadhi-thai-dholi-re",
    "authorSlug": "bhoja-bhagat",
    "category": "ભોજા ભગત",
    "sortOrder": 342,
    "lyrics": "મૂરખ ની દાઢી થઈ ધોળી રે, હૃદયમાં ન જોયું ખોળી ... (ટેક)\n\nઅડ વાળી ને ભેગું કર્યું, પણ હાથ ન રહી દોડી\nવેચવા ટાણે વેચ્યું નહીં, પછી પોઠ પડી મોળી ... મૂરખ\n\nબગલો થઈને આરે બેઠો, ઓંથ કરીને પહોળી\nપાર થા કોઈ આરે મળ્યો નહીં, દરિયો દીધો ડોળી ... મૂરખ\n\nઅજાણ્યા દેશ જેવો માલ પાક્યો, તેમાં પડ્યા ડોળી\nવાવ્યા વિના ક્યાંથી લણાશે, ક્યાંથી ખાશે ખોળી ... મૂરખ\n\nવાર્તા વાર્તા વારે ચડતો, માલ લાવતો બોરી\nભોજા ભગત કહે ત્રણ બાર લાગશે, તીર તલવાર ને ગોળી ... મૂરખ"
  },
  {
    "title": "343. હરિજન હોય તેણે હેત ઘણું રાખવું (૨૩૦)",
    "slug": "343-harijan-hoy-tene-het-ghanu-rakhvu",
    "authorSlug": "bhoja-bhagat",
    "category": "ભોજા ભગત",
    "sortOrder": 343,
    "lyrics": "હરિજન હોય તેણે હેત ઘણું રાખવું, નિજ નામ ગ્રહી નિર્માણ રહેવું\nત્રિવિધિ નાં તાપ ને ક્ષય કરવા કરી, પરહરી પાપ રામનામ લેવું ... (ટેક)\n\nસાચે સરસ કહેવું પ્રીતે સરસ થવું, આપ આધીન થઈ દાન દેવું\nમન કર્મ વચન થી નિજધર્મ આધરી, દાના ભોક્તા હરિ એમ કહેવું ... હરિજન\n\nઅડગ નવ ડોલવું અધિક નવ બોલવું, ખીલવી ગુંજ તે પાત્ર ખોળી\nદીન વચન દાખવું ગંભીર મતુ રાખવું, વિવેકી એ વાત ન કરવી પહોળી ... હરિજન\n\nઅક્ષત નામ ઉચ્ચારવું તરવું ને તારવું, રાખવી ભક્તિ તે રાંડ દાવે\nભક્ત ભોજા કહે ગુરૂ પ્રતાપ થી, ત્રિવિધિ નાં સંતાપ ત્યાં નિકટ ન આવે ... હરિજન"
  },
  {
    "title": "344. મચાવે મચાવે મચાવે (૨૩૧)",
    "slug": "344-machave-machave-machave",
    "authorSlug": "bhoja-bhagat",
    "category": "ભોજા ભગત",
    "sortOrder": 344,
    "lyrics": "મચાવે મચાવે મચાવે, ભલા ખેલ કોઈ હરદામાં હોળી મચાવે ... (ટેક)\n\nનાભિ કમલ થી સુરતા ચલાવી, જઈ કોઈ શબ્દ માં મિલાવે\nપતંગેલ મન પાછું વાળે તો, ભલા રામ રંગ રંગ આવે ... મચાવે\n\nનૈને દેખ્યા તાકા વેન નહીં, સખી હોક તો કરી સમજાવે\nશૂન શિખર ચડ્યાની શાન બતાવે, નિગમ નેતિ કર ગાવે, સોહમપદ સહેજે પાવે\n\nતખતે બેસી સખી કરે તમાસા, ત્રિવેણી કોઈ તાર મિલાવે\nબ્રહ્મ ગુફામાં જઈ પવન ઠરાવે, ભલા વહાં પહોંચે તો કાળ ન જાવે ... મચાવે\n\nરમનારા ને આ રમત ભાવે, મીઠી મહેર કરી રોય ગાવે\nભોજલ નાં સ્વામિ છે બહુનામી, આ વાત કોઈ સંતને ભાવે ... મચાવે"
  },
  {
    "title": "345. શબ્દ ની પાર મારા સદ્ગુરૂજી નું રૂપ છે (૨૩૨)",
    "slug": "345-shabda-ni-par-mara-sadguruji-nu-rup-che",
    "authorSlug": "bhoja-bhagat",
    "category": "ભોજા ભગત",
    "sortOrder": 345,
    "lyrics": "શબ્દ ની પાર મારા સદ્ગુરૂજી નું રૂપ છે, ચર્મચક્ષુ હોય તેને કેમ સૂઝે\nજીવપણું તે પદ કોઈને કળે નહીં, અનુભવ હોય તે આપ બૂઝે ... (ટેક)\n\nરતિ વિના સ્વરૂપ તો લક્ષ આવે નહીં, શીખે સુણે ભણે ને શબ્દ ગાવે\nઅનુભવ ખુલ્યા વિના આપ સૂઝે નહીં, ચૈતન્ય પદ કદી સપનેય ન આવે ... શબ્દ\n\nજ્યાં લગી કલ્પના ત્યાં લગી જીવ છે, સંશય છૂટે તો શિવ કહાવે\nધ્યેય ને ધ્યાતા વિના ધ્યાન જે પ્રગટે, તો સોહમ સ્વરૂપમાં જઈ સમાવે ... શબ્દ\n\nશબ્દ ની પાર આવાગમન અડે નહીં, જેમ કાંચળી તજી ને ભુજંગ જાવે\nભક્ત ભોજલ કહે ગુરૂગમ પ્રગટે, તો જન્મ મરણ ની ભય ન વ્યાપે ... શબ્દ"
  },
  {
    "title": "346. ક્યાં લગી જીવની જાત જાણી નહીં (૨૩૩)",
    "slug": "346-kyam-lagi-jivni-jat-jani-nahi",
    "authorSlug": "bhoja-bhagat",
    "category": "ભોજા ભગત",
    "sortOrder": 346,
    "lyrics": "ક્યાં લગી જીવની જાત જાણી નહીં, ત્યાં લગી તાણામ તાણ છે ... (ટેક)\n\nસાધ્ય ને વિચારતા અંતે મધ્ય એક છે, વસ્તુ સાચી તે વેદાંત કહે છે ... ક્યાં\n\nજાત જાણ્યા વિના મતપંથ બહુ થયા, અટકી રહ્યા આંધળા આપ ભૂલ્યા\nવધી ગયા વાદમાં હરિ ન આવે હાથમાં, મેરુ જેવા મન કરે પણ પાય લૂલા ... ક્યાં\n\nજાત જાણ્યા વિના યોગ સાધન કરે, પરહરે કામ, ધન ધામ મૂકે\nહઠ કરી આદરે પસ્તાઈ પાછા ફરે, વૈભવ ના ભોગવે ને ભક્તિ મૂકે ... ક્યાં\n\nઅજ્ઞાતુ આપડું આપ ભૂલી ગયો, જીવ થઈ આચરે કલ્પિત કર્મ ધારે\nબુદ્ધિ નાં ઠાઠમાં વાટ સૂઝે નહીં, આવવું જાવું ને એ જ મારે ... ક્યાં\n\nજાત જાણ્યા પછી જન્મ મૃત્યુ ટળે, જેમ પાલો પાણીમાંથી પાછો ન આવે\nભોજલ બ્રહ્મવેત્તા જેને ગુરુ મળે, તે જ આ દેહ થી અભેદ પાવે ... ક્યાં"
  },
  {
    "title": "347. લોભી કુટુંબ ને ઝાઝું નાણું (૬૯)",
    "slug": "347-lobhi-kutumb-ne-zazu-nanu",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 347,
    "lyrics": "લોભી કુટુંબ ને ઝાઝું નાણું તેને ન ભજે પ્રભુ ભજવાનું ટાણું ... (૬૯)\n\nહરણ કાળ હરદમ ત્યાં વસે ને, શ્વાન સુંઘાડી હટી નવ ખસે\nએકનું વીતે ત્યાં બીજાનું થાય, એમ જ પનઘટ ખાલી થઈ જાય\nકેટલાક અવતરે ને કેટલાક મરે, કેટલાક ગાંડા ને કેટલાક ભણે\nમરણ પરણ ની ગૂંથી છે જાળ, એમાં સપડાયો આ સંસાર\nતેમાંથી કેમ નીકળવું બહાર, એનો કોઈ ન કરે જરા વિચાર ... લોભી\n\nપામર સગાની ઘણી થાય ઓર, પછી અવળી ધાતુની ઉડાવે ખોર\nકોઈ કે વહુ ને કોઈ કહે સાસુ, કોઈ ને વિવાહ ને કોઈ ને ડાકણ\nકોઈ કહે મારે વહુ છે ભૂંડી, કોઈ કહે મારે સાસુ છે ભૂંડી\nઆવી વાતો નિશદિન કરે, ઈશ્વર થી સદા અવળો ફરે ... લોભી\n\nએવે દુનિયા રહે છે ઘેલી, શઠ ચાલે ખોટા સંસ્કાર\nઉપદેશ આપ્યો એમ લાગે બાણ, સદા રહે પામર નો સંગ\nડાઘર ઉતારે સડેલો રંગ, શઠ તું મચાવે છે ખાલી જંગ\nનથી આવતી પ્રભુની શરમ, નથી જાણતા ધર્મ નો મરમ ... લોભી\n\nમાથે નથી મરણ ની બીક, નકામી વાતો લાગે છે ઠીક\nપામરમાં જઈને ઉરે છે ધાસ, ને શ્વાસે શ્વાસે થાય સત્યનો નાશ\nહરદમ રહો ખલીસ નો સંગ, નથી ઉતરે છે ચડેલો રંગ\nપૂર્વના તારા ઉઘડ્યા ખોટા કરમ, ભક્તિ વેચે ને રાખે શરમ ... લોભી\n\nકુટુંબ કબીલા રહે બ્રહ્મ ફરે, ને ધર્મનાં રસ્તે જાતા ડરે\nદર્શન નો લાભ સંતસંગ નો હોય જોગ, ત્યારે ગુરુ ને બતાવે શ્વાન કે શોણ\nઅંતરમાં અભાવ પેટમાં પાપ, મુખેથી દેશે મીઠા જવાબ\nજન્મ મરણનો જે ટાળે રોગ, તેનાંથી મૂરખ રાખે છે વિયોગ ... લોભી\n\nસંશય સર્પનું ઉતારે ઝેર, વિષનાધિ દુનિયા નો વેર\nસાચી માને ઉરમ ની બોળ, પલ પલમાં પકડી લેશે મોત ... લોભી\n\nઅનીતિ ખેલ દેખે છે નીતિ, લોચન ન ઠરે પ્રભુની પ્રીતિ\nસદ્ગુરુ સેવા કરી લે બાપ, ગુરુ થી વધી સે ગુરુનો બાપ\nપછી પચાસ વરસ વહી ગયા, હવે બાકી તો થોડાક જ રહ્યા\nપલમાં કુંડી ઝાંપશે કાળ ત્યારે, કોઈ નહીં કરે તારી વાર ... લોભી\n\nરળ્યું આપ્યું તો રહેશે અહીં, સાથે આવશે રોકડો કાંઈ\nદાસ સવો કહે શિખામણ છેલ્લી, આખર વખતે સદ્ગુરુ છે બેલી ... (૬૯)"
  },
  {
    "title": "348. કાંઈ મેં પૂછતાં રે, ચરણોમાં શીશ નમાવી (૭૦)",
    "slug": "348-kai-me-puchhta-re-charnoma-shish-namavi",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 348,
    "lyrics": "કાંઈ મેં પૂછતાં રે, ચરણોમાં શીશ નમાવી ... (૭૦)\n\nઅલ સાહેબ લઈ રહ્યો આડંબર, કહાં શબ્દ કા મૂળ\nકોન શબ્દ સબ ઘટમાં બોલે, અર્થ બતાવી દો ખુલ્લા ... કાંઈ મેં\n\nકોન ભજન ને કોન નિરંજન, કહાં હે પાંચેય પ્રાણ\nક્યાંથી ઉપજી મન ને વાણી, ઈ મેં નહીં પિછાણ્યા ... કાંઈ મેં\n\nનાદ બિંદુ તુમ કિનકો કહેતા, ઉનકી કહો નિશાની\nશ્વાસ કહો દર્શાવો મુજને, એ ગત મેં નહીં જાની ... કાંઈ મેં\n\nહદ બેહદ હમકો બતલાવો, કિસ્સી બિધી પાર જવાનો\nપુરુષ તણો પ્રકાશ બનાવો, હે શીતળ કે તાતો ... કાંઈ મેં\n\nક્યાં લગી રાજ નિરંજન કેરો, કહાં પુરુષ કા ધામા\nબેહદ પાર બેસે કોણ બંદા, ક્યા હે ઉસકા નામા ... કાંઈ મેં\n\nદોજ પુરુષ કો સમજણ દીજે, કહાં હે ઠોર ઠિકાના\nઘટ છોડી હંસા ચાલ જાવે, કોણ શબ્દ અગવાના ... કાંઈ મેં\n\nમેં બાલક તુમ ગુરુ હમારા, બંદી છોડ કહાતા\nસવો કહે સમજી દિલ અંદર, રીસ ન કરશો દાતા ... (૭૦)\n\n(ઉત્તર પક્ષ)\nપરઝાહારે, કોઈ ગુરૂનામ લઈને વિચારે\nમૂળ શબ્દ લઈ રહ્યા મેદની, વહાં શબ્દ ઠેરાના\nસોહં શબ્દ સબ ઘટમાં બોલે, એહી પરખ પ્રમાણા ...\n\nમન નિરંજન સ્થાપ્યુ છે, પાંચ ઇન્દ્રિય માં પ્રાણ\nઅષ્ટધાથી વાયુ ઊડે, સમજ લેવો કોઈ શાણા ...\n\nનાથ નિરંજન ડંકો મારી, તુરીયા પદ લગ ગારો\nએજ શબ્દ થી માયા બન્યા હો, ત્રણ લોક ઘડનારો ...\n\nસુરત નૂરત ગ્રહ લ્યો હમારી, બેહદ પાર બોલાવો\nપુરુષ તણો પ્રકાશ પરખજે, સ્વભાવ ખૂબ સોહાતો ...\n\nત્રિકુટી માં તખત નિરંજન, પરે પુરુષ કા ધામા\nઅધધ ઉરસ માં આપ બિરાજે, સોહમ સમજ લે નામા ...\n\nઅમર પુરુષ કો ચરણ દીજે, ત્રિવેણી અસ્થાન\nદ્વાદશ દોર સુરતો રાખ્યો, ગુરુ શબ્દ અગવાના ...\n\nબાલક ને ગુરુ યુક્તિ બતાવે, મુક્તિ નો છે દાતા\nસવો કહે સદ્ગુરુની શરણે, સમજાવ્યા તે સુખદાતા ... (૭૦)"
  },
  {
    "title": "349. સુખ દુઃખ આવે ભલાની ઇચ્છા લે (૭૧)",
    "slug": "349-sukh-dukh-aave-bhalani-ichha-le",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 349,
    "lyrics": "સુખ દુઃખ આવે ભલાની ઇચ્છા લે, આપણે ધીરજ થી મન રાખો થડે ... (૭૧)\n\nકોઈ દિન કમળા કરે ને પૂરી, કોઈ દિન ભૂખ પડે\nકોઈ દિન ફળ આહાર કરે છે, કોઈ દિન લંઘણ પડે કડી ... સુખ દુઃખ\n\nકોઈ દિન પોઢણ સેજ તળાયુ, સો દસ અસવાર ટળે\nકોઈ દિન જંગલ હોય પથારી, વહ ને મસાણ માં પડે ... સુખ દુઃખ\n\nકોઈ દિન ચડવા હાથી ને ઘોડાં, મેના પાલખીયુ જડે\nકોઈ દિન પગમાં પંહળ નાંગળે, રણ લાગે રણછોડે ... સુખ દુઃખ\n\nકહું ઘેર મહેલમાં બળતી મશાલો, દીવીયે દિવડા અડે\nએક નરે પાણીનીયડાં ભરીયા, માથે ઉપાડી દોડે ... સુખ દુઃખ\n\nસંપત્તિ ને વિપત્તિ સર્વેનાં માટે, ક્ષણ અંતરે આવી પડે\nકરે શરણ દાસ સવો કહે, નામ ભજનારને નહીં નડે ... (૭૧)"
  },
  {
    "title": "350. સપાઈ સદ્ગુરુડા સરખા (૭૨)",
    "slug": "350-sapai-sadguruda-sarkha",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 350,
    "lyrics": "સપાઈ સદ્ગુરુડા સરખા, હુકમ ઉઠાવું હાકડા\nબાળ્યા છે વિપતીને વેરી, હું ને મારું બે દઉં હટા ... (૭૨)\n\nમતે ખેલું દુનિયામાં, નોકર બનું નિરંજન કા\nઆપ્યું તે પરિબ્રહ્મ કા, બાંધું નિજ ઘર કા ... સપાઈ\n\nતીન પાંચકો કરસુ તાબે, જ્ઞાન ધ્યાન કા લગાવુ ધડકા\nપહેલવાણ મન પકડું પહેલા, કાળ મોહ કા શીશ કટા ... સપાઈ\n\nઆપે આપ સત્તા ત્યાં આપની, અણલિંગી અલ્લહ લગે ઉન્નડા\nધણી બારડો નહીં ત્યાં ધારા, સિંહ બકરી કા સાંચ મિટ્યા ... સપાઈ\n\nઆપુ રાજ અમર પરવાના, શીલ સંતોષ કા બસે સિકડા\nનિજાનંદ પોતે પરસોત્તમ, જગત ભગત કા દિયા ઝટકા ... સપાઈ\n\nઅડીંગ ડોલું મુખ નહીં બોલું, જપ અજંપે તેરા ધડકા\nદાસ સવો સમરે સમરથ જૂહી, જન્મ મરણ કા ભય હટા ... (૭૨)"
  },
  {
    "title": "351. ખલક ખડી જાય બેની રહો હેત ભૂલી (૭૩)",
    "slug": "351-khalak-khadi-jay-beni-raho-het-bhuli",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 351,
    "lyrics": "ખલક ખડી જાય બેની રહો હેત ભૂલી ... (૭૩)\n\nસંત સમાગમ સુખને મેલી, પરનીંદામાં હોડે છે પેલી\nશું વિચારી જોને ધરતી છંડેલી રે ... ખલક\n\nસૌ લોકની ઉત્પત્તિ કીધી, લાખ મનુષ્ય ની ચોરાશી એની\nઆ ખેતી છે નિરંજનજી ની રે ... ખલક\n\nજેમ ઊંદરને પકડે બિલી, એમજ કાળ પકડશે બેલી\nહવે રામ ભજન કરો રંગ ભીની રે ... ખલક\n\nકોઈ આંગણે કોઈ ચાલે, કોઈને હરિ ની દવા ન ચાલે\nસર્વે જાય છે હાથે ખાલી રે ... ખલક\n\nમાતા પિતા પુત્રને મેલી, સાથે નહિ આવે પૈસાની થેલી\nકાયા મસાણે બળે એકલી રે ... ખલક\n\nકાળ છોડ ને અળગો છેલી, વેર ભીતરથી દેજે મેલી\nસદ્ગુરુ શરણે રમો સાહેલી રે ... ખલક\n\nસદ્ગુરુ વિના નથી કોઈ બેલી, નિજાનંદ સુખ હેતુ મેલી\nદાસ સવો કહે બેની સે સવેલી રે ... (૭૩)"
  },
  {
    "title": "352. તું તો હજી બોલીને જાણે (૭૪)",
    "slug": "352-tu-to-haji-boline-jane",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 352,
    "lyrics": "તું તો હજી બોલીને જાણે, સદ્ગુરુ તને એક બોલાવે છે ... (૭૪)\n\nકાં તો મનવા મરી તું જા, કાં તારી મમતાને માર\nબદ્ધુ તોળાશે અલખ નાં દ્વારે, હોડી છે અબજ નો ભાર ... તું તો\n\nમરવાનું મનવા મકર જાણજે, ફુગે છે અહીં નો ડર\nસંતો થી ચોરી ને ગુરુ થી કપટ, એમાં હાટોશ નહીં હો સાર ... તું તો\n\nહસી હસીને કુકર્મ કરો છો, પછી રોયે નહિ આવે પાર\nસુખ દુઃખ વેઠી સદ્ધર્મ પાળો, નહિતર પડશે પહળ નો માર ... તું તો\n\nચરણે શરણ દાસ સવો કહે, નામ સ્મરણ વિન નહીં આધાર ... (૭૪)"
  },
  {
    "title": "353. કહ્યો ભાઈ આ દુનિયા ભય હાલી (૭૫)",
    "slug": "353-kahyo-bhai-aa-duniya-bhay-hali",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 353,
    "lyrics": "અહિં વસીલો તારો અહિં રહેશે, છત્રપતિ ને છડીદાર\nકામ નહીં આવે, તને કાળી રાતે લેશે કાળ ...\nસિંહ નું મુખ તને સુંઘાવશે, કુટીલ કરમ ચંડાળ\nરક્ષા ચલાવ્યે મહાદુઃખ થાશે, તે દી આડી નહીં આવે તારો યાર ...\nગરવની છાતી છોડી દે, અને ખૂટલ વરતી ને વાર\nઓરતો શું કામનો, નરકમાં નોંખશે નાધાર ...\nસુર સુખ લેવું છે તો સદ્ગુરુ દિન દયાળ\nજોડી જોડી, તારી કપટ ચતુરાઈ ટાળ ...\n\nકહ્યો ભાઈ આ દુનિયા ભય હાલી, સૌને માયા બહુ વહાલી ... (૭૫)\n\nઘરડાં હુવો ત્યારે વ્હાલવડો, સાસુ સસરા ને સાળી\nચામડી ઝુલાવે ત્યારે ઘડપણ મંડ્યું, પાસે બેસે છે કે કો ખાલી ... કહ્યો\n\nકાલી ઘાટી ને ન જવાયી, પ્રભુ પતે ન આલી\nરહી રહી ને રાંડો કો ઓચો, દારી છે કે ભોમાં ઘાલી ... કહ્યો\n\nઝગડ કરવાને થયા સ્નેહીઓ, એને બાંધ્યો ઠાઠડીમાં ઘાલી\nરામ ન ભજ્યા વાં કર્યા રીયાડા, કાઢ્યો એક પૈસો આલી ... કહ્યો\n\nઘાલી લોટો કે અણંુકાઈ છાલીડું, ખાખરી હોળી ઘાલી\nસુખા લોટને વાળ્યો લાડવો, પાણી માં પલાળી ... કહ્યો\n\nઘરની સ્ત્રી ઘણું પોકારે, હું આ ઘરમાં જો મહાલી\nબહુ ગરાશ કે ઈ નો ચાંદલો, ખોટી શીદ થાવ ખાલી ... કહ્યો\n\nમારા કુળનું શ્રેષ્ઠ ચાહરે, ત્યારે હરખ ભરતી હાલી\nકરતી પાસે કિમ કરાવી, એને નક્કી નાતરે ઘાલી ... કહ્યો\n\nમાયા મૂકીને મુવા મસાણે, ગોરા ફોટી ધડને કંગાલી\nદાસ સવો કહે તું સાધુ ને સેવો, રહેજો સદ્ગુરુ ચરણને ઝાલી ... (૭૫)"
  },
  {
    "title": "354. ગુરુ મળ્યા છે ગુરૂ જ્ઞાનમાં (૩૩૧)",
    "slug": "354-guru-malya-che-guru-gjanma",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 354,
    "lyrics": "ગુરુ મળ્યા છે ગુરૂ જ્ઞાનમાં, ગુરૂ મળ્યા છે ગુંજાર\nક્યા તા કોઈ રમતી ગુરુ આપ્યો, જ્ઞાનમાં કૌર ગુંજાર ... (૩૩૧)\n\nજ્ઞાન બાંણ ગગનમાં રોપ્યા, પ્રેમ દોરો સણકાર\nશૂરવીર નો ચિત્ત વ્યાપ્યો, શિખર પર અસંખ્ય દિયા કૌશલ્યાર ...\n\nનામ ગાયિકા નિકટ નિર્ભય, સદા સરકાશ બ્રહ્મ\nઅબચળ સિંહાસન વ્યાપ ધોળાં, ક્યાં પદ પ્રભુતા પાઈ ...\n\nસોહં સાહેબ કી બંદી બ્રહ્માંડ, સંતો સદ્ગુરુ દિયા બધાઈ ...\n\nનિજ નામ નિરંજન ઉરી રાખ્યા, સોહમ રાણુરૂ બાંધ\nચાર ખૂંટ ના દોલન્દે ને કુંવર પોઢ્યા માંહ ...\n\nગુરુ વચન દોણાર પ્રગટ્યા, ત્યાં બ્રહ્મજ્ઞાન અનુભવ વ્યાપી\nઅમર વૃક્ષ પધરાવીયા, દેવ તખત ની ગાંથ ...\n\nઅવલ યુગના પરખીયા, સદ્ગુરુ આ શાન બતાવી\nસ્વામિ હું સરજન કો બાલકો, દાસ સવો ગુણ ગાઈ ... (૩૩૧)"
  },
  {
    "title": "355. ગુરુ પિણ જ્ઞાન ઉદે નહિ આવે (૩૪૦)",
    "slug": "355-guru-pin-gjan-ude-nahi-aave",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 355,
    "lyrics": "ગુરુ પિણ જ્ઞાન ઉદે નહિ આવે, આપ સરુ પિણ જ્ઞાન ... (૩૪૦)\n\nતેરા ઉરના કૂંજ પાસ હે, સદ્ગુરુ મુખિ ગતિ પરમાણ\nનિરાલંબ નિરંતર વેદ પોકારે, શરણાવત સદ્ધર્મે ન ભાવે ...\n\nરસાઈ પર પાવ સંત સેવના, હરિ ગુરુ ચરણો નમી શિશ નમાવ ...\nનજર હો જ્ઞાન ઉપર અણુરાઈ, તબ નિશ્ચય ધર પાવે ...\n\nનિરંજન પર પરવાના પાવ, અખંડ પદા સધાવે\nસદ્ગુરુ વચન કે દાસ સવા સાધક પાવે ... (૩૪૦)"
  },
  {
    "title": "356. સંત જી નો ઉરે, દેશાંતર થી પધાર કરે (૩૬૦)",
    "slug": "356-sant-ji-no-ure-deshantar-thi-padhar-kare",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 356,
    "lyrics": "સંત જી નો ઉરે, દેશાંતર થી પધાર કરે, સંત જી નો આદેશ લેવો ... (૩૬૦)\n\nઅંદરો દાસી ઉઠોને, જ્ઞાન ઉડોને ભક્તિ લાયો\nઅષ્ટપદી રચના ન કરના, પંખી થઈ ને બંગલામાં રમે ...\n\nપદ પ્રસાદની વાણી પ્રભુની, નર સિંહે આપ ધરે\nસાળ વિરાધમય ક્રોધ વ્યાપન, વિરહયે કવરે દિન રાત ...\n\nસુધ સરી સરદાર લોકના, ધનવો નાથ નિરંતર સાંભળે\nસાળ પંખા પ્હેરી કોટી, પાછળ પછવાડાને ભરે ...\n\nમહા દવા ના અંશ અસાયવા, નીર શ્રવણે નડે\nદાસ સવો કહે નામ સમરણ સાચા મન થી કરે ... (૩૬૦)"
  },
  {
    "title": "357. અમર વેદના કોઈ ઉપાસી (૩૬૩)",
    "slug": "357-amar-vedna-koi-upasi",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 357,
    "lyrics": "અમર વેદના કોઈ ઉપાસી, અખંડ અસત્ય સદ્દા વિનાનાં, અચળ વેદ પરખ પાંખે ... (૩૬૩)\n\nવ્યભિચારિ અસત્ય સંઘા વિનાનાં, ડોરા બાણ તે બાંધે ...\nપારસ પુરુષ વિના પતિને, ચરણ હૂં નહિ બાંધે ...\n\nઅહાકાર પ્રકાંડ વિનાનો, પવન હૂં નહિ આવે ...\nગુરુ નિરંતર નજરે નીહાળે, બિંદુ મળે ઔષધ પાસે ...\n\nવચન વચન પાર નહિ પોથી, અણતા પડધા નાહ બોલ પાંખે ...\nનિરાધાર નિશ્ચી લ્યો ગંભીર, પુકાર બેસે ઈ સોની પાંખે ...\n\nઅગમ નિર્દોષ કા માર્ગ અળખાવ્યા, સત દર્શન અખંડ પાવે ...\nદાસ સવો કહે ભવો ભવ લેતા, જેમ સુગંધ હે સતસાથી સ્મરે તે રીતે ... (૩૬૩)"
  },
  {
    "title": "358. સખી મારા વ્હાલા રાખે એમ રહીએ (૩૯૩)",
    "slug": "358-sakhi-mara-vhala-rakhe-em-rahie",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 358,
    "lyrics": "સખી મારા વ્હાલા રાખે એમ રહીએ, આપણી અક્કલ વસીલે લહીએ ... (૩૯૩)\n\nસ્થાપણા શું જોઈએ વ્યાપંતો, વસ્તું ગોચર ત્યાં પહોંચ્યું\nતાંબલો કેમ લખ્યા તારિણી, નોરડું એડી નિશા ...\n\nઅપતિયાર સર્વે આપના, કોઈને દોષ ન દઈએ ...\n\nઅલ્પ આપણું કંઈ આપની મંતિ, સ્વેચ્છા સ્થાપક નવ થઈએ ...\n\nઅાપણો વાંક સિદ્ધિ તારા, દાન ને સ્વાધીન હઈએ ...\n\nહુકમ વર્તી કો હુકમ તણો, સરખા પ્રમાણે સહેજે હઈએ ...\n\nથવું ને થાશે તે સરજાવેલું માલિકની, ઉરમ વ્યાપારે સૌ લહીએ ...\n\nસદ્ગુરુ મળ્યા દાસ સવો કહે, જ્ઞાન ગુંજામાં નિત રહીએ ... (૩૯૩)"
  },
  {
    "title": "359. ઈંગલા વ્યાપી ઉરાવે (૪૧૨)",
    "slug": "359-ingla-vyapi-urave",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 359,
    "lyrics": "ઈંગલા વ્યાપી ઉરાવે, વળી થઈ તાપ ઈ તાપ થઈ તાપ આલ્યા દુરેશ આપણ કરાવે ... (૪૧૨)\n\nગુપ્તે જ્ઞાની કો કોઈ ન દેખે, અવગુણ નજરે વ્યાપે ...\nપોતે તો પહેલા થઈ વાલિ, સહેજે બોલે માર્ગ બતાવે ...\n\nદાસ પોતાનો દિલમાં રાખે, પરનો અવગુણ ગાવે ...\nપાંચ પચ્ચીસનું ટોળું થઈને, નિંદા નદીમાં ન્હાવે ...\n\nઉરમ સુ ઉરતના વિના, તેને ગુરુ ગામ કેમ જણાવે ...\nવિશ્વાસ બે પળ વ્યાપારી, સારી ઉંમર વણાવે ...\n\nકામ કરીને ઉરમે રહેશે તો ઉરા વ્યાપકુળ ગાવે ...\nહરિજન વિચારા હારીને રહેશે, બંને નમી કરે ગાવે ...\n\nસ્વામિ અસ્વારનો સંત અસ્વારમાં, સદા સવો ગુણ ગાવે ... (૪૧૨)\n\nહરિજન આપણ દાસ થઈ રહેજો, ઈ તો કેમ બોલે તેમ કૌવ ... (૪૧૩)"
  },
  {
    "title": "360. ઓહં પ્રત્યક્ષ રે સાસ ઓહં પ્રત્યક્ષ રે (૩૪૬)",
    "slug": "360-oham-pratyaksha-re-sas-oham-pratyaksha-re",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 360,
    "lyrics": "ઓહં પ્રત્યક્ષ રે સાસ ઓહં પ્રત્યક્ષ રે, નિશદિન હૃદયમાં વિરાજે ... (૩૪૬)\n\nપ્રેમ લહેર માં પિયુ ને પરખ્યા ૨, રણુંકાર સે તારા\nશોધે ઘોર પર શૂન્ય વસે, કશું વડ ગગન ગાવારા ...\n\nઈંગલા પીંગલા વ્યાપે મહુડ ઉરતા, સુષુમણા દિયા દિદારા\nત્રિકુટી મહેલમાં કુવા તપાસી, વિજળી આ ચમકારા ...\n\nબતાવે શાન સદગુરુ સરખા, મુક્તિ ક્યાં કુવારા\nથઈ આવે કહો ક્યોન કસન છે, તારસે અણભુત ધારા ...\n\nપુરુષ અધર નો ૩૨ પરિક્રમા, મુક્ત મનની હમારા\nદાસ સવો સમરે સદગુરૂ કી બાણી, ઓષધ થી ગાઈ ... (૩૪૬)"
  },
  {
    "title": "361. સૂરતા શબ્દ માં કોનો સાધ બોલે (૪૦૫)",
    "slug": "361-surta-shabdma-kono-sadh-bole",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 361,
    "lyrics": "સૂરતા શબ્દ માં કોનો સાધ બોલે ત્યારે કળજળ થયો સાંભળે ... (૪૦૫)\n\nનાભિ કમળથી ઉઠેને વ્યાપે ત્યારે કમળ કાયા બોલે\nબિંદુમા વાળા હોવુ ઇ વહાલા, નો તને જન્મ મરણની ભાંગી ...\n\nઉરાયા પવનના લે ઇ નિહાળી, તેને બ્રહ્મ સિદ્ધ સુરતા બાંધી ...\nવ્યાપક સ્વરૂપ ને લે છે નિહાળી, તેને સુષુમણા ધાર લ્યો બાંધી ...\n\nવ્યાપક ભૂમિ પર આસન રાખી, ત્યાં બક્ષિસ પુરુષ ત્યો વરારા ...\nદાસ સવો ને સ્વામિ હું મળિયા, ત્યારે ભવની ભાવના ભાંગી\n\nઅપણહર દેવ કુંભર દેવિયા, ત્યા ભજન અરાણ્યા બાંગી ... (૪૦૫)"
  },
  {
    "title": "362. કોઈ શબ્દ રે, માલ હોઈ શબ્દ રે (૩૭૯)",
    "slug": "362-koi-shabd-re-mal-hoi-shabd-re",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 362,
    "lyrics": "કોઈ શબ્દ રે, માલ હોઈ શબ્દ રે, નિશદિન મન ને નિશાને ... (૩૭૯)\n\nઉત્તર ઘરમાં હોવ વ્યાપને, નર તપાસી પાર\nમાર્ગે કોઈ હોવ નાહિ તો, ભય બંધીવાળા ઓર દિલ ...\n\nઇંદળ કોની કરે લડાઈ, જીવ બંદુકીવાળા ...\nગુરુ બક્ષિસમાં હરવો ખોલે, વિના દોર નિરાધારા ...\n\nઅણભે હોર કસો નહિ દિલમાં, ત્રિવેણી કુંવર પંથાણા ...\nપ્રેમ કસબી હો બાણ પીધા શૂરા ...\n\nદાસ સવો કહે ક્ષણાર બોલાવે, સદ્ગુરુ શરણે પાવે ... (૩૭૯)"
  },
  {
    "title": "363. મેં ઈ વ્યાપિ વ્યાપારિ રે (૪૧૩)",
    "slug": "363-me-i-vyapi-vyapari-re",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 363,
    "lyrics": "મેં ઈ વ્યાપિ વ્યાપારિ રે, વણજારા મિલ્યા ત્રિપાથી ... (૪૧૩)\n\nવ્યાપારીગત કે વ્યાપારી કાઈ બિન્યા, સંત સ્વરૂપ મેં મારા\n૨૧ સ્થાપો તો રામ લગુ લઈ, બંડલ છે વણજારા ...\n\nઅપાણ દર્શન ૩૨૧ કરતા, મળ્યા મુડી વાળા ગ્રાહક\nકિંમત ૩૪૭ પડી ૩૨૦ માં, લટક્યા ભવ બંધારા ...\n\n૩૫૨૪ માં ઈ મળ્યો પુજારી, સ્થાપિ નહિ નિકતારા\nહું ને મારી ધન વ્યાપાર વ્યાપારમાં, સંસાર સદા ખારા ...\n\nત્રિગુણ વ્યાપક વર્ડ છે વહાણે, ઉર્મે કરે અસવાર ...\nદર્શન મેં તો હરી નયણાં ની, શોધ્ય વરણ પધારો ...\n\nઈશ્વર કે ઉત્તર ભવનમાં રહેના, ઉરમ ૧૮ વચન ૨૭ પામે ...\nદાસ સવો કુંવરજી વરણ, પ્રગટ કરે છે પોકારા ... (૪૧૩)"
  },
  {
    "title": "364. બ્રહ્મ વિલાસમાં ભય નથી જમનો (૪૧૫)",
    "slug": "364-brahma-vilasma-bhay-nathi-jamno",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 364,
    "lyrics": "બ્રહ્મ વિલાસમાં ભય નથી જમનો, જ્ઞાન ગંગામાં નિશદિન રહેવું\nઆઠે પહોર જેને રહે ખુમારી, અલમસ્ત ફકીર નો ઈ એવો ... (ટેક)\n\nપ્રીત પ્રેમ લાગ્યો પિયા થી, અમર જ્યોત વ્યાપે દેવો\nખુમારી એ પરિક્ષા નો ચરણામૃત, પિયુ એ પાયો એવો ... બ્રહ્મ વિલાસમાં\n\nપુષ્પ માંહી જેમ સુગંધ છુપાણો, તલમાં તેલ રહ્યો જેવો\nએમ જ અવિગત રહે વ્યાપમાં, સુરતવંત નિશદિન સેવો ... બ્રહ્મ વિલાસમાં\n\nકપટ ચતુરાઈ કોરે કરીને, ગુરુ ચરણોમાં ચિત્ત દેવો\nસદ્ગુરુ મુખે અમૃત વચનામૃત, શ્રવણે સુણી લેવો ... બ્રહ્મ વિલાસમાં\n\nઅકથ કથા કથે કોઈ શૂરા, અક્ષર વિના અલભ્ય લખી લેવો\nઉત્પાત પરલે થી પાર પુરુષ છે, આપે મંડળ ઓળખો એવો ... બ્રહ્મ વિલાસમાં\n\nઅમર દેશનાં સંગી અમારા, મળે તો સંદેશો એમનો કહેવો\nદાસ સવો કહે વ્યાપ મેલી, અહોનિશ ઈ ઘરમાં રહેવો ... બ્રહ્મ વિલાસમાં (૪૧૫)"
  },
  {
    "title": "365. જગત કહે છે નથી જીવવું (૪૧૬)",
    "slug": "365-jagat-kahe-che-nathi-jivvu",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 365,
    "lyrics": "જગત કહે છે નથી જીવવું, આંખમાંથી સરે છે ઈ બોળ\nભૂલ્યો બ્રહ્માની ભાંતમાં, સંત કહે છે ઈ સુણ બોળ ... (ટેક)\n\nપાંચ તત્વ લઈ પ્રગટ કર્યા, તેનો ભાર છે બેહ\nકૂંચી કરીને તમે જોઈ લ્યો, કહે છે વાણી નો લેહ ...\n\nજળ આકાશ ને પૃથ્વી, સરે છે વાયુ કે તેજ\nપુરુષ પ્રકૃતિ કે આત્મા, હું તો પૂછું છું યોજન તેજ ...\n\nભરણ થઈ દુનિયા ડરે, જોવે નહીં પોતાની જાત\nસામે તે સિંહ ને ડરાવ્યો, એ છે અચરજ ની વાત ...\n\nમન મારે થી સર્વે મરે, મટે મરણ કેરી ફાળ\nરહેજો અક્ષર પુરુષ ના આધારમાં, સદા સવો ગુણ ગાય ... (૪૧૬)"
  },
  {
    "title": "366. નક્કી જેને નાગણી મારી (૪૧૭)",
    "slug": "366-nakki-jene-nagani-mari",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 366,
    "lyrics": "નક્કી જેને નાગણી મારી, તેની હટો દશા ન્યારી\nપ્રગટ દશા એનું પારખું બોલે છે, હરિજનો ભણજો નિશ્ચયે ... (ટેક)\n\nનાભિકમળમાં છે નાગણી, જેણે આંતર્યો અમૃત કુંડ\nપકડી લેશે કોઈ પારખું, સાચા સદ્ગુરુ નાં સપૂત ... નક્કી\n\nમોતી કબ્જે ગારુડી કરશે, સત્તાવાળો શું કામ કરશે ...\nવિષ વ્યાપે નહીં અંગમાં, જેને સાધ્યા બ્રહ્માંડ ...\n\nદિલ ઈચ્છે દિદાર કા, દાણા માંગશે નહીં જમદૂત ...\nમંત્ર નિશદિન સ્મરશે, જે નર કબ્જે નાગણી કરશે ...\n\nભૂરી નાગણ રહે છે ભોંયરે, એને શિર પર કાળની ગૂંડ ...\nનિરખી જેણે નિહાળ્યું, લાવ્યા વશીકરણ લઈને ધૂત ...\n\nઅલમ વાળો સામો ચડશે, ઝાપટો નાંખે ઝેર કેમ ચડશે ...\nનવે કુળનાં અંગ નવા છે, તું મન તપાસી જો ખુદ ...\n\nપ્રગટ દશા એનું પારખું, ભલે હોય વ્યાકરણ કે વ્યાખ્યાન\nઅલમ વધી બજાર નો કડશ, દાસ સવો કહે દૂતીયા પદ ટળશે ... (૪૧૭)"
  },
  {
    "title": "367. સભામાં પ્રીતુ સોઈ વન મળે (૪૨૬)",
    "slug": "367-sabhama-pritu-soi-van-male",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 367,
    "lyrics": "સભામાં પ્રીતુ સોઈ વન મળે, મૂંઝાય બહેરા નટ્ટા આંધળા, પ્રભુની ખોજમાં\nવકતા પુરુષ નો અંશ જ બહેશે, વેદ વાણી ભોંયરે ...\nપ્રેમ થકી પરને પરમોધે, પંથ ખોતે નહીં સાંભળે ... (૪૨૬)\n\nસત અસત બેય શબ્દ ની, મૂંગો પરીક્ષા કરે\nભલી બુરી નું જ્ઞાન ખરું પણ, મુખથી કદી નાં બોલે ...\n\nઅંતર કુલેલ કસ્તુરી કેવડો, તે નકરાની નજરે પડે\nપદાર્થ પરખે ખરો પણ વાસ જરા ન મળે ...\n\nગંધો સુગંધી સર્વે લેતો, ખાસ ખુશબુ ને ય ઉડે\nભભકામાં ભરપૂર રહે, પણ વસ્તુ નજરે ન પડે ...\n\nશીત ઉષ્ણને સહન કરી, મહા અમર ઝરણા ઝરે\nત્રણે ગુણોની ખમે તિતિક્ષા, દુઃખથી ઉરીયે નહીં ડરે ...\n\nઅજ્ઞાની જગતમાં આ પાંચ જિજ્ઞાસુ, છઠ્ઠો પંડિતાઈ કરે\nઉપાય કરે વ્યાપુ રાળવો, પણ ઉલટું અંગમાં ધરે ...\n\nઆ કસોટી કોઈ વિરલા ચાહે, તે પારખ સદ્ગુરુ મળે\nહાર ઝૂટ હરે તો પલમાં, અવિચળ પદવી મળે ...\n\nઆ પાંચને જે પરમોધે, પાંચ લાવે એક ઘરે\nદાસ સવો કહે એવા હરિજન, સહેજે બ્રહ્મરસ ચરે ... (૪૨૬)"
  },
  {
    "title": "368. સમજ મન આપિયે જિલણા કૂવા (૪૨૮)",
    "slug": "368-samaj-man-aapiye-jilna-kuva",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 368,
    "lyrics": "સમજ મન આપિયે જિલણા કૂવા, સરમ મન વ્યાપિયે જિલણા કૂવા\nબિના ચંદન તેરા કોન વસીલા, બેસી વિદ્યા કા પૂતા ... (૪૨૮)\n\nજૂઠ દાસ કામ ક્રોધ કે તુચ્છા, વ્યર્થ છોડ ઈન્દ્રિયે\nબ્રહ્મ દર આસિક કહું સોના, યાદ ઓરી બેસ્યા આપની ઈ ...\n\n૨૨ પ્રત્યક્ષ અમલ ધૂતા ...\nસરવણ વંશ કા બૂતા, સવો કહે દોષમાં ડરે ...\nપકડી ભ્રમ હૂં, દાસ સવો હરિ ચરણે નિત મન ધરે ... (૪૨૮)"
  },
  {
    "title": "369. સોબત થકી સુખ ઉપજે (૪૬૦)",
    "slug": "369-sobat-thaki-sukh-upaje",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 369,
    "lyrics": "સોબત થકી સુખ ઉપજે, સોબત થકી દુઃખ થાય\nએવાની સોબત તમે વ્યાપાદેશો, બેસી કાળ મરણ મટી જાય... (રે) (ટેક)\n\nકંગાલ તો કંગાલ તથા, ગાંડી ભલે ને મદિરાપાન\nપતિવ્રતા પોતાની પરહરે, વ્યાપવા ડરે વ્યાપમાન... સોબત થકી\n\nનિમક પાણી ને નાતે થયો, એની પોળ ખુલે ન થાય\nઉપાડી આપાણો ભેળો, મારી ક્યાંય ન જાય... સોબત થકી\n\nગાંજા પિનારા ને પિનારા, સૌનું સર્વે કળાય\nકિંમત થાય વસ્ત્રની કસોટીએ, ઈ તો પાપો પડે વંચાય... સોબત થકી\n\nસત ધર્મને મિત્રતા હો તો, વ્યાપન પૂર વપોવાય\nદાસ સવો કહે વ્યાખ્યા વિચારી, હરિ ગુણ અહર્નિશ ગાય... સોબત થકી (૪૬૦)"
  },
  {
    "title": "370. આત્મા વ્યાપ્યા તો વિચારવું વારવા (૪૫૮)",
    "slug": "370-aatma-vyapya-to-vicharvu-varva",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 370,
    "lyrics": "આત્મા વ્યાપ્યા તો વિચારવું વારવા, બ્રહ્મરસની વાટુ\nસાચા સ્મરણ ને સંત સુખમાં, હેતુ હૃદયમાં પાયું... (રે) (ટેક)\n\nઅણબોલ્યા હતા તેને અળગા કરી, સુખ દુનિયાનું ઢોળ્યું\nવિષ હતું તે રગમાં વાપર્યું, અમૃત આપણું રોળ્યું... આત્મા વ્યાપ્યા\n\nસુકૃતની સંઘાથે બાંધ્યા જીવને, બહાર એક સાચું ચાલ્યું\nકળ કરીને ગુરુને છેતર્યા, આપણું વણસાવી આલ્યું... આત્મા વ્યાપ્યા\n\nઈશ્વરની શિખામણ દઈ છે વડી, વડી માનવું નહીં મારૂં\nપ્રપંચનો પૈસો તમને નહીં પચે, કપટી મોંઢું ના કાળું... આત્મા વ્યાપ્યા\n\nનિત નવી કર્યા વિના નવા નવા, કાળું કરી સાચું ઓળું\nઈશ્વરની વ્યાખ્યા કાઢી આપણું, બાળા સરવે રહેજો રડી... આત્મા વ્યાપ્યા (૪૫૮)"
  },
  {
    "title": "371. દ્વિધા દોરંગી સોબત કોની કરીએ (૫૦૧)",
    "slug": "371-dvidha-dorangi-sobat-koni-karie",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 371,
    "lyrics": "દ્વિધા દોરંગી સોબત કોની કરીએ, બીજા કરીએ દિવસમાં કરી મરીએ... (રે) (ટેક)\n\nસ્થાપીને સંત કુળ સંઘાડી શ્રદ્ધાથી, પંચ દહાડા પ્રેમ કરે\nપછી સદાય શોધે ખામી, પ્રથમ તો પોતાનાં તાણે...\n\nપછી મન રોડે બદલ ત્યારે બીજું જાણે, જેવા માટે સાચું\nદર્શન ક્યારે હરિગુણ ગાય, ત્યાં લોકહસાઈ દોડે...\n\nનામ કાળા નાગ જેવા, વ્યાખ્યાવાળા બોલે\nજ્ઞાની આગળ તાર્યા જેસે, ઉપર શીતળ રૂડો શોભે...\n\nવિદ્યાવાળા હેમ કેવા, વાળી હે ના પાડે\nદાસ સવો ઉમેદ વણાયે, કોઈક જ્ઞાતિ એવા\nમોક્ષની ઈચ્છાવાળાએ, મિથ્યા દર્શન રોડ્યું... દ્વિધા દોરંગી (૫૦૧)"
  },
  {
    "title": "372. દિલથી દોડે દાસને રે (૫૦૪)",
    "slug": "372-dilthi-dode-dasne-re",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 372,
    "lyrics": "દિલથી દોડે દાસને રે, વ્યાપ આમ વણાટ ધારણા\nમરવાનો કોલ છે ત્યાં કામ તારા વ્યાપનો... (રે) (ટેક)\n\nભગત થઈને ભેળો વ્યાપે, પેર સેવા ને પરંત\nસંત સંગાથે ભાવ ન લીધો, ગરજ ગુમાવ્યા ધારણાં... દિલથી દોડે\n\nબુદ્ધિ પારસમણી પૂરા મલ્યા તોય, વ્યાખ્યા ના રાખ્યા કાંઈ\nધાર આપવાની હોત ન શંકા, સતગુરુ વચન વિદારી આપ્યા... દિલથી દોડે\n\nપરમાર્થને ભાગ્યો નહીં ને, વાના કરવા મોટા\nસાધુ સંગતને સંઘાડવાને, રામ આપણ બોટો... દિલથી દોડે\n\nધર્મ અર્થે આમ ને મોક્ષય, ધારો શુદ્ધ ને હૃદયે\nનિર્દોષ થઈ હરિ રહેવું, એને પરમાર્થ કહીએ રે... દિલથી દોડે\n\nઆપણો હોશિયાર દુકાનદાર થવું, હોડ ન લગાડવી હજારો\nદાસ સવો કહે સુણો સંતો, ગુરુ ધારણા સંભાળો... દિલથી દોડે (૫૦૪)"
  },
  {
    "title": "373. વાંસ વઢાવી વિનોગ રે (૫૧૨)",
    "slug": "373-vaans-vadhavi-vinog-re",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 373,
    "lyrics": "વાંસ વઢાવી વિનોગ રે, મુખીઆ મન ઊંડી હો બૂડે નહિ રે... (રે) (ટેક)\n\nસાધન તો સંચ છે, કમળ કૃપાની કારણ હોદા\nવ્યાપ મન રહે નહિ રે... વાંસ વઢાવી\n\nશ્રેષ્ઠ નો ઉરીને નાયા હો ઈમાન ગાય રે\nપરની તે પ્રિયાથી, પતિવ્રતા કૂડે પરદેશી માં\nવ્યાપ મન રહે નહિ રે... વાંસ વઢાવી\n\nદ્રઢ વિપત્તિની વનો વિચારી લેજો વહીવટ રે\nખુશ ને પહોંચાડી ને અનીતા બક્ષ પાંચ પરણ રે\nવ્યાપ મન રહે નહિ રે... વાંસ વઢાવી\n\nબાળક ની બલાયે અગમ લાગે હોડ ન દોડે\nવિવેકી વધુ ઈ સાહિત થાવુ માલુ આપણ સાચુ\nતાણી ને સરકાડે એ ખુશ ને લાગે ઓટો રે... વાંસ વઢાવી\n\nદાસ સવા ઉમેદ શિખામણ હોજી, ઈચ્છા અન બહેલે નહી રે\nમાણસ મળવા આવ્યા, હોડી ને ડીડો દોડે રે... વાંસ વઢાવી (૫૧૨)"
  },
  {
    "title": "374. સ્વયંવર સદ્ગુરુના દેશમાં (૫૯૯)",
    "slug": "374-svayamvar-sadguruna-deshma",
    "authorSlug": "sant-dasa-savo",
    "category": "સવા ભગત",
    "sortOrder": 374,
    "lyrics": "સ્વયંવર સદ્ગુરુના દેશમાં, પરણે શબ્દ ને સુરતા નાર... સ્વયંવર (ટેક)\n\nમરજીવા હસીને વિવાહ માણશે, જેને મળ્યો હોય લખ લહાણ... સ્વયંવર\n\nસુરતીનું સગાપણ મુરજીએ કીધું, ઊંચું કુળ અવિનાશ\nસાંકડ લહેશાણી સાચા ભાવની, લેશે જેને પિયુ રે મળ્યાની હોય આશ... સ્વયંવર\n\nલગનની નાં લહાણ બંધાવીને, મોકલ્યા પંડિત ગુરુઆનંદ\nસતને રસ્તે થઈને ચાલીયા, એકાએકી અસંગ... સ્વયંવર\n\nમંડવો નંખાવ્યો કુદરત બ્રહ્મનો, સ્થિરતાના રોપ્યા સ્તંભ\nમાથરૂં કરાવ્યું મન સંતોષનું, અવિચળ મગડો પહેર્યો અભંગ... સ્વયંવર\n\nગુણ અવગુણના ગીત ગાયા રે, મળિયા મનુષ્ય અપરંપાર\nખારેડુ હતી ખોટા કરમની રે, લઈ ગયા નીવડ નર ને નાર... સ્વયંવર\n\nસજ્જન પુરુષ સારા ધરમની, લીધી ખોભે ખોભે લહાણ\nવાણી નિર્મળ બોલે વૈખરી, સેવાની સહેજે મંડાણી મુકામ... સ્વયંવર\n\nજાત ગુમાવે તે સાચો ભક્તિમાં, આપ ગુમાવવાની હોય આશ\nહું તું મારૂં હૃદયે નહીં, એવા ઓળખાવ્યા લેજે સાચ... સ્વયંવર\n\nસ્વદેશ ઉદયના ઘાટમાં રે, ખોલ્યો સુષુમણાએ ઉઘાટ\nઅંતર લગનથી બેસી શૂનમાં, જોયા પુરુષ ને પટની ચોપાટ... સ્વયંવર\n\nશરત કરીને રમે સુંદરી રે, પાસા પડે તેના પોબાર\nહું હારવો પિયુજીની આસમાં, જીતું તો મારા ભેળા રાખું ભરથાર... સ્વયંવર\n\nઅવિચળ પુરુષને એમ વરી રે, સુરતા સુહાગણ નાર\nઅમર મોડ મસ્તક ધરી, મંગળ વર્તી છે ચાર... સ્વયંવર\n\nનિમકની પૂતળી મીઠામાં રે, પાણી ભેળી પાણી થાય\nમૂળ વતનમાં ભળી ગયા, પોતે પોતામાં સમાય... સ્વયંવર\n\nવિવાહ ઉકલ્યો ને મંડપ થાંભલે રે, કર્યો ઓરડીનો ઉચ્છેદ\nઓરી ફરેતી વી ખોટી ઉલ્ઝના, સંચરણી પધાર્યા પોતાને દેશ... સ્વયંવર\n\nવર્ણન કરીને વિવાહ તણો રે, બૂઝે સમજે જે જ્ઞાન\nદાસ સવો કહે સખી સેવની, સુરતા શબ્દમાં સમાય... સ્વયંવર (૫૯૯)"
  },
  {
    "title": "375. માનવ નડ ઈ માનવ ને મોટા થયા પછી (૨૪૬)",
    "slug": "375-manav-nada-i-manav-ne-mota-thaya-pachi",
    "authorSlug": "nazir-bhagat",
    "category": "નાઝીર ભગત",
    "sortOrder": 375,
    "lyrics": "માનવ નડ ઈ માનવ ને મોટા થયા પછી,\nબાળ મન પુણ્યનું, દાન દયા પછી... (ટેક)\n\nમાતા પિતાની ગોદમાં મમતા હતી ઘણી,\nબદલી ગયો એ પરણે ને, જોબન મળ્યા પછી... માનવ\n\nપ્રીતિ જીવનના કરવા ભાગવત લાગી ગયા,\nપડતી હવે તે ગીડી, અનુભવ મળ્યા પછી... માનવ\n\nગાતો હતો ગરબા, કાયમ પ્રભુ તણા,\nભૂલી ગયો એ ભાવના, પૈસા થયા પછી... માનવ\n\nગણતો હતો તું સર્વને નિર્દોષ પણ નથી,\nઅહંકાર એવો કરે છે, કૃપા મળ્યા પછી... માનવ\n\nભૂલ બતાવી એ, પ્રભુની ધારી,\nઆપ કરે છે વ્યાપની, સિદ્ધિ મળ્યા પછી... માનવ\n\nનાઝીર કહે આ વિષયમાં, સાધનાથી પૂર દિલ,\nમાનવને મેં કદી પૂરા થતાં જોયા નથી... માનવ (૨૪૬)"
  },
  {
    "title": "376. શ્યામ વિના સબ જૂઠું લાગે (૨૪૭)",
    "slug": "376-shyam-vina-sab-juthu-lage",
    "authorSlug": "khara-bhagat",
    "category": "ખારા ભગત",
    "sortOrder": 376,
    "lyrics": "શ્યામ વિના સબ જૂઠું લાગે, વ્યાખ્યા હમકો ન લાવે... શ્યામ (ટેક)\n\nવિકટ ગિરિ યમુના કિનારે, બસશે સંતો સાચે વ્રજવન સારે... શ્યામ\n\nભક્તિ તહમ ગુરુ અમારો, મોહન મોહી ચિત્ત ભગત\nખારા હમારા ગયા વ્યાપે, ગોપાલ મોહી ચિત્ત ભગત\nપહેલ દિન સે ચિત્ત લગાડી, અસલત મિલી આવે રે... શ્યામ\n\nદાસ હમારા અં પૂછન કીજિયે, યાદવરાય કી સાંકરીયા દિલ\nઅંગ ૨૪ પર રીઝ ન કીજે, કડવા સિંધુ કહાવે રે... શ્યામ\n\nજીવન સાચી ભક્તિ ગાવે, માલ કાશ કે કાજ વિધારી\nઆવો પ્રભુ કે બ્રહ્મ બહાડી, દિલ મેં ધ્યાન લગાવો... શ્યામ (૨૪૭)"
  },
  {
    "title": "377. રામ વિના શૂન્ય સપને નહિ (૨૪૮)",
    "slug": "377-ram-vina-shunya-sapne-nahi",
    "authorSlug": "khara-bhagat",
    "category": "ખારા ભગત",
    "sortOrder": 377,
    "lyrics": "રામ વિના શૂન્ય સપને નહિ, સબ અસત વ્યાપિયા પ્રાણી... રામ (ટેક)\n\nદિન પંચમ આબદ હો હોવે, હેજ હંસ ક્યુ ભક્ષાયા\nમાટી મેં મિસ ભલે કાયા, રહે ના એક નિશાની રે... રામ\n\nઉપદેશ દેવે બીન સુનના, ઘડી પુકારી લે પુવાના\nદિનકર તારા દિવા હો દાતા, કૂકડું રે વા બાની... રામ\n\nમધુર વ્યાપાર મેં મહાન ગતિ મંડા, ચાર પ્રકાર મજા નહિ મંડા\nવ્યાપ કી જૂથ મેં આપ હી પેંધા, પડે વંચાયન પાણી... રામ\n\nખારો કહે કોઈ હોડ રે વ્યાખ્યા, પૂરો છે સત લોગ વિસામો\nહી દિલ કા હેમ કાસા, વ્યાપાર છે સાચ પાની... રામ (૨૪૮)"
  },
  {
    "title": "378. રામબાણ વાગ્યાં હોય તે જાણે (૨૫૧)",
    "slug": "378-ramban-vagyan-hoy-te-jane",
    "authorSlug": "dhana-bhagat",
    "category": "ધના ભગત",
    "sortOrder": 378,
    "lyrics": "રામબાણ વાગ્યાં હોય તે જાણે,\nઅજ્ઞાની મનનો શું આણે... (ટેક)\n\nધ્રુવને લાગ્યાં, પ્રહલાદને લાગ્યાં, હરિજન બેઠા હરિને ટાણે;\nગર્ભવાસમાં શુકદેવજીને લાગ્યાં, એ તો વેદવચન પ્રમાણે... રામબાણ\n\nમોરધ્વજ રાજાનું તન હરિ લેવા, હરિ કાશીયે ને તાણે;\nશિર કરવત મસ્તક પર મેલ્યું, પત્ની પુત્ર બેઉ તાણે... રામબાણ\n\nમીરાંબાઈ ઉપર ક્રોધ કરીને, રાણાજી ખડગ જ તાણે;\nવિષના પ્યાલા ગિરધર લાલે અમૃત કર્યા એણે ટાણે... રામબાણ\n\nમહેતા નરસિંહની હૂંડી સ્વીકારી, શામળશા બની ટાણે;\nઆગળ સંત અનેક ઓધાર્યા, એવું ધનો ભગત ઉર આણે... રામબાણ (૨૫૧)"
  },
  {
    "title": "379. ભરમે મત ભૂલો ગંગાધારે (૨૫૦)",
    "slug": "379-bharme-mat-bhulo-gangadhare",
    "authorSlug": "godad-bhagat",
    "category": "ગોદડ ભગત",
    "sortOrder": 379,
    "lyrics": "ભરમે મત ભૂલો ગંગાધારે, તમે પ્રેમથી બોલી લ્યો પ્યારા... (ટેક)\n\nનિત્ય ઊઠીને નાનારા બતાવે, અવડી મારી ધૂન લાવે\nસાંધો માસણ સાંધેલા પૂરા, પદધર ગુણ ગવડાવે... ભરમે મત ભૂલો\n\nખટશાસ્ત્ર ને અઢાર પુરાણા, ચોવીસ બ્રહ્માંડ વિસ્તારા\nચાર વેદ બ્રહ્માંના વદના, માહિલ ઊંડે મેં ન્યારા... ભરમે મત ભૂલો\n\nએકજ પાણી એકજ પરારા, એકજ નાણા કા વ્યાપારા\nએક સુરતમાં બેક્સ દેખા, એના રામકૃષ્ણ પુકારા... ભરમે મત ભૂલો\n\nએકજ વાણી દિલમાં રામાની, એકજ અવાજ એકધારા\nગોદડ કહે મહદ્ગુરુ ચરણો, સોઈ મહદ્ગુરુ અમારા... ભરમે મત ભૂલો (૨૫૦)"
  },
  {
    "title": "380. આજ મેરે આનંદ ભાયા (૫૦૨)",
    "slug": "380-aaj-mere-anand-bhaya",
    "authorSlug": "visram-bhagat",
    "category": "વિસરામ ભગત",
    "sortOrder": 380,
    "lyrics": "આજ મેરે આનંદ ભાયા, મેરે સદ્ગુરુ ને ભીતર ભેદ બતાયા... (ટેક)\n\nચોરંગ અંજલિ આપ લગાયા, સુરતા શૂન ઘર લાવ્યા\nઈંગલા પીંગલા આસન ઉપર, સુષુમણા ધ્યાન લગાયા... આજ મેરે\n\nઓહંકાર મેં રંગ મિલાયા, ત્રિકુટી તાર સંધાયા\nભમર ગુફા મેં ભમર ગૂંજત હે, અનહદ નાદ બજાયા... આજ મેરે\n\nશ્યામ સફેદ ને લાલ, પીળા રંગ પરછાયાં\nએ પાંચ સબ તત્વ કે પૂળા હે, ઈસ સે પર પ્રીતમ પાયા... આજ મેરે\n\nબાહિર ભીતર સબ ઘર દેખ્યા, દ્વૈત ભેદ મિટાયા\nકહે વિસરામ ભયા મન મગના, પ્રેમ ચરણ ગુણ ગાયા... આજ મેરે (૫૦૨)"
  },
  {
    "title": "381. સાધો દેખ અધર ઝળકારા (૫૦૩)",
    "slug": "381-sadho-dekh-adhar-zhalkara",
    "authorSlug": "visram-bhagat",
    "category": "વિસરામ ભગત",
    "sortOrder": 381,
    "lyrics": "સાધો દેખ અધર ઝળકારા, મહા ભેદ વેદ સે ન્યારા... (ટેક)\n\nસદ્ગુરુ મલીયા ને શબ્દ સુણાયા, તંત મલ્યા એક તારા\nહરદમ ધ્યાન લગા હરિ ધ્યાને, ભૂલ ગયા અપનામ ધારા... સાધો દેખ\n\nશૂન્ય શિખર પર ધ્યાન લગાયા, સોહં શબ્દ મેં પ્યારા\nઝળહળ જ્યોતિ નિશદિન ઝળકે, સાહેબ કે દરબારા... સાધો દેખ\n\nસૂરતે સૂરતે નિરખે જોતી, સોઈ સદ્ગુરુ કા પ્યારા\nગુરુજ્ઞાન વિના ખોજ ન પાવે, જુગારા થાય ખુવારા... સાધો દેખ\n\nકહે વિસરામ નૈન સે નિરખ્યા, સદ્ગુરુ પ્રેમ હમારા\nસેવક જાણી ચરણોમાં રાખ્યો, દરશન દિયો દિલદારા... સાધો દેખ (૫૦૩)"
  },
  {
    "title": "382. નર ગુણ ગાવે ને સદ્ગુરુ શું સમઝાવે (૨૫૩)",
    "slug": "382-nar-gun-gaave-ne-sadguru-shu-samjhave",
    "authorSlug": "visram-bhagat",
    "category": "વિસરામ ભગત",
    "sortOrder": 382,
    "lyrics": "નર ગુણ ગાવે ને સદ્ગુરુ શું સમઝાવે\nભક્તિ નો ભેદ ન લાવે, નર ગુણ ગાવે ને સદ્ગુરુ શું સમઝાવે... (ટેક)\n\nપ્રથમ પહેલાં ચિત્ત બતાવે, ભક્તિ નો ભેદ ન લાવે\nકરણ વચન મન કહે ત્યારે, અવગુણ લેવા શ્રાવ... નર ગુણ ગાવે\n\nપરમાર્થ માં પાછા પડાલા, કલર્વ મા અગરાવ\nવાવે નાહિ ને વારે ભગતને, છુટિલા બોલે ને બુસાવિ... નર ગુણ ગાવે\n\nમુખ થી વચન બોલે મીઠા, કૂડ કપટ મન કઢાવે\nનિર્મળ નર ની નોટી સરહારે, નુકર નામ ધારે ભાવ... નર ગુણ ગાવે\n\nકહે વિસરામ પ્રેમ કા આગાર, રહ્યાં પ્રેમ તણા પરવાને\nધરા ધરતી માં વસે ગુરુ જેવા, અવિચળ સ્થા બંધાણે... નર ગુણ ગાવે (૨૫૩)"
  },
  {
    "title": "383. મેરી નજરે મોતી આવ્યા (૪૦૩)",
    "slug": "383-meri-najare-moti-aavya",
    "authorSlug": "arjan-bhagat",
    "category": "અરજણ ભગત",
    "sortOrder": 383,
    "lyrics": "મેરી નજરે મોતી આવ્યા, બંધ મૂળ કી પાયા... (ટેક)\n\nવ્યાપમ સાહેબ કા રૂપ નિરખી, ત્રિકુટી તાડિયાં ઉઘાડ્યા\nચલ સુરતા દિયા સમાણમ્, સુષુમણા શેજ બિછાવ્યા... મેરી નજરે\n\nવ્યાખ્યાતીત થી ઉતર્યો મોતી, શૂન માં બ્રહ્મ સમાયા\nવાંકા રેંગ સફેત મુગટ લિ, ગુરુનામ મેં બતાયા... મેરી નજરે\n\nમોતી મહલમાં મનની મોતીમેં, શ્યોત માં જ્યોત મિલાયા\nવ્યાખ્યા વ્યવસ્થ પોષ વ્યાપાગ ઠા, દિલ ભાત હરશાયા... મેરી નજરે\n\nવરસ પરાય નહિં સપના, પરમ પુરુષ ગુણ ગાયા\nદાસ અરજણ ઉન ઘર પહોંચ્યા, સાહેબ પરિપૂરણ પાયા... મેરી નજરે (૪૦૩)"
  },
  {
    "title": "384. સુરતા શબ્દમાં કહી ગંગા ગંભીર સંતો ભાણે (૪૦૪)",
    "slug": "384-surta-shabdma-kahi-ganga-gambhir-santo-bhane",
    "authorSlug": "arjan-bhagat",
    "category": "અરજણ ભગત",
    "sortOrder": 384,
    "lyrics": "સુરતા શબ્દ માં કહી ગાડ ગંગા ગંભીર સંતો ભાણે, સંસાર સે સરસ સાધન... (ટેક)\n\nનાભિ કમળથી ઉઠશે વ્યાપિ ત્યારે કમળ કૂળની ભાંગ\nઅંબુમા બાણ હોવું હૃદય ઠેરાણ, તો વસ્તૂ મળે વણમાગી... સંસાર સે\n\nઉડાવ્યા પવનના પાશ કે તારા આવે, તેને કાળ મરણની લે ખાંતે\nનિજ સ્વરૂપ ને લે છે નિહાળી, ત્રણે હંસ સિદ્ધ સૂરતા સાંધી... સંસાર સે\n\nઆઠે પહોર ત્યાં અમૃત વરસે, તાણે સુષુમણા ધારે લ્યો સાધી\nઅનહદ ભૂમ પર આસન રાખ્યા, ત્યાં વ્યાપય પુરુષ રહે ધારી... સંસાર સે\n\nદાસ અરજણ ને સદ્ગુરુ કુંવરજી મળ્યા, ત્યારે ભવની ભાગી ભાંતિ\nઅજ્ઞાણ ટળ્યું સવ થાક ઉતાર્યા, ત્યારે અનુભવ કેવાં ગણાય... સંસાર સે (૪૦૪)"
  },
  {
    "title": "385. શ્વાસમાં છે વાસ પ્રભુનો (૨૬૦)",
    "slug": "385-shvasma-che-vas-prabhuno",
    "authorSlug": "dina-bhagat",
    "category": "દિના ભગત",
    "sortOrder": 385,
    "lyrics": "શ્વાસ ગાંતે છે વાસ પ્રભુનો, શ્વાસમાં છે વાસ પ્રભુનો\nતે માણે સેવે ખાસ, શ્વાસમાં છે વાસ પ્રભુનો... (ટેક)\n\nશ્વાસ દોરી તૂટ્યા પછી ક્યાં થાય છે વાસ\nતેની કરી જોજો તપાસ, તે જ જ્ઞાની ને તેજ દાસ... શ્વાસમાં છે વાસ\n\nઆ દિન કો મિથ્યા સપના, તેનો થયો અભ્યાસ\nવર્ષ અંધારા બેહવા ને, મૂડી ભોગ આશા... શ્વાસમાં છે વાસ\n\nસદ્ગુરુ ની જે કળા ને સમજાય, તેનો છૂટે ત્રાસ\nદિના ભગત કહે ગુરુ પ્રતાપે, સમજણ વિણ ફોકશ... શ્વાસમાં છે વાસ (૨૬૦)"
  },
  {
    "title": "386. ભાષાવાળા મારી ભલે રહેજો (૩૯૨)",
    "slug": "386-bhashavala-mari-bhale-rehjo",
    "authorSlug": "sukhram-bhagat",
    "category": "સુખરામ ભગત",
    "sortOrder": 386,
    "lyrics": "ભાષાવાળા મારી ભલે રહેજો\nરામ બાણ વાળા રે, દેવ દુવાડા વાળા રે... (ટેક)\n\nઆ કળિયુગમાં એવું કોણ ઉગારે, શબ્દ ભૂલ ભૂલ આપાશે\nવિધાન સંધ્યા દીણ વારે, નજર કરો નેવવાળા રે... ભાષાવાળા\n\nહું પણ ત્યાગી હવે હોદ્દો હેતથી, મૂળ ધર્મ ધાણા સે મેલ્યો\nજુગ વ્યાપ્યો હે વ્યા તો છેલ્લો, નજર કરો નેધવાળા રે... ભાષાવાળા\n\nપાપ પાંખડી સૌને પાડી, વખત પ્રમાણે તે બડી રેડી\nકોઈ ન વાધે ધર્મ ને હંડી, પાર કરો ધંડાવાળા રે... ભાષાવાળા\n\nસુખરામ કહે સન્મુખ વ્હાલા, મારો મુરબ્બો માની લીધો\nઅક્ષર વ્યાપે ને ભવ વહેમે, રામ અણુભવવાળા રે... ભાષાવાળા (૩૯૨)"
  },
  {
    "title": "387. રણઝણ રે રણઝણારા (૫૯૫)",
    "slug": "387-ranzhan-re-ranzhanara",
    "authorSlug": "sukhram-bhagat",
    "category": "સુખરામ ભગત",
    "sortOrder": 387,
    "lyrics": "રણઝણ રે રણઝણારા, સુણો કાઈ વાગા પ્યારા... (ટેક)\n\nધિરપ થી ધારણા ધારો, ચિત્ત ને ભોંયથી ગાયો\nઉરમ થી મૂળ ઉદ્ગારી, ગગન કે ઘાટે ગાયા... રણઝણ રે\n\nસિદ્ધાસન સાહેબ સો ઉરના, કુદરત હે મધ્ય મેં ધરના\nઘૂંઘર કી બાજે ઘંટા ઉરના, ક્ષણહી હે મુક્તિ કા દ્વારા... રણઝણ રે\n\nસાંનિધ્ય સંસારે કો ભારી, અનુભવ સે અસ વહેવારા\nરહે ત્યાં અખંડ વરનારી, મન સે અસ તને વાસા... રણઝણ રે\n\nનિર્મળ તીર ઉર પાક્સા, ઓરે તે તમોડી પ્યાસા\nસ્મરણ કી હોડ હે વ્યાપારી, તત્પર હો બ્રહ્મ સે તારા... રણઝણ રે\n\nઅમરી મહેલ હે આનંદકારી, ઘણેરી શોભા હે સારી\nચોગન પર વિરાજ મોરારી, સદ્ગુરુ તેજ અંજુઆરા... રણઝણ રે\n\nહરદમ સે રાજરી દેના, વ્યાપ્યા આપ આપ સેના\nહંસો હંસા ધામ મેં રહેના, સુખરામ કહે ઉરે દિદારા... રણઝણ રે (૫૯૫)"
  },
  {
    "title": "388. હરિ હરિજન વ્યાપાન કરી રૂપ તણો (૫૦૮)",
    "slug": "388-hari-harijan-vyapan-kari-rup-tano",
    "authorSlug": "akha-bhagat",
    "category": "અખા ભગત",
    "sortOrder": 388,
    "lyrics": "હરિ હરિજન વ્યાપાન કરી રૂપ તણો, સંત સંધ્યા તેનો સ્વરૂપ લિયા\nનિર્ગુણ બ્રહ્મ ને અણુઓ સંત જાણવા, જે મ વહની ત્રિપત થાય દિણ... (ટેક)\n\nઅગ્નિથી દિય દ્વારા ભઈ વ્યાપક ઠર્યો, દિપથી દિય તે થાય સહેલો\nજ્ઞાની ની માંહી તે જાણે ગોવિંદની, તેમાંથી બાગ વાન લેજો વહેલો... હરિ હરિજન\n\nઈશ્વર ઉપદેશ વ્યાપે ન મોટો કળા, ન થકી સંતનાં ઈન્દ્વ વિના\nસંભાળી રૂપ હોય વ્યાપ્તિ ઘણું, કો સદ્ગુરુ દેહ મન રોડ... હરિ હરિજન\n\nપ્રત્યક્ષ રામ તે તત્વવેતા વિશે, બ્રહ્મ કુંડળ વિશે કાન દિસે\nગગન વચન ઉર સંંત ને ભાવશે, વ્યાપા તેવું દ્વૈત દેખી મન નહિ જ હીંસે... હરિ હરિજન (૫૦૮)"
  },
  {
    "title": "389. અખાતમ એક છે હો (૩૩૭)",
    "slug": "389-akhatam-ek-che-ho",
    "authorSlug": "akha-bhagat",
    "category": "અખા ભગત",
    "sortOrder": 389,
    "lyrics": "અખાતમ એક છે હો, વ્યાપ વ્યાપક એક પાણ રે\nખારવા વણાયા પછી ઉત્તમ મધ્યમ, થઈ છે વાસના... (ટેક)\n\nપ્રભુ માત્રાય પર્યા સ્થિત અને કૂંપ નિ, દર્શન કર્યા છે અકળાર\nસાર પોતા માનું બુદ્ધિ જર્ક છે, ધાડ્યા ધાર આપણ પર... અખાતમ એક છે\n\nકાન ઈન્દ્રિય ય કૂંપમાં તપાસી, શું કરી હો તારવાના\nસાર જોતા શોધી અપડ છે, ગોળ સાંકર ની પાંડ... અખાતમ એક છે\n\nતપાસ કરવામા નહી નો નર છે, સુણે ગુરુના તાણ\nમહાબિંદુ માં થઈ મળિયા, નોર પહોચા ગીરવાના... અખાતમ એક છે\n\nડરતી ક્યા ડાહ્યા, ડરમાં પતંગ બુઝાગણ નાર\nગવાને ચાંડી કહ્યા કરે, બાંધા દેખાયું પાંપણ ભાણ... અખાતમ એક છે\n\nવ્યાપારી ને સદાય આપવાન, પ્રજ્ઞા માં ભાણ સારે\nકહે અખા વ્યાપા ભરમેં વ્યાપ્યા, કોઈક છૂટે ઉર્મે... અખાતમ એક છે (૩૩૭)"
  },
  {
    "title": "390. સમજુ સિદ્ધાંત ની સાર થઈ થા સુખી (૪૦૨)",
    "slug": "390-samju-siddhant-ni-sar-thai-tha-sukhi",
    "authorSlug": "akha-bhagat",
    "category": "અખા ભગત",
    "sortOrder": 390,
    "lyrics": "સમજુ સિદ્ધાંત ની સાર થઈ થા સુખી, બોસ પૂરો થઈ નિજ ભાણે... (ટેક)\n\nઉરામ ને મધ્યમ વાસન બહુ વિચર્યા, તે ભોગવિચાર નહિ શાન આણે\nપિંડ ને પિંડ ની હુત ઊંચા ધરા, ત્યાં બ્રહ્મ હંસ ક્રોધ હર્ષિ... સમજુ સિદ્ધાંત\n\nનિંદા ને સ્તુતિ સરખી ચાલે દિલમાં, વ્યાપે રે મન નું વલણ તેને\nત્રિગુણ કથના કનાર બહુ પરવ્યા, માણેક માળા નરબિંદુ મહેતા... સમજુ સિદ્ધાંત\n\nસત પાળતો વાત હરખ્યાનુ ને હસ્યા, પ્રહલાદ પડ્યો બહુ દીલવ કહેતો\nનાટક કે વ્યાપાર તેની દ્રષ્ટિ પીડા કરે, આરત ની વ્યાપ ની રીત ના હોય સવળી... સમજુ સિદ્ધાંત\n\nપથ્થર ધરાવતા જેમા પક્ષી ઉડી રહે, બ્રહ્મ જગતની રીત ના હોય સવળી\nઅખિલ ભગત ને બ્રહ્મ નિર્ગુણ કૃપા, ને શાંત વચન નો હંસ થાપો\nએ માયા વિલાસ નું પાપ નહિ ને વ્યાપ, વસ્તુ વિચાર કરી શાંતિ આપુ... સમજુ સિદ્ધાંત (૪૦૨)"
  },
  {
    "title": "391. ગરવા ગુરુ મળ્યા રે (૩૯૭)",
    "slug": "391-garva-guru-malya-re",
    "authorSlug": "akha-bhagat",
    "category": "અખા ભગત",
    "sortOrder": 391,
    "lyrics": "ગરવા ગુરુ મળ્યા રે, સંચિ વ્યાપ્ય ગિરણ દેવા... (ટેક)\n\nગિરધર વ્યાપન બ્રહ્મ બુદ્ધિવ નોં, તેનો વિરસામ નથી લંધ... ગરવા ગુરુ\n\nગુરુ ને મન વાણી આપ્રુમ નાહિ, સરપ્રાણા અણધૂન\nગુણ સાક્ષી નહિં પ્રણાના, સ્પર્શો નહિં પ્રયાણ... ગરવા ગુરુ\n\nસ્વામી ભગત ગુરુ ના વહે, થાયે પુરુષ હે ગિરાદાર\nઅક્ષય વ્યાપિપુ નહિ ગુરુ દાયુ, ને અરૂપ ની અક્ષારા... ગરવા ગુરુ\n\nસ્વ ભાવે સાક્ષી નો સહા, પ્રતિબિંબ પાંચી દેશ\nસામર્થ્ય તો સધાજે વડે, વ્યાપે સ્વાય વટે હીત પામ... ગરવા ગુરુ\n\nત્યાં મિલાવો વ્યાપ્યા માદેવી, કહે તે વ્યાપે મન અવિનાશ... ગરવા ગુરુ (૩૯૭)"
  },
  {
    "title": "392. એ ગુરુ સેવીયે રે એનું મૂળ (૫૦૫)",
    "slug": "392-e-guru-seviye-re-enu-mul",
    "authorSlug": "akha-bhagat",
    "category": "અખા ભગત",
    "sortOrder": 392,
    "lyrics": "એ ગુરુ સેવીયે રે એનું મૂળ, તોલ ન માપ\nગુરુને આદિ, અંત ન મધ્ય નહિં, તેને થાય ન ઉત્પાત... (ટેક)\n\nપ્રપંચ થકી પર રહ્યા, જેમ લીલ ભ્રમણે જ્યાપ્યા\nજડ હતું તે ગુરુ તણા, સંતોષે ચેતન થાય... એ ગુરુ સેવીયે\n\nગુરુનું નામ ઠામ ને ગામ નહિં, એવો સર્વ નો વિશ્વાસ\nઉત્પત્તિ સ્થિતિ લય ગુરુ વિશે, એ તો ઉડાવે બધાય અકાસ... એ ગુરુ સેવીયે\n\nગુરુ મારા નવ અવતરે, નવ ધરે ગર્ભવાસ\nઉપજે ને વણસે ખરો, એ તો માયાનો જ વિલાસ... એ ગુરુ સેવીયે\n\nગુરુ મહિમા સદાશિવ લહે, વળી સનકાદિક ને શેષનાગ\nશુદ્ધ વિચારે રહે અખા, ક્યારે ગુરુ કહે ગુરુ આપ... એ ગુરુ સેવીયે (૫૦૫)"
  },
  {
    "title": "393. સુરત સૂરત ચાલી શૂનમાં (૫૦૬)",
    "slug": "393-surat-surat-chali-shunma",
    "authorSlug": "akha-bhagat",
    "category": "અખા ભગત",
    "sortOrder": 393,
    "lyrics": "સુરત સૂરત ચાલી શૂનમાં, મહાધૂન માં મોહી\nબ્રહ્મ ચક્ષુ ઉઘાડા કરી, કળા હારમા જોઈ... (ટેક)\n\nનૂરીજન આગે નરડી, ખેલ નિરાધાર ખેલે\nસુરત ન ચૂકૈ સુંદરી, ધરણી પાવ ન મેલે... સુરત સૂરત\n\nતખત ત્રિવેણી ત્યાગી કરી, સદ્ગુરુ પર આયા\nનાથજી આગે નૃત્ય કરી, પદા અમર લખાયા... સુરત સૂરત\n\nગગન મંડળનાં ગોખમાં, અનહદ નાદ ધુરાયા\nભાણો વગાડે મીઠી મોરલી, અનભે ધર પિયાયા... સુરત સૂરત\n\nઅહં બ્રહ્મ ની સીડીએ, સન્મુખ ઉભા છે સ્વામિ\nકહે અખા ગુરુનાં દેશમાં, આપોઆપ અનામી... સુરત સૂરત (૫૦૬)"
  },
  {
    "title": "394. સદ્ગુરુ ચરણે જઈ રહું (૫૦૭)",
    "slug": "394-sadguru-charane-jai-rahu",
    "authorSlug": "akha-bhagat",
    "category": "અખા ભગત",
    "sortOrder": 394,
    "lyrics": "સદ્ગુરુ ચરણે જઈ રહું, વ્યા આપણ મુક્તિ ઉલ્લાસ\nસ્થૂળ સૂક્ષ્મ કારણ નહિં, નહિં મહાકારણમાં વાસ... (ટેક)\n\nપંચ કોષ પર જાઉં છું, અવસ્થા ત્રણથી અતીત\nસાક્ષી રૂપે દ્રષ્ટા થઈ રહ્યો છું, છે શુદ્ધ સ્વરૂપની રીત... સદ્ગુરુ ચરણે\n\nરવિ શશી ને ઠામ નહિં, નહિં કાળ કર્મ પ્રમાણ\nસોહં પદ પોતે સેવે, સેવે નારદ સનક સુજાણ... સદ્ગુરુ ચરણે\n\nશુદ્ધ સ્વરૂપ માં મહાલતા, સ્વરૂપ થાય સાક્ષાત્કાર\nવિધિ નિષેધ નો સંશય ટળે, મન વિલસે અહંકાર... કહે અખા સદ્ગુરુ ચરણે (૫૦૭)"
  },
  {
    "title": "395. વાણે ભાઈડા ભારે ભગતના (૩૯૪)",
    "slug": "395-vane-bhaida-bhare-bhagatna",
    "authorSlug": "harji-bhati",
    "category": "હરજી ભાઠી",
    "sortOrder": 395,
    "lyrics": "વાણે ભાઈડા ભારે ભગત ના, વાણે ભાઈડા ભારે\nબાર ભવન જોઈને સમજો, નકડું નેમ ધારી... (ટેક)\n\nધ્રુવ રામ ને અવિચળ વણાયું, પ્રહલાદ ને સદા પટ્ટારી\nસંધ્યા કાળે આપાને ગાયા, હરિ બેય પહોરે પધારી... ભગત ના\n\nતાંજી વાણી એ ગુણ ગર ગાયા, પંચમ દર્શનિયારી\nશૂન્ય દેશના નામ પ્રતાપે, ઉડત કડા નોંધ કરી... ભગત ના\n\nતારા દે નું સત રાખવા મિલિયા, ખડ્યા તા મોરારી\nમાલે દ્રૌપદ ની લજ્જા ઉગારી, આંતરડી સાંકડી ઉગારી... ભગત ના\n\nહડી પડે રામદેવ સાચું કહે છે, અક્ષય અવતારી\nહરિ ચરણે ભાઠી હરજી બોલ્યા, દિલ ધારી નેમ ધારી... ભગત ના (૩૯૪)"
  },
  {
    "title": "396. અનુભવ એવો રે અંતર વિને ઉદય થયો (૩૯૮)",
    "slug": "396-anubhav-evo-re-antar-vine-uday-thayo",
    "authorSlug": "nirant-maharaj",
    "category": "નિરાંત મહારાજ",
    "sortOrder": 396,
    "lyrics": "અનુભવ એવો રે અંતર વિને ઉદય થયો\nકૃત્ય ટળ્યા તેનાં રે, વળી તો એક આત્મા લહ્યો... (ટેક)\n\nઆત્મા દ્રષ્ટો તેને કહીએ, આવરણ નહિં લગાર\nસર્વાતીત તે સર્વ નો સાક્ષી, ખટ્લીસ નો નિરાધાર\nતેથી પર પોતે રે, એકા એકી આપ રહ્યો... અનુભવ એવો\n\nતે વાત કોઈ વિરલા જાણે, કોટિડ માં કાઈ એક\nનામ વિનાની વસ્તુ નિરખે, એ અનુભવ નો વિવેક\nમુક્તિ પદ માણે રે, દ્વૈતભાવ તિનો ગયો... અનુભવ એવો\n\nઅદ્વૈત પદ ની ઈચ્છા નહિં, અણ ઈચ્છા એ થાય\nયથાર્થ પદ જેને કહીએ, જેમ ઉપજે તેમ સમાય\nપ્રૌઢ પ્રવાહ વાળો રે, સંસાર મધ્યે વહ્યો... અનુભવ એવો\n\nજાગ્રત સ્વપ્ન સુષુપ્તિ, તુરીયાતીત પદ તેહ\nસ્થૂળ સૂક્ષ્મ ને કારણ કહીએ, મહાકારણ થી પર જેહ\nપરાત્પર વ પરખો રે, પિને નેત નેત વેદે કહ્યો... અનુભવ એવો\n\nહંસ હિતાર્થે બોલ્યા કહીએ, પરમ સત્ય સ્વરૂપ\nતે જનની હું બહુ બલિહારી, જે સદ્ગુરુ નું રૂપ\nનિરાંત નામ નિત્ય ને, અનામી નામે ભળ્યો... અનુભવ એવો (૩૯૮)"
  },
  {
    "title": "397. નામ જેણે જાણ્યું રે તે તો ચારે વેદ ભણ્યો (૩૯૯)",
    "slug": "397-nam-jene-janyu-re-te-to-chare-ved-bhanyo",
    "authorSlug": "nirant-maharaj",
    "category": "નિરાંત મહારાજ",
    "sortOrder": 397,
    "lyrics": "નામ જેણે જાણ્યું રે, તે તો ચારે વેદ ભણ્યો\nપણ ભેદ જેણે જાણ્યો રે, તે તો તરત ખરો બન્યો... (ટેક)\n\nબત્રીસ આભૂષણ અંગે ધરે નારી, નાક વિના શું શણગાર\nકહીએ જો વ્યાપનું વ્યાપ ન જાણ્યું, તે તો કેમ કરી ઉતરે પાર\nનારી ક્યાંથી મળશે ને, ભણ્યો ખરો પણ ના ગણ્યો... નામ જેણે જાણ્યું\n\nવાંઝણી નારીને સ્વપ્ન આવ્યું, પુત્ર નથી એની પાસ\nએમ ભજન દેખાદેખી કરે, તેની કેમ પૂરી થાશે આશ\nબાપ કોને કહેશે રે, વેશ્યા એ જે પુત્ર જણ્યો... નામ જેણે જાણ્યું\n\nનામ રૂપ ને ગુણ નો નાશ, ચોથું પદ તે અવિનાશ\nએ ચોથા પદ નો ભેદ જે જાણે, તેને કહીએ હરિ તણો દાસ\nનાશ કરી કર્મોનો રે, સંશય એક પળમાં હણ્યો... નામ જેણે જાણ્યું (૩૯૯)"
  },
  {
    "title": "398. જુગારા ને નવ જડે આરો ઉતરવાનો (૪૦૦)",
    "slug": "398-jugara-ne-nav-jade-aro-utarvano",
    "authorSlug": "nirant-maharaj",
    "category": "નિરાંત મહારાજ",
    "sortOrder": 398,
    "lyrics": "જુગારા ને નવ જડે આરો ઉતરવાનો, જુગારા ને નવ જડે આરો... (ટેક)\n\nઆ રે ભવસાગર તો જળનો ભરેલો, ઠામ ઠીક નો છે ખોટો\nકોટી કલ્પ લગી કોઈ તારે નહિં, એવો છે ભવનો ભુલાડી... જુગારા ને\n\nકાગ પતંગ ને બ્રહ્મા લંછ ભાળજે, ભાંગે નહિં ભવનો તારો\nઝાઝું શું કહીએ, જૂઠું ન માનશો, એવો છે પાપ નો પસારો... જુગારા ને\n\nશાકુંત નાં દર્શનથી દોષ ઘણો બેસે, ઓળખવો આત્મ હત્યારો\nહરિથી વિમુખ તેનો હાથ કોણ ઝાલે, શાકુંત નો સંગ નિવારો... જુગારા ને\n\nઆ રે સંસારમાં ગુરુ વિના કોણ છે, સહુ થી પ્રીત ગુરુ ધારો\nદેહ નાં ગુરુ એવા સર્વ ને જણાયે, પણ મનનો ગુરુ છે કંઈક ન્યારો... જુગારા ને\n\nમનનાં ગુરુ વિના ભૂલ નથી ભાંગતી, ભૂલે નામે છે ભવ તારો\nનિરાંત સદ્ગુરુ મનનાં મળે, તો પળમાં ઉગારે છે ભવપારથી... જુગારા ને (૪૦૦)"
  },
  {
    "title": "399. શ્વાસોશ્વાસ સ્મરણ કરને (૪૦૧)",
    "slug": "399-shvasoshvas-smaran-karne",
    "authorSlug": "nirant-maharaj",
    "category": "નિરાંત મહારાજ",
    "sortOrder": 399,
    "lyrics": "શ્વાસોશ્વાસ સ્મરણ કરને, તૂંહી તૂંહી કર તનમેં\nજ્ઞાન સદ્ગુરુ કી ધર સત્યારથ, દેખો દિલ દર્પણ મેં... (ટેક)\n\nસચરાચરમાં સોઈ બિરાજે, વ્યાપ આપ આપન મેં\nબ્રાહ્મ ભીતર એક નિરંતર, બાજે નાદ ગગન મેં... શ્વાસોશ્વાસ\n\nસાવત જાગત સૂરત સે ભાઈ, ભીતર રહો ભજન મેં\nલેહ લાગી તો તાર ન તૂટે, ઉઠ બેસે આસન મેં... શ્વાસોશ્વાસ\n\nપૂરણ પરબ્રહ્મ ભયા બ્રહ્મ કા, નામ લહ્યા નિર્ગુણમેં\nદાસ નિરાંત દયા સદ્ગુરુ કી, મગન ભયા હે મનમેં... શ્વાસોશ્વાસ (૪૦૧)"
  },
  {
    "title": "400. જૂઠા જૂઠા જગતના સગાઈ (૩૫૨)",
    "slug": "400-jutha-jutha-jagatna-sagai",
    "authorSlug": "ganpat-maharaj",
    "category": "ગણપત મહારાજ",
    "sortOrder": 400,
    "lyrics": "જૂઠા જૂઠા જગતના સગાઈ, વરસાડા ત્રિગુણ માયાના\nવંદું નામ રટો નર નાર, સંતો સંત સેવે સાધકની... (ટેક)\n\nપંચ તત્વ કોળાઈડી, ત્રિગુણ ત્રાંબા કો પસારા\nસદા તપોમય નિજ નામની રે, ખેડા સાહેબ અણહદ સુષુમણા... વંદું નામ\n\nતેજ તપોમય દ્રષ્ટા દાતા, પ્રેમ પહેલે પાચ\nલક્ષણ લહાણ બાવના રે, તેનાં રુદ ઉપર ઉઠી ભવ... વંદું નામ\n\nહર્ષ વાણી વ્યાપેલી રે, કાયા કૂડી અપરંપાર\nકામ ક્રોધ ને કામના માયા, સંશય દ્વિધા તે વાર... વંદું નામ\n\nકૃત પ્રસાદ લીવ લંગણ, સરસાઈ વાણ કહે મારે\nકરમ ની દોરી કૂટિયું રે, અક્ષર લહ્યાનો આણુસાર... વંદું નામ\n\nજ્ઞાન ધાણા શ્રેષ્ઠ વાણી રે, અવિચળ વ્યાપાર\nનિર્મળ નિશાન સાક્ષી રહ્યા રે, અક્ષર વ્યાપ્યા અણહદ... વંદું નામ\n\nઅણહદ વાણ વાણીયા, આનંદ બ્રહ્મ થાય\nકહે ગોવિંદ વ્યાપ્યા રે, ગુણ ગણપત વર્ણવે ગાય... વંદું નામ (૩૫૨)"
  },
  {
    "title": "401. ગાયા ગાયા ગામ છે જ્ઞાનિયા રે (૫૧૩)",
    "slug": "401-gaya-gaya-gam-che-gnaniya-re",
    "authorSlug": "ganpat-maharaj",
    "category": "ગણપત મહારાજ",
    "sortOrder": 401,
    "lyrics": "ગાયા ગાયા ગામ છે જ્ઞાનિયા રે, રૂપ માની સ્મરણ\nતપાસ નહિ તેના તનમાં રે, પરા ને પાછુ ડે હો... (ટેક)\n\nકોઈને ઉડ્યુ ડોળ સમળાયું, તે તો પરા ની પાછુ ની ભૂત\nનિસાડી શૂન્ય ને ભાઈ ને બાલા, સદા વહેતી સાહિત વાત... ગાયા ગાયા\n\nસંધ્યા ના નાદમાંહી તાર રાજ નોવ્યા, પૂછી બહુ વાહવાઈ\nશાસ્ત્ર પુરાણ કે શાસ્ત્રમાં લખ્યું કે તે કોઈ પૂછે નાહી... ગાયા ગાયા\n\nપવન શૂન્યમાં પૂંડિ રે તેવું કોઈ પૂછે નાહી\nવાહવાઈ વિદ્વાન વ્યાપી, તેનો ઓડ ન પામે પાર... ગાયા ગાયા\n\nકિડી ને ડુંગર સાપડ્યા, તેનો તત્વ તેવું વહે છે...\nબ્રહ્મ માત્રા વ્યાપું કે વ્યાપું, આત્મા કહે છે\nગણપત ગુરુ જ્ઞાન રે, શાસ્ત્ર કોઈ શોધે કે... ગાયા ગાયા (૫૧૩)"
  },
  {
    "title": "402. હૃદયે હિંમત ધરી મારા હરિજનો (૩૫૦)",
    "slug": "402-hrudaye-himmat-dhari-mara-harijano",
    "authorSlug": "ganpat-maharaj",
    "category": "ગણપત મહારાજ",
    "sortOrder": 402,
    "lyrics": "હૃદયે હિંમત ધરી મારા હરિજનો હૃદયે હિંમત ધરો... (ટેક)\n\nજેવું તે નો જરૂર જવાનું, વિધુલ વર નો વરીયે\nશિર વાઢે સદ્ગુરુ મળે, તો પાછી પૃષ્ઠ ન કરીયે... મારા હરિજનો\n\nહરિભવનમાં હિંમત રાખો, દુરિજન થી નવ ડરીયે\nમહાપંથ નો મારગ મિલી, અવર કામ નવ કરીયે... મારા હરિજનો\n\nસ્મરણ કરીએ સોહં રામનું, વેદ વચન ઉચરીયે\nભક્તિભાવ થી ભવદુઃખ ભાંગો, ભવસાગર ને તરીયે... મારા હરિજનો\n\nકામ ક્રોધ ને મમતા માયા, એને નવ અનુસરીયે\nજય અજંપા જુગતિ એ જપીએ, ધ્યાન ધણીનું ધરીયે... મારા હરિજનો\n\nઅમૃત રસ અખંડ વ્યાપી નો, ભેદ જાણી ને ભરીયે\nસદા બ્રહ્મ ભરપૂર ભર્યો છે, અનુભવ ને આદરીયે... મારા હરિજનો\n\nડાહ્યા કુંભ સરખી કાયા, ભાંગતા વાર ન જરીયે\nગોવિંદ ના ગુણલા ગાતા, ભવજળ પાર ઉતરીયે... મારા હરિજનો\n\nમનુષ્ય જન્મ મળ્યો છે મોંઘો, ફોગટ માંહી ન ફરીએ\nનાભિકમળથી વ્યાલી રે સુરતા, શ્વાસો શ્વાસ સમરીયે... મારા હરિજનો\n\nસાચા સંત સમાગમ કરીએ, વાણી વિમળ ઉચરીયે\nકહે ગણપત સદ્ગુરુ ને સેવો, પંથ બીજા પરહરીયે... મારા હરિજનો (૩૫૦)"
  },
  {
    "title": "403. આવો ને આતમરામ આપણો જ્ઞાન સાંભળીએ (૩૫૧)",
    "slug": "403-aavo-ne-aatmaram-aapno-gnan-sambhaliye",
    "authorSlug": "ganpat-maharaj",
    "category": "ગણપત મહારાજ",
    "sortOrder": 403,
    "lyrics": "આવો ને આતમરામ આપણો જ્ઞાન સાંભળીએ\nઓળી પ્રેમની રીત રૂડી પાળીએ... (ટેક)\n\nકરીએ સત્ય નો વિચાર, સતીયા હોય નર ને નાર\nસતે ચાલે છે સંસાર, સતે મેઘ વરસે ધાર... આવો ને આતમરામ\n\nપિત્તળ પીળું દેખાય જ્યારે સોના પાસે જાય\nઅગ્નિ તાવમાં તપાય ત્યારે એની કિંમત થાય... આવો ને આતમરામ\n\nભાંગે કદી સંધાય એનું મૂલ તેવું થાય...\n\nહીરા ઝવેરી ઘેર જાય, ક્યારે અરણ માં ઓળાય\nખમશે ઘણ કેરા ઘા, ત્યારે મૂલથી વેચાય... આવો ને આતમરામ\n\nજ્યારે સભાથી ભરાય, સાધુ સંત ભેળા થાય\nસત ની છાપ છપાય, ત્યારે ભક્ત કહેવાય... કહે ગણપત આ તમરામ (૩૫૧)"
  },
  {
    "title": "404. અગમ પંથ નિરવાળી મારા સંતો (૩૪૮)",
    "slug": "404-agam-panth-nirvali-mara-santo",
    "authorSlug": "ganpat-maharaj",
    "category": "ગણપત મહારાજ",
    "sortOrder": 404,
    "lyrics": "અગમ પંથ નિરવાળી મારા સંતો અગમ પંથ નિરવાળી રે... (ટેક)\n\nએક થકી અનેક બન્યા ભાઈ, સહુ પશુ પંખી ને પ્રાણી\nકર્મ સાંખ્ય બે યોગ કહાયા, વેદ ધર્મ પરમાણી... મારા સંતો\n\nપતિવ્રતા જેમ પતિ ત્યાગી ને, પરપુરુષે લુભાણી\nઘર ધર્મ એ જીવનો જાણી, પડે ચોરાશી ખાણી... મારા સંતો\n\nએક ગુરુ ને આપ જ ઈશ્વર, એક નામ નિશાની\nએક ટૅક ને આપ જ ધારે, સતભક્તિ સમરાણી... મારા સંતો\n\nપેય પરા ની પાર પ્રભુની, વિરલ વાતો જાણી\nઅજર અમર રસ કોઈ જન ગુરુવે, મરજીવા લે માણી... મારા સંતો\n\nસગુણ નિર્ગુણ થી ન્યારો, ગુણાતીત ગુણ આણી\nજે વસ્તુ જેનાથી ઉપજે, તે તો તેમાં સમાણી... મારા સંતો\n\nકોટી કલ્પ થી જન્મ મરણ છે, ઉર ભક્તિ ન આણી\nગુરુગમ વિના ગોથા ખાધા, મુવા મન ને તાણી... મારા સંતો\n\nઝળહળ જ્યોતિ નિરંતર ઝળકે, સુરતા ત્યાં ઠેરાણી\nમૂળાધાર થી બ્રહ્મરંધ્ર માં, પીવે ભરી ને પાણી... મારા સંતો\n\nઅકળ સકળ ઘટ વ્યાપક સંતો, પરખો પુરુષ પુરાણી\nકહે ગણપત સદ્ગુરુ ની સેવા, અખંડ ઉરમાં આણી... મારા સંતો (૩૪૮)"
  },
  {
    "title": "405. ક્ષમા ખડગ કર ધારી મારા હરિજનો (૩૪૯)",
    "slug": "405-kshama-khadag-kar-dhari-mara-harijano",
    "authorSlug": "ganpat-maharaj",
    "category": "ગણપત મહારાજ",
    "sortOrder": 405,
    "lyrics": "ક્ષમા ખડગ કર ધારી મારા હરિજનો ક્ષમા ખડગ કર ધારી... (ટેક)\n\nસત શમશેર જાનું બરછી, જ્ઞાન ઢાલ શબ્દગારી\nલક્ષ લગામ પ્રેમ પલાણ, ચિત્તનો ચાબુક મારી... મારા હરિજનો\n\nધીરજ ની ઢાલ ભજન નું ભાણું, સત નું બખતર સારૂ\nકાયા નગરમાં મન મેવાસી, વેગેથી વિદારી... મારા હરિજનો\n\nકામ ક્રોધ ને માયા મમતા, વેર તમારા વારો\nજિતી તો જગ જશ પામી, હારી તો નરકે સિધાવી... મારા હરિજનો\n\nવિચારમાં આયુષ્ય વહી જાશે, જીવનો શું ઉદ્ધારો\nક્ષણ જેવી પળ જાય છે વહી, ગુરુ નું જ્ઞાન વિચારી... મારા હરિજનો\n\nઆ ભવમાંહી આતમ આપ્યો, તેને તો ઉગારો\nકહે ગણપત ગોવિંદ ગાવ તો, આવે ભવનો આરો... મારા હરિજનો (૩૪૯)"
  },
  {
    "title": "406. જૂનો ધર્મ લ્યો જાણી મારા હરિજનો (૩૪૬)",
    "slug": "406-juno-dharm-lyo-jani-mara-harijano",
    "authorSlug": "ganpat-maharaj",
    "category": "ગણપત મહારાજ",
    "sortOrder": 406,
    "lyrics": "જૂનો ધર્મ લ્યો જાણી મારા હરિજનો, જૂનો ધર્મ લ્યો જાણી... (ટેક)\n\nનદી કિનારે કોઈ નય ઉભો, તરસ નહીં છિપાણી\nકાં તો આંધળું અંગ એનું, કાં તો સરિતા સુકાણી... મારા હરિજનો\n\nકલ્પતરુ તળે કોઈ જન બેઠો, ક્ષુધા ખૂબ પીડાણી\nનહિં કલ્પ એ નકડી બાવળીયો, કાં ભાગ્યરેખા ભુલાણી... મારા હરિજનો\n\nસદ્ગુરુ સેવ્યે શિષ્ય ન સુધર્યો, વિમળ મતિ નહીં આણી\nકાં ગુરુ જ્ઞાન વિનાનાં, કાં પામર એ પ્રાણી... મારા હરિજનો\n\nભક્તિ કરતા ભયદુઃખ આવે, ધીરજ નહિં ધરાણી\nકાં તો સમજણ રહી ગઈ છેટે, કાં નહિં નામ નિર્વાણી... મારા હરિજનો\n\nચિંતામણી તને આણી ને મળ્યો, તોય ચિંતા ન ઓલાણી\nનહિં ચિંતામણી નકડી એ પથરો, કાં વસ્તુ ન ઓળખાણી... મારા હરિજનો\n\nમળ્યું ધન તોય મોજ ન માણી, ડૂબુ કરમ ની કરાણી\nકાં તો ભાગ્ય ભૂખનું ભોગીયું, કાં તો ખોટી કમાણી... મારા હરિજનો\n\nઅમૃત મળ્યું પણ અમર થયો નહિં, અજ્ઞાની બુદ્ધિ ન જાણી\nકાં તો ઘટમાં ગાયું નહિં ને, કાં જીવવામાં આવ્યું પાણી... મારા હરિજનો\n\nધર્મ કર્મને ભક્તિ જાણી, ભેદ વિના ધૂળ ધાણી\nકહે ગણપત સમજી લ્યો સંતો, પૂરણ પ્રીત પરમાણી... મારા હરિજનો (૩૪૬)"
  },
  {
    "title": "407. મરજીવા રસ માણો મારા હરિજનો (૩૪૭)",
    "slug": "407-marjiva-ras-mano-mara-harijano",
    "authorSlug": "ganpat-maharaj",
    "category": "ગણપત મહારાજ",
    "sortOrder": 407,
    "lyrics": "મરજીવા રસ માણો મારા હરિજનો મરજીવા રસ માણો... (ટેક)\n\nકડવું દૂધ છે સિંઘણ કેરૂં, પીવાની ઈચ્છા આણો\nનિજ બાળક વિના ભોજન ભલે, પ્રાણ ત્યજે તે ટાણો... મારા હરિજનો\n\nમહારોગ છે જેનાં મનમાં, બૂઝ્યો રહે ભર્યા બાણો\nખાંડ ખાંડ કેરા સુખ તો ભાઈ, વિરલા લાડુ માણો... મારા હરિજનો\n\nગુરુગમ વિના ગોથા આવે, ભટકે પારસ પાણો\nહરિ હિરો રાખ્યો હૃદયમાં, એને લોઢું લખાણો... મારા હરિજનો\n\nજન્મ મરણનાં દુઃખ છે જબરા, પૂર્વ નાં પુણ્ય પ્રમાણે\nશાકુંત જુગારા એ શું સમજે, મુરખા મન ને તાણી... મારા હરિજનો\n\nસિદ્ધ માટે સદ્ગુરુ સેવો, પામો પદ નિર્વાણ\nકહે ગણપત ગુરુગમ જાણી, આણું ની ઓળખાણ... મારા હરિજનો (૩૪૭)"
  },
  {
    "title": "408. પોંછ વાંછ પ્રભુ નહિં મલે (૪૦૫)",
    "slug": "408-ponch-vanchh-prabhu-nahi-male",
    "authorSlug": "ukram-bhagat",
    "category": "ઉકરામ ભગત",
    "sortOrder": 408,
    "lyrics": "પોંછ વાંછ પ્રભુ નહિં મલે, પોંછે આપ શરીર\nશબ્દ ગુરુ ના ન હોડિયે, સંસાર નહિં આણે ગિર... (ટેક)\n\nઆરે અજંપાનું ઘડી પલનું, પ્રભુ બંધાશે રાગ\nભક્તિ વિના ભાંડ કોણ પહોંચે, જીવને થાશે ઉતપાત... પોંછ વાંછ\n\nધર્મ મંગળ વ્યાપ્યા ગુરુ તપોવે નામે ગર્વ ગુણદાહાર\nમાયા ને વલોણે હટ્યો, અસ્ત થયો રે યુવાર... પોંછ વાંછ\n\nવિષય ધન કટોરે શું વધ્યું, ગણાય નહિં ગણાણા\nકર્મનો કટોર ટળ્યો નહિં, બહુ વિધ થયા ધાર... પોંછ વાંછ\n\nનિર્મળ ગુણગાન ત્યારે વાધોશે, થાશે અનુભવ રોગ\nકહે ઉકરામ ગુરુરામ મલ્યે, થાશે કોટી કલ્યાણ... પોંછ વાંછ (૪૦૫)"
  },
  {
    "title": "409. મારા સદ્‌ગુરુની લાગી મને પ્રીતુ (૫૨૪)",
    "slug": "409-mara-sadguruni-lagi-mane-pritu",
    "authorSlug": "shambhu-ram",
    "category": "શંભુ રામ",
    "sortOrder": 409,
    "lyrics": "મારા સદ્‌ગુરુની લાગી મને પ્રીતુ, મને સમજાણી રૂડી રીતુ ... (ટેક)\n\nસંસારમાં ચેતી લેજો મારા ભાઈ, એવો અમૂલખ વખત વહ્યો જાય\nજે જે જીતા નહીં જાય હારી, મારા સદ્‌ગુરુ લેશે તારી ... મારા.\n\nબુદ્ધિ આપામાં વિચારી, મનખા જન્મ નહિં મળે વારંવાર\nકરી લ્યો પૂર્વ ની કમાયુ, માથે એક ધણીને ધારી ... મારા.\n\nમોંઘો દેહ મનુષ્ય અવતાર, એમ સંતો કરે પોકાર\nઆમાં ભજન કરી લ્યો મારા ભાઈ, ભવો ભવનાં દુઃખ જાય ... મારા.\n\nપ્રેમ પ્રકાશથી તમે જાગો, સદાય સંત ચરણ તમે માંગો\nદાસ શંભુ ગુણ ગાવે સદ્‌ગુરુનાં, ચિત્ત રાખજો સંત ચરણોમાં ... મારા. (૫૨૪)"
  },
  {
    "title": "410. સમજણ વિના સુખ નહિં મનને (૫૨૫)",
    "slug": "410-samjan-vina-sukh-nahi-manne",
    "authorSlug": "shambhu-ram",
    "category": "શંભુ રામ",
    "sortOrder": 410,
    "lyrics": "સમજણ વિના સુખ નહિં મનને, ભલે કરી કોટી ઉપાય\nઅવિદ્યા વસે જેનાંગોમાં, તેને કેમ સમજાય ... (ટેક)\n\nધ્યાન ધીરજને ધારણા, હોય જેને આઠે પહોર આનંદ\nઅડગ પ્રીતિ જેની ડગે નહિં, હોય ભજનમાં ભરપૂર ... સમજણ.\n\nસત્સંગ વિના મન ફરે ઘૂમતુ, તેને કેમ સમજાય\nસમરથ સદ્‌ગુરુ જે મળે, પલમાં પાર પહોંચાય ... સમજણ.\n\nઅજ્ઞાન અંધારુ જેનું ટળી ગયુ, હોય જેને પ્રેમનાં પ્રકાશ\nજ્ઞાન સ્વરૂપી ભાણ જેને પ્રગટ્યા, હોય જેને અખંડ ઉજાસ ... સમજણ. (૫૨૫)"
  },
  {
    "title": "411. ભજન કરી લ્યો મારા ભાયલા (૧૨૧)",
    "slug": "411-bhajan-kari-lyo-mara-bhayla",
    "authorSlug": "shambhu-ram",
    "category": "શંભુ રામ",
    "sortOrder": 411,
    "lyrics": "ભજન કરી લ્યો મારા ભાયલા, અવસર એળે વહ્યો જાય ... (ટેક)\n\nસદ્‌ગુરુ નાં વચન વિચારજો, ધરી લ્યો ધણી નું ધ્યાન\nઆનંદ ઉપજે આપણા અંગમાં, ટળી જાય ત્રિવિધી નો તાપ ... ભજન.\n\nસમજી વિચારી ભાઈઓ ચાલજો, એકાંતે કરજો આરાધ\nમૂળ રે વિનાનું ડાયા ગાડડુ, પડતા નહિં લાગે વાર ... ભજન.\n\nમોંઘી રે વસ્તુ મનુષ્ય દેહ ની, મોટા ભાગ્યે પમાય\nસ્મરણ કરી લો ગુરુદેવનું, સહેજે પાર પહોંચાય ... ભજન.\n\nદૂંગર બન્યા છે આડા મોહનાં, ઝટપટ નહિં સમજાય\nઉગારામ ચરણો શંભુ ગાવે, સદ્‌ગુરુ ઉતારે ભવપાર ... ભજન. (૧૨૧)"
  },
  {
    "title": "412. ભજન કરી લ્યો મારા ભાયલા, પળ એક વ્યર્થ ન જાય (૧૨૨)",
    "slug": "412-bhajan-kari-lyo-mara-bhayla-pal-ek-vyarth-na-jay",
    "authorSlug": "shambhu-ram",
    "category": "શંભુ રામ",
    "sortOrder": 412,
    "lyrics": "ભજન કરી લ્યો મારા ભાયલા, પળ એક વ્યર્થ ન જાય ... (ટેક)\n\nકમાઈ વિના નાં નર ફુડા દિસે, ઠાલા કરે રે પોકાર\nભક્તિ વિના નર હસે ભટકતા, ભૂલી ગયા છો કરાર ... ભજન.\n\nમોહ માયા નાં મદમાં, તું ફરતો દિવસ ને રાત\nહાથે કરી તું હારી બેઠો, આ અમૂલખ અવતાર ... ભજન.\n\nસમજણ વિના સુખ નહિં જીવને, ભલે ભટકે દી ને રાત\nસુખરે મલે સત્સંગમાં, કોઈ વિરલા મલે સંત ... ભજન.\n\nમોહ રે માયા જે ને વ્યાપે નહિં, હોય જેને દૃઢ વૈરાગ્ય\nગુરુ ચરણો નાં વિશ્વાસી શંભુ, મિથ્યા શ્વાસ ન જાય ... ભજન. (૧૨૨)"
  },
  {
    "title": "413. રૂડી કાયાવાન કૂડા શું બોલો (૩૨૨)",
    "slug": "413-rudi-kayavan-kuda-shu-bolo",
    "authorSlug": "nathu-ram",
    "category": "નથુ રામ",
    "sortOrder": 413,
    "lyrics": "રૂડી કાયાવાન કૂડા શું બોલો, વચ્ચે નહિ તારો ઘણિયારી ... (ટેક)\n\nરૂડી કાયા ને કૂડી માયા, જૂઠું મન કી મમાયા\nઅંતકાળે ગુમાવી આપું એકલું, મરમ કોઈએ ન પાયારે ... રૂડી.\n\nક્યારે ભલાભાણ વહેલા વળશો, આપને ને ભૂલમાં ભમણાં સેં\nસાચા હંસલા ની સાક્ષ્ય બાળી, પિયાને પ્રીતિ બંધાણા શે ... રૂડી.\n\nક્યાંય પદાર્થ મોંઘું પાયા, ભજન કરી લ્યો ગુરુદેવનાં\nકુટુંબ ને ધન ધન લક્ષ્મી, એ સબ કે તારી સેવાનોંક ગુણ ... રૂડી.\n\nક્યારે અજ્ઞાની કૂડ નર વહી ગયા, હરણ ઘોડાનાં અસવારા\nધાર આત્મ ગુણ ગાય નથુરામ, અહિયાં નથી કોઈ રહેનારા ... રૂડી. (૩૨૨)"
  },
  {
    "title": "414. અમને અમારી કાયા રે તણો નહિં વિશ્વાસ (૩૨૩)",
    "slug": "414-amne-amari-kaya-re-tano-nahi-vishvas",
    "authorSlug": "jethi-ram",
    "category": "જેઠી રામ",
    "sortOrder": 414,
    "lyrics": "અમને અમારી કાયા રે તણો નહિં વિશ્વાસ\nઅમને અમારી દેહું રે તણો નહિં વિશ્વાસ\nપારકા નાં અવગુણ રે, દિલડામાં નવ આણીએ ... (ટેક)\n\nનેવા તારા નમીયા, ભીંતુ એની ગળવા લાગી\nગળવા લાગી મંદિરીયા ની પછોત ... પારકા.\n\nનવ તોરી નગરી હેજી શોભા એની અજબ બની રે\nએમાં અવળા સવળા મળીયા રે માંડેલ હાટ ... પારકા.\n\nહંસારામ હાલ્યા, પીંજર એનાં પડ્યા રહ્યા રે\nમેલી હાલ્યા સરોવરીયા ની પાળ ... પારકા.\n\nગુરુ નાં પ્રતાપે રે જેઠીરામ બોલીયા રે\nજેઠીરામ અતર રે ગંગાજી નાં દાસ ... પારકા. (૩૨૩)"
  },
  {
    "title": "415. અમારામાં અવગુણ રે, ગુરુજી માં ગુણ ઘણા રે (૩૨૪)",
    "slug": "415-amarama-avgun-re-guruji-ma-gun-ghana-re",
    "authorSlug": "jethi-ram",
    "category": "જેઠી રામ",
    "sortOrder": 415,
    "lyrics": "અમારામાં અવગુણ રે, ગુરુજી માં ગુણ ઘણા રે\nઅમારા તે અવગુણ સામું, નવ જોશો રે ... (ટેક)\n\nગુરુ મારા દિવો રે, ગુરુ મારા દેવતા રે\nગુરુ મારા પારસમણી નો તોલ રે ... અમારા.\n\nગુરુ મારા ગંગા રે, ગુરુ મારા ગોમતી રે\nગુરુ મારા કાશી ને કેદાર રે ... અમારા.\n\nગુરુ મારા તરાપા રે, ગુરુ મારા તુંબડા રે\nએ તુંબડીયે ઉતરવું ભવપાર રે ... અમારા.\n\nમળીડા મેલાવી રે, ગુરુગમ જ્ઞાન નાં રે\nએ મળીડે મરણ ફેરો જાય રે ... અમારા.\n\nગુરુ નાં પ્રતાપે રે જેઠીરામ બોલીયા રે\nજેઠીરામ અતર રે ગંગાજી નો દાસ રે ... અમારા. (૩૨૪)"
  },
  {
    "title": "416. નિશ્ચે કરી રામનું નામ (૩૨૯)",
    "slug": "416-nishche-kari-ramnu-nam",
    "authorSlug": "narbhe-ram",
    "category": "નરભે રામ",
    "sortOrder": 416,
    "lyrics": "નિશ્ચે કરી રામનું નામ, નથી કંઈ ભગત થઈ ને જાવું\nનથી ભેખ ભગાવો કંઈ કરવો, કે નથી ભીખ કરીને ખાવું ... (ટેક)\n\nશર્મ તો તમે ભગવા કરો, કે શર્મ તો ઉજળા રાખો\nરખે દુભાવો સામા જીવને, સુખ સામાનું જુઓ ... નિશ્ચે.\n\nએક ત્રાજવે સૌ સંસારી, બીજાં જોખી લાવો\nક્યા જોગીને રામજી મળિયા, એવો એક બતાવો ... નિશ્ચે.\n\nકંઈક નાંધા રાંડો ને રિઝે, કંઈક ને ન મળી નારી\nકોઈ સ્વાદે, કોઈ કરજે નાઠ્યા, કેમ રીઝે ગિરધારી ... નિશ્ચે.\n\nમહેતો, મીરા ને પ્રહલાદ, સેની નાયક જાતિ\nધનો, પીપો, રોહિદાસ, કુંભા, ગોરો કુંભારની જાતિ ... નિશ્ચે.\n\nબોડાણા જાતિ રજપૂતની, ગંગાબાઈ છે નારી\nદાસ થઈ ને જે રહ્યા તો, ઘેર આવ્યા ગિરધારી ... નિશ્ચે.\n\nરાંકા બંકા સજ્જન કસાઈ, ભજ્યા રાત ને દહાડો\nક્યા જોગી ને રામજી મળિયા, એવો એક દેખાડી ... નિશ્ચે.\n\nનથી મળતા રામ વિભૂતિ ચોળ્યે, નથી ઊંચી શિર ઝોળ્યે\nનથી નારી ત્યાજી વન જતા, જ્યાં લગી આપ ન ઓળખે ... નિશ્ચે.\n\nજંગલ માં મંગલ કરી જાણે, મંગલ જંગલ જેને\nકડવું મીઠું, મીઠું કડવું, રામજી વશ છે તેને ... નિશ્ચે.\n\nપય ઓધે જેમ ધૃત રહ્યુ છે, તલ ઓધે જેમ તેલ\nકહે નરભો રઘુવર છે સઘળે, એવો એનો ખેલ ... નિશ્ચે. (૩૨૯)"
  },
  {
    "title": "417. નથી મૂતિકામાં પ્રભુ (૩૩૦)",
    "slug": "417-nathi-mutikama-prabhu",
    "authorSlug": "narbhe-ram",
    "category": "નરભે રામ",
    "sortOrder": 417,
    "lyrics": "નથી મૂતિકામાં પ્રભુ, નથી પિત્તળ માં પેઠો\nકનક ની મૂર્ત કરી, નથી માંહી ઈશ્વર બેઠો\n\nનથી ધીરી માં પીર, નથી શ્રાવક ને દેરે\nઆ અસલ જુવે નહિં કોઈ, બહુ નકલો ને ઘેરે\n\nછે રામનામ અક્ષર અસલ, બીજું નકલ કહેવાય છે\nનરભો કહે સદ્‌ગુરુ થકી, પ્રેમથી પ્રગટ થાય છે. (૩૩૦)"
  },
  {
    "title": "418. આત્મા સ્વરૂપને અનુભવ મન (૪૦૯)",
    "slug": "418-aatma-swarupne-anubhav-man",
    "authorSlug": "garib-das",
    "category": "ગરીબ દાસ",
    "sortOrder": 418,
    "lyrics": "આત્મા સ્વરૂપને અનુભવ મન, સદ્‌ગુરુ શબ્દનું સોધણ સાધ્યું\nતત્ત્વમસી પદ અર્થ વિચારી, ભૂલ્યા આપણ પોતે પાયું ... (આત્મા)\n\nપૂર્ણ આનંદ ત્યાં સર્વ વ્યાપંક, પૂરણ આનંદ કાઈ હદ ન આવું\nઅમૃત રસ નો આહાર બનાવે, સૂક્ષ્મ તંબુરા તે કેમ ઝાલી ... આત્મા.\n\nબુદ્ધિ નોં દહમાં ભાવ લ્યો તારી, શ્રુતિ સ્મૃતિ આય પૂર\nક્રોધ ને મારી આત્મા પ્રજાળી, તત્વ લ્યો કોઈ સંત સૂરિ ... આત્મા.\n\nચિત્ત - લાગિ - લય, નાત રૂપેલ, પંચ ભૂતે લાગી કાયા\nઆદિ નિરંજન તણો છે આત્મા, નામ, રૂપ તે તણો માયા ... આત્મા.\n\nતિણ અવસ્થાતીત છે આત્મા, અખંડ અછેદ તસકર નાહી\nબ્રહ્મ દર્શન કોઈ સંત કુળમાં, બ્રહ્મ નો દિલમાં ભાવ આણો ... આત્મા.\n\nધર્મ નાં મૂળ તે મર્મ ન સમજે, શુદ્ધ સમજ્યા વિના ક્રીતિ ન થાશે\nદાસ ગરીબ કહે સદ્‌ગુરુ સેવા, અણછતા દુઃખ ની ભાંગે ... આત્મા. (૪૦૯)"
  },
  {
    "title": "419. શંભુ ચરણો પડી, મીંઢુ ઘાલો રે ઘાલી કસ્ટ કાપો (૨૫૯)",
    "slug": "419-shambhu-charno-padi-mindhu-ghalo-re-ghali-kast-kapo",
    "authorSlug": "shankar-das",
    "category": "શંકર દાસ",
    "sortOrder": 419,
    "lyrics": "શંભુ ચરણો પડી, મીંઢુ ઘાલો રે ઘાલી કસ્ટ કાપો\nદયા કરો શિવ દર્શન આપો ... (ટેક)\n\nતમે ભક્તોનાં ભય હરનારા, શૂલ સંગ સહા કરનારા\nહું તો મૂઢ અજ્ઞાન, મારી અકલ અલ્પ, કસ્ટ કાપો ... દયા.\n\nઅનંત બ્રહ્મ અજ્ઞાનની બોલો, કાંઈ અણભૂત ટોળી\nલાભ લીધું ધર્યો કંઈક શિષ્ય બન્યો, અવગુણ વ્યાપો ... દયા.\n\nનેતી નેતી જ્યાં વેદ કહે છે, મારું ચિતડું ત્યાં ધાવા ચડે છે\nસાચા નગરમાં છે તું, બસ તારામાં હું, શક્તિ આપો ... દયા.\n\nહું તો એકલ પંથી પ્રવાસી, છતા વ્હાલા કેમ ઉદાસ\nધાડિયા ગયેલ રે ગયા, કાટલા કડવું નહીં, ભોજન આપો ... દયા.\n\nઆપો દ્રષ્ટિ માં તેજ આપણું, સારી સૃષ્ટિ માં શિવરૂપ દેખું\nમારા મનમાં વસો, આપો હૃદયે દયાળુ, શાંતિ સ્થાપો ... દયા.\n\nશંકર દાસ હું તવ કિંંકર, નિત્ય સેવાનું શુદ્ધ સુફળ આપો\nરાખો મેં મતિ ગાળો ગર્વ આપો, સંત ચરણો આપો ... દયા. (૨૫૯)"
  },
  {
    "title": "420. પેદા સરવે પાણી, આ તો નામ તણી નિશાની (૨૬૧)",
    "slug": "420-peda-sarve-pani-aa-to-nam-tani-nishani",
    "authorSlug": "pitha-das",
    "category": "પીઠા દાસ",
    "sortOrder": 420,
    "lyrics": "પેદા સરવે પાણી, આ તો નામ તણી નિશાની\nહાંસો મારો ગુરુજી ની ગતિ નવ જાણી ... (ટેક)\n\nપ્રથમ ધરતી સૃષ્ટિ રચાવી, મહેસા પવન ઓળખાણી\nગણપત ગણેશ સ્મરીએ પેલા, બ્રહ્મા વેદ પુરાણી ... હાંસો.\n\nગણપતિ દાદા એ માંડ બનાવ્યો, ચંપા મરવો ને ચમેલી\nકાળી કુંકડી કેવડો અવળ કોઈ દિવ્ય કુંવરડી ... હાંસો.\n\nએક હી કુંભ લાલ હિરા, લીલા મોતી વર્ણમલી\nએક કુંભની વાસના આપણી, હરિરસ વિરલો અકળ પિવાની ... હાંસો.\n\nસંત સાધુ ની સેવા કરી લે ભાઈ, કંઈક દેશ વંદી નિશાની\nસબળ પરિબળ આપશે, તને નહિં થાક ફરવાની ... હાંસો.\n\nતારા પાપની તું પત રાખજે, સવડાઈ તિ સંભાળી\nસદ્‌ગુરુ ચરણે પીઠા દાસ, અનામ તણી ઓળખાણી ... હાંસો. (૨૬૧)"
  },
  {
    "title": "421. પ્રીતમ વર ની જુરે બુંદડી રે (૫૯૮)",
    "slug": "421-pritam-var-ni-jure-bunddi-re",
    "authorSlug": "mool-das",
    "category": "મૂળ દાસ",
    "sortOrder": 421,
    "lyrics": "પ્રીતમ વર ની જુરે બુંદડી રે, મહાસંતો ઓઢવા ને મળીયા\nજે ઓઢે રે અમર રહેવે, અકળ કળામાં થઈ ભળીયા ... (ટેક)\n\nધર્મ નામ ભેળી લઈ કરી, હરિનામ અમલખ ખેતરીયા\nધીરજ ની ધરતી ખેડીયુ, રણુકારે રોપડીયા ... પ્રીતમ.\n\nપવન સ્વરૂપે મેહુલા ઉઠીયા, વરસે વૈરાણ ની વાદળીયુ\nગગન ગરજે ને ગોષ્ઠી પીવે, સોઈ દશા ચમકે વિજળીયુ ... પ્રીતમ.\n\nવિચાર કરીને વણા વવાલીયુ ને, મન તો મુનીવર નુ મળીયુ\nઆનંદ સ્વરૂપે ઉગી રહ્યુ, ડાળ ફુલડે બહુ ફળીયુ ... પ્રીતમ.\n\nવિવેક થી વણા લીછ્યુ ને, સીતારામ બરખે વડીયુ\nકુબુદ્ધિ કપાસીયા કોરે કર્યા, પ્રેમની પૂણીયુ પછી વણીયુ ... પ્રીતમ.\n\nનિર્મલ નિર્મલ કાંટીયુ, સુરતા તાણે એ તાણીયુ\nતુરીયાતીત નું વણા દોહ્યુ, સુરતાની નળીયુ ભરીયુ ... પ્રીતમ.\n\nજ્ઞાનેરી સદ્‌ગુરુ નાં નામની, એ સંતનાં સંથે હવે વડીયુ\nજ્ઞાન ને ધ્યાનનાં ખૂંટા ભર્યાં, વણનાર બહુ એ બળીયા ... પ્રીતમ.\n\nસોય લીધી ગુરુનામ તણી, દશનામ દોરો પરોવીયો\nસંગ દ્રષ્ટિ થી સીલી બુંછડી, નીત રંગ સવાયો ચડીયો ... પ્રીતમ.\n\nધૂસળ મૂસળ ને રેંટીયો, સાદ શરીરનો ને ખીરડો\nપ્રપંચનાં કીધા પિંજણા, સુક્ષ્મણા પહોંચે ત્યાં મળીયા ... પ્રીતમ.\n\nમન નો માંડવ નાખ્યો, ગુણ તો નાથ સાહેલીયુ\nમાયાનો માણેક સ્તંભ રોપીયો, ખમૈયા ની ખારકેુ વહેંચાણી ... પ્રીતમ.\n\nગુરુદેવ કન્યાદાનમાં દીધા, ભક્તિ મુક્તિ બે ગાવડીયા\nપરણાવ્યા પરિબ્રહ્મ ને, નારદ વેદ લઈ ભણીયા ... પ્રીતમ.\n\nહરદમ રથ લઈ ને જોડ્યા, એ રથ અહોનિશ બડીયા\nગુરુ નાં પ્રતાપે મૂળદાસ બોલ્યા, હવે રથ વૈકુંઠ વળીયા ... પ્રીતમ. (૫૯૮)"
  },
  {
    "title": "422. અજ્ઞાની નર ચેતોને (૨૭૫)",
    "slug": "422-agnani-nar-chetone",
    "authorSlug": "mool-das",
    "category": "મૂળ દાસ",
    "sortOrder": 422,
    "lyrics": "અજ્ઞાની નર ચેતોને, આ છે કલ્લી સાંધિ ની ચાકર રે\nઅવળું ન પ્રસરવું વહેલા, વહેલી ભાવ માં લાવા ને ... (ટેક)\n\nકુદરત ની શક્તિ ને નિર્મલ રહેવું, ત્યાં શું કરશે કળીકાલ\nબંધન વશ ની શક્તિ હોંશા, ત્યાં શું કરશે કળીકાલ રામ ... અજ્ઞાની.\n\nભક્તિ નો વિશ્વાસ ની રે, ભાઈ હરિ સંતોની સેવા\nસંતની સેવા કિં કોઈ કરશે, ભાઈ દર્શન સૂક્ષ્મ થઈ પાશે ... અજ્ઞાની.\n\nઈન્દ્ર ઈન્દ્ર રે મારા સાઈ ગુરુદેવ નો, ઈન્દ્ર હરિ ભક્ત ને ઉતારો પાર\nસંતો ની સાહેબ સ્વરૂપ જાણી, તમો છો તારણહાર ... અજ્ઞાની.\n\nમૂળદાસ કહે મહારાજ મોટા તમો, ભક્તિ ને કરી લ્યો અવતાર ... અજ્ઞાની. (૨૭૫)"
  },
  {
    "title": "423. સત્સંગ વિના મન સમજે નહિં (૨૭૬)",
    "slug": "423-satsang-vina-man-samje-nahi",
    "authorSlug": "mool-das",
    "category": "મૂળ દાસ",
    "sortOrder": 423,
    "lyrics": "સત્સંગ વિના મન સમજે નહિં, સૂરતા ભલે નિગમ પર જાય ... (ટેક)\n\nજેમ રવિ રવિ ઉદયે રજની નહિં ટકે, ઉગે ત્યારે અંધારા મરી જાય\nરવિ રે ઉગ્યા જેને જ્ઞાનનાં, એલી વહે અજવાળા હોય ... સત્સંગ.\n\nજળ જળ પીધે તૃષ્ણા નાંહ ટકે, ભોજન નામ લીધે ભાંગે નહિં ભૂખ\nરામરસ પીધે તૃષા તુરત ટકે, એલી વહે મુકિત પળા હોય ... સત્સંગ.\n\nસો સો મણ અગ્નિ લખ્યો કોરા કાગળે, એને લઈ રૂ માં દયો બલચાઈ\nઅગ્નિ સ્થાને રૂ દાઝે નહિં, રતિ એક પાલકે જલી જાય ... સત્સંગ.\n\nસમજણ વિના સાધન શું કામનું, ક્યાં સુધી જવયણુ ન જાય\nકહે રે મૂળદાસ સંત સમજ્યા ખરા, ગુરુ વિના મુક્તિ ન થાય ... સત્સંગ. (૨૭૬)"
  },
  {
    "title": "424. સપનામાં સૂતારે જન તમે જાગજો (૨૭૭)",
    "slug": "424-sapnama-sutare-jan-tame-jagjo",
    "authorSlug": "mool-das",
    "category": "મૂળ દાસ",
    "sortOrder": 424,
    "lyrics": "સપનામાં સૂતારે જન તમે જાગજો, તારો જનમ પદાર્થ જાય રે\nઆવો દેહ રે દુર્લભ મોટા દેવને, પૂરણ ભાગ્ય હોય તો પમાય ... (ટેક)\n\nવરાવડા પ્રેરેલ છે વાટની, વાટે ને ધારે વિલંબ ન કીજીએ\nસતે ને હુતે વિન નહિં થાય, એતો અણસતીયા કહેવાય ... સપના.\n\nકાયા ને માયા રે મિથ્યા કરી જાણજો, સંઘાથે નહિં આવે સાથ\nજાણો છો પોતાનુ પણ આ છે પારકું, ભાઈ પુત્ર ને પરિવાર ... સપના.\n\nજેમ પરદેશી પરોઢલા આવ્યા ઘર આંગણે, એને વાય રે સ્વદેશી વાય\nશરીવર ને તરૂવર પંથે પરમાર્થી, ભાઈ ખપે તે વારી ને ખાય ... સપના.\n\nનદીઓ સંઘરે નીર પોતા તણાં, ભાઈ નીર તો નવાણે જાય\nમાટે આયખુ અર્પો ને, પર ને ખોળીએ ભજીએ શ્રી ભગવાન ... સપના.\n\nઆત્મા ને પરમાત્મા એક કરી જાણજો, ભાઈ દયા સમુ નહિં દાન\nથોતે રે પોઢ્યા રે પરાગવડ ને પાંદડે, પંખીડા વસે દીનું પાસ ... સપના.\n\nકાળ ને કબાડી આવ્યો જ્યારે કારમો, ત્યારે નિત્ય નિરંતર લેને પ્રભુનામ\nશબ્દ ને સાંભળી સંતો તમે ચાલજો, એવા મહાજન કહે છે મૂળદાસ ... સપના. (૨૭૭)"
  },
  {
    "title": "425. જગતમાં જ્ઞાની ને વિદ્વાન નાં વહેવાર જુદા છે (૨૮૧)",
    "slug": "425-jagatma-jnani-ne-vidvan-na-vahevar-juda-che",
    "authorSlug": "lal-das",
    "category": "લાલ દાસ",
    "sortOrder": 425,
    "lyrics": "જગતમાં જ્ઞાની ને વિદ્વાન નાં વહેવાર જુદા છે\nવધુ વિચારતા તો એ મોક્ષ નાં માર્ગ જુદા છે.\n\nવિષય છે વિદ્યા નો, એ ગમે તેને મળી જાય\nપરંતુ જ્ઞાનનાં એ તત્વનાં અભ્યાસ જુદા છે ... જગત.\n\nન વાતો એ વડા થાય, કરે મહેનત તે ફળ જાય\nપરંતુ વાત થી એ વસ્તુનાં, સ્વાદ જુદા છે ... જગત.\n\nઅમર આનંદ નાં ભોગી, અલગ રહેતા ઉપાધિ થી\nઉપાધિ વહેતાં એ નર તણા, આધાર જુદા છે ... જગત.\n\nનહિં આડંબરી કરતા, નહિં કોઈ સ્થાન પણ ધરતા\nવાયુ સમ વિશ્વ વિચરનારા તણાં વહેવાર જુદા છે ... જગત.\n\nનહિં આડંબરોમાં કે નહિં કોઈ વિદ્વતામાં છે\nઅભણ ને પણ જો તેવા, સુગમ સિદ્ધાંત કૂદા છે ... જગત.\n\nભણો પુરાણ કે પોથી, વેદ વેદાંત કે શ્રુત\nપરંતુ જ્ઞાનનાં એ તત્વનાં અભ્યાસ જુદા છે ... જગત.\n\nન એથી મોક્ષ તો થાયે, અધોગતિ કિલરી થાયે\nકહે છે લાલ જગતમાં, જ્ઞાની નાં પંથ જુદા છે ... જગત. (૨૮૧)"
  },
  {
    "title": "426. આવી પળ હવે રે કરી લેને બંદગી (૨૮૨)",
    "slug": "426-aavi-pal-have-re-kari-lene-bandagi",
    "authorSlug": "lal-das",
    "category": "લાલ દાસ",
    "sortOrder": 426,
    "lyrics": "આવી પળ હવે રે કરી લેને બંદગી\nગઈ પળ ફેર નહિં આવે રે ... કરી લે (ટેક)\n\nકર મન જ્ઞાના, ધરી લે ધ્યાના\nમૃગજળ દેખી મૃગલા ધાવે રે ... કરી લે.\n\nશિર પર વેરી કાળ લેશે તને ઘેરી\nસુતારે બંદા, તને નિંદ્રા કેમ કરી આવે રે ... કરી લે.\n\nકર મન બંદગી, જાય જો જિંદગી\nપ્રભુ ને ભજે ભય પણ ભાગે રે ... કરી લે.\n\nદેખા મન મરના, છોડાનંદ ઘરના\nમુખે ઉત્તર એક નહિં આવે રે ... કરી લે.\n\nકહે લાલદાસ તમે ભજો ભગવાનના (લાલ કહે તમે, ભજો ભગવાનના)\nસમજુ ને તો શું સમજાવુ રે ... કરી લે. (૨૮૨)"
  },
  {
    "title": "427. પ્રથમ ગુરુ ને ગોવિંદ કરી ભણો (૫૧૯)",
    "slug": "427-pratham-guru-ne-govind-kari-bhano",
    "authorSlug": "pritam-das",
    "category": "પ્રીતમ દાસ",
    "sortOrder": 427,
    "lyrics": "પ્રથમ ગુરુ ને ગોવિંદ કરી ભણો, બીજા ભાવ કશો ઉરમાં ન આણો\nપૂર્વે પ્રસન્ન થાય છે પ્રાણો, તો બોલનહારા ને જાણજો રે ... પ્રથમ.\n\nબોલતા પુરુષની બુઝણી વાતો, સમજ્યામાં સંત બતાવે એંધાણી\nપલકમાં ભેટાડે પુરુષ પુરાણ, તો તન મન ધન તેને અર્પો રે ... પ્રથમ.\n\nજીવ તણું ગુરુ ભેખમ ટાળે, ખટ ચક્ર વેધી ચડાવે માળે\nત્રિવિધી તાપ ગુરુ તરત ટાળે, ને ભેટાડે સાતમી ભૂમિકા ... પ્રથમ.\n\nરવિ શશી વિના મારે અંજવાળું લાગ્યું, નિર્ભય નાણાનું ઉઘડ્યું ખાનું\nધનવંતા ધણીનું સ્વરૂપ વખાણું, તો જ્યાં જોઉં ત્યાં વ્હાલો વડે રે ... પ્રથમ.\n\nઠામ નથી દિસતો કોઈ ઠાલો, સ્થાવર જંગમ વ્યાપક વ્હાલો\nપાંચ પચીસ પ્રકૃતિ ને ટાળો, તો વ્હાલો નથી કંઈ વેગળો ... પ્રથમ.\n\nઘર જડ્યું થર - મેડી રે જડી, સંતનાં શબ્દે ગુરુગમ પડી\nલાલચ મેલી વ્હાલા સાથે લડી, તો ત્રિવેણી નાં તીર્થમાં રે ... પ્રથમ.\n\nગગન ગુફાનાં ગોખમાં બેઠા, અહં સોહં શબ્દ બોલે છે મીઠા\nદશમે દ્વારે દામોદર બેઠા, તો ભવ કડી જીવ - શિવની રે ... પ્રથમ.\n\nઅનુભવ ઉગ્યો મારે થયું અજવાળું, અગમ અગોચર ઘર લાધ્ય સરુ\nકહે પ્રીતમ સદ્‌ગુરુ ને સંભાળું, જો અણછતો આપમાં ઓચરે રે ... પ્રથમ. (૫૧૯)"
  },
  {
    "title": "428. હરિભજન થકી છોટા હોય (૫૨૦)",
    "slug": "428-haribhajan-thaki-chhota-hoy",
    "authorSlug": "pritam-das",
    "category": "પ્રીતમ દાસ",
    "sortOrder": 428,
    "lyrics": "હરિભજન થકી છોટા હોય, તે સૌથી મોટા થાય છે\nત્રણ તાપ ટળે, જન્મ મરણનાં સંકટ સર્વે જાય છે ... (ટેક)\n\nજુઓ દાસી સુત થી શું હિણપણું, જેનું પુણ્ય પવિત્ર ચરિત્ર થણું\nથયા નારદ મન ગોવિંદ તણું ... હરિ.\n\nજુઓ શુકદેવજી નું મૂળ શોધી, જાતિ તે પશુ રોધી\nથયા વ્યાપે ઈશ્વર અબુદ્ધિ ... હરિ.\n\nજુઓ વાલ્મીકિજી ની વાત ખરી, જેણે દર્ણશાળા દેહ ધરી\nતેણે સપ્ત કોટી રામાયણ કરી ... હરિ.\n\nજુઓ માંડવ ની મેડકી માતા, જુઓ વસિષ્ઠ વેશ્યા વિખ્યાતા\nત્યાં ચતુરાનન પંડજ બના ... હરિ.\n\nજુઓ અગસ્ત કુંભ થી પ્રગટ થયા, અંજલી માં સાગર શોષી ગયા\nતે તો વિશ્વ વિષે વિખ્યાત થયા ... હરિ.\n\nમહાસ્ટ પામ્યા વિના હેત કોનિ મળ્યા, ત્યારે કૃપાનાં સાધુ થયા શોધન\nવરાહ વૈષ્ણવ વિશિ વિરસાને હોય બહુ, પાળનારા સંસારી વિરોધન ... હરિ.\n\nધ્રુવ પ્રહલાદ લોચન બસ નિર્દોષ! વિદુર કુંવર કાલિંદ દુલિયા\nવસુદેવ દેવકી નંદુ પરમેશ્વરી, બડલ પ્રજાવત દુઃખ આપ્યા ... હરિ.\n\nતારા દંપતી હરિશ્ચંદ્ર તારામતી, કમળાદ અર્પય કાલિ સંકટ\nનરસિંહ મહેતા ને યાદવ મોરા બની, પ્રથમ પડા પછી સુખની દ્રષ્ટિ ... હરિ.\n\nવ્યાધ્ર વ્યાધિ વિ્યાધ કુકસી માધવાદિક, શિવ કપાસી વિદ્યા વિખ્યાત\nભગવાનની ભક્તિ દિવ્ય કસ્તુર મધ્યે, પાપ વળા તાપ તેને પ્રણમ વંદે ... હરિ.\n\nસંદિપન વિદ્યાણ પ્રગટ કરી નવલ, તેવિ ગય તાપ વ્યાપ નહિં છે\nવ્યસાન હાટ હરિ હેતુ ન સમજાયુ પદ, પ્રગટ વિદ્યા સરવે તે પડે છે ... હરિ.\n\nછે ઉત્તમ માર્ગ એ પાપને પુણ્ય છે, નહાવું પંથ પર જાગત નાહ્યા\nદયા પ્રીતમ કૃપા વિના, પરા દાસ નાહિં, પણ ન લોકોને સમજાય જ્ઞાન જાય ... (૫૨૦)"
  },
  {
    "title": "429. જો કોઈ પ્રેમ અંશ અવતરે (૩૨૫)",
    "slug": "429-jo-koi-prem-ansh-avtare",
    "authorSlug": "pritam-das",
    "category": "પ્રીતમ દાસ",
    "sortOrder": 429,
    "lyrics": "જો કોઈ પ્રેમ અંશ અવતરે, પ્રેમરસ તેનાં ઉરમાં ઠરે ... (ટેક)\n\nસિંહણ કેરું દૂધ હોય, તે સિંહણ ભવનને ઝલે\nકનક પાત્ર વિણ પાખે, તો ફોડી ને નીસરે ... જો કોઈ.\n\nસક્કર ખોર નું સાકર જીવન, ખર નાં પ્રાણ હરે\nક્ષાર સિંધુ નું માછલડું જેમ, મીઠા જળમાં મરે ... જો કોઈ.\n\nસોમવલ્લી - રસપાન શુદ્ધ, જે બ્રાહ્મણ હોય તે કરે\nબગવંશીને વમન કરાવે, વેદ વાણી ઉચ્ચરે ... જો કોઈ.\n\nઉત્તમ વસ્તુ અધિકાર વિના મળે, તદપિ અર્થ ના સરે\nમરછ ભોતી બગલો, મુક્તાફળ દેખી ચંચુ ના ભરે ... જો કોઈ.\n\nએમ કોટી પ્રકારે પ્રેમ વિના, પુરુષોત્તમ નહિં મળે\nદયા પ્રીતમ શ્રી ગોવર્ધનધર, પ્રેમ ભક્તિ ને વરે ... જો કોઈ. (૩૨૫)"
  },
  {
    "title": "430. પ્રગટ મળે સુખ થાય, નટવર (૩૨૬)",
    "slug": "430-pragat-male-sukh-thay-natvar",
    "authorSlug": "pritam-das",
    "category": "પ્રીતમ દાસ",
    "sortOrder": 430,
    "lyrics": "પ્રગટ મળે સુખ થાય, નટવર પ્રગટ મળે સુખ થાય ... (ટેક)\nઅંતરયામી અખિલમાં છે, તેથી કહો કોનું દુઃખ જાય ... નટવર.\n\nતેલ વિના બહુ જ તલ પૂરેથી, દિયક કેમ પ્રગટાય\nપ્રગટ પાવક વિના કાષ્ટ નો ભેટ, કઈ પેરે ગીત સમાય ... નટવર.\n\nપૃથ્વી ઘાટે તૃષા ટળે નહિં, અંતર જળ શ્રુતિ ગાય\nઅગ્નિ નાં પાષાણ સ્પર્શ થી, જ્વાલા નવ જણાય ... નટવર.\n\nસુરભી પેટમાં પય તેમાં ધૃત, સુરભી થી તૃપ્તિ ન પમાય\nદોહી મથી માખણ તાવી, ઘી ખાધ્યે સુખ થાય ... નટવર.\n\nવ્યાપક થી વાતો ન થાય, તેથી જીવ અકળાય\nરસિયા જન મનરંજન નટવર, દયા પ્રીતમ વ્રજરાય ... નટવર. (૩૨૬)"
  },
  {
    "title": "431. સંતકૃપા થી છૂટે માયા (૨૮૩)",
    "slug": "431-santkrupa-thi-chhute-maya",
    "authorSlug": "pritam-das",
    "category": "પ્રીતમ દાસ",
    "sortOrder": 431,
    "lyrics": "સંતકૃપા થી છૂટે માયા, કાયા નિર્મળ થાય જેને\nશ્વાસે શ્વાસે સ્મરણ કરતા, પાંચે પાતક જાય જેને ... (ટેક)\n\nકેશરી કેરે નાદે નાસે, કોટી કુંજર યુધ જેને\nહિંમત હોય તો પોતે પામે, સઘળી વાતે સુખ જેને ... સંત.\n\nઅગિન ને ઉધઈ ન લાગે, મહામણી ને મેલ જેને\nઅપાર સાયર મહાજળ ઊંડા, મર્મી ને મન સહેલ જેને ... સંત.\n\nબાજીગર ની બાજી એ તો જંબુરો ભણે જેને\nહરિની માયા બહુ બળવંતી, સંતો પાસે હારે જેને ... સંત.\n\nસંત સેવતા સુકૃત વાધે, સહેજે સીધે કાજ જેને\nપ્રીતમ નાં સ્વામિ ને ભજતા, આપે અખંડ રાજ જેને ... સંત. (૨૮૩)"
  },
  {
    "title": "432. હરિનો મારગ છે શૂરાનો (૨૮૪)",
    "slug": "432-harino-marag-che-shurano",
    "authorSlug": "pritam-das",
    "category": "પ્રીતમ દાસ",
    "sortOrder": 432,
    "lyrics": "હરિનો મારગ છે શૂરાનો, નહિં કાયર નું કામ જેને\nપ્રથમ પહેલું મસ્તક મૂકી, વળતુ લેવું નામ જેને ... (ટેક)\n\nસુત વિત દારા શીશ સમર્પે, તે પામે રસ પીવા જેને\nસિંધુ મધ્યે મોતી લેવા, માંહી પડ્યા મરજીવા જેને ... હરિનો.\n\nમરણ આગમે તે ભરે મુઠ્ઠી, દિલની દુગ્ધા વામે જેને\nતીરે ઉભા જુએ તમાસો, તે કોડી ન પામે જેને ... હરિનો.\n\nપ્રેમ પંથ પાવક ની જ્વાળા, ભાળી પાછા ભાગે જેને\nમાંહી પડ્યા તે મહાસુખ માણે, દેખનહારા દાઝે જેને ... હરિનો.\n\nમાથા સાટે મોંઘી વસ્તુ, સાંપડશે સહેલ જેને\nમહાપદ પામ્યા તે મરજીવા, મૂડી મન નો મેલ જેને ... હરિનો.\n\nરામ અમલમાં રાતા માતા, પુરા પ્રેમી પરખે જેને\nપ્રીતમ નાં સ્વામિની લીલા, ને રજની દિન નિરખે જેને ... હરિનો. (૨૮૪)"
  },
  {
    "title": "433. અબ સોંપ દિયા, ઈસ જીવન કા (૨૮૫)",
    "slug": "433-ab-somp-diya-is-jivan-ka",
    "authorSlug": "tulsi-das",
    "category": "તુલસી દાસ",
    "sortOrder": 433,
    "lyrics": "અબ સોંપ દિયા, ઈસ જીવન કા, સબ ભાર તુમ્હારે હાંથો મેં\nહે જીત તુમ્હારે હાંથો મેં, ઓર હાર તુમ્હારે હાંથો મેં\n\nમેરા નિશ્ચય બસ એક યહી, એકબાર તુમ્હે પા જાઉ મેં\nઅર્પણ કર દુ દૂનિયાભર કા, સબ પ્યાર તુમ્હારે હાંથો મેં\n\nજો જગમેં રહુ તો એસે રહુ, જહ્યું જલમેં કમલ કા ફૂલ રહે\nમેરે સબ ગુણ દોષ સમર્પિત હો, કિરતાર તુમ્હારે હાંથો મેં\n\nયદી માનવકા મુજે જન્મ મિલે, તો તવ ચરણો કા પૂજારી બનુ\nઈસ પૂજન કી એક એક રગડા, હો તાર તુમ્હારે હાંથો મેં\n\nજબ જબ સંસાર કા કેદી બનુ, નિષ્કામ ભાવ સે કર્મ કરુ\nફિર અંત સમય મેં પ્રાણ ત્યજુ, સાકાર તુમ્હારે હાંથો મેં\n\nમુજમેં તુજમેં બસ ભેદ યહી, મેં નર હૂં તુમ નારાયણ હો\nમેં હૂં સંસાર કે હાંથો મેં, ઓર સંસાર તુમ્હારે હાંથો મેં. (૨૮૫)"
  },
  {
    "title": "434. અપરંપાર પ્રભુજી અવગુણ મારા (૨૮૬)",
    "slug": "434-aparambar-prabhuji-avgun-mara",
    "authorSlug": "tulsi-das",
    "category": "તુલસી દાસ",
    "sortOrder": 434,
    "lyrics": "અપરંપાર પ્રભુજી અવગુણ મારા, માફ કરોને મોરારી રે ... (ટેક)\n\nદયા ધરમની વાત ન જાણુ, અધર્મ નો હું અધિકારી\nથાપી પુરો હું જૂઠાબોલો, બહુ નિરખુ પરનારી ... અપરંપાર.\n\nભજન થાએ ત્યાં નિંદા આવે, પરનિંદા બહુ પ્યારી\nમિથ્યા સુખમાં હું આનંદ વર્તુ, એવી કુટીલ કુબુદ્ધિ મારી ... અપરંપાર.\n\nસાધુ દુભવ્યા મેં બ્રાહ્મણ દુભવ્યા, ભક્ત દુભવ્યા ભારી\nમાત પિતા બંને ને દુભવ્યા, ગરીબ કો દિની ગાલી ... અપરંપાર.\n\nઆ ભવસાગર મહાજળ ભરીયો, ભરીયો છે બહુ ભારી\nતુલસીદાસ ગરીબ ની વિનંતી, હવે તો લેજો ઉગારી ... અપરંપાર. (૨૮૬)"
  },
  {
    "title": "435. આનંદ હેલી ઉભરાણી સંતો (૨૮૮)",
    "slug": "435-anand-heli-ubharani-santo",
    "authorSlug": "bhadur-das",
    "category": "ભાદુર દાસ",
    "sortOrder": 435,
    "lyrics": "આનંદ હેલી ઉભરાણી સંતો, આનંદ હેલી ઉભરાણી ... (૨૮૮)\nચંદ્ર સૂરજ વો ઘર નાહિ, નહિં પવન, નહિં પાણી\nઅષ્ટકુળ પર્વત ઉસ ઘર નાહિ, નહિં વેદ નહિં વાણી ... આનંદ.\n\nસોહમ વચન ને સાધી ને બેઠા, નિર્ગુણ જાત જણાણી\nઅધર તખત પર આપ બિરાજે, પોતે પુરુષ પુરાણી ... આનંદ.\n\nનૌતમ નાથ નિરંતર નિરખ્યા, નૂરત મેં સુરત સમાણી\nઆ ઘટમાં પેઠ્યા, સન્મુખ દેખ્યા, સદ્ગુરૂ કેરી નિશાની ... આનંદ.\n\nમોટા જાણી, ભ્રાંતિ ભાંગી, મિટ ગઈ ચારિય ખાણી\nરામદાસ ચરણે ભણે ભાદુરદાસ, અલખ ની થઈ ઓળખાણી ... આનંદ."
  },
  {
    "title": "436. વસ્તુ વિરલે વખાણી સંતો (૨૮૯)",
    "slug": "436-vastu-virle-vakhani-santo",
    "authorSlug": "bhadur-das",
    "category": "ભાદુર દાસ",
    "sortOrder": 436,
    "lyrics": "વસ્તુ વિરલે વખાણી સંતો વસ્તુ વિરલે વખાણી ... (૨૮૯)\nડોરી બાણ મારી ભીતર પ્રગટ્યા, આ તો અગમ ઘર ની એંધાણી\nઆનંદ ઉપજયો, અલબેલા જોયા, ખરી થઈ ઓળખાણી ... વસ્તુ.\n\nઅજાતિ પદ મારા ગુરૂએ બતાવ્યુ, જ્યાં જાત ને ભાત સમાણી\nઆદિ ને અંત, મધ્ય એકેય ન મળે, અલખ પુરુષની નિશાની ... વસ્તુ.\n\nનાભિ કમળ થી આનંદ ઉલટ્યો, અચાનક લહેર ઉભરાણી\nબ્રહ્મગુફા નાં ભેદ જ્યારે ભાંગ્યા ત્યાં જઈ સુરતા ઠેરાણી ... વસ્તુ.\n\nજેને સદ્ગુરૂ પુરા નથી ભેટ્યા, તેનું સર્વે થયુ ધૂળ ધાણી\nધડ ઉપર જેને મસ્તક ન મળે, તેણે આ વસ્તુ માણી ... વસ્તુ.\n\nઆ ઘટમાં હરિ સભર ભર્યો છે, માંયલો મરમ લીધો જાણી\nરામદાસ ચરણે ભણે ભાદુરદાસ, લહેરમાં લહેર સમાણી ... વસ્તુ."
  },
  {
    "title": "437. મેં અલમસ્ત ફકીર સંતો ભાઈ (૨૯૦)",
    "slug": "437-mem-alamast-fakir-santo-bhai",
    "authorSlug": "bhadur-das",
    "category": "ભાદુર દાસ",
    "sortOrder": 437,
    "lyrics": "મેં અલમસ્ત ફકીર સંતો ભાઈ, મેં અલમસ્ત ફકીર ... (૨૯૦)\nમેં પીર કહાવુ, મેં પીરન કા પીરા\n\nનિરાધાર રમું શૂનમાં, સબ સે ફિરૂ એકિલા ... મેં.\n\nસબ ઘટ મેં ઉલટ મેં સમાડું, સબ ઘટ મેં હંસા મેરા\nહમ તો આવુ નહિં ને જાવુ નહિં, અગમ ઘર મેં દઉ ડેરા ... મેં.\n\nનખ થી શિખ સુધી નૂર પ્રગટ્યા, વહાં મેં જ્ઞાન ગંભીરા\nશૂન ઘર શહેર અને શહેર માં વસ્તી, તેથી હમ છે ન્યારા ... મેં.\n\nસ્વચ્છ ન્યારા મૌલા હુમેં હરિ હુમેં સકલ પસારા\nરામદાસ ચરણે ભણે ભાદુરદાસ, ખુદ લાલ નબી સે મોટો ફકીરા ... મેં."
  },
  {
    "title": "438. મન કરી લે ને વિચાર (૨૯૧)",
    "slug": "438-man-kari-le-ne-vichar",
    "authorSlug": "ganga-das",
    "category": "ગંગા દાસ",
    "sortOrder": 438,
    "lyrics": "મન કરી લે ને વિચાર, જીવન થોડા રે\nતારા હરિકથા ની માંય, કાન છે ખોડા રે\nઅંતે જશો જમપુરી માંય, ખાશો તોડા રે ... તેથી રામનામ સંભાર (ટેક)\n\nમોર મુકુટ શિર પર ધર્યો, દર્પણ કર મોઝાર\nવેઢ વીંટીયું હાર ગળામાં, ખૂબ ધર્યો શણગાર ... પગમાં તોડા રે ... મન.\n\nહસ્તી ઉપર ઢલક અંબાડી, ખમા કરે છડીદાર\nરથ માંચડા નાં ઉંટ પાલખી, કહેતા ન આવે પાર ... ચડવા ઘોડા રે ... મન.\n\nલોભ ન મૂકે કામ ન મૂકે, ઘર ધંધા ની માંય\nમૂરખ મનવા કાંઈ ન સૂઝે, નિગમગમની માંય ... પાવ છે ખોડા રે ... મન.\n\nસંસાર સાગર મહાજળ ભરીયો, રામનામ કી જહાજ\nગંગાદાસ કો જ્ઞાન બતાયા, રામદાસ મહારાજ, ખરાની વેળા રે ... મન."
  },
  {
    "title": "439. મળ્યો મનુષ્ય અવતાર માંડ કરીને રે (૨૯૨)",
    "slug": "439-malyo-manushya-avtar-mand-karine-re",
    "authorSlug": "ganga-das",
    "category": "ગંગા દાસ",
    "sortOrder": 439,
    "lyrics": "મળ્યો મનુષ્ય અવતાર માંડ કરીને રે\nતે તો ભજ્યા નહિં ભગવાન હેત કરીને રે\nતેથી ખાશો જમનાં માર પેટ ભરી ને રે, માટે રામનામ સંભાર (ટેક)\n\nગઈ પલ પાછી ફેર નહિં આવે, મૂરખ મૂઢ ઘેમાર\nભવસાગર ની ભૂલવણી માં, વિતી ગયા જુગ ચાર ... ફેરા ફરી ને રે ... મળ્યો.\n\nજઠરાગિન માં જુરીતે રાખ્યો, નવ માસ નિરધાર\nજુક્તિ કીધી અલબેલાની, બહાર થયો અવતાર, માયામાં મોહીને રે ... મળ્યો.\n\nકળિયુગ કૂડો રંગે રૂડો, કહેતા ન આવે પાર\nજપ તપ તીરથ કાંઈ ન કીધુ, એક નામ આધાર, કૃષ્ણ કહીને રે ... મળ્યો.\n\nગુરુગમ પાયો મન મેં સરાયો, જુક્તિ કરી જાદુરાઈ\nગંગાદાસ કો જ્ઞાન બતાયી, રામદાસ મહારાજ, દયા કરીને રે ... મળ્યો."
  },
  {
    "title": "440. સમજણ ની બે વાતુ વરસે (૨૯૩)",
    "slug": "440-samajan-ni-be-vatu-varse",
    "authorSlug": "purshottam-das",
    "category": "પુરષોત્તમ દાસ",
    "sortOrder": 440,
    "lyrics": "સમજણ ની બે વાતુ વરસે, જેમ સાગરમાં સ્નાનું\nજીવડા ભળજે રે , આ છે સમજણ ની બે વાતુ ... (૨૯૩)\n\nઅગ્નિ માં નાખવાથી ઓગળી જાય છે, લોખંડ જેવી ધાતુ\nકઠણ કાળજુ હોય કદાપી, ભલપ થી ભીંજાતુ ... જીવડા.\n\nઅમૃત ભોજન પીરસો ભલે, પણ રોગથી નથી ખાતુ\nફૂલ નાં હાર ને ગજરા ધરાવો, પણ બૂઢ્યુ નથી ધરાતુ ... જીવડા.\n\nવેદ શાસ્ત્રો જેની શાખ પૂરે, મુવા પાછળ થી નથી રે મરાતુ\nસતી નારી નો ધર્મ સવાયો, શંખણી ને નથી સમજાતુ ... જીવડા.\n\nવાંઝિયા નાં પિતૃ વળખા કરે એને પાણી નથી કોઈ પાતુ\nભજન વિનાનો વાંઝિયો જીવડો, દિલ રહે છે દુઃખાતુ ... જીવડા.\n\nગુરુ પ્રતાપે કહે પુરુષોત્તમ, રામ ની બેંક માં ખાતુ\nજો સમજાય તો ફેરો સફળ છે, ભરો હરિ ભવનનું ભાતુ ... જીવડા."
  },
  {
    "title": "441. શૂરવીર ને તું જોઈ લે પ્રાણી (૨૯૪)",
    "slug": "441-shurvir-ne-tu-joi-le-prani",
    "authorSlug": "purshottam-das",
    "category": "પુરષોત્તમ દાસ",
    "sortOrder": 441,
    "lyrics": "શૂરવીર ને તું જોઈ લે પ્રાણી, કાયર થઈ ને ભાગીશ માં\nકાયરપણા ની વાતો કરી ને, બીજા ને બીવડાવીશ માં ... (૨૯૪)\n\nસીધા મારગડે જે કોઈ ચાલે, એને મારગ અવળો બતાવીશ માં\nપરાયા ગુણ સારું જોઈને, દિલડું તારું દુભાવીશ માં ... કાયર.\n\nસુગંધ ની તને ખબર ન હોય તો, ફૂલડાં ને તું તોડીશ માં\nપાણી ન પા તો ચાલશે, પણ ઉગતા છોડ ઉખેડીશ માં ... કાયર.\n\nદાન ન દે તો દયા રાખજે, બોલી કોઈનું બગાડીશ માં\nસમજ્યા વિના ની વાતો કરી ને, મૂરખ માં નામ નોંધાવીશ માં ... કાયર.\n\nહરિ ભજન માં જઈ ને પ્રાણી, ઘર ની વાતો ઉકેલીશ માં\nશબ્દો સમજ્યા વિના તાલ ને ટેકે, માથું તારું હલાવીશ માં ... કાયર.\n\nનાથ કૃપા થી નાવ મળ્યુ છે, એને ઊંધ માં ઊંધુ મારીશ માં\nકહે પુરુષોત્તમ ગુરૂ પ્રતાપે, અવસર એળે ગુમાવીશ માં ... કાયર."
  },
  {
    "title": "442. પ્રીત બાંધી થોડી મારા મન મોહ્યા હરી (૨૯૫)",
    "slug": "442-prit-bandhi-thodi-mara-man-mohya-hari",
    "authorSlug": "mohan-das",
    "category": "મોહન દાસ",
    "sortOrder": 442,
    "lyrics": "પ્રીત બાંધી થોડી મારા મન મોહ્યા હરી\nનંદ નો લાડિલો મારા મન ગયા હરી ... (૨૯૫)\n\nવ્હાલા થયા છે વેરી, પાછા ફરો દૂધ ઉકેલી\nઇજ્જત નો વિગડો હાંસી, ઘડો બાંધો નમેલી ... નંદનો.\n\nશું કરી એક પહેરી સાડી, ગતિ નહિ સાસુજી ની શેરી\nમહલ મંડિર ભાગી, ભલે કોરી વણાવેલી ... નંદનો.\n\nમીઠા મેવા લાગે ખારા, નિંદ્રા ન આવે વહાણે\nવાંસળી વિનાની હું તો એકલી ઉભી ... નંદનો.\n\nજીવન આપો એક જ ફેરી, મળવા નહિં દઉ તમને ઘેરી\nદાસ મોહન ગાયુ સરણે, દર્શન દ્યો ... નંદનો."
  },
  {
    "title": "443. હરિને ભજતા એવુ કોઈની લાજ જતાં નથી ભાંગે રે (૨૯૬)",
    "slug": "443-harine-bhajata-evu-koini-laj-jatam-nathi-bhange-re",
    "authorSlug": "premal-das",
    "category": "પ્રેમળ દાસ",
    "sortOrder": 443,
    "lyrics": "હરિને ભજતા એવુ કોઈની લાજ જતાં નથી ભાંગે રે\nજેની મુખની શામળીયા ની શાખ, વેદે વેદે પ્રમાણે રે ... (૨૯૬)\n\nવ્હાલે ઉગાર્યો ભક્ત પ્રહલાદ, હિરણ્યાકંસ માર્યો રે\nવિભીષણને આપ્યુ છે રાજ, રાવણ સંહાર્યો રે ... હરિને.\n\nદાસ નરસિંહ મહેતાનો હાર, હાથે કરી આપ્યા રે\nધ્રુવને આપ્યુ અવિચળ રાજ, પોતાના કરી સ્થાપ્યા રે ... હરિને.\n\nવ્હાલે મીરા બાઈ નો ઝેર હળાહળ પીધા રે\nપાંચાલી નાં પૂર્યા ચીર, પાંડવ કામ કીધા રે ... હરિને.\n\nઆવો આપણો હરિ સંગાથો લેવો, લાવો કોઈ કરશો રે\nકર જોડી કહે પ્રેમળદાસ, ભક્તો નાં દુઃખ હરશે રે ... હરિને."
  },
  {
    "title": "443. હરિને ભજતા એવુ કોઈની લાજ જતાં નથી ભાંગે રે (૨૯૬)",
    "slug": "443-harine-bhajata-evu-koini-laj-jatan-nathi-bhange-re",
    "authorSlug": "premal-das",
    "category": "પ્રેમળ દાસ",
    "sortOrder": 443,
    "lyrics": "હરિને ભજતા એવુ કોઈની લાજ જતાં નથી ભાંગે રે\nજેની બુડતા સાંભળિયા ની સાથ, વડે વે પાન ડી --- (ટેક)\n\nવ્રહ્માણ ને આપ્યુ છે રાજ, રાવણ સંહાર્યો ટેક ધરીને\nદાસ નરસિંહ મેહતાનો હાર, છાયા કરી આપ્યા રે\nધ્રુવને આપ્યુ અવિચળ રાજ, પોતાનો કરી સ્થાપ્યો રે ... હરિને.\n\nવહાલે અંબ રીષ ને કાજ ગર્ભ હેરાન પડ્યા રે,\nપાંચાળી ના પૂ પૂરી અંબર, પાંડવ કામ કીધા રે --- હરિને.\n\nઆવો આપ્યો હરિ ભક્તાનો દાવો, ભક્ત કોઇ કરશે રે\nકર જોડી કહે પ્રેમદાસ, ભક્તો ના દુઃખ હરશે રે-- હરિને."
  },
  {
    "title": "444. પ્રથમ સદ્ગુરુ પાસે જાઉ, સોહમ્ પદ સમજું બુઝુ રે (૩૦૦)",
    "slug": "444-pratham-sadguru-paase-jaau-soham-pad-samju-buju-re",
    "authorSlug": "mangal-das",
    "category": "મંગળ દાસ",
    "sortOrder": 444,
    "lyrics": "પ્રથમ સદ્ગુરુ પાસે જાઉ, સોહમ્ પદ સમજું બુઝુ રે\nસોહમ્ પદ ને સમજું બુઝુ, સદા થઈને રહું રે --- (૨)\n\nસદ્ગુરુ નામ અનામી આપ્યુ, આશા શૂન્ય રહુ રે\nતન મન ધન ને સરણે મૂકો, જે હોય તે હવુ રે --- પ્રથમ.\n\nખાંડી કેરી ધારા ના હાલો, ગુરુ છે માત પિતા રે\nસદ્ગુરુ સરખા સાહેબ નહિ, તે મુક્તિ ના દાતાર રે --- પ્રથમ.\n\nજેહ કરે અમર વર્તું, વચન પાળો સદ્ગુરુ રે\nલોક ચર્ચા નો ભય ને મેલો, બીજુ કોઇ ના કહેવું રે --- પ્રથમ.\n\nગુરુ દેવા શિષ્ય પૂરા, અલખ પરમ એક જાણું રે\nમંગળદાસ કહે ગુરુ વિનાનું, અણુઅણુ માં ઠાકોર રે --- પ્રથમ."
  },
  {
    "title": "445. ખોયા ખોયા દિવસો હાથ થકી, આવે અવસર પાછો ના મળે રે (૩૦૧)",
    "slug": "445-khoya-khoya-divaso-hath-thaki-aave-avasar-pacho-na-male-re",
    "authorSlug": "tilak-das",
    "category": "તિલક દાસ",
    "sortOrder": 445,
    "lyrics": "ખોયા ખોયા દિવસો હાથ થકી, આવે અવસર પાછો ના મળે રે\nજે કોઈ બેસી ખોજ આપામાં, મટે ત્રિવિધ નો તાપ ટળે --- (૨)\n\nમોતી પડ્યુ મેદાનમાં, અજવાળ્યા આગળ અંધારા શું કરે\nકોઇ સંત કબીરી વચન મળે તો, સદ્ગુરુ સ્નાન કરે --- ખોયા.\n\nસમજ્યા વિનાની નર કરે છે કિરતી, ગુરુ વિના જ્ઞાન ક્યાંથી મળે\nપારસમણિ ગુણ જો પામ્યુ, લોઢા ને કંચન કરે --- ખોયા.\n\nતરી તિલકદાસ ઊતર્યા પ્રેમસેં, નામ પ્રભુ ની નાવ તરે\nકાયા ની કાયા ને પ્રેમે, અમૃત ગિર કરે --- ખોયા.\n\nકહે તિલકદાસ શૂરા સંગ્રામિ, મરવા મોજ કરે\nધારણા બાંધી દર્શન ની, નામે ત્રાણ દોષ ટળે --- ખોયા."
  },
  {
    "title": "446. એવુ સમજું નમેલા ન થાઆ દીનાનાથ, વિકમ વસમે ટાણે રે (૩૦૨)",
    "slug": "446-evu-samju-namela-na-thaa-dinanath-vikam-vasame-taane-re",
    "authorSlug": "naran-das",
    "category": "નારણ દાસ",
    "sortOrder": 446,
    "lyrics": "એવુ સમજું નમેલા ન થાઆ દીનાનાથ, વિકમ વસમે ટાણે રે\nતમે મારા છો મહારાજ, એવુ વેદ વખાણે રે --- (એવુ)\n\nએવુ સતયુગ સરાહ્યો સંખ, ત્રેતામાં ઉદ્ધાર તાર્યો\nકલિયુગમાં એ અવતાર, વ્રજ ને ઓધાર્યા રે --- (એવુ)\n\nએવુ શાસ્ત્ર નો એવો ભાગી નો અસ્વાદ, દયા રે નહિ દિલમાં\nએવુ અષ્ટાંગે અપરાધ, પાપ ને તારો પલમાં રે --- (એવુ)\n\nએવુ પૃથ્વી નામેવ ના પાયા દૂધ, દાનવે ધા આણીને\nએવુ કાલે સારી બુદ્ધિ, દિયા સામ વધીને રે --- (એવુ)\n\nએવુ નવ કોટિ ગૌ ગણું દાન કે લે લાખ, કરોડો ને શું કરીએ\nએવુ હૈયા ની વાચુ દેવો ને દિનાનાથ, આપો તો આપીએ લાખે રે --- (એવુ)\n\nએવુ અજમુ અસુરે પડી હોય ખોર, કુબેર ને પણ ને ઉધેિ\nએવુ પાંચ મંડળ ને પાસ, અમૃત આપો દઈ ને રે --- (એવુ)\n\nએવુ કહેવા નારણદાસ ગુણ ગાય, તમારી દ્યાન લેને રે --- (એવુ)"
  },
  {
    "title": "447. સબસે ઊંચી પ્રેમ સગાઈ (૩૦૩)",
    "slug": "447-sabase-unci-prema-sagai",
    "authorSlug": "sur-das",
    "category": "સૂર દાસ",
    "sortOrder": 447,
    "lyrics": "સબસે ઊંચી પ્રેમ સગાઈ\nદુર્યોધન કે મેવા ત્યાગે, શાક વિદુર ઘર ખાઈ --- (૨)\n\nજૂઠે ફલ શબરી કે ખાયે, બહુ વિધ પ્રેમ લગાઈ\nપ્રેમ કે બસ નૃપ સેવક કિન, વ્યાપક વિષ્ણુ હરિ નાહી --- સબસે.\n\nરાજસુય યજ્ઞ યુધિષ્ઠિર કીન્હો, તામેં જૂઠ ઉઠાઈ\nપ્રેમ કે બસ અર્જુન રથ હાંક્યો, ભૂલ ગયા ઠકુરાઈ --- સબસે.\n\nકૈસી પ્રીત બઢી વૃંદાવન, ગોપી નાચ નચાઈ\nસૂર દાસ હરિ લાયક નાહિ, કહાં લગી કરૌ બડાઈ --- સબસે."
  },
  {
    "title": "448. રામનામ રણુકારા રટી લે મન, રામનામ રણુકારા (૩૦૪)",
    "slug": "448-ramanam-ranukara-rati-le-man-ramanam-ranukara",
    "authorSlug": "madhav-das",
    "category": "માધવ દાસ",
    "sortOrder": 448,
    "lyrics": "રામનામ રણુકારા રટી લે મન, રામનામ રણુકારા\nસાહેબ સામના ભય થ્યા છે, વાગા ઉર રણુકારા --- (૨)\n\nપાંચે કો માર તેરે કાંપ્યા ને અસાદ, સંતો અખંડ ધૂન ખંડેનારા ... રટી લે.\nનાારદ શારદ શિવ સનકાદિક, નિશદિન બોલો નામ તમારા\nખબર વિના પાણી કહું ખોટા, અકલેશ કલેશ હમેશા હમારા --- રટી લે.\n\nજપ તપ તીરથ જોગ સાધના, સબ નામ આધારા\nગુરુ જ્ઞાન હોય તો ગોત લેજો, બંને વેદ પુરાણ પોકારા --- રટી લે.\n\nઅણચિંત હોવે સોઇ નહિં દિલડાં, બોલે પદ અપરંપારા\nસદ્ગુરુ વચને માધવ બોલ્યા, દિલ દિવ્ય દીદારા --- રટી લે."
  },
  {
    "title": "449. મારી નાડ તમારે હાથ હરિ સંભાળજો રે (૩૫૦)",
    "slug": "449-mari-nad-tamare-hath-hari-sambhaljo-re",
    "authorSlug": "keshav-das",
    "category": "કેશવ દાસ",
    "sortOrder": 449,
    "lyrics": "મારી નાડ તમારે હાથ હરિ સંભાળજો રે\nગુરુને પોતાની માની, પ્રભુપદ પામીએ રે ... (૨)\n\nપરવા પરવા નથી સમજાવું, દુઃખ સહાય રહે તમારુ\nમતિ હીણ શું ધારું નાથ નિહાળજો રે --- મારી.\n\nઅજ્ઞાનિ આપ દેહ કા સાચા, કઈ ઉપાય કિસિ નાહિં થાયા\nદિવસ વહ્યા છે ટાંણા વેળા ધારજો રે --- મારી.\n\nચિંતવ્યા શું થાઉ વિધારી, બાળ હાથ છતાં અંધારો\nઅહં ગ્રંથિનારા તારા નરધર રાખજો રે --- મારી.\n\nકેશવ હરિ મારુ શું થાશે, ધાવા વાળા વ્યાપાર થાશે\nલાજ તમારી પાશે, અધર આલંબે રે --- મારી."
  },
  {
    "title": "450. નિજના પંથ સે મંડપ રોપાયો, ધર્મની ધ્વજું ફરકતી (૩૦૫)",
    "slug": "450-nijana-pantha-se-mandap-ropayo-dharmani-dhvaju-farakati",
    "authorSlug": "keshav-das",
    "category": "કેશવ દાસ",
    "sortOrder": 450,
    "lyrics": "નિજના પંથ સે મંડપ રોપાયો, ધર્મની ધ્વજું ફરકતી\nગારવા પાટે પધાર્યા ગુણપતિ ... (૨)\n\nગત ગંગા વ્યાસાદિ સ્વામિ, નરનારી એક ગતિ\n૫૬ ભોગના છપ્પન થાળો, અહેલિયા ભક્તિ કરતી --- ગારવા.\n\nવેદ ભણતા બ્રહ્મા આવ્યા, વ્યાસ સાવિત્રી સતિ\nઆવન લવ ને બેસડ મેદાન, હરિ હેતુથી વસતિ --- ગારવા.\n\n૩૩ કરોડ દેવતા વ્યાપ્યા, વ્યાપ્યા બ્રહ્મા પતિ\nકૈલાસથી ભોળાનાથ પધાર્યા, સાથે ઉમિયા સતિ --- ગારવા.\n\nનવનાથ ને સિદ્ધ ચોરાશી, વ્યાપ્યા ગોરખ યતિ\nપાંડવોના ૫૨ થા પરશાદેવ વ્યાપ્યા, અનંત બાર ની પંતિ --- ગારવા.\n\nકેશવ તમને વિનવે સ્વામિ, મંગળ કરો મારા ધુતિ\nધૂપ દિવિ વ્યાપંડ જ્યોતિ, પ્રેમે ઉતારું આરતી --- ગારવા."
  },
  {
    "title": "451. સદ્ગુરુ ચરણ વિના, અજ્ઞાન અંધાર નિશદિન રહે રે (૩૦૬)",
    "slug": "451-sadguru-charan-vina-ajnana-andhar-nishadin-rahe-re",
    "authorSlug": "keshav-das",
    "category": "કેશવ દાસ",
    "sortOrder": 451,
    "lyrics": "સદ્ગુરુ ચરણ વિના, અજ્ઞાન અંધાર નિશદિન રહે રે ... (૨)\n\nકામ ક્રોધ મદ મોહ લોભ, લક્ષ્મીપતિ ના સંગ વિના\nપ્રેમાગુન વિવશ થાઇ મન, આશા તૃષ્ણા નો બાન વિના ... સદ્ગુરુ.\n\nગંગા ઈષ્ટ ની જ્ઞાન વિના, ગણેશ નાહિં રે ... સદ્ગુરુ.\nશાસ્ત્ર પુરાણ સદા સંભાળે, મન તન સાચું નહિ વહારે\n\nવગાર વિચાર લગાડી સુખ, મળશે નહિં હણ્યુ ધારે\nતત્વ નથી મારા તારામાં, કૂડ સાચો પરખા સાચામાં ... સદ્ગુરુ.\n\nસેવક ગુરુ દાસમાં, દિલ વલશે નહિ રે ... સદ્ગુરુ.\nકેશવ હરિની કરા સેવા, પરમાનંદ બનાવે તેવા\nશોધ વિના સબળ થવા, મળશે નહિ રે --- સદ્ગુરુ."
  },
  {
    "title": "452. તમે ભજો રે આમાં જંતરી નો બજાવ નાની કોણ છે (૩૦૭)",
    "slug": "452-tame-bhajo-re-ama-jantari-no-bajav-nani-kon-che",
    "authorSlug": "bhavani-das",
    "category": "ભવાની દાસ",
    "sortOrder": 452,
    "lyrics": "તમે ભજો રે આમાં જંતરી નો બજાવ નાની કોણ છે --- (ટેક)\nનાહં એને તત્વ નહિ એને તાર\n\nવચનમાંથી વચન બોલે, બહુ કરે પોકાર\nન જોવાય રૂપ એનું, ન લેવાય પાર\n\nકહુ તો કહેવાય નહિ ને, બોલે બાવન બહાર\nજ્ઞાન ધ્યાન છંદ રણ, પહોંચે નહિ વૈરાગ\n\nભોજનીયા એને ભાવે નહિ ને, છે વચન નો આહાર\nશીષ અખંડ ધુન લાગી, વચન રણુંકાર\n\nજંતરી ભવાનીદાસ ની જેને નામ નો આધાર --- તમે."
  },
  {
    "title": "453. બંગલા અજબ બન્યા હે મોરાર, તેની નિરખે ન આવે પાર (૩૦૮)",
    "slug": "453-bangala-ajab-banya-he-morar-teni-nirakhe-na-aave-par",
    "authorSlug": "bhavani-das",
    "category": "ભવાની દાસ",
    "sortOrder": 453,
    "lyrics": "બંગલા અજબ બન્યા હે મોરાર, તેની નિરખે ન આવે પાર ... (ટેક)\n\nપાંચ પચ્ચીસ પુતળી તેમાં નાચે, નાયક એક આધાર\nઅધ્ધર આસન મારા સતગુરુ બેઠા, તેનો કરુ દિદાર --- બંગલા.\n\nનવસે નાડ ને બોતેર કોઠા, બજાર નો નાહં પાર\nતેમાં સદ્ગુરુ રમતા દિસે, સુખ મન ની આધાર --- બંગલા.\n\nનવલખ દરવાજા ની નવલખ બારીઓ, આવત જાવત અપાર\nમન પવન ની ધજા ફરકે, ત્યાં નિરખો નિરાકાર --- બંગલા.\n\nનાભિકમલ મેં નાવ ચલત હે, બાજત અનહદ ઢોલ\nસિદ્ધા પ્રતાપે ભણે ભવાનીદાસ, નાવ એ નમે કોઇ તિલ --- બંગલા."
  },
  {
    "title": "454. જ્ઞાન ગંગા માં ન્હાઈ લે પ્રાણી, થઈ ને ભડમભોળ (૩૦૯)",
    "slug": "454-jnana-ganga-ma-nhai-le-prani-thai-ne-bhadambhol",
    "authorSlug": "bhavani-das",
    "category": "ભવાની દાસ",
    "sortOrder": 454,
    "lyrics": "જ્ઞાન ગંગા માં ન્હાઈ લે પ્રાણી, થઈ ને ભડમભોળ\nવિવેક રૂપી વારી લઈ, ન્હાઈ લે માથાબોળ --- (ટેક)\n\nસમજણ સુ નિર લઈ, કળશ માથે ઢોળ\nઆનંદની એ છોળુ ઉડે, એની ઉડે છોળ ... જ્ઞાનગંગા.\n\nવૈરાગ રૂપી માટી લઈ, એમાં મનને રગદોળ\nધોતા ધોતા ઉતરી જાશે, આ દિલડાની ખોળ ... જ્ઞાનગંગા.\n\nજગત બધુ બડી રહ્યુ, મોહ ને બગડોળ\nબ્રહ્મરસ એ પીધા વિના, કેમ ઉતરશે મોળ ... જ્ઞાનગંગા.\n\nચિત્ત જેનું નિષ્કપ થયુ, ભણો રણ સોળ\nશોભે છે ભવાનીદાસ, શશી કળા સોળ --- જ્ઞાનગંગા."
  },
  {
    "title": "455. કોને કહુ કિરાતારી બોલે તે બાવન બહાર (૪૮૫)",
    "slug": "455-kone-kahu-kiratari-bole-te-bavan-bahar",
    "authorSlug": "hari-das",
    "category": "હરી દાસ",
    "sortOrder": 455,
    "lyrics": "કોને કહુ કિરાતારી બોલે તે બાવન બારો, ભાઈ હુ કોને કહુ કિરાતારો\nભયો નથી એ જનની તણો, જે નહિં ઓદર આવનારો --- ભાઈ હુ.\n\nદમ કદમ થી દૂર છે, જેને નિરખ્યો કમલ થી ન્યારો\nરૂપ ને રંગથી છેટો રમે છે, પિંડથી બારો થયો પ્યારો --- ભાઈ હુ.\n\nજ્યોત નિરંજન થી જુદો રમે છે, જેને નુરથી જોયો છે ન્યારો\nતીન પાંચ ઉપર આસન કીના, બાવન, બોતેર, સો થી બારો --- ભાઈ હુ.\n\nપિંગલા પિંગલા અને વ્યોહમ - સોહમ થી અગાધ છે ઈ આબારો\nઈ રે અભંગીને ઓળખ્યા વિના પુરુષ રમે છે પ્યારો --- ભાઈ હુ.\n\nહરિદાસ સંત ભીમના ચરણા, નર ભુવન થી ન્યારી --- ભાઈ હુ."
  },
  {
    "title": "456. હુવારા માં દેખી લેના દોરી દમકદમકી (૪૮૬)",
    "slug": "456-huvara-ma-dekhi-lena-dori-damakadamaki",
    "authorSlug": "hari-das",
    "category": "હરી દાસ",
    "sortOrder": 456,
    "lyrics": "હુવારા માં દેખી લેના દોરી દમકદમકી\nદેશ જોયો દિલાવર મે, તો સંગત હે ભીમ સંત કી\n\nનાભિ માં તમે નિરખી કુવી, ખબર પડે પલચલકી\nશૂનમાં વાજા સુણીને, તું જે જતો નહિ અટકી --- હુવારામાં.\n\nદમ કદમ નાં દોર ઉપર નજર રાખ નટકી\nસુક્ષ્મણા માં ચડી જો તો, જે જતો નહિ અટકી --- હુવારામાં.\n\nનિત્ય ગંગા માં ન્હાઈ લ્યો, તમે ત્રિવેણી માં ગરકી\nજ્યોત નાં દર્શન જોઈ લઈને, જે જતો નહિ જબકી --- હુવારામાં.\n\nઅણાર નેણા ઉપર જુઓ, બીના હે વચન કી\nઅમર લોક ની ઉપર જોતા, મૂર્તિ હે મસ્તી કી --- હુવારામાં.\n\nશરીર જોયો મેં સાધવાળો, ધણી શોભા ઘૂંઘટ કી\nહાર બજારુ અને હવેલી, ખોલો પશ્ચિમ ખડકી --- હુવારામાં."
  },
  {
    "title": "457. જ્ઞાન ની કુંજી મારા સદ્ગુરુ એ આપી, ખોલ્યા ત્રિગુણવાળા (૪૯૬)",
    "slug": "457-jnana-ni-kunji-mara-sadguru-e-aapi-kholya-trigunavala",
    "authorSlug": "soham-das",
    "category": "સોહમ દાસ",
    "sortOrder": 457,
    "lyrics": "જ્ઞાન ની કુંજી મારા સદ્ગુરુ એ આપી, ખોલ્યા ત્રિગુણવાળા\nપિંડ બ્રહ્માંડ માં પસાર પેઠા, અવિચળ પ્રેમ આનંદવાળા --- (ટેક)\n\nઅકળ કળા ને અગમ ગતિ, અગોચર પદ ન્યારા\nવેદ શાસ્ત્ર પાર ના પામે, બોલે બાવન બારા --- જ્ઞાન.\n\nકાજી પંડિત કો કામ નહિં, અગમ પંથ હે નિરાળા\nબ્રહ્મવેદ ની વાત ગણે, મને કોઈ જાણણહારા --- જ્ઞાન.\n\nનાહિ હિંદુ નાહિ મુસલમાન, નાહિ જાતિ અમારા\nઆપ અનાદિ નો અક્ષર કાળ, નાહિ ધૂપ કે છાયા --- જ્ઞાન.\n\nનાહિં અમારે માતપિતા, નાહિં જન્મા મનનારા\nઉત્પત્તિ પ્રલયમાં ન આવું, રહું સબ થી અળગા ન્યારા --- જ્ઞાન.\n\nસોહમદાસ ગુરુજીનું વચન, જ્ઞાન ખડગ બંધાયા\nનવ, ત્રણ, પાંચ પચ્ચીસ હરાય છે, તો કાયા કા ગઢ જીતા --- જ્ઞાન."
  },
  {
    "title": "458. નમું રે ગણેશા નમુ ગુરુજીના દેવા, ગુરુ નારાયણ કરું તારી સેવા (૨૬૨)",
    "slug": "458-namu-re-ganesha-namu-gurujina-deva-guru-narayan-karu-tari-seva",
    "authorSlug": "gebi-nath",
    "category": "ગેબી નાથ",
    "sortOrder": 458,
    "lyrics": "નમું રે ગણેશા નમુ ગુરુજીના દેવા, ગુરુ નારાયણ કરું તારી સેવા\nલાવે રે ભવજલ સે હોઈ નિજ લેના, મારી દુરમતિ દ્યો ને હટાઈ\n\nબહૂત કહું તો કહ્યુ ન માને, ઘણું કહું તો મારી અટક ન માને\nડોલે પરઘર જઈ, અસત મારી કૂરતા સંગત નહિં રોઈ રે ... (૨)\n\nગુરુજી કા ઘર મેં દક્ષિણ કા વાસા, છૂટે કહું તે બલે સબ ઘટ વાસા\nઉઠી ઉઠી લેવે ગોપાલ ભગવાના, છાના સમજાવત નહિં હે મન મેરા ... બહૂત.\n\nપ્રેમ રે પુરુષ ની કંડાયા છોડી, ગુરુ દોલત રાખ્યુ હે બનાઈ\nગુણગાન ચોંટ્યા સદાયે રે કમળ પદ, દાતા નમ આપણે ઘર આયા ... પહોંચ.\n\nઅગમ મંડળ એસો રામ વ્યાપ્યા રે શિખર પર, ગુરુ જ્યોતિ મેં જ્યોતિ હે મિલાઈ\nકહે રે ગેબીનાથ ભવસાગર તરીયા, મને પાર ઉતારા હે ગોપાલ ... નમું રે."
  },
  {
    "title": "૪૫૯. સાધુ તેરી સંગડો ન છોડું મેરે લાલ (૨૬૩)",
    "slug": "459-sadhu-teri-sangado-na-chodu-mere-lal",
    "authorSlug": "gorakh-nath",
    "category": "ગોરખ નાથ",
    "sortOrder": 459,
    "lyrics": "સાધુ તેરી સંગડો ન છોડું મેરે લાલ\nલાલ મેરા દિલમાં સંતો, લીણી વૈરાગી રાતા ... જોયું મેં તો જાણી (ટેક)\n\nકપડા ભી ધોયા મેરે ભાઈ, કાંબળા ભી ધોયા\nજબ લગ આપનો મનવો ન ધોયો મેરે લાલુ ... લાલ મેરા.\n\nકપડા ભી રંગ્યા મેરે ભાઈ, કાંબળા ભી રંગ્યા\nજબ લગ આપનો મનવો ન રંગ્યો મેરે લાલ ... લાલ મેરા.\n\nમસ્તી મેં રહેના મેરે ભાઈ, સાંગત નહિં ખાના\nટુકડે મેં ટુકડા કરી તેના મેરે લાલ ... લાલ મેરા.\n\nમચ્છંદર ના ચેલો જતિ ગોરખ બોલિયા\nબોલ્યા છે કાંઈ અમૃતવાણી મેરે લાલ ... લાલ મેરા."
  },
  {
    "title": "૪૬૦. ખેરણ અજબ બનાયા મેરે સદ્ગુરુ (૨૬૪)",
    "slug": "460-kheran-ajab-banaya-mere-sadguru",
    "authorSlug": "gorakh-nath",
    "category": "ગોરખ નાથ",
    "sortOrder": 460,
    "lyrics": "ખેરણ અજબ બનાયા મેરે સદ્ગુરુ ખેરણ અજબ બનાયા ... (ટેક)\nઆણ મિલાકર ખેરણ સ્થાપી, ઘડીયા તાર મિલાયા\n\nસુરત નુરી કી નળીયુ મિલાકે, ઉલટ પવન ચલાયા ... ખેરણ.\n\nહરદમ હથોડા સુરતા નિસરણી, સદ્ગુરુ એ અક્કલ શૂં રે મિલાયા\nકુબુદ્ધિ કોટ કુંડા જલાયા, આતમ કું ન સમજાયા ... ખેરણ.\n\nસત સાહેબ પ્રેમ રસ પાયો, અગમ ભેદ સમજાયો\nભલે તમે મમતા ને મારી, પણ આતમસુખ તો પાયા ... ખેરણ.\n\nનાભિકમળ પર નાવ ચલત હે, ત્રિપુટી ધ્યાન લગાયા\nમચ્છંદર પ્રતાપે ગોરખ બોલ્યા, અમર આરા પાયા ... ખેરણ."
  },
  {
    "title": "૪૬૧. પ્રેમનાં પ્યાલા સંતો એ પીધા, ધણી ધાર્યો ધૂન ધણી (૨૬૫)",
    "slug": "461-premana-pyala-santo-e-pidha-dhani-dharyo-dhun-dhani",
    "authorSlug": "gorakh-nath",
    "category": "ગોરખ નાથ",
    "sortOrder": 461,
    "lyrics": "પ્રેમનાં પ્યાલા સંતો એ પીધા, ધણી ધાર્યો ધૂન ધણી\nહીરા માણેક મોતીનાં માલમી, રતન પદાર્થ પારસમણિ ... (ટેક)\n\nસકલ સોહમ મેં રામ અમારા, રામ વિના નહિં કોઈ\nતલવાર મનમાં જુઓ તપાસી, રામ સમોવડ નહિં કોઈ ... પ્રેમ.\n\nનાભિકમળમાં જુઓ તપાસી, કાયા વાડી ખીલી પડી\nછત્રીશ વાજા વાગે શહેરમાં, ગગન મંડળ પર ધૂન ખડી ... પ્રેમ.\n\nત્રણ ગુણમાં તેજ છે તમારા, પાંચ તત્વમાં જ્યોત ખડી\nત્રણ ભુવન માં તેનું અજવાળુ, સુરતા દોરી એ આસમાન ચડી ... પ્રેમ."
  },
  {
    "title": "૪૬૨. મનસા માલણી રે ગોરખ ભણતા નર શિવીએ (૨૬૬)",
    "slug": "462-manasa-malani-re-gorakh-bhanata-nar-shiviye",
    "authorSlug": "gorakh-nath",
    "category": "ગોરખ નાથ",
    "sortOrder": 462,
    "lyrics": "જ્ઞાની નર તો જાણે મનમાં, અવસર સાયરીયો સે જે મથી\nગુરુ પ્રતાપે ગોરખ બોલ્યા, આ બોલે તેથી ભિન્ન નથી ... પ્રેમ.\n\nમનસા માલણી રે ગોરખ ભણતા નર શિવીએ\nભણતા નર સેવી એ, તને મળે નિરંજન દેવ ... (૨૬૬)\n\nપથ્થર પૂજે હરિ મિલે તો, મેં પૂજુ ગિરીરાય\nઆ પહાડ કી પહાડી બનત હે, પીસ પીસ જગ જાય ... ગોરખ.\n\nમાલણ લાવી ફૂલડા, એનો કળીએ કળીએ જીવ\nતે ફૂલ દેવ કો ચડત હે, દેવ જ પોતે શિવ ... ગોરખ.\n\nમાલણ લાવ ફૂલડા, તે ધર્યા દેવ ની પાસ\nએ દેવમાં સાચ હોય તો, કેમ ન આવે પાસ ... ગોરખ.\n\nટંકણ દઈ પથ્થર ઘડયો, ધર્યો છાતી પર પાય\nએ દેવમાં સાચ હોય તો, ઘડનારા ને ખાય ... ગોરખ.\n\nએ પથ્થરનાં દેવને જળમાં દેજે ડાલ\nઆપ બૂડે તો કોને તારે, કોણ કરે સંભાલ ... ગોરખ.\n\nપૂજારી ના ઓશિયાળા, ઠાકોર કામે કામ\nબંદીવાન મંદિરનાં ઠાકર, કહેવાના બળવાન ... ગોરખ.\n\nસેવ સૂવાળી રાંધી ને, ધરી દેવ ની પાસ\nજમનારો તો જમી ગયો, દેવ ને ન આવી વાસ ... ગોરખ.\n\nએક ભૂલ્યો દૂજે ભૂલ્યો, ભૂલ્યો સબ સંસાર\nએક ન ભૂલ્યો જોતી ગોરખી, કરી ભજન આધાર ... ગોરખ."
  },
  {
    "title": "૪૬૩. કોઈ રે બતાવો અમને જોગી, જોગી મારી કાયા નો ઘડનાર (૨૬૭)",
    "slug": "463-koi-re-batavo-amne-jogi-jogi-mari-kaya-no-ghadanar",
    "authorSlug": "gorakh-nath",
    "category": "ગોરખ નાથ",
    "sortOrder": 463,
    "lyrics": "કોઈ રે બતાવો અમને જોગી, જોગી મારી કાયા નો ઘડનાર\nજોગી રે મળે તો અમે જીવીએ, નહિતર છોડું મારા પ્રાણ ... (ટેક)\n\n ચોપાટ માંડી મે તો શૂનમાં, ખેલુ મારા પિયૂ ની સંગાથ\nહું રે હારુ તો પિયુજી ની દાસી, પિયુજી હારે તો મારી પાસ ... કોઈ.\n\nહું રે હરણી ને પિયુ મારા પારધી, માર્યા શબ્દ નાં બાણ\nલાગ્યા હોય તે જાણે, બીજા શું જાણે અજાણ ... કોઈ.\n\nહું રે પ્યાસી પિયુ નાં નામની, જપું મારા પિયુજી નાં જપ\nમચ્છંદર પ્રતાપે ગોરખ બોલ્યા, જઈ બેઠા આતમ સ્થાન માં ... કોઈ."
  },
  {
    "title": "૪૬૪. સંત રે ઝવેરી નર જાણવા, અલખ ધણી ને જ્યારે આરાધ કરતા (૨૬૮)",
    "slug": "464-sant-re-jhaveri-nar-janava-alakh-dhani-ne-jyare-aaradh-karata",
    "authorSlug": "gorakh-nath",
    "category": "ગોરખ નાથ",
    "sortOrder": 464,
    "lyrics": "સંત રે ઝવેરી નર જાણવા, અલખ ધણી ને જ્યારે આરાધ કરતા\nઆરાધિ હરિ આવતા, નર ને નારી તે દી ભેળા બેસી જમતા ... (૨૬૮)\n\nએક આસન પર પોઢતા, કરમ ને ધર્મ તે દી કશુંય પણ નહોતા\nદ્રષ્ટિ ડેરા ફળ લાગતા ... અસલ જુગની રે.\n\nપાંચ વરસે બાઈ ને પુત્ર જન્મતો, વરસ પંદર પારણે એ પોઢાડતા\nસાંઠ વરસે એનાં સગપણ કરતા, હજાર પે પરણાવતા ... અસલ જુગની રે.\n\nચાંદા ને સૂરજ તે દી કશુંય પણ નહોતા, દિકાનાં પ્રકાશ હતા\nહિરા ને માણેક તે દી બહોત હતા, શ્રી ફળ ને હનુમાન અસલ જુગની રે.\n\nગાયુ ને ભેંસુ તે દી બહોત હતા, રાક્ષી ને હનુમાન\nઅન્ન ને ધાન કછુ એ પણ નહોતા, હતાં દૂધ નાં આહાર ... અસલ જુગની રે.\n\nત્રણ ત્રણ એવા જુગ ગયા, ચોથો હવે પ્રમાણ\nકહે મચ્છંદર તમે સુણો રે ગોરખા, એવા છે આગમના એંધાણ ... અસલ."
  },
  {
    "title": "૪૬૫. રજભર સુખીયા કોઈ ન દેખ્યા (૨૬૯)",
    "slug": "465-rajabhar-sukhiya-koi-na-dekhya",
    "authorSlug": "gorakh-nath",
    "category": "ગોરખ નાથ",
    "sortOrder": 465,
    "lyrics": "રજભર સુખીયા કોઈ ન દેખ્યા\nક્યાં જોઉ ત્યાં સુખડુ ન હોય મેરે લાલ ... રજભર (ટેક)\n\nજમીન ભી દૂખણી, આસમાન ભી દુઃખીયા\nભુવન પવન ને સુખ ન હોય, મેરે લાલ ... રજભર.\n\nચંદા ભી દુઃખીયા, સૂરજ ભી દુઃખીયા\nનવલખ તારા ને સુખ નવ કાંઈ, મેરે લાલ ... રજભર.\n\nરાજા ભી દુઃખીયા, પ્રજા ભી દુઃખી\nતપસ્વી સંન્યાસી કો સુખ ન હોય મેરે લાલ ... રજભર.\n\nમચ્છંદર કા પુતર જતિ ગોરખ બોલ્યા\nભજન કરે સોઈ નર સુખીયા ... રજભર."
  },
  {
    "title": "૪૬૬. આતમદેવ તમે અલગારી જાણો, ઇન શૂણ ધ્યાન લગાવો (૨૭૦)",
    "slug": "466-aatamadeva-tame-alagari-jano-ina-shuna-dhyana-lagavo",
    "authorSlug": "gorakh-nath",
    "category": "ગોરખ નાથ",
    "sortOrder": 466,
    "lyrics": "આ તમદેવ તમે અલગારી જાણો, ઇન શૂણ ધ્યાન લગાવો ... (ટેક)\n\nકાચી માટી કા કુંભ બનાયા, પવન યંત્ર ચલાયા\nધંધા સાર મેં સબ ભૂલ્યા, ભૂલ્યા સકલ સંસારા ... આતમદેવ.\n\nપાંચ કો મારી પચ્ચીસ કો હટાવો, સુરતા ને પકડી લાવો\nસુરત સૂરત સે પાણી ભરી લો, ઔર પાકા રંગ લગાવો ... આતમદેવ."
  },
  {
    "title": "૪૬૭. અગમ ધૂન ગગન પર લાગી, કોઈ ભગૃત હિરલાએ પાયા (૨૭૧)",
    "slug": "467-agama-dhuna-gagana-para-lagi-koi-bhagruta-hiralae-paya",
    "authorSlug": "gorakh-nath",
    "category": "ગોરખ નાથ",
    "sortOrder": 467,
    "lyrics": "તલબાર છે તાળુ ને રજબાર છે કુંચી, સદ્ગુરુ મળે તો ખોલી બતાવે\nડાળ ક્રોધ નાં કરો કટકા ને, સોહમ નામ જપાવી ... આતમદેવ.\n\nશિશ રે ઉતારી સદ્ગુરુ ચરણે ધરો તો અખંડ ઘરને વરો\nમચ્છંદર પ્રતાપે જતિ ગોરખ બોલ્યા, સોઈ નર પાાયા ... આતમદેવ.\n\nઅગમ ધૂન ગગન પર લાગી, કોઈ ભગૃત હિરલાએ પાયા ... (૨૭૧)\nઆતમ એક છે ધમણ ધમાયા, ઉલટ પવન ચલાયા\n\nઅગમપુરી માં એક ધર્મ ને દીઠો, ઇન સંગ મે તો ધ્યાન લગાયા\nભવસાગરમાં હિરા લોકો છૂટા છે બંકનાળ થી ધારા ચલાયા, શૂનમાં ફેરા ફિરાયા\nહરદમ હથોડા સુરતા સાણસી, ઈ ડેરામાં દો માણેક નિપજ્યા, લાંક મૂલ કોઈએ નવ પાયા\n\nભવસાગર માં હિરા લોકો છૂરા છે\nહરદમ હથોડા સુરતા સાણસી, હિરા કો ખરા કરાયા\nત્રિવેણીમાં ટંકશાળ પડત રે, જ્યાં હિરામાં હિરા મિલાયા\nમચ્છંદર પ્રતાપે જતિ ગોરખ બોલ્યા, મારા સદ્ગુરુએ આ રીતે ભવપાર ઉતાર્યો."
  },
  {
    "title": "૪૬૮. પ્રેમનાં પ્યાલા સદ્ગુરુ એ પીધા, ધણી ધાર્યો ધૂન ધણી (૨૭૨)",
    "slug": "468-premana-pyala-sadguru-e-pidha-dhani-dharyo-dhun-dhani",
    "authorSlug": "gorakh-nath",
    "category": "ગોરખ નાથ",
    "sortOrder": 468,
    "lyrics": "પ્રેમનાં પ્યાલા સદ્ગુરુ એ પીધા, ધણી ધાર્યો ધૂન ધણી ... (ટેક)\nહિરા માણેક પદાર્થ, આ છે પારસમણી\n\nસકલ સોહમ મેં રામ અમારા, રામ વિના જીવવું કાંઈ નથી ... પ્રેમ.\n\nનાભિકમળ પે નાવ ચાલે, આ છે નકલંક નેમધારી\nરામ સમોવડ કોઈ નથી, તું જેને વિચારી ... પ્રેમ.\n\nએકલો આવ્યો ને એકલુ જવાનું છે, તું જેને વિચારી કરે\nકોઈ કોઈનું કૂઈ સગુ નથી, માટે સદ્ગુરુ શબ્દ લે ઉરધારી ... પ્રેમ.\n\nતેરા ભુવનમાં તેરુ અજવાળુ, જોઈ લે સુરતા નાં દીરે ચડી\nમચ્છંદર પ્રતાપે જતિ ગોરખ બોલ્યા, આ બોલે તેથી ભિન્ન નથી ... પ્રેમ."
  },
  {
    "title": "૪૬૯. ઉડ ભાગા મુળાસિર આજ ભાઈ, અણભે નાંણડાંનું સાધત હો (૨૭૩)",
    "slug": "469-uda-bhaga-mulasira-aja-bhai-anabhe-nanadanu-sadhata-ho",
    "authorSlug": "gorakh-nath",
    "category": "ગોરખ નાથ",
    "sortOrder": 469,
    "lyrics": "ઉડ ભાગા મુળાસિર આજ ભાઈ, અણભે નાંણડાંનું સાધત હો લીધ છે માળામાં (૨૭૩)\nમેં સીવન હે બોલાવતા હે, તે નાગત છેવા પાવન હે ... (૨)\n\nપીંડ નાદ મેં બસાયા આપણ કરા, ક્યાં ગોપિલ લય કા ધ્યાન લગા\nયાદ ચિત્ત કરતા રીત નાહિં, સબ ભાગા હે ઈ સોવન હે ... ઉડ ભાગા.\n\nએ ભગ મુગટ હરની અપના, કા પાપ પાપ મેં બંદ કટા\nસબ પાપ હીં તોડરી શિરા ધરી શિર શિર પદ શૂં શાવન હે ... ઉડ ભાગા.\n\nજો દાસ કરે સો આપ કરે, જે આશા કરે સો અળગા\nકરા ખિડીયા ગુણ ૦૧૬ ખેતર, કિર પડતાય ક્યા હોવત હે ... ઉડ ભાગા."
  },
  {
    "title": "૪૭૦. નામ હે નિર્વાણી દાતા નામ હે નિર્વાણી (૫૯૭)",
    "slug": "470-nama-he-nirvani-data-nama-he-nirvani",
    "authorSlug": "gorakh-nath",
    "category": "ગોરખ નાથ",
    "sortOrder": 470,
    "lyrics": "નામ હે નિર્વાણી દાતા નામ હે નિર્વાણી\nઅમૈયા ઝલકો પહેરી, દાતા નામ હે નિર્વાણી (ટેક)\n\nઆપ ખોજી મૂળ બાંધો, પહેરો આછા પાલ\nઅધ્ધર તખત પર આસન રાખ્યો, છોડી દિયો અભિમાન\nપાંચ કો પકડો તીન કો બાંધો, આઠ લાલો ઠાઠ\nઉઠો હંસા પીવો પાણી, ત્રિવેણી ટંકશાળ --- નામ.\n\nકોણ સ્વામિ ચક્ર ફેરવે, ક્યાં ગર્જના થાય\nકોણ પીવે કોણ પીવે, ક્યાં જઈને સમાય --- નામ.\n\nઆપ સ્વામિ ચક્ર ફેરવે, ગગન ગર્જના થાય\nગુરુ તે પોથે સુરત પીવે, શૂન્યમાં જઈ સમાય --- નામ.\n\nઆશા મારો તૃષ્ણા ટાળો, મનકો મેલ નાંખો ધોઈ\nસંત મચ્છંદર ગોરખ બોલ્યા, આપ કર્તા હોઈ --- નામ."
  },
  {
    "title": "૪૭૧. હર દમ હર દમ હીરા પારખ લે, સમજ પડ સમ મરજીવા",
    "slug": "471-hara-dama-hara-dama-hira-parakha-le-samaja-pada-sama-marajiva",
    "authorSlug": "gorakh-nath",
    "category": "ગોરખ નાથ",
    "sortOrder": 471,
    "lyrics": "હર દમ હર દમ હીરા પારખ લે, સમજ પડ સમ મરજીવા\nતેરા સાહેબ હે ગુરુ માંહી, ખોલો ધ્યાન કી કુંજી --- હર દમ. (ટેક)\n\nઇંદુ ધારણી અચળું આપ્યા, અમૃત અંધ બોલે ચૂંટી\nત્રિવેણીના દેવા તમાશા, હંસ ગંગોત્રી ... હર દમ.\n\nઅગમ અગોચર બાગ બાણ, ત્રિપલ અંજળ વહે જ્યોતિ\nઅગમપુરી કે બંગલામેં, હંસા બોલે સંતો ... હર દમ.\n\nપાંચ કો માર પચ્ચીસ કો વશ કર, ઉંગડી પડ૩ કી શિર ચોટ\nઅપોડા વિચારી સાહેબ સંભાળો, બુદ્ધિ લખાણું તમારો ગોટો ... હર દમ.\n\nમારા સદ્ગુરુ કી સમજાવ બનાવી લે, દાસ બનાવી લે દિલડી\nકામ ક્રોધ માર હટાવ લે, તવ ભજું તેરી મરજીતી ... હર દમ.\n\nચંદ ચંદ્રા નાવ સાચ તારા, ક્યાં રે શહેર માં અંક કવિત\nરસ જોતી કી ખબર મંગાઈ લે, તબ પાણુ તેરી ગતિ ... હર દમ.\n\nપકડી હાડીતા નામ બનાવણ લે, ઉલટા પવન માં ચાલ\nમચ્છંદર પ્રતાપે જતિ ગોરખ બોલ્યા, આસન સિદ્ધા પરા ગતિ ... હર દમ."
  },
  {
    "title": "૪૭૨. આનંદ હેલી ઉભરાણી સંતો, આનંદ હેલી ઉભરાણી (૨૮૮)",
    "slug": "472-ananda-heli-ubharani-santo-ananda-heli-ubharani",
    "authorSlug": "bhadur-das",
    "category": "ભાદુર દાસ",
    "sortOrder": 472,
    "lyrics": "આનંદ હેલી ઉભરાણી સંતો, આનંદ હેલી ઉભરાણી ... (ટેક)\nચંદ્ર સૂરજ ઘો ઘર નાહિં, નહિં પવન, નહિં પાણી\n\nઅષ્ટકુળ પર્વત ઉસ ઘર નાહિં, નહિં વેદ નહિં વાણી ... આનંદ.\nસોહમ વચન ને સાધીને બેઠા, નિર્ગુણ ગતિ અણિયાણી\n\nઅધ્ધર તખત પર આપ બિરાજે, પોતે પુરુષ પુરાણી ... આનંદ.\nનૌતમ નાથ નિરંતર નિરખ્યા, સૂરત મેં સૂરત સમાણી\n\nઆ ઘટમાં પેઠ્યા, સન્મુખ દેખ્યા, સદ્ગુરુ કેરી નિશાની ... આનંદ.\nમેતા ભણી, ભ્રાંતિ ભાંગી, મિટ ગઈ ચારિય ખાણી\n\nરામદાસ ચરણે ભણે ભાદુરદાસ, અલખ ની થઈ ઓળખાણી --- આનંદ."
  },
  {
    "title": "૪૭૩. વસ્તુ વિરલે વખાણી સંતો વસ્તુ વિરલે વખાણી (૨૮૯)",
    "slug": "473-vastu-virale-vakhani-santo-vastu-virale-vakhani",
    "authorSlug": "bhadur-das",
    "category": "ભાદુર દાસ",
    "sortOrder": 473,
    "lyrics": "વસ્તુ વિરલે વખાણી સંતો વસ્તુ વિરલે વખાણી --- (ટેક)\nડોરી બાણ મારી ભીતર પ્રગટ્યા, આ તો અગમ ઘર ની એંધાણી\n\nઆનંદ ઉપજયો, અલબેલા જોયા, ખરી થઈ ઓળખાણી ... વસ્તુ.\nઅજાતિ પદ મારા ગુરુ એ બતાવ્યુ, જ્યાં જાત ને ભાત સમાણી\n\nઆદિ ને અંત, મધ્ય એકેય ન મળે, અલખ પુરુષની નિશાની ... વસ્તુ.\nનાભિ કમળ થી આનંદ ઉલટ્યો, અચાનક લહેર ઉભરાણી\n\nબ્રહ્મગુફા નાં ભેદ જ્યારે ભાંગ્યા, ત્યાં જઈ સૂરતા ઠેરાણી ... વસ્તુ.\nજેને સદ્ગુરુ પૂરા નથી ભેટ્યા, તેનું સર્વે થયુ ધૂળ ધાણી\n\nધડ ઉપર જેને મસ્તક ન મળે, તેણે આ વસ્તુ ભાણી ... વસ્તુ.\nઆ ઘટમાં હરિ સભર ભર્યો છે, માંયલો મર્મ લીધો જાણી\n\nરામદાસ ચરણે ભણે ભાદુરદાસ, લહેરમાં લહેર સમાણી ... વસ્તુ."
  },
  {
    "title": "૪૭૪. મેં અલમસ્ત ફકીર સંતો ભાઈ, મેં અલમસ્ત ફકીર (૨૯૦)",
    "slug": "474-men-alamasta-fakira-santo-bhai-men-alamasta-fakira",
    "authorSlug": "bhadur-das",
    "category": "ભાદુર દાસ",
    "sortOrder": 474,
    "lyrics": "મેં અલમસ્ત ફકીર સંતો ભાઈ, મેં અલમસ્ત ફકીર ... (ટેક)\nમેં પીર કહાવુ, મેં પીરન કા પીરા\n\nનિરાધાર રમું શૂનમાં, સબ સે ફિરૂં અકેલા ... મેં.\nસબ ઘટ મેં ઉલટ મેં સમાણું, સબ ઘટ મેં હંસા મેરા\n\nહમ તો આવુ નહિં ને જાવુ નહિં, અગમ ઘર મેં હુ ડેરા ... મેં.\nનખ થી શિખ સુધી નૂર પ્રગટ્યા, વહાં મેં જ્ઞાન ગંભીરા\n\nશૂન ઘર શહેર અને શહેર માં વસ્તી, તેથી હમ છે ન્યારા ... મેં.\nસ્વચ્છ ન્યારા ખેલું હુ મેં હંસ, હુ સબસે ન્યારા\n\nરામદાસ ચરણે ભણે ભાદુરદાસ, મેં ખુદ લાલ નબી સા ... મેં."
  },
  {
    "title": "૪૭૫. પીવોને પ્રેમરસ વાળી પ્યાલી મેરે સંતો ભાઈ (૨૭૫)",
    "slug": "475-pivone-premarasa-vali-pyali-mere-santo-bhai",
    "authorSlug": "bhairav-nath",
    "category": "ભૈરવ નાથ",
    "sortOrder": 475,
    "lyrics": "પીવોને પ્રેમરસ વાળી પ્યાલી મેરે સંતો ભાઈ, પીવોને પ્રેમ રસ વાળી ... (ટેક)\nગણપત ગાયો કલ્યાણ સુખ પાયો, દયાળુ ગુરુ મળ્યા અજ્ઞાની\n\nવિઘન વિદારણ કામ સુધારણ, કરોડ દેવાના આગેવાની -- પીવોને.\nસભ કરી વ્હાલ પેદા દયાળ, સબ કુણ કલ્યાણ ધ્યાણુ\n\nકૃપા શ્રીહરિ માઈ ભને કેમ ભૂલી જાવું, તન મન ધન કરો કુરબાની -- પીવોને.\nસંસાર સાગર મહાજળ ભર્યો, નથી ઉતરવાની વારી\n\nભૂલ્યો ભમરો ફરે ભટકતો, ભૂલી ગયો કે ક્યાં છે તારી વાટ -- પીવોને.\nનાભિ કમળ પર રમંત પંખીડી, ક્યાં પવન કા વાસા\n\nસદ્ગુરુ એ ધર્યો શિર પર હાથ, શાંતિ બાણ પિલાડિયા -- પીવોને.\nશૂન શિખર પર ગાઢ ચડાઈ, દર્શન વિરલા કોઈ પામે\n\nઉપજી ભાવ ને લાગી, બોલ્યા ભૈરવ માઈ -- પીવોને."
  },
  {
    "title": "૪૭૬. સમરણ ખેતી કરો, બળદો વૈરાગ ધરીને હારો (૨૯૧)",
    "slug": "476-samarana-kheti-karo-balado-vairaga-dharine-haro",
    "authorSlug": "brahmanand",
    "category": "બ્રહ્માનંદ",
    "sortOrder": 476,
    "lyrics": "સમરણ ખેતી કરો, બળદો વૈરાગ ધરીને હારો\nમારા પ્રાણ પરોણિયા રે, તમે સમરણ ખેતી કરો ... (ટેક)\n\nશ્વાસ ઉશ્વાસ દૂધના સરવડા હોવે, દયા, ક્ષમા, ગુરુ ની ધારણા\nકામ, ક્રોધ નાં મંહી લોગડાં નડા, પોથી ને પરહરો --- મારા.\n\nહરદમ ની હાસ ને સૂરતા તું સાધું, સાધ રાખજો સાદ કરો\nનામ ની દોરી ધર્મે બળદીયા, ધરમ ધોંસડું ધારો --- મારા.\n\nશીળ સંતોષ નો ધોરો પરોણિયે, સાચ રાખજો સાટ કરો\nગુરુ કિરપાનો વરસાદ આવે ત્યારે નિજ નામનો બિયાર વાવો --- મારા.\n\nપાંચ પરપંચ શ્વાસમાં ભરી ભરી ભંગાણા, ભયાન લડાડી કરો\nજ્ઞાન ની ઝોંપડી માં શાંતિ નો ગોળો, પછી પલ નવાર કરો --- મારા.\n\nપાક પાકે ત્યારે બાંધી રાખે મેડો, ધ્યાન નો ડાંડો અનુસરો\nકહે બ્રહ્માનંદ ગુરુ પ્રતાપે, પોતે સંતો સદા કરો --- મારા."
  },
  {
    "title": "૪૭૭. જિસકી નહિં હિ બોધ તો, ગુરુજ્ઞાન ક્યા કરે (૩૧૧)",
    "slug": "477-jisaki-nahin-hi-bodha-to-gurujnana-kya-kare",
    "authorSlug": "brahmanand",
    "category": "બ્રહ્માનંદ",
    "sortOrder": 477,
    "lyrics": "જિસકી નહિં હિ બોધ તો, ગુરુજ્ઞાન ક્યા કરે\nનિજરૂપકો જાના નહિં, કુરાન ક્યા કરે ... (ટેક)\n\nઘર ઘર મેં બ્રહ્મ જ્યોતિ કા પ્રકાશ હી રહા હે\nમેરા ન દ્વેષ ભાવ તો, ફિર જ્ઞાન ક્યા કરે ... જિસકી.\n\nરચના પ્રભુ ડી દેખ કે, જ્ઞાની બડે બડે\nપાવે ન કોઇ પાર તો, નાદાન ક્યા કરે ... જિસકી.\n\nકરકે દયા દયાલ ને, મનુષ્ય જન્મ દિયા\nબંદા ન કરે ભજન તો, ભગવાન ક્યા કરે ... જિસકી.\n\nપશુ પક્ષી આપે જિસે, નહિં દયા હોઈ દયાલકી\nબ્રહ્માનંદ પ્રભુને નમે, પુણ્યદાન ક્યા કરે ... જિસકી."
  },
  {
    "title": "૪૭૮. સોહમ શબ્દ વિચારી સાધો, સોહમ શબ્દ વિચારી (૩૧૨)",
    "slug": "478-sohama-shabda-vichari-sadho-sohama-shabda-vichari",
    "authorSlug": "brahmanand",
    "category": "બ્રહ્માનંદ",
    "sortOrder": 478,
    "lyrics": "સોહમ શબ્દ વિચારી સાધો, સોહમ શબ્દ વિચારી ... (ટેક)\nમાળા કરસે ફિરત નહિં હે, મુખ ન વર્ણ ઉચ્ચારી\n\nઅજંપા જાપ હોત ઘર માંહી, તાકી ઓર નિહારી ... સોહમ.\n'હં' અક્ષર સે શ્વાસ ઉઠાવો 'સો' ક સે જાય બિહારો\n\nહંસો ઉલટ હોત હે સોહમ, યોગી જન નિરધારી ... સોહમ.\nસબ એકવીશ છસ્સે હજાર મિલાકર, શ્વાસ હોત સુમારો\n\nઅષ્ટ પ્રહર મેં ભગત સોવત, મન મેં જયો સુખારી ... સોહમ.\nજો જન ચિંતન કરત નિરંતર, છોડાજણત વ્યવહારી\n\nબ્રહ્માનંદ પરમ પદ પાવે, માટે જન્મ સંભારો ... સોહમ."
  },
  {
    "title": "૪૭૯. દો દિન કા જગમેં મેલા, સબ ચલા ચલી કા ખેલા (૩૧૩)",
    "slug": "479-do-dina-ka-jagamen-mela-saba-chala-chali-ka-khela",
    "authorSlug": "brahmanand",
    "category": "બ્રહ્માનંદ",
    "sortOrder": 479,
    "lyrics": "દો દિન કા જગમેં મેલા, સબ ચલા ચલી કા ખેલા ... (ટેક)\nકોઈ ચલા ગયા કોઈ જાવે, કોઈ ગઠરી બાંધ સિધાવે\n\nકોઈ ખડા તૈયાર અકેલા, સબ ચલાચલી કા ખેલા ... દો દિન.\nકર પાપ કપટ છલ માયા, ધન લાખ કરોડ કમાયા\n\nસંગ ચલે ન એક તું અકેલા, સબ ચલા ચલી કા ખેલા ... દો દિન.\nસૂત નાર માત પિતા ભાઈ, કોઈ અંત સહાયક નાહિં\n\nક્યોં ભરે પાપ કા થેલા, સબ ચલા ચલી કા ખેલા ... દો દિન.\nયહ નશ્વર સબ સંસારા, કર ભજન ઇસકા પ્યારા\n\nબ્રહ્માનંદ કૌં સુન ચેલા, સબ ચલા ચલી કા ખેલા ... દો દિન."
  },
  {
    "title": "૪૮૦. અબધુ ખેલ ગયો સબ ખાલી (૩૧૪)",
    "slug": "480-abadhu-khela-gayo-saba-khali",
    "authorSlug": "dayanand",
    "category": "દયા નંદ",
    "sortOrder": 480,
    "lyrics": "અબધુ ખેલ ગયો સબ ખાલી, સબ ભૂલ્યો માત્ર હરકો\nવૃતિ વિષય રસ વાળી, અબધુ ખેલ ગયો સબ ખાલી ... (ટેક)\n\nસમજ્યો નહિં તું જ્ઞાન શબ્દ કો, કીધી કડડાઈ ઠાલી\nનામ નિરંતર નિર્ભય ન પાયા, બેઠો નાહક ઘાલી -- અબધુ.\n\nમત પંથ ને થાયે ઉથાયે, મુરખ રહ્યો છે મહાલી\nપરમાર્થ માં પ્રિત ન ઢિધી, પછી ગયો ચોરાશી આલી -- અબધુ.\n\nમોહ માન અંતર નાં ખોટા, ભરે પાપ ની પાલી\nકરણી હિન કુરમ નાં ડાચા, બેઠા વાંધો ઘાલી -- અબધુ.\n\nહર્ષ સમજ મન હેત કરીને, જ્ઞાને રહી મન ગાળી\nદાસ દયો દિલ દેખી સાહેબો, સૂરતે શ્યામ સંભાળી ... અબધુ."
  },
  {
    "title": "૪૮૧. મનકા માન્યા નાહિં હે તેરા, દિલ કા માન્યા નાહિં હે તેરા (૩૧૫)",
    "slug": "481-manaka-manya-nahin-he-tera-dila-ka-manya-nahin-he-tera",
    "authorSlug": "dayanand",
    "category": "દયા નંદ",
    "sortOrder": 481,
    "lyrics": "મનકા માન્યા નાહિં હે તેરા, દિલ કા માન્યા નાહિં હે તેરા\nવૃથા કરી રહ્યો મારૂ મારૂ, મનવા માન કહ્યુ તુ મારૂ -- (ટેક)\n\nજ્યાં જોઉ ત્યાં અલખ નિરંજન, અવિનાશી આડુ એક બાળુ\nદિલકી દુજ્ઝા ને દૂર કરો તો, અંતરમાં દિસે અજવાળુ ... મનકા.\n\nમેલી દયો આંટી થઈ જાવ માટી, ખેલ ખેલી લે ખેલાડુ\nસદ્ગુરુ સાહેબ ને વરી લ્યો, ઉનકી સાથ કરી લ્યો વહેવાડુ -- મનકા.\n\nદિલ બને દર્પણ મન બને મુખડુ, અંદર જોઈ લે સ્વરૂપ નાનુ\nમનકા માન્યા મેરાત્ર નજરે પડે, ઉની મુર્તિડા કરી લે દિદારુ -- મનકા.\n\nઅવર ઈર્ષા મેલો મન તણીને, નુરતે સુરતે નિરધાર્યું\nદાસ દયાનંદ બ્રહ્માનંદ વચનો, ભજન કરી લે સદ્ગુરુ નું પ્યારુ ... મનકા."
  },
  {
    "title": "૪૮૨. મનજી મુસાફિર રે, જાવું નિજ દેશ ભણી (૩૧૬)",
    "slug": "482-manaji-musafira-re-javun-nija-desha-bhani",
    "authorSlug": "dayanand",
    "category": "દયા નંદ",
    "sortOrder": 482,
    "lyrics": "મનજી મુસાફિર રે, જાવું નિજ દેશ ભણી\nમુલક ઘણાં જોયા, મુસાફરી પણ થઈ છે ઘણી ... (ટેક)\n\nજયપુર જવાની તક થાય તો, રખે ભૂલતા નહિં ભાઈ\nફરી અવસર મળશે નહિં, એવી છે કઠણાઈ ... મનજી.\n\nમાટે સમજી ચાલો સીધા, ના જોશો ડાબા જમણી\nવચ્ચે ફાસીયા વાટ પાડવા, બેઠા છે બે થાર ... મનજી.\n\nમાટે વળાવ્યા રાખો બે ત્રણ, તો તેનો નહિં ભાર\nશોધી કાઢો બેડી રે, કહિ દે ગત સૌ તે તણી -- મનજી.\n\nકરો ધંધો પણ શેઠ નાં નામે, થાય નહિં કદી અટકાવ\nઆપણો કુરતા ખે ખેમ આવે, કાવે ધણી ની દાવ -- મનજી.\n\nમાટે ન થાવું, કોઈ વોરાત નાં ધણી\nજરૂર આ જગ થકી જવુ છે, કરજે ભલેશ કામ -- મનજી.\n\nદાસ દયા ને એમ લાગે છે, હવે જઈએ પોતાને ગામ\nસૂઝે છે હવે એવું રે, અવધ થઈ છે આપણી ... મનજી."
  },
  {
    "title": "૪૮૩. વલોણું કિજે રે, જ્ઞાન ગગન ગો દોઈ અમીરસ પીજે રે (૩૧૭)",
    "slug": "483-valonun-kije-re-jnana-gagana-go-doi-amirasa-pije-re",
    "authorSlug": "dayanand",
    "category": "દયા નંદ",
    "sortOrder": 483,
    "lyrics": "વલોણું કિજે રે, જ્ઞાન ગગન ગો દોઈ અમીરસ પીજે રે\nરામ કા ગોરસ વલોય --- (ટેક)\n\nસ્નેહ સુથીયુ ગોળી ગરીબી, રમતા રામ રવાયો\nકંડ દોરડા દિલનાં કીધા, નિરખે નેત્રા લાયો ફેરફરીને રે\nજગતે જતન કરી જોઈ, --- વલોણું.\n\nવરોત વલોવણ સ્નેહ સુંદરી, મંથન જ્ઞાન મોહ મારે\nકાશ આશા અંતર ની મેલી, અનુભવ માખણ તારે વિવેક કરીને રે\nવિગત વધારો કીય --- વલોણું.\n\nનુરત સુરત દો તાવણ બેડી, બ્રહ્મ અગ્નિ પ્રજળી\nલોભ લાકડા માંહી મેલી, લિંગ વાસના બાળી, તત્વ નિયાળ્યું રે\nનહિં એક નહિં દોય --- વલોણું.\n\nધ્યાન અમીરસ નામ નિશાની, ઘોર નાદ ધુરાવે\nદયાનંદ કરે વિરલા ભોગી, બ્રહ્મ રસાયણ પાવે, અળગે થઈને રે\nભય ભવજળ ની ખીચ ... વલોણું."
  },
  {
    "title": "૪૮૪. હે મેં અપારિયા પર પર નાં બટાવી મારી શિર ધારી (૩૧૮)",
    "slug": "484-he-men-apariya-para-para-nan-batavi-mari-shira-dhari",
    "authorSlug": "dayanand",
    "category": "દયા નંદ",
    "sortOrder": 484,
    "lyrics": "હે મેં અપારિયા પર પર નાં બટાવી મારી શિર ધારી\nશિરે ધરીને મેં પીધી પ્યાલી, લગન કરી ... (ટેક)\n\nચાર પાંચ માંહી બેસી ફુગાટ્યા, બિન્દુ મેલ્યા મેં પરહરી\nહે પાંચ બેગડાં લાયા હે કપડા, શીલ મંડોવ નો તાર ભરી\n\nપ્રગટો અજવાળા સોહમ વિધાત્યા, વચન વિભૂતિ મા રહેવા લાગી\nદશમેં દ્વારે થઈ અક્ષય ભગાત્યા, કાસા શહેરમાં ખબર પડી -- મરાળી.\n\nઅખંડ શબ્દ મજ દોહા માઈલ, લીધો વલોણે લોત કરી\nદાસ દયાનંદ બ્રહ્માનંદ વચનો, હવે વ્યાખ્યા મા ન આવુ કરી -- મરાળી."
  },
  {
    "title": "૪૮૫. બોલ તમે લવમારણ બોલો, પૂરે પ્રેમ પુકારીને (૩૧૮)",
    "slug": "485-bola-tame-lavamarana-bolo-pure-prema-pukarane",
    "authorSlug": "dayanand",
    "category": "દયા નંદ",
    "sortOrder": 485,
    "lyrics": "બોલ તમે લવમારણ બોલો, પૂરે પ્રેમ પુકારીને -- (ટેક)\nસાધન્ધર પિનાધર માર્ગ, સડા ધ્યાન ધરીને રે\n\nદરપન સોંસા રૂપ મનોહર, કાળજ નેહ ડોરીને રે\nલવલે વિસડ કમરગુરુ કીધું, અંઅંગ દિલગિત કરીને રે\n\nભાવ સહિત મેં તને બાંધીને, તો ન આવ્યા નયન કરીને રે\nસંવત માટે સ્મરણ બાંધીને, સ્મરણ રાધિ કે હરિને રે\n\nદાસ દયા પર દયા કરો તો, પહોંચો વચન હરિને રે --- બોલ."
  },
  {
    "title": "૪૮૬. હરિનું સંસ્મરણ કાંઈ ન કર્યું, પ્રભુનું ભજન કાંઈ ન કર્યું (૩૨૪)",
    "slug": "486-harinun-sansmarana-kain-na-karyun-prabhunun-bhajana-kain-na-karyun",
    "authorSlug": "dayanand",
    "category": "દયા નંદ",
    "sortOrder": 486,
    "lyrics": "હરિનું સંસ્મરણ કાંઈ ન કર્યું, પ્રભુનું ભજન કાંઈ ન કર્યું\nસાંભળ્યું તારું વાસણિયાં ગાયું ... (ટેક)\n\nકાંઠા વાડી ના બેસે આકાશ વાડી, ત્યાં ફૂલ બાંડ થયું\nકુલદિપ દીપ કરવાયા સાધુ, ત્યારે બન્ની ગાયું -- સાંભળ્યું\n\nનર ન ભજે, નારી ન ભજે, કરે નહિં કોઈડુ કૈ હૈયું\nશબ્દ બાણ નો વાગ્યો બાણડો, જ્ઞાનનું છુટી ગયું હૈયું ... સાંભળ્યું\n\nમાયા રાતો રાજ રાતો નહિં, મન માયામાં રહ્યું\nઝગડા ચાલ્યા જીવને તિયા, ત્યારે કુટો કુટીને ભાંગી નાખ્યું હૈયું --- સાંભળ્યું.\n\nચોરીયાસી ની ચાર ખાણ છે, તેમાં ઝાઝું દુઃખ સહ્યું\nદાસ દયાનંદ બ્રહ્માનંદ વચને, જેવું લાગ્યું એવું કહ્યું --- સાંભળ્યું."
  },
  {
    "title": "૪૮૭. બંસી ઉડા બાવળા થઈ, શાંતિના મેડા ખેતરમાં કર્યા (૩૨૮)",
    "slug": "487-bansi-uda-bavala-thai-shantina-meda-khetarama-karya",
    "authorSlug": "dayanand",
    "category": "દયા નંદ",
    "sortOrder": 487,
    "lyrics": "બંસી ઉડા બાવળા થઈ, શાંતિના મેડા ખેતરમાં કર્યા -- (ટેક)\nધરમ ને ગિરામ ના દોરી બાંડો, તમે અણુબોલ હળની સઈ\n\nમોહ માયાનાં દેશ ભાંગો, રામ નું પ્રાતર છો ... બંસી.\nસ્મરણ નામ ની સ્વાદુ કારો, સૂરતા થોડા પર ચડી\n\nપંડ અંર્તર નો કાંઠો વિવશ થા, પોતે નું ખાવું નહિં -- બંસી.\nજ્ઞાન ધ્યાન નાં ડાલા ઓઢ્યા લખો, મન માયા નાં દંડ\n\nમનુષ્ય ખેતરમાં વાવો વિવિધ થા, ગુરુરામ બોરણ લઈ ... બંસી.\nનામનો અંકુર ઉગ્યા ખેતરમાં ને ધન્ય કુંડળ થઈ\n\nડુંડા ઉપર નો કાંઠો પારિયા, મન અજવાળી રહઈ ... બંસી.\nમોહ ના કૂવાના પાડીયા ખેતરમાં, ખબર દિલની થઈ\n\nદાસ દયા કહે જીવી ડરપી ઉમાહ, બંધ ભવની સાંકડ ગાઈ ... બંસી."
  },
  {
    "title": "૪૮૮. ત્યાગ ન ટકે વૈરાગ્ય વિના, કૂળિએ કોટી ઉપાય (૩૨૧)",
    "slug": "488-tyaga-na-take-vairagya-vina-kulie-koti-upaya",
    "authorSlug": "nishkulanand",
    "category": "નિષ્કુળા નંદ",
    "sortOrder": 488,
    "lyrics": "ત્યાગ ન ટકે વૈરાગ્ય વિના, કૂળિએ કોટી ઉપાય\nઅંતર ઊંડી ઇચ્છા રહે, કેમ કરી ન તજાય ... (ટેક)\n\nવેષ લીધો વૈરાગ નો, દેશી સ્ત્રીનો દરો\nઉપર લેપ નિરખકો બન્યો, માંહી મંઇ ભરપૂર -- ત્યાગ.\n\nકામ ક્રોધ લોભ મોહનું, જ્યાં લગી મૂળ ન જાય\nખેંચી પ્રસંગે પેસારે, મણ ભાગાનો વાય -- ત્યાગ.\n\nઉત્તમો તમોયવાની વિષે, અન્ન ન દિસ મહાર\nધનવસ્ત્ર, દિલ મંઝાર, હૃદય વિષય આકાર -- ત્યાગ.\n\nથાય દૃષ્ટિ લાલ ભાગે, હણિયુ વિષય સંજોગ\nચણા મટય અણાવ કી, લિય ભોગાવશે કોણ -- ત્યાગ.\n\nઉપર ત્યાગ ને અંતર રાગ, એમ નહિ સરે કાર્ય\nવાણ્યા રે પરણમ થકી, જંવે કાંઈ અનર્થ -- ત્યાગ.\n\nઅંતર થયા ભોગ સાંભળી, જંગ બાંગડુ હૃદય\nગયુ ધૂળ મહી આપણા થકી, આપાવુ રે અણુક્ષ -- ત્યાગ.\n\nપલમાં મોહ ને વ્રજ પવનમાં, મનમાં ગૃહીને, ધ્યાન\nનિષ્કુળાનંદ એ નર નો, વણ સમઝ્યો વૈરાગ --- ત્યાગ."
  },
  {
    "title": "૪૮૯. આપું હું તો શીંગુ રે ઘડી એક ધડી, દર્શન ગુરુ શ્યામ તણું (૪૧૪)",
    "slug": "489-apun-hun-to-shingu-re-ghadi-ek-dhadi-darshana-guru-shyama-tanun",
    "authorSlug": "babu-bhai",
    "category": "બાબુ ભાઈ",
    "sortOrder": 489,
    "lyrics": "આપું હું તો શીંગુ રે ઘડી એક ધડી, દર્શન ગુરુ શ્યામ તણું\nએકપલ ઘડીય ના વિસરું મને, દર્શન ગુરુ શ્યામ તણું ... (ટેક)\n\nદયાના સાગર અજ્ઞાની લંકાક છો, કૃપાસિંધુ ભવ તારણહાર છો\nહે નારી ચરણોમાં વ્યાકુળ બની ... દર્શન ગુરુ.\n\nમનના મંદિર સાચે વિરાજે, અજ્ઞાણ ના થાયે તે અનુભવી\nકંઈ થઈને ના ભલે ... દર્શન ગુરુ.\n\nઅરજી કરે છે બાળક તમારો, કૂપા કરજો હે પ્રભુ શામરા તમારા\nઅભયપદ સહાય ચરણોની ઓથ ... સાહે પુરુ શ્યામધામ.\n\nદાસ બાબુભાઈ વંદન કરે ... દર્શન ગુરુ."
  },
  {
    "title": "૪૯૦. વંદન વારંવાર, હેજી વંદન વારંવાર (૩૪૫)",
    "slug": "490-vandana-varamvara-heji-vandana-varamvara",
    "authorSlug": "babu-bhai",
    "category": "બાબુ ભાઈ",
    "sortOrder": 490,
    "lyrics": "વંદન વારંવાર, હેજી વંદન વારંવાર\nબાપા ને વંદન વારંવાર ... (ટેક)\n\nધરાઈ ગામમાં બાપા પ્રગટ્યા, ઓલિયા નો અવતાર\nબાળપણ માં રંગ લાગ્યો, કરતા ભજન નો લલકાર ... બાપાને.\n\nપૂર્વ ની પ્રિતે સંત મળ્યા, ઘુસારામ સમર્થ\nઘુસારામે શ્યામ ને રોપ્યા, દાગ ન રહ્યો લગાર ... બાપાને.\n\nશ્યામ સાથે નાનક ચાલ્યા, સમજ્યા સત્ય નો સાર\nઅમર સાહેબને સંગમાં રાખી, ધૂણી ધખાવી ઘણીવાર ... બાપાને.\n\nશ્યામ સાથે દેવી દૂધમાં, સેવામાં સદાય તૈયાર\nગાંગા દાસ ને ઉરમાં લીધા, એ તો જ્ઞાનનાં છે ભંડાર ... બાપાને.\n\nસૌ એ મળીને ધર્મ ચલાવ્યો, આવે વરણ અઢાર\nનર નારી આવી પાયે પડીને, નિહાળે બાપાનાં દિદાર ... બાપાને.\n\nજે કોઈ સંત નાં સરણે આવ્યા, એનો ઉતર્યો સર્વે ભાર\nસંશય ટળ્યા ને ભ્રમણા ભાંગી, નિર્ભય બન્યા તત્કાળ ... બાપાને.\n\nફાગણ સુદ ચૌદશ ને દિવસે, મળ્યો ગુરુ નો વાર\nસાડા નવ વાગ્યે અભય પદ પામ્યા, પહોંચ્યા છે નિર્વાણ ... બાપાને.\n\nપાલખી ચાલી ગુરુ ચરણે, મેળો ભરાયો અપાર\nઅબીલ ગુલાલ ને ફૂલો ની દૃષ્ટિ, વરતાણો જય જયકાર ... બાપાને.\n\nઅનેક લોકો ઉમટી આવ્યા, અસંખ્ય ને અપરંપાર\nદેવી દેવતા સર્વે આવ્યા, દર્શન કરવા અગણવાર ... બાપાને.\n\nઅમર ગુરૂ ચરણો માં રહીને, બોલે બાળક તમાર\nદાસ ખોડા ને સદાય ચરણો માં રાખજો, એવું માંગુ વારંવાર ... બાપાને."
  },
  {
    "title": "૪૯૧. તમારી કૃપાનો નહિં પાર, મુજ ભૂલ છે અપરંપાર (૪૨૦)",
    "slug": "491-tamari-krupano-nahin-para-muja-bhula-che-aparapara",
    "authorSlug": "ramesh",
    "category": "રમેશ",
    "sortOrder": 491,
    "lyrics": "તમારી કૃપાનો નહિં પાર, મુજ ભૂલ છે અપરંપાર\nક્ષમા આપનારા, જન્મો જન્મ શરણ તમારું માંગુ ... (ટેક)\n\nઅનંત જન્મ નો ભટકતો, હે આવ્યો શરણ તમારે\nનહિં જોઈ જાત કે ભાત, પાડી દીધી અનેરી ભાત, સદ્ગુરુ મારા ... જન્મો.\n\nતમારી કૃપાનો નહિં મળે જોટો, છતાં બનું છું ક્યારેક ખોટો\nતમે મારૂ કરજો નિર્માણ, તમારૂ રાખજો પ્રમાણ સદ્ગુરુ મારા ... જન્મો.\n\nતમારૂ ભજન સદા હું તો માંગુ, મારા ભવની પીડા ને ભાંગુ\nરહું તમારા માં લીન, બની જાઉં તલ્લીન, એવું મન માંગુ ... જન્મો.\n\nહું તો અજ્ઞાન અબૂધ બાળ, તમે રાખજો સદાય સંભાળ\nકરે નમન રમેશ તમે છો મારા મહેશ, બ્રહ્મા, વિષ્ણુ ... જન્મો."
  },
  {
    "title": "૪૯૨. એક અેલું છે નામ જેનું ધરાઈ ધામ (૪૨૧)",
    "slug": "492-eka-aelun-che-nama-jenun-dharai-dhama",
    "authorSlug": "ramesh",
    "category": "રમેશ",
    "sortOrder": 492,
    "lyrics": "એક અેલું છે નામ જેનું ધરાઈ ધામ\nસદ્ગુરુ શ્યામ, જ્યાં છે પ્રગટ તમારા ધામ ... (ટેક)\n\nઈ છે તમારી જન્મભૂમિ, ક્યાં છે પ્રગટ તમારા મૂડામ\nસેવા કરી નિષ્કામ, મળિયા ગુરુ ઘુસારામ, સદ્ગુરુ શ્યામ ... જ્યાં.\n\nતમે કાઢી મારા મનની ભામ, આપ્યા સમરણ દમ દમ\nપ્રેમ આપ્યો રોમે રોમ, નીકળી જાય વહેમ, સદ્ગુરુ શ્યામ ... જ્યાં.\n\nતમે ભડતી ને આપી છે હામ, શાંતિ બતાવી અગમનિગમ\nએવો બતાવ્યો ધર્મ, શાંતિ આપી પરમ ... જ્યાં.\n\nતમે અનેક કર્યા છે કામ, મારા માટે છો દીનાનાથ\nરમેશ ક્રે રે પ્રણામ, આપો તમારો પ્રેમ, સદ્ગુરુ શ્યામ ... જ્યાં."
  },
  {
    "title": "૪૯૩. એવા કૃપા રે કરજો અમ્મ પર, સદાય રાખજો સંગાથ (૪૨૨)",
    "slug": "493-eva-krupa-re-karajo-amma-para-sadaya-rakhajo-sangatha",
    "authorSlug": "ramesh",
    "category": "રમેશ",
    "sortOrder": 493,
    "lyrics": "એવા કૃપા રે કરજો અમ્મ પર, સદાય રાખજો સંગાથ ... (ટેક)\n\nએવા ભટકેલા મનના અમે બાળ, રાખો તમે સહાય બાળ\nએવાં અમને રે છોડીને ક્યાં તમે જશો, તમે છો જુગોજુગનાં રખવાળ ... એવા.\n\nએવી રજની રે સૂની ચંદ્ર વિના, એમ સૂના અમે તારા બાળ\nએવાં વિચારે દિલ રહે રોતુ, આંખલડી થાય છે જળ જળ ... એવા.\n\nએવા સદ્ગુરુ તમે છો રત્નાકર, અમે છિએ ગરણાં મારા નાથ\nએવા અમને સમાવજો આપમાં, કૃપા કરી ને દીનાનાથ ... એવા.\n\nએવી કર જોડી ન વિનવે દાસ નો દાસ, રમેશ તમારો બાળ\nએવી રજ રે કરમે આપ ચરણની, મટી જાય સર્વે કંગાળ ... એવા."
  },
  {
    "title": "૪૯૪. લીધો ધન્ય અવતાર ધરાઈ માંહી રે (૪૨૩)",
    "slug": "494-lidho-dhanya-avatara-dharai-manhi-re",
    "authorSlug": "ramesh",
    "category": "રમેશ",
    "sortOrder": 494,
    "lyrics": "લીધો ધન્ય અવતાર ધરાઈ માંહી રે\nસફળ કર્યું જીવન સમરણ સેવાથી રે\nજેનાં કેમ કરી ગુણ હું ગાઉ ... (ટેક)\n\nસંસાર સાગરમાં ભૂલા પડેલા કઈંક જીવો ને કાજ\nબેલી બની ને આવ્યા તમે, રાખી બધાની લાજ, બાત બનાવી ર્ત્ય લીધી.\n\nસત્ય તણો સત્સંગ કરાવ્યો, આપ્યુ છે ગણપત નામ\nઓહમ સોહમ નામ બતાવી, આપ્યુ છે નિજજ્ઞાન, ભ્રમ મિટાવી રે ... લીધો.\n\nસમજણ વિનાનો તમારો બાળ, રાખજો સદાય સંભાળ\nજન્મોજનમ સાથે રાખજો, દયા કરીને દયાળ, આજીવન માટે રે ... લીધો.\n\nધન્ય માતા, ધન્ય પિતા, ધન્ય સદ્ગુરુ શ્યામ\nત્રણે મળી ને કૂપા કીધી, ભણી ત્રિવેણી સંગમ, મારા માટે રે ... લીધો.\n\nરમેશ ગાય છે ડાહ્યુઘેલુ, ના દેશો અભિમાન\nશ્યામ ધણી સૌને રાખજો, તમારા ચરણોની માંય, કાયમ માટે રે ... લીધો."
  },
  {
    "title": "૪૯૫. સદ્ગુરુ મારા ફૂલ સરીખા (૪૨૪)",
    "slug": "495-sadguru-mara-phula-sarikha",
    "authorSlug": "ramesh",
    "category": "રમેશ",
    "sortOrder": 495,
    "lyrics": "સદ્ગુરુ મારા ફૂલ સરીખા\nસુવાસ નો કોઈ પાર નથી (તેની) ... (ટેક)\n\nજેનાં મુખમાં ગંગા વહેલી છે, એ ગંગા નિર્મળ નીર વહે\nએ નીરમાં તો મનડુ ધોતા, મનને તો આનંદ મળે (મારા) ... સદ્ગુરુ.\n\nએની આંખો માં અમી ઝરણુ છે, એની આંખોમાં દ્રષ્ટિ છે\nએ કૃપાનો જો લાભ મળે તો, જીવન મંગલમય બને (મારૂ) ... સદ્ગુરુ.\n\nએ તો દિલનાં દયાસાગર છે, એની કરુણા નો કોઈ પાર નથી\nએ કરુણાકરનાં દર્શન કરતા, જીવન મારૂ ધન્ય ધન્ય બને ... સદ્ગુરુ.\n\nએવાં સદ્ગુરુ મારા શ્યામ છે, એનાં ગુણ નો અપરંપાર છે\nએવો રમેશ તેનાં ગુણલા ગાતો, એજ તેનો ઉપકાર છે ... સદ્ગુરુ."
  },
  {
    "title": "૪૯૬. મુજ ઉપર હોવો હાથ, સદ્ગુરુ તમારે હાથ છે દોર (૪૨૫)",
    "slug": "496-muja-upara-hovo-hatha-sadguru-tamare-hatha-che-dora",
    "authorSlug": "ramesh",
    "category": "રમેશ",
    "sortOrder": 496,
    "lyrics": "મુજ ઉપર હોવો હાથ, સદ્ગુરુ તમારે હાથ છે દોર ... (ટેક)\nકઈં કપાાઈ ગયા છે, ત્રાળ છે, તારા મને બાર તાર\nમારે તમે રાખજો ને સંભાળ ગુરુ એક તાર ... ગુરુ.\n\nસૂરતા રૂપ સાબુ દ્યોને, વચન નામ રૂપ આપોચ ક્ષાલન મંહી સાર\nપછી બેંગો રંગ હો્ય ધોળો, નામ મય મૂર ગુપ્ત હોઅ ... ગુરુ.\n\nવ્યવસાય ડિગત નો લઈ ને તમે ક્યા પંપા પામર\nબાંધ્યા વળી આા સો શ્યામ રૂપ કોનો માતર ... ગુરુ.\n\nમુજ પતંગ ને ઊંચા ચડાવો, ઉરાવો ગગન વિહાર\nમાધ્યમ આવતા આવરણોથી પેચ મંગળ કરો મેદાન બહાર ... ગુરુ.\n\nપછી બેંગલ મુક્ત હોઅ, હુ તો બસ રહે દર્શનની પાર\nકૂપા કરડ પહડ તમે ખેંચો, મારા સદ્ગુરુ થાપવનાર ... ગુરુ.\n\nવિષયો રૂપ મુસવારા નામ પક્ષ, થઈ ભાવ હરેદમ સ્થિર\nબંતે કૂપા થાચે રમેશ, ગુરુમુખ ના શ્યામ સરકાર ... ગુરુ."
  },
  {
    "title": "૪૯૭. સાયરાં રુડાં સૂર, એકી વાલીડા નાં નેણુમાં વરસે ઝીણા નૂર (૩૫૮)",
    "slug": "497-sayaran-rudan-sura-eki-valida-nan-nenuman-varase-zhina-nura",
    "authorSlug": "dada-mekaran",
    "category": "દાદા મેકરાણ",
    "sortOrder": 497,
    "lyrics": "સાયરાં રુડાં સૂર, એકી વાલીડા નાં નેણુમાં વરસે ઝીણા નૂર\nએ આવો, આવો તો મળીએ ... (ટેક)\n\nમળતા ની સાથે આપણે હલીમળી રહીએ, કાઢીએ દિલડાનાં કૂડ\nએમાં સાહેબજી મારો રાજી રહે છે, કાળજા ફુલ્યા જુણો કૂલ ... એ આવો.\n\nખોરા બોલાનો આપણે સંગ ન કરીએ, આદ અનાદ નાં બોલે કૂડ\nએની આંખોમાં નાખો ઝીણી ધૂડ ... એ આવો.\n\nહરિજન હોય તેને ઝાઝેરી અમ્મા, એનાં કેસર વરણો હોય નૂર\nએની સંગતુ આપણે દોડી દોડી કરીએ, જમડા ને રાખે ઈ તો દૂર ... એ આવો.\n\nકાંચા માયા નો તમે ગર્વ ન કરજો, અહિયાં તો રહેવાનું છે કૂડ\nમેકરણ કાપડી એકી વિધિ બોલ્યા રે, જાવું છે પાછા ઈંદે પુરૂ ... એ આવો."
  },
  {
    "title": "૪૯૮. મારી મેનારે બોલે ઊઠ ને કાંગરે (૩૫૯)",
    "slug": "498-mari-menare-bole-utha-ne-kangare",
    "authorSlug": "dada-mekaran",
    "category": "દાદા મેકરાણ",
    "sortOrder": 498,
    "lyrics": "મારી મેનારે બોલે ઊઠ ને કાંગરે\nકાયા નાં કૂડા રે ભરોસા, દેહ નાં જૂઠા રે દિલાસા ... (ટેક)\n\nછિપુ તો સમદરિયામાં નીપજે રે\nમોતીડા છે રે છિપ ની માંય રે ... મારી.\n\nએલો મૃગલો ઘૂમે વન ની માંય રે\nકસ્તૂરી છે રે મૃગલા ની માંય રે ... મારી.\n\nમાટી રે મંગાવો સારા શહેર ની રે\nહિરલા છે રે ધરતી ની માંય રે ... મારી.\n\nએજી મેના ને મેકરણ બેઉ એક છે રે\nએને તમે જૂદા રે ન જાણો રે ... મારી."
  },
  {
    "title": "૪૯૯. એ ભમરા તું ભલે આવ્યો રે, છો તું પ્રેમ નામનો પ્યાસી (૩૬૧)",
    "slug": "499-e-bhamara-tun-bhale-avyo-re-cho-tun-prema-namano-pyasi",
    "authorSlug": "guru-nanak",
    "category": "ગુરુ નાનક",
    "sortOrder": 499,
    "lyrics": "એ ભમરા તું ભલે આવ્યો રે, છો તું પ્રેમ નામનો પ્યાસી\nપ્રેમ નામનો પ્યાસી છો તું, સત વૈકુંઠ નો વાસી ... (ટેક)\n\nસ્વર્ગ ભુવન થી આવ્યો ભમરો, સત વૈકુંઠ નો વાસી\nઅમૃત પ્યાલા સંતો એ પાયા, છુટી ગઈ ચોરાશી ... ભમરા.\n\nફર ભમરા આ ઘરની વાયુ, ઉન્મુન થઈને આશાધી\nઝલહલ ઝલહલ જ્યોત બલત હે, કું ભળી તો લહેર લાગી ... ભમરા.\n\nકામ, ક્રોધ, મમતા ને મારો, કૂઆ જોબન માં ભળી\nઅજબ ખેલ મારા ગુરુજી આગે, હું વચન બોલું છું વેરાણી ... ભમરા.\n\nસદ્ગુરુજી ની કરી લ્યો સેવા, જુવો તન મનમાં તાણી\nગુરુ ગોંણ ચરણે નાનક બોલ્યા, મારી જરામરણ બે ભાંગી ... ભમરા."
  },
  {
    "title": "૫૦૦. સકલ હંસ મેં રામ અમારા, રામ સમોવડ કોઈ નહિં (૩૬૨)",
    "slug": "500-sakala-hansa-men-rama-amara-rama-samovada-koi-nahin",
    "authorSlug": "guru-nanak",
    "category": "ગુરુ નાનક",
    "sortOrder": 500,
    "lyrics": "સકલ હંસ મેં રામ અમારા, રામ સમોવડ કોઈ નહિં\nપિંડ બ્રહ્માંડ માં જુઓ તપાસી, રામ વિનાનું ઠાલું ઠામ નહિં\n\nતન તવેણીમાં તેજ છે તેનું, પાંચેય તત્વ માં જ્યોતિ ખડી\nએનું અજવાળું જુઓ ત્રણે ભુવનમાં, સુરતા દોરી એ વ્યાસમાન ઘડી ... સકલ.\n\nનાભિ કમળ માં નિરખી જોઈ લ્યો, કાયાનગર ની ખબર પડી\nછત્રીશ વાજા આ તનમાં વાગે, ગગન મંડપ મેં નોબત ગડી ... સકલ.\n\nહિરા માણેક મોતી નાં માસમી, રતન પદાર્થ પામ્યા પારસમણી\nપ્રેમના પ્યાલા જ્યારે સદ્ગુરુ એ પાયા, ધાર્યાં સંત કોઇ ધૂન ધણી ... સકલ.\n\nજ્ઞાની હોઈ તે ઘરમાં ખોજે, સાત સાગર માંહી જુવે મથી\nકહે નાનક સદ્ગુરુ પ્રતાપે, રામ વિના બીજું કાંઈ નથી ... સકલ."
  },
  {
    "title": "૫૦૧. દેવાયત પંડિત દાડા દાખવે, સુણી લેને દેવલદે નાર (૩૬૪)",
    "slug": "501-devayata-pandita-dada-dakhave-suni-lene-devalade-nara",
    "authorSlug": "devayat",
    "category": "દેવાયત",
    "sortOrder": 501,
    "lyrics": "દેવાયત પંડિત દાડા દાખવે, સુણી લેને દેવલદે નાર\nઆપણા ગુરુએ સત ભાખીયા, જૂઠડા નહિં રે લગાર\nલખ્યા રે ભાખ્યા સોઈ દિન આવશે ... (ટેક)\n\nપહેલા પહેલા પવન ફરકશે, નદીએ નહિં હોય નીર\nઓત્તર થકી રે સાહબો આવશે, મુખે હનુમો વીર ... લખ્યા રે.\n\nધરતી માથે હેમર હાલશે, સૂના નગર મોઝાર\nલક્ષ્મી લૂંટાશે લોકો તણી, જેની નહિં રાવ કે ફરિયાદ ... લખ્યા રે.\n\nપોરો રે આવ્યો સંતો આપણો, ધરતી માંગે છે ભોગ\nકેટલાક ખડગે સહારશે, કેટલાક મરશે રોગ ... લખ્યા રે.\n\nખોટા પુસ્તક ખોટા પાણિયા, ખોટા કાજી નાં કુરાન\nઅસલ ભાટી બુંગી પહેરશે, એવાં આગમ નાં એંધાણ ... લખ્યા રે.\n\nકાંકરીયા તળાવે તંબૂ તણાશે, સો સો ગામની સીમ\nરૂડી દિસે રળીયામણી, ભેળા અર્જુન ને ભીમ ... લખ્યા રે.\n\nજતિ સતી ને સાબરમતી, ત્યાં હશે શૂરાનાં સંગ્રામ\nઓત્તર ખંડ થી સાયબો આવશે, આવે મારા જુગનો જીવન ... લખ્યા રે.\n\nકાયમ કાલિંગા ને મારશે, નકલંક ધારશે નામ\nકળિયુગ ઉથાપી સતયુગ સ્થાપશે, બોલ્યા દેવાયત પીર ... લખ્યા રે.\n\nકળિયુગ ઉથાપી સતયુગ સ્થાપશે, નકલંક ધરશે અવતાર\nદેવાયત પંડિત એમ બોલીયા, ઈ છે આગમ નાં એંધાણ ... લખ્યા રે."
  },
  {
    "title": "૫૦૨. લીંબી આતમ ને સમજાવે, મારા ગુરુજી ને કહેજે રૂડા જ્ઞાન (૩૬૫)",
    "slug": "502-limbi-atama-ne-samajave-mara-guruji-ne-kaheje-ruda-jnana",
    "authorSlug": "devayat",
    "category": "દેવાયત",
    "sortOrder": 502,
    "lyrics": "લીંબી આતમ ને સમજાવે\nમારા ગુરુજી ને કહેજે રૂડા જ્ઞાન તો બતાવશે ... (ટેક)\n\nહંસલા મેલીને રે બગલા કૌણ સેવશે\nબગલા તનનાં ધોળા ને મન નાં મેલા ... મારા.\n\nહિરલા મેલીને રે પથરા કૌણ સેવશે\nપથરા ઉપર ભીના ને અંદર કોરા ... મારા.\n\nકેશર મેલીને રે, કેશુડા કૌણ સેવશે\nકેશુડા અંગનાં રાતા ને મુખ નાં કાળા ... મારા.\n\nસુણારા મેલીને જીણારા કૌણ સેવશે\nજીણારા નિશ્ચય નરકે લઈ જાય ... મારા.\n\nસાંભળો ને સંતો દેવાયત બોલીયા\nમારા સંતોનો બદલો વળાયો ... મારા."
  },
  {
    "title": "૫૦૩. એલી વાલમ વિરહની રે, આ નિશા તને ક્યાંથી પડી (૩૬૬)",
    "slug": "503-eli-valama-virahani-re-a-nisha-tane-kyanthi-padi",
    "authorSlug": "hothi",
    "category": "હોથી",
    "sortOrder": 503,
    "lyrics": "એલી વાલમ વિરહની રે, આ નિશા તને ક્યાંથી પડી\nએવો આ રંગ શેનો રે, જાણે બીજી ભાત પડી ... (ટેક)\n\nઆત્મા ચિન્હા વિના આત્મા મારા, કુઠ્ઠુ છે બ્રહ્મજ્ઞાન\nભક્તિ તણો તને ભેદ ન લાધ્યો, જેને હંસા ની પરહણ\nએવો વાઇઠ થઈને રે, કાંઠે કાઢે હૂડ હડી ... એલી.\n\nનટવા હીંડોળ નાચે ખિલ, જઈ બેઠો વાંસ ચડી\nઆ પલ ચૂક્યો આત્મા તો, અધવચ રહીશ અડી\nએવો જોણ ન સાધ્યો રે, ખેલ તો આવ્યો ખરાખરી ... એલી.\n\nસંત ને શૂરા સન્મુખ રહેવે, સાચી જેની રાગ મણાઈ\nપૂરવ નાં નર પ્રગટ ખેલ, નિત નિત ઉનજી વધાઈ\nએવાં રણાવટે ચડજો રે, હાથમાં લઇ જ્ઞાન છડી ... એલી.\n\nનિત ઉડી મારે ન્હાવા જવું, ત્રવેણી ટંકશાળ\nદાસ હોથી ને ગુરુ મોરાર મળિયા, શામળે લીધી સંભાળ\nએવી કરુણા વહાલે કીધી રે, કાઢી મારી દુર્બુદ્ધિ કડી ... એલી."
  },
  {
    "title": "૫૦૪. વૃતિ મારી રામચરણમાં લાગી રે (૩૬૭)",
    "slug": "504-vruti-mari-ramacharanama-lagi-re",
    "authorSlug": "hothi",
    "category": "હોથી",
    "sortOrder": 504,
    "lyrics": "વૃતિ મારી રામચરણમાં લાગી રે\nસુરતા મારી સાધુચરણમાં લાગી રે\nતેણે મારી ભવની બાવડ ભાંગી રે ... (ટેક)\n\nસતગુરુ એ મને શબ્દ સુણાવ્યો ને, રણુંકાર રર લાગી\nતખત ત્રિવેણીનાં તીર ઉપર, મોહન મોરલી વાગી ... વૃતિ.\n\nઘણાં દિવસ થયા મન મસ્તાનું ફરતુ હતુ, દિલડે ન મિયુ જાણી\nપુરુષ મળીયા મને અમર અણુતા, ત્યારે સુરતા શૂન્યમાં લાગી ... વૃતિ.\n\nદયા કરીને મન ડોલતુ રાખ્યુ, તૃષ્ણા મેલાણ ત્યાગી\nસતગુરુ આગળ શિશ નમાવ્યુ, ત્યારે બાવડી પકડી લીધી ... વૃતિ.\n\nસદ્ગુરુએ મને કરુણા કીધી ને, હૃદય માં પ્રેમ જ્યોત પ્રકાશી\nદાસ હોથીને ગુરુ મોરાર મળિયા, ત્યારે તુટી જમડા કેરી ફાંસી ... વૃતિ."
  },
  {
    "title": "૫૦૫. હાલો મારા હરિજનની હાટોડીએ, વૈરાગ તો સાચો ગુરુ ની વાટોડીએ રે (૩૬૮)",
    "slug": "505-halo-mara-harijanani-hatodie-vairaga-to-sacho-guru-ni-vatodie-re",
    "authorSlug": "hothi",
    "category": "હોથી",
    "sortOrder": 505,
    "lyrics": "હાલો મારા હરિજનની હાટોડીએ, વૈરાગ તો સાચો ગુરુ ની વાટોડીએ રે ... (ટેક)\nદિલસાની વણજ કરી લ્યો વેપારી, ખોટ નહિં આવે દામની ધારણીએ રે\n\nપ્રેમનાં પાવડા તમે પહરીને ચાલો હાથમાં, ઝોળી લાધ્યા લીઝા બાટોડીએ ... હાલો.\n\nનિરાશા ભરીને તમે નાયડા નિરખ્યા, અનુભવ દિવ્ય ગગન સાંપડીએ ... હાલો.\n\nદાસ રે હોથી ને ગુરુ મોરાર મળિયા, તાણી બાણ પ્રભુ વન વાટોડીએ રે ... હાલો."
  },
  {
    "title": "૫૦૬. મેં ગોવાળણ, તેરે કાનુડાની માખણની વે વચામણ રે (૩૬૯)",
    "slug": "506-men-govalana-tere-kanudani-makhanani-ve-vachamana-re",
    "authorSlug": "bhakhar",
    "category": "ભાખર",
    "sortOrder": 506,
    "lyrics": "મેં ગોવાળણ, તેરે કાનુડાની માખણની વે વચામણ રે ... (ટેક)\nઇશણે મેં તો ઈંડોણી બાંધી, પાલવ વચવાહામ રે\n\nગાગર મહીની મેં તો ગોળી લીધી, આશાની ઈ વચાણની રે\nગાય ભેંસ મેં તો ગોધન બાંધ્યા, હૃદયા ની ઈ વચાણ રે\n\nવાછરૂ ભરોસે કોઠડા બાંધ્યા, બાંધ્યા ઈ વટ નાણ રે ... મેં.\nવલોણું ભરોસે મેં તો ધોંસડું બાંધ્યું, વલોણા ની ઈ વચાણ રે\n\nનેતરા ભરોસે મારી કાવડી લીધી, દૂધ માં રેડ્યા પાણી રે ... મેં.\nદોહણી લીધી મને સૌ કોઈ કહે છે, દોહણ હું રેંણ માં રેલ રે\n\nભણે ભાખર નાં સ્વામિ, પૂરણ પ્રિત બંધાણી રે ... મેં."
  },
  {
    "title": "૫૦૭. તારી અકળ કળા નવ જાણી મેરે દાતા (૩૭૧)",
    "slug": "507-tari-akala-kala-nava-jani-mere-data",
    "authorSlug": "lakhmo-mali",
    "category": "લખમો માળી",
    "sortOrder": 507,
    "lyrics": "તારી અકળ કળા નવ જાણી મેરે દાતા\nઅકળ કળા ન ઓળખાણી ... (ટેક)\n\nપ્રથમ તો પેદા કરીયાં, પવન જળ ને પાણી\nબ્રહ્મનાભિ તારું બાળુ બિરાજે, અનુભવે રમતો વ્યાપી ... મેરે.\n\nએક બાડી ને બીજી બાબડી, એક દેવ ને દુજો દાણત\nએક ને માથે ચમ્મર બિરાજે, દુજો ભરે ઘર પાણિ ... મેરે.\n\nરાજ તો રાવણ ને દીધું, જરા મરણ ન જાણી\nઘડી પલમાં લંકા પ્રજળી, ઉતેળ ન રાખી ર્દાણી ... મેરે.\n\nસુરતા રાખે તો એક શબ્દ સુણાવું, વેદની સુણાવું વાણી\nદોઇ કરજોડી લખમોજી બોલ્યા, અનુભવે રમતો વ્યાપી ... મેરે."
  },
  {
    "title": "૫૦૮. જેને રે દિઠે મારા નેણલા ઠરે હે બાપુ (૩૭૨)",
    "slug": "508-jene-re-dithe-mara-nenala-thare-he-bapu",
    "authorSlug": "lakhmo-mali",
    "category": "લખમો માળી",
    "sortOrder": 508,
    "lyrics": "જેને રે દિઠે મારા નેણલા ઠરે હે બાપુ\nઅમને એવાં એવાં સંતો મળે ... (ટેક)\n\nઉદર માંહી એક બૂંદ પડે, ને ભગતનું નામ ધરે\nનરક છોડાવી જે ન્યારા કરે, આવે તો અમરલોક ને વરે ... અમને.\n\nચાલતા નર ધરતી ન દુભવે, જીવ થકી તો ડરે\nશબ્દ વિવેકી શુદ્ધ સુલક્ષણા, પૂછી ને પાવ ધરે ... અમને.\n\nત્રિગુણી પૂતળી શ્યામ છે, શૂનમાં હોકાર ઘાટ ઘડે\nએવા રે સંસારમાં સંત સુહાગી, બેઠા બેઠા ભજન કરે ... અમને.\n\nકાયાવાડી નો ભમરલો ભાઈ, સહેજે ઓધ્યુ ધરે\nગુરુજી નો શબ્દ એવો છે ભાઈ, ખોજે તો ખબરૂ પડે ... અમને.\n\nવર્ષાઋતુ નો જેમ પરપોટો, એ તો નિર માં નિર થઈ ભળે\nલખમા નાં સ્વામિને સંગે રમતા, શાંતિ નાં બૂંદ ઝરે ... અમને."
  },
  {
    "title": "૫૦૯. તું મનરૂપી મૃગલા ને માર રે ગુણવંત જ્ઞાની (૫૧૫)",
    "slug": "509-tun-manarupi-mrugana-ne-mara-re-gunavanta-jnani",
    "authorSlug": "jan-chotam",
    "category": "જન છોટમ",
    "sortOrder": 509,
    "lyrics": "તું મનરૂપી મૃગલા ને માર રે ગુણવંત જ્ઞાની\nજ્ઞાન કસ્તુરી સંઘાર રે ગુણવંત જ્ઞાની ... (ટેક)\n\nમન મૃગ ની નાભિ વિષે છે, પ્રણવ કસ્તુરી સાર\nઆખા વિશ્વ માં બહેકે વાસના, તું નથી લેતો લગાર ... ગુણવંત.\n\nભ્રમણા થી ભમતો ભમે, વિષયારણ્ય મોઝાર\nતેને વશ કરવા તને દિયા શ્રી ગુરુએ હથિયાર ... ગુણવંત.\n\nસાત સ્વરે સોહામણું, તનમાં અનાહત યંત્ર\nઅનાહદ નાદ તેમાં વસે, તે છે મૃગ વ્યાહરણ મંત્ર ... ગુણવંત.\n\nનાદે આવી મોહે મૃગલું, આવી ને આધીન થાય\nફરી ભવમાં ભટકે નહિ, ઘડી અળગો ન જાય ... ગુણવંત.\n\nમન મૃગ વશ જ્યારે બને, ત્યારે પ્રભુ વશ થાય\nપાપ તાપ ત્યારે ટળે, જન છોટમ સુખીયો થાય ... ગુણવંત."
  },
  {
    "title": "૫૧૦. નવ અંતર થાય ઉકેલ, જ્ઞાની સદ્ગુરુ વિના (૫૧૬)",
    "slug": "510-nava-antara-thaya-ukela-jnani-sadaguru-vina",
    "authorSlug": "jan-chotam",
    "category": "જન છોટમ",
    "sortOrder": 510,
    "lyrics": "નવ અંતર થાય ઉકેલ, જ્ઞાની સદ્ગુરુ વિના\nકોઠો ભાંગે નહિં ભવ જેલ, ન થાય ઉપાસના ... જ્ઞાની.\n\nસાડા ત્રણ મણ સૂતર ગુંથાયું, તેનો હાથ ન લાગે તાર\nશું કરે બુદ્ધિ બાયડી રે, જેના ઘરમાં ઘણો અંધકાર ... જ્ઞાની.\n\nતે અંધારા ઉલેચવા રે, બીજા અનેક ઉપાય\nઅનુભવ અર્ક ઉગ્યા વિના રે, કોઈ કાળે તે અળગું ન થાય ... જ્ઞાની.\n\nક્યાં થકી જીવ આવ્યો, ને પિંડ મધ્યે ક્યાં વાસ\nપિંડ પડ્યા પછી ક્યાં જાશે રે, તેની કોઈએ ન કીધી તપાસ ... જ્ઞાની.\n\nએમ વિચાર વિના ગયા રે, ઘણાં ઘસતા હાથ\nસદ્ગુરુ લક્ષ લધ્યા વિના રે, કેમ મળશે ત્રિભુવન નાથ ... જ્ઞાની.\n\nતૃષા ન ફિટે તોય વિણ, ભૂખ ભોજન વિણ નવ જાય\nગુરુ વિના હરિ નવ મળે રે, ભલે કરીએ કોટિ ઉપાય ... જ્ઞાની.\n\nથોડા માં ઘણું કહ્યું, પણ કોઈ ન બેસે ઘાટ\nછોટમ સજ્જન સમજશે રે, ભલે દુર્જન બારી વાટ ... જ્ઞાની."
  },
  {
    "title": "૫૧૧. ગુરુ બિન મર્મ ન જાણે, કોઈ નવ ગુરુ બિન મર્મ ન જાણે (૪૧૦)",
    "slug": "511-guru-bina-marma-na-jane-koi-nava-guru-bina-marma-na-jane",
    "authorSlug": "jan-chotam",
    "category": "જન છોટમ",
    "sortOrder": 511,
    "lyrics": "ગુરુ બિન મર્મ ન જાણે, કોઈ નવ ગુરુ બિન મર્મ ન જાણે (ટેક)\nબ્રહ્મ ભણાવે કોટી ઢોંઢાને, ગુરુ બિન મર્મ ન જાણે ... (૨૩)\n\nબાવન અક્ષર માળા પોરો, કળ સે ભરી છે કોળી\nજીવ દેહ માં રહી ને રહે, પણ પુંજી સચવાય પ્રાણની ... ગુરુ.\n\nઔષધ સઘળાં ગાળી ને ધરે, પણ વૈદ વિના મરે રોગી\nહરિનું ધ્યાન પણ ગુરુ વિના ધાર્યું, કેમ પડે નિયોગી ... ગુરુ.\n\nમહા સિંધુ માં નૌકા મેલી, તરણ પાર ઉતારે\nનાવિક વિના યુક્તિ ભ્રમે, તે કેમ કરી સર્વે તારે ... ગુરુ.\n\nઅર્ક વિના સઘળું અંધારું, પાસ પડ્યું ના સૂઝે\nજન છોટમ ગુરુ જ્ઞાન મળે, તો પ્રગટ પ્રભુને બૂઝે ... ગુરુ."
  },
  {
    "title": "૫૧૨. અલખ ધૂન લાગી ગગન મેં, મગન ભયા મન મેરા (૩૭૩)",
    "slug": "512-alakha-dhuna-lagi-gagana-men-magana-bhaya-mana-mera",
    "authorSlug": "jan-chotam",
    "category": "જન છોટમ",
    "sortOrder": 512,
    "lyrics": "અલખ ધૂન લાગી ગગન મેં, મગન ભયા મન મેરા\nઆસન મારી સુરતા દ્રઢ ધારી, દિયા અગમ ઘર ડેરા ... (ટેક)\n\nઇંગલા પીંગલા દોનુ છાંડે, સુક્ષમણા મધ્યે ધારા\nત્રિવેણી એ તાર મિલાવી, અજંપા નામ ઉચ્ચારા ... અલખ.\n\nયંત્ર અનાહત બાજે અહર્નિશ, હોત નાદ ઝણકારા\nતન બિચ હોત અદ્ભૂત ગર્જના, બરસે અમૃત ધારા ... અગમ.\n\nકોટી કોટી રવિ શશી કી શોભા, ઝગમગ જ્યોતિ ઉજારા\nજન છોટમ સદ્ગુરુ પ્રતાપે, દરશ્યા અલખ દિદારા ... અલખ."
  },
  {
    "title": "૫૧૩. પૃથ્વી પાખંડ વ્યાપી રે, સત્ય ની શોધ નથી લાધી (૩૭૪)",
    "slug": "513-pruthvi-pakhanda-vyapi-re-satya-ni-shodha-nathi-ladhi",
    "authorSlug": "jan-chotam",
    "category": "જન છોટમ",
    "sortOrder": 513,
    "lyrics": "પૃથ્વી પાખંડ વ્યાપી રે, સત્ય ની શોધ નથી લાધી ... (ટેક)\n\nમહા અભિમાન મટે નહિ મનથી, માને હું મોટો\nપ્રપંચે પરધન હરવાને, ખેલ કરે છે ખોટો ... સત્ય.\n\nધર્મ બ્રહ્મ ની વાત ન માને, ગુરુ થઈ ને ગાજે\nઓથે રહી ને અનર્થ કરતા, લંપટ નવ લાજે ... સત્ય.\n\nપ્રભુનું નામ ધરીને કહે છે હું છું ઈશ્વર આપે\nએક રહેમ ઉપજે નહિં એથી, દુઃખ કીના કાપે ... સત્ય.\n\nવેદ શાસ્ત્ર ની વાત ન જાણે, કહે મોરા જ્ઞાની\nકહે છોટમ ઢોંગી ગુરુથી, થઈ છે ધર્મ તણી હાનિ ... સત્ય."
  },
  {
    "title": "૫૧૪. અલખ તુમારી અકળિત માયા, તેરા ભેદ કિસી ને ન પાાયા (૩૩૫)",
    "slug": "514-alakha-tumari-akalita-maya-tera-bheda-kisi-ne-na-payaya",
    "authorSlug": "anvar",
    "category": "અનવર",
    "sortOrder": 514,
    "lyrics": "અલખ તુમારી અકળિત માયા, તેરા ભેદ કિસી ને ન પાાયા\nનાચ નચાવે સરવે જાન કો, અકલીત માયા ... (ટેક)\n\nન સરગમ કા હુઆ દિવાના, ન મૂરખ કે દાયા\nજુગ સે મિલતા સબસે ન્યારા, બેસા રંગ જમાયા ... અલખ.\n\nમાત ઉદેવ વો સબકા વેરી, પાપંડ શિર છાયા\nદયાળુ કોઈ જાત ન માને, ઐસા ભેદ રચાાયા ... અલખ.\n\nખરે મારગ કોઇ સંત મિલાવે, ગુરુ સબ કોઇ ગાયા\nઆ નગર બંધન કા પ્રીત, તુ ને હિક બનાયા ... અલખ.\n\nકર્મી બંદી ઔર દિલબંદી મેં, તુંહી આપ સમાયા\nગુરુ બિન મુક્તિ તન છોડ કે, કોઇ નર રે ન થાયા ... અલખ.\n\nમોક્ષ પદારથ તુંહી પાાયા, સ્વર્ગ ભલેં તુને પાાયા\nતઇ કુંડ માં તુંહી બગાાયા, કૈસા ખેલ રચાાયા ... અલખ.\n\nસબ ઘર મેં હરિ તુંહી પ્રગટ હે, તેરી હે સબ છાયા\nઅનવર તેરા સગપણ તૂટે, કૂટ મિલન કી છાયા ... અલખ."
  },
  {
    "title": "૫૧૫. અગાર હે શકીલ મિલને કા, તો અહમ બાદ સભાતા ક્ય (૩૩૬)",
    "slug": "515-agara-he-shakila-milane-ka-to-ahama-bada-sabhata-kya",
    "authorSlug": "mansur",
    "category": "મંસૂર",
    "sortOrder": 515,
    "lyrics": "અગાર હે શકીલ મિલને કા, તો અહમ બાદ સભાતા ક્ય\nકલંદર પુદગુનાહ કા, અલમ તન પર લગાતા ક્ય ... (ટેક)\n\nપકડકર ઇશ્ક કી ગડુ, બાંધા ઘર દિલ કી દિલ કો\nહવા કી ધૂન કો બોલ, મસલ્લા પર ઉડાતા ક્ય ... અગાર.\n\nમસલ્લા છોડ નસલન તાડ, બિછાલે ડાલ પાની મેં\nતુ પણ દફન ઇરીક્તો કા, ગુલામ ઉનકા કહાતા ક્ય ... અગાર.\n\nન ગર કાબા, ન રસ રોઝા, ન કા મસ્જિદ, ન કર સિજદા\nવઝુ કા તોડ દે કૂંઝા, શરાબ સબ પીતા ક્ય ... અગાર.\n\nઈરશા પા ઈરશા કા, ન ગાલબ મેં વરી એક દમ\nગલે મેં સેલ કર આપની, લુટી કો તુ જલાતા ક્ય ... અગાર.\n\nન હો મુલ્લા ન હો બાંગા, ઇશ્કની હોકર પુકાર\nહરમ કે શાહ કલંદર કા, અનાલ હક તું કહાતા ક્ય ... અગાર.\n\nકહે મંસૂર મસ્તવાના, દિલ મેં દિલ મેં પહિચાના\nવહી મરતો કા મરવાના, બિન ઇશ્ક વ્યાતા ક્ય ... અગાર."
  },
  {
    "title": "૫૧૬. ઐસા હે કોઇ મુરશદ મૌલા, મેં દિલમેં ખુદા મિલાવેગા (૩૩૮)",
    "slug": "516-aisa-he-koi-murashada-maula-men-dilamen-khuda-milavega",
    "authorSlug": "kamal",
    "category": "કમાલ",
    "sortOrder": 516,
    "lyrics": "ઐસા હે કોઇ મુરશદ મૌલા, મેં દિલમેં ખુદા મિલાવેગા\nસબ ત્યાગન કા બંધન છોડિ કે, કાયામન ને મિલાવેગા ... (ટેક)\n\nપાંચ તત્વ હે દરશન મંદિર, તન કા તકિયા બિછાવેગા\nમન મક્કા મિના વિહર, બિસ્મિલ કલમા પઢાવેગા ... ઐસા.\n\nમેં મહોર્રમ મેરા દિલર રોશ, મેરી મહોર્રમ કોઇ ખોજાવેગા\nમેરા બહેરા કોઇ મુશ્કો દિખાવે, નૂર નઝરી મેં મિલાવેગા ... ઐસા.\n\nમેં મોહંમદ મેં અલ્લાહ, દિલ અલ્લાહ હી કલમા મિલાવેગા\nઅંધકાર અજૂંડ કે ઉપર ચડી, મેરા કૂઆ કોઈ કુ સાધેગા ... ઐસા.\n\nકહે કમાલ કબીર કા બાલક, મેરી તન કી હિસાબ બુઝાવેગા\nઆપન ઇશ્ક કા હૂંડો કરકે, ઐસા પ્યાસા પિલાવેગા ... ઐસા."
  },
  {
    "title": "૫૧૭. મન રૂપી મૃગલાને મારી, મામદ કહે મનરૂપી મૃગલાને મારી (૩૩૨)",
    "slug": "517-mana-rupi-mrugalane-mari-mamada-kahe-manarupi-mrugalane-mari",
    "authorSlug": "mamad",
    "category": "મામદ",
    "sortOrder": 517,
    "lyrics": "મન રૂપી મૃગલાને મારી, મામદ કહે મનરૂપી મૃગલાને મારી\nજીવ મારીને જીવ જીવાડી, એમાં શું નિકળ્યા નયારી ... (ટેક)\n\nએક એક મૃગ ને એક એક મૃગલી, ચિત્તવનમાં રહેનારી\nમૃગલી થઈ છે મૃગ ની સાથે, વાતોમાં થયો વધારી ... મન.\n\nએક એક માંથી પાંચ પાંચ પ્રગટ્યા, હરણ પચ્ચીસની હારી\nકુરાંણનું દળ પડ્યુ ખેતરમાં, અલસરીયા ભેળાણી ... મન.\n\nક્ષત્રીય કહે અમે શિકાર કરીએ, અનાદી ધર્મ અમારી\nહું ને તું માં હરણારણમાં, આત્મા ને ન ભળ્યો ન્યારી ... મન.\n\nશિકાર કરી તો કાયાવાડીમાં કરજે, છૂરા ફેરે છે શિકારી\nબહાર કરતા બુડી મરશો, નથી ઉતરવાનો આરી ... મન.\n\nતત્વ નો તમે કરો તમંચો, દયા ની દારૂગોળો\nબ્રહ્મ જ્ઞાન નો કરો ભડાકો, ઘાયલ થાય ચરનારી ... મન.\n\nઘાયલ મૃગને ઘેરી કરીને, તૈયાર કરો તલવારો\nહક પહોંચે તો હલાલ કરજે, નથી બીજા ની ગુમરો ... મન.\n\nમામદ ને પીર અસરફ મળીયા, આત્મા ઓળખાવનારો\nગગ કરીને જોયું તપાસી, બતાવ્યો નામ નો કિનારો ... મન."
  },
  {
    "title": "૫૧૮. ગુણીજન ગોતી લેજો રે, પ્રગટ પિયુ રહ્યો તમ પાસે (૩૩૩)",
    "slug": "518-gunijana-goti-lejo-re-pragata-piyu-rahyo-tama-pase",
    "authorSlug": "mamad",
    "category": "મામદ",
    "sortOrder": 518,
    "lyrics": "ગુણીજન ગોતી લેજો રે, પ્રગટ પિયુ રહ્યો તમ પાસે\nપિયુ રહ્યાં તમ પાસે, એ તો નથી જમીન કે આકાશે ... (ટેક)\n\nસોહમ મંત્ર ને સ્નેહથી સાધી, પ્રેમ થી પ્રકાશ થાશે\nબોલે તે તો બીજો નથી, એમ તત્વમસી એ જણાશે ... ગુણીજન.\n\nઘાટોઘાટ વાસી છે અવિનાશી, એમ જાણ્યું તેનાં દાસે\nઅવર ને મન અટપટુ ભારી, જળાશય જેમ જળમાં ભાસે ... ગુણીજન.\n\nપાષાણમાં જેમ રહે અગ્નિ, તે લોખંડથી જણાશે\nસેવક શિષ્ય ની જ્ઞાન ગિરાથી, બ્રહ્મ સ્વરૂપ દર્શાશે ... ગુણીજન.\n\nમળવું હોય જો મેરામ સાથે, ગુણા ગુરૂ નાં ગવાશે\nમામદ કહે મમત્વ મરે તો, મનીથી સાચુ મનાશે ... ગુણીજન."
  },
  {
    "title": "૫૧૯. ખંડોલે ખૂબ ખંડ્યો રે, તેમાં સોહમ વિચાર ભાણ (૩૩૪)",
    "slug": "519-khandole-khuba-khandyo-re-temana-sohama-vichara-bhana",
    "authorSlug": "mamad",
    "category": "મામદ",
    "sortOrder": 519,
    "lyrics": "ખંડોલે ખૂબ ખંડ્યો રે, તેમાં સોહમ વિચાર ભાણ\nસોહમ વિચાર ભાણ તેના ઓગણ મંડળ સો ભાણ ... (ટેક)\n\nપાંચ તત્વ નો બન્યો પંડોળો, પરમાર્થ ન સારે\nશબ્દાતિ નો વ્યાપક બંધન ઠરાવો, શોભા અનુપમ ક્યારે ... ખંડોલે.\n\nથઈ મંસાની આશા તાણા, બોલો દશ દરવાર\nતત્વજ્ઞાન સે તાણા ખોલ્યા, મળ્યા સંત મમાને ... ખંડોલે.\n\nગુરુ જ્ઞાન હો નાયડા નાથે, ધનગણ ધુધારા બાળ\nઇન્દ્રિયો સો દેવસભાગા, ત્રિગુણાતીત નિવારી ... ખંડોલે.\n\nગુરુજ્ઞાન વાળા ક્યા જ્ઞાન ભણે, સૂર્ય ગગનમાં લાગે\nપંચ વિષય ને પરહરી ને, ભજન કરો તો ભય ભાંગે ... ખંડોલે.\n\nભઈનામ વસે આ અંડાશયમાં, તિજોનું આલોચના સંગે\nમામદ ને નયા અશરફ મલેયા, આપાનું પ્રગટ્યા સ્થાને ... ખંડોલે."
  },
  {
    "title": "૫૨૦. છોડી મન મ અને અહંક અણધારા, મેલ મન મ મને પરદેશમાં વણઝારા (૩૯૧)",
    "slug": "520-chodi-mana-ma-ane-ahanka-anadhara-mela-mana-ma-mane-paradeshama-vanajara",
    "authorSlug": "mamad",
    "category": "મામદ",
    "sortOrder": 520,
    "lyrics": "છોડી મન મ અને અહંક અણધારા\nમેલ મન મ મને પરદેશમાં વણઝારા, ગુરુજી વણઝારા\n\nસંપુ ભગત ને તારો સંધારીયો વણઝારા\nમારા હરિ નીવડ્યા ધર રે ... વણઝારા.\n\nકાયા આયની પુતળી વણઝારા ગુરુજી વણઝારા\nએને કૂટો નહિ સાચે પાર રે ... વણઝારા.\n\nકાઝુ મામદ શાહ ની વિનંતિ વણઝારા\nગુણ રહિ મ આપની વાન રે ... ગુરુજી."
  },
  {
    "title": "૫૨૧. રણ રણ રણતુરા બાજે ટકોરા, નાદ કોઈ વિરલા પાવે (૪૮૭)",
    "slug": "521-rana-rana-ranatura-baje-takora-nada-koi-virala-pave",
    "authorSlug": "mamad",
    "category": "મામદ",
    "sortOrder": 521,
    "lyrics": "રણ રણ રણતુરા બાજે ટકોરા, નાદ કોઈ વિરલા પાવે\nજે જે નિશદિન જપ અજંપા, આવાગમન સભી મિટાચે ... (ટેક)\n\nપૃથ્વી રૂપે જે જન્મ પામે હે, જ્ઞાન તત્વ મેં શૂં ખોવે\nજે તત્વ મેં પ્રાણ જાવે, ઐસી યોનિ મેં પુનઃ આવે ... રણ રણ.\n\nજલ તત્વ કા સોળ આંગુલ હે, સફેદ રંગ દર્શાવે\nજે કોઈ ઉસમેં પ્રાણ તજે, મનુષ્ય યોનિ મેં આવે ... રણ રણ.\n\nપૃથ્વી તત્વ કા બાર આંગુલ હે, પીળા રંગ દર્શાવે\nજે કોઈ ઉસમેં પ્રાણ તજે, તો જંતુ યોનિમાં આવે ... રણ રણ.\n\nતેજ તત્વ કા દશ આંગુલ હે, લાલ રંગ સ્વર લાવે\nજીવ કાયા કો હોઈ જુદાઈ, બીજ શાખામાં બીજ વાવે ... રણ રણ.\n\nવાયુ તત્વ કા આઠ આંગુલ હે, હરા રંગ વાળા કહિએ\nલોહી તત્વ મેં પ્રાણ છૂટે તો, પવન ગગન મેં પંખી હોવે ... રણ રણ.\n\nઆકાશ તત્વ કા કેટલા આંગુલ હે, કાળા રંગ તાડા કહાવે\nપ્રાણ વહાં છૂટે તો, ઝીલે સીતારા ગણ મેં આવે ... રણ રણ.\n\nસુખમણા માં શરીર છૂટે તો, પશુપંખી મેં ઠહરાવે\nમામદ કહે મનમાં સાચુ કરી માનો, ભજન કરે તો ઉદ્બીજ માં ન આવે ... રણ રણ."
  },
  {
    "title": "૫૨૨. પિયા કઈ શાન ધૂન કે રંગ, તને કમ કળાપલી સે રંગ (૩૩૯)",
    "slug": "522-piya-kai-shana-dhuna-ke-ranga-tane-kama-kalapali-se-ranga",
    "authorSlug": "karak",
    "category": "કરક",
    "sortOrder": 522,
    "lyrics": "પિયા કઈ શાન ધૂન કે રંગ, તને કમ કળાપલી સે રંગ\nતન કર કૂંડી મન કર સોટા, શુદ્ધ બુદ્ધિ રસ ગંગ ... (ટેક)\n\nઅલાઇમ સાહેબ કા નામ લગાવે, પ્રેમ ચિલમ પ્રસંગ\nકાલ ત્રિગુણ મમતા પીસો, વિષય વાસના ભંગ ... પિયા.\n\nચારે અસાર બાકી મિ ચાલો, આત્મા તત્વ પ્રસંગ\nમરી ઇંટોરા તત્વમસી કા, પાવો સદ્ગુરુ કે સંગ ... પિયા.\n\nથોડી તુમારી પ્રભુ જ્ઞાન કી, સંતોષ હોવ સબ અંગ\nચાર વેદ કા ભેદ પાવે કોઇ, પાવે કર સત્સંગ ... પિયા.\n\nકરક લહેર કી ગુરુ દયા કી, ચઢે ન દુજા રંગ\nવાડે ન હૂમે રંગ ... પિયા."
  },
  {
    "title": "૫૨૩. સાઈ સંગ સંભાલાઉંગા, હે જી સદગુરુ મોહ નીંદગા (૩૪૪)",
    "slug": "523-sai-sanga-sambhalaugga-he-ji-sadaguru-moha-nindaga",
    "authorSlug": "kapad-chand",
    "category": "કપાડ ચંદ",
    "sortOrder": 523,
    "lyrics": "સાઈ સંગ સંભાલાઉંગા, હે જી સદગુરુ મોહ નીંદગા\nહે જી દાસન તુમ્હારી ધાઉંગા, મેં માયાગુણ ઘેલી મમતા ... (ટેક)\n\nકાળગાના કર ચડીયા, અબચ ભ્રમ બાહેં કપાઉંગા\nહે જી બાહેર પર ઉડીદાર શત્રુ, બાહેર નાહી ચુંટાઈંગા ... સાઈ.\n\nકાળંગા કી કર ડાઉં, દોઉ થકી ગુણ ડાઉંગા\nભલેં પાંચ બડી, પચ્ચીસ બડી, ૧૨ ચૌદાસા મેં નાઉંગા ... સાઈ.\n\nત્રિવેણી રંગમહેલમાં રામ, કલ્પવૃત ખંડીત ગસાઉંગા\nહે જી બંદુગા નર અખંડસા, મેં બાર પડી લાગુન્ગા ... સાઈ.\n\nહાથ જોડીને હુકમ માંગું, મેં કાયા કી કરમાઉંગા\nએમ બોલ્યા કપાડ ચંદ, મેં પૂરણ મુરશદ પાઉંગા ... સાઈ."
  },
  {
    "title": "૫૨૪. જૂનો જૂનો ધર્મ રે, આબાદ રાખી જાલીએ (૩૫૩)",
    "slug": "524-juno-juno-dharma-re-abada-rakhi-jalie",
    "authorSlug": "ramdev-pir",
    "category": "રામદેવ પીર",
    "sortOrder": 524,
    "lyrics": "જૂનો જૂનો ધર્મ રે, આબાદ રાખી જાલીએ, જેનો પોથીયુ ન પામે પાર\nઅગમ ને અગોચર રે, તારા વાવુ છે આધીયુ ... (ટેક)\n\nધરતી માથે રે અમર ધારો ઓળખી, ત્યારે ઘડીયા ગગન કેરા ઘાટ\nપ્રથમ પાર્વતી એ પ્રગટ કર્યો, એણે સ્થાપ્યા અગમ કેરા પાટ ... જૂનો.\n\nધરતી માથે રે ચાંદો સૂરજ પ્રગટ્યા, ત્યારે મેરૂ નાં સ્તંભ રોપાય\nદશે દિશાએ દશ દિકપાલ નોંધિયા, તોય પૃથ્વી સુપડા ની પેઠે સીલાયા ... જૂનો.\n\nપંચે મળીને પાટ ઠાઠ પુરીયા, એ તો જૂના ધર્મ ને ધાય\nસત્તાનાં બીજ લઈ વસુધામાં રોપીયા, ત્યારે પૃથ્વી ઠીક કરીને ઠેરાય ... જૂનો.\n\nચોરાશી ધર્મ એને સેવતા, બીજા પંથ હૂંડી પરનાળ\nબાવા બાળનાથ શરણે રામોપીર બોલીયા, બોલ્યા અલખ ધણી નો આરાધ ... જૂનો."
  },
  {
    "title": "૫૨૫. સાચુ બોલો હક હાલો, વચન પાળો, અવતાર કહે પીર રામદે (૩૫૪)",
    "slug": "525-sachu-bolo-haka-halo-vachana-palo-avatara-kahe-pira-ramade",
    "authorSlug": "ramdev-pir",
    "category": "રામદેવ પીર",
    "sortOrder": 525,
    "lyrics": "સાચુ બોલો હક હાલો, વચન પાળો, અવતાર કહે પીર રામદે ... (ટેક)\n\nજગ્યા પહેલા નો અમર જોગી, પ્રેમજળ એની પાસ\nઆશા ને આસિલા રાખી, પૂજે ધર્મ નિઝાર ... અવતાર.\n\nઆ ધર્મ શેષજી એ ઝાલ્યો, જેની માથે ધરા ઠૂંડો ભાર\nશેષ ને ઘેર કોળુંબા રાણી, પૂજે ધર્મ નિઝાર ... અવતાર.\n\nઆ ધર્મે મેઘ વરસે, વરસે અનરાધાર\nઇન્દ્ર ને ઘેર અજમેરા રાણી, પૂજે ધર્મ નિઝાર ... અવતાર.\n\nલાખ બાવન બાસ્તી, અને કરોડ પચાસ\nગંગાજી જઈને સ્નાન કરો, તોય ના આવે ધર્મનિઝાર ... અવતાર.\n\nલાખ ડુંગર કનક ભરીયા, ગૌ કરોડ પચાસ\nવ્યતિપાતે જઈ દાન કરો, તોય ના મળે ધર્મનિઝાર ... અવતાર.\n\nભણે રામો લખે નામો, તમે સુણી લ્યો સંત નિઝાર\nજો આવી અમર વસ્તુ હાથ આવે તો, તમે કાં ભૂલો સંસાર ... અવતાર."
  },
  {
    "title": "૫૨૬. વીરા મારા રે આવ્યા છે આગમ કુકડા, તમે બેસો બેસનહાર (૩૫૫)",
    "slug": "526-vira-mara-re-avya-che-agama-kukada-tame-beso-besanahara",
    "authorSlug": "sharvan-kapadi",
    "category": "શરવણ કાપડી",
    "sortOrder": 526,
    "lyrics": "વીરા મારા રે આવ્યા છે આગમ કુકડા, તમે બેસો બેસનહાર\nવીરા મારા રે, કાળી કોયલ તે દી ધોળી થાશે\nતે દી ઉજળા રે થશે જેને કાગ ... તમે.\n\nવીરા મારા રે, નાનતર વેલે ફળ લાગશે રે\nતે દી નિર વિષ થશે જેને નાગ ... તમે.\n\nવીરા મારા રે, નાનેરો મોટેરાને નહિં નમે\nનહિં રાખે માવતર ની જેને લાજ ... તમે.\n\nવીરા મારા રે, નર નાં કહ્યા નારી નહિં કરે\nતે દી ગુરુ માથે બેસાડી જેને લાજ ... તમે.\n\nવીરા મારા રે, બગલા જીવડા બળદીયો\nતે દી રોલા જીવડી જેને ગાય ... તમે.\n\nવીરા મારા રે, છ-છ મહિના નાં બાળક બોલશે\nએની બોલી કેમેય નહિં સમજાય ... તમે.\n\nવીરા મારા રે, બગલો ગોખે જ્યારે બેસશે\nતે દી જેને રાણીયુ કરશે રાવ ... તમે.\n\nવીરા મારા રે, પંડિત જાશે મૂર્ખ ને પૂછવા\nબોલ જેને એનો લાખે ભૂલાય ... તમે.\n\nવીરા મારા રે, તરકસ તીર ને તાંજણો\nઘોડલે જેને બડશે કિરતાર ... તમે.\n\nવીરા મારા રે, ધર ધર કંપે જેને મેદની\nતે દી ધરા ન ઝીલે જેને ભાર ... તમે.\n\nવીરા મારા રે, બાહ્યબો રણ તે દી માંડશે\nખેલશે જેને ચોકે ને મેદાન ... તમે.\n\nવીરા મારા રે, શૂરા જે દી જડુ મારશે\nમાથે જેને મોંઘરીયુ કરશે માર ... તમે.\n\nવીરા મારા રે, ત્રણ ત્રણ જુગ એવા વહી ગયા\nચોથે હવે જેને જીવનહાર ... તમે.\n\nવીરા મારા રે, શરવણ કાપડી એમ બોલીયા\nઆ છે જેને આગમ કેરા એંધાણ ... તમે."
  },
  {
    "title": "૫૨૭. અગમ રૂપ ગુણ ગાઇ, અસલ માટી બંદગી ત્રિભુવન બનાઈ (૪૯૦)",
    "slug": "527-agama-rupa-guna-gai-asala-mati-bandagi-tribhuvana-banai",
    "authorSlug": "attar-shah",
    "category": "અત્તાર શાહ",
    "sortOrder": 527,
    "lyrics": "અગમ રૂપ ગુણ ગાઇ, અસલ માટી બંદગી ત્રિભુવન બનાઈ\nજલ કી બૂંદ કુદરત સે કમાઈ, ને તા મિશ્ર પવન ફેરાઈ ... (ટેક)\n\nહાડ માંસ ઔર લોહી માંસ, તા પર ચામડી મઢાઈ\nગર્ભ સુતારીયે ઘડી કંતરી, પાંચ તત્વ સંગ સાઈ ... અગમ.\n\nનવમાસ માં પૂર્ણ કરી બાઈ, કામ ક્રોધ સંગ ને ધાઈ\nસાત સાગર ને નાદે નહીયા, ત્રિવેણી ધાર પર સાઈ ... અગમ.\n\nશૂન મંડળ માં મારો સાઈ ભલે બિરાજે, અકલ્પ અગાધ પ્યો દર્શાય\nછત્રીસ વાજાં ગંભીર રાસ રમે છે, અનાહત નોબત ગગડાાઈ ... અગમ.\n\nબ્રહ્માં વિષ્ણુ મહેશ્વર મંહિ, બંને અવિચળ પદવી પાઈ\nગુરુ લોકનાથ મારા માથા મોર, તેનો કાયમ દર્શાાઈ ... અગમ.\n\nમુરશીદ ચરણે બોલ્યા અત્તાર શાહ, ઈશ્ક પિવો પીને ગાઈ ... અગમ."
  },
  {
    "title": "૫૨૮. સદ્ગુરૂ એ જ્ઞાનની બ્યાડી મને ગોડી (૫૫૧)",
    "slug": "528-sadaguru-e-jnanani-byadi-mane-godi",
    "authorSlug": "shiv-lal",
    "category": "શિવ લાલ",
    "sortOrder": 528,
    "lyrics": "સદ્ગુરૂ એ જ્ઞાનની બ્યાડી મને ગોડી, આપ્યા છે અસત્ય ની ચાંચણા\nપાંચ તત્વની પડ લે, વચમાં ત્રણ ગુણ ઢંક્યા ત્યાં રે ... (ટેક)\n\nવિવેક ને વૈરાગ, ધૃતિ શમ દમ માં સમ ગઇ રે\nસુરતા રાખા કીવડા ભલી, સોહમની શોધ થઈ રે ... સદ્ગુરૂ.\n\nબુદ્ધિ વંડી મંહિ તારે વાસ, પરખી લ્યો બેસી ગઈ\nઅવિદ માયા મૂકી છે મુક્ત, તૃષ્ણા ત્યાગી દઈ રે ... સદ્ગુરૂ.\n\nત્રિદોષ ને વશ કર તું વીરા, સંશય શૂળ પર\nમાણો માણો કોઇ નવ માણો, ક્યાય પણ ખોજ પાર રે ... સદ્ગુરૂ.\n\nશિવલાલ બોલ્યા, મારી સુમતિ લાભ ગઇ\nસદ્ગુરૂ એ જ્ઞાનની બ્યાડી મને ગોડી ... સદ્ગુરૂ."
  },
  {
    "title": "૫૨૯. એની ઉપમા કરી નવ જાય, સુરતા રે ચાલ્યા સાસરે (૪૯૫)",
    "slug": "529-eni-upama-kari-nava-jaya-surata-re-chalya-sasare",
    "authorSlug": "dharam-gir",
    "category": "ધરમ ગીર",
    "sortOrder": 529,
    "lyrics": "એની ઉપમા કરી નવ જાય, સુરતા રે ચાલ્યા સાસરે ... (ટેક)\n\nદયાળ દાસે સુરતા નો વિવાહ કીધો, તેનું સાસરીયુ કહુ સાર\nમન પિતા સુરતા ને વિનવે, જવું સાસરીયે પહેરી શણગાર ... સુરતા.\n\nસત ચિત આનંદ શણગાર પહેરીયા, ક્ષણ એક ન લાગી વાર\nવળાવવા વિવેક વિચાર કાકા આવ્યા, સુબુદ્ધિ શાંતિ કાકી નો ઉપકાર ... સુરતા.\n\nવિશ્વાસ વીરો સાથે આવ્યા, ભાભી ભક્તિ વંદે નરનાર\nભાવ મામો તે પણ આવ્યા, પ્રીતિ મામી સાથે રે અપાર ... સુરતા.\n\nરહેણી રથ માંહી પ્રેમની ગાદીઓ, સુરતા બેઠા છોડી લોાકાચાર\nપિતા કહે પુત્રી કલ્યાણ કહાવજે, સેવજે સ્વામિ રહિત વિકાર ... સુરતા.\n\nસદ્ગુરુજી નો આણો આવ્યા, શબ્દ સારથી હાંકે રથ નિર્ધાર\nસત્સંગ સાસરીયા ઉતર્યા, મળ્યા નામ સ્વામિ ને સુરતા નાર ... સુરતા.\n\nમળ્યા અરધ ઉરધ નાં રે ઘાટમાં, ખેલ્યા અરસપરસ પરાપાર\nસાસરીયે સમાતી રે સૂધ થઈ, ઢીંગલીયે રમે નહિં લગાર ... સુરતા.\n\nકહે ધરમગીર સદ્ગુરુ શાનમાં, નિરાલંબપદ પાવન આહાર ... સુરતા."
  },
  {
    "title": "૫૩૦. મન તું કનેડિ રડ વિશ્વાસા, નારી પરણે હુવે સબ વ્યાસા (૩૭૫)",
    "slug": "530-mana-tun-kanedi-rada-vishvasa-nari-parane-huve-saba-vyasa",
    "authorSlug": "telvo",
    "category": "તેલવો",
    "sortOrder": 530,
    "lyrics": "મન તું કનેડિ રડ વિશ્વાસા, નારી પરણે હુવે સબ વ્યાસા\nશબ્દ થ્રુડ સાચા કે સાચા ... (ટેક)\n\nસંત સવેલા ગાય ભંભડા, ઉનડી કરે ખરદાસા\nનાઈ ભારોબા ગુરૂ ગોવિંદા, ઐસા અજબ તમાશા ... સદ્ગુરૂ.\n\nનરસિંહ મહેતાનાં નજરે જોયા, પરચા પચાસ પચાસા\nતોય નગારા ને નક્કી થયુ નહિં, બળ્યા હુવા હરિ કેરા દાસા ... સદ્ગુરૂ.\n\nગોવિંદ પણ ગુરુ શાહીદ છે, પ્રગટ વેદ પ્રકાશ\nઇન્દ્ર ને ઉપમન રવે તુલ્યા, દેખ્યા ગુરુ દુર્વાસા ... સદ્ગુરૂ.\n\nગુરુ વિના નર નરે પડી ને, વહ પડ ભવ પાસા\nગુરૂ તેલવો બોલ્યા ઓહાડી, સીદ્ધ સાધક હાસા ... સદ્ગુરૂ."
  },
  {
    "title": "૫૩૧. હે વીરા, પાત્ર રે પરખ્યા વિના, એનો સંગડો ન કરીએ (૩૭૬)",
    "slug": "531-he-vira-patra-re-parakhya-vina-eno-sangado-na-karie",
    "authorSlug": "dedal",
    "category": "દેદલ",
    "sortOrder": 531,
    "lyrics": "હે વીરા, પાત્ર રે પરખ્યા વિના, એનો સંગડો ન કરીએ\nઅજ્ઞાની ઊપાધિયુ કરશે ... (ટેક)\n\nહે વીરા, સદ્ગુરુ સંતની પ્રતીતી ન આવે\nએવાં સલીલો કેમ સુધરશે\n\nહે વીરા, અંગનાં ઉજળા ને મનના છે મેલા\nએ ધ્યાન પ્રભુનું શું ધરશે\n\nહે વીરા, ભક્ષ મલે પણ લક્ષ મેલે નહિં\nએ ચોંયે મરછીઓ મારે\n\nહે વીરા, હિમનો ઠરેલ એક ઉંદર આવ્યો\nહંસલે પાંખ માં લીધો\n\nહે વીરા, ટાઢ ઉડીને હંસે પાંખો સંભાળી\nચાંચે પાંખ વિનાનો કીધો\n\nહે વીરા, સંજીવન મંત્ર એક વિપ્રે ભણીને\nમરેલ વાઘને ઉઠાડીયો\n\nહે વીરા, વાઘે ઉઠીને પહેલા વિપ્રને માર્યો\nપહેલી થાપે એને પાડ્યો\n\nહે વીરા, દૂધ સાકર પાઈ વસિયલ સેવ્યો\nતનથી વિષડો ન જાય\n\nહે વીરા, એમ અજ્ઞાની ને જ્ઞાન દેતા\nઅંતર સુવિચાર ન આવે\n\nભવનાં ભૂંડા કદી ભૂંડાઈ ન મેલે\nઅલ્પા શરણે દાસ દેદલ બોલ્યા, એ સાધન સાધી કેમ સધળા ..."
  },
  {
    "title": "૫૩૨. ધણી રે મેં તો ધાર્યા નકળંગ નાથ રે (૩૭૭)",
    "slug": "532-dhani-re-men-to-dharya-nakalanga-natha-re",
    "authorSlug": "dedal",
    "category": "દેદલ",
    "sortOrder": 532,
    "lyrics": "ધણી રે મેં તો ધાર્યા નકળંગ નાથ રે\nઆ વરનો કોઈને આવે નહિં એતબાર રે ... (ટેક)\n\nદિલડાથી દર્શાવું રે, મંદિરે રહ્યે શામળા\nહૃદિયામાં હું જોઉં દિન ને રાત રે ... ધણીરે.\n\nઆદિનો રે નાતો છે, નવો રે નથી નાથજી\nકૂડલ અમારો ખોટો કરે છે ખાદ રે ... ધણીરે."
  },
  {
    "title": "૫૩૩. ગુરુજી મહામંત્ર નો મોટો છે મહિમા, એ વખાણું બ્રહ્મના ભેદમાં રે (૩૭૮)",
    "slug": "533-guruji-mahamantra-no-moto-che-mahima-e-vahanu-brahmana-bhedama-re",
    "authorSlug": "rishi-markandi",
    "category": "ઋષિ મારકંડી",
    "sortOrder": 533,
    "lyrics": "ગુરુજી મહામંત્ર નો મોટો છે મહિમા, એ વખાણું બ્રહ્મના ભેદમાં રે\nએવા ઋષિમુની જપતા જાય, હરિ ન હતા ચાર વેદમાં રે ... (ટેક)\n\nગુરુજી અસલ યુગમાં નહોતો રે આધાર, પચાસ કરોડે પાલતી રે\nતે દી નિરંજન હતા નિરાકાર, એમાંથી શક્તિ દર્શાવી રે ... ગુરુજી.\n\nગુરુજી શક્તિ એ દિયો છે સમાગમ, નિરંજની ને વચન દીધા રે\nદેવી ઉમૈયા ને વ્યાધા છે ઉમેદ, ત્રણ પુરુષ પ્રગટ કીધા રે ... ગુરુજી.\n\nગુરુજી પંચે મળીને કર્યો આરાધ, શક્તિ એ પરમોદ કીધો રે\nએવાં ધરતી નાં બાંધ્યા ધરણ, નિજાધર્મ તોડી સ્થાપ્યો રે ... ગુરુજી.\n\nગુરુજી નાદ ને બૂંદ નો છે આ વિસ્તાર, સંસાર પ્રગટ કીધો રે\nએમ બોલ્યા ઋષિ મારકંડ, મહામંત્ર શિવજી ને દીધો રે ... ગુરુજી."
  },
  {
    "title": "૫૩૪. આવો! કાંઈ કરીયાના ભારા, સંતો લાવો ચરણ કંપ કાંઈ કરીયાના ભારા (૩૮૦)",
    "slug": "534-avo-kan-kariyana-bhara-santo-lavo-charana-kampa-kan-kariyana-bhara",
    "authorSlug": "prahlada",
    "category": "પ્રહલાદ",
    "sortOrder": 534,
    "lyrics": "આવો! કાંઈ કરીયાના ભારા, સંતો લાવો ચરણ કંપ કાંઈ કરીયાના ભારા\nએવો થોડ રે થોડ તમે સાધ્ય પીઓ રે ... (ટેક)\n\nવાડું બાંધ ગેરુ ને આકાશમાન બંધાઓ રે\nએવા અખંડ રે અબલા રે એમાં પીંડ ઢાળો રે ... એવો.\n\nકલજુગ કાંઈ કંપો કરી વાળ સંતો ભાઈ\nએમાં મધ પીઈને તમે પાપ ભરો રે ... એવો.\n\nતન ઘોડો મન છે અસવાર સંતો ભાઈ\nએવા અકળના રે તમે ગુણ ધરો રે ... એવો.\n\nનિત્ય બરછી ચાંદીને હથિયાર સંતો ભાઈ\nએવા અવિનાશ થઈ તમે યુદ્ધ કરો રે ... એવો.\n\nબોલ્યા પ્રહલાદ ભગત રે પ્રહલાદ\nએવાં અજંપાનાં તમે જાપ જપો રે ... એવો."
  },
  {
    "title": "૫૩૫. મારી લાજ તમારે હાથ, હરિ સંભાળજો રે (૩૮૩)",
    "slug": "535-mari-laja-tamare-hatha-hari-sambhalajo-re",
    "authorSlug": "kashi",
    "category": "કાશી",
    "sortOrder": 535,
    "lyrics": "મારી લાજ તમારે હાથ, હરિ સંભાળજો રે\nદયા કરીને સંત સમજો, શુદ્ધિ આપજો રે ... (ટેક)\n\nહંસા સ્મરણ કાંઈ ન જાણું, તારા નામનું મોટું નાણું\nઅનુભવ થી પરમાણું, પ્રભુ પધારજો રે સાચા ... મારી.\n\nજપ તપ સાધન કાંઈ ન સિદ્ધુ, તારું નામ મેં તો સાચું લીધું\nવૃતિ સુધારી એમ હરિદર્શન, દુઃખ ટાળજો રે ... મારી.\n\nજ્યાં જાઉં ત્યાં તુને લાવું, હૃદયકમળમાં થાય બરાબર\nસત ચિત આનંદ ધારું, હરિ બોલજો રે ... મારી.\n\nહરિ હરિ કરતા હરિરૂપ થાશું, હરિ મળ્યા શાંતિ પદ પાશું\nગુરુ દયા એ પરમધામ માં, કાશી ને ઉતારજો રે ... મારી."
  },
  {
    "title": "૫૩૬. હોજી હોશિયાર થઈને ધ્યાન ધાણો (૩૮૧)",
    "slug": "536-hoji-hoshiyar-thaine-dhyan-dhano",
    "authorSlug": "padam-puri",
    "category": "પદમ પૂરી",
    "sortOrder": 536,
    "lyrics": ". હોજી હોશિયાર થઈને ધ્યાન ધાણો, દિલ માલિક તો ડરના ક્યાનો...(ટેક)\n\nઉર મન ખુસી સે મન મૈલી, રાત દિવસ કાયા સોના ક્યાનો\nવ્યા ભવે પંખી, ભુંગા કવિ રાતી, કણ દિના ક્યા સંગ ક્યા... હોજી.\n\nકાયા પિંજળ સોના બનેગા, પંગુ બલો ગુરુ પારસકા\nગુરુનામ સે એક નામ પડ તા, જીતી લાગુ મન ધારી ક્યા... હોજી.\n\nગવાણું નહીંદુ નવરંગ બાલા, બાત શાયર મન ઊંડા ક્યા\nકોઇ બારી કાઝા દિલ અંદર, નહીંદુ અત્ર પીના ક્યા... હોજી.\n\nરામનામ કી થાપાર માંડિ હૈ, રંગ આખ્યા સે પારસકા\nસુકમના નાડા ઘેર સંગ વિકાદુ, ભોગ મન ભોગ સોના ક્યા... હોજી.\n\nભજ લે આપાણાદ કસાપ એક હી, આપોં દેવેગા લા વાહી દેણા\nઅરિબુદ્દે ચરણોં બોલ્યા પદમપુરી, ઉર્મેં ધર્મેં સે હારો ક્યા... હોજી."
  },
  {
    "title": "૫૩૭. સદ્ગુરુ તમે મારા તારણહાર, હરિગુરુ તમે મારા તારણહાર (૩૮૨)",
    "slug": "537-sadguru-tame-mara-taranhar-hariguru-tame-mara-taranhar",
    "authorSlug": "dungar-puri",
    "category": "ડુંગર પૂરી",
    "sortOrder": 537,
    "lyrics": "સદ્ગુરુ તમે મારા તારણહાર, હરિગુરુ તમે મારા તારણહાર\nઆપ મારી દિન ની અરજી રે, આવીને બાવડો સંભાળજો... ગુરુજી (ટેક)\n\nએવા ઊંડા રે સમંદર ને, હેંસા નીર નિહાળો\nબેડી મારી કેમ કરી ઊતરે પાર... આપ મારી...\n\nએવા ઊંચા રે પર્વત ને, હેંસા મન રે ધારો\nઅમે ઉગાડી કાંટા કેરી વાડ... આપ મારી...\n\nએવા કાળિ રે કોટડી હેંસા કોણ ઓઢાડે\nકોઈ કઈ ને ખાય... આપ મારી...\n\nએવા ગુરુ નાં પ્રતાપે ડુંગરપુરી બોલ્યા\nહરિ અમને સંતોના ચરણોમાં વાસ... આપ મારી..."
  },
  {
    "title": "૫૩૮. હુંવા કળજુગને હોશે જાદવરાય (૩૬૭)",
    "slug": "538-huva-kaljugne-hose-jadavray",
    "authorSlug": "sahadev",
    "category": "સહદેવ",
    "sortOrder": 538,
    "lyrics": "હુંવા કળજુગને હોશે જાદવરાય, એવા તે કળીયુગ આવેગા... (૨૬)\n\nસહદેવ કહે જુઓ પાંડવો, જવે સોઈ નર દેખેગા\nઝાડ પાન ને થડા રૂખડા, મૂળ સમૂળા ભક્ષેગા... એવા.\n\nસોનાની થાલીએ બ્રાહ્મણ જમતા, દેતા દાન પણ નહિ લેતા\nઆજનો બ્રાહ્મણ હાલે ભટકતા, મધ્ય ઠેકાણો ભાંગેગા... એવા.\n\nબ્રાહ્મણને ઘર અજિયા પૂજાશે, ધોબીને ઘર બાલડીયા\nમધ્ય ઠેકાણે તુલસી ક્યારો, ઉત્તમ જળ લાવેગા... એવા.\n\nબાલતયા બ્રાહ્મણ ધાડુ પાડે, તપસ્વી હાટ માંડેગા\nદીકરી નાં દોહડે પિતાજી પરણે, એસા કળીયુગ આવેગા... એવા.\n\nસાલો આવે ત્યારે સાબુ છાંટે, ભાઈ આવે જુદ્ધ માંડેગા\nસાડી આવે તો સાડલો પહેરે, બેની આંસુ પાડેગા... એવા.\n\nમાતાપિતા કહે પુત્ર અમારો, હોશે ગજયણ ચાલેગા\nપરણ્યા પછી પાંચ દહાડે, વહુ નાં વચને ચાલેગા... એવા.\n\nદીકરાની નારી લાજ નહીં રાખે, ગણિકા ઘૂંઘટ તાણેગા\nપરણ્યા પુરુષનો આદરભાવ નહીં, પરપુરુષ કા રંગ લાગેગા... એવા.\n\nપાંચ પાંડવ પૃથ્વી છોડી, હાડ ગાળીયા હેમાળે\nસહદેવ જોષી આગમ બોલ્યા, એવા કળીયુગ આવેગા... એવા.\n\n--- (૩૬૭) ---\n\n.હુંજી આદ્ય ભકિત સંન્યાસી ની રે, કોઈક ઋષિ એ જાણી\nનર નાં નિવેડા વાલી માંગશે, પોરા રે પ્રમાણે પાંડવ ભગશી... (૨૭)\n\nકેડે મૃદંગ બાવો બાંધશે, બળાત ધાશે ભેળા\nશેરી એ ને ગલીએ પોકારશે, કોઈ લાવ મારા ભેલા... પોરા રે\n\nમેમણ મૂંડા ને મસ્કરા, એવા આવીને ભક્તિમાં ભળશે\nપોતાનાં ગુરૂ ને છોડી કરી, ગુરૂ કોઈ બીજા ને કરશે... પોરા રે\n\nસાસુ સામે વહુ બોલીને, કુડી વરતી બંધાશે\nબાપનું કહ્યું બેટા નહીં કરે, એવી કલીયુગની નિશાની... પોરા રે\n\nઊંચા કુળ ની સુંદરી જઈને, નીચા કુળમાં વરશે\nપોતા નાં ધણી ને છોડી કરી, ઈ તો અવર સાથે ફરશે... પોરા રે\n\nકહે સહદેવ સજ ધર્મને, આપણ હિમાળે જઈ ગાળીએ\nઆવતા કળજુગને છોડી કરી, પ્રભુ નાં ચરણમાં ભજીએ... પોરા રે."
  },
  {
    "title": "૫૩૯. છુમ છુમ બાજે ઘુઘરીયા, સબ દિલ લાયે કાના (૩૮૭)",
    "slug": "539-chhum-chhum-baje-ghughariya-sab-dil-laye-kana",
    "authorSlug": "anya-santo",
    "category": "અન્ય સંતો",
    "sortOrder": 539,
    "lyrics": "છુમ છુમ બાજે ઘુઘરીયા, સબ દિલ લાયે કાના\nમેરે ઘર આયે આયે, મેરે ઘર આયે... (ટેક)\n\nરેન અંધેરી ચંદ્ર સ્વરૂપી આ ગયે આ ગયે\nમાતા જશોદા ઔર હમ સબકી ભા ગયે ભા ગયે\nકાંધ કાલી કામલીયા, બંસી બજાતે કાના, નયન નચાતે આયે... મેરે.\n\nસુનકર બંસી સખીયા, શુદ્ધ બુદ્ધ ખો ઈઆઈ ખો ઈઆઈ\nદર્શન કરકે મેં તો પાવન હો ઈઆઈ હો ઈઆઈ\nએસે પ્યારે સાંવરીયા, મુખ મલકાતે કાના, ભાગ્ય જગાતે આયે... મેરે.\n\nશ્રાવણ વદ આઠમ કી રેન સોહામણી સોહામણી\nઆનંદ મંગલ ગાવે સબ ગજગામિની ગજગામિની\nઝરમર વરસે મેહુલીયા, ભક્તજન ગુણ તો ગાયે, રંગ ઉડાતે આયે... મેરે."
  },
  {
    "title": "૫૪૦. જય લે હરિ કા નામ મનવા જય લે હરિ કા નામ (૩૮૮)",
    "slug": "540-jay-le-hari-ka-naam-manva-jay-le-hari-ka-naam",
    "authorSlug": "anya-santo",
    "category": "અન્ય સંતો",
    "sortOrder": 540,
    "lyrics": "જય લે હરિ કા નામ મનવા જય લે હરિ કા નામ... (ટેક)\n\nઉસકે નામ સે બન જાયેંગે, બિગડે હુવે તેરે કામ\nનામ હી એસા ધન હે તેરા, નિર્ધન કો ધનવાન બના દે... મનવા.\n\nનામ હી નર કો નારાયણ કી એક પહેચાન કરા દે\nમતલબ એક હે રામ કહે તૂ, યા કહે દે ઘનશ્યામ... મનવા.\n\nસૂરજ ચાંદ સિતારે પંછી, નદિયા તીર સમુંદર\nનામ કે બલ સે સબ ચલતે હે, એ ધરતી એ અંબર... મનવા.\n\nનામ હી લેકર દિન ઉગતા હે, નામ સે ઢલતી શામ\nસપને કો અપના સમજ તૂ, રેત કે મહેલ બના એ... મનવા.\n\nપડછાયે કે પીછે ભાગે, હાથ કછુ નહીં આવે\nનામ કી પેડ કી છાંવ તલે, તૂ કર લે કુછ વિશ્રામ... મનવા."
  },
  {
    "title": "૫૪૧. કૈલાસ કે નિવાસી, નમૂ બાર બાર હૂં (૩૮૯)",
    "slug": "541-kailas-ke-nivasi-namu-bar-bar-hum",
    "authorSlug": "anya-santo",
    "category": "અન્ય સંતો",
    "sortOrder": 541,
    "lyrics": "કૈલાસ કે નિવાસી, નમૂ બાર બાર હૂં\nઆયો શરણ તિહારે, પ્રભુ તાર તાર તૂં... (ટેક)\n\nભક્તો કો કભી તુમને શિવ નિરાશ ના કિયા\nમાંગા જિન્હે જો ચાહા, વરદાન દે દિયા\nબડા હે તેરા દાન વિ, બડા દાતાર તૂં... આયો.\n\nવખાણ ક્યા કરૂ મેં રાજો કે ઠેરકા\nચપટી ભભૂત મેં હે ખજાના કુબેરકા\nહે ગંગાધર મુક્ત દ્વાર, ઓમકાર તૂં... આયો.\n\nક્યા ક્યા નહીં દિયા, હમ ક્યા પ્રમાણ હે\nબસે ગયે ત્રિલોક શંભુ તેરે નામ સે\nઝહર પિયા જીવન દિયા, કિતના ઉદાર તૂં... આયો.\n\nતેરી ક્રીપા બિના, નાંહી લેત એક હી અણુ\nલેતે હે સાંસ, તેરી દયા સે તનુ તનુ\nકહે દાસ એક બાર મુજકો નિહાર તૂં... આયો."
  },
  {
    "title": "૫૪૨. મન મોહન મૂરત તેરી પ્રભુ (૩૯૦)",
    "slug": "542-man-mohan-murat-teri-prabhu",
    "authorSlug": "anya-santo",
    "category": "અન્ય સંતો",
    "sortOrder": 542,
    "lyrics": "મન મોહન મૂરત તેરી પ્રભુ, મિલ ભવોગે આપ કહી ન કહી\nયદિ થાહ હમારે દિલમેં હે, તુમ્હેં દૂઢ હિ લેંગે કહી ન કહી... (ટેક)\n\nકાશ્રી મથુરા વ્રિંદાવન મેં યા અવધપુરી ડી ગલીયન મેં\nગંગા યમુના સરયુ તટ પર, મિલ ભવોગે આપ કહી ન કહી... મન મોહન.\n\nઘર બાર કી છોડ સંન્યાસી હુવે, સબકી પરિત્યાગ ઉદાસી હુવે\nછાને ગયે બન બન આખ તેરી, મિલ ભવોગે આપ કહી ન કહી... મન મોહન.\n\nસબ ભક્ત તુમ્હી કો હેરેંગે, તેરે નામ કી માલા ફેરેંગે\nજબ આપ હી ખુદ શર્માવોગે, હમે દર્શન દોગે કહી ન કહી... મન મોહન."
  },
  {
    "title": "૫૪૩. સમરણ ગુરુજી સેવંચલ ભય (૩૯૫)",
    "slug": "543-samran-guruji-sevanchal-bhay",
    "authorSlug": "anya-santo",
    "category": "અન્ય સંતો",
    "sortOrder": 543,
    "lyrics": "સમરણ ગુરુજી સેવંચલ ભય\nજીવન એંધણ થાય તો એવા દિન થાય... (ટેક)\n\nપિતાજી નાં વચન પાવર વાગઝુ વનમાં જાય\nસમાન નો રામલો દુધાસ્રામગ, સ્વપ્ના આપણે મેસવા જાય... સમરણ.\n\nઓસો હતો આસો વિપ્રઆહણ, ચરણ ધ્યાન ઉભરાય\nઆપનો બેસડી માસ્તર સાહેબ ની, વિચારુ બળ્યુ પાચ :- સમરણ.\n\nચૌદ વર્ષ નું તેને રાજ મળ્યુ, લોચ ભ્રટ ના કલાય\nપાંચ ભાઈ નો પ્રધાન વ્યાપે, ડોહિલ ભલ્યા ના ગલાય... સમરણ.\n\nમીંદોડીયા માં બેડા બેડા પ્રભુજી મૂંડાય\nભાવ વિનાનાં ભજન કરાવિ ડાચુ ઉડેતા જાય... સમરણ.\n\nધર્મના કૂપા વિગત કેવળ નાણા એન બંધાય\nમોટી મોટી ધાવ ઉઠાઓ, થાંભો કૂણો કૂતો જાય... સમરણ."
  },
  {
    "title": "૫૪૪. પ્રણામ કી રીત ને સ્થાપે, પ્રણામી વિપ્ર કહેવાય (૩૯૬)",
    "slug": "544-pranam-ki-reet-ne-sthape-pranami-vipra-kahavay",
    "authorSlug": "anya-santo",
    "category": "અન્ય સંતો",
    "sortOrder": 544,
    "lyrics": "પ્રણામ કી રીત ને સ્થાપે, પ્રણામી વિપ્ર કહેવાય\nવ્યાપાર બુરી વણાર દાતા, ગુરુ જેના બાલક વાલે... (ટેક)\n\nન વનમેં વર ઈ શૂરો, વિઝ્રાવલે બાંધેલ બારી\nતડકામાં બાંધે બારમે, ભોગવલે નારણ ત્રિબારી... પ્રણામ.\n\nકરણાં કુંવા નથી થયા, બન્યા ભગવાન ત્રિબારી\nકસોટી કરવા ની દિલ પરિપર ધન્ય જ્ઞાનારી... પ્રણામ.\n\nપિતાની ટેવ ને પાળેશ, જ્ઞાન ભગતિ ગાઇ\nધન્ય થૈ નાર ત્યાંરે, જુગ ના પૂંજ નિહાળી... પ્રણામ.\n\nનયન થી નર ૨૫ છે, યુગ ના પૂંજ નિહાળી\nહતા વૈરાગ્યણ દીધા, માતા સંગોવત માઈ... પ્રણામ.\n\nવાતના થી હોય તે સમજે, હ્રદય ની વાત ને મારી\nરમીતા નો ૧ ૧ તુ ગણાને, સપુત નર સંગ કે શાળા\n\nન વનમેં વાયુ થંકુ તો, બસ પર પડ પાના..."
  },
  {
    "title": "૫૪૫. હયાત માતાપિતા ની છત્રછાંયામાં",
    "slug": "545-hayat-matapita-ni-chhatrachhayama",
    "authorSlug": "anya-santo",
    "category": "અન્ય સંતો",
    "sortOrder": 545,
    "lyrics": "હયાત માતાપિતા ની છત્રછાંયામાં\nવહાલપણ નાં બે વેણ બોલી ને નિરખી લેજો\nઈંડ અડધા બીડાય ગયા પછી\nગંગાજળ મૂકી ને શું કરશો ?...\n\nઅંતર નાં આશિર્વાદ આપનાર ને\nસાચા હૃદય થી એક ક્ષણ ભેટી લેજો\nહયાતી નહીં હોય ત્યારે નત મસ્તકે\nછબી ને નમન કરી ને શું કરશો...\n\nકાળ ની થપાટ વાગશે, અલવિદા એ થઈ જશે\nપ્રેમાળ હાથ પાછા તમારા પર, કદી નહીં ફરે\nલાખ કરશો ઉપાય, તે વાત્સલ્ય લહાવો નહીં મળે\nપછી દિવન ખંડ માં તસ્વીર મૂકી ને શું કરશો...\n\nમાતાપિતા નો અખજા ભાગ્યશાળી સંતાન ને મળે\nઅડસઠ તિરથ તેનાં ચરણોમાં, બીજા તિરથ ના ફરસો\nસ્નેહ ની ભરતી આવશે, ચાલી જશે પલમાં\nપછી કિનારે છિપલા વીણી ને શું કરશો...\n\nહયાત હોય ત્યારે હૈયુ તેનું ઠારજો\nપાનખર માં વસંત આવે, એવી વ્યવહાર રાખજો\nપંચ મહાભૂત માં ભળી ગયા પછી આ દિલનાં\nઅસ્થિ ને ગંગામાં પધરાવી ને શું કરશો...\n\nશ્રવણ બનીને ઘડપણ ની લાકડી તમે બનજો\nહેત થી હાથ પકડી ને કયારેક તિર્થ સાથે ફરજો\nમાતૃ દેવો ભવ પિતૃ દેવો ભવ સનાતન સત્ય છે\nપછી રામ નામ સત્ય છે બોલી ને શું કરશો...\n\nપૈસા ખર્ચતા સઘળુ મળશે, મા બાપ નહીં મળે\nગયો સમય નહીં આવે, લાખો કમાઈ ને શું કરશો\nપ્રેમ થી હાથ ફેરવીને, બેટા કહેનાર નહીં મળે\nપછી ઉછીનો પ્રેમ લઈને, આંસુ સારી ને શું કરશો..."
  },
  {
    "title": "૫૪૬. દરિશન વ્યાપા હરિગુણ ગવાય છે (૩૭૧)",
    "slug": "546-darishan-vyapa-harigun-gavay-chhe",
    "authorSlug": "satar-saheb",
    "category": "સત્તાર સાહેબ",
    "sortOrder": 546,
    "lyrics": "દરિશન વ્યાપા હરિગુણ ગવાય છે, ભાવ વગર નગન કરો વ્યાકુળ થાય છે... (ટેક)\n\nમાતાપિતા પુત્ર બાંધવ તારા, અંત સમયે કોઈ નથી તારા\nચેત સમજી મન (રે) ક્યા વયડાય છે... ભાવ.\n\nહરિ કથા કીર્તન સતસંગ વિના, પાપ નાં પોટલા બાંધતા નિરદિન\nપરનારી પરધન (રે) દેખી લોભાય છે... ભાવ.\n\nજ્ઞાન ધર્મ દયા નાહિં મનમાં, શ્રદ્ધા ન રાખે શાસ્ત્ર વચનમાં\nષડરીપુઓના (રે) ઘૂંટે ઘૂંટાય છે... ભાવ.\n\nકુંગારા હોય તે શબ્દ કમાશે, કુળારા ગતાગતી તાણે\nદાસ સતાર (રે) મારા ભેળા વિચાર... ભાવ."
  },
  {
    "title": "૫૪૭. સાચ વાત ની એક વાત લીજી, શિખામણ છેલ્લી રે (૩૮૪)",
    "slug": "547-sach-vat-ni-ek-vat-liji-shikhaman-chhelli-re",
    "authorSlug": "rishi-raj",
    "category": "ઋષિ રાજ",
    "sortOrder": 547,
    "lyrics": "સાચ વાત ની એક વાત લીજી, શિખામણ છેલ્લી રે\nદયા રાખીને અન્નદાન દેજો, શિખામણ છેલ્લી રે\n\nપરધન પરાણ પથરો પરમાણો, શિખામણ છેલ્લી રે\nઝૂઠ સાચ જરૂર દવે બાંધો, શિખામણ છેલ્લી રે\n\nશ્વાસે શ્વાસે રામ નામ સાંધો, શિખામણ છેલ્લી રે\nગુણ ગોવિંદ આંનંદ ભેર ગાવો, શિખામણ છેલ્લી રે\n\nજ્ઞાન મેળવવા સાંભળો ગીતાજી, શિખામણ છેલ્લી રે\nઋષિરાજ રામ લિંગ થયા રાજી, શિખામણ છેલ્લી રે"
  },
  {
    "title": "૫૪૮. મૂળ મહેલમાં વસે ગુલેશા (૩૭૦)",
    "slug": "548-mul-mahelma-vase-gulesha",
    "authorSlug": "toral-pari-rukhadiyo",
    "category": "તોરલ પરી રૂખડિયો",
    "sortOrder": 548,
    "lyrics": "મૂળ મહેલમાં વસે ગુલેશા, ગુરુનામ નો નામ પાતા\nમેરે દાતા, ગુણપતિ દાદા... (ટેક)\n\nતમે ખોલો અંધારાના તાળા, તમે ભાંગો મારી હંસની કાંતા\nમારા દુઃખ હરિયે મટી ગયાદ... મેરે દાતા.\n\nરૂમઝૂમ રૂમઝૂમ નૂપુર વાગે, મધુરી વાંસલી વાગંતા... મેરે દાતા.\n\nધૂપ દીપ ને કરું આરતી, ગુણગાન નોં ધૂપ હોવા... મેરે દાતા.\n\nખીર ખાંડ ને અમૃત ભોજન, ગુણપતિ સાદું ખાતા\nતોરસ પરી રૂખડિયો બોલ્યા, મરણયા મોંઘુ પાતા... મેરે દાતા."
  },
  {
    "title": "૬૦૨. સદ્ગુરુ તોરલ પુરી રૂખળીયા જોગી ની વાણી",
    "slug": "602-sadguru-toral-puri-rukhaliya-jogi-ni-vani",
    "authorSlug": "toral-pari-rukhadiyo",
    "category": "તોરલ પરી રૂખડિયો",
    "sortOrder": 602,
    "lyrics": "દલ દરિયા મે ડૂબકી દેના,,મોતી લેના ગોતી,,,સંતો મોતી લેના ગોતી\n\nખારા સમદરીયા મે છીપ બસત હે,,ભાત ભાત કે મોતી,,\nઈ મોતી કોઈ ગોતી લાવે,,જેને સદ્ગુરુ સે ગમ હોતી\nદલ દરિયા મે ડૂબકી દેના મોતી લેના ગોતી\n\nરણુકાર પર જણુંકાર હે,,જણુંકાર પર જ્યોતિ\nઈ જ્યોતિ પર અભય શૂન્ય હે,,વહા બસત હે મોતી\nદલ દરિયા મા ડૂબકી દેના મોતી લેના ગોતી સંતો મોતી,,,,,\n\nનવ મી ખીરકી દશ મી ખીરકી,,ખીરકી પર એક ખીરકી\nઈ ખીરકી કોઈ સંત ખોલત હે,,જો ચાવી હોય ઉન ઘર કી\nમોતી લેના ગોતી,,,\n\nડાબી ઈંગલા જમણી,,પીંગલા,સુક્ષમણા ઘર હે જ્યોતિ\nતોરલ પુરી રૂખળયો બોલ્યા,હરખે હાર પરોતી\nમોતી લેના ગોતી સંતો મોતી લેના ગોતી,,,,"
  }
];

  for (const b of rawBhajans) {
    const authorId = b.authorSlug ? authorMap[b.authorSlug] : null;
    await prisma.bhajan.upsert({
      where: { slug: b.slug },
      update: {
        title: b.title,
        authorId: authorId,
        category: b.category,
        sortOrder: b.sortOrder,
        lyrics: b.lyrics,
        status: 'PUBLISHED',
      },
      create: {
        title: b.title,
        slug: b.slug,
        authorId: authorId,
        category: b.category,
        sortOrder: b.sortOrder,
        lyrics: b.lyrics,
        status: 'PUBLISHED',
      },
    });
  }

  console.log('Successfully seeded all bhajans!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
