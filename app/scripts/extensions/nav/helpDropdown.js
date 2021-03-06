'use strict';

angular.module('openshiftConsole')
  // prepopulating extension points with some of our own data
  // (ensures a single interface for extending the UI)
  .run(function(extensionRegistry) {
    extensionRegistry
      .add('nav-help-dropdown', function() {
        var options = [];
        options.push(
          {
            type: 'dom',
            node: '<li><a target="_blank" href="{{\'default\' | helpLink}}">Documentation</a></li>'
          }
        );

        if (_.get(window, 'OPENSHIFT_CONSTANTS.ENABLE_TECH_PREVIEW_FEATURE.service_catalog_landing_page')) {
          var tourConfig = _.get(window, 'OPENSHIFT_CONSTANTS.GUIDED_TOURS.landing_page_tour');
          if (tourConfig && tourConfig.enabled && tourConfig.steps) {
            options.push(
              {
                type: 'dom',
                node: '<li><a href="./?startTour=true">Tour Home Page</a></li>'
              }
            );
          }
        }

        options.push(
          {
            type: 'dom',
            node: '<li><a href="command-line">Command Line Tools</a></li>'
          }
        );
        options.push(
          {
            type: 'dom',
            node: '<li><a href="about">About</a></li>'
          }
        );
        return options;
      })
  });
