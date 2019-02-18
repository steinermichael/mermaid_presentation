var maxPage = $(".page-container").length;

function updateFooterPage() {
    console.log("updateFooterPage");
    // var maxPage = $();
    var currentPage = $.scrollify.currentIndex()+1;
    $("#footer-page").text(currentPage + "/" + maxPage);
}

function updateMermaidDivFromTextarea($textarea, themeName) {
    console.log("updateMermaidDivFromTextarea");
    console.log("themeName", themeName);

    var $this = $textarea;
    // var $this = $(this);
    var newMermaidCode = $textarea.val();
    var mermaidDiv = $textarea.parent().parent().find('.mermaid');
    console.log("$this", $this);
    console.log("newMermaidCode", newMermaidCode);
    console.log("mermaidDiv", mermaidDiv);

    mermaidDiv.html(newMermaidCode);

    mermaidDiv.removeAttr('data-processed');
    mermaidDiv.removeClass('mermaid');
    mermaidDiv.addClass('mermaid');

    var mermaidId = mermaidDiv.attr('id');
    var svgId = "svg" + mermaidId;


    var backupMermaidConfig = mermaid.mermaidAPI.getConfig();
    if (themeName !== undefined) {
        // let newConfig = Object.create(backupMermaidConfig);
        let newConfig = jQuery.extend(true, {}, backupMermaidConfig);

        newConfig.theme = themeName;
        mermaid.initialize(newConfig);

        console.log("newConfig", newConfig);
        console.log("backupMermaidConfig", backupMermaidConfig);
    }

    mermaid.render(svgId, newMermaidCode, function(svgGraph) {
        mermaidDiv.html(svgGraph);
    });

    if (themeName !== undefined) {
        //Restore the mermaid-config

        //TODO: Copy of the Config in backupMermaidConfig does not work correctly
        //Because of this the theme is reset to default manually here
        backupMermaidConfig.theme = 'default';

        mermaid.initialize(backupMermaidConfig);

        console.log("mermaid config reset to", backupMermaidConfig);
    }
}

$navIcon = $('#nav-icon');
$navBar = $('#nav-bar');

$( document ).ready(function() {

    initNavBarContent();
    initPageDataAttributes();

    $navBar.on('mouseleave', function() {
        $navBar.animate({
            right: "-200px",
        }, 500, function() {
            $navIcon.attr('data-nav-bar-open', 'false');
        });
    });

    $navIcon.on('click', function() {
        $navIcon.attr('data-nav-bar-open', 'false');
    });

    $navIcon.hover(function() {
        $navBar.animate({
            right: "0",
        }, 500, function() {
            $navIcon.attr('data-hover-enabled', 'false');
        });
        $navIcon.attr('data-nav-bar-open', 'true');
    });

    //Click in NavBar will scroll to target-page
    $(document).on('click', '.page-link', function () {
        var pageTarget = $(this).attr('data-page-target');
        var targetPageContainer = $('.page-container[data-page=' + pageTarget + ']').first();

        $([document.documentElement, document.body]).animate({
            scrollTop: targetPageContainer.offset().top
        }, 200);
    });

    $("textarea.mermaid-textarea").dblclick(function() {

        var $textarea = $(this);
        updateMermaidDivFromTextarea($textarea);
    });

    //Init highlight.js
    hljs.initHighlightingOnLoad();
});

$(function() {
    $.scrollify({
        section: ".page-container",
        after: updateFooterPage,
    });
});

function initPageDataAttributes() {
    $('.page-container').each(function(pageContainerIndex, pageContainer) {
        $(pageContainer).attr('data-page', pageContainerIndex+1);
    });
}

function initNavBarContent() {

    var navBarItems = [];
    navBarItems[3] = 'Das Mermaid-Projekt';
    navBarItems[4] = 'Ausrichtung';
    navBarItems[5] = 'Subgraphen';
    navBarItems[6] = 'Knoten IDs';
    navBarItems[7] = 'Knoten Typen';
    navBarItems[8] = 'Verbindungen';
    navBarItems[9] = 'Styling';
    navBarItems[10] = 'Themes';
    navBarItems[12] = 'Sequenzdiagramm';
    navBarItems[13] = 'Ganttdiagramm';
    navBarItems[14] = 'Git-Graph';
    navBarItems[15] = 'Wo ist es nutzbar?';
    navBarItems[16] = 'Fazit';

    var navBarHtmlArray = [];
    navBarItems.forEach(function(navBarItemDescription, navBarItemIndex) {
        navBarHtmlArray.push('<li class="page-link" data-page-target="' + navBarItemIndex + '">' + navBarItemDescription + '</li>')
    });

    $navBar.html("<ul>" + navBarHtmlArray.join('') + "</ul>");
}

