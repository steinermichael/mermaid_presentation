
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





    // var config = {startOnLoad:false, cloneCssStyles:false, leftMargin: 0, flowchart:{useMaxWidth:false, htmlLabels:true}};
    // var config = {theme: 'forest'};
    // mermaid.initialize(config);
}


$( document ).ready(function() {
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

// page-1
addMermaidDiv(`
    graph LR
    A --> B`,
    'page-1-1');

addMermaidDiv(`
    graph RL
    A --> B`,
    'page-1-2');

addMermaidDiv(`
    graph TB
    A --> B`,
    'page-1-3');

addMermaidDiv(`
    graph BT
    A --> B`,
    'page-1-4');


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
    A --Übergang--> B
    A --Übergang--> B`,
    'example-node-connection-4');

addMermaidDiv(`
    graph LR
    A -->|Übergang| B
    A -->|Übergang| B`,
    'example-node-connection-5');


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
    'example-styling-1');

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
    subgraph Subgraph B
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


 addMermaidDiv(`
    gantt
    dateFormat  YYYY-MM-DD
    title Adding GANTT diagram to mermaid
    
    section A section
    Completed task :done,    des1, 2014-01-06,2014-01-08
    Active task    :active,  des2, 2014-01-09, 3d
    Future task    :         des3, after des2, 5d
    Future task2   :         des4, after des3, 5d
    `,
     'example-gantt-diagram-2',
     12);

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
    tmpArray.push('       <textarea rows="' + numberOfNewlines + '"class="mermaid-textarea">' + mermaidCodeWithoutLeadingSpaces + '</textarea>');
    tmpArray.push('   </div>');
    tmpArray.push('   <div class="' + colClass + '">');
    tmpArray.push('        <div class="mermaid" id="mermaid-' + testid + '">' + mermaidCode + '</div>');
    tmpArray.push('   </div>');
    tmpArray.push('</div>');

    $("#" + testid).html(tmpArray.join(''));

}