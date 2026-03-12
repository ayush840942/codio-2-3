const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src'));
let changedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace standalone min-h-screen
    content = content.replace(/\bmin-h-screen\b/g, 'min-h-[100dvh]');
    // Replace standalone h-screen
    content = content.replace(/\bh-screen\b/g, 'h-[100dvh]');
    // Replace standalone max-h-screen
    content = content.replace(/\bmax-h-screen\b/g, 'max-h-[100dvh]');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        changedCount++;
    }
});

console.log(`Successfully updated ${changedCount} files to use dynamic viewport heights.`);
