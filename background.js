chrome.storage.sync.set({ 'new_tab': false });

function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    var id = tab.id;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url, id);
  });
}

function searchTheSite(searchterms){
  getCurrentTabUrl(function(url, id) {
    var a = document.createElement('a');
    a.href = url;
    var hostname = a.hostname;
    if(rules[hostname]!=undefined){
      search_terms = searchterms.replace(" ", "+");
      search_url = "http://" + rules[hostname].replace('{{search_terms}}', search_terms);
      chrome.storage.sync.get('new_tab', function(data) {
        if(data.new_tab == true){
            $(this).target = "_blank";
            window.open(search_url);
        }
        else{
          chrome.tabs.update(id, { url: search_url });
        }
      });
    }
    else{
      alert("Search rule for this website not found!")
    }
  });
  return false;
}

chrome.commands.onCommand.addListener(function(command){
  var search_term = prompt("Please enter the search term");
  searchTheSite(search_term);
});
