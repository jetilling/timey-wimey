let on = (eventType, elementId, cb) => {
  document.addEventListener(eventType, function (event) {
    let el = event.target
    let found;
    let identifier = elementId.slice(0, 1);

    if (identifier === '#') {
      while (el && !(found = el.id === elementId.slice(1))) {
          el = el.parentElement;
      }

      if (found) {
          cb(event);
      }
    }
    else if (identifier === '.') {
      while (el && !(found = el.className === elementId.slice(1))) {
        el = el.parentElement;
    }

    if (found) {
        cb(event);
    }
    }
  });
}

let grabAttr = (attribute) => {
  return event.target.attributes[attribute].nodeValue
}

let setAttr = (element, attributeName, attributeValue) => {
  element.setAttribute(attributeName, attributeValue)
}

let grabById = (id) => {
  return document.getElementById(id)
}

let grabByClass = (className) => {
  return document.getElementsByClassName(className)
}

module.exports = {
  on: on,
  grabAttr: grabAttr,
  setAttr: setAttr,
  grabById: grabById,
  grabByClass: grabByClass
}