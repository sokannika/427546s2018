﻿var mycode = function () {
    'use strict';

    var i, iz,
        wheelGroup,
        myEntity,
        test,
        getWheel,
        dropWheel,
        stopE;

    // import images
    scrawl.getImagesByClass('pupper');

    // display and control entitys
    wheelGroup = scrawl.makeGroup({
        name: 'wheelGroup',
    });

    scrawl.makeWheel({
        name: 'topLeft',
        order: 20,
        startX: 50,
        startY: 50,
        fillStyle: 'blue',
        group: 'wheelGroup',
        radius: 8
    }).clone({
        name: 'topRight',
        fillStyle: 'red',
        startX: 550,
        startY: 50
    }).clone({
        name: 'bottomRight',
        startX: 550,
        startY: 550
    }).clone({
        name: 'bottomLeft',
        startX: 50,
        startY: 550
    });

    test = scrawl.makeFrame({
        name: 'test',
        topLeftPivot: 'topLeft',
        topRightPivot: 'topRight',
        bottomRightPivot: 'bottomRight',
        bottomLeftPivot: 'bottomLeft',
        source: 'swan'
    });

    // display/control event listeners
    stopE = function (e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
    };
    getWheel = function (e) {
        var here = scrawl.pad.mycanvas.getMouse();
        stopE(e);
        myEntity = wheelGroup.getEntityAt(here);
        if (myEntity) {
            myEntity.pickupEntity(here);
        }
    };
    dropWheel = function (e) {
        stopE(e);
        if (myEntity) {
            myEntity.dropEntity();
            myEntity = false;
        }
    };
    scrawl.addListener('down', getWheel, scrawl.canvas.mycanvas);
    scrawl.addListener(['up', 'leave'], dropWheel, scrawl.canvas.mycanvas);

    // animation loop
    scrawl.makeAnimation({
        fn: function () {

            scrawl.render();
        },
    });

};

scrawl.loadExtensions({
    path: 'https://scrawl.rikweb.org.uk/source_5-0-0/',
    minified: false,
    extensions: ['images', 'wheel', 'frame'],
    callback: function () {
        window.addEventListener('load', function () {
            scrawl.init();
            mycode();
        }, false);
    },
});