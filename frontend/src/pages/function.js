export const CalculateMatchScore = (a, b) => {
  // Define criteria with weights and comparison type
  const criteriaList = [
    { key: "college", weight: 0.1, type: "string" },
    { key: "sleepPattern", weight: 0.15, type: "exact" },
    { key: "studyHabits", weight: 0.1, type: "exact" },
    { key: "cleanliness", weight: 0.15, type: "exact" },
    { key: "noiseTolerance", weight: 0.15, type: "exact" },
    { key: "smoking", weight: 0.1, type: "exact" },
    { key: "drinking", weight: 0.1, type: "exact" },
    { key: "hobbies", weight: 0.15, type: "array" },
  ];

  let totalWeight = 0;
  let totalScore = 0;

  for (const { key, weight, type } of criteriaList) {
    if (a[key] == null || b[key] == null) continue; // skip missing data
    totalWeight += weight;

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
          matchScore = intersection.length / union.size; // Jaccard similarity
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
  return (longerLength - editDistance) / parseFloat(longerLength);
}

function getEditDistance(a, b) {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] =
        b.charAt(i - 1) === a.charAt(j - 1)
          ? matrix[i - 1][j - 1]
          : Math.min(
              matrix[i - 1][j - 1] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j] + 1
            );
    }
  }
  return matrix[b.length][a.length];
}