function changeTheme(clickedButton) {
    var newThemeName = $(clickedButton).attr("data-mermaid-theme");
    console.log("changeTheme");
    console.log(this);
    console.log("newThemeName", newThemeName);

    var textarea = $("#example-theme-1 textarea.mermaid-textarea").first();
    console.log("textarea", textarea);
    updateMermaidDivFromTextarea(textarea, newThemeName);
}

updateFooterPage();

// example-graph-alignment
addMermaidDiv(`
    graph LR
    A --> B`,
    'example-graph-alignment-1');

addMermaidDiv(`
    graph TB
    A --> B`,
    'example-graph-alignment-2');

//example-node-connections
addMermaidDiv(`
    graph LR
    A --- B`,
    'example-node-connection-1');

addMermaidDiv(`
    graph LR
    A --> B`,
    'example-node-connection-2');

addMermaidDiv(`
    graph LR
    A --Übergang--> B`,
    'example-node-connection-3');

addMermaidDiv(`
    graph LR
    A --> B
    `,
    'example-theme-1');


//example-styling
addMermaidDiv(`
    graph LR
    A --fill--> B
    A --stroke--> C
    classDef useFill fill:#72a8ff;
    classDef useStroke stroke:#72a8ff,stroke-width:5px;
    class B useFill
    class C useStroke`,
    'example-styling-1',
    12);

// page-2
addMermaidDiv(`
    graph LR
    A[Knoten A]
    B[Knoten B]
    A --> B`,
    'page-2-1');

addMermaidDiv(`
    graph LR
    A[Knoten A] --> B[Knoten B]`,
    'page-2-2');

//example-node-types
addMermaidDiv(`
    graph LR
    A[Knoten A]`,
    'example-node-types-1');

addMermaidDiv(`
    graph LR
    B(Knoten B)`,
   'example-node-types-2');

addMermaidDiv(`
    graph LR
    C((Knoten C))`,
    'example-node-types-3');

addMermaidDiv(`
    graph LR
    D{Knoten D}`,
    'example-node-types-4');

addMermaidDiv(`
    graph LR
    A[Knoten A]
    B(Knoten B)
    C((Knoten C))
    D{Knoten D}
    A --> B
    B --> C
    C --> D`,
    'page-2-5');

addMermaidDiv(`
    graph LR
    A[Knoten A]
    B(Knoten B)
    C((Knoten C))
    D{Knoten D}
    A --> B
    B --> C
    C --> D`,
    'page-2-6');

addMermaidDiv(`
    graph LR
    subgraph Gruppe
    B
    end
    
    A-->B`,
   'example-subgraph-1');

addMermaidDiv(`
    classDiagram
    Class01 <|-- AveryLongClass : Cool
    Class03 *-- Class04
    Class05 o-- Class06
    Class07 .. Class08
    Class09 --> C2 : Where am i?
        Class09 --* C3
        Class09 --|> Class07
    Class07 : equals()
    Class07 : Object[] elementData
    Class01 : size()
    Class01 : int chimp
    Class01 : int gorilla
    Class08 <--> C2: Cool label`,
    'example-class-diagram-1');




// addMermaidDiv(`
//     gitGraph:
//     options
//     {
//         "nodeSpacing": 150,
//         "nodeRadius": 10
//     }
//     end
//     commit
//     branch newbranch
//     checkout newbranch
//     commit
//     commit
//     checkout master
//     commit
//     commit
//     merge newbranch`,
//     'example-git-graph-1');





function addMermaidDiv(mermaidCode, testid, numberOfCols) {

    console.log("addMermaidDiv");
    var tmpArray = [];
    var mermaidCodeWithoutLeadingSpaces = mermaidCode.replace(/^\s+|\s+$/gm,'');;

    // if (heightInPx === undefined) {
    //     tmpArray.push('<div class="row alert alert-primary">');
    // } else {
    //     tmpArray.push('<div style="height:' + heightInPx + '" class="row alert alert-primary">');
    // }
    tmpArray.push('<div class="row alert alert-primary">');

    var colClass = 'col-md-6';
    if (numberOfCols !== undefined) {
        colClass = 'col-md-' + numberOfCols;
    }

    var numberOfNewlines =  mermaidCode.split(/\r\n|\r|\n/).length;

    tmpArray.push('   <div class="' + colClass + '">');
    tmpArray.push('       <textarea spellcheck="false" rows="' + numberOfNewlines + '"class="mermaid-textarea">' + mermaidCodeWithoutLeadingSpaces + '</textarea>');
    tmpArray.push('   </div>');
    tmpArray.push('   <div class="' + colClass + '">');
    tmpArray.push('        <div class="mermaid" id="mermaid-' + testid + '">' + mermaidCode + '</div>');
    tmpArray.push('   </div>');
    tmpArray.push('</div>');

    $("#" + testid).html(tmpArray.join(''));

}