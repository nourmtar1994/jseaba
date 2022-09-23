const gradeCategory = {
  officier: [
    "ملازم",
    "ملازم أول",
    "نقيب",
    "رائد",
    "مقدم",
    "عقيد",
    "عميد",
    "أمير لواء",
  ],
  souOfficier: ["عريف", "عريف أول", "وكيل", "وكيل أول", "وكيل أعلى"],
  hommeTroupe: ["تلميذ", "جندي متطوع", "جندي", "جندي أول", "رقيب", "رقيب أول"],
};

export const getGradeCategory = (grade) => {
  return (
    (gradeCategory?.officier?.find((item) => item === grade) && "ضباط") ||
    (gradeCategory?.souOfficier?.find((item) => item === grade) &&
      "ضباط الصف") ||
    (gradeCategory?.hommeTroupe?.find((item) => item === grade) && "رجال الجيش")
  );
};
