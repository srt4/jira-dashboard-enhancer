# jira-dashboard-enhancer

This extensions replaces the JIRA "Quick Filters" on dashboard views with an in-memory filtering engine. The JIRA "Quick Filter" makes AJAX calls to JIRA when selecting a user, which can take a significant amount of time if the JIRA instance is facing a lot of traffic. There are also some minor UX enhancements which makes JIRA dashboards better-suited for stand up meetings. 

## Prerequisites

Update the `manifest.json` file, line 11. Replace `{{ADD YOUR JIRA HOSTNAME HERE}}` with the hostname of your JIRA installation, e.g. `jira.acme.net` 

## Installation 

To install this extension, first clone this repository. Then, from your browser, open the following URL: [chrome://extensions](chrome://extensions). Click "Developer Mode", then "Load Unpacked Extension...", and select the root folder of this repository.

The extension should now be installed. 
