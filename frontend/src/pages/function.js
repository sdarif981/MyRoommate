export const CalculateMatchScore = (a, b) => {
  // Define criteria with weights and comparison type
const criteriaList = [
  //  Academic / location compatibility
  { key: "college", weight: 0.08, type: "string" },
  { key: "address", weight: 0.07, type: "string" },

  //  Lifestyle & personality — most important
  { key: "gender", weight: 0.18, type: "exact" },
  { key: "studyHabits", weight: 0.18, type: "exact" },
  { key: "sleepPattern", weight: 0.18, type: "exact" },
  { key: "cleanliness", weight: 0.12, type: "exact" },
  { key: "noiseTolerance", weight: 0.12, type: "exact" },
  { key: "smoking", weight: 0.07, type: "exact" },
  { key: "drinking", weight: 0.07, type: "exact" },

  //  Interests & vibe
  { key: "hobbies", weight: 0.09, type: "array" },
  { key: "bio", weight: 0.04, type: "string" },
];



  let totalWeight = 0;
  let totalScore = 0;

  for (const { key, weight, type } of criteriaList) {
    totalWeight += weight;
    if (a[key] == null || b[key] == null) continue; // skip missing data

    let matchScore = 0;

    switch (type) {
      case "string":
        // case-insensitive partial similarity
        const strA = a[key].toLowerCase();
        const strB = b[key].toLowerCase();
        const similarity = getStringSimilarity(strA, strB);
        matchScore = similarity; // returns 0–1
        break;

      case "array":
        if (Array.isArray(a[key]) && Array.isArray(b[key])) {
          const setA = new Set(a[key].map((h) => h.toLowerCase()));
          const setB = new Set(b[key].map((h) => h.toLowerCase()));
          const intersection = [...setA].filter((h) => setB.has(h));
          const union = new Set([...setA, ...setB]);
          matchScore = union.size === 0 ? 0 : intersection.length / union.size;
 // Jaccard similarity
        }
        break;

      default: // exact match
        matchScore = a[key] === b[key] ? 1 : 0;
    }

    totalScore += matchScore * weight;
  }

  if (totalWeight === 0) return 0;

  return Math.round((totalScore / totalWeight) * 100);
};

// 🔠 Helper function: simple string similarity (Levenshtein ratio)
function getStringSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  const longerLength = longer.length;
  if (longerLength === 0) return 1.0;
  const editDistance = getEditDistance(longer, shorter);
  return (longerLength - editDistance) / longerLength;
}

function getEditDistance(a, b) {
  const m = a.length;
  const n = b.length;

  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],    // delete
          dp[i][j - 1],    // insert
          dp[i - 1][j - 1] // replace
        );
      }
    }
  }

  return dp[m][n];
}

