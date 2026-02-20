# 📝 HOW TO ADD PROBLEMS AS ADMIN

## ✅ TWO WAYS TO ADD PROBLEMS

### 🎨 Method 1: Using the Admin UI (Recommended)
**Easy, user-friendly interface**

### 💻 Method 2: Using API/Postman
**For bulk uploads or automation**

---

## 🎨 METHOD 1: ADD PROBLEMS VIA UI

### Step 1: Login as Admin
```
1. Go to http://localhost:3000/login
2. Email: admin@codeplatform.com
3. Password: Admin@123
4. Click "Login"
```

### Step 2: Access Admin Dashboard
```
1. Click "Admin" in the navbar (top right)
2. You'll see the Admin Dashboard
3. Click the green "Add New Problem" button
```

### Step 3: Fill in Problem Details

#### Basic Information
```
✅ Problem Title (Required)
   Example: "Two Sum"

✅ Difficulty (Required)
   Options: Easy, Medium, Hard

✅ Time Limit (Required)
   Default: 2000ms (2 seconds)
   Range: 1000ms - 10000ms

✅ Memory Limit (Required)
   Default: 256MB
   Range: 128MB - 512MB

✅ Tags (Optional)
   Example: "Array, Hash Table, Two Pointers"
   (Comma-separated)

✅ Description (Required)
   Full problem statement with examples
   
✅ Constraints (Required)
   Example: "1 <= nums.length <= 10^4"

✅ Input Format (Required)
   How the input will be provided

✅ Output Format (Required)
   What output is expected
```

#### Test Cases (At least 1 required)
```
For each test case:

✅ Input (Required)
   The test input data

✅ Expected Output (Required)
   What the correct output should be

✅ Sample Test Case? (Required)
   - Yes: Visible to users
   - No: Hidden test case

✅ Explanation (Optional)
   Why this is the expected output

Click "Add Test Case" to add more
```

#### Hints (Optional)
```
Add helpful hints for users

Example:
- "Use a hash map to store numbers"
- "Think about time complexity"

Click "Add Hint" to add more
```

#### Companies (Optional)
```
Companies that asked this question

Example:
- Google
- Amazon
- Microsoft

Click "Add Company" to add more
```

#### Starter Code (Optional)
```
Provide template code for each language:

✅ C++
✅ Java  
✅ Python
✅ JavaScript

Users will see this code when they open the problem
```

### Step 4: Submit
```
1. Review all fields
2. Click "Create Problem" button
3. ✅ Success! Problem created
4. Redirects to admin dashboard
```

---

## 📋 EXAMPLE: Creating "Two Sum" Problem

### Basic Information
```
Title: Two Sum
Difficulty: Easy
Time Limit: 2000ms
Memory Limit: 256MB
Tags: Array, Hash Table

Description:
Given an array of integers nums and an integer target, return 
indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, 
and you may not use the same element twice.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Constraints:
2 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9
Only one valid answer exists.

Input Format:
First line: space-separated integers (array)
Second line: target integer

Output Format:
Two space-separated integers representing indices
```

### Test Cases
```
Test Case 1 (Sample):
Input: 
2 7 11 15
9

Output:
0 1

Sample: Yes
Explanation: nums[0] + nums[1] = 2 + 7 = 9

Test Case 2 (Sample):
Input:
3 2 4
6

Output:
1 2

Sample: Yes

Test Case 3 (Hidden):
Input:
3 3
6

Output:
0 1

Sample: No
```

### Hints
```
Hint 1: Use a hash map to store numbers and their indices
Hint 2: For each number, check if (target - number) exists in hash map
```

### Companies
```
- Amazon
- Google
- Microsoft
```

### Starter Code

**Python:**
```python
def two_sum(nums, target):
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
target = int(input())

# Get result
result = two_sum(nums, target)
print(result[0], result[1])
```

**C++:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Your code here
    return 0;
}
```

---

## 💻 METHOD 2: ADD PROBLEMS VIA API

### Using Postman/cURL

#### Step 1: Get Admin Token
```bash
POST http://localhost:5000/api/auth/login

Body (JSON):
{
  "email": "admin@codeplatform.com",
  "password": "Admin@123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {...}
}

Copy the token!
```

#### Step 2: Create Problem
```bash
POST http://localhost:5000/api/problems

Headers:
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

Body (JSON):
{
  "title": "Two Sum",
  "description": "Given an array of integers...",
  "difficulty": "Easy",
  "tags": ["Array", "Hash Table"],
  "constraints": "2 <= nums.length <= 10^4",
  "inputFormat": "First line: space-separated integers...",
  "outputFormat": "Two space-separated integers...",
  "timeLimit": 2000,
  "memoryLimit": 256,
  "testCases": [
    {
      "input": "2 7 11 15\n9",
      "output": "0 1",
      "isSample": true,
      "explanation": "nums[0] + nums[1] = 9"
    },
    {
      "input": "3 2 4\n6",
      "output": "1 2",
      "isSample": true
    },
    {
      "input": "3 3\n6",
      "output": "0 1",
      "isSample": false
    }
  ],
  "hints": [
    "Use a hash map",
    "Check if target-num exists"
  ],
  "companies": ["Amazon", "Google"],
  "starterCode": {
    "python": "def solution():\n    pass",
    "cpp": "#include <iostream>\nusing namespace std;",
    "java": "class Solution {\n    // code here\n}",
    "javascript": "function solution() {\n    // code here\n}"
  }
}

