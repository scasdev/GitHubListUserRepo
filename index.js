'use strict';

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.length ; i++){
    $('#results-list').append(
      `<li><h3>${responseJson[i].name}</h3>
      <p><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p>
      </li>`
    )};
  //display the results section  
  $('.results').removeClass('hidden');
};

let watchForm = () => {
  //listen for submit 
   $('#js-github-list-user-repo-form').submit(event => {
    event.preventDefault();
    //Accept value and submit
    let usernameSubmitted = $('.username-entry').val();
    //fetch the API and apply the value entered to the API
    fetch(`https://api.github.com/users/${usernameSubmitted}/repos`)
    .then(response => response.json())
    .then(responseJson => { 
      if (responseJson.message == 'Not Found') {
      throw console.log(responseJson.message);  
      } else {
      displayResults(responseJson) 
      }
    })  
    .catch(error => alert(`User not found, try again.`)) 
  });
  
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});