// Add the drop-down menu to the search page
window.addEventListener('DOMContentLoaded', function() {
  var filterDiv = document.createElement('div');
  filterDiv.innerHTML = `
    <label for="categoryFilter">Category: </label>
    <select id="categoryFilter">
      <option value="">All</option>
      <option value="Alpine_skiing">Alpine Skiing</option>
      <option value="Cross_country_skiing">Cross-Country Skiing</option>
      <option value="Ski_jumping">Ski Jumping</option>
    </select>
  `;
  var searchForm = document.querySelector('.wh_search_input');
  if (searchForm) {
    searchForm.parentNode.insertBefore(filterDiv, searchForm.nextSibling);
  }
});

// Store the selected category globally
var selectedCategory = "";

// Listen for changes to the drop-down
document.addEventListener('change', function(e) {
  if (e.target && e.target.id === 'categoryFilter') {
    selectedCategory = e.target.value;
  }
});

// The required filter structure for Oxygen
function CustomSearchFilter() {
    this.filterResults = function (searchResults) {
        // If no category is selected, return all results
        if (!selectedCategory) {
            return searchResults;
        }
        // Filter results based on the selected category
        var filtered = [];
        for (var i = 0; i < searchResults.length; i++) {
            var result = searchResults[i];
            // Check if the keywords metadata contains the selected category
            if (result.keywords && result.keywords.indexOf(selectedCategory) !== -1) {
                filtered.push(result);
            }
        }
        return filtered;
    }
}
WebHelpAPI.setCustomSearchFilter(new CustomSearchFilter());