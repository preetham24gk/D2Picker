document.addEventListener("DOMContentLoaded", () => {
    const options1 = ["Handcanon", "Shotgun", "Scout", "Pulse", "Sniper", "SMG", "Auto", "Sidearm", "Fusion", "GL", "Bow", "Trace"];
    const options2Map = {
        "Handcanon": ["Exotic HC Only","Two Handcanons", "Legendary HC Only", "Hc With Shoty"],
        "Shotgun": ["Only Shoty", "Double Shoty", "Sniper With Shoty", "Shoty With HC"],
        "Scout": ["Exotic K", "Legendary K", "Exotic S", "Legendary S", "Exotic with Shoty", "legendary with exotic Sniper", "With Sidearm" ],
        "Pulse": ["Exotic K", "Legendary K", "Exotic S", "Legendary S", "L with exotic Shoty", "E with L Sniper", "With Bow" ],
        "Sniper": ["Only Sniper", "with Sidearm", "with HC", "with E Pulse", "Exotic Sniper", "Legendary Sniper", "Sniper with Bow" ],
        "SMG": ["Exotic K", "Legendary K", "Exotic S", "Legendary S", "Exotic with Bow", "legendary with E Fusion", "Only Exotic" ],
        "Auto": ["Exotic K", "Legendary K", "Exotic S", "Legendary S", "Exotic with Shoty", "legendary with exotic Sniper", "With Sidearm" ],
        "Sidearm": ["Exotic K", "Legendary K", "Exotic S", "Legendary S","Only Sidearm", "Sidearm with Sniper", "With Bow" ],
        "Fusion": ["Exotic K", "Legendary K", "Exotic S", "Legendary S", "with HC", "with SMG", "With Bow" ],
        "GL": [ "Exotic K", "Legendary K", "Exotic S", "Legendary S","GL only"],
        "Bow": ["Exotic K", "Legendary K", "Exotic S", "Legendary S", "Exotic with Shoty", "legendary with exotic Sniper"],
        "Trace": ["Only Trace", "Exotic T with Bow", "Only ability", "Trace with Sniper", "Trace with HC", "Trace with SMG", "Trace with Fusion"]
    };
    const options3 = ["Super 100", "Normal", "Super 50","Normal", "Granade 100","Normal", "Meele 100","Normal", "No ability","Normal","Cls Ab 100","Normal"];
    const options4 = ["Stasis", "Void 1", "Solar 1", "Solar 2","Arc 3", "Solar 3", "Void 2", "Void 3","Arc 1","Arc 2","Strand"];

    const canvas1 = document.getElementById("wheelCanvas1");
    const ctx1 = canvas1.getContext("2d");
    const spinButton1 = document.getElementById("spinButton1");
    const selectedOptionDiv1 = document.getElementById("selectedOption1");

    const canvas2 = document.getElementById("wheelCanvas2");
    const ctx2 = canvas2.getContext("2d");
    const spinButton2 = document.getElementById("spinButton2");
    const selectedOptionDiv2 = document.getElementById("selectedOption2");

    const canvas3 = document.getElementById("wheelCanvas3");
    const ctx3 = canvas3.getContext("2d");
    const spinButton3 = document.getElementById("spinButton3");
    const selectedOptionDiv3 = document.getElementById("selectedOption3");

    const canvas4 = document.getElementById("wheelCanvas4");
    const ctx4 = canvas4.getContext("2d");
    const spinButton4 = document.getElementById("spinButton4");
    const selectedOptionDiv4 = document.getElementById("selectedOption4");

    const resetButtonHeader = document.getElementById("resetButtonHeader");
    const resetButtonFooter = document.getElementById("resetButtonFooter");

    let startAngle1 = 0;
    let startAngle2 = 0;
    let startAngle3 = 0;
    let startAngle4 = 0;
    const arc1 = Math.PI / (options1.length / 2);
    let arc2;
    const arc3 = Math.PI / (options3.length / 2);
    const arc4 = Math.PI / (options4.length / 2);
    let spinTimeout1 = null;
    let spinTimeout2 = null;
    let spinTimeout3 = null;
    let spinTimeout4 = null;
    let spinAngleStart1 = 10;
    let spinAngleStart2 = 10;
    let spinAngleStart3 = 10;
    let spinAngleStart4 = 10;
    let spinTime1 = 0;
    let spinTime2 = 0;
    let spinTime3 = 0;
    let spinTime4 = 0;
    let spinTimeTotal1 = 0;
    let spinTimeTotal2 = 0;
    let spinTimeTotal3 = 0;
    let spinTimeTotal4 = 0;
    let options2 = [];

    function drawRouletteWheel(ctx, options, startAngle, arc) {
        const outsideRadius = 200;
        const textRadius = 160;
        const insideRadius = 125;

        ctx.clearRect(0, 0, canvas1.width, canvas1.height);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        ctx.font = 'bold 12px Helvetica, Arial';

        for (let i = 0; i < options.length; i++) {
            const angle = startAngle + i * arc;
            ctx.fillStyle = getColor(i, options.length);

            ctx.beginPath();
            ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
            ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();

            ctx.save();
            ctx.fillStyle = "white";
            ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
                          250 + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            const text = options[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
        }
    }

    function getColor(item, maxItem) {
        const phase = 0;
        const center = 128;
        const width = 127;
        const frequency = Math.PI * 2 / maxItem;

        const red = Math.sin(frequency * item + 2 + phase) * width + center;
        const green = Math.sin(frequency * item + 0 + phase) * width + center;
        const blue = Math.sin(frequency * item + 4 + phase) * width + center;

        return `rgb(${Math.round(red)},${Math.round(green)},${Math.round(blue)})`;
    }

    function rotateWheel1() {
        spinTime1 += 30;
        if (spinTime1 >= spinTimeTotal1) {
            stopRotateWheel1();
            return;
        }
        const spinAngle = spinAngleStart1 - easeOut(spinTime1, 0, spinAngleStart1, spinTimeTotal1);
        startAngle1 += (spinAngle * Math.PI / 180);
        drawRouletteWheel(ctx1, options1, startAngle1, arc1);
        spinTimeout1 = setTimeout(rotateWheel1, 30);
    }

    function stopRotateWheel1() {
        clearTimeout(spinTimeout1);
        const degrees = startAngle1 * 180 / Math.PI + 90;
        const arcd = arc1 * 180 / Math.PI;
        const index = Math.floor((360 - degrees % 360) / arcd);
        ctx1.save();
        ctx1.font = 'bold 30px Helvetica, Arial';
        const text = options1[index];
        selectedOptionDiv1.innerHTML = `Selected Option: ${text}`;
        ctx1.restore();

        // Set options for the second wheel based on the first wheel's outcome
        options2 = options2Map[text];
        arc2 = Math.PI / (options2.length / 2);
        drawRouletteWheel(ctx2, options2, startAngle2, arc2);
        spinButton2.disabled = false;
    }

    function rotateWheel2() {
        spinTime2 += 30;
        if (spinTime2 >= spinTimeTotal2) {
            stopRotateWheel2();
            return;
        }
        const spinAngle = spinAngleStart2 - easeOut(spinTime2, 0, spinAngleStart2, spinTimeTotal2);
        startAngle2 += (spinAngle * Math.PI / 180);
        drawRouletteWheel(ctx2, options2, startAngle2, arc2);
        spinTimeout2 = setTimeout(rotateWheel2, 30);
    }

    function stopRotateWheel2() {
        clearTimeout(spinTimeout2);
        const degrees = startAngle2 * 180 / Math.PI + 90;
        const arcd = arc2 * 180 / Math.PI;
        const index = Math.floor((360 - degrees % 360) / arcd);
        ctx2.save();
        ctx2.font = 'bold 30px Helvetica, Arial';
        const text = options2[index];
        selectedOptionDiv2.innerHTML = `Selected Option: ${text}`;
        ctx2.restore();
    }

    function rotateWheel3() {
        spinTime3 += 30;
        if (spinTime3 >= spinTimeTotal3) {
            stopRotateWheel3();
            return;
        }
        const spinAngle = spinAngleStart3 - easeOut(spinTime3, 0, spinAngleStart3, spinTimeTotal3);
        startAngle3 += (spinAngle * Math.PI / 180);
        drawRouletteWheel(ctx3, options3, startAngle3, arc3);
        spinTimeout3 = setTimeout(rotateWheel3, 30);
    }

    function stopRotateWheel3() {
        clearTimeout(spinTimeout3);
        const degrees = startAngle3 * 180 / Math.PI + 90;
        const arcd = arc3 * 180 / Math.PI;
        const index = Math.floor((360 - degrees % 360) / arcd);
        ctx3.save();
        ctx3.font = 'bold 30px Helvetica, Arial';
        const text = options3[index];
        selectedOptionDiv3.innerHTML = `Abilities: ${text}`;
        ctx3.restore();
    }

    function rotateWheel4() {
        spinTime4 += 30;
        if (spinTime4 >= spinTimeTotal4) {
            stopRotateWheel4();
            return;
        }
        const spinAngle = spinAngleStart4 - easeOut(spinTime4, 0, spinAngleStart4, spinTimeTotal4);
        startAngle4 += (spinAngle * Math.PI / 180);
        drawRouletteWheel(ctx4, options4, startAngle4, arc4);
        spinTimeout4 = setTimeout(rotateWheel4, 30);
    }

    function stopRotateWheel4() {
        clearTimeout(spinTimeout4);
        const degrees = startAngle4 * 180 / Math.PI + 90;
        const arcd = arc4 * 180 / Math.PI;
        const index = Math.floor((360 - degrees % 360) / arcd);
        ctx4.save();
        ctx4.font = 'bold 30px Helvetica, Arial';
        const text = options4[index];
        selectedOptionDiv4.innerHTML = `Sub Class: ${text}`;
        ctx4.restore();
    }

    function easeOut(t, b, c, d) {
        const ts = (t /= d) * t;
        const tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
    }

    function reset() {
        startAngle1 = 0;
        startAngle2 = 0;
        startAngle3 = 0;
        startAngle4 = 0;
        spinButton2.disabled = true;
        selectedOptionDiv1.innerHTML = "";
        selectedOptionDiv2.innerHTML = "";
        selectedOptionDiv3.innerHTML = "";
        selectedOptionDiv4.innerHTML = "";
        drawRouletteWheel(ctx1, options1, startAngle1, arc1);
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        drawRouletteWheel(ctx3, options3, startAngle3, arc3);
        drawRouletteWheel(ctx4, options4, startAngle4, arc4);
    }

    spinButton1.addEventListener("click", () => {
        spinAngleStart1 = Math.random() * 10 + 10;
        spinTime1 = 0;
        spinTimeTotal1 = Math.random() * 3 + 4 * 1000;
        rotateWheel1();
    });

    spinButton2.addEventListener("click", () => {
        spinAngleStart2 = Math.random() * 10 + 10;
        spinTime2 = 0;
        spinTimeTotal2 = Math.random() * 3 + 4 * 1000;
        rotateWheel2();
    });

    spinButton3.addEventListener("click", () => {
        spinAngleStart3 = Math.random() * 10 + 10;
        spinTime3 = 0;
        spinTimeTotal3 = Math.random() * 3 + 4 * 1000;
        rotateWheel3();
    });

    spinButton4.addEventListener("click", () => {
        spinAngleStart4 = Math.random() * 10 + 10;
        spinTime4 = 0;
        spinTimeTotal4 = Math.random() * 3 + 4 * 1000;
        rotateWheel4();
    });

    resetButtonHeader.addEventListener("click", reset);
    resetButtonFooter.addEventListener("click", reset);

    drawRouletteWheel(ctx1, options1, startAngle1, arc1);
    drawRouletteWheel(ctx3, options3, startAngle3, arc3);
    drawRouletteWheel(ctx4, options4, startAngle4, arc4);
});