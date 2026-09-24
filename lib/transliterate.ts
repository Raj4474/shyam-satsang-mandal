/**
 * Utility for English ("WhatsApp language" / Gujlish) to Gujarati Transliteration & Search Helper.
 */

// Common Satsang, Bhajan, Sant, and Gujarati word mappings
const DICTIONARY: Record<string, string[]> = {
  'satguru': ['સદ્ ગુરુ', 'સદગુરુ', 'સદ્ ગુરુ', 'સતગુરુ'],
  'sadguru': ['સદ્ ગુરુ', 'સદગુરુ', 'સદ્ ગુરુ', 'સતગુરુ'],
  'sat guru': ['સદ્ ગુરુ', 'સદગુરુ', 'સદ્ ગુરુ'],
  'sad guru': ['સદ્ ગુરુ', 'સદગુરુ', 'સદ્ ગુરુ'],
  'mohan': ['મોહન'],
  'shyam': ['શ્યામ', 'શામ'],
  'sham': ['શામ', 'શ્યામ'],
  'shamji': ['શામજી'],
  'shamjibapa': ['શામજીબાપા', 'શામજી બાપા'],
  'shamji bapa': ['શામજી બાપા', 'શામજીબાપા'],
  'kabir': ['કબીર'],
  'raviram': ['રવિરામ'],
  'bhajan': ['ભજન'],
  'bhajans': ['ભજન', 'ભજનો'],
  'dhun': ['ધૂન'],
  'dhuns': ['ધૂન', 'ધૂનો'],
  'sant': ['સંત'],
  'santo': ['સંતો', 'સંત'],
  'vanshi': ['વંશી'],
  'prakaran': ['પ્રકરણ'],
  'satsang': ['સત્સંગ'],
  'mandal': ['મંડળ'],
  'krishna': ['કૃષ્ણ', 'કાન્હા'],
  'krisna': ['કૃષ્ણ'],
  'kanha': ['કાન્હા', 'કૃષ્ણ'],
  'swami': ['સ્વામી'],
  'sahjanand': ['સહજાનંદ'],
  'sahajanand': ['સહજાનંદ'],
  'gurutattva': ['ગુરુતત્ત્વ'],
  'guru': ['ગુરુ'],
  'bapa': ['બાપા'],
  'gopalanand': ['ગોપાળાનંદ', 'ગોપાલાનંદ'],
  'gunatitanand': ['ગુણાતીતાનંદ'],
  'muktanand': ['મુક્તાનંદ'],
  'premanand': ['પ્રેમાનંદ'],
  'nishmanand': ['નિષ્કુળાનંદ'],
  'brahmanand': ['બ્રહ્માનંદ'],
  'dev': ['દેવ'],
  'harilal': ['હરિલાલ'],
  'hari': ['હરિ'],
  'shree': ['શ્રી'],
  'sri': ['શ્રી'],
  'shri': ['શ્રી'],
  'anand': ['આનંદ'],
  'bhakti': ['ભક્તિ'],
  'aarati': ['આરતી'],
  'aarti': ['આરતી'],
  'thaar': ['થાળ'],
  'thal': ['થાળ'],
  'kirtan': ['કીર્તન'],
  'pad': ['પદ'],
  'chintavan': ['ચિંતવન'],
  'nitya': ['નિત્ય'],
  'niyamo': ['નિયમો'],
  'sakhi': ['સાખી'],
  'prabhatiya': ['પ્રભાતિયા'],
  'shlok': ['શ્લોક'],
  'stuti': ['સ્તુતિ'],
  'jay': ['જય'],
  'jai': ['જય'],
  'ram': ['રામ'],
  'sitaram': ['સીતારામ'],
  'radhe': ['રાધે'],
  'govind': ['ગોવિંદ'],
  'gopal': ['ગોપાળ', 'ગોપાલ'],
};

// Check if input query contains Latin/English letters
export function isEnglishOrMixed(text: string): boolean {
  return /[a-zA-Z]/.test(text);
}

/**
 * Phonetically transliterates a single English word into Gujarati Unicode script.
 */
