function concatenateNames(studentArray) {
  const concatenatedNames = [];

  for (const student of studentArray) {
    const fullName = `${student?.studentLastName}, ${student?.studentOtherNames}`;
    concatenatedNames.push(fullName);
  }

  return concatenatedNames;
}

export default concatenateNames;
