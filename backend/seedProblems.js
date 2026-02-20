require('dotenv').config();
const mongoose = require('mongoose');
const Problem = require('./models/Problem');
const connectDB = require('./config/database');

const sampleProblems = [
  {
    title: 'Two Sum',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]`,
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.',
    inputFormat: 'First line contains space-separated integers (array)\nSecond line contains target integer',
    outputFormat: 'Two space-separated integers representing indices',
    testCases: [
      {
        input: '2 7 11 15\n9',
        output: '0 1',
        isSample: true,
        explanation: 'nums[0] + nums[1] = 2 + 7 = 9'
      },
      {
        input: '3 2 4\n6',
        output: '1 2',
        isSample: true
      },
      {
        input: '3 3\n6',
        output: '0 1',
        isSample: false
      },
      {
        input: '1 5 3 7 9\n12',
        output: '2 4',
        isSample: false
      }
    ],
    timeLimit: 2000,
    memoryLimit: 256,
    hints: [
      'Use a hash map to store numbers and their indices',
      'For each number, check if (target - number) exists in the hash map'
    ],
    companies: ['Amazon', 'Google', 'Microsoft'],
    isActive: true
  },
  {
    title: 'Palindrome Number',
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.

Example 1:
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.

Example 2:
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

Example 3:
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.`,
    difficulty: 'Easy',
    tags: ['Math'],
    constraints: '-2^31 <= x <= 2^31 - 1',
    inputFormat: 'Single integer x',
    outputFormat: 'true or false',
    testCases: [
      {
        input: '121',
        output: 'true',
        isSample: true
      },
      {
        input: '-121',
        output: 'false',
        isSample: true
      },
      {
        input: '10',
        output: 'false',
        isSample: false
      },
      {
        input: '12321',
        output: 'true',
        isSample: false
      }
    ],
    timeLimit: 2000,
    memoryLimit: 256,
    hints: [
      'Negative numbers are not palindromes',
      'Reverse the number and compare with original'
    ],
    companies: ['Facebook', 'Apple'],
    isActive: true
  },
  {
    title: 'Merge Two Sorted Lists',
    description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

Example 1:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

Example 2:
Input: list1 = [], list2 = []
Output: []

Example 3:
Input: list1 = [], list2 = [0]
Output: [0]`,
    difficulty: 'Medium',
    tags: ['Linked List', 'Recursion'],
    constraints: 'The number of nodes in both lists is in the range [0, 50].\n-100 <= Node.val <= 100\nBoth list1 and list2 are sorted in non-decreasing order.',
    inputFormat: 'First line: space-separated integers for list1\nSecond line: space-separated integers for list2',
    outputFormat: 'Space-separated integers representing merged list',
    testCases: [
      {
        input: '1 2 4\n1 3 4',
        output: '1 1 2 3 4 4',
        isSample: true
      },
      {
        input: '\n',
        output: '',
        isSample: true
      },
      {
        input: '\n0',
        output: '0',
        isSample: false
      },
      {
        input: '1 3 5\n2 4 6',
        output: '1 2 3 4 5 6',
        isSample: false
      }
    ],
    timeLimit: 3000,
    memoryLimit: 256,
    hints: [
      'Use a dummy head node to simplify edge cases',
      'Compare values and add smaller node to result'
    ],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    isActive: true
  },
  {
    title: 'Binary Tree Maximum Path Sum',
    description: `A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any non-empty path.

Example 1:
Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.

Example 2:
Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.`,
    difficulty: 'Hard',
    tags: ['Tree', 'Depth-First Search', 'Dynamic Programming'],
    constraints: 'The number of nodes in the tree is in the range [1, 3 * 10^4].\n-1000 <= Node.val <= 1000',
    inputFormat: 'Level-order traversal of binary tree (null for empty nodes)',
    outputFormat: 'Maximum path sum as integer',
    testCases: [
      {
        input: '1 2 3',
        output: '6',
        isSample: true
      },
      {
        input: '-10 9 20 null null 15 7',
        output: '42',
        isSample: true
      },
      {
        input: '-3',
        output: '-3',
        isSample: false
      },
      {
        input: '5 4 8 11 null 13 4 7 2 null null null 1',
        output: '48',
        isSample: false
      }
    ],
    timeLimit: 5000,
    memoryLimit: 512,
    hints: [
      'For each node, calculate max path sum that includes that node',
      'Use recursion to calculate max gain from left and right subtrees',
      'Update global maximum at each node'
    ],
    companies: ['Google', 'Facebook', 'Amazon'],
    isActive: true
  },
  {
    title: 'Valid Parentheses',
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false`,
    difficulty: 'Easy',
    tags: ['String', 'Stack'],
    constraints: '1 <= s.length <= 10^4\ns consists of parentheses only \'()[]{}\'.',
    inputFormat: 'String containing parentheses',
    outputFormat: 'true or false',
    testCases: [
      {
        input: '()',
        output: 'true',
        isSample: true
      },
      {
        input: '()[]{}',
        output: 'true',
        isSample: true
      },
      {
        input: '(]',
        output: 'false',
        isSample: false
      },
      {
        input: '([)]',
        output: 'false',
        isSample: false
      },
      {
        input: '{[]}',
        output: 'true',
        isSample: false
      }
    ],
    timeLimit: 2000,
    memoryLimit: 256,
    hints: [
      'Use a stack data structure',
      'Push opening brackets, pop when closing bracket matches'
    ],
    companies: ['Amazon', 'Microsoft', 'Bloomberg'],
    isActive: true
  }
];

const seedProblems = async () => {
  try {
    await connectDB();
    
    console.log('Clearing existing problems...');
    await Problem.deleteMany({});
    
    console.log('Inserting sample problems...');
    const problems = await Problem.insertMany(sampleProblems);
    
    console.log(`✅ Successfully created ${problems.length} sample problems:`);
    problems.forEach(p => {
      console.log(`   - ${p.title} (${p.difficulty})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding problems:', error);
    process.exit(1);
  }
};

seedProblems();
