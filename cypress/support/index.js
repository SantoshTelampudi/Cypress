// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
// Alternatively you can use CommonJS syntax:
// require('./commands')
const xpath = (subject, selector, options = {}) => {
  /* global XPathResult */
  const isNumber = (xpathResult) => xpathResult.resultType === XPathResult.NUMBER_TYPE
  const numberResult = (xpathResult) => xpathResult.numberValue

  const isString = (xpathResult) => xpathResult.resultType === XPathResult.STRING_TYPE
  const stringResult = (xpathResult) => xpathResult.stringValue

  const isBoolean = (xpathResult) => xpathResult.resultType === XPathResult.BOOLEAN_TYPE
  const booleanResult = (xpathResult) => xpathResult.booleanValue

  const isPrimitive = (x) =>
    Cypress._.isNumber(x) || Cypress._.isString(x) || Cypress._.isBoolean(x)

  // options to log later
  const log = {
    name: 'xpath',
    message: selector,
  }

  if (Cypress.dom.isElement(subject) && subject.length > 1) {
    throw new Error('xpath() can only be called on a single element. Your subject contained ' + subject.length + ' elements.')
  }

  const getValue = () => {
    let nodes = []
    let contextNode
    let withinSubject = cy.state('withinSubject')

    if (Cypress.dom.isElement(subject)) {
      contextNode = subject[0]
    } else if (Cypress.dom.isDocument(subject)) {
      contextNode = subject
    } else if (withinSubject) {
      contextNode = withinSubject[0]
    } else {
      contextNode = cy.state('window').document
    }

    let iterator = (contextNode.ownerDocument || contextNode).evaluate(selector, contextNode)

    if (isNumber(iterator)) {
      const result = numberResult(iterator)
      log.consoleProps = () => {
        return {
          'XPath': selector,
          type: 'number',
          result
        }
      }
      return result
    }

    if (isString(iterator)) {
      const result = stringResult(iterator)
      log.consoleProps = () => {
        return {
          'XPath': selector,
          type: 'string',
          result
        }
      }
      return result
    }

    if (isBoolean(iterator)) {
      const result = booleanResult(iterator)
      log.consoleProps = () => {
        return {
          'XPath': selector,
          type: 'boolean',
          result
        }
      }
      return result
    }

    try {
      let node = iterator.iterateNext()

      while (node) {
        nodes.push(node)
        node = iterator.iterateNext()
      }

      log.consoleProps = () => {
        return {
          'XPath': selector,
          'result': nodes.length === 1 ? nodes[0] : nodes
        }
      }

      return nodes
    } catch (e) {
      console.error('Document tree modified during iteration', e)

      return null
    }
  }

  const resolveValue = () => {
    return Cypress.Promise.try(getValue).then(value => {
      if (!isPrimitive(value)) {
        value = Cypress.$(value)
        // Add the ".selector" property because Cypress uses it for error messages
        value.selector = selector
      }
      return cy.verifyUpcomingAssertions(value, options, {
        onRetry: resolveValue,
      })
    })
  }

  return resolveValue().then((value) => {
    if (options.log !== false) {
      // TODO set found elements on the command log?
      Cypress.log(log)
    }
    return value
  })


}

Cypress.Commands.add('xpath', { prevSubject: ['optional', 'element', 'document'] }, xpath)