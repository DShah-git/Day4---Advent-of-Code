const fs = require('fs').promises;

async function readFileExample() {
  try {
    const data = await fs.readFile('input.txt', 'utf8')
    return data
  } catch (err) {
    console.error('Error reading file:', err)
  }
}


async function formatData(){
    let inputData = await readFileExample();   
    let lines = inputData.split('\n')
    let data = []

    for(let line of lines){
        data.push(line.trim().split(''))
    }

    return data;
}   

async function solution(){
    let grid = await formatData()

    const word = 'XMAS';
    const rows = grid.length;
    const cols = grid[0].length;
    let total = 0;

    // 8 directions
    const directions = [
    [0, 1], [0, -1], [1, 0], [-1, 0],
    [1, 1], [1, -1], [-1, 1], [-1, -1]
    ];

    // Depth-First Search
    function dfs(x, y, index, dx, dy) {
        // If we've matched all letters
        if (index === word.length - 1) return true;

        const nx = x + dx;
        const ny = y + dy;

        // Boundary + character check
        if (
            nx < 0 || ny < 0 || nx >= rows || ny >= cols ||
            grid[nx][ny] !== word[index + 1]
        ) {
            return false;
        }

        // Continue in same direction
        return dfs(nx, ny, index + 1, dx, dy);
    }

    // Try every cell as a starting point
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 'X') {
                for (const [dx, dy] of directions) {
                    if (dfs(i, j, 0, dx, dy)) total++;
                }
            }
        }
    }

    console.log('Total XMAS found:', total);
}


solution()





