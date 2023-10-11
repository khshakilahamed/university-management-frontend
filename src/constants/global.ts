export const genderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Others",
    value: "others",
  },
];

export const departmentOptions = [
  {
    label: "HR",
    value: "hr manager",
  },
  {
    label: "Finance",
    value: "finance",
  },
  {
    label: "Management Department",
    value: "management department",
  },
];

export const bloodGroupOptions = [
  {
    label: "A+",
    value: "A+",
  },
  {
    label: "A-",
    value: "A-",
  },
  {
    label: "B+",
    value: "B+",
  },
  {
    label: "B-",
    value: "B-",
  },
  {
    label: "AB+",
    value: "AB+",
  },
  {
    label: "AB-",
    value: "AB-",
  },
  {
    label: "O+",
    value: "O+",
  },
  {
    label: "O-",
    value: "O-",
  },
];

export const facultyOptions = [
  {
    label: "Engineering",
    value: "engineering",
  },
  {
    label: "Faculty of science and engineering",
    value: "Faculty of science and engineering",
  },
];

export const acDepartmentOptions = [
  {
    label: "CSE",
    value: "CSE",
  },
  {
    label: "Software Engineering",
    value: "Software Engineering",
  },
];

export const acSemesterOptions = [
  {
    label: "Autumn 2023",
    value: "Autumn 2023",
  },
  {
    label: "Summer 2023",
    value: "Summer 2023",
  },
  {
    label: "Fall 2023",
    value: "Fall 2023",
  },
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const monthOptions = months.map((month: string) => {
  return {
    label: month,
    value: month,
  };
});

export const days = [
  "SATURDAY",
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
];
export const daysOptions = days.map((day: string) => {
  return {
    label: day,
    value: day,
  };
});
