export function convertStringToPercentage(inputString) {
  // Remove quotation marks and backslashes from the input string
  const cleanedString = inputString.replace(/["\\]/g, "");

  // Split the string by the '/' character
  const parts = cleanedString.split("/");

  // Ensure there are two parts (numerator and denominator)
  if (parts.length !== 2) {
    return null; // Invalid input
  }

  // Parse the numerator and denominator as numbers
  const numerator = parseFloat(parts[0]);
  const denominator = parseFloat(parts[1]);

  // Check if parsing was successful
  if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
    return null; // Invalid input or division by zero
  }

  // Calculate the percentage
  const percentage = (numerator / denominator) * 100;

  // Round the percentage to an integer
  const roundedPercentage = Math.round(percentage);

  return roundedPercentage;
}
