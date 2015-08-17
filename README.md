Project Overview

The purpose of this project to develop comprehensive test suites to fully test the provided web-based RSS
feed application. Fully developed test suites should be integral part of the behavoir-driven development process
which not only provides an accurate and complete testing coverage of the application, also helps to sustain the
further expansion of the project.

This project makes use of the Jasmine testing framework (http://jasmine.github.io/) and an excellent add on package
Jasmine-jquery(https://github.com/velesin/jasmine-jquery).

The test suties covers:

1. RSS feeds are initiated properly with URL;
2. RSS feeds are initiated properly with name;
3. Menu is hidden default;
4. Menu changes visibility while clicking: unhidden while menu icon clicked, hidden while menu icon clicked again.
   There are two test suites on this, one of them looks at the DOM and corrolates that with CSS rules; 
   second one looks at the calculated CSS style value to verify menu visibility change.
5. RSS feed contents change which means every time a new feed is loaded, RSS feed content changes accordingly.
   The test suite caches the contet for each feed and walk through all the feed loading to test that content does change.

The project is hosted at: http://chunshengit.github.io/frontend-nanodegree-feedreader.
Just click on the index.html, Jasime framework runs through all the test cases and displays the testing results on the webpage.
