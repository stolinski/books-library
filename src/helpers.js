export const nameFormatter = (name) => {
  return name
    // Removing non-letter characters
    .replace(/[^A-Za-z]/g, ' ')
    // Trimming whitespaces
    .trim()
    // Replace first letter of every word by the upper case version, lowercasing the rest
    .replace(/\w*/g, function(word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });

}