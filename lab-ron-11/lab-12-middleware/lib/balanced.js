'use strict'

function balanced(str) {
  let stack = []
  for(var i = 0; i < str.length; i++) {
    if (str.charAt(i) == '(') stack.push('(')
    if (str.charAt(i) == ')') {
      if (!stack.pop()) return false
    }
  }
  return stack.length == 0
}
module.exports = balanced
 
