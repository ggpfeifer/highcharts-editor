/******************************************************************************

Copyright (c) 2016-2018, Highsoft

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

******************************************************************************/

// @format

/* global window */

highed.CreateChartPage = function(parent, options, props) {
  var events = highed.events(),
    builtInOptions = [
      {
        id: 1,
        title: 'Title Your Chart',
        create: function(body) {
          highed.dom.ap(body, titleContainer);
        }
      },
      {
        id: 2,
        title: 'Import Data',
        create: function(body) {
          highed.dom.ap(body, dataTableContainer);
        }
      },
      {
        id: 3,
        title: 'Choose Template',
        create: function(body) {
          highed.dom.ap(body, templateContainer);
        }
      },
      {
        id: 4,
        title: 'Customize',
        hideTitle: true,
        create: function(body) {
          highed.dom.ap(body, customizerContainer);
        }
      }
    ],
    container = highed.dom.cr(
      'div',
      'highed-transition highed-toolbox highed-box-size'
    ),
    title = highed.dom.cr('div', 'highed-toolbox-body-title'),
    contents = highed.dom.cr(
      'div',
      'highed-box-size highed-toolbox-inner-body'
    ),
    userContents = highed.dom.cr(
      'div',
      'highed-box-size highed-toolbox-user-contents test-test'
    ),
    body = highed.dom.cr(
      'div',
      'highed-toolbox-body highed-box-size highed-transition'
    ),
    listContainer = highed.dom.cr('div', 'highed-toolbox-createchart-list'),
    isVisible = false,
    customizerContainer = highed.dom.cr('div', 'highed-toolbox-customise'),
    titleContainer = highed.dom.cr('div', 'highed-toolbox-title'),
    templateContainer = highed.dom.cr('div', 'highed-toolbox-template'),
    dataTableContainer = highed.dom.cr('div', 'highed-toolbox-data'),
    toolbox = highed.Toolbox(userContents),
    options = [];

    function init(dataPage,templatePage, customizePage) {

      toolbox = highed.Toolbox(userContents);
      builtInOptions.forEach(function(option, index) {
        var o = toolbox.addEntry({
          title: option.title,
          number: option.id,
          hideTitle: option.hideTitle
        });

        if (highed.isFn(option.create)) {
          option.create(o.body);
        }

        options.push(o);

      });
      options[0].expand();

      createTitleSection();
      createImportDataSection(dataPage);
      createTemplateSection(templatePage);
      createCustomizeSection();

      highed.dom.ap(contents, userContents);
      highed.dom.ap(body, contents);
  
      //highed.dom.ap(userContents, listContainer);
      
      highed.dom.ap(parent, highed.dom.ap(container, body));

      expand();
    }


    function createTitleSection() {

      var titleInput = highed.dom.cr('input', 'highed-imp-input'),
          subtitleInput = highed.dom.cr('input', 'highed-imp-input'),
          nextButton = highed.dom.cr(
            'button',
            'highed-ok-button highed-import-button negative',
            'Next'
          );

      titleInput.value = 'My Chart';
      subtitleInput.value = 'My Untitled Chart';
      
      highed.dom.on(nextButton, 'click', function() {
        options[1].expand();
      });

      highed.dom.ap(titleContainer,  
        highed.dom.cr(
          'table'
        ),
        highed.dom.ap(
          highed.dom.cr('tr', 'highed-toolbox-input-container'),
          highed.dom.cr(
            'td',
            'highed-toolbox-label',
            'Chart Title'
          ), 
          highed.dom.ap(highed.dom.cr('td'), titleInput)
        ),
        highed.dom.ap(
          highed.dom.cr('tr', 'highed-toolbox-input-container'),
          highed.dom.cr(
            'td',
            'highed-toolbox-label',
            'Subtitle'
          ), 
          highed.dom.ap(highed.dom.cr('td'), subtitleInput)
        ),
        highed.dom.ap(
          highed.dom.cr('tr'),
          highed.dom.cr('td'),
          highed.dom.ap(
            highed.dom.cr('td','highed-toolbox-button-container'),
            nextButton
          )
        )
      );   
    }

    function createImportDataSection(dataPage) {

      var nextButton = highed.dom.cr(
            'button',
            'highed-ok-button highed-import-button negative',
            'No thanks, I will enter my data manually'
          ),
          dataTableDropzoneContainer = dataPage.createSimpleDataTable();
      
      highed.dom.on(nextButton, 'click', function() {
        options[2].expand();
      });
      highed.dom.ap(dataTableContainer, 
        highed.dom.ap(dataTableDropzoneContainer,
          highed.dom.ap(
            highed.dom.cr('div','highed-toolbox-button-container'),
            nextButton
          )
        )
      );
    }

    function createTemplateSection(templatePage) {

      var nextButton = highed.dom.cr(
            'button',
            'highed-ok-button highed-import-button negative',
            'Choose A Template Later'
      ),
      templatesContainer = templatePage.createMostPopularTemplates();
      
      highed.dom.on(nextButton, 'click', function() {
        options[3].expand();
      });

      highed.dom.ap(templateContainer, 
        highed.dom.cr('div', 'highed-toolbox-template-text', 'Pick a basic starter template. You can change it later.'),
        highed.dom.cr('div', 'highed-toolbox-template-text', "If you're not sure, just hit Choose A Template Later."),
        templatesContainer,
        highed.dom.ap(
          highed.dom.cr('div','highed-toolbox-button-container'),
          nextButton
        )
      );
    }

    function createCustomizeSection() {

      var nextButton = highed.dom.cr(
            'button',
            'highed-ok-button highed-import-button negative',
            'Customize Your Chart'
          );//,
         // dataTableDropzoneContainer = dataPage.createSimpleDataTable();

      highed.dom.on(nextButton, 'click', function() {

        events.emit("SimpleCreateChartDone");
        
      });

      highed.dom.ap(customizerContainer, 
        highed.dom.cr('div', 'highed-toolbox-customize-header', "You're Done!"),
        highed.dom.ap(
          highed.dom.cr('div','highed-toolbox-button-container'),
          nextButton
        )
      );
    }

    function resize() {
      if (isVisible) {
        expand();
      }
    }

    highed.dom.on(window, 'resize', resize);
    
    function expand() {
      //var bsize = highed.dom.size(bar);

      var newWidth = props.widths.desktop;
      if (highed.onTablet() && props.widths.tablet) newWidth = props.widths.tablet;
      else if (highed.onPhone() && props.widths.phone) newWidth = props.widths.phone;

      highed.dom.style(body, {
        width: 100 + '%',
        //height: //(bsize.h - 55) + 'px',
        opacity: 1
      });

      highed.dom.style(container, {
        width: newWidth + '%'
      });

      events.emit('BeforeResize', newWidth);

     function resizeBody() {

      var bsize = highed.dom.size(body),
      tsize = highed.dom.size(title),
      size = {
        w: bsize.w,
        h: (window.innerHeight
          || document.documentElement.clientHeight
          || document.body.clientHeight) - highed.dom.pos(body, true).y
      };
        
      highed.dom.style(contents, {
        width: size.w + 'px',
        height: ((size.h - 16)) + 'px'
      });
      
     }

    setTimeout(resizeBody, 300);
      highed.emit('UIAction', 'ToolboxNavigation', props.title);
    }

  function show() {
    highed.dom.style(container, {
      display: 'block'
    });
    isVisible = true;
    //expand();
    
  }
  function hide() {
    highed.dom.style(container, {
      display: 'none'
    });
    isVisible = false;
  }

  function destroy() {}

  function getIcons() {
    return null;
  }

  //////////////////////////////////////////////////////////////////////////////

  return {
    on: events.on,
    destroy: destroy,
    hide: hide,
    show: show,
    isVisible: function() {
      return isVisible;
    },
    init: init,
    getIcons: getIcons
  };
};