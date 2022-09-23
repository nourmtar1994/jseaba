export const gradeByCategory = {
  officier: [
    "أمير لواء",
    "عميد",
    "عقيد",
    "مقدم",
    "رائد",
    "نقيب",
    "ملازم أول",
    "ملازم",
  ],
  souOfficier: ["وكيل أعلى", "وكيل أول", "وكيل", "عريف أول", "عريف"],
  hommeTroupe: ["رقيب أول", "رقيب", "جندي أول", "جندي", "جندي متطوع", "تلميذ"],
};

export const grade = gradeByCategory?.hommeTroupe?.concat(
  gradeByCategory?.souOfficier,
  gradeByCategory?.officier
);
