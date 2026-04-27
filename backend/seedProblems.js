require('dotenv').config();
const mongoose = require('mongoose');
const Problem = require('./models/Problem');
const connectDB = require('./config/database');

/* ================= SLUG ================= */

const generateSlug = (title, index) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + index;

/* ================= NORMALIZERS ================= */

const normalizeDifficulty = (d) => {
  if (!d) return "Easy";
  const val = d.charAt(0).toUpperCase() + d.slice(1).toLowerCase();
  return ["Easy", "Medium", "Hard"].includes(val) ? val : "Easy";
};

/* Convert sampleInput/sampleOutput → testCases */
const normalizeTestCases = (p) => {
  if (p.testCases && Array.isArray(p.testCases)) return p.testCases;

  if (p.sampleInput && p.sampleOutput) {
    return [
      {
        input: p.sampleInput,
        output: p.sampleOutput,
        isSample: true,
      },
    ];
  }

  return [];
};

/* ================= YOUR DATA (UNCHANGED) ================= */

const sampleProblems = [

/* ================= EASY ================= */

{
  title: 'Two Sum',
  description: 'Find indices of two numbers that add up to target.',
  difficulty: 'Easy',
  tags: ['Array'],
  constraints: '1 <= n <= 10^5',
  inputFormat: 'Array + target',
  outputFormat: 'Indices',
  testCases: [{ input: '2 7 11 15\n9', output: '0 1', isSample: true }],
  timeLimit: 2000,
  memoryLimit: 256,
  hints: ['Use hashmap'],
  companies: ['Amazon'],
  isActive: true
},

{
  title: 'Palindrome Number',
  description: 'Check if number is palindrome.',
  difficulty: 'Easy',
  tags: ['Math'],
  constraints: '-2^31 <= x <= 2^31-1',
  inputFormat: 'Number',
  outputFormat: 'true/false',
  testCases: [{ input: '121', output: 'true', isSample: true }],
  timeLimit: 2000,
  memoryLimit: 256,
  hints: ['Reverse'],
  companies: ['Google'],
  isActive: true
},

{
  title: 'Reverse String',
  description: 'Reverse a string.',
  difficulty: 'Easy',
  tags: ['String'],
  constraints: '1 <= n <= 10^5',
  inputFormat: 'String',
  outputFormat: 'Reversed',
  testCases: [{ input: 'hello', output: 'olleh', isSample: true }],
  timeLimit: 1000,
  memoryLimit: 128,
  hints: ['Two pointer'],
  companies: ['Google'],
  isActive: true
},

{
  title: 'Valid Parentheses',
  description: 'Check valid parentheses.',
  difficulty: 'Easy',
  tags: ['Stack'],
  constraints: '1 <= n <= 10^5',
  inputFormat: 'String',
  outputFormat: 'true/false',
  testCases: [{ input: '()', output: 'true', isSample: true }],
  timeLimit: 2000,
  memoryLimit: 256,
  hints: ['Stack'],
  companies: ['Amazon'],
  isActive: true
},

{
  title: 'Factorial',
  description: 'Find factorial of number.',
  difficulty: 'Easy',
  tags: ['Math'],
  constraints: '0 <= n <= 20',
  inputFormat: 'n',
  outputFormat: 'n!',
  testCases: [{ input: '5', output: '120', isSample: true }],
  timeLimit: 1000,
  memoryLimit: 128,
  hints: ['Loop'],
  companies: ['TCS'],
  isActive: true
},

{
  title: 'Fibonacci Number',
  description: 'Find nth Fibonacci.',
  difficulty: 'Easy',
  tags: ['DP'],
  constraints: '0 <= n <= 30',
  inputFormat: 'n',
  outputFormat: 'fib(n)',
  testCases: [{ input: '6', output: '8', isSample: true }],
  timeLimit: 1000,
  memoryLimit: 128,
  hints: ['DP'],
  companies: ['Amazon'],
  isActive: true
},

{
  title: 'Binary Search',
  description: 'Find element index.',
  difficulty: 'Easy',
  tags: ['Binary Search'],
  constraints: 'Sorted array',
  inputFormat: 'Array + target',
  outputFormat: 'Index',
  testCases: [{ input: '1 2 3 4 5\n3', output: '2', isSample: true }],
  timeLimit: 1000,
  memoryLimit: 128,
  hints: ['Divide'],
  companies: ['Amazon'],
  isActive: true
},

{
  title: 'Maximum Element',
  description: 'Find max element.',
  difficulty: 'Easy',
  tags: ['Array'],
  constraints: '1 <= n <= 10^5',
  inputFormat: 'Array',
  outputFormat: 'Max',
  testCases: [{ input: '1 5 3 9', output: '9', isSample: true }],
  timeLimit: 1000,
  memoryLimit: 128,
  hints: ['Loop'],
  companies: ['TCS'],
  isActive: true
},

{
  title: 'Count Vowels',
  description: 'Count vowels in string.',
  difficulty: 'Easy',
  tags: ['String'],
  constraints: '1 <= n <= 10^5',
  inputFormat: 'String',
  outputFormat: 'Count',
  testCases: [{ input: 'hello', output: '2', isSample: true }],
  timeLimit: 1000,
  memoryLimit: 128,
  hints: ['Check vowels'],
  companies: ['Wipro'],
  isActive: true
},

{
  title: 'Check Prime',
  description: 'Check if number is prime.',
  difficulty: 'Easy',
  tags: ['Math'],
  constraints: '1 <= n <= 10^6',
  inputFormat: 'Number',
  outputFormat: 'true/false',
  testCases: [{ input: '7', output: 'true', isSample: true }],
  timeLimit: 1000,
  memoryLimit: 128,
  hints: ['sqrt'],
  companies: ['Infosys'],
  isActive: true
},

/* ================= MEDIUM ================= */

{
  title: 'Longest Substring Without Repeating Characters',
  description: 'Find longest substring without repetition.',
  difficulty: 'Medium',
  tags: ['String'],
  constraints: '1 <= n <= 10^5',
  inputFormat: 'String',
  outputFormat: 'Length',
  testCases: [{ input: 'abcabcbb', output: '3', isSample: true }],
  timeLimit: 2000,
  memoryLimit: 256,
  hints: ['Sliding window'],
  companies: ['Amazon'],
  isActive: true
},

{
  title: 'Maximum Subarray',
  description: 'Find max subarray sum.',
  difficulty: 'Medium',
  tags: ['Array'],
  constraints: 'No constraints',
  inputFormat: 'Array',
  outputFormat: 'Sum',
  testCases: [{ input: '-2 1 -3 4 -1 2 1', output: '6', isSample: true }],
  timeLimit: 2000,
  memoryLimit: 256,
  hints: ['Kadane'],
  companies: ['Google'],
  isActive: true
},

{
  title: 'Rotate Array',
  description: 'Rotate array by k.',
  difficulty: 'Medium',
  tags: ['Array'],
  constraints: 'No constraints',
  inputFormat: 'Array + k',
  outputFormat: 'Rotated',
  testCases: [{ input: '1 2 3 4 5\n2', output: '4 5 1 2 3', isSample: true }],
  timeLimit: 2000,
  memoryLimit: 256,
  hints: ['Reverse'],
  companies: ['Google'],
  isActive: true
},

{
  title: 'Product of Array Except Self',
  description: 'Return product array.',
  difficulty: 'Medium',
  tags: ['Array'],
  constraints: 'No constraints',
  inputFormat: 'Array',
  outputFormat: 'Array',
  testCases: [{ input: '1 2 3 4', output: '24 12 8 6', isSample: true }],
  timeLimit: 2000,
  memoryLimit: 256,
  hints: ['Prefix'],
  companies: ['Facebook'],
  isActive: true
},

{
  title: 'House Robber',
  description: 'Max money without adjacent.',
  difficulty: 'Medium',
  tags: ['DP'],
  constraints: 'No constraints',
  inputFormat: 'Array',
  outputFormat: 'Max',
  testCases: [{ input: '2 7 9 3 1', output: '12', isSample: true }],
  timeLimit: 2000,
  memoryLimit: 256,
  hints: ['DP'],
  companies: ['Amazon'],
  isActive: true
},

/* ================= HARD ================= */

{
  title: 'Binary Tree Maximum Path Sum',
  description: 'Find max path sum in tree.',
  difficulty: 'Hard',
  tags: ['Tree'],
  constraints: 'No constraints',
  inputFormat: 'Tree',
  outputFormat: 'Sum',
  testCases: [{ input: '1 2 3', output: '6', isSample: true }],
  timeLimit: 5000,
  memoryLimit: 512,
  hints: ['DFS'],
  companies: ['Google'],
  isActive: true
},

{
  title: 'Trapping Rain Water',
  description: 'Calculate trapped water.',
  difficulty: 'Hard',
  tags: ['Array'],
  constraints: '1 <= n <= 10^5',
  inputFormat: 'Array',
  outputFormat: 'Integer',
  testCases: [{ input: '0 1 0 2 1 0 1 3 2 1 2 1', output: '6', isSample: true }],
  timeLimit: 2000,
  memoryLimit: 256,
  hints: ['Two pointers'],
  companies: ['Google'],
  isActive: true
}

];

/* ================= SEED ================= */

const seedProblems = async () => {
  try {
    await connectDB();

    console.log('Clearing existing problems...');
    await Problem.deleteMany({});

    console.log('Inserting sample problems...');

    const problemsWithSlug = sampleProblems.map((p, i) => ({
      ...p,

      difficulty: normalizeDifficulty(p.difficulty),

      constraints: p.constraints || "No constraints specified",
      inputFormat: p.inputFormat || "Standard input",
      outputFormat: p.outputFormat || "Standard output",

      testCases: normalizeTestCases(p),

      slug: generateSlug(p.title || "problem", i)
    }));

    const problems = await Problem.insertMany(problemsWithSlug);

    console.log(`✅ Created ${problems.length} problems`);
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedProblems();