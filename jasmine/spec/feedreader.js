/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('Each feed has URL defined and not empty', function () {
            allFeeds.forEach(function(f) {
                expect(f.url).toBeDefined();
                expect(f.url).not.toBe(null);
            });
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Each feed has name defined and not empty', function () {
            allFeeds.forEach(function(f) {
                expect(f.name).toBeDefined();
                expect(f.name).not.toBe(null);
            });
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu Checking DOM only', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        /*
         * Hiding menu element is done with the CSS descedant selectors
         * which applies ".menu-hidden .menu" style to menu div element.
         * This test is to check if menu div has parent/ancestor element
         * with class menu-hidden. If so, the applied style hides the menu.
         */
        it('Menu is hidden by default', function () {
            expect($('.menu.hidden').closest('.menu-hidden')).toBeInDOM();
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('Menu change visibility when clicked', function () {
            /*
             * Jasmine-jquery libary offers excellent functions and helps to
             * write the testing function in a very straight forward way.
             */
            spyEvent = spyOnEvent('.menu-icon-link', 'click');
            $('.menu-icon-link').click();
            expect(spyEvent).toHaveBeenTriggered();
            expect($('.menu.hidden').closest('.menu-hidden')).not.toBeInDOM();
            $('.menu-icon-link').trigger("click");
            expect(spyEvent).toHaveBeenTriggered();
            expect($('.menu.hidden').closest('.menu-hidden')).toBeInDOM();
         });

    });

    /*
     * This test suite is to verify that menu div is hidden/unhidden by different transform style
     * It makes use of Jasmine-JQuery library to read and verify the calculated CSS value.
     */
    describe('The menu Checking Calculated style', function() {
        /* Loading the style sheet and HTML file to build the fixture */
        beforeEach(function() {
            jasmine.getStyleFixtures().fixturesPath = '.';
            loadStyleFixtures('css/style.css');
            jasmine.getFixtures().fixturesPath = '.';
            fixture = setFixtures($('index.html'));
        });

        it('Menu is hidden by default checking style', function () {
            /*
             * transform: translate3d(-12em, 0, 0) is converted to matrix() which applies the menu hiding.
             * At least, that is our belief. Hanging there, you should see different matrix() when
             * menu is not hidden.
             */
            expect($('.menu.hidden').css('transform')).toEqual("matrix(1, 0, 0, 1, -192, 0)");
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('Menu change visibility when clicked', function (done) {
            spyEvent = spyOnEvent('.menu-icon-link', 'click');
            $('.menu-icon-link').click();
            expect(spyEvent).toHaveBeenTriggered();

            setTimeout(function () {
                /*
                 * menu gets different transform matrix to unhide.
                 * Since Click is asynchronous event, we have to wait for it finisheing to verify the new style value.
                 */
                expect($('.menu.hidden').css('transform')).toEqual("matrix(1, 0, 0, 1, 0, 0)");
                setTimeout(function () {
                    $('.menu-icon-link').click(); // Click again to hide the menu
                    done();
                }, 1000);
            }, 1000);

            expect(spyEvent).toHaveBeenTriggered();
            expect($('.menu.hidden').css('transform')).toEqual("matrix(1, 0, 0, 1, -192, 0)");
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         /*
          * Wrap the testing of each id in a function, we can test that loadFeed()
          * populates .feed container for every single feed.
          */
        function testId(id) {
            describe("", function() {
                beforeEach(function(done) {
                    loadFeed(id);
                    setTimeout(function(){
                        done();
                    }, 1000);
                });

                it('there is at least a single .entry element within the .feed container after ' + allFeeds[id].name + ' loaded.', function () {
                    expect($('.feed').find('.entry')).not.toBeNull();
                });
            });
        }

        for(var i = 0 ; i < allFeeds.length; i++) {
            testId(i);
        }

    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var content = [];
        var contentChange = true;
        function loadId(id) {
            describe("", function() {
                beforeEach(function(done) {
                    loadFeed(id);
                    setTimeout(function(){
                        done();
                    }, 1000);
                });

                it('The content of ' + allFeeds[id].name + '  changes compared with all feeds loaded before', function () {
                    var currentFeedContent = $('.feed').html();
                    var len = content.length;
                    for(var j = 0; j < len; j++) {
                            contentChange = contentChange && (content[j] != currentFeedContent);
                    };
                    content.push($('.feed').html());
                    expect(contentChange).toBe(true);
                });
            });
        }

        for(var i = 0 ; i < allFeeds.length; i++) {
            loadId(i);
        }
    })

}());
