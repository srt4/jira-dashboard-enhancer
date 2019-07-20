var $ = jQuery; 

var showOnlyUser = function(name) {
    console.log('showOnlyUser=' + name);
    $('.ghx-avatar-img').show(); 
    $('.ghx-swimlane').show(); 

    $('.ghx-avatar-img').each(function(k, card) {
        var cardName = $(card).attr('data-tooltip').split('Assignee: ')[1].trim().split(' ')[0]; 
        // first, hide the visible stories for the user
        if (!cardName.includes(name)) {
            $(card).closest('.ghx-issue').hide(); 
        } 
        else {
            $(card).closest('.ghx-issue').show(); 
        }
    });

    // then, hide the swimlanes without stories to show 
    $('.ghx-swimlane').each(function(k, swimlane) {
        if ($(swimlane).find('.ghx-issue:visible').length > 0) {
            $(swimlane).show(); 
        }   
        // no subtasks, hide          
        else {
            $(swimlane).hide(); 
        }
    }); 
};

var getNames = function() {
    var names = []; 
    $('.ghx-avatar-img').each(function(k, card) {
        var name = $(card).attr('data-tooltip').split('Assignee: ')[1].trim().split(' ')[0]; 
        if (name != 'Unassigned') names.push(name); 
    }); 
    names.sort(function(a, b) { return a > b ? 1 : -1 }); 
    return Array.from(new Set(names)); 
};

var showOnlyActiveUser = function () { 
    var user = $('.jde-active').text(); 
    if (user) {
        showOnlyUser(user); 
    }
}; 

var initialize = function() {
    var populator = window.setInterval(function() {
        // remove existing quick filters 
        $('#js-work-quickfilters dd').remove(); 
    
        var isLastInterval = false; 
        // populate quick filters 
        getNames().forEach(function (name) {
            isLastInterval = true; 
    
            // create the elements and append them 
            var $nameElement = $('<dd/>').append($('<a/>').text(name)); 
            $nameElement.click(function() {
                var activeUser = $('.jde-active').text();
                $('#js-work-quickfilters dd').css('font-weight', 'normal').removeClass('jde-active'); 
                console.error("active=" + activeUser + ", name=" + name);
                if (activeUser == name) {
                    showOnlyUser(''); 
                } 
                else {
                    $(this).css('font-weight', 'bold').addClass('jde-active'); 
                    showOnlyUser(name); 
                }
            }); 
            $('#js-work-quickfilters').append($nameElement); 
        });

        if (isLastInterval) {
            // clear the interval to stop this function from being called again 
            window.clearInterval(populator); 

            // add prev/next buttons 
            var $nextButton = $('<button/>').text('»'); 
            $nextButton.click(function() {
                if ($('.jde-active').next('dd').length == 0) {
                    $('#js-work-quickfilters dd').first().click();
                }
                else {
                    $('.jde-active').next().click();
                }
            });
            $('#js-work-quickfilters').append($nextButton);
        }
    }, 100); 

    window.setInterval(showOnlyActiveUser, 250); 
};

var queryParams = new URLSearchParams(window.location.search); 
// if there are existing query parameters, outside of just the rapid view one,
// need to redirect to just the rapid view 
if (Array.from(queryParams).length > 1) {
    var overriddenQueryParams = new URLSearchParams(); 
    overriddenQueryParams.set('rapidView', queryParams.get('rapidView')); 
    window.location = window.location.origin + window.location.pathname + '?' + 
        overriddenQueryParams.toString();
}   
else {
    initialize(); 
}