const fs = require('fs').promises;

/**
 * Function to write data to a JSON file given a destination and some content.
 * @param {string} destination - The file you want to write to.
 * @param {object} content - The content you want to write to the file.
 * @returns {Promise<void>}
 */
const writeToFile = async (destination, content) => {
  try {
    await fs.writeFile(destination, JSON.stringify(content, null, 4));
    console.info(`Data written to ${destination}`);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Function to read data from a given file and append some content.
 * @param {object} content - The content you want to append to the file.
 * @param {string} file - The path to the file you want to save to.
 * @returns {Promise<void>}
 */
const readAndAppend = async (content, file) => {
  try {
    const data = await fs.readFile(file, 'utf8');
    const parsedData = JSON.parse(data);
    parsedData.push(content);
    await writeToFile(file, parsedData);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { writeToFile, readAndAppend };