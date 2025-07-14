const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const FILE_PATH = './data.json';

// ✅ Random integer function (no need for external package)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const git = simpleGit();

const makeCommit = n => {
    if (n === 0) {
        console.log('✅ Done! Pushing to Git...');
        return git.push();
    }

    const x = randomInt(0, 54); // week offset
    const y = randomInt(0, 6);  // day of the week

    const DATE = moment().subtract(1, 'year').add(1, 'day')
        .add(x, 'weeks').add(y, 'days').format();

    const data = { date: DATE };

    console.log(`Commit #${101 - n}: ${DATE}`);

    jsonfile.writeFile(FILE_PATH, data, () => {
        git.add([FILE_PATH])
            .commit(DATE, { '--date': DATE })
            .then(() => makeCommit(n - 1));
    });
};

// 🔁 Run 100 commits
makeCommit(100);
