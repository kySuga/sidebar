  // grabs previously focused element
  var lastFocusedElement;
  //  grabs dialog
  var dialogWrap = document.getElementById("dialog-wrap");
  //  grabs shell of dialog
  var dialogShell = document.getElementById("dialog-shell");
  //  grabs overlay
  var overlay = document.getElementById("dialog-overlay");
  //  grabs size chart button
  var btnOpenDialog = document.getElementById("btn-size-chart");
  //  grabs close button in dialog
  var btnCloseDialog = document.getElementById("btn-close-dialog");
  //  state of dialog
  var dialogOpen = false;

  //  all focusable elements within dialog
  var dialogElementsFocusable = "button, [tabindex]";
  //  grab first focusable element in dialog
  var dialogFirstFocusableElement = dialogWrap.querySelectorAll(dialogElementsFocusable)[0];
  //  grab all focusable elements within dialog
  var dialogFocusableContents = dialogWrap.querySelectorAll(dialogElementsFocusable);
  //  grabs last focusable element in dialog
  var dialogLastFocusableElement = dialogFocusableContents[dialogFocusableContents.length - 1];


(function() {
  
  'use strict';
  
  //  track focus for focus management - testing purposes only, not needed for dialog build
  window.addEventListener("keydown", function(event) {
    if (event.key == "Tab") {
      var trackFocus = document.activeElement;
      console.log(trackFocus);
    }
  });

  //  trap focus in dialog
  document.addEventListener('keydown', function(e) {
    var tabPress = e.key === 'Tab';
    
    if (!tabPress) {
      return;
    }
    
    //  if shift key + tab
    if (e.shiftKey) {
      if (document.activeElement === dialogFirstFocusableElement) {
        //  add focus to last focusable element in dialog
        dialogLastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === dialogLastFocusableElement) {
        //  add focus to first focusable element in dialog
        dialogFirstFocusableElement.focus();
        e.preventDefault();
      }
    }
  });

  //  open size chart 
  function openSizeChart() {
    //   grab last focused element, should be btn that opens modal
    lastFocusedElement = document.activeElement;
    //   change state of aria-hidden from true to false on #dialog-wrap
    dialogWrap.setAttribute('aria-hidden', 'false');
    dialogWrap.style.display = "block";
    //   set focus inside dialog
    //   ---> run method focus() on #dialog-wrap
    dialogShell.focus();
    //   "open" #dialog-shell
    //   ---> change value for right from -25rem to 0 on #dialog-shell
    dialogShell.style.right = 0;
    //   add styles of .show-overlay to #dialog-overlay
    //   ---> add .show-overlay to #dialog-overlay element
    overlay.classList.add("show-overlay");
    //   change state of dialog from false to true
    dialogOpen = true;  
  }

  //  close size chart     
  function closeSizeChart( event ) {
    if (dialogOpen && ( !event.key || event.key === "Escape" )) {  
      //   take focus back to last focused element before entering dialog, should be #btn-size-chart
      lastFocusedElement.focus();
      //   change state of aria-hidden on #dialog-wrap to true
      dialogWrap.setAttribute('aria-hidden', 'true');
      //   remove dialog elements from DOM and accessibility tree
      dialogWrap.style.display = "none";
      //   close #dialog-shell
      //   ---> change value for right from 0 to -25rem on #dialog-shell
      dialogShell.style.right = "-25rem";
      //   remove styles of .show-overlay from #dialog-overlay 
      //   ---> remove show-overlay class from #dialog-overlay element
      overlay.classList.remove("show-overlay");
      //   change state of dialog back to false
      dialogOpen = false;
    }
  }

  // close dialog by clicking on overlay
  overlay.addEventListener('click', function(e) {
      closeSizeChart(e);
  });

  // open dialog from btn click
  btnOpenDialog.addEventListener('click', openSizeChart);

  // close dialog from btn click
  btnCloseDialog.addEventListener('click', closeSizeChart);

  // close dialog by using escape key
  document.addEventListener('keydown', closeSizeChart);

})();


// NOTES
// ========================================
/*
   Resource for keys and keyCodes: https://www.toptal.com/developers/keycode

   !important keys and keyCodes:
     eventKeys {
       "esc": "Escape",
       "spaceBar": " ", 
       "tab": "Tab",
       "tabReturn": "Tab + Shift", *may not be real value
       return: "Enter", 
       shift: "Shift", 
       arrowUp: "ArrowUp", 
       arrowRight: "ArrowRight", 
       arrowDown: "ArrowDown", 
       arrowLeft: "ArrowLeft",
     }

     keyCodes {
       "esc": 27,
       "spaceBar": 32, 
       "tab": 9,
       "tabReturn": "9 + 16", *may not be real value
       "return": 13, 
       "shift": 16, 
       "arrowUp": 38, 
       "arrowRight": 39, 
       "arrowDown": 40, 
       "arrowLeft": 37,
     }
*/


/*
    Shoutouts and the resources they created - Thank you!
    
    Rob Dodson: https://www.youtube.com/watch?v=JS68faEUduk
    Scott O'Hara: https://codepen.io/scottohara/pen/zYjWYj?editors=1011
    Yogesh Chavan: https://uxdesign.cc/how-to-trap-focus-inside-modal-to-make-it-ada-compliant-6a50f9a70700
    Nicholas C. Zakas: https://humanwhocodes.com/blog/2013/02/12/making-an-accessible-dialog-box/
    
    Additional useful resources: 
    MDN: dialog role; https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role
    MDN: document role: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/document_role
    MDN: keyboardEvent.code; https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
    Check which element is in focus: https://giovanicamara.com/blog/how-to-check-what-item-is-in-focus-when-accessibility-testing/
    Handling Events: https://eloquentjavascript.net/2nd_edition/14_event.html
    
    <dialog> NOTES:
    https://a11y-dialog.netlify.app/
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
    https://webkit.org/blog/12209/introducing-the-dialog-element/
    https://web.dev/building-a-dialog-component/
    
    inert NOTES: 
    https://github.com/GoogleChrome/inert-polyfill
    https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert
    
*/