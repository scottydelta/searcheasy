 $(document).ready(function() {
     $('#new_tab').change(function() {
       chrome.storage.sync.set({ 'new_tab': $(this).is(':checked') });
     });
 });
document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get('new_tab', function(data) {
    if(data){
      if(data.new_tab == true){
        $("#new_tab").prop('checked', true);
      }
      else{
        $("#new_tab").prop('checked', false);
      }
    }
  });
});
