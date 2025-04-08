window.onload = start;

const quadPoint1 = {
    x: 100,
    y: 100,
    r: 10
};

const quadCtrlPoint = {
    x: 150, 
    y: 100,
    r: 10
};

const quadPoint2 = {
    x: 200,
    y: 200,
    r: 10
};

const quadraticPoints = [quadPoint1, quadCtrlPoint, quadPoint2];

const cubicPoint1 = {
    x: 250,
    y: 250,
    r: 10
};

const cubicCtrlPoint1 = {
    x: 300, 
    y: 300,
    r: 10
};

const cubicCtrlPoint2 = {
    x: 300,
    y: 400,
    r: 10
};

const cubicPoint2 = {
    x: 400,
    y: 400,
    r: 10
};

const cubicPoints = [cubicPoint1, cubicCtrlPoint1, cubicCtrlPoint2, cubicPoint2];

let movingPoint;

let ctx;
let isMousePressed  = false;

function start(){
    let canvas = document.getElementById("canvas");
    canvas.width = 800;
    canvas.height = 800;
    ctx = canvas.getContext("2d");

    addEventListener("mousemove", onMouseMove);
    addEventListener("mousedown", onMouseClick);
    addEventListener("mouseup", onMouseRelease);

    drawQuadCurveAndPoints();
    drawCubicCurveAndPoints();

}

// this will be called with a parameter which is an event object
function onMouseClick(e){
    isMousePressed = true;

    quadraticPoints.forEach(p => {
        if(checkDistanceToPointLessThanRadius(p.x, p.y, p.r, e.offsetX, e.offsetY)){
            movingPoint = p;
        }
    });

    cubicPoints.forEach(p => {
        if(checkDistanceToPointLessThanRadius(p.x, p.y, p.r, e.offsetX, e.offsetY)){
            movingPoint = p;
        }
    });
}

function onMouseRelease(e){
    isMousePressed = false;
    movingPoint = null;
}

function onMouseMove(e){
    if(isMousePressed && movingPoint){
        movingPoint.x = e.offsetX;
        movingPoint.y = e.offsetY;

        clearCanvas();
        drawQuadCurveAndPoints();
        drawCubicCurveAndPoints();
    }   
}

function drawQuadCurveAndPoints(){
    drawCircle(quadPoint1);
    drawCircle(quadCtrlPoint)
    drawCircle(quadPoint2);

    drawQuadCurve(quadPoint1, quadCtrlPoint, quadPoint2);

    // draw lines 
    ctx.strokeStyle = "red";
    drawLine(quadPoint1, quadCtrlPoint);
    drawLine(quadCtrlPoint, quadPoint2);
}

function drawCubicCurveAndPoints(){
    drawCircle(cubicPoint1);
    drawCircle(cubicCtrlPoint1);
    drawCircle(cubicCtrlPoint2);
    drawCircle(cubicPoint2);

    drawCubicCurve(cubicPoint1, cubicCtrlPoint1, cubicCtrlPoint2, cubicPoint2);

    // draw lines 
    ctx.strokeStyle = "red";
    drawLine(cubicPoint1, cubicCtrlPoint1);
    drawLine(cubicCtrlPoint1, cubicCtrlPoint2);
    drawLine(cubicCtrlPoint2, cubicPoint2);
}

function drawQuadCurve(p1, cp, p2){
    ctx.beginPath()
    ctx.strokeStyle = "black";
    ctx.moveTo(p1.x, p1.y);
    ctx.quadraticCurveTo(cp.x, cp.y, p2.x, p2.y);
    ctx.stroke();
}

function drawCubicCurve(p1, cp1, cp2, p2){
    ctx.beginPath()
    ctx.strokeStyle = "black";
    ctx.moveTo(p1.x, p1.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, p2.x, p2.y);
    ctx.stroke();
}

function drawCircle(c){
    ctx.beginPath();
    // x, y (center), radius, starting angle, ending angle (radians)
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fill();
    
}

function drawLine(p1, p2){
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function findDistance(x1, y1, x2, y2){
    let distX = x1 - x2;
    let distY = y1 - y2;
    return Math.sqrt( (distX*distX) + (distY*distY) );
}

// hat tip https://www.jeffreythompson.org/collision-detection/circle-rect.php
function checkDistanceToPointLessThanRadius(circleX, circleY, circleR, testX, testY){
    return findDistance(circleX, circleY, testX, testY) <= circleR;
}

