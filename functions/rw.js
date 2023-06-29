const fs = require("fs");
const dbPath = "./api/blog.json"

function save(data) {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data));
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

function read(path) {
    const file = fs.readFileSync(path);
    return JSON.parse(file);
}
module.exports = {read, save}