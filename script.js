function openTab(tabName) {
    // Hide all tab contents
    var tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(function(tabContent) {
        tabContent.classList.remove('active');
    });

    // Show the selected tab content
    var selectedTab = document.getElementById(tabName);
    selectedTab.classList.add('active');
}