Response:
{
  "success": true,
  "message": "Problem created successfully",
  "data": {
    "_id": "...",
    "title": "Two Sum",
    ...
  }
}
```

---

## 🔧 REQUIRED FIELDS

### Absolutely Required:
```
✅ title
✅ description
✅ difficulty (Easy/Medium/Hard)
✅ constraints
✅ inputFormat
✅ outputFormat
✅ At least 1 test case with input and output
```

### Optional but Recommended:
```
⭐ tags (helps users find problems)
⭐ hints (helps users solve)
⭐ companies (shows relevance)
⭐ starterCode (better UX)
⭐ Multiple test cases (better testing)
⭐ Sample test cases (users can see examples)
```

---

## ✅ VALIDATION RULES

### Title
- Must be unique
- Max 200 characters
- Will auto-generate a slug

### Difficulty
- Must be: Easy, Medium, or Hard
- Points auto-assigned (Easy: 10, Medium: 20, Hard: 30)

### Time Limit
- Minimum: 1000ms (1 second)
- Maximum: 10000ms (10 seconds)
- Default: 2000ms

### Memory Limit
- Minimum: 128MB
- Maximum: 512MB
- Default: 256MB

### Test Cases
- Minimum: 1 test case
- Each must have input and output
- At least 1 should be marked as sample
- Recommended: 3-5 test cases minimum

### Tags
- Comma-separated strings
- Will be trimmed and filtered

---

## 📊 AFTER ADDING A PROBLEM

### What Happens:
```
1. ✅ Problem is created in database
2. ✅ Slug is auto-generated from title
3. ✅ Points are auto-assigned based on difficulty
4. ✅ Problem appears in /problems page
5. ✅ Users can start solving it
6. ✅ Submissions are tracked
7. ✅ Statistics are updated
```

### Where to Find It:
```
- Problems List: http://localhost:3000/problems
- Direct Link: http://localhost:3000/problems/:id
- Admin can edit via API (PUT /api/problems/:id)
- Admin can delete via API (DELETE /api/problems/:id)
```

---

## 🎯 BEST PRACTICES

### 1. Write Clear Descriptions
```
✅ Good:
"Given an array of integers nums and an integer target, 
return indices of the two numbers that add up to target."

❌ Bad:
"Find two numbers that sum to target"
```

### 2. Provide Good Examples
```
✅ Include:
- Input example
- Output example
- Explanation of why

✅ Use multiple examples
✅ Show edge cases
```

### 3. Set Appropriate Limits
```
Easy Problems:
- Time: 1000-2000ms
- Memory: 128-256MB

Medium Problems:
- Time: 2000-3000ms
- Memory: 256MB

Hard Problems:
- Time: 3000-5000ms
- Memory: 256-512MB
```

### 4. Create Good Test Cases
```
✅ Include:
- 2 sample test cases (visible)
- 3-5 hidden test cases
- Edge cases (empty input, single element, etc.)
- Large input cases
- Boundary values
```

### 5. Add Helpful Hints
```
✅ Progressive hints:
Hint 1: High-level approach
Hint 2: Specific data structure
Hint 3: Algorithm hint

❌ Don't give away the solution!
```

---

## 🐛 TROUBLESHOOTING

### Issue: "Title already exists"
**Solution:** Problem titles must be unique. Change the title slightly.

### Issue: "No test cases provided"
**Solution:** Add at least one complete test case with input and output.

### Issue: "Invalid difficulty"
**Solution:** Use exactly: Easy, Medium, or Hard (case-sensitive).

### Issue: "Problem created but not showing"
**Solution:** 
- Refresh the problems page
- Check if isActive is true
- Verify you're looking at the right difficulty filter

### Issue: "Can't access Add Problem page"
**Solution:**
- Make sure you're logged in as admin
- Check if admin role is set correctly
- Verify token is valid

---

## 📝 QUICK CHECKLIST

Before clicking "Create Problem":

- [ ] Title is unique and descriptive
- [ ] Difficulty is selected
- [ ] Description is complete with examples
- [ ] Constraints are clearly defined
- [ ] Input/Output format is explained
- [ ] At least 2 sample test cases added
- [ ] At least 2-3 hidden test cases added
- [ ] All test cases have input AND output
- [ ] Time/Memory limits are reasonable
- [ ] (Optional) Hints added
- [ ] (Optional) Companies added
- [ ] (Optional) Starter code added

---

## 🎉 YOU'RE READY!

Now you can:
1. ✅ Login as admin
2. ✅ Click "Add New Problem"
3. ✅ Fill in the form
4. ✅ Create amazing coding problems!

**Happy problem creating!** 🚀
