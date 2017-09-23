
var renderCard = function(title, description) {
  return "<div class='row'><div class='col s12 m6'><div class='card blue-grey darken-1'><div class='card-content white-text'><span class='card-title' id='card-title'>" + title + "</span><p id='card-description'>" + description + "</p></div><div class='card-action'><a href='#'>Clock In</a><a href='#'>Clock Out</a></div></div></div></div>"
}

module.exports = {
  renderCard: renderCard
}