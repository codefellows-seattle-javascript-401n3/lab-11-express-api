'use strict'

let balanced = require('../lib/balanced.js')

let {expect} = require('chai')

describe('a paren balancer', function() {
  it('can balance (2 + 4)', function() {
    let equation = '(2 + 4)'
    expect(balanced(equation)).to.equal(true)
  })
  it('can balance 2 + 4', function() {
    let equation = '2 + 4'
    expect(balanced(equation)).to.equal(true)
  })
  it('can detect 2 pairs ((2 + 4) * 7)', function() {
    let equation = '((2 + 4) * 7)'
    expect(balanced(equation)).to.equal(true)
  })
  it('can detect if we are missing a closing )', function() {
    let equation = '(2 + 4'
    expect(balanced(equation)).to.equal(false)
  })
  it('can detect if we are missing an opening (', function() {
    let equation = '2 + 4)'
    expect(balanced(equation)).to.equal(false)
  })
})
