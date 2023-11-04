export function updateObjectPropertyInStateArray(
  index,
  newPropertyValue,
  propertyToChange,
  stateToBeUpdated,
  setStateToBeUpdated
) {
  // Create a copy of the state array
  const updatedState = [...stateToBeUpdated];

  // Find the object you want to update by its index
  const objectToUpdate = updatedState[index];

  // Update the property of the object
  objectToUpdate[propertyToChange] = newPropertyValue;

  // Set the updated state
  setStateToBeUpdated(updatedState);
}