export function phoneticTransliterateWord(word: string): string {
  if (!word || !/[a-zA-Z]/.test(word)) return word;

  const lower = word.toLowerCase();

  // 1. Direct dictionary match first
  if (DICTIONARY[lower] && DICTIONARY[lower].length > 0) {
    return DICTIONARY[lower][0];
  }

  // Multi-character consonant/vowel token mappings (ordered by length descending)
  const tokenMap: [RegExp, string][] = [
    [/^shyam/i, 'શ્યામ'],
    [/^satguru/i, 'સદ્ ગુરુ'],
    [/^sadguru/i, 'સદગુરુ'],
    [/^gny/i, 'જ્ઞ'],
    [/^dny/i, 'જ્ઞ'],
    [/^gy/i, 'જ્ઞ'],
    [/^ksh/i, 'ક્ષ'],
    [/^chh/i, 'છ'],
    [/^kh/i, 'ખ'],
    [/^gh/i, 'ઘ'],
    [/^ch/i, 'ચ'],
    [/^jh/i, 'ઝ'],
    [/^zh/i, 'ઝ'],
    [/^th/i, 'થ'],
    [/^dh/i, 'ધ'],
    [/^ph/i, 'ફ'],
    [/^bh/i, 'ભ'],
    [/^sh/i, 'શ'],
    [/^shh/i, 'ષ'],
    [/^ng/i, 'ં'],
    [/^k/i, 'ક'],
    [/^g/i, 'ગ'],
    [/^j/i, 'જ'],
    [/^t/i, 'ત'],
    [/^d/i, 'દ'],
    [/^n/i, 'ન'],
    [/^p/i, 'પ'],
    [/^f/i, 'ફ'],
    [/^b/i, 'બ'],
    [/^m/i, 'મ'],
    [/^y/i, 'ય'],
    [/^r/i, 'ર'],
    [/^l/i, 'લ'],
    [/^v/i, 'વ'],
    [/^w/i, 'વ'],
    [/^s/i, 'સ'],
    [/^h/i, 'હ'],
    [/^z/i, 'ઝ'],
  ];

  const independentVowels: [RegExp, string][] = [
    [/^aa/i, 'આ'],
    [/^ai/i, 'ઐ'],
    [/^au/i, 'ઔ'],
    [/^ou/i, 'ઔ'],
    [/^ee/i, 'ઈ'],
    [/^ii/i, 'ઈ'],
    [/^oo/i, 'ઊ'],
    [/^uu/i, 'ઊ'],
    [/^a/i, 'અ'],
    [/^i/i, 'ઇ'],
    [/^u/i, 'ઉ'],
    [/^e/i, 'એ'],
    [/^o/i, 'ઓ'],
  ];

  const dependentVowels: [RegExp, string][] = [
    [/^aa/i, 'ા'],
    [/^ai/i, 'ૈ'],
    [/^au/i, 'ૌ'],
    [/^ou/i, 'ૌ'],
    [/^ee/i, 'ી'],
    [/^ii/i, 'ી'],
    [/^oo/i, 'ૂ'],
    [/^uu/i, 'ૂ'],
    [/^a/i, ''], // Inherent vowel (no extra matra)
    [/^i/i, 'િ'],
    [/^u/i, 'ુ'],
    [/^e/i, 'ે'],
    [/^o/i, 'ો'],
    [/^an/i, 'ં'],
    [/^am/i, 'ં'],
  ];

  let result = '';
  let i = 0;
  let lastWasConsonant = false;

  while (i < lower.length) {
    const sub = lower.slice(i);
    let matched = false;

    if (!lastWasConsonant) {
      // Try independent vowels
      for (const [regex, glyph] of independentVowels) {
        const m = sub.match(regex);
        if (m) {
          result += glyph;
          i += m[0].length;
          lastWasConsonant = false;
          matched = true;
          break;
        }
      }
    } else {
      // Try dependent vowels
      for (const [regex, glyph] of dependentVowels) {
        const m = sub.match(regex);
        if (m) {
          result += glyph;
          i += m[0].length;
          lastWasConsonant = false;
          matched = true;
          break;
        }
      }
    }

    if (matched) continue;

    // Try consonants
    for (const [regex, glyph] of tokenMap) {
      const m = sub.match(regex);
      if (m) {
        result += glyph;
        i += m[0].length;
        lastWasConsonant = true;
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Skip or append char as is (numbers/spaces/symbols)
      result += sub[0];
      i++;
      lastWasConsonant = false;
    }
  }

  return result;
}

/**
 * Returns all potential search query variations (original + transliterated Gujarati words)
 */
export function getSearchQueries(query: string): string[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const queries = new Set<string>();
  queries.add(trimmed);

  const lower = trimmed.toLowerCase();

  // 1. Exact or partial dictionary matches
  if (DICTIONARY[lower]) {
    DICTIONARY[lower].forEach((val) => queries.add(val));
  }

  // Check multi-word dictionary phrases or individual tokens
  const words = trimmed.split(/\s+/);
  const transliteratedWords: string[][] = [];

  for (const word of words) {
    const wordLower = word.toLowerCase();
    if (DICTIONARY[wordLower]) {
      transliteratedWords.push(DICTIONARY[wordLower]);
    } else if (isEnglishOrMixed(word)) {
      const ph = phoneticTransliterateWord(word);
      transliteratedWords.push([ph]);
    } else {
      transliteratedWords.push([word]);
    }
  }

  // Combine transliterated words into full phrases
  if (transliteratedWords.length > 0) {
    // Generate primary combination
    const primaryPhrase = transliteratedWords.map((arr) => arr[0]).join(' ');
    if (primaryPhrase) {
      queries.add(primaryPhrase);
      // Also add unspaced variant if relevant (e.g. "સદ્ ગુરુ")
      queries.add(primaryPhrase.replace(/\s+/g, ''));
    }

    // Add secondary dictionary variations if any
    for (let index = 0; index < transliteratedWords.length; index++) {
      for (const alt of transliteratedWords[index]) {
        const altPhrase = transliteratedWords
          .map((arr, i) => (i === index ? alt : arr[0]))
          .join(' ');
        queries.add(altPhrase);
      }
    }
  }

  return Array.from(queries).filter(Boolean);
}

/**
 * Gets a clean list of primary transliterated Gujarati suggestions for UI display.
 */
export function getGujaratiTransliterations(query: string): string[] {
  if (!isEnglishOrMixed(query)) return [];

  const all = getSearchQueries(query);
  // Filter out English original query and keep unique Gujarati strings
  return all.filter((item) => !isEnglishOrMixed(item));
}

/**
 * Converts Gujarati Unicode script text into readable Romanized English / Gujlish script.
 */
export function toGujlish(text: string): string {
  if (!text) return '';

  // Consonant map
  const consonantMap: Record<string, string> = {
    'ક': 'k', 'ખ': 'kh', 'ગ': 'g', 'ઘ': 'gh', 'ઙ': 'ng',
    'ચ': 'ch', 'છ': 'chh', 'જ': 'j', 'ઝ': 'z', 'ઞ': 'ny',
    'ટ': 't', 'ઠ': 'th', 'ડ': 'd', 'ઢ': 'dh', 'ણ': 'n',
    'ત': 't', 'થ': 'th', 'દ': 'd', 'ધ': 'dh', 'ન': 'n',
    'પ': 'p', 'ફ': 'ph', 'બ': 'b', 'ભ': 'bh', 'મ': 'm',
    'ય': 'y', 'ર': 'r', 'લ': 'l', 'વ': 'v', 'શ': 'sh',
    'ષ': 'sh', 'સ': 's', 'હ': 'h', 'ળ': 'l', 'ક્ષ': 'ksh', 'જ્ઞ': 'gny',
  };

  // Independent vowel map
  const vowelMap: Record<string, string> = {
    'અ': 'a', 'આ': 'aa', 'ઇ': 'i', 'ઈ': 'ee', 'ઉ': 'u',
    'ઊ': 'oo', 'ઋ': 'ru', 'એ': 'e', 'ઐ': 'ai', 'ઓ': 'o',
    'ઔ': 'au', 'અં': 'an', 'અઃ': 'ah',
  };

  // Dependent matra map
  const matraMap: Record<string, string> = {
    'ા': 'a', 'િ': 'i', 'ી': 'ee', 'ુ': 'u', 'ૂ': 'oo',
    'ૃ': 'ru', 'ે': 'e', 'ૈ': 'ai', 'ો': 'o', 'ૌ': 'au',
    'ં': 'n', 'ઃ': 'h',
  };

  const chars = Array.from(text);
  let result = '';

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const nextChar = chars[i + 1] || '';

    // Check independent vowel
    if (vowelMap[char]) {
      result += vowelMap[char];
      continue;
    }

    // Check consonant
    if (consonantMap[char]) {
      let base = consonantMap[char];
      
      // Check if followed by virama (halant '્')
      if (nextChar === '્') {
        result += base;
        i++; // skip halant
        continue;
      }

      // Check if followed by dependent matra
      if (matraMap[nextChar]) {
        result += base + matraMap[nextChar];
        i++; // skip matra
        continue;
      }

      // If at end of word or followed by space/punctuation/newline, or next is vowel/space
      // Standard Gujarati implicit 'a' handling: keep 'a' unless at end of word or before space
      if (!nextChar || /\s|[.,!?;:()"'\-\n]/.test(nextChar)) {
        // Word final consonant: often silent 'a' in Gujlish/Hindi transliteration or kept soft
        // If word is short (1 letter consonant like 'પદ'), keep 'a', else omit final 'a'
        result += base;
      } else {
        result += base + 'a';
      }
      continue;
    }

    // Check standalone matra (if any)
    if (matraMap[char]) {
      result += matraMap[char];
      continue;
    }

    // Pass through punctuation, numbers, spaces, English characters
    result += char;
  }

  // Capitalize first character of lines/sentences for better reading
  return result
    .split('\n')
    .map((line) => {
      if (!line.trim()) return line;
      return line.charAt(0).toUpperCase() + line.slice(1);
    })
    .join('\n');
}

